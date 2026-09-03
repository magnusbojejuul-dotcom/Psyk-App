import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, Pause, RotateCcw, Activity, Layers, Info, Compass, Sparkles, ChevronRight, AlertTriangle } from '../Icons';
import { LEAD_DETAILS, EKG_CASES, generateLeadWaveform } from '../../data/ekgCases';

export default function EkgHeartModel({ selectedLead = 'II', onSelectLead, caseData }) {
    const activeCase = caseData || EKG_CASES[0];
    const [viewMode, setViewMode] = useState(() => {
        return LEAD_DETAILS[selectedLead]?.plane || 'frontal';
    });
    const [isPlaying, setIsPlaying] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.25, 0.5, 1, 2
    const [cycleTime, setCycleTime] = useState(220); // 0 to 800 ms
    const [showCoronary, setShowCoronary] = useState(true);
    const [showConduction, setShowConduction] = useState(true);
    const [showVector, setShowVector] = useState(true);

    const animationRef = useRef(null);
    const lastTimestampRef = useRef(null);
    const isScrubbingRef = useRef(false);

    // Hjertecyklus animation loop (800 ms per cyklus ved 75 bpm)
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

    // Beregning af hjertecyklusens fase og vektor
    const getCardiacPhase = (t) => {
        if (t >= 0 && t < 100) {
            return {
                name: 'Atriedepolarisering',
                wave: 'P-tak',
                desc: 'SA-knuden affyrer og den elektriske bølge spreder sig gennem højre og venstre atrium.',
                activeNodes: ['sa', 'atria'],
                vector: { angle: 55, magnitude: Math.sin((t / 100) * Math.PI) * 0.45, color: '#3B82F6' },
                highlightWall: 'Atrier'
            };
        } else if (t >= 100 && t < 160) {
            return {
                name: 'AV-knude forsinkelse',
                wave: 'PR-segment',
                desc: 'Fysiologisk forsinkelse i AV-knuden sikrer, at atrierne tømmer blodet i ventriklerne før sammentrækning.',
                activeNodes: ['av'],
                vector: { angle: 60, magnitude: 0.05, color: '#94A3B8' },
                highlightWall: 'AV-knude'
            };
        } else if (t >= 160 && t < 200) {
            const prog = (t - 160) / 40;
            return {
                name: 'Septal depolarisering',
                wave: 'Q-tak (lille initial vektor)',
                desc: 'Venstre grenbundt aktiverer septum først. Vektoren løber fra venstre mod højre gennem septum.',
                activeNodes: ['his', 'septum'],
                vector: { angle: -45, magnitude: Math.sin(prog * Math.PI) * 0.35, color: '#F59E0B' },
                highlightWall: 'Septum'
            };
        } else if (t >= 200 && t < 260) {
            const prog = (t - 200) / 60;
            return {
                name: 'Ventrikeldepolarisering (Hovedmasse)',
                wave: 'R-tak (hovedvektor)',
                desc: 'Venstre og højre ventrikel aktiveres via Purkinje-fibrene. Den tykke venstre ventrikel dominerer og trækker vektoren stærkt mod venstre apeks.',
                activeNodes: ['bundle_left', 'bundle_right', 'purkinje', 'ventricle_free_walls'],
                vector: { angle: 65, magnitude: Math.sin(prog * Math.PI) * 1.0, color: '#EF4444' },
                highlightWall: 'Apeks / Venstre ventrikel'
            };
        } else if (t >= 260 && t < 300) {
            const prog = (t - 260) / 40;
            return {
                name: 'Basal ventrikelaktivering',
                wave: 'S-tak',
                desc: 'De allersidste dele af ventrikelbasis mod atrioventrikulærgrænsen depolariserer i opadgående retning.',
                activeNodes: ['base'],
                vector: { angle: -110, magnitude: Math.sin(prog * Math.PI) * 0.3, color: '#8B5CF6' },
                highlightWall: 'Basal ventrikel'
            };
        } else if (t >= 380 && t < 520) {
            const prog = (t - 380) / 140;
            return {
                name: 'Ventrikelrepolarisation',
                wave: 'T-tak',
                desc: 'Ventriklerne genvinder deres hvilepotentiale fra epikardiet mod endokardiet. Da repolariseringsbølgen har modsat ladning og modsat retning, er T-vektoren positiv!',
                activeNodes: ['repolarization'],
                vector: { angle: 55, magnitude: Math.sin(prog * Math.PI) * 0.55, color: '#10B981' },
                highlightWall: 'Hele ventrikelmyokardiet'
            };
        } else {
            return {
                name: 'Elektrisk hvilefase (Diastole)',
                wave: 'Isoelektrisk grundlinje (TP-segment)',
                desc: 'Myokardiet er fuldstændigt repolariseret og hviler. Kamrene fyldes med blod.',
                activeNodes: [],
                vector: { angle: 0, magnitude: 0, color: '#94A3B8' },
                highlightWall: 'Hvile'
            };
        }
    };

    const currentPhase = getCardiacPhase(cycleTime);

    // Beregn den aktuelle spænding projiceret på den valgte afledning
    const leadInfo = LEAD_DETAILS[selectedLead] || LEAD_DETAILS['II'];
    const leadAngleRad = (leadInfo.angle * Math.PI) / 180;
    const vectorAngleRad = (currentPhase.vector.angle * Math.PI) / 180;
    // Skalarprodukt af vektor på afledningsakse
    const projectedVoltage = currentPhase.vector.magnitude * Math.cos(vectorAngleRad - leadAngleRad);

    const handleScrub = (e) => {
        setCycleTime(parseFloat(e.target.value));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1400px] mx-auto">
            {/* Venstre Søjle: Den Interaktive Hjertemodel Canvas/SVG */}
            <div className="flex-1 glass-panel rounded-3xl p-5 md:p-7 border border-[#E8E4D9] flex flex-col shadow-sm bg-white/80">
                {/* Topbar: Visningsvalg & Visningsfiltre */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8E4D9]">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#839788] p-2 rounded-xl text-white">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#3A4A40] leading-tight">Interaktiv Hjertemodel & Vektorer</h2>
                            <p className="text-xs text-[#839788]">Realtids-visualisering af hjertevektorer og 12-afledningsprojektion</p>
                        </div>
                    </div>

                    {/* Faneblade for Visningsplan */}
                    <div className="flex bg-[#F2F6F3] p-1 rounded-2xl border border-[#E8E4D9] text-xs font-semibold">
                        <button
                            onClick={() => setViewMode('frontal')}
                            className={`px-3 py-1.5 rounded-xl transition-all ${viewMode === 'frontal' ? 'bg-white text-[#3A4A40] shadow-sm font-bold' : 'text-[#839788] hover:text-[#3A4A40]'}`}
                        >
                            Frontalplan (Cabrera)
                        </button>
                        <button
                            onClick={() => setViewMode('horizontal')}
                            className={`px-3 py-1.5 rounded-xl transition-all ${viewMode === 'horizontal' ? 'bg-white text-[#3A4A40] shadow-sm font-bold' : 'text-[#839788] hover:text-[#3A4A40]'}`}
                        >
                            Horisontalplan (V1–V6)
                        </button>
                    </div>
                </div>

                {/* Modelområde med SVG */}
                <div className="relative w-full h-[400px] sm:h-[460px] my-3 flex items-center justify-center bg-gradient-to-b from-[#F9F8F6] to-[#EFF3F0] rounded-2xl overflow-hidden border border-[#E8E4D9]">
                    {viewMode === 'frontal' ? (
                        /* Frontal Plan SVG: Hjertet + Cabrera Hexaksial Cirkel */
                        <svg viewBox="-220 -220 440 440" className="w-full h-full max-h-[460px] select-none">
                            <defs>
                                <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#839788" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="#839788" stopOpacity="0" />
                                </radialGradient>
                                <linearGradient id="vectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={currentPhase.vector.color} />
                                    <stop offset="100%" stopColor="#DC2626" />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* Baggrundscirkel / Cabrera Kreds */}
                            <circle cx="0" cy="0" r="180" fill="url(#heartGlow)" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />
                            <circle cx="0" cy="0" r="120" fill="none" stroke="#E2E8F0" strokeWidth="1" />

                            {/* Akse-sektorer (Normal, LAD, RAD, Ekstrem) */}
                            {/* Normal akse: -30° til +90° */}
                            <path d="M 0 0 L 155.8 -89.9 A 180 180 0 0 1 0 180 Z" fill="#10B981" fillOpacity="0.06" />
                            {/* Venstredrejet akse (LAD): -30° til -90° */}
                            <path d="M 0 0 L 155.8 -89.9 A 180 180 0 0 0 0 -180 Z" fill="#F59E0B" fillOpacity="0.06" />
                            {/* Højredrejet akse (RAD): +90° til +180° */}
                            <path d="M 0 0 L 0 180 A 180 180 0 0 1 -180 0 Z" fill="#F97316" fillOpacity="0.06" />
                            {/* Ekstrem akse: -90° til -180° */}
                            <path d="M 0 0 L -180 0 A 180 180 0 0 1 0 -180 Z" fill="#8B5CF6" fillOpacity="0.06" />

                            {/* Ekstremitetsaflednings-akser med etiketter */}
                            {[
                                { name: 'I', angle: 0, label: 'I (0°)', x: 195, y: 5 },
                                { name: 'II', angle: 60, label: 'II (+60°)', x: 105, y: 175 },
                                { name: 'III', angle: 120, label: 'III (+120°)', x: -105, y: 175 },
                                { name: 'aVR', angle: -150, label: 'aVR (-150°)', x: -175, y: -95 },
                                { name: 'aVL', angle: -30, label: 'aVL (-30°)', x: 175, y: -95 },
                                { name: 'aVF', angle: 90, label: 'aVF (+90°)', x: 0, y: 200 }
                            ].map(axis => {
                                const rad = (axis.angle * Math.PI) / 180;
                                const x2 = Math.cos(rad) * 180;
                                const y2 = Math.sin(rad) * 180;
                                const isSel = selectedLead === axis.name;
                                const isAffected = activeCase.affectedLeads && activeCase.affectedLeads.includes(axis.name);

                                return (
                                    <g key={axis.name} className="cursor-pointer" onClick={() => handleSelectLead(axis.name)}>
                                        <line
                                            x1="0"
                                            y1="0"
                                            x2={x2}
                                            y2={y2}
                                            stroke={isSel ? '#DC2626' : isAffected ? '#F59E0B' : '#94A3B8'}
                                            strokeWidth={isSel ? 3.5 : isAffected ? 2.5 : 1.5}
                                            strokeDasharray={isSel ? 'none' : isAffected ? '4 2' : '3 3'}
                                        />
                                        <circle
                                            cx={x2}
                                            cy={y2}
                                            r={isSel ? 16 : 13}
                                            fill={isSel ? '#DC2626' : isAffected ? '#FEF3C7' : '#F1F5F9'}
                                            stroke={isSel ? '#991B1B' : isAffected ? '#D97706' : '#64748B'}
                                            strokeWidth="2"
                                            className="transition-all"
                                        />
                                        <text
                                            x={x2}
                                            y={y2 + 4}
                                            textAnchor="middle"
                                            fontSize={isSel ? "11" : "9"}
                                            fontWeight="bold"
                                            fill={isSel ? '#FFFFFF' : isAffected ? '#92400E' : '#334155'}
                                        >
                                            {axis.name}
                                        </text>
                                        <text
                                            x={axis.x}
                                            y={axis.y}
                                            textAnchor="middle"
                                            fontSize="9"
                                            fill={isSel ? '#DC2626' : isAffected ? '#D97706' : '#64748B'}
                                            fontWeight={isSel || isAffected ? 'bold' : 'normal'}
                                        >
                                            {axis.label}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* ANATOMISK HJERTE FORM (I CENTRUM) */}
                            <g transform="translate(-10, -15) scale(0.9)">
                                {/* Højre Atrie */}
                                <path
                                    d="M -45 -60 C -70 -60, -85 -30, -75 0 C -70 20, -55 35, -40 40 Z"
                                    fill={currentPhase.activeNodes.includes('atria') ? '#93C5FD' : '#CBD5E1'}
                                    stroke="#64748B"
                                    strokeWidth="2"
                                    className="transition-colors duration-150"
                                />

                                {/* Venstre Atrie (bagtil) */}
                                <path
                                    d="M 25 -65 C 55 -65, 75 -40, 65 -10 C 60 10, 45 25, 30 30 Z"
                                    fill={currentPhase.activeNodes.includes('atria') ? '#93C5FD' : '#CBD5E1'}
                                    stroke="#64748B"
                                    strokeWidth="2"
                                    className="transition-colors duration-150"
                                />

                                {/* Hovedventrikelmasse / Venstre Ventrikel (tyk muskelvæg mod apeks) */}
                                <path
                                    d="M -35 25 C -45 55, -20 115, 25 140 C 60 110, 70 60, 50 15 C 30 20, -10 20, -35 25 Z"
                                    fill={
                                        activeCase.id === 'anterior_stemi' ? '#F87171' :
                                        activeCase.id === 'inferior_stemi' ? '#FB923C' :
                                        currentPhase.activeNodes.includes('ventricle_free_walls') ? '#FCA5A5' :
                                        currentPhase.activeNodes.includes('repolarization') ? '#A7F3D0' :
                                        '#E2E8F0'
                                    }
                                    stroke={activeCase.affectedLeads?.length ? '#DC2626' : '#475569'}
                                    strokeWidth="2.5"
                                    className="transition-colors duration-150"
                                />

                                {/* Højre Ventrikel (forvæg / anteriort) */}
                                <path
                                    d="M -45 20 C -65 45, -55 90, -10 115 C -20 80, -25 50, -30 20 Z"
                                    fill={
                                        currentPhase.activeNodes.includes('ventricle_free_walls') ? '#FECACA' :
                                        currentPhase.activeNodes.includes('repolarization') ? '#D1FAE5' :
                                        '#F1F5F9'
                                    }
                                    stroke="#64748B"
                                    strokeWidth="1.5"
                                    className="transition-colors duration-150"
                                />

                                {/* Interventrikulære Septum */}
                                <path
                                    d="M -15 20 C -12 55, 0 95, 20 125 C 10 90, 5 55, 0 20 Z"
                                    fill={currentPhase.activeNodes.includes('septum') ? '#FCD34D' : '#CBD5E1'}
                                    stroke="#64748B"
                                    strokeWidth="1.5"
                                    className="transition-colors duration-150"
                                />

                                {/* Koronararterier overlejring (RCA, LAD, LCx) */}
                                {showCoronary && (
                                    <g>
                                        {/* LAD - Løber i sulcus interventricularis anterior */}
                                        <path
                                            d="M 5 0 C 0 35, 5 70, 22 128"
                                            fill="none"
                                            stroke={activeCase.id === 'anterior_stemi' ? '#EF4444' : '#DC2626'}
                                            strokeWidth={activeCase.id === 'anterior_stemi' ? 5 : 3.5}
                                            strokeLinecap="round"
                                            className={activeCase.id === 'anterior_stemi' ? 'animate-pulse' : ''}
                                        />
                                        <text x="18" y="70" fontSize="8" fontWeight="bold" fill="#DC2626">LAD</text>
                                        {activeCase.id === 'anterior_stemi' && (
                                            <g>
                                                <circle cx="10" cy="45" r="5" fill="#EF4444" className="animate-ping" />
                                                <text x="24" y="48" fontSize="7" fontWeight="bold" fill="#B91C1C">OKKLUSION</text>
                                            </g>
                                        )}

                                        {/* RCA - Højre koronararterie */}
                                        <path
                                            d="M -40 -10 C -55 10, -50 40, -40 65 C -30 90, -10 105, 5 118"
                                            fill="none"
                                            stroke={activeCase.id === 'inferior_stemi' ? '#EA580C' : '#EA580C'}
                                            strokeWidth={activeCase.id === 'inferior_stemi' ? 5 : 3}
                                            strokeLinecap="round"
                                            className={activeCase.id === 'inferior_stemi' ? 'animate-pulse' : ''}
                                        />
                                        <text x="-65" y="40" fontSize="8" fontWeight="bold" fill="#EA580C">RCA</text>
                                        {activeCase.id === 'inferior_stemi' && (
                                            <g>
                                                <circle cx="-42" cy="55" r="5" fill="#EA580C" className="animate-ping" />
                                                <text x="-80" y="60" fontSize="7" fontWeight="bold" fill="#C2410C">OKKLUSION</text>
                                            </g>
                                        )}

                                        {/* LCx - Circumflexa mod venstre bagvæg */}
                                        <path
                                            d="M 20 -5 C 45 10, 55 35, 45 65"
                                            fill="none"
                                            stroke="#2563EB"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />
                                        <text x="50" y="30" fontSize="8" fontWeight="bold" fill="#2563EB">LCx</text>
                                    </g>
                                )}

                                {/* LEDNINGSSYSTEM */}
                                {showConduction && (
                                    <g>
                                        {/* SA-knude */}
                                        <circle
                                            cx="-55"
                                            cy="-40"
                                            r={currentPhase.activeNodes.includes('sa') ? 7 : 4}
                                            fill={currentPhase.activeNodes.includes('sa') ? '#EF4444' : '#F59E0B'}
                                            stroke="#FFFFFF"
                                            strokeWidth="1.5"
                                            filter={currentPhase.activeNodes.includes('sa') ? "url(#glow)" : undefined}
                                        />
                                        <text x="-80" y="-45" fontSize="8" fontWeight="bold" fill="#B45309">SA-knude</text>

                                        {/* Internodale baner til AV-knude */}
                                        <path d="M -50 -35 C -35 -20, -25 -10, -15 5" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />

                                        {/* AV-knude */}
                                        <circle
                                            cx="-12"
                                            cy="8"
                                            r={currentPhase.activeNodes.includes('av') ? 7 : 4}
                                            fill={activeCase.id?.startsWith('av_block') ? '#DC2626' : currentPhase.activeNodes.includes('av') ? '#EF4444' : '#F59E0B'}
                                            stroke="#FFFFFF"
                                            strokeWidth="1.5"
                                            filter={currentPhase.activeNodes.includes('av') ? "url(#glow)" : undefined}
                                        />
                                        <text x="-38" y="8" fontSize="8" fontWeight="bold" fill="#B45309">AV-knude</text>
                                        {activeCase.id?.startsWith('av_block') && (
                                            <text x="-38" y="20" fontSize="7" fontWeight="bold" fill="#DC2626">BLOK</text>
                                        )}

                                        {/* His'ske bundt */}
                                        <line x1="-10" y1="12" x2="-5" y2="25" stroke="#F59E0B" strokeWidth="2.5" />

                                        {/* Højre grenbundt */}
                                        <path d="M -5 25 C -15 45, -20 75, -15 95" fill="none" stroke={activeCase.id === 'rbbb' ? '#DC2626' : '#F59E0B'} strokeWidth={activeCase.id === 'rbbb' ? 3 : 2} strokeDasharray={activeCase.id === 'rbbb' ? '4 2' : '3 2'} />
                                        {activeCase.id === 'rbbb' && (
                                            <text x="-38" y="60" fontSize="7" fontWeight="bold" fill="#DC2626">RBBB</text>
                                        )}

                                        {/* Venstre grenbundt */}
                                        <path d="M -5 25 C 10 45, 20 75, 25 110" fill="none" stroke={activeCase.id === 'lbbb' ? '#DC2626' : '#F59E0B'} strokeWidth={activeCase.id === 'lbbb' ? 3.5 : 2.5} strokeDasharray={activeCase.id === 'lbbb' ? '4 2' : '3 2'} />
                                        {activeCase.id === 'lbbb' && (
                                            <text x="28" y="60" fontSize="7" fontWeight="bold" fill="#DC2626">LBBB</text>
                                        )}

                                        {/* Purkinje-netværk i apeks */}
                                        <path d="M 25 110 C 35 120, 45 100, 50 75" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />
                                        <path d="M -15 95 C -25 105, -35 85, -40 65" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 2" />
                                    </g>
                                )}
                            </g>

                            {/* REALTIDS ELEKTRISK VEKTOR-PIL */}
                            {showVector && currentPhase.vector.magnitude > 0.05 && (
                                <g>
                                    {(() => {
                                        const rad = (currentPhase.vector.angle * Math.PI) / 180;
                                        const len = currentPhase.vector.magnitude * 110;
                                        const vx = Math.cos(rad) * len;
                                        const vy = Math.sin(rad) * len;

                                        // Sikr at tekstboks ikke overskrider SVG-grænser (-220 til +220)
                                        const labelW = 105;
                                        const labelH = 22;
                                        const labelX = vx > 50 ? vx - labelW - 10 : vx + 10;
                                        const labelY = Math.max(-195, Math.min(170, vy - 11));

                                        return (
                                            <g>
                                                {/* Vektor linje med dynamisk glød */}
                                                <line
                                                    x1="0"
                                                    y1="0"
                                                    x2={vx}
                                                    y2={vy}
                                                    stroke={currentPhase.vector.color}
                                                    strokeWidth={Math.max(3, currentPhase.vector.magnitude * 6)}
                                                    strokeLinecap="round"
                                                    filter="url(#glow)"
                                                />
                                                {/* Pilespids */}
                                                <circle
                                                    cx={vx}
                                                    cy={vy}
                                                    r={Math.max(5, currentPhase.vector.magnitude * 8)}
                                                    fill={currentPhase.vector.color}
                                                    stroke="#FFFFFF"
                                                    strokeWidth="2"
                                                />
                                                {/* Vektortekst afgrænset */}
                                                <rect
                                                    x={labelX}
                                                    y={labelY}
                                                    width={labelW}
                                                    height={labelH}
                                                    rx="6"
                                                    fill="#1E293B"
                                                    fillOpacity="0.9"
                                                    stroke={currentPhase.vector.color}
                                                    strokeWidth="1"
                                                />
                                                <text
                                                    x={labelX + labelW / 2}
                                                    y={labelY + 14}
                                                    textAnchor="middle"
                                                    fontSize="9.5"
                                                    fontWeight="bold"
                                                    fill="#FFFFFF"
                                                >
                                                    {currentPhase.wave} ({Math.round(currentPhase.vector.angle)}°)
                                                </text>
                                            </g>
                                        );
                                    })()}
                                </g>
                            )}
                        </svg>
                    ) : (
                        /* Horisontal Plan SVG: Tværsnit af Thorax med V1-V6 */
                        <svg viewBox="-220 -220 440 440" className="w-full h-full max-h-[460px] select-none">
                            {/* Thorax kontur (hjerteformet ellipse) */}
                            <path
                                d="M 0 -170 C 120 -170, 180 -80, 180 30 C 180 130, 100 180, 0 180 C -100 180, -180 130, -180 30 C -180 -80, -120 -170, 0 -170 Z"
                                fill="#F1F5F9"
                                stroke="#94A3B8"
                                strokeWidth="2"
                            />

                            {/* Rygsøjle (posteriort) */}
                            <circle cx="0" cy="-145" r="22" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
                            <text x="0" y="-140" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748B">Columna</text>

                            {/* Sternum (fortil / anteriort) */}
                            <rect x="-35" y="165" width="70" height="15" rx="5" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
                            <text x="0" y="176" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748B">Sternum</text>

                            {/* Hjertet placeret i venstre hemithorax */}
                            <g transform="translate(20, 20)">
                                {/* Højre ventrikel (fortil mod sternum) */}
                                <path
                                    d="M -60 40 C -40 75, 15 85, 45 65 C 20 40, -10 35, -60 40 Z"
                                    fill={currentPhase.activeNodes.includes('ventricle_free_walls') ? '#FECACA' : '#E2E8F0'}
                                    stroke="#64748B"
                                    strokeWidth="2"
                                />
                                <text x="-5" y="65" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#64748B">Højre Ventrikel</text>

                                {/* Venstre ventrikel (posterolateralt) */}
                                <ellipse
                                    cx="40"
                                    cy="15"
                                    rx="45"
                                    ry="35"
                                    fill={currentPhase.activeNodes.includes('ventricle_free_walls') ? '#FCA5A5' : '#CBD5E1'}
                                    stroke="#475569"
                                    strokeWidth="2.5"
                                />
                                <text x="40" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">Venstre Ventrikel</text>

                                {/* Septum mellem ventriklerne */}
                                <path d="M -15 35 C 0 30, 15 35, 30 45" stroke="#F59E0B" strokeWidth="3" />
                            </g>

                            {/* V1 - V6 Elektroder på forreste og laterale thoraxvæg */}
                            {[
                                { name: 'V1', angle: 110, x: -35, y: 155, wall: 'Septal / RV' },
                                { name: 'V2', angle: 80, x: 25, y: 155, wall: 'Septal' },
                                { name: 'V3', angle: 60, x: 75, y: 140, wall: 'Anterior' },
                                { name: 'V4', angle: 45, x: 125, y: 110, wall: 'Apeks / Ant' },
                                { name: 'V5', angle: 20, x: 160, y: 65, wall: 'Lateral' },
                                { name: 'V6', angle: 0, x: 175, y: 10, wall: 'Lateral' }
                            ].map(lead => {
                                const isSel = selectedLead === lead.name;
                                const isAffected = activeCase.affectedLeads && activeCase.affectedLeads.includes(lead.name);

                                return (
                                    <g key={lead.name} className="cursor-pointer" onClick={() => handleSelectLead(lead.name)}>
                                        {/* Sigte-linje fra elektroden mod hjertets centrum */}
                                        <line
                                            x1={lead.x}
                                            y1={lead.y}
                                            x2="30"
                                            y2="25"
                                            stroke={isSel ? '#DC2626' : isAffected ? '#F59E0B' : '#CBD5E1'}
                                            strokeWidth={isSel ? 3 : isAffected ? 2 : 1}
                                            strokeDasharray={isSel ? 'none' : isAffected ? '4 2' : '3 3'}
                                        />
                                        <circle
                                            cx={lead.x}
                                            cy={lead.y}
                                            r={isSel ? 16 : 13}
                                            fill={isSel ? '#DC2626' : isAffected ? '#FEF3C7' : '#FFFFFF'}
                                            stroke={isSel ? '#991B1B' : isAffected ? '#D97706' : '#64748B'}
                                            strokeWidth="2"
                                            className="transition-all"
                                        />
                                        <text
                                            x={lead.x}
                                            y={lead.y + 4}
                                            textAnchor="middle"
                                            fontSize={isSel ? "11" : "10"}
                                            fontWeight="bold"
                                            fill={isSel ? '#FFFFFF' : isAffected ? '#92400E' : '#334155'}
                                        >
                                            {lead.name}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    )}

                    {/* Hurtigt badge i hjørnet med aktuel fase */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E8E4D9] shadow-sm flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: currentPhase.vector.color }}></div>
                        <span className="text-xs font-bold text-[#3A4A40]">{currentPhase.name}</span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-[#E2E8DF] text-[#3A4A40]">{currentPhase.wave}</span>
                    </div>

                    {/* Visningsknapper til lag */}
                    <div className="absolute bottom-3 right-3 flex gap-2">
                        <button
                            onClick={() => setShowCoronary(!showCoronary)}
                            className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${showCoronary ? 'bg-[#839788] text-white border-[#6A7A6E]' : 'bg-white/80 text-[#839788] border-[#E8E4D9]'}`}
                            title="Tænd/sluk koronararterier (RCA, LAD, LCx)"
                        >
                            Koronarer
                        </button>
                        <button
                            onClick={() => setShowConduction(!showConduction)}
                            className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all ${showConduction ? 'bg-[#839788] text-white border-[#6A7A6E]' : 'bg-white/80 text-[#839788] border-[#E8E4D9]'}`}
                            title="Tænd/sluk ledningssystem (SA, AV, grenbundter)"
                        >
                            Ledning
                        </button>
                    </div>
                </div>

                {/* Tidslinje-kontrol, Scrubber & Fase-spring */}
                <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="p-2.5 rounded-xl bg-[#839788] text-white hover:bg-[#6A7A6E] transition-colors shadow-sm"
                                title={isPlaying ? 'Pause' : 'Afspil'}
                            >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => { setIsPlaying(false); setCycleTime(0); }}
                                className="p-2.5 rounded-xl bg-[#F2F6F3] text-[#839788] hover:text-[#3A4A40] transition-colors border border-[#E8E4D9]"
                                title="Genstart cyklus (0 ms)"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => { setIsPlaying(false); setCycleTime(prev => Math.max(0, Math.round(prev - 25))); }}
                                className="px-2 py-2 rounded-xl bg-[#F2F6F3] text-xs font-bold text-[#839788] hover:text-[#3A4A40] transition-colors border border-[#E8E4D9]"
                                title="Gå 25 ms tilbage"
                            >
                                -25 ms
                            </button>
                            <button
                                onClick={() => { setIsPlaying(false); setCycleTime(prev => (Math.round(prev + 25)) % 800); }}
                                className="px-2 py-2 rounded-xl bg-[#F2F6F3] text-xs font-bold text-[#839788] hover:text-[#3A4A40] transition-colors border border-[#E8E4D9]"
                                title="Gå 25 ms frem"
                            >
                                +25 ms
                            </button>
                        </div>

                        {/* Tidsskyder */}
                        <div className="flex-1 min-w-[200px] flex flex-col">
                            <div className="flex justify-between text-xs text-[#839788] font-medium mb-1">
                                <span>Tid: <strong className="text-[#3A4A40]">{Math.round(cycleTime)} ms</strong> / 800 ms</span>
                                <span className="hidden sm:inline">Puls: ~75 bpm</span>
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
                        <div className="flex gap-1 bg-[#F2F6F3] p-1 rounded-xl border border-[#E8E4D9] text-xs">
                            {[0.25, 0.5, 1, 2].map(speed => (
                                <button
                                    key={speed}
                                    onClick={() => setPlaybackSpeed(speed)}
                                    className={`px-2 py-1 rounded-lg transition-colors ${playbackSpeed === speed ? 'bg-white text-[#3A4A40] font-bold shadow-xs' : 'text-[#839788]'}`}
                                >
                                    {speed}x
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Hurtige Fase-spring knapper */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                        <span className="text-[11px] font-bold text-[#839788] shrink-0 mr-1">Fase-spring:</span>
                        {[
                            { label: 'P-tak', time: 50 },
                            { label: 'PR-seg', time: 130 },
                            { label: 'Q-tak', time: 180 },
                            { label: 'R-spids', time: 230 },
                            { label: 'S-tak', time: 280 },
                            { label: 'T-tak', time: 450 },
                            { label: 'Hvile', time: 650 }
                        ].map(ph => {
                            const isCurrent = Math.abs(cycleTime - ph.time) < 40;
                            return (
                                <button
                                    key={ph.label}
                                    onClick={() => { setIsPlaying(false); setCycleTime(ph.time); }}
                                    className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all border ${isCurrent
                                        ? 'bg-[#839788] text-white border-[#6A7A6E] font-bold shadow-xs'
                                        : 'bg-white/80 text-[#3A4A40] border-[#E8E4D9] hover:bg-[#F2F6F3]'
                                        }`}
                                >
                                    {ph.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Forklarende boks om aktuel fase */}
                    <div className="p-3 bg-[#F9F8F6] rounded-2xl border border-[#E8E4D9] text-xs text-[#3A4A40] flex items-start gap-3">
                        <Info className="w-4 h-4 text-[#839788] shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                            <strong className="text-[#3A4A40] font-bold">{currentPhase.name} ({currentPhase.wave}): </strong>
                            <span className="text-[#839788]">{currentPhase.desc}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Højre Søjle: Den Valgte Aflednings Projektion & Hampton Principper */}
            <div className="w-full lg:w-[420px] flex flex-col gap-4">
                {/* Aflednings-vælger Bar */}
                <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/80 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-bold text-[#839788] uppercase tracking-wider">Vælg Afledning (12-Aflednings EKG)</h3>
                        {activeCase.affectedLeads && activeCase.affectedLeads.length > 0 && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                                Gule prikker = Case Patologi
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-6 gap-2">
                        {['I', 'II', 'III', 'aVR', 'aVL', 'aVF'].map(lead => {
                            const isAffected = activeCase.affectedLeads && activeCase.affectedLeads.includes(lead);
                            return (
                                <button
                                    key={lead}
                                    onClick={() => handleSelectLead(lead)}
                                    className={`py-2 rounded-xl text-xs font-bold transition-all border relative ${selectedLead === lead
                                        ? 'bg-[#839788] text-white border-[#6A7A6E] shadow-sm'
                                        : isAffected
                                            ? 'bg-amber-50 text-amber-950 border-amber-300 font-bold hover:bg-amber-100'
                                            : 'bg-[#F9F8F6] text-[#3A4A40] border-[#E8E4D9] hover:bg-[#EFF3F0]'
                                        }`}
                                >
                                    {lead}
                                    {isAffected && selectedLead !== lead && (
                                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    <div className="grid grid-cols-6 gap-2 mt-2">
                        {['V1', 'V2', 'V3', 'V4', 'V5', 'V6'].map(lead => {
                            const isAffected = activeCase.affectedLeads && activeCase.affectedLeads.includes(lead);
                            return (
                                <button
                                    key={lead}
                                    onClick={() => handleSelectLead(lead)}
                                    className={`py-2 rounded-xl text-xs font-bold transition-all border relative ${selectedLead === lead
                                        ? 'bg-[#839788] text-white border-[#6A7A6E] shadow-sm'
                                        : isAffected
                                            ? 'bg-amber-50 text-amber-950 border-amber-300 font-bold hover:bg-amber-100'
                                            : 'bg-[#F9F8F6] text-[#3A4A40] border-[#E8E4D9] hover:bg-[#EFF3F0]'
                                        }`}
                                >
                                    {lead}
                                    {isAffected && selectedLead !== lead && (
                                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Detaljekort for Valgte Afledning */}
                <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/80 shadow-sm flex-1 flex flex-col">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8E4D9] mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-[#839788] text-white font-bold flex items-center justify-center text-sm">
                                {selectedLead}
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-[#3A4A40] leading-tight">Afledning {selectedLead}</h3>
                                <p className="text-xs text-[#839788]">{leadInfo.wall} væg • {leadInfo.territory}</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#E2E8DF] text-[#3A4A40]">
                            {leadInfo.angle}° ({leadInfo.plane === 'horizontal' ? 'Horisontal' : 'Frontal'})
                        </span>
                    </div>

                    {/* Patologi information hvis denne afledning er berørt */}
                    {activeCase.affectedLeads && activeCase.affectedLeads.includes(selectedLead) && (
                        <div className="mb-4 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <strong className="font-bold block text-amber-950">Afficeret i aktiv case ({activeCase.title}):</strong>
                                <span>{activeCase.badge} • Viser typiske patologiske forandringer for denne afledning.</span>
                            </div>
                        </div>
                    )}

                    {/* Realtids-spændingsindikator */}
                    <div className="bg-[#F9F8F6] p-4 rounded-2xl border border-[#E8E4D9] mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-[#839788] font-medium">Projiceret Vektorudslag:</span>
                            <span className={`text-xs font-bold ${projectedVoltage > 0 ? 'text-emerald-700' : projectedVoltage < 0 ? 'text-red-700' : 'text-slate-600'}`}>
                                {projectedVoltage > 0 ? `+${projectedVoltage.toFixed(2)} mV` : `${projectedVoltage.toFixed(2)} mV`}
                            </span>
                        </div>
                        {/* Spændingsbar med neutral midte (uden lang transition for jævn 60fps opdatering) */}
                        <div className="relative w-full h-3 bg-[#E2E8DF] rounded-full overflow-hidden">
                            {/* Midterlinje (0 mV) */}
                            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-400 z-10"></div>
                            {projectedVoltage >= 0 ? (
                                <div
                                    className="absolute top-0 bottom-0 bg-emerald-600 rounded-r-full"
                                    style={{
                                        left: '50%',
                                        width: `${Math.min(50, (projectedVoltage / 1.2) * 50)}%`
                                    }}
                                ></div>
                            ) : (
                                <div
                                    className="absolute top-0 bottom-0 bg-red-600 rounded-l-full"
                                    style={{
                                        right: '50%',
                                        width: `${Math.min(50, (Math.abs(projectedVoltage) / 1.2) * 50)}%`
                                    }}
                                ></div>
                            )}
                        </div>
                        <div className="flex justify-between text-[10px] text-[#839788] mt-1 font-mono">
                            <span>-1.0 mV (Negativ)</span>
                            <span>0 mV</span>
                            <span>+1.0 mV (Positiv)</span>
                        </div>
                    </div>

                    {/* Realtids synkroniseret kurveudslag for den valgte afledning */}
                    <div className="bg-[#FFF5F5] rounded-2xl border border-[#FCA5A5]/70 p-3 mb-4 relative overflow-hidden">
                        {/* Millimeterpapir baggrund */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-70"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, rgba(239, 68, 68, 0.25) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(239, 68, 68, 0.25) 1px, transparent 1px),
                                    linear-gradient(to right, rgba(220, 38, 38, 0.5) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(220, 38, 38, 0.5) 1px, transparent 1px)
                                `,
                                backgroundSize: '8px 8px, 8px 8px, 40px 40px, 40px 40px'
                            }}
                        ></div>

                        <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-[#991B1B] font-bold mb-1">
                            <span>Afledning {selectedLead} Kurve (1 Hjertecyklus)</span>
                            <span>T: {Math.round(cycleTime)} ms</span>
                        </div>

                        {/* Mini-kurve SVG med bevægelig tidsmarkør */}
                        <div className="relative z-10 w-full h-[65px] flex items-center">
                            <svg viewBox="0 0 360 65" className="w-full h-full overflow-visible select-none">
                                {/* Grundlinje */}
                                <line x1="0" y1="32.5" x2="360" y2="32.5" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                                {/* Kurve */}
                                {(() => {
                                    const points = generateLeadWaveform(activeCase, selectedLead, 1.0, 160);
                                    if (!points || points.length === 0) return null;
                                    const maxT = points[points.length - 1].time;
                                    const baselineY = 32.5;
                                    const scaleY = 22; // 1 mV = 22 px
                                    let d = '';
                                    points.forEach((pt, i) => {
                                        const px = (pt.time / maxT) * 360;
                                        const py = baselineY - pt.voltage * scaleY;
                                        if (i === 0) d += `M ${px.toFixed(1)} ${py.toFixed(1)}`;
                                        else d += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
                                    });
                                    return (
                                        <path
                                            d={d}
                                            fill="none"
                                            stroke="#0F172A"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    );
                                })()}
                                {/* Bevægelig markør for aktuel cyklustid */}
                                {(() => {
                                    const cursorX = Math.min(360, Math.max(0, (cycleTime / 800) * 360));
                                    return (
                                        <g>
                                            <line
                                                x1={cursorX}
                                                y1="0"
                                                x2={cursorX}
                                                y2="65"
                                                stroke="#DC2626"
                                                strokeWidth="2"
                                                strokeDasharray="3 2"
                                            />
                                            <circle
                                                cx={cursorX}
                                                cy="32.5"
                                                r="4"
                                                fill="#DC2626"
                                                stroke="#FFFFFF"
                                                strokeWidth="1.5"
                                            />
                                        </g>
                                    );
                                })()}
                            </svg>
                        </div>
                    </div>

                    {/* Anatomisk perspektiv ifølge Hampton */}
                    <div className="space-y-3 text-xs leading-relaxed text-[#3A4A40] flex-1">
                        <div>
                            <strong className="block text-[#3A4A40] font-bold mb-1">Elektrodens synsvinkel:</strong>
                            <p className="text-[#839788]">{leadInfo.desc}</p>
                        </div>

                        <div className="p-3 bg-[#EFF3F0] rounded-2xl border border-[#D9E1DA]">
                            <strong className="block text-[#2C3F34] font-bold mb-1 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#839788]" /> Hamptons Gyldne Vektorregel:
                            </strong>
                            <p className="text-[#3A4A40]">
                                Når den elektriske depolarisationsbølge bevæger sig <em>hen imod</em> elektroden for {selectedLead}, tegner EKG-apparatet et <strong>positivt udslag (opad)</strong>. Når bølgen bevæger sig <em>væk fra</em> elektroden, tegnes et <strong>negativt udslag (nedad)</strong>.
                            </p>
                        </div>

                        {selectedLead === 'aVR' && (
                            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900">
                                <strong className="block font-bold mb-1">Hvorfor er aVR "det spejlvendte EKG"?</strong>
                                <p className="text-amber-800">
                                    aVR kigger lige ind i hjertehulerne fra højre skulder. Da hjertevektoren under hele sammentrækningen peger nedad og mod venstre apeks, bevæger al elektricitet sig <em>væk</em> fra aVR. Derfor er P, QRS og T altid omvendte (negative) i et normalt aVR!
                                </p>
                            </div>
                        )}

                        {['V1', 'V2'].includes(selectedLead) && (
                            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200 text-blue-900">
                                <strong className="block font-bold mb-1">Hvorfor har V1 en lille r og dyb S?</strong>
                                <p className="text-blue-800">
                                    V1 ser på højre ventrikel og septum. Den indledende septale depolarisering (venstre $\rightarrow$ højre) giver den lille positive r-tak. Derefter aktiveres den enorme venstre ventrikel mod venstre og bagud, væk fra V1, hvilket danner den dybe S-tak!
                                </p>
                            </div>
                        )}

                        {['II', 'aVF'].includes(selectedLead) && (
                            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900">
                                <strong className="block font-bold mb-1">Hvorfor er afledning II standard rytmeafledning?</strong>
                                <p className="text-emerald-800">
                                    Afledning II (+60°) løber stort set parallelt med hjertets anatomiske akse fra SA-knuden til venstre ventrikels spids. Både P-tak og R-tak er derfor maksimale og klarest synlige i II, hvilket gør den ideel til rytmeovervågning.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
