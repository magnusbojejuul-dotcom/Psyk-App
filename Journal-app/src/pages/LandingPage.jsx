import React from 'react';
import { Brain, Activity, Cookie, FileText, ChevronRight, Stethoscope, Pill } from '../components/Icons';

function LandingPage({ onNavigate }) {
    return (
        <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-[#F9F8F6] text-[#3A4A40] font-sans selection:bg-[#E2E8DF] selection:text-slate-900">

            {/* Background ambient glowing shapes */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#E2E8DF]/30 blur-[120px]"></div>
                <div className="absolute top-[60%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#F3F0E6]/50 blur-[100px]"></div>
                <div className="absolute top-[20%] left-[60%] w-[30%] h-[30%] rounded-full bg-[#D9E1DA]/40 blur-[80px]"></div>
            </div>

            <header className="absolute top-0 w-full p-6 md:p-8 flex justify-between items-start md:items-center z-20">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <div className="bg-[#839788] p-2 rounded-xl shadow-sm shrink-0">
                        <Activity className="text-white h-5 w-5" />
                    </div>
                    <span className="font-bold text-base md:text-lg lg:text-xl tracking-wide text-[#3A4A40] leading-tight">Psykiatrisk Værktøjskasse<br className="hidden md:block" /><span className="text-sm md:text-base font-medium text-[#839788] md:ml-2">udviklet af læge Magnus Juul</span></span>
                </div>
            </header>

            <main className="z-10 w-full max-w-5xl px-6 flex flex-col items-center justify-center text-center -mt-10">
                <h1 className="text-4xl md:text-5xl font-bold text-[#3A4A40] mb-4 tracking-tight">Velkommen tilbage</h1>
                <p className="text-lg text-[#839788] mb-12 max-w-2xl">
                    Vælg et klinisk værktøj nedenfor for at starte din dokumentationsproces.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">

                    {/* Tile 1: Psykiatrisk Journalværktøj (Active) */}
                    <button
                        onClick={() => onNavigate('journal')}
                        className="group relative flex flex-col items-start p-8 rounded-[2rem] bg-white/70 backdrop-blur-md border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer overflow-hidden isolate"
                    >
                        {/* Subtle inner background glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E2E8DF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                        <div className="w-14 h-14 rounded-2xl bg-[#F2F6F3] flex items-center justify-center mb-6 shadow-sm border border-white group-hover:bg-[#839788] transition-colors duration-500">
                            <Brain className="w-7 h-7 text-[#839788] group-hover:text-white transition-colors duration-500" />
                        </div>

                        <h2 className="text-2xl font-bold text-[#3A4A40] mb-3 text-left leading-tight group-hover:text-[#2C3F34] transition-colors">
                            Psykiatrisk<br />Journalværktøj
                        </h2>

                        <p className="text-left text-[#839788] text-sm mb-8 leading-relaxed">
                            Struktureret anamnese og objektivt psykisk-værktøj med auto-generering af journalnotater.
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[#839788] text-sm font-bold group-hover:text-[#3A4A40] transition-colors">
                            Åbn værktøj <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>

                    {/* Tile 2: Kliniske Instrukser (Active) */}
                    <button
                        onClick={() => onNavigate('guidelines')}
                        className="group relative flex flex-col items-start p-8 rounded-[2rem] bg-white/70 backdrop-blur-md border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer overflow-hidden isolate"
                    >
                        {/* Subtle inner background glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E2E8DF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                        <div className="w-14 h-14 rounded-2xl bg-[#F2F6F3] flex items-center justify-center mb-6 shadow-sm border border-white group-hover:bg-[#839788] transition-colors duration-500">
                            <FileText className="w-7 h-7 text-[#839788] group-hover:text-white transition-colors duration-500" />
                        </div>

                        <h2 className="text-2xl font-bold text-[#3A4A40] mb-3 text-left leading-tight group-hover:text-[#2C3F34] transition-colors">
                            Gode<br />Dokumenter
                        </h2>

                        <p className="text-left text-[#839788] text-sm mb-8 leading-relaxed">
                            Samling af standardiserede behandlingsplaner og skabeloner til hurtigt og systematisk opslag.
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[#839788] text-sm font-bold group-hover:text-[#3A4A40] transition-colors">
                            Åbn værktøj <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>

                    {/* Tile 3: Behandlingsvejledninger (Active) */}
                    <button
                        onClick={() => onNavigate('treatment')}
                        className="group relative flex flex-col items-start p-8 rounded-[2rem] bg-white/70 backdrop-blur-md border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer overflow-hidden isolate"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E2E8DF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                        <div className="w-14 h-14 rounded-2xl bg-[#F2F6F3] flex items-center justify-center mb-6 shadow-sm border border-white group-hover:bg-[#839788] transition-colors duration-500">
                            <Activity className="w-7 h-7 text-[#839788] group-hover:text-white transition-colors duration-500" />
                        </div>

                        <h2 className="text-2xl font-bold text-[#3A4A40] mb-3 text-left leading-tight group-hover:text-[#2C3F34] transition-colors">
                            Behandlings-<br />vejledninger
                        </h2>

                        <p className="text-left text-[#839788] text-sm mb-8 leading-relaxed">
                            Interaktive retningslinjer for medicinsk behandling af depression, psykose, ADHD m.fl.
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[#839788] text-sm font-bold group-hover:text-[#3A4A40] transition-colors">
                            Åbn værktøj <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>

                    {/* Tile 4: Kliniske Beregnere & Skalaer (Active) */}
                    <button
                        onClick={() => onNavigate('scoring')}
                        className="group relative flex flex-col items-start p-8 rounded-[2rem] bg-white/70 backdrop-blur-md border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer overflow-hidden isolate"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#E2E8DF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                        <div className="w-14 h-14 rounded-2xl bg-[#F2F6F3] flex items-center justify-center mb-6 shadow-sm border border-white group-hover:bg-[#839788] transition-colors duration-500">
                            <Stethoscope className="w-7 h-7 text-[#839788] group-hover:text-white transition-colors duration-500" />
                        </div>

                        <h2 className="text-2xl font-bold text-[#3A4A40] mb-3 text-left leading-tight group-hover:text-[#2C3F34] transition-colors">
                            Kliniske Beregnere<br />& Skalaer
                        </h2>

                        <p className="text-left text-[#839788] text-sm mb-8 leading-relaxed">
                            Interaktive scoringsværktøjer til bl.a. psykiatri (eks. HAM-D), geriatri (eks. MMS) og misbrug.
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[#839788] text-sm font-bold group-hover:text-[#3A4A40] transition-colors">
                            Åbn værktøj <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>

                    {/* Tile 5: Rusmidler & Abstinenser (NEW) */}
                    <button
                        onClick={() => onNavigate('substance')}
                        className="group relative flex flex-col items-start p-8 rounded-[2rem] bg-white/70 backdrop-blur-md border border-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 ease-out cursor-pointer overflow-hidden isolate md:col-span-2 lg:col-span-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

                        <div className="w-14 h-14 rounded-2xl bg-[#F2F6F3] flex items-center justify-center mb-6 shadow-sm border border-white group-hover:bg-red-800 transition-colors duration-500">
                            <Pill className="w-7 h-7 text-red-800 group-hover:text-white transition-colors duration-500" />
                        </div>

                        <h2 className="text-2xl font-bold text-[#3A4A40] mb-3 text-left leading-tight group-hover:text-red-900 transition-colors">
                            Rusmidler &<br />Abstinenser
                        </h2>

                        <p className="text-left text-[#839788] text-sm mb-8 leading-relaxed">
                            Retningslinjer for overdosering, forgiftning (Toxication) og abstinensbehandling for de primære rusmidler.
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[#839788] text-sm font-bold group-hover:text-red-900 transition-colors">
                            Åbn værktøj <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>

                </div>
            </main>

            <footer className="absolute bottom-6 text-center w-full z-20">
                <p className="text-[#839788]/60 text-xs font-medium">Klinisk Redskabssystem v1.0 &copy; 2026</p>
            </footer>
        </div>
    );
}

export default LandingPage;
