import React from 'react';
import chestCrossSectionBase from '../../assets/ekg_chest_cross_section_base.png';
import {
    CHEST_CHAMBER_GLOWS,
    CHEST_CONDUCTION_PATHS,
    CHEST_HEART_CENTER,
    CHEST_IMG_H,
    CHEST_IMG_W,
    CHEST_LABELS,
    CHEST_PATHOLOGY_MARKERS,
    CHEST_PATHOLOGY_PATHS,
    CHEST_PATHOLOGY_ZONES,
    CHEST_REPOL_ARROWS,
    CHEST_REPOL_WALLS,
    THORAX_CENTER,
    THORAX_RX,
    THORAX_RY
} from '../../data/chestConductionPaths';
import { PHASE_COLORS } from '../../data/heartConductionPaths';
import { MODEL_LEADS, phaseAt, projectionAt, vectorLoopPath } from '../../data/ekgSimulation';

const CHEST_LEADS = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
const CX = 340;
const CY = 266;
const IMG_W = 510;
const IMG_H = Number((IMG_W * CHEST_IMG_H / CHEST_IMG_W).toFixed(2));
const IMG_SCALE = IMG_W / CHEST_IMG_W;
const IMG_X = Number((CX - CHEST_HEART_CENTER.x * IMG_SCALE).toFixed(2));
const IMG_Y = Number((CY - CHEST_HEART_CENTER.y * IMG_SCALE).toFixed(2));

const TCX_SVG = IMG_X + THORAX_CENTER.x * IMG_SCALE;
const TCY_SVG = IMG_Y + THORAX_CENTER.y * IMG_SCALE;
const TRX_SVG = THORAX_RX * IMG_SCALE;
const TRY_SVG = THORAX_RY * IMG_SCALE;

const clamp01 = v => Math.max(0, Math.min(1, v));

function electrodePoint(name, pad = 28) {
    const angle = MODEL_LEADS[name].angle * Math.PI / 180;
    const radius = 1 / Math.sqrt((Math.cos(angle) / TRX_SVG) ** 2 + (Math.sin(angle) / TRY_SVG) ** 2);
    return [TCX_SVG + Math.cos(angle) * (radius + pad), TCY_SVG + Math.sin(angle) * (radius + pad)];
}

function torsoHemiPath(leadAngleDeg, positive) {
    const start = (leadAngleDeg + (positive ? -90 : 90)) * Math.PI / 180;
    const end = (leadAngleDeg + (positive ? 90 : 270)) * Math.PI / 180;
    const r1 = 1 / Math.sqrt((Math.cos(start) / TRX_SVG) ** 2 + (Math.sin(start) / TRY_SVG) ** 2);
    const r2 = 1 / Math.sqrt((Math.cos(end) / TRX_SVG) ** 2 + (Math.sin(end) / TRY_SVG) ** 2);
    const x1 = TCX_SVG + Math.cos(start) * r1;
    const y1 = TCY_SVG + Math.sin(start) * r1;
    const x2 = TCX_SVG + Math.cos(end) * r2;
    const y2 = TCY_SVG + Math.sin(end) * r2;
    return `M ${TCX_SVG.toFixed(1)} ${TCY_SVG.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${TRX_SVG.toFixed(1)} ${TRY_SVG.toFixed(1)} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
}

function ElectricPath({ d, progress, color, width = 12, markerEnd }) {
    const p = clamp01(progress);
    if (p <= 0.001) return null;
    return (
        <g>
            <path d={d} pathLength="1" strokeDasharray={`${p} 1`} stroke={color} strokeWidth={width * 1.8} opacity="0.28" />
            <path d={d} pathLength="1" strokeDasharray={`${p} 1`} stroke={color} strokeWidth={width} opacity="0.95" markerEnd={p > 0.2 ? markerEnd : undefined} />
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

function BlockMark({ x, y, color = '#8b5cf6', pulse = 0 }) {
    const r = 20 + pulse * 4;
    return (
        <g style={{ pointerEvents: 'none' }}>
            <circle cx={x} cy={y} r={r + 8 + pulse * 9} fill={color} opacity={0.14 + pulse * 0.24} />
            <circle cx={x} cy={y} r={r + 2} fill="#ffffff" opacity="0.95" />
            <circle cx={x} cy={y} r={r} fill="#fff3f3" stroke={color} strokeWidth="4.5" />
            <path d={`M ${x - 8} ${y - 8} L ${x + 8} ${y + 8} M ${x + 8} ${y - 8} L ${x - 8} ${y + 8}`} stroke={color} strokeWidth="5" strokeLinecap="round" />
        </g>
    );
}

function FocusMark({ x, y, color = '#dc2626', pulse = 0 }) {
    return (
        <g style={{ pointerEvents: 'none' }}>
            <circle cx={x} cy={y} r={22 + pulse * 18} fill={color} opacity={0.15 + pulse * 0.26} />
            <circle cx={x} cy={y} r={20} fill="#ffffff" opacity="0.95" />
            <circle cx={x} cy={y} r={17 + pulse * 3} fill="#fff7ed" stroke={color} strokeWidth="4.2" />
            <polygon
                points={`${x + 2.5},${y - 11} ${x - 7.5},${y + 1.5} ${x},${y + 1.5} ${x - 3},${y + 11} ${x + 7.5},${y - 1.5} ${x},${y - 1.5}`}
                fill={color}
            />
        </g>
    );
}

function ChestConductionOverlay({ time, prefix, rhythmId = 'normal' }) {
    const isLbbb = rhythmId === 'lbbb';
    const isRbbb = rhythmId === 'rbbb';
    const isVt = rhythmId === 'vt';
    const isVf = rhythmId === 'vf';
    const isAv1 = rhythmId === 'av_block_1';
    const isWenck = rhythmId === 'av_block_2_wenckebach';
    const isMobitz2 = rhythmId === 'av_block_2_mobitz2';
    const isAv3 = rhythmId === 'av_block_3';
    const isAntStemi = rhythmId === 'anterior_stemi';
    const isInfStemi = rhythmId === 'inferior_stemi';
    const isPostStemi = rhythmId === 'posterior_stemi';
    const isPericarditis = rhythmId === 'pericarditis';
    const isLongQtc = rhythmId === 'long_qtc';
    const isHyperK = rhythmId === 'hyperkalemia';
    const isHypoK = rhythmId === 'hypokalemia';
    const isLvh = rhythmId === 'lvh';
    const isPe = rhythmId === 'pulmonary_embolism';

    const vtLocal = time % 400;
    const vtBeatActive = isVt && vtLocal >= 12 && vtLocal < 192;
    const vtBeatFade = vtBeatActive && vtLocal >= 166 ? clamp01(1 - (vtLocal - 166) / 26) : 1;

    let qrsStart = isAv1 ? 290 : isAv3 ? 220 : isHyperK ? 205 : isHypoK ? 195 : 210;
    let qrsEnd = (isLbbb || isRbbb) ? 355 : isAv3 ? 340 : isAv1 ? 380 : isHyperK ? 335 : isHypoK ? 280 : isLvh ? 308 : isPe ? 304 : isLongQtc ? 295 : 300;
    let repolStart = isAv1 ? 460 : isAv3 ? 355 : isLbbb ? 395 : isRbbb ? 390 : isLongQtc ? 430 : isHyperK ? 350 : isHypoK ? 365 : isLvh ? 410 : isPe ? 365 : 380;
    let repolDur = isAv3 ? 120 : isLongQtc ? 310 : isHyperK ? 140 : isHypoK ? 115 : isLvh ? 155 : isPe ? 170 : 160;
    if (isWenck) {
        if (time >= 480) { qrsStart = 535; qrsEnd = 615; repolStart = 615; repolDur = 75; }
        else { qrsStart = 155; qrsEnd = 235; repolStart = 245; repolDur = 70; }
    } else if (isMobitz2) {
        if (time >= 400) { qrsStart = 450; qrsEnd = 525; repolStart = 528; repolDur = 67; }
        else { qrsStart = 160; qrsEnd = 235; repolStart = 238; repolDur = 67; }
    }

    const qrsLen = Math.max(40, qrsEnd - qrsStart);
    const ventLineActive = !isVt && !isVf && time >= qrsStart && time < qrsEnd + 20;
    const ventLineFade = ventLineActive && time >= qrsEnd - 5 ? clamp01(1 - (time - (qrsEnd - 5)) / 25) : 1;
    const septumProgress = clamp01((time - qrsStart) / (qrsLen * 0.42));
    const purkinjeProgress = clamp01((time - qrsStart - qrsLen * 0.25) / (qrsLen * 0.56));

    const septalGlow = (!isVt && !isVf && time >= qrsStart && time < qrsStart + 44)
        ? Math.sin(clamp01((time - qrsStart) / 44) * Math.PI) * 0.24
        : 0;
    const ventBaseGlow = (!isVt && !isVf && time >= qrsStart + 16 && time < qrsEnd + 10)
        ? Math.sin(clamp01((time - (qrsStart + 16)) / (qrsEnd - qrsStart - 6)) * Math.PI * 0.7) * 0.22
        : 0;
    const vfShimmer = isVf ? 0.18 + 0.08 * Math.sin((time / 800) * Math.PI * 10) : 0;

    const rvGlow = isVf
        ? vfShimmer
        : isVt
            ? (vtBeatActive ? Math.sin(clamp01((vtLocal - 45) / 135) * Math.PI) * 0.20 * vtBeatFade : 0)
            : isLbbb
                ? (time >= 215 && time < 305 ? Math.sin(clamp01((time - 215) / 90) * Math.PI) * 0.24 : 0)
                : isRbbb
                    ? (time >= 268 && time < 362 ? Math.sin(clamp01((time - 268) / 94) * Math.PI) * 0.26 : 0)
                    : ventBaseGlow * (isPe ? 1.45 : isLvh ? 0.65 : 1);

    const lvGlow = isVf
        ? vfShimmer
        : isVt
            ? (vtBeatActive ? Math.sin(clamp01((vtLocal - 12) / 168) * Math.PI) * 0.26 * vtBeatFade : 0)
            : isLbbb
                ? (time >= 250 && time < 362 ? Math.sin(clamp01((time - 250) / 112) * Math.PI) * 0.26 : 0)
                : isRbbb
                    ? (time >= 220 && time < 305 ? Math.sin(clamp01((time - 220) / 85) * Math.PI) * 0.22 : 0)
                    : ventBaseGlow * (isLvh ? 1.55 : isPe ? 0.72 : 1);

    const isRepol = isVf
        ? false
        : isVt
            ? (vtLocal >= 195 && vtLocal < 370)
            : (time >= repolStart && time < repolStart + repolDur + 10);
    const repolP = isVt ? clamp01((vtLocal - 195) / 175) : clamp01((time - repolStart) / repolDur);
    const repolEdgeFade = !isRepol
        ? 0
        : repolP < 0.14
            ? clamp01(repolP / 0.14)
            : repolP > 0.80
                ? clamp01((1 - repolP) / 0.20)
                : 1;
    const stGlow = (!isVt && !isVf && time >= qrsEnd && time < repolStart + repolDur)
        ? (time < repolStart ? 0.12 : 0.12 * (1 - repolP))
        : 0;
    const repolGlow = isRepol ? Math.sin(repolP * Math.PI) * (isHypoK ? 0.08 : isHyperK ? 0.24 : 0.18) : 0;
    const uWaveGlow = isHypoK && time >= 480 && time < 660 ? Math.sin(clamp01((time - 480) / 180) * Math.PI) : 0;
    const injuryPulse = 0.22 + (time >= 290 && time < 565 ? Math.sin(clamp01((time - 290) / 275) * Math.PI) * 0.42 : 0);

    return (
        <g transform={`translate(${IMG_X} ${IMG_Y}) scale(${IMG_SCALE})`}>
            {/* Soft regional myocardial depolarization / repolarization glows */}
            <g filter={`url(#${prefix}-chest-soft)`} style={{ pointerEvents: 'none' }}>
                {septalGlow > 0.005 && (
                    <ellipse
                        cx={CHEST_CHAMBER_GLOWS.septum.cx}
                        cy={CHEST_CHAMBER_GLOWS.septum.cy}
                        rx={CHEST_CHAMBER_GLOWS.septum.rx}
                        ry={CHEST_CHAMBER_GLOWS.septum.ry}
                        transform={`rotate(${CHEST_CHAMBER_GLOWS.septum.rotate} ${CHEST_CHAMBER_GLOWS.septum.cx} ${CHEST_CHAMBER_GLOWS.septum.cy})`}
                        fill={PHASE_COLORS.qrs}
                        opacity={septalGlow}
                    />
                )}
                {(rvGlow > 0.005 || lvGlow > 0.005 || stGlow > 0.005) && (
                    <>
                        <ellipse
                            cx={CHEST_CHAMBER_GLOWS.rv.cx}
                            cy={CHEST_CHAMBER_GLOWS.rv.cy}
                            rx={CHEST_CHAMBER_GLOWS.rv.rx}
                            ry={CHEST_CHAMBER_GLOWS.rv.ry}
                            transform={`rotate(${CHEST_CHAMBER_GLOWS.rv.rotate} ${CHEST_CHAMBER_GLOWS.rv.cx} ${CHEST_CHAMBER_GLOWS.rv.cy})`}
                            fill={stGlow > 0 && rvGlow <= 0.005 ? PHASE_COLORS.st : (isVt || isVf) ? '#dc2626' : isRbbb && time >= 268 ? '#0ea5e9' : PHASE_COLORS.qrs}
                            opacity={Math.max(rvGlow, stGlow) * 0.86}
                        />
                        <ellipse
                            cx={CHEST_CHAMBER_GLOWS.lv.cx}
                            cy={CHEST_CHAMBER_GLOWS.lv.cy}
                            rx={CHEST_CHAMBER_GLOWS.lv.rx}
                            ry={CHEST_CHAMBER_GLOWS.lv.ry}
                            fill={stGlow > 0 && lvGlow <= 0.005 ? PHASE_COLORS.st : (isVt || isVf) ? '#dc2626' : isLbbb && time >= 250 ? '#8b5cf6' : PHASE_COLORS.qrs}
                            opacity={Math.max(lvGlow, stGlow)}
                        />
                    </>
                )}
                {repolGlow > 0.005 && (
                    <>
                        <ellipse
                            cx={CHEST_CHAMBER_GLOWS.rv.cx}
                            cy={CHEST_CHAMBER_GLOWS.rv.cy}
                            rx={CHEST_CHAMBER_GLOWS.rv.rx}
                            ry={CHEST_CHAMBER_GLOWS.rv.ry}
                            transform={`rotate(${CHEST_CHAMBER_GLOWS.rv.rotate} ${CHEST_CHAMBER_GLOWS.rv.cx} ${CHEST_CHAMBER_GLOWS.rv.cy})`}
                            fill={PHASE_COLORS.t}
                            opacity={repolGlow * 0.78}
                        />
                        <ellipse
                            cx={CHEST_CHAMBER_GLOWS.lv.cx}
                            cy={CHEST_CHAMBER_GLOWS.lv.cy}
                            rx={CHEST_CHAMBER_GLOWS.lv.rx}
                            ry={CHEST_CHAMBER_GLOWS.lv.ry}
                            fill={PHASE_COLORS.t}
                            opacity={repolGlow}
                        />
                    </>
                )}
            </g>

            {/* Blocked Purkinje branch veil for LBBB / RBBB */}
            {isLbbb && (
                <g fill="none" strokeLinecap="round" style={{ pointerEvents: 'none' }}>
                    <path d={CHEST_CONDUCTION_PATHS.lvPurkinje} stroke="#f5f3ee" strokeWidth="14" opacity="0.82" />
                    <path d={CHEST_CONDUCTION_PATHS.lvPurkinje} stroke="#8b5cf6" strokeWidth="4.5" strokeDasharray="12 10" opacity="0.45" />
                </g>
            )}
            {isRbbb && (
                <g fill="none" strokeLinecap="round" style={{ pointerEvents: 'none' }}>
                    <path d={CHEST_CONDUCTION_PATHS.rvPurkinje} stroke="#f5f3ee" strokeWidth="14" opacity="0.82" />
                    <path d={CHEST_CONDUCTION_PATHS.rvPurkinje} stroke="#0ea5e9" strokeWidth="4.5" strokeDasharray="12 10" opacity="0.45" />
                </g>
            )}

            {/* Subendocardial Purkinje & septal activation wavefronts */}
            {ventLineActive && (
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={ventLineFade} filter={`url(#${prefix}-chest-glow)`}>
                    {!isLbbb && (
                        <ElectricPath d={CHEST_CONDUCTION_PATHS.septalWave} progress={septumProgress} color="#2f85b8" width={8} />
                    )}
                    <ElectricPath d={CHEST_CONDUCTION_PATHS.septumTract} progress={septumProgress} color={isAv3 ? '#c43b47' : PHASE_COLORS.qrs} width={10} />
                    {!isRbbb && (
                        <ElectricPath d={CHEST_CONDUCTION_PATHS.rvPurkinje} progress={purkinjeProgress} color={isAv3 ? '#c43b47' : PHASE_COLORS.qrs} width={10} />
                    )}
                    {!isLbbb && (
                        <ElectricPath d={CHEST_CONDUCTION_PATHS.lvPurkinje} progress={purkinjeProgress} color={isAv3 ? '#c43b47' : PHASE_COLORS.qrs} width={11} />
                    )}
                </g>
            )}

            {/* LBBB / RBBB transseptal slow cell-to-cell detour waves */}
            {isLbbb && (
                <g fill="none" strokeLinecap="round">
                    {CHEST_PATHOLOGY_PATHS.lbbbTransseptal.map((d, idx) => {
                        const wp = clamp01((time - (236 + idx * 14)) / 82);
                        const fade = time >= 225 && time < 370 ? (time > 345 ? clamp01((370 - time) / 25) : 1) : 0.36;
                        return (
                            <g key={idx} opacity={fade}>
                                <path d={d} stroke="#8b5cf6" strokeWidth="5" strokeDasharray="12 10" opacity="0.52" markerEnd={`url(#${prefix}-lbbb-arrow)`} />
                                {time >= 235 && time < 368 && (
                                    <ElectricPath d={d} progress={wp} color="#8b5cf6" width={8.5} markerEnd={`url(#${prefix}-lbbb-arrow)`} />
                                )}
                            </g>
                        );
                    })}
                </g>
            )}
            {isRbbb && (
                <g fill="none" strokeLinecap="round">
                    {CHEST_PATHOLOGY_PATHS.rbbbTransseptal.map((d, idx) => {
                        const wp = clamp01((time - (266 + idx * 12)) / 78);
                        const fade = time >= 255 && time < 370 ? (time > 348 ? clamp01((370 - time) / 22) : 1) : 0.36;
                        return (
                            <g key={idx} opacity={fade}>
                                <path d={d} stroke="#0ea5e9" strokeWidth="5" strokeDasharray="12 10" opacity="0.52" markerEnd={`url(#${prefix}-rbbb-arrow)`} />
                                {time >= 265 && time < 368 && (
                                    <ElectricPath d={d} progress={wp} color="#0ea5e9" width={8.5} markerEnd={`url(#${prefix}-rbbb-arrow)`} />
                                )}
                            </g>
                        );
                    })}
                </g>
            )}

            {/* VT concentric shockwaves and radiating LV->RV slow myocardial spread */}
            {isVt && (
                <g fill="none" strokeLinecap="round">
                    {vtBeatActive && [0, 0.33, 0.66].map((off, idx) => {
                        const rp = (clamp01((vtLocal - 12) / 165) + off) % 1;
                        return (
                            <circle
                                key={idx}
                                cx={CHEST_PATHOLOGY_MARKERS.vtFocus.x}
                                cy={CHEST_PATHOLOGY_MARKERS.vtFocus.y}
                                r={22 + rp * 185}
                                stroke="#dc2626"
                                strokeWidth="4.5"
                                opacity={(1 - rp) * 0.45 * vtBeatFade}
                            />
                        );
                    })}
                    {CHEST_PATHOLOGY_PATHS.vtSpread.map((d, idx) => (
                        <g key={idx} opacity={vtBeatActive ? vtBeatFade : 0.34}>
                            <path d={d} stroke="#dc2626" strokeWidth="5" strokeDasharray="10 10" opacity="0.45" markerEnd={`url(#${prefix}-vt-arrow)`} />
                            {vtBeatActive && (
                                <ElectricPath d={d} progress={clamp01((vtLocal - 16) / 150)} color="#dc2626" width={9} markerEnd={`url(#${prefix}-vt-arrow)`} />
                            )}
                        </g>
                    ))}
                </g>
            )}

            {/* VF chaotic ventricular micro-reentry wavelets */}
            {isVf && (
                <g style={{ pointerEvents: 'none' }}>
                    <g fill="none" strokeLinecap="round">
                        {CHEST_PATHOLOGY_PATHS.vfWavelets.map(w => {
                            const cyc = ((time / 800) * 4.2 + w.phase) % 1;
                            const fade = Math.sin(cyc * Math.PI);
                            return (
                                <g key={w.id} opacity={0.3 + fade * 0.7}>
                                    <path d={w.d} pathLength="1" stroke="#b91c1c" strokeWidth="8.5" strokeDasharray={`${Math.min(1, cyc * 1.15)} 1`} markerEnd={`url(#${prefix}-vt-arrow)`} />
                                    <path d={w.d} pathLength="1" stroke="#ffffff" strokeWidth="2.8" strokeDasharray={`${Math.min(1, cyc * 1.15)} 1`} opacity="0.7" />
                                </g>
                            );
                        })}
                    </g>
                    {CHEST_PATHOLOGY_PATHS.vfFoci.map(f => {
                        const pulse = 0.5 + 0.5 * Math.sin((time / 800) * Math.PI * 10 + f.phase * Math.PI * 2);
                        return (
                            <g key={f.id}>
                                <circle cx={f.x} cy={f.y} r={12 + pulse * 20} fill="#b91c1c" opacity={0.16 + pulse * 0.25} />
                                <circle cx={f.x} cy={f.y} r={7 + pulse * 3.5} fill="#fef2f2" stroke="#b91c1c" strokeWidth="3.5" />
                            </g>
                        );
                    })}
                </g>
            )}

            {/* Anatomical injury / inflammation / strain highlights in transverse slice */}
            {(isAntStemi || isPostStemi) && (
                <path
                    d={CHEST_PATHOLOGY_ZONES[isAntStemi ? 'anterior_stemi' : 'posterior_stemi'].d}
                    fill={isAntStemi ? '#dc2626' : '#e11d48'}
                    fillOpacity={injuryPulse * 0.48}
                    stroke={isAntStemi ? '#dc2626' : '#e11d48'}
                    strokeWidth="6"
                    opacity="0.90"
                    style={{ pointerEvents: 'none' }}
                />
            )}
            {isInfStemi && (
                <ellipse
                    cx={CHEST_PATHOLOGY_ZONES.inferior_stemi.cx}
                    cy={CHEST_PATHOLOGY_ZONES.inferior_stemi.cy}
                    rx={CHEST_PATHOLOGY_ZONES.inferior_stemi.rx}
                    ry={CHEST_PATHOLOGY_ZONES.inferior_stemi.ry}
                    transform={`rotate(${CHEST_PATHOLOGY_ZONES.inferior_stemi.rotate} ${CHEST_PATHOLOGY_ZONES.inferior_stemi.cx} ${CHEST_PATHOLOGY_ZONES.inferior_stemi.cy})`}
                    fill="#b91c1c"
                    fillOpacity={injuryPulse * 0.42}
                    stroke="#b91c1c"
                    strokeWidth="5.5"
                    strokeDasharray="12 8"
                    opacity="0.88"
                    style={{ pointerEvents: 'none' }}
                />
            )}
            {isPericarditis && (
                <ellipse
                    cx={CHEST_PATHOLOGY_ZONES.pericarditis.cx}
                    cy={CHEST_PATHOLOGY_ZONES.pericarditis.cy}
                    rx={CHEST_PATHOLOGY_ZONES.pericarditis.rx}
                    ry={CHEST_PATHOLOGY_ZONES.pericarditis.ry}
                    transform={`rotate(${CHEST_PATHOLOGY_ZONES.pericarditis.rotate} ${CHEST_PATHOLOGY_ZONES.pericarditis.cx} ${CHEST_PATHOLOGY_ZONES.pericarditis.cy})`}
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="15"
                    strokeDasharray="18 12"
                    opacity={0.42 + injuryPulse * 0.50}
                    filter={`url(#${prefix}-chest-soft)`}
                    style={{ pointerEvents: 'none' }}
                />
            )}
            {isLvh && (
                <path
                    d={CHEST_PATHOLOGY_ZONES.lvh.d}
                    fill="#b45309"
                    fillOpacity={0.22 + lvGlow * 1.1}
                    stroke="#b45309"
                    strokeWidth="5.5"
                    opacity="0.88"
                    style={{ pointerEvents: 'none' }}
                />
            )}
            {isPe && (
                <ellipse
                    cx={CHEST_PATHOLOGY_ZONES.pulmonary_embolism.cx}
                    cy={CHEST_PATHOLOGY_ZONES.pulmonary_embolism.cy}
                    rx={CHEST_PATHOLOGY_ZONES.pulmonary_embolism.rx}
                    ry={CHEST_PATHOLOGY_ZONES.pulmonary_embolism.ry}
                    transform={`rotate(${CHEST_PATHOLOGY_ZONES.pulmonary_embolism.rotate} ${CHEST_PATHOLOGY_ZONES.pulmonary_embolism.cx} ${CHEST_PATHOLOGY_ZONES.pulmonary_embolism.cy})`}
                    fill="#0369a1"
                    fillOpacity={0.20 + rvGlow * 1.1}
                    stroke="#0369a1"
                    strokeWidth="5.5"
                    strokeDasharray="12 8"
                    opacity="0.88"
                    style={{ pointerEvents: 'none' }}
                />
            )}
            {isHypoK && uWaveGlow > 0.04 && (
                <g fill="none" strokeLinecap="round" opacity={uWaveGlow * 0.92} filter={`url(#${prefix}-chest-glow)`} style={{ pointerEvents: 'none' }}>
                    <path d={CHEST_CONDUCTION_PATHS.rvPurkinje} stroke="#0284c7" strokeWidth="11" />
                    <path d={CHEST_CONDUCTION_PATHS.lvPurkinje} stroke="#0284c7" strokeWidth="12" />
                </g>
            )}

            {/* T-wave repolarization wave + epicardial/endocardial + / - polarity */}
            {repolEdgeFade > 0.01 && (
                <g opacity={repolEdgeFade}>
                    <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter={`url(#${prefix}-chest-glow)`}>
                        {[CHEST_REPOL_WALLS.lv, CHEST_REPOL_WALLS.rv].map((wallPairs, idx) => {
                            const waveD = smoothWavePath(wallPairs, repolP);
                            const repolCol = isHyperK ? '#ea580c' : isLongQtc ? '#7c3aed' : PHASE_COLORS.t;
                            return (
                                <g key={idx}>
                                    <path d={waveD} stroke={repolCol} strokeWidth={isHyperK ? 21 : 18} opacity={isHyperK ? 0.36 : 0.28} />
                                    <path d={waveD} stroke={repolCol} strokeWidth={isHyperK ? 9.5 : 7.5} opacity="0.90" />
                                    <path d={waveD} stroke="#ffffff" strokeWidth="2.6" opacity="0.58" />
                                </g>
                            );
                        })}
                    </g>
                    {CHEST_REPOL_ARROWS.map(pair => {
                        const [ox, oy] = pair.from;
                        const [ix, iy] = pair.to;
                        const flip = isVt || ((isLbbb || isLvh) && pair.id !== 'rvAnt') || (isPe && pair.id === 'rvAnt');
                        const posCoord = flip ? [ix, iy] : [ox, oy];
                        const negCoord = flip ? [ox, oy] : [ix, iy];
                        return (
                            <g key={pair.id} style={{ pointerEvents: 'none' }}>
                                <line x1={ix} y1={iy} x2={ox} y2={oy} stroke="#4f8f80" strokeWidth="2.6" strokeDasharray="5 4" opacity="0.72" />
                                <circle cx={negCoord[0]} cy={negCoord[1]} r="14" fill="#fff3ee" stroke="#c86b51" strokeWidth="3" />
                                <text x={negCoord[0]} y={negCoord[1]} textAnchor="middle" dominantBaseline="central" fontSize="20" fontWeight="800" fill="#b44c34">−</text>
                                <circle cx={posCoord[0]} cy={posCoord[1]} r="14" fill="#eafaf4" stroke="#1f866f" strokeWidth="3" />
                                <text x={posCoord[0]} y={posCoord[1]} textAnchor="middle" dominantBaseline="central" fontSize="20" fontWeight="800" fill="#166d59">+</text>
                            </g>
                        );
                    })}
                </g>
            )}

            {/* Clean anatomical abbreviations */}
            {CHEST_LABELS.map(lbl => (
                <text
                    key={lbl.id}
                    x={lbl.x}
                    y={lbl.y}
                    textAnchor="middle"
                    className={lbl.kind === 'chamber' ? 'ehm-chest-chamber-lg' : 'ehm-chest-anat-lg'}
                >
                    {lbl.text}
                </text>
            ))}
        </g>
    );
}

function ChestPathologyForeground({ time, rhythmId = 'normal' }) {
    const isLbbb = rhythmId === 'lbbb';
    const isRbbb = rhythmId === 'rbbb';
    const isVt = rhythmId === 'vt';
    if (!isLbbb && !isRbbb && !isVt) return null;
    const vtLocal = time % 400;
    const vtBeatActive = isVt && vtLocal >= 12 && vtLocal < 192;

    return (
        <g transform={`translate(${IMG_X} ${IMG_Y}) scale(${IMG_SCALE})`} style={{ pointerEvents: 'none' }}>
            {isLbbb && (
                <BlockMark x={CHEST_PATHOLOGY_MARKERS.lbbbBlock.x} y={CHEST_PATHOLOGY_MARKERS.lbbbBlock.y} color="#8b5cf6" pulse={time >= 215 && time < 285 ? 1 : 0.25} />
            )}
            {isRbbb && (
                <BlockMark x={CHEST_PATHOLOGY_MARKERS.rbbbBlock.x} y={CHEST_PATHOLOGY_MARKERS.rbbbBlock.y} color="#0ea5e9" pulse={time >= 215 && time < 285 ? 1 : 0.25} />
            )}
            {isVt && (
                <FocusMark
                    x={CHEST_PATHOLOGY_MARKERS.vtFocus.x}
                    y={CHEST_PATHOLOGY_MARKERS.vtFocus.y}
                    color="#dc2626"
                    pulse={vtBeatActive ? Math.sin(clamp01((vtLocal - 12) / 140) * Math.PI) : 0.25}
                />
            )}
        </g>
    );
}

export default function EkgChestModel({ lead, time, onSelect, showVector, prefix, rhythmId = 'normal', children }) {
    const details = MODEL_LEADS[lead] || MODEL_LEADS.V1;
    const phase = phaseAt(time, rhythmId);
    const { vector, unit, point, voltage } = projectionAt(lead, time, 0, rhythmId);
    const [elecX, elecY] = electrodePoint(lead, 28);

    const magnitude = Math.hypot(...vector);
    const scale = 96;
    const tip = [CX + vector[0] * scale, CY + vector[1] * scale];
    const foot = [CX + point[0] * scale, CY + point[1] * scale];
    const vcgHorizontal = vectorLoopPath('horizontal', CX, CY, scale, 0, rhythmId);

    const projLengthPx = Math.hypot(foot[0] - CX, foot[1] - CY);
    const dropLengthPx = Math.hypot(tip[0] - foot[0], tip[1] - foot[1]);
    let rightAnglePath = null;
    if (projLengthPx > 12 && dropLengthPx > 12) {
        const s = 7;
        const ux = (CX - foot[0]) / projLengthPx;
        const uy = (CY - foot[1]) / projLengthPx;
        const dx = (tip[0] - foot[0]) / dropLengthPx;
        const dy = (tip[1] - foot[1]) / dropLengthPx;
        rightAnglePath = `M ${(foot[0] + ux * s).toFixed(1)} ${(foot[1] + uy * s).toFixed(1)} L ${(foot[0] + ux * s + dx * s).toFixed(1)} ${(foot[1] + uy * s + dy * s).toFixed(1)} L ${(foot[0] + dx * s).toFixed(1)} ${(foot[1] + dy * s).toFixed(1)}`;
    }

    const projectionColor = voltage >= 0 ? '#2f7a62' : '#c0444f';
    const isLbbb = rhythmId === 'lbbb';
    const isRbbb = rhythmId === 'rbbb';
    const isVt = rhythmId === 'vt';
    const isVf = rhythmId === 'vf';
    const isAv1 = rhythmId === 'av_block_1';
    const isWenck = rhythmId === 'av_block_2_wenckebach';
    const isMobitz2 = rhythmId === 'av_block_2_mobitz2';
    const isAv3 = rhythmId === 'av_block_3';
    const isAntStemi = rhythmId === 'anterior_stemi';
    const isPostStemi = rhythmId === 'posterior_stemi';
    const isPericarditis = rhythmId === 'pericarditis';
    const isLongQtc = rhythmId === 'long_qtc';
    const isHyperK = rhythmId === 'hyperkalemia';
    const isHypoK = rhythmId === 'hypokalemia';
    const isLvh = rhythmId === 'lvh';
    const isPe = rhythmId === 'pulmonary_embolism';

    const vtLocal = time % 400;
    let qrsStart = isAv1 ? 290 : isAv3 ? 220 : isHyperK ? 205 : isHypoK ? 195 : 210;
    let qrsEnd = (isLbbb || isRbbb) ? 355 : isAv3 ? 340 : isAv1 ? 380 : isHyperK ? 335 : isHypoK ? 280 : isLvh ? 308 : isPe ? 304 : isLongQtc ? 295 : 300;
    let repolStart = isAv1 ? 460 : isAv3 ? 355 : isLbbb ? 395 : isRbbb ? 390 : isLongQtc ? 430 : isHyperK ? 350 : isHypoK ? 365 : isLvh ? 410 : isPe ? 365 : 380;
    let repolDur = isAv3 ? 120 : isLongQtc ? 310 : isHyperK ? 140 : isHypoK ? 115 : isLvh ? 155 : isPe ? 170 : 160;
    if (isWenck) {
        if (time >= 480) { qrsStart = 535; qrsEnd = 615; repolStart = 615; repolDur = 75; }
        else { qrsStart = 155; qrsEnd = 235; repolStart = 245; repolDur = 70; }
    } else if (isMobitz2) {
        if (time >= 400) { qrsStart = 450; qrsEnd = 525; repolStart = 528; repolDur = 67; }
        else { qrsStart = 160; qrsEnd = 235; repolStart = 238; repolDur = 67; }
    }
    const septal = !isVt && !isVf && time >= qrsStart && time < qrsStart + 24 && !isLbbb;
    const depolarizing = isVf || (isVt ? (vtLocal >= 12 && vtLocal < 192) : (time >= (isLbbb ? 210 : qrsStart + 20) && time < qrsEnd));
    const repolarizing = !isVf && (isVt ? (vtLocal >= 195 && vtLocal < 370) : (time >= repolStart && time < repolStart + repolDur));
    const uWaving = isHypoK && time >= 480 && time < 660;
    const activated = !isVt && !isVf && time >= qrsEnd && time < repolStart;
    const outsideSlice = !isVf && (['p', 'p2', 'pr'].includes(phase.id) || (phase.id === 'basal' && !isLbbb && !isRbbb));

    const perpRadA = (details.angle - 90) * Math.PI / 180;
    const perpRadB = (details.angle + 90) * Math.PI / 180;
    const perpRA = 1 / Math.sqrt((Math.cos(perpRadA) / TRX_SVG) ** 2 + (Math.sin(perpRadA) / TRY_SVG) ** 2);
    const perpRB = 1 / Math.sqrt((Math.cos(perpRadB) / TRX_SVG) ** 2 + (Math.sin(perpRadB) / TRY_SVG) ** 2);

    return (
        <div className="ehm-chest">
            <div className="ehm-svg-anchor-wrap">
                <svg
                    className="ehm-heart-map ehm-chest-map"
                    viewBox="0 0 680 540"
                    role="group"
                    aria-label="Horisontalplan og brystafledninger V1 til V6, set fra fødderne"
                >
                <defs>
                    <filter id={`${prefix}-chest-soft`} x="-35%" y="-35%" width="170%" height="170%">
                        <feGaussianBlur stdDeviation="20" />
                    </filter>
                    <filter id={`${prefix}-chest-glow`} x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <clipPath id={`${prefix}-torso-clip`}>
                        <ellipse cx={TCX_SVG} cy={TCY_SVG} rx={TRX_SVG} ry={TRY_SVG} />
                    </clipPath>
                    <marker id={`${prefix}-net-arrow`} viewBox="0 0 10 10" markerWidth="11" markerHeight="11" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                        <path d="M1 1 L9 5 L1 9 Z" fill="#dd6b20" />
                    </marker>
                    <marker id={`${prefix}-chest-proj`} viewBox="0 0 10 10" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                        <path d="M1 1 L9 5 L1 9 Z" fill={projectionColor} />
                    </marker>
                    <marker id={`${prefix}-lbbb-arrow`} viewBox="0 0 10 10" markerWidth="18" markerHeight="18" refX="7" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                        <path d="M1 1 L9 5 L1 9 Z" fill="#8b5cf6" />
                    </marker>
                    <marker id={`${prefix}-rbbb-arrow`} viewBox="0 0 10 10" markerWidth="18" markerHeight="18" refX="7" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                        <path d="M1 1 L9 5 L1 9 Z" fill="#0ea5e9" />
                    </marker>
                    <marker id={`${prefix}-vt-arrow`} viewBox="0 0 10 10" markerWidth="18" markerHeight="18" refX="7" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                        <path d="M1 1 L9 5 L1 9 Z" fill="#dc2626" />
                    </marker>
                </defs>

                {/* Clean anatomical orientation captions */}
                <text x={CX} y="20" className="ehm-svg-direction">RYG · POSTERIORT</text>
                <text x={CX} y="526" className="ehm-svg-direction">BRYSTBEN · ANTERIORT</text>
                <text x="36" y={CY + 4} className="ehm-svg-direction">HØJRE</text>
                <text x="644" y={CY + 4} className="ehm-svg-direction">VENSTRE</text>

                {/* Subtle positive/negative measurement hemispheres clipped inside thorax */}
                <g clipPath={`url(#${prefix}-torso-clip)`} style={{ pointerEvents: 'none' }}>
                    <path d={torsoHemiPath(details.angle, true)} fill="rgba(47, 122, 98, 0.075)" />
                    <path d={torsoHemiPath(details.angle, false)} fill="rgba(192, 68, 79, 0.038)" />
                    <line
                        x1={TCX_SVG + Math.cos(perpRadA) * perpRA}
                        y1={TCY_SVG + Math.sin(perpRadA) * perpRA}
                        x2={TCX_SVG + Math.cos(perpRadB) * perpRB}
                        y2={TCY_SVG + Math.sin(perpRadB) * perpRB}
                        stroke="#7f9385"
                        strokeWidth="1.1"
                        strokeDasharray="3 4"
                        opacity="0.55"
                    />
                </g>

                {/* Subtle measurement ray to active chest electrode */}
                <line
                    x1={CX - unit[0] * 125}
                    y1={CY - unit[1] * 125}
                    x2={elecX}
                    y2={elecY}
                    stroke="#2f7a62"
                    strokeWidth="1.7"
                    strokeDasharray="5 5"
                    opacity="0.65"
                />

                {/* Calm, bright resting transverse anatomical thorax + ventricles */}
                <image
                    href={chestCrossSectionBase}
                    x={IMG_X}
                    y={IMG_Y}
                    width={IMG_W}
                    height={IMG_H}
                    preserveAspectRatio="xMidYMid meet"
                />

                {/* Living synchronized electrical conduction & pathology overlay */}
                <ChestConductionOverlay time={time} prefix={prefix} rhythmId={rhythmId} />

                {/* Instantaneous VCG loop + 3D dipole vector & 90° orthogonal projection */}
                {showVector && (
                    <path d={vcgHorizontal} fill="none" stroke="#dd6b20" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.38" />
                )}

                {showVector && magnitude > 0.008 && (
                    <g aria-label="Samlet elektrisk retning i horisontalplanet">
                        <line x1={tip[0]} y1={tip[1]} x2={foot[0]} y2={foot[1]} stroke={projectionColor} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.78" />
                        {rightAnglePath && <path d={rightAnglePath} fill="none" stroke={projectionColor} strokeWidth="1.1" opacity="0.78" />}
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
                                    markerEnd={`url(#${prefix}-chest-proj)`}
                                />
                            </>
                        ) : (
                            <circle cx={CX} cy={CY} r="5.5" fill="#ffffff" stroke="#7c8f83" strokeWidth="1.4" opacity="0.85" />
                        )}
                        <line x1={CX} y1={CY} x2={tip[0]} y2={tip[1]} stroke="#ffffff" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
                        <line x1={CX} y1={CY} x2={tip[0]} y2={tip[1]} stroke="#dd6b20" strokeWidth="3.6" markerEnd={`url(#${prefix}-net-arrow)`} />
                        <circle cx={CX} cy={CY} r="4.2" fill="#dd6b20" stroke="#ffffff" strokeWidth="1.5" />
                    </g>
                )}

                {/* High-visibility pathology block/focus badges rendered above vector arrows */}
                <ChestPathologyForeground time={time} rhythmId={rhythmId} />

                {/* 6 clickable V1–V6 electrode badges hugging the anatomical anterior-left thorax */}
                {CHEST_LEADS.map(name => {
                    const [x, y] = electrodePoint(name, 28);
                    const selected = name === lead;
                    return (
                        <g
                            key={name}
                            role="button"
                            tabIndex="0"
                            aria-label={`Vælg afledning ${name}`}
                            aria-pressed={selected}
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
                                x={x - 27}
                                y={y - 18}
                                width="54"
                                height="36"
                                rx="12"
                                fill={selected ? '#2f7a62' : '#fffef9'}
                                stroke={selected ? '#235c4a' : '#c6d3c7'}
                                strokeWidth={selected ? 2 : 1.3}
                            />
                            <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13.5" fontWeight="750" fill={selected ? '#ffffff' : '#354e43'}>
                                {name}<tspan fontSize="9.5" dy="-5"> +</tspan>
                            </text>
                        </g>
                    );
                })}
                </svg>
                {children}
            </div>

            <div className="ehm-chest-caption">
                {isVf
                    ? 'VF: Kaotiske mikro-bølger løber usynkront over hele begge ventrikler -> ingen QRS eller pumpefunktion (hjertestop).'
                    : isLbbb && depolarizing
                        ? 'LBBB: Højre ventrikel aktiveres først, hvorefter bølgen krydser langsomt mod venstre -> dyb QS i V1 og bred R i V6.'
                        : isRbbb && time >= 268 && time < 358
                            ? 'RBBB: Venstre ventrikel er færdig, og bølgen krydser forsinket mod højre ventrikel -> høj R′-tak ("kaninøre") i V1 og S i V6.'
                            : isVt && depolarizing
                                ? 'VT: Ektopisk fokus i venstre ventrikel spreder sig langsomt over mod højre/anteriort -> bredt QRS og høj R i V1.'
                                : (isAntStemi && (activated || repolarizing))
                                    ? 'Forvægs-STEMI: Den forreste LV-væg sender en kraftig skadesstrøm fremad (+z) lige mod V2–V4 → konveks ST-elevation.'
                                    : (isPostStemi && (activated || repolarizing))
                                        ? 'Posteriort STEMI: Skadesstrømmen peger bagud (−z) væk fra V1–V3 → spejlbillede med høj R-tak og ST-depression fortil.'
                                        : (isPericarditis && (activated || repolarizing))
                                            ? 'Perikarditis: Diffus epikardiel irritation hele vejen rundt om hjertet hæver ST-segmentet konkavt i V2–V6.'
                                            : (isLvh && (depolarizing || repolarizing))
                                                ? 'LVH: Den tykke venstre væg trækker QRS kraftigt bagud-venstre (dyb S i V1, kæmpe R i V5–V6) og vender repolariseringen (LV-strain).'
                                                : (isPe && (depolarizing || repolarizing))
                                                    ? 'Lungeemboli: Akut RV-trykbelastning forstørrer højre side og vender repolariseringen fortil (T-inversion i V1–V3).'
                                                    : uWaving
                                                        ? 'Hypokaliæmi: Efter den flade T-tak ses en prominerende U-tak (sen Purkinje-repolarisering) tydeligst i V2–V4.'
                                                        : outsideSlice
                                                            ? phase.id === 'basal'
                                                                ? 'Den sidste basale aktivering ligger delvis uden for dette snit.'
                                                                : 'Atrier og AV-knude ligger uden for dette snit. Start QRS for at følge ventriklerne.'
                                                            : repolarizing
                                                                ? isLongQtc
                                                                    ? 'Langt QTc: Forsinket kalium-udstrømning holder aktionspotentialet åbent og trækker T-bølgen langt ud.'
                                                                    : isHyperK
                                                                        ? 'Hyperkaliæmi: Højt K⁺ accelererer fase-3 repolariseringen og skaber høje, spidse teltformede T-takker i V2–V4.'
                                                                        : (isVt || isLbbb)
                                                                            ? 'Diskordant repolarisering: den ændrede aktivering vender fortegnene, så T-takken peger modsat QRS.'
                                                                            : 'Epikardiet genoplades først (+ yderst, − inderst) → elektrisk vektor (− → +) peger stadig mod venstre (V5/V6).'
                                                                : septal
                                                                    ? 'Septum aktiveres først fra venstre mod højre (blå pil), hvilket giver lille r-tak i V1 og q-tak i V6.'
                                                                    : depolarizing
                                                                        ? 'Purkinje-net og ventrikelvægge aktiveres indefra og ud. Venstre ventrikels tykke væg trækker vektoren bagud-venstre mod V5/V6.'
                                                                        : activated
                                                                            ? 'Ventrikelvæggene er ensartet aktiverede i ST-plateaufasen — ingen spændingsforskel.'
                                                                            : 'Ventrikelvæggene er i hvile. Vælg et QRS-trin eller afspil for at se aktiveringsbølgen.'}
            </div>

            <div className="ehm-chest-measure" aria-label={`Udsving i ${lead}`}>
                <span>{lead} måler <strong>{Math.abs(voltage) < 0.015 ? '≈ 0' : voltage > 0 ? 'opad ↑' : 'nedad ↓'}</strong></span>
                <div className="ehm-measure-track"><span>−</span><i /><b style={{ left: `${Math.max(4, Math.min(96, 50 + voltage / 1.5 * 40))}%` }} /><span>+</span></div>
                <span>{voltage < 0 ? '−' : '+'}{Math.abs(voltage).toFixed(2)} mV</span>
            </div>
            <p className="ehm-arrow-note">Den orange pil viser den elektriske vektors retning og styrke i horisontalplanet; grøn/rød pil viser 90°-projektionen på valgt brystafledning.</p>
        </div>
    );
}
