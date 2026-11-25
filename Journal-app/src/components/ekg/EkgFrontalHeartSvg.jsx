import React from 'react';
import {
    MODEL_LEADS,
    axisZoneForAngle,
    meanQrsAngle,
    projectionAt,
    vectorLoopPath
} from '../../data/ekgSimulation';

const FRONTAL_LEADS = ['aVL', 'I', 'II', 'aVF', 'III', 'aVR'];
const CX = 340;
const CY = 268;
const R_INNER = 156;
const R_OUTER = 176;
const R_LEAD = 212;
const VECTOR_SCALE = 104;

const rad = deg => deg * Math.PI / 180;
const polar = (cx, cy, r, deg) => [cx + Math.cos(rad(deg)) * r, cy + Math.sin(rad(deg)) * r];

function annulusSectorPath(cx, cy, rIn, rOut, startDeg, endDeg) {
    const [x1, y1] = polar(cx, cy, rOut, startDeg);
    const [x2, y2] = polar(cx, cy, rOut, endDeg);
    const [x3, y3] = polar(cx, cy, rIn, endDeg);
    const [x4, y4] = polar(cx, cy, rIn, startDeg);
    const span = ((endDeg - startDeg) % 360 + 360) % 360;
    const largeArc = span > 180 ? 1 : 0;
    return [
        `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
        `A ${rOut} ${rOut} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
        `L ${x3.toFixed(2)} ${y3.toFixed(2)}`,
        `A ${rIn} ${rIn} 0 ${largeArc} 0 ${x4.toFixed(2)} ${y4.toFixed(2)}`,
        'Z'
    ].join(' ');
}

function arcTextPath(cx, cy, r, startDeg, endDeg, sweepFlag) {
    const [x1, y1] = polar(cx, cy, r, startDeg);
    const [x2, y2] = polar(cx, cy, r, endDeg);
    const span = Math.abs(endDeg - startDeg);
    const largeArc = span > 180 ? 1 : 0;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} ${sweepFlag} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function hemiSectorPath(cx, cy, r, leadAngleDeg, positive) {
    const start = leadAngleDeg + (positive ? -90 : 90);
    const end = leadAngleDeg + (positive ? 90 : 270);
    const [x1, y1] = polar(cx, cy, r, start);
    const [x2, y2] = polar(cx, cy, r, end);
    return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

// Anatomical cardiac silhouette tilted so the apex points toward +55 deg (Lead II).
const RA_OUTER = 'M -74 -84 C -106 -72 -110 -24 -84 -4 C -62 3 -34 -3 -20 -12 L -16 -64 Q -36 -90 -74 -84 Z';
const RA_CAVITY = 'M -69 -72 C -90 -62 -92 -30 -74 -15 C -58 -10 -38 -15 -28 -21 L -26 -56 Q -40 -77 -69 -72 Z';
const LA_OUTER = 'M -12 -64 C 2 -94 48 -96 72 -72 C 90 -54 86 -22 60 -11 C 34 -14 8 -14 -12 -12 Z';
const LA_CAVITY = 'M -2 -58 C 9 -80 42 -81 58 -63 C 70 -50 67 -29 51 -22 C 30 -24 10 -23 -2 -22 Z';

const VENTRICLE_OUTER = 'M -84 -5 C -104 34 -74 86 8 112 C 32 121 50 116 58 106 C 95 76 102 20 62 -12 C 26 -19 -28 -18 -84 -5 Z';
const RV_CAVITY = 'M -71 5 C -81 36 -54 70 -6 88 C -13 60 -13 28 -12 0 C -36 -3 -56 -1 -71 5 Z';
const LV_CAVITY = 'M 14 2 C 32 -2 50 4 56 14 C 66 36 58 72 36 89 C 19 72 13 40 14 2 Z';

const ATRIAL_PATHS = {
    interNodal: 'M -72 -70 C -45 -72 -26 -52 -16 -20',
    crista: 'M -72 -70 C -84 -42 -66 -18 -16 -20',
    bachmann: 'M -64 -70 C -25 -88 18 -84 52 -60'
};
const VENTRICULAR_PATHS = {
    hisAndLeft: 'M -16 -20 L -4 2 L 5 52 C 12 88 42 96 72 58 C 82 38 78 14 64 -2',
    leftAnterior: 'M 4 38 C 36 30 62 18 72 4',
    rightBundle: 'M -4 2 L -4 58 C -8 82 -44 78 -72 42 C -82 26 -82 10 -74 -2'
};

function MyocardiumWaves({ time, prefix }) {
    const atrialP = Math.max(0, Math.min(1, (time - 80) / 100));
    const atrialFade = time >= 180 ? Math.max(0, 1 - (time - 180) / 30) : 1;
    const isAtrial = time >= 80 && time < 210;

    const isSeptal = time >= 210 && time < 230;
    const septalP = Math.max(0, Math.min(1, (time - 210) / 20));
    const isDepol = time >= 230 && time < 300;
    const depolP = Math.max(0, Math.min(1, (time - 230) / 70));
    const isPlateau = time >= 300 && time < 380;
    const isRepol = time >= 380 && time < 540;
    const repolP = Math.max(0, Math.min(1, (time - 380) / 160));
    const repolFade = time >= 540 && time < 570 ? Math.max(0, 1 - (time - 540) / 30) : 1;

    return (
        <g>
            {/* Atrial smooth depolarization wave from SA node */}
            <g clipPath={`url(#${prefix}-atria-clip)`} opacity={isAtrial ? atrialFade : 0}>
                <circle
                    cx="-72"
                    cy="-70"
                    r={18 + atrialP * 155}
                    fill={`url(#${prefix}-atrial-wave)`}
                />
            </g>

            {/* Ventricular smooth waves (clipped to ventricular silhouette, cavities painted above) */}
            <g clipPath={`url(#${prefix}-vent-clip)`}>
                {isSeptal && (
                    <ellipse
                        cx={-2 + septalP * 5}
                        cy={32 + septalP * 14}
                        rx={10 + septalP * 14}
                        ry={22 + septalP * 24}
                        fill={`url(#${prefix}-septal-glow)`}
                    />
                )}
                {(isDepol || isPlateau || isRepol || repolFade < 1) && (
                    <>
                        {isDepol && (
                            <ellipse
                                cx="10"
                                cy="48"
                                rx={16 + depolP * 98}
                                ry={22 + depolP * 96}
                                fill={`url(#${prefix}-depol-wave)`}
                            />
                        )}
                        {isPlateau && (
                            <rect x="-120" y="-40" width="240" height="175" fill="#dc8670" opacity="0.88" />
                        )}
                        {isRepol && (
                            <>
                                <rect x="-120" y="-40" width="240" height="175" fill="#2f947c" opacity="0.72" />
                                <ellipse
                                    cx="8"
                                    cy="48"
                                    rx={Math.max(8, (1 - repolP) * 96)}
                                    ry={Math.max(12, (1 - repolP) * 86)}
                                    fill={`url(#${prefix}-repol-core)`}
                                />
                            </>
                        )}
                        {!isRepol && !isPlateau && !isDepol && time >= 540 && time < 570 && (
                            <rect x="-120" y="-40" width="240" height="175" fill="#2f947c" opacity={0.55 * repolFade} />
                        )}
                    </>
                )}
            </g>
        </g>
    );
}

function AnatomicalHeart({ time, prefix }) {
    const atrialProgress = Math.max(0, Math.min(1, (time - 80) / 100));
    const avDelay = time >= 180 && time < 210;
    const ventricularProgress = Math.max(0, Math.min(1, (time - 210) / 70));

    return (
        <g transform={`translate(${CX} ${CY}) scale(0.84)`} filter={`url(#${prefix}-soft-shadow)`}>
            {/* Great Vessels (posterior/superior) */}
            {/* Right pulmonary artery passes posterior to ascending aorta & SVC */}
            <path d="M -8 -90 C -34 -94 -64 -92 -88 -84 L -84 -70 C -62 -76 -36 -78 -12 -74 Z" fill={`url(#${prefix}-pulm)`} stroke="#6b8098" strokeWidth="1.3" />
            <path d="M -70 -10 L -72 28 C -72 34 -48 34 -48 28 L -48 -10 Z" fill={`url(#${prefix}-vein)`} stroke="#738d9e" strokeWidth="1.5" />
            <path d="M -78 -134 C -78 -138 -52 -138 -52 -134 L -50 -74 L -78 -74 Z" fill={`url(#${prefix}-vein)`} stroke="#738d9e" strokeWidth="1.5" />
            <ellipse cx="-65" cy="-134" rx="13" ry="3.8" fill="#7c98aa" stroke="#647f91" strokeWidth="1.2" />

            {/* Left pulmonary veins entering LA */}
            <path d="M 60 -68 L 92 -78 C 96 -74 96 -66 91 -63 L 64 -55 Z" fill={`url(#${prefix}-artery)`} stroke="#a35e54" strokeWidth="1.3" />
            <path d="M 66 -50 L 97 -54 C 100 -49 99 -41 94 -39 L 66 -37 Z" fill={`url(#${prefix}-artery)`} stroke="#a35e54" strokeWidth="1.3" />

            {/* Aortic arch with supra-aortic trunks */}
            <path d="M 2 -128 L -1 -148 L 10 -149 L 13 -130 Z" fill={`url(#${prefix}-artery)`} stroke="#a35e54" strokeWidth="1.2" />
            <path d="M 22 -134 L 22 -152 L 32 -151 L 31 -132 Z" fill={`url(#${prefix}-artery)`} stroke="#a35e54" strokeWidth="1.2" />
            <path d="M 40 -127 L 46 -146 L 56 -143 L 49 -121 Z" fill={`url(#${prefix}-artery)`} stroke="#a35e54" strokeWidth="1.2" />
            <path
                d="M -14 -44 C -16 -108 6 -136 36 -130 C 60 -125 68 -96 58 -68 L 36 -66 C 42 -90 36 -106 24 -107 C 10 -108 6 -82 9 -44 Z"
                fill={`url(#${prefix}-artery)`}
                stroke="#9c554b"
                strokeWidth="1.6"
            />

            {/* Pulmonary trunk crossing anterior to aortic root and left branch */}
            <path
                d="M -40 -6 C -42 -58 -22 -90 8 -96 C 32 -101 64 -98 84 -88 L 78 -72 C 56 -80 32 -82 14 -78 C -4 -74 -16 -48 -14 -6 Z"
                fill={`url(#${prefix}-pulm)`}
                stroke="#6b8098"
                strokeWidth="1.5"
            />

            {/* Base myocardium for atria & ventricles */}
            <path d={RA_OUTER} fill={`url(#${prefix}-myo-rest)`} stroke="#8c9d95" strokeWidth="1.8" />
            <path d={LA_OUTER} fill={`url(#${prefix}-myo-rest)`} stroke="#8c9d95" strokeWidth="1.8" />
            <path d={VENTRICLE_OUTER} fill={`url(#${prefix}-myo-rest)`} stroke="#82948b" strokeWidth="2" />

            {/* Smooth physiological wave overlays */}
            <MyocardiumWaves time={time} prefix={prefix} />

            {/* Chamber outer contour lines for crisp definition */}
            <path d={RA_OUTER} fill="none" stroke="#85978f" strokeWidth="1.7" />
            <path d={LA_OUTER} fill="none" stroke="#85978f" strokeWidth="1.7" />
            <path d={VENTRICLE_OUTER} fill="none" stroke="#788a81" strokeWidth="2" />

            {/* Chamber inner cavities */}
            <path d={RA_CAVITY} fill={`url(#${prefix}-lumen-venous)`} stroke="#7d95a3" strokeWidth="1.5" />
            <path d={LA_CAVITY} fill={`url(#${prefix}-lumen-arterial)`} stroke="#b68a83" strokeWidth="1.5" />
            <path d={RV_CAVITY} fill={`url(#${prefix}-lumen-venous)`} stroke="#78909e" strokeWidth="1.5" />
            <path d={LV_CAVITY} fill={`url(#${prefix}-lumen-arterial)`} stroke="#b37f78" strokeWidth="1.6" />

            {/* Fibrous AV ring (electrical insulator between atria and ventricles) */}
            <path d="M -85 -6 C -34 -18 22 -18 64 -11" fill="none" stroke="#eef1eb" strokeWidth="4.2" strokeLinecap="round" opacity="0.88" />
            <path d="M -85 -6 C -34 -18 22 -18 64 -11" fill="none" stroke="#9aa89e" strokeWidth="1.1" strokeDasharray="3 3" strokeLinecap="round" />

            {/* Electrical conduction system */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d={`${ATRIAL_PATHS.interNodal} ${ATRIAL_PATHS.crista} ${ATRIAL_PATHS.bachmann}`} stroke="#b6c6bf" strokeWidth="2.6" />
                <path d={`${VENTRICULAR_PATHS.hisAndLeft} ${VENTRICULAR_PATHS.leftAnterior} ${VENTRICULAR_PATHS.rightBundle}`} stroke="#b7c2b0" strokeWidth="3.2" />

                {time >= 80 && time < 190 && (
                    <path
                        d={`${ATRIAL_PATHS.interNodal} ${ATRIAL_PATHS.crista} ${ATRIAL_PATHS.bachmann}`}
                        pathLength="1"
                        strokeDasharray={`${Math.min(1, atrialProgress * 1.15)} 1`}
                        stroke="#3161ca"
                        strokeWidth="4"
                    />
                )}
                {time >= 210 && time < 305 && (
                    <path
                        d={`${VENTRICULAR_PATHS.hisAndLeft} ${VENTRICULAR_PATHS.leftAnterior} ${VENTRICULAR_PATHS.rightBundle}`}
                        pathLength="1"
                        strokeDasharray={`${ventricularProgress} 1`}
                        stroke="#f6c756"
                        strokeWidth="4.4"
                    />
                )}
            </g>

            {/* SA Node */}
            {time >= 72 && time < 140 && (
                <circle cx="-72" cy="-70" r={10 + Math.sin(Math.min(1, (time - 72) / 68) * Math.PI) * 5} fill="#3b6fd8" opacity="0.28" />
            )}
            <circle
                cx="-72"
                cy="-70"
                r="6.2"
                fill={time >= 80 && time < 180 ? '#3161ca' : '#e8be59'}
                stroke="#fffdf8"
                strokeWidth="2"
            />

            {/* AV Node */}
            {avDelay && (
                <circle cx="-16" cy="-20" r={10 + Math.sin(((time - 180) / 30) * Math.PI) * 6} fill="#e5a93b" opacity="0.35" />
            )}
            <circle
                cx="-16"
                cy="-20"
                r={avDelay ? 8 : 5.5}
                fill={avDelay ? '#df9928' : '#e8be59'}
                stroke="#fffdf8"
                strokeWidth="2"
            />

            {/* Chamber & Node labels */}
            <text x="-60" y="-42" className="ehm-chamber-label">HA</text>
            <text x="31" y="-44" className="ehm-chamber-label">VA</text>
            <text x="-43" y="42" className="ehm-chamber-label">HV</text>
            <text x="36" y="45" className="ehm-chamber-label">VV</text>
            <text x="-95" y="-82" className="ehm-node-label">SA</text>
            <text x="-34" y="-27" className="ehm-node-label">AV</text>
        </g>
    );
}

const CABRERA_SECTORS = [
    { id: 'normal', label: 'NORMAL AKSE', rText: 168, startDeg: -30, endDeg: 90, textStart: 82, textEnd: 6, sweep: 0, color: '#2f7a62', fill: 'rgba(47, 122, 98, 0.14)' },
    { id: 'lad', label: 'VENSTREDREJET (LAD)', rText: 168, startDeg: -90, endDeg: -30, textStart: -88, textEnd: -32, sweep: 1, color: '#c87a19', fill: 'rgba(200, 122, 25, 0.15)' },
    { id: 'rad', label: 'HØJREDREJET (RAD)', rText: 168, startDeg: 90, endDeg: 180, textStart: 176, textEnd: 94, sweep: 0, color: '#d45b2c', fill: 'rgba(212, 91, 44, 0.14)' },
    { id: 'extreme', label: 'EKSTREM AKSE', rText: 168, startDeg: 180, endDeg: 270, textStart: -174, textEnd: -96, sweep: 1, color: '#be3c48', fill: 'rgba(190, 60, 72, 0.11)' }
];

const DEGREE_LABELS = [
    { deg: -90, text: '−90°' },
    { deg: -60, text: '−60°' },
    { deg: -120, text: '−120°' },
    { deg: 30, text: '+30° (−aVR)' },
    { deg: 150, text: '+150°' },
    { deg: 180, text: '±180°' }
];

export default function EkgFrontalHeartSvg({
    lead,
    time,
    onSelect,
    showVector,
    showAxisZones = true,
    axisOffsetDeg = 0,
    prefix
}) {
    const details = MODEL_LEADS[lead] || MODEL_LEADS.II;
    const { vector, unit, point, voltage } = projectionAt(lead, time, axisOffsetDeg);
    const tip = [CX + vector[0] * VECTOR_SCALE, CY + vector[1] * VECTOR_SCALE];
    const foot = [CX + point[0] * VECTOR_SCALE, CY + point[1] * VECTOR_SCALE];
    const magnitude = Math.hypot(...vector);

    const meanAngle = meanQrsAngle(axisOffsetDeg);
    const meanZone = axisZoneForAngle(meanAngle);
    const [meanTipX, meanTipY] = polar(CX, CY, 152, meanAngle);
    const vcgPath = vectorLoopPath('frontal', CX, CY, VECTOR_SCALE, axisOffsetDeg);

    const [isoA_x, isoA_y] = polar(CX, CY, R_INNER, details.angle - 90);
    const [isoB_x, isoB_y] = polar(CX, CY, R_INNER, details.angle + 90);
    const [isoLblX, isoLblY] = polar(CX, CY, 126, details.angle - 90);

    const [posWmX, posWmY] = polar(CX, CY, 125, details.angle);
    const [negWmX, negWmY] = polar(CX, CY, 125, details.angle + 180);

    const [minusX, minusY] = polar(CX, CY, R_LEAD, details.angle + 180);

    const projLengthPx = Math.hypot(foot[0] - CX, foot[1] - CY);
    const dropLengthPx = Math.hypot(tip[0] - foot[0], tip[1] - foot[1]);
    let rightAnglePath = null;
    if (projLengthPx > 14 && dropLengthPx > 14) {
        const s = 8;
        const ux = (CX - foot[0]) / projLengthPx;
        const uy = (CY - foot[1]) / projLengthPx;
        const dx = (tip[0] - foot[0]) / dropLengthPx;
        const dy = (tip[1] - foot[1]) / dropLengthPx;
        rightAnglePath = `M ${(foot[0] + ux * s).toFixed(1)} ${(foot[1] + uy * s).toFixed(1)} L ${(foot[0] + ux * s + dx * s).toFixed(1)} ${(foot[1] + uy * s + dy * s).toFixed(1)} L ${(foot[0] + dx * s).toFixed(1)} ${(foot[1] + dy * s).toFixed(1)}`;
    }

    const projectionColor = voltage >= 0 ? '#2f7a62' : '#c0444f';

    return (
        <svg
            className="ehm-heart-map"
            viewBox="0 0 680 540"
            role="group"
            aria-label="Cabrera-cirkel og anatomisk frontal hjertemodel"
        >
            <defs>
                <radialGradient id={`${prefix}-dial-bg`} cx="50%" cy="46%" r="55%">
                    <stop offset="0%" stopColor="#fffef9" />
                    <stop offset="75%" stopColor="#f8f9f3" />
                    <stop offset="100%" stopColor="#eff3ea" />
                </radialGradient>
                <radialGradient id={`${prefix}-myo-rest`} cx="45%" cy="40%" r="65%">
                    <stop offset="0%" stopColor="#eef2ee" />
                    <stop offset="100%" stopColor="#d7dfda" />
                </radialGradient>
                <linearGradient id={`${prefix}-vein`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#94b0c2" />
                    <stop offset="50%" stopColor="#b9cedb" />
                    <stop offset="100%" stopColor="#89a5b8" />
                </linearGradient>
                <linearGradient id={`${prefix}-pulm`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a9bcca" />
                    <stop offset="100%" stopColor="#869db0" />
                </linearGradient>
                <linearGradient id={`${prefix}-artery`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#db9b8f" />
                    <stop offset="50%" stopColor="#c97d70" />
                    <stop offset="100%" stopColor="#b5675a" />
                </linearGradient>
                <radialGradient id={`${prefix}-lumen-venous`} cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#f2f6f9" />
                    <stop offset="100%" stopColor="#dae6ee" />
                </radialGradient>
                <radialGradient id={`${prefix}-lumen-arterial`} cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#fff7f3" />
                    <stop offset="100%" stopColor="#f5ded7" />
                </radialGradient>
                <radialGradient id={`${prefix}-atrial-wave`}>
                    <stop offset="0%" stopColor="#3566cc" stopOpacity="0.82" />
                    <stop offset="78%" stopColor="#4f7fe0" stopOpacity="0.65" />
                    <stop offset="94%" stopColor="#7ba4f0" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#7ba4f0" stopOpacity="0" />
                </radialGradient>
                <radialGradient id={`${prefix}-septal-glow`}>
                    <stop offset="0%" stopColor="#f0ad42" stopOpacity="0.92" />
                    <stop offset="70%" stopColor="#df7e59" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#df7e59" stopOpacity="0" />
                </radialGradient>
                <radialGradient id={`${prefix}-depol-wave`}>
                    <stop offset="0%" stopColor="#d97158" stopOpacity="0.86" />
                    <stop offset="74%" stopColor="#e27f59" stopOpacity="0.78" />
                    <stop offset="90%" stopColor="#f3b24e" stopOpacity="0.82" />
                    <stop offset="100%" stopColor="#f3b24e" stopOpacity="0" />
                </radialGradient>
                <radialGradient id={`${prefix}-repol-core`}>
                    <stop offset="0%" stopColor="#da7961" stopOpacity="0.95" />
                    <stop offset="72%" stopColor="#e28e6d" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#2f947c" stopOpacity="0" />
                </radialGradient>
                <clipPath id={`${prefix}-inner-circle`}>
                    <circle cx={CX} cy={CY} r={R_INNER} />
                </clipPath>
                <clipPath id={`${prefix}-atria-clip`}>
                    <path d={RA_OUTER} />
                    <path d={LA_OUTER} />
                </clipPath>
                <clipPath id={`${prefix}-vent-clip`}>
                    <path d={VENTRICLE_OUTER} />
                </clipPath>
                <filter id={`${prefix}-soft-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#23372d" floodOpacity="0.14" />
                </filter>
                <marker id={`${prefix}-vector`} viewBox="0 0 10 10" markerWidth="11" markerHeight="11" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#d58227" />
                </marker>
                <marker id={`${prefix}-proj-pos`} viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#2f7a62" />
                </marker>
                <marker id={`${prefix}-proj-neg`} viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#c0444f" />
                </marker>
                <marker id={`${prefix}-mean-axis`} viewBox="0 0 10 10" markerWidth="9" markerHeight="9" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1.5 L8.5,5 L1,8.5 Z" fill={meanZone.color} />
                </marker>

                {CABRERA_SECTORS.map(sec => (
                    <path
                        key={sec.id}
                        id={`${prefix}-arc-${sec.id}`}
                        d={arcTextPath(CX, CY, sec.rText, sec.textStart, sec.textEnd, sec.sweep)}
                    />
                ))}
            </defs>

            {/* Anatomical room orientations */}
            <text x={CX} y="19" className="ehm-svg-direction">SUPERIOR · HOVED</text>
            <text x={CX} y="527" className="ehm-svg-direction">INFERIOR · FØDDER</text>
            <text x="42" y={CY + 4} className="ehm-svg-direction">HØJRE</text>
            <text x="638" y={CY + 4} className="ehm-svg-direction">VENSTRE</text>

            {/* Layer 1: Inner dial face + Cabrera Protractor Zones */}
            <circle cx={CX} cy={CY} r={R_OUTER} fill={`url(#${prefix}-dial-bg)`} stroke="#d5dfd3" strokeWidth="1.5" />

            {showAxisZones && CABRERA_SECTORS.map(sec => {
                const isActiveZone = meanZone.id === sec.id;
                return (
                    <g key={sec.id}>
                        <path
                            d={annulusSectorPath(CX, CY, R_INNER, R_OUTER, sec.startDeg, sec.endDeg)}
                            fill={sec.fill}
                            stroke={sec.color}
                            strokeWidth={isActiveZone ? 1.5 : 0.7}
                            strokeOpacity={isActiveZone ? 0.8 : 0.35}
                        />
                        <text
                            fontSize="8.2"
                            fontWeight="700"
                            letterSpacing="0.09em"
                            fill={sec.color}
                            opacity={isActiveZone ? 0.96 : 0.72}
                        >
                            <textPath href={`#${prefix}-arc-${sec.id}`} startOffset="50%" textAnchor="middle" dominantBaseline="central">
                                {sec.label}
                            </textPath>
                        </text>
                    </g>
                );
            })}

            {/* 360 degree scale ticks around outer dial */}
            {Array.from({ length: 24 }, (_, idx) => {
                const deg = idx * 15 - 180;
                const major = deg % 30 === 0;
                const [x1, y1] = polar(CX, CY, major ? R_OUTER - 5 : R_OUTER - 3, deg);
                const [x2, y2] = polar(CX, CY, R_OUTER + (major ? 5 : 2), deg);
                return (
                    <line
                        key={deg}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={major ? '#8ea092' : '#c6d1c6'}
                        strokeWidth={major ? 1.3 : 0.8}
                    />
                );
            })}

            {DEGREE_LABELS.map(item => {
                const cosA = Math.cos(rad(item.deg));
                const rLbl = R_OUTER + 9;
                const [lx, ly] = polar(CX, CY, rLbl, item.deg);
                const anchor = cosA > 0.35 ? 'start' : cosA < -0.35 ? 'end' : 'middle';
                return (
                    <text
                        key={item.deg}
                        x={lx}
                        y={ly + (item.deg < -45 ? -1 : 4)}
                        textAnchor={anchor}
                        fontSize="8.8"
                        fontWeight="600"
                        fill="#7a8c7e"
                    >
                        {item.text}
                    </text>
                );
            })}

            {/* Layer 2: Positive / negative hemisphere shading + perpendicular isoelectric line */}
            <g clipPath={`url(#${prefix}-inner-circle)`}>
                <path d={hemiSectorPath(CX, CY, R_INNER, details.angle, true)} fill="rgba(47, 122, 98, 0.11)" />
                <path d={hemiSectorPath(CX, CY, R_INNER, details.angle, false)} fill="rgba(192, 68, 79, 0.055)" />
                <text x={posWmX} y={posWmY + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill="#2f7a62" opacity="0.28">+</text>
                <text x={negWmX} y={negWmY + 5} textAnchor="middle" fontSize="15" fontWeight="800" fill="#c0444f" opacity="0.26">−</text>

                <line x1={isoA_x} y1={isoA_y} x2={isoB_x} y2={isoB_y} stroke="#788d7f" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.65" />
                <text x={isoLblX} y={isoLblY - 4} textAnchor="middle" fontSize="8" fontWeight="600" fill="#708476" className="ehm-halo-text">
                    0 mV (90°)
                </text>
            </g>

            {/* Subtle radial grid lines for all 6 frontal leads */}
            {FRONTAL_LEADS.map(name => {
                const a = MODEL_LEADS[name].angle;
                const [lx, ly] = polar(CX, CY, R_INNER, a);
                const [ox, oy] = polar(CX, CY, R_INNER, a + 180);
                return (
                    <line
                        key={name}
                        x1={ox}
                        y1={oy}
                        x2={lx}
                        y2={ly}
                        stroke={name === lead ? 'transparent' : '#cfd9ce'}
                        strokeWidth="1"
                        strokeDasharray="2 5"
                        opacity="0.7"
                    />
                );
            })}

            {/* Active lead axis */}
            <line
                x1={CX - unit[0] * (R_LEAD - 13)}
                y1={CY - unit[1] * (R_LEAD - 13)}
                x2={CX + unit[0] * (R_LEAD - 22)}
                y2={CY + unit[1] * (R_LEAD - 22)}
                stroke="#2f7a62"
                strokeWidth="1.9"
                strokeDasharray="6 5"
                opacity="0.7"
            />

            {/* Layer 3: Anatomical Heart */}
            <AnatomicalHeart time={time} prefix={prefix} />

            {/* Layer 4: Mean Electrical Axis marker, VCG QRS loop, Instantaneous Vector & Orthogonal Projection */}
            {showVector && (
                <g>
                    <line
                        x1={CX}
                        y1={CY}
                        x2={meanTipX}
                        y2={meanTipY}
                        stroke={meanZone.color}
                        strokeWidth="1.7"
                        strokeDasharray="4 4"
                        opacity="0.65"
                        markerEnd={`url(#${prefix}-mean-axis)`}
                    />
                    <path
                        d={vcgPath}
                        fill="none"
                        stroke="#d58227"
                        strokeWidth="1.6"
                        strokeDasharray="3 3"
                        opacity="0.42"
                    />
                </g>
            )}

            {showVector && magnitude > 0.008 && (
                <g>
                    <line x1={tip[0]} y1={tip[1]} x2={foot[0]} y2={foot[1]} stroke={projectionColor} strokeWidth="1.6" strokeDasharray="4 3" opacity="0.85" />
                    {rightAnglePath && <path d={rightAnglePath} fill="none" stroke={projectionColor} strokeWidth="1.2" opacity="0.8" />}

                    <line x1={CX} y1={CY} x2={foot[0]} y2={foot[1]} stroke="#fffef9" strokeWidth="7.5" strokeLinecap="round" />
                    <line
                        x1={CX}
                        y1={CY}
                        x2={foot[0]}
                        y2={foot[1]}
                        stroke={projectionColor}
                        strokeWidth="4.5"
                        markerEnd={`url(#${prefix}-${voltage >= 0 ? 'proj-pos' : 'proj-neg'})`}
                    />

                    <line x1={CX} y1={CY} x2={tip[0]} y2={tip[1]} stroke="#fffef9" strokeWidth="7.5" strokeLinecap="round" />
                    <line
                        x1={CX}
                        y1={CY}
                        x2={tip[0]}
                        y2={tip[1]}
                        stroke="#d58227"
                        strokeWidth="3.8"
                        markerEnd={`url(#${prefix}-vector)`}
                    />
                    <circle cx={CX} cy={CY} r="4.5" fill="#d58227" stroke="#fffef9" strokeWidth="1.6" />
                </g>
            )}

            {/* Layer 5: Minus pole medallion & clickable 6 Cabrera Lead Badges */}
            <g aria-hidden="true">
                <circle cx={minusX} cy={minusY} r="11.5" fill="#fdf2f2" stroke="#d4898f" strokeWidth="1.5" />
                <text x={minusX} y={minusY + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="#b4434e">−</text>
            </g>

            {FRONTAL_LEADS.map(name => {
                const info = MODEL_LEADS[name];
                const [lx, ly] = polar(CX, CY, R_LEAD, info.angle);
                const active = name === lead;
                return (
                    <g
                        key={name}
                        role="button"
                        tabIndex="0"
                        aria-label={`Vælg afledning ${name}`}
                        aria-pressed={active}
                        className="ehm-map-lead"
                        onClick={() => onSelect(name)}
                        onKeyDown={event => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                onSelect(name);
                            }
                        }}
                    >
                        <rect
                            x={lx - 29}
                            y={ly - 19}
                            width="58"
                            height="38"
                            rx="12"
                            fill={active ? '#2f7a62' : '#fffef9'}
                            stroke={active ? '#235c4a' : '#c6d3c7'}
                            strokeWidth={active ? 2 : 1.2}
                        />
                        <text x={lx} y={ly + 1} textAnchor="middle" fontSize="13.5" fontWeight="750" fill={active ? '#ffffff' : '#354e43'}>
                            {name}<tspan fontSize="9.5" dy="-5"> +</tspan>
                        </text>
                        <text x={lx} y={ly + 13} textAnchor="middle" fontSize="9" fontWeight="600" fill={active ? '#d8efe6' : '#738578'}>
                            {info.angle > 0 ? '+' : ''}{info.angle}°
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
