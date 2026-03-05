import React, { useState, useMemo, useEffect } from 'react';
import { ChevronRight, Pill, Search, Info, Link as LinkIcon, AlertTriangle, ShieldAlert, Activity } from '../components/Icons';
import { PSYKOFARMAKA_DATA } from '../data/psykofarmaka';
import { RECEPTOR_PROFILES } from '../data/receptorProfiles';

function PsykofarmakaApp({ onNavigate, initialDrug = null }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeDrugId, setActiveDrugId] = useState(
        initialDrug || (PSYKOFARMAKA_DATA.length > 0 ? PSYKOFARMAKA_DATA[0].id : null)
    );

    // If initialDrug prop changes (e.g. from cross-reference click), update active drug
    useEffect(() => {
        if (initialDrug) {
            setActiveDrugId(initialDrug);
            // On mobile, scroll to top when a new drug is selected
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [initialDrug]);

    const activeDrug = useMemo(() =>
        PSYKOFARMAKA_DATA.find(d => d.id === activeDrugId),
        [activeDrugId]);

    // Grouping the drugs for the sidebar
    const groupedData = useMemo(() => {
        const filtered = PSYKOFARMAKA_DATA.filter(drug =>
            drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            drug.effect.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const groups = {};
        filtered.forEach(drug => {
            if (!groups[drug.group]) {
                groups[drug.group] = [];
            }
            groups[drug.group].push(drug);
        });

        // Sort groups alphabetically and items within groups
        const sortedGroups = Object.keys(groups).sort().map(groupName => ({
            name: groupName,
            items: groups[groupName].sort((a, b) => a.name.localeCompare(b.name))
        }));

        return sortedGroups;
    }, [searchTerm]);

    // Auto-select first item if search filters out the currently active item
    useEffect(() => {
        if (searchTerm && groupedData.length > 0) {
            const isCurrentlyActiveVisible = groupedData.some(g => g.items.some(i => i.id === activeDrugId));
            if (!isCurrentlyActiveVisible && groupedData[0].items.length > 0) {
                setActiveDrugId(groupedData[0].items[0].id);
            }
        }
    }, [searchTerm, groupedData, activeDrugId]);

    const renderDetailCard = (title, content, type = 'default') => {
        const getStyles = () => {
            switch (type) {
                case 'warning': return 'bg-amber-50/80 border-amber-200/60 shadow-amber-900/5 ring-amber-500/10';
                case 'info': return 'bg-blue-50/80 border-blue-200/60 shadow-blue-900/5 ring-blue-500/10';
                case 'critical': return 'bg-red-50/80 border-red-200/60 shadow-red-900/5 ring-red-500/10';
                default: return 'bg-white/70 border-[#E8E4D9] shadow-[#3A4A40]/5 ring-[#839788]/5';
            }
        };

        const getTitleColor = () => {
            switch (type) {
                case 'warning': return 'text-amber-900';
                case 'info': return 'text-blue-900';
                case 'critical': return 'text-red-900';
                default: return 'text-[#3A4A40]';
            }
        };

        return (
            <div className={`p-6 rounded-2xl border backdrop-blur-sm shadow-sm ring-1 ring-inset mb-6 transition-all hover:shadow-md ${getStyles()}`}>
                <h3 className={`text-sm font-black uppercase tracking-widest mb-3 ${getTitleColor()}`}>
                    {title}
                </h3>
                <div className="text-[#4A5A50] leading-relaxed whitespace-pre-line text-[15px]">
                    {content}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-[#F9F8F6] font-sans selection:bg-[#E2E8DF] selection:text-slate-900">
            {/* Header */}
            <header className="glass-panel border-b border-white/40 px-6 py-4 flex justify-between items-center shadow-sm shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => onNavigate('home')}
                        className="p-2 hover:bg-white/60 rounded-xl transition-all text-[#839788] hover:text-[#3A4A40] hover:shadow-sm"
                        title="Tilbage til forsiden"
                    >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                    </button>
                    <div className="bg-gradient-to-br from-[#839788] to-[#5C6B61] p-2 rounded-xl shadow-md border border-[#94A799]">
                        <Pill className="text-white h-5 w-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#3A4A40] leading-tight tracking-tight">Psykofarmaka</h1>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#839788]">
                            <span>Lægemiddelkatalog & Doseringer</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 relative">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-[#E2E8DF]/40 blur-[100px]"></div>
                    <div className="absolute bottom-[20%] left-[5%] w-[30%] h-[30%] rounded-full bg-[#D9E1DA]/30 blur-[80px]"></div>
                </div>

                {/* Sidebar Navigation */}
                <aside className="w-80 bg-white/40 backdrop-blur-md border-r border-[#E8E4D9]/60 flex flex-col flex-shrink-0 z-10 hidden md:flex">
                    {/* Search Field */}
                    <div className="p-5 border-b border-[#E8E4D9]/60 bg-white/50 sticky top-0 z-10 backdrop-blur-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#839788]" />
                            <input
                                type="text"
                                placeholder="Søg efter præparat eller virkning..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border border-[#D9E1DA] rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-all focus:border-[#839788] focus:ring-2 focus:ring-[#839788]/20 text-[#3A4A40] placeholder-[#839788]/60 shadow-sm font-medium"
                            />
                        </div>
                    </div>

                    {/* Drug List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {groupedData.length === 0 ? (
                            <div className="text-center text-[#839788] py-8 font-medium text-sm">
                                Ingen præparater fundet.
                            </div>
                        ) : (
                            groupedData.map((group) => (
                                <div key={group.name} className="animate-in fade-in slide-in-from-left-2 duration-300">
                                    <h3 className="text-[10px] font-black text-[#839788]/80 uppercase tracking-widest mb-2.5 ml-1 sticky top-0 bg-gradient-to-r from-transparent via-[#F9F8F6]/80 to-transparent py-1 backdrop-blur-sm z-10">
                                        {group.name}
                                    </h3>
                                    <div className="space-y-1">
                                        {group.items.map(drug => (
                                            <button
                                                key={drug.id}
                                                onClick={() => setActiveDrugId(drug.id)}
                                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 isolate relative overflow-hidden ${activeDrugId === drug.id
                                                    ? 'bg-white text-[#3A4A40] shadow-sm ring-1 ring-[#D9E1DA] font-bold'
                                                    : 'text-[#5C6B61] hover:bg-white/60 hover:text-[#3A4A40] font-medium'
                                                    }`}
                                            >
                                                {activeDrugId === drug.id && (
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#F2F6F3] to-transparent -z-10"></div>
                                                )}
                                                <div className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${activeDrugId === drug.id ? 'bg-[#839788]' : 'bg-[#D9E1DA]'}`} />
                                                <span className="text-[13px] leading-tight flex-1 truncate">{drug.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative scroll-smooth flex justify-center">
                    {activeDrug ? (
                        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">

                            {/* Header Section */}
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#839788]/10 text-[#839788] text-xs font-bold uppercase tracking-wider mb-4 border border-[#839788]/20">
                                    {activeDrug.group} {activeDrug.subgroup && <span className="opacity-60 font-medium ml-1">• {activeDrug.subgroup}</span>}
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-[#3A4A40] tracking-tight mb-4 drop-shadow-sm">
                                    {activeDrug.name}
                                </h2>
                            </div>

                            {/* Content Logic based on Component Type */}
                            {activeDrug.isInfoComponent ? (
                                <div className="animate-in fade-in duration-500">
                                    <div className="mb-8">
                                        <p className="text-[#4A5A50] text-[16px] leading-relaxed bg-white/70 p-6 rounded-3xl border border-[#E8E4D9] shadow-sm font-medium">
                                            {activeDrug.effect}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {RECEPTOR_PROFILES.map((profile, idx) => (
                                            <div key={idx} className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 border border-indigo-100/80 rounded-3xl p-6 shadow-sm ring-1 ring-inset ring-indigo-500/10 hover:shadow-md transition-all group">
                                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 border border-indigo-100 group-hover:scale-105 transition-transform">
                                                    <Activity className="w-6 h-6 text-indigo-600" />
                                                </div>
                                                <h4 className="font-black text-indigo-950 text-xl mb-4 tracking-tight">{profile.receptor}</h4>
                                                <div className="space-y-3">
                                                    <div className="bg-white/70 rounded-2xl p-4 border border-indigo-50 shadow-sm">
                                                        <span className="block text-[10px] font-black uppercase text-indigo-500 mb-1.5 tracking-widest">Klinisk Effekt</span>
                                                        <p className="text-[14px] text-[#4A5A50] leading-relaxed">{profile.effect}</p>
                                                    </div>
                                                    <div className="bg-white/70 rounded-2xl p-4 border border-purple-50 shadow-sm">
                                                        <span className="block text-[10px] font-black uppercase text-purple-500 mb-1.5 tracking-widest">Typisk Bivirkning</span>
                                                        <p className="text-[14px] text-[#4A5A50] leading-relaxed">{profile.sideEffects}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-[#839788] mt-8 italic text-center px-4">* Det enkelte antipsykotiske lægemiddels specifikke affinitet (binding) til ovenstående receptorer afgør medicinens samlede kliniske profil.</p>
                                </div>
                            ) : activeDrug.isArytmiComponent ? (
                                <div className="animate-in fade-in duration-500">
                                    <div className="mb-8">
                                        <p className="text-[#4A5A50] text-[16px] leading-relaxed bg-white/70 p-6 rounded-3xl border border-[#E8E4D9] shadow-sm font-medium">
                                            {activeDrug.effect}
                                        </p>
                                    </div>

                                    {/* Detailed Images Section */}
                                    <div className="space-y-12 mb-10">
                                        <div className="bg-white p-6 rounded-3xl border border-[#D9E1DA] shadow-sm">
                                            <h3 className="text-xl font-black text-[#3A4A40] mb-6 flex items-center gap-2.5 tracking-tight">
                                                <Activity className="w-6 h-6 text-indigo-500" />
                                                Vurderingsværktøjer & Oversigt
                                            </h3>
                                            <div className="grid grid-cols-1 gap-8">
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase text-[#5C6B61] mb-3 tracking-wider">Algoritme for QTc Risikovurdering</h4>
                                                    <img src={`${import.meta.env.BASE_URL}img/arytmi/render_page_13.png`} alt="Algoritme for vurdering" className="w-full h-auto rounded-2xl border border-[#E8E4D9]" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold uppercase text-[#5C6B61] mb-3 tracking-wider">Gennemsnitlig QTc Forlængelse for Præparater</h4>
                                                    <img src={`${import.meta.env.BASE_URL}img/arytmi/render_page_9.png`} alt="QTc forlængelse for udvalgte psykofarmaka" className="w-full h-auto rounded-2xl border border-[#E8E4D9]" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-200/60 shadow-sm">
                                            <h3 className="text-xl font-black text-rose-950 mb-4 flex items-center gap-2.5 tracking-tight">
                                                <Activity className="w-6 h-6 text-rose-600" />
                                                Klinisk Billede: Torsades de Pointes (TdP-VT)
                                            </h3>
                                            <p className="text-rose-900/80 text-[15px] leading-relaxed mb-6 font-medium">
                                                Pludselig død pga. psykofarmaka-induceret arytmi skyldes først og fremmest TdP-VT, som kan degenerere til ventrikelflimren. Arytmien viser sig typisk ved selvterminerende, korterevarende episoder med ventrikulær ekstrasystoli. Symptomerne kan være fraværende, men optræder ofte som <strong>palpitationer, svimmelhed, besvimelse (synkope)</strong> eller pludselig død.<br /><br />
                                                Ved manifest TdP-VT skal patienten straks overflyttes til telemetri/kardiologisk observation! Behandlingen består akut af seponering af de udløsende lægemidler, magnesiuminfusion samt korrektion af hypokaliæmi.
                                            </p>
                                            <div className="bg-white p-3 rounded-2xl border border-rose-100 shadow-sm">
                                                <img src={`${import.meta.env.BASE_URL}img/arytmi/render_page_10.png`} alt="EKG med Torsades de Pointes" className="w-full h-auto rounded-xl filter contrast-125" />
                                                <p className="text-[11px] text-center text-rose-800/60 font-medium mt-3 px-2">
                                                    EKG-udsnit (Telemetri): Sinusrytme afbrydes af hyppige ventrikulære ekstrasystoler. Under forudgående sinusrytme ses det forlængede QT-interval samt skiftende T-taksmorfologi. Episoden her er selvlimiterende.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm">
                                            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2.5 tracking-tight">
                                                <Activity className="w-6 h-6 text-slate-500" />
                                                Udfordringer ved EKG-aflæsning af QT-interval
                                            </h3>
                                            <p className="text-slate-600 text-[14px] leading-relaxed mb-6">
                                                Når T-takken har et afvigende udseende – særligt ved lægemiddelpåvirket repolarisering – kan måling af QT-intervallet være en særlig udfordring. Herunder ses typiske eksempler fra vejledningen.
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Figur 6 / Tangent */}
                                                <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="text-sm font-bold uppercase text-slate-700 mb-2 tracking-wider">Tangentmetoden (Fig. 6)</h4>
                                                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">Når T-takkens afslutning er uklar, forlænges det stejleste stykke af det nedadgående ben, til det skærer grundlinjen.</p>
                                                    </div>
                                                    <img src={`${import.meta.env.BASE_URL}img/arytmi/page21_img1.png`} alt="Tangentmetoden" className="w-full h-auto rounded-xl mt-auto object-contain bg-slate-50 p-2" />
                                                </div>

                                                {/* Figur 8 & 9 / Flade T-takker */}
                                                <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="text-sm font-bold uppercase text-slate-700 mb-2 tracking-wider">Flade T-takker (Fig. 8/9)</h4>
                                                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">Under behandling med f.eks. antipsykotika kan T-takkerne fremstå mærkbart flade, hvorved QT-intervallet er vanskeligt at afgrænse.</p>
                                                    </div>
                                                    <img src={`${import.meta.env.BASE_URL}img/arytmi/page22_img1.jpeg`} alt="Flade T-takker" className="w-full h-auto rounded-xl mt-auto object-contain bg-slate-50" />
                                                </div>

                                                {/* Figur 10 / U-tak */}
                                                <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between md:col-span-2">
                                                    <div>
                                                        <h4 className="text-sm font-bold uppercase text-slate-700 mb-2 tracking-wider">U-takker (Fig. 10)</h4>
                                                        <p className="text-xs text-slate-500 mb-4 leading-relaxed">Et EKG kan indeholde en såkaldt U-tak efter afslutningen af T-takken. Såfremt U-takkens amplitude svarer til T-takkens eller er større, bør den inkluderes i selve "QT-intervallet".</p>
                                                    </div>
                                                    <img src={`${import.meta.env.BASE_URL}img/arytmi/page23_img1.png`} alt="U-tak" className="w-full h-48 rounded-xl object-contain bg-slate-50 p-2" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Core Info Cards */}
                                    <div className="space-y-4">
                                        {renderDetailCard('Normal Dosering & Kontrol', activeDrug.normalDose, 'default')}
                                    </div>

                                    {/* Side Effects Section */}
                                    {activeDrug.sideEffects && activeDrug.sideEffects.length > 0 && (
                                        <div className="mt-10">
                                            <h3 className="text-xl font-black text-[#3A4A40] mb-5 flex items-center gap-2.5 tracking-tight">
                                                <AlertTriangle className="w-6 h-6 text-amber-500" />
                                                Risikogrupper & Håndtering
                                            </h3>
                                            <div className="grid gap-4">
                                                {activeDrug.sideEffects.map((se, idx) => {
                                                    let boxColor = "bg-white/80 border-[#E8E4D9]";
                                                    if (se.symptom.includes('Røde')) boxColor = "bg-red-50/50 border-red-200";
                                                    if (se.symptom.includes('Gule')) boxColor = "bg-amber-50/50 border-amber-200";
                                                    if (se.symptom.includes('Grønne')) boxColor = "bg-emerald-50/50 border-emerald-200";

                                                    return (
                                                        <div key={idx} className={`${boxColor} border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
                                                            <h4 className="font-extrabold text-[#3A4A40] text-[16px] mb-2.5">{se.symptom}</h4>
                                                            <p className="text-[#5C6B61] text-[15px] leading-relaxed mb-4">
                                                                {se.description}
                                                            </p>
                                                            <div className="bg-white/80 border border-black/5 rounded-2xl p-4 text-[14px] text-[#4A5A50] flex gap-3.5 shadow-sm">
                                                                <div className="bg-black/5 p-1 rounded-full shadow-sm shrink-0 h-fit mt-0.5">
                                                                    <Info className="w-4 h-4 text-[#3A4A40]" />
                                                                </div>
                                                                <span className="leading-relaxed"><strong className="text-[#3A4A40]">Håndtering:</strong> {se.treatment}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Featured / Highlighted Link (e.g. Switchtabel) */}
                                    {activeDrug.featuredLink && (
                                        <div className="mt-10 mb-8 animate-in fade-in zoom-in-95 duration-500 delay-150">
                                            <a
                                                href={activeDrug.featuredLink.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 group border border-indigo-400"
                                            >
                                                <div className="bg-white/20 p-4 rounded-2xl shrink-0 group-hover:scale-110 group-hover:bg-white/30 transition-all shadow-inner">
                                                    <LinkIcon className="w-8 h-8 text-white" />
                                                </div>
                                                <div className="text-center sm:text-left">
                                                    <h3 className="font-black text-white text-xl tracking-tight mb-1">{activeDrug.featuredLink.title}</h3>
                                                    <p className="text-indigo-50 text-[15px] font-medium leading-snug">{activeDrug.featuredLink.description}</p>
                                                </div>
                                                <div className="hidden sm:flex ml-auto bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
                                                    <ChevronRight className="w-6 h-6 text-white" />
                                                </div>
                                            </a>
                                        </div>
                                    )}

                                </div>
                            ) : (
                                <>
                                    {/* Individual Drug Receptor Illustration */}
                                    {activeDrug.receptorAffinities && (
                                        <div className="mb-10 lg:mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#839788] mb-3 ml-1 flex items-center gap-1.5">
                                                <Activity className="w-3.5 h-3.5" /> Primær Receptor Affinitet
                                            </h3>
                                            <div className="flex flex-wrap gap-2 md:gap-3 items-start">
                                                {Object.entries(activeDrug.receptorAffinities).map(([receptor, level]) => {
                                                    const profile = RECEPTOR_PROFILES.find(p => p.receptor.startsWith(receptor));

                                                    // Functional color scale
                                                    const getLevelStyles = (l, r) => {
                                                        const isAgonist = r.includes('Agonist') || l === 4; // Assuming 4 could be full agonist later, or checking name

                                                        switch (l) {
                                                            case 4:
                                                                return 'bg-[#10B981] text-white border-[#059669] shadow-md ring-2 ring-[#10B981]/30'; // Full Agonist (Green)
                                                            case 3:
                                                                return 'bg-[#F59E0B] text-white border-[#D97706] shadow-md ring-2 ring-[#F59E0B]/30'; // Partial Agonist (Amber)
                                                            case 2:
                                                                return 'bg-[#E11D48] text-white border-[#BE123C] shadow-md ring-2 ring-[#E11D48]/20'; // High Affinity Blocker (Rose/Red)
                                                            case 1:
                                                                return 'bg-[#FFE4E6] text-[#9F1239] border-[#FECDD3] shadow-sm'; // Moderate Affinity Blocker (Light Rose)
                                                            case 0:
                                                                return 'bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0] border-dashed'; // Low/None
                                                            default:
                                                                return 'bg-white text-gray-500 border-gray-200';
                                                        }
                                                    };
                                                    const getLevelText = (l) => {
                                                        switch (l) {
                                                            case 4: return 'Agonist (Aktiverer)';
                                                            case 3: return 'Partiel Agonist';
                                                            case 2: return 'Blokerer (Høj)';
                                                            case 1: return 'Blokerer (Moderat)';
                                                            case 0: return 'Lav / Ingen Effekt';
                                                            default: return '';
                                                        }
                                                    };

                                                    // Short visible effect description for the box
                                                    const getReceptorShortEffect = (r, l) => {
                                                        if (l === 0) return "Ingen signifikant effekt";
                                                        switch (r) {
                                                            case 'D2': return l === 3 ? "Stabiliserende" : "Antipsykotisk / EPS";
                                                            case '5-HT2A': return "EPS-beskyttende";
                                                            case 'H1': return "Sedation & Vægtøgning";
                                                            case 'M1': return "Antikolinergt";
                                                            case 'Alfa-1': return "Blodtryk / Svimmel";
                                                            default: return "";
                                                        }
                                                    };

                                                    const getShortEffectStyles = (l) => {
                                                        if (l >= 3) return 'bg-white/20 text-amber-50 border border-white/20'; // amber/green
                                                        if (l === 2) return 'bg-white/20 text-rose-50 border border-white/20'; // rose
                                                        if (l === 1) return 'bg-white/60 text-[#9F1239] border border-rose-300'; // light rose
                                                        return 'hidden';
                                                    };

                                                    return (
                                                        <div key={receptor} className={`relative flex-1 min-w-[125px] flex flex-col p-4 rounded-3xl border transition-all duration-300 group hover:shadow-xl cursor-ns-resize overflow-hidden ${getLevelStyles(level, receptor)}`}>
                                                            <div className="flex flex-col items-center justify-center">
                                                                <span className="font-extrabold text-[16px] md:text-[18px] tracking-tight mb-1">{receptor}</span>
                                                                <div className={`text-[9px] md:text-[10px] uppercase tracking-[0.1em] font-black text-center leading-tight mb-2.5 ${level >= 2 ? 'opacity-90' : 'opacity-70'}`}>
                                                                    {getLevelText(level)}
                                                                </div>

                                                                {/* Short visible effect */}
                                                                <div className={`text-[10px] font-bold text-center leading-snug px-2.5 py-1.5 rounded-xl w-full ${getShortEffectStyles(level)}`}>
                                                                    {getReceptorShortEffect(receptor, level)}
                                                                </div>
                                                            </div>

                                                            {/* Expanding content on hover */}
                                                            <div className="max-h-0 opacity-0 group-hover:max-h-[350px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                                                <div className="pt-4 mt-4 border-t border-white/20">
                                                                    <div className="font-black text-sm mb-3 opacity-90">{profile ? profile.receptor : receptor}</div>

                                                                    {level > 0 && profile ? (
                                                                        <div className="space-y-3 text-left">
                                                                            <div>
                                                                                <span className="block text-[8px] font-black uppercase opacity-70 mb-0.5 tracking-wider">Klinisk Effekt</span>
                                                                                <p className="text-[11px] leading-snug font-medium opacity-95">{profile.effect}</p>
                                                                            </div>
                                                                            <div>
                                                                                <span className="block text-[8px] font-black uppercase opacity-70 mb-0.5 tracking-wider">Bivirkning / Risiko</span>
                                                                                <p className="text-[11px] leading-snug font-medium opacity-95">{profile.sideEffects}</p>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="text-[11px] italic text-left opacity-75">
                                                                            Dette præparat har ingen signifikant klinisk påvirkning af denne receptor.
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Core Info Cards */}
                                    <div className="space-y-4">
                                        {renderDetailCard('Virkning & Indikation', activeDrug.effect, 'info')}
                                        {renderDetailCard('Normal Dosering', activeDrug.normalDose, 'default')}
                                    </div>

                                    {/* Featured / Highlighted Link (e.g. Switchtabel) */}
                                    {activeDrug.featuredLink && (
                                        <div className="mt-6 mb-8 animate-in fade-in zoom-in-95 duration-500 delay-150">
                                            <a
                                                href={activeDrug.featuredLink.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all hover:-translate-y-1 group border border-indigo-400"
                                            >
                                                <div className="bg-white/20 p-4 rounded-2xl shrink-0 group-hover:scale-110 group-hover:bg-white/30 transition-all shadow-inner">
                                                    <LinkIcon className="w-8 h-8 text-white" />
                                                </div>
                                                <div className="text-center sm:text-left">
                                                    <h3 className="font-black text-white text-xl tracking-tight mb-1">{activeDrug.featuredLink.title}</h3>
                                                    <p className="text-indigo-50 text-[15px] font-medium leading-snug">{activeDrug.featuredLink.description}</p>
                                                </div>
                                                <div className="hidden sm:flex ml-auto bg-white/10 p-3 rounded-full group-hover:bg-white/20 transition-colors">
                                                    <ChevronRight className="w-6 h-6 text-white" />
                                                </div>
                                            </a>
                                        </div>
                                    )}

                                    {/* Side Effects Section */}
                                    {activeDrug.sideEffects && activeDrug.sideEffects.length > 0 && (
                                        <div className="mt-10">
                                            <h3 className="text-xl font-black text-[#3A4A40] mb-5 flex items-center gap-2.5 tracking-tight">
                                                <AlertTriangle className="w-6 h-6 text-amber-500" />
                                                Særlige Bivirkninger & Håndtering
                                            </h3>
                                            <div className="grid gap-4">
                                                {activeDrug.sideEffects.map((se, idx) => (
                                                    <div key={idx} className="bg-white/80 border border-[#E8E4D9] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                                        <h4 className="font-extrabold text-[#3A4A40] text-[16px] mb-2.5">{se.symptom}</h4>
                                                        <p className="text-[#5C6B61] text-[15px] leading-relaxed mb-4">
                                                            {se.description}
                                                        </p>
                                                        <div className="bg-[#F8F7F4] border border-[#E8E4D9]/80 rounded-2xl p-4 text-[14px] text-[#4A5A50] flex gap-3.5 ring-1 ring-inset ring-amber-900/5">
                                                            <div className="bg-white p-1 rounded-full shadow-sm shrink-0 h-fit mt-0.5">
                                                                <Info className="w-4 h-4 text-amber-600" />
                                                            </div>
                                                            <span className="leading-relaxed"><strong className="text-[#3A4A40]">Håndtering:</strong> {se.treatment}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Sources Section */}
                                    {activeDrug.sources && activeDrug.sources.length > 0 && (
                                        <div className="mt-12 pt-8 border-t border-[#E8E4D9]">
                                            <h3 className="text-xs font-black text-[#839788] uppercase tracking-widest mb-4">Kilder & Opslag</h3>
                                            <div className="flex flex-wrap gap-3">
                                                {activeDrug.sources.map((source, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={source.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl border border-[#D9E1DA] bg-white text-[#5C6B61] text-[14px] font-bold hover:text-[#3A4A40] hover:border-[#839788] hover:shadow-sm transition-all group ring-1 ring-inset ring-transparent hover:ring-[#839788]/10"
                                                    >
                                                        <LinkIcon className="w-4 h-4 text-[#839788] group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                                                        {source.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-center h-full text-[#839788]">
                            Vælg et præparat fra listen for at se detaljer.
                        </div>
                    )}
                </main>
            </div>

            {/* Mobile navigation toggle (simple version for now) */}
            <div className="md:hidden glass-panel border-t border-white/40 p-4 shrink-0 flex gap-2 overflow-x-auto no-scrollbar">
                {groupedData.flatMap(g => g.items).slice(0, 5).map(drug => (
                    <button
                        key={drug.id}
                        onClick={() => setActiveDrugId(drug.id)}
                        className={`px-4 py-2 rounded-xl text-sm whitespace-nowrap transition-colors ${activeDrugId === drug.id
                            ? 'bg-[#839788] text-white font-bold'
                            : 'bg-white text-[#5C6B61] font-medium border border-[#D9E1DA]'
                            }`}
                    >
                        {drug.name.split(' ')[0]}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PsykofarmakaApp;
