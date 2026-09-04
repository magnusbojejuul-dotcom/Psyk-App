import React, { useState, useRef } from 'react';
import {
    Activity,
    ZoomIn,
    ZoomOut,
    Sparkles,
    Info,
    ChevronRight,
    RotateCcw,
    ExternalLink,
    HelpCircle,
    FileText
} from '../Icons';
import { LEAD_NAMES, LEAD_DETAILS, generateLeadWaveform } from '../../data/ekgCases';
import { CASE_CLINICAL_COMPARISONS } from '../../data/ekgClinicalComparisons';

/**
 * Autentisk Dansk 12-Aflednings EKG Viewer med Klinisk Sammenligning og Ægte EKG Scans
 * 
 * Standard hospitalsformat:
 * - 25 mm/s papirhastighed (1 mm = 40 ms, 5 mm = 200 ms)
 * - 10 mm/mV voltage kalibrering (1 mm = 0.1 mV, 10 mm = 1.0 mV)
 * - 2x6 afledningslayout med standard 1 mV kalibreringspuls ved start
 * - Integreret pædagogisk forklaring: Hvad er særligt ved dette EKG, og hvorfor adskiller det sig fra et normalt EKG?
 * - Skift mellem simuleret 2×6 vektor-EKG og ægte kliniske 12-aflednings hospitals-scans (Sundhed.dk / Wikimedia Commons).
 */
export default function EkgViewer({
    caseData,
    allCases,
    onSelectCase,
    selectedLead = 'II',
    onSelectLead,
    onShowOnHeart
}) {
    // Zoom niveau for arket (1.0x, 1.25x, 1.5x, 2.0x)
    const [zoomLevel, setZoomLevel] = useState(1.0);
    const [activeLead, setActiveLead] = useState(selectedLead || 'II');
    const [displayMode, setDisplayMode] = useState(() => {
        if (window.location.hash.toLowerCase().includes('real')) return 'real';
        return 'simulated';
    });
    const [showExplanation, setShowExplanation] = useState(true);
    const [selectedImageIdx, setSelectedImageIdx] = useState(0);
    const paperContainerRef = useRef(null);

    // Hent kliniske detaljer og sammenligninger for netop denne case
    const clinicalInsight = CASE_CLINICAL_COMPARISONS[caseData.id] || {
        keyFindings: caseData.description,
        diffFromNormal: 'Afviger fra normalt reference-EKG i rytme eller bølgeform.',
        pathophysiology: caseData.anatomicalEffect || '',
        clinicalCriteria: 'Klinisk vurdering jf. Dansk Cardiologisk Selskab.',
        sundhedDkTitle: 'Sundhed.dk: Lægehåndbogen',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/undersoegelser/ekg-tjekliste/',
        dcsTitle: 'Dansk Cardiologisk Selskab (DCS)',
        dcsUrl: 'https://nbv.cardio.dk'
    };

    const imageList = clinicalInsight.realEkgImages || (clinicalInsight.realEkgImage ? [{
        id: 'default',
        title: 'Autentisk Klinisk Scan',
        badge: 'Hospitalsarkiv',
        caption: clinicalInsight.realEkgCaption,
        src: clinicalInsight.realEkgImage
    }] : []);

    React.useEffect(() => {
        setSelectedImageIdx(0);
    }, [caseData.id]);

    // EKG-Papir Dimensioner i SVG Koordinater:
    // Skala: 1 mm = 5 pixels (standard kalibrering)
    const PX_PER_MM = 5;
    const SHEET_WIDTH_MM = 260; // 260 mm papirbredde (ca. A4 liggende)
    const SHEET_HEIGHT_MM = 180; // 180 mm papirhøjde
    const SHEET_WIDTH = SHEET_WIDTH_MM * PX_PER_MM; // 1300 px
    const SHEET_HEIGHT = SHEET_HEIGHT_MM * PX_PER_MM; // 900 px

    // Række-definitioner (6 kanaler i 2 kolonner)
    const ROWS = [
        { rowIdx: 0, leftLead: 'I', rightLead: 'V1', baseYMm: 30 },
        { rowIdx: 1, leftLead: 'II', rightLead: 'V2', baseYMm: 55 },
        { rowIdx: 2, leftLead: 'III', rightLead: 'V3', baseYMm: 80 },
        { rowIdx: 3, leftLead: 'aVR', rightLead: 'V4', baseYMm: 105 },
        { rowIdx: 4, leftLead: 'aVL', rightLead: 'V5', baseYMm: 130 },
        { rowIdx: 5, leftLead: 'aVF', rightLead: 'V6', baseYMm: 155 }
    ];

    // Kolonne X-koordinater i mm:
    const COL_LEFT_START_MM = 18;
    const COL_LEFT_END_MM = 125;
    const COL_RIGHT_START_MM = 138;
    const COL_RIGHT_END_MM = 250;

    const handleSelectLeadClick = (lead) => {
        setActiveLead(lead);
        if (onSelectLead) onSelectLead(lead);
    };

    return (
        <div className="w-full flex flex-col gap-4">
            {/* TOP BAR: Header, Case Titel, Visningsskifter & Zoom Kontrol */}
            <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/85 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#839788] p-3 rounded-2xl text-white shadow-xs">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-[#3A4A40] leading-tight">{caseData.title}</h2>
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-[#E2E8DF] text-[#3A4A40]">
                                {caseData.badge}
                            </span>
                        </div>
                        <p className="text-xs text-[#839788]">{caseData.subtitle} • <strong>2×6 Hospitalsformat (25 mm/s, 10 mm/mV)</strong></p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    {/* Case Vælger */}
                    {allCases && allCases.length > 0 && (
                        <div className="flex items-center gap-2 bg-[#F2F6F3] px-3 py-1.5 rounded-xl border border-[#E8E4D9]">
                            <span className="text-xs font-bold text-[#839788]">Vælg EKG:</span>
                            <select
                                value={caseData?.id || ''}
                                onChange={(e) => {
                                    const found = allCases.find(c => c.id === e.target.value);
                                    if (found && onSelectCase) onSelectCase(found);
                                }}
                                className="bg-transparent text-xs font-bold text-[#3A4A40] focus:outline-hidden cursor-pointer max-w-[220px] truncate"
                            >
                                {allCases.map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.title} ({c.badge})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Visningsskifter: Simuleret vs Ægte Scan */}
                    <div className="flex bg-[#F2F6F3] p-1 rounded-xl border border-[#E8E4D9] text-xs font-semibold">
                        <button
                            onClick={() => setDisplayMode('simulated')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${displayMode === 'simulated' ? 'bg-white text-[#3A4A40] font-bold shadow-xs' : 'text-[#839788] hover:text-[#3A4A40]'}`}
                        >
                            📊 Simuleret 2×6 EKG
                        </button>
                        <button
                            onClick={() => setDisplayMode('real')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${displayMode === 'real' ? 'bg-white text-[#3A4A40] font-bold shadow-xs' : 'text-[#839788] hover:text-[#3A4A40]'}`}
                        >
                            📷 Ægte Klinisk Scan
                        </button>
                    </div>

                    {/* Zoom-kontrol (kun for simuleret visning) */}
                    {displayMode === 'simulated' && (
                        <div className="flex items-center gap-1 bg-[#F2F6F3] p-1 rounded-xl border border-[#E8E4D9] text-xs">
                            <span className="text-[10px] font-bold text-[#839788] px-1.5">Zoom:</span>
                            {[
                                { level: 1.0, label: '1x' },
                                { level: 1.25, label: '1.25x' },
                                { level: 1.5, label: '1.5x' },
                                { level: 2.0, label: '2x' }
                            ].map(z => (
                                <button
                                    key={z.level}
                                    onClick={() => setZoomLevel(z.level)}
                                    className={`px-2 py-1 rounded-lg font-semibold transition-all ${zoomLevel === z.level
                                        ? 'bg-white text-[#3A4A40] font-bold shadow-xs'
                                        : 'text-[#839788] hover:text-[#3A4A40]'
                                        }`}
                                >
                                    {z.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Se på hjerte knap */}
                    {onShowOnHeart && (
                        <button
                            onClick={onShowOnHeart}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#3A4A40] text-white hover:bg-[#2C3F34] transition-colors shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            Se på Hjerte
                        </button>
                    )}
                </div>
            </div>

            {/* DEDIKERET KLINISK FORKLARINGSPANEL: HVAD ER SÆRLIGT OG HVORFOR DET ADSKILLER SIG FRA ET NORMALT EKG */}
            {showExplanation && (
                <div className="glass-panel rounded-3xl p-5 border-2 border-[#839788]/30 bg-white/95 shadow-sm flex flex-col gap-4 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E8E4D9]">
                        <div className="flex items-center gap-2.5">
                            <div className="bg-[#839788] p-2 rounded-xl text-white shadow-xs">
                                <FileText className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#3A4A40]">
                                    Klinisk Analyse: {caseData.title}
                                </h3>
                                <p className="text-xs text-[#839788]">
                                    Hvorfor dette EKG adskiller sig fra et normalt reference-EKG
                                </p>
                            </div>
                        </div>

                        {/* Eksterne opslag til Sundhed.dk & DCS */}
                        <div className="flex items-center gap-2">
                            {clinicalInsight.sundhedDkUrl && (
                                <a
                                    href={clinicalInsight.sundhedDkUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EFF3F0] hover:bg-[#E2E8DF] text-xs font-bold text-[#2C3F34] border border-[#D9E1DA] transition-colors"
                                    title="Åbn Sundhed.dk Lægehåndbogen i ny fane"
                                >
                                    <span>Sundhed.dk (Lægehåndbogen)</span>
                                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                                </a>
                            )}
                            {clinicalInsight.dcsUrl && (
                                <a
                                    href={clinicalInsight.dcsUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 border border-slate-300 transition-colors"
                                    title="Åbn Dansk Cardiologisk Selskab (DCS) Vejledning"
                                >
                                    <span>DCS (Kardiologi.dk)</span>
                                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                        {/* 1. Hvad er særligt ved dette EKG? */}
                        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                                <span className="text-base">🔍</span>
                                <h4>Hvad er særligt ved dette EKG?</h4>
                            </div>
                            <p className="text-xs text-amber-900 leading-relaxed">
                                {clinicalInsight.keyFindings}
                            </p>
                            {caseData.affectedLeads && caseData.affectedLeads.length > 0 && (
                                <div className="mt-auto pt-2 flex flex-wrap gap-1 items-center">
                                    <span className="text-[10px] font-bold text-amber-950">Afficerede afledninger:</span>
                                    {caseData.affectedLeads.map(l => (
                                        <span key={l} className="px-1.5 py-0.5 rounded bg-amber-200/80 text-amber-950 text-[10px] font-bold">
                                            {l}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 2. Hvorfor adskiller det sig fra et normalt EKG? */}
                        <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-xs font-bold text-rose-950">
                                <span className="text-base">⚖️</span>
                                <h4>Forskel fra et normalt EKG</h4>
                            </div>
                            <p className="text-xs text-rose-900 leading-relaxed">
                                {clinicalInsight.diffFromNormal}
                            </p>
                            <p className="text-[11px] text-rose-800/90 leading-relaxed pt-1 border-t border-rose-200/60 mt-auto">
                                <strong>Mekanisme:</strong> {clinicalInsight.pathophysiology}
                            </p>
                        </div>

                        {/* 3. Diagnostiske Kriterier (DCS & Sundhed.dk) */}
                        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col gap-1.5">
                            <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
                                <span className="text-base">📋</span>
                                <h4>DCS & Sundhed.dk Kriterier</h4>
                            </div>
                            <p className="text-xs text-blue-900 leading-relaxed">
                                {clinicalInsight.clinicalCriteria || 'Vurderes ud fra standardkriterier for rytme, frekvens, akse og intervaller i henhold til Dansk Cardiologisk Selskab.'}
                            </p>
                            {caseData.reciprocalLeads && caseData.reciprocalLeads.length > 0 && (
                                <div className="mt-auto pt-2 flex flex-wrap gap-1 items-center">
                                    <span className="text-[10px] font-bold text-blue-950">Resiprokke afledninger:</span>
                                    {caseData.reciprocalLeads.map(l => (
                                        <span key={l} className="px-1.5 py-0.5 rounded bg-blue-200/80 text-blue-950 text-[10px] font-bold">
                                            {l}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* HOVEDVISNING: VÆLG MELLEM SIMULERET 2x6 EKG ELLER ÆGTE KLINISK SCAN */}
            {displayMode === 'simulated' ? (
                /* 1. SIMULERET DANSK 2x6 EKG ARK */
                <div className="glass-panel rounded-3xl p-3 sm:p-5 border border-[#E8E4D9] bg-white shadow-md overflow-hidden flex flex-col items-center">
                    <div
                        ref={paperContainerRef}
                        className="w-full overflow-auto rounded-2xl border border-[#FDA4AF] bg-[#FFF5F5] select-none"
                        style={{ maxHeight: '720px' }}
                    >
                        <div
                            style={{
                                width: `${SHEET_WIDTH * zoomLevel}px`,
                                height: `${SHEET_HEIGHT * zoomLevel}px`,
                                transformOrigin: 'top left'
                            }}
                            className="relative"
                        >
                            <svg
                                viewBox={`0 0 ${SHEET_WIDTH} ${SHEET_HEIGHT}`}
                                className="w-full h-full block"
                            >
                                <defs>
                                    <pattern id="mmSmallGrid" width="5" height="5" patternUnits="userSpaceOnUse">
                                        <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#FDA4AF" strokeWidth="0.45" opacity="0.65" />
                                    </pattern>
                                    <pattern id="mmBigGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                                        <rect width="25" height="25" fill="url(#mmSmallGrid)" />
                                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#F43F5E" strokeWidth="1.1" opacity="0.8" />
                                    </pattern>
                                </defs>

                                <rect width={SHEET_WIDTH} height={SHEET_HEIGHT} fill="#FFF5F5" />
                                <rect width={SHEET_WIDTH} height={SHEET_HEIGHT} fill="url(#mmBigGrid)" />

                                {/* 1. PATIENT- & JOURNAL-HEADER PÅ EKG-ARKET */}
                                <g id="ekgPaperHeader" transform="translate(40, 45)">
                                    <text x="0" y="0" fontSize="13" fontWeight="bold" fill="#0F172A">
                                        {caseData.title.toUpperCase()}
                                    </text>
                                    <text x="0" y="16" fontSize="9.5" fill="#475569">
                                        Puls: <tspan fontWeight="bold" fill="#0F172A">{caseData.heartRate} bpm</tspan> • Rytme: <tspan fontWeight="bold">{caseData.rhythm}</tspan> • Akse: <tspan fontWeight="bold">{caseData.axis}</tspan> • PR: <tspan fontWeight="bold">{caseData.prInterval}</tspan> • QRS: <tspan fontWeight="bold">{caseData.qrsDuration}</tspan> • QTc: <tspan fontWeight="bold">{caseData.qtc}</tspan>
                                    </text>
                                    <text x="800" y="0" fontSize="10" fontWeight="bold" fill="#991B1B">
                                        STANDARD DANSK HOSPITALSKALIBRERING: 25 mm/s • 10 mm/mV • 50 Hz filter
                                    </text>
                                    <text x="800" y="16" fontSize="9" fill="#64748B">
                                        Layout: 2×6 afledninger (4.3 sek) + Rytmestrimmel Lead II
                                    </text>
                                </g>

                                {/* 2. MIDTER-SEPARATOR */}
                                <line
                                    x1={130 * PX_PER_MM}
                                    y1={20 * PX_PER_MM}
                                    x2={130 * PX_PER_MM}
                                    y2={170 * PX_PER_MM}
                                    stroke="#F43F5E"
                                    strokeWidth="0.8"
                                    strokeDasharray="6 4"
                                    opacity="0.5"
                                />

                                {/* 3. TEGN ALLE 12 AFLEDNINGER */}
                                {ROWS.map(row => {
                                    const yPx = row.baseYMm * PX_PER_MM;

                                    return (
                                        <g key={`row-${row.rowIdx}`}>
                                            {/* VENSTRE AFLEDNING */}
                                            {(() => {
                                                const leadName = row.leftLead;
                                                const isLeadActive = activeLead === leadName;
                                                const isAffected = caseData.affectedLeads && caseData.affectedLeads.includes(leadName);

                                                const startX = COL_LEFT_START_MM * PX_PER_MM;
                                                const endX = COL_LEFT_END_MM * PX_PER_MM;
                                                const widthPx = endX - startX;
                                                const durationSec = widthPx / (25 * PX_PER_MM);

                                                const pts = generateLeadWaveform(caseData, leadName, Math.ceil(durationSec / 0.8) + 1, 250);

                                                let pathD = '';
                                                pts.forEach((p, idx) => {
                                                    const ptXPx = startX + (p.time * 25 * PX_PER_MM);
                                                    if (ptXPx <= endX) {
                                                        const ptYPx = yPx - (p.voltage * 10 * PX_PER_MM);
                                                        if (idx === 0) pathD += `M ${ptXPx.toFixed(1)} ${ptYPx.toFixed(1)}`;
                                                        else pathD += ` L ${ptXPx.toFixed(1)} ${ptYPx.toFixed(1)}`;
                                                    }
                                                });

                                                return (
                                                    <g
                                                        id={`lead-${leadName}`}
                                                        className="cursor-pointer"
                                                        onClick={() => handleSelectLeadClick(leadName)}
                                                    >
                                                        {isLeadActive && (
                                                            <rect
                                                                x={startX - 35}
                                                                y={yPx - 100}
                                                                width={widthPx + 40}
                                                                height={115}
                                                                fill="#3B82F6"
                                                                fillOpacity="0.06"
                                                                rx="6"
                                                            />
                                                        )}

                                                        <g transform={`translate(${startX - 35}, ${yPx - 15})`}>
                                                            <rect
                                                                width="30"
                                                                height="18"
                                                                rx="4"
                                                                fill={isLeadActive ? '#DC2626' : isAffected ? '#FEF3C7' : '#FFFFFF'}
                                                                stroke={isLeadActive ? '#991B1B' : isAffected ? '#D97706' : '#64748B'}
                                                                strokeWidth="1.2"
                                                            />
                                                            <text
                                                                x="15"
                                                                y="12.5"
                                                                textAnchor="middle"
                                                                fontSize="10"
                                                                fontWeight="bold"
                                                                fill={isLeadActive ? '#FFFFFF' : isAffected ? '#92400E' : '#0F172A'}
                                                            >
                                                                {leadName}
                                                            </text>
                                                        </g>

                                                        {/* 1.0 mV Kalibreringspuls */}
                                                        <path
                                                            d={`M ${startX - 28} ${yPx} L ${startX - 22} ${yPx} L ${startX - 22} ${yPx - 50} L ${startX - 9} ${yPx - 50} L ${startX - 9} ${yPx} L ${startX} ${yPx}`}
                                                            fill="none"
                                                            stroke="#0F172A"
                                                            strokeWidth="1.8"
                                                        />

                                                        {/* EKG Sporet */}
                                                        <path
                                                            d={pathD}
                                                            fill="none"
                                                            stroke="#0F172A"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                );
                                            })()}

                                            {/* HØJRE AFLEDNING */}
                                            {(() => {
                                                const leadName = row.rightLead;
                                                const isLeadActive = activeLead === leadName;
                                                const isAffected = caseData.affectedLeads && caseData.affectedLeads.includes(leadName);

                                                const startX = COL_RIGHT_START_MM * PX_PER_MM;
                                                const endX = COL_RIGHT_END_MM * PX_PER_MM;
                                                const widthPx = endX - startX;
                                                const durationSec = widthPx / (25 * PX_PER_MM);

                                                const pts = generateLeadWaveform(caseData, leadName, Math.ceil(durationSec / 0.8) + 1, 250);

                                                let pathD = '';
                                                pts.forEach((p, idx) => {
                                                    const ptXPx = startX + (p.time * 25 * PX_PER_MM);
                                                    if (ptXPx <= endX) {
                                                        const ptYPx = yPx - (p.voltage * 10 * PX_PER_MM);
                                                        if (idx === 0) pathD += `M ${ptXPx.toFixed(1)} ${ptYPx.toFixed(1)}`;
                                                        else pathD += ` L ${ptXPx.toFixed(1)} ${ptYPx.toFixed(1)}`;
                                                    }
                                                });

                                                return (
                                                    <g
                                                        id={`lead-${leadName}`}
                                                        className="cursor-pointer"
                                                        onClick={() => handleSelectLeadClick(leadName)}
                                                    >
                                                        {isLeadActive && (
                                                            <rect
                                                                x={startX - 35}
                                                                y={yPx - 100}
                                                                width={widthPx + 40}
                                                                height={115}
                                                                fill="#3B82F6"
                                                                fillOpacity="0.06"
                                                                rx="6"
                                                            />
                                                        )}

                                                        <g transform={`translate(${startX - 35}, ${yPx - 15})`}>
                                                            <rect
                                                                width="30"
                                                                height="18"
                                                                rx="4"
                                                                fill={isLeadActive ? '#DC2626' : isAffected ? '#FEF3C7' : '#FFFFFF'}
                                                                stroke={isLeadActive ? '#991B1B' : isAffected ? '#D97706' : '#64748B'}
                                                                strokeWidth="1.2"
                                                            />
                                                            <text
                                                                x="15"
                                                                y="12.5"
                                                                textAnchor="middle"
                                                                fontSize="10"
                                                                fontWeight="bold"
                                                                fill={isLeadActive ? '#FFFFFF' : isAffected ? '#92400E' : '#0F172A'}
                                                            >
                                                                {leadName}
                                                            </text>
                                                        </g>

                                                        {/* 1.0 mV Kalibreringspuls */}
                                                        <path
                                                            d={`M ${startX - 28} ${yPx} L ${startX - 22} ${yPx} L ${startX - 22} ${yPx - 50} L ${startX - 9} ${yPx - 50} L ${startX - 9} ${yPx} L ${startX} ${yPx}`}
                                                            fill="none"
                                                            stroke="#0F172A"
                                                            strokeWidth="1.8"
                                                        />

                                                        {/* EKG Sporet */}
                                                        <path
                                                            d={pathD}
                                                            fill="none"
                                                            stroke="#0F172A"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </g>
                                                );
                                            })()}
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* Status bar */}
                    <div className="w-full flex flex-wrap items-center justify-between text-xs text-[#839788] pt-2 px-1">
                        <div className="flex items-center gap-2">
                            <span>Fremhævet afledning: <strong className="text-[#3A4A40]">{activeLead}</strong> ({LEAD_DETAILS[activeLead]?.wall || 'Standard'})</span>
                            {caseData.affectedLeads && caseData.affectedLeads.includes(activeLead) && (
                                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10px]">
                                    Patologisk afledning
                                </span>
                            )}
                        </div>
                        <span>Klik på en afledning for at fremhæve sporet</span>
                    </div>
                </div>
            ) : (
                /* 2. ÆGTE KLINISKE EKG SCANS (MULTI-FOTO GALLERI FRA MEDICINSKE HOSPITALSKILDER) */
                <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white shadow-md flex flex-col gap-4">
                    {/* Header med tæller & overblik */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8E4D9]">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-[#3A4A40]">
                                    Autentiske Patientoptagelser: {caseData.title}
                                </h3>
                                <span className="text-xs px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold">
                                    {imageList.length} {imageList.length === 1 ? 'ægte optagelse' : 'ægte optagelser'}
                                </span>
                            </div>
                            <p className="text-xs text-[#839788] mt-0.5">
                                Sammenlign forskellige patientcases og kliniske manifestationer af {caseData.title.toLowerCase()}
                            </p>
                        </div>

                        {/* Forrige / Næste hurtigknapper */}
                        {imageList.length > 1 && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setSelectedImageIdx(prev => (prev > 0 ? prev - 1 : imageList.length - 1))}
                                    className="px-3 py-1.5 rounded-xl bg-[#F2F6F3] hover:bg-[#E2E8DF] text-xs font-bold text-[#3A4A40] border border-[#E8E4D9] transition-colors"
                                    title="Vis forrige patientoptagelse"
                                >
                                    ← Forrige
                                </button>
                                <span className="text-xs font-bold text-[#839788] px-1">
                                    {selectedImageIdx + 1} / {imageList.length}
                                </span>
                                <button
                                    onClick={() => setSelectedImageIdx(prev => (prev < imageList.length - 1 ? prev + 1 : 0))}
                                    className="px-3 py-1.5 rounded-xl bg-[#F2F6F3] hover:bg-[#E2E8DF] text-xs font-bold text-[#3A4A40] border border-[#E8E4D9] transition-colors"
                                    title="Vis næste patientoptagelse"
                                >
                                    Næste →
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Vælger-bjælke: Tabs til de forskellige fotos for netop denne case */}
                    {imageList.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                            <span className="text-xs font-bold text-[#839788] whitespace-nowrap mr-1">Vælg patient-case:</span>
                            {imageList.map((imgItem, idx) => (
                                <button
                                    key={imgItem.id || idx}
                                    onClick={() => setSelectedImageIdx(idx)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all ${
                                        selectedImageIdx === idx
                                            ? 'bg-[#3A4A40] text-white shadow-xs font-bold ring-2 ring-[#3A4A40]/20'
                                            : 'bg-[#F2F6F3] text-[#4A5D4E] hover:bg-[#E2E8DF] border border-[#E8E4D9]'
                                    }`}
                                >
                                    <span>Foto {idx + 1}</span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                                        selectedImageIdx === idx ? 'bg-white/20 text-white' : 'bg-white text-[#839788]'
                                    }`}>
                                        {imgItem.badge}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Billede Container med høj opløsning */}
                    {(() => {
                        const currentImg = imageList[selectedImageIdx] || imageList[0];
                        if (!currentImg) {
                            return (
                                <div className="py-20 text-center text-slate-500 text-sm">
                                    Intet billede tilgængeligt for denne specifikke case. Se det simulerede 2×6 EKG.
                                </div>
                            );
                        }

                        return (
                            <>
                                <div className="w-full rounded-2xl border-2 border-[#CBD5E1] bg-white overflow-hidden flex items-center justify-center p-3 shadow-inner min-h-[340px]">
                                    <div className="relative max-w-full flex items-center justify-center">
                                        <img
                                            key={currentImg.src}
                                            src={currentImg.src}
                                            alt={currentImg.title || `Klinisk EKG: ${caseData.title}`}
                                            className="max-h-[660px] w-auto max-w-full object-contain rounded-xl shadow-xs animate-fadeIn"
                                            loading="eager"
                                        />
                                    </div>
                                </div>

                                {/* Billedtekst, forklaring & Kilder for det valgte foto */}
                                <div className="p-4 rounded-2xl bg-[#F9F8F6] border border-[#E8E4D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                                    <div className="flex-1 pr-2">
                                        <div className="flex items-center gap-2 mb-1">
                                            <strong className="text-[#3A4A40] text-sm font-bold">
                                                {currentImg.title}
                                            </strong>
                                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                                {currentImg.badge}
                                            </span>
                                        </div>
                                        <p className="text-[#4A5D4E] leading-relaxed">
                                            {currentImg.caption}
                                        </p>
                                    </div>

                                    {clinicalInsight.sundhedDkUrl && (
                                        <a
                                            href={clinicalInsight.sundhedDkUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-2 rounded-xl bg-[#839788] text-white hover:bg-[#6A7A6E] font-bold transition-colors shadow-xs flex items-center gap-1.5 whitespace-nowrap shrink-0"
                                        >
                                            <span>Læs mere på Sundhed.dk</span>
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
}
