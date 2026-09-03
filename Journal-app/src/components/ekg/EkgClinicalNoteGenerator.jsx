import React, { useState, useEffect } from 'react';
import {
    FileText,
    Copy,
    Check,
    RotateCcw,
    Printer,
    Sparkles,
    AlertTriangle,
    ShieldAlert,
    CheckCircle2,
    Info,
    ChevronRight
} from '../Icons';

export default function EkgClinicalNoteGenerator({ activeCase, onNavigateTab }) {
    // Formular felter
    const [indication, setIndication] = useState('Før opstart af psykofarmaka');
    const [rhythm, setRhythm] = useState('Sinusrytme, regelmæssig');
    const [heartRate, setHeartRate] = useState(72);
    const [axis, setAxis] = useState('Normal akse');
    const [prInterval, setPrInterval] = useState(160);
    const [prStatus, setPrStatus] = useState('Normal overledning (120-200 ms)');
    const [qrsDuration, setQrsDuration] = useState(85);
    const [qrsMorphology, setQrsMorphology] = useState('Smalle komplekser (<120 ms), intet grenblok');
    const [qtcInterval, setQtcInterval] = useState(415);
    const [qtcFormula, setQtcFormula] = useState('Fridericia (DCS/DPS standard)');
    const [qtcCategory, setQtcCategory] = useState('Normalt QTc (<450 ms mænd / <460 ms kvinder)');
    const [stSegment, setStSegment] = useState('Ingen ST-elevationer eller -depressioner');
    const [tWave, setTWave] = useState('Normale opretstående T-takker');
    const [hypertrophy, setHypertrophy] = useState('Ingen hypertrofitegn (Sokolow-Lyon / Cornell normale)');
    const [pathologicalQ, setPathologicalQ] = useState('Ingen patologiske Q-takker');
    const [conclusion, setConclusion] = useState('Normalt 12-aflednings EKG');
    const [actionPlan, setActionPlan] = useState('Psykofarmakologisk behandling kan iværksættes som planlagt.');
    const [physicianNote, setPhysicianNote] = useState('');

    const [copied, setCopied] = useState(false);

    // Forudfyld fra aktiv case hvis brugeren ønsker det
    const handleLoadCaseData = () => {
        if (!activeCase) return;

        setRhythm(activeCase.rhythm || 'Sinusrytme');
        setHeartRate(activeCase.heartRate || 72);
        setAxis(activeCase.axis || 'Normal akse');

        const prParsed = parseInt(activeCase.prInterval, 10) || 160;
        setPrInterval(prParsed);
        setPrStatus(prParsed > 200 ? 'Forlænget PR (AV-blok 1. grad)' : 'Normal overledning (120-200 ms)');

        const qrsParsed = parseInt(activeCase.qrsDuration, 10) || 85;
        setQrsDuration(qrsParsed);
        if (activeCase.id === 'lbbb') setQrsMorphology('Venstresidigt grenblok (LBBB)');
        else if (activeCase.id === 'rbbb') setQrsMorphology('Højresidigt grenblok (RBBB)');
        else setQrsMorphology(qrsParsed >= 120 ? 'Breddeøget QRS (≥120 ms)' : 'Smalle komplekser (<120 ms), intet grenblok');

        const qtcParsed = parseInt(activeCase.qtc, 10) || 415;
        setQtcInterval(qtcParsed);
        if (qtcParsed >= 500) setQtcCategory('Kritisk forlænget QTc (≥500 ms) - Torsades risiko!');
        else if (qtcParsed >= 460) setQtcCategory('Forlænget QTc (Gråzone 460-500 ms)');
        else setQtcCategory('Normalt QTc (<450 ms mænd / <460 ms kvinder)');

        if (activeCase.id.includes('stemi')) {
            setStSegment(`Akutte ST-elevationer i ${activeCase.affectedLeads?.join(', ') || 'relevante afledninger'}`);
            setConclusion(`Obs. Akut Myokardieinfarkt (${activeCase.title})`);
            setActionPlan('AKUT KAG-kald / 112 visitation. Telemetri, hjertemagnyl, nitroglycerin ved smerter.');
        } else if (activeCase.id === 'qtc_prolongation') {
            setConclusion('Signifikant medicin-induceret QTc-forlængelse (>500 ms)');
            setActionPlan('Dosisreduktion eller seponering af mistænkt psykofarmakon. Elektrolytkontrol (K+, Mg2+). Kontrol-EKG om 7 dage.');
        } else if (activeCase.id === 'hypokalemia') {
            setStSegment('Let ST-depression');
            setTWave('Affladede T-takker med prominente U-takker (simuleret langt QT)');
            setConclusion('Elektrokardiografisk mistanke om svær hypokaliæmi');
            setActionPlan('Akut S-kalium og S-magnesium. Kaliumsubstitution p.o./i.v. Gentag EKG efter elektrolytkorrektion.');
        } else {
            setConclusion(activeCase.title || 'Normalt EKG');
            setActionPlan('Klinisk opfølgning jf. indikation.');
        }
    };

    // Generer færdigt journalnotat efter Sundhed.dk / DCS NBV standard
    const generateJournalText = () => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('da-DK', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });

        return `--- EKG-BESKRIVELSE (12-afledninger) ---
Dato & Tid: ${dateStr} kl. ${timeStr}
Indikation: ${indication}

1. Rytme & Frekvens:
   - Rytme: ${rhythm}
   - Hjertefrekvens: ${heartRate} bpm (${heartRate < 50 ? 'bradykardi' : heartRate > 100 ? 'takykardi' : 'normofrekvent'})
   - Elektrisk akse: ${axis}

2. Ledningsforhold:
   - PR-interval: ${prInterval} ms (${prStatus})
   - QRS-varighed: ${qrsDuration} ms (${qrsMorphology})
   - QTc-interval: ${qtcInterval} ms (${qtcFormula}) - ${qtcCategory}

3. Morfologi & Repolarisering:
   - P-tak: ${rhythm.includes('flimren') ? 'Ingen synlige P-takker (flimrelinje)' : 'Ensartede positive P-takker i afledning II'}
   - Q-takker: ${pathologicalQ}
   - Hypertrofi: ${hypertrophy}
   - ST-segment: ${stSegment}
   - T-takker: ${tWave}

4. Konklusion:
   ${conclusion}

5. Plan & Videre Håndtering:
   ${actionPlan}${physicianNote ? `\n\nSupplerende lægenotat: ${physicianNote}` : ''}
----------------------------------------`;
    };

    const handleCopy = () => {
        const text = generateJournalText();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="glass-panel rounded-3xl p-6 border border-[#E8E4D9] bg-white/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#839788] p-2.5 rounded-2xl text-white shadow-xs">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#3A4A40] leading-tight">
                            Klinisk EKG-Beskriver & Journalnotat
                        </h2>
                        <p className="text-xs text-[#839788]">
                            Struktureret standardjournalnotat efter Dansk Cardiologisk Selskab (DCS) & Lægehåndbogen
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {activeCase && (
                        <button
                            onClick={handleLoadCaseData}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#EFF3F0] text-[#3A4A40] hover:bg-[#E2E8DF] border border-[#D9E1DA] transition-all"
                            title="Indlæs parametre fra den aktuelt valgte case"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            Indlæs fra aktiv case ({activeCase.title.split(' ')[0]}...)
                        </button>
                    )}
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${copied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#839788] text-white hover:bg-[#6A7A6E]'
                            }`}
                    >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Kopieret til EPJ!' : 'Kopiér Notat'}
                    </button>
                    <button
                        onClick={handlePrint}
                        className="p-2 rounded-xl border border-[#E8E4D9] text-[#3A4A40] hover:bg-[#F2F6F3] transition-colors"
                        title="Udskriv eller gem som PDF"
                    >
                        <Printer className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Hovedindhold i to søjler */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Venstre Søjle: Interaktiv Tolkningsformular (7 Søjler) */}
                <div className="lg:col-span-7 flex flex-col gap-4">
                    {/* Sektion 1: Indikation & Rytme */}
                    <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/90 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-[#3A4A40] flex items-center gap-2 pb-2 border-b border-[#E8E4D9]">
                            <span className="w-5 h-5 rounded-full bg-[#839788] text-white text-[11px] flex items-center justify-center font-mono">1</span>
                            Indikation & Rytme
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1.5">
                                Klinisk Indikation
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    'Før opstart af psykofarmaka',
                                    'Dosisøgning / Kontrol-EKG',
                                    'Rutine-EKG før ECT',
                                    'Brystsmerter / Akut iskæmi-obs',
                                    'Synkope / Nærsynkope',
                                    'Hjertebanken / Palpitationer',
                                    'Mistanke om elektrolytforstyrrelse'
                                ].map(ind => (
                                    <button
                                        key={ind}
                                        onClick={() => setIndication(ind)}
                                        className={`px-3 py-1.5 rounded-xl text-xs transition-all border ${indication === ind
                                            ? 'bg-[#839788] text-white border-[#6A7A6E] font-bold shadow-xs'
                                            : 'bg-[#F9F8F6] text-[#3A4A40] border-[#E8E4D9] hover:bg-[#EFF3F0]'
                                            }`}
                                    >
                                        {ind}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div>
                                <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1">
                                    Hjerterytme
                                </label>
                                <select
                                    value={rhythm}
                                    onChange={(e) => setRhythm(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#F9F8F6] border border-[#E8E4D9] rounded-xl text-xs font-bold text-[#3A4A40] focus:outline-none focus:border-[#839788]"
                                >
                                    <option value="Sinusrytme, regelmæssig">Sinusrytme, regelmæssig</option>
                                    <option value="Sinustakykardi (>100 bpm)">Sinustakykardi (&gt;100 bpm)</option>
                                    <option value="Sinusbradykardi (<50 bpm)">Sinusbradykardi (&lt;50 bpm)</option>
                                    <option value="Sinusarytmi (respiratorisk)">Sinusarytmi (respiratorisk)</option>
                                    <option value="Atrieflimren med uregelmæssig aktion">Atrieflimren</option>
                                    <option value="Atrieflagren (savtaksbølger)">Atrieflagren</option>
                                    <option value="Ventrikulær takykardi (VT)">Ventrikulær takykardi (VT)</option>
                                    <option value="Ektopisk atriel rytme">Ektopisk atriel rytme</option>
                                    <option value="Nodal rytme">Nodal rytme</option>
                                </select>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-bold text-[#839788] uppercase tracking-wider">Hjertefrekvens</span>
                                    <span className="font-bold font-mono text-[#3A4A40]">{heartRate} bpm</span>
                                </div>
                                <input
                                    type="range"
                                    min="35"
                                    max="160"
                                    value={heartRate}
                                    onChange={(e) => setHeartRate(parseInt(e.target.value))}
                                    className="w-full h-2 bg-[#E2E8DF] rounded-lg appearance-none cursor-pointer accent-[#839788]"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1">
                                Elektrisk Hjerteakse (I og II metoden)
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {[
                                    { id: 'Normal akse', label: 'Normal akse (-30° til +90°)' },
                                    { id: 'Venstredrejet akse (LAD)', label: 'Venstredrejet (LAD)' },
                                    { id: 'Højredrejet akse (RAD)', label: 'Højredrejet (RAD)' },
                                    { id: 'Ekstrem akse', label: 'Ekstrem nordvest' }
                                ].map(ax => (
                                    <button
                                        key={ax.id}
                                        onClick={() => setAxis(ax.id)}
                                        className={`p-2 rounded-xl text-xs text-center border transition-all ${axis === ax.id
                                            ? 'bg-white font-bold text-[#3A4A40] border-[#839788] shadow-xs'
                                            : 'bg-[#F9F8F6] text-[#839788] border-[#E8E4D9]'
                                            }`}
                                    >
                                        {ax.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sektion 2: Ledningsforhold (PR, QRS, QTc) */}
                    <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/90 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-[#3A4A40] flex items-center gap-2 pb-2 border-b border-[#E8E4D9]">
                            <span className="w-5 h-5 rounded-full bg-[#839788] text-white text-[11px] flex items-center justify-center font-mono">2</span>
                            Ledningsintervaller (PR, QRS, QTc)
                        </h3>

                        {/* PR-interval */}
                        <div className="p-3 bg-[#F9F8F6] rounded-2xl border border-[#E8E4D9]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-[#3A4A40]">PR-interval: {prInterval} ms</span>
                                <span className="text-[11px] text-[#839788]">Normal: 120–200 ms</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    { label: 'Normal overledning (120-200 ms)', ms: 160 },
                                    { label: 'AV-blok 1. grad (>200 ms)', ms: 230 },
                                    { label: 'AV-blok 2. grad Mobitz I (Wenckebach)', ms: 240 },
                                    { label: 'AV-blok 2. grad Mobitz II (Konstant PR)', ms: 170 },
                                    { label: 'AV-blok 3. grad (Totalblok / Dissociation)', ms: 160 },
                                    { label: 'Kort PR (<120 ms / WPW obs)', ms: 105 }
                                ].map(p => (
                                    <button
                                        key={p.label}
                                        onClick={() => {
                                            setPrStatus(p.label);
                                            setPrInterval(p.ms);
                                        }}
                                        className={`px-2.5 py-1 rounded-lg text-[11px] border transition-all ${prStatus === p.label
                                            ? 'bg-[#839788] text-white border-[#6A7A6E] font-bold'
                                            : 'bg-white text-[#3A4A40] border-[#E8E4D9]'
                                            }`}
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* QRS-varighed */}
                        <div className="p-3 bg-[#F9F8F6] rounded-2xl border border-[#E8E4D9]">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-[#3A4A40]">QRS-varighed: {qrsDuration} ms</span>
                                <span className="text-[11px] text-[#839788]">Normal: &lt; 120 ms</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    { label: 'Smalle komplekser (<120 ms), intet grenblok', ms: 85 },
                                    { label: 'Venstresidigt grenblok (LBBB)', ms: 140 },
                                    { label: 'Højresidigt grenblok (RBBB)', ms: 135 },
                                    { label: 'Inkomplet RBBB (100-119 ms)', ms: 105 },
                                    { label: 'Bredkomplekset ventrikulær rytme', ms: 155 }
                                ].map(q => (
                                    <button
                                        key={q.label}
                                        onClick={() => {
                                            setQrsMorphology(q.label);
                                            setQrsDuration(q.ms);
                                        }}
                                        className={`px-2.5 py-1 rounded-lg text-[11px] border transition-all ${qrsMorphology === q.label
                                            ? 'bg-[#839788] text-white border-[#6A7A6E] font-bold'
                                            : 'bg-white text-[#3A4A40] border-[#E8E4D9]'
                                            }`}
                                    >
                                        {q.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* QTc-interval */}
                        <div className="p-3 bg-[#EFF3F0] rounded-2xl border border-[#D9E1DA]">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <span className="text-xs font-bold text-[#2C3F34]">Korrigeret QTc: {qtcInterval} ms</span>
                                    <span className="text-[10px] text-[#839788] block">Beregnet jf. Fridericia (DCS & DPS standard)</span>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${qtcInterval >= 500
                                    ? 'bg-red-100 text-red-800 border border-red-200'
                                    : qtcInterval >= 460
                                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                    }`}>
                                    {qtcInterval >= 500 ? 'Kritisk' : qtcInterval >= 460 ? 'Gråzone' : 'Normal'}
                                </span>
                            </div>

                            <input
                                type="range"
                                min="340"
                                max="580"
                                value={qtcInterval}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    setQtcInterval(val);
                                    if (val >= 500) setQtcCategory('Kritisk forlænget QTc (≥500 ms) - Torsades risiko!');
                                    else if (val >= 460) setQtcCategory('Forlænget QTc (Gråzone 460-500 ms)');
                                    else setQtcCategory('Normalt QTc (<450 ms mænd / <460 ms kvinder)');
                                }}
                                className="w-full h-2 bg-[#E2E8DF] rounded-lg appearance-none cursor-pointer accent-[#839788] mb-2"
                            />

                            <div className="flex justify-between text-[10px] text-[#839788]">
                                <span>340 ms</span>
                                <span className="font-bold text-[#3A4A40]">&lt;450/460 ms (Normal)</span>
                                <span className="text-red-700 font-bold">&ge;500 ms (Kritisk)</span>
                                <span>580 ms</span>
                            </div>
                        </div>
                    </div>

                    {/* Sektion 3: Morfologi (ST-segment, T-tak, Hypertrofi, Q-takker) */}
                    <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/90 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-[#3A4A40] flex items-center gap-2 pb-2 border-b border-[#E8E4D9]">
                            <span className="w-5 h-5 rounded-full bg-[#839788] text-white text-[11px] flex items-center justify-center font-mono">3</span>
                            Morfologi, ST-T & Vægforandringer
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1">
                                    ST-Segment
                                </label>
                                <select
                                    value={stSegment}
                                    onChange={(e) => setStSegment(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#F9F8F6] border border-[#E8E4D9] rounded-xl text-xs font-bold text-[#3A4A40] focus:outline-none focus:border-[#839788]"
                                >
                                    <option value="Ingen ST-elevationer eller -depressioner">Ingen ST-elevationer / depressioner</option>
                                    <option value="Akutte konvekse ST-elevationer (STEMI-mistanke)">Akutte ST-elevationer (STEMI)</option>
                                    <option value="Horisontal/descenderende ST-depression (Iskæmi)">ST-depression (Iskæmi / NSTEMI)</option>
                                    <option value="Sekundær descenderende ST-depression (Strain)">Ventrikelbelastning ("Strain")</option>
                                    <option value="Diffus konkav ST-elevation og PR-depression (Perikarditis)">Perikarditis-forandringer</option>
                                    <option value="Skeformet ST-depression (Digoxin)">Digoxin-effekt</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1">
                                    T-Takker
                                </label>
                                <select
                                    value={tWave}
                                    onChange={(e) => setTWave(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#F9F8F6] border border-[#E8E4D9] rounded-xl text-xs font-bold text-[#3A4A40] focus:outline-none focus:border-[#839788]"
                                >
                                    <option value="Normale opretstående T-takker">Normale opretstående T-takker</option>
                                    <option value="Symmetrisk T-taks inversion (Iskæmi)">Symmetrisk T-inversion</option>
                                    <option value="Høje, spidse, teltformede T-takker (Hyperkaliæmi)">Spidse teltede T-takker (Hyperkaliæmi)</option>
                                    <option value="Affladede T-takker med prominente U-takker (Hypokaliæmi)">Affladet T + U-tak (Hypokaliæmi)</option>
                                    <option value="Bifasisk T-tak">Bifasiske T-takker</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div>
                                <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1">
                                    Patologiske Q-Takker
                                </label>
                                <select
                                    value={pathologicalQ}
                                    onChange={(e) => setPathologicalQ(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#F9F8F6] border border-[#E8E4D9] rounded-xl text-xs text-[#3A4A40] focus:outline-none focus:border-[#839788]"
                                >
                                    <option value="Ingen patologiske Q-takker">Ingen patologiske Q-takker</option>
                                    <option value="Patologisk Q forvæg (V1–V4)">Patologisk Q forvæg (V1–V4)</option>
                                    <option value="Patologisk Q inferior (II, III, aVF)">Patologisk Q inferior (II, III, aVF)</option>
                                    <option value="Patologisk Q lateral (I, aVL, V5–V6)">Patologisk Q lateral (I, aVL, V5–V6)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1">
                                    Ventrikelhypertrofi
                                </label>
                                <select
                                    value={hypertrophy}
                                    onChange={(e) => setHypertrophy(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#F9F8F6] border border-[#E8E4D9] rounded-xl text-xs text-[#3A4A40] focus:outline-none focus:border-[#839788]"
                                >
                                    <option value="Ingen hypertrofitegn (Sokolow-Lyon / Cornell normale)">Ingen hypertrofi</option>
                                    <option value="Venstre ventrikelhypertrofi (Sokolow-Lyon >35 mm / Cornell positiv)">Venstre ventrikelhypertrofi (LVH)</option>
                                    <option value="Højre ventrikelhypertrofi (Høj R i V1, dyb S i V6)">Højre ventrikelhypertrofi (RVH)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sektion 4: Konklusion & Handlingsplan */}
                    <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/90 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-[#3A4A40] flex items-center gap-2 pb-2 border-b border-[#E8E4D9]">
                            <span className="w-5 h-5 rounded-full bg-[#839788] text-white text-[11px] flex items-center justify-center font-mono">4</span>
                            Konklusion & Klinisk Handlingsplan
                        </h3>

                        <div>
                            <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1">
                                Samlet EKG Konklusion
                            </label>
                            <input
                                type="text"
                                value={conclusion}
                                onChange={(e) => setConclusion(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-[#E8E4D9] rounded-xl text-xs font-bold text-[#3A4A40] focus:outline-none focus:border-[#839788]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1">
                                Klinisk Handlingsplan & Opfølgning
                            </label>
                            <input
                                type="text"
                                value={actionPlan}
                                onChange={(e) => setActionPlan(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-[#E8E4D9] rounded-xl text-xs text-[#3A4A40] focus:outline-none focus:border-[#839788]"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1">
                                Yderligere Lægenotat (valgfrit)
                            </label>
                            <textarea
                                rows={2}
                                placeholder="F.eks. Patient informeret. S-kalium 4.2 mmol/L. Kontrol-EKG aftalt om 14 dage..."
                                value={physicianNote}
                                onChange={(e) => setPhysicianNote(e.target.value)}
                                className="w-full px-3 py-2 bg-white border border-[#E8E4D9] rounded-xl text-xs text-[#3A4A40] focus:outline-none focus:border-[#839788]"
                            />
                        </div>
                    </div>
                </div>

                {/* Højre Søjle: Færdigt Journalnotat til Kopiering & DCS Tjekliste */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    {/* Genereret Journalnotat Preview */}
                    <div className="glass-panel rounded-3xl p-6 border border-[#E8E4D9] bg-white/95 shadow-sm flex flex-col justify-between sticky top-24">
                        <div>
                            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E4D9]">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#839788]">
                                    Journalnotat (EPJ / SP / Lægesystem)
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                    Klar til indkopiering
                                </span>
                            </div>

                            <pre className="p-4 bg-[#1E293B] text-slate-100 rounded-2xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto shadow-inner border border-slate-700 max-h-[460px] overflow-y-auto selection:bg-emerald-600 selection:text-white">
                                {generateJournalText()}
                            </pre>
                        </div>

                        <div className="pt-4 flex flex-col gap-2">
                            <button
                                onClick={handleCopy}
                                className={`w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md ${copied
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-[#839788] text-white hover:bg-[#6A7A6E]'
                                    }`}
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? '✓ Kopieret til udklipsholder!' : 'Kopiér Notat til Udklipsholder'}
                            </button>

                            <p className="text-[11px] text-[#839788] text-center">
                                Tip: Tryk på knappen og indsæt direkte (Ctrl+V) i patientens EPJ-journal.
                            </p>
                        </div>
                    </div>

                    {/* Akutte Kardiologiske Alarmer (Røde Flag) */}
                    <div className="p-5 rounded-3xl bg-red-50 border border-red-200 text-red-950 text-xs space-y-2">
                        <div className="flex items-center gap-2 text-red-900 font-bold">
                            <AlertTriangle className="w-4 h-4" />
                            <span>Kardiologiske Røde Flag (Akut Visitation):</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-[11px] text-red-900">
                            <li><strong>STEMI-elevationer:</strong> &ge;2.0-2.5 mm i V2-V3 eller &ge;1.0 mm i øvrige afledninger $\rightarrow$ Akut PCI.</li>
                            <li><strong>Nyopstået LBBB med brystsmerter & Sgarbossa.</strong></li>
                            <li><strong>AV-blok 2. grad Mobitz II eller 3. grads AV-blok:</strong> Akut telemetri & pacemaker.</li>
                            <li><strong>QTc &ge; 500 ms ledsaget af synkope/nærsynkope:</strong> Mistanke om Torsades de Pointes.</li>
                            <li><strong>Bredkomplekset takykardi (&ge;120 ms):</strong> Behandles som VT indtil modbevist.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
