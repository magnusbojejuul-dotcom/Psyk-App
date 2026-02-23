import React, { useState } from 'react';
import { ChevronRight, FileText, AlertTriangle, AlertCircle, Info, Stethoscope, Users, User, ShieldAlert, Download } from '../components/Icons';

function GuidelinesApp({ onNavigate }) {
    const [activeInstruks, setActiveInstruks] = useState('plan_anoreksi');
    const [activeTab, setActiveTab] = useState('voksne_med');

    const renderAnoreksiPlan = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-8 flex justify-between items-start shrink-0">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-2">Behandlingsplan for Anoreksi</h2>
                        <p className="text-[#839788]">Direkte afspejling af standard behandlingsplan skabelon for Anorexia Nervosa.</p>
                    </div>
                    <a href="/pdf/Eksempel%20på%20behandlingsplan%20Anoreksi.pdf" download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-sm">
                        <Download className="w-4 h-4" /> Download Original PDF
                    </a>
                </div>

                <div className="glass-panel p-4 rounded-2xl shadow-sm flex-1 flex flex-col min-h-[600px]">
                    <iframe
                        src="/pdf/Eksempel%20på%20behandlingsplan%20Anoreksi.pdf"
                        className="w-full flex-1 rounded-xl border border-[#E8E4D9] bg-white min-h-[500px]"
                        title="Anoreksi Behandlingsplan Document"
                    />
                </div>
            </div>
        );
    }

    const renderGenerelPlan = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-8 flex justify-between items-start shrink-0">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-2">Generel Behandlingsplan (Eksempel)</h2>
                        <p className="text-[#839788]">Direkte afspejling af eksempel på behandlingsplan.</p>
                    </div>
                    <a href="/pdf/Eksempel%20på%20behandlingsplan.pdf" download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-sm">
                        <Download className="w-4 h-4" /> Download Original PDF
                    </a>
                </div>

                <div className="glass-panel p-4 rounded-2xl shadow-sm flex-1 flex flex-col min-h-[600px]">
                    <iframe
                        src="/pdf/Eksempel%20på%20behandlingsplan.pdf"
                        className="w-full flex-1 rounded-xl border border-[#E8E4D9] bg-white min-h-[500px]"
                        title="Generel Behandlingsplan Document"
                    />
                </div>
            </div>
        );
    }

    const renderGennemgang = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-8 flex justify-between items-start shrink-0">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-2">Gennemgang af Instruks</h2>
                        <p className="text-[#839788]">Visning af det originale "Gennemgang.pdf" dokument.</p>
                    </div>
                    <a href="/pdf/Gennemgang.pdf" download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-sm">
                        <Download className="w-4 h-4" /> Download Original PDF
                    </a>
                </div>

                <div className="glass-panel p-4 rounded-2xl shadow-sm flex-1 flex flex-col min-h-[600px]">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-4 text-sm text-blue-900 flex items-start gap-3">
                        <Info className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>Dette dokument er indlejret direkte fra et visuelt PDF-format. Brug knappen øverst til højre hvis du ønsker at downloade filen på din computer.</p>
                    </div>
                    <iframe
                        src="/pdf/Gennemgang.pdf"
                        className="w-full flex-1 rounded-xl border border-[#E8E4D9] bg-white min-h-[500px]"
                        title="Gennemgang.pdf Document"
                    />
                </div>
            </div>
        );
    }

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
                        <h1 className="text-lg font-bold text-[#3A4A40] leading-tight">Gode Dokumenter</h1>
                        <div className="flex items-center gap-1.5 text-xs text-[#839788]/80"><span>Systematisk opslagsværk</span></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar Navigation */}
                <aside className="w-72 glass-panel border-r-0 flex flex-col flex-shrink-0 z-10 overflow-y-auto hidden md:flex">
                    <div className="p-4 space-y-2">
                        <h3 className="text-xs font-bold text-[#839788] uppercase tracking-wider mb-3 ml-1">Vælg Dokument</h3>

                        <button
                            onClick={() => setActiveInstruks('plan_anoreksi')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeInstruks === 'plan_anoreksi'
                                ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9] font-medium'
                                : 'text-[#839788] hover:bg-white/50 hover:text-[#3A4A40]'
                                }`}
                        >
                            <FileText className={`h-5 w-5 ${activeInstruks === 'plan_anoreksi' ? 'text-[#839788]' : 'opacity-60'}`} />
                            <span className="text-sm">Behandlingsplan (Anoreksi)</span>
                        </button>

                        <button
                            onClick={() => setActiveInstruks('plan_generel')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeInstruks === 'plan_generel'
                                ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9] font-medium'
                                : 'text-[#839788] hover:bg-white/50 hover:text-[#3A4A40]'
                                }`}
                        >
                            <FileText className={`h-5 w-5 ${activeInstruks === 'plan_generel' ? 'text-[#839788]' : 'opacity-60'}`} />
                            <span className="text-sm">Behandlingsplan (Generel)</span>
                        </button>

                        <button
                            onClick={() => setActiveInstruks('gennemgang')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeInstruks === 'gennemgang'
                                ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9] font-medium'
                                : 'text-[#839788] hover:bg-white/50 hover:text-[#3A4A40]'
                                }`}
                        >
                            <Info className={`h-5 w-5 ${activeInstruks === 'gennemgang' ? 'text-[#839788]' : 'opacity-60'}`} />
                            <span className="text-sm">Gennemgang</span>
                        </button>

                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    {activeInstruks === 'plan_anoreksi' && renderAnoreksiPlan()}
                    {activeInstruks === 'plan_generel' && renderGenerelPlan()}
                    {activeInstruks === 'gennemgang' && renderGennemgang()}
                </main>
            </div>
        </div>
    );
}

export default GuidelinesApp;
