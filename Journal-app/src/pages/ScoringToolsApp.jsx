import React, { useState } from 'react';
import { ChevronRight, Stethoscope } from '../components/Icons';
import BarthelADL from '../components/scoring/BarthelADL';

// Ny-oprettede komponenter
import HamiltonAngst from '../components/scoring/HamiltonAngst';
import HamiltonDepression from '../components/scoring/HamiltonDepression';
import MDI from '../components/scoring/MDI';
import MMS from '../components/scoring/MMS';
import TUG from '../components/scoring/TUG';
import Rusmiddeltestning from '../components/scoring/Rusmiddeltestning';
import Audit from '../components/scoring/Audit';
import Dudit from '../components/scoring/Dudit';
import Cows from '../components/scoring/Cows';

function ScoringToolsApp({ onNavigate }) {
    const [activeTool, setActiveTool] = useState('barthel-adl');

    const categories = [
        {
            name: 'Psykiatri',
            tools: [
                { id: 'ham-d', name: 'HAM-D17 (Depression)' },
                { id: 'ham-a', name: 'HAM-A (Angst)' },
                { id: 'mdi', name: 'MDI (Depression)' },
                { id: 'mms', name: 'MMS (Kognition)' },
            ]
        },
        {
            name: 'Geriatri / Fysioterapi',
            tools: [
                { id: 'barthel-adl', name: 'Barthel ADL-indeks' },
                { id: 'tug', name: 'TUG (Timed Up & Go)' },
            ]
        },
        {
            name: 'Misbrug & Afhængighed',
            tools: [
                { id: 'audit', name: 'AUDIT (Alkohol)' },
                { id: 'dudit', name: 'DUDIT (Stoffer)' },
                { id: 'cows', name: 'COWS (Opiatabstinenser)' },
                { id: 'rusmiddel', name: 'Rusmiddeltestning' },
            ]
        }
    ];

    const renderSecondarySidebar = () => (
        <div className="w-80 bg-white/60 backdrop-blur-xl border-r border-[#E2E8DF]/50 h-screen overflow-y-auto flex flex-col shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-10 custom-scrollbar">
            <div className="p-6 pb-2">
                <div className="flex items-center gap-3 mb-6 text-[#3A4A40]">
                    <button
                        onClick={() => onNavigate('home')}
                        className="p-1.5 hover:bg-white rounded-xl transition-colors text-[#839788] hover:text-[#3A4A40] shadow-sm border border-transparent hover:border-[#E2E8DF] mr-1"
                        title="Tilbage til forsiden"
                    >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                    </button>
                    <div className="bg-[#839788] p-1.5 rounded-lg">
                        <Stethoscope className="text-white w-5 h-5" />
                    </div>
                    <h2 className="font-bold text-lg leading-none">Kliniske Beregnere</h2>
                </div>

                <div className="space-y-6">
                    {categories.map((category) => (
                        <div key={category.name}>
                            <h3 className="text-xs font-bold text-[#839788] uppercase tracking-wider mb-2 px-2">
                                {category.name}
                            </h3>
                            <div className="space-y-1">
                                {category.tools.map((tool) => (
                                    <button
                                        key={tool.id}
                                        onClick={() => setActiveTool(tool.id)}
                                        className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTool === tool.id
                                            ? 'bg-[#839788] text-white shadow-md shadow-[#839788]/20 scale-[1.02]'
                                            : 'text-[#3A4A40] hover:bg-[#F2F6F3] hover:text-[#28362E]'
                                            }`}
                                    >
                                        <span className="font-medium text-sm">{tool.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );

    return (
        <div className="flex w-full min-h-screen bg-[#F9F8F6] text-[#3A4A40] font-sans selection:bg-[#E2E8DF]">
            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-[#E2E8DF]/30 blur-[100px]"></div>
                <div className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#F3F0E6]/50 blur-[120px]"></div>
            </div>

            {renderSecondarySidebar()}

            {/* Main Content Area */}
            <main className="flex-1 h-screen overflow-y-auto w-full relative custom-scrollbar">
                <div className="max-w-4xl mx-auto p-8 lg:p-12">
                    {activeTool === 'barthel-adl' && <BarthelADL />}
                    {activeTool === 'ham-d' && <HamiltonDepression />}
                    {activeTool === 'ham-a' && <HamiltonAngst />}
                    {activeTool === 'mdi' && <MDI />}
                    {activeTool === 'mms' && <MMS />}
                    {activeTool === 'tug' && <TUG />}
                    {activeTool === 'audit' && <Audit />}
                    {activeTool === 'dudit' && <Dudit />}
                    {activeTool === 'cows' && <Cows />}
                    {activeTool === 'rusmiddel' && <Rusmiddeltestning />}
                </div>
            </main>
        </div>
    );
}

export default ScoringToolsApp;
