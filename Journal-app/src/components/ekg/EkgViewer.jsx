import React, { useState, useRef, useEffect } from 'react';
import {
    Maximize2, Minimize2, Crosshair, RotateCcw, Clock, Activity,
    ChevronRight, Layers, Sparkles, Layout, AlignLeft, ZoomIn, ZoomOut,
    Move, Target, Sliders, Check, Copy, Info
} from '../Icons';
import { LEAD_NAMES, LEAD_DETAILS, EKG_CASES, generateLeadWaveform } from '../../data/ekgCases';

/**
 * Autentisk 12-Aflednings EKG Papir (Klassisk Dansk / Europæisk 2 x 6 Format)
 * 
 * Layoutstruktur (identisk med standard hospitalsprint):
 * 6 Kanaler (rækker) x 2 Kolonner:
 *  - Række 1: I   (venstre)  |  V1 (højre)
 *  - Række 2: II  (venstre)  |  V2 (højre)
 *  - Række 3: III (venstre)  |  V3 (højre)
 *  - Række 4: aVR (venstre)  |  V4 (højre)
 *  - Række 5: aVL (venstre)  |  V5 (højre)
 *  - Række 6: aVF (venstre)  |  V6 (højre)
 * 
 * Fysisk skala:
 *  - 25 mm/s (1 mm = 40 ms, 5 mm = 200 ms)
 *  - 10 mm/mV (1 mm = 0.1 mV, 10 mm = 1.0 mV)
 *  - 1 mV standardiseringspuls ved venstre kant på hver række
 */
export default function EkgViewer({
    caseData,
    selectedLead = 'II',
    onSelectLead,
    onShowOnHeart
}) {
    // Zoom niveau for arket (1.0x, 1.25x, 1.5x, 2.0x)
    const [zoomLevel, setZoomLevel] = useState(1.0);
    // Skydelære synlighed
    const [isCaliperActive, setIsCaliperActive] = useState(true);
    // Passer-vandring (Marching Out)
    const [isMarchingOut, setIsMarchingOut] = useState(true);
    // Valgt afledning i fokus
    const [activeLead, setActiveLead] = useState(selectedLead || 'II');
    const [copiedFeedback, setCopiedFeedback] = useState(false);

    // EKG-Papir Dimensioner i SVG Koordinater:
    // Skala: 1 mm = 5 pixels (standard kalibrering)
    // Dvs:
    //  - 1 lille tern (1 mm) = 5 px
    //  - 1 stort tern (5 mm) = 25 px
    //  - 1 sekund (25 mm) = 125 px
    //  - 1.0 mV (10 mm) = 50 px
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
    // Venstre kolonne: X fra 18 mm til 125 mm (107 mm = 4.28 sekunder)
    // Højre kolonne:   X fra 138 mm til 250 mm (112 mm = 4.48 sekunder)
    const COL_LEFT_START_MM = 18;
    const COL_LEFT_END_MM = 125;
    const COL_RIGHT_START_MM = 138;
    const COL_RIGHT_END_MM = 250;

    // 2D Skydelære Kordinater (i pixels på arket)
    // Initialt placeret over Lead II (Row 1, Venstre side)
    const [caliperX1, setCaliperX1] = useState(38 * PX_PER_MM); // 190 px
    const [caliperX2, setCaliperX2] = useState(58 * PX_PER_MM); // 290 px (20 mm = 800 ms ved 75 bpm)
    const [caliperY1, setCaliperY1] = useState((55 - 12) * PX_PER_MM); // 1.2 mV over baseline
    const [caliperY2, setCaliperY2] = useState(55 * PX_PER_MM); // På baseline (55 mm)

    // Træk-tilstand (drag state)
    const [draggingPart, setDraggingPart] = useState(null); // 'left' | 'right' | 'top' | 'bottom' | 'box' | 'tl' | 'tr' | 'bl' | 'br'
    const dragStartRef = useRef({ mouseX: 0, mouseY: 0, x1: 0, x2: 0, y1: 0, y2: 0 });
    const paperContainerRef = useRef(null);

    // Synkroniser aktiv afledning udefra
    useEffect(() => {
        if (selectedLead && selectedLead !== activeLead) {
            setActiveLead(selectedLead);
            jumpCaliperToLead(selectedLead);
        }
    }, [selectedLead]);

    // Flyt skydelæren direkte til en specifik afledning på arket
    const jumpCaliperToLead = (leadName) => {
        setActiveLead(leadName);
        if (onSelectLead) onSelectLead(leadName);

        const row = ROWS.find(r => r.leftLead === leadName || r.rightLead === leadName);
        if (!row) return;

        const isLeft = row.leftLead === leadName;
        const startXmm = isLeft ? 45 : 165;
        const baseYmm = row.baseYMm;

        const curW = Math.abs(caliperX2 - caliperX1);
        const curH = Math.abs(caliperY2 - caliperY1);

        const newX1 = Math.round(startXmm * PX_PER_MM);
        const newX2 = newX1 + curW;
        const newY2 = Math.round(baseYmm * PX_PER_MM);
        const newY1 = newY2 - curH;

        setCaliperX1(newX1);
        setCaliperX2(newX2);
        setCaliperY1(newY1);
        setCaliperY2(newY2);
    };

    // Måleberegninger (Horisontal akse: 25 mm/s -> 1 mm = 40 ms)
    const deltaXPixels = Math.abs(caliperX2 - caliperX1);
    const deltaXmm = deltaXPixels / PX_PER_MM;
    const deltaMs = Math.round(deltaXmm * 40);
    const deltaSec = (deltaMs / 1000).toFixed(3);
    const smallBoxesX = (deltaMs / 40).toFixed(1);
    const bigBoxesX = (deltaMs / 200).toFixed(2);
    const calculatedBpm = deltaMs > 0 ? Math.round(60000 / deltaMs) : 0;

    // Måleberegninger (Vertikal akse: 10 mm/mV -> 1 mm = 0.1 mV)
    const deltaYPixels = Math.abs(caliperY2 - caliperY1);
    const deltaYmm = parseFloat((deltaYPixels / PX_PER_MM).toFixed(1));
    const deltaMv = parseFloat((deltaYmm * 0.1).toFixed(2));
    const smallBoxesY = (deltaYmm).toFixed(1);

    // Pointer Dragging for 2D Caliper
    const handlePointerDown = (part) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggingPart(part);
        dragStartRef.current = {
            mouseX: e.clientX,
            mouseY: e.clientY,
            x1: caliperX1,
            x2: caliperX2,
            y1: caliperY1,
            y2: caliperY2
        };
    };

    useEffect(() => {
        if (!draggingPart) return;

        const handlePointerMove = (e) => {
            const dx = (e.clientX - dragStartRef.current.mouseX) / zoomLevel;
            const dy = (e.clientY - dragStartRef.current.mouseY) / zoomLevel;

            let newX1 = dragStartRef.current.x1;
            let newX2 = dragStartRef.current.x2;
            let newY1 = dragStartRef.current.y1;
            let newY2 = dragStartRef.current.y2;

            if (draggingPart === 'left') {
                newX1 = Math.max(10, Math.min(newX2 - 5, dragStartRef.current.x1 + dx));
            } else if (draggingPart === 'right') {
                newX2 = Math.min(SHEET_WIDTH - 10, Math.max(newX1 + 5, dragStartRef.current.x2 + dx));
            } else if (draggingPart === 'top') {
                newY1 = Math.max(10, Math.min(newY2 - 5, dragStartRef.current.y1 + dy));
            } else if (draggingPart === 'bottom') {
                newY2 = Math.min(SHEET_HEIGHT - 10, Math.max(newY1 + 5, dragStartRef.current.y2 + dy));
            } else if (draggingPart === 'tl') {
                newX1 = Math.max(10, Math.min(newX2 - 5, dragStartRef.current.x1 + dx));
                newY1 = Math.max(10, Math.min(newY2 - 5, dragStartRef.current.y1 + dy));
            } else if (draggingPart === 'tr') {
                newX2 = Math.min(SHEET_WIDTH - 10, Math.max(newX1 + 5, dragStartRef.current.x2 + dx));
                newY1 = Math.max(10, Math.min(newY2 - 5, dragStartRef.current.y1 + dy));
            } else if (draggingPart === 'bl') {
                newX1 = Math.max(10, Math.min(newX2 - 5, dragStartRef.current.x1 + dx));
                newY2 = Math.min(SHEET_HEIGHT - 10, Math.max(newY1 + 5, dragStartRef.current.y2 + dy));
            } else if (draggingPart === 'br') {
                newX2 = Math.min(SHEET_WIDTH - 10, Math.max(newX1 + 5, dragStartRef.current.x2 + dx));
                newY2 = Math.min(SHEET_HEIGHT - 10, Math.max(newY1 + 5, dragStartRef.current.y2 + dy));
            } else if (draggingPart === 'box') {
                const width = dragStartRef.current.x2 - dragStartRef.current.x1;
                const height = dragStartRef.current.y2 - dragStartRef.current.y1;

                newX1 = Math.max(10, Math.min(SHEET_WIDTH - 10 - width, dragStartRef.current.x1 + dx));
                newX2 = newX1 + width;
                newY1 = Math.max(10, Math.min(SHEET_HEIGHT - 10 - height, dragStartRef.current.y1 + dy));
                newY2 = newY1 + height;
            }

            setCaliperX1(Math.round(newX1));
            setCaliperX2(Math.round(newX2));
            setCaliperY1(Math.round(newY1));
            setCaliperY2(Math.round(newY2));
        };

        const handlePointerUp = () => {
            setDraggingPart(null);
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('pointercancel', handlePointerUp);

        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('pointercancel', handlePointerUp);
        };
    }, [draggingPart, zoomLevel]);

    // Finjustering (Nudge)
    const nudgeTime = (deltaMm) => {
        const deltaPx = deltaMm * PX_PER_MM;
        setCaliperX2(prev => Math.max(caliperX1 + 5, Math.min(SHEET_WIDTH - 10, prev + deltaPx)));
    };

    const nudgeVoltage = (deltaMm) => {
        const deltaPx = deltaMm * PX_PER_MM;
        setCaliperY1(prev => Math.max(10, Math.min(caliperY2 - 5, prev - deltaPx)));
    };

    // Kliniske Forudindstillinger (Presets)
    const applyPreset = (presetType) => {
        switch (presetType) {
            case 'rr': {
                const hr = caseData.heartRate > 0 ? caseData.heartRate : 60;
                const rrSec = 60 / hr;
                const rrMm = rrSec * 25;
                const rrPx = Math.round(rrMm * PX_PER_MM);
                setCaliperX2(caliperX1 + rrPx);
                break;
            }
            case 'pr': {
                setCaliperX2(caliperX1 + (4 * PX_PER_MM)); // 160 ms = 4 mm
                break;
            }
            case 'qrs_normal': {
                setCaliperX2(caliperX1 + Math.round(2.125 * PX_PER_MM)); // 85 ms = 2.125 mm
                break;
            }
            case 'qrs_block': {
                setCaliperX2(caliperX1 + (3 * PX_PER_MM)); // 120 ms = 3 mm
                break;
            }
            case 'qtc': {
                setCaliperX2(caliperX1 + Math.round(10.5 * PX_PER_MM)); // 420 ms = 10.5 mm
                break;
            }
            case 'stemi_1mm': {
                setCaliperY1(caliperY2 - (1.0 * PX_PER_MM)); // 1.0 mm
                break;
            }
            case 'stemi_2mm': {
                setCaliperY1(caliperY2 - (2.0 * PX_PER_MM)); // 2.0 mm
                break;
            }
            default:
                break;
        }
    };

    // Kopiering af måledata til udklipsholder
    const handleCopyMeasurements = () => {
        const text = `EKG Måling (Dansk 2x6 Format):
Tid: ${deltaMs} ms (${deltaSec} s, ${smallBoxesX} små tern, ${bigBoxesX} store tern)
Beregnet Puls: ${calculatedBpm > 0 ? `${calculatedBpm} bpm` : 'N/A'}
Amplitude: ${deltaMv} mV (${deltaYmm} mm, ${smallBoxesY} små tern)
Case: ${caseData.title} (${caseData.badge})`;

        navigator.clipboard.writeText(text).then(() => {
            setCopiedFeedback(true);
            setTimeout(() => setCopiedFeedback(false), 2000);
        });
    };

    // Diagnostisk tolkning af de aktuelle måleværdier
    const getDiagnosticGuidance = () => {
        if (deltaMs >= 120 && deltaMs <= 170) {
            return {
                type: 'warning',
                text: `QRS-bredde: ${deltaMs} ms (≥ 120 ms / 3 små tern) → Breddeøget QRS-kompleks. Vurder for venstre/højre grenblok (LBBB/RBBB).`
            };
        }
        if (deltaMs > 200 && deltaMs <= 350) {
            return {
                type: 'warning',
                text: `PR-interval: ${deltaMs} ms (> 200 ms / 5 små tern) → 1. grads AV-blok (nedsat overledning i AV-knuden).`
            };
        }
        if (deltaMs >= 480 && deltaMs <= 600) {
            return {
                type: 'danger',
                text: `QT/QTc-område: ${deltaMs} ms (≥ 480-500 ms) → Patologisk forlænget QT. Forhøjet risiko for Torsades de Pointes.`
            };
        }
        if (deltaMv >= 0.20 && (activeLead === 'V2' || activeLead === 'V3')) {
            return {
                type: 'danger',
                text: `ST-elevation ${deltaYmm} mm (${deltaMv} mV) i ${activeLead}: Opfylder STEMI J-punkt elevationstærskel (≥ 2.0 mm for mænd ≥ 40 år).`
            };
        }
        if (deltaMv >= 0.10 && (activeLead === 'I' || activeLead === 'II' || activeLead === 'III' || activeLead === 'aVF')) {
            return {
                type: 'danger',
                text: `ST-elevation ${deltaYmm} mm (${deltaMv} mV) i ${activeLead}: Opfylder standard STEMI tærskel (≥ 1.0 mm i ekstremitetsafledninger).`
            };
        }
        return {
            type: 'info',
            text: `Aktiv måling: ${deltaMs} ms (${smallBoxesX} små tern) • ${deltaMv} mV (${deltaYmm} mm). Træk i skydelæren for at måle takker og intervaller.`
        };
    };

    const guidance = getDiagnosticGuidance();

    // Passer-vandring projektionsmarkører (+1, +2, +3 intervaller)
    const marchingMarks = [];
    if (isMarchingOut && deltaXPixels >= 15) {
        const interval = deltaXPixels;
        for (let i = 1; i <= 6; i++) {
            const nextX = caliperX2 + i * interval;
            if (nextX < SHEET_WIDTH - 20) {
                marchingMarks.push({ x: nextX, label: `+${i}R` });
            }
        }
        for (let i = 1; i <= 3; i++) {
            const prevX = caliperX1 - i * interval;
            if (prevX > 20) {
                marchingMarks.push({ x: prevX, label: `-${i}R` });
            }
        }
    }

    // Tegn en afledningskurve ind i en bestemt X- og Y-ramme på papiret
    const renderChannelWaveform = (leadName, startXmm, endXmm, baseYmm) => {
        const spanMm = endXmm - startXmm;
        const durationSec = spanMm / 25; // 25 mm/s
        const hr = caseData.heartRate > 0 ? caseData.heartRate : 60;
        const beatSec = 60 / hr;
        const numBeats = durationSec / beatSec;

        const points = generateLeadWaveform(caseData, leadName, numBeats);
        if (!points || points.length === 0) return '';

        const maxTime = points[points.length - 1].time;
        const startX = startXmm * PX_PER_MM;
        const endX = endXmm * PX_PER_MM;
        const width = endX - startX;
        const baseY = baseYmm * PX_PER_MM;

        let pathStr = '';
        points.forEach((p, idx) => {
            const x = startX + (p.time / maxTime) * width;
            // 1.0 mV = 10 mm * PX_PER_MM = 50 px
            const y = baseY - (p.voltage * 10 * PX_PER_MM);
            if (idx === 0) pathStr += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
            else pathStr += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        });

        return pathStr;
    };

    return (
        <div className="w-full flex flex-col gap-4">
            {/* TOP BAR: Header, Case Titel & Zoom Kontrol */}
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
                    {/* Zoom-kontrol */}
                    <div className="flex items-center gap-1 bg-[#F2F6F3] p-1 rounded-xl border border-[#E8E4D9] text-xs">
                        <span className="text-[10px] font-bold text-[#839788] px-1.5">Zoom:</span>
                        {[
                            { level: 1.0, label: '1x (Helark)' },
                            { level: 1.25, label: '1.25x' },
                            { level: 1.5, label: '1.5x' },
                            { level: 2.0, label: '2x (Nærbillede)' }
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

                    {/* Skydelære Hovedknap */}
                    <button
                        onClick={() => setIsCaliperActive(!isCaliperActive)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border shadow-sm ${isCaliperActive
                            ? 'bg-[#DC2626] text-white border-[#B91C1C]'
                            : 'bg-[#F2F6F3] text-[#3A4A40] border-[#E8E4D9] hover:bg-[#E2E8DF]'
                            }`}
                    >
                        <Crosshair className="w-4 h-4" />
                        {isCaliperActive ? 'Skjul Skydelære' : 'Aktivér Skydelære'}
                    </button>

                    {/* Se på hjerte knap */}
                    {onShowOnHeart && (
                        <button
                            onClick={onShowOnHeart}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-[#3A4A40] text-white hover:bg-[#2C3F34] transition-colors shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            Se på Hjerte
                        </button>
                    )}
                </div>
            </div>

            {/* SKYDELÆRE KONTROLPANEL & DIGITALE DISPLAY (NÅR SKYDELÆRE ER AKTIV) */}
            {isCaliperActive && (
                <div className="glass-panel rounded-3xl p-5 border-2 border-[#DC2626]/30 bg-white/95 shadow-md flex flex-col gap-3 animate-fadeIn">
                    {/* Hurtig-spring til afledninger */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E8E4D9]">
                        <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs font-bold text-[#839788] mr-1 flex items-center gap-1">
                                <Target className="w-3.5 h-3.5 text-[#DC2626]" />
                                Flyt skydelære til:
                            </span>
                            {LEAD_NAMES.map(lead => {
                                const isLeadSel = activeLead === lead;
                                const isAffected = caseData.affectedLeads && caseData.affectedLeads.includes(lead);
                                return (
                                    <button
                                        key={lead}
                                        onClick={() => jumpCaliperToLead(lead)}
                                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${isLeadSel
                                            ? 'bg-[#DC2626] text-white border-[#991B1B] shadow-xs scale-105'
                                            : isAffected
                                                ? 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200 font-bold'
                                                : 'bg-[#F2F6F3] text-[#3A4A40] border-[#E8E4D9] hover:bg-[#E2E8DF]'
                                            }`}
                                    >
                                        {lead}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Passer-vandring toggle */}
                        <button
                            onClick={() => setIsMarchingOut(!isMarchingOut)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${isMarchingOut
                                ? 'bg-[#839788] text-white border-[#6A7A6E]'
                                : 'bg-[#F2F6F3] text-[#3A4A40] border-[#E8E4D9]'
                                }`}
                            title="Vis automatisk gentagne intervaller for at tjekke regelmæssighed af P- eller R-takker"
                        >
                            <span>Passer-vandring ({isMarchingOut ? 'Aktiv' : 'Fra'})</span>
                        </button>
                    </div>

                    {/* Måleresultater Display */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#F9F8F6] p-3.5 rounded-2xl border border-[#E8E4D9]">
                        {/* 1. Tidsinterval (Δt) */}
                        <div className="bg-white p-2.5 rounded-xl border border-[#E8E4D9]">
                            <span className="text-[10px] font-bold text-[#839788] uppercase block">Tidsinterval (Δt)</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-[#1E293B] font-mono">{deltaMs} ms</span>
                                <span className="text-xs text-[#64748B] font-mono">({deltaSec} s)</span>
                            </div>
                            <span className="text-[11px] text-[#839788] font-mono">
                                <strong>{smallBoxesX}</strong> små tern • <strong>{bigBoxesX}</strong> store tern
                            </span>
                        </div>

                        {/* 2. Hjertefrekvens */}
                        <div className="bg-white p-2.5 rounded-xl border border-[#E8E4D9]">
                            <span className="text-[10px] font-bold text-[#839788] uppercase block">Beregnet Puls</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-[#1E293B] font-mono">
                                    {calculatedBpm > 0 && calculatedBpm < 300 ? `${calculatedBpm} bpm` : '—'}
                                </span>
                            </div>
                            <span className="text-[11px] text-[#839788]">
                                60.000 / {deltaMs} ms
                            </span>
                        </div>

                        {/* 3. Amplitude / Spænding (ΔV) */}
                        <div className="bg-white p-2.5 rounded-xl border border-[#E8E4D9]">
                            <span className="text-[10px] font-bold text-[#839788] uppercase block">Amplitude (Spænding)</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-[#1E293B] font-mono">{deltaMv.toFixed(2)} mV</span>
                                <span className="text-xs text-[#DC2626] font-bold font-mono">({deltaYmm} mm)</span>
                            </div>
                            <span className="text-[11px] text-[#839788] font-mono">
                                <strong>{smallBoxesY}</strong> små tern i højden
                            </span>
                        </div>

                        {/* 4. Kopier & Nulstil */}
                        <div className="bg-white p-2.5 rounded-xl border border-[#E8E4D9] flex flex-col justify-between">
                            <span className="text-[10px] font-bold text-[#839788] uppercase block">Handlinger</span>
                            <div className="flex gap-1.5 mt-1">
                                <button
                                    onClick={handleCopyMeasurements}
                                    className="flex-1 py-1.5 rounded-lg bg-[#839788] text-white font-bold text-xs hover:bg-[#6A7A6E] transition-colors flex items-center justify-center gap-1 shadow-2xs"
                                >
                                    {copiedFeedback ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copiedFeedback ? 'Kopieret!' : 'Kopier'}</span>
                                </button>
                                <button
                                    onClick={() => jumpCaliperToLead('II')}
                                    className="px-2.5 py-1.5 rounded-lg bg-[#F2F6F3] text-[#839788] hover:text-[#3A4A40] text-xs font-medium border border-[#E8E4D9]"
                                    title="Centrer på afledning II"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Klinisk pejlemærke */}
                    <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${guidance.type === 'danger'
                        ? 'bg-rose-50 border-rose-200 text-rose-950 font-medium'
                        : guidance.type === 'warning'
                            ? 'bg-amber-50 border-amber-200 text-amber-950 font-medium'
                            : 'bg-[#EFF3F0] border-[#D9E1DA] text-[#3A4A40]'
                        }`}>
                        <Info className="w-4 h-4 shrink-0 mt-0.5 text-current opacity-80" />
                        <div className="leading-relaxed">
                            <strong className="font-bold">Klinisk vurdering: </strong>
                            {guidance.text}
                        </div>
                    </div>

                    {/* Finjustering & Hurtigmål */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-[#839788]">Finjustér:</span>
                            <div className="flex items-center gap-1">
                                <button onClick={() => nudgeTime(-5)} className="px-2 py-0.5 rounded bg-[#F2F6F3] border border-[#E8E4D9] font-semibold text-[#3A4A40] hover:bg-[#E2E8DF]">-5 mm (-200 ms)</button>
                                <button onClick={() => nudgeTime(-1)} className="px-2 py-0.5 rounded bg-[#F2F6F3] border border-[#E8E4D9] font-semibold text-[#3A4A40] hover:bg-[#E2E8DF]">-1 mm (-40 ms)</button>
                                <button onClick={() => nudgeTime(1)} className="px-2 py-0.5 rounded bg-[#F2F6F3] border border-[#E8E4D9] font-semibold text-[#3A4A40] hover:bg-[#E2E8DF]">+1 mm (+40 ms)</button>
                                <button onClick={() => nudgeTime(5)} className="px-2 py-0.5 rounded bg-[#F2F6F3] border border-[#E8E4D9] font-semibold text-[#3A4A40] hover:bg-[#E2E8DF]">+5 mm (+200 ms)</button>
                            </div>
                            <div className="h-3 w-px bg-[#E8E4D9] mx-1"></div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => nudgeVoltage(-1)} className="px-2 py-0.5 rounded bg-[#F2F6F3] border border-[#E8E4D9] font-semibold text-[#3A4A40] hover:bg-[#E2E8DF]">-1 mm højde</button>
                                <button onClick={() => nudgeVoltage(1)} className="px-2 py-0.5 rounded bg-[#F2F6F3] border border-[#E8E4D9] font-semibold text-[#3A4A40] hover:bg-[#E2E8DF]">+1 mm højde</button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1">
                            <span className="font-bold text-[#839788]">Hurtigmål:</span>
                            <button onClick={() => applyPreset('rr')} className="px-2 py-0.5 rounded bg-white border border-[#D9E1DA] font-bold text-[#2C3F34] hover:bg-[#EFF3F0]">1 R-R cyklus</button>
                            <button onClick={() => applyPreset('pr')} className="px-2 py-0.5 rounded bg-white border border-[#D9E1DA] font-medium text-[#3A4A40] hover:bg-[#EFF3F0]">PR (160 ms)</button>
                            <button onClick={() => applyPreset('qrs_normal')} className="px-2 py-0.5 rounded bg-white border border-[#D9E1DA] font-medium text-[#3A4A40] hover:bg-[#EFF3F0]">QRS (85 ms)</button>
                            <button onClick={() => applyPreset('qrs_block')} className="px-2 py-0.5 rounded bg-white border border-[#D9E1DA] font-bold text-rose-900 hover:bg-[#EFF3F0]">Grenblok (120 ms)</button>
                            <button onClick={() => applyPreset('qtc')} className="px-2 py-0.5 rounded bg-white border border-[#D9E1DA] font-medium text-[#3A4A40] hover:bg-[#EFF3F0]">QTc (420 ms)</button>
                            <button onClick={() => applyPreset('stemi_1mm')} className="px-2 py-0.5 rounded bg-white border border-[#D9E1DA] font-bold text-amber-900 hover:bg-[#EFF3F0]">ST 1 mm</button>
                            <button onClick={() => applyPreset('stemi_2mm')} className="px-2 py-0.5 rounded bg-white border border-[#D9E1DA] font-bold text-rose-900 hover:bg-[#EFF3F0]">ST 2 mm</button>
                        </div>
                    </div>
                </div>
            )}

            {/* SELVE EKG-PAPIR ARKET (AUTENTISK 2x6 KLINISK FORMAT IDENTISK MED BRUGERBILLEDE) */}
            <div
                ref={paperContainerRef}
                className="w-full overflow-x-auto rounded-3xl border-2 border-[#FCA5A5]/80 bg-[#FFF8F8] shadow-lg select-none p-2"
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
                        className="w-full h-full"
                    >
                        <defs>
                            {/* 1 mm lille tern (5 px x 5 px) */}
                            <pattern id="ekgSmallGrid" width={PX_PER_MM} height={PX_PER_MM} patternUnits="userSpaceOnUse">
                                <path d={`M ${PX_PER_MM} 0 L 0 0 0 ${PX_PER_MM}`} fill="none" stroke="#F87171" strokeWidth="0.5" strokeOpacity="0.35" />
                            </pattern>

                            {/* 5 mm stort tern (25 px x 25 px = 200 ms x 0.5 mV) */}
                            <pattern id="ekgBigGrid" width={PX_PER_MM * 5} height={PX_PER_MM * 5} patternUnits="userSpaceOnUse">
                                <rect width={PX_PER_MM * 5} height={PX_PER_MM * 5} fill="url(#ekgSmallGrid)" />
                                <path d={`M ${PX_PER_MM * 5} 0 L 0 0 0 ${PX_PER_MM * 5}`} fill="none" stroke="#EF4444" strokeWidth="1.1" strokeOpacity="0.65" />
                            </pattern>
                        </defs>

                        {/* 1. KONTINUERLIGT UAFBRUDT MILLIMETERPAPIR HEN OVER HELE SIDEN */}
                        <rect width={SHEET_WIDTH} height={SHEET_HEIGHT} fill="url(#ekgBigGrid)" />

                        {/* 2. KLINISK HOSPITALSPRINT HEADER */}
                        <g id="sheetHeader" className="font-mono select-none">
                            <text x="25" y="25" fontSize="12" fontWeight="bold" fill="#334155">
                                Operatør: Klinisk EKG-Enhed
                            </text>
                            <text x="450" y="25" fontSize="12" fontWeight="bold" fill="#334155">
                                Patient: {caseData.title} ({caseData.badge})
                            </text>
                            <text x="950" y="25" fontSize="12" fontWeight="bold" fill="#334155">
                                Puls: {caseData.heartRate} bpm • QTc: {caseData.qtc}
                            </text>
                            <text x="25" y="45" fontSize="10.5" fill="#64748B">
                                25 mm/s • 10 mm/mV • 0.05-150 Hz • 12-Aflednings EKG (2×6 Format)
                            </text>
                        </g>

                        {/* 3. DE 6 HORISONTALE RÆKKER (KANALER) MED AFLEDNINGER OG KALIBRERINGSPULSER */}
                        {ROWS.map(row => {
                            const baseY = row.baseYMm * PX_PER_MM;
                            const pulseHeight = 10 * PX_PER_MM; // 10 mm = 50 px (1.0 mV)
                            const pulseWidth = 5 * PX_PER_MM; // 5 mm = 25 px (0.2 s)
                            const pulseStartX = 6 * PX_PER_MM; // 30 px

                            return (
                                <g key={row.rowIdx} id={`row_${row.rowIdx}`}>
                                    {/* 1 mV Standardiseringspuls ved venstre kant på hver række */}
                                    <path
                                        d={`M ${pulseStartX} ${baseY} L ${pulseStartX + 4} ${baseY} L ${pulseStartX + 4} ${baseY - pulseHeight} L ${pulseStartX + 4 + pulseWidth} ${baseY - pulseHeight} L ${pulseStartX + 4 + pulseWidth} ${baseY} L ${pulseStartX + 4 + pulseWidth + 6} ${baseY}`}
                                        fill="none"
                                        stroke="#1E293B"
                                        strokeWidth="1.8"
                                    />

                                    {/* VENSTRE KOLONNE (Ekstremitetsafledning) */}
                                    {/* Afledningsnavn trykt direkte på papiret */}
                                    <text
                                        x={pulseStartX + 4 + pulseWidth + 12}
                                        y={baseY + 5}
                                        fontSize="14"
                                        fontFamily="monospace"
                                        fontWeight="bold"
                                        fill={activeLead === row.leftLead ? '#DC2626' : '#1E293B'}
                                        className="cursor-pointer select-none"
                                        onClick={() => jumpCaliperToLead(row.leftLead)}
                                    >
                                        {row.leftLead}
                                    </text>

                                    {/* Kurve for venstre afledning (I, II, III, aVR, aVL, aVF) */}
                                    <path
                                        d={renderChannelWaveform(row.leftLead, COL_LEFT_START_MM, COL_LEFT_END_MM, row.baseYMm)}
                                        fill="none"
                                        stroke="#1E293B"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="cursor-pointer"
                                        onClick={() => jumpCaliperToLead(row.leftLead)}
                                    />

                                    {/* HØJRE KOLONNE (Brystafledning V1 - V6) */}
                                    {/* Afledningsnavn trykt ved midtpunktet */}
                                    <text
                                        x={130 * PX_PER_MM}
                                        y={baseY + 5}
                                        fontSize="14"
                                        fontFamily="monospace"
                                        fontWeight="bold"
                                        fill={activeLead === row.rightLead ? '#DC2626' : '#1E293B'}
                                        className="cursor-pointer select-none"
                                        onClick={() => jumpCaliperToLead(row.rightLead)}
                                    >
                                        {row.rightLead}
                                    </text>

                                    {/* Kurve for højre afledning (V1, V2, V3, V4, V5, V6) */}
                                    <path
                                        d={renderChannelWaveform(row.rightLead, COL_RIGHT_START_MM, COL_RIGHT_END_MM, row.baseYMm)}
                                        fill="none"
                                        stroke="#1E293B"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="cursor-pointer"
                                        onClick={() => jumpCaliperToLead(row.rightLead)}
                                    />
                                </g>
                            );
                        })}

                        {/* 4. PASSER-VANDRING ("MARCHING OUT") STIPLEDE HJÆLPELINJER */}
                        {isCaliperActive && isMarchingOut && marchingMarks.map((mark, idx) => (
                            <g key={idx} opacity="0.85">
                                <line
                                    x1={mark.x}
                                    y1={caliperY1 - 25}
                                    x2={mark.x}
                                    y2={caliperY2 + 25}
                                    stroke="#2563EB"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 3"
                                />
                                <circle cx={mark.x} cy={caliperY1 - 25} r="3" fill="#2563EB" />
                                <rect x={mark.x - 12} y={caliperY1 - 42} width="24" height="14" rx="3" fill="#1E40AF" />
                                <text x={mark.x} y={caliperY1 - 32} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#FFFFFF">
                                    {mark.label}
                                </text>
                            </g>
                        ))}

                        {/* 5. SELVE DEN 2D SKYDELÆRE OVERLAY (PLAST/METAL LOOK) */}
                        {isCaliperActive && (() => {
                            const minX = Math.min(caliperX1, caliperX2);
                            const maxX = Math.max(caliperX1, caliperX2);
                            const minY = Math.min(caliperY1, caliperY2);
                            const maxY = Math.max(caliperY1, caliperY2);
                            const boxW = maxX - minX;
                            const boxH = maxY - minY;

                            return (
                                <g id="interactiveCaliper">
                                    {/* Målezone / Transparent Blå Box (Trækkes for at flytte hele skydelæren) */}
                                    <rect
                                        x={minX}
                                        y={minY}
                                        width={boxW}
                                        height={boxH}
                                        fill="#3B82F6"
                                        fillOpacity="0.18"
                                        stroke="#2563EB"
                                        strokeWidth="1.5"
                                        strokeDasharray="3 2"
                                        className="cursor-move"
                                        onPointerDown={handlePointerDown('box')}
                                    />

                                    {/* Midterbadge med måleværdi (ms) */}
                                    <g transform={`translate(${minX + boxW / 2}, ${minY + boxH / 2})`} className="pointer-events-none select-none">
                                        <rect x="-40" y="-12" width="80" height="24" rx="6" fill="#0F172A" fillOpacity="0.9" stroke="#60A5FA" strokeWidth="1" />
                                        <text x="0" y="3" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FFFFFF">
                                            {deltaMs} ms
                                        </text>
                                    </g>

                                    {/* Venstre Måleben (Tid Start) */}
                                    <line
                                        x1={minX}
                                        y1={Math.max(20, minY - 30)}
                                        x2={minX}
                                        y2={Math.min(SHEET_HEIGHT - 20, maxY + 30)}
                                        stroke="#2563EB"
                                        strokeWidth="2.5"
                                        className="cursor-ew-resize"
                                        onPointerDown={handlePointerDown('left')}
                                    />
                                    <circle cx={minX} cy={minY} r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" className="cursor-nwse-resize" onPointerDown={handlePointerDown('tl')} />
                                    <circle cx={minX} cy={maxY} r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" className="cursor-nesw-resize" onPointerDown={handlePointerDown('bl')} />

                                    {/* Højre Måleben (Tid Slut) */}
                                    <line
                                        x1={maxX}
                                        y1={Math.max(20, minY - 30)}
                                        x2={maxX}
                                        y2={Math.min(SHEET_HEIGHT - 20, maxY + 30)}
                                        stroke="#DC2626"
                                        strokeWidth="2.5"
                                        className="cursor-ew-resize"
                                        onPointerDown={handlePointerDown('right')}
                                    />
                                    <circle cx={maxX} cy={minY} r="5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" className="cursor-nesw-resize" onPointerDown={handlePointerDown('tr')} />
                                    <circle cx={maxX} cy={maxY} r="5" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" className="cursor-nwse-resize" onPointerDown={handlePointerDown('br')} />

                                    {/* Øvre Måleben (Amplitude Top / Spænding) */}
                                    <line
                                        x1={Math.max(20, minX - 25)}
                                        y1={minY}
                                        x2={Math.min(SHEET_WIDTH - 20, maxX + 25)}
                                        y2={minY}
                                        stroke="#059669"
                                        strokeWidth="2"
                                        className="cursor-ns-resize"
                                        onPointerDown={handlePointerDown('top')}
                                    />
                                    <rect x={minX - 4} y={minY - 18} width="54" height="15" rx="3" fill="#065F46" />
                                    <text x={minX + 23} y={minY - 7} textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#FFFFFF">
                                        +{deltaYmm} mm
                                    </text>

                                    {/* Nedre Måleben (Amplitude Bund / Grundlinje) */}
                                    <line
                                        x1={Math.max(20, minX - 25)}
                                        y1={maxY}
                                        x2={Math.min(SHEET_WIDTH - 20, maxX + 25)}
                                        y2={maxY}
                                        stroke="#059669"
                                        strokeWidth="2"
                                        className="cursor-ns-resize"
                                        onPointerDown={handlePointerDown('bottom')}
                                    />
                                </g>
                            );
                        })()}
                    </svg>
                </div>
            </div>
        </div>
    );
}


