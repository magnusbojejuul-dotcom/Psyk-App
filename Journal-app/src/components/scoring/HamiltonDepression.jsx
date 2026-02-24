import React, { useState, useEffect } from 'react';
import { ExternalLink, Brain, Info } from '../Icons';

const HAMD_QUESTIONS = [
    {
        id: 'depressed_mood',
        title: '1. Nedtrykthed',
        description: 'Tristhed, håbløshed, hjælpeløshed, følelse af værdiløshed.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Kun overfor sig selv', value: 1 },
            { label: 'Gråd labilitet', value: 2 },
            { label: 'Græder spontant', value: 3 },
            { label: 'Græder næsten uafbrudt', value: 4 },
        ]
    },
    {
        id: 'guilt',
        title: '2. Skyldfølelse',
        description: 'Selvbebrejdelser, følelse af at have svigtet.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Selvbebrejdelse, føler sig som en byrde', value: 1 },
            { label: 'Skyldfølelse, grubler', value: 2 },
            { label: 'Nuværende sygdom ses som straf', value: 3 },
            { label: 'Hører anklagende stemmer/synshallucinationer', value: 4 },
        ]
    },
    {
        id: 'suicide',
        title: '3. Selvmordstanker',
        description: 'Føler at livet ikke er værd at leve.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Livet ikke værd at leve', value: 1 },
            { label: 'Ønsker at være død', value: 2 },
            { label: 'Idéer eller planer om selvmord', value: 3 },
            { label: 'Selvmordsforsøg', value: 4 },
        ]
    },
    {
        id: 'insomnia_early',
        title: '4. Indsovningsbesvær',
        description: 'Vanskeligheder ved at falde i søvn.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Lidt besvær (over 30 min)', value: 1 },
            { label: 'Dagligt/ofte besvær', value: 2 },
        ]
    },
    {
        id: 'insomnia_middle',
        title: '5. Afbrudt søvn',
        description: 'Vågner i løbet af natten.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Søvnen urolig', value: 1 },
            { label: 'Vågner flere gange / ude af sengen', value: 2 },
        ]
    },
    {
        id: 'insomnia_late',
        title: '6. Tidlig opvågnen',
        description: 'Vågner tidligt om morgenen.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Vågner tidligt, sover igen', value: 1 },
            { label: 'Kan ikke falde i søvn efter opvågnen', value: 2 },
        ]
    },
    {
        id: 'work_activities',
        title: '7. Arbejde og interesser',
        description: 'Nedsat eller tab af interesse, nedsat lyst.',
        options: [
            { label: 'Ingen problemer', value: 0 },
            { label: 'Tanker om utilstrækkelighed/træthed', value: 1 },
            { label: 'Faktisk nedsat interesse/aktivitet', value: 2 },
            { label: 'Mindre produktiv/fravær', value: 3 },
            { label: 'Kan ikke arbejde/helt tab af interesser', value: 4 },
        ]
    },
    {
        id: 'retardation',
        title: '8. Hæmning',
        description: 'Langsom tankegang, tale, svækket koncentration.',
        options: [
            { label: 'Normal tale/tankegang', value: 0 },
            { label: 'Let hæmmet interview', value: 1 },
            { label: 'Tydelig hæmmet/langsom', value: 2 },
            { label: 'Vanskeligt interview', value: 3 },
            { label: 'Komplet stupor', value: 4 },
        ]
    },
    {
        id: 'agitation',
        title: '9. Uro/Agitation',
        description: 'Kan ikke sidde stille, krammer hænder mv.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Fingrer legende', value: 1 },
            { label: 'Kløer sig, piller', value: 2 },
            { label: 'Kan ikke sidde stille', value: 3 },
            { label: 'Vrider hænder, hiver hår', value: 4 },
        ]
    },
    {
        id: 'anxiety_psychological',
        title: '10. Angst (Psykisk)',
        description: 'Psykisk spænding og angstfuld forventning.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Lidt spænding/irritabilitet', value: 1 },
            { label: 'Bekymrer sig tydeligt', value: 2 },
            { label: 'Angst/frygt afspejlet i ansigt', value: 3 },
            { label: 'Frygter kontroltab/panik', value: 4 },
        ]
    },
    {
        id: 'anxiety_somatic',
        title: '11. Angst (Somatisk)',
        description: 'Fysiske angstsymptomer (hjertebanken, sved, mave-tarm).',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Lette symptomer', value: 1 },
            { label: 'Moderate symptomer', value: 2 },
            { label: 'Svære symptomer', value: 3 },
            { label: 'Invaliderende/Panikanfald', value: 4 },
        ]
    },
    {
        id: 'somatic_gastro',
        title: '12. Somatiske symptomer (Gastrointestinale)',
        description: 'Nedsat appetit, fordøjelsesbesvær.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Let nedsat appetit', value: 1 },
            { label: 'Ingen appetit / laksantia nødvendig', value: 2 },
        ]
    },
    {
        id: 'somatic_general',
        title: '13. Somatiske symptomer (Generelle)',
        description: 'Tyngdefornemmelse, muskelsmerter, tab af energi.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Træt/svag, lette smerter', value: 1 },
            { label: 'Meget svær / funktionstab', value: 2 },
        ]
    },
    {
        id: 'genital',
        title: '14. Genitale symptomer',
        description: 'Nedsat libido, menstruationsforstyrrelser.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Lette forstyrrelser', value: 1 },
            { label: 'Klart mærkbare / forstyrrende', value: 2 },
        ]
    },
    {
        id: 'hypochondriasis',
        title: '15. Hypokondri',
        description: 'Overskuelig fokusering på helbred.',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Bekymrer mod egen krop', value: 1 },
            { label: 'Optaget af helbredet', value: 2 },
            { label: 'Klager konstant', value: 3 },
            { label: 'Hypokondre vrangforestillinger', value: 4 },
        ]
    },
    {
        id: 'weight_loss',
        title: '16. Vægttab',
        description: 'Mærkbart fald i kropsvægt den seneste uge/måned.',
        options: [
            { label: 'Intet', value: 0 },
            { label: 'Tror han/hun taber sig', value: 1 },
            { label: 'Vægttab klart mindst 1 kg', value: 2 },
        ]
    },
    {
        id: 'insight',
        title: '17. Sygdomsindsigt',
        description: 'Patientens forståelse af sin tilstand.',
        options: [
            { label: 'Klar indsigt', value: 0 },
            { label: 'Delvis/erkender symptomer, benægter sygdom', value: 1 },
            { label: 'Ingen indsigt/fornægter overhovedet lidelse', value: 2 },
        ]
    }
];

function HamiltonDepression() {
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

    const isComplete = Object.keys(scores).length === HAMD_QUESTIONS.length;

    // HAM-D 17-item Score Interpretation: 
    // <13 (Normal/Remission), 13-17 (Let depression), 18-24 (Moderat depression), >=25 (Svær)
    const getScoreColor = () => {
        if (!isComplete) return "text-slate-400 bg-slate-50";
        if (totalScore >= 25) return "text-red-700 bg-red-100 border-red-200";
        if (totalScore >= 18) return "text-amber-700 bg-amber-100 border-amber-200";
        if (totalScore >= 13) return "text-yellow-700 bg-yellow-100 border-yellow-200";
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
                        <h1 className="text-3xl font-bold text-[#3A4A40] mb-3">Hamilton Depressionsskala (HAM-D17)</h1>
                        <p className="text-[#839788] text-base max-w-xl leading-relaxed">
                            Klinisk interview-skala designet til at vurdere sværhedsgraden af depressive symptomer hos patienter, der i forvejen har en diagnosticeret depressiv lidelse.
                        </p>
                    </div>

                    <a
                        href="https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/undersoegelser-og-proever/kalkulatorer/hamilton-17-depressionsskala/"
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
                {HAMD_QUESTIONS.map((q) => {
                    // Check how many options to determine column layout format
                    const optionCols = q.options.length <= 3 ? `sm:grid-cols-${q.options.length}` : 'sm:grid-cols-5';

                    return (
                        <div key={q.id} className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-6 shadow-sm border border-white hover:shadow-md transition-shadow">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-[#3A4A40]">{q.title}</h3>
                                {q.description && (
                                    <p className="text-sm text-[#839788] mt-1">{q.description}</p>
                                )}
                            </div>

                            <div className={`grid grid-cols-1 ${optionCols} gap-2`}>
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
                                {Object.keys(scores).length} af {HAMD_QUESTIONS.length} besvaret
                            </p>
                        </div>
                    </div>

                    <div className="text-3xl font-black tracking-tight">
                        {totalScore}<span className="text-lg font-bold opacity-70 ml-1">/52</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#F2F6F3]/50 rounded-2xl p-6 border border-[#E2E8DF] flex gap-4 items-start">
                <Info className="w-5 h-5 text-[#839788] shrink-0 mt-0.5" />
                <div className="text-sm text-[#5C6D63] space-y-2">
                    <p><strong>Faglig Tolkning:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li><strong>13-17 point:</strong> Let depression</li>
                        <li><strong>18-24 point:</strong> Moderat depression</li>
                        <li><strong>≥ 25 point:</strong> Svær depression</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default HamiltonDepression;
