import React from 'react';
import { MODEL_LEADS, phaseAt, projectionAt, vectorLoopPath } from '../../data/ekgSimulation';

const CHEST_LEADS = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
const CX = 330;
const CY = 248;
const TORSO_RX = 232;
const TORSO_RY = 172;

// Anatomical right ventricle crescent and thick left ventricle cross-section.
const RV_OUTER = 'M 315 154 C 248 150 198 196 202 252 C 206 312 260 338 320 321 C 288 299 270 269 273 229 C 276 194 292 167 315 154 Z';
const RV_INNER = 'M 284 176 C 244 180 215 212 218 250 C 222 290 253 310 288 311 C 263 278 255 241 267 206 Z';

function electrodePoint(name) {
    const angle = MODEL_LEADS[name].angle * Math.PI / 180;
    const radius = 1 / Math.sqrt((Math.cos(angle) / TORSO_RX) ** 2 + (Math.sin(angle) / TORSO_RY) ** 2);
    return [CX + Math.cos(angle) * radius, CY + Math.sin(angle) * radius];
}

function torsoHemiPath(leadAngleDeg, positive) {
    const start = (leadAngleDeg + (positive ? -90 : 90)) * Math.PI / 180;
    const end = (leadAngleDeg + (positive ? 90 : 270)) * Math.PI / 180;
    const r1 = 1 / Math.sqrt((Math.cos(start) / TORSO_RX) ** 2 + (Math.sin(start) / TORSO_RY) ** 2);
    const r2 = 1 / Math.sqrt((Math.cos(end) / TORSO_RX) ** 2 + (Math.sin(end) / TORSO_RY) ** 2);
    const x1 = CX + Math.cos(start) * r1;
    const y1 = CY + Math.sin(start) * r1;
    const x2 = CX + Math.cos(end) * r2;
    const y2 = CY + Math.sin(end) * r2;
    return `M ${CX} ${CY} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${TORSO_RX} ${TORSO_RY} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
}

export default function EkgChestModel({ lead, time, onSelect, showVector, prefix }) {
    const details = MODEL_LEADS[lead] || MODEL_LEADS.V1;
    const phase = phaseAt(time);
    const { vector, unit, point, voltage } = projectionAt(lead, time);
    const electrode = electrodePoint(lead);

    const magnitude = Math.hypot(...vector);
    const scale = 100;
    const tip = [CX + vector[0] * scale, CY + vector[1] * scale];
    const foot = [CX + point[0] * scale, CY + point[1] * scale];
    const vcgHorizontal = vectorLoopPath('horizontal', CX, CY, scale, 0);

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

    const septal = time >= 210 && time < 230;
    const depolarizing = time >= 230 && time < 300;
    const repolarizing = time >= 380 && time < 540;
    const activated = time >= 300 && time < 380;
    const spread = Math.max(0, Math.min(1, (time - 230) / 70));
    const recovery = Math.max(0, Math.min(1, (time - 380) / 160));
    const boundary = repolarizing ? 1 - recovery * 0.45 : 0.54 + spread * 0.46;
    const ventricularFill = activated
        ? '#dc8872'
        : depolarizing || repolarizing
            ? `url(#${prefix}-chest-wall)`
            : `url(#${prefix}-chest-rest)`;
    const outsideSlice = ['p', 'pr', 'basal'].includes(phase.id);
    const projectionColor = voltage >= 0 ? '#2f7a62' : '#c0444f';

    const perpRadA = (details.angle - 90) * Math.PI / 180;
    const perpRadB = (details.angle + 90) * Math.PI / 180;
    const perpRA = 1 / Math.sqrt((Math.cos(perpRadA) / TORSO_RX) ** 2 + (Math.sin(perpRadA) / TORSO_RY) ** 2);
    const perpRB = 1 / Math.sqrt((Math.cos(perpRadB) / TORSO_RX) ** 2 + (Math.sin(perpRadB) / TORSO_RY) ** 2);

    return (
        <div className="ehm-chest">
            <svg
                className="ehm-heart-map ehm-chest-map"
                viewBox="0 0 660 500"
                role="group"
                aria-label="Horisontalplan og brystafledninger V1 til V6, set fra fødderne"
            >
                <defs>
                    <radialGradient id={`${prefix}-chest-bg`} cx="50%" cy="50%" r="58%">
                        <stop offset="0%" stopColor="#fcfcf7" />
                        <stop offset="80%" stopColor="#f3f5ed" />
                        <stop offset="100%" stopColor="#e8ede3" />
                    </radialGradient>
                    <radialGradient id={`${prefix}-chest-rest`}>
                        <stop offset="0%" stopColor="#e7ece7" />
                        <stop offset="100%" stopColor="#d4dcd6" />
                    </radialGradient>
                    <radialGradient id={`${prefix}-chest-wall`}>
                        <stop offset="0%" stopColor="#dc8872" />
                        <stop offset={`${boundary * 100}%`} stopColor="#dc8872" />
                        <stop offset={`${Math.min(1, boundary + 0.03) * 100}%`} stopColor={repolarizing ? '#2f947c' : '#f0b14b'} />
                        <stop offset={`${Math.min(1, boundary + 0.08) * 100}%`} stopColor={repolarizing ? '#2f947c' : '#dde4de'} />
                    </radialGradient>
                    <clipPath id={`${prefix}-torso-clip`}>
                        <ellipse cx={CX} cy={CY} rx={TORSO_RX} ry={TORSO_RY} />
                    </clipPath>
                    <filter id={`${prefix}-chest-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#23372d" floodOpacity="0.12" />
                    </filter>
                    <marker id={`${prefix}-net-arrow`} viewBox="0 0 10 10" markerWidth="11" markerHeight="11" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                        <path d="M1 1 L9 5 L1 9 Z" fill="#d58227" />
                    </marker>
                    <marker id={`${prefix}-local-arrow`} viewBox="0 0 10 10" markerWidth="8" markerHeight="8" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                        <path d="M1 1 L9 5 L1 9 Z" fill="#247ea9" />
                    </marker>
                    <marker id={`${prefix}-chest-proj`} viewBox="0 0 10 10" markerWidth="9" markerHeight="9" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                        <path d="M1 1 L9 5 L1 9 Z" fill={projectionColor} />
                    </marker>
                </defs>

                <text x={CX} y="24" className="ehm-svg-direction">RYG · POSTERIORT</text>
                <text x={CX} y="486" className="ehm-svg-direction">BRYSTBEN · ANTERIORT</text>
                <text x="44" y={CY + 4} className="ehm-svg-direction">HØJRE</text>
                <text x="616" y={CY + 4} className="ehm-svg-direction">VENSTRE</text>

                <ellipse cx={CX} cy={CY} rx={TORSO_RX + 10} ry={TORSO_RY + 10} fill="#e8ede3" stroke="#d0dacf" strokeWidth="1.5" />
                <ellipse cx={CX} cy={CY} rx={TORSO_RX} ry={TORSO_RY} fill={`url(#${prefix}-chest-bg)`} stroke="#c8d4c8" strokeWidth="1.8" />

                <g clipPath={`url(#${prefix}-torso-clip)`}>
                    <path d={torsoHemiPath(details.angle, true)} fill="rgba(47, 122, 98, 0.095)" />
                    <path d={torsoHemiPath(details.angle, false)} fill="rgba(192, 68, 79, 0.045)" />
                    <line
                        x1={CX + Math.cos(perpRadA) * perpRA}
                        y1={CY + Math.sin(perpRadA) * perpRA}
                        x2={CX + Math.cos(perpRadB) * perpRB}
                        y2={CY + Math.sin(perpRadB) * perpRB}
                        stroke="#7f9385"
                        strokeWidth="1.1"
                        strokeDasharray="3 4"
                        opacity="0.6"
                    />
                </g>

                <path
                    d="M 272 134 C 192 128 124 186 126 248 C 128 312 184 366 254 362 C 218 332 192 292 192 246 C 192 196 226 154 272 134 Z"
                    fill="#e7efe9"
                    stroke="#d2ded5"
                    strokeWidth="1.2"
                    opacity="0.65"
                />
                <path
                    d="M 388 134 C 468 128 536 186 534 248 C 532 312 478 364 410 356 C 438 326 446 286 442 244 C 437 196 416 156 388 134 Z"
                    fill="#e7efe9"
                    stroke="#d2ded5"
                    strokeWidth="1.2"
                    opacity="0.65"
                />

                <g fill="#dfe5db" stroke="#c3cec0" strokeWidth="1.3">
                    <path d="M 324 80 L 330 56 L 336 80 M 298 92 L 320 96 M 362 92 L 340 96" strokeWidth="5" strokeLinecap="round" stroke="#d5ddd1" />
                    <ellipse cx={CX} cy="99" rx="22" ry="16" />
                    <ellipse cx={CX} cy="84" rx="7" ry="6" fill="#edf1eb" />
                    <rect x="308" y="407" width="44" height="10" rx="5" />
                </g>
                <circle cx="364" cy="126" r="10.5" fill="#dfb3ab" stroke="#b37c73" strokeWidth="1.4" />
                <circle cx="364" cy="126" r="6" fill="#f7e6e2" />

                {CHEST_LEADS.map(name => {
                    const [x, y] = electrodePoint(name);
                    return <line key={name} x1={CX} y1={CY} x2={x} y2={y} stroke="#ced9cd" strokeDasharray="2 6" opacity="0.7" />;
                })}

                <line
                    x1={CX - unit[0] * 145}
                    y1={CY - unit[1] * 145}
                    x2={electrode[0]}
                    y2={electrode[1]}
                    stroke="#2f7a62"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                    opacity="0.75"
                />

                <g filter={`url(#${prefix}-chest-shadow)`}>
                    <path d={RV_OUTER} fill={ventricularFill} stroke="#83998b" strokeWidth="2" />
                    <path d={RV_INNER} fill="#eaf1f5" stroke="#8ba3ad" strokeWidth="1.5" />

                    <ellipse cx="354" cy="248" rx="81" ry="90" fill={ventricularFill} stroke="#7d9486" strokeWidth="2.1" />
                    <path
                        d="M 354 195 C 378 195 397 215 397 244 C 397 254 391 262 385 268 C 391 276 388 294 366 301 C 344 306 318 290 315 268 C 312 260 319 253 317 244 C 313 219 330 195 354 195 Z"
                        fill="#fff4ee"
                        stroke="#bd938b"
                        strokeWidth="1.6"
                    />
                    {septal && <path d="M 284 196 Q 268 244 285 288" stroke="#2f85b8" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.68" />}
                </g>

                <g className="ehm-chest-labels" fill="#4f6658" fontSize="11.5" fontWeight="600">
                    <path d="M 432 126 L 424 160 L 418 186 M 164 316 L 204 294 M 184 166 L 254 176 L 281 211" fill="none" stroke="#97ab9d" strokeWidth="1.1" />
                    <text x="438" y="117" textAnchor="middle">Venstre ventrikel</text>
                    <text x="148" y="331" textAnchor="middle">Højre ventrikel</text>
                    <text x="158" y="162" textAnchor="middle">Septum</text>
                    <text x="234" y="256" fontSize="12" fontWeight="750">HV</text>
                    <text x="354" y="254" fontSize="12.5" fontWeight="750" textAnchor="middle">VV</text>
                </g>

                {depolarizing && [-65, 0, 65, 140].map(angle => {
                    const a = angle * Math.PI / 180;
                    const base = 0.62 + spread * 0.22;
                    return (
                        <line
                            key={angle}
                            x1={354 + Math.cos(a) * 81 * base}
                            y1={248 + Math.sin(a) * 90 * base}
                            x2={354 + Math.cos(a) * 81 * (base + 0.16)}
                            y2={248 + Math.sin(a) * 90 * (base + 0.16)}
                            stroke="#247ea9"
                            strokeWidth="2.4"
                            markerEnd={`url(#${prefix}-local-arrow)`}
                        />
                    );
                })}
                {repolarizing && [-65, 0, 65, 140].map(angle => {
                    const a = angle * Math.PI / 180;
                    const ix = 354 + Math.cos(a) * 81 * 0.56;
                    const iy = 248 + Math.sin(a) * 90 * 0.56;
                    const ox = 354 + Math.cos(a) * 81 * 0.94;
                    const oy = 248 + Math.sin(a) * 90 * 0.94;
                    return (
                        <g key={angle} style={{ pointerEvents: 'none' }}>
                            <line x1={ix} y1={iy} x2={ox} y2={oy} stroke="#4f8f80" strokeWidth="1.3" strokeDasharray="2 2" opacity="0.7" />
                            <circle cx={ix} cy={iy} r="6.8" fill="#fff3ee" stroke="#c86b51" strokeWidth="1.4" />
                            <text x={ix} y={iy} textAnchor="middle" dominantBaseline="central" fontSize="9.5" fontWeight="800" fill="#b44c34">−</text>
                            <circle cx={ox} cy={oy} r="6.8" fill="#eafaf4" stroke="#1f866f" strokeWidth="1.4" />
                            <text x={ox} y={oy} textAnchor="middle" dominantBaseline="central" fontSize="9.5" fontWeight="800" fill="#166d59">+</text>
                        </g>
                    );
                })}
                {septal && <line x1="298" y1="238" x2="266" y2="250" stroke="#247ea9" strokeWidth="3" markerEnd={`url(#${prefix}-local-arrow)`} />}

                {showVector && (
                    <path d={vcgHorizontal} fill="none" stroke="#d58227" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
                )}

                {showVector && magnitude > 0.008 && (
                    <g aria-label="Samlet elektrisk retning i horisontalplanet">
                        <line x1={tip[0]} y1={tip[1]} x2={foot[0]} y2={foot[1]} stroke={projectionColor} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.75" />
                        {rightAnglePath && <path d={rightAnglePath} fill="none" stroke={projectionColor} strokeWidth="1.1" opacity="0.75" />}
                        {projLengthPx > 8 ? (
                            <line
                                x1={CX}
                                y1={CY}
                                x2={foot[0]}
                                y2={foot[1]}
                                stroke={projectionColor}
                                strokeWidth="3.8"
                                opacity="0.92"
                                markerEnd={`url(#${prefix}-chest-proj)`}
                            />
                        ) : (
                            <circle cx={CX} cy={CY} r="5.2" fill="#ffffff" stroke="#7c8f83" strokeWidth="1.4" opacity="0.85" />
                        )}
                        <line x1={CX} y1={CY} x2={tip[0]} y2={tip[1]} stroke="#fffdf5" strokeWidth="7.5" strokeLinecap="round" />
                        <line x1={CX} y1={CY} x2={tip[0]} y2={tip[1]} stroke="#d58227" strokeWidth="3.6" markerEnd={`url(#${prefix}-net-arrow)`} />
                        <circle cx={CX} cy={CY} r="4.5" fill="#d58227" stroke="#fffdf8" strokeWidth="1.5" />
                    </g>
                )}

                {CHEST_LEADS.map(name => {
                    const [x, y] = electrodePoint(name);
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
                                x={x - 28}
                                y={y - 20}
                                width="56"
                                height="40"
                                rx="13"
                                fill={selected ? '#2f7a62' : '#fffef9'}
                                stroke={selected ? '#235c4a' : '#c6d3c7'}
                                strokeWidth={selected ? 2 : 1.3}
                            />
                            <text x={x} y={y + 5} textAnchor="middle" fontSize="14.5" fontWeight="750" fill={selected ? '#ffffff' : '#354e43'}>
                                {name}<tspan fontSize="9.5" dy="-5.5"> +</tspan>
                            </text>
                        </g>
                    );
                })}
            </svg>

            <div className="ehm-chest-caption">
                {outsideSlice
                    ? phase.id === 'basal'
                        ? 'Den sidste basale aktivering ligger delvis uden for dette snit.'
                        : 'Atrier og AV-knude ligger uden for dette snit. Start QRS for at følge ventriklerne.'
                    : repolarizing
                        ? 'Epikardiet genoplades først (+ yderst, − inderst) → elektrisk vektor (− → +) peger stadig mod venstre (V5/V6).'
                        : septal
                            ? 'Septum aktiveres først fra venstre mod højre (lille blå pil), hvilket giver r-tak i V1 og q-tak i V6.'
                            : depolarizing
                                ? 'Blå pile: aktivering indefra og ud. Venstre ventrikels tykke væg trækker vektoren bagud-venstre mod V5/V6.'
                                : activated
                                    ? 'Ventrikelvæggene er ensartet aktiverede i ST-plateaufasen — ingen spændingsforskel.'
                                    : 'Ventrikelvæggene er i hvile. Vælg et QRS-trin for at se aktiveringsbølgen.'}
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
