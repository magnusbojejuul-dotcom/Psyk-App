import React, { useState } from 'react';
import { ChevronRight, AlertTriangle, Info, Activity, Brain, Moon, Eye, Wind, ShieldAlert, Download, Pill, Stethoscope, AlertCircle } from '../components/Icons';
import { RUSMIDDEL_ALKOHOL } from '../data/guidelinesRusmiddelAlkohol';
import { RUSMIDDEL_BENZO } from '../data/guidelinesRusmiddelBenzo';
import { RUSMIDDEL_OPIOID } from '../data/guidelinesRusmiddelOpioid';
import { AlgorithmFlow } from '../components/AlgorithmFlow';
import { renderWithDrugLinks } from '../utils/linkifyDrugs';

function SubstanceAbuseApp({ onNavigate }) {
    const [activeGuideline, setActiveGuideline] = useState('alkohol');

    const renderToxicationSection = (toxData) => {
        if (!toxData) return null;

        const getIconComponent = (iconName) => {
            switch (iconName.toLowerCase()) {
                case 'activity': return <Activity className="w-6 h-6 text-red-500" />;
                case 'message': return <Info className="w-6 h-6 text-red-500" />;
                case 'moon': return <Moon className="w-6 h-6 text-indigo-500" />;
                case 'eye': return <Eye className="w-6 h-6 text-emerald-600" />;
                case 'wind': return <Wind className="w-6 h-6 text-blue-500" />;
                case 'brain': return <Brain className="w-6 h-6 text-purple-500" />;
                case 'shield': return <ShieldAlert className="w-6 h-6 text-amber-500" />;
                case 'alerttriangle': return <AlertTriangle className="w-6 h-6 text-red-600" />;
                default: return <AlertCircle className="w-6 h-6 text-slate-500" />;
            }
        };

        return (
            <div className="mb-10 animate-fade-in">
                <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-100/60 rounded-3xl p-6 shadow-sm relative overflow-hidden">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <AlertTriangle className="w-32 h-32 text-red-900" />
                    </div>

                    <div className="flex items-center gap-3 mb-3 relative z-10">
                        <div className="p-2 bg-red-100 rounded-xl">
                            <ShieldAlert className="w-5 h-5 text-red-700" />
                        </div>
                        <h3 className="text-xl font-black text-red-900 tracking-tight">{toxData.title}</h3>
                    </div>

                    <p className="text-red-800/80 font-medium mb-6 relative z-10 text-sm max-w-2xl">
                        {toxData.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 relative z-10">
                        {toxData.symptoms.map((symp, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-red-50 hover:border-red-200 transition-colors flex items-start gap-3">
                                <div className="p-2 bg-red-50 rounded-xl mt-0.5 shrink-0">
                                    {getIconComponent(symp.icon)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#3A4A40] text-sm leading-tight mb-1">{renderWithDrugLinks(symp.name, onNavigate)}</h4>
                                    <p className="text-xs text-[#5C6D63] leading-relaxed">{renderWithDrugLinks(symp.desc, onNavigate)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white/80 backdrop-blur border border-red-200 rounded-2xl p-5 shadow-sm mt-4 relative z-10 flex items-start gap-4">
                        <Stethoscope className="w-6 h-6 text-red-700 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-red-900 text-sm mb-1 uppercase tracking-wide">Behandling & Sikkerhed</h4>
                            <p className="text-sm font-medium text-red-800/90 leading-relaxed">{renderWithDrugLinks(toxData.management, onNavigate)}</p>
                        </div>
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
                        {guideline.pdfs && guideline.pdfs.map((pdf, idx) => (
                            <a key={idx} href={pdf.url} download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-bold text-sm hover:-translate-y-0.5">
                                <Download className="w-4 h-4" /> {pdf.title}
                            </a>
                        ))}
                    </div>
                </div>

                {guideline.intro && (
                    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E4D9] rounded-2xl p-6 mb-8 shadow-sm">
                        <p className="text-[#5C6B61] leading-relaxed font-medium">{guideline.intro}</p>
                    </div>
                )}

                {/* Render the specific toxication focus UI */}
                {renderToxicationSection(guideline.toxication)}

                <div className="mt-8 border-t border-[#E8E4D9] pt-8">
                    <h3 className="text-lg font-bold text-[#3A4A40] mb-6 uppercase tracking-widest text-center flex items-center justify-center gap-2">
                        <Activity className="w-5 h-5 text-[#839788]" />
                        {guideline.algorithmTitle || 'Abstinensbehandling & Protokol'}
                        <Activity className="w-5 h-5 text-[#839788]" />
                    </h3>
                    <AlgorithmFlow steps={guideline.algorithm} isStepBased={guideline.isStepBased !== false} onNavigate={onNavigate} />
                </div>
            </div>
        );
    };

    const navItems = [
        { id: 'alkohol', label: 'Alkohol', icon: Activity },
        { id: 'benzo', label: 'Benzodiazepiner', icon: Pill },
        { id: 'opioid', label: 'Opioider', icon: ShieldAlert },
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
                    <div className="bg-amber-600/90 p-2 rounded-xl shadow-md border border-amber-500/50"><AlertTriangle className="text-white h-5 w-5" /></div>
                    <div>
                        <h1 className="text-xl font-bold text-[#3A4A40] leading-tight tracking-tight">Rusmidler & Abstinenser</h1>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#839788]"><span>Cravings, Overdosis & Nedtrapning</span></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden relative">
                {/* Background ambient glow */}
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-amber-50/50 blur-[100px] pointer-events-none -z-10"></div>
                <div className="absolute top-[60%] -left-[10%] w-[30%] h-[30%] rounded-full bg-red-50/40 blur-[80px] pointer-events-none -z-10"></div>

                {/* Sidebar Navigation */}
                <aside className="w-80 bg-white/40 backdrop-blur-md border-r border-[#E8E4D9]/60 flex flex-col flex-shrink-0 z-10 overflow-y-auto hidden md:flex">
                    <div className="p-6 space-y-3">
                        <h3 className="text-[11px] font-black text-[#839788]/70 uppercase tracking-widest mb-4 ml-2">Substans & Kategori</h3>
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
                                {activeGuideline === item.id && (
                                    <ChevronRight className="w-4 h-4 ml-auto text-[#839788]/50 shrink-0" />
                                )}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 relative scroll-smooth z-10">
                    {activeGuideline === 'alkohol' && renderAlgorithm(RUSMIDDEL_ALKOHOL)}
                    {activeGuideline === 'benzo' && renderAlgorithm(RUSMIDDEL_BENZO)}
                    {activeGuideline === 'opioid' && renderAlgorithm(RUSMIDDEL_OPIOID)}
                </main>
            </div>
        </div>
    );
}

export default SubstanceAbuseApp;
