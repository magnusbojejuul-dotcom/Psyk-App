import React, { useState } from 'react';
import { ExternalLink, Info, Download } from '../Icons';

const COWS_QUESTIONS = [
    {
        id: 'pulse',
        title: '1. Hvilepuls (Resting Pulse Rate)',
        subtitle: 'Målt efter patienten har siddet ned eller ligget ned i 1 minut',
        options: [
            { label: 'Puls 80 eller lavere', value: 0 },
            { label: 'Puls 81-100', value: 1 },
            { label: 'Puls 101-120', value: 2 },
            { label: 'Puls over 120', value: 4 },
        ]
    },
    {
        id: 'sweat',
        title: '2. Svedtendens (Sweating)',
        subtitle: 'I løbet af den seneste 1/2 time, ikke relateret til stuetemperatur eller fysisk aktivitet',
        options: [
            { label: 'Ingen sved eller kulderystelser', value: 0 },
            { label: 'Føler sig kold eller småfryser', value: 1 },
            { label: 'Rødmen, let sved pibler frem', value: 2 },
            { label: 'Svedperler i ansigt eller på brystet', value: 3 },
            { label: 'Sveden driver af ansigtet', value: 4 },
        ]
    },
    {
        id: 'restless',
        title: '3. Rastløshed (Restlessness)',
        subtitle: 'Observeret ved klinisk vurdering',
        options: [
            { label: 'Sidder stille', value: 0 },
            { label: 'Kan sidde stille, men har svært ved at holde benene i ro', value: 1 },
            { label: 'Hyppige skift af siddestilling, kan ikke sidde stille', value: 3 },
            { label: 'Går hvileløst rundt, kan overhovedet ikke sidde stille', value: 5 },
        ]
    },
    {
        id: 'pupils',
        title: '4. Pupilstørrelse (Pupil Size)',
        subtitle: 'Vurderet i almindelig stuebelysning',
        options: [
            { label: 'Pupiller knappenålsstore (Pinned) eller almindelig størrelse', value: 0 },
            { label: 'Pupiller muligvis lidt større end normalt for lysforholdene', value: 1 },
            { label: 'Pupiller moderat udvidede', value: 2 },
            { label: 'Pupiller maksimalt udvidede', value: 5 },
        ]
    },
    {
        id: 'bone_ache',
        title: '5. Smerter i knogler eller led (Bone or Joint Aches)',
        subtitle: 'Hvis patienten havde smerter forud for misbruget, medregnes kun ekstra smerter',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Milde diffuse smerter', value: 1 },
            { label: 'Patienten klager over stærke smerter i led eller muskler', value: 2 },
            { label: 'Patienten gnider konstant led eller muskler og tåler ikke berøring', value: 4 },
        ]
    },
    {
        id: 'runny_nose',
        title: '6. Næseflåd eller tåreflåd (Runny Nose or Tearing)',
        subtitle: 'Ikke forårsaget af forkølelse eller allergi',
        options: [
            { label: 'Ingen', value: 0 },
            { label: 'Snøften eller løbende øjne', value: 1 },
            { label: 'Næsen løber konstant eller tårerne triller', value: 2 },
            { label: 'Konstant stærkt flåd fra næse og øjne', value: 4 },
        ]
    },
    {
        id: 'gi_upset',
        title: '7. Gastrointestinale symptomer (GI Upset)',
        subtitle: 'I løbet af den seneste 1/2 time',
        options: [
            { label: 'Ingen mavetræthed eller gener', value: 0 },
            { label: 'Mavekramper', value: 1 },
            { label: 'Kvalme eller tynd afføring', value: 2 },
            { label: 'Opkastning eller diaré', value: 3 },
            { label: 'Flere tilfælde af opkastning eller diaré', value: 5 },
        ]
    },
    {
        id: 'tremor',
        title: '8. Tremor (Rysten)',
        subtitle: 'Observation af udstrakte hænder',
        options: [
            { label: 'Ingen tremor', value: 0 },
            { label: 'Tremor svær at se, men kan mærkes på fingerspidserne', value: 1 },
            { label: 'Let men synlig tremor', value: 2 },
            { label: 'Tydelig kraftig rysten eller muskelstrækninger', value: 4 },
        ]
    },
    {
        id: 'yawning',
        title: '9. Gæspen (Yawning)',
        subtitle: 'Observation under selve samtalen / vurderingen',
        options: [
            { label: 'Ingen gæspen', value: 0 },
            { label: 'Gæspet 1 eller 2 gange under vurderingen', value: 1 },
            { label: 'Gæspet 3 eller flere gange under vurderingen', value: 2 },
            { label: 'Gæsper konstant under samtalen', value: 4 },
        ]
    },
    {
        id: 'anxiety',
        title: '10. Angst eller irritabilitet (Anxiety or Irritability)',
        subtitle: 'Klinisk vurdering (og ikke primært selv-rapport)',
        options: [
            { label: 'Ingen angst', value: 0 },
            { label: 'Patienten rapporterer øget irritabilitet eller let angst', value: 1 },
            { label: 'Patienten virker åbenlyst irritabel eller meget angst', value: 2 },
            { label: 'Patienten er så angst eller irritabel at pgl. har svært ved at medvirke til samtalen', value: 4 },
        ]
    },
    {
        id: 'gooseflesh',
        title: '11. "Gåsehud" (Gooseflesh / Piloerection)',
        subtitle: 'Klinisk observation (skal mærkes for at være sikker)',
        options: [
            { label: 'Glat hud', value: 0 },
            { label: 'Gåsehudsfølelse når huden berøres (hårene rejser sig)', value: 3 },
            { label: 'Tydelige og fremtrædende "knopper" på armene', value: 5 },
        ]
    }
];

function Cows() {
    const [answers, setAnswers] = useState({});

    const handleOptionSelect = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const calculateTotalScore = () => {
        return Object.values(answers).reduce((sum, value) => sum + value, 0);
    };

    const getScoreInterpretation = () => {
        const totalScore = calculateTotalScore();
        const numAnswered = Object.keys(answers).length;

        if (numAnswered < COWS_QUESTIONS.length) {
            return {
                text: 'Besvar alle spørgsmål for at se fortolkningen',
                color: 'text-slate-500',
                bgColor: 'bg-slate-50'
            };
        }

        if (totalScore >= 36) return { text: 'Meget svære abstinenser', color: 'text-rose-700', bgColor: 'bg-rose-50' };
        if (totalScore >= 25) return { text: 'Svære abstinenser', color: 'text-orange-700', bgColor: 'bg-orange-50' };
        if (totalScore >= 13) return { text: 'Moderate abstinenser', color: 'text-amber-700', bgColor: 'bg-amber-50' };
        if (totalScore >= 5) return { text: 'Milde abstinenser', color: 'text-yellow-700', bgColor: 'bg-yellow-50' };
        return { text: 'Ingen eller helt lette abstinenser', color: 'text-emerald-700', bgColor: 'bg-emerald-50' };
    };

    const interpretation = getScoreInterpretation();
    const progress = (Object.keys(answers).length / COWS_QUESTIONS.length) * 100;

    const resetForm = () => {
        if (window.confirm('Er du sikker på, at du vil rydde alle besvarelser?')) {
            setAnswers({});
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-3xl mx-auto pb-24 animate-in fade-in duration-500">
            {/* Header Sticky Container */}
            <div className="sticky top-0 z-10 bg-[#FAF9F6] pt-6 pb-4 border-b border-[#E8E4D9] mb-8">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#3A4A40]">COWS</h2>
                        <p className="text-[#839788] text-sm">Clinical Opiate Withdrawal Scale (0 - 48 point)</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black text-[#839788] mb-1">
                            {calculateTotalScore()}
                        </div>
                        <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                            Total Score
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#E8E4D9]/50 rounded-full h-1.5 overflow-hidden">
                    <div
                        className="bg-[#839788] h-1.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Introductory Info Box */}
            <div className="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-5 mb-8 text-sm text-[#5C6D63] shadow-sm flex items-start gap-4">
                <Info className="w-6 h-6 text-amber-600 mt-1 shrink-0" />
                <div className="space-y-2">
                    <p>
                        <strong className="text-amber-900 block mb-1">Bruges til vurdering af opioid-abstinenser</strong>
                        For hver parameter vurderes udelukkende patientens direkte observationer eller svar ud fra de foreliggende opgørelser. Scoringssystemet bruges dels diagnostisk til at fastlægge graden af abstinenser, og dels terapeutisk (fx ved indstilling af Buprenorphin/Suboxon-dosis).
                    </p>
                    <p>Patienten <strong className="text-amber-900">IKKE</strong> have indtaget buprenorphin op til samtalen, da buprenorphin uden tilstedeværelse af tilstrækkeligt mange abstinenssymptomer på en fuld agonist (heroin, metadon, doltard) kan udløse meget pludselige og udtalte (præcipiterede) abstinenser.</p>
                </div>
            </div>

            {/* Questions Grid */}
            <div className="space-y-8">
                {COWS_QUESTIONS.map((q) => (
                    <div key={q.id} className="bg-white/70 p-6 rounded-2xl border border-[#E8E4D9] shadow-sm hover:border-[#839788]/50 transition-colors duration-300">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-[#3A4A40] leading-snug">{q.title}</h3>
                            {q.subtitle && <p className="text-sm text-[#839788] mt-1">{q.subtitle}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            {q.options.map((opt, idx) => {
                                const isSelected = answers[q.id] === opt.value;
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleOptionSelect(q.id, opt.value)}
                                        className={`flex items-center justify-between p-4 rounded-xl text-left transition-all duration-200 border w-full
                                            ${isSelected
                                                ? 'bg-[#E2E8DF] border-[#839788] shadow-md ring-1 ring-[#839788]'
                                                : 'bg-white border-[#E8E4D9] hover:border-[#839788]/40 hover:bg-slate-50'
                                            }`}
                                    >
                                        <span className={`text-sm md:text-base font-medium ${isSelected ? 'text-[#3A4A40]' : 'text-[#5C6B61]'}`}>
                                            {opt.label}
                                        </span>
                                        <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 ml-4
                                            ${isSelected ? 'bg-white text-[#839788] shadow-sm' : 'bg-[#F2F6F3] text-slate-400'}`}>
                                            {opt.value}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Results Footer Box */}
            <div className="mt-12 bg-white rounded-2xl border border-[#E8E4D9] shadow-sm overflow-hidden">
                <div className="p-6 md:p-8">
                    <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest text-center">Resultat af COWS Score</h3>

                    <div className={`p-6 rounded-2xl border mb-6 flex items-center justify-center text-center transition-colors duration-500
                        ${Object.keys(answers).length === COWS_QUESTIONS.length ? interpretation.bgColor : 'bg-slate-50'}
                        ${Object.keys(answers).length === COWS_QUESTIONS.length ? 'border-transparent' : 'border-slate-100'}`}
                    >
                        <div>
                            <div className="text-5xl font-black text-[#3A4A40] mb-3 font-mono tracking-tight">
                                {calculateTotalScore()} <span className="text-xl text-slate-400 font-sans tracking-normal">point</span>
                            </div>
                            <div className={`text-lg font-bold ${interpretation.color}`}>
                                {interpretation.text}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
                        <button
                            onClick={resetForm}
                            disabled={Object.keys(answers).length === 0}
                            className={`px-4 py-2 text-sm font-medium rounded-xl transition-all
                                ${Object.keys(answers).length === 0
                                    ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
                                    : 'text-red-500 hover:bg-red-50 hover:text-red-600'}`}
                        >
                            Nulstil score
                        </button>
                        <div className="flex flex-col md:flex-row gap-2">
                            <a
                                href="https://www.mdcalc.com/calc/1985/cows-score-opiate-withdrawal"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E8DF] shadow-sm text-[#839788] hover:text-[#3A4A40] hover:border-[#839788] transition-all group"
                            >
                                <span className="text-sm font-medium">Link (MDCalc)</span>
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                            <a
                                href={`${import.meta.env.BASE_URL}pdf/COWS_dansk.pdf`}
                                download
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#839788] text-white shadow-sm hover:bg-[#6A7A6E] transition-all group"
                            >
                                <Download className="w-4 h-4" />
                                <span className="text-sm font-medium">Dansk PDF</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cows;
