import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, Layers, Info, Compass, Sparkles, ChevronRight, User, HelpCircle } from '../Icons';
import { LEAD_DETAILS, EKG_CASES, generateLeadWaveform } from '../../data/ekgCases';
import cabreraHeartImg from '../../assets/cabrera_heart_reference.png';

/**
 * Cabrera Hexaksial Hjertemodel & Vektorer (Ninja Nerd ECG Basics standard)
 * 
 * Fokus: Normal Sinusrytme og grundlæggende elektrofysiologi.
 * Pædagogisk opbygning:
 * 1. Autentisk Cabrera-illustrationsunderlag fra The Physiological Society (center justeret til dx=0, dy=0).
 * 2. Ninja Nerds 3 Gyldne Vektorregler:
 *    - Mod (+) elektrode -> Positivt udslag (opad)
 *    - Væk fra (+) elektrode -> Negativt udslag (nedad)
 *    - Vinkelret (90°) -> Bifasisk / isoelektrisk
 * 3. Hver fase i sinusrytmen (P, PR, Q, R, S, ST, T, Diastole) er 100% synkroniseret med EKG-strimlen.
 * 4. Kropsmodel: Einthovens trekant (+/- poler) og prækordiale brystafledninger (V1–V6).
 */
export default function EkgHeartModel({ selectedLead = 'II', onSelectLead }) {
    // Tager altid udgangspunkt i normal fysiologisk sinusrytme
    const normalCase = EKG_CASES[0];

    const [viewMode, setViewMode] = useState(() => {
        return LEAD_DETAILS[selectedLead]?.plane || 'frontal';
    });

    // Pauseret ved start for fuldstændig ro og overblik
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(0.1); // Roligt undervisningstempo (~8 sekunder per cyklus)
    const [cycleTime, setCycleTime] = useState(245); // Starter stabilt på toppen af R-takken (245 ms)
    const [showVector, setShowVector] = useState(true);
    const [showAxisSectors, setShowAxisSectors] = useState(false);
    const [bodyView, setBodyView] = useState('limb'); // 'limb' (Einthoven) eller 'chest' (V1-V6)
    const [showNinjaRules, setShowNinjaRules] = useState(true);

    const animationRef = useRef(null);
    const lastTimestampRef = useRef(null);
    const isScrubbingRef = useRef(false);

    // Fysiologiske faser i normal sinusrytme (800 ms cyklus = 75 bpm)
    // Nøje kalibreret til toppunkterne i bølgeformen:
    const PHASES = [
        { name: '1. Atriedepolarisering (P-tak)', time: 130, label: 'P-tak' },
        { name: '2. AV-knudeforsinkelse (PR-segment)', time: 195, label: 'PR-segment' },
        { name: '3. Septal depolarisering (Q-tak)', time: 220, label: 'Q-tak' },
        { name: '4. Hovedventrikeldepolarisering (R-tak)', time: 245, label: 'R-tak' },
        { name: '5. Basal ventrikelaktivering (S-tak)', time: 280, label: 'S-tak' },
        { name: '6. ST-segment (Plateaufase)', time: 330, label: 'ST-segment' },
        { name: '7. Ventrikelrepolarisation (T-tak)', time: 460, label: 'T-tak' },
        { name: '8. Diastole (Elektrisk hvile)', time: 650, label: 'Diastole' }
    ];

    const handleStepPhase = (direction) => {
        setIsPlaying(false);
        const currentIdx = PHASES.findIndex((p, i) => {
            const nextTime = PHASES[i + 1]?.time || 800;
            return cycleTime >= p.time - 25 && cycleTime < nextTime - 25;
        });

        let targetIdx = direction === 'next' ? (currentIdx + 1) : (currentIdx - 1);
        if (targetIdx >= PHASES.length) targetIdx = 0;
        if (targetIdx < 0) targetIdx = PHASES.length - 1;

        setCycleTime(PHASES[targetIdx].time);
    };

    // Hjertecyklus animations-loop
    useEffect(() => {
        if (!isPlaying) {
            lastTimestampRef.current = null;
            return;
        }

        const animate = (timestamp) => {
            if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
            const delta = timestamp - lastTimestampRef.current;
            lastTimestampRef.current = timestamp;

            if (!isScrubbingRef.current) {
                setCycleTime(prev => {
                    const next = prev + delta * playbackSpeed;
                    return next >= 800 ? next % 800 : next;
                });
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isPlaying, playbackSpeed]);

    const handleSelectLead = (lead) => {
        const details = LEAD_DETAILS[lead];
        if (details?.plane) {
            setViewMode(details.plane);
            if (details.plane === 'horizontal') setBodyView('chest');
            else setBodyView('limb');
        }
        if (onSelectLead) onSelectLead(lead);
    };

    // Ninja Nerd elektrofysiologisk beregning af vektor i sinusrytme
    const getCardiacPhase = (t) => {
        if (t >= 80 && t < 180) {
            const prog = (t - 80) / 100;
            return {
                name: 'Atriedepolarisering',
                wave: 'P-tak',
                ruleText: 'Depolarisation bevæger sig nedad mod venstre (+50°). Peger mod Lead II -> Positiv P-tak. Peger væk fra aVR -> Inverteret P-tak.',
                desc: 'Sinusknuden (SA-knuden) i højre atrie affyrer en impuls. Depolarisationsbølgen breder sig gennem begge atrier mod AV-knuden.',
                vector: { angle: 50, magnitude: Math.sin(prog * Math.PI) * 0.45, color: '#3B82F6' },
                horizontalVector: { angle: 60, magnitude: Math.sin(prog * Math.PI) * 0.4, color: '#3B82F6' }
            };
        } else if (t >= 180 && t < 210) {
            return {
                name: 'AV-knudeforsinkelse',
                wave: 'PR-segment',
                ruleText: 'Ingen overfladespænding under forsinkelsen i AV-knuden -> Flad isoelektrisk linje.',
                desc: 'Impulsen forsinkes i AV-knuden (120-200 ms). Denne fysiologiske pause sikrer, at atrierne når at tømme blodet ned i ventriklerne inden ventrikelsystolen.',
                vector: { angle: 0, magnitude: 0.05, color: '#94A3B8' },
                horizontalVector: { angle: 0, magnitude: 0.05, color: '#94A3B8' }
            };
        } else if (t >= 210 && t < 230) {
            const prog = (t - 210) / 20;
            return {
                name: 'Septal depolarisering',
                wave: 'Q-tak',
                ruleText: 'Depolarisation bevæger sig fra venstre mod højre (-125°). Peger VÆK fra Lead II og V5/V6 -> Lille negativt Q-udslag!',
                desc: 'His-bundtet forgrener sig. Venstre grenbundt aktiverer det interventrikulære septum fra venstre mod højre.',
                vector: { angle: -125, magnitude: Math.sin(prog * Math.PI) * 0.35, color: '#F59E0B' },
                horizontalVector: { angle: 120, magnitude: Math.sin(prog * Math.PI) * 0.35, color: '#F59E0B' }
            };
        } else if (t >= 230 && t < 265) {
            const prog = (t - 230) / 35;
            return {
                name: 'Hovedventrikeldepolarisering',
                wave: 'R-tak',
                ruleText: 'Massiv depolarisation af venstre ventrikel mod apeks (+60°). Peger DIREKTE mod Lead II -> Kæmpe positiv R-tak! Peger væk fra aVR -> Dyb negativ tak.',
                desc: 'Hovedparten af ventriklerne depolariseres hurtigt via Purkinje-fibrene fra endokardium til epikardium. Da venstre ventrikel er 3x tykkere end højre, dominerer dens vektor mod apeks (+60°).',
                vector: { angle: 60, magnitude: Math.sin(prog * Math.PI) * 1.05, color: '#DC2626' },
                horizontalVector: { angle: 45, magnitude: Math.sin(prog * Math.PI) * 1.05, color: '#DC2626' }
            };
        } else if (t >= 265 && t < 300) {
            const prog = (t - 265) / 35;
            return {
                name: 'Basal ventrikelaktivering',
                wave: 'S-tak',
                ruleText: 'Depolarisation af hjertebasis peger opad mod basale vægge (-140°). Bevæger sig væk fra Lead II -> Negativ S-tak.',
                desc: 'De allersidste basale dele af venstre og højre ventrikel mod hjertets overside depolariseres.',
                vector: { angle: -140, magnitude: Math.sin(prog * Math.PI) * 0.4, color: '#8B5CF6' },
                horizontalVector: { angle: 160, magnitude: Math.sin(prog * Math.PI) * 0.4, color: '#8B5CF6' }
            };
        } else if (t >= 300 && t < 380) {
            return {
                name: 'ST-segment (Plateaufase)',
                wave: 'ST-segment',
                ruleText: 'Alle ventrikelceller er ens depolariserede (refraktærfase 2) -> Ingen spændingsforskel -> Flad isoelektrisk linje.',
                desc: 'Ventrikelmyocytterne er i refraktær plateaufase (fase 2 i aktionspotentialet, Ca2+-indstrømning). Hjertemusklen kontraherer mekanisk.',
                vector: { angle: 0, magnitude: 0.05, color: '#94A3B8' },
                horizontalVector: { angle: 0, magnitude: 0.05, color: '#94A3B8' }
            };
        } else if (t >= 380 && t < 540) {
            const prog = (t - 380) / 160;
            return {
                name: 'Ventrikelrepolarisation',
                wave: 'T-tak',
                ruleText: 'Repolarisation sker udefra og ind (epikardium -> endokardium). Negative ladninger bevæger sig væk fra elektroden -> POSITIV T-tak i Lead II!',
                desc: 'Ventriklerne repolariseres (fase 3, K+-udstrømning). Epikardiet slapper af først pga. højere tryk i endokardiet. Derfor vender T-takken normalt i samme retning som R-takken.',
                vector: { angle: 55, magnitude: Math.sin(prog * Math.PI) * 0.55, color: '#10B981' },
                horizontalVector: { angle: -30, magnitude: Math.sin(prog * Math.PI) * 0.55, color: '#10B981' }
            };
        } else {
            return {
                name: 'Elektrisk hvilefase (Diastole)',
                wave: 'Diastole',
                ruleText: 'Myokardiet hviler (fase 4 hvilemembranpotentiale). Kamrene fyldes passivt med blod.',
                desc: 'Kammermyocytterne er i hvile. Kamrene fyldes passivt med blod inden næste sinusimpuls.',
                vector: { angle: 0, magnitude: 0, color: '#94A3B8' },
                horizontalVector: { angle: 0, magnitude: 0, color: '#94A3B8' }
            };
        }
    };

    const currentPhase = getCardiacPhase(cycleTime);

    // Beregn spændingsprojektion på den valgte aflednings akse
    const leadInfo = LEAD_DETAILS[selectedLead] || LEAD_DETAILS['II'];
    const isHorizontalLead = leadInfo.plane === 'horizontal';
    const activeVector = (isHorizontalLead && currentPhase.horizontalVector)
        ? currentPhase.horizontalVector
        : currentPhase.vector;

    const leadAngleRad = (leadInfo.angle * Math.PI) / 180;
    const vectorAngleRad = (activeVector.angle * Math.PI) / 180;
    const projectedVoltage = activeVector.magnitude * Math.cos(vectorAngleRad - leadAngleRad);

    const handleScrub = (e) => {
        setIsPlaying(false);
        setCycleTime(parseFloat(e.target.value));
    };

    // Geometrisk definition af de 6 ekstremitetsafledninger i Cabrera-cirklen (R = 175)
    const CABRERA_LEADS = [
        { name: 'I', angle: 0, tipX: 175, tipY: 0, labelX: 195, labelY: 0 },
        { name: 'II', angle: 60, tipX: 87.5, tipY: 151.5, labelX: 87.5, labelY: 185 },
        { name: 'aVF', angle: 90, tipX: 0, tipY: 175, labelX: 0, labelY: 205 },
        { name: 'III', angle: 120, tipX: -87.5, tipY: 151.5, labelX: -87.5, labelY: 185 },
        { name: 'aVR', angle: -150, tipX: -151.5, tipY: -87.5, labelX: -175, labelY: -95 },
        { name: 'aVL', angle: -30, tipX: 151.5, tipY: -87.5, labelX: 175, labelY: -95 }
    ];

    const ALL_LEADS = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

    // Autentisk fysiologisk EKG-kurve til millimeterpapiret (800 ms cyklus i normal sinusrytme)
    const STRIP_WIDTH = 400;
    const STRIP_HEIGHT = 150;
    const BASE_Y = 85; // Grundlinje på EKG-strimlen
    const PX_PER_MM = 5;

    const waveformData = React.useMemo(() => {
        const leadParams = (normalCase.leads && normalCase.leads[selectedLead]) || { p: 0.12, pr: 160, q: -0.05, r: 1.0, s: -0.15, st: 0, t: 0.35 };

        const points = [];
        const pAmp = leadParams.p !== undefined ? leadParams.p : 0.12;
        const qAmp = leadParams.q !== undefined ? leadParams.q : -0.05;
        const rAmp = leadParams.r !== undefined ? leadParams.r : 1.0;
        const sAmp = leadParams.s !== undefined ? leadParams.s : -0.15;
        const tAmp = leadParams.t !== undefined ? leadParams.t : 0.35;

        for (let ms = 0; ms <= 800; ms += 2) {
            let v = 0;

            // 1. P-tak (80 ms til 180 ms, peak ved 130 ms)
            if (ms >= 80 && ms <= 180 && pAmp !== 0) {
                const prog = (ms - 80) / 100;
                v += Math.sin(prog * Math.PI) * pAmp;
            }

            // 2. QRS-kompleks (210 ms til 300 ms, peak ved 245 ms)
            if (ms >= 210 && ms <= 300) {
                const qrsProg = (ms - 210) / 90;
                if (qrsProg < 0.18) {
                    v += Math.sin((qrsProg / 0.18) * Math.PI) * qAmp;
                } else if (qrsProg < 0.60) {
                    v += Math.sin(((qrsProg - 0.18) / 0.42) * Math.PI) * rAmp;
                } else {
                    v += Math.sin(((qrsProg - 0.60) / 0.40) * Math.PI) * sAmp;
                }
            }

            // 3. T-tak (380 ms til 540 ms, peak ved 460 ms)
            if (ms > 380 && ms <= 540) {
                const prog = (ms - 380) / 160;
                v += Math.sin(prog * Math.PI) * tAmp;
            }

            const pxX = (ms / 800) * STRIP_WIDTH;
            const pxY = BASE_Y - (v * 10 * PX_PER_MM);
            points.push({ x: pxX, y: pxY });
        }

        let path = '';
        points.forEach((p, i) => {
            if (i === 0) path += `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
            else path += ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
        });
        return path;
    }, [selectedLead]);

    // Beregn X-position for den synkroniserede sweep-linje (0 til 800 ms -> 0 til STRIP_WIDTH)
    const sweepCursorX = (cycleTime / 800) * STRIP_WIDTH;

    // Kropsplacering defineret for Einthovens Trekant (RA, LA, LL, RL)
    const EINTHOVEN_COORDS = {
        RA: { x: 68, y: 110, name: 'RA (Højre arm)', color: '#EF4444' },
        LA: { x: 212, y: 110, name: 'LA (Venstre arm)', color: '#EAB308' },
        LL: { x: 156, y: 260, name: 'LL (Venstre ben)', color: '#16A34A' },
        RL: { x: 124, y: 260, name: 'RL (Jord)', color: '#1E293B' }
    };

    // Brystafledninger på thorax
    const CHEST_COORDS = [
        { name: 'V1', x: 130, y: 116, color: '#EF4444', wall: 'Septal / Højre ventrikel', ic: '4. interkostalrum højre sternalrand' },
        { name: 'V2', x: 150, y: 116, color: '#EAB308', wall: 'Septal', ic: '4. interkostalrum venstre sternalrand' },
        { name: 'V3', x: 160, y: 128, color: '#16A34A', wall: 'Anterior (Forvæg)', ic: 'Mellem V2 og V4' },
        { name: 'V4', x: 172, y: 140, color: '#92400E', wall: 'Anterior / Apeks', ic: '5. interkostalrum venstre medioklavikulærlinje' },
        { name: 'V5', x: 188, y: 145, color: '#0F172A', wall: 'Lateral', ic: 'Forreste aksillærlinje i niveau med V4' },
        { name: 'V6', x: 202, y: 150, color: '#7C3AED', wall: 'Lateral', ic: 'Midterste aksillærlinje i niveau med V4' }
    ];

    return (
        <div className="flex flex-col gap-6 w-full max-w-[1440px] mx-auto">
            {/* NINJA NERD PÆDAGOGISK INTRO BAR (DE 3 GYLDNE REGLER FOR VEKTORER) */}
            {showNinjaRules && (
                <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-gradient-to-r from-white via-[#F9F8F6] to-white shadow-sm flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8E4D9]">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-[#839788] p-2 rounded-xl text-white shadow-xs">
                                <Sparkles className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#3A4A40]">Ninja Nerds 3 Gyldne Regler for EKG-Vektorer</h3>
                                <p className="text-xs text-[#839788]">Hvordan hjertets elektriske strøm oversættes til takker på papiret (Normal Sinusrytme)</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowNinjaRules(false)}
                            className="text-xs text-[#839788] hover:text-[#3A4A40] font-semibold"
                        >
                            Skjul guide ✕
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                            <span className="text-xl">⬆️</span>
                            <div>
                                <strong className="text-xs font-bold text-emerald-900 block">1. Bølge MOD (+) elektrode</strong>
                                <p className="text-[11px] text-emerald-800 leading-relaxed">
                                    Når en bølge af depolarisation bevæger sig <strong>direkte mod</strong> en positiv elektrode, giver det et <strong>POSITIVT udslag (opad)</strong> på EKG'et.
                                </p>
                            </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5">
                            <span className="text-xl">⬇️</span>
                            <div>
                                <strong className="text-xs font-bold text-rose-900 block">2. Bølge VÆK FRA (+) elektrode</strong>
                                <p className="text-[11px] text-rose-800 leading-relaxed">
                                    Når depolarisationsbølgen bevæger sig <strong>væk fra</strong> den positive elektrode (f.eks. mod aVR), giver det et <strong>NEGATIVT udslag (nedad)</strong>.
                                </p>
                            </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                            <span className="text-xl">↔️</span>
                            <div>
                                <strong className="text-xs font-bold text-amber-900 block">3. Bølge VINKELRET (90°)</strong>
                                <p className="text-[11px] text-amber-800 leading-relaxed">
                                    Når bølgen bevæger sig <strong>vinkelret</strong> på afledningen, opfanger elektroden ingen netto-strøm &rarr; <strong>bifasisk eller isoelektrisk nul-linje</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* HOVEDSEKTION: 2-KOLONNE LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-6 w-full">
                {/* VENSTRE SØJLE: CABRERA HJERTEMODEL (THE PHYSIOLOGICAL SOCIETY UNDERLAG) */}
                <div className="flex-1 glass-panel rounded-3xl p-5 md:p-6 border border-[#E8E4D9] flex flex-col shadow-sm bg-white/95">
                    {/* Topbar: Visningsvalg & Visningsplan */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E4D9]">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-[#839788] p-2.5 rounded-xl text-white shadow-xs">
                                <Activity className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#3A4A40] leading-tight">Cabrera Hexaksial Hjertemodel</h2>
                                <p className="text-xs text-[#839788]">The Physiological Society standard • Interaktiv vektorprojektion (Sinusrytme)</p>
                            </div>
                        </div>

                        {/* Faneblade for Visningsplan */}
                        <div className="flex bg-[#F2F6F3] p-1 rounded-2xl border border-[#E8E4D9] text-xs font-semibold">
                            <button
                                onClick={() => { setViewMode('frontal'); setBodyView('limb'); }}
                                className={`px-3.5 py-1.5 rounded-xl transition-all ${viewMode === 'frontal' ? 'bg-white text-[#3A4A40] shadow-sm font-bold' : 'text-[#839788] hover:text-[#3A4A40]'}`}
                            >
                                Frontalplan (Cabrera)
                            </button>
                            <button
                                onClick={() => { setViewMode('horizontal'); setBodyView('chest'); }}
                                className={`px-3.5 py-1.5 rounded-xl transition-all ${viewMode === 'horizontal' ? 'bg-white text-[#3A4A40] shadow-sm font-bold' : 'text-[#839788] hover:text-[#3A4A40]'}`}
                            >
                                Horisontalplan (V1–V6)
                            </button>
                        </div>
                    </div>

                    {/* DET CENTRALE MODELOMRÅDE */}
                    <div className="relative w-full h-[460px] sm:h-[530px] my-3 flex items-center justify-center bg-white rounded-3xl overflow-hidden border-2 border-[#E2E8F0] shadow-inner">
                        {viewMode === 'frontal' ? (
                            <svg viewBox="-260 -260 520 520" className="w-full h-full max-h-[530px] select-none">
                                <defs>
                                    <marker id="liveVectorArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={currentPhase.vector.color} />
                                    </marker>
                                    <filter id="vectorGlow" x="-30%" y="-30%" width="160%" height="160%">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>

                                {/* 1. AKSEKVADRANTER (BAGGRUND, HVIS AKTIVERET) */}
                                {showAxisSectors && (
                                    <g id="axisSectors" opacity="0.35">
                                        <path d="M 0 0 L 151.5 -87.5 A 175 175 0 0 1 0 175 Z" fill="#FCE7F3" stroke="#F43F5E" strokeWidth="0.8" />
                                        <path d="M 0 0 L 151.5 -87.5 A 175 175 0 0 0 0 -175 Z" fill="#DCFCE7" stroke="#22C55E" strokeWidth="0.8" />
                                        <path d="M 0 0 L 0 175 A 175 175 0 0 1 -175 0 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="0.8" />
                                        <path d="M 0 0 L -175 0 A 175 175 0 0 1 0 -175 Z" fill="#FEF9C3" stroke="#EAB308" strokeWidth="0.8" />
                                    </g>
                                )}

                                {/* 2. DET AUTENTISKE ILLUSTRATIONS-UNDERLAG FRA THE PHYSIOLOGICAL SOCIETY */}
                                <image
                                    href={cabreraHeartImg}
                                    x="-260"
                                    y="-260"
                                    width="520"
                                    height="520"
                                    preserveAspectRatio="xMidYMid meet"
                                />

                                {/* 3. INTERAKTIVE KLIK-OMRÅDER & FREMHÆVNING AF DEN VALGTE AFLEDNING */}
                                {CABRERA_LEADS.map(lead => {
                                    const isSel = selectedLead === lead.name;
                                    return (
                                        <g
                                            key={lead.name}
                                            className="cursor-pointer"
                                            onClick={() => handleSelectLead(lead.name)}
                                        >
                                            {/* Hvis valgt: fremhæv pilen med en lysende rød linje og pulserende ring på pilespidsen */}
                                            {isSel && (
                                                <>
                                                    <line
                                                        x1="0"
                                                        y1="0"
                                                        x2={lead.tipX}
                                                        y2={lead.tipY}
                                                        stroke="#DC2626"
                                                        strokeWidth="4"
                                                        opacity="0.85"
                                                    />
                                                    <circle
                                                        cx={lead.tipX}
                                                        cy={lead.tipY}
                                                        r="16"
                                                        fill="#DC2626"
                                                        fillOpacity="0.12"
                                                        stroke="#DC2626"
                                                        strokeWidth="2.5"
                                                        className="animate-pulse"
                                                    />
                                                </>
                                            )}

                                            {/* Usynlig bred klik-target */}
                                            <line x1="0" y1="0" x2={lead.tipX} y2={lead.tipY} stroke="transparent" strokeWidth="25" />
                                            <circle cx={lead.labelX} cy={lead.labelY} r="24" fill="transparent" />
                                        </g>
                                    );
                                })}

                                {/* 4. DYNAMISK REALTIDS ELEKTRISK VEKTOR-PIL (DIPOL) MED PROJEKTION */}
                                {showVector && currentPhase.vector.magnitude > 0.05 && (() => {
                                    const rad = (currentPhase.vector.angle * Math.PI) / 180;
                                    const len = currentPhase.vector.magnitude * 135;
                                    const vx = Math.cos(rad) * len;
                                    const vy = Math.sin(rad) * len;

                                    const selLeadAngleRad = (leadInfo.angle * Math.PI) / 180;
                                    const projLen = len * Math.cos(rad - selLeadAngleRad);
                                    const px = Math.cos(selLeadAngleRad) * projLen;
                                    const py = Math.sin(selLeadAngleRad) * projLen;

                                    return (
                                        <g id="liveVectorGroup">
                                            {/* Stiplet projektionslinje ned på den valgte aflednings akse */}
                                            <line
                                                x1={vx}
                                                y1={vy}
                                                x2={px}
                                                y2={py}
                                                stroke="#DC2626"
                                                strokeWidth="1.8"
                                                strokeDasharray="3 3"
                                            />
                                            <circle cx={px} cy={py} r="4.5" fill="#DC2626" />

                                            {/* Den elektriske dipolvektor */}
                                            <line
                                                x1="0"
                                                y1="0"
                                                x2={vx}
                                                y2={vy}
                                                stroke={currentPhase.vector.color}
                                                strokeWidth={Math.max(3.5, currentPhase.vector.magnitude * 6)}
                                                strokeLinecap="round"
                                                filter="url(#vectorGlow)"
                                                markerEnd="url(#liveVectorArrow)"
                                            />
                                        </g>
                                    );
                                })()}
                            </svg>
                        ) : (
                            /* HORISONTALPLAN SVG: ANATOMISK TVÆRSNIT AF BRYSTKASSEN MED V1–V6 */
                            <svg viewBox="-240 -240 480 480" className="w-full h-full max-h-[530px] select-none">
                                <defs>
                                    <radialGradient id="lungGrad2" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#E0F2FE" />
                                        <stop offset="80%" stopColor="#BAE6FD" />
                                        <stop offset="100%" stopColor="#7DD3FC" />
                                    </radialGradient>
                                </defs>

                                <path
                                    d="M 0 -180 C 130 -180, 195 -90, 195 30 C 195 140, 110 195, 0 195 C -110 195, -195 140, -195 30 C -195 -90, -130 -180, 0 -180 Z"
                                    fill="#F8FAFC"
                                    stroke="#94A3B8"
                                    strokeWidth="2.5"
                                />

                                <path d="M -30 -140 C -95 -140, -170 -70, -165 25 C -160 110, -100 145, -50 135 C -75 80, -80 0, -30 -55 Z" fill="url(#lungGrad2)" stroke="#94A3B8" strokeWidth="1.5" opacity="0.65" />
                                <path d="M 30 -140 C 95 -140, 170 -70, 165 25 C 160 110, 115 140, 80 135 C 100 85, 95 25, 65 -5 C 50 -25, 35 -55, 30 -140 Z" fill="url(#lungGrad2)" stroke="#94A3B8" strokeWidth="1.5" opacity="0.65" />

                                <ellipse cx="0" cy="-155" rx="26" ry="18" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
                                <circle cx="0" cy="-155" r="7" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
                                <text x="0" y="-130" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#64748B">Columna (T8)</text>

                                <g transform="translate(15, 20)">
                                    <path d="M -45 5 C -25 50, 15 65, 55 45 C 30 35, 10 20, -5 -5 Z" fill="#2563EB" opacity="0.75" stroke="#1E3A8A" strokeWidth="2" />
                                    <circle cx="20" cy="5" r="35" fill="#E11D48" opacity="0.8" stroke="#881337" strokeWidth="2.5" />
                                    <circle cx="20" cy="5" r="18" fill="#F43F5E" />
                                    <text x="20" y="8" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">LV</text>
                                    <text x="-15" y="32" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">RV</text>
                                </g>

                                {CHEST_COORDS.map((lead, idx) => {
                                    const isSel = selectedLead === lead.name;
                                    const angles = [110, 80, 60, 45, 20, 0];
                                    const rad = (angles[idx] * Math.PI) / 180;
                                    const lx = Math.cos(rad) * 190;
                                    const ly = Math.sin(rad) * 170;

                                    return (
                                        <g key={lead.name} className="cursor-pointer" onClick={() => handleSelectLead(lead.name)}>
                                            <line x1="15" y1="20" x2={lx} y2={ly} stroke={isSel ? '#DC2626' : '#94A3B8'} strokeWidth={isSel ? 3 : 1.5} strokeDasharray={isSel ? 'none' : '4 3'} />
                                            <circle cx={lx} cy={ly} r={isSel ? 16 : 13} fill={isSel ? '#DC2626' : '#FFFFFF'} stroke={isSel ? '#991B1B' : '#0F172A'} strokeWidth="2" />
                                            <text x={lx} y={ly + 4} textAnchor="middle" fontSize={isSel ? '12' : '10'} fontWeight="bold" fill={isSel ? '#FFFFFF' : '#0F172A'}>
                                                {lead.name}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        )}

                        {/* Fast, roligt status-badge i venstre hjørne */}
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E8E4D9] shadow-sm flex items-center gap-2.5">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentPhase.vector.color }}></div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-[#3A4A40]">{currentPhase.name}</span>
                                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-[#E2E8DF] text-[#3A4A40]">{currentPhase.wave}</span>
                                </div>
                                <span className="text-[10px] text-[#839788] font-mono">
                                    Vektor: {Math.round(activeVector.angle)}° • Styrke: {(activeVector.magnitude * 100).toFixed(0)}%
                                </span>
                            </div>
                        </div>

                        {/* Kontrolknap til Aksekvadranter */}
                        <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
                            <button
                                onClick={() => setShowAxisSectors(!showAxisSectors)}
                                className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all ${showAxisSectors ? 'bg-[#839788] text-white border-[#6A7A6E]' : 'bg-white/90 text-[#839788] border-[#E8E4D9]'}`}
                                title="Vis/skjul de 4 aksekvadranter (Normal / LAD / RAD / Ekstrem)"
                            >
                                Aksekvadranter
                            </button>
                        </div>
                    </div>

                    {/* TIDSLINJE-KONTROL & HASTIGHED (ROLIG UNDERVISNINGSHASTIGHED) */}
                    <div className="space-y-3 pt-1">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => handleStepPhase('prev')}
                                    className="px-3 py-2 rounded-xl bg-[#F2F6F3] text-xs font-bold text-[#3A4A40] hover:bg-[#E2E8DF] transition-colors border border-[#E8E4D9]"
                                    title="Gå til forrige fysiologiske fase"
                                >
                                    ⏮ Forrige
                                </button>
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className={`px-4 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-1.5 font-bold text-xs ${isPlaying ? 'bg-[#DC2626] text-white hover:bg-[#B91C1C]' : 'bg-[#839788] text-white hover:bg-[#6A7A6E]'}`}
                                    title={isPlaying ? 'Pause animation' : 'Start animation'}
                                >
                                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                                    {isPlaying ? 'Pause' : 'Afspil'}
                                </button>
                                <button
                                    onClick={() => handleStepPhase('next')}
                                    className="px-3 py-2 rounded-xl bg-[#F2F6F3] text-xs font-bold text-[#3A4A40] hover:bg-[#E2E8DF] transition-colors border border-[#E8E4D9]"
                                    title="Gå til næste fysiologiske fase"
                                >
                                    Næste ⏭
                                </button>
                                <button
                                    onClick={() => { setIsPlaying(false); setCycleTime(245); }}
                                    className="p-2 rounded-xl bg-[#F2F6F3] text-[#839788] hover:text-[#3A4A40] transition-colors border border-[#E8E4D9]"
                                    title="Nulstil til R-takken (245 ms)"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Tidsskyder */}
                            <div className="flex-1 min-w-[200px] flex flex-col">
                                <div className="flex justify-between text-xs text-[#839788] font-medium mb-1">
                                    <span>Tid: <strong className="text-[#3A4A40]">{Math.round(cycleTime)} ms</strong> / 800 ms</span>
                                    <span className="font-bold text-[#3A4A40]">{currentPhase.wave}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="800"
                                    step="2"
                                    value={cycleTime}
                                    onChange={handleScrub}
                                    onPointerDown={() => { isScrubbingRef.current = true; }}
                                    onPointerUp={() => { isScrubbingRef.current = false; }}
                                    onTouchStart={() => { isScrubbingRef.current = true; }}
                                    onTouchEnd={() => { isScrubbingRef.current = false; }}
                                    className="w-full h-2 bg-[#E2E8DF] rounded-lg appearance-none cursor-pointer accent-[#839788]"
                                />
                            </div>

                            {/* Hastighedsvælger */}
                            <div className="flex items-center gap-1">
                                <span className="text-[11px] font-bold text-[#839788] mr-1 hidden sm:inline">Tempo:</span>
                                <div className="flex gap-1 bg-[#F2F6F3] p-1 rounded-xl border border-[#E8E4D9] text-xs">
                                    {[
                                        { speed: 0.05, label: '0.05x' },
                                        { speed: 0.1, label: '0.1x (Rolig)' },
                                        { speed: 0.25, label: '0.25x' },
                                        { speed: 1.0, label: '1x' }
                                    ].map(s => (
                                        <button
                                            key={s.speed}
                                            onClick={() => setPlaybackSpeed(s.speed)}
                                            className={`px-2 py-1 rounded-lg font-semibold transition-all ${playbackSpeed === s.speed ? 'bg-white text-[#3A4A40] font-bold shadow-xs' : 'text-[#839788] hover:text-[#3A4A40]'}`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Hurtigvalg af faser */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {PHASES.map((phase) => {
                                const isCurrent = Math.abs(cycleTime - phase.time) < 30;
                                return (
                                    <button
                                        key={phase.name}
                                        onClick={() => { setIsPlaying(false); setCycleTime(phase.time); }}
                                        className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition-all border ${isCurrent
                                            ? 'bg-[#839788] text-white border-[#6A7A6E] shadow-xs scale-105'
                                            : 'bg-[#F2F6F3] text-[#839788] border-[#E8E4D9] hover:bg-[#E2E8DF] hover:text-[#3A4A40]'
                                            }`}
                                    >
                                        {phase.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* HØJRE SØJLE: SYNKRONISERET EKG-STRIMMEL, NINJA NERD FORKLARING & KROPSFIGUR */}
                <div className="w-full lg:w-[500px] flex flex-col gap-4">
                    {/* 1. AFLEDNINGSVÆLGER TABS */}
                    <div className="glass-panel rounded-3xl p-4 border border-[#E8E4D9] bg-white/95 shadow-sm">
                        <div className="flex items-center justify-between mb-2.5">
                            <span className="text-xs font-bold text-[#839788]">Vælg afledning for inspektion:</span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-[#E2E8DF] text-[#3A4A40]">
                                {leadInfo.plane === 'frontal' ? 'Frontalplan (Ekstremitet)' : 'Horisontalplan (Prækordial)'}
                            </span>
                        </div>

                        <div className="grid grid-cols-6 gap-1.5">
                            {ALL_LEADS.map(ld => {
                                const isSel = selectedLead === ld;
                                const isLimb = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF'].includes(ld);

                                return (
                                    <button
                                        key={ld}
                                        onClick={() => handleSelectLead(ld)}
                                        className={`py-1.5 rounded-xl text-xs font-bold transition-all border ${isSel
                                            ? 'bg-[#DC2626] text-white border-[#991B1B] shadow-sm scale-105'
                                            : isLimb
                                                ? 'bg-[#F8FAFC] text-[#1E293B] border-[#CBD5E1] hover:bg-[#E2E8F0]'
                                                : 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0] hover:bg-[#DCFCE7]'
                                            }`}
                                    >
                                        {ld}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. SYNKRONISERET EKG-STRIMMEL PÅ ÆGTE MILLIMETERPAPIR */}
                    <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/95 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E8E4D9]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-[#DC2626] text-white font-black text-lg flex items-center justify-center shadow-xs">
                                    {selectedLead}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-[#3A4A40]">Afledning {selectedLead} – Normal EKG Kurve</h3>
                                    <p className="text-xs text-[#839788]">{leadInfo.wall} • {leadInfo.angle}° • {leadInfo.territory}</p>
                                </div>
                            </div>

                            {/* Projektionsspænding */}
                            <div className="text-right">
                                <span className="text-[10px] uppercase font-bold text-[#839788] block">Projektion:</span>
                                <span className={`font-mono font-bold text-sm ${projectedVoltage > 0.05 ? 'text-emerald-600' : projectedVoltage < -0.05 ? 'text-rose-600' : 'text-[#64748B]'}`}>
                                    {projectedVoltage > 0.05 ? `+${(projectedVoltage * 100).toFixed(0)}% (Positiv)` : projectedVoltage < -0.05 ? `${(projectedVoltage * 100).toFixed(0)}% (Negativ)` : '0% (Bifasisk)'}
                                </span>
                            </div>
                        </div>

                        {/* DET SYNKRONISEREDE MILLIMETERPAPIR */}
                        <div className="relative w-full h-[155px] bg-[#FFF5F5] rounded-2xl border-2 border-[#FECDD3] overflow-hidden select-none shadow-inner flex items-center justify-center">
                            <svg viewBox={`0 0 ${STRIP_WIDTH} ${STRIP_HEIGHT}`} className="w-full h-full">
                                <defs>
                                    <pattern id="miniGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                                        <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#FDA4AF" strokeWidth="0.4" opacity="0.6" />
                                    </pattern>
                                    <pattern id="majorGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                                        <rect width="25" height="25" fill="url(#miniGrid)" />
                                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#F43F5E" strokeWidth="1.0" opacity="0.75" />
                                    </pattern>
                                </defs>

                                {/* Millimeter gitter (25 mm/s, 10 mm/mV) */}
                                <rect width={STRIP_WIDTH} height={STRIP_HEIGHT} fill="url(#majorGrid)" />

                                {/* Grundlinje (Isoelektrisk akse) */}
                                <line x1="0" y1={BASE_Y} x2={STRIP_WIDTH} y2={BASE_Y} stroke="#FDA4AF" strokeWidth="1" strokeDasharray="3 2" />

                                {/* 1.0 mV Kalibreringspuls ved venstre margin */}
                                <path d={`M 6 ${BASE_Y} L 12 ${BASE_Y} L 12 ${BASE_Y - 50} L 24 ${BASE_Y - 50} L 24 ${BASE_Y} L 30 ${BASE_Y}`} fill="none" stroke="#0F172A" strokeWidth="1.8" />
                                <text x="26" y={BASE_Y - 53} fontSize="8.5" fontWeight="bold" fill="#881337">1 mV</text>

                                {/* EKG BØLGEN FOR NETOP DENNE AFLEDNING (NATURTRO SORT TUSCHSTREG) */}
                                {waveformData && (
                                    <path
                                        d={waveformData}
                                        fill="none"
                                        stroke="#0F172A"
                                        strokeWidth="2.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                )}

                                {/* DEN SYNKRONISEREDE RØDE SWEEP-CURSOR */}
                                <line
                                    x1={sweepCursorX}
                                    y1="0"
                                    x2={sweepCursorX}
                                    y2={STRIP_HEIGHT}
                                    stroke="#DC2626"
                                    strokeWidth="2.2"
                                />
                                <circle
                                    cx={sweepCursorX}
                                    cy={BASE_Y}
                                    r="4"
                                    fill="#DC2626"
                                />
                                {/* Cursor Badge */}
                                <g transform={`translate(${Math.min(STRIP_WIDTH - 65, Math.max(8, sweepCursorX - 25))}, 8)`}>
                                    <rect width="56" height="18" rx="4" fill="#DC2626" />
                                    <text x="28" y="13" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#FFFFFF">
                                        {currentPhase.wave}
                                    </text>
                                </g>
                            </svg>
                        </div>

                        {/* NINJA NERD ELEKTROFYSIOLOGISK FORKLARING */}
                        <div className="p-3.5 rounded-2xl bg-[#F9F8F6] border border-[#E8E4D9] flex flex-col gap-2 text-xs">
                            <div className="flex justify-between items-center text-[11px] font-bold text-[#3A4A40] pb-1 border-b border-[#E8E4D9]">
                                <span>Aktuel fase: <strong className="text-[#DC2626]">{currentPhase.name}</strong></span>
                                <span>{Math.round(cycleTime)} ms / 800 ms</span>
                            </div>

                            {/* Vektorregel i denne fase */}
                            <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950">
                                <strong className="text-blue-900 block font-bold mb-0.5">⚡ Elektrofysiologisk regel:</strong>
                                <p className="leading-relaxed">{currentPhase.ruleText}</p>
                            </div>

                            {/* Hvorfor kurven ser sådan ud i denne afledning */}
                            <div className="text-[#3A4A40] leading-relaxed">
                                <strong className="text-slate-800 block mb-0.5">Afledningens synsvinkel:</strong>
                                {selectedLead === 'II' && 'Afledning II (+60°) peger præcist parallelt med hjertets anatomiske akse fra SA-knuden mod apeks. Derfor er Lead II "guldstandarden" til rytmeovervågning med høje, tydelige P-, R- og T-takker.'}
                                {selectedLead === 'aVR' && 'aVR (-150°) kigger ind i hjertet fra højre skulder. Da hjerteaktiveringen løber væk fra højre skulder mod venstre apeks, er ALLE bølger fysiologisk inverterede (negativ P, negativ QRS, negativ T). En opretstående R-tak i aVR er altid abnormt!'}
                                {selectedLead === 'I' && 'Afledning I (0°) måler spænding fra højre arm mod venstre arm. Kigger på venstre ventrikels laterale væg og giver et overvejende positivt QRS.'}
                                {selectedLead === 'III' && 'Afledning III (+120°) ser på hjertets diafragmale flade fra venstre arm mod venstre ben. Vinklen er ofte tæt på 90° ift. atrievektoren, hvorfor P- og T-takker her let kan være flade eller bifasiske.'}
                                {selectedLead === 'aVF' && 'aVF (+90°) ser lodret op mod hjertets underside fra fødderne. Supplerer Lead II og III i vurderingen af den diafragmale flade (RCA).'}
                                {selectedLead === 'aVL' && 'aVL (-30°) kigger mod venstre skulder på den høje laterale væg. Danner sammen med Lead I det laterale vindue.'}
                                {selectedLead === 'V1' && 'V1 (4. ICR højre for sternum) kigger direkte på højre ventrikel og septum. Den lille r-tak skyldes septal aktivering mod V1, hvorefter den massive venstre ventrikel trækker strømmen væk i en dyb S-tak (rS-mønster).'}
                                {selectedLead === 'V2' && 'V2 ser på forreste septum. Har typisk en lille r-tak og en dyb S-tak med høj, fyldig T-tak.'}
                                {selectedLead === 'V3' && 'V3 repræsenterer overgangszonen (transition zone), hvor R-takken vokser og bliver omtrent lige så dyb som S-takken (R = S).'}
                                {selectedLead === 'V4' && 'V4 (5. ICR medioklavikulært) kigger direkte på hjertespidsen (apeks). Her kulminerer R-takkens amplitude.'}
                                {selectedLead === 'V5' || selectedLead === 'V6' ? `${selectedLead} kigger på venstre ventrikels laterale væg fra flanken. Giver en dominerende høj R-tak og lille fysiologisk septal q-tak (qR-mønster).` : null}
                            </div>
                        </div>
                    </div>

                    {/* 3. KROP OG ELEKTRODEPLACERING (EINTHOVENS TREKANT & THORAX) */}
                    <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/95 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E8E4D9]">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#3A4A40]">
                                <User className="w-4 h-4 text-[#839788]" />
                                <span>Elektrodeplacering på kroppen</span>
                            </div>
                            <div className="flex bg-[#F2F6F3] p-0.5 rounded-xl border border-[#E8E4D9] text-[11px] font-semibold">
                                <button
                                    onClick={() => setBodyView('limb')}
                                    className={`px-2.5 py-1 rounded-lg transition-all ${bodyView === 'limb' ? 'bg-white text-[#3A4A40] font-bold shadow-xs' : 'text-[#839788]'}`}
                                >
                                    Einthovens Trekant (Ekstremiteter)
                                </button>
                                <button
                                    onClick={() => setBodyView('chest')}
                                    className={`px-2.5 py-1 rounded-lg transition-all ${bodyView === 'chest' ? 'bg-white text-[#3A4A40] font-bold shadow-xs' : 'text-[#839788]'}`}
                                >
                                    Brystkasse (V1–V6)
                                </button>
                            </div>
                        </div>

                        {bodyView === 'limb' ? (
                            /* EINTHOVENS TREKANT PÅ KROPPEN */
                            <div className="flex flex-col items-center">
                                <div className="relative w-full max-w-[360px] h-[270px] flex items-center justify-center">
                                    <svg viewBox="0 0 280 300" className="w-full h-full select-none">
                                        <defs>
                                            <marker id="limbArrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#DC2626" />
                                            </marker>
                                        </defs>

                                        {/* Menneskets anatomiske silhuet */}
                                        <g id="bodySilhouetteLimb" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" strokeLinejoin="round">
                                            <path d="M 140 18 C 128 18, 122 28, 122 42 C 122 55, 130 63, 140 63 C 150 63, 158 55, 158 42 C 158 28, 152 18, 140 18 Z" />
                                            <path d="M 135 63 L 135 74 L 145 74 L 145 63" />
                                            <path d="M 135 74 C 115 76, 85 88, 70 105 L 45 160 C 42 170, 42 178, 48 180 C 54 182, 60 174, 64 165 L 82 125 L 84 200 C 84 212, 92 220, 105 220 L 108 280 C 108 288, 115 292, 122 292 C 128 292, 132 285, 132 275 L 134 220 L 146 220 L 148 275 C 148 285, 152 292, 158 292 C 165 292, 172 288, 172 280 L 175 220 C 188 220, 196 212, 196 200 L 198 125 L 216 165 C 220 174, 226 182, 232 180 C 238 178, 238 170, 235 160 L 210 105 C 195 88, 165 76, 145 74 Z" />
                                        </g>

                                        {/* Hjerte i venstre bryst */}
                                        <circle cx="148" cy="115" r="16" fill="#FDA4AF" fillOpacity="0.4" stroke="#F43F5E" strokeWidth="1.5" />

                                        {/* EINTHOVENS TREKANT RAMMELINJER (STIPLET) */}
                                        <line x1={EINTHOVEN_COORDS.RA.x} y1={EINTHOVEN_COORDS.RA.y} x2={EINTHOVEN_COORDS.LA.x} y2={EINTHOVEN_COORDS.LA.y} stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
                                        <line x1={EINTHOVEN_COORDS.RA.x} y1={EINTHOVEN_COORDS.RA.y} x2={EINTHOVEN_COORDS.LL.x} y2={EINTHOVEN_COORDS.LL.y} stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />
                                        <line x1={EINTHOVEN_COORDS.LA.x} y1={EINTHOVEN_COORDS.LA.y} x2={EINTHOVEN_COORDS.LL.x} y2={EINTHOVEN_COORDS.LL.y} stroke="#94A3B8" strokeWidth="1.2" strokeDasharray="3 3" />

                                        {/* AKTIV MÅLEAKSE FREMHÆVET PÅ KROPPEN */}
                                        {selectedLead === 'I' && (
                                            <g id="leadIActive">
                                                <line x1={EINTHOVEN_COORDS.RA.x} y1={EINTHOVEN_COORDS.RA.y} x2={EINTHOVEN_COORDS.LA.x} y2={EINTHOVEN_COORDS.LA.y} stroke="#DC2626" strokeWidth="3.5" markerEnd="url(#limbArrowRed)" />
                                                <text x="68" y="98" fontSize="10" fontWeight="bold" fill="#DC2626" textAnchor="middle">(-)</text>
                                                <text x="212" y="98" fontSize="10" fontWeight="bold" fill="#DC2626" textAnchor="middle">(+)</text>
                                            </g>
                                        )}
                                        {selectedLead === 'II' && (
                                            <g id="leadIIActive">
                                                <line x1={EINTHOVEN_COORDS.RA.x} y1={EINTHOVEN_COORDS.RA.y} x2={EINTHOVEN_COORDS.LL.x} y2={EINTHOVEN_COORDS.LL.y} stroke="#DC2626" strokeWidth="3.5" markerEnd="url(#limbArrowRed)" />
                                                <text x="68" y="98" fontSize="10" fontWeight="bold" fill="#DC2626" textAnchor="middle">(-)</text>
                                                <text x="175" y="265" fontSize="10" fontWeight="bold" fill="#DC2626" textAnchor="start">(+)</text>
                                            </g>
                                        )}
                                        {selectedLead === 'III' && (
                                            <g id="leadIIIActive">
                                                <line x1={EINTHOVEN_COORDS.LA.x} y1={EINTHOVEN_COORDS.LA.y} x2={EINTHOVEN_COORDS.LL.x} y2={EINTHOVEN_COORDS.LL.y} stroke="#DC2626" strokeWidth="3.5" markerEnd="url(#limbArrowRed)" />
                                                <text x="212" y="98" fontSize="10" fontWeight="bold" fill="#DC2626" textAnchor="middle">(-)</text>
                                                <text x="175" y="265" fontSize="10" fontWeight="bold" fill="#DC2626" textAnchor="start">(+)</text>
                                            </g>
                                        )}
                                        {selectedLead === 'aVR' && (
                                            <line x1="148" y1="115" x2={EINTHOVEN_COORDS.RA.x} y2={EINTHOVEN_COORDS.RA.y} stroke="#DC2626" strokeWidth="3.5" markerEnd="url(#limbArrowRed)" />
                                        )}
                                        {selectedLead === 'aVL' && (
                                            <line x1="148" y1="115" x2={EINTHOVEN_COORDS.LA.x} y2={EINTHOVEN_COORDS.LA.y} stroke="#DC2626" strokeWidth="3.5" markerEnd="url(#limbArrowRed)" />
                                        )}
                                        {selectedLead === 'aVF' && (
                                            <line x1="148" y1="115" x2="148" y2="230" stroke="#DC2626" strokeWidth="3.5" markerEnd="url(#limbArrowRed)" />
                                        )}

                                        {/* DE 4 ELEKTRODEBADGES PÅ LEMMERNE */}
                                        <g transform={`translate(${EINTHOVEN_COORDS.RA.x}, ${EINTHOVEN_COORDS.RA.y})`} className="cursor-pointer" onClick={() => handleSelectLead('aVR')}>
                                            <circle cx="0" cy="0" r="11" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                                            <text x="0" y="3.5" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#FFFFFF">RA</text>
                                            <text x="-16" y="3.5" textAnchor="end" fontSize="9" fontWeight="bold" fill="#DC2626">Rød (RA)</text>
                                        </g>

                                        <g transform={`translate(${EINTHOVEN_COORDS.LA.x}, ${EINTHOVEN_COORDS.LA.y})`} className="cursor-pointer" onClick={() => handleSelectLead('aVL')}>
                                            <circle cx="0" cy="0" r="11" fill="#EAB308" stroke="#FFFFFF" strokeWidth="2" />
                                            <text x="0" y="3.5" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#FFFFFF">LA</text>
                                            <text x="16" y="3.5" textAnchor="start" fontSize="9" fontWeight="bold" fill="#B45309">Gul (LA)</text>
                                        </g>

                                        <g transform={`translate(${EINTHOVEN_COORDS.LL.x}, ${EINTHOVEN_COORDS.LL.y})`} className="cursor-pointer" onClick={() => handleSelectLead('aVF')}>
                                            <circle cx="0" cy="0" r="11" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
                                            <text x="0" y="3.5" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#FFFFFF">LL</text>
                                            <text x="16" y="3.5" textAnchor="start" fontSize="9" fontWeight="bold" fill="#15803D">Grøn (LL)</text>
                                        </g>

                                        <g transform={`translate(${EINTHOVEN_COORDS.RL.x}, ${EINTHOVEN_COORDS.RL.y})`}>
                                            <circle cx="0" cy="0" r="11" fill="#1E293B" stroke="#FFFFFF" strokeWidth="2" />
                                            <text x="0" y="3.5" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#FFFFFF">RL</text>
                                            <text x="-16" y="3.5" textAnchor="end" fontSize="9" fontWeight="bold" fill="#475569">Sort (Jord)</text>
                                        </g>
                                    </svg>
                                </div>

                                <div className="w-full text-center mt-1">
                                    <div className="inline-block px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-[#3A4A40] text-xs font-semibold">
                                        {selectedLead === 'I' && 'Afledning I (0°): Bipolar. Højre arm (-) mod venstre arm (+).'}
                                        {selectedLead === 'II' && 'Afledning II (+60°): Bipolar. Højre arm (-) mod venstre ben (+). Hovedaksen.'}
                                        {selectedLead === 'III' && 'Afledning III (+120°): Bipolar. Venstre arm (-) mod venstre ben (+).'}
                                        {selectedLead === 'aVR' && 'aVR (-150°): Unipolær. Kigger mod højre skulder. Alt er fysiologisk inverteret.'}
                                        {selectedLead === 'aVL' && 'aVL (-30°): Unipolær. Kigger mod venstre skulder på den høje laterale væg.'}
                                        {selectedLead === 'aVF' && 'aVF (+90°): Unipolær. Kigger mod fødderne på den diafragmale flade.'}
                                        {selectedLead.startsWith('V') && `Skift til Brystkasse-fanen for at se prækordial placering af ${selectedLead}.`}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* BRYSTKASSE OG PRÆKORDIALE ELEKTRODER (V1–V6) */
                            <div className="flex flex-col items-center">
                                <div className="relative w-full max-w-[360px] h-[270px] flex items-center justify-center">
                                    <svg viewBox="0 0 280 280" className="w-full h-full select-none">
                                        <path d="M 60 40 Q 140 30, 220 40 C 250 80, 250 180, 220 250 Q 140 270, 60 250 C 30 180, 30 80, 60 40 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
                                        
                                        {/* Sternum */}
                                        <rect x="134" y="45" width="12" height="110" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
                                        <text x="140" y="100" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#64748B" transform="rotate(-90 140 100)">STERNUM</text>

                                        {/* Ribben og interkostalrum */}
                                        <line x1="60" y1="116" x2="220" y2="116" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />
                                        <text x="50" y="119" fontSize="8" fontWeight="bold" fill="#94A3B8" textAnchor="end">ICR 4</text>

                                        <line x1="60" y1="140" x2="220" y2="140" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="3 3" />
                                        <text x="50" y="143" fontSize="8" fontWeight="bold" fill="#94A3B8" textAnchor="end">ICR 5</text>

                                        {/* Hjertets beliggenhed */}
                                        <ellipse cx="165" cy="130" rx="35" ry="42" fill="#FDA4AF" fillOpacity="0.3" stroke="#F43F5E" strokeWidth="1.5" />

                                        {/* DE 6 BRYSTELEKTRODER V1–V6 */}
                                        {CHEST_COORDS.map(cl => {
                                            const isSel = selectedLead === cl.name;
                                            return (
                                                <g key={cl.name} className="cursor-pointer" onClick={() => handleSelectLead(cl.name)}>
                                                    {isSel && (
                                                        <circle cx={cl.x} cy={cl.y} r="14" fill="none" stroke="#DC2626" strokeWidth="2.5" className="animate-pulse" />
                                                    )}
                                                    <circle cx={cl.x} cy={cl.y} r={isSel ? 9 : 7} fill={cl.color} stroke="#FFFFFF" strokeWidth="2" />
                                                    <text x={cl.x} y={cl.y - 10} fontSize={isSel ? '10' : '8'} fontWeight="bold" fill={isSel ? '#DC2626' : '#1E293B'} textAnchor="middle">
                                                        {cl.name}
                                                    </text>
                                                </g>
                                            );
                                        })}
                                    </svg>
                                </div>

                                <div className="w-full text-center mt-1">
                                    <div className="inline-block px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold">
                                        {selectedLead.startsWith('V') ? (
                                            <><strong>{selectedLead}:</strong> {CHEST_COORDS.find(c => c.name === selectedLead)?.ic} ({CHEST_COORDS.find(c => c.name === selectedLead)?.wall})</>
                                        ) : (
                                            <>Vælg en brystafledning (V1–V6) for at se placering på thorax.</>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
