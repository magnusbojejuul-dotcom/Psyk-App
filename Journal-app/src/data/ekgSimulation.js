// Teaching dipole model. x = patient left, y = inferior, z = anterior.
// Every trace and displayed projection samples this same time-dependent vector.
// Chest axes are illustrative, not standardized electrode angles or a torso solver.
export const CYCLE_MS = 800;
const radians = angle => angle * Math.PI / 180;
const frontal = (angle, gain = 1) => [Math.cos(radians(angle)) * gain, Math.sin(radians(angle)) * gain, 0];
const chest = angle => [Math.cos(radians(angle)), 0, Math.sin(radians(angle))];
const augmentedGain = Math.sqrt(3) / 2;

export const MODEL_LEADS = {
    I: { plane: 'frontal', angle: 0, axis: frontal(0), region: 'Lateral', positive: 'Venstre arm', reference: 'Højre arm', placement: 'Venstre arm (+) − højre arm (−).' },
    II: { plane: 'frontal', angle: 60, axis: frontal(60), region: 'Inferior', positive: 'Venstre ben', reference: 'Højre arm', placement: 'Venstre ben (+) − højre arm (−).' },
    III: { plane: 'frontal', angle: 120, axis: frontal(120), region: 'Inferior', positive: 'Venstre ben', reference: 'Venstre arm', placement: 'Venstre ben (+) − venstre arm (−).' },
    aVR: { plane: 'frontal', angle: -150, axis: frontal(-150, augmentedGain), region: 'Højre skulder', positive: 'Højre arm', reference: 'Gennemsnit af venstre arm og ben', placement: 'Højre arm måles mod gennemsnittet af venstre arm og venstre ben.' },
    aVL: { plane: 'frontal', angle: -30, axis: frontal(-30, augmentedGain), region: 'Høj lateral', positive: 'Venstre arm', reference: 'Gennemsnit af højre arm og venstre ben', placement: 'Venstre arm måles mod gennemsnittet af højre arm og venstre ben.' },
    aVF: { plane: 'frontal', angle: 90, axis: frontal(90, augmentedGain), region: 'Inferior', positive: 'Venstre ben', reference: 'Gennemsnit af begge arme', placement: 'Venstre ben måles mod gennemsnittet af højre og venstre arm.' },
    V1: { plane: 'horizontal', angle: 120, axis: chest(120), region: 'Højre / septal', positive: 'V1', reference: 'Wilsons centrale terminal', placement: '4. interkostalrum ved højre sternalrand.' },
    V2: { plane: 'horizontal', angle: 100, axis: chest(100), region: 'Septal', positive: 'V2', reference: 'Wilsons centrale terminal', placement: '4. interkostalrum ved venstre sternalrand.' },
    V3: { plane: 'horizontal', angle: 75, axis: chest(75), region: 'Anterior', positive: 'V3', reference: 'Wilsons centrale terminal', placement: 'Midt mellem V2 og V4.' },
    V4: { plane: 'horizontal', angle: 50, axis: chest(50), region: 'Anterior / apeks', positive: 'V4', reference: 'Wilsons centrale terminal', placement: '5. interkostalrum i venstre medioklavikulærlinje.' },
    V5: { plane: 'horizontal', angle: 25, axis: chest(25), region: 'Lateral', positive: 'V5', reference: 'Wilsons centrale terminal', placement: 'Venstre forreste aksillærlinje, i samme vandrette niveau som V4.' },
    V6: { plane: 'horizontal', angle: 0, axis: chest(0), region: 'Lateral', positive: 'V6', reference: 'Wilsons centrale terminal', placement: 'Venstre midterste aksillærlinje, i samme vandrette niveau som V4.' },
};

export const PHASES = [
    { id: 'p', start: 80, end: 180, time: 130, short: 'P', name: 'Atrierne aktiveres', color: '#527dd0', description: 'Impulsen starter i sinusknuden og breder sig gennem højre og venstre atrium mod AV-knuden.' },
    { id: 'pr', start: 180, end: 210, time: 195, short: 'PR', name: 'Forsinkelse i AV-knuden', color: '#73828a', description: 'Ledningen bremses i AV-knuden. Atrierne er aktiverede, mens ventriklerne endnu venter. PR-segmentet er næsten fladt; det er kun en del af hele PR-intervallet.' },
    { id: 'septal', start: 210, end: 230, time: 220, short: 'QRS · 1', name: 'Septum aktiveres først', color: '#c78b2e', description: 'Septum aktiveres fra venstre mod højre. Det kan give en lille r-tak i V1 og en lille q-tak i venstresidige afledninger.' },
    { id: 'ventricular', start: 230, end: 270, time: 252, short: 'QRS · 2', name: 'Ventriklerne aktiveres', color: '#d66650', description: 'Impulsen løber via grenbundter og Purkinje-fibre. Ventrikelvæggene aktiveres indefra og ud. Venstre ventrikels større muskelmasse dominerer den samlede elektriske vektor.' },
    { id: 'basal', start: 270, end: 300, time: 280, short: 'QRS · 3', name: 'De sidste områder aktiveres', color: '#9b72b0', description: 'De sidste basale områder af ventriklerne aktiveres. Vektoren ændrer retning og kan give et afsluttende negativt udsving.' },
    { id: 'st', start: 300, end: 380, time: 340, short: 'ST', name: 'Ventriklerne er aktiverede', color: '#73828a', description: 'Ventrikelcellerne er i aktionspotentialets plateaufase. Der er kun lille samlet spændingsforskel, selv om hjertemusklen arbejder.' },
    { id: 't', start: 380, end: 540, time: 460, short: 'T', name: 'Ventriklerne repolariseres', color: '#379984', description: 'Cellerne vender tilbage mod hviletilstanden. Repolarisation forløber overvejende fra epikardium mod endokardium. Både bølgeretning og elektrisk fortegn vender, så T-takken ofte har samme retning som det dominerende QRS.' },
    { id: 'rest', start: 540, end: 800, time: 650, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Ventriklernes muskelceller er tilbage i hviletilstanden. Der er ingen samlet elektrisk vektor i denne forenklede model.' },
];

export const cyclePosition = time => ((time % CYCLE_MS) + CYCLE_MS) % CYCLE_MS;

// Display time is stretched; physiology and ECG sampling keep their original ms.
const LEARNING_SEGMENTS = [
    [0, 80, 600], [80, 180, 2000], [180, 210, 1400],
    [210, 230, 2600], [230, 244, 2200], [244, 270, 3800], [270, 300, 2400],
    [300, 380, 1400], [380, 540, 3000], [540, 800, 1200],
];
const learningPosition = time => {
    let elapsed = 0;
    for (const [start, end, duration] of LEARNING_SEGMENTS) {
        if (time < end) return elapsed + (time - start) / (end - start) * duration;
        elapsed += duration;
    }
    return elapsed;
};

export function advancePlayback(time, elapsedMs, speed = 'study', qrsOnly = false) {
    const start = qrsOnly ? 210 : 0;
    const end = qrsOnly ? 300 : CYCLE_MS;
    const current = time >= start && time < end ? time : start;
    if (speed !== 'study') return start + (current - start + elapsedMs * Number(speed)) % (end - start);
    const first = learningPosition(start);
    const last = learningPosition(end);
    let remaining = first + (learningPosition(current) - first + elapsedMs) % (last - first);
    for (const [from, to, duration] of LEARNING_SEGMENTS) {
        if (remaining < duration) return from + remaining / duration * (to - from);
        remaining -= duration;
    }
    return start;
}
export const phaseAt = time => {
    const t = cyclePosition(time);
    return PHASES.find(phase => t >= phase.start && t < phase.end) || PHASES[7];
};

// A smoothly turning QRS loop, shared by all twelve views of the same beat.
const QRS_KNOTS = [
    [210, 0, 0, 0], [220, -0.12, -0.035, 0.20], [230, 0.04, 0.12, 0.16],
    [238, 0.20, 0.55, 0.60], [252, 0.70, 1.20, -0.45],
    [264, 1.0, 0.55, -0.60], [280, -0.08, -0.17, -0.14], [300, 0, 0, 0],
];

export function cardiacVector(time) {
    const t = cyclePosition(time);
    if (t >= 80 && t < 180) {
        const envelope = Math.sin(Math.PI * (t - 80) / 100) ** 2;
        return [0.10, 0.16, 0.07].map(value => value * envelope);
    }
    if (t >= 210 && t < 300) {
        const index = QRS_KNOTS.findIndex((knot, i) => t >= knot[0] && t < QRS_KNOTS[i + 1]?.[0]);
        const from = QRS_KNOTS[index];
        const to = QRS_KNOTS[index + 1];
        const fraction = (t - from[0]) / (to[0] - from[0]);
        const smooth = fraction * fraction * (3 - 2 * fraction);
        return from.slice(1).map((value, axis) => value + (to[axis + 1] - value) * smooth);
    }
    if (t >= 380 && t < 540) {
        const envelope = Math.sin(Math.PI * (t - 380) / 160) ** 2;
        return [0.28, 0.38, 0.10].map(value => value * envelope);
    }
    return [0, 0, 0];
}

export function voltageAt(lead, time) {
    const axis = (MODEL_LEADS[lead] || MODEL_LEADS.II).axis;
    return cardiacVector(time).reduce((sum, value, index) => sum + value * axis[index], 0);
}

export function projectionAt(lead, time) {
    const details = MODEL_LEADS[lead] || MODEL_LEADS.II;
    const vector = cardiacVector(time);
    const visibleVector = [vector[0], vector[details.plane === 'frontal' ? 1 : 2]];
    const unit = [Math.cos(radians(details.angle)), Math.sin(radians(details.angle))];
    const length = visibleVector[0] * unit[0] + visibleVector[1] * unit[1];
    return { vector: visibleVector, unit, point: unit.map(value => value * length), voltage: voltageAt(lead, time) };
}

export function waveformPath(lead, width = 400, baseline = 100, gain = 56) {
    const points = [];
    for (let time = 0; time <= CYCLE_MS; time += 2) {
        points.push(`${time === 0 ? 'M' : 'L'}${(time / CYCLE_MS * width).toFixed(2)},${(baseline - voltageAt(lead, time) * gain).toFixed(2)}`);
    }
    return points.join(' ');
}
