import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Activity, ArrowRight, Zap, Info, X } from 'lucide-react';
import {
    AXIS_PRESETS,
    CYCLE_MS,
    MODEL_LEADS,
    PHASES,
    advancePlayback,
    meanQrsAngle,
    phaseAt,
    projectionAt,
    voltageAt,
    waveformPath
} from '../../data/ekgSimulation';
import { PHASE_COLORS } from '../../data/heartConductionPaths';
import EkgChestModel from './EkgChestModel';
import EkgFrontalHeartSvg from './EkgFrontalHeartSvg';
import './EkgHeartModel.css';

const LEADS = Object.keys(MODEL_LEADS);
const FRONTAL_ORDER = ['aVL', 'I', 'II', 'aVF', 'III', 'aVR'];

const TRACE_SEGMENTS = [
    { id: 'rest1', start: 0, end: 80, color: PHASE_COLORS.rest },
    { id: 'p', start: 80, end: 180, color: PHASE_COLORS.p },
    { id: 'pr', start: 180, end: 210, color: PHASE_COLORS.pr },
    { id: 'qrs', start: 210, end: 300, color: PHASE_COLORS.qrs },
    { id: 'st', start: 300, end: 380, color: PHASE_COLORS.st },
    { id: 't', start: 380, end: 540, color: PHASE_COLORS.t },
    { id: 'rest2', start: 540, end: 800, color: PHASE_COLORS.rest }
];

function Trace({ lead, time, compact = false, axisOffsetDeg = 0, onJump }) {
    const id = useId().replace(/:/g, '');
    const width = 400;
    const baseline = compact ? 40 : 104;
    const gain = compact ? 23 : 57;
    const height = compact ? 76 : 200;
    const path = useMemo(() => waveformPath(lead, width, baseline, gain, axisOffsetDeg), [lead, baseline, gain, axisOffsetDeg]);
    const x = time / CYCLE_MS * width;
    const y = baseline - voltageAt(lead, time, axisOffsetDeg) * gain;
    const phase = phaseAt(time);
    const activeColor = phase.id === 'p'
        ? PHASE_COLORS.p
        : phase.id === 'pr'
            ? PHASE_COLORS.pr
            : ['septal', 'ventricular', 'basal'].includes(phase.id)
                ? PHASE_COLORS.qrs
                : phase.id === 'st'
                    ? PHASE_COLORS.st
                    : phase.id === 't'
                        ? PHASE_COLORS.t
                        : PHASE_COLORS.rest;
    const showPhaseBand = !compact && phase.id !== 'rest';
    const bandX = phase.start / CYCLE_MS * width;
    const bandW = (phase.end - phase.start) / CYCLE_MS * width;

    const handleSvgClick = event => {
        if (compact || !onJump) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (!rect.width) return;
        const frac = Math.max(0, Math.min(0.999, (event.clientX - rect.left) / rect.width));
        onJump(Math.round(frac * CYCLE_MS));
    };

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className={`${compact ? 'ehm-mini-trace' : 'ehm-trace'} ${!compact && onJump ? 'is-interactive' : ''}`}
            role="img"
            aria-label={`EKG-kurve for ${lead}`}
            onClick={handleSvgClick}
        >
            <defs>
                <pattern id={`${id}-subgrid`} width="4" height="4" patternUnits="userSpaceOnUse">
                    <path d="M4 0H0V4" fill="none" stroke="#f2e7e5" strokeWidth="0.45" />
                </pattern>
                <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill={`url(#${id}-subgrid)`} />
                    <path d="M20 0H0V20" fill="none" stroke="#e4d6d3" strokeWidth="0.85" />
                </pattern>
                <clipPath id={`${id}-sweep`}><rect width={x} height={height} /></clipPath>
                {!compact && TRACE_SEGMENTS.map(seg => {
                    const segEnd = Math.min(time, seg.end);
                    const segX = seg.start / CYCLE_MS * width;
                    const segW = Math.max(0, (segEnd - seg.start) / CYCLE_MS * width);
                    return (
                        <clipPath key={seg.id} id={`${id}-seg-${seg.id}`}>
                            <rect x={segX} y="0" width={segW} height={height} />
                        </clipPath>
                    );
                })}
            </defs>
            {!compact && <rect width="400" height={height} fill={`url(#${id}-grid)`} rx="8" />}
            {showPhaseBand && (
                <rect x={bandX} y="24" width={bandW} height={height - 42} fill={activeColor} opacity="0.09" rx="3" />
            )}
            {!compact && PHASES.filter(p => ['p', 'ventricular', 't'].includes(p.id)).map(p => (
                <text
                    key={p.id}
                    x={p.time / 2}
                    y="17"
                    className="ehm-wave-label"
                    style={{
                        fill: p.id === 'p' ? PHASE_COLORS.p : p.id === 't' ? PHASE_COLORS.t : PHASE_COLORS.qrs,
                        fontWeight: 700
                    }}
                >
                    {p.id === 'ventricular' ? 'QRS' : p.short}
                </text>
            ))}
            <line x1="0" y1={baseline} x2="400" y2={baseline} stroke="#b9c6bd" strokeWidth="0.9" />
            <path d={path} fill="none" stroke="#c3cfc7" strokeWidth={compact ? 1.9 : 2.1} />

            {compact ? (
                <path d={path} clipPath={`url(#${id}-sweep)`} fill="none" stroke="#2f7a62" strokeWidth="2.5" strokeLinejoin="round" />
            ) : (
                TRACE_SEGMENTS.map(seg => (
                    time > seg.start && (
                        <path
                            key={seg.id}
                            d={path}
                            clipPath={`url(#${id}-seg-${seg.id})`}
                            fill="none"
                            stroke={seg.color}
                            strokeWidth="3.1"
                            strokeLinejoin="round"
                        />
                    )
                ))
            )}

            <line x1={x} y1={compact ? 0 : 24} x2={x} y2={height - (compact ? 0 : 18)} stroke={activeColor} strokeWidth="1.2" opacity="0.72" />
            <circle cx={x} cy={y} r={compact ? 3 : 4.8} fill={activeColor} stroke="white" strokeWidth="1.6" data-trace-dot={lead} />
            {!compact && (
                <>
                    <text x="4" y="192" className="ehm-wave-label">0 ms</text>
                    <text x="200" y="192" className="ehm-wave-label" textAnchor="middle">400</text>
                    <text x="396" y="192" className="ehm-wave-label" textAnchor="end">800 ms</text>
                </>
            )}
        </svg>
    );
}

function ElectrodePlacement({ lead }) {
    const horizontal = MODEL_LEADS[lead].plane === 'horizontal';
    return (
        <details className="ehm-placement">
            <summary>Hvor sidder elektroderne til {lead}?</summary>
            <p><strong>{MODEL_LEADS[lead].placement}</strong></p>
            <p>{horizontal ? 'V1–V6 måles mod Wilsons centrale terminal: gennemsnittet af potentialerne fra højre arm, venstre arm og venstre ben. Brystafledningernes retninger i modellen er skematiske.' : 'Fire elektroder på ekstremiteterne giver seks afledninger. Højre bens elektrode bruges til støjreduktion og indgår ikke i afledningernes spændingsforskel.'}</p>
            <p>En afledning er en måleretning, ikke en enkelt elektrode. Plus og minus på diagrammet viser måleaksens polaritet; minusmærket angiver ikke en fysisk elektrodeplacering.</p>
        </details>
    );
}

export default function EkgHeartModel({ selectedLead, onSelectLead }) {
    const [localLead, setLocalLead] = useState('II');
    const candidate = selectedLead ?? localLead;
    const lead = MODEL_LEADS[candidate] ? candidate : 'II';
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState('study');
    const [qrsOnly, setQrsOnly] = useState(false);
    const [time, setTime] = useState(142);
    const [showVector, setShowVector] = useState(true);
    const [showAxisZones, setShowAxisZones] = useState(true);
    const [axisPresetId, setAxisPresetId] = useState('normal');
    const [showAll, setShowAll] = useState(false);
    const [showVectorInfo, setShowVectorInfo] = useState(false);
    const lastTime = useRef(null);
    const untouchedInitial = useRef(true);
    const prefix = useId().replace(/:/g, '');

    const details = MODEL_LEADS[lead];
    const activePreset = AXIS_PRESETS[axisPresetId] || AXIS_PRESETS.normal;
    const axisOffsetDeg = details.plane === 'frontal' ? activePreset.offsetDeg : 0;
    const meanAxisDeg = meanQrsAngle(axisOffsetDeg);

    const phase = phaseAt(time);
    const voltage = voltageAt(lead, time, axisOffsetDeg);
    const projection = projectionAt(lead, time, axisOffsetDeg);
    const magnitude = Math.hypot(...projection.vector);
    const projectionRatio = magnitude > 0 ? Math.hypot(...projection.point) / magnitude : 0;
    const flat = Math.abs(voltage) < 0.015;
    const polarity = flat ? 'Næsten intet udsving' : voltage > 0 ? 'Positivt udsving' : 'Negativt udsving';
    const instantAngle = magnitude > 0.015 && details.plane === 'frontal'
        ? Math.round(Math.atan2(projection.vector[1], projection.vector[0]) * 180 / Math.PI)
        : null;

    const formatDeg = val => {
        const r = Math.round(val);
        return r > 0 ? `+${r}°` : r < 0 ? `−${Math.abs(r)}°` : '0°';
    };

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

    useEffect(() => {
        if (!showVectorInfo) return undefined;
        const onKey = event => {
            if (event.key === 'Escape') setShowVectorInfo(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [showVectorInfo]);

    const selectLead = name => {
        if (MODEL_LEADS[name].plane !== details.plane) setPlaying(false);
        setLocalLead(name);
        onSelectLead?.(name);
    };
    const jump = value => { untouchedInitial.current = false; setPlaying(false); setTime(value); if (value < 210 || value >= 300) setQrsOnly(false); };
    const togglePlay = () => {
        if (!playing && untouchedInitial.current && !qrsOnly) {
            setTime(65);
        }
        untouchedInitial.current = false;
        setPlaying(previous => !previous);
    };
    const startQrs = () => {
        untouchedInitial.current = false;
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

    return (
        <div className="ehm">
            <div className="ehm-heading">
                <div>
                    <div className="ehm-eyebrow">DET SAMME HJERTESLAG · 12 SYNSVINKLER</div>
                    <h2>Fra elektrisk impuls til EKG</h2>
                    <p>Klik på en afledning eller direkte på EKG-kurven. Følg impulserne gennem hjertets ledningsbaner i samme farve som takkerne på EKG&apos;et.</p>
                </div>
                <span className="ehm-badge">
                    <Activity size={14} /> Normal sinusrytme · 75/min · {details.plane === 'frontal' ? `Akse ${formatDeg(meanAxisDeg)}` : 'Horisontalplan'}
                </span>
            </div>

            <div className="ehm-workspace">
                <section className="ehm-model-card" aria-label="Interaktiv hjertemodel">
                    <div className="ehm-card-top">
                        <span className="ehm-step-label">01 / HJERTET, AKSEN &amp; AFLEDNINGEN</span>
                        <div className="ehm-plane-switch" aria-label="Vælg plan">
                            <button type="button" aria-pressed={details.plane === 'frontal'} onClick={() => selectLead(details.plane === 'frontal' ? lead : 'II')}>
                                Forfra <span>6 ekstremitetsafledninger</span>
                            </button>
                            <button type="button" aria-pressed={details.plane === 'horizontal'} onClick={() => selectLead(details.plane === 'horizontal' ? lead : 'V1')}>
                                Tværsnit <span>V1–V6</span>
                            </button>
                        </div>
                    </div>

                    <div className="ehm-map-caption">
                        <span>{details.plane === 'frontal' ? 'Frontalplan · lyst anatomisk hjerte + elektrisk impuls' : 'Horisontalplan · set fra fødderne'}</span>
                        <div className="ehm-toggles">
                            {details.plane === 'frontal' && (
                                <label>
                                    <input type="checkbox" checked={showAxisZones} onChange={event => setShowAxisZones(event.target.checked)} /> Vis Cabrera-akse
                                </label>
                            )}
                            <label>
                                <input type="checkbox" checked={showVector} onChange={event => setShowVector(event.target.checked)} /> Vis vektor
                            </label>
                        </div>
                    </div>

                    {details.plane === 'frontal' && (
                        <div className="ehm-axis-bar" role="region" aria-label="Elektrisk akse i Cabrera-cirklen">
                            <div className="ehm-axis-bar-top">
                                <strong>Elektrisk akse (Cabrera)</strong>
                                <div className="ehm-axis-presets">
                                    {Object.values(AXIS_PRESETS).map(preset => (
                                        <button
                                            key={preset.id}
                                            type="button"
                                            aria-pressed={axisPresetId === preset.id}
                                            onClick={() => setAxisPresetId(preset.id)}
                                            style={{ '--axis-color': preset.color }}
                                        >
                                            {preset.short}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <p>{activePreset.clinicalNote}</p>
                        </div>
                    )}

                    {details.plane === 'horizontal' && (
                        <div className="ehm-chest-controls">
                            <div>
                                <strong>Følg QRS i fire trin</strong>
                                <button type="button" onClick={playing && qrsOnly ? () => setPlaying(false) : startQrs}>
                                    {playing && qrsOnly ? <Pause size={14} /> : <Play size={14} />}
                                    {playing && qrsOnly ? 'Pause QRS' : 'Afspil QRS langsomt'}
                                </button>
                            </div>
                            <div className="ehm-chest-steps">
                                {[
                                    { time: 220, label: '1 · Septum', from: 210, to: 230 },
                                    { time: 238, label: '2 · Tidlig aktivering', from: 230, to: 244 },
                                    { time: 264, label: '3 · Venstre ventrikel', from: 244, to: 270 },
                                    { time: 280, label: '4 · Sidste aktivering', from: 270, to: 300 }
                                ].map(item => (
                                    <button type="button" key={item.time} aria-pressed={time >= item.from && time < item.to} onClick={() => jump(item.time)}>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                            <p>{playing && qrsOnly ? 'QRS gentages langsomt. Tryk på et trin for at stoppe dér.' : 'Tryk på et trin. Tiden står stille, mens du sammenligner V1–V6.'}</p>
                        </div>
                    )}

                    <div className="ehm-figure-stage">
                        <button
                            type="button"
                            className="ehm-vector-info-btn"
                            aria-expanded={showVectorInfo}
                            aria-controls={`${prefix}-vector-info`}
                            onClick={() => setShowVectorInfo(open => !open)}
                        >
                            <Info size={13} />
                            <span>Forstå vektorer</span>
                        </button>

                        {showVectorInfo && (
                            <div
                                id={`${prefix}-vector-info`}
                                className="ehm-vector-popover"
                                role="dialog"
                                aria-label="Forklaring af elektriske vektorer og EKG-aflæsninger"
                            >
                                <div className="ehm-vector-popover-head">
                                    <strong>Hvad viser vektorerne på hjertet?</strong>
                                    <button
                                        type="button"
                                        aria-label="Luk vektorforklaring"
                                        onClick={() => setShowVectorInfo(false)}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                <ul>
                                    <li>
                                        <i style={{ background: '#dd6b20' }} />
                                        <div>
                                            <strong>Orange pil (hjertets vektor):</strong> Viser den samlede retning og styrke af elektriciteten lige nu — lille i atrierne, stor i venstre ventrikel.
                                        </div>
                                    </li>
                                    <li>
                                        <i style={{ background: '#2f7a62' }} />
                                        <div>
                                            <strong>Grøn (+) eller rød (−) projektion:</strong> Fældet i 90° ned på den valgte aflednings linje. Peger projektionen mod <strong>+</strong> (grøn), går EKG-kurven <strong>opad</strong>; peger den væk (rød), går den <strong>nedad</strong>; ved præcis 90° måles <strong>0 mV</strong>.
                                        </div>
                                    </li>
                                    <li>
                                        <i style={{ background: '#248f77' }} />
                                        <div>
                                            <strong>+ yderst / − inderst (T-tak):</strong> Epikardiet genoplades først (<em>+</em> udenpå), mens indersiden stadig er depolariseret (<em>−</em>). Derfor peger den elektriske vektor (<em>− → +</em>) stadig ud mod <strong>+</strong>-afledningen (fx i II) → positiv T-tak.
                                        </div>
                                    </li>
                                </ul>
                                <p className="ehm-vector-popover-note">
                                    Samme slag ses fra 12 vinkler: Afledning <strong>II (+60°)</strong> ser hovedvektoren komme imod sig (+), mens <strong>aVR (−150°)</strong> ser den bevæge sig væk (−).
                                </p>
                            </div>
                        )}

                        {details.plane === 'horizontal' ? (
                            <EkgChestModel lead={lead} time={time} onSelect={selectLead} showVector={showVector} prefix={prefix} />
                        ) : (
                            <EkgFrontalHeartSvg
                                lead={lead}
                                time={time}
                                onSelect={selectLead}
                                showVector={showVector}
                                showAxisZones={showAxisZones}
                                axisOffsetDeg={axisOffsetDeg}
                                prefix={prefix}
                            />
                        )}

                        {details.plane === 'frontal' && phase.id === 't' && (
                            <p className="ehm-repol-note">
                                <strong>T-tak:</strong> Epikardiet genoplades først (<span>+ yderst</span>, <span className="is-neg">− inderst</span>) → den elektriske vektor (<em>− → +</em>) peger stadig ud mod apeks / afledning II.
                            </p>
                        )}
                    </div>

                    <div className="ehm-map-legend">
                        {details.plane === 'frontal' ? (
                            <>
                                <span><i className="ehm-key-axis-dot" style={{ background: PHASE_COLORS.p }} />P (atrier)</span>
                                <span><i className="ehm-key-axis-dot" style={{ background: PHASE_COLORS.pr }} />PR (AV-pause)</span>
                                <span><i className="ehm-key-axis-dot" style={{ background: PHASE_COLORS.qrs }} />QRS (ventrikler)</span>
                                <span><i className="ehm-key-axis-dot" style={{ background: PHASE_COLORS.t }} />T (repol.)</span>
                                <span><i className="ehm-key-projection" />+ projektion</span>
                                <span><i className="ehm-key-neg-projection" />− projektion</span>
                            </>
                        ) : (
                            <>
                                <span><i className="ehm-key-vector" />Samlet elektrisk retning</span>
                                <span><i className="ehm-key-projection" />Positiv (+) projektion</span>
                                <span><i className="ehm-key-neg-projection" />Negativ (−) projektion</span>
                                <span><i className="ehm-key-spread" />Lokal bølgeudbredelse</span>
                            </>
                        )}
                    </div>
                    <div className="ehm-anatomy-note">
                        {details.plane === 'frontal'
                            ? 'HA / VA: højre / venstre atrium · HV / VV: højre / venstre ventrikel · SA: sinusknude · AV: AV-knude'
                            : 'HV / VV: højre / venstre ventrikel. Atrier og AV-knude ligger uden for dette tværsnit.'}
                    </div>
                </section>

                <aside className="ehm-side">
                    <section className="ehm-monitor" aria-label="Live EKG">
                        <div className="ehm-card-top">
                            <span className="ehm-step-label">02 / DET AFLEDNINGEN MÅLER</span>
                            <span className={`ehm-live ${playing ? 'is-playing' : ''}`}><i />{playing ? 'LIVE' : 'PAUSE'}</span>
                        </div>
                        <div className="ehm-monitor-title">
                            <div>
                                <h3>Afledning {lead}</h3>
                                <span>
                                    {details.region} · {details.plane === 'frontal' ? `${details.angle > 0 ? '+' : ''}${details.angle}°` : 'brystafledning'}
                                </span>
                            </div>
                            <div className="ehm-voltage" data-testid="live-voltage">
                                {voltage >= 0 ? '+' : '−'}{Math.abs(voltage).toFixed(2)} <small>mV</small>
                            </div>
                        </div>
                        <Trace lead={lead} time={time} axisOffsetDeg={axisOffsetDeg} onJump={jump} />
                        <div className="ehm-monitor-footer">
                            <span>Klik på kurven for at hoppe i hjerteslaget</span>
                            <span>{instantAngle !== null ? `Vektorvinkel nu: ${formatDeg(instantAngle)}` : 'Ét slag · 800 ms'}</span>
                        </div>
                    </section>

                    <section className="ehm-explanation" aria-label="Forklaring af aktuelt udsving">
                        <span className="ehm-step-label">03 / DERFOR SER KURVEN SÅDAN UD</span>
                        <div className="ehm-phase-name"><span style={{ background: phase.color }}>{phase.short}</span><h3>{phase.name}</h3></div>
                        <p>{phase.description}</p>
                        <div className="ehm-polarity">
                            <span className="ehm-polarity-symbol" style={{ color: flat ? '#64796c' : voltage > 0 ? '#2f7a62' : '#c0444f' }}>
                                {flat ? '→' : voltage > 0 ? '↗' : '↘'}
                            </span>
                            <div>
                                <strong>{polarity} i {lead}</strong>
                                <p>
                                    {magnitude < 0.015
                                        ? 'Der er næsten ingen samlet elektrisk vektor i dette øjeblik.'
                                        : flat
                                            ? projectionRatio < 0.2
                                                ? 'Vektoren ligger næsten vinkelret (90°) på afledningens akse. Derfor krydser kurven grundlinjen.'
                                                : 'Den elektriske vektor er svag i dette øjeblik, så udsvinget bliver lille.'
                                            : `Den samlede elektriske vektor peger ${voltage > 0 ? 'mod' : 'væk fra'} afledningens pluspol. Derfor ligger kurven ${voltage > 0 ? 'over' : 'under'} grundlinjen.`}
                                </p>
                            </div>
                        </div>
                        {phase.id === 't' && <p className="ehm-small-note">Pilen viser den elektriske vektor. Under repolarisation peger den modsat udbredelsesretningen.</p>}
                        <div className="ehm-poles"><span><b>+</b> {details.positive}</span><span><b>−</b> {details.reference}</span></div>
                    </section>
                </aside>
            </div>

            <section className="ehm-timeline" aria-label="Afspilning og faser">
                <div className="ehm-transport">
                    <div className="ehm-play-controls">
                        <button type="button" className="ehm-play" onClick={togglePlay}>
                            {playing ? <Pause size={17} /> : <Play size={17} />}{playing ? 'Pause' : 'Afspil'}
                        </button>
                        <button type="button" className="ehm-icon-button" aria-label="Forrige fase" onClick={() => step(-1)}><ChevronLeft size={19} /></button>
                        <button type="button" className="ehm-icon-button" aria-label="Næste fase" onClick={() => step(1)}><ChevronRight size={19} /></button>
                        <button type="button" className="ehm-icon-button" aria-label="Nulstil hjerteslaget" onClick={() => jump(0)}><RotateCcw size={16} /></button>
                    </div>
                    <div className="ehm-scrub">
                        <label htmlFor={`${prefix}-time`}>
                            Træk gennem hjerteslaget <span data-testid="cycle-time">{Math.round(time)} / 800 ms</span>
                        </label>
                        <input id={`${prefix}-time`} aria-label="Tid i hjerteslaget" type="range" min="0" max="799" step="1" value={Math.round(time)} onChange={event => jump(Number(event.target.value))} />
                    </div>
                    <label className="ehm-speed">
                        Tempo
                        <select aria-label="Afspilningstempo" value={speed} onChange={event => setSpeed(event.target.value)}>
                            <option value="study">Læring · QRS på 11 sek.</option>
                            <option value="0.1">0,1× · langsomt</option>
                            <option value="0.5">0,5× · langsomt</option>
                            <option value="1">1× · realtid</option>
                        </select>
                    </label>
                </div>

                <div className="ehm-phase-buttons">
                    {PHASES.map((item, index) => (
                        <button type="button" key={item.id} aria-pressed={phase.id === item.id} onClick={() => jump(item.time)} style={{ '--phase-color': item.color }}>
                            <span>{String(index + 1).padStart(2, '0')}</span><strong>{item.short}</strong><i />
                        </button>
                    ))}
                </div>
                <div className="ehm-playback-note">
                    <label>
                        <input type="checkbox" checked={qrsOnly} onChange={event => { setQrsOnly(event.target.checked); if (event.target.checked && (time < 210 || time >= 300)) jump(220); }} /> Gentag kun QRS
                    </label>
                    <span>{speed === 'study' ? 'Læring: QRS er strakt fra 90 ms til 11 sek. Kurvens tidsakse viser stadig hjertets tid.' : 'Ensartet tempo gennem hele hjerteslaget.'}</span>
                </div>
                <p className="ehm-timeline-hint"><Zap size={13} /> Vælg en fase eller klik direkte på EKG-kurven for at fryse tiden og sammenligne afledninger.</p>
            </section>

            <section className="ehm-comparison">
                <div className="ehm-comparison-heading">
                    <div>
                        <h3>Samme impuls. Forskellige udsving.</h3>
                        <p>Alle kurver viser det samme hjerteslag og bruger samme spændingsskala.</p>
                    </div>
                    <button type="button" className="ehm-text-button" aria-expanded={showAll} onClick={() => setShowAll(previous => !previous)}>
                        {showAll ? 'Vis kun det valgte plan' : 'Vis alle 12 afledninger'} <ArrowRight size={15} />
                    </button>
                </div>
                <div className="ehm-lead-grid">
                    {visibleLeads.map(name => (
                        <button
                            type="button"
                            key={name}
                            className="ehm-lead-preview"
                            aria-label={`Sammenlign afledning ${name}`}
                            aria-pressed={name === lead}
                            onClick={() => selectLead(name)}
                        >
                            <span className="ehm-preview-label">
                                <strong>{name}</strong>
                                <span>{MODEL_LEADS[name].region}</span>
                            </span>
                            <Trace compact lead={name} time={time} axisOffsetDeg={MODEL_LEADS[name].plane === 'frontal' ? axisOffsetDeg : 0} />
                        </button>
                    ))}
                </div>
            </section>

            <ElectrodePlacement lead={lead} />

            <div className="ehm-mobile-monitor" role="region" aria-label="EKG mens du ser på hjertet">
                <div>
                    <strong>Afledning {lead}</strong>
                    <span>{phase.short} · {voltage >= 0 ? '+' : '−'}{Math.abs(voltage).toFixed(2)} mV</span>
                    <button type="button" aria-label={playing ? 'Sæt EKG på pause' : 'Start EKG'} onClick={togglePlay}>
                        {playing ? <Pause size={15} /> : <Play size={15} />}
                    </button>
                </div>
                <Trace compact lead={lead} time={time} axisOffsetDeg={axisOffsetDeg} />
            </div>

            <details className="ehm-method">
                <summary>Sådan skal modellen forstås · fagligt grundlag og billedkreditering</summary>
                <p>Undervisningsmodel af sinusrytme med justerbar frontal elektrisk akse (Cabrera-cirklen). Hjertets ledningsbaner, dipolvektoren, projektionen og alle 12 afledningskurver følger samme fysiologiske tidslinje med 1-til-1 farvekodning mellem hjerte og EKG-bølge.</p>
                <p>Anatomisk hjerte- og ledningsillustration baseret på <em>ConductionsystemoftheheartwithoutHeart</em> (Madhero88 / Wikimedia Commons, CC BY-SA 3.0), bearbejdet til lyst hvileformat med levende impulslag. Fagligt grundlag: <a href="https://cvphysiology.com/arrhythmias/a014" target="_blank" rel="noreferrer">Klabunde: elektriske vektorer og EKG-regler</a> · <a href="https://cvphysiology.com/arrhythmias/a016" target="_blank" rel="noreferrer">Ventrikelaktivering</a> · <a href="https://cvphysiology.com/arrhythmias/a013c" target="_blank" rel="noreferrer">Brystafledninger</a>.</p>
            </details>
        </div>
    );
}
