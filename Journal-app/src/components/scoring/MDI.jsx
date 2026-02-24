import React, { useState, useEffect } from 'react';
import { ExternalLink, Brain, Info } from '../Icons';

const MDI_QUESTIONS = [
    {
        id: '1',
        title: '1. Har du følt dig konstant trist, deprimeret eller haft en følelse af indre tomhed?',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen af tiden', value: 3 },
            { label: 'Lidt under halvdelen af tiden', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '2',
        title: '2. Har du manglet interesse for dine daglige gøremål?',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen af tiden', value: 3 },
            { label: 'Lidt under halvdelen af tiden', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '3',
        title: '3. Har du manglet energi og overskud?',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen af tiden', value: 3 },
            { label: 'Lidt under halvdelen af tiden', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '4',
        title: '4. Har du haft mindre selvtillid?',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen af tiden', value: 3 },
            { label: 'Lidt under halvdelen af tiden', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '5',
        title: '5. Har du haft dårlig samvittighed eller skyldfølelse?',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen af tiden', value: 3 },
            { label: 'Lidt under halvdelen af tiden', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '6',
        title: '6. Har du følt at livet ikke var værd at leve?',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen af tiden', value: 3 },
            { label: 'Lidt under halvdelen af tiden', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '7',
        title: '7. Har du haft besvær med at koncentrere dig?',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen af tiden', value: 3 },
            { label: 'Lidt under halvdelen af tiden', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '8a',
        title: '8a. Følt dig urolig?',
        description: 'Vælg den højeste score mellem 8a og 8b i resultatet',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen...', value: 3 },
            { label: 'Lidt under halvdelen...', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '8b',
        title: '8b. Følt dig hæmmet?',
        description: 'Skemaet tæller automatisk den højeste værdi for spg 8',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen...', value: 3 },
            { label: 'Lidt under halvdelen...', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '9a',
        title: '9a. Haft svært ved at sove om natten?',
        description: 'Vælg den højeste score mellem 9a og 9b i resultatet',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen...', value: 3 },
            { label: 'Lidt under halvdelen...', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '9b',
        title: '9b. Sovet for meget?',
        description: 'Skemaet tæller automatisk den højeste værdi for spg 9',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen...', value: 3 },
            { label: 'Lidt under halvdelen...', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '10a',
        title: '10a. Hadt nedsat appetit?',
        description: 'Vælg den højeste score mellem 10a og 10b',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen...', value: 3 },
            { label: 'Lidt under halvdelen...', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
    {
        id: '10b',
        title: '10b. Haft øget appetit?',
        description: 'Skemaet tæller automatisk den højeste værdi for spg 10',
        options: [
            { label: 'Hele tiden', value: 5 },
            { label: 'Det meste af tiden', value: 4 },
            { label: 'Lidt over halvdelen...', value: 3 },
            { label: 'Lidt under halvdelen...', value: 2 },
            { label: 'Noget af tiden', value: 1 },
            { label: 'På intet tidspunkt', value: 0 },
        ]
    },
];

function MDI() {
    const [scores, setScores] = useState({});
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        let total = 0;
        // Basic 1-7
        total += (scores['1'] || 0) + (scores['2'] || 0) + (scores['3'] || 0) +
            (scores['4'] || 0) + (scores['5'] || 0) + (scores['6'] || 0) + (scores['7'] || 0);

        // Take MAX of a/b pairs for 8, 9, 10
        total += Math.max(scores['8a'] || 0, scores['8b'] || 0);
        total += Math.max(scores['9a'] || 0, scores['9b'] || 0);
        total += Math.max(scores['10a'] || 0, scores['10b'] || 0);

        setTotalScore(total);
    }, [scores]);

    const handleOptionSelect = (questionId, value) => {
        setScores(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const isComplete = Object.keys(scores).length >= 10; // At least one from each category

    // MDI Interpretation: <20 ingen, 20-24 Let, 25-29 Moderat, >=30 Svær
    const getScoreColor = () => {
        if (!isComplete && totalScore === 0) return "text-slate-400 bg-slate-50";
        if (totalScore >= 30) return "text-red-700 bg-red-100 border-red-200";
        if (totalScore >= 25) return "text-amber-700 bg-amber-100 border-amber-200";
        if (totalScore >= 20) return "text-yellow-700 bg-yellow-100 border-yellow-200";
        return "text-emerald-700 bg-emerald-100 border-emerald-200";
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 pb-32 animate-fade-in-up">

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2E8DF]/30 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2F6F3] text-[#839788] text-sm font-semibold mb-4">
                            <Brain className="w-4 h-4" />
                            Psykiatri
                        </div>
                        <h1 className="text-3xl font-bold text-[#3A4A40] mb-3">MDI (Major Depression Inventory)</h1>
                        <p className="text-[#839788] text-base max-w-xl leading-relaxed">
                            Selvudfyldt spørgeskema til at måle sværhedsgraden af depressive symptomer over de seneste 2 uger. Består af 10-12 spørgsmål.
                        </p>
                    </div>

                    <a
                        href="https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/undersoegelser-og-proever/kalkulatorer/major-depression-inventory-mdi/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E8DF] shadow-sm text-[#839788] hover:text-[#3A4A40] hover:border-[#839788] transition-all group shrink-0"
                    >
                        <span className="text-sm font-medium">Lægehåndbogen</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>

            <div className="space-y-6">
                {MDI_QUESTIONS.map((q) => (
                    <div key={q.id} className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm border border-white hover:shadow-md transition-shadow">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-[#3A4A40]">{q.title}</h3>
                            {q.description && (
                                <p className="text-sm text-[#839788] mt-1">{q.description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                            {q.options.map((opt) => {
                                const isSelected = scores[q.id] === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleOptionSelect(q.id, opt.value)}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 min-h-[5rem] ${isSelected
                                            ? 'bg-[#839788] border-[#839788] shadow-md text-white scale-[1.02]'
                                            : 'bg-white border-[#E2E8DF] hover:border-[#839788]/50 hover:bg-[#F9FAF9] text-[#5C6D63]'
                                            }`}
                                    >
                                        <span className={`text-xl font-bold mb-1 ${isSelected ? 'text-white' : 'text-[#3A4A40]'}`}>
                                            {opt.value}
                                        </span>
                                        <span className={`text-xs ${isSelected ? 'text-white/90' : 'text-[#839788]'}`}>
                                            {opt.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
                <div className={`p-4 rounded-2xl shadow-xl border backdrop-blur-xl flex items-center justify-between transition-all duration-500 ${getScoreColor()}`}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/50 rounded-xl">
                            <Brain className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold opacity-80">Total Score</p>
                            <p className="text-xs opacity-70">
                                Seneste 2 uger
                            </p>
                        </div>
                    </div>

                    <div className="text-3xl font-black tracking-tight">
                        {totalScore}<span className="text-lg font-bold opacity-70 ml-1">/50</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#F2F6F3]/50 rounded-2xl p-6 border border-[#E2E8DF] flex gap-4 items-start">
                <Info className="w-5 h-5 text-[#839788] shrink-0 mt-0.5" />
                <div className="text-sm text-[#5C6D63] space-y-2">
                    <p><strong>Faglig Tolkning:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li><strong>&lt; 20 point:</strong> Ikke depressiv</li>
                        <li><strong>20-24 point:</strong> Let depression</li>
                        <li><strong>25-29 point:</strong> Moderat depression</li>
                        <li><strong>≥ 30 point:</strong> Svær depression</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default MDI;
