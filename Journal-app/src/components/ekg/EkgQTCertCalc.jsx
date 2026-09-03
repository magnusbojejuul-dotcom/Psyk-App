import React, { useState, useMemo } from 'react';
import { Activity, AlertTriangle, CheckCircle2, ShieldAlert, Info, Pill, RotateCcw, Search } from '../Icons';

export default function EkgQTCertCalc() {
    const [heartRate, setHeartRate] = useState(72);
    const [qtInterval, setQtInterval] = useState(400); // ms
    const [qrsDuration, setQrsDuration] = useState(85); // ms
    const [hasBundleBranchBlock, setHasBundleBranchBlock] = useState(false);
    const [baselineQTc, setBaselineQTc] = useState('');
    const [gender, setGender] = useState('male'); // 'male' | 'female'
    const [selectedFormula, setSelectedFormula] = useState('fridericia'); // Standard ifølge DPS/DCS
    const [drugSearch, setDrugSearch] = useState('');

    // RR-interval i sekunder
    const rrSec = heartRate > 0 ? 60 / heartRate : 1.0;
    const rrMs = Math.round(rrSec * 1000);
    const halfRrMs = Math.round(rrMs / 2);
    const qtSec = qtInterval / 1000;

    // Bazett: QTc = QT / sqrt(RR)
    const qtcBazett = Math.round((qtSec / Math.sqrt(rrSec)) * 1000);

    // Fridericia: QTc = QT / cbrt(RR) (Anbefalet af DCS & DPS)
    const qtcFridericia = Math.round((qtSec / Math.cbrt(rrSec)) * 1000);

    // Framingham: QTc = QT + 0.154 * (1 - RR)
    const qtcFramingham = Math.round((qtSec + 0.154 * (1 - rrSec)) * 1000);

    // Hodges: QTc = QT + 1.75 * (HR - 60)
    const qtcHodges = Math.round((qtSec + 0.00175 * (heartRate - 60)) * 1000);

    const activeQTC = selectedFormula === 'bazett'
        ? qtcBazett
        : selectedFormula === 'fridericia'
            ? qtcFridericia
            : selectedFormula === 'framingham'
                ? qtcFramingham
                : qtcHodges;

    // Justering ved bredt QRS / grenblok: QTc_korr = QTc - (QRS - 100)
    const isWideQrs = hasBundleBranchBlock || qrsDuration >= 120;
    const adjustedQTC = isWideQrs ? Math.max(300, activeQTC - (qrsDuration - 100)) : activeQTC;

    // Delta QTc fra baseline
    const parsedBaseline = parseInt(baselineQTc, 10);
    const deltaQTc = !isNaN(parsedBaseline) && parsedBaseline > 200 ? (activeQTC - parsedBaseline) : null;

    // Psykofarmaka database (Suppleret jf. DPS og kardiologiske retningslinjer)
    const PSYCH_DRUGS = [
        { name: 'Methadon', risk: 'high', group: 'Opioid substitution', note: 'Svær dosisafhængig forlængelse. Kræver altid baseline og opfølgende EKG.' },
        { name: 'Chlorprothixen (Truxal)', risk: 'high', group: 'Klassisk antipsykotikum / Sedativum', note: 'Meget hyppigt anvendt ved angst/uro i DK. Betydelig dosisafhængig forlængelse af QTc!' },
        { name: 'Citalopram', risk: 'high', group: 'SSRI', note: 'Maks. 20 mg/døgn til ældre (>65 år) eller nedsat leverfunktion. Maks. 40 mg til yngre.' },
        { name: 'Escitalopram', risk: 'high', group: 'SSRI', note: 'Maks. 10 mg/døgn til ældre (>65 år). Maks. 20 mg til yngre.' },
        { name: 'Haloperidol', risk: 'high', group: 'Klassisk antipsykotikum', note: 'Især ved i.v. administration eller høje doser. Bør undgås ved QTc > 460 ms.' },
        { name: 'Melperon', risk: 'high', group: 'Klassisk antipsykotikum', note: 'Udbredt i gerontopsykiatrien ved delirium og konfusion. Moderat-til-høj risiko for QTc-forlængelse.' },
        { name: 'Levomepromazin (Nozinan)', risk: 'high', group: 'Klassisk antipsykotikum / Sedativum', note: 'Hyppigt anvendt ved akut agitation og i palliation. Kræver stor agtpågivenhed og EKG-kontrol.' },
        { name: 'Sertindol', risk: 'high', group: 'Atypisk antipsykotikum', note: 'Stærkt QT-forlængende. Kræver specialistordination og regelmæssig EKG-monitorering.' },
        { name: 'Ziprasidon', risk: 'high', group: 'Atypisk antipsykotikum', note: 'Signifikant forlængelse, bør tages med måltid. Kontraindiceret ved kendt forlængelse.' },
        { name: 'Klorpromazin', risk: 'high', group: 'Klassisk antipsykotikum', note: 'Høj affinitet for hERG-kaliumkanaler.' },
        { name: 'Quetiapin', risk: 'moderate', group: 'Atypisk antipsykotikum', note: 'Moderat forlængelse, særligt ved høje doser eller i kombination.' },
        { name: 'Clozapin (Leponex)', risk: 'moderate', group: 'Atypisk antipsykotikum', note: 'Behandlingsrefraktær skizofreni. Kræver monitorering for både QTc og myokarditis/kardiomyopati.' },
        { name: 'Olanzapin', risk: 'moderate', group: 'Atypisk antipsykotikum', note: 'Moderat risiko. EKG anbefales ved elektrolytforstyrrelser eller hjerteanamnese.' },
        { name: 'Risperidon', risk: 'moderate', group: 'Atypisk antipsykotikum', note: 'Moderat forlængelse via metabolitten paliperidon.' },
        { name: 'Venlafaxin', risk: 'moderate', group: 'SNRI', note: 'Højdosisbehandling (>150-225 mg) kan forlænge QTc og øge blodtryk og puls.' },
        { name: 'Litium', risk: 'moderate', group: 'Stemningsstabiliserende', note: 'Kan medføre T-taks udfladning/inversion og sinusknudedysfunktion.' },
        { name: 'Amitriptylin', risk: 'moderate', group: 'TCA', note: 'Tricykliske antidepressiva forsinker både depolarisering (QRS) og repolarisering.' },
        { name: 'Nortriptylin', risk: 'moderate', group: 'TCA', note: 'TCA. Kræver monitorering af plasmakoncentration og EKG.' },
        { name: 'Clomipramin', risk: 'moderate', group: 'TCA', note: 'Kraftig blokade af flere ionkanaler.' },
        { name: 'Aripiprazol', risk: 'low', group: 'Atypisk antipsykotikum', note: 'Partiel D2-agonist. Minimal/ingen klinisk signifikant QTc-påvirkning. Førstevalg.' },
        { name: 'Lurasidon', risk: 'low', group: 'Atypisk antipsykotikum', note: 'Negligibel effekt på repolarisering. God kardial profil.' },
        { name: 'Brexpiprazol', risk: 'low', group: 'Atypisk antipsykotikum', note: 'Minimal effekt på QTc i kliniske doser.' },
        { name: 'Sertralin', risk: 'low', group: 'SSRI', note: 'Foretrukket SSRI ved kardiovaskulær komorbiditet eller grænsetilfælde.' },
        { name: 'Mirtazapin', risk: 'low', group: 'NaSSA', note: 'Lav risiko for QTc-forlængelse.' },
        { name: 'Vortioxetin', risk: 'low', group: 'Multimodalt antidepressivum', note: 'Ingen klinisk relevant påvirkning af QTc-intervallet fundet i studier.' },
        { name: 'Bupropion', risk: 'low', group: 'NDRI', note: 'Ingen effekt på kaliumkanaler / repolarisering.' }
    ];

    const filteredDrugs = useMemo(() => {
        if (!drugSearch.trim()) return PSYCH_DRUGS;
        const q = drugSearch.toLowerCase();
        return PSYCH_DRUGS.filter(d => d.name.toLowerCase().includes(q) || d.group.toLowerCase().includes(q) || d.note.toLowerCase().includes(q));
    }, [drugSearch]);

    // Risikostratificering ift. køn og officiel DPS / DCS retningslinje
    const getRiskStatus = (val, g, wideQrs) => {
        const thresholdNormal = g === 'male' ? 450 : 460;
        const thresholdBorderline = 480;

        if (val < thresholdNormal) {
            return {
                level: 'normal',
                title: 'Normalt QTc-interval',
                badge: 'Normal (Grøn)',
                color: 'text-emerald-800',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
                action: 'Behandling og dosisøgning kan iværksættes som planlagt uden særlige kardiale restriktioner.'
            };
        } else if (val <= thresholdBorderline) {
            return {
                level: 'borderline',
                title: `Let Forlænget QTc (Gråzone: ${g === 'male' ? '450' : '460'}–480 ms)`,
                badge: 'Gråzone (Gul)',
                color: 'text-amber-800',
                bgColor: 'bg-amber-50',
                borderColor: 'border-amber-200',
                action: 'Kontroller elektrolytter (S-kalium, S-magnesium). Undgå kombination med andre QT-forlængende stoffer eller CYP-hæmmere. Kontrol-EKG anbefales 1-2 uger efter steady state.'
            };
        } else if (val < 500) {
            return {
                level: 'pathological',
                title: 'Patologisk Forlænget QTc (> 480 ms)',
                badge: 'Patologisk (Orange)',
                color: 'text-orange-900',
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-300',
                action: 'Øget arytmirisiko! Overvej dosisreduktion eller præparatskift til lavrisiko (fx aripiprazol eller sertralin). Korriger hypokaliæmi. Kontrol-EKG inden for få dage.'
            };
        } else {
            return {
                level: 'critical',
                title: 'Kritisk Forlænget QTc (≥ 500 ms)',
                badge: 'Kritisk (Rød)',
                color: 'text-red-900',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-300',
                action: 'HØJ RISIKO FOR TORSADES DE POINTES! Omgående seponering eller dosisreduktion af det mistænkte præparat. Korriger elektrolytter. Telemetriovervågning ved synkope eller hjertebanken. Kardiologisk konference anbefales!'
            };
        }
    };

    const risk = getRiskStatus(adjustedQTC, gender, isWideQrs);

    // DPS / DCS Kardial Risikoscore for Torsades de Pointes
    const [riskFactors, setRiskFactors] = useState({
        age65: false,
        female: gender === 'female',
        heartDisease: false,
        bradycardia: heartRate < 50,
        hypokalemia: false,
        cypInhibitor: false,
        polypharmacy: false
    });

    const toggleRiskFactor = (key) => {
        setRiskFactors(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Beregn samlet kardial risikoscore
    const riskScore = (riskFactors.age65 ? 1 : 0) +
        (gender === 'female' ? 1 : 0) +
        (riskFactors.heartDisease ? 2 : 0) +
        (heartRate < 50 || riskFactors.bradycardia ? 1 : 0) +
        (riskFactors.hypokalemia ? 2 : 0) +
        (riskFactors.cypInhibitor ? 1 : 0) +
        (riskFactors.polypharmacy ? 2 : 0);

    return (
        <div className="w-full flex flex-col gap-6 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="glass-panel rounded-3xl p-6 border border-[#E8E4D9] bg-white/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-[#839788] p-2.5 rounded-2xl text-white shadow-xs">
                        <Activity className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#3A4A40] leading-tight">Klinisk QTc-Beregner & Psykofarmaka</h2>
                        <p className="text-xs text-[#839788]">Evidensbaseret beregning af frekvenskorrigeret QT og risikoprofil for psykotrope lægemidler</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Venstre Søjle: Interaktiv Beregner */}
                <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-[#E8E4D9] bg-white/90 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-base font-bold text-[#3A4A40] mb-4 pb-2 border-b border-[#E8E4D9]">
                            Patientdata & Målinger
                        </h3>

                        {/* Køn */}
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1.5">
                                Køn (Normalgrænser varierer)
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setGender('male')}
                                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${gender === 'male' ? 'bg-[#839788] text-white border-[#6A7A6E] shadow-sm' : 'bg-[#F9F8F6] text-[#3A4A40] border-[#E8E4D9]'}`}
                                >
                                    Mand (Normal &lt; 440 ms)
                                </button>
                                <button
                                    onClick={() => setGender('female')}
                                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${gender === 'female' ? 'bg-[#839788] text-white border-[#6A7A6E] shadow-sm' : 'bg-[#F9F8F6] text-[#3A4A40] border-[#E8E4D9]'}`}
                                >
                                    Kvinde (Normal &lt; 460 ms)
                                </button>
                            </div>
                        </div>

                        {/* Hjertefrekvens Slider */}
                        <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-bold text-[#3A4A40]">Hjertefrekvens (Puls):</span>
                                <span className="font-bold font-mono text-[#839788]">{heartRate} bpm (RR = {Math.round(rrSec * 1000)} ms)</span>
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

                        {/* Målt QT interval */}
                        <div className="mb-5">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="font-bold text-[#3A4A40]">Målt QT-interval på EKG:</span>
                                <span className="font-bold font-mono text-[#839788]">{qtInterval} ms</span>
                            </div>
                            <input
                                type="range"
                                min="250"
                                max="650"
                                value={qtInterval}
                                onChange={(e) => setQtInterval(parseInt(e.target.value))}
                                className="w-full h-2 bg-[#E2E8DF] rounded-lg appearance-none cursor-pointer accent-[#839788]"
                            />
                            <div className="flex justify-between text-[10px] text-[#839788] mt-1 font-mono">
                                <span>250 ms</span>
                                <span>Normalsnit ~400 ms</span>
                                <span>650 ms</span>
                            </div>
                        </div>

                        {/* QRS-bredde & Grenblok justering */}
                        <div className="mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-xs font-bold text-[#3A4A40]">QRS-varighed:</span>
                                <span className="text-xs font-mono font-bold text-[#839788]">{qrsDuration} ms {isWideQrs && '(Bredt QRS)'}</span>
                            </div>
                            <input
                                type="range"
                                min="70"
                                max="180"
                                value={qrsDuration}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    setQrsDuration(val);
                                    if (val >= 120) setHasBundleBranchBlock(true);
                                    else setHasBundleBranchBlock(false);
                                }}
                                className="w-full h-2 bg-[#E2E8DF] rounded-lg appearance-none cursor-pointer accent-[#839788]"
                            />
                            <div className="mt-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="lbbb_check"
                                    checked={hasBundleBranchBlock || qrsDuration >= 120}
                                    onChange={(e) => {
                                        setHasBundleBranchBlock(e.target.checked);
                                        if (e.target.checked && qrsDuration < 120) setQrsDuration(130);
                                        else if (!e.target.checked && qrsDuration >= 120) setQrsDuration(90);
                                    }}
                                    className="rounded border-slate-300 text-[#839788] focus:ring-0 cursor-pointer"
                                />
                                <label htmlFor="lbbb_check" className="text-[11px] font-semibold text-slate-700 cursor-pointer">
                                    Patient har grenblok (LBBB / RBBB) eller bredt QRS (≥ 120 ms)
                                </label>
                            </div>
                        </div>

                        {/* Baseline QTc sammenligning (valgfri) */}
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1">
                                Baseline QTc før medicinopstart (valgfri)
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="F.eks. 410"
                                    value={baselineQTc}
                                    onChange={(e) => setBaselineQTc(e.target.value)}
                                    className="w-full px-3 py-1.5 bg-white border border-[#E8E4D9] rounded-xl text-xs font-mono text-[#3A4A40] focus:outline-none focus:border-[#839788]"
                                />
                                <span className="text-xs font-mono text-[#839788]">ms</span>
                            </div>
                        </div>

                        {/* Valg af formel */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-bold text-[#839788] uppercase tracking-wider">
                                    Korrektionsformel
                                </label>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                    DCS & DPS anbefaler Fridericia
                                </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                                <button
                                    onClick={() => setSelectedFormula('bazett')}
                                    className={`p-2 rounded-xl border text-center transition-all ${selectedFormula === 'bazett' ? 'bg-white font-bold text-[#3A4A40] shadow-sm border-[#839788]' : 'bg-[#F9F8F6] text-[#839788] border-[#E8E4D9]'}`}
                                >
                                    Bazett <span className="block text-[9px] text-[#839788] font-normal">Klassisk</span>
                                </button>
                                <button
                                    onClick={() => setSelectedFormula('fridericia')}
                                    className={`p-2 rounded-xl border text-center transition-all ${selectedFormula === 'fridericia' ? 'bg-white font-bold text-[#3A4A40] shadow-sm border-[#839788]' : 'bg-[#F9F8F6] text-[#839788] border-[#E8E4D9]'}`}
                                >
                                    Fridericia <span className="block text-[9px] text-emerald-700 font-bold">Standard i DK</span>
                                </button>
                                <button
                                    onClick={() => setSelectedFormula('framingham')}
                                    className={`p-2 rounded-xl border text-center transition-all ${selectedFormula === 'framingham' ? 'bg-white font-bold text-[#3A4A40] shadow-sm border-[#839788]' : 'bg-[#F9F8F6] text-[#839788] border-[#E8E4D9]'}`}
                                >
                                    Framingham <span className="block text-[9px] text-[#839788] font-normal">Lineær</span>
                                </button>
                                <button
                                    onClick={() => setSelectedFormula('hodges')}
                                    className={`p-2 rounded-xl border text-center transition-all ${selectedFormula === 'hodges' ? 'bg-white font-bold text-[#3A4A40] shadow-sm border-[#839788]' : 'bg-[#F9F8F6] text-[#839788] border-[#E8E4D9]'}`}
                                >
                                    Hodges <span className="block text-[9px] text-[#839788] font-normal">Lineær HR</span>
                                </button>
                            </div>
                        </div>

                        {/* Hamptons 50% R-R Tommelfingerregel Visualisering */}
                        <div className="p-3 bg-[#EFF3F0] rounded-2xl border border-[#D9E1DA] text-xs">
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-[#2C3F34]">Hamptons 50% R-R Regel:</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${qtInterval > halfRrMs ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                    {qtInterval > halfRrMs ? 'QT > 50% af R-R' : 'QT < 50% af R-R'}
                                </span>
                            </div>
                            <div className="relative w-full h-4 bg-white rounded-full border border-[#D9E1DA] overflow-hidden my-1.5">
                                {/* 50% R-R markørlinje */}
                                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-400 z-10"></div>
                                {/* QT interval bjælke */}
                                <div
                                    className={`h-full transition-all rounded-full ${qtInterval > halfRrMs ? 'bg-red-500' : 'bg-emerald-500'}`}
                                    style={{ width: `${Math.min(100, (qtInterval / rrMs) * 100)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-[10px] font-mono text-[#839788]">
                                <span>R1 (0 ms)</span>
                                <span className="font-bold text-slate-700">50% grænse ({halfRrMs} ms)</span>
                                <span>R2 ({rrMs} ms)</span>
                            </div>
                        </div>
                    </div>

                    {/* Resultatvisning */}
                    <div className={`p-5 rounded-2xl border ${risk.borderColor} ${risk.bgColor} mt-4 transition-all shadow-xs`}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Beregnet QTc ({selectedFormula.toUpperCase()}):</span>
                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg bg-white border ${risk.borderColor} ${risk.color}`}>
                                {risk.badge}
                            </span>
                        </div>
                        <div className="text-4xl font-bold font-mono tracking-tight my-2 text-slate-900">
                            {activeQTC} <span className="text-lg font-sans font-normal text-slate-600">ms</span>
                        </div>

                        {/* Hvis grenblok er til stede */}
                        {isWideQrs && (
                            <div className="p-3 bg-white/90 rounded-xl border border-emerald-300 text-xs text-emerald-950 mb-2">
                                <div className="flex justify-between items-center font-bold">
                                    <span>Grenblok-justeret QTc:</span>
                                    <span className="text-base font-mono text-emerald-800">{adjustedQTC} ms</span>
                                </div>
                                <p className="text-[11px] text-slate-600 mt-1">
                                    Formel: <em>QTc - (QRS - 100 ms)</em>. Korrigerer for den forlængede depolariseringstid ved grenblok ({qrsDuration} ms), så reel repolariseringstid vurderes.
                                </p>
                            </div>
                        )}

                        {/* Delta-QTc alarm */}
                        {deltaQTc !== null && (
                            <div className={`p-2.5 rounded-xl border text-xs font-bold mb-2 ${deltaQTc >= 60 ? 'bg-red-100 border-red-300 text-red-900' : deltaQTc >= 30 ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-emerald-100 border-emerald-300 text-emerald-900'}`}>
                                {deltaQTc >= 60 ? (
                                    <span>⚠️ KRITISK STIGNING FRA BASELINE: ΔQTc = +{deltaQTc} ms! (Uafhængig rød indikator jf. DPS/DCS uanset absolutværdi).</span>
                                ) : deltaQTc >= 30 ? (
                                    <span>⚠️ BEMÆRK: ΔQTc = +{deltaQTc} ms fra baseline (anbefaler skærpet kontrol).</span>
                                ) : (
                                    <span>✓ Stabil værdi ift. baseline (ΔQTc = {deltaQTc >= 0 ? `+${deltaQTc}` : deltaQTc} ms).</span>
                                )}
                            </div>
                        )}

                        <p className={`text-xs font-bold ${risk.color} mb-2`}>
                            {risk.title}
                        </p>
                        <p className="text-xs text-slate-700 leading-relaxed border-t border-black/10 pt-2">
                            <strong>Klinisk Handling: </strong>{risk.action}
                        </p>
                    </div>
                </div>

                {/* Højre Søjle: Psykofarmaka Risikoprofil & Kliniske Retningslinjer */}
                <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-[#E8E4D9] bg-white/90 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-[#E8E4D9]">
                            <div className="flex items-center gap-2">
                                <Pill className="w-5 h-5 text-[#839788]" />
                                <div>
                                    <h3 className="text-base font-bold text-[#3A4A40]">Psykofarmaka & Arytmirisiko</h3>
                                    <p className="text-[11px] text-[#839788]">Dansk Psykiatrisk Selskabs kliniske retningslinjer</p>
                                </div>
                            </div>

                            {/* Hurtigsøgning */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Søg præparat..."
                                    value={drugSearch}
                                    onChange={(e) => setDrugSearch(e.target.value)}
                                    className="bg-[#F2F6F3] border border-[#E8E4D9] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#3A4A40] placeholder-[#839788] focus:outline-none focus:ring-1 focus:ring-[#839788] w-48"
                                />
                                <Search className="w-3.5 h-3.5 text-[#839788] absolute left-2.5 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        <div className="space-y-4 text-xs leading-relaxed text-[#3A4A40]">
                            <p>
                                Mange antipsykotika og antidepressiva blokerer myokardiets hERG/IKr kaliumkanaler, hvilket forsinker repolariseringen og øger risikoen for den fatale arytmi <strong>Torsades de Pointes</strong>.
                            </p>

                            {/* Filtreret liste over præparater */}
                            <div className="max-h-[290px] overflow-y-auto space-y-2 pr-1">
                                {filteredDrugs.map(drug => {
                                    const badgeClass = drug.risk === 'high'
                                        ? 'bg-red-100 text-red-900 border-red-200'
                                        : drug.risk === 'moderate'
                                            ? 'bg-amber-100 text-amber-900 border-amber-200'
                                            : 'bg-emerald-100 text-emerald-900 border-emerald-200';
                                    const riskText = drug.risk === 'high' ? 'Høj Risiko' : drug.risk === 'moderate' ? 'Moderat Risiko' : 'Lav Risiko';

                                    return (
                                        <div key={drug.name} className="p-3 bg-white rounded-2xl border border-[#E8E4D9] hover:border-[#839788] transition-colors">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <div className="flex items-center gap-2">
                                                    <strong className="text-[#2C3F34] font-bold text-sm">{drug.name}</strong>
                                                    <span className="text-[10px] text-[#839788] px-2 py-0.5 rounded-md bg-[#F2F6F3]">
                                                        {drug.group}
                                                    </span>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeClass}`}>
                                                    {riskText}
                                                </span>
                                            </div>
                                            <p className="text-[#839788] text-[11px] leading-relaxed">{drug.note}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Interaktiv DPS / DCS Kardial Risikoscore for Torsades de Pointes */}
                            <div className="p-4 bg-[#EFF3F0] rounded-2xl border border-[#D9E1DA] space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <ShieldAlert className="w-4 h-4 text-[#839788]" />
                                        <strong className="text-xs font-bold text-[#2C3F34]">
                                            DPS & DCS Kardial Risikoscore (Torsades de Pointes):
                                        </strong>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${riskScore >= 4
                                        ? 'bg-red-100 text-red-900 border border-red-200'
                                        : riskScore >= 2
                                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                            : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                        }`}>
                                        Score: {riskScore} ({riskScore >= 4 ? 'Høj Risiko' : riskScore >= 2 ? 'Moderat Risiko' : 'Lav Risiko'})
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                    <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg bg-white/70 hover:bg-white border border-[#E8E4D9]">
                                        <input
                                            type="checkbox"
                                            checked={riskFactors.age65}
                                            onChange={() => toggleRiskFactor('age65')}
                                            className="rounded text-[#839788] cursor-pointer"
                                        />
                                        <span>Alder &ge; 65 år (+1 point)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg bg-white/70 hover:bg-white border border-[#E8E4D9]">
                                        <input
                                            type="checkbox"
                                            checked={gender === 'female'}
                                            onChange={(e) => setGender(e.target.checked ? 'female' : 'male')}
                                            className="rounded text-[#839788] cursor-pointer"
                                        />
                                        <span>Hunkøn (+1 point)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg bg-white/70 hover:bg-white border border-[#E8E4D9]">
                                        <input
                                            type="checkbox"
                                            checked={riskFactors.heartDisease}
                                            onChange={() => toggleRiskFactor('heartDisease')}
                                            className="rounded text-[#839788] cursor-pointer"
                                        />
                                        <span>Kendt hjertesygdom (+2 point)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg bg-white/70 hover:bg-white border border-[#E8E4D9]">
                                        <input
                                            type="checkbox"
                                            checked={heartRate < 50 || riskFactors.bradycardia}
                                            onChange={() => toggleRiskFactor('bradycardia')}
                                            className="rounded text-[#839788] cursor-pointer"
                                        />
                                        <span>Bradykardi &lt; 50 bpm (+1 point)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg bg-white/70 hover:bg-white border border-[#E8E4D9]">
                                        <input
                                            type="checkbox"
                                            checked={riskFactors.hypokalemia}
                                            onChange={() => toggleRiskFactor('hypokalemia')}
                                            className="rounded text-[#839788] cursor-pointer"
                                        />
                                        <span>Hypokaliæmi (&lt;3.5) / Mg (+2 point)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg bg-white/70 hover:bg-white border border-[#E8E4D9]">
                                        <input
                                            type="checkbox"
                                            checked={riskFactors.cypInhibitor}
                                            onChange={() => toggleRiskFactor('cypInhibitor')}
                                            className="rounded text-[#839788] cursor-pointer"
                                        />
                                        <span>CYP2D6/3A4-hæmmer (+1 point)</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg bg-white/70 hover:bg-white border border-[#E8E4D9] sm:col-span-2">
                                        <input
                                            type="checkbox"
                                            checked={riskFactors.polypharmacy}
                                            onChange={() => toggleRiskFactor('polypharmacy')}
                                            className="rounded text-[#839788] cursor-pointer"
                                        />
                                        <span>Polyfarmaci med &ge;2 QT-forlængende stoffer (+2 point)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Paraklinisk Blodprøve-Tjekliste & Kardiologisk Visitation */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                                <div className="p-3 bg-white rounded-2xl border border-[#E8E4D9]">
                                    <strong className="block text-[#2C3F34] font-bold mb-1.5 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                        Obligatoriske Blodprøver (DPS):
                                    </strong>
                                    <ul className="list-disc list-inside text-[#839788] space-y-0.5">
                                        <li><strong>S-Kalium</strong> (mål: &ge; 4.0 mmol/L)</li>
                                        <li><strong>S-Magnesium</strong> (mål: &ge; 0.80 mmol/L)</li>
                                        <li><strong>S-Kreatinin / eGFR</strong></li>
                                        <li><strong>S-Calcium</strong> (ioniseret)</li>
                                        <li><strong>TSH</strong> (hypotyreose øger QT)</li>
                                    </ul>
                                </div>

                                <div className="p-3 bg-white rounded-2xl border border-[#E8E4D9]">
                                    <strong className="block text-red-900 font-bold mb-1.5 flex items-center gap-1.5">
                                        <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                                        Kardiologisk Konference Kriterier:
                                    </strong>
                                    <ul className="list-disc list-inside text-red-900 space-y-0.5">
                                        <li>QTc &ge; 500 ms trods dosisreduktion</li>
                                        <li>Synkoper el. kramper under behandling</li>
                                        <li>Familiær anamnese med pludselig død</li>
                                        <li>Uforklaret grenblok el. ventrikelarytmi</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
