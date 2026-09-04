import React, { useState, useEffect } from 'react';
import { 
    BookOpen, 
    CheckCircle2, 
    ChevronRight, 
    AlertTriangle, 
    Compass, 
    Activity, 
    Sparkles, 
    Info, 
    ZoomIn, 
    X, 
    Eye, 
    Maximize2, 
    ExternalLink 
} from '../Icons';

// Kliniske Billedimport til de 7 trin
// 1. Rytme
import normalSinus1 from '../../assets/ekg_scans/normal_sinus.jpg';
import afib1 from '../../assets/ekg_scans/afib.jpg';
import aflutter1 from '../../assets/ekg_scans/aflutter_1.jpg';

// 2. Frekvens
import normalSinus4 from '../../assets/ekg_scans/normal_sinus_4.jpg';
import standard12Lead from '../../assets/ekg_scans/standard_12_lead.jpg';
import afib2 from '../../assets/ekg_scans/afib_2.jpg';

// 3. Hjerteakse
import pulmonaryEmbolism1 from '../../assets/ekg_scans/pulmonary_embolism_1.jpg';
import lvh1 from '../../assets/ekg_scans/lvh_1.jpg';
import normalSinus2 from '../../assets/ekg_scans/normal_sinus_2.jpg';

// 4. P-tak & PR-interval
import avBlock1_1 from '../../assets/ekg_scans/av_block_1_1.jpg';
import avBlock2W_1 from '../../assets/ekg_scans/av_block_2_wenckebach_1.png';
import avBlock2M_1 from '../../assets/ekg_scans/av_block_2_mobitz2_1.jpg';
import avBlock3_1 from '../../assets/ekg_scans/av_block_3_1.jpg';
import pericarditis1 from '../../assets/ekg_scans/pericarditis_1.jpg';

// 5. QRS-kompleks
import lbbb1 from '../../assets/ekg_scans/lbbb.jpg';
import rbbb1 from '../../assets/ekg_scans/rbbb.jpg';
import vt1 from '../../assets/ekg_scans/vt_1.png';

// 6. ST-segment & T-tak
import anteriorStemi1 from '../../assets/ekg_scans/anterior_stemi.jpg';
import inferiorStemi1 from '../../assets/ekg_scans/inferior_stemi.jpg';
import posteriorStemi1 from '../../assets/ekg_scans/posterior_stemi_1.jpg';
import pericarditis1_st from '../../assets/ekg_scans/pericarditis_1.jpg';
import hyperkalemia1 from '../../assets/ekg_scans/hyperkalemia_1.jpg';
import hypokalemia1 from '../../assets/ekg_scans/hypokalemia_1.png';

// 7. QT/QTc-interval
import longQtc1 from '../../assets/ekg_scans/long_qtc_1.jpg';
import longQtc2 from '../../assets/ekg_scans/long_qtc_2.jpg';
import vt2 from '../../assets/ekg_scans/vt_2.jpg';

export default function EkgSystematicGuide({ onNavigateTab, onSelectCase }) {
    const [activeStep, setActiveStep] = useState(() => {
        const hash = window.location.hash.toLowerCase();
        const match = hash.match(/step[-_]?([1-7])/);
        if (match) return parseInt(match[1], 10);
        return 1;
    });
    const [selectedModalImage, setSelectedModalImage] = useState(null);

    // Luk modal ved tastetryk på Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedModalImage(null);
            }
        };
        if (selectedModalImage) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedModalImage]);

    const steps = [
        {
            id: 1,
            title: '1. Rytme',
            subtitle: 'Regelmæssig eller uregelmæssig? Sinusrytme eller arytmi?',
            badge: 'Trin 1',
            targetTab: 'viewer',
            tabLabel: 'Afprøv på 12-aflednings EKG',
            content: (
                <div className="space-y-4 text-xs leading-relaxed text-[#3A4A40]">
                    <p>
                        Første trin i Hamptons systematiske EKG-aflæsning er altid at fastslå den grundlæggende rytme.
                    </p>

                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                        <strong className="block text-emerald-900 font-bold mb-1 text-sm">Definition på Sinusrytme:</strong>
                        <ul className="list-disc list-inside space-y-1 text-emerald-800">
                            <li>Ensartede P-takker forud for <strong>hvert</strong> QRS-kompleks.</li>
                            <li>Positiv P-tak i afledning II (og aVF), da sinusknudens impuls vandrer nedad og mod venstre.</li>
                            <li>Konstant PR-interval (120–200 ms).</li>
                            <li>Ensartet afstand mellem R-takkerne (mindre fysiologisk variation ved respiration kaldes sinusarytmi).</li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-white rounded-xl border border-[#E8E4D9]">
                            <strong className="font-bold text-[#3A4A40] block mb-1">Uregelmæssig Rytme:</strong>
                            <ul className="list-disc list-inside text-[#839788] space-y-1">
                                <li><strong>Atrieflimren:</strong> Uregelmæssigt uregelmæssig rytme uden P-takker (flimrelinje).</li>
                                <li><strong>Ekstrasystoler:</strong> Tidlige ekstraslag fra atrierne (SVES - smalle) eller ventriklerne (VES - brede med pause).</li>
                                <li><strong>AV-blok grad 2:</strong> Regelmæssigt uregelmæssig med udfald af enkelte hjerteslag.</li>
                            </ul>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-[#E8E4D9]">
                            <strong className="font-bold text-[#3A4A40] block mb-1">Hurtig Rytme (Takykardi &gt; 100/min):</strong>
                            <ul className="list-disc list-inside text-[#839788] space-y-1">
                                <li><strong>Smalkomplekset (QRS &lt; 120 ms):</strong> Sinustakykardi, SVT (AVNRT), Atrieflagren.</li>
                                <li><strong>Bredkomplekset (QRS &ge; 120 ms):</strong> Ventrikulær takykardi (VT) indtil det modsatte er bevist!</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
            images: [
                {
                    id: 'step1-ns',
                    title: 'Normal Sinusrytme (Fysiologisk Reference)',
                    badge: 'Reference (72 bpm)',
                    subtitle: 'Regelmæssig puls med synkrone P-takker foran hvert QRS',
                    caption: 'Klassisk 12-aflednings EKG fra rask person. Bemærk de regelmæssige R-R intervaller og den ensartede, positive P-tak foran hvert eneste QRS-kompleks i afledning II.',
                    keyPoints: [
                        'Positiv P-tak i afledning II og aVF',
                        'Ensartet afstand mellem samtlige R-takker',
                        'Normalt fysiologisk PR-interval (160 ms)',
                        'Slanke og smalle QRS-komplekser (85 ms)'
                    ],
                    src: normalSinus1,
                    caseId: 'normal_sinus'
                },
                {
                    id: 'step1-afib',
                    title: 'Atrieflimren (Uregelmæssigt Uregelmæssig)',
                    badge: 'Uregelmæssig Arytmi',
                    subtitle: 'Mangel på P-takker & kaotisk flimrelinje på grundlinjen',
                    caption: 'Typisk hospitalsoptagelse af atrieflimren. Der ses fuldstændig uregelmæssige R-R intervaller uden nogen genkendelige P-takker forud for QRS. Grundlinjen udviser fin til grov flimren.',
                    keyPoints: [
                        'Total mangel på koordinerede P-takker',
                        'Uregelmæssigt uregelmæssig ventrikelaktion',
                        'Ujævn flimrende grundlinje i II og V1',
                        'Kræver 10-sekunders optælling til frekvensberegning'
                    ],
                    src: afib1,
                    caseId: 'afib'
                },
                {
                    id: 'step1-aflutter',
                    title: 'Atrieflagren (Savtakket Flutter-Mønster)',
                    badge: 'Regelmæssig Arytmi',
                    subtitle: 'F-bølger ca. 300/min i de inferiore afledninger (II, III, aVF)',
                    caption: 'Karakteristisk atrieflagren med regelmæssig AV-overledning. Læg mærke til den markante "savtakkede" grundlinje (flutter-bølger) i afledning II, III og aVF.',
                    keyPoints: [
                        'Regelmæssige savtakkede F-bølger (~300/min)',
                        'Typisk 2:1 blokering med ventrikelfrekvens på 150/min',
                        'Tydeligst i de inferiore afledninger (II, III, aVF)',
                        'Fravær af normal flad isoelektrisk linje'
                    ],
                    src: aflutter1,
                    caseId: 'aflutter'
                }
            ]
        },
        {
            id: 2,
            title: '2. Frekvens',
            subtitle: '300-reglen, 10-sekunders strimmelen og frekvensberegner',
            badge: 'Trin 2',
            targetTab: 'viewer',
            tabLabel: 'Gå til 12-aflednings EKG',
            content: (
                <div className="space-y-4 text-xs leading-relaxed text-[#3A4A40]">
                    <p>
                        Ved standard papirhastighed på <strong>25 mm/s</strong> svarer 1 lille tern til 40 ms (0.04 s) og 1 stort tern (5 små tern) til 200 ms (0.20 s). På 1 sekund passerer 5 store tern, og på 1 minut passerer <strong>300 store tern</strong>.
                    </p>

                    <div className="p-4 bg-[#EFF3F0] rounded-2xl border border-[#D9E1DA]">
                        <strong className="block text-[#2C3F34] font-bold mb-2 text-sm">300-Reglen (Ved regelmæssig rytme):</strong>
                        <p className="mb-2 text-[#3A4A40]">
                            Find en R-tak, der falder på en tyk gitterlinje. Tæl antallet af store tern til den næste R-tak:
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center font-mono">
                            <div className="p-2 bg-white rounded-lg border border-[#E8E4D9]">
                                <span className="block font-bold text-slate-800">1 tern</span>
                                <span className="text-emerald-700 font-bold">300/min</span>
                            </div>
                            <div className="p-2 bg-white rounded-lg border border-[#E8E4D9]">
                                <span className="block font-bold text-slate-800">2 tern</span>
                                <span className="text-emerald-700 font-bold">150/min</span>
                            </div>
                            <div className="p-2 bg-white rounded-lg border border-[#E8E4D9]">
                                <span className="block font-bold text-slate-800">3 tern</span>
                                <span className="text-emerald-700 font-bold">100/min</span>
                            </div>
                            <div className="p-2 bg-white rounded-lg border border-[#E8E4D9]">
                                <span className="block font-bold text-slate-800">4 tern</span>
                                <span className="text-emerald-700 font-bold">75/min</span>
                            </div>
                            <div className="p-2 bg-white rounded-lg border border-[#E8E4D9]">
                                <span className="block font-bold text-slate-800">5 tern</span>
                                <span className="text-emerald-700 font-bold">60/min</span>
                            </div>
                            <div className="p-2 bg-white rounded-lg border border-[#E8E4D9]">
                                <span className="block font-bold text-slate-800">6 tern</span>
                                <span className="text-emerald-700 font-bold">50/min</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900">
                        <strong className="block font-bold mb-1">10-sekunders reglen (Ved uregelmæssig rytme / Atrieflimren):</strong>
                        <p className="text-amber-800">
                            Ved uregelmæssig puls dur 300-reglen ikke. Tæl i stedet det totale antal QRS-komplekser på hele den 10 sekunders rytmestrimmel (standardark) og gang tallet med 6. (Eks. 14 slag på 10 sek &times; 6 = 84 slag/min).
                        </p>
                    </div>
                </div>
            ),
            images: [
                {
                    id: 'step2-grid',
                    title: 'Standard Kalibreringsark & Tern-måling',
                    badge: '300-Reglen & Tidsmåling',
                    subtitle: '25 mm/s papirhastighed & 10 mm/mV voltage kalibrering',
                    caption: 'Præcisions-kalibreringsark. Ved 25 mm/s svarer 1 lille tern til 0,04 s (40 ms) og 1 stort tern (5 mm) til 0,20 s (200 ms). 300 store tern udgør 1 minut.',
                    keyPoints: [
                        '1 lille tern = 40 ms (0,04 s)',
                        '1 stort tern = 200 ms (0,20 s)',
                        '300 store tern = 1 minut (60 sekunder)',
                        'Mnemoteknik: 300 - 150 - 100 - 75 - 60 - 50'
                    ],
                    src: normalSinus4,
                    caseId: 'normal_sinus'
                },
                {
                    id: 'step2-10s',
                    title: '10-sekunders Rytmestrimmel (Nederst på Arket)',
                    badge: '10-Sekunders Reglen',
                    subtitle: 'Uundværlig ved uregelmæssig hjerteaktion som Atrieflimren',
                    caption: 'Den gennemgående nederste afledning (Lead II) optager uafbrudt i 10 sekunder. Ved uregelmæssig rytme tælles samtlige QRS på denne strimmel og multipliceres med 6.',
                    keyPoints: [
                        'Fuld 10 sekunders kontinuerlig afledningsoptagelse',
                        'Tæl samtlige R-takker og gang med 6',
                        'Giver den korrekte gennemsnitsfrekvens ved flimren',
                        'Standard hospitalsformat i Danmark og internationalt'
                    ],
                    src: standard12Lead,
                    caseId: 'normal_sinus'
                },
                {
                    id: 'step2-tachy',
                    title: 'Hurtig Ventrikelaktion (Takykardi)',
                    badge: 'Takykardi (> 120 bpm)',
                    subtitle: 'Tætte R-R intervaller under 2-3 store tern',
                    caption: 'Patientoptagelse med hurtig atrieflimren (takykardi). R-takkerne ligger meget tæt med en gennemsnitlig afstand på under 2,5 store tern, svarende til en hjertefrekvens omkring 130-140/min.',
                    keyPoints: [
                        'R-R afstand < 3 store tern indikerer puls > 100 bpm',
                        'Hurtig ventrikelaktion øger myokardielt iltforbrug',
                        'Behov for akut frekvensregulering (fx betablokker)',
                        'Vurder samtidig patientens blodtryk og kredsløb'
                    ],
                    src: afib2,
                    caseId: 'afib'
                }
            ]
        },
        {
            id: 3,
            title: '3. Hjerteakse',
            subtitle: 'Kvadrantmetoden i I og II samt Cabrera-cirklen',
            badge: 'Trin 3',
            targetTab: 'model',
            tabLabel: 'Se akse & Cabrera i Hjertemodellen',
            content: (
                <div className="space-y-4 text-xs leading-relaxed text-[#3A4A40]">
                    <p>
                        Hjerteaksen angiver nettoretningen for ventriklernes depolarisationsvektor i frontalplanet.
                    </p>

                    {/* Visuel Cabrera Kompas Oversigt */}
                    <div className="p-4 bg-white rounded-2xl border border-[#E8E4D9] shadow-xs">
                        <strong className="block text-[#3A4A40] font-bold mb-2 text-sm">Den Hurtige 2-Afledningsmetode (I og II):</strong>
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                                <div>
                                    <strong className="text-emerald-900 font-bold">Normal Akse (-30° til +90°):</strong>
                                    <p className="text-emerald-800">QRS er overvejende positivt i både <strong>afledning I</strong> og <strong>afledning II</strong>.</p>
                                </div>
                                <span className="px-2 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[10px]">NORMAL</span>
                            </div>

                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                                <div>
                                    <strong className="text-amber-900 font-bold">Venstredrejet Akse (LAD &lt; -30°):</strong>
                                    <p className="text-amber-800">QRS er positiv i <strong>afledning I</strong>, men overvejende negativ i <strong>afledning II</strong> og III.</p>
                                    <p className="text-[11px] text-amber-700 mt-0.5">Årsager: Venstresidigt forreste hemiblok (LAFB), inferior infarkt, svær LVH.</p>
                                </div>
                                <span className="px-2 py-1 bg-amber-600 text-white font-bold rounded-lg text-[10px]">LAD</span>
                            </div>

                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-orange-50 border border-orange-200">
                                <div>
                                    <strong className="text-orange-900 font-bold">Højredrejet Akse (RAD &gt; +90°):</strong>
                                    <p className="text-orange-800">QRS er negativ i <strong>afledning I</strong>, men overvejende positiv i <strong>afledning III</strong> og aVF.</p>
                                    <p className="text-[11px] text-orange-700 mt-0.5">Årsager: Akut lungeemboli / cor pulmonale, højre ventrikelhypertrofi (RVH), posteriort hemiblok (LPFB).</p>
                                </div>
                                <span className="px-2 py-1 bg-orange-600 text-white font-bold rounded-lg text-[10px]">RAD</span>
                            </div>
                        </div>

                        {/* Pædagogisk Cabrera SVG Diagram */}
                        <div className="p-3 bg-[#F2F6F3] rounded-xl border border-[#D9E1DA] flex flex-col md:flex-row items-center gap-4">
                            <div className="w-48 h-48 shrink-0 relative flex items-center justify-center">
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    {/* Cirkel baggrund */}
                                    <circle cx="100" cy="100" r="85" fill="#FAF9F6" stroke="#D9E1DA" strokeWidth="2" />
                                    {/* Normal Sektor (-30° til +90°) */}
                                    <path d="M 100 100 L 173.6 57.5 A 85 85 0 0 1 100 185 Z" fill="#E2E8DF" opacity="0.65" />
                                    {/* Akser */}
                                    <line x1="15" y1="100" x2="185" y2="100" stroke="#839788" strokeWidth="1.5" strokeDasharray="3 3" />
                                    <line x1="100" y1="15" x2="100" y2="185" stroke="#839788" strokeWidth="1.5" strokeDasharray="3 3" />
                                    {/* Lead Vektorer */}
                                    <line x1="100" y1="100" x2="185" y2="100" stroke="#2C3F34" strokeWidth="2.5" />
                                    <line x1="100" y1="100" x2="142.5" y2="173.6" stroke="#2C3F34" strokeWidth="2.5" />
                                    <line x1="100" y1="100" x2="100" y2="185" stroke="#2C3F34" strokeWidth="2.5" />
                                    <line x1="100" y1="100" x2="173.6" y2="57.5" stroke="#2C3F34" strokeWidth="1.5" />
                                    {/* Tekster */}
                                    <text x="175" y="95" fontSize="9" fontWeight="bold" fill="#2C3F34">I (0°)</text>
                                    <text x="145" y="180" fontSize="9" fontWeight="bold" fill="#2C3F34">II (+60°)</text>
                                    <text x="92" y="195" fontSize="9" fontWeight="bold" fill="#2C3F34">aVF (+90°)</text>
                                    <text x="160" y="50" fontSize="9" fontWeight="bold" fill="#839788">aVL (-30°)</text>
                                    <text x="100" y="125" fontSize="8" fontWeight="bold" fill="#2C3F34" textAnchor="middle">Normal Akse</text>
                                </svg>
                            </div>
                            <div className="text-[11px] text-[#3A4A40] space-y-1.5">
                                <strong className="block text-xs font-bold text-[#2C3F34]">Cabrera-Cirklen & Polaritet:</strong>
                                <p>• <strong>Lead I (0°):</strong> Måler horisontalt mod venstre arm.</p>
                                <p>• <strong>Lead II (+60°):</strong> Måler skråt nedad mod venstre fod (hjertets fysiologiske anatomiske længdeakse).</p>
                                <p>• <strong>aVF (+90°):</strong> Måler lodret nedad mod fødderne.</p>
                                <p>• Hvis både I og II er positive, <em>skal</em> aksen ligge i det grønne fysiologiske felt (-30° til +90°)!</p>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            images: [
                {
                    id: 'step3-rad',
                    title: 'Højredrejet Akse (RAD > +90°) ved Akut Lungeemboli',
                    badge: 'RAD (+110°)',
                    subtitle: 'Akut trykbelastning af højre ventrikel (S1 Q3 T3)',
                    caption: 'Klassisk akut lungeemboli-EKG. Hjerteaksen er markant drejet mod højre (RAD): QRS er overvejende negativt i afledning I og stærkt dominerende positivt i afledning III. Ledsages af S1 Q3 T3 mønster.',
                    keyPoints: [
                        'Negativt QRS i afledning I (dyb S-tak)',
                        'Højt positivt QRS i afledning III (høj R-tak)',
                        'McGinn-White S1 Q3 T3 mønster',
                        'Akut trykoverbelastning af pulmonalarterien'
                    ],
                    src: pulmonaryEmbolism1,
                    caseId: 'pulmonary_embolism'
                },
                {
                    id: 'step3-lad',
                    title: 'Venstredrejet Akse (LAD < -30°) ved Venstre Ventrikelhypertrofi',
                    badge: 'LAD (-45°)',
                    subtitle: 'Venstresidig overvægt & hemiblok mønster',
                    caption: 'Patient med langvarig arteriel hypertension og venstre ventrikelhypertrofi. QRS er overvejende positivt i afledning I, men dybt negativt i afledning II og III/aVF.',
                    keyPoints: [
                        'Positivt QRS i afledning I',
                        'Dybt negativt QRS i afledning II og III',
                        'Massiv elektrisk overvægt mod venstre opad',
                        'Ses hyppigt sammen med høje venstresidige voltager'
                    ],
                    src: lvh1,
                    caseId: 'lvh'
                },
                {
                    id: 'step3-normal',
                    title: 'Normal Fysiologisk Hjerteakse (+60°)',
                    badge: 'Normal Akse (+60°)',
                    subtitle: 'Positivt QRS i både afledning I og II',
                    caption: 'Standard normal EKG-tracing. Hjerteaksen ligger i det ideelle anatomiske område (+30° til +60°). QRS er markant positivt i både afledning I og II, hvilket udelukker aksefejl.',
                    keyPoints: [
                        'Slanke, positive QRS-komplekser i afledning I',
                        'Maksimal positiv R-tak i afledning II (+60°)',
                        'Nettovektor rettet direkte mod venstre hofte',
                        'Udelukker grenblok og fascikelblokke'
                    ],
                    src: normalSinus2,
                    caseId: 'normal_sinus'
                }
            ]
        },
        {
            id: 4,
            title: '4. P-tak & PR-interval',
            subtitle: 'Atriedepolarisering og ledningsforsinkelse i AV-knuden',
            badge: 'Trin 4',
            targetTab: 'model',
            tabLabel: 'Se SA- og AV-ledning i Hjertemodel',
            content: (
                <div className="space-y-4 text-xs leading-relaxed text-[#3A4A40]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-2xl border border-[#E8E4D9]">
                            <strong className="block text-[#3A4A40] font-bold mb-2">Normal P-tak:</strong>
                            <ul className="list-disc list-inside space-y-1 text-[#839788]">
                                <li>Bredde: &lt; 120 ms (&lt; 3 små tern).</li>
                                <li>Amplitude: &lt; 2.5 mm i ekstremitetsafledninger.</li>
                                <li><strong>P-pulmonale:</strong> Høj spids P-tak (&gt; 2.5 mm i II) = Højre atrieforstørrelse (fx KOL/pulmonal hypertension).</li>
                                <li><strong>P-mitrale:</strong> Bred, kærvet P-tak med to pukler (&gt; 120 ms) = Venstre atrieforstørrelse (fx mitralstenose).</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-white rounded-2xl border border-[#E8E4D9]">
                            <strong className="block text-[#3A4A40] font-bold mb-2">PR-interval (120–200 ms / 3-5 små tern):</strong>
                            <ul className="list-disc list-inside space-y-1 text-[#839788]">
                                <li><strong>Forlænget PR (&gt; 200 ms):</strong> AV-blok 1. grad.</li>
                                <li><strong>Progredierende PR:</strong> AV-blok 2. grad type Wenckebach.</li>
                                <li><strong>Kort PR (&lt; 120 ms):</strong> Præexcitation (WPW-syndrom med deltaryg på QRS) eller junctional rytme.</li>
                                <li><strong>PR-depression:</strong> Akut perikarditis.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
            images: [
                {
                    id: 'step4-av1',
                    title: 'Førstegrads AV-blok (PR > 200 ms)',
                    badge: 'Konstant Forlænget PR',
                    subtitle: 'Forsinket overledning i AV-knuden uden slagudfald',
                    caption: 'Patient med medicininduceret eller degeneration i AV-knuden. Bemærk det markant forlængede PR-interval på ca. 280 ms (> 7 små tern). Hvert enkelt P-tak følges dog trofast af et QRS.',
                    keyPoints: [
                        'PR-interval konstant > 200 ms (5 små tern)',
                        'Ingen udfald af QRS-komplekser (1:1 overledning)',
                        'Slanke QRS-komplekser med normal intakt grenledning',
                        'Ofte forårsaget af betablokkere, diltiazem eller digoxin'
                    ],
                    src: avBlock1_1,
                    caseId: 'av_block_1'
                },
                {
                    id: 'step4-wenck',
                    title: 'Andengrads AV-blok Type 1 (Wenckebach / Mobitz I)',
                    badge: 'Progredierende PR-forlængelse',
                    subtitle: 'Gradvis udtrætning af AV-knuden indtil udfald af QRS',
                    caption: 'Klassisk Wenckebach-fænomen. PR-intervallet bliver gradvist længere for hvert hjerteslag, indtil en P-tak blokeres fuldstændigt i AV-knuden uden efterfølgende QRS. Derefter nulstilles cyklussen.',
                    keyPoints: [
                        'Gradvis forlængelse af PR over 3-5 slag',
                        'Enkelt blokeret P-tak uden efterfølgende QRS',
                        'Efterfølgende PR-interval er det korteste i rækken',
                        'Godartet AV-knudebaseret fænomen (sjældent akut PM)'
                    ],
                    src: avBlock2W_1,
                    caseId: 'av_block_2_wenckebach'
                },
                {
                    id: 'step4-peri',
                    title: 'PR-depression ved Akut Perikarditis',
                    badge: 'PR-Segment Depression',
                    subtitle: 'Subepikardiel inflammation i atrierne',
                    caption: 'Akut perikarditis med inflammation af epikardiet. Bemærk den karakteristiske skråt nedadgående PR-depression under den isoelektriske linje i afledning II, ledsaget af reciprok PR-elevation i aVR.',
                    keyPoints: [
                        'PR-segment hælder nedad under den isoelektriske linje',
                        'Reciprok PR-elevation i afledning aVR',
                        'Tidligt og meget specifikt perikarditistegn',
                        'Ses forud for fuld udvikling af ST-elevationer'
                    ],
                    src: pericarditis1,
                    caseId: 'pericarditis'
                },
                {
                    id: 'step4-mobitz2',
                    title: 'Andengrads AV-blok Type 2 (Mobitz II)',
                    badge: 'Uvarslet Slagudfald',
                    subtitle: 'Konstant PR-interval med pludseligt udfald af QRS (His-Purkinje defekt)',
                    caption: 'Kritisk ledningsforstyrrelse. PR-intervallet er helt fast og forlænges IKKE forud for udfaldet. Pludselig falder et QRS-kompleks ud. Høj risiko for Adams-Stokes anfald og akut totalblok.',
                    keyPoints: [
                        'Konstant PR-interval forud for udfald',
                        'Pludseligt blokeret P-tak uden forvarsel',
                        'Infranodal lokalisation (His-bundt / ledningsgrene)',
                        'Klasse I indikation for permanent pacemaker (PPM)'
                    ],
                    src: avBlock2M_1,
                    caseId: 'av_block_2_mobitz2'
                },
                {
                    id: 'step4-totalblock',
                    title: 'Tredjegrads AV-blok (Komplet Totalblok)',
                    badge: 'Komplet AV-Dissociation',
                    subtitle: 'P-takker og QRS-komplekser slår helt uafhængigt af hinanden',
                    caption: 'Ingen overledning mellem atrier og ventrikler. P-takker marcherer igennem med egen regelmæssig frekvens (~75 bpm) og ventriklerne styres af en langsom idioventrikulær erstatningsrytme (~35 bpm).',
                    keyPoints: [
                        'Komplet atrioventrikulær dissociation',
                        'P-P intervaller er regelmæssige (sinusknude)',
                        'R-R intervaller er regelmæssige men langsomme (erstatningsrytme)',
                        'P-takker ses vandrende oveni QRS-komplekser og T-takker'
                    ],
                    src: avBlock3_1,
                    caseId: 'av_block_3'
                }
            ]
        },
        {
            id: 5,
            title: '5. QRS-kompleks',
            subtitle: 'Bredde, patologiske Q-takker, grenblok og hypertrofi',
            badge: 'Trin 5',
            targetTab: 'viewer',
            tabLabel: 'Inspicer QRS i V1–V6',
            content: (
                <div className="space-y-4 text-xs leading-relaxed text-[#3A4A40]">
                    <div className="p-4 bg-white rounded-2xl border border-[#E8E4D9]">
                        <strong className="block text-[#3A4A40] font-bold mb-1 text-sm">QRS-Bredde (Normal: &lt; 120 ms / 3 små tern):</strong>
                        <p className="text-[#839788] mb-3">
                            Hvis QRS er &ge; 120 ms, spredes impulsen unormalt langsomt gennem ventriklerne. Dette skyldes typisk grenblok eller ventrikulær rytme.
                        </p>

                        <div className="p-3 bg-[#EFF3F0] rounded-xl border border-[#D9E1DA] mb-3">
                            <strong className="text-[#2C3F34] font-bold block mb-1">Hamptons WiLLiaM MaRRoW Mnemoteknik for Grenblok:</strong>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                                <div className="p-2.5 bg-white rounded-lg border border-[#E8E4D9]">
                                    <strong className="text-blue-900 block font-bold">WiLLiaM = Venstresidigt Grenblok (LBBB)</strong>
                                    <span className="text-[#839788] text-[11px]">V1 ligner et W (dyb bred rS/QS), V6 ligner et M (bred kærvet R-tak).</span>
                                </div>
                                <div className="p-2.5 bg-white rounded-lg border border-[#E8E4D9]">
                                    <strong className="text-emerald-900 block font-bold">MaRRoW = Højresidigt Grenblok (RBBB)</strong>
                                    <span className="text-[#839788] text-[11px]">V1 ligner et M (rsR' kaninører), V6 ligner et W (bred sløret S-tak).</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-red-900 mb-3">
                            <strong className="block font-bold mb-1">Patologisk Q-tak:</strong>
                            <p className="text-red-800">
                                En Q-tak er patologisk, hvis den er &gt; 40 ms bred (&gt; 1 lille tern) og/eller dybere end 25% af den efterfølgende R-tak. Dette er det blivende elektrokardiografiske ar efter et transmuralt infarkt.
                            </p>
                        </div>

                        {/* LVH Kriterier */}
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 mb-3">
                            <strong className="text-slate-900 block font-bold mb-1">Venstre Ventrikelhypertrofi (LVH):</strong>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] mt-1">
                                <div className="p-2 bg-white rounded border border-slate-200">
                                    <strong className="text-[#3A4A40] block">Sokolow-Lyon Kriterium:</strong>
                                    <span>S i V1 + R i V5/V6 &gt; 35 mm (voksne &gt; 35 år).</span>
                                </div>
                                <div className="p-2 bg-white rounded border border-slate-200">
                                    <strong className="text-[#3A4A40] block">Cornell Kriterium:</strong>
                                    <span>R i aVL + S i V3 &gt; 28 mm (mænd) / &gt; 20 mm (kvinder).</span>
                                </div>
                            </div>
                        </div>

                        {/* Sgarbossa ved LBBB */}
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-950">
                            <strong className="block font-bold mb-1 text-blue-900">STEMI ved Grenblok (Sgarbossa-kriterier):</strong>
                            <p className="text-[11px] text-blue-900 mb-1">
                                Normalt skaber LBBB sekundære ST-depressioner og modsat rettede T-takker. Mistænk akut transmuralt infarkt (STEMI) ved:
                            </p>
                            <ul className="list-disc list-inside space-y-0.5 text-[11px] text-blue-900">
                                <li><strong>Konkordant ST-elevation &ge; 1 mm</strong> i en afledning med positivt QRS (meget specifik).</li>
                                <li><strong>Konkordant ST-depression &ge; 1 mm</strong> i V1, V2 eller V3.</li>
                                <li><strong>Udtalt diskordant ST-elevation &ge; 5 mm</strong> eller ST/S ratio &le; -0.25 (modificeret Sgarbossa).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
            images: [
                {
                    id: 'step5-lbbb',
                    title: 'Venstresidigt Grenblok (LBBB - WiLLiaM)',
                    badge: 'WiLLiaM (V1=W, V6=M)',
                    subtitle: 'Bredt QRS ≥ 120 ms & tab af septale q-takker',
                    caption: 'WiLLiaM-reglen i praksis: V1 viser et dybt, bredt QS-kompleks ("W"-form), mens V6 viser en bred, kærvet R-tak ("M"-form). Venstre ventrikel aktiveres forsinket via myocyt-til-myocyt spredning.',
                    keyPoints: [
                        'QRS-varighed ≥ 120 ms (3 små tern)',
                        'V1: Dyb bred QS/rS (ligner et W)',
                        'V6: Kærvet M-formet R-tak uden fysiologisk q-tak',
                        'Sekundære diskordante ST-T forandringer'
                    ],
                    src: lbbb1,
                    caseId: 'lbbb'
                },
                {
                    id: 'step5-rbbb',
                    title: 'Højresidigt Grenblok (RBBB - MaRRoW)',
                    badge: 'MaRRoW (V1=M, V6=W)',
                    subtitle: "rsR' kaninører i V1 & bred sløret S-tak i V6",
                    caption: "MaRRoW-reglen i praksis: V1 viser det berømte M-formede rsR'-mønster (kaninører), mens afledning I og V6 viser en bred, afrundet og slæbende S-tak (W-form).",
                    keyPoints: [
                        'QRS-varighed ≥ 120 ms',
                        "V1: Klassisk rsR' (kaninører / M-form)",
                        'I og V6: Bred, slæbende S-tak (W-form)',
                        'Normal venstresidig depolarisering bevaret'
                    ],
                    src: rbbb1,
                    caseId: 'rbbb'
                },
                {
                    id: 'step5-vt',
                    title: 'Ventrikulær Takykardi (Bredt Patologisk QRS)',
                    badge: 'Bredkomplekset QRS (> 140 ms)',
                    subtitle: 'Ektopisk impulsudspring fra ventrikelmyokardiet',
                    caption: 'Akut ventrikulær takykardi. QRS-komplekserne er ekstremt brede (> 140 ms) og bizarre i formen. Der ses AV-dissociation og hjerteaktion over 160/min. Livstruende arytmi!',
                    keyPoints: [
                        'QRS-bredde markant > 120 ms (> 140 ms styrker VT)',
                        'Hurtig, regelmæssig bredkomplekset rytme',
                        'AV-dissociation med uafhængige atrier',
                        'Bredkomplekset takykardi behandles som VT indtil modbevist'
                    ],
                    src: vt1,
                    caseId: 'vt'
                },
                {
                    id: 'step5-lvh-voltage',
                    title: 'Venstre Ventrikelhypertrofi (Høje Voltager & Sokolow-Lyon)',
                    badge: 'Sokolow-Lyon > 35 mm',
                    subtitle: 'Dyb S i V1 + Høj R i V5/V6 overstiger 35 mm',
                    caption: 'Skoleeksempel på patologisk høje QRS-amplituder grundet fortykket muskelvæg i venstre ventrikel. S i V1 (20 mm) + R i V5 (26 mm) = 46 mm (langt over 35 mm grænsen). Ledsages af asymmetrisk strain-mønster.',
                    keyPoints: [
                        'Sokolow-Lyon: S i V1 + R i V5/V6 ≥ 35 mm',
                        'Cornell: R i aVL + S i V3 > 28 mm (mænd) / 20 mm (kvinder)',
                        'Sekundær repolariseringsbelastning (strain i I, aVL, V5, V6)',
                        'Hyppigste årsag er langvarig arteriel hypertension'
                    ],
                    src: lvh1,
                    caseId: 'lvh'
                }
            ]
        },
        {
            id: 6,
            title: '6. ST-segment & T-tak',
            subtitle: 'Iskæmi, infarkt, reciprokke ændringer og perikarditis',
            badge: 'Trin 6',
            targetTab: 'viewer',
            tabLabel: 'Undersøg ST-elevationer',
            content: (
                <div className="space-y-4 text-xs leading-relaxed text-[#3A4A40]">
                    {/* ESC / DCS 4th Universal Definition Table */}
                    <div className="p-4 bg-white rounded-2xl border border-[#E8E4D9]">
                        <div className="flex items-center justify-between mb-2">
                            <strong className="text-sm font-bold text-red-900">ESC/DCS STEMI Kriterier (Målt ved J-punktet i &ge; 2 naboafledninger):</strong>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">4th Universal Def</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-3 text-[11px]">
                            <div className="p-2.5 bg-red-50 rounded-xl border border-red-200">
                                <strong className="block text-red-900 font-bold">V2–V3 Mænd &lt; 40 år:</strong>
                                <span className="font-mono font-bold text-red-800 text-xs">&ge; 2.5 mm (0.25 mV)</span>
                                <p className="text-[10px] text-[#839788] mt-0.5">Højere tærskel grundet fysiologisk repolarisering hos unge.</p>
                            </div>
                            <div className="p-2.5 bg-red-50 rounded-xl border border-red-200">
                                <strong className="block text-red-900 font-bold">V2–V3 Mænd &ge; 40 år:</strong>
                                <span className="font-mono font-bold text-red-800 text-xs">&ge; 2.0 mm (0.20 mV)</span>
                                <p className="text-[10px] text-[#839788] mt-0.5">Klassisk tærskel for voksne mænd.</p>
                            </div>
                            <div className="p-2.5 bg-red-50 rounded-xl border border-red-200">
                                <strong className="block text-red-900 font-bold">V2–V3 Kvinder (alle aldre):</strong>
                                <span className="font-mono font-bold text-red-800 text-xs">&ge; 1.5 mm (0.15 mV)</span>
                                <p className="text-[10px] text-[#839788] mt-0.5">Lavere tærskel grundet mindre myokardiemasse.</p>
                            </div>
                        </div>
                        <div className="p-2 bg-[#F9F8F6] rounded-xl border border-[#E8E4D9] text-[11px] text-[#3A4A40]">
                            <strong>Øvrige afledninger (V1, V4–V6, I, II, III, aVL, aVF):</strong> &ge; 1.0 mm (0.10 mV) for alle patienter.
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-red-950">
                            <strong className="block font-bold mb-2 text-sm text-red-900">Anatomisk Infarktlokalisering:</strong>
                            <ul className="list-disc list-inside space-y-1 text-red-900 text-[11px]">
                                <li><strong>V1–V4:</strong> Forvægsinfarkt (Anterior STEMI / LAD).</li>
                                <li><strong>II, III, aVF:</strong> Inferiort infarkt (RCA - husk reciprok depression i aVL!).</li>
                                <li><strong>I, aVL, V5, V6:</strong> Lateralt infarkt (LCx / Diagonal).</li>
                                <li><strong>Posteriort infarkt (Bagvæg):</strong> Spejlbillede i V1–V3 med horisontal ST-depression &ge; 0.5 mm, høj R (R/S &gt; 1) og positiv T-tak. Optag V7–V9!</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950">
                            <strong className="block font-bold mb-2 text-sm text-amber-900">ST-Depressioner & T-Inversion:</strong>
                            <ul className="list-disc list-inside space-y-1 text-amber-900 text-[11px]">
                                <li><strong>Iskæmi / NSTEMI:</strong> Horisontal eller descenderende ST-depression &ge; 0.5–1 mm.</li>
                                <li><strong>Ventrikelbelastning ("Strain"):</strong> Asymmetrisk T-inversion i afledninger med høje R-takker.</li>
                                <li><strong>Perikarditis:</strong> Diffus konkav ("hængekøje") ST-elevation og PR-depression i næsten alle afledninger.</li>
                                <li><strong>Hyperkaliæmi:</strong> Høje, spidse, symmetriske "teltede" T-takker.</li>
                                <li><strong>Hypokaliæmi:</strong> Affladet T-tak og kæmpe U-tak (simulerer forlenget QT).</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
            images: [
                {
                    id: 'step6-ant-stemi',
                    title: 'Akut Forvægsinfarkt (Anterior STEMI)',
                    badge: 'Konveks ST-elevation',
                    subtitle: 'Akut LAD-okklusion i forvæggen med "tombstone" mønster',
                    caption: 'Dramatiske konvekse ("tombstone") ST-elevationer på 4-6 mm i V1-V4 forårsaget af akut transmural iskæmi i forvæggen. Samtidig ses reciprokke ST-depressioner i bunden af hjertet (II, III, aVF).',
                    keyPoints: [
                        'ST-elevation ≥ 2,0-2,5 mm i V1-V4',
                        'Konveks opadbuet form ("gravstensmønster")',
                        'Akut total LAD-trombose',
                        'Reciprokke ST-depressioner i II, III og aVF'
                    ],
                    src: anteriorStemi1,
                    caseId: 'anterior_stemi'
                },
                {
                    id: 'step6-inf-stemi',
                    title: 'Akut Undervægsinfarkt (Inferior STEMI & Reciprokke)',
                    badge: 'Elevation + Spejlbillede',
                    subtitle: 'RCA-okklusion med reciprokke depressioner i aVL og I',
                    caption: 'Klassisk inferior STEMI. Tydelig ST-elevation i II, III og aVF. Bemærk det elektriske spejlbillede (reciprok ST-depression) i afledning I og aVL, hvilket definitivt bekræfter infarkt frem for perikarditis.',
                    keyPoints: [
                        'ST-elevation i II, III og aVF',
                        'Reciprokke ST-depressioner i afledning I og aVL',
                        'Højresidig koronararterie (RCA) okklusion',
                        'Husk kontrol for højresidigt infarkt (V4R)'
                    ],
                    src: inferiorStemi1,
                    caseId: 'inferior_stemi'
                },
                {
                    id: 'step6-pericarditis',
                    title: 'Akut Perikarditis (Diffus Hængekøje ST-elevation)',
                    badge: 'Konkav ST-elevation',
                    subtitle: 'Generel perikardial irritation uden koronar anatomisk grænse',
                    caption: 'Patient med akutte pleuritiske brystsmerter. ST-elevationerne er diffust til stede i næsten alle afledninger, har konkav ("hængekøje") form og mangler reciprokke depressioner (undtagen aVR).',
                    keyPoints: [
                        'Konkav ("glad") ST-elevation',
                        'Diffus udbredelse på tværs af koronarterritorier',
                        'Ingen reciprokke depressioner (bortset fra aVR)',
                        'Ledsagende PR-depression i afledning II'
                    ],
                    src: pericarditis1,
                    caseId: 'pericarditis'
                },
                {
                    id: 'step6-hyperk',
                    title: 'Hyperkaliæmi (Høje Teltede T-takker)',
                    badge: 'Spidse Telt-T-takker',
                    subtitle: 'Accelereret repolarisering ved forhøjet kalium (> 6,5 mmol/L)',
                    caption: 'Svær hyperkaliæmi hos nyresvigtpatient. T-takkerne er symmetriske, spidse og ekstremt høje ("teltede") med smal base i de prækordiale afledninger.',
                    keyPoints: [
                        'Symmetriske, spidse, teltede T-takker',
                        'Meget smal base på T-takken',
                        'Kan hurtigt progrediere til sinusbølge og hjertestop',
                        'Akut behandlingskrævende medicinsk nødsituation'
                    ],
                    src: hyperkalemia1,
                    caseId: 'hyperkalemia'
                },
                {
                    id: 'step6-posterior-stemi',
                    title: 'Akut Posteriort STEMI (Bagvægsinfarkt Spejlbillede)',
                    badge: 'Spejlbilled ST-Depression',
                    subtitle: 'Horisontal ST-depression i V1-V3 som spejlbillede af bagvæg',
                    caption: 'Livstruende infarkt der ofte overses! De anteriore afledninger V1-V3 kigger bagfra på hjertet og viser derfor horisontal ST-depression og høje R-takker. Bekræftes med posterior optagelse (V7-V9).',
                    keyPoints: [
                        'Horisontal ST-depression ≥ 0,5 mm i V1-V3',
                        'Høj, bred R-tak i V1-V2 (R/S ratio > 1)',
                        'Positiv, opretstående T-tak i V1-V2',
                        'Indikation for optagelse af dorsale afledninger V7-V9'
                    ],
                    src: posteriorStemi1,
                    caseId: 'posterior_stemi'
                },
                {
                    id: 'step6-hypokalemia',
                    title: 'Hypokaliæmi (Affladet T-tak & Kæmpe U-takker)',
                    badge: 'U-Tak Repolarisering',
                    subtitle: 'Kæmpe U-bølger der simulerer forlænget QT-interval (QU-fænomen)',
                    caption: 'Typisk optagelse ved udtalt hypokaliæmi. T-takken er flad eller let inverteret, efterfulgt af en kæmpe positiv U-tak i V2-V4. Giver øget sårbarhed for maligne ventrikulære takyarytmier.',
                    keyPoints: [
                        'Affladet, bifasisk eller negativ T-tak',
                        'Prominent U-tak (> 1-2 mm) umiddelbart efter T-takken',
                        'Pseudoforlænget QT (reelt et QU-interval)',
                        'Høj risiko for ventrikulære ekstrasystoler og VT'
                    ],
                    src: hypokalemia1,
                    caseId: 'hypokalemia'
                }
            ]
        },
        {
            id: 7,
            title: '7. QT/QTc-interval',
            subtitle: 'Måling, Bazetts korrektion og psykofarmaka risikovurdering',
            badge: 'Trin 7',
            targetTab: 'viewer',
            tabLabel: 'Afprøv i 12-Aflednings Viser',
            content: (
                <div className="space-y-4 text-xs leading-relaxed text-[#3A4A40]">
                    <p>
                        QT-intervallet repræsenterer den samlede tid for ventriklernes depolarisering og repolarisering. Da QT naturligt afkortes ved hurtig puls og forlænges ved langsom puls, skal det altid <strong>frekvenskorrigeres (QTc)</strong>.
                    </p>

                    <div className="p-4 bg-white rounded-2xl border border-[#E8E4D9] shadow-xs">
                        <strong className="block text-[#3A4A40] font-bold mb-2 text-sm">Hampton Tommelfingerregel:</strong>
                        <p className="text-[#839788] mb-3">
                            Ved normal puls (60–80/min) bør T-takkens afslutning altid ligge <strong>inden halvvejen</strong> til det næste QRS-kompleks!
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                                <strong className="text-emerald-900 block font-bold">Normalt QTc</strong>
                                <span className="text-emerald-700 text-xs font-mono">&lt; 440 ms (Mænd)<br />&lt; 460 ms (Kvinder)</span>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                                <strong className="text-amber-900 block font-bold">Gråzone / Forlænget</strong>
                                <span className="text-amber-700 text-xs font-mono">450–480 ms<br />Øget monitorering</span>
                            </div>
                            <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                                <strong className="text-red-900 block font-bold">Kritisk Forlænget</strong>
                                <span className="text-red-700 text-xs font-mono">&gt; 500 ms (eller &Delta; &gt; 60 ms)<br />Høj Torsade-risiko!</span>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            images: [
                {
                    id: 'step7-longqt1',
                    title: 'Forlænget QTc-interval (> 500 ms)',
                    badge: 'Kritisk Forlænget QTc',
                    subtitle: 'Forsinket repolarisering & T-bølge forbi midtpunkt af R-R',
                    caption: 'Patient i psykofarmakologisk behandling med citalopram og quetiapin. QTc måles til over 500 ms. Hampton tommelfingerregel: T-takken afsluttes tydeligt forbi det halve afstanden til næste R-tak.',
                    keyPoints: [
                        'QTc > 500 ms (højeste kardiologiske risikoklasse)',
                        'T-tak slutter langt forbi midtpunktet af R-R intervallet',
                        'Høj risiko for tidlige efterdepolariseringer (EAD)',
                        'Klinisk indikation for dosisreduktion eller præparatskift'
                    ],
                    src: longQtc1,
                    caseId: 'long_qtc'
                },
                {
                    id: 'step7-torsades',
                    title: 'Ventrikulær Arytmi & Torsades de Pointes Risiko',
                    badge: 'Malign Arytmirisiko',
                    subtitle: 'Livstruende arytmiudvikling udløst af forlænget repolarisering',
                    caption: 'Tracing fra patient med langt QT-syndrom, som har udviklet hurtig ventrikulær takykardi. R-på-T fænomen under den sårbare repolariseringsfase kan udløse Torsades de Pointes og ventrikelflimren.',
                    keyPoints: [
                        'R-på-T fænomen i den forlængede repolariseringsfase',
                        'Spindende polaritetsakse ved polymorf VT / Torsades',
                        'Hæmodynamisk ustabilitet, nærsynkope og hjertestop',
                        'Akut behandling med magnesiumsulfat IV og defibrillering'
                    ],
                    src: vt2,
                    caseId: 'vt'
                },
                {
                    id: 'step7-longqt2',
                    title: 'Monitorering af QTc under Psykofarmakologisk Behandling',
                    badge: 'Klinisk Telemetri',
                    subtitle: 'Opfølgende 12-aflednings kontrol i hospitalsregi',
                    caption: 'Kontrol-EKG hos psykiatrisk patient. Viser hvordan præcis måling af QT (fra start af Q-tak til T-takkens tilbagevenden til grundlinjen via tangens-metoden) sikrer korrekt dosering.',
                    keyPoints: [
                        'Tangens-metoden langs T-takkens stejleste nedadgående hældning',
                        'Bazetts formel: QTc = QT / sqrt(RR i sekunder)',
                        'Baseline-EKG altid påkrævet før opstart af proarytmiske stoffer',
                        'Kontrol-EKG ved dosisøgning eller kombinationsbehandling'
                    ],
                    src: longQtc2,
                    caseId: 'long_qtc'
                }
            ]
        }
    ];

    const currentStepObj = steps.find(s => s.id === activeStep) || steps[0];

    return (
        <div className="w-full flex flex-col md:flex-row gap-6 max-w-[1400px] mx-auto">
            {/* Responsiv horisontal stepper på mobil / tablet */}
            <div className="flex md:hidden overflow-x-auto gap-2 p-1.5 bg-[#F2F6F3] rounded-2xl border border-[#E8E4D9] pb-2">
                {steps.map(s => {
                    const isActive = activeStep === s.id;
                    return (
                        <button
                            key={s.id}
                            onClick={() => setActiveStep(s.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border ${isActive
                                ? 'bg-[#839788] text-white border-[#6A7A6E] shadow-sm'
                                : 'bg-white/80 text-[#3A4A40] border-[#E8E4D9]'
                                }`}
                        >
                            <span>Trin {s.id}</span>
                        </button>
                    );
                })}
            </div>

            {/* Sidebar Navigation: Vælg trin (synlig på desktop) */}
            <div className="hidden md:flex w-72 glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/80 shadow-sm shrink-0 flex-col gap-2">
                <div className="flex items-center gap-2 pb-3 mb-2 border-b border-[#E8E4D9]">
                    <BookOpen className="w-5 h-5 text-[#839788]" />
                    <h3 className="font-bold text-sm text-[#3A4A40]">Hamptons 7 Trin</h3>
                </div>

                <div className="space-y-1.5">
                    {steps.map(s => {
                        const isActive = activeStep === s.id;
                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveStep(s.id)}
                                className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between border ${isActive
                                    ? 'bg-[#839788] text-white border-[#6A7A6E] shadow-sm font-bold'
                                    : 'bg-white/60 text-[#3A4A40] border-[#E8E4D9] hover:bg-[#F2F6F3]'
                                    }`}
                            >
                                <div>
                                    <span className="block text-xs font-bold leading-tight">{s.title}</span>
                                    <span className={`text-[10px] block mt-0.5 ${isActive ? 'text-white/80' : 'text-[#839788]'}`}>
                                        {s.badge}
                                    </span>
                                </div>
                                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1' : 'opacity-40'}`} />
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Indholdsområde for det valgte trin */}
            <div className="flex-1 glass-panel rounded-3xl p-6 md:p-8 border border-[#E8E4D9] bg-white/90 shadow-sm flex flex-col justify-between">
                <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#E8E4D9]">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#839788]">
                                {currentStepObj.badge}
                            </span>
                            <h2 className="text-2xl font-bold text-[#3A4A40]">
                                {currentStepObj.title}
                            </h2>
                            <p className="text-xs text-[#839788] mt-1">
                                {currentStepObj.subtitle}
                            </p>
                        </div>

                        {onNavigateTab && currentStepObj.targetTab && (
                            <button
                                onClick={() => onNavigateTab(currentStepObj.targetTab)}
                                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#F2F6F3] text-[#3A4A40] border border-[#E8E4D9] hover:bg-[#E2E8DF] transition-colors shadow-2xs"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                {currentStepObj.tabLabel}
                            </button>
                        )}
                    </div>

                    {/* Trinets teoretiske og kliniske gennemgang */}
                    {currentStepObj.content}

                    {/* DEDIKERET SEKTION: KLINISKE BILLEDEKSEMPLER FOR DETTE TRIN */}
                    {currentStepObj.images && currentStepObj.images.length > 0 && (
                        <div className="mt-8 pt-6 border-t-2 border-[#839788]/20 animate-fadeIn">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="bg-[#839788] p-2 rounded-xl text-white shadow-xs">
                                        <Eye className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[#3A4A40] leading-tight">
                                            Kliniske Billedeksempler for {currentStepObj.title} ({currentStepObj.images.length})
                                        </h3>
                                        <p className="text-xs text-[#839788]">
                                            Autentiske hospitalsscans der illustrerer netop dette trin i tolkningen
                                        </p>
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold px-3 py-1 rounded-xl bg-[#EFF3F0] text-[#3A4A40] border border-[#D9E1DA]">
                                    🔍 Klik på et billede for at forstørre
                                </span>
                            </div>

                            {/* Galleri over de kliniske eksempler */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {currentStepObj.images.map((img) => (
                                    <div 
                                        key={img.id}
                                        className="group bg-white rounded-2xl border border-[#E8E4D9] hover:border-[#839788]/60 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                                    >
                                        {/* Billede med hover zoom overlay */}
                                        <div 
                                            onClick={() => setSelectedModalImage(img)}
                                            className="relative aspect-[16/10] bg-[#1a231f] cursor-pointer overflow-hidden"
                                            title="Klik for at forstørre scan"
                                        >
                                            <img 
                                                src={img.src} 
                                                alt={img.title}
                                                className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-[1.04]"
                                                loading="lazy"
                                            />
                                            {/* Badge */}
                                            <div className="absolute top-2 left-2">
                                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-[#2C3F34] shadow-xs backdrop-blur-xs border border-[#E8E4D9]">
                                                    {img.badge}
                                                </span>
                                            </div>
                                            {/* Hover Zoom Prompt */}
                                            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-bold">
                                                <ZoomIn className="w-4 h-4 text-white" />
                                                <span>Forstør Scan</span>
                                            </div>
                                        </div>

                                        {/* Tekst og kliniske kendetegn */}
                                        <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-gradient-to-b from-white to-[#FAF9F6]">
                                            <div>
                                                <h4 className="font-bold text-xs text-[#3A4A40] group-hover:text-[#2C3F34] leading-snug">
                                                    {img.title}
                                                </h4>
                                                {img.subtitle && (
                                                    <p className="text-[10px] font-medium text-[#839788] mt-0.5">
                                                        {img.subtitle}
                                                    </p>
                                                )}
                                                <p className="text-[11px] text-[#5C6B61] mt-2 leading-relaxed">
                                                    {img.caption}
                                                </p>
                                                {img.keyPoints && img.keyPoints.length > 0 && (
                                                    <div className="mt-2.5 pt-2 border-t border-[#E8E4D9]/60">
                                                        <span className="text-[10px] font-bold text-[#839788] uppercase tracking-wider block mb-1">
                                                            Hvad du skal se efter:
                                                        </span>
                                                        <ul className="space-y-1 text-[11px] text-[#3A4A40]">
                                                            {img.keyPoints.map((pt, i) => (
                                                                <li key={i} className="flex items-start gap-1.5">
                                                                    <span className="text-emerald-700 font-bold shrink-0">✓</span>
                                                                    <span className="leading-tight">{pt}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Handlinger i bunden af kortet */}
                                            <div className="pt-3 border-t border-[#E8E4D9]/80 flex items-center justify-between gap-2">
                                                <button
                                                    onClick={() => setSelectedModalImage(img)}
                                                    className="flex items-center gap-1.5 text-[11px] font-bold text-[#839788] hover:text-[#3A4A40] transition-colors"
                                                >
                                                    <ZoomIn className="w-3.5 h-3.5" />
                                                    <span>Forstør</span>
                                                </button>
                                                {img.caseId && onSelectCase && (
                                                    <button
                                                        onClick={() => onSelectCase(img.caseId)}
                                                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#EFF3F0] hover:bg-[#E2E8DF] text-[11px] font-bold text-[#2C3F34] border border-[#D9E1DA] transition-colors"
                                                        title="Åbn denne case direkte i 12-afledningsviseren"
                                                    >
                                                        <span>12-Aflednings EKG</span>
                                                        <ChevronRight className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Trin Frem / Tilbage Knapper */}
                <div className="flex justify-between items-center pt-6 mt-8 border-t border-[#E8E4D9]">
                    <button
                        disabled={activeStep === 1}
                        onClick={() => {
                            setActiveStep(prev => Math.max(1, prev - 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeStep === 1
                            ? 'opacity-40 cursor-not-allowed text-[#839788]'
                            : 'bg-[#F2F6F3] text-[#3A4A40] border border-[#E8E4D9] hover:bg-[#E2E8DF]'
                            }`}
                    >
                        Forrige Trin
                    </button>

                    <button
                        disabled={activeStep === steps.length}
                        onClick={() => {
                            setActiveStep(prev => Math.min(steps.length, prev + 1));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${activeStep === steps.length
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 opacity-90'
                            : 'bg-[#839788] text-white hover:bg-[#6A7A6E] shadow-sm'
                            }`}
                    >
                        {activeStep === steps.length ? (
                            <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                                <span>Alle 7 Trin Gennemgået</span>
                            </>
                        ) : (
                            <span>Næste Trin ({activeStep + 1} / {steps.length})</span>
                        )}
                    </button>
                </div>
            </div>

            {/* LIGHTBOX FORSTØRRELSES-MODAL FOR KLINISKE SCANS */}
            {selectedModalImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fadeIn"
                    onClick={() => setSelectedModalImage(null)}
                >
                    <div 
                        className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-white/20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="p-4 md:px-6 md:py-4 bg-[#F2F6F3] border-b border-[#E8E4D9] flex items-center justify-between gap-4 shrink-0">
                            <div className="flex items-center gap-3">
                                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-[#2C3F34] border border-[#D9E1DA] shadow-2xs">
                                    {selectedModalImage.badge}
                                </span>
                                <div>
                                    <h3 className="font-bold text-base text-[#3A4A40] leading-tight">
                                        {selectedModalImage.title}
                                    </h3>
                                    {selectedModalImage.subtitle && (
                                        <p className="text-xs text-[#839788]">{selectedModalImage.subtitle}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {selectedModalImage.caseId && onSelectCase && (
                                    <button
                                        onClick={() => {
                                            const cid = selectedModalImage.caseId;
                                            setSelectedModalImage(null);
                                            onSelectCase(cid);
                                        }}
                                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#3A4A40] hover:bg-[#2C3F34] text-white text-xs font-bold transition-all shadow-xs"
                                    >
                                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                        <span>Åbn i 12-Aflednings Viser</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => setSelectedModalImage(null)}
                                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white/80 transition-colors"
                                    title="Luk (Esc)"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Billede */}
                        <div className="flex-1 bg-[#101713] p-2 md:p-4 overflow-auto flex items-center justify-center min-h-[280px]">
                            <img 
                                src={selectedModalImage.src} 
                                alt={selectedModalImage.title}
                                className="max-w-full max-h-[62vh] object-contain rounded-lg shadow-lg border border-white/10"
                            />
                        </div>

                        {/* Modal Forklaring & Kliniske pointers */}
                        <div className="p-4 md:p-5 bg-white border-t border-[#E8E4D9] shrink-0 text-xs text-[#3A4A40] flex flex-col md:flex-row gap-4 items-start justify-between">
                            <div className="flex-1">
                                <p className="text-xs text-[#3A4A40] leading-relaxed">
                                    {selectedModalImage.caption}
                                </p>
                                {selectedModalImage.keyPoints && (
                                    <div className="mt-2.5 flex flex-wrap gap-2">
                                        {selectedModalImage.keyPoints.map((pt, i) => (
                                            <span key={i} className="px-2.5 py-1 rounded-lg bg-[#F2F6F3] text-[#2C3F34] text-[11px] font-medium border border-[#E8E4D9]">
                                                ✓ {pt}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setSelectedModalImage(null)}
                                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F2F6F3] text-[#3A4A40] hover:bg-[#E2E8DF] border border-[#E8E4D9] transition-colors shrink-0 self-end md:self-auto"
                            >
                                Luk Visning
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
