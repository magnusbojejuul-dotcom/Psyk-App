import React, { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, Crosshair, RotateCcw, Clock, Activity, ChevronRight, Layers, Sparkles } from '../Icons';
import { LEAD_NAMES, LEAD_DETAILS, generateLeadWaveform } from '../../data/ekgCases';

export default function EkgViewer({
    caseData,
    selectedLead = 'II',
    onSelectLead,
    onShowOnHeart
}) {
    const [expandedLead, setExpandedLead] = useState(null);
    const [isCaliperActive, setIsCaliperActive] = useState(false);

    // Caliper positioner i procent (0 til 100% af strimmellængden)
    const [caliper1, setCaliper1] = useState(25);
    const [caliper2, setCaliper2] = useState(45);
    const [caliperV1, setCaliperV1] = useState(30); // Vertikal caliper
    const [caliperV2, setCaliperV2] = useState(70);

    const [draggingCaliper, setDraggingCaliper] = useState(null); // 'c1' | 'c2' | 'v1' | 'v2'
    const rhythmStripRef = useRef(null);

    // Tidsberegninger for måling på rytmestrimlen (antag 10 sekunder total for 250 mm)
    const totalStripSec = 6.0; // 6 sekunder strimmel
    const deltaPercent = Math.abs(caliper2 - caliper1);
    const deltaSec = (deltaPercent / 100) * totalStripSec;
    const deltaMs = Math.round(deltaSec * 1000);
    const smallBoxes = (deltaMs / 40).toFixed(1);
    const bigBoxes = (deltaMs / 200).toFixed(2);
    const calculatedBpm = deltaMs > 0 ? Math.round(60000 / deltaMs) : 0;

    // Mus/touch håndtering for calipers
    const handleMouseDown = (which) => (e) => {
        e.stopPropagation();
        setDraggingCaliper(which);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!draggingCaliper || !rhythmStripRef.current) return;
            const rect = rhythmStripRef.current.getBoundingClientRect();
            const xPercent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            const yPercent = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

            if (draggingCaliper === 'c1') setCaliper1(xPercent);
            if (draggingCaliper === 'c2') setCaliper2(xPercent);
            if (draggingCaliper === 'v1') setCaliperV1(yPercent);
            if (draggingCaliper === 'v2') setCaliperV2(yPercent);
        };

        const handleMouseUp = () => {
            setDraggingCaliper(null);
        };

        if (draggingCaliper) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingCaliper]);

    // Tegn en afledningskurve som SVG path
    const renderWaveformPath = (leadName, width = 280, height = 110, numBeats = 2.5) => {
        const points = generateLeadWaveform(caseData, leadName, numBeats);
        if (!points || points.length === 0) return '';

        const maxTime = points[points.length - 1].time;
        const baselineY = height / 2;
        // 1.0 mV svarer til 10 mm (ca. 25 pixels i standard skalering)
        const scaleY = height / 3.0; // 3 mV total rækkevidde

        let path = '';
        points.forEach((p, idx) => {
            const x = (p.time / maxTime) * width;
            const y = baselineY - p.voltage * scaleY;
            if (idx === 0) path += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
            else path += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        });

        return path;
    };

    // Standard 12-aflednings arrangement (4 kolonner x 3 rækker)
    const leadColumns = [
        ['I', 'II', 'III'],
        ['aVR', 'aVL', 'aVF'],
        ['V1', 'V2', 'V3'],
        ['V4', 'V5', 'V6']
    ];

    return (
        <div className="w-full flex flex-col gap-5">
            {/* Top Kontrolpanel: EKG metadata og Caliper aktivering */}
            <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#839788] p-2.5 rounded-2xl text-white shadow-xs">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-[#3A4A40] leading-tight">{caseData.title}</h2>
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-[#E2E8DF] text-[#3A4A40]">
                                {caseData.badge}
                            </span>
                        </div>
                        <p className="text-xs text-[#839788]">{caseData.subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsCaliperActive(!isCaliperActive)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${isCaliperActive
                            ? 'bg-[#839788] text-white border-[#6A7A6E] shadow-sm'
                            : 'bg-[#F2F6F3] text-[#3A4A40] border-[#E8E4D9] hover:bg-[#E2E8DF]'
                            }`}
                    >
                        <Crosshair className="w-4 h-4" />
                        {isCaliperActive ? 'Skjul Måleskydelære' : 'Aktivér Måleskydelære (Caliper)'}
                    </button>

                    {onShowOnHeart && (
                        <button
                            onClick={onShowOnHeart}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-[#3A4A40] text-white hover:bg-[#2C3F34] transition-colors shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            Se på Hjertemodel
                        </button>
                    )}
                </div>
            </div>

            {/* Skydelære Resultatbar (når aktiv) */}
            {isCaliperActive && (
                <div className="glass-panel rounded-2xl p-4 border border-[#D9E1DA] bg-[#EFF3F0] text-xs text-[#3A4A40] flex flex-wrap items-center justify-between gap-4 shadow-sm animate-fadeIn">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white border border-[#E8E4D9] text-[#839788]">
                            <Clock className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="font-bold text-sm text-[#2C3F34]">{deltaMs} ms</span>
                            <span className="text-[#839788] ml-2 font-mono">({smallBoxes} små tern / {bigBoxes} store tern)</span>
                            <p className="text-[11px] text-[#839788]">Træk i de lodrette linjer på rytmestrimlen for at måle intervaller.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="bg-white px-4 py-2 rounded-xl border border-[#E8E4D9]">
                            <span className="text-[10px] text-[#839788] uppercase block font-semibold">Beregnet Frekvens:</span>
                            <span className="text-base font-bold text-[#3A4A40]">{calculatedBpm > 0 ? `${calculatedBpm} bpm` : '—'}</span>
                        </div>
                        <button
                            onClick={() => { setCaliper1(20); setCaliper2(40); }}
                            className="text-xs text-[#839788] hover:text-[#3A4A40] flex items-center gap-1 font-medium"
                        >
                            <RotateCcw className="w-3.5 h-3.5" /> Nulstil måling
                        </button>
                    </div>
                </div>
            )}

            {/* SELVE EKG-PAPIR PAPIR-CONTAINER (25 mm/s, 10 mm/mV MILLIMETERPAPIR) */}
            <div className="w-full bg-[#FFF5F5] rounded-3xl p-4 sm:p-6 border-2 border-[#FCA5A5]/60 shadow-md relative overflow-x-auto select-none">
                {/* Millimeterpapir mønster (CSS Background) */}
                <div
                    className="absolute inset-0 rounded-3xl pointer-events-none opacity-85"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(239, 68, 68, 0.28) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(239, 68, 68, 0.28) 1px, transparent 1px),
                            linear-gradient(to right, rgba(220, 38, 38, 0.55) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(220, 38, 38, 0.55) 1px, transparent 1px)
                        `,
                        backgroundSize: '8px 8px, 8px 8px, 40px 40px, 40px 40px'
                    }}
                ></div>

                {/* EKG-Papir Header Info (Klassisk Hospitalsprint Layout) */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 mb-2 border-b border-[#FCA5A5] text-[11px] font-mono text-[#991B1B] font-semibold">
                    <div className="flex gap-4">
                        <span>HASTIGHED: 25 mm/s</span>
                        <span>AMPLITUDE: 10 mm/mV</span>
                        <span>FILTRE: 0.05 - 150 Hz</span>
                    </div>
                    <div className="flex gap-4">
                        <span>PULS: {caseData.heartRate} bpm</span>
                        <span>PR: {caseData.prInterval}</span>
                        <span>QRS: {caseData.qrsDuration}</span>
                        <span>QTc: {caseData.qtc}</span>
                    </div>
                </div>

                {/* 12-AFLEDNINGER: 4 KOLONNER x 3 RÆKKER MATRIX */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
                    {leadColumns.map((colLeads, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-2">
                            {colLeads.map(leadName => {
                                const isFocused = selectedLead === leadName;
                                const isPrimary = caseData.affectedLeads && caseData.affectedLeads.includes(leadName);

                                return (
                                    <div
                                        key={leadName}
                                        onClick={() => onSelectLead && onSelectLead(leadName)}
                                        className={`relative h-[115px] bg-white/40 backdrop-blur-xs rounded-xl border transition-all cursor-pointer overflow-hidden p-2 flex flex-col justify-between ${isFocused
                                            ? 'border-[#DC2626] ring-2 ring-[#DC2626]/40 bg-white/60'
                                            : isPrimary
                                                ? 'border-amber-500/80 bg-amber-50/30'
                                                : 'border-[#FECACA]/60 hover:bg-white/60'
                                            }`}
                                    >
                                        {/* Afledningsnavn og tag */}
                                        <div className="flex justify-between items-center z-10">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${isFocused ? 'bg-[#DC2626] text-white' : 'bg-[#FEE2E2] text-[#991B1B]'}`}>
                                                    {leadName}
                                                </span>
                                                {isPrimary && (
                                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white animate-pulse">
                                                        PATOLOGI
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setExpandedLead(leadName); }}
                                                className="text-[#991B1B]/70 hover:text-[#991B1B] p-1"
                                                title="Forstør denne afledning"
                                            >
                                                <Maximize2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        {/* EKG Kurve SVG */}
                                        <div className="w-full h-[75px] flex items-center">
                                            <svg viewBox="0 0 280 110" className="w-full h-full overflow-visible">
                                                {/* 1 mV Standardiseringspuls ved venstre kant (første afledning i hver kolonne) */}
                                                <path
                                                    d="M 2 55 L 6 55 L 6 22 L 18 22 L 18 55 L 24 55"
                                                    fill="none"
                                                    stroke="#1E293B"
                                                    strokeWidth="1.6"
                                                />
                                                {/* Patientens EKG Kurve */}
                                                <path
                                                    d={renderWaveformPath(leadName, 280, 110, 2.5)}
                                                    fill="none"
                                                    stroke="#0F172A"
                                                    strokeWidth="1.8"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* LANG FORTLØBENDE RYTTMESTRIMMEL (AFLEDNING II) MED CALIPER OVERLAY */}
                <div className="relative z-10 mt-2 bg-white/40 backdrop-blur-xs rounded-xl border border-[#FECACA] p-3">
                    <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-[#DC2626] text-white">
                                II (Rytmestrimmel)
                            </span>
                            <span className="text-[11px] font-mono text-[#991B1B]">
                                Kontinuerlig rytmeovervågning (25 mm/s)
                            </span>
                        </div>
                        {isCaliperActive && (
                            <span className="text-[11px] font-bold text-[#DC2626] animate-pulse">
                                Skydelære aktiv – træk i de lodrette målelinjer
                            </span>
                        )}
                    </div>

                    <div
                        ref={rhythmStripRef}
                        className="relative w-full h-[100px] flex items-center overflow-hidden cursor-crosshair"
                    >
                        {/* Rytmestrimmel Kurve (6 sekunder / ca. 7-8 slag) */}
                        <svg viewBox="0 0 900 110" className="w-full h-full overflow-visible">
                            {/* Standardiseringspuls */}
                            <path
                                d="M 5 55 L 12 55 L 12 22 L 28 22 L 28 55 L 35 55"
                                fill="none"
                                stroke="#1E293B"
                                strokeWidth="1.8"
                            />
                            {/* Fortløbende kurve */}
                            <path
                                d={renderWaveformPath('II', 900, 110, 7.5)}
                                fill="none"
                                stroke="#0F172A"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        {/* SKÝDELÆRE MARKØRER (CALIPERS) */}
                        {isCaliperActive && (
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Målelinje 1 */}
                                <div
                                    onMouseDown={handleMouseDown('c1')}
                                    className="absolute top-0 bottom-0 w-1 bg-blue-600 cursor-ew-resize pointer-events-auto hover:w-2 transition-all z-20 flex flex-col items-center"
                                    style={{ left: `${caliper1}%` }}
                                >
                                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-bold shadow-md -mt-1">
                                        1
                                    </div>
                                    <div className="w-0.5 h-full bg-blue-600"></div>
                                </div>

                                {/* Målelinje 2 */}
                                <div
                                    onMouseDown={handleMouseDown('c2')}
                                    className="absolute top-0 bottom-0 w-1 bg-red-600 cursor-ew-resize pointer-events-auto hover:w-2 transition-all z-20 flex flex-col items-center"
                                    style={{ left: `${caliper2}%` }}
                                >
                                    <div className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center font-bold shadow-md -mt-1">
                                        2
                                    </div>
                                    <div className="w-0.5 h-full bg-red-600"></div>
                                </div>

                                {/* Målezone / skyggeområde mellem calipers */}
                                <div
                                    className="absolute top-0 bottom-0 bg-blue-500/15 border-t border-b border-blue-400/50 pointer-events-none"
                                    style={{
                                        left: `${Math.min(caliper1, caliper2)}%`,
                                        width: `${Math.abs(caliper2 - caliper1)}%`
                                    }}
                                >
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 px-2 py-0.5 rounded shadow text-[11px] font-mono font-bold text-slate-800">
                                        {deltaMs} ms
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* FORSTØRRELSESMODAL (HVIS EN AFLEDNING ER KLIKKET FORSTØRRET) */}
            {expandedLead && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-3xl w-full p-6 border border-[#E8E4D9] shadow-2xl flex flex-col">
                        <div className="flex justify-between items-center pb-4 border-b border-[#E8E4D9] mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#DC2626] text-white font-bold flex items-center justify-center text-base">
                                    {expandedLead}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#3A4A40]">Afledning {expandedLead} – Nærbillede</h3>
                                    <p className="text-xs text-[#839788]">{LEAD_DETAILS[expandedLead]?.desc}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setExpandedLead(null)}
                                className="p-2 rounded-xl bg-[#F2F6F3] text-[#839788] hover:text-[#3A4A40]"
                            >
                                <Minimize2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Nærbillede på millimeterpapir */}
                        <div
                            className="w-full h-64 bg-[#FFF5F5] rounded-2xl border-2 border-[#FCA5A5] relative overflow-hidden flex items-center p-4 my-2"
                            style={{
                                backgroundImage: `
                                    linear-gradient(to right, rgba(239, 68, 68, 0.28) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(239, 68, 68, 0.28) 1px, transparent 1px),
                                    linear-gradient(to right, rgba(220, 38, 38, 0.55) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(220, 38, 38, 0.55) 1px, transparent 1px)
                                `,
                                backgroundSize: '10px 10px, 10px 10px, 50px 50px, 50px 50px'
                            }}
                        >
                            <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
                                <path
                                    d={renderWaveformPath(expandedLead, 500, 160, 2)}
                                    fill="none"
                                    stroke="#0F172A"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setExpandedLead(null)}
                                className="px-5 py-2.5 rounded-xl bg-[#839788] text-white font-bold text-xs hover:bg-[#6A7A6E]"
                            >
                                Luk Nærbillede
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
