import test from 'node:test';
import assert from 'node:assert/strict';
import { AXIS_PRESETS, MODEL_LEADS, PHASES, RHYTHM_PRESETS, advancePlayback, axisZoneForAngle, cardiacVector, meanQrsAngle, phaseAt, phasesForRhythm, projectionAt, traceAnnotationsForRhythm, traceSegmentsForRhythm, vectorLoopPath, voltageAt, waveformPath } from './ekgSimulation.js';

const close = (actual, expected, tolerance = 1e-10) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} differs from ${expected}`);

test('learning playback gives QRS eleven seconds with continuous phase boundaries', () => {
    close(advancePlayback(210, 2600, 'study'), 230);
    close(advancePlayback(230, 2200, 'study'), 244);
    close(advancePlayback(244, 3800, 'study'), 270);
    close(advancePlayback(270, 2400, 'study'), 300);
    close(advancePlayback(210, 11000, 'study'), 300);
    close(advancePlayback(210, 11000, 'study', true), 210);
    assert.ok(advancePlayback(210, 1000, 'study', true) < 220);
});

test('playback wraps the selected scope and does not depend on frame size', () => {
    for (const speed of ['study', '0.1', '1']) {
        for (const qrsOnly of [true, false]) {
            const start = qrsOnly ? 210 : 0;
            let stepped = start;
            for (let frame = 0; frame < 1000; frame++) stepped = advancePlayback(stepped, 16, speed, qrsOnly);
            close(stepped, advancePlayback(start, 16000, speed, qrsOnly), 1e-7);
        }
    }
    close(advancePlayback(650, 0, 'study', true), 210);
    close(advancePlayback(795, 10, '1'), 5);
    close(advancePlayback(295, 10, '1', true), 215);
});

test('limb voltages obey Einthoven and augmented lead identities throughout the beat', () => {
    for (let time = 0; time < 800; time += 0.5) {
        const I = voltageAt('I', time);
        const II = voltageAt('II', time);
        close(II, I + voltageAt('III', time));
        close(voltageAt('aVR', time), -(I + II) / 2);
        close(voltageAt('aVL', time), I - II / 2);
        close(voltageAt('aVF', time), II - I / 2);
    }
});

test('the drawn projection and every trace have the same polarity and calibrated amplitude', () => {
    for (const [lead, details] of Object.entries(MODEL_LEADS)) {
        const gain = Math.hypot(...details.axis);
        for (let time = 0; time < 800; time += 2) {
            const { vector, unit, point, voltage } = projectionAt(lead, time);
            close((point[0] * unit[0] + point[1] * unit[1]) * gain, voltage);
            close((vector[0] - point[0]) * unit[0] + (vector[1] - point[1]) * unit[1], 0);
            assert.ok(Number.isFinite(voltage));
        }
        const coordinates = waveformPath(lead).split(' ').map(command => command.slice(1).split(',').map(Number));
        coordinates.forEach(([x, y], index) => {
            close(x, index, .001);
            close(y, 100 - voltageAt(lead, index * 2) * 56, .0051);
        });
    }
});

test('normal teaching examples show opposite views and chest R/S progression', () => {
    assert.ok(voltageAt('II', 252) > 1);
    assert.ok(voltageAt('aVR', 252) < -1);
    assert.ok(voltageAt('V1', 220) > 0);
    assert.ok(voltageAt('V6', 220) < 0);
    const ratios = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'].map(lead => {
        const samples = Array.from({ length: 91 }, (_, index) => voltageAt(lead, 210 + index));
        return Math.max(...samples) / Math.abs(Math.min(...samples));
    });
    assert.ok(ratios[0] < 1);
    assert.ok(ratios[5] > 1);
    ratios.slice(1).forEach((ratio, index) => assert.ok(ratio > ratios[index]));
    for (const time of [130, 460]) {
        assert.ok(voltageAt('II', time) > 0);
        assert.ok(voltageAt('aVR', time) < 0);
    }
});

test('phase targets, quiet intervals, and cycle wrap stay synchronized', () => {
    PHASES.forEach(phase => assert.equal(phaseAt(phase.time).id, phase.id));
    for (const time of [0, 79, 180, 195, 209, 300, 340, 379, 540, 799, 800]) {
        assert.deepEqual(cardiacVector(time), [0, 0, 0]);
    }
    for (let time = 0; time < 800; time++) {
        cardiacVector(time).forEach((value, index) => {
            close(value, cardiacVector(time + 800)[index]);
            assert.ok(Math.abs(value - cardiacVector(time + .001)[index]) < .001);
        });
    }
});

test('Einthoven and augmented lead identities hold across all axis presets', () => {
    for (const preset of Object.values(AXIS_PRESETS)) {
        const offset = preset.offsetDeg;
        for (let time = 0; time < 800; time += 2) {
            const I = voltageAt('I', time, offset);
            const II = voltageAt('II', time, offset);
            close(II, I + voltageAt('III', time, offset));
            close(voltageAt('aVR', time, offset), -(I + II) / 2);
            close(voltageAt('aVL', time, offset), I - II / 2);
            close(voltageAt('aVF', time, offset), II - I / 2);
        }
    }
});

test('meanQrsAngle, axisZoneForAngle, and net QRS polarities match Normal, LAD, and RAD', () => {
    const angleNormal = meanQrsAngle(AXIS_PRESETS.normal.offsetDeg);
    const angleLad = meanQrsAngle(AXIS_PRESETS.lad.offsetDeg);
    const angleRad = meanQrsAngle(AXIS_PRESETS.rad.offsetDeg);

    assert.ok(angleNormal >= 45 && angleNormal <= 65, `Normal angle was ${angleNormal}`);
    assert.ok(angleLad >= -55 && angleLad <= -35, `LAD angle was ${angleLad}`);
    assert.ok(angleRad >= 105 && angleRad <= 125, `RAD angle was ${angleRad}`);

    assert.equal(axisZoneForAngle(angleNormal).id, 'normal');
    assert.equal(axisZoneForAngle(angleLad).id, 'lad');
    assert.equal(axisZoneForAngle(angleRad).id, 'rad');
    assert.equal(axisZoneForAngle(-135).id, 'extreme');

    const netQrs = (lead, offset) => {
        let sum = 0;
        for (let t = 210; t <= 300; t += 2) sum += voltageAt(lead, t, offset);
        return sum;
    };

    assert.ok(netQrs('I', AXIS_PRESETS.lad.offsetDeg) > 0);
    assert.ok(netQrs('II', AXIS_PRESETS.lad.offsetDeg) < 0);
    assert.ok(netQrs('aVF', AXIS_PRESETS.lad.offsetDeg) < 0);

    assert.ok(netQrs('I', AXIS_PRESETS.rad.offsetDeg) < 0);
    assert.ok(netQrs('III', AXIS_PRESETS.rad.offsetDeg) > 0);
    assert.ok(netQrs('aVF', AXIS_PRESETS.rad.offsetDeg) > 0);

    const extremeAngle = meanQrsAngle(175);
    assert.equal(Math.round(extremeAngle), -135);
    assert.equal(axisZoneForAngle(extremeAngle).id, 'extreme');
    assert.ok(netQrs('I', 175) < 0);
    assert.ok(netQrs('II', 175) < 0);
    assert.ok(netQrs('aVF', 175) < 0);
    assert.ok(netQrs('aVR', 175) > 0);

    assert.ok(vectorLoopPath('frontal', 330, 260, 104, 0).startsWith('M'));
    assert.ok(vectorLoopPath('horizontal', 330, 248, 86, 0).startsWith('M'));
});

test('drawn vector projections match lead voltage sign and 90-degree orthogonality across all 12 leads and axis presets', () => {
    for (const preset of Object.values(AXIS_PRESETS)) {
        for (const [lead, details] of Object.entries(MODEL_LEADS)) {
            const offset = details.plane === 'frontal' ? preset.offsetDeg : 0;
            for (let time = 0; time < 800; time += 5) {
                const { vector, unit, point, voltage } = projectionAt(lead, time, offset);
                const dotAlongUnit = point[0] * unit[0] + point[1] * unit[1];
                const residualDot = (vector[0] - point[0]) * unit[0] + (vector[1] - point[1]) * unit[1];
                close(residualDot, 0, 1e-9);
                if (Math.abs(voltage) > 0.005) {
                    assert.equal(Math.sign(dotAlongUnit), Math.sign(voltage), `${lead} at ${time}ms (${preset.id})`);
                }
            }
        }
    }
});

test('Einthoven, Goldberg, and 90-degree orthogonality hold across all rhythm presets', () => {
    for (const rhythm of Object.values(RHYTHM_PRESETS)) {
        for (let time = 0; time < 800; time += 4) {
            const I = voltageAt('I', time, 0, rhythm.id);
            const II = voltageAt('II', time, 0, rhythm.id);
            close(II, I + voltageAt('III', time, 0, rhythm.id));
            close(voltageAt('aVR', time, 0, rhythm.id), -(I + II) / 2);
            close(voltageAt('aVL', time, 0, rhythm.id), I - II / 2);
            close(voltageAt('aVF', time, 0, rhythm.id), II - I / 2);

            for (const lead of ['I', 'II', 'aVF', 'V1', 'V6']) {
                const { vector, unit, point } = projectionAt(lead, time, 0, rhythm.id);
                close((vector[0] - point[0]) * unit[0] + (vector[1] - point[1]) * unit[1], 0, 1e-9);
            }
        }
        assert.ok(phasesForRhythm(rhythm.id).length >= (rhythm.id === 'vf' ? 1 : 4));
        assert.ok(traceSegmentsForRhythm(rhythm.id).length >= 1);
        assert.ok(Array.isArray(traceAnnotationsForRhythm(rhythm.id, 'II')));
        assert.ok(vectorLoopPath('frontal', 480, 474, 100, 0, rhythm.id).startsWith('M'));
    }
});

test('arrhythmias and conduction blocks match expected clinical ECG morphologies', () => {
    // AV block 1: prolonged PR interval (> 200 ms), delayed QRS peak around 332 ms, flat prolonged PR segment.
    assert.ok(voltageAt('II', 85, 0, 'av_block_1') > 0.14);
    assert.deepEqual(cardiacVector(210, 0, 'av_block_1'), [0, 0, 0]);
    assert.ok(voltageAt('II', 332, 0, 'av_block_1') > 1.0);
    assert.equal(phaseAt(210, 'av_block_1').id, 'pr');

    // AV block 3: two dissociated P waves (125 ms and 525 ms) + escape QRS around 280 ms.
    assert.ok(voltageAt('II', 125, 0, 'av_block_3') > 0.14);
    assert.ok(voltageAt('II', 525, 0, 'av_block_3') > 0.14);
    assert.ok(voltageAt('II', 285, 0, 'av_block_3') > 0.8);
    assert.equal(phaseAt(125, 'av_block_3').id, 'p');
    assert.equal(phaseAt(525, 'av_block_3').id, 'p2');

    // Atrial fibrillation: no large discrete sinus P wave, undulating chaotic baseline + narrow normal QRS.
    const afibPPeak = Math.max(...Array.from({ length: 100 }, (_, i) => Math.abs(voltageAt('II', 80 + i, 0, 'afib'))));
    assert.ok(afibPPeak < 0.08, `AFib baseline amplitude ${afibPPeak} should stay low`);
    assert.ok(voltageAt('II', 252, 0, 'afib') > 1.0);

    // Atrial flutter: sawtooth inferior waves (negative II/III/aVF peaks) + positive V1 flutter wave before QRS.
    const flutterMinII = Math.min(...Array.from({ length: 200 }, (_, i) => voltageAt('II', i, 0, 'aflutter')));
    const flutterMaxV1 = Math.max(...Array.from({ length: 200 }, (_, i) => voltageAt('V1', i, 0, 'aflutter')));
    assert.ok(flutterMinII < -0.15, `Flutter II min ${flutterMinII} should show negative sawtooth`);
    assert.ok(flutterMaxV1 > 0.05, `Flutter V1 max ${flutterMaxV1} should show positive flutter wave`);
    assert.ok(voltageAt('II', 252, 0, 'aflutter') > 1.0);

    // LBBB: broad QRS >= 120 ms, deep negative V1, tall broad positive V6/I/aVL, discordant T wave.
    assert.ok(voltageAt('V1', 260, 0, 'lbbb') < -0.75);
    assert.ok(voltageAt('V1', 308, 0, 'lbbb') < -0.9);
    assert.ok(voltageAt('V6', 255, 0, 'lbbb') > 0.85);
    assert.ok(voltageAt('V6', 308, 0, 'lbbb') > 1.0);
    assert.ok(voltageAt('I', 308, 0, 'lbbb') > 1.0);
    assert.ok(voltageAt('V6', 480, 0, 'lbbb') < -0.15);
    assert.ok(voltageAt('V1', 480, 0, 'lbbb') > 0.20);

    // RBBB: broad QRS >= 120 ms, rsR' pattern in V1, broad slurred terminal S in V6 and I.
    assert.ok(voltageAt('V1', 222, 0, 'rbbb') > 0.20);
    assert.ok(voltageAt('V1', 252, 0, 'rbbb') < -0.65);
    assert.ok(voltageAt('V1', 305, 0, 'rbbb') > 0.80);
    assert.ok(voltageAt('V6', 252, 0, 'rbbb') > 0.70);
    assert.ok(voltageAt('V6', 305, 0, 'rbbb') < -0.50);
    assert.ok(voltageAt('I', 305, 0, 'rbbb') < -0.50);

    // VT: two fast broad QRS beats per 800 ms loop, northwest extreme axis (aVR+/V1+, I-/II-), discordant T wave.
    assert.equal(axisZoneForAngle(meanQrsAngle(0, 'vt')).id, 'extreme');
    assert.ok(voltageAt('aVR', 120, 0, 'vt') > 0.75);
    assert.ok(voltageAt('aVR', 520, 0, 'vt') > 0.75);
    assert.ok(voltageAt('V1', 120, 0, 'vt') > 0.80);
    assert.ok(voltageAt('I', 120, 0, 'vt') < -0.75);
    assert.ok(voltageAt('II', 120, 0, 'vt') < -0.85);
    assert.ok(voltageAt('V1', 280, 0, 'vt') < -0.15);

    // VF: continuous chaotic undulating oscillations with no organized phases/QRS/flat pause.
    assert.equal(phasesForRhythm('vf').length, 1);
    assert.equal(phaseAt(100, 'vf').short, 'VF · Kaos');
    for (const start of [0, 200, 400, 600]) {
        const peak = Math.max(...Array.from({ length: 200 }, (_, i) => Math.abs(voltageAt('II', start + i, 0, 'vf'))));
        assert.ok(peak > 0.25 && peak < 1.2, `VF quarter ${start}ms peak ${peak} should oscillate visibly`);
    }
});

test('all 20 clinical conditions have valid categories and characteristic waveforms', () => {
    assert.equal(Object.keys(RHYTHM_PRESETS).length, 20);
    for (const preset of Object.values(RHYTHM_PRESETS)) {
        assert.ok(['rytme', 'iskemi', 'elektrolyt', 'struktur'].includes(preset.category), `${preset.id} missing valid category`);
    }

    // Mobitz I (Wenckebach): progressive PR lengthening (QRS1 around 195ms, QRS2 around 575ms) + blocked P3 at 735ms
    assert.ok(voltageAt('II', 52, 0, 'av_block_2_wenckebach') > 0.12);
    assert.ok(voltageAt('II', 195, 0, 'av_block_2_wenckebach') > 0.8);
    assert.ok(voltageAt('II', 575, 0, 'av_block_2_wenckebach') > 0.8);
    assert.ok(voltageAt('II', 735, 0, 'av_block_2_wenckebach') > 0.12);
    assert.deepEqual(cardiacVector(780, 0, 'av_block_2_wenckebach'), [0, 0, 0]);

    // Mobitz II: constant PR on two conducted beats (QRS1 ~198ms, QRS2 ~488ms) + dropped P3 around 638ms
    assert.ok(voltageAt('II', 198, 0, 'av_block_2_mobitz2') > 0.8);
    assert.ok(voltageAt('II', 488, 0, 'av_block_2_mobitz2') > 0.8);
    assert.ok(voltageAt('II', 638, 0, 'av_block_2_mobitz2') > 0.12);
    assert.deepEqual(cardiacVector(720, 0, 'av_block_2_mobitz2'), [0, 0, 0]);

    // Anterior STEMI: ST elevation in V2/V3 (> +0.35mV at 350ms) and reciprocal ST depression in II/III
    assert.ok(voltageAt('V2', 350, 0, 'anterior_stemi') > 0.35);
    assert.ok(voltageAt('V3', 350, 0, 'anterior_stemi') > 0.35);
    assert.ok(voltageAt('III', 350, 0, 'anterior_stemi') < -0.15);

    // Inferior STEMI: ST elevation in II/III/aVF (III > II) and reciprocal ST depression in aVL
    assert.ok(voltageAt('II', 350, 0, 'inferior_stemi') > 0.25);
    assert.ok(voltageAt('III', 350, 0, 'inferior_stemi') > voltageAt('II', 350, 0, 'inferior_stemi'));
    assert.ok(voltageAt('aVL', 350, 0, 'inferior_stemi') < -0.15);

    // Posterior STEMI: tall anterior R wave + horizontal ST depression in V1-V3
    assert.ok(voltageAt('V2', 240, 0, 'posterior_stemi') > 0.50);
    assert.ok(voltageAt('V2', 360, 0, 'posterior_stemi') < -0.25);

    // Pericarditis: PR depression in II, diffuse ST elevation in II and V5, reciprocal ST depression in aVR
    assert.ok(voltageAt('II', 178, 0, 'pericarditis') < -0.04);
    assert.ok(voltageAt('II', 340, 0, 'pericarditis') > 0.20);
    assert.ok(voltageAt('V5', 340, 0, 'pericarditis') > 0.18);
    assert.ok(voltageAt('aVR', 340, 0, 'pericarditis') < -0.15);

    // Long QTc: prolonged ST segment & late T-wave peak near 585ms
    assert.ok(voltageAt('II', 370, 0, 'long_qtc') < 0.08);
    assert.ok(voltageAt('II', 585, 0, 'long_qtc') > 0.30);

    // Hyperkalemia: flattened P wave, broad QRS, tall peaked T wave at 420ms
    assert.ok(voltageAt('II', 130, 0, 'hyperkalemia') < 0.06);
    assert.ok(voltageAt('V3', 420, 0, 'hyperkalemia') > 0.70);

    // Hypokalemia: flat T wave at 420ms followed by prominent U wave around 570ms
    assert.ok(voltageAt('V3', 420, 0, 'hypokalemia') < 0.12);
    assert.ok(voltageAt('V3', 570, 0, 'hypokalemia') > voltageAt('V3', 420, 0, 'hypokalemia') * 2);

    // LVH: deep S in V1, tall R in V5/V6 (Sokolow-Lyon > 2.8mV), discordant strain ST-T
    assert.ok(voltageAt('V1', 270, 0, 'lvh') < -1.2);
    assert.ok(voltageAt('V6', 270, 0, 'lvh') > 1.2);
    assert.ok(voltageAt('V6', 475, 0, 'lvh') < -0.15);

    // Pulmonary embolism: RAD (> 90 deg), deep terminal S in I, initial Q & inverted T in III + T inversion in V1
    assert.equal(axisZoneForAngle(meanQrsAngle(0, 'pulmonary_embolism')).id, 'rad');
    assert.ok(voltageAt('I', 274, 0, 'pulmonary_embolism') < -0.45);
    assert.ok(voltageAt('III', 222, 0, 'pulmonary_embolism') < -0.20);
    assert.ok(voltageAt('III', 450, 0, 'pulmonary_embolism') < -0.15);
    assert.ok(voltageAt('V1', 450, 0, 'pulmonary_embolism') < -0.20);
});
