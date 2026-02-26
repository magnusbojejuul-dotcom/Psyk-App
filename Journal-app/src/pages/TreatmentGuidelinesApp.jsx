import React, { useState } from 'react';
import { ChevronRight, AlertTriangle, Info, Users, User, ShieldAlert, Download, Activity, Brain } from '../components/Icons';
import { GUIDELINE_ADVARSLER, VOKSNE_UDEN_PSYKOTISKE_SYMPTOMER, VOKSNE_MED_PSYKOTISKE_SYMPTOMER, IV_BEHANDLING_VOKSNE, DEMENS_BEHANDLING } from '../data/guidelinesAkutBeroligende';
import { DEPRESSION_GUIDELINE } from '../data/guidelinesDepression';
import { BIPOLAR_GUIDELINE } from '../data/guidelinesBipolar';
import { PSYKOSE_VOKSNE_GUIDELINE } from '../data/guidelinesPsykoseVoksne';
import { PSYKOSE_BOERN_GUIDELINE } from '../data/guidelinesPsykoseBoern';
import { ADHD_GUIDELINE } from '../data/guidelinesADHD';
import { ANGST_GUIDELINE } from '../data/guidelinesAngst';
import { ALKOHOL_GUIDELINE } from '../data/guidelinesAlkohol';
import { SPISEFORSTYRRELSER_GUIDELINE } from '../data/guidelinesSpiseforstyrrelser';
import { OCD_GUIDELINE } from '../data/guidelinesOCD';
import { AUTISME_GUIDELINE } from '../data/guidelinesAutisme';
import { BORDERLINE_GUIDELINE } from '../data/guidelinesPersonlighed';
import { AlgorithmFlow } from '../components/AlgorithmFlow';
import { SplitAlgorithmFlow } from '../components/SplitAlgorithmFlow';
import { renderWithDrugLinks } from '../utils/linkifyDrugs';

function TreatmentGuidelinesApp({ onNavigate }) {
    const [activeGuideline, setActiveGuideline] = useState('akut_beroligende');
    const [activeTab, setActiveTab] = useState('voksne_med');

    const renderDoseCard = (item, index) => (
        <div key={index} className="flex flex-col p-4 bg-white/70 border border-[#E8E4D9] rounded-xl shadow-sm mb-3 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
                <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#E2E8DF] border border-[#839788]/30 font-bold text-[#3A4A40] text-sm">
                    {item.valg}
                </div>
                <div>
                    <h4 className="font-bold text-[#3A4A40] whitespace-pre-line">{renderWithDrugLinks(item.praeparat, onNavigate)}</h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{renderWithDrugLinks(item.bemaerkning, onNavigate)}</p>
                </div>
            </div>
        </div>
    );

    const getAlertIcon = (type) => {
        switch (type) {
            case 'critical': return <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
            default: return <Info className="w-5 h-5 text-blue-600 shrink-0" />;
        }
    };

    const getAlertStyle = (type) => {
        switch (type) {
            case 'critical': return 'bg-red-50 border-red-200 text-red-900';
            case 'warning': return 'bg-amber-50 border-amber-200 text-amber-900';
            default: return 'bg-blue-50 border-blue-200 text-blue-900';
        }
    };

    const renderAkutBeroligende = () => {
        return (
            <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
                <div className="mb-8 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-2">Akut Beroligende Medicin</h2>
                        <p className="text-[#839788]">Uddrag fra Regional Retningslinje, Fælles Psykiatri Region Midt.</p>
                    </div>
                    <a href={`${import.meta.env.BASE_URL}pdf/Akut_Beroligende_Medicin.pdf`} download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-sm hover:-translate-y-0.5">
                        <Download className="w-4 h-4" /> Download PDF
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {GUIDELINE_ADVARSLER.map((adv, idx) => (
                        <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl border ${getAlertStyle(adv.type)}`}>
                            {getAlertIcon(adv.type)}
                            <p className="text-sm font-medium leading-relaxed">{adv.text}</p>
                        </div>
                    ))}
                </div>

                <div className="glass-panel rounded-2xl overflow-hidden shadow-sm border border-white/60">
                    <div className="flex border-b border-[#E8E4D9] bg-white/50 backdrop-blur-md overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('voksne_med')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'voksne_med' ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white' : 'text-[#839788] hover:bg-white/50'}`}
                        >
                            <Users className="w-4 h-4" /> Voksne (Med Psykose)
                        </button>
                        <button
                            onClick={() => setActiveTab('voksne_uden')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'voksne_uden' ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white' : 'text-[#839788] hover:bg-white/50'}`}
                        >
                            <User className="w-4 h-4" /> Voksne (Uden Psykose)
                        </button>
                        <button
                            onClick={() => setActiveTab('aeldre')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'aeldre' ? 'text-[#3A4A40] border-b-2 border-[#839788] bg-white' : 'text-[#839788] hover:bg-white/50'}`}
                        >
                            Ældre / Demens
                        </button>
                    </div>

                    <div className="p-6 md:p-8 bg-gradient-to-b from-[#FAF9F6] to-white/30">
                        {activeTab === 'voksne_med' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <h3 className="text-lg font-bold text-[#3A4A40] mb-4 uppercase tracking-wide text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#839788]"></span> Peroral Behandling
                                    </h3>
                                    {VOKSNE_MED_PSYKOTISKE_SYMPTOMER.peroral.map(renderDoseCard)}
                                </div>
                                <div className="h-px bg-[#E8E4D9] w-full"></div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#3A4A40] mb-4 uppercase tracking-wide text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-amber-500"></span> Intramuskulær (I.M.) Behandling
                                    </h3>
                                    {VOKSNE_MED_PSYKOTISKE_SYMPTOMER.im.map(renderDoseCard)}
                                </div>
                            </div>
                        )}

                        {activeTab === 'voksne_uden' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div>
                                    <h3 className="text-lg font-bold text-[#3A4A40] mb-4 uppercase tracking-wide text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#839788]"></span> Peroral Behandling
                                    </h3>
                                    {VOKSNE_UDEN_PSYKOTISKE_SYMPTOMER.peroral.map(renderDoseCard)}
                                </div>
                                <div className="h-px bg-[#E8E4D9] w-full"></div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#3A4A40] mb-4 uppercase tracking-wide text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-amber-500"></span> Intramuskulær (I.M.) Behandling
                                    </h3>
                                    {VOKSNE_UDEN_PSYKOTISKE_SYMPTOMER.im.map(renderDoseCard)}
                                </div>
                            </div>
                        )}

                        {activeTab === 'aeldre' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4 shadow-sm">
                                    <p className="text-sm font-medium text-amber-900 leading-relaxed">
                                        Behandling af ældre skal varetages med stor forsigtighed. Ældre patienter skal som udgangspunkt behandles med doser svarende til 1/4 - 1/2 af de anførte doser for voksne. BPSD bør behandles non-farmakologisk før medicin overvejes.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#3A4A40] mb-4 uppercase tracking-wide text-sm flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#839788]"></span> Præparatvalg (Demens)
                                    </h3>
                                    {DEMENS_BEHANDLING.map(renderDoseCard)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 glass-panel rounded-2xl overflow-hidden border border-[#E8E4D9]">
                    <div className="bg-red-50/80 px-5 py-3 border-b border-red-100 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-red-600" />
                        <h3 className="font-bold text-red-900 text-sm uppercase tracking-wide">Intravenøs (I.V.) Behandling (Konferer med bagvagt)</h3>
                    </div>
                    <div className="p-6 bg-white/50">
                        {IV_BEHANDLING_VOKSNE.map(renderDoseCard)}
                    </div>
                </div>
            </div>
        );
    };

    const renderAlgorithm = (guideline) => {
        return (
            <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-16">
                <div className="mb-8 flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-2">{guideline.title}</h2>
                        {guideline.subtitle && <p className="text-[#839788] font-medium">{guideline.subtitle}</p>}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-start md:justify-end shrink-0 max-w-full md:max-w-sm lg:max-w-md mt-4 md:mt-0">
                        {guideline.pdfs ? (
                            guideline.pdfs.map((pdf, idx) => (
                                <a key={idx} href={pdf.url} download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-bold text-sm hover:-translate-y-0.5">
                                    <Download className="w-4 h-4" /> {pdf.title}
                                </a>
                            ))
                        ) : (
                            guideline.pdfUrl && (
                                <a href={guideline.pdfUrl} download className="flex items-center gap-2 bg-[#839788] text-white px-5 py-2.5 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-bold text-sm hover:-translate-y-0.5">
                                    <Download className="w-4 h-4" /> Print PDF
                                </a>
                            )
                        )}
                    </div>
                </div>

                {guideline.intro && (
                    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E4D9] rounded-2xl p-6 mb-8 shadow-sm">
                        <p className="text-[#5C6B61] leading-relaxed">{guideline.intro}</p>
                    </div>
                )}

                <div className="mt-4">
                    <h3 className="text-lg font-bold text-[#3A4A40] mb-6 uppercase tracking-widest text-center">
                        {guideline.algorithmTitle || 'Behandlingsalgoritme'}
                    </h3>
                    {guideline.splitAlgorithm ? (
                        <SplitAlgorithmFlow data={guideline.splitAlgorithm} onNavigate={onNavigate} />
                    ) : (
                        <AlgorithmFlow steps={guideline.algorithm} isStepBased={guideline.isStepBased !== false} onNavigate={onNavigate} />
                    )}
                </div>
            </div>
        );
    };

    const navItems = [
        { id: 'akut_beroligende', label: 'Akut Beroligende Medicin', icd: '', icon: Activity },
        { id: 'alkohol', label: 'Alkoholafhængighed', icd: 'F10', icon: Activity },
        { id: 'psykose_voksne', label: 'Psykotiske Tilstande (Voksne)', icd: 'F20-29', icon: Brain },
        { id: 'psykose_boern', label: 'Psykotiske Tilstande (Børn/Unge)', icd: 'F20-29', icon: User },
        { id: 'bipolar', label: 'Bipolar Lidelse', icd: 'F31', icon: Activity },
        { id: 'depression', label: 'Unipolar Depression', icd: 'F32-33', icon: Brain },
        { id: 'angst', label: 'Angsttilstande', icd: 'F40-41', icon: Activity },
        { id: 'ocd', label: 'Obsessiv-kompulsiv Tilstand (OCD)', icd: 'F42', icon: Activity },
        { id: 'spiseforstyrrelser', label: 'Spiseforstyrrelser', icd: 'F50', icon: Activity },
        { id: 'borderline', label: 'Emotionel Ustabil Personlighedsstruktur', icd: 'F60.3', icon: Brain },
        { id: 'autisme', label: 'Autisme (Børn/Unge)', icd: 'F84', icon: User },
        { id: 'adhd', label: 'ADHD / ADD (Voksne)', icd: 'F90', icon: Activity },
    ];

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
                    <div className="bg-[#839788] p-2 rounded-xl shadow-md border border-[#94A799]"><Activity className="text-white h-5 w-5" /></div>
                    <div>
                        <h1 className="text-xl font-bold text-[#3A4A40] leading-tight tracking-tight">Behandlingsvejledninger</h1>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#839788]"><span>Interaktive kliniske guidelines</span></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-[#E2E8DF]/40 blur-[100px]"></div>
                    <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-[#D9E1DA]/30 blur-[80px]"></div>
                </div>

                {/* Sidebar Navigation */}
                <aside className="w-80 bg-white/40 backdrop-blur-md border-r border-[#E8E4D9]/60 flex flex-col flex-shrink-0 z-10 overflow-y-auto hidden md:flex">
                    <div className="p-6 space-y-3">
                        <h3 className="text-[11px] font-black text-[#839788]/70 uppercase tracking-widest mb-4 ml-2">Vælg Vejledning</h3>
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveGuideline(item.id)}
                                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-left transition-all duration-300 isolate relative overflow-hidden ${activeGuideline === item.id
                                    ? 'bg-white text-[#3A4A40] shadow-sm ring-1 ring-[#D9E1DA] font-bold'
                                    : 'text-[#5C6B61] hover:bg-white/60 hover:text-[#3A4A40] font-medium'
                                    }`}
                            >
                                {activeGuideline === item.id && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#F2F6F3] to-transparent -z-10"></div>
                                )}
                                <item.icon className={`h-5 w-5 shrink-0 transition-colors duration-300 ${activeGuideline === item.id ? 'text-[#839788]' : 'opacity-50'}`} />
                                <span className="text-sm leading-tight flex-1">{item.label}</span>
                                {item.icd && (
                                    <span className="text-[10px] font-mono font-medium text-[#839788]/70 px-1.5 py-0.5 rounded-md bg-[#839788]/10 whitespace-nowrap">{item.icd}</span>
                                )}
                                {activeGuideline === item.id && (
                                    <ChevronRight className="w-4 h-4 ml-auto text-[#839788]/50 shrink-0" />
                                )}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 relative scroll-smooth">
                    {activeGuideline === 'akut_beroligende' && renderAkutBeroligende()}
                    {activeGuideline === 'adhd' && renderAlgorithm(ADHD_GUIDELINE)}
                    {activeGuideline === 'depression' && renderAlgorithm(DEPRESSION_GUIDELINE)}
                    {activeGuideline === 'bipolar' && renderAlgorithm(BIPOLAR_GUIDELINE)}
                    {activeGuideline === 'psykose_voksne' && renderAlgorithm(PSYKOSE_VOKSNE_GUIDELINE)}
                    {activeGuideline === 'psykose_boern' && renderAlgorithm(PSYKOSE_BOERN_GUIDELINE)}
                    {activeGuideline === 'angst' && renderAlgorithm(ANGST_GUIDELINE)}
                    {activeGuideline === 'ocd' && renderAlgorithm(OCD_GUIDELINE)}
                    {activeGuideline === 'autisme' && renderAlgorithm(AUTISME_GUIDELINE)}
                    {activeGuideline === 'spiseforstyrrelser' && renderAlgorithm(SPISEFORSTYRRELSER_GUIDELINE)}
                    {activeGuideline === 'borderline' && renderAlgorithm(BORDERLINE_GUIDELINE)}
                    {activeGuideline === 'alkohol' && renderAlgorithm(ALKOHOL_GUIDELINE)}
                </main>
            </div>
        </div>
    );
}

export default TreatmentGuidelinesApp;
