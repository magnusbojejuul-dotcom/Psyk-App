import React from 'react';
import heartConductionBase from '../../assets/ekg_heart_conduction_base.png';
import {
    CHAMBER_GLOWS,
    CONDUCTION_PATHS,
    HEART_CENTER,
    HEART_IMG_H,
    HEART_IMG_W,
    HEART_LABELS,
    PATHOLOGY_CALLOUTS,
    PATHOLOGY_MARKERS,
    PATHOLOGY_PATHS,
    PHASE_COLORS,
    REPOLARIZATION_ARROWS,
    REPOLARIZATION_WALLS
} from '../../data/heartConductionPaths';
import {
    MODEL_LEADS,
    axisZoneForAngle,
    meanQrsAngle,
    projectionAt
} from '../../data/ekgSimulation';

const FRONTAL_LEADS = ['aVL', 'I', 'II', 'aVF', 'III', 'aVR'];
const CX = 340;
const CY = 270;
const R_INNER = 176;
const R_OUTER = 187;
const R_LEAD = 216;
const VECTOR_SCALE = 100;

const IMG_W = 282;
const IMG_H = Number((IMG_W * HEART_IMG_H / HEART_IMG_W).toFixed(2));
const IMG_SCALE = IMG_W / HEART_IMG_W;
const IMG_X = Number((CX - HEART_CENTER.x * IMG_SCALE).toFixed(2));
const IMG_Y = Number((CY - HEART_CENTER.y * IMG_SCALE).toFixed(2));

const rad = deg => deg * Math.PI / 180;
const polar = (cx, cy, r, deg) => [cx + Math.cos(rad(deg)) * r, cy + Math.sin(rad(deg)) * r];
const clamp01 = v => Math.max(0, Math.min(1, v));

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

const CABRERA_SECTORS = [
    { id: 'normal', label: 'NORMAL AKSE', startDeg: -30, endDeg: 90, textStart: 80, textEnd: 10, sweep: 0, color: '#2f7a62', activeFill: 'rgba(47, 122, 98, 0.22)' },
    { id: 'lad', label: 'LAD', startDeg: -90, endDeg: -30, textStart: -84, textEnd: -36, sweep: 1, color: '#c87a19', activeFill: 'rgba(200, 122, 25, 0.24)' },
    { id: 'rad', label: 'RAD', startDeg: 90, endDeg: 180, textStart: 170, textEnd: 100, sweep: 0, color: '#d45b2c', activeFill: 'rgba(212, 91, 44, 0.22)' },
    { id: 'extreme', label: 'EKSTREM', startDeg: 180, endDeg: 270, textStart: -170, textEnd: -100, sweep: 1, color: '#be3c48', activeFill: 'rgba(190, 60, 72, 0.18)' }
];

function ElectricPath({ d, progress, color, width = 14, markerEnd }) {
    const p = clamp01(progress);
    if (p <= 0.001) return null;
    return (
        <g>
            <path d={d} pathLength="1" strokeDasharray={`${p} 1`} stroke={color} strokeWidth={width * 1.9} opacity="0.30" />
            <path d={d} pathLength="1" strokeDasharray={`${p} 1`} stroke={color} strokeWidth={width} opacity="0.96" markerEnd={p > 0.2 ? markerEnd : undefined} />
            <path d={d} pathLength="1" strokeDasharray={`${p} 1`} stroke="#ffffff" strokeWidth={width * 0.34} opacity="0.62" />
        </g>
    );
}

function smoothWavePath(pairs, progress) {
    const p = clamp01(progress);
    const pts = pairs.map(([outer, inner]) => [
        outer[0] + (inner[0] - outer[0]) * p,
        outer[1] + (inner[1] - outer[1]) * p
    ]);
    if (pts.length < 2) return '';
    let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i][0] + pts[i + 1][0]) / 2;
        const my = (pts[i][1] + pts[i + 1][1]) / 2;
        d += ` Q ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    const last = pts[pts.length - 1];
    d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
    return d;
}

function BlockMark({ x, y, color = '#c43b47', pulse = 0 }) {
    const r = 34 + pulse * 7;
    return (
        <g style={{ pointerEvents: 'none' }}>
            <circle cx={x} cy={y} r={r + 12 + pulse * 14} fill={color} opacity={0.14 + pulse * 0.24} />
            <circle cx={x} cy={y} r={r + 4} fill="#ffffff" opacity="0.95" />
            <circle cx={x} cy={y} r={r} fill="#fff3f3" stroke={color} strokeWidth="7.5" />
            <path d={`M ${x - 14} ${y - 14} L ${x + 14} ${y + 14} M ${x + 14} ${y - 14} L ${x - 14} ${y + 14}`} stroke={color} strokeWidth="8.5" strokeLinecap="round" />
        </g>
    );
}

function FocusMark({ x, y, color = '#dc2626', pulse = 0 }) {
    return (
        <g style={{ pointerEvents: 'none' }}>
            <circle cx={x} cy={y} r={38 + pulse * 30} fill={color} opacity={0.15 + pulse * 0.26} />
            <circle cx={x} cy={y} r={34} fill="#ffffff" opacity="0.95" />
            <circle cx={x} cy={y} r={30 + pulse * 5} fill="#fff7ed" stroke={color} strokeWidth="7" />
            <polygon
                points={`${x + 4},${y - 19} ${x - 13},${y + 3} ${x},${y + 3} ${x - 5},${y + 19} ${x + 13},${y - 3} ${x},${y - 3}`}
                fill={color}
            />
        </g>
    );
}

function CalloutBadge({ x, y, tx, ty, title, sub, color }) {
    const w = 336;
    const h = 76;
    const left = x - w / 2;
    const top = y - h / 2;
    const anchorX = Math.max(left + 20, Math.min(left + w - 20, tx));
    const anchorY = ty < y ? top : top + h;
    return (
        <g style={{ pointerEvents: 'none' }}>
            <line
                x1={anchorX}
                y1={anchorY}
                x2={tx}
                y2={ty}
                stroke={color}
                strokeWidth="4.5"
                strokeDasharray="10 8"
                opacity="0.88"
            />
            <circle cx={tx} cy={ty} r="7.5" fill={color} stroke="#ffffff" strokeWidth="3" />
            <rect
                x={left}
                y={top}
                width={w}
                height={h}
                rx="18"
                fill="rgba(255, 254, 250, 0.96)"
                stroke={color}
                strokeWidth="4.5"
            />
            <rect x={left + 8} y={top + 11} width="9" height={h - 22} rx="4.5" fill={color} />
            <text x={left + 28} y={top + 32} fontSize="24" fontWeight="800" fill="#1e352b">
                {title}
            </text>
            <text x={left + 28} y={top + 60} fontSize="20" fontWeight="600" fill="#4f6659">
                {sub}
            </text>
        </g>
    );
}

function ConductionOverlay({ time, prefix, rhythmId = 'normal' }) {
    const isAfib = rhythmId === 'afib';
    const isFlutter = rhythmId === 'aflutter';
    const isAv1 = rhythmId === 'av_block_1';
    const isAv3 = rhythmId === 'av_block_3';
    const isLbbb = rhythmId === 'lbbb';
    const isRbbb = rhythmId === 'rbbb';
    const isVt = rhythmId === 'vt';

    // Atrial choreography per rhythm
    let saActive = time >= 72 && time < 195;
    let saStart = 80;
    let saEnd = 195;
    if (isAfib || isFlutter || isVt) {
        saActive = false;
    } else if (isAv1) {
        saStart = 40;
        saEnd = 135;
        saActive = time >= 35 && time < 135;
    } else if (isAv3) {
        if (time >= 80 && time < 170) {
            saStart = 85;
            saEnd = 165;
            saActive = true;
        } else if (time >= 480 && time < 570) {
            saStart = 485;
            saEnd = 565;
            saActive = true;
        } else {
            saActive = false;
        }
    }

    const saPulse = saActive ? Math.sin(clamp01((time - saStart) / 55) * Math.PI) : 0;
    const atrialLineActive = saActive;
    const atrialLineFade = saActive && time >= saEnd - 22 ? clamp01(1 - (time - (saEnd - 22)) / 22) : 1;
    const saBridgeProgress = clamp01((time - saStart) / 22);
    const internodalProgress = clamp01((time - saStart) / 62);
    const bachmannProgress = clamp01((time - saStart - 2) / 46);
    const bachmannBranchProgress = clamp01((time - saStart - 34) / 38);

    const normalAtrialGlow = saActive
        ? Math.sin(clamp01((time - saStart) / (saEnd - saStart)) * Math.PI) * 0.24
        : 0;
    const afibGlow = isAfib ? (0.14 + 0.08 * Math.sin((time / 800) * Math.PI * 12)) : 0;
    const flutterGlow = isFlutter ? (0.14 + 0.08 * Math.sin(((time % 200) / 200) * Math.PI * 2)) : 0;
    const atrialGlow = Math.max(normalAtrialGlow, afibGlow, flutterGlow);

    // AV node timing
    const avStart = isAv1 ? 125 : isAv3 ? 0 : 160;
    const avEnd = isAv1 ? 298 : isAv3 ? 0 : 215;
    const avActive = isVt ? false : (isAv1 || !isAv3) ? (time >= avStart && time < avEnd) : false;
    const avPulse = avActive ? Math.sin(clamp01((time - avStart) / Math.max(1, avEnd - avStart)) * Math.PI) : 0;
    const av3BlockedFlash = isAv3
        ? Math.max(
            time >= 145 && time < 205 ? Math.sin(clamp01((time - 145) / 60) * Math.PI) : 0,
            time >= 545 && time < 605 ? Math.sin(clamp01((time - 545) / 60) * Math.PI) : 0
        )
        : 0;

    // Ventricular timing per rhythm
    const qrsStart = isAv1 ? 290 : isAv3 ? 220 : 210;
    const qrsEnd = (isLbbb || isRbbb) ? 355 : isAv3 ? 340 : isAv1 ? 380 : 300;
    const vtLocal = time % 400;
    const vtBeatActive = isVt && vtLocal >= 15 && vtLocal < 188;
    const vtBeatFade = vtBeatActive && vtLocal >= 164 ? clamp01(1 - (vtLocal - 164) / 24) : 1;

    const ventLineActive = !isVt && time >= qrsStart && time < qrsEnd + 20;
    const ventLineFade = ventLineActive && time >= qrsEnd - 5 ? clamp01(1 - (time - (qrsEnd - 5)) / 25) : 1;
    const hisProgress = isAv3 ? 0 : clamp01((time - qrsStart) / 14);
    const bundleProgress = isAv3
        ? clamp01((time - qrsStart - 10) / 55)
        : clamp01((time - qrsStart - 10) / 42);
    const fascicleProgress = isAv3 ? clamp01((time - qrsStart - 20) / 30) : clamp01((time - qrsStart - 22) / 22);
    const purkinjeProgress = isAv3
        ? clamp01((time - qrsStart - 45) / 55)
        : clamp01((time - qrsStart - 48) / 38);

    const septalGlow = isVt
        ? 0
        : (time >= qrsStart + 2 && time < qrsStart + 42)
            ? Math.sin(clamp01((time - qrsStart - 2) / 40) * Math.PI) * 0.20
            : 0;

    // Differential chamber glows for LBBB / RBBB / VT vs symmetric
    const ventBaseGlow = (!isVt && time >= qrsStart + 20 && time < qrsEnd + 10)
        ? Math.sin(clamp01((time - (qrsStart + 20)) / (qrsEnd - qrsStart - 10)) * Math.PI * 0.65) * 0.18
        : 0;
    const rvDepolGlow = isVt
        ? (vtBeatActive ? Math.sin(clamp01((vtLocal - 40) / 140) * Math.PI) * 0.16 * vtBeatFade : 0)
        : isLbbb
            ? (time >= 220 && time < 305 ? Math.sin(clamp01((time - 220) / 85) * Math.PI) * 0.20 : 0)
            : isRbbb
                ? (time >= 270 && time < 365 ? Math.sin(clamp01((time - 270) / 95) * Math.PI) * 0.22 : 0)
                : ventBaseGlow;
    const lvDepolGlow = isVt
        ? (vtBeatActive ? Math.sin(clamp01((vtLocal - 15) / 165) * Math.PI) * 0.22 * vtBeatFade : 0)
        : isLbbb
            ? (time >= 255 && time < 365 ? Math.sin(clamp01((time - 255) / 110) * Math.PI) * 0.22 : 0)
            : isRbbb
                ? (time >= 222 && time < 305 ? Math.sin(clamp01((time - 222) / 83) * Math.PI) * 0.19 : 0)
                : ventBaseGlow;

    const repolStart = isAv1 ? 460 : isAv3 ? 355 : isLbbb ? 395 : isRbbb ? 390 : 380;
    const repolDur = isAv3 ? 120 : 160;
    const isRepol = isVt
        ? (vtLocal >= 200 && vtLocal < 360)
        : (time >= repolStart && time < repolStart + repolDur + 10);
    const repolP = isVt
        ? clamp01((vtLocal - 200) / 160)
        : clamp01((time - repolStart) / repolDur);
    const repolEdgeFade = !isRepol
        ? 0
        : repolP < 0.14
            ? clamp01(repolP / 0.14)
            : repolP > 0.80
                ? clamp01((1 - repolP) / 0.20)
                : 1;
    const stGlow = (!isVt && time >= qrsEnd && time < repolStart + repolDur)
        ? (time < repolStart ? 0.11 : 0.11 * (1 - repolP))
        : 0;
    const repolGlow = isRepol ? Math.sin(repolP * Math.PI) * 0.16 : 0;

    return (
        <g transform={`translate(${IMG_X} ${IMG_Y}) scale(${IMG_SCALE})`}>
            {/* Soft regional chamber depolarization / repolarization glows */}
            <g filter={`url(#${prefix}-soft-blur)`} style={{ pointerEvents: 'none' }}>
                {atrialGlow > 0.005 && (
                    <>
                        <ellipse {...CHAMBER_GLOWS.ra} fill={isAfib ? '#7c5cbf' : isFlutter ? '#2b78b8' : PHASE_COLORS.p} opacity={atrialGlow} />
                        {!isFlutter && (
                            <ellipse cx={CHAMBER_GLOWS.la.cx} cy={CHAMBER_GLOWS.la.cy} rx={CHAMBER_GLOWS.la.rx} ry={CHAMBER_GLOWS.la.ry} fill={isAfib ? '#7c5cbf' : PHASE_COLORS.p} opacity={atrialGlow * 0.88} />
                        )}
                    </>
                )}
                {septalGlow > 0.005 && (
                    <ellipse
                        cx={CHAMBER_GLOWS.septum.cx}
                        cy={CHAMBER_GLOWS.septum.cy}
                        rx={CHAMBER_GLOWS.septum.rx}
                        ry={CHAMBER_GLOWS.septum.ry}
                        transform={`rotate(${CHAMBER_GLOWS.septum.rotate} ${CHAMBER_GLOWS.septum.cx} ${CHAMBER_GLOWS.septum.cy})`}
                        fill={PHASE_COLORS.qrs}
                        opacity={septalGlow}
                    />
                )}
                {(rvDepolGlow > 0.005 || lvDepolGlow > 0.005 || stGlow > 0.005) && (
                    <>
                        <ellipse
                            cx={CHAMBER_GLOWS.rv.cx}
                            cy={CHAMBER_GLOWS.rv.cy}
                            rx={CHAMBER_GLOWS.rv.rx}
                            ry={CHAMBER_GLOWS.rv.ry}
                            transform={`rotate(${CHAMBER_GLOWS.rv.rotate} ${CHAMBER_GLOWS.rv.cx} ${CHAMBER_GLOWS.rv.cy})`}
                            fill={stGlow > 0 && rvDepolGlow <= 0.005 ? PHASE_COLORS.st : isVt ? '#dc2626' : isRbbb && time >= 270 ? '#0ea5e9' : PHASE_COLORS.qrs}
                            opacity={Math.max(rvDepolGlow, stGlow) * 0.85}
                        />
                        <ellipse
                            cx={CHAMBER_GLOWS.lv.cx}
                            cy={CHAMBER_GLOWS.lv.cy}
                            rx={CHAMBER_GLOWS.lv.rx}
                            ry={CHAMBER_GLOWS.lv.ry}
                            transform={`rotate(${CHAMBER_GLOWS.lv.rotate} ${CHAMBER_GLOWS.lv.cx} ${CHAMBER_GLOWS.lv.cy})`}
                            fill={stGlow > 0 && lvDepolGlow <= 0.005 ? PHASE_COLORS.st : isVt ? '#dc2626' : isLbbb && time >= 255 ? '#8b5cf6' : PHASE_COLORS.qrs}
                            opacity={Math.max(lvDepolGlow, stGlow)}
                        />
                    </>
                )}
                {repolGlow > 0.005 && (
                    <>
                        <ellipse
                            cx={CHAMBER_GLOWS.rv.cx}
                            cy={CHAMBER_GLOWS.rv.cy}
                            rx={CHAMBER_GLOWS.rv.rx}
                            ry={CHAMBER_GLOWS.rv.ry}
                            transform={`rotate(${CHAMBER_GLOWS.rv.rotate} ${CHAMBER_GLOWS.rv.cx} ${CHAMBER_GLOWS.rv.cy})`}
                            fill={PHASE_COLORS.t}
                            opacity={repolGlow * 0.78}
                        />
                        <ellipse
                            cx={CHAMBER_GLOWS.lv.cx}
                            cy={CHAMBER_GLOWS.lv.cy}
                            rx={CHAMBER_GLOWS.lv.rx}
                            ry={CHAMBER_GLOWS.lv.ry}
                            transform={`rotate(${CHAMBER_GLOWS.lv.rotate} ${CHAMBER_GLOWS.lv.cx} ${CHAMBER_GLOWS.lv.cy})`}
                            fill={PHASE_COLORS.t}
                            opacity={repolGlow}
                        />
                    </>
                )}
            </g>

            {/* Atrial fibrillation: muted SA + chaotic scattered ectopic micro-foci & colliding wavelets */}
            {isAfib && (
                <g style={{ pointerEvents: 'none' }}>
                    <path d={CONDUCTION_PATHS.saNode.outline} fill="#cbd5d0" stroke="#7c5cbf" strokeWidth="3.5" strokeDasharray="8 6" opacity="0.72" />
                    <g fill="none" strokeLinecap="round">
                        {PATHOLOGY_PATHS.afibWavelets.map(w => {
                            const cyc = ((time / 800) * 3.5 + w.phase) % 1;
                            const fade = Math.sin(cyc * Math.PI);
                            return (
                                <g key={w.id} opacity={0.25 + fade * 0.72}>
                                    <path
                                        d={w.d}
                                        pathLength="1"
                                        stroke="#7c5cbf"
                                        strokeWidth="12"
                                        strokeDasharray={`${Math.min(1, cyc * 1.15)} 1`}
                                        markerEnd={`url(#${prefix}-arr-afib)`}
                                    />
                                    <path
                                        d={w.d}
                                        pathLength="1"
                                        stroke="#ffffff"
                                        strokeWidth="3.8"
                                        strokeDasharray={`${Math.min(1, cyc * 1.15)} 1`}
                                        opacity="0.7"
                                    />
                                </g>
                            );
                        })}
                    </g>
                    {PATHOLOGY_PATHS.afibFoci.map(f => {
                        const pulse = 0.5 + 0.5 * Math.sin((time / 800) * Math.PI * 8 + f.phase * Math.PI * 2);
                        return (
                            <g key={f.id}>
                                <circle cx={f.x} cy={f.y} r={18 + pulse * 30} fill="#7c5cbf" opacity={0.14 + pulse * 0.24} />
                                <circle cx={f.x} cy={f.y} r={12 + pulse * 5} fill="#f5efff" stroke="#7c5cbf" strokeWidth="4.5" />
                            </g>
                        );
                    })}
                    {/* Irregular AV node filtering shimmer */}
                    <circle cx={CONDUCTION_PATHS.avNode.cx} cy={CONDUCTION_PATHS.avNode.cy} r={44 + (Math.sin((time / 800) * Math.PI * 10) * 10)} fill="#7c5cbf" opacity="0.24" />
                    <path d={CONDUCTION_PATHS.avNode.outline} fill="#7c5cbf" opacity="0.58" />
                </g>
            )}

            {/* Atrial flutter: rapid counter-clockwise macro-reentry loop in RA with 3 orbiting comet arcs */}
            {isFlutter && (
                <g style={{ pointerEvents: 'none' }}>
                    <path
                        d={PATHOLOGY_PATHS.flutterLoop}
                        fill="none"
                        stroke="#2b78b8"
                        strokeWidth="18"
                        opacity="0.22"
                    />
                    <path
                        d={PATHOLOGY_PATHS.flutterLoop}
                        fill="none"
                        pathLength="1"
                        stroke="#2b78b8"
                        strokeWidth="14"
                        strokeDasharray="0.16 0.1733"
                        strokeDashoffset={-(((time % 200) / 200) * 0.3333)}
                        opacity="0.95"
                        strokeLinecap="round"
                    />
                    <path
                        d={PATHOLOGY_PATHS.flutterLoop}
                        fill="none"
                        pathLength="1"
                        stroke="#ffffff"
                        strokeWidth="5"
                        strokeDasharray="0.14 0.1933"
                        strokeDashoffset={-(((time % 200) / 200) * 0.3333)}
                        opacity="0.88"
                        strokeLinecap="round"
                    />
                    {/* Directional arrows along the macro-reentry ring */}
                    <path d="M 218 317 Q 254 326 276 348" fill="none" stroke="#1d5f99" strokeWidth="8" markerEnd={`url(#${prefix}-arr-flutter)`} />
                    <path d="M 160 543 Q 126 522 108 486" fill="none" stroke="#1d5f99" strokeWidth="8" markerEnd={`url(#${prefix}-arr-flutter)`} />
                    {/* Flutter waves reaching AV node gatekeeper */}
                    <path
                        d={PATHOLOGY_PATHS.flutterAvTap}
                        fill="none"
                        stroke="#2b78b8"
                        strokeWidth="10"
                        strokeLinecap="round"
                        opacity={0.35 + 0.55 * Math.sin(((time % 200) / 200) * Math.PI)}
                        markerEnd={`url(#${prefix}-arr-flutter)`}
                    />
                </g>
            )}

            {/* P-wave: SA node + internodal tracts & Bachmann's bundle into LA */}
            {saActive && (
                <g opacity={atrialLineFade}>
                    <circle cx={CONDUCTION_PATHS.saNode.cx} cy={CONDUCTION_PATHS.saNode.cy} r={62 + saPulse * 28} fill={PHASE_COLORS.p} opacity={0.28 + saPulse * 0.18} filter={`url(#${prefix}-soft-blur)`} />
                    <path d={CONDUCTION_PATHS.saNode.outline} fill={PHASE_COLORS.p} opacity="0.82" />
                </g>
            )}

            {atrialLineActive && (
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={atrialLineFade} filter={`url(#${prefix}-impulse-glow)`}>
                    <ElectricPath d={CONDUCTION_PATHS.saBridge} progress={saBridgeProgress} color={PHASE_COLORS.p} width={11} />
                    {[CONDUCTION_PATHS.internodalAnt, CONDUCTION_PATHS.internodalMid, CONDUCTION_PATHS.internodalPost].map((d, idx) => (
                        <ElectricPath key={idx} d={d} progress={internodalProgress} color={PHASE_COLORS.p} width={15} />
                    ))}
                    <ElectricPath d={CONDUCTION_PATHS.bachmannMain} progress={bachmannProgress} color={PHASE_COLORS.p} width={15} />
                    <ElectricPath d={CONDUCTION_PATHS.bachmannBranchA} progress={bachmannBranchProgress} color={PHASE_COLORS.p} width={12} />
                    <ElectricPath d={CONDUCTION_PATHS.bachmannBranchB} progress={bachmannBranchProgress} color={PHASE_COLORS.p} width={12} />
                    <ElectricPath d={CONDUCTION_PATHS.bachmannBranchC} progress={bachmannBranchProgress} color={PHASE_COLORS.p} width={11} />
                </g>
            )}

            {/* PR delay: AV node golden physiological or prolonged hold */}
            {(avActive || isAv1) && !isAv3 && !isVt && (
                <g>
                    <circle cx={CONDUCTION_PATHS.avNode.cx} cy={CONDUCTION_PATHS.avNode.cy} r={(isAv1 ? 68 : 52) + avPulse * 32} fill={PHASE_COLORS.pr} opacity={isAv1 ? (0.30 + avPulse * 0.36) : (0.32 + avPulse * 0.24)} filter={`url(#${prefix}-soft-blur)`} />
                    <path d={CONDUCTION_PATHS.avNode.outline} fill={PHASE_COLORS.pr} opacity={isAv1 ? (0.58 + avPulse * 0.38) : (0.68 + avPulse * 0.24)} />
                    {isAv1 && (
                        <g style={{ pointerEvents: 'none' }}>
                            <circle cx={PATHOLOGY_MARKERS.avDelay.x} cy={PATHOLOGY_MARKERS.avDelay.y} r="50" fill="none" stroke="#f3dfb4" strokeWidth="10" opacity="0.82" />
                            <circle
                                cx={PATHOLOGY_MARKERS.avDelay.x}
                                cy={PATHOLOGY_MARKERS.avDelay.y}
                                r="50"
                                fill="none"
                                pathLength="1"
                                stroke="#d48817"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={`${time >= 130 && time <= 298 ? clamp01((time - 130) / 160) : 0.25} 1`}
                                transform={`rotate(-90 ${PATHOLOGY_MARKERS.avDelay.x} ${PATHOLOGY_MARKERS.avDelay.y})`}
                                opacity={time >= 120 && time <= 310 ? 0.96 : 0.45}
                            />
                        </g>
                    )}
                </g>
            )}

            {/* Blocked pathway veils so disconnected bundle branches clearly look cut off */}
            {isLbbb && (
                <g fill="none" strokeLinecap="round" style={{ pointerEvents: 'none' }}>
                    {[CONDUCTION_PATHS.lbbSeptal, CONDUCTION_PATHS.lbbSeptalFascicleA, CONDUCTION_PATHS.lbbSeptalFascicleB, CONDUCTION_PATHS.lvPurkinje].map((d, idx) => (
                        <g key={idx}>
                            <path d={d} stroke="#f5f3ee" strokeWidth="22" opacity="0.82" />
                            <path d={d} stroke="#8b5cf6" strokeWidth="7" strokeDasharray="16 14" opacity="0.42" />
                        </g>
                    ))}
                </g>
            )}
            {isRbbb && (
                <g fill="none" strokeLinecap="round" style={{ pointerEvents: 'none' }}>
                    {[CONDUCTION_PATHS.rbbSeptal, CONDUCTION_PATHS.rvPurkinje].map((d, idx) => (
                        <g key={idx}>
                            <path d={d} stroke="#f5f3ee" strokeWidth="22" opacity="0.82" />
                            <path d={d} stroke="#0ea5e9" strokeWidth="7" strokeDasharray="16 14" opacity="0.42" />
                        </g>
                    ))}
                </g>
            )}
            {isVt && (
                <g style={{ pointerEvents: 'none' }}>
                    <path d={CONDUCTION_PATHS.saNode.outline} fill="#cbd5d0" opacity="0.78" />
                    <path d={CONDUCTION_PATHS.avNode.outline} fill="#cbd5d0" opacity="0.78" />
                </g>
            )}

            {/* QRS: His bundle -> bundle branches -> septal fascicles -> Purkinje arborizations */}
            {ventLineActive && (
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={ventLineFade} filter={`url(#${prefix}-impulse-glow)`}>
                    {!isAv3 && <ElectricPath d={CONDUCTION_PATHS.hisBundle} progress={hisProgress} color={PHASE_COLORS.qrs} width={16} />}
                    {!isRbbb && <ElectricPath d={CONDUCTION_PATHS.rbbSeptal} progress={bundleProgress} color={isAv3 ? '#c43b47' : PHASE_COLORS.qrs} width={15} />}
                    {!isLbbb && <ElectricPath d={CONDUCTION_PATHS.lbbSeptal} progress={bundleProgress} color={isAv3 ? '#c43b47' : PHASE_COLORS.qrs} width={16} />}
                    {!isLbbb && (
                        <>
                            <ElectricPath d={CONDUCTION_PATHS.lbbSeptalFascicleA} progress={fascicleProgress} color={isAv3 ? '#c43b47' : PHASE_COLORS.qrs} width={11} />
                            <ElectricPath d={CONDUCTION_PATHS.lbbSeptalFascicleB} progress={fascicleProgress} color={isAv3 ? '#c43b47' : PHASE_COLORS.qrs} width={10} />
                        </>
                    )}
                    {!isRbbb && <ElectricPath d={CONDUCTION_PATHS.rvPurkinje} progress={purkinjeProgress} color={isAv3 ? '#c43b47' : PHASE_COLORS.qrs} width={14} />}
                    {!isLbbb && <ElectricPath d={CONDUCTION_PATHS.lvPurkinje} progress={purkinjeProgress} color={isAv3 ? '#c43b47' : PHASE_COLORS.qrs} width={16} />}
                </g>
            )}

            {/* Slow cell-to-cell transseptal / myocardial detours with fixed directional guide arrows */}
            {isLbbb && (
                <g fill="none" strokeLinecap="round">
                    {PATHOLOGY_PATHS.lbbbTransseptal.map((d, idx) => {
                        const waveProg = clamp01((time - (236 + idx * 14)) / 82);
                        const fade = time >= 225 && time < 370 ? (time > 345 ? clamp01((370 - time) / 25) : 1) : 0.34;
                        return (
                            <g key={idx} opacity={fade}>
                                <path d={d} stroke="#8b5cf6" strokeWidth="7" strokeDasharray="16 14" opacity="0.48" markerEnd={`url(#${prefix}-arr-lbbb)`} />
                                {time >= 235 && time < 368 && (
                                    <ElectricPath d={d} progress={waveProg} color="#8b5cf6" width={12} markerEnd={`url(#${prefix}-arr-lbbb)`} />
                                )}
                            </g>
                        );
                    })}
                </g>
            )}
            {isRbbb && (
                <g fill="none" strokeLinecap="round">
                    {PATHOLOGY_PATHS.rbbbTransseptal.map((d, idx) => {
                        const waveProg = clamp01((time - (266 + idx * 12)) / 78);
                        const fade = time >= 255 && time < 370 ? (time > 348 ? clamp01((370 - time) / 22) : 1) : 0.34;
                        return (
                            <g key={idx} opacity={fade}>
                                <path d={d} stroke="#0ea5e9" strokeWidth="7" strokeDasharray="16 14" opacity="0.48" markerEnd={`url(#${prefix}-arr-rbbb)`} />
                                {time >= 265 && time < 368 && (
                                    <ElectricPath d={d} progress={waveProg} color="#0ea5e9" width={12} markerEnd={`url(#${prefix}-arr-rbbb)`} />
                                )}
                            </g>
                        );
                    })}
                </g>
            )}
            {isVt && (
                <g fill="none" strokeLinecap="round">
                    {vtBeatActive && [0, 0.33, 0.66].map((ringOffset, idx) => {
                        const p = (clamp01((vtLocal - 15) / 165) + ringOffset) % 1;
                        return (
                            <circle
                                key={idx}
                                cx={PATHOLOGY_MARKERS.vtFocus.x}
                                cy={PATHOLOGY_MARKERS.vtFocus.y}
                                r={34 + p * 230}
                                stroke="#dc2626"
                                strokeWidth="7"
                                opacity={(1 - p) * 0.45 * vtBeatFade}
                            />
                        );
                    })}
                    {PATHOLOGY_PATHS.vtSpread.map((d, idx) => (
                        <g key={idx} opacity={vtBeatActive ? vtBeatFade : 0.32}>
                            <path d={d} stroke="#dc2626" strokeWidth="7" strokeDasharray="14 14" opacity="0.42" markerEnd={`url(#${prefix}-arr-vt)`} />
                            {vtBeatActive && (
                                <ElectricPath d={d} progress={clamp01((vtLocal - 20) / 145)} color="#dc2626" width={13} markerEnd={`url(#${prefix}-arr-vt)`} />
                            )}
                        </g>
                    ))}
                </g>
            )}

            {/* Blocked AV arrival stop-ring halo */}
            {isAv3 && av3BlockedFlash > 0.05 && (
                <circle
                    cx={PATHOLOGY_MARKERS.avTotalBlock.x}
                    cy={PATHOLOGY_MARKERS.avTotalBlock.y}
                    r={44 + av3BlockedFlash * 52}
                    fill="none"
                    stroke="#c43b47"
                    strokeWidth="8"
                    opacity={av3BlockedFlash * 0.72}
                />
            )}

            {/* T-wave: Epicardium -> Endocardium repolarization wave + extracellular + / - charge polarity */}
            {repolEdgeFade > 0.01 && (
                <g opacity={repolEdgeFade}>
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${prefix}-impulse-glow)`}>
                        {[REPOLARIZATION_WALLS.lv, REPOLARIZATION_WALLS.rv].map((wallPairs, idx) => {
                            const waveD = smoothWavePath(wallPairs, repolP);
                            return (
                                <g key={idx}>
                                    <path d={waveD} stroke={PHASE_COLORS.t} strokeWidth="24" opacity="0.26" />
                                    <path d={waveD} stroke={PHASE_COLORS.t} strokeWidth="10" opacity="0.88" />
                                    <path d={waveD} stroke="#ffffff" strokeWidth="3.5" opacity="0.58" />
                                </g>
                            );
                        })}
                    </g>
                    {REPOLARIZATION_ARROWS.map(pair => {
                        const [ox, oy] = pair.from;
                        const [ix, iy] = pair.to;
                        const flip = isVt || (isLbbb && pair.id !== 'rv1');
                        const posCoord = flip ? [ix, iy] : [ox, oy];
                        const negCoord = flip ? [ox, oy] : [ix, iy];
                        return (
                            <g key={pair.id} style={{ pointerEvents: 'none' }}>
                                <line
                                    x1={ix}
                                    y1={iy}
                                    x2={ox}
                                    y2={oy}
                                    stroke="#4f8f80"
                                    strokeWidth="3.2"
                                    strokeDasharray="6 6"
                                    opacity="0.72"
                                />
                                <circle cx={negCoord[0]} cy={negCoord[1]} r="20" fill="#fff3ee" stroke="#c86b51" strokeWidth="4" />
                                <text x={negCoord[0]} y={negCoord[1]} textAnchor="middle" dominantBaseline="central" fontSize="28" fontWeight="800" fill="#b44c34">−</text>
                                <circle cx={posCoord[0]} cy={posCoord[1]} r="20" fill="#eafaf4" stroke="#1f866f" strokeWidth="4" />
                                <text x={posCoord[0]} y={posCoord[1]} textAnchor="middle" dominantBaseline="central" fontSize="28" fontWeight="800" fill="#166d59">+</text>
                            </g>
                        );
                    })}
                </g>
            )}

            {/* Clean anatomical abbreviations placed in free regions */}
            {HEART_LABELS.map(lbl => (
                <text
                    key={lbl.id}
                    x={lbl.x}
                    y={lbl.y}
                    textAnchor="middle"
                    className={lbl.kind === 'node' ? 'ehm-node-label-lg' : 'ehm-chamber-label-lg'}
                >
                    {lbl.text}
                </text>
            ))}
        </g>
    );
}

function PathologyForeground({ time, rhythmId = 'normal' }) {
    if (rhythmId === 'normal') return null;
    const isAv3 = rhythmId === 'av_block_3';
    const isLbbb = rhythmId === 'lbbb';
    const isRbbb = rhythmId === 'rbbb';
    const isVt = rhythmId === 'vt';

    const vtLocal = time % 400;
    const vtBeatActive = isVt && vtLocal >= 15 && vtLocal < 188;
    const av3BlockedFlash = isAv3
        ? Math.max(
            time >= 145 && time < 205 ? Math.sin(clamp01((time - 145) / 60) * Math.PI) : 0,
            time >= 545 && time < 605 ? Math.sin(clamp01((time - 545) / 60) * Math.PI) : 0
        )
        : 0;
    const callouts = PATHOLOGY_CALLOUTS[rhythmId] || [];

    return (
        <g transform={`translate(${IMG_X} ${IMG_Y}) scale(${IMG_SCALE})`} style={{ pointerEvents: 'none' }}>
            {isAv3 && (
                <>
                    <line x1="336" y1="472" x2="354" y2="546" stroke="#c43b47" strokeWidth="10" strokeLinecap="round" opacity="0.88" />
                    <BlockMark x={PATHOLOGY_MARKERS.avTotalBlock.x} y={PATHOLOGY_MARKERS.avTotalBlock.y} color="#c43b47" pulse={av3BlockedFlash} />
                    <FocusMark x={PATHOLOGY_MARKERS.avEscapeFocus.x} y={PATHOLOGY_MARKERS.avEscapeFocus.y} color="#d9534f" pulse={time >= 215 && time < 330 ? Math.sin(clamp01((time - 215) / 115) * Math.PI) : 0.2} />
                </>
            )}
            {isLbbb && (
                <BlockMark x={PATHOLOGY_MARKERS.lbbbBlock.x} y={PATHOLOGY_MARKERS.lbbbBlock.y} color="#8b5cf6" pulse={time >= 215 && time < 285 ? 1 : 0.25} />
            )}
            {isRbbb && (
                <BlockMark x={PATHOLOGY_MARKERS.rbbbBlock.x} y={PATHOLOGY_MARKERS.rbbbBlock.y} color="#0ea5e9" pulse={time >= 215 && time < 285 ? 1 : 0.25} />
            )}
            {isVt && (
                <FocusMark
                    x={PATHOLOGY_MARKERS.vtFocus.x}
                    y={PATHOLOGY_MARKERS.vtFocus.y}
                    color="#dc2626"
                    pulse={vtBeatActive ? Math.sin(clamp01((vtLocal - 15) / 140) * Math.PI) : 0.25}
                />
            )}
            {callouts.map(item => (
                <CalloutBadge key={item.id} {...item} />
            ))}
        </g>
    );
}

export default function EkgFrontalHeartSvg({
    lead,
    time,
    onSelect,
    showVector,
    showAxisZones = true,
    axisOffsetDeg = 0,
    rhythmId = 'normal',
    prefix
}) {
    const details = MODEL_LEADS[lead] || MODEL_LEADS.II;
    const { vector, unit, point, voltage } = projectionAt(lead, time, axisOffsetDeg, rhythmId);
    const tip = [CX + vector[0] * VECTOR_SCALE, CY + vector[1] * VECTOR_SCALE];
    const foot = [CX + point[0] * VECTOR_SCALE, CY + point[1] * VECTOR_SCALE];
    const magnitude = Math.hypot(...vector);

    const meanAngle = meanQrsAngle(axisOffsetDeg, rhythmId);
    const meanZone = axisZoneForAngle(meanAngle);
    const [meanMarkerX, meanMarkerY] = polar(CX, CY, R_INNER + 5.5, meanAngle);

    const [minusX, minusY] = polar(CX, CY, R_LEAD, details.angle + 180);

    const projLengthPx = Math.hypot(foot[0] - CX, foot[1] - CY);
    const dropLengthPx = Math.hypot(tip[0] - foot[0], tip[1] - foot[1]);
    let rightAnglePath = null;
    if (projLengthPx > 14 && dropLengthPx > 14) {
        const s = 7;
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
            aria-label="Lyst anatomisk hjerte med elektrisk impuls og Cabrera-ring"
        >
            <defs>
                <radialGradient id={`${prefix}-dial-bg`} cx="50%" cy="48%" r="55%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="78%" stopColor="#fbfbf8" />
                    <stop offset="100%" stopColor="#f3f5ef" />
                </radialGradient>
                <filter id={`${prefix}-soft-blur`} x="-35%" y="-35%" width="170%" height="170%">
                    <feGaussianBlur stdDeviation="24" />
                </filter>
                <filter id={`${prefix}-impulse-glow`} x="-25%" y="-25%" width="150%" height="150%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <marker id={`${prefix}-vector`} viewBox="0 0 10 10" markerWidth="11" markerHeight="11" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#dd6b20" />
                </marker>
                <marker id={`${prefix}-proj-pos`} viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#2f7a62" />
                </marker>
                <marker id={`${prefix}-proj-neg`} viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#c0444f" />
                </marker>
                <marker id={`${prefix}-arr-flutter`} viewBox="0 0 10 10" markerWidth="26" markerHeight="26" refX="7" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#1d5f99" />
                </marker>
                <marker id={`${prefix}-arr-lbbb`} viewBox="0 0 10 10" markerWidth="26" markerHeight="26" refX="7" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#8b5cf6" />
                </marker>
                <marker id={`${prefix}-arr-rbbb`} viewBox="0 0 10 10" markerWidth="26" markerHeight="26" refX="7" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#0ea5e9" />
                </marker>
                <marker id={`${prefix}-arr-vt`} viewBox="0 0 10 10" markerWidth="26" markerHeight="26" refX="7" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#dc2626" />
                </marker>
                <marker id={`${prefix}-arr-afib`} viewBox="0 0 10 10" markerWidth="22" markerHeight="22" refX="7" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                    <path d="M1,1 L9,5 L1,9 Z" fill="#7c5cbf" />
                </marker>

                {CABRERA_SECTORS.map(sec => (
                    <path
                        key={sec.id}
                        id={`${prefix}-arc-${sec.id}`}
                        d={arcTextPath(CX, CY, (R_INNER + R_OUTER) / 2, sec.textStart, sec.textEnd, sec.sweep)}
                    />
                ))}
            </defs>

            {/* Clean anatomical orientation captions */}
            <text x={CX} y="19" className="ehm-svg-direction">SUPERIOR · HOVED</text>
            <text x={CX} y="528" className="ehm-svg-direction">INFERIOR · FØDDER</text>
            <text x="42" y={CY + 4} className="ehm-svg-direction">HØJRE</text>
            <text x="638" y={CY + 4} className="ehm-svg-direction">VENSTRE</text>

            {/* Calm background circle */}
            <circle cx={CX} cy={CY} r={R_OUTER} fill={`url(#${prefix}-dial-bg)`} stroke="#dfe6dc" strokeWidth="1.2" />

            {/* Slim, quiet Cabrera outer ring — only active axis zone highlighted */}
            {showAxisZones && CABRERA_SECTORS.map(sec => {
                const isActive = meanZone.id === sec.id;
                return (
                    <g key={sec.id}>
                        <path
                            d={annulusSectorPath(CX, CY, R_INNER, R_OUTER, sec.startDeg, sec.endDeg)}
                            fill={isActive ? sec.activeFill : 'rgba(232, 237, 230, 0.28)'}
                            stroke={isActive ? sec.color : '#dce3d9'}
                            strokeWidth={isActive ? 1.2 : 0.7}
                        />
                        {isActive && (
                            <text fontSize="7.4" fontWeight="750" letterSpacing="0.09em" fill={sec.color}>
                                <textPath href={`#${prefix}-arc-${sec.id}`} startOffset="50%" textAnchor="middle" dominantBaseline="central">
                                    {sec.label}
                                </textPath>
                            </text>
                        )}
                    </g>
                );
            })}

            {/* Subtle mean QRS axis marker on ring */}
            <g aria-label={`Gennemsnitlig hjerteakse ${Math.round(meanAngle)} grader`}>
                <line
                    x1={CX}
                    y1={CY}
                    x2={meanMarkerX}
                    y2={meanMarkerY}
                    stroke={meanZone.color}
                    strokeWidth="1.3"
                    strokeDasharray="4 6"
                    opacity="0.32"
                />
                <circle cx={meanMarkerX} cy={meanMarkerY} r="4.8" fill={meanZone.color} stroke="#ffffff" strokeWidth="1.5" />
            </g>

            {/* Single subtle measurement axis line for selected lead */}
            <line
                x1={CX - unit[0] * (R_LEAD - 13)}
                y1={CY - unit[1] * (R_LEAD - 13)}
                x2={CX + unit[0] * (R_LEAD - 22)}
                y2={CY + unit[1] * (R_LEAD - 22)}
                stroke="#2f7a62"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                opacity="0.45"
            />

            {/* Calm, bright resting anatomical heart */}
            <image
                href={heartConductionBase}
                x={IMG_X}
                y={IMG_Y}
                width={IMG_W}
                height={IMG_H}
                preserveAspectRatio="xMidYMid meet"
            />

            {/* Living synchronized electrical impulse layer */}
            <ConductionOverlay time={time} prefix={prefix} rhythmId={rhythmId} />

            {/* Clean instantaneous vector + orthogonal projection onto selected lead */}
            {showVector && magnitude > 0.008 && (
                <g>
                    <line x1={tip[0]} y1={tip[1]} x2={foot[0]} y2={foot[1]} stroke={projectionColor} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.75" />
                    {rightAnglePath && <path d={rightAnglePath} fill="none" stroke={projectionColor} strokeWidth="1.1" opacity="0.75" />}

                    {projLengthPx > 8 ? (
                        <>
                            <line x1={CX} y1={CY} x2={foot[0]} y2={foot[1]} stroke="#ffffff" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
                            <line
                                x1={CX}
                                y1={CY}
                                x2={foot[0]}
                                y2={foot[1]}
                                stroke={projectionColor}
                                strokeWidth="4"
                                markerEnd={`url(#${prefix}-${voltage >= 0 ? 'proj-pos' : 'proj-neg'})`}
                            />
                        </>
                    ) : (
                        <circle cx={CX} cy={CY} r="5.5" fill="#ffffff" stroke="#7c8f83" strokeWidth="1.4" opacity="0.85" />
                    )}

                    <line x1={CX} y1={CY} x2={tip[0]} y2={tip[1]} stroke="#ffffff" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
                    <line
                        x1={CX}
                        y1={CY}
                        x2={tip[0]}
                        y2={tip[1]}
                        stroke="#dd6b20"
                        strokeWidth="3.6"
                        markerEnd={`url(#${prefix}-vector)`}
                    />
                    <circle cx={CX} cy={CY} r="4.2" fill="#dd6b20" stroke="#ffffff" strokeWidth="1.5" />
                </g>
            )}

            {/* High-visibility pathology block/focus badges and callouts rendered above vector arrows */}
            <PathologyForeground time={time} rhythmId={rhythmId} />

            {/* Minus pole medallion for active lead */}
            <g aria-hidden="true">
                <circle cx={minusX} cy={minusY} r="11" fill="#fdf2f2" stroke="#d4898f" strokeWidth="1.4" />
                <text x={minusX} y={minusY + 5} textAnchor="middle" fontSize="14.5" fontWeight="700" fill="#b4434e">−</text>
            </g>

            {/* 6 clickable Cabrera lead badges */}
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
                            stroke={active ? '#235c4a' : '#ccd8cd'}
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
