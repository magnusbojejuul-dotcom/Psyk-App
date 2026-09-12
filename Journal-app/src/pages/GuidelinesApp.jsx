import React, { useState } from 'react';
import { ChevronRight, FileText, AlertTriangle, AlertCircle, Info, Stethoscope, Users, User, ShieldAlert, Download, Copy, Check, Clipboard } from '../components/Icons';
import PdfViewer from '../components/PdfViewer';

function GuidelinesApp({ onNavigate }) {
    const [activeInstruks, setActiveInstruks] = useState('plan_anoreksi');
    const [activeTab, setActiveTab] = useState('voksne_med');
    const [copiedS6, setCopiedS6] = useState(false);

    const renderAnoreksiPlan = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-4 shrink-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-1">Behandlingsplan for Anoreksi</h2>
                    <p className="text-[#839788] text-sm">Direkte afspejling af standard behandlingsplan skabelon for Anorexia Nervosa.</p>
                </div>

                <div className="flex-1 min-h-[600px] flex flex-col">
                    <PdfViewer
                        url={`${import.meta.env.BASE_URL}pdf/Eksempel%20på%20behandlingsplan%20Anoreksi.pdf`}
                        title="Behandlingsplan for Anoreksi"
                        downloadName="Eksempel på behandlingsplan Anoreksi.pdf"
                    />
                </div>
            </div>
        );
    };

    const renderGenerelPlan = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-4 shrink-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-1">Generel Behandlingsplan (Eksempel)</h2>
                    <p className="text-[#839788] text-sm">Direkte afspejling af eksempel på behandlingsplan.</p>
                </div>

                <div className="flex-1 min-h-[600px] flex flex-col">
                    <PdfViewer
                        url={`${import.meta.env.BASE_URL}pdf/Eksempel%20på%20behandlingsplan.pdf`}
                        title="Generel Behandlingsplan"
                        downloadName="Eksempel på behandlingsplan.pdf"
                    />
                </div>
            </div>
        );
    };

    const renderGennemgang = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-4 shrink-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-1">Gennemgang af Instruks</h2>
                    <p className="text-[#839788] text-sm">Visning af det originale "Gennemgang.pdf" dokument.</p>
                </div>

                <div className="flex-1 min-h-[600px] flex flex-col">
                    <PdfViewer
                        url={`${import.meta.env.BASE_URL}pdf/Gennemgang.pdf`}
                        title="Gennemgang af Instruks"
                        downloadName="Gennemgang.pdf"
                    />
                </div>
            </div>
        );
    };

    const renderBlodproever = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-4 shrink-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-1">Blodprøver (Spiseforstyrrelse)</h2>
                    <p className="text-[#839788] text-sm">Vejledende beskrivelse og behandling ved spiseforstyrrelse.</p>
                </div>

                <div className="flex-1 min-h-[600px] flex flex-col">
                    <PdfViewer
                        url={`${import.meta.env.BASE_URL}pdf/Blodproever_Spiseforstyrrelse.pdf`}
                        title="Blodprøver (Spiseforstyrrelse)"
                        downloadName="Blodproever_Spiseforstyrrelse.pdf"
                    />
                </div>
            </div>
        );
    };

    const renderJournaloptagAN = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-4 shrink-0">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-1">Journaloptagelse (AN)</h2>
                    <p className="text-[#839788] text-sm">Direkte afspejling af standard skabelon for journaloptagelse.</p>
                </div>

                <div className="flex-1 min-h-[600px] flex flex-col">
                    <PdfViewer
                        url={`${import.meta.env.BASE_URL}pdf/Journaloptag_AN.pdf`}
                        title="Journaloptagelse (AN)"
                        downloadName="Journaloptag_AN.pdf"
                    />
                </div>
            </div>
        );
    };

    const renderGennemgangS6 = () => {
        const copyS6Template = () => {
            const templateText = `SKABELON TIL GENNEMGANG PÅ S6 (Journaloptagelse)

SAMTALE MED BEHANDLINGSSIGTE
GENNEMGANG
Til stede: pt., [XX], [XX], samt ut.

HENVISNINGSÅRSAG
[Hvorfor er pt. blevet indlagt]

AKTUELT PSYKISK
Kort oprids af tid op til indlæggelse: 
ADL-funktion / funktionstab: 

Psykopatologisk kort screening:
F0 (Organisk / tidligere hovedtraumer / øvrig): 
F1 (Misbrug - aktuelt/tidligere, husk SFI): 
F2 (Hallucinationer på alle sansemodaliteter, tankeforstyrrelser, vrangforestillinger, styringsoplevelser): 
F3 (Depression kerne- + ledsagesymptomer, mani/hypomani - HUSK tidskriterier!): 
F4 (Angstsymptomer, OCD, traume): 

OBJEKTIVT PSYKISK
VKO: 
Kvalitet af kontakten: 
Stemningsleje: 
Affekt: 
Adfærd under samtale: 
Psykotisk: 
Psykomotorik: 

SUICIDALSCREENING
Suicidaltanker: 
Konkrete planer: 
Modforestillinger: 

AKTUELT SOMATISK
Er der noget nyt / lavet undersøgelser: 

MEDICIN
Afstemme ordinationsoversigt med pt: 
Husk CAVE: 

AKTUELT SOCIALT
Boligforhold: 
Beskæftigelse: 
Forsørgelse: 
Socialt netværk: 
Børn: 

UDGANG
Kan pt. få udgang (Ledsaget / Uledsaget / Særlig aftale): 

ORDINATIONER
Observationsfokus: [Hvis depressionsdiagnose ikke er stillet, skriv 'sænket/nedsat stemningsleje']
Observationsfrekvens: 
Evt. øvrige ordinationer: [Hvis depressionsdiagnose er stillet – ordiner Hamilton]

PLAN
Kort opsummering: 
Hvad skal der ske under indlæggelsen: 
Forventet udskrivelse: 

HUSK:
- Bestille blodprøver
- Lav ny stuegang til opfølgning`;

            navigator.clipboard.writeText(templateText);
            setCopiedS6(true);
            setTimeout(() => setCopiedS6(false), 2500);
        };

        const copyAction = (
            <button
                onClick={copyS6Template}
                className="px-3 py-1.5 bg-white border border-[#E8E4D9] text-[#3A4A40] hover:bg-[#F2F6F3] rounded-xl transition-colors shadow-2xs font-medium text-xs flex items-center gap-1.5 cursor-pointer"
                title="Kopiér skabelonteksten til udklipsholderen"
            >
                {copiedS6 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#839788]" />}
                <span>{copiedS6 ? 'Kopieret!' : 'Kopiér skabelon'}</span>
            </button>
        );

        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col pb-8">
                <div className="mb-4 shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E2E8DF] text-[#3A4A40]">Afsnit S6</span>
                        <span className="text-xs text-[#839788]">Der skrives i ’dotten’ Journaloptagelse</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40]">Skabelon til Gennemgang på S6</h2>
                    <p className="text-[#839788] text-sm">Direkte afspejling af standard skabelon for journaloptagelse og gennemgang på S6.</p>
                </div>

                <div className="flex-1 min-h-[600px] flex flex-col">
                    <PdfViewer
                        url={`${import.meta.env.BASE_URL}pdf/Skabelon_Gennemgang_S6.pdf`}
                        title="Skabelon til Gennemgang på S6"
                        downloadName="Skabelon_Gennemgang_S6.pdf"
                        extraActions={copyAction}
                    />
                </div>
            </div>
        );
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

                        <button
                            onClick={() => setActiveInstruks('blodproever')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeInstruks === 'blodproever'
                                ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9] font-medium'
                                : 'text-[#839788] hover:bg-white/50 hover:text-[#3A4A40]'
                                }`}
                        >
                            <Stethoscope className={`h-5 w-5 ${activeInstruks === 'blodproever' ? 'text-[#839788]' : 'opacity-60'}`} />
                            <span className="text-sm">Blodprøver (Spiseforst..)</span>
                        </button>

                        <button
                            onClick={() => setActiveInstruks('journaloptag_an')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeInstruks === 'journaloptag_an'
                                ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9] font-medium'
                                : 'text-[#839788] hover:bg-white/50 hover:text-[#3A4A40]'
                                }`}
                        >
                            <User className={`h-5 w-5 ${activeInstruks === 'journaloptag_an' ? 'text-[#839788]' : 'opacity-60'}`} />
                            <span className="text-sm">Journaloptagelse (AN)</span>
                        </button>

                        <button
                            onClick={() => setActiveInstruks('gennemgang_s6')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${activeInstruks === 'gennemgang_s6'
                                ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9] font-medium'
                                : 'text-[#839788] hover:bg-white/50 hover:text-[#3A4A40]'
                                }`}
                        >
                            <FileText className={`h-5 w-5 ${activeInstruks === 'gennemgang_s6' ? 'text-[#839788]' : 'opacity-60'}`} />
                            <span className="text-sm">Gennemgang (S6)</span>
                        </button>

                    </div>
                </aside>

                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Mobile Selector */}
                    <div className="md:hidden p-3 border-b border-[#E8E4D9] bg-white/70 shrink-0">
                        <label className="text-[11px] font-bold text-[#839788] uppercase tracking-wider block mb-1">Vælg Dokument</label>
                        <select
                            value={activeInstruks}
                            onChange={(e) => setActiveInstruks(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#E8E4D9] rounded-xl text-sm text-[#3A4A40] font-medium focus:outline-none focus:ring-2 focus:ring-[#839788]"
                        >
                            <option value="plan_anoreksi">Behandlingsplan (Anoreksi)</option>
                            <option value="plan_generel">Behandlingsplan (Generel)</option>
                            <option value="gennemgang">Gennemgang</option>
                            <option value="blodproever">Blodprøver (Spiseforst..)</option>
                            <option value="journaloptag_an">Journaloptagelse (AN)</option>
                            <option value="gennemgang_s6">Gennemgang på S6 (Skabelon)</option>
                        </select>
                    </div>

                    {/* Content Area */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                        {activeInstruks === 'plan_anoreksi' && renderAnoreksiPlan()}
                        {activeInstruks === 'plan_generel' && renderGenerelPlan()}
                        {activeInstruks === 'gennemgang' && renderGennemgang()}
                        {activeInstruks === 'blodproever' && renderBlodproever()}
                        {activeInstruks === 'journaloptag_an' && renderJournaloptagAN()}
                        {activeInstruks === 'gennemgang_s6' && renderGennemgangS6()}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default GuidelinesApp;
