import React from 'react';
import { MODEL_LEADS, phaseAt, projectionAt } from '../../data/ekgSimulation';

const CHEST_LEADS = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6'];
const RV_OUTER = 'M 313 145 C 247 139 189 188 192 248 C 195 312 256 342 322 322 C 286 300 264 269 268 226 C 271 189 288 160 313 145 Z';
const RV_INNER = 'M 282 171 C 239 174 207 207 210 247 C 214 289 247 311 284 313 C 257 278 248 238 262 202 Z';

function electrodePoint(name) {
    const angle = MODEL_LEADS[name].angle * Math.PI / 180;
    // Intersect the lead ray with the elliptical torso without changing its angle.
    const radius = 1 / Math.sqrt((Math.cos(angle) / 235) ** 2 + (Math.sin(angle) / 178) ** 2);
    return [330 + Math.cos(angle) * radius, 235 + Math.sin(angle) * radius];
}

export default function EkgChestModel({ lead, time, onSelect, showVector, prefix }) {
    const phase = phaseAt(time);
    const { vector, voltage } = projectionAt(lead, time);
    const electrode = electrodePoint(lead);
    // A direction arrow remains readable during the small septal vector.
    // Magnitude is intentionally encoded only by the ECG and voltage meter.
    const magnitude = Math.hypot(...vector);
    const arrowScale = magnitude > 0 ? 74 / magnitude : 0;
    const tip = [330 + vector[0] * arrowScale, 235 + vector[1] * arrowScale];
    const septal = time >= 210 && time < 230;
    const depolarizing = time >= 230 && time < 270;
    const repolarizing = time >= 380 && time < 540;
    const activated = time >= 270 && time < 380;
    const spread = Math.max(0, Math.min(1, (time - 230) / 40));
    const recovery = Math.max(0, Math.min(1, (time - 380) / 160));
    const boundary = repolarizing ? 1 - recovery * .46 : .54 + spread * .46;
    const ventricularFill = activated ? '#dba391' : depolarizing || repolarizing ? `url(#${prefix}-wall)` : '#e2e8e2';
    const outsideSlice = ['p', 'pr', 'basal'].includes(phase.id);

    return <div className="ehm-chest">
        <svg className="ehm-heart-map ehm-chest-map" viewBox="0 0 640 475" role="group" aria-label="Brystafledninger, set fra fødderne">
            <defs>
                <radialGradient id={`${prefix}-wall`}>
                    <stop offset="0" stopColor="#dba391" />
                    <stop offset={`${boundary * 100}%`} stopColor="#dba391" />
                    <stop offset={`${Math.min(1, boundary + .025) * 100}%`} stopColor="#3485b4" />
                    <stop offset={`${Math.min(1, boundary + .065) * 100}%`} stopColor="#e2e8e2" />
                </radialGradient>
                <marker id={`${prefix}-net-arrow`} viewBox="0 0 10 10" markerWidth="12" markerHeight="12" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 1 L9 5 L1 9 Z" fill="#cb781e" /></marker>
                <marker id={`${prefix}-local-arrow`} viewBox="0 0 10 10" markerWidth="8" markerHeight="8" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 1 L9 5 L1 9 Z" fill="#247ea9" /></marker>
            </defs>
            <text x="330" y="24" className="ehm-svg-direction">RYG · POSTERIORT</text>
            <ellipse cx="330" cy="235" rx="235" ry="178" fill="#f4f6ef" stroke="#d8e1d6" strokeWidth="2" />
            <ellipse cx="330" cy="83" rx="22" ry="15" fill="#e1e6da" stroke="#cbd5c5" />
            <rect x="314" y="393" width="32" height="7" rx="3" fill="#cfd9cc" />
            <text x="330" y="462" className="ehm-svg-direction">BRYSTBEN · ANTERIORT</text>
            <text x="45" y="229" className="ehm-svg-direction">HØJRE</text><text x="607" y="205" className="ehm-svg-direction">VENSTRE</text>
            {CHEST_LEADS.map(name => {
                const [x, y] = electrodePoint(name);
                return <line key={name} x1="330" y1="235" x2={x} y2={y} stroke="#d2ded2" strokeDasharray="2 6" />;
            })}
            <path d={RV_OUTER} fill={ventricularFill} stroke="#96ac9d" strokeWidth="2" />
            <path d={RV_INNER} fill="#edf3f6" stroke="#a3b6bd" strokeWidth="1.5" />
            <ellipse cx="351" cy="235" rx="83" ry="94" fill={ventricularFill} stroke="#96ac9d" strokeWidth="2" />
            <ellipse cx="351" cy="235" rx="48" ry="57" fill="#fff6ec" stroke="#c4aaa0" strokeWidth="1.5" />
            {septal && <path d="M 283 186 Q 264 231 282 277" stroke="#3485b4" strokeWidth="11" fill="none" opacity=".7" />}
            <g className="ehm-chest-labels" fill="#526b5c" fontSize="12">
                <path d="M 399 113 L 420 146 L 420 181 M 154 304 L 194 286 M 181 155 L 252 167 L 278 203" fill="none" stroke="#a2b6a8" strokeWidth="1" />
                <text x="392" y="103" textAnchor="middle">Venstre ventrikel</text>
                <text x="136" y="320" textAnchor="middle">Højre ventrikel</text>
                <text x="157" y="151" textAnchor="middle">Septum</text>
                <text x="229" y="249" fontSize="11">HV</text><text x="369" y="271" fontSize="11">VV</text>
            </g>
            {(depolarizing || repolarizing) && [-65, 0, 65, 140].map(angle => {
                const rad = angle * Math.PI / 180;
                const base = repolarizing ? .96 - recovery * .28 : .64 + spread * .20;
                const direction = repolarizing ? -1 : 1;
                return <line key={angle} x1={351 + Math.cos(rad) * 83 * base} y1={235 + Math.sin(rad) * 94 * base}
                    x2={351 + Math.cos(rad) * 83 * (base + direction * .16)} y2={235 + Math.sin(rad) * 94 * (base + direction * .16)}
                    stroke="#247ea9" strokeWidth="2.5" markerEnd={`url(#${prefix}-local-arrow)`} />;
            })}
            {septal && <line x1="295" y1="225" x2="265" y2="238" stroke="#247ea9" strokeWidth="3" markerEnd={`url(#${prefix}-local-arrow)`} />}
            <line x1="330" y1="235" x2={electrode[0]} y2={electrode[1]} stroke="#386f62" strokeWidth="2" strokeDasharray="6 6" opacity=".75" />
            {showVector && Math.hypot(...vector) > .008 && <g aria-label="Samlet elektrisk retning">
                <line x1="330" y1="235" x2={tip[0]} y2={tip[1]} stroke="#fffdf5" strokeWidth="8" strokeLinecap="round" />
                <line x1="330" y1="235" x2={tip[0]} y2={tip[1]} stroke="#cb781e" strokeWidth="3.5" markerEnd={`url(#${prefix}-net-arrow)`} />
                <circle cx="330" cy="235" r="4" fill="#cb781e" stroke="white" strokeWidth="1.5" />
            </g>}
            {CHEST_LEADS.map(name => {
                const [x, y] = electrodePoint(name);
                const selected = name === lead;
                return <g key={name} role="button" tabIndex="0" aria-label={`Vælg afledning ${name}`} aria-pressed={selected} className="ehm-map-lead"
                    onClick={() => onSelect(name)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(name); } }}>
                    <rect x={x - 28} y={y - 22} width="56" height="44" rx="15" fill={selected ? '#386f62' : '#fffef9'} stroke={selected ? '#386f62' : '#cdd8cd'} strokeWidth="1.5" />
                    <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={selected ? 'white' : '#4d6257'}>{name}<tspan fontSize="10" dy="-6"> +</tspan></text>
                </g>;
            })}
        </svg>
        <div className="ehm-chest-caption">{outsideSlice ? phase.id === 'basal' ? 'Den sidste basale aktivering ligger delvis uden for dette snit.' : 'Atrier og AV-knude ligger uden for dette snit. Start QRS for at følge ventriklerne.' : repolarizing ? 'Blå pile: repolarisation udefra og ind. Orange pil: den samlede elektriske retning.' : septal ? 'Septum aktiveres fra venstre mod højre. Følg den lille blå pil gennem skillevæggen.' : depolarizing ? 'Blå pile: udbredelse indefra og ud. Orange pil: summen af hjertets elektriske aktivitet.' : activated ? 'Ventrikelvæggene er aktiverede. Der er næsten ingen samlet elektrisk vektor i ST-segmentet.' : 'Ventrikelvæggene er i hvile. Vælg et QRS-trin for at se aktiveringen.'}</div>
        <div className="ehm-chest-measure" aria-label={`Udsving i ${lead}`}>
            <span>{lead} måler <strong>{Math.abs(voltage) < .015 ? '≈ 0' : voltage > 0 ? 'opad ↑' : 'nedad ↓'}</strong></span>
            <div className="ehm-measure-track"><span>−</span><i /><b style={{ left: `${50 + voltage / 1.5 * 40}%` }} /><span>+</span></div>
            <span>{voltage < 0 ? '−' : '+'}{Math.abs(voltage).toFixed(2)} mV</span>
        </div>
        <p className="ehm-arrow-note">Den orange pil viser retningen, ikke spændingsstørrelsen. Størrelsen aflæses på EKG-kurven.</p>
    </div>;
}
