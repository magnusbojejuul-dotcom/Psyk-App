import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, ShieldAlert, Info, Pill, RotateCcw } from '../Icons';

export default function EkgQTCertCalc() {
    const [heartRate, setHeartRate] = useState(65);
    const [qtInterval, setQtInterval] = useState(420);
    const [gender, setGender] = useState('male'); // 'male' | 'female'
    const [selectedFormula, setSelectedFormula] = useState('bazett'); // 'bazett' | 'fridericia' | 'framingham'

    // RR interval i sekunder
    const rrSec = heartRate > 0 ? 60 / heartRate : 1.0;
    const qtSec = qtInterval / 1000;

    // Bazett: QTc = QT / sqrt(RR)
    const qtcBazett = Math.round((qtSec / Math.sqrt(rrSec)) * 1000);

    // Fridericia: QTc = QT / cbrt(RR)
    const qtcFridericia = Math.round((qtSec / Math.cbrt(rrSec)) * 1000);

    // Framingham: QTc = QT + 0.154 * (1 - RR)
    const qtcFramingham = Math.round((qtSec + 0.154 * (1 - rrSec)) * 1000);

    const activeQTC = selectedFormula === 'bazett' ? qtcBazett : selectedFormula === 'fridericia' ? qtcFridericia : qtcFramingham;

    // Risikostratificering ift. køn
    const getRiskStatus = (val, g) => {
        const thresholdNormal = g === 'male' ? 440 : 460;
        const thresholdBorderline = g === 'male' ? 470 : 480;

        if (val < thresholdNormal) {
            return {
                level: 'normal',
                title: 'Normalt QTc-interval',
                badge: 'Lav Risiko',
                color: 'text-emerald-800',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
                action: 'Behandling kan fortsættes uden særlige kardiale forholdsregler.'
            };
        } else if (val < 500) {
            return {
                level: 'borderline',
                title: 'Let Forlænget QTc (Gråzone)',
                badge: 'Moderat Risiko',
                color: 'text-amber-800',
                bgColor: 'bg-amber-50',
                borderColor: 'border-amber-200',
                action: 'Tjek elektrolytter (S-kalium, S-magnesium). Undgå kombination med andre QT-forlængende præparater eller CYP-hæmmere. Kontrol-EKG anbefales.'
            };
        } else {
            return {
                level: 'critical',
                title: 'Udtalt Forlænget QTc (≥ 500 ms)',
                badge: 'Kritisk Risiko',
                color: 'text-red-800',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-300',
                action: 'HØJ RISIKO FOR TORSADES DE POINTES! Omgående dosisreduktion eller seponering af det mistænkte præparat. Korriger elektrolytforstyrrelser. Kardiologisk konference ved synkope eller vedvarende forlængelse.'
            };
        }
    };

    const risk = getRiskStatus(activeQTC, gender);

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

                        {/* Valg af formel */}
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-[#839788] uppercase tracking-wider mb-1.5">
                                Korrektionsformel
                            </label>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                                <button
                                    onClick={() => setSelectedFormula('bazett')}
                                    className={`p-2 rounded-xl border text-center transition-all ${selectedFormula === 'bazett' ? 'bg-white font-bold text-[#3A4A40] shadow-sm border-[#839788]' : 'bg-[#F9F8F6] text-[#839788] border-[#E8E4D9]'}`}
                                >
                                    Bazett <span className="block text-[9px] text-[#839788] font-normal">Standard</span>
                                </button>
                                <button
                                    onClick={() => setSelectedFormula('fridericia')}
                                    className={`p-2 rounded-xl border text-center transition-all ${selectedFormula === 'fridericia' ? 'bg-white font-bold text-[#3A4A40] shadow-sm border-[#839788]' : 'bg-[#F9F8F6] text-[#839788] border-[#E8E4D9]'}`}
                                >
                                    Fridericia <span className="block text-[9px] text-[#839788] font-normal">Bedst v. taky</span>
                                </button>
                                <button
                                    onClick={() => setSelectedFormula('framingham')}
                                    className={`p-2 rounded-xl border text-center transition-all ${selectedFormula === 'framingham' ? 'bg-white font-bold text-[#3A4A40] shadow-sm border-[#839788]' : 'bg-[#F9F8F6] text-[#839788] border-[#E8E4D9]'}`}
                                >
                                    Framingham <span className="block text-[9px] text-[#839788] font-normal">Lineær</span>
                                </button>
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
                        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#E8E4D9]">
                            <Pill className="w-5 h-5 text-[#839788]" />
                            <h3 className="text-base font-bold text-[#3A4A40]">Psykofarmaka & Arytmirisiko (Dansk Psykiatrisk Selskab)</h3>
                        </div>

                        <div className="space-y-4 text-xs leading-relaxed text-[#3A4A40]">
                            <p>
                                Mange antipsykotika og antidepressiva blokerer myokardiets hERG/IKr kaliumkanaler, hvilket forsinker repolariseringen og øger risikoen for den fatale arytmi <strong>Torsades de Pointes</strong>.
                            </p>

                            {/* Risikotabel for psykofarmaka */}
                            <div className="space-y-2">
                                <div className="p-3 bg-red-50 rounded-2xl border border-red-200">
                                    <strong className="block text-red-900 font-bold mb-1">Høj Risiko / Dosisafhængig Forlængelse (Kræver altid EKG):</strong>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {['Methadon', 'Citalopram (>20 mg)', 'Escitalopram (>10 mg)', 'Haloperidol (især i.v.)', 'Sertindol', 'Ziprasidon', 'Klorpromazin'].map(drug => (
                                            <span key={drug} className="bg-white px-2 py-0.5 rounded-md border border-red-200 font-medium text-red-950 text-[11px]">
                                                {drug}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                                    <strong className="block text-amber-900 font-bold mb-1">Moderat Risiko (EKG anbefales ved risikofaktorer):</strong>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {['Quetiapin', 'Olanzapin', 'Risperidon', 'Tricykliske Antidepressiva (TCA)', 'Litium'].map(drug => (
                                            <span key={drug} className="bg-white px-2 py-0.5 rounded-md border border-amber-200 font-medium text-amber-950 text-[11px]">
                                                {drug}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                                    <strong className="block text-emerald-900 font-bold mb-1">Lav Risiko (Førstevalg ved kendt QTc-forlængelse):</strong>
                                    <div className="flex flex-wrap gap-1.5 mt-1">
                                        {['Aripiprazol', 'Lurasidon', 'Sertralin', 'Mirtazapin', 'Vortioxetin', 'Bupropion'].map(drug => (
                                            <span key={drug} className="bg-white px-2 py-0.5 rounded-md border border-emerald-200 font-medium text-emerald-950 text-[11px]">
                                                {drug}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Tjekliste over andre risikofaktorer */}
                            <div className="p-3 bg-[#EFF3F0] rounded-2xl border border-[#D9E1DA]">
                                <strong className="block text-[#2C3F34] font-bold mb-1">Supplerende Risikofaktorer for Torsades de Pointes:</strong>
                                <ul className="list-disc list-inside text-[#839788] space-y-0.5">
                                    <li>Hunkøn og alder &gt; 65 år</li>
                                    <li>Elektrolytforstyrrelser: <strong>Hypokaliæmi (&lt; 3.5 mmol/L)</strong> og hypomagnesiæmi</li>
                                    <li>Bradykardi (&lt; 50/min)</li>
                                    <li>Kendt hjertesygdom (hjertesvigt, tidligere infarkt)</li>
                                    <li>Kombination med CYP2D6/CYP3A4 hæmmere eller andre QT-forlængende stoffer</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
