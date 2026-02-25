import React, { useState, useEffect } from 'react';
import { ExternalLink, Info, Download, Stethoscope } from '../Icons';

const AUDIT_QUESTIONS = [
    {
        id: 'q1',
        title: '1. Hvor ofte drikker du alkohol?',
        options: [
            { label: 'Aldrig', value: 0 },
            { label: '1 gang om måneden eller sjældnere', value: 1 },
            { label: '2-4 gange om måneden', value: 2 },
            { label: '2-3 gange om ugen', value: 3 },
            { label: '4 gange eller mere om ugen', value: 4 },
        ]
    },
    {
        id: 'q2',
        title: '2. Hvor mange genstande får du typisk en dag, hvor du drikker alkohol?',
        options: [
            { label: '1 - 2', value: 0 },
            { label: '3 - 4', value: 1 },
            { label: '5 - 6', value: 2 },
            { label: '7 - 8', value: 3 },
            { label: '9 eller flere', value: 4 },
        ]
    },
    {
        id: 'q3',
        title: '3. Hvor ofte får du 6 genstande eller mere ved en enkelt lejlighed?',
        options: [
            { label: 'Aldrig', value: 0 },
            { label: 'Sjældnere end én gang om måneden', value: 1 },
            { label: 'Månedligt', value: 2 },
            { label: 'Ugentligt', value: 3 },
            { label: 'Dagligt eller næsten dagligt', value: 4 },
        ]
    },
    {
        id: 'q4',
        title: '4. Hvor mange gange har du i løbet af det seneste år oplevet, at du ikke kunne holde op med at drikke, når du først var begyndt?',
        options: [
            { label: 'Aldrig', value: 0 },
            { label: 'Sjældnere end én gang om måneden', value: 1 },
            { label: 'Månedligt', value: 2 },
            { label: 'Ugentligt', value: 3 },
            { label: 'Dagligt eller næsten dagligt', value: 4 },
        ]
    },
    {
        id: 'q5',
        title: '5. Hvor mange gange i løbet af det seneste år har dit alkoholforbrug medført, at du ikke gjorde de ting, som normalt forventedes af dig?',
        options: [
            { label: 'Aldrig', value: 0 },
            { label: 'Sjældnere end én gang om måneden', value: 1 },
            { label: 'Månedligt', value: 2 },
            { label: 'Ugentligt', value: 3 },
            { label: 'Dagligt eller næsten dagligt', value: 4 },
        ]
    },
    {
        id: 'q6',
        title: '6. Hvor mange gange i løbet af det seneste år har du haft behov for at drikke alkohol om morgenen for at komme i gang efter et stort alkoholforbrug dagen inden?',
        options: [
            { label: 'Aldrig', value: 0 },
            { label: 'Sjældnere end én gang om måneden', value: 1 },
            { label: 'Månedligt', value: 2 },
            { label: 'Ugentligt', value: 3 },
            { label: 'Dagligt eller næsten dagligt', value: 4 },
        ]
    },
    {
        id: 'q7',
        title: '7. Hvor ofte har du i løbet af det seneste år haft skyldsfølelse over at have drukket, eller har fortrudt at have drukket?',
        options: [
            { label: 'Aldrig', value: 0 },
            { label: 'Sjældnere end én gang om måneden', value: 1 },
            { label: 'Månedligt', value: 2 },
            { label: 'Ugentligt', value: 3 },
            { label: 'Dagligt eller næsten dagligt', value: 4 },
        ]
    },
    {
        id: 'q8',
        title: '8. Hvor mange gange har du i løbet af det seneste år været ude af stand til at huske, hvad der skete aftenen inden, fordi du havde drukket?',
        options: [
            { label: 'Aldrig', value: 0 },
            { label: 'Sjældnere end én gang om måneden', value: 1 },
            { label: 'Månedligt', value: 2 },
            { label: 'Ugentligt', value: 3 },
            { label: 'Dagligt eller næsten dagligt', value: 4 },
        ]
    },
    {
        id: 'q9',
        title: '9. Er du selv eller andre kommet til skade pga. dit alkoholforbrug?',
        options: [
            { label: 'Nej', value: 0 },
            { label: 'Ja, men ikke inden for det sidste år', value: 2 },
            { label: 'Ja, inden for det sidste år', value: 4 },
        ]
    },
    {
        id: 'q10',
        title: '10. Har en slægtning eller ven eller læge eller andet sundhedspersonale udtrykt bekymring over dit alkoholforbrug eller foreslået dig at skære ned på det?',
        options: [
            { label: 'Nej', value: 0 },
            { label: 'Ja, men ikke inden for det sidste år', value: 2 },
            { label: 'Ja, inden for det sidste år', value: 4 },
        ]
    },
];

function Audit() {
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

    const isComplete = Object.keys(scores).length === AUDIT_QUESTIONS.length;

    const getScoreColor = () => {
        if (!isComplete && totalScore === 0) return "text-slate-400 bg-slate-50";
        if (totalScore >= 20) return "text-red-700 bg-red-100 border-red-200";
        if (totalScore >= 16) return "text-orange-700 bg-orange-100 border-orange-200";
        if (totalScore >= 8) return "text-amber-700 bg-amber-100 border-amber-200";
        return "text-emerald-700 bg-emerald-100 border-emerald-200";
    };

    const getScoreInterpretation = () => {
        if (totalScore === 0 && Object.keys(scores).length === 0) return "Afventer...";
        if (totalScore >= 20) return "Tyder på alkoholafhængighed";
        if (totalScore >= 16) return "Skadeligt forbrug af alkohol";
        if (totalScore >= 8) return "Storforbrug af alkohol";
        return "Lavrisiko (Mænd)";
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 pb-32 animate-fade-in-up">

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2E8DF]/30 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2F6F3] text-[#839788] text-sm font-semibold mb-4">
                            <Stethoscope className="w-4 h-4" />
                            Misbrug & Afhængighed
                        </div>
                        <h1 className="text-3xl font-bold text-[#3A4A40] mb-3">AUDIT Screeningsværktøj</h1>
                        <p className="text-[#839788] text-base max-w-xl leading-relaxed">
                            Alcohol Use Disorders Identification Test. Et valideret spørgeskema til at identificere storforbrug, skadeligt forbrug og alkoholafhængighed.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                        <a
                            href="https://www.alkohologsamfund.dk/viden-om-alkohol/audit-et-screeningsvaerktoej"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E8DF] shadow-sm text-[#839788] hover:text-[#3A4A40] hover:border-[#839788] transition-all group"
                        >
                            <span className="text-sm font-medium">Alkohol & Samfund</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                        <a
                            href={`${import.meta.env.BASE_URL}pdf/8_Audit.pdf`}
                            download
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#839788] text-white shadow-sm hover:bg-[#6A7A6E] transition-all group"
                        >
                            <Download className="w-4 h-4" />
                            <span className="text-sm font-medium">Original PDF</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {AUDIT_QUESTIONS.map((q) => {
                    const optionCols = q.options.length <= 3 ? `sm:grid-cols-${q.options.length}` : 'sm:grid-cols-5';

                    return (
                        <div key={q.id} className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm border border-white hover:shadow-md transition-shadow">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-[#3A4A40]">{q.title}</h3>
                            </div>

                            <div className={`grid grid-cols-1 ${optionCols} gap-2`}>
                                {q.options.map((opt) => {
                                    const isSelected = scores[q.id] === opt.value;
                                    return (
                                        <button
                                            key={opt.label}
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
                    );
                })}
            </div>

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
                <div className={`p-4 rounded-2xl shadow-xl border backdrop-blur-xl flex items-center justify-between transition-all duration-500 ${getScoreColor()}`}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/50 rounded-xl">
                            <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold opacity-80">
                                Resultat: {getScoreInterpretation()}
                            </p>
                            <p className="text-xs opacity-70">
                                {Object.keys(scores).length} af {AUDIT_QUESTIONS.length} besvaret
                            </p>
                        </div>
                    </div>

                    <div className="text-3xl font-black tracking-tight">
                        {totalScore}<span className="text-lg font-bold opacity-70 ml-1">/40</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#F2F6F3]/50 rounded-2xl p-6 border border-[#E2E8DF] flex gap-4 items-start">
                <Info className="w-5 h-5 text-[#839788] shrink-0 mt-0.5" />
                <div className="text-sm text-[#5C6D63] space-y-4 w-full">
                    <div>
                        <p className="font-semibold text-[#3A4A40] mb-2">Faglig Tolkning af Total Score:</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li><strong>0-7 point:</strong> Der er ikke umiddelbart mistanke om alkoholforbrug (OBS: For kvinder og ældre er grænsen <strong>0-5</strong> point).</li>
                            <li><strong>8-15 point:</strong> Tyder på storforbrug af alkohol.</li>
                            <li><strong>16-19 point:</strong> Tyder på et skadeligt forbrug af alkohol.</li>
                            <li><strong>≥ 20 point:</strong> Tyder på alkoholafhængighed.</li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-[#3A4A40] mb-2">Profilering ud fra spørgsmål:</p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Høj score i spm. <strong>1-3</strong> antyder stort forbrug.</li>
                            <li>Høj score i spm. <strong>7-10</strong> antyder skadeligt forbrug.</li>
                            <li>Høj score i spm. <strong>4-6</strong> antyder afhængighed.</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Audit;
