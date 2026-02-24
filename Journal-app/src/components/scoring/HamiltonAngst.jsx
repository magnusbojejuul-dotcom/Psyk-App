import React, { useState, useEffect } from 'react';
import { ExternalLink, Brain, Info } from '../Icons';

const HAMA_QUESTIONS = [
    {
        id: 'anxious_mood',
        title: '1. Angsttilstand',
        description: 'Bekymringer, forbrug af det værste, angstfuld forventning, irritabilitet.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær/invaliderende', value: 4 },
        ]
    },
    {
        id: 'tension',
        title: '2. Spænding',
        description: 'Spændingsfornemmelse, træthedsfornemmelse, skrik-tendens, let til gråd, sitren, rastløshed.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'fears',
        title: '3. Frygt/Fobier',
        description: 'For mørke, for fremmede, for at være alene, for dyr, trafik eller store forsamlinger.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'insomnia',
        title: '4. Søvnbesvær',
        description: 'Indsovningsbesvær, afbrudt søvn, mareridt, træthed ved opvågnen.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'intellectual',
        title: '5. Intellektuelle forstyrrelser',
        description: 'Koncentrationsbesvær, dårlig hukommelse.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'depressed_mood',
        title: '6. Depressiv stemning',
        description: 'Tab af interesse, nedsat glæde, tidlig opvågnen, døgnsvingninger.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'somatic_muscular',
        title: '7. Somatiske (muskulære) symptomer',
        description: 'Smerter i muskler, muskelstivhed, rykninger, tænderskæren, usikker stemme.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'somatic_sensory',
        title: '8. Somatiske (sensoriske) symptomer',
        description: 'Tinnitus, sløret syn, kulde/varmefornemmelser, svaghedsfornemmelse, stikken/prikken i huden.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'cardiovascular',
        title: '9. Kardiovaskulære symptomer',
        description: 'Hjertebanken, smerter i brystet, pulserende fornemmelse i kar.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'respiratory',
        title: '10. Respiratoriske symptomer',
        description: 'Trykken for brystet, kvælningsfornemmelse, dybe suk, åndenød.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'gastrointestinal',
        title: '11. Gastrointestinale symptomer',
        description: 'Synkebesvær, ændret mave/tarm funktion (fx diarré, forstoppelse), kvalme, mavesmerter.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'genitourinary',
        title: '12. Urogenitale symptomer',
        description: 'Hyppig eller uopsættelig vandladningstrang, menstruationsforstyrrelser, erektionsbesvær.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'autonomic',
        title: '13. Autonome symptomer',
        description: 'Mundtørhed, rødme, bleghed, svedtendens.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    },
    {
        id: 'behavior',
        title: '14. Adfærd under interview',
        description: 'Rastløshed, anspændt kropsholdning, fingre-pilleri, fugtige/klamme hænder, hurtig vejrtrækning.',
        options: [
            { label: 'Ikke til stede', value: 0 },
            { label: 'Let', value: 1 },
            { label: 'Moderat', value: 2 },
            { label: 'Svær', value: 3 },
            { label: 'Meget svær', value: 4 },
        ]
    }
];

function HamiltonAngst() {
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

    const isComplete = Object.keys(scores).length === HAMA_QUESTIONS.length;

    // HAM-A Score Interpretation: 
    // <14 (Mild/Ingen), 14-17 (Mild til moderat), 18-24 (Moderat til svær), ≥25 (Svær)
    const getScoreColor = () => {
        if (!isComplete && totalScore === 0) return "text-slate-400 bg-slate-50";
        if (totalScore >= 25) return "text-red-700 bg-red-100 border-red-200";
        if (totalScore >= 18) return "text-amber-700 bg-amber-100 border-amber-200";
        if (totalScore >= 14) return "text-yellow-700 bg-yellow-100 border-yellow-200";
        return "text-emerald-700 bg-emerald-100 border-emerald-200";
    };

    const getScoreInterpretation = () => {
        if (totalScore === 0 && Object.keys(scores).length === 0) return "Afventer...";
        if (totalScore >= 25) return "Svær angst";
        if (totalScore >= 18) return "Moderat til svær angst";
        if (totalScore >= 14) return "Let til moderat angst";
        return "Ingen/mild angst";
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
                        <h1 className="text-3xl font-bold text-[#3A4A40] mb-3">Hamilton Angstskala (HAM-A)</h1>
                        <p className="text-[#839788] text-base max-w-xl leading-relaxed">
                            Klinisk interview-baseret redskab til vurdering af sværhedsgraden af generel angstbehandling hos voksne. Den dækker både psykologiske og somatiske angstsymptomer.
                        </p>
                    </div>

                    <a
                        href="https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/undersoegelser-og-proever/kalkulatorer/hamilton-angstskala/"
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
                {HAMA_QUESTIONS.map((q) => (
                    <div key={q.id} className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm border border-white hover:shadow-md transition-shadow">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-[#3A4A40]">{q.title}</h3>
                            {q.description && (
                                <p className="text-sm text-[#839788] mt-1">{q.description}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                            {q.options.map((opt) => {
                                const isSelected = scores[q.id] === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleOptionSelect(q.id, opt.value)}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 ${isSelected
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
                            <p className="text-sm font-semibold opacity-80">
                                Resultat: {getScoreInterpretation()}
                            </p>
                            <p className="text-xs opacity-70">
                                {Object.keys(scores).length} af {HAMA_QUESTIONS.length} besvaret
                            </p>
                        </div>
                    </div>

                    <div className="text-3xl font-black tracking-tight">
                        {totalScore}<span className="text-lg font-bold opacity-70 ml-1">/56</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#F2F6F3]/50 rounded-2xl p-6 border border-[#E2E8DF] flex gap-4 items-start">
                <Info className="w-5 h-5 text-[#839788] shrink-0 mt-0.5" />
                <div className="text-sm text-[#5C6D63] space-y-2">
                    <p><strong>Faglig Tolkning:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li><strong>&lt; 14 point:</strong> Ingen til mild symptombyrde</li>
                        <li><strong>14-17 point:</strong> Let til moderat angst</li>
                        <li><strong>18-24 point:</strong> Moderat til svær angst</li>
                        <li><strong>≥ 25 point:</strong> Svær sværhedsgrad af angst</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default HamiltonAngst;
