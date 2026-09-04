import React, { useState } from 'react';
import { 
    FileText, Download, AlertTriangle, CheckCircle, Info, ShieldAlert, 
    Activity, Brain, Users, User, ChevronRight, ChevronDown, ChevronUp, Pill, AlertCircle, Sparkles, Check 
} from './Icons';
import { renderWithDrugLinks } from '../utils/linkifyDrugs';
import { GUIDELINES_RICH_DATA } from '../data/guidelinesRichData';

export function ClinicalGuidelineView({ guidelineKey, onNavigate, fallbackGuideline }) {
    const [activeTab, setActiveTab] = useState('algoritme');
    const [activeStepFilter, setActiveStepFilter] = useState('all');
    const [expandedSteps, setExpandedSteps] = useState({});

    const data = GUIDELINES_RICH_DATA[guidelineKey];

    if (!data) {
        return (
            <div className="p-8 text-center text-slate-500">
                <p>Vejledningsdata ikke fundet for {guidelineKey}.</p>
            </div>
        );
    }

    const toggleStep = (index) => {
        setExpandedSteps(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const formatPdfUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        const cleanPath = url.startsWith('/') ? url.slice(1) : url;
        return `${import.meta.env.BASE_URL}${cleanPath}`;
    };

    const mainPdf = data.pdfs && data.pdfs.length > 0 ? data.pdfs[0] : null;
    const secondaryPdfs = data.pdfs && data.pdfs.length > 1 ? data.pdfs.slice(1) : [];

    const displayedSteps = activeStepFilter === 'all' 
        ? data.algorithm 
        : data.algorithm.filter((_, idx) => idx === parseInt(activeStepFilter, 10));

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">
            {/* Header with Title and PDF Access */}
            <div className="mb-8 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-[#E8E4D9] shadow-sm">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#839788]/15 text-[#3A4A40] text-xs font-black uppercase tracking-wider mb-2">
                        <Activity className="w-3.5 h-3.5 text-[#839788]" /> {data.sourceBadge}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#3A4A40] tracking-tight">
                        {data.title}
                    </h2>
                    <p className="text-sm text-[#839788] mt-1 font-medium">
                        {data.subtitle}
                    </p>
                </div>

                {/* PDF Access Buttons */}
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2.5 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                    {mainPdf && (
                        <a 
                            href={formatPdfUrl(mainPdf.url)} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#839788] to-[#6A7A6E] text-white px-5 py-3 rounded-2xl hover:from-[#728577] hover:to-[#5B6A5F] transition-all shadow-md hover:shadow-lg font-bold text-sm hover:-translate-y-0.5 group"
                            title={mainPdf.title}
                        >
                            <FileText className="w-4 h-4 text-white group-hover:scale-110 transition-transform" /> 
                            <span>{mainPdf.title}</span>
                        </a>
                    )}
                    
                    {secondaryPdfs.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {secondaryPdfs.map((pdf, pIdx) => (
                                <a 
                                    key={pIdx}
                                    href={formatPdfUrl(pdf.url)} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 bg-white border border-[#E8E4D9] text-[#5C6B61] hover:text-[#3A4A40] hover:bg-[#FAF9F6] px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold shadow-sm"
                                    title={pdf.title}
                                >
                                    <Download className="w-3.5 h-3.5 text-[#839788]" /> {pdf.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 3 Quick Clinical Takeaway Cards */}
            {data.takeaways && data.takeaways.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* Takeaway 1 (Emerald) */}
                    <div className="bg-gradient-to-br from-emerald-50/90 to-white p-4 rounded-2xl border border-emerald-200/70 shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider mb-1.5">
                            <CheckCircle className="w-4 h-4 text-emerald-600" /> {data.takeaways[0].title}
                        </div>
                        <p className="text-xs text-[#4A5A50] leading-relaxed">
                            {data.takeaways[0].text}
                        </p>
                    </div>

                    {/* Takeaway 2 (Blue) */}
                    <div className="bg-gradient-to-br from-blue-50/90 to-white p-4 rounded-2xl border border-blue-200/70 shadow-sm">
                        <div className="flex items-center gap-2 text-blue-800 font-black text-xs uppercase tracking-wider mb-1.5">
                            <Pill className="w-4 h-4 text-blue-600" /> {data.takeaways[1].title}
                        </div>
                        <p className="text-xs text-[#4A5A50] leading-relaxed">
                            {data.takeaways[1].text}
                        </p>
                    </div>

                    {/* Takeaway 3 (Rose/Amber) */}
                    <div className="bg-gradient-to-br from-rose-50/90 to-white p-4 rounded-2xl border border-rose-200/70 shadow-sm">
                        <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wider mb-1.5">
                            <ShieldAlert className="w-4 h-4 text-rose-600" /> {data.takeaways[2].title}
                        </div>
                        <p className="text-xs text-[#4A5A50] leading-relaxed">
                            {data.takeaways[2].text}
                        </p>
                    </div>
                </div>
            )}

            {/* Main Navigation Tabs */}
            <div className="glass-panel rounded-2xl overflow-hidden shadow-sm border border-white/60 mb-8">
                <div className="flex border-b border-[#E8E4D9] bg-white/60 backdrop-blur-md overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => setActiveTab('algoritme')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === 'algoritme' 
                                ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white shadow-sm' 
                                : 'text-[#839788] hover:bg-white/50'
                        }`}
                    >
                        <Activity className="w-4 h-4" /> 1. Behandlingsalgoritme
                    </button>
                    {data.medications && data.medications.length > 0 && (
                        <button
                            onClick={() => setActiveTab('medicin')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${
                                activeTab === 'medicin' 
                                    ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white shadow-sm' 
                                    : 'text-[#839788] hover:bg-white/50'
                            }`}
                        >
                            <Pill className="w-4 h-4" /> 2. Præparatvalg & Doseringer
                        </button>
                    )}
                    {data.monitoring && (
                        <button
                            onClick={() => setActiveTab('monitorering')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${
                                activeTab === 'monitorering' 
                                    ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white shadow-sm' 
                                    : 'text-[#839788] hover:bg-white/50'
                            }`}
                        >
                            <AlertTriangle className="w-4 h-4" /> 3. Paraklinik & Monitorering
                        </button>
                    )}
                    {data.specialGroups && data.specialGroups.length > 0 && (
                        <button
                            onClick={() => setActiveTab('saerlige')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${
                                activeTab === 'saerlige' 
                                    ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white shadow-sm' 
                                    : 'text-[#839788] hover:bg-white/50'
                            }`}
                        >
                            <Users className="w-4 h-4" /> 4. Særlige Forholdsregler
                        </button>
                    )}
                </div>

                {/* Tab 1: Behandlingsalgoritme */}
                {activeTab === 'algoritme' && (
                    <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9F6] to-white/40 space-y-6 animate-in fade-in duration-300">
                        {/* Interactive Step Navigator Chips */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#839788] mr-2 shrink-0">
                                Trin:
                            </span>
                            <button
                                onClick={() => setActiveStepFilter('all')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                                    activeStepFilter === 'all'
                                        ? 'bg-[#3A4A40] text-white border-[#3A4A40] shadow-sm'
                                        : 'bg-white text-[#506658] border-[#E2E8DF] hover:bg-slate-50'
                                }`}
                            >
                                Alle trin ({data.algorithm.length})
                            </button>
                            {data.algorithm.map((step, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveStepFilter(idx.toString())}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                                        activeStepFilter === idx.toString()
                                            ? 'bg-[#839788] text-white border-[#839788] shadow-sm'
                                            : 'bg-white text-[#506658] border-[#E2E8DF] hover:bg-slate-50'
                                    }`}
                                >
                                    Trin {step.stepNumber || idx + 1}
                                </button>
                            ))}
                        </div>

                        {/* Step Cards List */}
                        <div className="space-y-6 mt-4">
                            {displayedSteps.map((step, idx) => {
                                const realIndex = activeStepFilter === 'all' ? idx : parseInt(activeStepFilter, 10);
                                const isExpanded = !!expandedSteps[realIndex];

                                return (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-2xl border border-[#E8E4D9] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                                    >
                                        <div className="p-6">
                                            {/* Top Step Row */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-[#839788]/15 border border-[#839788]/30 flex items-center justify-center text-[#3A4A40] font-black text-sm shrink-0">
                                                        {step.stepNumber || realIndex + 1}
                                                    </div>
                                                    <div>
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#839788] bg-[#F2F6F3] px-2.5 py-0.5 rounded-lg border border-[#E2E8DF]">
                                                            {step.badge}
                                                        </span>
                                                        <h3 className="font-bold text-lg text-[#3A4A40] mt-1">
                                                            {renderWithDrugLinks(step.title, onNavigate)}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Summary text */}
                                            <p className="text-sm text-[#4A5A50] font-medium leading-relaxed mb-4">
                                                {renderWithDrugLinks(step.summary, onNavigate)}
                                            </p>

                                            {/* Key points bullets */}
                                            {step.keyPoints && step.keyPoints.length > 0 && (
                                                <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E8E4D9]/70 mb-4">
                                                    <h4 className="text-xs font-black uppercase tracking-wider text-[#839788] mb-2.5">
                                                        Kliniske Hovedpunkter:
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {step.keyPoints.map((point, pIdx) => (
                                                            <li key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#3A4A40] leading-relaxed">
                                                                <span className="text-emerald-700 font-bold shrink-0 mt-0.5">•</span>
                                                                <span>{renderWithDrugLinks(point, onNavigate)}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Action Callout */}
                                            {step.action && (
                                                <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-semibold mb-3 flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="font-bold text-emerald-900">Anbefalet handling: </span>
                                                        <span>{renderWithDrugLinks(step.action, onNavigate)}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Warning Box */}
                                            {step.warning && (
                                                <div className="p-3.5 bg-rose-50/80 rounded-xl border border-rose-200 text-xs sm:text-sm text-rose-950 font-medium mb-3 flex items-start gap-2">
                                                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="font-bold text-rose-900">Sikkerhedsadvarsel: </span>
                                                        <span>{renderWithDrugLinks(step.warning, onNavigate)}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Expandable Details Button */}
                                            {step.details && (
                                                <div className="pt-2">
                                                    <button
                                                        onClick={() => toggleStep(realIndex)}
                                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#839788] hover:text-[#3A4A40] transition-colors"
                                                    >
                                                        {isExpanded ? (
                                                            <>
                                                                <ChevronUp className="w-3.5 h-3.5" />
                                                                Skjul faglige detaljer
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ChevronDown className="w-3.5 h-3.5" />
                                                                Vis faglige detaljer & evidensbaggrund
                                                            </>
                                                        )}
                                                    </button>

                                                    {isExpanded && (
                                                        <div className="mt-3 p-4 bg-[#F2F6F3]/50 rounded-xl border border-[#E2E8DF] text-xs sm:text-sm text-[#4A5A50] leading-relaxed whitespace-pre-line animate-in fade-in duration-200">
                                                            {renderWithDrugLinks(step.details, onNavigate)}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Tab 2: Præparater & Doseringer */}
                {activeTab === 'medicin' && data.medications && (
                    <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9F6] to-white/40 space-y-8 animate-in fade-in duration-300">
                        <div>
                            <h3 className="text-xl font-bold text-[#3A4A40] mb-1">
                                Præparatoversigt & Doseringer
                            </h3>
                            <p className="text-xs sm:text-sm text-[#839788]">
                                Klik på et præparatnavn for at åbne det fulde opslagsværk med farmakokinetik, receptorprofil og bivirkningsmonitorering.
                            </p>
                        </div>

                        {data.medications.map((cat, cIdx) => (
                            <div key={cIdx} className="space-y-4">
                                <h4 className="text-sm font-black uppercase tracking-wider text-[#839788] flex items-center gap-2 border-b border-[#E8E4D9] pb-2">
                                    <Pill className="w-4 h-4 text-emerald-700" />
                                    {cat.category}
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {cat.drugs.map((drug, dIdx) => (
                                        <div 
                                            key={dIdx}
                                            className="bg-white p-5 rounded-2xl border border-[#E8E4D9] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h5 className="font-bold text-base text-[#3A4A40]">
                                                        {renderWithDrugLinks(drug.name, onNavigate)}
                                                    </h5>
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border shrink-0 ${
                                                        drug.line.includes('1.') 
                                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                                            : drug.line.includes('2.') 
                                                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                                                            : 'bg-amber-50 text-amber-800 border-amber-200'
                                                    }`}>
                                                        {drug.line}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-[#839788] font-medium mb-3">
                                                    Klasse: {drug.class}
                                                </div>

                                                <div className="grid grid-cols-3 gap-2 p-3 bg-[#FAF9F6] rounded-xl border border-[#E8E4D9]/60 text-xs mb-3">
                                                    <div>
                                                        <span className="block text-[10px] uppercase font-bold text-[#839788]">Start:</span>
                                                        <span className="font-medium text-[#3A4A40]">{drug.startDose}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-[10px] uppercase font-bold text-[#839788]">Mål:</span>
                                                        <span className="font-medium text-[#3A4A40]">{drug.targetDose}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-[10px] uppercase font-bold text-[#839788]">Maks:</span>
                                                        <span className="font-medium text-[#3A4A40]">{drug.maxDose}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {drug.notes && (
                                                <p className="text-xs text-[#5C6B61] leading-relaxed pt-2 border-t border-[#E8E4D9]/50">
                                                    <span className="font-bold text-[#3A4A40]">Note: </span>
                                                    {renderWithDrugLinks(drug.notes, onNavigate)}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab 3: Paraklinik & Monitorering */}
                {activeTab === 'monitorering' && data.monitoring && (
                    <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9F6] to-white/40 space-y-8 animate-in fade-in duration-300">
                        <div>
                            <h3 className="text-xl font-bold text-[#3A4A40] mb-1">
                                {data.monitoring.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-[#839788]">
                                Obligatoriske blodprøver, kardiologisk overvågning og kliniske scoringsskalaer.
                            </p>
                        </div>

                        {/* Monitoring Items */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.monitoring.items.map((item, mIdx) => (
                                <div key={mIdx} className="bg-white p-5 rounded-2xl border border-[#E8E4D9] shadow-sm">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <h4 className="font-bold text-sm text-[#3A4A40] flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                                            {item.title}
                                        </h4>
                                    </div>
                                    <div className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 mb-2">
                                        Frekvens: {item.frequency}
                                    </div>
                                    <p className="text-xs text-[#506658] leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Rating Scales */}
                        {data.monitoring.ratingScales && data.monitoring.ratingScales.length > 0 && (
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-wider text-[#839788] mb-3 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-emerald-700" />
                                    Psykometriske Scoringsskalaer & Målværdier
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                    {data.monitoring.ratingScales.map((scale, sIdx) => (
                                        <div key={sIdx} className="p-4 rounded-xl bg-white border border-[#E8E4D9] shadow-sm">
                                            <span className="font-mono font-bold text-sm text-[#3A4A40] block mb-1">
                                                {scale.name}
                                            </span>
                                            <span className="text-xs text-[#839788] block mb-2">
                                                {scale.indication}
                                            </span>
                                            <span className="inline-block text-[11px] font-bold text-[#3A4A40] bg-[#F2F6F3] px-2 py-0.5 rounded border border-[#E2E8DF]">
                                                Mål: {scale.target}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab 4: Særlige Forholdsregler */}
                {activeTab === 'saerlige' && data.specialGroups && (
                    <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9F6] to-white/40 space-y-6 animate-in fade-in duration-300">
                        <div>
                            <h3 className="text-xl font-bold text-[#3A4A40] mb-1">
                                Særlige Grupper & Kliniske Forholdsregler
                            </h3>
                            <p className="text-xs sm:text-sm text-[#839788]">
                                Særlige retningslinjer for gravide, børn/unge, ældre og specifikke risikosituationer.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {data.specialGroups.map((grp, gIdx) => (
                                <div key={gIdx} className="p-5 rounded-2xl bg-white border border-[#E8E4D9] shadow-sm">
                                    <h4 className="font-bold text-base text-[#3A4A40] mb-2 flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-600" />
                                        {grp.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-[#4A5A50] leading-relaxed">
                                        {renderWithDrugLinks(grp.content, onNavigate)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ClinicalGuidelineView;
