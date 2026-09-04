import React, { useState } from 'react';
import { 
    FileText, Download, AlertTriangle, CheckCircle, Info, ShieldAlert, 
    Activity, Brain, Users, User, ChevronRight, ChevronDown, ChevronUp, Pill, AlertCircle 
} from './Icons';
import { renderWithDrugLinks } from '../utils/linkifyDrugs';
import { SplitAlgorithmFlow } from './SplitAlgorithmFlow';
import { DEPRESSION_PREVIOUS_SPLIT_ALGORITHM } from '../data/guidelinesDepression';

export function DepressionGuidelineView({ onNavigate, guideline }) {
    const [activeTab, setActiveTab] = useState('algoritme');
    const [selectedWeek, setSelectedWeek] = useState('uge4');
    const [drugLineFilter, setDrugLineFilter] = useState('alle');
    const [populationTab, setPopulationTab] = useState('boern');
    const [isPreviousAlgFolded, setIsPreviousAlgFolded] = useState(false);

    const pdfOriginalUrl = `${import.meta.env.BASE_URL}pdf/dmpg-farmakologisk-behandling-af-unipolar-depression-2026.pdf`;
    const pdfNonFarmUrl = `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-non-fatmakologisk-behandling-af-unipolar-depression.pdf`;
    const pdfSstUrl = `${import.meta.env.BASE_URL}pdf/Referenceprogram_SST.pdf`;

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">
            {/* Header with Title and PDF Access */}
            <div className="mb-8 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 bg-white/70 backdrop-blur-md p-6 rounded-3xl border border-[#E8E4D9] shadow-sm">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#839788]/15 text-[#3A4A40] text-xs font-black uppercase tracking-wider mb-2">
                        <Activity className="w-3.5 h-3.5 text-[#839788]" /> DMPG Klinisk Retningslinje (Juni 2026)
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#3A4A40] tracking-tight">
                        Farmakologisk Behandling af Unipolar Depression
                    </h2>
                    <p className="text-sm text-[#839788] mt-1 font-medium">
                        Sundhedsvæsenets Kvalitetsinstitut & Dansk Multidisciplinær Psykiatrisk Gruppe (DMPG)
                    </p>
                </div>
                
                {/* PDF Access Area in Top Right Corner */}
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2.5 shrink-0 w-full md:w-auto mt-2 md:mt-0">
                    <a 
                        href={pdfOriginalUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#839788] to-[#6A7A6E] text-white px-5 py-3 rounded-2xl hover:from-[#728577] hover:to-[#5B6A5F] transition-all shadow-md hover:shadow-lg font-bold text-sm hover:-translate-y-0.5 group"
                        title="Åbn hele den officielle 53-siders DMPG 2026 retningslinje i ny fane"
                    >
                        <FileText className="w-4 h-4 text-white group-hover:scale-110 transition-transform" /> 
                        <span>Åbn DMPG 2026 (Original PDF)</span>
                    </a>
                    
                    <div className="flex gap-2">
                        <a 
                            href={pdfNonFarmUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-[#E8E4D9] text-[#5C6B61] hover:text-[#3A4A40] hover:bg-[#FAF9F6] px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold shadow-sm"
                            title="NKR Non-farmakologisk behandling af unipolar depression (2016)"
                        >
                            <Download className="w-3.5 h-3.5 text-[#839788]" /> Non-farm. NKR
                        </a>
                        <a 
                            href={pdfSstUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-[#E8E4D9] text-[#5C6B61] hover:text-[#3A4A40] hover:bg-[#FAF9F6] px-3.5 py-2.5 rounded-xl transition-all text-xs font-semibold shadow-sm"
                            title="Tidligere Referenceprogram for unipolar depression (SST)"
                        >
                            <Download className="w-3.5 h-3.5 text-[#839788]" /> Referenceprogr.
                        </a>
                    </div>
                </div>
            </div>

            {/* 3 Quick Clinical Takeaway Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-emerald-50/90 to-white p-4 rounded-2xl border border-emerald-200/70 shadow-sm">
                    <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider mb-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Algoritmestyret Forløb
                    </div>
                    <p className="text-xs text-[#4A5A50] leading-relaxed">
                        Maks. <strong>4 uger</strong> uden respons før præparatskift eller kombination. Effekt og remission monitoreres systematisk ved hvert trin med <strong>HAM-D6</strong> (mål: &lt; 5).
                    </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50/90 to-white p-4 rounded-2xl border border-blue-200/70 shadow-sm">
                    <div className="flex items-center gap-2 text-blue-800 font-black text-xs uppercase tracking-wider mb-1.5">
                        <Pill className="w-4 h-4 text-blue-600" /> Førstelinje Monoterapi
                    </div>
                    <p className="text-xs text-[#4A5A50] leading-relaxed">
                        SSRI, SNRI, NaSSA, Vortioxetin og Agomelatin er sidestillede. Vælg ud fra bivirkningsprofil og patientønsker. Dosis øges som udgangspunkt <strong>kun én gang</strong>.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-rose-50/90 to-white p-4 rounded-2xl border border-rose-200/70 shadow-sm">
                    <div className="flex items-center gap-2 text-rose-800 font-black text-xs uppercase tracking-wider mb-1.5">
                        <ShieldAlert className="w-4 h-4 text-rose-600" /> Sikkerhed & Advarsler
                    </div>
                    <p className="text-xs text-[#4A5A50] leading-relaxed">
                        <strong>Lamotrigin frarådes</strong> ved unipolar depression (negativ evidens). Børn/unge: KUN <strong>Fluoxetin</strong> godkendt (Venlafaxin/Paroxetin/TCA kontraindiceret).
                    </p>
                </div>
            </div>

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
                        <Activity className="w-4 h-4" /> 1. Behandlingsalgoritme (Figur 1)
                    </button>
                    <button
                        onClick={() => setActiveTab('medicin')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === 'medicin' 
                                ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white shadow-sm' 
                                : 'text-[#839788] hover:bg-white/50'
                        }`}
                    >
                        <Pill className="w-4 h-4" /> 2. Præparatvalg (1., 2. & 3. Linje)
                    </button>
                    <button
                        onClick={() => setActiveTab('populationer')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === 'populationer' 
                                ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white shadow-sm' 
                                : 'text-[#839788] hover:bg-white/50'
                        }`}
                    >
                        <Users className="w-4 h-4" /> 3. Særlige Populationer (Børn, Ældre, Gravide)
                    </button>
                    <button
                        onClick={() => setActiveTab('sikkerhed')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === 'sikkerhed' 
                                ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white shadow-sm' 
                                : 'text-[#839788] hover:bg-white/50'
                        }`}
                    >
                        <AlertTriangle className="w-4 h-4" /> 4. EKG, Bivirkninger & Udtrapning
                    </button>
                    <button
                        onClick={() => setActiveTab('tidligere_algoritme')}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${
                            activeTab === 'tidligere_algoritme' 
                                ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white shadow-sm' 
                                : 'text-[#839788] hover:bg-white/50'
                        }`}
                    >
                        <Brain className="w-4 h-4" /> 5. Referenceprogram-Algoritme (Tidl.)
                    </button>
                </div>

                {/* Tab 1: Behandlingsalgoritme (Figur 1) */}
                {activeTab === 'algoritme' && (
                    <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9F6] to-white/40 space-y-8 animate-in fade-in duration-300">
                        {/* Quick link banner to the previous algorithm */}
                        <div className="bg-gradient-to-r from-[#F2F6F3] via-white to-[#FAF9F6] p-4 rounded-2xl border border-[#D9E1DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-[#839788]/15 text-[#3A4A40] shrink-0">
                                    <Brain className="w-5 h-5 text-[#839788]" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#3A4A40]">Tidligere Behandlingsalgoritme (SST Referenceprogram)</h4>
                                    <p className="text-xs text-[#839788]">
                                        Søger du den tidligere behandlingsalgoritme opdelt på ikke-hospitaliserede vs. hospitaliserede?
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setActiveTab('tidligere_algoritme')}
                                className="px-4 py-2 rounded-xl bg-white border border-[#839788]/40 hover:border-[#839788] text-[#3A4A40] hover:text-[#2C3F34] text-xs font-bold shadow-sm hover:shadow transition-all whitespace-nowrap flex items-center gap-1.5 self-end sm:self-auto"
                            >
                                Se tidligere algoritme <ChevronRight className="w-3.5 h-3.5 text-[#839788]" />
                            </button>
                        </div>

                        {/* Section Header */}
                        <div>
                            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#839788] tracking-wider mb-1">
                                Anbefaling 1, 4 & Figur 1 (Evidensgrad A)
                            </div>
                            <h3 className="text-xl font-bold text-[#3A4A40]">
                                Standardalgoritme for justering, præparatskifte og kombinationsbehandling
                            </h3>
                            <p className="text-sm text-[#5C6B61] mt-1 leading-relaxed">
                                Behandlingsstart sker altid med laveste potentielt effektive dosis. Effekten evalueres systematisk ved faste beslutningstrin ud fra ændring i <strong>HAM-D6 score</strong> fra baseline.
                            </p>
                        </div>

                        {/* Interactive Timeline Selector */}
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {[
                                { id: 'uge2', label: 'Uge 2', sub: 'Første opfølgning' },
                                { id: 'uge4', label: 'Uge 4', sub: 'Kritisk beslutningspunkt' },
                                { id: 'uge6', label: 'Uge 6', sub: 'Manglende respons' },
                                { id: 'uge8', label: 'Uge 8', sub: 'Vedvarende symptomer' },
                                { id: 'uge12', label: 'Uge 12', sub: 'Slutevaluering' },
                            ].map(w => (
                                <button
                                    key={w.id}
                                    onClick={() => setSelectedWeek(w.id)}
                                    className={`flex-1 min-w-[120px] p-3.5 rounded-2xl border text-left transition-all ${
                                        selectedWeek === w.id
                                            ? 'bg-white border-[#839788] shadow-md ring-2 ring-[#839788]/20'
                                            : 'bg-white/50 border-[#E8E4D9] hover:bg-white text-[#5C6B61]'
                                    }`}
                                >
                                    <span className={`block text-xs font-black uppercase tracking-wider ${selectedWeek === w.id ? 'text-[#839788]' : 'text-slate-400'}`}>
                                        {w.label}
                                    </span>
                                    <span className="block text-sm font-bold text-[#3A4A40] mt-0.5">{w.sub}</span>
                                </button>
                            ))}
                        </div>

                        {/* Decision Cards for the Selected Week */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* <20% respons */}
                            <div className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                                            &lt; 20% Respons
                                        </span>
                                        <AlertCircle className="w-4 h-4 text-rose-500" />
                                    </div>
                                    <h4 className="font-bold text-[#3A4A40] text-base mb-2">Ingen eller minimal effekt</h4>
                                    <div className="text-sm text-[#4A5A50] leading-relaxed">
                                        {selectedWeek === 'uge2' && (
                                            <p><strong>Øg dosis</strong> til næste niveau (husk: dosis øges som udgangspunkt kun én gang for et givet præparat).</p>
                                        )}
                                        {selectedWeek === 'uge4' && (
                                            <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-100 mt-1">
                                                <strong className="text-rose-900 block mb-1">Skift til AD fra anden klasse!</strong>
                                                <p className="text-xs text-rose-800 leading-relaxed">
                                                    Algoritmen starter forfra. Vent ikke – sandsynligheden for senere respons efter 4 uger uden bedring er minimal.
                                                </p>
                                            </div>
                                        )}
                                        {(selectedWeek === 'uge6' || selectedWeek === 'uge8') && (
                                            <p><strong>Skift til AD fra anden klasse</strong> eller <strong>overvej kombinationsbehandling</strong>.</p>
                                        )}
                                        {selectedWeek === 'uge12' && (
                                            <p><strong>Overvej skift til anden klasse</strong> eller <strong>tredjelinjebehandling</strong> (Esketamin, ECT).</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 20-50% respons */}
                            <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                                            20 - 50% Respons
                                        </span>
                                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                                    </div>
                                    <h4 className="font-bold text-[#3A4A40] text-base mb-2">Partielt respons</h4>
                                    <div className="text-sm text-[#4A5A50] leading-relaxed">
                                        {selectedWeek === 'uge2' && (
                                            <p><strong>Øg dosis</strong>, hvis præparatet tåles godt og dosisøgning er indiceret.</p>
                                        )}
                                        {selectedWeek === 'uge4' && (
                                            <p>
                                                <strong>Overvej skift til anden klasse</strong> ELLER <strong>kombinationsbehandling</strong> (Aripiprazol, Quetiapin, Lithium eller Mirtazapin).
                                            </p>
                                        )}
                                        {(selectedWeek === 'uge6' || selectedWeek === 'uge8' || selectedWeek === 'uge12') && (
                                            <p>
                                                <strong>Overvej kombinationsbehandling</strong> (Augmentering) mhp. at opnå fuld remission.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* >50% respons */}
                            <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                                            &gt; 50% Respons
                                        </span>
                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <h4 className="font-bold text-[#3A4A40] text-base mb-2">Godt respons</h4>
                                    <div className="text-sm text-[#4A5A50] leading-relaxed">
                                        {selectedWeek === 'uge2' && (
                                            <p><strong>Afvent yderligere respons</strong> på uændret dosis. Patienten responderer tilfredsstillende.</p>
                                        )}
                                        {selectedWeek === 'uge4' && (
                                            <p><strong>Øg dosis</strong> (hvis remission ikke er nået og dosisøgning tåles) eller afvent fuld remission.</p>
                                        )}
                                        {(selectedWeek === 'uge6' || selectedWeek === 'uge8' || selectedWeek === 'uge12') && (
                                            <p>
                                                Hvis remission udebliver trods &gt;50% bedring: <strong>Overvej kombinationsbehandling</strong> mhp. at fjerne residuale symptomer.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Remission */}
                            <div className="bg-white p-5 rounded-2xl border border-[#839788]/60 shadow-sm flex flex-col justify-between bg-gradient-to-br from-[#F2F6F3]/50 to-white">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-black uppercase tracking-wider text-[#2C3F34] bg-[#E2E8DF] px-2.5 py-0.5 rounded-full">
                                            Remission (HAM-D6 &lt; 5)
                                        </span>
                                        <CheckCircle className="w-4 h-4 text-[#839788]" />
                                    </div>
                                    <h4 className="font-bold text-[#3A4A40] text-base mb-2">Behandlingsmål opnået!</h4>
                                    <div className="text-sm text-[#4A5A50] leading-relaxed">
                                        <p>
                                            <strong>Fortsæt behandlingen uændret</strong> som vedligeholdelsesbehandling ved den dosis, hvor remission blev opnået.
                                        </p>
                                        <p className="text-xs text-[#839788] mt-2 font-medium">
                                            Fastholdes i mindst 6-9 måneder (mindst 12 måneder ved risikofaktorer for recidiv).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Full Algorithm Table View */}
                        <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] shadow-sm overflow-x-auto">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#3A4A40] mb-4 flex items-center gap-2">
                                <Activity className="w-4 h-4 text-[#839788]" /> Figur 1: Komplet Algoritmeoversigt (DMPG 2026)
                            </h4>
                            <table className="w-full text-left text-xs border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-[#E8E4D9] text-[#839788] font-black uppercase tracking-wider">
                                        <th className="py-3 px-3">Tidspunkt</th>
                                        <th className="py-3 px-3 text-rose-800 bg-rose-50/40">&lt; 20% respons</th>
                                        <th className="py-3 px-3 text-amber-800 bg-amber-50/40">20 - 50% respons</th>
                                        <th className="py-3 px-3 text-emerald-800 bg-emerald-50/40">&gt; 50% respons</th>
                                        <th className="py-3 px-3 text-[#2C3F34] bg-[#F2F6F3]">Remission (HAM-D6 &lt; 5)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E8E4D9]/60 font-medium text-[#4A5A50]">
                                    <tr>
                                        <td className="py-3 px-3 font-bold text-[#3A4A40]">Uge 2</td>
                                        <td className="py-3 px-3">Øg dosis</td>
                                        <td className="py-3 px-3">Øg dosis</td>
                                        <td className="py-3 px-3">Afvent yderligere respons</td>
                                        <td className="py-3 px-3 bg-[#F2F6F3]/50 font-bold text-emerald-800">Fortsæt vedligeholdelse</td>
                                    </tr>
                                    <tr className="bg-slate-50/40">
                                        <td className="py-3 px-3 font-bold text-[#3A4A40]">Uge 4</td>
                                        <td className="py-3 px-3 text-rose-700 font-bold">Skift til AD fra anden klasse</td>
                                        <td className="py-3 px-3">Overvej skift til anden klasse el. kombinationsbehandling</td>
                                        <td className="py-3 px-3">Øg dosis</td>
                                        <td className="py-3 px-3 bg-[#F2F6F3]/50 font-bold text-emerald-800">Fortsæt vedligeholdelse</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-3 font-bold text-[#3A4A40]">Uge 6</td>
                                        <td className="py-3 px-3">Skift til AD fra anden klasse</td>
                                        <td className="py-3 px-3">Overvej kombinationsbehandling</td>
                                        <td className="py-3 px-3">Overvej kombinationsbehandling</td>
                                        <td className="py-3 px-3 bg-[#F2F6F3]/50 font-bold text-emerald-800">Fortsæt vedligeholdelse</td>
                                    </tr>
                                    <tr className="bg-slate-50/40">
                                        <td className="py-3 px-3 font-bold text-[#3A4A40]">Uge 8</td>
                                        <td className="py-3 px-3" colSpan="2">Overvej kombinationsbehandling</td>
                                        <td className="py-3 px-3" colSpan="2">Fortsæt behandling som vedligeholdelse</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 px-3 font-bold text-[#3A4A40]">Uge 12</td>
                                        <td className="py-3 px-3" colSpan="3">Overvej skift til AD fra anden klasse eller kombinationsbehandling / 3. linje</td>
                                        <td className="py-3 px-3 bg-[#F2F6F3]/50 font-bold text-emerald-800">Fortsæt vedligeholdelse</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="mt-3 text-[11px] text-[#839788] italic">
                                * Ved skift til antidepressivum fra anden klasse starter algoritmen forfra. Standardalgoritme modificeret fra Adli et al. og Bauer et al.
                            </div>
                        </div>

                        {/* Special Note on Psychotic Depression */}
                        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-3.5">
                            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="text-sm text-amber-900 leading-relaxed">
                                <strong className="block text-amber-950 font-bold mb-1">Psykotisk Depression (Anbefaling 3 - Evidensgrad A):</strong>
                                Kræver kombination af et antidepressivum og et atypisk antipsykotikum i <em>fuld antipsykotisk dosis</em> (højere end ved simpel augmentering). 
                                <strong> ECT bør altid overvejes som førstevalg</strong>, særligt ved akut selvmordsfare, svær hæmning eller vægring. Fortsæt kombinationsbehandlingen i mindst 12 måneder efter remission.
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Præparatvalg (Tabel 1: 1., 2. & 3. linje) */}
                {activeTab === 'medicin' && (
                    <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9F6] to-white/40 space-y-6 animate-in fade-in duration-300">
                        {/* Section Header */}
                        <div>
                            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#839788] tracking-wider mb-1">
                                Tabel 1: Præparatoversigt for Voksne (DMPG 2026)
                            </div>
                            <h3 className="text-xl font-bold text-[#3A4A40]">
                                Første-, anden- og tredjelinjebehandlinger af depression
                            </h3>
                            <p className="text-sm text-[#5C6B61] mt-1">
                                Klik på et vilkårligt præparatnavn for at se detaljerede doser, virkningsmekanisme og bivirkningsprofil i Psykofarmaka-kataloget.
                            </p>
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex gap-2 pb-2">
                            {[
                                { id: 'alle', label: 'Alle Behandlingslinjer' },
                                { id: '1', label: '1. Linje (Monoterapi)' },
                                { id: '2', label: '2. Linje (Skift & Augmentering)' },
                                { id: '3', label: '3. Linje (Terapiresistens & TRD)' }
                            ].map(f => (
                                <button
                                    key={f.id}
                                    onClick={() => setDrugLineFilter(f.id)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        drugLineFilter === f.id
                                            ? 'bg-[#839788] text-white shadow-sm'
                                            : 'bg-white text-[#5C6B61] border border-[#E8E4D9] hover:bg-[#FAF9F6]'
                                    }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {/* 1. Linje Behandlinger */}
                        {(drugLineFilter === 'alle' || drugLineFilter === '1') && (
                            <div className="bg-white rounded-2xl p-6 border border-[#E8E4D9] shadow-sm space-y-4">
                                <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">1</span>
                                        <h4 className="text-base font-bold text-[#3A4A40]">Førstelinjebehandlinger (Monoterapi)</h4>
                                    </div>
                                    <span className="text-[11px] font-bold text-[#839788] bg-[#FAF9F6] border border-[#E8E4D9] px-3 py-1 rounded-full">
                                        Ingen overlegen klasse • Valg efter bivirkningsprofil
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                    {/* SSRI */}
                                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9]/80">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-extrabold text-sm text-[#3A4A40]">SSRI</span>
                                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Standard Førstevalg</span>
                                        </div>
                                        <div className="text-xs text-[#4A5A50] space-y-1.5 leading-relaxed">
                                            <p><strong>1. rang:</strong> {renderWithDrugLinks('Sertralin', onNavigate)} (50-100 mg), {renderWithDrugLinks('Escitalopram', onNavigate)} (10-20 mg), {renderWithDrugLinks('Citalopram', onNavigate)} (20-40 mg).</p>
                                            <p><strong>2. rang:</strong> {renderWithDrugLinks('Fluoxetin', onNavigate)} (20-40 mg), {renderWithDrugLinks('Fluvoxamin', onNavigate)}, {renderWithDrugLinks('Paroxetin', onNavigate)}.</p>
                                            <p className="text-[#839788] text-[11px] mt-1 italic">
                                                * Sertralin foretrækkes ofte pga. laveste bivirknings- og interaktionsrisiko. Paroxetin har flere seponeringssymptomer og antikolinerge effekter.
                                            </p>
                                        </div>
                                    </div>

                                    {/* SNRI */}
                                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9]/80">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-extrabold text-sm text-[#3A4A40]">SNRI</span>
                                            <span className="text-[10px] font-bold text-[#5C6B61] bg-white px-2 py-0.5 rounded border border-[#E8E4D9]">Dual Action</span>
                                        </div>
                                        <div className="text-xs text-[#4A5A50] space-y-1.5 leading-relaxed">
                                            <p><strong>1. rang:</strong> {renderWithDrugLinks('Duloxetin', onNavigate)} (60-120 mg).</p>
                                            <p><strong>2. rang:</strong> {renderWithDrugLinks('Venlafaxin', onNavigate)} (75-225 mg).</p>
                                            <p className="text-[#839788] text-[11px] mt-1 italic">
                                                * OBS: Doser under 225 mg venlafaxin giver sjældent dual noradrenerg virkning.
                                            </p>
                                        </div>
                                    </div>

                                    {/* NaSSA */}
                                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9]/80">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-extrabold text-sm text-[#3A4A40]">NaSSA</span>
                                            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">Søvnfremmende</span>
                                        </div>
                                        <div className="text-xs text-[#4A5A50] space-y-1.5 leading-relaxed">
                                            <p><strong>1. rang:</strong> {renderWithDrugLinks('Mirtazapin', onNavigate)} (15-45 mg).</p>
                                            <p><strong>2. rang:</strong> {renderWithDrugLinks('Mianserin', onNavigate)} (30-90 mg).</p>
                                            <p className="text-[#839788] text-[11px] mt-1 italic">
                                                * Velegnet ved udtalt insomni eller nedsat appetit/vægttab. Risiko for vægtøgning og sedation.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Multimodal & Melatonin */}
                                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9]/80">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-extrabold text-sm text-[#3A4A40]">Serotoninmodulator & Melatonin</span>
                                            <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded">Kognition & Søvn</span>
                                        </div>
                                        <div className="text-xs text-[#4A5A50] space-y-1.5 leading-relaxed">
                                            <p><strong>Serotoninmodulator:</strong> {renderWithDrugLinks('Vortioxetin', onNavigate)} (10-20 mg). Få seksuelle bivirkninger, god ved kognitive symptomer.</p>
                                            <p><strong>Melatoninagonist:</strong> {renderWithDrugLinks('Agomelatin', onNavigate)} (25-50 mg). Forbedrer døgnrytme; ingen seksuelle bivirkninger. <em>OBS: Monitorér ALAT uge 3, 6, 12, 24</em>.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. Linje Behandlinger */}
                        {(drugLineFilter === 'alle' || drugLineFilter === '2') && (
                            <div className="bg-white rounded-2xl p-6 border border-[#E8E4D9] shadow-sm space-y-4">
                                <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-black text-xs flex items-center justify-center">2</span>
                                        <h4 className="text-base font-bold text-[#3A4A40]">Andenlinjebehandlinger (Præparatskift el. Kombination)</h4>
                                    </div>
                                    <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                                        Indtræder ved manglende/partiel respons på 1. linje
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                    {/* TCA Skift */}
                                    <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200/60">
                                        <h5 className="font-extrabold text-sm text-[#3A4A40] mb-2">TCA (Skift til Tricyklisk Antidepressivum)</h5>
                                        <div className="text-xs text-[#4A5A50] space-y-1.5 leading-relaxed">
                                            <p><strong>1. rang:</strong> {renderWithDrugLinks('Nortriptylin', onNavigate)} (initialt 50 mg).</p>
                                            <p><strong>2. rang:</strong> {renderWithDrugLinks('Amitriptylin', onNavigate)}, {renderWithDrugLinks('Clomipramin', onNavigate)}.</p>
                                            <p><strong>3. rang:</strong> {renderWithDrugLinks('Imipramin', onNavigate)}, {renderWithDrugLinks('Dosulepin', onNavigate)}.</p>
                                            <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200 text-[11px] text-amber-950 mt-2">
                                                <strong>TDM-Krav:</strong> Plasmakoncentrationsmåling er obligatorisk ca. 5 døgn efter opstart/øgning (mål: 200-600 nmol/L). Gentages efter 10 døgn ved mistanke om slow metabolizer.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kombinationsbehandling / Augmentation */}
                                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9]/80">
                                        <h5 className="font-extrabold text-sm text-[#3A4A40] mb-2">Kombinationsbehandling (Augmentation)</h5>
                                        <div className="text-xs text-[#4A5A50] space-y-2 leading-relaxed">
                                            <p>
                                                <strong>{renderWithDrugLinks('Aripiprazol', onNavigate)}* (Evidens A):</strong> 3,25 - 15 mg. Aktiverende profil (velegnet ved udtalt psykomotorisk hæmning).
                                            </p>
                                            <p>
                                                <strong>{renderWithDrugLinks('Quetiapin', onNavigate)} (Evidens A):</strong> 150 - 300 mg. Beroligende og angstdæmpende profil (obs. metabolisk kontrol).
                                            </p>
                                            <p>
                                                <strong>{renderWithDrugLinks('Lithium', onNavigate)}* (Evidens A):</strong> Målniveau 0,4 - 0,8 mmol/L (kræver forprøver og TDM hver 3. måned).
                                            </p>
                                            <p>
                                                <strong>{renderWithDrugLinks('Mirtazapin', onNavigate)} (Evidens B):</strong> 7,5 - 45 mg til natten som tillæg til SSRI eller SNRI.
                                            </p>
                                            <p className="text-[#839788] text-[11px] italic">
                                                * Off-label indikation i Danmark – kræver informeret samtykke og journalføring.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 3. Linje Behandlinger */}
                        {(drugLineFilter === 'alle' || drugLineFilter === '3') && (
                            <div className="bg-white rounded-2xl p-6 border border-[#E8E4D9] shadow-sm space-y-4">
                                <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 font-black text-xs flex items-center justify-center">3</span>
                                        <h4 className="text-base font-bold text-[#3A4A40]">Tredjelinjebehandlinger (Behandlingsresistens - TRD)</h4>
                                    </div>
                                    <span className="text-[11px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                                        Efter minimum 2 forgæves behandlingsforsøg
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                                    {/* Esketamin */}
                                    <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200/70">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-white px-2 py-0.5 rounded border border-purple-200 mb-2 inline-block">
                                            Evidensgrad A
                                        </span>
                                        <h5 className="font-bold text-sm text-[#3A4A40] mb-1">Esketamin Næsespray</h5>
                                        <p className="text-xs text-[#4A5A50] leading-relaxed">
                                            Gives altid sammen med SSRI eller SNRI. Dokumenteret overlegen ift. quetiapin ved behandlingsresistens og ved akut selvmordsrisiko.
                                        </p>
                                    </div>

                                    {/* MAO-Hæmmer */}
                                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9]/80">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-[#5C6B61] bg-white px-2 py-0.5 rounded border border-[#E8E4D9] mb-2 inline-block">
                                            MAO-Inhibitor
                                        </span>
                                        <h5 className="font-bold text-sm text-[#3A4A40] mb-1">{renderWithDrugLinks('Isocarboxazid', onNavigate)}</h5>
                                        <p className="text-xs text-[#4A5A50] leading-relaxed">
                                            Meget potent irreversibel MAO-hæmmer ved svær resistens. Kræver streng tyraminfattig diæt og observation for hypertensiv krise.
                                        </p>
                                    </div>

                                    {/* Sekundær Augmentation */}
                                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9]/80">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-[#5C6B61] bg-white px-2 py-0.5 rounded border border-[#E8E4D9] mb-2 inline-block">
                                            Sekundær Augmentation (B)
                                        </span>
                                        <h5 className="font-bold text-sm text-[#3A4A40] mb-1">Øvrige Præparater</h5>
                                        <p className="text-xs text-[#4A5A50] leading-relaxed">
                                            {renderWithDrugLinks('Olanzapin', onNavigate)}*, {renderWithDrugLinks('Pramipexol', onNavigate)}* (dopaminagonist op til 2,5 mg), {renderWithDrugLinks('Methylphenidat', onNavigate)}* (centralstimulerende) eller {renderWithDrugLinks('Levothyroxin', onNavigate)}*.
                                        </p>
                                    </div>
                                </div>

                                {/* Warning about Lamotrigine */}
                                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
                                    <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="block font-bold mb-0.5 text-rose-950">Vigtig Negativ Anbefaling (Evidensgrad B):</strong>
                                        <strong>Lamotrigin anbefales IKKE</strong> som kombinationsbehandling ved unipolar depression. Den nyeste metaanalyse af 24 RCT-studier viser overvejende negativ evidens og ingen effekt over placebo.
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab 3: Særlige Populationer */}
                {activeTab === 'populationer' && (
                    <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9F6] to-white/40 space-y-6 animate-in fade-in duration-300">
                        {/* Section Header */}
                        <div>
                            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#839788] tracking-wider mb-1">
                                Anbefaling 9 - 15 (DMPG 2026)
                            </div>
                            <h3 className="text-xl font-bold text-[#3A4A40]">
                                Behandling af særlige patientpopulationer
                            </h3>
                            <p className="text-sm text-[#5C6B61] mt-1">
                                Specifikke retningslinjer for børn og unge under 18 år, ældre over 65 år samt gravide og ammende.
                            </p>
                        </div>

                        {/* Sub-tabs */}
                        <div className="flex gap-2 border-b border-[#E8E4D9] pb-3">
                            {[
                                { id: 'boern', label: 'Børn og Unge (<18 år)', icon: User },
                                { id: 'aeldre', label: 'Ældre (>65 år)', icon: Users },
                                { id: 'gravide', label: 'Gravide og Ammende', icon: Activity }
                            ].map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setPopulationTab(p.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                        populationTab === p.id
                                            ? 'bg-white text-[#3A4A40] border border-[#839788]/40 shadow-sm'
                                            : 'text-[#839788] hover:bg-white/50'
                                    }`}
                                >
                                    <p.icon className="w-4 h-4" /> {p.label}
                                </button>
                            ))}
                        </div>

                        {/* Børn og Unge */}
                        {populationTab === 'boern' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] shadow-sm space-y-4">
                                    <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                                                Anbefaling 11 (Evidensgrad A)
                                            </span>
                                            <h4 className="text-base font-bold text-[#3A4A40] mt-1">
                                                {renderWithDrugLinks('Fluoxetin', onNavigate)} er ENESTE godkendte præparat
                                            </h4>
                                        </div>
                                    </div>
                                    
                                    <p className="text-xs text-[#4A5A50] leading-relaxed">
                                        Førstevalg er altid non-farmakologisk (KAT eller IPT). Hvis medicinsk behandling er påkrævet ved moderat-til-svær depression (manglende respons efter 4-8 uger for moderat el. 2-3 uger for svær), er <strong>fluoxetin</strong> det eneste præparat med dokumenteret effekt og acceptabel sikkerhed hos 8-17 årige.
                                    </p>

                                    {/* Tabel 3 Optrapningsplan */}
                                    <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E8E4D9]">
                                        <h5 className="font-extrabold text-xs text-[#3A4A40] uppercase tracking-wider mb-3">
                                            Tabel 3: Optrapnings- og udtrapningsplan for Fluoxetin
                                        </h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                                            <div className="bg-white p-3 rounded-lg border border-[#E8E4D9]">
                                                <span className="text-[#839788] text-[10px] font-bold uppercase block">Opstart</span>
                                                <strong className="text-sm text-[#3A4A40]">10 mg x 1 dgl.</strong>
                                                <span className="text-[11px] text-slate-500 block mt-0.5">i 1 uge</span>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-[#E8E4D9]">
                                                <span className="text-[#839788] text-[10px] font-bold uppercase block">1. Kontrol (uge 1)</span>
                                                <strong className="text-sm text-[#3A4A40]">20 mg x 1 dgl.</strong>
                                                <span className="text-[11px] text-slate-500 block mt-0.5">i 2-3 uger (måldosis)</span>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-[#E8E4D9]">
                                                <span className="text-[#839788] text-[10px] font-bold uppercase block">2. Kontrol (uge 3-4)</span>
                                                <strong className="text-sm text-[#3A4A40]">Evt. 30 mg x 1 dgl.</strong>
                                                <span className="text-[11px] text-amber-700 block mt-0.5">Maks dosis (off-label)</span>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-[#E8E4D9]">
                                                <span className="text-[#839788] text-[10px] font-bold uppercase block">Udtrapning</span>
                                                <strong className="text-sm text-[#3A4A40]">-10 mg / 2-3 uger</strong>
                                                <span className="text-[11px] text-slate-500 block mt-0.5">gradvis reduktion</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Strictly Discouraged Drugs */}
                                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1.5">
                                        <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
                                            <ShieldAlert className="w-4 h-4 text-rose-600" /> Generel Anbefaling IMOD Anvendelse (Anbefaling 13 - Evidensgrad A)
                                        </div>
                                        <p className="leading-relaxed">
                                            <strong>Venlafaxin, Paroxetin og TCA FRARÅDES STRENGT</strong> til behandling af depression hos børn og unge. De er ikke mere effektive end placebo og er dokumenteret forbundet med markant øget risiko for selvmordstanker, agitation og selvmordsadfærd.
                                        </p>
                                    </div>

                                    <div className="text-xs text-[#5C6B61] leading-relaxed">
                                        <strong>Paraklinik & EKG:</strong> Baseline EKG anbefales før opstart samt ved dosisøgning ≥ 50%. Tæt monitorering med MFQ og SSRI-UKU ved alle fremmødekontroller.
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Ældre */}
                        {populationTab === 'aeldre' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] shadow-sm space-y-4">
                                    <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                                                Anbefaling 14 & 15 (Evidensgrad A & D)
                                            </span>
                                            <h4 className="text-base font-bold text-[#3A4A40] mt-1">
                                                {renderWithDrugLinks('Sertralin', onNavigate)} er Førstevalg til Ældre (&gt;65 år)
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9] text-xs text-[#4A5A50] space-y-2">
                                            <strong className="block text-sm text-[#3A4A40]">Doseringsprincip: "Start Low – Go Slow"</strong>
                                            <p className="leading-relaxed">
                                                Startdosis bør typisk være <strong>halvdelen</strong> af normal startdosis for yngre voksne (f.eks. 25 mg sertralin).
                                            </p>
                                            <p className="leading-relaxed">
                                                Hurtig opfølgning efter 1 uge med fokus på tolerans og bivirkninger. Herefter <strong>4-6 uger</strong> mellem vurderinger af effekt før dosisjustering, da tiden til behandlingsrespons ofte er længere hos ældre.
                                            </p>
                                        </div>

                                        <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 space-y-2">
                                            <strong className="block text-sm text-rose-900">Undgå TCA og Paroxetin</strong>
                                            <p className="leading-relaxed">
                                                Tricykliske antidepressiva (TCA) og paroxetin bør undgås hos ældre pga. høj antikolinerg belastning, risiko for konfusion, urinretention, ortostatisk hypotension og faldulykker.
                                            </p>
                                            <p className="leading-relaxed">
                                                {renderWithDrugLinks('Vortioxetin', onNavigate)} har i studier vist god tolerans og effekt på kognitive funktioner hos ældre.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
                                        <strong>Obs Hyponatriæmi og Faldrisiko:</strong>
                                        <p className="leading-relaxed">
                                            Hyponatriæmi ses hos op mod 8% af 55+ årige og forstærkes af SSRI/SNRI, særligt ved samtidig brug af thiazid-diuretika eller NSAID. Kontrollér altid natrium før og under behandling. Antidepressiva øger den generelle faldrisiko (OR 1,57).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Gravide og Ammende */}
                        {populationTab === 'gravide' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] shadow-sm space-y-4">
                                    <div className="flex items-center justify-between border-b border-[#E8E4D9] pb-3">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                                                Anbefaling 9 & 10 (Evidensgrad A & D)
                                            </span>
                                            <h4 className="text-base font-bold text-[#3A4A40] mt-1">
                                                {renderWithDrugLinks('Sertralin', onNavigate)} anbefales som Førstevalg
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="text-xs text-[#4A5A50] space-y-3 leading-relaxed">
                                        <p>
                                            Ved opstart af farmakologisk behandling under graviditet, post-partum og under amning anbefales <strong>sertralin</strong> som førstevalg (A). Store registerstudier viser ingen øget risiko for alvorlige misdannelser sammenlignet med andre SSRI.
                                        </p>
                                        <p>
                                            <strong>Amning:</strong> Sertralin udskilles i minimal grad i modermælk og har fravær af klinisk betydende bivirkninger hos det ammede barn, hvilket adskiller præparatet positivt.
                                        </p>
                                        <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E8E4D9] text-xs">
                                            <strong className="block text-[#3A4A40] mb-1">Kliniske Forholdsregler:</strong>
                                            <ul className="list-disc list-inside space-y-1 text-[#5C6B61]">
                                                <li>Ubehandlet svær depression hos moderen indebærer betydelige risici for både foster og mor.</li>
                                                <li>Kvinder i forvejen i velfungerende behandling bør som udgangspunkt IKKE foretage unødigt præparatskift.</li>
                                                <li>Behandling bør altid konfereres med speciallæge i psykiatri med særlig viden eller ved regional perinatal klinik (D).</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Tab 4: EKG, Bivirkninger & Sikkerhed */}
                {activeTab === 'sikkerhed' && (
                    <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9F6] to-white/40 space-y-6 animate-in fade-in duration-300">
                        {/* Section Header */}
                        <div>
                            <div className="flex items-center gap-2 text-xs font-black uppercase text-[#839788] tracking-wider mb-1">
                                Tabel 2 & Bilag 2 (DMPG 2026)
                            </div>
                            <h3 className="text-xl font-bold text-[#3A4A40]">
                                EKG-krav, Klassebivirkninger, Interaktioner & Udtrapning
                            </h3>
                        </div>

                        {/* EKG Decision Matrix */}
                        <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] shadow-sm space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#3A4A40] flex items-center gap-2">
                                <Activity className="w-4 h-4 text-[#839788]" /> EKG-retningslinjer før opstart (DCS/DPS & DMPG 2026)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                                    <span className="font-extrabold text-emerald-900 block mb-1">🟢 EKG IKKE nødvendigt</span>
                                    <p className="text-emerald-800 leading-relaxed">
                                        • {renderWithDrugLinks('Agomelatin', onNavigate)}<br />
                                        • {renderWithDrugLinks('Vortioxetin', onNavigate)}<br />
                                        • {renderWithDrugLinks('Bupropion', onNavigate)} (hos somatisk raske)
                                    </p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200">
                                    <span className="font-extrabold text-amber-900 block mb-1">🟡 EKG kan UDSKYDES</span>
                                    <p className="text-amber-800 leading-relaxed">
                                        I fravær af kardiale risikofaktorer:<br />
                                        • {renderWithDrugLinks('Sertralin', onNavigate)}<br />
                                        • {renderWithDrugLinks('Mirtazapin', onNavigate)}<br />
                                        • {renderWithDrugLinks('Duloxetin', onNavigate)}<br />
                                        • {renderWithDrugLinks('Mianserin', onNavigate)}
                                    </p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200">
                                    <span className="font-extrabold text-rose-900 block mb-1">🔴 EKG OBLIGATORISK</span>
                                    <p className="text-rose-800 leading-relaxed">
                                        Før opstart og ved dosisøgning:<br />
                                        • {renderWithDrugLinks('Citalopram', onNavigate)} & {renderWithDrugLinks('Escitalopram', onNavigate)}<br />
                                        • Alle TCA (f.eks. {renderWithDrugLinks('Nortriptylin', onNavigate)})<br />
                                        • Patienter med kendt hjertesygdom
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Udtrapning & Seponering */}
                        <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] shadow-sm space-y-3">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#3A4A40] flex items-center gap-2">
                                <Activity className="w-4 h-4 text-[#839788]" /> Vedligeholdelse og Udtrapning (Anbefaling 5 & 6)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#4A5A50] leading-relaxed">
                                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9]">
                                    <strong className="block text-sm text-[#3A4A40] mb-1">Varighed af Vedligeholdelse</strong>
                                    <p>
                                        Efter opnået remission fortsættes behandlingen i samme dosis i <strong>mindst 6-9 måneder</strong>.
                                    </p>
                                    <p className="mt-2">
                                        <strong>Forlænges til ≥ 12 mdr. ved risikofaktorer:</strong> Residualsymptomer (især anhedoni og kognitive vanskeligheder), tidligere episoder, svær depression eller traumebaggrund.
                                    </p>
                                </div>
                                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9]">
                                    <strong className="block text-sm text-[#3A4A40] mb-1">Udtrapningsstrategi</strong>
                                    <p>
                                        Initialt forsøges <strong>halvering af dosis hver anden uge</strong> med seponering fra lavest tilgængelige styrke.
                                    </p>
                                    <p className="mt-2">
                                        <strong>Ved svære seponeringssymptomer:</strong> Langsommere nedtrapning eller skift til {renderWithDrugLinks('Fluoxetin', onNavigate)} 20 mg i 1 uge (lang halveringstid på 7-15 dage for norfluoxetin) efterfulgt af seponering.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interaktioner & TDM */}
                        <div className="bg-white p-6 rounded-2xl border border-[#E8E4D9] shadow-sm space-y-3">
                            <h4 className="text-sm font-black uppercase tracking-widest text-[#3A4A40] flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 text-[#839788]" /> Vigtige Farmakokinetiske Forhold (CYP450 & TDM)
                            </h4>
                            <div className="text-xs text-[#4A5A50] space-y-2 leading-relaxed">
                                <p>
                                    • <strong>CYP2D6-hæmning:</strong> {renderWithDrugLinks('Fluoxetin', onNavigate)} og {renderWithDrugLinks('Paroxetin', onNavigate)} er potente enzymhæmmere og øger plasmaniveauet markant af bl.a. aripiprazol, risperidon og nortriptylin.
                                </p>
                                <p>
                                    • <strong>CYP1A2 & Rygning:</strong> {renderWithDrugLinks('Agomelatin', onNavigate)} omsættes via CYP1A2. Rygning inducerer enzymet; ved rygestop kan koncentrationen stige voldsomt. Fluvoxamin er kontraindiceret sammen med agomelatin.
                                </p>
                                <p>
                                    • <strong>TDM "de nouveau":</strong> Anvendes ved kombinationsbehandling, hvor patienten måles før og efter tillæg af interagerende stof (fx aripiprazol før og efter start af fluoxetin).
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 5: Tidligere Algoritme (Referenceprogram) */}
                {activeTab === 'tidligere_algoritme' && (
                    <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9F6] to-white/40 space-y-6 animate-in fade-in duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8E4D9]">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-black uppercase text-[#839788] tracking-wider mb-1">
                                    Historisk Reference • SST Referenceprogram
                                </div>
                                <h3 className="text-xl font-bold text-[#3A4A40]">
                                    Tidligere Behandlingsalgoritme for Unipolar Depression
                                </h3>
                                <p className="text-sm text-[#5C6B61] mt-1 leading-relaxed">
                                    Klinisk vejledning for medicinsk behandling og ECT ved unipolar depression forud for DMPG 2026. Struktureret efter indlæggelsesstatus og sværhedsgrad.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <a 
                                    href={pdfSstUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2.5 rounded-xl hover:bg-[#6A7A6E] transition-all text-xs font-bold shadow-sm"
                                    title="Åbn det originale SST Referenceprogram som PDF"
                                >
                                    <FileText className="w-4 h-4" /> Åbn SST Referenceprogram (PDF)
                                </a>
                                <button
                                    onClick={() => setIsPreviousAlgFolded(!isPreviousAlgFolded)}
                                    className="flex items-center gap-1.5 bg-white border border-[#E8E4D9] text-[#3A4A40] px-3.5 py-2.5 rounded-xl hover:bg-[#FAF9F6] transition-all text-xs font-bold shadow-sm"
                                >
                                    {isPreviousAlgFolded ? (
                                        <>Fold ud <ChevronDown className="w-3.5 h-3.5" /></>
                                    ) : (
                                        <>Fold sammen <ChevronUp className="w-3.5 h-3.5" /></>
                                    )}
                                </button>
                            </div>
                        </div>

                        {!isPreviousAlgFolded && (
                            <div className="bg-white/60 p-4 md:p-6 rounded-3xl border border-[#E8E4D9] shadow-sm animate-in fade-in duration-300">
                                <SplitAlgorithmFlow 
                                    data={guideline?.splitAlgorithm || DEPRESSION_PREVIOUS_SPLIT_ALGORITHM} 
                                    onNavigate={onNavigate} 
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DepressionGuidelineView;
