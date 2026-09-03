import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, Layers, Info, Compass, Sparkles, ChevronRight, AlertTriangle } from '../Icons';
import { LEAD_DETAILS, EKG_CASES } from '../../data/ekgCases';

/**
 * Autentisk Cabrera Hexaksial Hjertemodel (The Physiological Society standard)
 * 
 * Baseret direkte på den medicinske standard (Image 2):
 * - Central 4-kammer anatomisk hjertemodel:
 *   - Højre hjertehalvdel (Atrium Dextrum & Ventriculus Dexter) i fysiologisk blå (venøst blod).
 *   - Venstre hjertehalvdel (Atrium Sinistrum & Ventriculus Sinister) i fysiologisk rød/pink (arterielt blod).
 *   - Kraftig gylden/ravfarvet myokardievæg og interventrikulært septum.
 *   - Hjertets anatomiske akse og apeks peget direkte mod +60° (Afledning II).
 * - Cabrera hexaksial cirkel med 12 radiale eger (hver 30°).
 * - 6 markante sorte vektor-pile med nøjagtige vinkler:
 *   - I (0°)
 *   - II (+60°)
 *   - aVF (+90°)
 *   - III (+120°)
 *   - aVR (-150°)
 *   - aVL (-30°)
 * - Mini-EKG kurver ved hver af de 6 pile (viser positiv/negativ/bifasisk morfologi).
 * - 4 farvede aksekvadranter (Normal -30°..+90°, LAD -30°..-90°, RAD +90°..+180°, Ekstrem).
 * - Dynamisk elektrisk vektor med projektion på den valgte aflednings akse.
 */
export default function EkgHeartModel({ selectedLead = 'II', onSelectLead, caseData, activeCase: propActiveCase }) {
    const activeCase = propActiveCase || caseData || EKG_CASES[0];
    const [viewMode, setViewMode] = useState(() => {
        return LEAD_DETAILS[selectedLead]?.plane || 'frontal';
    });
    const [isPlaying, setIsPlaying] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(0.25); // Roligt undervisningstempo (~3.2s per cyklus)
    const [cycleTime, setCycleTime] = useState(50); // Starter ved P-takken (50 ms)
    const [showCoronary, setShowCoronary] = useState(true);
    const [showConduction, setShowConduction] = useState(true);
    const [showVector, setShowVector] = useState(true);
    const [showAxisSectors, setShowAxisSectors] = useState(true);
    const [showAnatomyLabels, setShowAnatomyLabels] = useState(false);

    const animationRef = useRef(null);
    const lastTimestampRef = useRef(null);
    const isScrubbingRef = useRef(false);

    // Fysiologiske faser i hjertecyklussen (800 ms = 75 bpm)
    const PHASES = [
        { name: 'P-tak (Atriedepolarisering)', time: 50, label: 'P-tak' },
        { name: 'PR-segment (AV-forsinkelse)', time: 130, label: 'PR' },
        { name: 'Q-tak (Septal aktivering)', time: 180, label: 'Q-tak' },
        { name: 'R-tak (Ventrikelsystole)', time: 230, label: 'R-tak' },
        { name: 'S-tak (Basal aktivering)', time: 280, label: 'S-tak' },
        { name: 'T-tak (Ventrikelrepolarisation)', time: 450, label: 'T-tak' },
        { name: 'Diastole (Fyldningsfase)', time: 650, label: 'Diastole' }
    ];

    const handleStepPhase = (direction) => {
        setIsPlaying(false);
        const currentIdx = PHASES.findIndex((p, i) => {
            const nextTime = PHASES[i + 1]?.time || 800;
            return cycleTime >= p.time && cycleTime < nextTime;
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
        }
        if (onSelectLead) onSelectLead(lead);
    };

    // Beregning af hjertecyklusens fase, elektrisk vektor og aktivt myokardium
    const getCardiacPhase = (t) => {
        if (t >= 0 && t < 100) {
            const prog = t / 100;
            return {
                name: 'Atriedepolarisering',
                wave: 'P-tak',
                desc: 'SA-knuden fyrer. Depolariseringsbølgen breder sig gennem højre og venstre atrie mod AV-knuden.',
                activeNodes: ['sa_node', 'atria', 'bachmann'],
                vector: { angle: 50, magnitude: Math.sin(prog * Math.PI) * 0.45, color: '#3B82F6' },
                horizontalVector: { angle: 60, magnitude: Math.sin(prog * Math.PI) * 0.4, color: '#3B82F6' },
                highlightWall: 'Atriemyokardiet'
            };
        } else if (t >= 100 && t < 160) {
            return {
                name: 'AV-knudeforsinkelse',
                wave: 'PR-segment',
                desc: 'Impulsen forsinkes i AV-knuden (120-200 ms) for at sikre fuldstændig ventrikelfyldning.',
                activeNodes: ['av_node'],
                vector: { angle: 0, magnitude: 0.05, color: '#94A3B8' },
                horizontalVector: { angle: 0, magnitude: 0.05, color: '#94A3B8' },
                highlightWall: 'AV-knuden (isoelektrisk)'
            };
        } else if (t >= 160 && t < 200) {
            const prog = (t - 160) / 40;
            return {
                name: 'Septal depolarisering',
                wave: 'Q-tak',
                desc: 'Venstre gren aktiverer det interventrikulære septum fra venstre mod højre.',
                activeNodes: ['his_bundle', 'bundle_branches', 'septum'],
                vector: { angle: -125, magnitude: Math.sin(prog * Math.PI) * 0.35, color: '#F59E0B' },
                horizontalVector: { angle: 120, magnitude: Math.sin(prog * Math.PI) * 0.35, color: '#F59E0B' },
                highlightWall: 'Septum (venstre mod højre)'
            };
        } else if (t >= 200 && t < 260) {
            const prog = (t - 200) / 60;
            const mainAngle = activeCase.id === 'lbbb' ? -40 : activeCase.id === 'rbbb' ? 110 : 60;
            return {
                name: 'Hovedventrikeldepolarisering',
                wave: 'R-tak',
                desc: 'Hovedparten af venstre og højre ventrikel depolariseres fra endokardium mod epikardium.',
                activeNodes: ['purkinje', 'ventricles', 'apex'],
                vector: { angle: mainAngle, magnitude: Math.sin(prog * Math.PI) * 1.0, color: '#DC2626' },
                horizontalVector: { angle: 45, magnitude: Math.sin(prog * Math.PI) * 1.0, color: '#DC2626' },
                highlightWall: 'Venstre ventrikelvæg & apeks'
            };
        } else if (t >= 260 && t < 320) {
            const prog = (t - 260) / 60;
            return {
                name: 'Basal ventrikelaktivering',
                wave: 'S-tak',
                desc: 'De allersidste basale dele af ventriklerne mod hjertebasis depolariseres.',
                activeNodes: ['base'],
                vector: { angle: -140, magnitude: Math.sin(prog * Math.PI) * 0.4, color: '#8B5CF6' },
                horizontalVector: { angle: 160, magnitude: Math.sin(prog * Math.PI) * 0.4, color: '#8B5CF6' },
                highlightWall: 'Basale ventrikelpartier'
            };
        } else if (t >= 320 && t < 380) {
            return {
                name: 'ST-segment (Plateaufase)',
                wave: 'ST-segment',
                desc: 'Ventrikelmyocytterne er i refraktær plateaufase. Normalt isoelektrisk.',
                activeNodes: activeCase.affectedLeads?.length ? ['ischemia'] : [],
                vector: activeCase.id === 'anterior_stemi'
                    ? { angle: 30, magnitude: 0.35, color: '#DC2626' }
                    : activeCase.id === 'inferior_stemi'
                        ? { angle: 90, magnitude: 0.4, color: '#DC2626' }
                        : { angle: 0, magnitude: 0.05, color: '#94A3B8' },
                horizontalVector: { angle: 0, magnitude: 0.05, color: '#94A3B8' },
                highlightWall: activeCase.affectedLeads?.length ? 'Iskæmisk zone' : 'Plateaufase'
            };
        } else if (t >= 380 && t < 520) {
            const prog = (t - 380) / 140;
            return {
                name: 'Ventrikelrepolarisation',
                wave: 'T-tak',
                desc: 'Ventriklerne repolariseres fra epikardium mod endokardium.',
                activeNodes: ['repolarization'],
                vector: { angle: 55, magnitude: Math.sin(prog * Math.PI) * 0.55, color: '#10B981' },
                horizontalVector: { angle: -30, magnitude: Math.sin(prog * Math.PI) * 0.55, color: '#10B981' },
                highlightWall: 'Hele ventrikelmyokardiet'
            };
        } else {
            return {
                name: 'Elektrisk hvilefase (Diastole)',
                wave: 'Isoelektrisk grundlinje',
                desc: 'Myokardiet hviler og kamrene fyldes passivt med blod.',
                activeNodes: [],
                vector: { angle: 0, magnitude: 0, color: '#94A3B8' },
                horizontalVector: { angle: 0, magnitude: 0, color: '#94A3B8' },
                highlightWall: 'Diastole'
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
        setCycleTime(parseFloat(e.target.value));
    };

    // De 6 ekstremitetsafledninger i Cabrera systemet med deres vinkler og mini-EKG kurver
    const CABRERA_LEADS = [
        {
            name: 'I',
            angle: 0,
            degLabel: '0°',
            labelX: 195,
            labelY: -10,
            tipX: 190,
            tipY: 0,
            badgeX: 218,
            badgeY: 0,
            miniPath: 'M 0 0 L 3 0 L 4 1.5 L 5 -8 L 6.5 3 L 7.5 0 L 12 0'
        },
        {
            name: 'II',
            angle: 60,
            degLabel: '60°',
            labelX: 85,
            labelY: 155,
            tipX: 95,
            tipY: 164.5,
            badgeX: 115,
            badgeY: 195,
            miniPath: 'M 0 0 L 3 0 L 4 2 L 5 -15 L 7 4 L 8 0 L 12 0'
        },
        {
            name: 'aVF',
            angle: 90,
            degLabel: '90°',
            labelX: 16,
            labelY: 175,
            tipX: 0,
            tipY: 190,
            badgeX: 0,
            badgeY: 220,
            miniPath: 'M 0 0 L 3 0 L 4 1.5 L 5 -10 L 6.5 3 L 7.5 0 L 12 0'
        },
        {
            name: 'III',
            angle: 120,
            degLabel: '120°',
            labelX: -85,
            labelY: 155,
            tipX: -95,
            tipY: 164.5,
            badgeX: -115,
            badgeY: 195,
            miniPath: 'M 0 0 L 3 0 L 4 -2 L 5 8 L 6.5 -3 L 7.5 0 L 12 0'
        },
        {
            name: 'aVR',
            angle: -150,
            degLabel: '-150°',
            labelX: -155,
            labelY: -75,
            tipX: -164.5,
            tipY: -95,
            badgeX: -195,
            badgeY: -115,
            miniPath: 'M 0 0 L 3 0 L 4 -2 L 5 12 L 6.5 -3 L 7.5 0 L 12 0'
        },
        {
            name: 'aVL',
            angle: -30,
            degLabel: '-30°',
            labelX: 155,
            labelY: -75,
            tipX: 164.5,
            tipY: -95,
            badgeX: 195,
            badgeY: -115,
            miniPath: 'M 0 0 L 3 0 L 4 1 L 5 -5 L 6.5 2 L 7.5 0 L 12 0'
        }
    ];

    const SPOKE_ANGLES = [30, 150, 180, 240, 270, 300];

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1400px] mx-auto">
            {/* VENSTRE SØJLE: DEN AUTENTISKE CABRERA HJERTEMODEL CANVAS (IMAGE 2 STANDARD) */}
            <div className="flex-1 glass-panel rounded-3xl p-5 md:p-6 border border-[#E8E4D9] flex flex-col shadow-sm bg-white/90">
                {/* Topbar: Visningsvalg & Visningsfiltre */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E4D9]">
                    <div className="flex items-center gap-2.5">
                        <div className="bg-[#839788] p-2.5 rounded-xl text-white shadow-xs">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#3A4A40] leading-tight">Cabrera Hexaksial Hjertemodel</h2>
                            <p className="text-xs text-[#839788]">Trigonometrisk visualisering af hjertevektorer & 12-afledningsprojektion</p>
                        </div>
                    </div>

                    {/* Faneblade for Visningsplan */}
                    <div className="flex bg-[#F2F6F3] p-1 rounded-2xl border border-[#E8E4D9] text-xs font-semibold">
                        <button
                            onClick={() => setViewMode('frontal')}
                            className={`px-3.5 py-1.5 rounded-xl transition-all ${viewMode === 'frontal' ? 'bg-white text-[#3A4A40] shadow-sm font-bold' : 'text-[#839788] hover:text-[#3A4A40]'}`}
                        >
                            Frontalplan (Cabrera)
                        </button>
                        <button
                            onClick={() => setViewMode('horizontal')}
                            className={`px-3.5 py-1.5 rounded-xl transition-all ${viewMode === 'horizontal' ? 'bg-white text-[#3A4A40] shadow-sm font-bold' : 'text-[#839788] hover:text-[#3A4A40]'}`}
                        >
                            Horisontalplan (V1–V6)
                        </button>
                    </div>
                </div>

                {/* SELVE DET CENTRALE MODELOMRÅDE (SVG CIRKEL & HJERTE) */}
                <div className="relative w-full h-[420px] sm:h-[480px] my-3 flex items-center justify-center bg-gradient-to-b from-[#FAFAF9] to-[#F1F5F9] rounded-3xl overflow-hidden border-2 border-[#E2E8F0] shadow-inner">
                    {viewMode === 'frontal' ? (
                        /* FRONTALPLAN SVG: AUTENTISK CABRERA CIRKEL MED 4-KAMMER HJERTE (IDENTISK MED BRUGERBILLEDE 2) */
                        <svg viewBox="-260 -260 520 520" className="w-full h-full max-h-[480px] select-none">
                            <defs>
                                <marker id="cabreraArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0F172A" />
                                </marker>
                                <marker id="selectedArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#DC2626" />
                                </marker>
                                <marker id="vectorArrowHead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={currentPhase.vector.color} />
                                </marker>

                                {/* Gylden/ravfarvet myokardievæg */}
                                <radialGradient id="myoWallGrad" cx="45%" cy="40%" r="65%">
                                    <stop offset="0%" stopColor="#F59E0B" />
                                    <stop offset="45%" stopColor="#D97706" />
                                    <stop offset="85%" stopColor="#B45309" />
                                    <stop offset="100%" stopColor="#78350F" />
                                </radialGradient>

                                {/* Højre Hjertekamre (Blå/Cyan) */}
                                <radialGradient id="rightHeartGrad" cx="40%" cy="35%" r="65%">
                                    <stop offset="0%" stopColor="#60A5FA" />
                                    <stop offset="40%" stopColor="#2563EB" />
                                    <stop offset="85%" stopColor="#1D4ED8" />
                                    <stop offset="100%" stopColor="#1E3A8A" />
                                </radialGradient>

                                {/* Venstre Hjertekamre (Rød/Pink) */}
                                <radialGradient id="leftHeartGrad" cx="45%" cy="35%" r="65%">
                                    <stop offset="0%" stopColor="#FB7185" />
                                    <stop offset="45%" stopColor="#E11D48" />
                                    <stop offset="85%" stopColor="#BE123C" />
                                    <stop offset="100%" stopColor="#881337" />
                                </radialGradient>

                                {/* Aorta Ascendens & Arcus */}
                                <linearGradient id="aortaArchGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" stopColor="#BE123C" />
                                    <stop offset="50%" stopColor="#DC2626" />
                                    <stop offset="100%" stopColor="#991B1B" />
                                </linearGradient>

                                {/* Truncus Pulmonalis */}
                                <linearGradient id="pulmTrunkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" stopColor="#1D4ED8" />
                                    <stop offset="60%" stopColor="#2563EB" />
                                    <stop offset="100%" stopColor="#1E3A8A" />
                                </linearGradient>

                                <filter id="heartDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="1" dy="6" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.22" />
                                </filter>
                                <filter id="vectorGlow" x="-30%" y="-30%" width="160%" height="160%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* 1. GRUNDLÆGGENDE CABRERA KREDS (R = 190 PX) */}
                            <circle cx="0" cy="0" r="190" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
                            <circle cx="0" cy="0" r="130" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                            <circle cx="0" cy="0" r="65" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />

                            {/* 2. AKSEKVADRANTER */}
                            {showAxisSectors && (
                                <g id="axisSectors" opacity="0.6">
                                    {/* Normal Akse: -30° til +90° */}
                                    <path d="M 0 0 L 164.5 -95 A 190 190 0 0 1 0 190 Z" fill="#FCE7F3" stroke="#F43F5E" strokeWidth="0.5" />
                                    {/* LAD: -30° til -90° */}
                                    <path d="M 0 0 L 164.5 -95 A 190 190 0 0 0 0 -190 Z" fill="#DCFCE7" stroke="#22C55E" strokeWidth="0.5" />
                                    {/* RAD: +90° til +180° */}
                                    <path d="M 0 0 L 0 190 A 190 190 0 0 1 -190 0 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="0.5" />
                                    {/* Ekstrem Akseafvigelse: -90° til -180° */}
                                    <path d="M 0 0 L -190 0 A 190 190 0 0 1 0 -190 Z" fill="#FEF9C3" stroke="#EAB308" strokeWidth="0.5" />
                                </g>
                            )}

                            {/* 3. RADIALE EGER HVER 30 GRADER */}
                            {SPOKE_ANGLES.map(deg => {
                                const rad = (deg * Math.PI) / 180;
                                const sx = Math.cos(rad) * 190;
                                const sy = Math.sin(rad) * 190;
                                return (
                                    <line
                                        key={deg}
                                        x1="0"
                                        y1="0"
                                        x2={sx}
                                        y2={sy}
                                        stroke="#94A3B8"
                                        strokeWidth="1.2"
                                        strokeDasharray="4 3"
                                    />
                                );
                            })}

                            {/* 4. DET ANATOMISKE 4-KAMMER HJERTE I MIDTEN (CENTER VED AV-KNUDEN / ORIGIN 0,0) */}
                            <g id="centralHeartModel" filter="url(#heartDropShadow)">
                                {/* STORE KAR SUPERIORT */}
                                {/* Vena Cava Superior */}
                                <path d="M -42 -55 L -26 -55 L -26 -95 L -42 -95 Z" fill="url(#pulmTrunkGrad)" stroke="#1E3A8A" strokeWidth="1.5" />
                                <ellipse cx="-34" cy="-95" rx="8" ry="3" fill="#60A5FA" />

                                {/* Aorta Ascendens & Arcus */}
                                <path
                                    d="M -12 -50 C -12 -80, -5 -115, 15 -115 C 32 -115, 38 -95, 38 -60 L 24 -60 C 24 -85, 20 -100, 12 -100 C 2 -100, 0 -75, 0 -50 Z"
                                    fill="url(#aortaArchGrad)"
                                    stroke="#7F1D1D"
                                    strokeWidth="1.5"
                                />
                                <path d="M -2 -112 L -4 -128 L 3 -128 L 3 -114 Z" fill="url(#aortaArchGrad)" stroke="#7F1D1D" strokeWidth="0.8" />
                                <path d="M 9 -115 L 9 -131 L 16 -131 L 15 -115 Z" fill="url(#aortaArchGrad)" stroke="#7F1D1D" strokeWidth="0.8" />
                                <path d="M 22 -110 L 25 -126 L 31 -126 L 27 -108 Z" fill="url(#aortaArchGrad)" stroke="#7F1D1D" strokeWidth="0.8" />

                                {/* Truncus Pulmonalis */}
                                <path
                                    d="M -16 -40 C -18 -60, -10 -75, 4 -80 C 18 -82, 22 -70, 16 -60 C 8 -50, 2 -35, 0 -20 Z"
                                    fill="url(#pulmTrunkGrad)"
                                    stroke="#1E3A8A"
                                    strokeWidth="1.5"
                                />

                                {/* YDRE MYOKARDIEKONTUR (GYLDEN/RAVFARVET MUSKELVÆG, APEKS MOD +60°) */}
                                <path
                                    d="M -58 -38 C -82 -25, -88 15, -68 55 C -50 85, -15 110, 32 118 C 42 116, 48 108, 55 92 C 72 55, 75 5, 48 -22 C 32 -38, -12 -46, -58 -38 Z"
                                    fill="url(#myoWallGrad)"
                                    stroke="#78350F"
                                    strokeWidth="2.5"
                                />

                                {/* INTERVENTRIKULÆRT SEPTUM */}
                                <path
                                    d="M -4 -8 C -6 18, 0 55, 26 106 L 36 100 C 14 52, 10 18, 8 -8 Z"
                                    fill="#B45309"
                                    stroke="#78350F"
                                    strokeWidth="1"
                                />

                                {/* 4 INDRE HJERTEKAMRE */}
                                {/* Højre Atrie (RA) */}
                                <path
                                    d="M -52 -28 C -70 -18, -72 5, -55 18 C -42 22, -30 18, -25 5 C -22 -10, -32 -25, -52 -28 Z"
                                    fill="url(#rightHeartGrad)"
                                    stroke="#1E3A8A"
                                    strokeWidth="1.5"
                                />

                                {/* Højre Ventrikel (RV) */}
                                <path
                                    d="M -48 24 C -60 52, -35 78, 10 98 C 0 68, -4 42, -10 22 C -22 18, -36 18, -48 24 Z"
                                    fill="url(#rightHeartGrad)"
                                    stroke="#1E3A8A"
                                    strokeWidth="1.5"
                                />

                                {/* Venstre Atrie (LA) */}
                                <path
                                    d="M 12 -22 C 15 -30, 38 -28, 44 -12 C 48 2, 38 12, 24 10 C 18 5, 14 -8, 12 -22 Z"
                                    fill="url(#leftHeartGrad)"
                                    stroke="#881337"
                                    strokeWidth="1.5"
                                />

                                {/* Venstre Ventrikel (LV) */}
                                <path
                                    d="M 12 12 C 10 45, 16 75, 30 96 C 45 78, 55 45, 42 18 C 32 8, 20 8, 12 12 Z"
                                    fill="url(#leftHeartGrad)"
                                    stroke="#881337"
                                    strokeWidth="1.5"
                                />

                                {/* LEDNINGSSYSTEM */}
                                {showConduction && (
                                    <g id="conductionSystem">
                                        <circle cx="-42" cy="-14" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" className={currentPhase.activeNodes.includes('sa_node') ? 'animate-ping' : ''} />
                                        <circle cx="-42" cy="-14" r="3.5" fill="#EF4444" />
                                        <path d="M -40 -12 Q -25 -5, 0 0" fill="none" stroke="#F59E0B" strokeWidth="1.8" strokeDasharray="2 2" />
                                        <circle cx="0" cy="0" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                                        <path d="M 0 0 L 2 15 Q 8 48, 22 92" fill="none" stroke="#F59E0B" strokeWidth="2" />
                                        <path d="M 2 18 Q -10 45, -18 70" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
                                    </g>
                                )}

                                {/* KORONARARTERIER */}
                                {showCoronary && (
                                    <g id="coronaries" opacity="0.85">
                                        <path d="M -26 0 C -45 10, -55 35, -42 62" fill="none" stroke="#F97316" strokeWidth="2.4" strokeLinecap="round" />
                                        <path d="M 4 -2 C 2 25, 8 60, 30 102" fill="none" stroke="#DC2626" strokeWidth="2.8" strokeLinecap="round" />
                                        <path d="M 12 -4 C 32 -2, 52 18, 48 45" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" />
                                    </g>
                                )}

                                {/* ANATOMISKE MÆRKATER */}
                                {showAnatomyLabels && (
                                    <g id="anatomyLabels" className="font-sans text-[8.5px] font-bold select-none pointer-events-none">
                                        <text x="-75" y="-5" fill="#1E3A8A">Højre Atrie</text>
                                        <text x="-65" y="70" fill="#1E3A8A">Højre Ventrikel</text>
                                        <text x="50" y="-8" fill="#881337">Venstre Atrie</text>
                                        <text x="52" y="60" fill="#881337">Venstre Ventrikel</text>
                                        <text x="36" y="130" fill="#78350F" textAnchor="middle">Apeks (+60°)</text>
                                    </g>
                                )}
                            </g>

                            {/* 5. DE 6 BOLD CABRERA VEKTOR-PILE MED VINKLER OG MINI-EKG KURVER (IMAGE 2) */}
                            {CABRERA_LEADS.map(lead => {
                                const isSel = selectedLead === lead.name;
                                const isAffected = activeCase.affectedLeads && activeCase.affectedLeads.includes(lead.name);

                                return (
                                    <g
                                        key={lead.name}
                                        className="cursor-pointer transition-all"
                                        onClick={() => handleSelectLead(lead.name)}
                                    >
                                        <line
                                            x1="0"
                                            y1="0"
                                            x2={lead.tipX}
                                            y2={lead.tipY}
                                            stroke={isSel ? '#DC2626' : '#0F172A'}
                                            strokeWidth={isSel ? 3.5 : 2.5}
                                            markerEnd={isSel ? 'url(#selectedArrow)' : 'url(#cabreraArrow)'}
                                        />

                                        <text
                                            x={lead.labelX}
                                            y={lead.labelY}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fontFamily="sans-serif"
                                            fontWeight="bold"
                                            fill={isSel ? '#DC2626' : '#0F172A'}
                                        >
                                            {lead.degLabel}
                                        </text>

                                        <g transform={`translate(${lead.badgeX}, ${lead.badgeY})`}>
                                            <circle
                                                cx="0"
                                                cy="0"
                                                r={isSel ? 16 : 13}
                                                fill={isSel ? '#DC2626' : isAffected ? '#FEF3C7' : '#FFFFFF'}
                                                stroke={isSel ? '#991B1B' : isAffected ? '#D97706' : '#0F172A'}
                                                strokeWidth="2"
                                                className="shadow-md transition-all"
                                            />
                                            <text
                                                x="0"
                                                y="4"
                                                textAnchor="middle"
                                                fontSize={isSel ? '12' : '10'}
                                                fontWeight="bold"
                                                fill={isSel ? '#FFFFFF' : isAffected ? '#92400E' : '#0F172A'}
                                            >
                                                {lead.name}
                                            </text>

                                            <g transform="translate(16, -5)">
                                                <path
                                                    d={lead.miniPath}
                                                    fill="none"
                                                    stroke={isSel ? '#DC2626' : '#EF4444'}
                                                    strokeWidth="1.6"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                );
                            })}

                            {/* 6. DYNAMISK REALTIDS ELEKTRISK VEKTOR-PIL (DIPOL) MED PROJEKTION */}
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
                                        <line
                                            x1={vx}
                                            y1={vy}
                                            x2={px}
                                            y2={py}
                                            stroke="#DC2626"
                                            strokeWidth="1.5"
                                            strokeDasharray="3 3"
                                        />
                                        <circle cx={px} cy={py} r="4" fill="#DC2626" />

                                        <line
                                            x1="0"
                                            y1="0"
                                            x2={vx}
                                            y2={vy}
                                            stroke={currentPhase.vector.color}
                                            strokeWidth={Math.max(3, currentPhase.vector.magnitude * 6.5)}
                                            strokeLinecap="round"
                                            filter="url(#vectorGlow)"
                                            markerEnd="url(#vectorArrowHead)"
                                        />

                                        <g transform={`translate(${vx > 30 ? vx - 80 : vx + 10}, ${vy > 30 ? vy - 10 : vy + 15})`}>
                                            <rect x="0" y="0" width="85" height="20" rx="5" fill="#0F172A" fillOpacity="0.9" stroke={currentPhase.vector.color} strokeWidth="1" />
                                            <text x="42.5" y="13.5" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#FFFFFF">
                                                {currentPhase.wave} ({Math.round(currentPhase.vector.angle)}°)
                                            </text>
                                        </g>
                                    </g>
                                );
                            })()}
                        </svg>
                    ) : (
                        /* HORISONTALPLAN SVG: ANATOMISK TVÆRSNIT AF BRYSTKASSEN MED V1–V6 (T8 NIVEAU) */
                        <svg viewBox="-240 -240 480 480" className="w-full h-full max-h-[480px] select-none">
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

                            {[
                                { name: 'V1', angle: 110, x: -40, y: 170 },
                                { name: 'V2', angle: 80, x: 25, y: 170 },
                                { name: 'V3', angle: 60, x: 80, y: 150 },
                                { name: 'V4', angle: 45, x: 135, y: 115 },
                                { name: 'V5', angle: 20, x: 175, y: 70 },
                                { name: 'V6', angle: 0, x: 190, y: 15 }
                            ].map(lead => {
                                const isSel = selectedLead === lead.name;
                                const isAffected = activeCase.affectedLeads && activeCase.affectedLeads.includes(lead.name);

                                return (
                                    <g key={lead.name} className="cursor-pointer" onClick={() => handleSelectLead(lead.name)}>
                                        <line x1="15" y1="20" x2={lead.x} y2={lead.y} stroke={isSel ? '#DC2626' : '#94A3B8'} strokeWidth={isSel ? 3 : 1.5} strokeDasharray={isSel ? 'none' : '4 3'} />
                                        <circle cx={lead.x} cy={lead.y} r={isSel ? 16 : 13} fill={isSel ? '#DC2626' : isAffected ? '#FEF3C7' : '#FFFFFF'} stroke={isSel ? '#991B1B' : isAffected ? '#D97706' : '#0F172A'} strokeWidth="2" />
                                        <text x={lead.x} y={lead.y + 4} textAnchor="middle" fontSize={isSel ? '12' : '10'} fontWeight="bold" fill={isSel ? '#FFFFFF' : isAffected ? '#92400E' : '#0F172A'}>
                                            {lead.name}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    )}

                    {/* Hurtigt badge i hjørnet med aktuel fase */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#E8E4D9] shadow-sm flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: currentPhase.vector.color }}></div>
                        <span className="text-xs font-bold text-[#3A4A40]">{currentPhase.name}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-[#E2E8DF] text-[#3A4A40]">{currentPhase.wave}</span>
                    </div>

                    {/* Kontrolknapper til visningslag */}
                    <div className="absolute bottom-3 right-3 flex flex-wrap gap-2">
                        <button
                            onClick={() => setShowAxisSectors(!showAxisSectors)}
                            className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${showAxisSectors ? 'bg-[#839788] text-white border-[#6A7A6E]' : 'bg-white/90 text-[#839788] border-[#E8E4D9]'}`}
                            title="Vis/skjul de 4 aksekvadranter (Normal / LAD / RAD / Ekstrem)"
                        >
                            Aksekvadranter
                        </button>
                        <button
                            onClick={() => setShowAnatomyLabels(!showAnatomyLabels)}
                            className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${showAnatomyLabels ? 'bg-[#839788] text-white border-[#6A7A6E]' : 'bg-white/90 text-[#839788] border-[#E8E4D9]'}`}
                            title="Tænd/sluk anatomiske mærkater på hjertet"
                        >
                            Mærkater
                        </button>
                        <button
                            onClick={() => setShowCoronary(!showCoronary)}
                            className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${showCoronary ? 'bg-[#839788] text-white border-[#6A7A6E]' : 'bg-white/90 text-[#839788] border-[#E8E4D9]'}`}
                            title="Tænd/sluk koronararterier (RCA, LAD, LCx)"
                        >
                            Koronarer
                        </button>
                        <button
                            onClick={() => setShowConduction(!showConduction)}
                            className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${showConduction ? 'bg-[#839788] text-white border-[#6A7A6E]' : 'bg-white/90 text-[#839788] border-[#E8E4D9]'}`}
                            title="Tænd/sluk ledningssystem"
                        >
                            Ledning
                        </button>
                    </div>
                </div>

                {/* TIDSLINJE-KONTROL & HASTIGHED (ROLIG UNDERVISNINGSHASTIGHED) */}
                <div className="space-y-3 pt-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        {/* Kontrolknapper */}
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
                                className="px-4 py-2 rounded-xl bg-[#839788] text-white hover:bg-[#6A7A6E] transition-colors shadow-sm flex items-center gap-1.5 font-bold text-xs"
                                title={isPlaying ? 'Pause' : 'Afspil'}
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
                                onClick={() => { setIsPlaying(false); setCycleTime(50); }}
                                className="p-2 rounded-xl bg-[#F2F6F3] text-[#839788] hover:text-[#3A4A40] transition-colors border border-[#E8E4D9]"
                                title="Nulstil til P-tak (50 ms)"
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
                            <span className="text-[11px] font-bold text-[#839788] mr-1 hidden sm:inline">Fart:</span>
                            <div className="flex gap-1 bg-[#F2F6F3] p-1 rounded-xl border border-[#E8E4D9] text-xs">
                                {[
                                    { speed: 0.15, label: '0.15x' },
                                    { speed: 0.25, label: '0.25x (Rolig)' },
                                    { speed: 0.5, label: '0.5x' },
                                    { speed: 1.0, label: '1x (Realtid)' }
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
                            const isCurrent = Math.abs(cycleTime - phase.time) < 45;
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

            {/* HØJRE SØJLE: VEKTOR-PROJEKTION, AFLEDNINGSINSPEKTION & KLINISK TOLKNING */}
            <div className="w-full lg:w-[380px] flex flex-col gap-4">
                {/* Valgt Afledningskort */}
                <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/85 shadow-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8E4D9]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-[#DC2626] text-white font-black text-lg flex items-center justify-center shadow-xs">
                                {selectedLead}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-[#3A4A40]">Afledning {selectedLead}</h3>
                                <p className="text-xs text-[#839788]">Vinkel: {leadInfo.angle}° • {leadInfo.wall}</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#E2E8DF] text-[#3A4A40]">
                            {leadInfo.plane === 'frontal' ? 'Frontal' : 'Horisontal'}
                        </span>
                    </div>

                    {/* Vektor-Projektion Display */}
                    <div className="my-4 p-3.5 rounded-2xl bg-[#F9F8F6] border border-[#E8E4D9] flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-[#839788] font-bold">Vektor-retning:</span>
                            <span className="font-mono font-bold text-[#1E293B]">{Math.round(activeVector.angle)}°</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-[#839788] font-bold">Vektor-størrelse:</span>
                            <span className="font-mono font-bold text-[#1E293B]">{(activeVector.magnitude * 100).toFixed(0)}%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-2 border-t border-[#E8E4D9]">
                            <span className="text-[#3A4A40] font-bold">Projektion på {selectedLead}:</span>
                            <span className={`font-mono font-bold text-sm ${projectedVoltage > 0.05 ? 'text-emerald-600' : projectedVoltage < -0.05 ? 'text-rose-600' : 'text-[#64748B]'}`}>
                                {projectedVoltage > 0.05 ? `+${(projectedVoltage * 100).toFixed(0)}% (Positiv)` : projectedVoltage < -0.05 ? `${(projectedVoltage * 100).toFixed(0)}% (Negativ)` : '0% (Bifasisk)'}
                            </span>
                        </div>
                    </div>

                    {/* Afledningens Beskrivelse */}
                    <p className="text-xs text-[#64748B] leading-relaxed">
                        {leadInfo.desc}
                    </p>
                </div>

                {/* Hjerteakse Tolkningskort */}
                <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/85 shadow-sm flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#3A4A40]">
                        <Compass className="w-4 h-4 text-[#839788]" />
                        <span>Hjerteakse Beregning (QRS-akse)</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] mt-1">
                        <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
                            <strong className="block text-xs font-bold text-rose-700">Normal akse</strong>
                            -30° til +90° (QRS positiv i I og aVF)
                        </div>
                        <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                            <strong className="block text-xs font-bold text-emerald-700">LAD (Venstre)</strong>
                            -30° til -90° (Positiv i I, negativ i aVF/II)
                        </div>
                        <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-950">
                            <strong className="block text-xs font-bold text-sky-700">RAD (Højre)</strong>
                            +90° til +180° (Negativ i I, positiv i aVF)
                        </div>
                        <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                            <strong className="block text-xs font-bold text-amber-700">Nordvest-akse</strong>
                            -90° til -180° (Ekstrem akseafvigelse)
                        </div>
                    </div>

                    <p className="text-[11px] text-[#839788] italic mt-1">
                        * I denne case ({activeCase.title}) er hovedaksen: <strong>{activeCase.axis || 'Normal (+60°)'}</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
}
