import React, { useState } from 'react';
import {
    Activity,
    ChevronRight,
    Heart,
    Award,
    BookOpen,
    Pill,
    Crosshair,
    Sliders,
    Sparkles,
    Download,
    FileText
} from '../components/Icons';
import { EKG_CASES } from '../data/ekgCases';
import EkgHeartModel from '../components/ekg/EkgHeartModel';
import EkgViewer from '../components/ekg/EkgViewer';
import EkgQuizTrainer from '../components/ekg/EkgQuizTrainer';
import EkgSystematicGuide from '../components/ekg/EkgSystematicGuide';
import EkgQTCertCalc from '../components/ekg/EkgQTCertCalc';
import EkgClinicalNoteGenerator from '../components/ekg/EkgClinicalNoteGenerator';

export default function EkgApp({ onNavigate }) {
    const [activeTab, setActiveTab] = useState('model'); // 'model' | 'viewer' | 'quiz' | 'guide' | 'qtc'
    const [currentCaseId, setCurrentCaseId] = useState('normal_sinus');
    const [selectedLead, setSelectedLead] = useState('II');

    const currentCase = EKG_CASES.find(c => c.id === currentCaseId) || EKG_CASES[0];

    const handleSelectCase = (newCase) => {
        setCurrentCaseId(newCase.id);
        if (newCase.affectedLeads && newCase.affectedLeads.length > 0) {
            setSelectedLead(newCase.affectedLeads[0]);
        }
    };

    const handleShowOnHeart = () => {
        if (currentCase.affectedLeads && currentCase.affectedLeads.length > 0) {
            setSelectedLead(currentCase.affectedLeads[0]);
        }
        setActiveTab('model');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tabs = [
        { id: 'model', label: 'Hjertemodel & Vektorer', icon: Heart },
        { id: 'viewer', label: '12-Aflednings EKG & Skydelære', icon: Crosshair },
        { id: 'quiz', label: 'Træningsquiz & Cases', icon: Award },
        { id: 'guide', label: 'Hamptons 7-Trins Guide', icon: BookOpen },
        { id: 'qtc', label: 'QTc & Psykofarmaka', icon: Pill },
        { id: 'note', label: 'Klinisk Journalnotat & DCS Tjekliste', icon: FileText }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#F9F8F6] font-sans selection:bg-[#E2E8DF] selection:text-slate-900">
            {/* Header */}
            <header className="glass-panel border-b-0 px-6 py-4 flex flex-wrap justify-between items-center shadow-sm shrink-0 z-20 bg-white/70 backdrop-blur-md sticky top-0">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onNavigate('home')}
                        className="p-2 hover:bg-[#F2F6F3] rounded-xl transition-colors text-[#839788] hover:text-[#3A4A40]"
                        title="Tilbage til forsiden"
                    >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                    </button>
                    <div className="bg-[#839788] p-2 rounded-xl text-white shadow-xs">
                        <Activity className="h-5 w-5" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg font-bold text-[#3A4A40] leading-tight">EKG-Værktøj & Hjertemodel</h1>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                Hampton System
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#839788]">
                            <span>Interaktiv 12-aflednings trænings- og visualiseringsplatform</span>
                        </div>
                    </div>
                </div>

                {/* Hurtigvælger for EKG Case (Aktiv i toppen på tværs af faneblade) */}
                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <div className="flex items-center gap-2 bg-[#F2F6F3] px-3 py-1.5 rounded-2xl border border-[#E8E4D9]">
                        <span className="text-xs font-bold text-[#839788]">Aktiv Case:</span>
                        <select
                            value={currentCaseId}
                            onChange={(e) => {
                                const found = EKG_CASES.find(c => c.id === e.target.value);
                                if (found) handleSelectCase(found);
                            }}
                            className="bg-transparent text-xs font-bold text-[#3A4A40] focus:outline-none cursor-pointer max-w-[200px] truncate"
                        >
                            {EKG_CASES.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </header>

            {/* Faneblads-navigation */}
            <nav className="w-full max-w-[1400px] mx-auto px-6 pt-5 pb-2">
                <div className="flex overflow-x-auto gap-2 bg-[#F2F6F3] p-1.5 rounded-2xl border border-[#E8E4D9] shadow-xs">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${isActive
                                    ? 'bg-white text-[#3A4A40] shadow-sm font-bold border border-[#E8E4D9]'
                                    : 'text-[#839788] hover:text-[#3A4A40] hover:bg-white/50'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-[#839788]' : 'opacity-70'}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Hovedindhold */}
            <main className="flex-1 w-full max-w-[1400px] mx-auto p-6 flex flex-col">
                {activeTab === 'model' && (
                    <EkgHeartModel
                        selectedLead={selectedLead}
                        onSelectLead={setSelectedLead}
                        activeCase={currentCase}
                    />
                )}

                {activeTab === 'viewer' && (
                    <EkgViewer
                        caseData={currentCase}
                        selectedLead={selectedLead}
                        onSelectLead={setSelectedLead}
                        onShowOnHeart={handleShowOnHeart}
                    />
                )}

                {activeTab === 'quiz' && (
                    <EkgQuizTrainer
                        cases={EKG_CASES}
                        currentCase={currentCase}
                        onSelectCase={handleSelectCase}
                        onShowOnHeart={handleShowOnHeart}
                    />
                )}

                {activeTab === 'guide' && (
                    <EkgSystematicGuide onNavigateTab={(tab) => setActiveTab(tab)} />
                )}

                {activeTab === 'qtc' && (
                    <EkgQTCertCalc />
                )}

                {activeTab === 'note' && (
                    <EkgClinicalNoteGenerator
                        activeCase={currentCase}
                        onNavigateTab={(tab) => setActiveTab(tab)}
                    />
                )}
            </main>

            <footer className="py-6 text-center w-full z-10 shrink-0 border-t border-[#E8E4D9] bg-[#F9F8F6]">
                <p className="text-[#839788]/70 text-xs font-medium">
                    EKG-Værktøj • Inspireret af John R. Hampton: 'EKG - let at se' &copy; 2026 Psykiatrisk Værktøjskasse
                </p>
            </footer>
        </div>
    );
}
