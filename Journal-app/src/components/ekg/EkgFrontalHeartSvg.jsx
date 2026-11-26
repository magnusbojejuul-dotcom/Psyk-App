import React from 'react';
import heartConductionBase from '../../assets/ekg_heart_conduction_base.png';
import {
    CHAMBER_GLOWS,
    CONDUCTION_PATHS,
    HEART_CENTER,
    HEART_IMG_H,
    HEART_IMG_W,
    HEART_LABELS,
    PHASE_COLORS
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

function ElectricPath({ d, progress, color, width = 14 }) {
    const p = clamp01(progress);
    if (p <= 0.001) return null;
    return (
        <g>
            <path d={d} pathLength="1" strokeDasharray={`${p} 1`} stroke={color} strokeWidth={width * 1.9} opacity="0.30" />
            <path d={d} pathLength="1" strokeDasharray={`${p} 1`} stroke={color} strokeWidth={width} opacity="0.96" />
            <path d={d} pathLength="1" strokeDasharray={`${p} 1`} stroke="#ffffff" strokeWidth={width * 0.34} opacity="0.62" />
        </g>
    );
}

function ConductionOverlay({ time, prefix }) {
    // Smooth, continuous choreography from SA node -> atrial tracts -> AV node -> His -> bundles -> Purkinje
    const saActive = time >= 72 && time < 195;
    const saPulse = saActive ? Math.sin(clamp01((time - 72) / 60) * Math.PI) : 0;

    const atrialLineActive = time >= 80 && time < 205;
    const atrialLineFade = time >= 182 ? clamp01(1 - (time - 182) / 23) : 1;
    const saBridgeProgress = clamp01((time - 80) / 26);
    const internodalProgress = clamp01((time - 80) / 76);
    const bachmannProgress = clamp01((time - 82) / 54);
    const bachmannBranchProgress = clamp01((time - 120) / 46);
    const atrialGlow = time >= 88 && time < 200
        ? Math.sin(clamp01((time - 88) / 112) * Math.PI) * 0.24
        : 0;

    const avActive = time >= 160 && time < 215;
    const avPulse = avActive ? Math.sin(clamp01((time - 160) / 55) * Math.PI) : 0;

    const ventLineActive = time >= 210 && time < 320;
    const ventLineFade = time >= 295 ? clamp01(1 - (time - 295) / 25) : 1;
    const hisProgress = clamp01((time - 210) / 12);
    const bundleProgress = clamp01((time - 220) / 42);
    const fascicleProgress = clamp01((time - 232) / 22);
    const purkinjeProgress = clamp01((time - 258) / 38);

    const septalGlow = time >= 212 && time < 252
        ? Math.sin(clamp01((time - 212) / 40) * Math.PI) * 0.20
        : 0;
    const ventDepolGlow = time >= 232 && time < 310
        ? Math.sin(clamp01((time - 232) / 78) * Math.PI * 0.5) * 0.17
        : 0;
    const stGlow = time >= 300 && time < 385
        ? 0.12 * (time >= 365 ? clamp01(1 - (time - 365) / 20) : 1)
        : 0;
    const repolGlow = time >= 380 && time < 545
        ? Math.sin(clamp01((time - 380) / 165) * Math.PI) * 0.18
        : 0;

    return (
        <g transform={`translate(${IMG_X} ${IMG_Y}) scale(${IMG_SCALE})`}>
            {/* Soft regional chamber depolarization / repolarization glows */}
            <g filter={`url(#${prefix}-soft-blur)`} style={{ pointerEvents: 'none' }}>
                {atrialGlow > 0.005 && (
                    <>
                        <ellipse {...CHAMBER_GLOWS.ra} fill={PHASE_COLORS.p} opacity={atrialGlow} />
                        <ellipse cx={CHAMBER_GLOWS.la.cx} cy={CHAMBER_GLOWS.la.cy} rx={CHAMBER_GLOWS.la.rx} ry={CHAMBER_GLOWS.la.ry} fill={PHASE_COLORS.p} opacity={atrialGlow * 0.88} />
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
                {(ventDepolGlow > 0.005 || stGlow > 0.005) && (
                    <>
                        <ellipse
                            cx={CHAMBER_GLOWS.rv.cx}
                            cy={CHAMBER_GLOWS.rv.cy}
                            rx={CHAMBER_GLOWS.rv.rx}
                            ry={CHAMBER_GLOWS.rv.ry}
                            transform={`rotate(${CHAMBER_GLOWS.rv.rotate} ${CHAMBER_GLOWS.rv.cx} ${CHAMBER_GLOWS.rv.cy})`}
                            fill={stGlow > 0 ? PHASE_COLORS.st : PHASE_COLORS.qrs}
                            opacity={Math.max(ventDepolGlow, stGlow) * 0.82}
                        />
                        <ellipse
                            cx={CHAMBER_GLOWS.lv.cx}
                            cy={CHAMBER_GLOWS.lv.cy}
                            rx={CHAMBER_GLOWS.lv.rx}
                            ry={CHAMBER_GLOWS.lv.ry}
                            transform={`rotate(${CHAMBER_GLOWS.lv.rotate} ${CHAMBER_GLOWS.lv.cx} ${CHAMBER_GLOWS.lv.cy})`}
                            fill={stGlow > 0 ? PHASE_COLORS.st : PHASE_COLORS.qrs}
                            opacity={Math.max(ventDepolGlow, stGlow)}
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

            {/* PR delay: AV node golden physiological hold */}
            {avActive && (
                <g>
                    <circle cx={CONDUCTION_PATHS.avNode.cx} cy={CONDUCTION_PATHS.avNode.cy} r={52 + avPulse * 30} fill={PHASE_COLORS.pr} opacity={0.32 + avPulse * 0.24} filter={`url(#${prefix}-soft-blur)`} />
                    <path d={CONDUCTION_PATHS.avNode.outline} fill={PHASE_COLORS.pr} opacity={0.68 + avPulse * 0.24} />
                </g>
            )}

            {/* QRS: His bundle -> bundle branches -> septal fascicles -> Purkinje arborizations */}
            {ventLineActive && (
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={ventLineFade} filter={`url(#${prefix}-impulse-glow)`}>
                    <ElectricPath d={CONDUCTION_PATHS.hisBundle} progress={hisProgress} color={PHASE_COLORS.qrs} width={16} />
                    <ElectricPath d={CONDUCTION_PATHS.rbbSeptal} progress={bundleProgress} color={PHASE_COLORS.qrs} width={15} />
                    <ElectricPath d={CONDUCTION_PATHS.lbbSeptal} progress={bundleProgress} color={PHASE_COLORS.qrs} width={16} />
                    <ElectricPath d={CONDUCTION_PATHS.lbbSeptalFascicleA} progress={fascicleProgress} color={PHASE_COLORS.qrs} width={11} />
                    <ElectricPath d={CONDUCTION_PATHS.lbbSeptalFascicleB} progress={fascicleProgress} color={PHASE_COLORS.qrs} width={10} />
                    <ElectricPath d={CONDUCTION_PATHS.rvPurkinje} progress={purkinjeProgress} color={PHASE_COLORS.qrs} width={14} />
                    <ElectricPath d={CONDUCTION_PATHS.lvPurkinje} progress={purkinjeProgress} color={PHASE_COLORS.qrs} width={16} />
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
            <ConductionOverlay time={time} prefix={prefix} />

            {/* Clean instantaneous vector + orthogonal projection onto selected lead */}
            {showVector && magnitude > 0.008 && (
                <g>
                    <line x1={tip[0]} y1={tip[1]} x2={foot[0]} y2={foot[1]} stroke={projectionColor} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.75" />
                    {rightAnglePath && <path d={rightAnglePath} fill="none" stroke={projectionColor} strokeWidth="1.1" opacity="0.75" />}

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
