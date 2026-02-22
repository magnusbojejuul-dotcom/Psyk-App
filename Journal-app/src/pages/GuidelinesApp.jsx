import React, { useState } from 'react';
import { ChevronRight, FileText, AlertTriangle, AlertCircle, Info, Stethoscope, Users, User, ShieldAlert } from '../components/Icons';
import { GUIDELINE_ADVARSLER, VOKSNE_UDEN_PSYKOTISKE_SYMPTOMER, VOKSNE_MED_PSYKOTISKE_SYMPTOMER, IV_BEHANDLING_VOKSNE, DEMENS_BEHANDLING } from '../data/guidelinesAkutBeroligende';

function GuidelinesApp({ onNavigate }) {
    const [activeTab, setActiveTab] = useState('voksne_med');

    const renderDoseCard = (item, index) => (
        <div key={index} className="flex flex-col p-4 bg-white/70 border border-[#E8E4D9] rounded-2xl shadow-sm mb-3">
            <div className="flex items-start gap-3">
                <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-[#E2E8DF] border border-[#839788]/30 font-bold text-[#3A4A40] text-sm">
                    {item.valg}
                </div>
                <div>
                    <h4 className="font-bold text-[#3A4A40] whitespace-pre-line">{item.praeparat}</h4>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{item.bemaerkning}</p>
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

    return (
        <div className="flex flex-col h-screen bg-[#F9F8F6] font-sans selection:bg-[#E2E8DF] selection:text-slate-900">

            {/* Header */}
            <header className="glass-panel border-b-0 px-6 py-3 flex justify-between items-center shadow-sm shrink-0 z-20">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onNavigate('home')}
                        className="p-1.5 hover:bg-[#F9F8F6] rounded-xl transition-colors text-[#839788] hover:text-[#3A4A40]"
                        title="Tilbage til forsiden"
                    >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                    </button>
                    <div className="bg-[#839788] p-1.5 rounded-lg"><FileText className="text-white h-5 w-5" /></div>
                    <div>
                        <h1 className="text-lg font-bold text-[#3A4A40] leading-tight">Kliniske Instrukser</h1>
                        <div className="flex items-center gap-1.5 text-xs text-[#839788]/80"><span>Regionale Retningslinjer</span></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar Navigation */}
                <aside className="w-64 glass-panel border-r-0 flex flex-col flex-shrink-0 z-10 overflow-y-auto hidden md:flex">
                    <div className="p-4">
                        <h3 className="text-xs font-bold text-[#839788] uppercase tracking-wider mb-2 ml-1">Vælg Instruks</h3>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9]">
                            <Stethoscope className="h-5 w-5 text-[#839788]" />
                            <span className="font-medium text-sm">Akut Beroligende Medicin</span>
                        </button>
                        <div className="px-4 py-3 mt-2 rounded-xl text-left opacity-50 cursor-not-allowed">
                            <span className="font-medium text-sm text-slate-500">Flere instrukser kommer...</span>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <div className="max-w-4xl mx-auto">

                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-2">Akut Beroligende Medicin</h2>
                            <p className="text-[#839788]">Uddrag fra Regional Retningslinje, Fælles Psykiatri Region Midt.</p>
                        </div>

                        {/* Warnings Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {GUIDELINE_ADVARSLER.map((adv, idx) => (
                                <div key={idx} className={`flex items-start gap-3 p-4 rounded-2xl border ${getAlertStyle(adv.type)}`}>
                                    {getAlertIcon(adv.type)}
                                    <p className="text-sm font-medium leading-relaxed">{adv.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Content Tabs */}
                        <div className="glass-panel rounded-2xl overflow-hidden shadow-sm">
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

                            <div className="p-6 md:p-8 bg-[#FAF9F6]/50">
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
                                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
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

                        {/* I.V. Alert Box at the bottom */}
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
                </main>
            </div>
        </div>
    );
}

export default GuidelinesApp;
