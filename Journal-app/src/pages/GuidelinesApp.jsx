import React, { useState } from 'react';
import { ChevronRight, FileText, AlertTriangle, AlertCircle, Info, Stethoscope, Users, User, ShieldAlert, Download, Copy, Check, Clipboard } from '../components/Icons';

function GuidelinesApp({ onNavigate }) {
    const [activeInstruks, setActiveInstruks] = useState('plan_anoreksi');
    const [activeTab, setActiveTab] = useState('voksne_med');
    const [s6ViewMode, setS6ViewMode] = useState('table');
    const [copiedS6, setCopiedS6] = useState(false);

    const renderAnoreksiPlan = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-8 flex justify-between items-start shrink-0">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-2">Behandlingsplan for Anoreksi</h2>
                        <p className="text-[#839788]">Direkte afspejling af standard behandlingsplan skabelon for Anorexia Nervosa.</p>
                    </div>
                    <a href={`${import.meta.env.BASE_URL}pdf/Eksempel%20på%20behandlingsplan%20Anoreksi.pdf`} download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-sm">
                        <Download className="w-4 h-4" /> Download Original PDF
                    </a>
                </div>

                <div className="glass-panel p-4 rounded-2xl shadow-sm flex-1 flex flex-col min-h-[600px]">
                    <iframe
                        src={`${import.meta.env.BASE_URL}pdf/Eksempel%20på%20behandlingsplan%20Anoreksi.pdf`}
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
                    <a href={`${import.meta.env.BASE_URL}pdf/Eksempel%20på%20behandlingsplan.pdf`} download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-sm">
                        <Download className="w-4 h-4" /> Download Original PDF
                    </a>
                </div>

                <div className="glass-panel p-4 rounded-2xl shadow-sm flex-1 flex flex-col min-h-[600px]">
                    <iframe
                        src={`${import.meta.env.BASE_URL}pdf/Eksempel%20på%20behandlingsplan.pdf`}
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
                    <a href={`${import.meta.env.BASE_URL}pdf/Gennemgang.pdf`} download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-sm">
                        <Download className="w-4 h-4" /> Download Original PDF
                    </a>
                </div>

                <div className="glass-panel p-4 rounded-2xl shadow-sm flex-1 flex flex-col min-h-[600px]">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-4 text-sm text-blue-900 flex items-start gap-3">
                        <Info className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>Dette dokument er indlejret direkte fra et visuelt PDF-format. Brug knappen øverst til højre hvis du ønsker at downloade filen på din computer.</p>
                    </div>
                    <iframe
                        src={`${import.meta.env.BASE_URL}pdf/Gennemgang.pdf`}
                        className="w-full flex-1 rounded-xl border border-[#E8E4D9] bg-white min-h-[500px]"
                        title="Gennemgang.pdf Document"
                    />
                </div>
            </div>
        );
    }

    const renderBlodproever = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-8 flex justify-between items-start shrink-0">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-2">Blodprøver (Spiseforstyrrelse)</h2>
                        <p className="text-[#839788]">Vejledende beskrivelse og behandling ved spiseforstyrrelse.</p>
                    </div>
                    <a href={`${import.meta.env.BASE_URL}pdf/Blodproever_Spiseforstyrrelse.pdf`} download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-sm">
                        <Download className="w-4 h-4" /> Download Original PDF
                    </a>
                </div>

                <div className="glass-panel p-4 rounded-2xl shadow-sm flex-1 flex flex-col min-h-[600px]">
                    <iframe
                        src={`${import.meta.env.BASE_URL}pdf/Blodproever_Spiseforstyrrelse.pdf`}
                        className="w-full flex-1 rounded-xl border border-[#E8E4D9] bg-white min-h-[500px]"
                        title="Blodprøver Document"
                    />
                </div>
            </div>
        );
    }

    const renderJournaloptagAN = () => {
        return (
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="mb-8 flex justify-between items-start shrink-0">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40] mb-2">Journaloptagelse (AN)</h2>
                        <p className="text-[#839788]">Direkte afspejling af standard skabelon for journaloptagelse.</p>
                    </div>
                    <a href={`${import.meta.env.BASE_URL}pdf/Journaloptag_AN.pdf`} download className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-sm">
                        <Download className="w-4 h-4" /> Download Original PDF
                    </a>
                </div>

                <div className="glass-panel p-4 rounded-2xl shadow-sm flex-1 flex flex-col min-h-[600px]">
                    <iframe
                        src={`${import.meta.env.BASE_URL}pdf/Journaloptag_AN.pdf`}
                        className="w-full flex-1 rounded-xl border border-[#E8E4D9] bg-white min-h-[500px]"
                        title="Journaloptagelse AN Document"
                    />
                </div>
            </div>
        );
    }

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

        return (
            <div className="max-w-5xl mx-auto h-full flex flex-col pb-8">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E2E8DF] text-[#3A4A40]">Afsnit S6</span>
                            <span className="text-xs text-[#839788]">Der skrives i ’dotten’ Journaloptagelse</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40]">Skabelon til Gennemgang på S6</h2>
                        <p className="text-[#839788] text-sm">Struktureret oversigt over SFI, emner til afdækning og særlige observationsnoter.</p>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                        <button
                            onClick={copyS6Template}
                            className="flex items-center gap-1.5 bg-white border border-[#E8E4D9] text-[#3A4A40] px-3.5 py-2 rounded-xl hover:bg-[#F2F6F3] transition-colors shadow-sm font-medium text-sm cursor-pointer"
                        >
                            {copiedS6 ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#839788]" />}
                            <span>{copiedS6 ? 'Kopieret til udklip!' : 'Kopiér skabelon'}</span>
                        </button>

                        <a
                            href={`${import.meta.env.BASE_URL}pdf/Skabelon_Gennemgang_S6.pdf`}
                            download
                            className="flex items-center gap-2 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-sm"
                        >
                            <Download className="w-4 h-4" /> Download PDF
                        </a>
                    </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 mb-4">
                    <button
                        onClick={() => setS6ViewMode('table')}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${s6ViewMode === 'table' ? 'bg-[#839788] text-white shadow-sm' : 'bg-white text-[#839788] border border-[#E8E4D9] hover:text-[#3A4A40]'}`}
                    >
                        Struktureret oversigt
                    </button>
                    <button
                        onClick={() => setS6ViewMode('pdf')}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${s6ViewMode === 'pdf' ? 'bg-[#839788] text-white shadow-sm' : 'bg-white text-[#839788] border border-[#E8E4D9] hover:text-[#3A4A40]'}`}
                    >
                        PDF-visning
                    </button>
                </div>

                {s6ViewMode === 'pdf' ? (
                    <div className="glass-panel p-4 rounded-2xl shadow-sm flex-1 flex flex-col min-h-[650px]">
                        <iframe
                            src={`${import.meta.env.BASE_URL}pdf/Skabelon_Gennemgang_S6.pdf`}
                            className="w-full flex-1 rounded-xl border border-[#E8E4D9] bg-white min-h-[600px]"
                            title="Skabelon til Gennemgang på S6"
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E4D9] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-[#F2F6F3] border-b border-[#E8E4D9] text-[#3A4A40]">
                                            <th className="py-3 px-4 font-bold w-1/4">SFI</th>
                                            <th className="py-3 px-4 font-bold w-1/2">Forslag til emner, der skal afdækkes</th>
                                            <th className="py-3 px-4 font-bold w-1/4">Noter</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E8E4D9]">
                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Samtale med behandlingssigte
                                            </td>
                                            <td className="py-3.5 px-4 text-[#839788] italic align-top">—</td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top font-medium">
                                                <div className="bg-amber-50/80 border border-amber-200/70 p-2.5 rounded-lg">
                                                    <span className="font-bold text-amber-900 block mb-0.5">GENNEMGANG</span>
                                                    <span className="text-xs text-amber-800">Til stede: pt., XX, XX, samt ut.</span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Henvisningsårsag
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top">
                                                Hvorfor er pt. blevet indlagt.
                                            </td>
                                            <td className="py-3.5 px-4 text-[#839788] italic align-top">—</td>
                                        </tr>

                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Aktuelt psykisk
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top space-y-3">
                                                <p>Kort oprids af tid op til indlæggelse.</p>
                                                <p className="font-medium text-[#2C3F34]">ADL-funktion/funktionstab?</p>
                                                
                                                <div className="pt-2 border-t border-dashed border-[#E8E4D9]">
                                                    <p className="font-semibold text-xs text-[#839788] uppercase tracking-wider mb-2">
                                                        Psykopatologisk kort screening af nedenstående:
                                                    </p>
                                                    
                                                    <div className="space-y-2 text-xs">
                                                        <div className="bg-[#F9F8F6] p-2 rounded-lg border border-[#E8E4D9]">
                                                            <span className="font-bold text-[#3A4A40]">F0:</span> Tidligere hovedtraumer, øvrig organisk.
                                                        </div>
                                                        <div className="bg-[#F9F8F6] p-2 rounded-lg border border-[#E8E4D9]">
                                                            <span className="font-bold text-[#3A4A40]">F1 (husk relevant SFI):</span> Misbrug – Aktuelt / Tidligere.
                                                        </div>
                                                        <div className="bg-[#F9F8F6] p-2 rounded-lg border border-[#E8E4D9]">
                                                            <span className="font-bold text-[#3A4A40]">F2:</span> Hallucinationer på alle sansemodaliteter, tankeforstyrrelser, vrangforestillinger, styringsoplevelser.
                                                        </div>
                                                        <div className="bg-[#F9F8F6] p-2 rounded-lg border border-[#E8E4D9]">
                                                            <span className="font-bold text-[#3A4A40]">F3:</span> Depression (kerne- + ledsagesymptomer), Mani/hypomani.<br/>
                                                            <span className="font-bold text-rose-700">HUSK tidskriterier!</span>
                                                        </div>
                                                        <div className="bg-[#F9F8F6] p-2 rounded-lg border border-[#E8E4D9]">
                                                            <span className="font-bold text-[#3A4A40]">F4:</span> Angstsymptomer, OCD, Traume.
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4 text-[#839788] italic align-top">—</td>
                                        </tr>

                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Objektiv psykisk
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top">
                                                <ul className="grid grid-cols-2 gap-1 text-xs list-disc list-inside">
                                                    <li>VKO</li>
                                                    <li>Kvalitet af kontakten</li>
                                                    <li>Stemningsleje</li>
                                                    <li>Affekt</li>
                                                    <li>Adfærd under samtale</li>
                                                    <li>Psykotisk</li>
                                                    <li>Psykomotorik</li>
                                                </ul>
                                            </td>
                                            <td className="py-3.5 px-4 text-[#839788] italic align-top">—</td>
                                        </tr>

                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Suicidalscreening
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top">
                                                <ul className="text-xs space-y-1 list-disc list-inside">
                                                    <li>Suicidale tanker</li>
                                                    <li>Konkrete planer</li>
                                                    <li>Modforestillinger</li>
                                                </ul>
                                            </td>
                                            <td className="py-3.5 px-4 text-[#839788] italic align-top">—</td>
                                        </tr>

                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Aktuelt somatisk
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top text-xs space-y-1">
                                                <p>Er der noget nyt?</p>
                                                <p>Er der lavet us.?</p>
                                            </td>
                                            <td className="py-3.5 px-4 text-[#839788] italic align-top">—</td>
                                        </tr>

                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Medicin
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top text-xs space-y-1">
                                                <p>Afstemme ordinationsoversigt med pt.</p>
                                                <p className="font-bold text-rose-700">Husk CAVE</p>
                                            </td>
                                            <td className="py-3.5 px-4 text-[#839788] italic align-top">—</td>
                                        </tr>

                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Aktuelt socialt
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top">
                                                <ul className="grid grid-cols-2 gap-1 text-xs list-disc list-inside">
                                                    <li>Boligforhold</li>
                                                    <li>Beskæftigelse</li>
                                                    <li>Forsørgelse</li>
                                                    <li>Socialt netværk</li>
                                                    <li>Børn</li>
                                                </ul>
                                            </td>
                                            <td className="py-3.5 px-4 text-[#839788] italic align-top">—</td>
                                        </tr>

                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Udgang
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top text-xs">
                                                <p className="font-medium mb-1">Kan pt. få udgang:</p>
                                                <ul className="list-disc list-inside pl-1 space-y-0.5">
                                                    <li>Ledsaget</li>
                                                    <li>Uledsaget</li>
                                                    <li>Særlig aftale</li>
                                                </ul>
                                            </td>
                                            <td className="py-3.5 px-4 text-[#839788] italic align-top">—</td>
                                        </tr>

                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Ordinationer
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top text-xs space-y-1">
                                                <p>Observationsfokus</p>
                                                <p>Observationsfrekvens</p>
                                                <p>Evt. øvrige ordinationer</p>
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top text-xs space-y-2">
                                                <div className="bg-blue-50 border border-blue-200 p-2 rounded-lg text-blue-900">
                                                    Hvis depressionsdiagnose <strong>ikke</strong> er stillet, skriv da <em>'sænket/nedsat stemningsleje'</em> under fokus.
                                                </div>
                                                <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg text-emerald-900">
                                                    Hvis depressionsdiagnose er stillet – ordiner <strong>Hamilton</strong>.
                                                </div>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-[#FDFCFB]">
                                            <td className="py-3.5 px-4 font-semibold text-[#3A4A40] align-top bg-[#F9F8F6]/50">
                                                Plan
                                            </td>
                                            <td className="py-3.5 px-4 text-[#3A4A40] align-top text-xs space-y-1">
                                                <p>Kort opsummering</p>
                                                <p>Hvad skal der ske under indlæggelsen</p>
                                                <p>Forventet udskrivelse</p>
                                            </td>
                                            <td className="py-3.5 px-4 text-[#839788] italic align-top">—</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* HUSK Callout Card */}
                        <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 shadow-sm flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-amber-900 text-sm mb-1 uppercase tracking-wide">HUSK</h4>
                                <ul className="list-disc list-inside text-sm text-amber-900 font-medium space-y-0.5">
                                    <li>Bestille blodprøver</li>
                                    <li>Lav ny stuegang til opfølgning</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
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
