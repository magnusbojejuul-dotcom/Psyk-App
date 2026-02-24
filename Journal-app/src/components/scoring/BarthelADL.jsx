import React, { useState, useEffect } from 'react';
import { ExternalLink, Activity, Info } from '../Icons'; // Adjusted import path depending on directory

const BARTHEL_QUESTIONS = [
    {
        id: 'bowels',
        title: '1. Kontinent for afføring',
        options: [
            { label: 'Kontinent for afføring', value: 10 },
            { label: 'Inkontinent for afføring ugentligt eller sjældnere', value: 5 },
            { label: 'Udviser en større grad af inkontinens', value: 0 },
        ]
    },
    {
        id: 'bladder',
        title: '2. Kontinent for urin',
        options: [
            { label: 'Kontinent for urin', value: 10 },
            { label: 'Enkeltstående uheld max 1 gang i døgnet', value: 5 },
            { label: 'Inkontinent', value: 0 },
        ]
    },
    {
        id: 'feeding',
        title: '3. Fødeindtagelse',
        description: 'Maden placeret inden for rækkevidde',
        options: [
            { label: 'Helt selvhjulpen', value: 10 },
            { label: 'Hjælp til at skære mad ud etc.', value: 5 },
            { label: 'Kan ikke selv / Afhængig af hjælp', value: 0 },
        ]
    },
    {
        id: 'grooming',
        title: '4. Personlig hygiejne',
        options: [
            { label: 'Selvhjulpen (vaske ansigt, rede hår, barbere sig, børste tænder)', value: 5 },
            { label: 'Afhængig af hjælp', value: 0 },
        ]
    },
    {
        id: 'dressing',
        title: '5. Påklædning',
        options: [
            { label: 'Helt selvhjulpen', value: 10 },
            { label: 'Hjælp / kan udføre mindst halvdelen selv', value: 5 },
            { label: 'Afhængig af hjælp', value: 0 },
        ]
    },
    {
        id: 'transfer',
        title: '6. Forflytning (seng til stol)',
        options: [
            { label: 'Helt selvhjulpen', value: 15 },
            { label: 'Minimal hjælp (fx verbal)', value: 10 },
            { label: 'Maksimal hjælp (fx 2 personer)', value: 5 },
            { label: 'Kan ikke sidde / afhængig af hjælp', value: 0 },
        ]
    },
    {
        id: 'toilet',
        title: '7. Hjælpebehov ved brug af toilet',
        options: [
            { label: 'Helt selvhjulpen', value: 10 },
            { label: 'Hjælp til balance, tage tøj af/på osv.', value: 5 },
            { label: 'Afhængig af hjælp', value: 0 },
        ]
    },
    {
        id: 'mobility',
        title: '8. Mobilitet indendørs',
        options: [
            { label: 'Helt selvhjulpen (> 50 meter)', value: 15 },
            { label: 'Kan gå > 50 meter med hjælp el. rollator', value: 10 },
            { label: 'Kan køre kørestol > 50 meter uafhængigt', value: 5 },
            { label: 'Immobil (< 50 meter)', value: 0 },
        ]
    },
    {
        id: 'stairs',
        title: '9. Trappegang',
        options: [
            { label: 'Helt selvhjulpen', value: 10 },
            { label: 'Behov for hjælp eller overvågning', value: 5 },
            { label: 'Kan ikke', value: 0 },
        ]
    },
    {
        id: 'bathing',
        title: '10. Bad',
        options: [
            { label: 'Selvhjulpen', value: 5 },
            { label: 'Afhængig af hjælp', value: 0 },
        ]
    }
];

function BarthelADL() {
    const [scores, setScores] = useState({});
    const [totalScore, setTotalScore] = useState(0);

    // Calculate total score whenever individual scores change
    useEffect(() => {
        const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
        setTotalScore(total);
    }, [scores]);

    const handleOptionSelect = (questionId, value) => {
        setScores(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const isComplete = Object.keys(scores).length === BARTHEL_QUESTIONS.length;

    // Determine color based on the score (0-100 scale)
    const getScoreColor = () => {
        if (!isComplete) return "text-slate-400 bg-slate-50";
        if (totalScore >= 80) return "text-emerald-700 bg-emerald-100 border-emerald-200";
        if (totalScore >= 50) return "text-amber-700 bg-amber-100 border-amber-200";
        return "text-red-700 bg-red-100 border-red-200";
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 pb-32 animate-fade-in-up">

            {/* Header Section */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2E8DF]/30 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2F6F3] text-[#839788] text-sm font-semibold mb-4">
                            <Activity className="w-4 h-4" />
                            Geriatri
                        </div>
                        <h1 className="text-3xl font-bold text-[#3A4A40] mb-3">Barthel ADL-indeks</h1>
                        <p className="text-[#839788] text-base max-w-xl leading-relaxed">
                            Beskriver graden af uafhængighed i forhold til hjælp fra en anden person.
                            Skal registrere, hvad patienten faktisk gør (ikke hvad de potentielt kan).
                        </p>
                    </div>

                    {/* Link out to sundhed.dk */}
                    <a
                        href="https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/undersoegelser-og-proever/skemaer/geriatri/barthel-adl/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E8DF] shadow-sm text-[#839788] hover:text-[#3A4A40] hover:border-[#839788] transition-all group"
                    >
                        <span className="text-sm font-medium">Lægehåndbogen</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Questions list */}
            <div className="space-y-6">
                {BARTHEL_QUESTIONS.map((q, idx) => (
                    <div key={q.id} className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm border border-white hover:shadow-md transition-shadow">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-[#3A4A40]">{q.title}</h3>
                            {q.description && (
                                <p className="text-sm text-[#839788] mt-1">{q.description}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            {q.options.map((opt, oIdx) => {
                                const isSelected = scores[q.id] === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleOptionSelect(q.id, opt.value)}
                                        className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${isSelected
                                                ? 'bg-[#F2F6F3] border-[#839788] shadow-sm ring-1 ring-[#839788]'
                                                : 'bg-white border-[#E2E8DF] hover:border-[#839788]/50 hover:bg-[#F9FAF9]'
                                            }`}
                                    >
                                        <span className={`font-medium ${isSelected ? 'text-[#3A4A40]' : 'text-[#5C6D63]'}`}>
                                            {opt.label}
                                        </span>
                                        <span className={`px-3 py-1 rounded-lg text-sm font-bold ${isSelected ? 'bg-[#839788] text-white' : 'bg-[#F2F6F3] text-[#839788]'
                                            }`}>
                                            {opt.value} p
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Score Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
                <div className={`p-4 rounded-2xl shadow-xl border backdrop-blur-xl flex items-center justify-between transition-all duration-500 ${getScoreColor()}`}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/50 rounded-xl">
                            <Activity className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold opacity-80">Total Score</p>
                            <p className="text-xs opacity-70">
                                {Object.keys(scores).length} af {BARTHEL_QUESTIONS.length} besvaret
                            </p>
                        </div>
                    </div>

                    <div className="text-3xl font-black tracking-tight">
                        {totalScore}<span className="text-lg font-bold opacity-70 ml-1">/100</span>
                    </div>
                </div>
            </div>

            {/* Interpretation helper */}
            <div className="bg-[#F2F6F3]/50 rounded-2xl p-6 border border-[#E2E8DF] flex gap-4 items-start">
                <Info className="w-5 h-5 text-[#839788] shrink-0 mt-0.5" />
                <div className="text-sm text-[#5C6D63] space-y-2">
                    <p><strong>Overordnet tolkning:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>En score tæt på <strong>100</strong> er udtryk for selvhjulpenhed.</li>
                        <li>En lav score indikerer afhængighed af hjælp i dagligdagen.</li>
                        <li>En score tæt på <strong>0</strong> vil ofte betyde, at patienten er sengeliggende.</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default BarthelADL;
