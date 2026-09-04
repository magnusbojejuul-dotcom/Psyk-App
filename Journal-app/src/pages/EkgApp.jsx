import React, { useState } from 'react';
import {
    Activity,
    ChevronRight,
    Heart,
    BookOpen,
    Crosshair
} from '../components/Icons';
import { EKG_CASES } from '../data/ekgCases';
import EkgHeartModel from '../components/ekg/EkgHeartModel';
import EkgViewer from '../components/ekg/EkgViewer';
import EkgSystematicGuide from '../components/ekg/EkgSystematicGuide';

export default function EkgApp({ onNavigate }) {
    const [activeTab, setActiveTab] = useState(() => {
        const hash = window.location.hash.toLowerCase();
        if (hash.includes('viewer')) return 'viewer';
        if (hash.includes('guide')) return 'guide';
        return 'model';
    });
    const [currentCaseId, setCurrentCaseId] = useState(() => {
        const hash = window.location.hash.toLowerCase();
        for (const c of EKG_CASES) {
            if (hash.includes(c.id.toLowerCase())) return c.id;
        }
        return 'normal_sinus';
    });
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
        { id: 'viewer', label: '12-Aflednings EKG', icon: Activity },
        { id: 'guide', label: 'Hamptons 7-Trins Tolkningsguide', icon: BookOpen }
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
                    />
                )}

                {activeTab === 'viewer' && (
                    <EkgViewer
                        caseData={currentCase}
                        allCases={EKG_CASES}
                        onSelectCase={handleSelectCase}
                        selectedLead={selectedLead}
                        onSelectLead={setSelectedLead}
                        onShowOnHeart={handleShowOnHeart}
                    />
                )}

                {activeTab === 'guide' && (
                    <EkgSystematicGuide
                        onNavigateTab={(tab) => setActiveTab(tab)}
                        onSelectCase={(caseId) => {
                            if (caseId) {
                                setCurrentCaseId(caseId);
                                const found = EKG_CASES.find(c => c.id === caseId);
                                if (found && found.affectedLeads && found.affectedLeads.length > 0) {
                                    setSelectedLead(found.affectedLeads[0]);
                                }
                            }
                            setActiveTab('viewer');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
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
