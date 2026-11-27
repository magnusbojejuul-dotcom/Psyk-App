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
    [0, 80, 700], [80, 180, 3400], [180, 210, 1800],
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
export const phaseAt = (time, rhythmId = 'normal') => {
    const t = cyclePosition(time);
    const list = phasesForRhythm(rhythmId);
    return list.find(phase => t >= phase.start && t < phase.end) || list[list.length - 1];
};

// A smoothly turning QRS loop, shared by all twelve views of the same beat.
const QRS_KNOTS = [
    [210, 0, 0, 0], [220, -0.12, -0.035, 0.20], [230, 0.04, 0.12, 0.16],
    [238, 0.20, 0.55, 0.60], [252, 0.70, 1.20, -0.45],
    [264, 1.0, 0.55, -0.60], [280, -0.08, -0.17, -0.14], [300, 0, 0, 0],
];

// Broad QRS knots (145 ms) for LBBB: loss of normal LV-to-RV septal vector, deep QS in V1, broad notched R in V6/I/aVL.
const LBBB_KNOTS = [
    [210, 0, 0, 0], [228, 0.22, -0.08, -0.18], [255, 0.95, -0.25, -0.65],
    [280, 0.78, -0.18, -0.52], [308, 1.10, -0.34, -0.78],
    [332, 0.55, -0.16, -0.40], [355, 0, 0, 0],
];

// Broad QRS knots (145 ms) for RBBB: normal early LV activation followed by slow anterior-right RV terminal wave (rsR' in V1, slurred S in V6/I).
const RBBB_KNOTS = [
    [210, 0, 0, 0], [222, -0.12, -0.035, 0.26], [236, 0.12, 0.25, 0.05],
    [252, 0.80, 0.95, -0.50], [272, 0.22, 0.15, 0.08],
    [300, -0.68, 0.18, 0.78], [326, -0.55, 0.14, 0.64], [355, 0, 0, 0],
];

// Broad escape QRS (120 ms) in 3rd-degree AV block (lower junctional / fascicular escape focus).
const ESCAPE_KNOTS = [
    [220, 0, 0, 0], [238, -0.10, 0.08, 0.18], [268, 0.52, 0.92, -0.32],
    [304, 0.72, 0.60, -0.45], [326, -0.22, -0.10, 0.22], [340, 0, 0, 0],
];

// Continuous monomorphic VT cycle (400 ms beat window -> 150 bpm): broad northwest/anterior-right QRS flowing directly into discordant ST-T without flat plateaus.
const VT_CYCLE_KNOTS = [
    [0, 0, 0, 0],
    [16, -0.05, -0.04, 0.04],
    [48, -0.34, -0.28, 0.28],
    [88, -0.86, -0.74, 0.66],
    [122, -0.95, -0.80, 0.72],
    [154, -0.44, -0.37, 0.34],
    [186, 0.02, 0.02, -0.02],
    [224, 0.15, 0.13, -0.12],
    [282, 0.30, 0.26, -0.24],
    [336, 0.16, 0.14, -0.13],
    [376, 0.02, 0.02, -0.02],
    [400, 0, 0, 0],
];

// Ventricular hypertrophy / ischemia / electrolyte QRS knot variants
const ANTERIOR_STEMI_QRS_KNOTS = [
    [210, 0, 0, 0], [222, -0.06, 0.04, -0.24], [238, 0.16, 0.32, -0.22],
    [254, 0.72, 0.88, -0.36], [268, 0.84, 0.44, -0.24], [284, 0.10, -0.08, 0.16], [300, 0, 0, 0],
];

const INFERIOR_STEMI_QRS_KNOTS = [
    [210, 0, 0, 0], [224, -0.08, -0.26, 0.16], [238, 0.14, -0.12, 0.32],
    [254, 0.62, 0.92, -0.40], [270, 0.72, 0.48, -0.36], [286, -0.04, -0.10, -0.04], [300, 0, 0, 0],
];

const POSTERIOR_STEMI_QRS_KNOTS = [
    [210, 0, 0, 0], [222, -0.08, 0.02, 0.32], [238, 0.14, 0.36, 0.68],
    [254, 0.56, 0.95, 0.52], [268, 0.72, 0.48, -0.18], [284, -0.06, -0.14, -0.14], [300, 0, 0, 0],
];

const HYPERK_QRS_KNOTS = [
    [205, 0, 0, 0], [225, -0.12, -0.04, 0.16], [248, 0.16, 0.38, 0.30],
    [270, 0.64, 0.96, -0.42], [295, 0.74, 0.44, -0.48], [316, -0.24, -0.18, -0.08], [335, 0, 0, 0],
];

const LVH_KNOTS = [
    [210, 0, 0, 0], [222, -0.16, -0.04, 0.24], [234, 0.18, 0.14, 0.10],
    [252, 1.38, 0.94, -1.04], [270, 1.56, 0.38, -1.16], [290, -0.12, -0.18, -0.18], [308, 0, 0, 0],
];

// Acute PE (SI QIII TIII + right axis deviation > +90° + terminal S in I/V6).
const PE_KNOTS = [
    [210, 0, 0, 0], [222, 0.22, -0.24, 0.12], [236, -0.08, 0.35, 0.26],
    [252, 0.10, 1.08, 0.18], [272, -0.62, 0.26, 0.24], [290, -0.42, 0.08, 0.12], [304, 0, 0, 0],
];

// Resamples normal QRS_KNOTS cleanly into any [start, start + width] interval (e.g. Wenckebach/Mobitz II multi-beat views).
function sampleNormalQrs(t, start, width = 90) {
    if (t < start || t >= start + width) return [0, 0, 0];
    const mapped = 210 + ((t - start) / width) * 90;
    return evalKnots(mapped, QRS_KNOTS);
}

// Asymmetric discordant ST-T curve starting cleanly from the end of QRS (no artificial flat shelf).
function discordantStT(t, start, end, peakVec, axisOffsetDeg = 0) {
    if (t < start || t >= end) return [0, 0, 0];
    const p = (t - start) / (end - start);
    const env = Math.sin(Math.PI * p) ** 1.45 * (0.75 + 0.5 * p);
    return rotateFrontal(peakVec.map(v => v * env), axisOffsetDeg * 0.45);
}

// STEMI convex ST-elevation blending smoothly from J-point into hyperacute T-wave (or reciprocal negative injury).
function stemiInjuryStT(t, jStart, end, peakVec, axisOffsetDeg = 0) {
    if (t < jStart || t >= end) return [0, 0, 0];
    const p = (t - jStart) / (end - jStart);
    const jRamp = Math.min(1, p * 10);
    const arch = Math.sin(Math.PI * (0.20 + 0.80 * p)) ** 1.15;
    const scale = arch * jRamp;
    return rotateFrontal(peakVec.map(v => v * scale), axisOffsetDeg * 0.45);
}

// Diffuse concave ("hammock") ST-elevation seen in acute pericarditis.
function concaveStT(t, jStart, end, stVec, tVec, axisOffsetDeg = 0) {
    if (t < jStart || t >= end) return [0, 0, 0];
    const p = (t - jStart) / (end - jStart);
    const stEnv = p < 0.6 ? Math.sin(Math.PI * Math.min(1, p / 0.6) * 0.65) ** 0.72 : Math.max(0, 1 - (p - 0.6) / 0.4);
    const tEnv = p > 0.3 ? Math.sin(Math.PI * ((p - 0.3) / 0.7)) ** 2 : 0;
    const vec = [
        stVec[0] * stEnv + tVec[0] * tEnv,
        stVec[1] * stEnv + tVec[1] * tEnv,
        stVec[2] * stEnv + tVec[2] * tEnv,
    ];
    return rotateFrontal(vec, axisOffsetDeg * 0.45);
}

function evalKnots(t, knots) {
    const start = knots[0][0];
    const end = knots[knots.length - 1][0];
    if (t < start || t >= end) return [0, 0, 0];
    const index = knots.findIndex((knot, i) => t >= knot[0] && t < knots[i + 1]?.[0]);
    if (index < 0) return [0, 0, 0];
    const from = knots[index];
    const to = knots[index + 1];
    const fraction = (t - from[0]) / (to[0] - from[0]);
    const smooth = fraction * fraction * (3 - 2 * fraction);
    return from.slice(1).map((value, axis) => value + (to[axis + 1] - value) * smooth);
}

function addVec(a, b) {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function pWaveEnvelope(t, start, width = 100) {
    if (t < start || t >= start + width) return [0, 0, 0];
    const env = Math.sin(Math.PI * (t - start) / width) ** 2;
    return [0.10 * env, 0.16 * env, 0.07 * env];
}

function tWaveEnvelope(t, start, width = 160, base = [0.28, 0.38, 0.10], axisOffsetDeg = 0) {
    if (t < start || t >= start + width) return [0, 0, 0];
    const env = Math.sin(Math.PI * (t - start) / width) ** 2;
    return rotateFrontal(base.map(v => v * env), axisOffsetDeg * 0.45);
}

export const RHYTHM_CATEGORIES = [
    { id: 'rytme', label: 'Rytme & Overledning' },
    { id: 'iskemi', label: 'Iskæmi & Perikarditis' },
    { id: 'elektrolyt', label: 'Elektrolyt & Medicin' },
    { id: 'struktur', label: 'Belastning & Hypertrofi' },
];

export const RHYTHM_PRESETS = {
    normal: {
        id: 'normal',
        category: 'rytme',
        label: 'Normal sinusrytme',
        short: 'Normal',
        badge: '75 bpm · Normal',
        color: '#2f7a62',
        qrsWindow: [210, 300],
        causeTitle: 'Normal elektrisk overledning',
        causeBody: 'Impulsen starter i sinusknuden, forsinkes kortvarigt i AV-knuden og løber hurtigt via His-bundtet og begge grenbundter ud i ventriklerne.',
        ecgHallmarks: 'Regelmæssig P-tak før hvert smalt QRS-kompleks (< 120 ms), konstant PR-interval (120–200 ms) og konkordant T-tak.',
        recommendedLeads: ['II', 'V1', 'V6'],
    },
    afib: {
        id: 'afib',
        category: 'rytme',
        label: 'Atrieflimren',
        short: 'Atrieflimren',
        badge: 'Ingen P · f-takker',
        color: '#7c5cbf',
        qrsWindow: [210, 300],
        causeTitle: 'Kaotiske ektopiske foci i atrierne',
        causeBody: 'Mange små foci (ofte omkring lungevenerne i venstre atrium) fyrer kaotisk 350–600/min. Atrierne trækker sig ikke samlet sammen, og AV-knuden lukker kun udvalgte impulser igennem.',
        ecgHallmarks: 'Manglende P-takker, finkornet uregelmæssig basislinje (f-takker, tydeligst i V1 og II) samt smalle QRS-komplekser. Klinisk ses uregelmæssige RR-intervaller.',
        recommendedLeads: ['II', 'V1'],
    },
    aflutter: {
        id: 'aflutter',
        category: 'rytme',
        label: 'Atrieflagren',
        short: 'Atrieflagren',
        badge: '300/min savtak · Reentry',
        color: '#2b78b8',
        qrsWindow: [210, 300],
        causeTitle: 'Makro-reentry-cirkel i højre atrium',
        causeBody: 'En enkelt stabil elektrisk cirkelbølge løber hurtigt mod uret i højre atrium (~300/min). AV-knuden fungerer som filter og overleder kun hver 2.–4. bølge til ventriklerne.',
        ecgHallmarks: 'Savtakkede flagrebølger (F-takker) uden flad basislinje imellem — typisk negative i II, III og aVF og positive takker i V1.',
        recommendedLeads: ['II', 'III', 'aVF', 'V1'],
    },
    av_block_1: {
        id: 'av_block_1',
        category: 'rytme',
        label: '1. grads AV-blok',
        short: 'AV-blok I',
        badge: 'PR > 200 ms',
        color: '#d48817',
        qrsWindow: [290, 380],
        causeTitle: 'Forsinket ledning gennem AV-knuden',
        causeBody: 'Alle impulser fra sinusknuden slipper igennem AV-knuden, men forsinkelsen er længere end normalt. Derefter ledes impulsen normalt gennem His-Purkinje-systemet.',
        ecgHallmarks: 'Forlænget, men konstant PR-interval (> 0,20 s / > 5 små tern). Hver P-tak efterfølges fortsat af et smalt QRS-kompleks.',
        recommendedLeads: ['II', 'V1'],
    },
    av_block_2_wenckebach: {
        id: 'av_block_2_wenckebach',
        category: 'rytme',
        label: '2. grads AV-blok Mobitz type I (Wenckebach)',
        short: 'Mobitz I',
        badge: 'Progressiv PR · P udfald',
        color: '#d97706',
        qrsWindow: [155, 235],
        causeTitle: 'Tiltagende træthed i AV-knuden (Wenckebach)',
        causeBody: 'AV-knuden udtrættes for hvert slag og leder impulsen langsommere og langsommere igennem, indtil én P-tak til sidst blokeres helt og et QRS-kompleks springes over.',
        ecgHallmarks: 'Progressivt længere PR-interval (130 → 215 ms) efterfulgt af en ikke-overledt P-tak uden QRS, hvorefter cyklussen starter forfra.',
        recommendedLeads: ['II', 'V1'],
    },
    av_block_2_mobitz2: {
        id: 'av_block_2_mobitz2',
        category: 'rytme',
        label: '2. grads AV-blok Mobitz type II',
        short: 'Mobitz II',
        badge: 'Konstant PR · Pludseligt udfald',
        color: '#dc2626',
        qrsWindow: [160, 235],
        causeTitle: 'Intermitterende totalstop i His-Purkinje-systemet',
        causeBody: 'Overledningen under AV-knuden (His-bundtet / begge grenbundter) svigter pludseligt uden varsel — uden forudgående træthed eller gradvis forsinkelse.',
        ecgHallmarks: 'Konstant PR-interval på alle overledte slag (140 ms), afbrudt af pludseligt udfald af et QRS efter en normal P-tak. Høj risiko for progression til 3. grads AV-blok.',
        recommendedLeads: ['II', 'V1'],
    },
    av_block_3: {
        id: 'av_block_3',
        category: 'rytme',
        label: '3. grads AV-blok (totalblok)',
        short: 'AV-blok III',
        badge: 'Totalblok · Dissociation',
        color: '#c43b47',
        qrsWindow: [220, 340],
        causeTitle: 'Komplet blokade i AV-knude / His-bundt',
        causeBody: 'Ingen atriale impulser slipper ned til ventriklerne. Atrierne slår i én takt (P-takker), mens et langsommere erstatningsfokus under blokaden selv driver ventriklerne.',
        ecgHallmarks: 'AV-dissociation: Regelmæssige P-takker marcherer uafhængigt hen over kurven uden fast sammenhæng med de langsomme erstatnings-QRS-komplekser.',
        recommendedLeads: ['II', 'V1'],
    },
    lbbb: {
        id: 'lbbb',
        category: 'rytme',
        label: 'Venstresidigt grenblok (LBBB)',
        short: 'LBBB',
        badge: 'Bredt QRS ≥ 120 ms · V6 +',
        color: '#8b5cf6',
        qrsWindow: [210, 355],
        causeTitle: 'Blokade i venstre grenbundt',
        causeBody: 'Venstre grenbundt leder ikke impulsen. Højre ventrikel aktiveres først via højre gren, hvorefter impulsen krydser langsomt celle-for-celle gennem septum og venstre ventrikel.',
        ecgHallmarks: 'Bredt QRS (≥ 120 ms), dyb QS/rS i V1, bred evt. indkærvet R-tak i I, aVL og V6 samt sekundær diskordant ST-T-forandring.',
        recommendedLeads: ['V1', 'V6', 'I', 'aVL'],
    },
    rbbb: {
        id: 'rbbb',
        category: 'rytme',
        label: 'Højresidigt grenblok (RBBB)',
        short: 'RBBB',
        badge: 'Bredt QRS ≥ 120 ms · rsR′ V1',
        color: '#0ea5e9',
        qrsWindow: [210, 355],
        causeTitle: 'Blokade i højre grenbundt',
        causeBody: 'Højre grenbundt er blokeret. Venstre ventrikel aktiveres først og normalt via venstre gren; derefter breder depolariseringen sig langsomt over til højre ventrikel.',
        ecgHallmarks: 'Bredt QRS (≥ 120 ms), M-formet rsR′-mønster ("kaninører") i V1–V2 og bred sløret S-tak i I, aVL, V5 og V6.',
        recommendedLeads: ['V1', 'V2', 'I', 'V6'],
    },
    vt: {
        id: 'vt',
        category: 'rytme',
        label: 'Ventrikulær takykardi (VT)',
        short: 'VT',
        badge: '150 bpm · Bredt QRS',
        color: '#dc2626',
        qrsWindow: [10, 190],
        causeTitle: 'Hurtigt ektopisk fokus i venstre ventrikel',
        causeBody: 'Et irritabelt fokus direkte i ventriklens muskelvæg fyrer hurtigt (~150/min) uden om Purkinje-nettet. Impulsen spreder sig langsomt fra muskelcelle til muskelcelle.',
        ecgHallmarks: 'Hurtig regelmæssig bredkomplekset takykardi (QRS ≥ 120 ms), ekstrem akse (positiv i aVR/V1, negativ i I/II/V6) og diskordante T-takker.',
        recommendedLeads: ['II', 'aVR', 'V1', 'V6'],
    },
    vf: {
        id: 'vf',
        category: 'rytme',
        label: 'Ventrikelflimren (VF)',
        short: 'VF',
        badge: 'Hjertestop · Kaotisk',
        color: '#b91c1c',
        qrsWindow: [0, 800],
        causeTitle: 'Kaotisk elektrisk flimren i hele ventrikelvæggen',
        causeBody: 'Utallige kaotiske mikro-reentry-bølger løber usynkront gennem begge ventrikler. Hjertet står mekanisk stille (hjertestop) uden pumpefunktion.',
        ecgHallmarks: 'Fuldstændig uregelmæssige, bølgede svingninger af varierende amplitude uden identificerbare P-takker, QRS-komplekser eller T-takker. Kræver øjeblikkelig defibrillering og HLR.',
        recommendedLeads: ['II', 'V1', 'V2'],
    },
    anterior_stemi: {
        id: 'anterior_stemi',
        category: 'iskemi',
        label: 'Akut forvægsinfarkt (Anterior STEMI)',
        short: 'Ant. STEMI',
        badge: 'ST-elevation V1–V4 · LAD',
        color: '#dc2626',
        qrsWindow: [210, 300],
        causeTitle: 'Okklusion af LAD (venstre forvægsarterie)',
        causeBody: 'Transmural iskæmi i venstre ventrikels forvæg og forreste septum danner en skadesstrøm rettet direkte fremad mod brystkassen (V2–V4).',
        ecgHallmarks: 'Kraftig konveks ST-elevation i V1–V4, begyndende patologiske Q-takker og reciprok ST-depression i de inferiore afledninger (II, III, aVF).',
        recommendedLeads: ['V2', 'V3', 'V4', 'II'],
    },
    inferior_stemi: {
        id: 'inferior_stemi',
        category: 'iskemi',
        label: 'Akut inferiort infarkt (Inferior STEMI)',
        short: 'Inf. STEMI',
        badge: 'ST-elevation II, III, aVF · RCA',
        color: '#b91c1c',
        qrsWindow: [210, 300],
        causeTitle: 'Okklusion i RCA / inferiore bagvæg',
        causeBody: 'Transmural iskæmi i hjertets nedre diafragmatiske flade giver en skadesstrøm, der peger nedad mod II, III og aVF og væk fra venstre skulder (aVL).',
        ecgHallmarks: 'Markant ST-elevation i II, III og aVF (oftest III > II ved RCA) samt tidlig reciprok ST-depression i aVL og I.',
        recommendedLeads: ['II', 'III', 'aVF', 'aVL'],
    },
    posterior_stemi: {
        id: 'posterior_stemi',
        category: 'iskemi',
        label: 'Akut posteriort infarkt (Posterior STEMI)',
        short: 'Post. STEMI',
        badge: 'ST-depr. & høj R i V1–V3',
        color: '#e11d48',
        qrsWindow: [210, 300],
        causeTitle: 'Transmural iskæmi i venstre ventrikels bagvæg',
        causeBody: 'Skadesstrømmen peger bagud (mod V7–V9). Set fra de forreste brystkasseafledninger (V1–V3) ses infarktet spejlvendt.',
        ecgHallmarks: 'Horisontal ST-depression og unormalt høje brede R-takker i V1–V3 (spejlbillede af posterior Q-tak og ST-elevation) — bekræftes med V7–V9.',
        recommendedLeads: ['V1', 'V2', 'V3'],
    },
    pericarditis: {
        id: 'pericarditis',
        category: 'iskemi',
        label: 'Akut perikarditis',
        short: 'Perikarditis',
        badge: 'Diffus konkav ST-el. · PR-depr.',
        color: '#0d9488',
        qrsWindow: [210, 300],
        causeTitle: 'Diffus inflammation i hjertesækken (perikardiet)',
        causeBody: 'Overfladisk irritation af hele epikardiet omkring både højre og venstre ventrikel giver en diffus udadrettet skadesstrøm uden respekt for kranspulsåre-grænser.',
        ecgHallmarks: 'Udbredt konkav ("hængekøje-formet") ST-elevation i mange afledninger (I, II, aVF, V2–V6), samtidig PR-depression og reciprok ST-depression i aVR.',
        recommendedLeads: ['II', 'V5', 'V6', 'aVR'],
    },
    long_qtc: {
        id: 'long_qtc',
        category: 'elektrolyt',
        label: 'Forlænget QTc (Medicin / Kanalopati)',
        short: 'Langt QTc',
        badge: 'QTc > 500 ms · TdP-risiko',
        color: '#7c3aed',
        qrsWindow: [210, 295],
        causeTitle: 'Forsinket ventrikulær repolarisering (IKr-blokade)',
        causeBody: 'Psykofarmaka (fx visse antipsykotika/antidepressiva) eller genetik bremser kalium-udstrømningen i fase 3, så aktionspotentialet og T-takken forlænges markant.',
        ecgHallmarks: 'Forlænget QT-interval (QTc > 480–500 ms; bred forsinket T-tak). Risiko for tidlige efterdepolariseringer og Torsades de Pointes.',
        recommendedLeads: ['II', 'V2', 'V5'],
    },
    hyperkalemia: {
        id: 'hyperkalemia',
        category: 'elektrolyt',
        label: 'Hyperkaliæmi',
        short: 'Hyper-K⁺',
        badge: 'Spids telt-T · Bredt QRS',
        color: '#ea580c',
        qrsWindow: [205, 335],
        causeTitle: 'Forhøjet ekstracellulært kalium påvirker hele myokardiet',
        causeBody: 'Øget K⁺ uden for cellerne sænker hvilemembranpotentialet, hæmmer hurtige Na⁺-kanaler (bredere QRS, svag P-tak) og accelererer fase-3 repolariseringen.',
        ecgHallmarks: 'Høje, smalle og spidse symmetriske ("teltformede") T-takker, affladet/manglende P-tak og gradvist breddeøget QRS.',
        recommendedLeads: ['V2', 'V3', 'V4', 'II'],
    },
    hypokalemia: {
        id: 'hypokalemia',
        category: 'elektrolyt',
        label: 'Hypokaliæmi',
        short: 'Hypo-K⁺',
        badge: 'Flad T + stor U-tak',
        color: '#0284c7',
        qrsWindow: [195, 280],
        causeTitle: 'Lavt K⁺ forsinker sen repolarisering i Purkinje-fibre',
        causeBody: 'Mangel på kalium nedsætter repolariseringsstrømmen (IKr) og øger efter-repolariseringen i his-purkinje-systemet, så T- og U-tak smelter sammen.',
        ecgHallmarks: 'Diskret ST-depression, affladiget/inverteret T-tak og prominerende U-takker (tydeligst i prækordialafledningerne V2–V4) — giver falsk langt "QU"-interval.',
        recommendedLeads: ['V2', 'V3', 'V4', 'II'],
    },
    lvh: {
        id: 'lvh',
        category: 'struktur',
        label: 'Venstre ventrikelhypertrofi (LVH)',
        short: 'LVH + strain',
        badge: 'Sokolow > 35 mm · LV-strain',
        color: '#b45309',
        qrsWindow: [210, 308],
        causeTitle: 'Fortykket muskelvæg i venstre ventrikel',
        causeBody: 'Langvarig trykbelastning (fx hypertension eller aortastenose) giver øget muskelmasse i venstre ventrikel og subendokardiel relativ iskæmi under repolariseringen.',
        ecgHallmarks: 'Meget høje R-takker i V5–V6/I/aVL og dybe S-takker i V1–V2 (Sokolow-Lyon ≥ 35 mm) samt asymmetrisk ST-depression og T-inversion ("LV-strain") i I, aVL, V5–V6.',
        recommendedLeads: ['V1', 'V5', 'V6', 'aVL'],
    },
    pulmonary_embolism: {
        id: 'pulmonary_embolism',
        category: 'struktur',
        label: 'Akut lungeemboli (Cor Pulmonale)',
        short: 'Lungeemboli',
        badge: 'SI QIII TIII · RV-strain',
        color: '#0369a1',
        qrsWindow: [210, 304],
        causeTitle: 'Akut trykbelastning og dilatation af højre ventrikel',
        causeBody: 'En blodprop i lungekredsløbet øger trykket akut i højre ventrikel. Den elektriske akse drejer mod højre (RAD), og højre væg får belastningsiskæmi.',
        ecgHallmarks: 'Sinustakykardi, højredrejet akse og evt. SI QIII TIII-mønster (dyb S i I, Q-tak i III, negativ T i III) samt T-inversion i V1–V3.',
        recommendedLeads: ['I', 'III', 'V1', 'V2'],
    },
};

const RHYTHM_PHASES = {
    afib: [
        { id: 'p', start: 0, end: 210, time: 130, short: 'f-tak', name: 'Kaotisk atrieflimren', color: '#7c5cbf', description: 'Ingen samlet P-tak: mange ektopiske foci fyrer i atrierne og skaber urolige f-takker i basislinjen, mens AV-knuden beskytter ventriklerne.' },
        ...PHASES.slice(2),
    ],
    aflutter: [
        { id: 'p', start: 0, end: 210, time: 120, short: 'F-tak', name: 'Atriel reentry-cirkel', color: '#2b78b8', description: 'En stabil cirkelbølge drejer ~300/min mod uret i højre atrium (savtakkede F-takker), mens AV-knuden kun overleder udvalgte slag.' },
        ...PHASES.slice(2),
    ],
    av_block_1: [
        { id: 'p', start: 40, end: 130, time: 85, short: 'P', name: 'Atrierne aktiveres', color: '#527dd0', description: 'Sinusimpulsen aktiverer begge atrier normalt.' },
        { id: 'pr', start: 130, end: 290, time: 210, short: 'Lang PR', name: 'Forlænget forsinkelse i AV-knuden', color: '#d48817', description: 'AV-knuden bremser impulsen ekstra længe (PR > 200 ms), før den endelig slipper videre til His-bundtet.' },
        { id: 'septal', start: 290, end: 310, time: 300, short: 'QRS · 1', name: 'Septum aktiveres', color: '#c78b2e', description: 'Efter den lange AV-pause forløber septumaktiveringen normalt.' },
        { id: 'ventricular', start: 310, end: 350, time: 332, short: 'QRS · 2', name: 'Ventriklerne aktiveres', color: '#d66650', description: 'Normal hurtig aktivering via begge grenbundter og Purkinje-fibre.' },
        { id: 'basal', start: 350, end: 380, time: 365, short: 'QRS · 3', name: 'De sidste områder aktiveres', color: '#9b72b0', description: 'Afsluttende normal ventrikelaktivering.' },
        { id: 'st', start: 380, end: 460, time: 420, short: 'ST', name: 'ST-segment (plateau)', color: '#73828a', description: 'Ventriklerne er samlet aktiverede.' },
        { id: 't', start: 460, end: 620, time: 540, short: 'T', name: 'Ventriklerne repolariseres', color: '#379984', description: 'Normal repolarisering efter et forsinket, men smalt QRS.' },
        { id: 'rest', start: 620, end: 800, time: 700, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Fuld elektrisk hvile før næste sinusslag.' },
    ],
    av_block_3: [
        { id: 'p', start: 85, end: 165, time: 125, short: 'P (diss.)', name: 'Uafhængig atrieaktivering', color: '#527dd0', description: 'Sinusknuden aktiverer atrierne i sin egen takt — men blokaden i AV-knuden stopper signalet.' },
        { id: 'pr', start: 165, end: 220, time: 192, short: 'Blok', name: 'Blokeret i AV-knuden', color: '#c43b47', description: 'Totalblok: impulsen fra atrierne når aldrig ned i ventriklerne.' },
        { id: 'ventricular', start: 220, end: 340, time: 280, short: 'Erstatn.', name: 'Ventrikulært erstatningsfokus', color: '#c43b47', description: 'Et sekundært fokus under blokaden overtager og driver ventriklerne langsomt (bredere erstatnings-QRS) helt uden kontakt til atrierne.' },
        { id: 't', start: 355, end: 475, time: 415, short: 'T', name: 'Erstatningsslagets T-tak', color: '#379984', description: 'Ventriklerne repolariseres efter erstatningsimpulsen.' },
        { id: 'p2', start: 475, end: 565, time: 525, short: 'P (blokeret)', name: 'Ny uafhængig P-tak', color: '#527dd0', description: 'Endnu en sinus-P-tak ankommer regelmæssigt midt i diastolen — men blokeres fuldstændigt i AV-knuden og giver intet QRS.' },
        { id: 'rest', start: 565, end: 800, time: 680, short: 'Hvile', name: 'Dissocieret pause', color: '#73828a', description: 'Atrier og ventrikler arbejder helt uafhængigt (AV-dissociation).' },
    ],
    lbbb: [
        PHASES[0],
        PHASES[1],
        { id: 'septal', start: 210, end: 255, time: 235, short: 'RV først', name: 'Højre ventrikel aktiveres først', color: '#c78b2e', description: 'Venstre gren er blokeret. Impulsen går derfor ned i højre gren og krydser omvendt fra højre mod venstre over septum.' },
        { id: 'ventricular', start: 255, end: 320, time: 295, short: 'Langsom LV', name: 'Forsinket celle-til-celle aktivering mod venstre', color: '#8b5cf6', description: 'Venstre ventrikel aktiveres langsomt gennem muskelvæv i stedet for Purkinje-fibre -> bredt QRS og indkærvet R i V6/I.' },
        { id: 'basal', start: 320, end: 355, time: 336, short: 'Afslutning', name: 'Lateral væg afsluttes', color: '#9b72b0', description: 'Sidste del af venstre laterale væg aktiveres (vektor stadig rettet bagud mod venstre).' },
        { id: 'st', start: 355, end: 395, time: 375, short: 'ST', name: 'Tidlig repolarisering', color: '#73828a', description: 'Kort plateau før diskordant repolarisering.' },
        { id: 't', start: 395, end: 565, time: 480, short: 'Disk. T', name: 'Diskordant repolarisering', color: '#379984', description: 'Ændret aktiveringsrækkefølge vender repolariseringen: T-takken er negativ i V6/I/aVL og positiv i V1.' },
        { id: 'rest', start: 565, end: 800, time: 680, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Hviletilstand før næste sinusslag.' },
    ],
    rbbb: [
        PHASES[0],
        PHASES[1],
        { id: 'septal', start: 210, end: 236, time: 222, short: 'Septum (r)', name: 'Normal septumaktivering', color: '#c78b2e', description: 'Venstre grenbundt virker normalt, så septum aktiveres som vanligt fra venstre mod højre (lille r i V1).' },
        { id: 'ventricular', start: 236, end: 272, time: 252, short: 'LV (S)', name: 'Venstre ventrikel aktiveres normalt', color: '#d66650', description: 'Venstre ventrikel aktiveres hurtigt som normalt og giver R-tak i V6/I og S-tak i V1.' },
        { id: 'basal', start: 272, end: 355, time: 305, short: 'Forsinket RV', name: 'Forsinket højre ventrikel (R′)', color: '#0ea5e9', description: 'Da højre gren er blokeret, krydser impulsen sent mod højre ventrikel -> høj terminal R′-tak i V1 (kaninører) og bred sløret S-tak i V6/I.' },
        { id: 'st', start: 355, end: 390, time: 372, short: 'ST', name: 'Overgang til repolarisering', color: '#73828a', description: 'Kort ST-overgang.' },
        { id: 't', start: 390, end: 555, time: 472, short: 'T (V1 −)', name: 'Sekundær repolarisering', color: '#379984', description: 'Den forsinkede højre ventrikel giver typisk negativ T-tak i V1–V2, mens V5–V6 forbliver positive.' },
        { id: 'rest', start: 555, end: 800, time: 680, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Hviletilstand før næste sinusslag.' },
    ],
    vt: [
        { id: 'ventricular', start: 10, end: 190, time: 105, short: 'VT · QRS 1', name: 'Ektopisk bredt ventrikelslag', color: '#dc2626', description: 'Et ektopisk fokus i ventriklen fyrer direkte uden om ledningssystemet. Impulsen spreder sig langsomt opad mod højre -> bredt QRS og ekstrem akse.' },
        { id: 't', start: 190, end: 390, time: 282, short: 'Disk. T', name: 'Diskordant repolarisering', color: '#379984', description: 'QRS glider direkte over i en bred, modsat rettet ST-T-bølge (diskordant T-tak).' },
        { id: 'ventricular', start: 410, end: 590, time: 505, short: 'VT · QRS 2', name: 'Hurtigt opfølgende VT-slag (150/min)', color: '#dc2626', description: 'Nyt hurtigt slag direkte fra samme ventrikelfokus — ingen styrende P-tak.' },
        { id: 't', start: 590, end: 790, time: 682, short: 'Disk. T', name: 'Diskordant repolarisering', color: '#379984', description: 'Modsat rettet repolarisering før næste hurtige slag.' },
        { id: 'rest', start: 0, end: 800, time: 398, short: 'Overgang', name: 'Kontinuerlig ventrikelrytme', color: '#73828a', description: 'Ved monomorf VT er der næsten ingen flad pause mellem slagene.' },
    ],
    vf: [
        { id: 'ventricular', start: 0, end: 200, time: 100, short: 'VF · Kaos', name: 'Kaotisk ventrikelflimren', color: '#b91c1c', description: 'Utallige små reentry-bølger løber kaotisk gennem ventriklerne — intet samlet QRS eller minutvolumen.' },
        { id: 'ventricular', start: 200, end: 400, time: 300, short: 'Ingen QRS', name: 'Ingen koordineret aktivering', color: '#b91c1c', description: 'Ingen P-, QRS- eller T-takker kan skelnes i den bølgede basislinje.' },
        { id: 'ventricular', start: 400, end: 600, time: 500, short: 'Ureg. sving', name: 'Varierende bølgeamplitude', color: '#dc2626', description: 'Udsvingene skifter konstant form, frekvens og højde i alle afledninger.' },
        { id: 'ventricular', start: 600, end: 800, time: 700, short: 'Stødbar', name: 'Hjertestop · Stødbar rytme', color: '#b91c1c', description: 'Akut livstruende tilstand, der kræver øjeblikkelig defibrillering (DC-stød) og HLR.' },
    ],
    av_block_2_wenckebach: [
        { id: 'p', start: 25, end: 80, time: 52, short: 'P₁', name: 'Første sinus-P-tak', color: '#527dd0', description: 'Første sinusimpuls når AV-knuden.' },
        { id: 'pr', start: 80, end: 155, time: 118, short: 'PR₁ 130 ms', name: 'Kort AV-forsinkelse', color: '#d97706', description: 'Første PR-interval (130 ms) slipper hurtigt igennem AV-knuden.' },
        { id: 'ventricular', start: 155, end: 235, time: 195, short: 'QRS₁', name: 'Første QRS-kompleks', color: '#d66650', description: 'Smalt normalt QRS.' },
        { id: 't', start: 245, end: 315, time: 280, short: 'T₁', name: 'Repolarisering 1', color: '#379984', description: 'Normal T-tak efter slag 1.' },
        { id: 'p2', start: 320, end: 375, time: 348, short: 'P₂', name: 'Anden sinus-P-tak', color: '#527dd0', description: 'Næste impuls rammer en mere udtrættet AV-knude.' },
        { id: 'pr', start: 375, end: 535, time: 455, short: 'PR₂ 215 ms', name: 'Progressivt forlænget PR', color: '#d97706', description: 'AV-knuden udtrættes yderligere — PR stiger til 215 ms!' },
        { id: 'ventricular', start: 535, end: 615, time: 575, short: 'QRS₂', name: 'Andet QRS-kompleks', color: '#d66650', description: 'Smalt QRS efter tydeligt længere pause.' },
        { id: 't', start: 615, end: 690, time: 652, short: 'T₂', name: 'Repolarisering 2', color: '#379984', description: 'Repolarisering før det tredje udfald.' },
        { id: 'pr', start: 705, end: 765, time: 735, short: 'P₃ blokeret', name: 'Tredje P-tak blokeres', color: '#c43b47', description: 'AV-knuden er nu helt refraktær: P₃ blokeres uden efterfølgende QRS (Wenckebach-udfaldet).' },
    ],
    av_block_2_mobitz2: [
        { id: 'p', start: 20, end: 70, time: 45, short: 'P₁', name: 'Første P-tak', color: '#527dd0', description: 'Sinusknuden fyrer regelmæssigt.' },
        { id: 'pr', start: 70, end: 160, time: 115, short: 'PR 140 ms', name: 'Konstant PR-interval', color: '#d48817', description: 'Fast PR-interval på 140 ms uden progressiv forlængelse.' },
        { id: 'ventricular', start: 160, end: 235, time: 198, short: 'QRS₁', name: 'Første QRS', color: '#d66650', description: 'Slag 1 ledes ned i ventriklerne.' },
        { id: 't', start: 238, end: 305, time: 270, short: 'T₁', name: 'T-tak 1', color: '#379984', description: 'Normal repolarisering.' },
        { id: 'p2', start: 310, end: 360, time: 335, short: 'P₂', name: 'Anden P-tak', color: '#527dd0', description: 'Ny regelmæssig P-tak.' },
        { id: 'pr', start: 360, end: 450, time: 405, short: 'PR 140 ms', name: 'Samme konstante PR (140 ms)', color: '#d48817', description: 'PR ændrer sig IKKE før det pludselige udfald.' },
        { id: 'ventricular', start: 450, end: 525, time: 488, short: 'QRS₂', name: 'Andet QRS', color: '#d66650', description: 'Normalt overledt QRS.' },
        { id: 't', start: 528, end: 595, time: 560, short: 'T₂', name: 'T-tak 2', color: '#379984', description: 'Normal T-tak.' },
        { id: 'pr', start: 610, end: 800, time: 640, short: 'Pludselig blok', name: 'Pludseligt udfald efter P₃', color: '#dc2626', description: 'His-Purkinje-systemet svigter brat uden varsel: P₃ giver intet QRS.' },
    ],
    anterior_stemi: [
        PHASES[0],
        PHASES[1],
        { id: 'ventricular', start: 210, end: 300, time: 255, short: 'QRS (Q V2–V4)', name: 'Forvægs-depolarisering & Q-tak', color: '#dc2626', description: 'Tab af elektrisk aktiv forvægsmuskel giver begyndende patologisk Q-tak/lav R i V2–V4.' },
        { id: 'st', start: 295, end: 410, time: 345, short: 'ST-elevation', name: 'Skadesstrøm fremad (V1–V4)', color: '#dc2626', description: 'Transmural forvægsiskæmi danner en kraftig anterior skadesstrøm (+z) mod V2–V4 og reciprok depression i II/III/aVF.' },
        { id: 't', start: 410, end: 575, time: 475, short: 'Hyperakut T', name: 'Konveks ST-T (Pardee-bølge)', color: '#dc2626', description: 'Den forhøjede ST-bølge smelter direkte sammen med en bred hyperakut T-tak.' },
        { id: 'rest', start: 575, end: 800, time: 685, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Baseline før næste slag.' },
    ],
    inferior_stemi: [
        PHASES[0],
        PHASES[1],
        { id: 'ventricular', start: 210, end: 300, time: 255, short: 'QRS (Q inf.)', name: 'Inferior depolarisering', color: '#b91c1c', description: 'Tidlig inferior Q-tak peger væk fra den infarktramte nedre væg.' },
        { id: 'st', start: 295, end: 415, time: 348, short: 'ST ↑ II/III/aVF', name: 'Skadesstrøm nedad (RCA)', color: '#b91c1c', description: 'Den inferiore skadesstrøm peger direkte ned mod II, III og aVF og giver reciprok ST-depression i aVL og I.' },
        { id: 't', start: 415, end: 565, time: 475, short: 'ST-T', name: 'Inferior repolarisering', color: '#b91c1c', description: 'Forlænget iskæmisk ST-T-elevation inferiort.' },
        { id: 'rest', start: 565, end: 800, time: 680, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Baseline før næste slag.' },
    ],
    posterior_stemi: [
        PHASES[0],
        PHASES[1],
        { id: 'ventricular', start: 210, end: 300, time: 252, short: 'Høj R (V1–V3)', name: 'Spejlvendt Q -> høj R i V1–V3', color: '#e11d48', description: 'Tab af posterior aktivering giver manglende modvektor, så den forreste R-tak i V1–V2 bliver påfaldende høj og bred.' },
        { id: 'st', start: 295, end: 465, time: 365, short: 'ST ↓ V1–V3', name: 'Skadesstrøm bagud (−z)', color: '#e11d48', description: 'Bagvægsinfarktet sender skadesstrømmen bagud mod ryggen — V1–V3 registrerer derfor en horisontal ST-depression.' },
        { id: 't', start: 465, end: 575, time: 515, short: 'T-tak', name: 'Terminal opadgående T i V2', color: '#379984', description: 'Efterfølges ofte af en oprejst T-tak i V1–V3.' },
        { id: 'rest', start: 575, end: 800, time: 685, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Baseline før næste slag.' },
    ],
    pericarditis: [
        PHASES[0],
        { id: 'pr', start: 145, end: 210, time: 185, short: 'PR-depr.', name: 'Atriel irritation (PR ↓)', color: '#0d9488', description: 'Subepikardial atrieirritation giver en diskret nedadgående PR-depression (og PR-elevation i aVR).' },
        ...PHASES.slice(2, 5),
        { id: 'st', start: 295, end: 425, time: 355, short: 'Konkav ST ↑', name: 'Diffus hængekøje-ST-elevation', color: '#0d9488', description: 'Betændelse i hele perikardiet løfter J-punktet konkavt ("hængekøje") i både ekstremitets- og prækordialafledninger (modsat aVR).' },
        { id: 't', start: 425, end: 560, time: 490, short: 'T', name: 'Konkordant T-tak', color: '#379984', description: 'T-takken forbliver opadrettet efter den konkave ST-elevation.' },
        { id: 'rest', start: 560, end: 800, time: 680, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Baseline før næste slag.' },
    ],
    long_qtc: [
        PHASES[0],
        PHASES[1],
        ...PHASES.slice(2, 5),
        { id: 'st', start: 295, end: 430, time: 365, short: 'Langt plateau', name: 'Forlænget aktionspotentiale (fase 2–3)', color: '#7c3aed', description: 'Kaliumkanaler åbner for langsomt -> ST-segmentet trækker ud, før repolariseringen kan gå i gang.' },
        { id: 't', start: 430, end: 740, time: 585, short: 'Sen T (QTc ↑)', name: 'Forsinket bred T-tak', color: '#7c3aed', description: 'QT-intervallet når helt ud til ~530 ms (QTc ≈ 590 ms), hvilket øger sårbarheden for R-på-T-ekstrasystoler (Torsades).' },
        { id: 'rest', start: 740, end: 800, time: 770, short: 'Hvile', name: 'Kort hvilepause', color: '#73828a', description: 'Meget kort diastolisk pause før næste P-tak.' },
    ],
    hyperkalemia: [
        { id: 'p', start: 90, end: 170, time: 130, short: 'Flad P', name: 'Affladiget atrieaktivering', color: '#ea580c', description: 'Atriemyokardiet er særligt følsomt for højt kalium — P-takken bliver lav eller helt usynlig.' },
        PHASES[1],
        { id: 'ventricular', start: 205, end: 335, time: 270, short: 'Bredt QRS', name: 'Langsommere natriumkanaler', color: '#ea580c', description: 'Højt ekstracellulært K⁺ inaktiverer en del Na⁺-kanaler og gør QRS bredere (130 ms).' },
        { id: 't', start: 350, end: 490, time: 420, short: 'Teltformet T', name: 'Accelereret spids repolarisering', color: '#ea580c', description: 'Høj K⁺-permeabilitet i fase 3 giver en smal, høj og spids symmetrisk "teltformet" T-tak.' },
        { id: 'rest', start: 490, end: 800, time: 645, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Hviletilstand før næste slag.' },
    ],
    hypokalemia: [
        PHASES[0],
        PHASES[1],
        ...PHASES.slice(2, 5),
        { id: 'st', start: 285, end: 365, time: 325, short: 'ST ↓', name: 'Diskret ST-depression', color: '#0284c7', description: 'Tidlig repolarisering starter svagt nedadrettet.' },
        { id: 't', start: 365, end: 480, time: 420, short: 'Flad T', name: 'Affladiget T-tak', color: '#0284c7', description: 'Lavt kalium dæmper fase-3 repolariseringen, så T-takken bliver flad.' },
        { id: 't', start: 480, end: 660, time: 570, short: 'Stor U-tak', name: 'Prominerende U-tak (Purkinje)', color: '#0284c7', description: 'Sen efter-repolarisering i Purkinje-fibrene skaber en stor U-tak lige efter den flade T-tak.' },
        { id: 'rest', start: 660, end: 800, time: 730, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Diastolisk hvile.' },
    ],
    lvh: [
        PHASES[0],
        PHASES[1],
        { id: 'ventricular', start: 210, end: 308, time: 262, short: 'Kæmpe LV-QRS', name: 'Massiv venstresidig depolarisering', color: '#b45309', description: 'Den fortykkede venstre ventrikelvæg skaber en ekstra kraftig elektrisk vektor bagud mod venstre (dyb S i V1, høj R i V5–V6).' },
        { id: 'st', start: 310, end: 410, time: 360, short: 'ST-strain', name: 'Sekundær LV-strain', color: '#b45309', description: 'Den tykke væg får subendokardiel belastning og ændret repolarisering med asymmetrisk ST-depression.' },
        { id: 't', start: 410, end: 565, time: 475, short: 'Inv. T', name: 'Diskordant T-inversion (V5–V6/I)', color: '#379984', description: 'Repolariseringen vender om i de venstresidige afledninger og giver negativ asymmetrisk T-tak i V5–V6, I og aVL.' },
        { id: 'rest', start: 565, end: 800, time: 680, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Baseline før næste slag.' },
    ],
    pulmonary_embolism: [
        PHASES[0],
        PHASES[1],
        { id: 'ventricular', start: 210, end: 304, time: 256, short: 'RAD · SI QIII', name: 'Højredrejet akse & RV-belastning', color: '#0369a1', description: 'Akut trykstigning i højre ventrikel drejer vektoren mod højre/nedad -> terminal S-tak i I og Q-tak i III.' },
        { id: 't', start: 365, end: 535, time: 450, short: 'T III / V1–V3 ↓', name: 'RV-strain repolarisering', color: '#0369a1', description: 'Trykbelastning på højre ventrikel vender repolariseringen -> T-inversion i III samt V1–V3 (fuldender SI QIII TIII).' },
        { id: 'rest', start: 535, end: 800, time: 670, short: 'Hvile', name: 'Elektrisk hvile', color: '#73828a', description: 'Sinustakykardi ses hyppigt klinisk ved akut LE.' },
    ],
};

export function phasesForRhythm(rhythmId = 'normal') {
    return RHYTHM_PHASES[rhythmId] || PHASES;
}

export function traceSegmentsForRhythm(rhythmId = 'normal') {
    if (rhythmId === 'av_block_1') {
        return [
            { from: 40, to: 130, color: '#527dd0' },
            { from: 290, to: 380, color: '#d48817' },
            { from: 460, to: 620, color: '#379984' },
        ];
    }
    if (rhythmId === 'av_block_3') {
        return [
            { from: 85, to: 165, color: '#527dd0' },
            { from: 220, to: 340, color: '#c43b47' },
            { from: 355, to: 475, color: '#379984' },
            { from: 475, to: 565, color: '#527dd0' },
        ];
    }
    if (rhythmId === 'lbbb' || rhythmId === 'rbbb') {
        const qrsColor = rhythmId === 'lbbb' ? '#8b5cf6' : '#0ea5e9';
        return [
            { from: 80, to: 180, color: '#527dd0' },
            { from: 210, to: 355, color: qrsColor },
            { from: 355, to: 575, color: '#379984' },
        ];
    }
    if (rhythmId === 'vt') {
        return [
            { from: 10, to: 190, color: '#dc2626' },
            { from: 190, to: 390, color: '#379984' },
            { from: 410, to: 590, color: '#dc2626' },
            { from: 590, to: 790, color: '#379984' },
        ];
    }
    if (rhythmId === 'vf') {
        return [
            { from: 0, to: 800, color: '#b91c1c' },
        ];
    }
    if (rhythmId === 'av_block_2_wenckebach') {
        return [
            { from: 25, to: 80, color: '#527dd0' },
            { from: 155, to: 235, color: '#d97706' },
            { from: 245, to: 315, color: '#379984' },
            { from: 320, to: 375, color: '#527dd0' },
            { from: 535, to: 615, color: '#d97706' },
            { from: 615, to: 690, color: '#379984' },
            { from: 705, to: 765, color: '#c43b47' },
        ];
    }
    if (rhythmId === 'av_block_2_mobitz2') {
        return [
            { from: 20, to: 70, color: '#527dd0' },
            { from: 160, to: 235, color: '#d48817' },
            { from: 238, to: 305, color: '#379984' },
            { from: 310, to: 360, color: '#527dd0' },
            { from: 450, to: 525, color: '#d48817' },
            { from: 528, to: 595, color: '#379984' },
            { from: 610, to: 665, color: '#dc2626' },
        ];
    }
    if (rhythmId === 'anterior_stemi' || rhythmId === 'inferior_stemi' || rhythmId === 'posterior_stemi') {
        const col = RHYTHM_PRESETS[rhythmId].color;
        return [
            { from: 80, to: 180, color: '#527dd0' },
            { from: 210, to: 300, color: col },
            { from: 300, to: 565, color: col },
        ];
    }
    if (rhythmId === 'pericarditis') {
        return [
            { from: 80, to: 205, color: '#0d9488' },
            { from: 210, to: 295, color: '#d66650' },
            { from: 295, to: 555, color: '#0d9488' },
        ];
    }
    if (rhythmId === 'long_qtc') {
        return [
            { from: 80, to: 180, color: '#527dd0' },
            { from: 210, to: 295, color: '#d66650' },
            { from: 295, to: 740, color: '#7c3aed' },
        ];
    }
    if (rhythmId === 'hyperkalemia') {
        return [
            { from: 90, to: 170, color: '#94a3b8' },
            { from: 205, to: 335, color: '#ea580c' },
            { from: 350, to: 490, color: '#ea580c' },
        ];
    }
    if (rhythmId === 'hypokalemia') {
        return [
            { from: 75, to: 165, color: '#527dd0' },
            { from: 195, to: 280, color: '#d66650' },
            { from: 285, to: 480, color: '#379984' },
            { from: 480, to: 660, color: '#0284c7' },
        ];
    }
    if (rhythmId === 'lvh') {
        return [
            { from: 80, to: 180, color: '#527dd0' },
            { from: 210, to: 308, color: '#b45309' },
            { from: 310, to: 565, color: '#379984' },
        ];
    }
    if (rhythmId === 'pulmonary_embolism') {
        return [
            { from: 75, to: 165, color: '#527dd0' },
            { from: 210, to: 304, color: '#0369a1' },
            { from: 365, to: 535, color: '#0369a1' },
        ];
    }
    const atrialColor = rhythmId === 'afib' ? '#7c5cbf' : rhythmId === 'aflutter' ? '#2b78b8' : '#527dd0';
    return [
        { from: rhythmId === 'normal' ? 80 : 0, to: rhythmId === 'normal' ? 180 : 205, color: atrialColor },
        { from: 210, to: 230, color: '#c78b2e' },
        { from: 230, to: 270, color: '#d66650' },
        { from: 270, to: 300, color: '#9b72b0' },
        { from: 380, to: 540, color: '#379984' },
    ];
}

export function traceAnnotationsForRhythm(rhythmId = 'normal', lead = 'II') {
    if (rhythmId === 'av_block_1') {
        return [
            { id: 'pr-long', type: 'bracket', from: 40, to: 290, label: 'PR 250 ms (> 200 ms)', color: '#d48817' },
        ];
    }
    if (rhythmId === 'av_block_3') {
        return [
            { id: 'p1', type: 'marker', time: 125, label: 'P (uafh.)', color: '#527dd0' },
            { id: 'esc', type: 'bracket', from: 220, to: 340, label: 'Erstatnings-QRS', color: '#c43b47' },
            { id: 'p2', type: 'marker', time: 525, label: 'P (uafh.)', color: '#527dd0' },
        ];
    }
    if (rhythmId === 'lbbb') {
        return [
            { id: 'lbbb-qrs', type: 'bracket', from: 210, to: 355, label: 'Bredt QRS 145 ms (≥ 120 ms)', color: '#8b5cf6' },
            { id: 'lbbb-t', type: 'marker', time: 480, label: 'Diskordant T', color: '#379984' },
        ];
    }
    if (rhythmId === 'rbbb') {
        return [
            {
                id: 'rbbb-qrs',
                type: 'bracket',
                from: 210,
                to: 355,
                label: (lead === 'V1' || lead === 'V2') ? 'rsR′ · Bredt QRS 145 ms' : 'Bredt QRS 145 ms (sløret S)',
                color: '#0ea5e9',
            },
        ];
    }
    if (rhythmId === 'aflutter') {
        return [
            { id: 'flutter-ff', type: 'bracket', from: 0, to: 200, label: 'F–F 200 ms (300/min savtak)', color: '#2b78b8' },
        ];
    }
    if (rhythmId === 'afib') {
        return [
            { id: 'afib-f', type: 'bracket', from: 20, to: 200, label: 'Ingen P · f-takker i basislinjen', color: '#7c5cbf' },
        ];
    }
    if (rhythmId === 'vt') {
        return [
            { id: 'vt-qrs', type: 'bracket', from: 10, to: 190, label: 'Bredt VT-QRS (180 ms) · 150/min', color: '#dc2626' },
        ];
    }
    if (rhythmId === 'vf') {
        return [
            { id: 'vf-chaos', type: 'bracket', from: 40, to: 760, label: 'Kaotisk flimren · ingen P, QRS eller T', color: '#b91c1c' },
        ];
    }
    if (rhythmId === 'av_block_2_wenckebach') {
        return [
            { id: 'wenck-pr1', type: 'bracket', from: 25, to: 155, label: 'PR₁ 130 ms', color: '#d97706' },
            { id: 'wenck-pr2', type: 'bracket', from: 320, to: 535, label: 'PR₂ 215 ms (længere!)', color: '#d97706' },
            { id: 'wenck-drop', type: 'marker', time: 735, label: 'P₃ blokeret', color: '#c43b47' },
        ];
    }
    if (rhythmId === 'av_block_2_mobitz2') {
        return [
            { id: 'mob2-pr1', type: 'bracket', from: 20, to: 160, label: 'PR₁ 140 ms', color: '#d48817' },
            { id: 'mob2-pr2', type: 'bracket', from: 310, to: 450, label: 'PR₂ 140 ms (fast)', color: '#d48817' },
            { id: 'mob2-drop', type: 'marker', time: 640, label: 'P₃ → pludseligt udfald', color: '#dc2626' },
        ];
    }
    if (rhythmId === 'anterior_stemi') {
        return [
            {
                id: 'ant-st',
                type: 'bracket',
                from: 295,
                to: 470,
                label: (lead === 'II' || lead === 'III' || lead === 'aVF') ? 'Reciprok ST-depression' : 'Konveks ST-elevation (V1–V4)',
                color: '#dc2626',
            },
        ];
    }
    if (rhythmId === 'inferior_stemi') {
        return [
            {
                id: 'inf-st',
                type: 'bracket',
                from: 295,
                to: 470,
                label: (lead === 'aVL' || lead === 'I') ? 'Reciprok ST-depression (aVL)' : 'ST-elevation (II, III, aVF)',
                color: '#b91c1c',
            },
        ];
    }
    if (rhythmId === 'posterior_stemi') {
        return [
            {
                id: 'post-st',
                type: 'bracket',
                from: 295,
                to: 465,
                label: (lead === 'V1' || lead === 'V2' || lead === 'V3') ? 'Spejl: høj R + ST-depr.' : 'Posterior skadesstrøm (−z)',
                color: '#e11d48',
            },
        ];
    }
    if (rhythmId === 'pericarditis') {
        return [
            { id: 'peri-pr', type: 'marker', time: 185, label: lead === 'aVR' ? 'PR ↑ (aVR)' : 'PR-depr.', color: '#0d9488' },
            { id: 'peri-st', type: 'bracket', from: 295, to: 455, label: lead === 'aVR' ? 'Reciprok ST ↓ (aVR)' : 'Diffus konkav ST-elev.', color: '#0d9488' },
        ];
    }
    if (rhythmId === 'long_qtc') {
        return [
            { id: 'lqt-qt', type: 'bracket', from: 210, to: 740, label: 'QT 530 ms · QTc ~590 ms (> 500)', color: '#7c3aed' },
        ];
    }
    if (rhythmId === 'hyperkalemia') {
        return [
            { id: 'hk-qrs', type: 'bracket', from: 205, to: 335, label: 'Bredt QRS (130 ms)', color: '#ea580c' },
            { id: 'hk-t', type: 'marker', time: 420, label: 'Spids teltformet T', color: '#ea580c' },
        ];
    }
    if (rhythmId === 'hypokalemia') {
        return [
            { id: 'hypk-t', type: 'marker', time: 420, label: 'Flad T', color: '#379984' },
            { id: 'hypk-u', type: 'bracket', from: 485, to: 655, label: 'Prominerende U-tak', color: '#0284c7' },
        ];
    }
    if (rhythmId === 'lvh') {
        return [
            { id: 'lvh-qrs', type: 'bracket', from: 210, to: 308, label: (lead === 'V1' || lead === 'V2') ? 'Dyb S (LVH)' : 'Høj R · Sokolow > 35 mm', color: '#b45309' },
            { id: 'lvh-str', type: 'marker', time: 455, label: 'LV-strain (ST-T)', color: '#379984' },
        ];
    }
    if (rhythmId === 'pulmonary_embolism') {
        return [
            { id: 'pe-qrs', type: 'bracket', from: 210, to: 304, label: lead === 'I' ? 'Dyb S i I (RAD)' : lead === 'III' ? 'Q i III + inv. T' : 'RV-belastning (SI QIII TIII)', color: '#0369a1' },
            { id: 'pe-t', type: 'marker', time: 450, label: 'RV-strain T ↓', color: '#0369a1' },
        ];
    }
    return [];
}

function normalVector(t, axisOffsetDeg = 0) {
    if (t >= 80 && t < 180) {
        return pWaveEnvelope(t, 80, 100);
    }
    if (t >= 210 && t < 300) {
        return rotateFrontal(evalKnots(t, QRS_KNOTS), axisOffsetDeg);
    }
    if (t >= 380 && t < 540) {
        return tWaveEnvelope(t, 380, 160, [0.28, 0.38, 0.10], axisOffsetDeg);
    }
    return [0, 0, 0];
}

export function cardiacVector(time, axisOffsetDeg = 0, rhythmId = 'normal') {
    const t = cyclePosition(time);
    if (rhythmId === 'normal' || !RHYTHM_PRESETS[rhythmId]) {
        return normalVector(t, axisOffsetDeg);
    }

    if (rhythmId === 'afib') {
        const qrs = t >= 210 && t < 300 ? rotateFrontal(evalKnots(t, QRS_KNOTS), axisOffsetDeg) : [0, 0, 0];
        const tWave = t >= 380 && t < 540 ? tWaveEnvelope(t, 380, 160, [0.26, 0.35, 0.09], axisOffsetDeg) : [0, 0, 0];
        const qrsMask = t >= 205 && t < 305 ? 0 : 1;
        const w = 2 * Math.PI * t / 800;
        const fWave = [
            0.032 * Math.sin(w * 7 + 0.4) + 0.022 * Math.sin(w * 11 + 1.9),
            0.038 * Math.sin(w * 6 + 1.1) + 0.024 * Math.sin(w * 13 + 0.3),
            0.055 * Math.sin(w * 9 + 0.8) + 0.030 * Math.sin(w * 15 + 2.4),
        ].map(v => v * qrsMask);
        return addVec(addVec(qrs, tWave), fWave);
    }

    if (rhythmId === 'aflutter') {
        const qrs = t >= 210 && t < 300 ? rotateFrontal(evalKnots(t, QRS_KNOTS), axisOffsetDeg) : [0, 0, 0];
        const tWave = t >= 390 && t < 530 ? tWaveEnvelope(t, 390, 140, [0.20, 0.28, 0.08], axisOffsetDeg) : [0, 0, 0];
        // Continuous 300/min counter-clockwise sawtooth wave (4 cycles in 800 ms; fades softly during QRS so QRS stays crisp).
        const qrsEnv = t < 200 || t >= 310 ? 1 : t < 215 ? 1 - (t - 200) / 15 * 0.85 : t >= 295 ? 0.15 + (t - 295) / 15 * 0.85 : 0.15;
        const cyc = ((t + 25) % 200) / 200;
        // Continuous asymmetric sawtooth (0.72 slow negative drift + 0.28 steep upward recovery, no jump discontinuity).
        const saw = cyc < 0.72 ? 0.08 - (cyc / 0.72) * 0.34 : -0.26 + ((cyc - 0.72) / 0.28) * 0.34;
        const fFlutter = [
            (-0.02 + 0.06 * saw) * qrsEnv,
            saw * qrsEnv,
            (0.11 - 0.25 * saw) * qrsEnv,
        ];
        return addVec(addVec(qrs, tWave), fFlutter);
    }

    if (rhythmId === 'av_block_1') {
        if (t >= 40 && t < 130) return pWaveEnvelope(t, 40, 90);
        if (t >= 290 && t < 380) return rotateFrontal(evalKnots(t - 80, QRS_KNOTS), axisOffsetDeg);
        if (t >= 460 && t < 620) return tWaveEnvelope(t, 460, 160, [0.28, 0.38, 0.10], axisOffsetDeg);
        return [0, 0, 0];
    }

    if (rhythmId === 'av_block_3') {
        // Two regular, unlinked P-waves (400 ms apart) marching independently across an idioventricular/distal escape beat.
        const p1 = pWaveEnvelope(t, 85, 80);
        const p2 = pWaveEnvelope(t, 485, 80);
        const qrs = rotateFrontal(evalKnots(t, ESCAPE_KNOTS), axisOffsetDeg);
        const tWave = tWaveEnvelope(t, 355, 120, [0.24, 0.32, 0.08], axisOffsetDeg);
        return addVec(addVec(p1, p2), addVec(qrs, tWave));
    }

    if (rhythmId === 'lbbb') {
        if (t >= 80 && t < 180) return pWaveEnvelope(t, 80, 100);
        if (t >= 210 && t < 355) return rotateFrontal(evalKnots(t, LBBB_KNOTS), axisOffsetDeg);
        if (t >= 355 && t < 575) return discordantStT(t, 355, 575, [-0.26, 0.14, 0.30], axisOffsetDeg);
        return [0, 0, 0];
    }

    if (rhythmId === 'rbbb') {
        if (t >= 80 && t < 180) return pWaveEnvelope(t, 80, 100);
        if (t >= 210 && t < 355) return rotateFrontal(evalKnots(t, RBBB_KNOTS), axisOffsetDeg);
        if (t >= 355 && t < 565) return discordantStT(t, 355, 565, [0.22, 0.26, -0.25], axisOffsetDeg);
        return [0, 0, 0];
    }

    if (rhythmId === 'vt') {
        return rotateFrontal(evalKnots(t % 400, VT_CYCLE_KNOTS), axisOffsetDeg);
    }

    if (rhythmId === 'vf') {
        const w = 2 * Math.PI * t / 800;
        const vec = [
            0.24 * Math.sin(w * 5 + 0.3) + 0.22 * Math.sin(w * 7 + 1.8) + 0.14 * Math.cos(w * 11 + 0.7) + 0.09 * Math.sin(w * 13 + 2.1),
            0.28 * Math.sin(w * 6 + 1.2) + 0.20 * Math.sin(w * 9 + 2.5) + 0.16 * Math.cos(w * 4 + 0.4) + 0.10 * Math.sin(w * 14 + 1.1),
            0.22 * Math.cos(w * 5 + 0.9) + 0.24 * Math.sin(w * 8 + 0.2) + 0.15 * Math.sin(w * 12 + 2.9) + 0.08 * Math.cos(w * 15 + 1.6),
        ];
        return rotateFrontal(vec, axisOffsetDeg);
    }

    if (rhythmId === 'av_block_2_wenckebach') {
        if (t >= 25 && t < 80) return pWaveEnvelope(t, 25, 55);
        if (t >= 155 && t < 235) return rotateFrontal(sampleNormalQrs(t, 155, 80), axisOffsetDeg);
        if (t >= 245 && t < 315) return tWaveEnvelope(t, 245, 70, [0.22, 0.32, 0.08], axisOffsetDeg);
        if (t >= 320 && t < 375) return pWaveEnvelope(t, 320, 55);
        if (t >= 535 && t < 615) return rotateFrontal(sampleNormalQrs(t, 535, 80), axisOffsetDeg);
        if (t >= 615 && t < 690) return tWaveEnvelope(t, 615, 75, [0.22, 0.32, 0.08], axisOffsetDeg);
        if (t >= 705 && t < 765) return pWaveEnvelope(t, 705, 60);
        return [0, 0, 0];
    }

    if (rhythmId === 'av_block_2_mobitz2') {
        if (t >= 20 && t < 70) return pWaveEnvelope(t, 20, 50);
        if (t >= 160 && t < 235) return rotateFrontal(sampleNormalQrs(t, 160, 75), axisOffsetDeg);
        if (t >= 238 && t < 305) return tWaveEnvelope(t, 238, 67, [0.22, 0.32, 0.08], axisOffsetDeg);
        if (t >= 310 && t < 360) return pWaveEnvelope(t, 310, 50);
        if (t >= 450 && t < 525) return rotateFrontal(sampleNormalQrs(t, 450, 75), axisOffsetDeg);
        if (t >= 528 && t < 595) return tWaveEnvelope(t, 528, 67, [0.22, 0.32, 0.08], axisOffsetDeg);
        if (t >= 610 && t < 665) return pWaveEnvelope(t, 610, 55);
        return [0, 0, 0];
    }

    if (rhythmId === 'anterior_stemi') {
        const p = t >= 80 && t < 180 ? pWaveEnvelope(t, 80, 100) : [0, 0, 0];
        const qrs = t >= 210 && t < 300 ? rotateFrontal(evalKnots(t, ANTERIOR_STEMI_QRS_KNOTS), axisOffsetDeg) : [0, 0, 0];
        const stT = t >= 285 && t < 575 ? stemiInjuryStT(t, 285, 575, [0.08, -0.26, 0.56], axisOffsetDeg) : [0, 0, 0];
        return addVec(p, addVec(qrs, stT));
    }

    if (rhythmId === 'inferior_stemi') {
        const p = t >= 80 && t < 180 ? pWaveEnvelope(t, 80, 100) : [0, 0, 0];
        const qrs = t >= 210 && t < 300 ? rotateFrontal(evalKnots(t, INFERIOR_STEMI_QRS_KNOTS), axisOffsetDeg) : [0, 0, 0];
        const stT = t >= 285 && t < 565 ? stemiInjuryStT(t, 285, 565, [-0.10, 0.46, 0.05], axisOffsetDeg) : [0, 0, 0];
        return addVec(p, addVec(qrs, stT));
    }

    if (rhythmId === 'posterior_stemi') {
        const p = t >= 80 && t < 180 ? pWaveEnvelope(t, 80, 100) : [0, 0, 0];
        const qrs = t >= 210 && t < 300 ? rotateFrontal(evalKnots(t, POSTERIOR_STEMI_QRS_KNOTS), axisOffsetDeg) : [0, 0, 0];
        const stDepr = t >= 285 && t < 485 ? discordantStT(t, 285, 485, [0.06, 0.08, -0.42], axisOffsetDeg) : [0, 0, 0];
        const uprightT = t >= 445 && t < 575 ? tWaveEnvelope(t, 445, 130, [0.16, 0.22, 0.26], axisOffsetDeg) : [0, 0, 0];
        return addVec(addVec(p, qrs), addVec(stDepr, uprightT));
    }

    if (rhythmId === 'pericarditis') {
        const p = t >= 80 && t < 180 ? pWaveEnvelope(t, 80, 100) : [0, 0, 0];
        const prDepr = t >= 145 && t < 210
            ? rotateFrontal([-0.05, -0.09, -0.04].map(v => v * Math.sin(Math.PI * (t - 145) / 65)), axisOffsetDeg)
            : [0, 0, 0];
        const qrs = t >= 210 && t < 300 ? rotateFrontal(evalKnots(t, QRS_KNOTS), axisOffsetDeg) : [0, 0, 0];
        const stT = t >= 290 && t < 560 ? concaveStT(t, 290, 560, [0.24, 0.28, 0.22], [0.22, 0.28, 0.12], axisOffsetDeg) : [0, 0, 0];
        return addVec(addVec(p, prDepr), addVec(qrs, stT));
    }

    if (rhythmId === 'long_qtc') {
        if (t >= 80 && t < 180) return pWaveEnvelope(t, 80, 100);
        if (t >= 210 && t < 295) return rotateFrontal(sampleNormalQrs(t, 210, 85), axisOffsetDeg);
        if (t >= 295 && t < 430) return rotateFrontal([0.015, 0.02, 0.01], axisOffsetDeg);
        if (t >= 430 && t < 740) return tWaveEnvelope(t, 430, 310, [0.26, 0.36, 0.12], axisOffsetDeg);
        return [0, 0, 0];
    }

    if (rhythmId === 'hyperkalemia') {
        if (t >= 90 && t < 170) return pWaveEnvelope(t, 90, 80).map(v => v * 0.25);
        if (t >= 205 && t < 335) return rotateFrontal(evalKnots(t, HYPERK_QRS_KNOTS), axisOffsetDeg);
        if (t >= 350 && t < 490) {
            const env = Math.sin(Math.PI * (t - 350) / 140) ** 4;
            return rotateFrontal([0.52 * env, 0.74 * env, 0.68 * env], axisOffsetDeg * 0.45);
        }
        return [0, 0, 0];
    }

    if (rhythmId === 'hypokalemia') {
        if (t >= 75 && t < 165) return pWaveEnvelope(t, 75, 90);
        if (t >= 195 && t < 280) return rotateFrontal(sampleNormalQrs(t, 195, 85), axisOffsetDeg);
        if (t >= 285 && t < 375) {
            const st = Math.sin(Math.PI * (t - 285) / 90);
            return rotateFrontal([-0.07 * st, -0.10 * st, -0.06 * st], axisOffsetDeg * 0.45);
        }
        const flatT = t >= 365 && t < 480 ? tWaveEnvelope(t, 365, 115, [0.06, 0.08, 0.04], axisOffsetDeg) : [0, 0, 0];
        const uWave = t >= 480 && t < 660 ? tWaveEnvelope(t, 480, 180, [0.22, 0.30, 0.18], axisOffsetDeg) : [0, 0, 0];
        return addVec(flatT, uWave);
    }

    if (rhythmId === 'lvh') {
        if (t >= 80 && t < 180) return pWaveEnvelope(t, 80, 100);
        if (t >= 210 && t < 308) return rotateFrontal(evalKnots(t, LVH_KNOTS), axisOffsetDeg);
        if (t >= 305 && t < 565) return discordantStT(t, 305, 565, [-0.28, -0.10, 0.22], axisOffsetDeg);
        return [0, 0, 0];
    }

    if (rhythmId === 'pulmonary_embolism') {
        if (t >= 75 && t < 165) return pWaveEnvelope(t, 75, 90).map((v, i) => (i === 1 ? v * 1.35 : v));
        if (t >= 210 && t < 304) return rotateFrontal(evalKnots(t, PE_KNOTS), axisOffsetDeg);
        if (t >= 365 && t < 535) return tWaveEnvelope(t, 365, 170, [0.14, -0.18, -0.28], axisOffsetDeg);
        return [0, 0, 0];
    }

    return [0, 0, 0];
}

function rotateFrontal([x, y, z], deg) {
    if (!deg) return [x, y, z];
    const rad = radians(deg);
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    return [x * cos - y * sin, x * sin + y * cos, z];
}

export function voltageAt(lead, time, axisOffsetDeg = 0, rhythmId = 'normal') {
    const axis = (MODEL_LEADS[lead] || MODEL_LEADS.II).axis;
    return cardiacVector(time, axisOffsetDeg, rhythmId).reduce((sum, value, index) => sum + value * axis[index], 0);
}

export function projectionAt(lead, time, axisOffsetDeg = 0, rhythmId = 'normal') {
    const details = MODEL_LEADS[lead] || MODEL_LEADS.II;
    const vector = cardiacVector(time, axisOffsetDeg, rhythmId);
    const visibleVector = [vector[0], vector[details.plane === 'frontal' ? 1 : 2]];
    const unit = [Math.cos(radians(details.angle)), Math.sin(radians(details.angle))];
    const length = visibleVector[0] * unit[0] + visibleVector[1] * unit[1];
    return { vector: visibleVector, unit, point: unit.map(value => value * length), voltage: voltageAt(lead, time, axisOffsetDeg, rhythmId) };
}

export function waveformPath(lead, width = 400, baseline = 100, gain = 56, axisOffsetDeg = 0, rhythmId = 'normal') {
    const points = [];
    for (let time = 0; time <= CYCLE_MS; time += 2) {
        points.push(`${time === 0 ? 'M' : 'L'}${(time / CYCLE_MS * width).toFixed(2)},${(baseline - voltageAt(lead, time, axisOffsetDeg, rhythmId) * gain).toFixed(2)}`);
    }
    return points.join(' ');
}

export const AXIS_PRESETS = {
    normal: {
        id: 'normal',
        label: 'Normal akse',
        short: 'Normal (+50°)',
        offsetDeg: 0,
        zone: 'Normal (−30° til +90°)',
        color: '#2f7a62',
        clinicalNote: 'Venstre ventrikels tykke væg leder nettovektoren nedad mod venstre (langs afledning II). Både I og II er positive.'
    },
    lad: {
        id: 'lad',
        label: 'Venstredrejet (LAD)',
        short: 'LAD (−50°)',
        offsetDeg: -100,
        zone: 'Venstredrejet (< −30°)',
        color: '#c87a19',
        clinicalNote: 'Nettovektoren drejer opad mod venstre skulder (fx LAFB eller udtalt LVH). Afledning I og aVL er positive, mens II og aVF bliver negative.'
    },
    rad: {
        id: 'rad',
        label: 'Højredrejet (RAD)',
        short: 'RAD (+110°)',
        offsetDeg: 60,
        zone: 'Højredrejet (> +90°)',
        color: '#d45b2c',
        clinicalNote: 'Nettovektoren drejer nedad mod højre (fx akut lungeemboli eller RVH). Afledning I bliver negativ, mens III og aVF bliver kraftigt positive.'
    }
};

export function meanQrsAngle(axisOffsetDeg = 0, rhythmId = 'normal') {
    const [start, end] = RHYTHM_PRESETS[rhythmId]?.qrsWindow || [210, 300];
    let sx = 0;
    let sy = 0;
    for (let t = start; t <= end; t += 2) {
        const [x, y] = cardiacVector(t, axisOffsetDeg, rhythmId);
        sx += x;
        sy += y;
    }
    let deg = Math.atan2(sy, sx) * 180 / Math.PI;
    if (deg <= -180) deg += 360;
    if (deg > 180) deg -= 360;
    return deg;
}

export function axisZoneForAngle(angleDeg) {
    let a = ((angleDeg % 360) + 360) % 360;
    if (a > 180) a -= 360;
    if (a >= -30 && a <= 90) return { id: 'normal', label: 'Normal akse', color: '#2f7a62' };
    if (a >= -90 && a < -30) return { id: 'lad', label: 'Venstredrejet (LAD)', color: '#c87a19' };
    if (a > 90 && a <= 180) return { id: 'rad', label: 'Højredrejet (RAD)', color: '#d45b2c' };
    return { id: 'extreme', label: 'Ekstrem akse', color: '#be3c48' };
}

export function vectorLoopPath(plane, cx, cy, scale, axisOffsetDeg = 0, rhythmId = 'normal') {
    const [start, end] = RHYTHM_PRESETS[rhythmId]?.qrsWindow || [210, 300];
    const points = [];
    for (let t = start; t <= end; t += 2) {
        const v = cardiacVector(t, axisOffsetDeg, rhythmId);
        const vx = v[0];
        const vy = v[plane === 'frontal' ? 1 : 2];
        points.push(`${t === start ? 'M' : 'L'}${(cx + vx * scale).toFixed(2)},${(cy + vy * scale).toFixed(2)}`);
    }
    return points.join(' ');
}
