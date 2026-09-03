import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity, Layers, Info, Compass, Sparkles, ChevronRight, AlertTriangle } from '../Icons';
import { LEAD_DETAILS, EKG_CASES } from '../../data/ekgCases';

/**
 * Autentisk Cabrera Hexaksial Hjertemodel (The Physiological Society standard)
 * 
 * Nøgletræk verificeret mod The Physiological Society ("Trigonometry of the ECG"):
 * 1. Central 4-kammer anatomisk model:
 *    - Højre side (RA & RV): Lyst lysende venøs blå/cyan.
 *    - Venstre side (LA & LV): Lyst lysende arteriel rød/pink.
 *    - Gylden/ravfarvet myokardievæg med apeks peget præcist mod +60° (Afledning II).
 *    - Aortabuen superiort med 3 hovedafgange og Vena Cava / Pulmonalis i blå.
 * 2. Cabrera hexaksial cirkel med 12 radiale eger (hver 30°).
 * 3. 6 markante sorte vektor-pile med nøjagtige vinkler:
 *    - I (0°), II (+60°), aVF (+90°), III (+120°), aVR (-150°), aVL (-30°).
 *    - Tydelige vinkelangivelser placeret frit og læseligt inden for cirklen.
 *    - Røde mini-EKG kurver ved hver pilespids uden for cirklen.
 * 4. Pauseret som standard:
 *    - Brugeren mødes af et knivskarpt, roligt og stabilt overblik.
 *    - Afspilning sker i ultra-roligt tempo (0.1x = ~8 sekunder per cyklus).
 *    - Faseknapper (P, PR, Q, R, S, T, Diastole) tillader trinvis inspektion.
 */
export default function EkgHeartModel({ selectedLead = 'II', onSelectLead, caseData, activeCase: propActiveCase }) {
    const activeCase = propActiveCase || caseData || EKG_CASES[0];
    const [viewMode, setViewMode] = useState(() => {
        return LEAD_DETAILS[selectedLead]?.plane || 'frontal';
    });

    // PAUSERET VED START for ro og overblik (brugeren starter selv når ønsket)
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(0.1); // Roligt undervisningstempo (8.0s per hjertecyklus)
    const [cycleTime, setCycleTime] = useState(230); // Starter stabilt ved R-takken (hovedsystolen)
    const [showCoronary, setShowCoronary] = useState(true);
    const [showConduction, setShowConduction] = useState(true);
    const [showVector, setShowVector] = useState(true);
    const [showAxisSectors, setShowAxisSectors] = useState(false);
    const [showAnatomyLabels, setShowAnatomyLabels] = useState(false);

    const animationRef = useRef(null);
    const lastTimestampRef = useRef(null);
    const isScrubbingRef = useRef(false);

    // Fysiologiske faser i hjertecyklussen (800 ms per fysiologisk slag)
    const PHASES = [
        { name: 'P-tak (Atriedepolarisering)', time: 50, label: 'P-tak' },
        { name: 'PR-segment (AV-knudeforsinkelse)', time: 130, label: 'PR-segment' },
        { name: 'Q-tak (Septal aktivering)', time: 180, label: 'Q-tak' },
        { name: 'R-tak (Hovedsystole mod apeks)', time: 230, label: 'R-tak' },
        { name: 'S-tak (Basal aktivering)', time: 280, label: 'S-tak' },
        { name: 'T-tak (Ventrikelrepolarisation)', time: 450, label: 'T-tak' },
        { name: 'Diastole (Hvile og fyldning)', time: 650, label: 'Diastole' }
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
        setIsPlaying(false);
        setCycleTime(parseFloat(e.target.value));
    };

    // De 6 Cabrera ekstremitetsafledninger direkte fra The Physiological Society
    const CABRERA_LEADS = [
        {
            name: 'I',
            angle: 0,
            degLabel: '0°',
            degX: 135,
            degY: -9,
            tipX: 165,
            tipY: 0,
            labelX: 200,
            labelY: 5,
            labelAnchor: 'start',
            miniPath: 'M 168 0 L 173 0 L 174 2 L 176 -9 L 178 3 L 180 0 L 186 0'
        },
        {
            name: 'II',
            angle: 60,
            degLabel: '60°',
            degX: 82,
            degY: 118,
            tipX: 82.5,
            tipY: 142.9,
            labelX: 110,
            labelY: 185,
            labelAnchor: 'middle',
            miniPath: 'M 76 150 L 80 150 L 82 153 L 85 133 L 88 155 L 90 150 L 98 150'
        },
        {
            name: 'aVF',
            angle: 90,
            degLabel: '90°',
            degX: 18,
            degY: 145,
            tipX: 0,
            tipY: 165,
            labelX: 0,
            labelY: 202,
            labelAnchor: 'middle',
            miniPath: 'M -12 172 L -6 172 L -4 174 L -2 161 L 0 176 L 2 172 L 10 172'
        },
        {
            name: 'III',
            angle: 120,
            degLabel: '120°',
            degX: -52,
            degY: 132,
            tipX: -82.5,
            tipY: 142.9,
            labelX: -110,
            labelY: 185,
            labelAnchor: 'middle',
            miniPath: 'M -98 152 L -93 152 L -91 150 L -89 158 L -87 149 L -85 152 L -78 152'
        },
        {
            name: 'aVR',
            angle: -150,
            degLabel: '-150°',
            degX: -105,
            degY: -60,
            tipX: -142.9,
            tipY: -82.5,
            labelX: -185,
            labelY: -95,
            labelAnchor: 'end',
            miniPath: 'M -168 -82 L -163 -82 L -161 -80 L -159 -68 L -157 -83 L -155 -82 L -148 -82'
        },
        {
            name: 'aVL',
            angle: -30,
            degLabel: '-30°',
            degX: 105,
            degY: -60,
            tipX: 142.9,
            tipY: -82.5,
            labelX: 185,
            labelY: -95,
            labelAnchor: 'start',
            miniPath: 'M 148 -82 L 153 -82 L 154 -80 L 156 -88 L 158 -81 L 160 -82 L 168 -82'
        }
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1400px] mx-auto">
            {/* VENSTRE SØJLE: DEN AUTENTISKE CABRERA HJERTEMODEL CANVAS */}
            <div className="flex-1 glass-panel rounded-3xl p-5 md:p-6 border border-[#E8E4D9] flex flex-col shadow-sm bg-white/95">
                {/* Topbar: Visningsvalg & Visningsplan */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E4D9]">
                    <div className="flex items-center gap-2.5">
                        <div className="bg-[#839788] p-2.5 rounded-xl text-white shadow-xs">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#3A4A40] leading-tight">Cabrera Hexaksial Hjertemodel</h2>
                            <p className="text-xs text-[#839788]">The Physiological Society standard • Vektororientering i frontalplanet</p>
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

                {/* DET CENTRALE MODELOMRÅDE (SVG CIRKEL & HJERTE) */}
                <div className="relative w-full h-[440px] sm:h-[500px] my-3 flex items-center justify-center bg-gradient-to-b from-[#FAFAF9] to-[#F1F5F9] rounded-3xl overflow-hidden border-2 border-[#E2E8F0] shadow-inner">
                    {viewMode === 'frontal' ? (
                        /* FRONTALPLAN SVG: AUTENTISK CABRERA CIRKEL IDENTISK MED THE PHYSIOLOGICAL SOCIETY */
                        <svg viewBox="-260 -260 520 520" className="w-full h-full max-h-[500px] select-none">
                            <defs>
                                <marker id="cabreraArrow" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
                                    <path d="M 1 2 L 11 6 L 1 10 z" fill="#000000" />
                                </marker>
                                <marker id="selectedArrow" viewBox="0 0 12 12" refX="9" refY="6" markerWidth="8.5" markerHeight="8.5" orient="auto-start-reverse">
                                    <path d="M 1 2 L 11 6 L 1 10 z" fill="#DC2626" />
                                </marker>
                                <marker id="vectorArrowHead" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={currentPhase.vector.color} />
                                </marker>

                                {/* Gylden/ravfarvet myokardievæg */}
                                <radialGradient id="wallGrad" cx="45%" cy="45%" r="65%">
                                    <stop offset="0%" stopColor="#FCD34D" />
                                    <stop offset="40%" stopColor="#F59E0B" />
                                    <stop offset="85%" stopColor="#D97706" />
                                    <stop offset="100%" stopColor="#B45309" />
                                </radialGradient>

                                {/* Højre Hjertekamre (Venøst blod: Lysende cyan/blå) */}
                                <radialGradient id="rightHeartGrad" cx="35%" cy="35%" r="65%">
                                    <stop offset="0%" stopColor="#7DD3FC" />
                                    <stop offset="45%" stopColor="#0284C7" />
                                    <stop offset="100%" stopColor="#0369A1" />
                                </radialGradient>

                                {/* Venstre Hjertekamre (Arterielt blod: Lysende rød/pink) */}
                                <radialGradient id="leftHeartGrad" cx="45%" cy="35%" r="65%">
                                    <stop offset="0%" stopColor="#FDA4AF" />
                                    <stop offset="45%" stopColor="#E11D48" />
                                    <stop offset="100%" stopColor="#9F1239" />
                                </radialGradient>

                                {/* Aorta Ascendens & Arcus */}
                                <linearGradient id="aortaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" stopColor="#E11D48" />
                                    <stop offset="100%" stopColor="#BE123C" />
                                </linearGradient>

                                {/* Vena Cava / Pulmonalarterie */}
                                <linearGradient id="venaCavaGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" stopColor="#0284C7" />
                                    <stop offset="100%" stopColor="#0369A1" />
                                </linearGradient>

                                <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="1" dy="5" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.18" />
                                </filter>
                                <filter id="vectorGlow" x="-30%" y="-30%" width="160%" height="160%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* 1. CABRERA CIRKEL (R = 175 PX) */}
                            <circle cx="0" cy="0" r="175" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
                            <circle cx="0" cy="0" r="120" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                            <circle cx="0" cy="0" r="60" fill="none" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />

                            {/* 2. DE 4 AKSEKVADRANTER (SOM VIST I IMAGE 2) */}
                            {showAxisSectors && (
                                <g id="axisSectors" opacity="0.5">
                                    {/* Normal Akse: -30° til +90° (Pink sektor) */}
                                    <path d="M 0 0 L 151.5 -87.5 A 175 175 0 0 1 0 175 Z" fill="#FCE7F3" stroke="#F43F5E" strokeWidth="0.5" />
                                    {/* LAD: -30° til -90° (Grøn sektor) */}
                                    <path d="M 0 0 L 151.5 -87.5 A 175 175 0 0 0 0 -175 Z" fill="#DCFCE7" stroke="#22C55E" strokeWidth="0.5" />
                                    {/* RAD: +90° til +180° (Blå sektor) */}
                                    <path d="M 0 0 L 0 175 A 175 175 0 0 1 -175 0 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="0.5" />
                                    {/* Ekstrem Akseafvigelse: -90° til -180° (Gul sektor) */}
                                    <path d="M 0 0 L -175 0 A 175 175 0 0 1 0 -175 Z" fill="#FEF9C3" stroke="#EAB308" strokeWidth="0.5" />
                                </g>
                            )}

                            {/* 3. ALLE 12 RADIALE EGER HVER 30 GRADER */}
                            <line x1="-175" y1="0" x2="175" y2="0" stroke="#94A3B8" strokeWidth="1.2" />
                            <line x1="0" y1="-175" x2="0" y2="175" stroke="#94A3B8" strokeWidth="1.2" />
                            <line x1="-151.5" y1="-87.5" x2="151.5" y2="87.5" stroke="#94A3B8" strokeWidth="1.2" />
                            <line x1="-87.5" y1="-151.5" x2="87.5" y2="151.5" stroke="#94A3B8" strokeWidth="1.2" />
                            <line x1="-151.5" y1="87.5" x2="151.5" y2="-87.5" stroke="#94A3B8" strokeWidth="1.2" />
                            <line x1="-87.5" y1="151.5" x2="87.5" y2="-151.5" stroke="#94A3B8" strokeWidth="1.2" />

                            {/* 4. DET CENTRALE ANATOMISKE 4-KAMMER HJERTE (THE PHYSIOLOGICAL SOCIETY) */}
                            <g id="centralAnatomy" filter="url(#heartShadow)">
                                {/* STORE KAR SUPERIORT */}
                                {/* Vena Cava Superior (Blå) */}
                                <path d="M -34 -45 L -34 -100 C -34 -106, -18 -106, -18 -100 L -18 -45 Z" fill="url(#venaCavaGrad)" stroke="#0284C7" strokeWidth="1.5" />
                                <ellipse cx="-26" cy="-100" rx="8" ry="3" fill="#38BDF8" />

                                {/* Aorta Ascendens & Arcus (Rød) med 3 grene */}
                                <path d="M -14 -40 C -14 -85, -10 -130, 8 -130 C 26 -130, 30 -95, 30 -40 L 16 -40 C 16 -80, 12 -114, 8 -114 C 2 -114, 0 -80, 0 -40 Z"
                                      fill="url(#aortaGrad)" stroke="#9F1239" strokeWidth="1.5" />
                                <path d="M -5 -127 L -8 -144 L -1 -144 L 0 -129 Z" fill="url(#aortaGrad)" stroke="#9F1239" strokeWidth="1" />
                                <path d="M 5 -130 L 5 -146 L 11 -146 L 10 -130 Z" fill="url(#aortaGrad)" stroke="#9F1239" strokeWidth="1" />
                                <path d="M 16 -126 L 20 -142 L 26 -142 L 21 -124 Z" fill="url(#aortaGrad)" stroke="#9F1239" strokeWidth="1" />

                                {/* Truncus Pulmonalis (Krydser foran aorta) */}
                                <path d="M -22 -35 C -25 -58, -16 -75, 2 -80 C 18 -82, 22 -68, 14 -56 C 6 -45, -2 -30, -4 -15 Z" fill="url(#venaCavaGrad)" stroke="#0284C7" strokeWidth="1.2" />

                                {/* YDRE MYOKARDIEKONTUR (GYLDEN/RAVFARVET MUSKELVÆG, APEKS MOD +60°) */}
                                <path d="M -52 -35 C -84 -18, -90 32, -65 74 C -45 106, 12 135, 62 118 C 76 112, 85 96, 85 70 C 85 24, 76 -14, 48 -30 C 30 -42, -22 -44, -52 -35 Z"
                                      fill="url(#wallGrad)" stroke="#B45309" strokeWidth="2.5" />

                                {/* INTERVENTRIKULÆRT SEPTUM (Går fra (0,0) mod apeks ved +60°) */}
                                <path d="M -4 -8 C -4 20, 12 60, 48 108 L 58 102 C 24 56, 14 18, 8 -8 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.2" />

                                {/* 4 INDRE HJERTEKAMRE MED LYSE FARVER */}
                                {/* Højre Atrie (RA) - Blå */}
                                <path d="M -45 -26 C -66 -16, -68 5, -52 18 C -38 22, -26 16, -20 4 C -16 -8, -26 -22, -45 -26 Z"
                                      fill="url(#rightHeartGrad)" stroke="#38BDF8" strokeWidth="2" />

                                {/* Højre Ventrikel (RV) - Blå */}
                                <path d="M -46 25 C -62 55, -36 82, 18 104 C 4 72, -2 45, -8 24 C -20 20, -34 18, -46 25 Z"
                                      fill="url(#rightHeartGrad)" stroke="#38BDF8" strokeWidth="2" />

                                {/* Venstre Atrie (LA) - Rød */}
                                <path d="M 18 -20 C 22 -28, 48 -24, 52 -8 C 56 6, 44 14, 28 12 C 22 8, 19 -4, 18 -20 Z"
                                      fill="url(#leftHeartGrad)" stroke="#FB7185" strokeWidth="2" />

                                {/* Venstre Ventrikel (LV) - Rød (Tyk muskelvæg, apeks mod +60°) */}
                                <path d="M 18 14 C 18 48, 28 80, 48 102 C 64 80, 72 48, 56 18 C 45 8, 28 8, 18 14 Z"
                                      fill="url(#leftHeartGrad)" stroke="#FB7185" strokeWidth="2" />

                                {/* LEDNINGSSYSTEM */}
                                {showConduction && (
                                    <g id="conductionSystem">
                                        <circle cx="0" cy="0" r="5.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
                                        <circle cx="-40" cy="-12" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
                                        <path d="M -38 -10 Q -20 -2, 0 0" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" />
                                        <path d="M 0 0 L 4 15 Q 16 52, 45 100" fill="none" stroke="#F59E0B" strokeWidth="2.2" />
                                    </g>
                                )}

                                {/* KORONARARTERIER */}
                                {showCoronary && (
                                    <g id="coronaries" opacity="0.85">
                                        <path d="M 0 0 Q 18 52, 48 102" fill="none" stroke="#DC2626" strokeWidth="2.6" strokeLinecap="round" />
                                        <path d="M -22 -10 C -42 0, -56 25, -45 55" fill="none" stroke="#F97316" strokeWidth="2.2" strokeLinecap="round" />
                                        <path d="M 22 -10 C 44 0, 58 25, 48 55" fill="none" stroke="#2563EB" strokeWidth="2.0" strokeLinecap="round" />
                                    </g>
                                )}

                                {/* ANATOMISKE MÆRKATER */}
                                {showAnatomyLabels && (
                                    <g id="anatomyLabels" className="font-sans text-[8.5px] font-bold select-none pointer-events-none">
                                        <text x="-52" y="-5" fill="#0369A1">RA</text>
                                        <text x="-52" y="60" fill="#0369A1">RV</text>
                                        <text x="36" y="-5" fill="#9F1239">LA</text>
                                        <text x="38" y="60" fill="#9F1239">LV</text>
                                        <text x="75" y="125" fill="#B45309" textAnchor="middle">Apeks (+60°)</text>
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
                                        {/* Solid sort vektor-pil fra (0,0) ud til cirklen */}
                                        <line
                                            x1="0"
                                            y1="0"
                                            x2={lead.tipX}
                                            y2={lead.tipY}
                                            stroke={isSel ? '#DC2626' : '#000000'}
                                            strokeWidth={isSel ? 3.5 : 2.6}
                                            markerEnd={isSel ? 'url(#selectedArrow)' : 'url(#cabreraArrow)'}
                                        />

                                        {/* Vinkel-tekst inden for cirklen (0°, 60°, 90°, 120°, -150°, -30°) */}
                                        <text
                                            x={lead.degX}
                                            y={lead.degY}
                                            textAnchor="middle"
                                            fontSize="12"
                                            fontFamily="sans-serif"
                                            fontWeight="bold"
                                            fill={isSel ? '#DC2626' : '#000000'}
                                        >
                                            {lead.degLabel}
                                        </text>

                                        {/* Afledningsnavn uden for cirklen (I, II, aVF, III, aVR, aVL) */}
                                        <text
                                            x={lead.labelX}
                                            y={lead.labelY}
                                            textAnchor={lead.labelAnchor}
                                            fontSize={isSel ? '18' : '16'}
                                            fontFamily="sans-serif"
                                            fontWeight="900"
                                            fill={isSel ? '#DC2626' : isAffected ? '#D97706' : '#000000'}
                                            className="transition-all"
                                        >
                                            {lead.name}
                                        </text>

                                        {/* Rød mini-EKG kurve ved pilespidsen (Image 2 standard) */}
                                        <path
                                            d={lead.miniPath}
                                            fill="none"
                                            stroke={isSel ? '#DC2626' : '#EF4444'}
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
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
                        <svg viewBox="-240 -240 480 480" className="w-full h-full max-h-[500px] select-none">
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
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentPhase.vector.color }}></div>
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
                            title="Tænd/sluk mærkater på hjertet"
                        >
                            Mærkater
                        </button>
                        <button
                            onClick={() => setShowCoronary(!showCoronary)}
                            className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${showCoronary ? 'bg-[#839788] text-white border-[#6A7A6E]' : 'bg-white/90 text-[#839788] border-[#E8E4D9]'}`}
                            title="Tænd/sluk kranspulsårer (RCA, LAD, LCx)"
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
                                onClick={() => { setIsPlaying(false); setCycleTime(230); }}
                                className="p-2 rounded-xl bg-[#F2F6F3] text-[#839788] hover:text-[#3A4A40] transition-colors border border-[#E8E4D9]"
                                title="Nulstil til R-takken (230 ms)"
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

                    {/* Fysiologisk Beskrivelse af den Valgte Afledning */}
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
