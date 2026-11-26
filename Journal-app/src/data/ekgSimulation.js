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

// Broad monomorphic VT QRS (160 ms within a 400 ms beat window, local time 20..180): extreme northwest / anterior-right axis.
const VT_KNOTS = [
    [20, 0, 0, 0], [45, -0.26, -0.20, 0.22], [86, -0.82, -0.70, 0.62],
    [124, -0.92, -0.78, 0.68], [156, -0.44, -0.38, 0.34], [180, 0, 0, 0],
];

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

export const RHYTHM_PRESETS = {
    normal: {
        id: 'normal',
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
    av_block_3: {
        id: 'av_block_3',
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
        label: 'Ventrikulær takykardi (VT)',
        short: 'VT',
        badge: '150 bpm · Bredt QRS',
        color: '#dc2626',
        qrsWindow: [20, 180],
        causeTitle: 'Hurtigt ektopisk fokus i venstre ventrikel',
        causeBody: 'Et irritabelt fokus direkte i ventriklens muskelvæg fyrer hurtigt (~150/min) uden om Purkinje-nettet. Impulsen spreder sig langsomt fra muskelcelle til muskelcelle.',
        ecgHallmarks: 'Hurtig regelmæssig bredkomplekset takykardi (QRS ≥ 120 ms), ekstrem akse (positiv i aVR/V1, negativ i I/II/V6) og diskordante T-takker.',
        recommendedLeads: ['II', 'aVR', 'V1', 'V6'],
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
        { id: 'ventricular', start: 20, end: 180, time: 100, short: 'VT · QRS 1', name: 'Ektopisk bredt ventrikelslag', color: '#dc2626', description: 'Et ektopisk fokus i ventriklen fyrer direkte uden om ledningssystemet. Impulsen spreder sig langsomt opad mod højre -> bredt QRS og ekstrem akse.' },
        { id: 't', start: 200, end: 360, time: 280, short: 'Disk. T', name: 'Diskordant repolarisering', color: '#379984', description: 'T-takken vender modsat det brede ektopiske QRS.' },
        { id: 'ventricular', start: 420, end: 580, time: 500, short: 'VT · QRS 2', name: 'Hurtigt opfølgende VT-slag (150/min)', color: '#dc2626', description: 'Nyt hurtigt slag direkte fra samme ventrikelfokus — ingen styrende P-tak.' },
        { id: 't', start: 600, end: 760, time: 680, short: 'Disk. T', name: 'Diskordant repolarisering', color: '#379984', description: 'Modsat rettet repolarisering før næste hurtige slag.' },
        { id: 'rest', start: 0, end: 800, time: 390, short: 'Hurtig pause', name: 'Kort diastole', color: '#73828a', description: 'Meget kort pause mellem ventrikelslagene.' },
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
            { from: 390, to: 565, color: '#379984' },
        ];
    }
    if (rhythmId === 'vt') {
        return [
            { from: 20, to: 180, color: '#dc2626' },
            { from: 200, to: 360, color: '#379984' },
            { from: 420, to: 580, color: '#dc2626' },
            { from: 600, to: 760, color: '#379984' },
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
        // Continuous 300/min counter-clockwise sawtooth wave (4 flutter cycles in 800 ms; fades cleanly during QRS so QRS stays legible).
        const qrsAtten = t >= 210 && t < 300 ? 0.12 : 1;
        const cyc = ((t + 25) % 200) / 200;
        // Sharp upward-rightward negative downstroke in II/III/aVF (-y), slow return ramp; positive spike in V1 (+z).
        const saw = cyc < 0.22 ? -(cyc / 0.22) : -(1 - (cyc - 0.22) / 0.78);
        const fFlutter = [
            (-0.04 + 0.08 * saw) * qrsAtten,
            (-0.14 - 0.14 * (1 - cyc)) * qrsAtten,
            (0.08 + 0.06 * (-saw)) * qrsAtten,
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
        if (t >= 395 && t < 565) return tWaveEnvelope(t, 395, 170, [-0.26, 0.14, 0.30], axisOffsetDeg);
        return [0, 0, 0];
    }

    if (rhythmId === 'rbbb') {
        if (t >= 80 && t < 180) return pWaveEnvelope(t, 80, 100);
        if (t >= 210 && t < 355) return rotateFrontal(evalKnots(t, RBBB_KNOTS), axisOffsetDeg);
        if (t >= 390 && t < 555) return tWaveEnvelope(t, 390, 165, [0.22, 0.26, -0.24], axisOffsetDeg);
        return [0, 0, 0];
    }

    if (rhythmId === 'vt') {
        const local = t % 400;
        if (local >= 20 && local < 180) return rotateFrontal(evalKnots(local, VT_KNOTS), axisOffsetDeg);
        if (local >= 200 && local < 360) return tWaveEnvelope(local, 200, 160, [0.26, 0.24, -0.22], axisOffsetDeg);
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
