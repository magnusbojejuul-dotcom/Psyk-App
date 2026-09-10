import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Activity, ArrowRight, Zap } from 'lucide-react';
import { CYCLE_MS, MODEL_LEADS, PHASES, advancePlayback, phaseAt, projectionAt, voltageAt, waveformPath } from '../../data/ekgSimulation';
import EkgChestModel from './EkgChestModel';
import './EkgHeartModel.css';

const LEADS = Object.keys(MODEL_LEADS);
const FRONTAL_ORDER = ['aVL', 'I', 'II', 'aVF', 'III', 'aVR'];
const CHAMBERS = [
    { id: 'ra', label: 'HA', x: -61, y: -62, path: 'M -79 -116 C -117 -109 -122 -40 -85 -21 L -27 -21 L -24 -73 Q -37 -111 -79 -116 Z', cavity: 'M -77 -102 C -103 -95 -104 -47 -81 -35 L -40 -35 L -39 -72 Q -47 -97 -77 -102 Z' },
    { id: 'la', label: 'VA', x: 42, y: -67, path: 'M -15 -82 C -5 -120 58 -117 80 -91 Q 103 -55 75 -28 L 3 -28 Z', cavity: 'M 0 -78 C 8 -104 51 -103 67 -82 Q 83 -60 66 -42 L 15 -42 Z' },
    { id: 'rv', label: 'HV', x: -52, y: 36, path: 'M -87 -12 Q -118 36 -67 94 L 16 137 Q -18 81 -14 1 L -26 -12 Z', cavity: 'M -76 5 Q -91 35 -55 76 L -17 106 Q -38 58 -31 7 Z' },
    { id: 'lv', label: 'VV', x: 47, y: 42, path: 'M 1 -13 L 80 -17 C 135 23 100 104 25 145 C -4 112 -5 60 1 -13 Z', cavity: 'M 22 7 L 65 5 C 99 31 74 84 31 111 Q 17 73 22 7 Z' },
];
const CELLS = CHAMBERS.flatMap(chamber => {
    const cells = [];
    const atrial = chamber.id.endsWith('a');
    for (let y = atrial ? -116 : -10; y < (atrial ? -20 : 145); y += 12) {
        for (let x = -110; x < 120; x += 12) {
            const delay = atrial
                ? 80 + Math.min(94, Math.hypot(x + 80, y + 100) * 0.48)
                : 213 + Math.min(81, Math.abs(x) * 0.44 + Math.abs(y - 65) * 0.20);
            cells.push({ chamber: chamber.id, x, y, delay, atrial });
        }
    }
    return cells;
});

function cellColor(cell, time) {
    if (time < cell.delay) return '#e5e9e7';
    if (cell.atrial) return time < 210 ? '#527dd0' : '#e5e9e7';
    const recovery = 380 + Math.max(0, 115 - Math.abs(cell.x)) * 1.15;
    if (time >= recovery + 22) return '#e5e9e7';
    if (time >= recovery) return '#379984';
    if (time < cell.delay + 15) return '#efad57';
    return '#d97765';
}

function HeartAnatomy({ time, prefix }) {
    const atrialProgress = Math.max(0, Math.min(1, (time - 80) / 100));
    const ventricularProgress = Math.max(0, Math.min(1, (time - 210) / 75));
    return <g transform="translate(300 220) scale(.82)">
        <defs>{CHAMBERS.map(chamber => <clipPath key={chamber.id} id={`${prefix}-${chamber.id}`}><path d={chamber.path} /></clipPath>)}</defs>
        <path d="M -80 -111 L -80 -154 M -58 -109 L -58 -154" stroke="#afc7d7" strokeWidth="13" />
        <path d="M 8 -84 C -4 -154 36 -161 49 -128 L 57 -109" fill="none" stroke="#c99589" strokeWidth="22" />
        {CHAMBERS.map(chamber => <g key={chamber.id}>
            <path d={chamber.path} fill="#e5e9e7" stroke="#9dafa6" strokeWidth="2" />
            <g clipPath={`url(#${prefix}-${chamber.id})`}>{CELLS.filter(cell => cell.chamber === chamber.id).map(cell =>
                <circle key={`${cell.x}-${cell.y}`} cx={cell.x} cy={cell.y} r="8.6" fill={cellColor(cell, time)} />
            )}</g>
            <path d={chamber.path} fill="none" stroke="#a5b3ab" strokeWidth="2" />
            <path d={chamber.cavity} fill={chamber.id.startsWith('r') ? '#eaf0f4' : '#fff0e9'} stroke="#a5b3ab" strokeWidth="1.4" />
            <text x={chamber.x} y={chamber.y} className="ehm-chamber-label">{chamber.label}</text>
        </g>)}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M -80 -100 Q -35 -103 -20 -35 M -70 -91 Q -70 -54 -20 -35 M -56 -96 Q -7 -112 47 -84" stroke="#bdc9bc" strokeWidth="3" />
            <path d="M -20 -35 L -7 2 L 2 73 Q -5 89 -22 95 M -7 2 L 19 79 Q 43 111 77 55 M 19 79 Q 62 78 80 22 M 2 73 Q -49 72 -73 20" stroke="#bec7b2" strokeWidth="4" />
            {time >= 80 && time < 180 && <path d="M -80 -100 Q -35 -103 -20 -35 M -56 -96 Q -7 -112 47 -84" pathLength="1" strokeDasharray={`${atrialProgress} 1`} stroke="#325ec0" strokeWidth="5" />}
            {time >= 210 && time < 300 && <path d="M -20 -35 L -7 2 L 2 73 Q -5 89 -22 95 M -7 2 L 19 79 Q 43 111 77 55 M 19 79 Q 62 78 80 22 M 2 73 Q -49 72 -73 20" pathLength="1" strokeDasharray={`${ventricularProgress} 1`} stroke="#ffdd80" strokeWidth="5" />}
        </g>
        <circle cx="-80" cy="-100" r="7" fill={time >= 80 && time < 180 ? '#527dd0' : '#f4d27b'} stroke="white" strokeWidth="2" />
        <circle cx="-20" cy="-35" r={time >= 180 && time < 210 ? 9 : 6} fill="#e6b751" stroke="white" strokeWidth="2" />
        <text x="-105" y="-120" className="ehm-node-label">SA</text><text x="-33" y="-18" className="ehm-node-label">AV</text>
    </g>;
}

function LeadMap({ lead, time, onSelect, showVector, prefix }) {
    const details = MODEL_LEADS[lead];
    const horizontal = details.plane === 'horizontal';
    if (horizontal) return <EkgChestModel lead={lead} time={time} onSelect={onSelect} showVector={showVector} prefix={prefix} />;
    const { vector, unit, point } = projectionAt(lead, time);
    const tip = [300 + vector[0] * 80, 220 + vector[1] * 80];
    const foot = [300 + point[0] * 80, 220 + point[1] * 80];
    const visible = LEADS.filter(name => MODEL_LEADS[name].plane === details.plane);
    const radius = 170;
    return <svg className="ehm-heart-map" viewBox="0 0 600 450" role="group" aria-label={horizontal ? 'Brystafledninger, set fra fødderne' : 'Ekstremitetsafledninger, set forfra'}>
        <defs>
            <marker id={`${prefix}-vector`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L6,3 L0,6 Z" fill="#d58227" /></marker>
            <marker id={`${prefix}-projection`} markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#386f62" /></marker>
        </defs>
        {horizontal ? <>
            <ellipse cx="300" cy="220" rx="213" ry="172" fill="#f4f5ef" stroke="#dce3da" strokeWidth="2" />
            <ellipse cx="300" cy="94" rx="23" ry="17" fill="#e0e5dd" />
            <text x="300" y="28" className="ehm-svg-direction">POSTERIORT · RYG</text><text x="300" y="428" className="ehm-svg-direction">ANTERIORT · BRYST</text>
        </> : <>
            <circle cx="300" cy="220" r="177" fill="#f6f7f1" stroke="#dce3da" />
            <circle cx="300" cy="220" r="133" fill="none" stroke="#e2e7de" strokeDasharray="3 7" />
            <text x="300" y="25" className="ehm-svg-direction">SUPERIOR · HOVED</text><text x="300" y="440" className="ehm-svg-direction">INFERIOR · FØDDER</text>
        </>}
        <text x="58" y="208" className="ehm-svg-direction">HØJRE</text><text x="545" y="208" className="ehm-svg-direction">VENSTRE</text>
        {visible.map(name => {
            const angle = MODEL_LEADS[name].angle * Math.PI / 180;
            return <line key={name} x1="300" y1="220" x2={300 + Math.cos(angle) * radius} y2={220 + Math.sin(angle) * radius} stroke="#d6dfd5" strokeDasharray="3 5" />;
        })}
        <HeartAnatomy time={time} horizontal={horizontal} prefix={prefix} />
        <line x1={300 - unit[0] * radius} y1={220 - unit[1] * radius} x2={300 + unit[0] * radius} y2={220 + unit[1] * radius} stroke="#386f62" strokeWidth="2" strokeDasharray="5 5" opacity=".7" />
        <circle cx={300 - unit[0] * radius} cy={220 - unit[1] * radius} r="12" fill="#e7eee7" stroke="#78968a" />
        <text x={300 - unit[0] * radius} y={224 - unit[1] * radius} textAnchor="middle" fill="#386f62" fontSize="15">−</text>
        {showVector && Math.hypot(...vector) > .008 && <g>
            <line x1={tip[0]} y1={tip[1]} x2={foot[0]} y2={foot[1]} stroke="#386f62" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="300" y1="220" x2={foot[0]} y2={foot[1]} stroke="#386f62" strokeWidth="5" markerEnd={`url(#${prefix}-projection)`} />
            <line x1="300" y1="220" x2={tip[0]} y2={tip[1]} stroke="#fffdf8" strokeWidth="8" />
            <line x1="300" y1="220" x2={tip[0]} y2={tip[1]} stroke="#d58227" strokeWidth="4" markerEnd={`url(#${prefix}-vector)`} />
            <circle cx="300" cy="220" r="4" fill="#d58227" />
        </g>}
        {visible.map(name => {
            const info = MODEL_LEADS[name];
            const angle = info.angle * Math.PI / 180;
            const x = 300 + Math.cos(angle) * radius;
            const y = 220 + Math.sin(angle) * radius;
            const active = name === lead;
            return <g key={name} role="button" tabIndex="0" aria-label={`Vælg afledning ${name}`} aria-pressed={active}
                className="ehm-map-lead" onClick={() => onSelect(name)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(name); } }}>
                <rect x={x - (horizontal ? 26 : 28)} y={y - 21} width={horizontal ? 52 : 56} height="42" rx="15" fill={active ? '#386f62' : '#fffef9'} stroke={active ? '#386f62' : '#cdd8cd'} strokeWidth={active ? 2 : 1} />
                <text x={x} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill={active ? 'white' : '#4d6257'}>{name}<tspan fontSize="10" dy="-6"> +</tspan></text>
                {!horizontal && <text x={x} y={y + 36} textAnchor="middle" fontSize="11" fill="#708275">{info.angle > 0 ? '+' : ''}{info.angle}°</text>}
            </g>;
        })}
    </svg>;
}

function Trace({ lead, time, compact = false }) {
    const id = useId().replace(/:/g, '');
    const width = 400;
    const baseline = compact ? 40 : 104;
    const gain = compact ? 23 : 57;
    const height = compact ? 76 : 200;
    const path = useMemo(() => waveformPath(lead, width, baseline, gain), [lead, baseline, gain]);
    const x = time / CYCLE_MS * width;
    const y = baseline - voltageAt(lead, time) * gain;
    return <svg viewBox={`0 0 ${width} ${height}`} className={compact ? 'ehm-mini-trace' : 'ehm-trace'} role="img" aria-label={`EKG-kurve for ${lead}`}>
        <defs>
            <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#e3e9e2" strokeWidth=".7" /></pattern>
            <clipPath id={`${id}-sweep`}><rect width={x} height={height} /></clipPath>
        </defs>
        {!compact && <rect width="400" height={height} fill={`url(#${id}-grid)`} />}
        {!compact && PHASES.filter(phase => ['p', 'ventricular', 't'].includes(phase.id)).map(phase => <text key={phase.id} x={phase.time / 2} y="19" className="ehm-wave-label">{phase.id === 'ventricular' ? 'QRS' : phase.short}</text>)}
        <line x1="0" y1={baseline} x2="400" y2={baseline} stroke="#b7c5bb" strokeWidth=".8" />
        <path d={path} fill="none" stroke="#b6c7bc" strokeWidth={compact ? 2 : 2.3} />
        <path d={path} clipPath={`url(#${id}-sweep)`} fill="none" stroke="#386f62" strokeWidth={compact ? 2.6 : 2.8} strokeLinejoin="round" />
        <line x1={x} y1={compact ? 0 : 28} x2={x} y2={height - (compact ? 0 : 20)} stroke="#d58227" strokeWidth="1" opacity=".65" />
        <circle cx={x} cy={y} r={compact ? 3 : 4.5} fill="#d58227" stroke="white" strokeWidth="1.5" data-trace-dot={lead} />
        {!compact && <><text x="3" y="192" className="ehm-wave-label">0 ms</text><text x="200" y="192" className="ehm-wave-label" textAnchor="middle">400</text><text x="397" y="192" className="ehm-wave-label" textAnchor="end">800 ms</text></>}
    </svg>;
}

function ElectrodePlacement({ lead }) {
    const horizontal = MODEL_LEADS[lead].plane === 'horizontal';
    return <details className="ehm-placement">
        <summary>Hvor sidder elektroderne til {lead}?</summary>
        <p><strong>{MODEL_LEADS[lead].placement}</strong></p>
        <p>{horizontal ? 'V1–V6 måles mod Wilsons centrale terminal: gennemsnittet af potentialerne fra højre arm, venstre arm og venstre ben. Brystafledningernes retninger i modellen er skematiske.' : 'Fire elektroder på ekstremiteterne giver seks afledninger. Højre bens elektrode bruges til støjreduktion og indgår ikke i afledningernes spændingsforskel.'}</p>
        <p>En afledning er en måleretning, ikke en enkelt elektrode. Plus og minus på diagrammet viser måleaksens polaritet; minusmærket angiver ikke en fysisk elektrodeplacering.</p>
    </details>;
}

export default function EkgHeartModel({ selectedLead, onSelectLead }) {
    const [localLead, setLocalLead] = useState('II');
    const candidate = selectedLead ?? localLead;
    const lead = MODEL_LEADS[candidate] ? candidate : 'II';
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState('study');
    const [qrsOnly, setQrsOnly] = useState(false);
    const [time, setTime] = useState(220);
    const [showVector, setShowVector] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const lastTime = useRef(null);
    const prefix = useId().replace(/:/g, '');
    const details = MODEL_LEADS[lead];
    const phase = phaseAt(time);
    const voltage = voltageAt(lead, time);
    const projection = projectionAt(lead, time);
    const magnitude = Math.hypot(...projection.vector);
    const projectionRatio = magnitude > 0 ? Math.hypot(...projection.point) / magnitude : 0;
    const flat = Math.abs(voltage) < 0.015;
    const polarity = flat ? 'Næsten intet udsving' : voltage > 0 ? 'Positivt udsving' : 'Negativt udsving';

    useEffect(() => {
        if (!playing) return undefined;
        let frame;
        lastTime.current = null;
        const animate = timestamp => {
            const delta = lastTime.current === null ? 0 : Math.min(timestamp - lastTime.current, 100);
            lastTime.current = timestamp;
            setTime(previous => advancePlayback(previous, delta, speed, qrsOnly));
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [playing, speed, qrsOnly]);

    const selectLead = name => {
        if (MODEL_LEADS[name].plane !== details.plane) setPlaying(false);
        setLocalLead(name);
        onSelectLead?.(name);
    };
    const jump = value => { setPlaying(false); setTime(value); if (value < 210 || value >= 300) setQrsOnly(false); };
    const startQrs = () => {
        setSpeed('study');
        setQrsOnly(true);
        if (time < 210 || time >= 300) setTime(210);
        setPlaying(true);
    };
    const step = direction => {
        const index = PHASES.findIndex(item => item.id === phase.id);
        jump(PHASES[(index + direction + PHASES.length) % PHASES.length].time);
    };
    const visibleLeads = showAll ? LEADS : details.plane === 'frontal' ? FRONTAL_ORDER : LEADS.slice(6);

    return <div className="ehm">
        <div className="ehm-heading">
            <div><div className="ehm-eyebrow">DET SAMME HJERTESLAG · 12 SYNSVINKLER</div><h2>Fra elektrisk impuls til EKG</h2><p>Klik på en afledning. Følg impulsen i hjertet, og se hvorfor kurven går op eller ned.</p></div>
            <span className="ehm-badge"><Activity size={14} /> Normal sinusrytme · 75/min</span>
        </div>
        <div className="ehm-workspace">
            <section className="ehm-model-card" aria-label="Interaktiv hjertemodel">
                <div className="ehm-card-top"><span className="ehm-step-label">01 / HJERTET & AFLEDNINGEN</span><div className="ehm-plane-switch" aria-label="Vælg plan">
                    <button type="button" aria-pressed={details.plane === 'frontal'} onClick={() => selectLead(details.plane === 'frontal' ? lead : 'II')}>Forfra <span>6 ekstremitetsafledninger</span></button>
                    <button type="button" aria-pressed={details.plane === 'horizontal'} onClick={() => selectLead(details.plane === 'horizontal' ? lead : 'V1')}>Tværsnit <span>V1–V6</span></button>
                </div></div>
                <div className="ehm-map-caption"><span>{details.plane === 'frontal' ? 'Frontalplan · patienten set forfra' : 'Horisontalplan · set fra fødderne'}</span><label><input type="checkbox" checked={showVector} onChange={event => setShowVector(event.target.checked)} /> Vis vektor</label></div>
                {details.plane === 'horizontal' && <div className="ehm-chest-controls">
                    <div><strong>Følg QRS i fire trin</strong><button type="button" onClick={playing && qrsOnly ? () => setPlaying(false) : startQrs}>{playing && qrsOnly ? <Pause size={14} /> : <Play size={14} />}{playing && qrsOnly ? 'Pause QRS' : 'Afspil QRS langsomt'}</button></div>
                    <div className="ehm-chest-steps">{[{ time: 220, label: '1 · Septum', from: 210, to: 230 }, { time: 238, label: '2 · Tidlig aktivering', from: 230, to: 244 }, { time: 264, label: '3 · Venstre ventrikel', from: 244, to: 270 }, { time: 280, label: '4 · Sidste aktivering', from: 270, to: 300 }].map(item => <button type="button" key={item.time} aria-pressed={time >= item.from && time < item.to} onClick={() => jump(item.time)}>{item.label}</button>)}</div>
                    <p>{playing && qrsOnly ? 'QRS gentages langsomt. Tryk på et trin for at stoppe dér.' : 'Tryk på et trin. Tiden står stille, mens du sammenligner V1–V6.'}</p>
                </div>}
                <LeadMap lead={lead} time={time} onSelect={selectLead} showVector={showVector} prefix={prefix} />
                <div className="ehm-map-legend"><span><i className="ehm-key-vector" />{details.plane === 'horizontal' ? 'Samlet elektrisk retning' : 'Samlet elektrisk vektor'}</span><span><i className={details.plane === 'horizontal' ? 'ehm-key-spread' : 'ehm-key-projection'} />{details.plane === 'horizontal' ? 'Lokal udbredelse i vævet' : 'Del langs afledningen'}</span><span><i className="ehm-key-activation" />Aktiveret væv</span></div>
                <div className="ehm-anatomy-note">{details.plane === 'frontal' ? 'HA / VA: højre / venstre atrium · HV / VV: højre / venstre ventrikel · SA: sinusknude · AV: AV-knude' : 'HV / VV: højre / venstre ventrikel. Atrier og AV-knude ligger uden for dette snit.'}</div>
            </section>
            <aside className="ehm-side">
                <section className="ehm-monitor" aria-label="Live EKG">
                    <div className="ehm-card-top"><span className="ehm-step-label">02 / DET AFLEDNINGEN MÅLER</span><span className={`ehm-live ${playing ? 'is-playing' : ''}`}><i />{playing ? 'LIVE' : 'PAUSE'}</span></div>
                    <div className="ehm-monitor-title"><div><h3>Afledning {lead}</h3><span>{details.region} · {details.plane === 'frontal' ? `${details.angle > 0 ? '+' : ''}${details.angle}°` : 'brystafledning'}</span></div><div className="ehm-voltage" data-testid="live-voltage">{voltage >= 0 ? '+' : '−'}{Math.abs(voltage).toFixed(2)} <small>mV</small></div></div>
                    <Trace lead={lead} time={time} />
                    <div className="ehm-monitor-footer"><span>Ét slag · 800 ms</span><span>Modelamplitude · fælles skala</span></div>
                </section>
                <section className="ehm-explanation" aria-label="Forklaring af aktuelt udsving">
                    <span className="ehm-step-label">03 / DERFOR SER KURVEN SÅDAN UD</span>
                    <div className="ehm-phase-name"><span style={{ background: phase.color }}>{phase.short}</span><h3>{phase.name}</h3></div>
                    <p>{phase.description}</p>
                    <div className="ehm-polarity"><span className="ehm-polarity-symbol">{flat ? '→' : voltage > 0 ? '↗' : '↘'}</span><div><strong>{polarity} i {lead}</strong><p>{magnitude < .015 ? 'Der er næsten ingen samlet elektrisk vektor i dette øjeblik.' : flat ? projectionRatio < .2 ? 'Vektoren ligger næsten vinkelret på afledningens akse. Derfor bliver projektionen lille.' : 'Den elektriske vektor er svag i dette øjeblik, så udsvinget bliver lille.' : `Den samlede elektriske vektor peger ${voltage > 0 ? 'mod' : 'væk fra'} afledningens pluspol. Derfor ligger kurven ${voltage > 0 ? 'over' : 'under'} grundlinjen.`}</p></div></div>
                    {phase.id === 't' && <p className="ehm-small-note">Pilen viser den elektriske vektor. Under repolarisation er den modsat selve udbredelsesretningen.</p>}
                    <div className="ehm-poles"><span><b>+</b> {details.positive}</span><span><b>−</b> {details.reference}</span></div>
                </section>
            </aside>
        </div>
        <section className="ehm-timeline" aria-label="Afspilning og faser">
            <div className="ehm-transport">
                <div className="ehm-play-controls"><button type="button" className="ehm-play" onClick={() => setPlaying(previous => !previous)}>{playing ? <Pause size={17} /> : <Play size={17} />}{playing ? 'Pause' : 'Afspil'}</button><button type="button" className="ehm-icon-button" aria-label="Forrige fase" onClick={() => step(-1)}><ChevronLeft size={19} /></button><button type="button" className="ehm-icon-button" aria-label="Næste fase" onClick={() => step(1)}><ChevronRight size={19} /></button><button type="button" className="ehm-icon-button" aria-label="Nulstil hjerteslaget" onClick={() => jump(0)}><RotateCcw size={16} /></button></div>
                <div className="ehm-scrub"><label htmlFor={`${prefix}-time`}>Træk gennem hjerteslaget <span data-testid="cycle-time">{Math.round(time)} / 800 ms</span></label><input id={`${prefix}-time`} aria-label="Tid i hjerteslaget" type="range" min="0" max="799" step="1" value={Math.round(time)} onChange={event => jump(Number(event.target.value))} /></div>
                <label className="ehm-speed">Tempo<select aria-label="Afspilningstempo" value={speed} onChange={event => setSpeed(event.target.value)}><option value="study">Læring · QRS på 11 sek.</option><option value="0.1">0,1× · langsomt</option><option value="0.5">0,5× · langsomt</option><option value="1">1× · realtid</option></select></label>
            </div>
            <div className="ehm-phase-buttons">{PHASES.map((item, index) => <button type="button" key={item.id} aria-pressed={phase.id === item.id} onClick={() => jump(item.time)} style={{ '--phase-color': item.color }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.short}</strong><i /></button>)}</div>
            <div className="ehm-playback-note"><label><input type="checkbox" checked={qrsOnly} onChange={event => { setQrsOnly(event.target.checked); if (event.target.checked && (time < 210 || time >= 300)) jump(220); }} /> Gentag kun QRS</label><span>{speed === 'study' ? 'Læring: QRS er strakt fra 90 ms til 11 sek. Kurvens tidsakse viser stadig hjertets tid.' : 'Ensartet tempo gennem hele hjerteslaget.'}</span></div>
            <p className="ehm-timeline-hint"><Zap size={13} /> Vælg en fase for at fryse tiden. Skift derefter afledning og sammenlign præcis samme øjeblik.</p>
        </section>
        <section className="ehm-comparison">
            <div className="ehm-comparison-heading"><div><h3>Samme impuls. Forskellige udsving.</h3><p>Alle kurver viser det samme hjerteslag og bruger samme spændingsskala.</p></div><button type="button" className="ehm-text-button" aria-expanded={showAll} onClick={() => setShowAll(previous => !previous)}>{showAll ? 'Vis kun det valgte plan' : 'Vis alle 12 afledninger'} <ArrowRight size={15} /></button></div>
            <div className="ehm-lead-grid">{visibleLeads.map(name => <button type="button" key={name} className="ehm-lead-preview" aria-label={`Sammenlign afledning ${name}`} aria-pressed={name === lead} onClick={() => selectLead(name)}><span className="ehm-preview-label"><strong>{name}</strong><span>{MODEL_LEADS[name].region}</span></span><Trace compact lead={name} time={time} /></button>)}</div>
        </section>
        <ElectrodePlacement lead={lead} />
        <div className="ehm-mobile-monitor" role="region" aria-label="EKG mens du ser på hjertet">
            <div><strong>Afledning {lead}</strong><span>{phase.short} · {voltage >= 0 ? '+' : '−'}{Math.abs(voltage).toFixed(2)} mV</span><button type="button" aria-label={playing ? 'Sæt EKG på pause' : 'Start EKG'} onClick={() => setPlaying(previous => !previous)}>{playing ? <Pause size={15} /> : <Play size={15} />}</button></div>
            <Trace compact lead={lead} time={time} />
        </div>
        <details className="ehm-method"><summary>Sådan skal modellen forstås · fagligt grundlag</summary><p>Forenklet undervisningsmodel af normal sinusrytme, ikke et patient-EKG. Hjertet, projektionen og kurverne følger samme elektriske vektor. Anatomi og brystafledningernes vinkler er skematiske; faktiske kurveformer varierer med anatomi og elektrodeplacering. Modellen viser principperne, ikke alle normale varianter.</p><p>Q og S er negative udsving; R er et positivt udsving i QRS. En bestemt aktiveringsfase hedder derfor ikke nødvendigvis det samme i alle afledninger. Ved vinkelret vektor er øjebliksspændingen nul; et helt QRS kan være bifasisk, fordi vektoren ændrer retning undervejs.</p><p>Fagligt grundlag: <a href="https://cvphysiology.com/arrhythmias/a014" target="_blank" rel="noreferrer">Klabunde: elektriske vektorer og EKG-regler</a> · <a href="https://cvphysiology.com/arrhythmias/a016" target="_blank" rel="noreferrer">Ventrikelaktivering</a> · <a href="https://cvphysiology.com/arrhythmias/a013c" target="_blank" rel="noreferrer">Brystafledninger</a>.</p></details>
    </div>;
}
