import test from 'node:test';
import assert from 'node:assert/strict';
import { AXIS_PRESETS, MODEL_LEADS, PHASES, advancePlayback, axisZoneForAngle, cardiacVector, meanQrsAngle, phaseAt, projectionAt, vectorLoopPath, voltageAt, waveformPath } from './ekgSimulation.js';

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
