import React, { useState, useEffect } from 'react';
import { ExternalLink, Brain, Info } from '../Icons';

const MMS_QUESTIONS = [
    {
        id: 'orientation_time',
        title: '1. Orientering: Tid',
        description: 'Spørg om: År, årstid, måned, ugedag, dato (1 point for hvert korrekt svar).',
        options: [
            { label: '0 point', value: 0 },
            { label: '1 rgt', value: 1 },
            { label: '2 rgt', value: 2 },
            { label: '3 rgt', value: 3 },
            { label: '4 rgt', value: 4 },
            { label: '5 point', value: 5 },
        ]
    },
    {
        id: 'orientation_place',
        title: '2. Orientering: Sted',
        description: 'Spørg om: Land, landsdel, by, hospital/plejehjem/klinik, etage (1 point for hvert korrekt svar).',
        options: [
            { label: '0 point', value: 0 },
            { label: '1 rgt', value: 1 },
            { label: '2 rgt', value: 2 },
            { label: '3 rgt', value: 3 },
            { label: '4 rgt', value: 4 },
            { label: '5 point', value: 5 },
        ]
    },
    {
        id: 'registration',
        title: '3. Registrering',
        description: 'Nævn 3 ord (fx Æble, Bord, Mønt) og bed ptt. gentage dem. 1 point for hvert korrekt gentaget første gang.',
        options: [
            { label: '0 ord', value: 0 },
            { label: '1 ord', value: 1 },
            { label: '2 ord', value: 2 },
            { label: '3 ord', value: 3 },
        ]
    },
    {
        id: 'attention',
        title: '4. Opmærksomhed og regning',
        description: 'Træk 7 fra 100, og fortsæt baglæns (93, 86, 79, 72, 65). 1 point pr. rigtigt træk.',
        options: [
            { label: '0 point', value: 0 },
            { label: '1 rgt', value: 1 },
            { label: '2 rgt', value: 2 },
            { label: '3 rgt', value: 3 },
            { label: '4 rgt', value: 4 },
            { label: '5 point', value: 5 },
        ]
    },
    {
        id: 'recall',
        title: '5. Hukommelse',
        description: 'Bed ptt. genkalde de 3 ord fra tidligere (Æble, Bord, Mønt).',
        options: [
            { label: '0 ord', value: 0 },
            { label: '1 ord', value: 1 },
            { label: '2 ord', value: 2 },
            { label: '3 ord', value: 3 },
        ]
    },
    {
        id: 'naming',
        title: '6. Benævnelse',
        description: 'Korrekt benævnelse af 2 viste genstande (fx ur og blyant).',
        options: [
            { label: '0', value: 0 },
            { label: '1 rgt', value: 1 },
            { label: '2 rgt', value: 2 },
        ]
    },
    {
        id: 'repetition',
        title: '7. Gentagelse',
        description: 'Gentag "Ingen hvis\'er, og\'er eller men\'er".',
        options: [
            { label: 'Forkert', value: 0 },
            { label: 'Korrekt', value: 1 },
        ]
    },
    {
        id: 'command_verbal',
        title: '8. 3-trins ordre',
        description: 'Bed ptt: "Tag papiret i højre hånd, fold det på midten, og læg det på gulvet".',
        options: [
            { label: '0 trin', value: 0 },
            { label: '1 trin', value: 1 },
            { label: '2 trin', value: 2 },
            { label: '3 trin', value: 3 },
        ]
    },
    {
        id: 'reading',
        title: '9. Læsning',
        description: 'Læs og udfør handlingen på papiret: "LUK ØJNENE".',
        options: [
            { label: 'Ikke udført', value: 0 },
            { label: 'Udført', value: 1 },
        ]
    },
    {
        id: 'writing',
        title: '10. Skrivning',
        description: 'Skriv en meningsfuld sætning med subjekt (grundled) og verbum (udsagnsled).',
        options: [
            { label: 'Ikke acceptabel', value: 0 },
            { label: 'Acceptabel', value: 1 },
        ]
    },
    {
        id: 'copying',
        title: '11. Kopiering af figur',
        description: 'Kopier to overlappende femkanter. Alle 10 vinkler skal være til stede, og de to figurer skal overlappe (lave en firkant).',
        options: [
            { label: 'Forkert', value: 0 },
            { label: 'Korrekt', value: 1 },
        ]
    }
];

function MMS() {
    const [scores, setScores] = useState({});
    const [totalScore, setTotalScore] = useState(0);

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

    const isComplete = Object.keys(scores).length === MMS_QUESTIONS.length;

    // MMS Interpretation:
    // 24-30 Normalt/Let svækkelse (Bør tolkes ift uddannelse)
    // 18-23 Let til moderat demens
    // <18 Svær demens
    const getScoreColor = () => {
        if (!isComplete) return "text-slate-400 bg-slate-50";
        if (totalScore >= 24) return "text-emerald-700 bg-emerald-100 border-emerald-200";
        if (totalScore >= 18) return "text-yellow-700 bg-yellow-100 border-yellow-200";
        return "text-red-700 bg-red-100 border-red-200";
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 pb-32 animate-fade-in-up">

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2E8DF]/30 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2F6F3] text-[#839788] text-sm font-semibold mb-4">
                            <Brain className="w-4 h-4" />
                            Kognition
                        </div>
                        <h1 className="text-3xl font-bold text-[#3A4A40] mb-3">MMS (Mini-Mental State)</h1>
                        <p className="text-[#839788] text-base max-w-xl leading-relaxed">
                            Screeningsværktøj til at vurdere den kognitive funktion. Testen dækker orientering, indlæring, opmærksomhed/regning, hukommelse, og sprog/konstruktionsevne. (Maks 30 point).
                        </p>
                    </div>

                    <a
                        href="https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/undersoegelser-og-proever/skemaer/geriatri/mms-mini-mental-status/"
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
                {MMS_QUESTIONS.map((q) => {
                    const optionCols = q.options.length <= 4 ? `sm:grid-cols-${q.options.length}` : (q.options.length === 6 ? 'sm:grid-cols-6' : 'sm:grid-cols-5');

                    return (
                        <div key={q.id} className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm border border-white hover:shadow-md transition-shadow">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-[#3A4A40]">{q.title}</h3>
                                {q.description && (
                                    <p className="text-sm text-[#839788] mt-1">{q.description}</p>
                                )}
                            </div>

                            <div className={`grid grid-cols-2 ${optionCols} gap-2`}>
                                {q.options.map((opt) => {
                                    const isSelected = scores[q.id] === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleOptionSelect(q.id, opt.value)}
                                            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 min-h-[4rem] ${isSelected
                                                ? 'bg-[#839788] border-[#839788] shadow-md text-white scale-[1.02]'
                                                : 'bg-white border-[#E2E8DF] hover:border-[#839788]/50 hover:bg-[#F9FAF9] text-[#5C6D63]'
                                                }`}
                                        >
                                            <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-[#3A4A40]'}`}>
                                                {opt.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
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
                                {Object.keys(scores).length} af {MMS_QUESTIONS.length} domæner
                            </p>
                        </div>
                    </div>

                    <div className="text-3xl font-black tracking-tight">
                        {totalScore}<span className="text-lg font-bold opacity-70 ml-1">/30</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#F2F6F3]/50 rounded-2xl p-6 border border-[#E2E8DF] flex gap-4 items-start">
                <Info className="w-5 h-5 text-[#839788] shrink-0 mt-0.5" />
                <div className="text-sm text-[#5C6D63] space-y-2">
                    <p><strong>Generel Tolkning (afhænger også af alder og præmorbid uddannelse):</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li><strong>24-30 point:</strong> Normalt til let kognitiv svækkelse</li>
                        <li><strong>18-23 point:</strong> Let til moderat demens</li>
                        <li><strong>&lt; 18 point:</strong> Svær demens</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default MMS;
