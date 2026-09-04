import React, { useState, useMemo } from 'react';
import { 
    ChevronLeft, FileText, ChevronRight, CheckCircle, Info, ExternalLink, 
    Search, X, Copy, Check, AlertTriangle, AlertCircle, Stethoscope, 
    Layers, Layout, Brain, Sparkles 
} from '../components/Icons';
import { targetGroupsData } from '../data/targetGroupsData';

const CATEGORIES = [
    'Alle',
    'Affektive & Psykotiske',
    'Neuropsykiatri',
    'Angst & Belastning',
    'Personlighed & Øvrige'
];

function TargetGroupsApp({ onNavigate }) {
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Alle');
    const [levelFilter, setLevelFilter] = useState('all'); // 'all' | 'hospital' | 'primary'
    const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
    const [copiedIndex, setCopiedIndex] = useState(null);

    const selectedGroup = useMemo(() => {
        if (!selectedGroupId) return null;
        return targetGroupsData.find(g => g.id === selectedGroupId) || null;
    }, [selectedGroupId]);

    const filteredGroups = useMemo(() => {
        return targetGroupsData.filter(group => {
            const matchesCategory = selectedCategory === 'Alle' || group.category === selectedCategory;
            if (!matchesCategory) return false;

            if (!searchQuery.trim()) return true;
            const query = searchQuery.toLowerCase().trim();
            
            const matchName = group.name.toLowerCase().includes(query);
            const matchIcd = group.icdCode?.toLowerCase().includes(query);
            const matchDesc = group.shortDescription?.toLowerCase().includes(query);
            const matchRule = group.primaryRule?.toLowerCase().includes(query);
            const matchOptions = group.options?.some(opt => 
                opt.label.toLowerCase().includes(query) ||
                opt.title?.toLowerCase().includes(query) ||
                opt.action.toLowerCase().includes(query) ||
                opt.symptoms.some(s => s.toLowerCase().includes(query))
            );
            const matchSpecial = group.specialSection?.title?.toLowerCase().includes(query) ||
                group.specialSection?.description?.toLowerCase().includes(query);

            return matchName || matchIcd || matchDesc || matchRule || matchOptions || matchSpecial;
        });
    }, [selectedCategory, searchQuery]);

    const handleSelectGroup = (group) => {
        setSelectedGroupId(group.id);
        setLevelFilter('all');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        if (selectedGroupId) {
            setSelectedGroupId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            onNavigate('home');
        }
    };

    const handleCopy = (text, index) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2200);
        }
    };

    const getLevelBadgeStyle = (levelType) => {
        switch (levelType) {
            case 'hospital':
                return {
                    bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    dot: 'bg-emerald-500',
                    accentBorder: 'border-l-emerald-500',
                    chip: 'bg-emerald-100 text-emerald-800',
                    actionBg: 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                };
            case 'clarify':
                return {
                    bg: 'bg-sky-50 text-sky-800 border-sky-200',
                    dot: 'bg-sky-500',
                    accentBorder: 'border-l-sky-500',
                    chip: 'bg-sky-100 text-sky-800',
                    actionBg: 'bg-sky-50/70 border-sky-200 text-sky-900'
                };
            case 'primary':
                return {
                    bg: 'bg-amber-50 text-amber-800 border-amber-200',
                    dot: 'bg-amber-500',
                    accentBorder: 'border-l-amber-500',
                    chip: 'bg-amber-100 text-amber-800',
                    actionBg: 'bg-amber-50/70 border-amber-200 text-amber-900'
                };
            case 'reject':
            default:
                return {
                    bg: 'bg-slate-50 text-slate-700 border-slate-200',
                    dot: 'bg-slate-400',
                    accentBorder: 'border-l-slate-400',
                    chip: 'bg-slate-100 text-slate-700',
                    actionBg: 'bg-slate-50 border-slate-200 text-slate-800'
                };
        }
    };

    const renderGroupSelection = () => (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 pt-6 sm:pt-10">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handleBack}
                    className="group flex items-center gap-2 text-[#839788] font-semibold text-sm hover:text-[#3A4A40] transition-colors"
                >
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-[#E2E8DF] group-hover:bg-[#F2F6F3] group-hover:border-[#839788] transition-all">
                        <ChevronLeft className="w-4 h-4" />
                    </div>
                    Tilbage til forsiden
                </button>
                <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#839788] bg-white px-3 py-1.5 rounded-full border border-[#E2E8DF] shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Region Midtjylland · 2025/2026
                </div>
            </div>

            {/* Header Hero */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8DF] overflow-hidden mb-8">
                <div className="p-6 md:p-8 border-b border-[#E2E8DF] bg-gradient-to-br from-[#F9F8F6] to-[#F2F6F3]/60">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#839788] flex items-center justify-center shadow-md text-white shrink-0">
                                <FileText className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h1 className="text-2xl md:text-3xl font-bold text-[#3A4A40] tracking-tight">
                                        Målgruppebeskrivelser og Visitation
                                    </h1>
                                </div>
                                <p className="text-[#506658] text-sm md:text-base max-w-2xl leading-relaxed">
                                    Retningslinjer for visitering mellem almen praksis, privatpraktiserende speciallæger og den hospitalsbaserede psykiatri i Region Midtjylland.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Search & Category Filter */}
                    <div className="mt-8 space-y-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#839788]" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Søg efter diagnose, ICD-kode, CGI eller symptomer (f.eks. 'ADHD', 'DF32', 'selvmord', 'flygtning', 'GAF')..."
                                className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border border-[#E2E8DF] text-sm md:text-base text-[#3A4A40] placeholder-[#839788]/70 focus:outline-none focus:ring-2 focus:ring-[#839788]/40 focus:border-[#839788] shadow-sm transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#839788] hover:text-[#3A4A40] rounded-full hover:bg-slate-100 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Category Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {CATEGORIES.map(category => {
                                const count = category === 'Alle' 
                                    ? targetGroupsData.length 
                                    : targetGroupsData.filter(g => g.category === category).length;
                                const isSelected = selectedCategory === category;
                                return (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`shrink-0 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 border ${
                                            isSelected
                                                ? 'bg-[#3A4A40] text-white border-[#3A4A40] shadow-sm'
                                                : 'bg-white text-[#506658] border-[#E2E8DF] hover:bg-[#F2F6F3] hover:border-[#839788]'
                                        }`}
                                    >
                                        {category} <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-[#E2E8DF]/60 text-[#506658]'}`}>{count}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Grid of Diagnosis Cards */}
                <div className="p-6 md:p-8 bg-[#F9F8F6]">
                    {filteredGroups.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E2E8DF] p-8">
                            <div className="w-12 h-12 rounded-full bg-[#F2F6F3] text-[#839788] flex items-center justify-center mx-auto mb-3">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="text-[#3A4A40] font-bold text-lg mb-1">Ingen målgruppebeskrivelser fundet</h3>
                            <p className="text-sm text-[#839788] max-w-md mx-auto mb-4">
                                Der blev ikke fundet nogen diagnoser, der matcher søgningen "{searchQuery}".
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setSelectedCategory('Alle'); }}
                                className="px-4 py-2 bg-[#839788] text-white text-xs font-bold rounded-xl hover:bg-[#3A4A40] transition-colors"
                            >
                                Nulstil søgning og filtre
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredGroups.map(group => (
                                <div
                                    key={group.id}
                                    onClick={() => handleSelectGroup(group)}
                                    className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#E2E8DF] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_-6px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-[#839788] transition-all duration-300 ease-out cursor-pointer text-left"
                                >
                                    <div>
                                        {/* Badges */}
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#839788] bg-[#F2F6F3] px-2.5 py-1 rounded-lg border border-[#E2E8DF]">
                                                {group.category}
                                            </span>
                                            {group.icdCode && (
                                                <span className="text-xs font-semibold font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                                    {group.icdCode}
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-lg font-bold text-[#3A4A40] mb-2 leading-snug group-hover:text-emerald-900 transition-colors">
                                            {group.name}
                                        </h2>

                                        {/* Short Description */}
                                        <p className="text-[#506658] text-xs leading-relaxed mb-4 line-clamp-3">
                                            {group.shortDescription}
                                        </p>
                                    </div>

                                    <div>
                                        {/* Primary Rule Callout */}
                                        {group.primaryRule && (
                                            <div className="p-2.5 rounded-xl bg-[#F9F8F6] border border-[#E2E8DF] text-[11px] text-[#506658] font-medium leading-normal mb-4 group-hover:bg-[#F2F6F3] transition-colors">
                                                <span className="font-bold text-[#3A4A40]">Hovedregel: </span>
                                                {group.primaryRule}
                                            </div>
                                        )}

                                        {/* Footer Action */}
                                        <div className="pt-3 border-t border-[#E2E8DF]/60 flex items-center justify-between text-[#839788] text-xs font-bold uppercase tracking-wide group-hover:text-[#3A4A40] transition-colors">
                                            <span>{group.options?.length || 0} visiteringstrin</span>
                                            <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform text-emerald-700">
                                                Åbn guide <ChevronRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderGroupDetail = () => {
        if (!selectedGroup) return null;

        const optionsToDisplay = selectedGroup.options?.filter(opt => {
            if (levelFilter === 'hospital') return opt.levelType === 'hospital';
            if (levelFilter === 'primary') return opt.levelType === 'primary' || opt.levelType === 'reject';
            return true;
        }) || [];

        return (
            <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8 pt-6 sm:pt-10">
                {/* Back Button */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={handleBack}
                        className="group flex items-center gap-2 text-[#839788] font-semibold text-sm hover:text-[#3A4A40] transition-colors"
                    >
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-[#E2E8DF] group-hover:bg-[#F2F6F3] group-hover:border-[#839788] transition-all">
                            <ChevronLeft className="w-4 h-4" />
                        </div>
                        Tilbage til målgrupper
                    </button>
                    
                    {/* External PDF Link */}
                    {selectedGroup.originalFile && (
                        <a 
                            href={`/målgruppebeskrivelser/${selectedGroup.originalFile}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E2E8DF] text-[#3A4A40] text-xs sm:text-sm font-bold rounded-xl hover:bg-[#F2F6F3] hover:border-[#839788] transition-all shadow-sm"
                        >
                            <ExternalLink className="w-4 h-4 text-emerald-700" />
                            <span>Originalt PDF-dokument</span>
                        </a>
                    )}
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8DF] overflow-hidden mb-8">
                    {/* Header Banner */}
                    <div className="p-6 md:p-8 border-b border-[#E2E8DF] bg-gradient-to-br from-[#F9F8F6] to-[#F2F6F3]/50">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#839788] bg-white px-2.5 py-1 rounded-lg border border-[#E2E8DF]">
                                {selectedGroup.category}
                            </span>
                            {selectedGroup.icdCode && (
                                <span className="text-xs font-semibold font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                                    ICD-10: {selectedGroup.icdCode}
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3A4A40] mb-3">
                            {selectedGroup.name}
                        </h1>
                        <p className="text-[#506658] text-sm md:text-base leading-relaxed max-w-3xl">
                            {selectedGroup.shortDescription}
                        </p>
                    </div>

                    {/* Structured Guideline Overview (3 Info Columns) */}
                    {selectedGroup.guidelineInfo && (
                        <div className="p-6 md:p-8 border-b border-[#E2E8DF] bg-white">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-[#839788] mb-4 flex items-center gap-2">
                                <Info className="w-4 h-4 text-emerald-700" />
                                Rammer for henvisning og visitation
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Col 1: Primærsektor */}
                                <div className="p-5 rounded-2xl bg-[#F9F8F6] border border-[#E2E8DF]">
                                    <div className="flex items-center gap-2 text-[#3A4A40] font-bold text-sm mb-2.5">
                                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                        Almen praksis / Speciallæge
                                    </div>
                                    <p className="text-xs text-[#506658] leading-relaxed">
                                        {selectedGroup.guidelineInfo.primarySector}
                                    </p>
                                </div>

                                {/* Col 2: Hospitalspsykiatri */}
                                <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 md:col-span-1">
                                    <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm mb-2.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                                        Hospitalspsykiatrien
                                    </div>
                                    <ul className="space-y-1.5 text-xs text-emerald-900 leading-relaxed">
                                        {selectedGroup.guidelineInfo.hospitalCriteria.map((crit, i) => (
                                            <li key={i} className="flex items-start gap-1.5">
                                                <span className="text-emerald-600 font-bold mt-0.5">•</span>
                                                <span>{crit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Col 3: Specialistrådgivning */}
                                <div className="p-5 rounded-2xl bg-[#F9F8F6] border border-[#E2E8DF]">
                                    <div className="flex items-center gap-2 text-[#3A4A40] font-bold text-sm mb-2.5">
                                        <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                                        Specialistrådgivning
                                    </div>
                                    <p className="text-xs text-[#506658] leading-relaxed mb-3">
                                        {selectedGroup.guidelineInfo.specialistSupport}
                                    </p>
                                    <div className="p-2.5 bg-white rounded-xl border border-[#E2E8DF] text-[11px] text-[#839788] font-medium">
                                        Egen læge kan benytte Specialisttelefonen ved tvivl om medicin eller visitationsforhold.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Special Section: e.g. Flygtninge under PTSD */}
                    {selectedGroup.specialSection && (
                        <div className="p-6 md:p-8 border-b border-[#E2E8DF] bg-amber-50/30">
                            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                    <h3 className="text-base font-bold text-[#3A4A40] flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-amber-600" />
                                        {selectedGroup.specialSection.title}
                                    </h3>
                                    <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                                        {selectedGroup.specialSection.badge}
                                    </span>
                                </div>
                                <p className="text-xs text-[#506658] mb-3 leading-relaxed">
                                    {selectedGroup.specialSection.description}
                                </p>
                                <ul className="space-y-1.5 text-xs text-[#506658] mb-4">
                                    {selectedGroup.specialSection.criteria.map((c, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-amber-600 font-bold">•</span>
                                            <span>{c}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-semibold text-amber-900">
                                    Handling: {selectedGroup.specialSection.actionText}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Referral Checklist: e.g. for Spiseforstyrrelser */}
                    {selectedGroup.referralChecklist && (
                        <div className="p-6 md:p-8 border-b border-[#E2E8DF] bg-emerald-50/20">
                            <h3 className="text-sm font-bold text-[#3A4A40] mb-3 flex items-center gap-2">
                                <Stethoscope className="w-4 h-4 text-emerald-700" />
                                Obligatoriske oplysninger i henvisningen (Tjekliste):
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                                {selectedGroup.referralChecklist.map((item, i) => (
                                    <div key={i} className="p-3 rounded-xl bg-white border border-emerald-200/60 text-xs text-[#3A4A40] flex items-start gap-2 shadow-sm">
                                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span className="leading-snug">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Visitation Matrix Toolbar */}
                    <div className="p-4 sm:p-6 bg-[#F9F8F6] border-b border-[#E2E8DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#839788] mr-1 hidden sm:inline">
                                Vis:
                            </span>
                            <button
                                onClick={() => setLevelFilter('all')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                                    levelFilter === 'all'
                                        ? 'bg-[#3A4A40] text-white border-[#3A4A40] shadow-sm'
                                        : 'bg-white text-[#506658] border-[#E2E8DF] hover:bg-slate-50'
                                }`}
                            >
                                Alle trin ({selectedGroup.options?.length || 0})
                            </button>
                            <button
                                onClick={() => setLevelFilter('hospital')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                                    levelFilter === 'hospital'
                                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                                        : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
                                }`}
                            >
                                Hospitalspsykiatri ({selectedGroup.options?.filter(o => o.levelType === 'hospital').length || 0})
                            </button>
                            <button
                                onClick={() => setLevelFilter('primary')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                                    levelFilter === 'primary'
                                        ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                                        : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
                                }`}
                            >
                                Primærsektor / Tilbagevises ({selectedGroup.options?.filter(o => o.levelType === 'primary' || o.levelType === 'reject').length || 0})
                            </button>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-1 self-end sm:self-auto bg-white p-1 rounded-xl border border-[#E2E8DF] shadow-sm">
                            <button
                                onClick={() => setViewMode('cards')}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                    viewMode === 'cards'
                                        ? 'bg-[#839788] text-white shadow-xs'
                                        : 'text-[#839788] hover:text-[#3A4A40]'
                                }`}
                            >
                                <Layout className="w-3.5 h-3.5" />
                                Kortvisning
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                    viewMode === 'table'
                                        ? 'bg-[#839788] text-white shadow-xs'
                                        : 'text-[#839788] hover:text-[#3A4A40]'
                                }`}
                            >
                                <Layers className="w-3.5 h-3.5" />
                                Matrix-tabel
                            </button>
                        </div>
                    </div>

                    {/* Visitation Content */}
                    <div className="p-4 sm:p-6 md:p-8 bg-white">
                        {optionsToDisplay.length === 0 ? (
                            <div className="p-8 text-center bg-[#F9F8F6] rounded-2xl border border-dashed border-[#E2E8DF]">
                                <p className="text-sm text-[#839788]">Ingen niveauer matcher det valgte filter.</p>
                                <button
                                    onClick={() => setLevelFilter('all')}
                                    className="mt-3 px-3 py-1.5 bg-[#839788] text-white text-xs font-bold rounded-lg"
                                >
                                    Vis alle trin
                                </button>
                            </div>
                        ) : viewMode === 'cards' ? (
                            /* CARD VIEW (Modern & Responsive) */
                            <div className="space-y-5">
                                {optionsToDisplay.map((opt, idx) => {
                                    const style = getLevelBadgeStyle(opt.levelType);
                                    const isCopied = copiedIndex === idx;

                                    return (
                                        <div
                                            key={idx}
                                            className={`rounded-2xl border border-[#E2E8DF] border-l-4 ${style.accentBorder} bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden`}
                                        >
                                            <div className="p-5 md:p-6">
                                                {/* Header Row */}
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8DF]/60">
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-mono font-bold text-base md:text-lg text-[#3A4A40] bg-[#F2F6F3] px-3 py-1 rounded-xl border border-[#E2E8DF]">
                                                            {opt.label}
                                                        </span>
                                                        <div>
                                                            <h3 className="font-bold text-sm md:text-base text-[#3A4A40]">
                                                                {opt.title || opt.severity}
                                                            </h3>
                                                            {opt.severity && opt.title && (
                                                                <span className="text-xs text-[#839788] font-medium">
                                                                    Sværhedsgrad: {opt.severity}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${style.bg}`}>
                                                            <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
                                                            {opt.badgeText}
                                                        </span>
                                                        <button
                                                            onClick={() => handleCopy(opt.clipboardSummary || `${selectedGroup.name} (${opt.label}): ${opt.action}`, idx)}
                                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                                                                isCopied
                                                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                                                    : 'bg-white text-[#506658] border-[#E2E8DF] hover:bg-[#F2F6F3] hover:border-[#839788]'
                                                            }`}
                                                            title="Kopier visitationsresumé til journalnotat"
                                                        >
                                                            {isCopied ? (
                                                                <>
                                                                    <Check className="w-3.5 h-3.5" />
                                                                    Kopieret!
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Copy className="w-3.5 h-3.5" />
                                                                    Kopier konklusion
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Content Grid */}
                                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-4">
                                                    {/* Symptoms (Col 7) */}
                                                    <div className="lg:col-span-7">
                                                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#839788] mb-2.5">
                                                            Klinisk symptombillede & Kriterier:
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {opt.symptoms.map((sym, sIdx) => (
                                                                <li key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3A4A40] leading-relaxed">
                                                                    <span className="text-[#839788] font-bold mt-0.5 shrink-0">•</span>
                                                                    <span>{sym}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Action Callout (Col 5) */}
                                                    <div className="lg:col-span-5 flex flex-col justify-between">
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#839788] mb-2.5">
                                                                Visitationsafgørelse & Handling:
                                                            </h4>
                                                            <div className={`p-4 rounded-xl border text-xs sm:text-sm font-medium leading-relaxed ${style.actionBg}`}>
                                                                {opt.action}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            /* TABLE VIEW (Matrix) */
                            <div className="w-full overflow-x-auto rounded-2xl border border-[#E2E8DF]">
                                <table className="w-full text-left border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="bg-[#F9F8F6] border-b border-[#E2E8DF]">
                                            <th className="p-4 text-[#839788] font-bold text-xs uppercase tracking-wider w-28">Niveau</th>
                                            <th className="p-4 text-[#839788] font-bold text-xs uppercase tracking-wider w-40">Status</th>
                                            <th className="p-4 text-[#839788] font-bold text-xs uppercase tracking-wider">Klinisk billede</th>
                                            <th className="p-4 text-[#839788] font-bold text-xs uppercase tracking-wider w-72">Anbefalet handling</th>
                                            <th className="p-4 text-[#839788] font-bold text-xs uppercase tracking-wider w-20 text-center">Kopier</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E2E8DF]">
                                        {optionsToDisplay.map((opt, idx) => {
                                            const style = getLevelBadgeStyle(opt.levelType);
                                            const isCopied = copiedIndex === idx;

                                            return (
                                                <tr key={idx} className="hover:bg-[#F9F8F6]/80 transition-colors">
                                                    <td className="p-4 align-top font-mono font-bold text-sm text-[#3A4A40]">
                                                        {opt.label}
                                                    </td>
                                                    <td className="p-4 align-top">
                                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${style.bg}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                                                            {opt.badgeText}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 align-top">
                                                        <ul className="space-y-1.5">
                                                            {opt.symptoms.map((s, i) => (
                                                                <li key={i} className="text-xs text-[#3A4A40] leading-relaxed flex items-start gap-1.5">
                                                                    <span className="text-[#839788] shrink-0">•</span>
                                                                    <span>{s}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td className="p-4 align-top">
                                                        <div className={`p-3 rounded-xl border text-xs font-medium leading-relaxed ${style.actionBg}`}>
                                                            {opt.action}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-top text-center">
                                                        <button
                                                            onClick={() => handleCopy(opt.clipboardSummary || `${selectedGroup.name} (${opt.label}): ${opt.action}`, idx)}
                                                            className={`p-2 rounded-xl border transition-all ${
                                                                isCopied
                                                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                                                    : 'bg-white text-[#506658] border-[#E2E8DF] hover:bg-[#F2F6F3] hover:border-[#839788]'
                                                            }`}
                                                            title="Kopier konklusion"
                                                        >
                                                            {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#3A4A40] font-sans selection:bg-[#E2E8DF] selection:text-slate-900 pb-16">
            {selectedGroup ? renderGroupDetail() : renderGroupSelection()}
        </div>
    );
}

export default TargetGroupsApp;
