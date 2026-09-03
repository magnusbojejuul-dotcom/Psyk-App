import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, AlertTriangle, Compass, Activity, Sparkles, Info } from '../Icons';

export default function EkgSystematicGuide({ onNavigateTab }) {
    const [activeStep, setActiveStep] = useState(1);

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
            )
        },
        {
            id: 2,
            title: '2. Frekvens',
            subtitle: '300-reglen, 10-sekunders strimmelen og frekvensberegner',
            badge: 'Trin 2',
            targetTab: 'viewer',
            tabLabel: 'Mål frekvens med digital skydelære',
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
                            Ved uregelmæssig puls dur 300-reglen ikke. Tæl i stedet det totale antal QRS-komplekser på hele den 10 sekunders rytmestrimmel (standardark) og gang tallet med 6. (Eks. 14 slag på 10 sek $\times 6 = 84$ slag/min).
                        </p>
                    </div>
                </div>
            )
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

                    <div className="p-4 bg-white rounded-2xl border border-[#E8E4D9] shadow-xs">
                        <strong className="block text-[#3A4A40] font-bold mb-2 text-sm">Den Hurtige 2-Afledningsmetode (I og II):</strong>
                        <div className="space-y-2">
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
                    </div>
                </div>
            )
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
            )
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
            )
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
            )
        },
        {
            id: 7,
            title: '7. QT/QTc-interval',
            subtitle: 'Måling, Bazetts korrektion og psykofarmaka risikovurdering',
            badge: 'Trin 7',
            targetTab: 'qtc',
            tabLabel: 'Åbn Klinisk QTc-Beregner',
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
            )
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

                    {currentStepObj.content}
                </div>

                {/* Trin Frem / Tilbage Knapper */}
                <div className="flex justify-between items-center pt-6 mt-8 border-t border-[#E8E4D9]">
                    <button
                        disabled={activeStep === 1}
                        onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeStep === 1
                            ? 'opacity-40 cursor-not-allowed text-[#839788]'
                            : 'bg-[#F2F6F3] text-[#3A4A40] border border-[#E8E4D9] hover:bg-[#E2E8DF]'
                            }`}
                    >
                        Forrige Trin
                    </button>

                    <button
                        disabled={activeStep === steps.length}
                        onClick={() => setActiveStep(prev => Math.min(steps.length, prev + 1))}
                        className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeStep === steps.length
                            ? 'opacity-40 cursor-not-allowed text-[#839788]'
                            : 'bg-[#839788] text-white hover:bg-[#6A7A6E] shadow-sm'
                            }`}
                    >
                        Næste Trin ({activeStep + 1} / {steps.length})
                    </button>
                </div>
            </div>
        </div>
    );
}
