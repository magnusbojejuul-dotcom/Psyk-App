import React, { useState, useEffect } from 'react';
import { ExternalLink, Info, Download, Stethoscope, Users, User } from '../Icons';

const FREQUENCY_OPTIONS_A = [
    { label: 'Aldrig', value: 0 },
    { label: 'Én gang om måneden eller sjældnere', value: 1 },
    { label: '2-4 gange om måneden', value: 2 },
    { label: '2-3 gange om ugen', value: 3 },
    { label: '4 gange eller mere om ugen', value: 4 },
];

const FREQUENCY_OPTIONS_B = [
    { label: 'Aldrig', value: 0 },
    { label: 'Sjældnere end én gang om måneden', value: 1 },
    { label: 'Hver måned', value: 2 },
    { label: 'Hver uge', value: 3 },
    { label: 'Dagligt eller næsten hver dag', value: 4 },
];

const CONSEQUENCE_OPTIONS = [
    { label: 'Nej', value: 0 },
    { label: 'Ja, men ikke i løbet af det sidste år', value: 2 },
    { label: 'Ja, i løbet af det sidste år', value: 4 },
];

const DUDIT_QUESTIONS = [
    {
        id: 'q1',
        title: '1. Hvor ofte anvender du andre stoffer end alkohol?',
        description: '(Se evt. listen over stoffer ovenfor)',
        options: FREQUENCY_OPTIONS_A
    },
    {
        id: 'q2',
        title: '2. Anvender du mere end et stof ved samme lejlighed?',
        options: FREQUENCY_OPTIONS_A
    },
    {
        id: 'q3',
        title: '3. Hvor mange gange i løbet af en typisk dag tager du stoffer, når du anvender stoffer?',
        options: [
            { label: '0', value: 0 },
            { label: '1 - 2', value: 1 },
            { label: '3 - 4', value: 2 },
            { label: '5 - 6', value: 3 },
            { label: '7 eller mere', value: 4 },
        ]
    },
    {
        id: 'q4',
        title: '4. Hvor ofte bliver du kraftig påvirket af stoffer?',
        options: FREQUENCY_OPTIONS_B
    },
    {
        id: 'q5',
        title: '5. Har du det sidste år oplevet at din længsel efter stoffer har været så stor at du ikke kunne stå imod?',
        options: FREQUENCY_OPTIONS_B
    },
    {
        id: 'q6',
        title: '6. Hvor ofte i løbet af det sidste år er det sket, at du ikke kunne stoppe med at tage stoffer når først du er begyndt?',
        options: FREQUENCY_OPTIONS_B
    },
    {
        id: 'q7',
        title: '7. Hvor ofte i løbet af det sidste år har du taget stoffer og så ladet være med at gøre noget som du burde have gjort?',
        options: FREQUENCY_OPTIONS_B
    },
    {
        id: 'q8',
        title: '8. Hvor ofte i løbet af det sidste år har du haft behov for at tage nogen form for stof om morgenen efter et stort stofindtag dagen inden?',
        options: FREQUENCY_OPTIONS_B
    },
    {
        id: 'q9',
        title: '9. Hvor ofte i løbet af det sidste år har du haft skyldsfølelse eller dårlig samvittighed på grund af, at du har anvendt stoffer?',
        options: FREQUENCY_OPTIONS_B
    },
    {
        id: 'q10',
        title: '10. Er du eller andre kommet til skade (psykisk eller fysisk) på grund af at du har anvendt stoffer?',
        options: CONSEQUENCE_OPTIONS
    },
    {
        id: 'q11',
        title: '11. Har en slægtning eller ven, læge eller sygeplejerske eller andre været urolige for dit brug af stoffer eller sagt til dig at du bør stoppe med at tage stoffer?',
        options: CONSEQUENCE_OPTIONS
    },
];

function Dudit() {
    const [scores, setScores] = useState({});
    const [totalScore, setTotalScore] = useState(0);
    const [gender, setGender] = useState('mand'); // 'mand' eller 'kvinde'
    const [showSubstances, setShowSubstances] = useState(false);

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

    const isComplete = Object.keys(scores).length === DUDIT_QUESTIONS.length;

    const getScoreColor = () => {
        if (!isComplete && totalScore === 0) return "text-slate-400 bg-slate-50";
        if (totalScore >= 25) return "text-red-700 bg-red-100 border-red-200";

        const probableLimit = gender === 'mand' ? 6 : 2;
        if (totalScore >= probableLimit) return "text-orange-700 bg-orange-100 border-orange-200";

        return "text-emerald-700 bg-emerald-100 border-emerald-200";
    };

    const getScoreInterpretation = () => {
        if (totalScore === 0 && Object.keys(scores).length === 0) return "Afventer...";
        if (totalScore >= 25) return "Sandsynlig stofafhængighed";

        const probableLimit = gender === 'mand' ? 6 : 2;
        if (totalScore >= probableLimit) return "Sandsynlige stofrelaterede problemer";

        return "Ingen umiddelbare stofrelaterede problemer";
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
                        <h1 className="text-3xl font-bold text-[#3A4A40] mb-3">DUDIT Screeningsværktøj</h1>
                        <p className="text-[#839788] text-base max-w-xl leading-relaxed">
                            Drug Use Disorders Identification Test. Et valideret spørgeskema til at identificere stofrelaterede problemer samt stofafhængighed.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                        <a
                            href="https://kunskapsguiden.se/omraden-och-teman/missbruk-och-beroende/bedomningsinstrument-for-att-identifiera/dudit/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E8DF] shadow-sm text-[#839788] hover:text-[#3A4A40] hover:border-[#839788] transition-all group"
                        >
                            <span className="text-sm font-medium">Scoring (Socialstyrelsen)</span>
                            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                        <a
                            href={`${import.meta.env.BASE_URL}pdf/9_DUDIT%20Dansk%20version.pdf`}
                            download
                            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#839788] text-white shadow-sm hover:bg-[#6A7A6E] transition-all group"
                        >
                            <Download className="w-4 h-4" />
                            <span className="text-sm font-medium">Original PDF</span>
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E2E8DF] relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="flex items-center gap-3 bg-white p-1 rounded-2xl shadow-sm border border-[#E2E8DF]">
                        <button
                            onClick={() => setGender('mand')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${gender === 'mand'
                                ? 'bg-[#3A4A40] text-white shadow-sm'
                                : 'text-[#839788] hover:bg-[#F2F6F3]'
                                }`}
                        >
                            <User className="w-4 h-4" />
                            Mand
                        </button>
                        <button
                            onClick={() => setGender('kvinde')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${gender === 'kvinde'
                                ? 'bg-[#3A4A40] text-white shadow-sm'
                                : 'text-[#839788] hover:bg-[#F2F6F3]'
                                }`}
                        >
                            <Users className="w-4 h-4" />
                            Kvinde
                        </button>
                    </div>

                    <button
                        onClick={() => setShowSubstances(!showSubstances)}
                        className="text-sm font-medium text-[#839788] hover:text-[#3A4A40] underline decoration-[#E2E8DF] underline-offset-4"
                    >
                        {showSubstances ? 'Skjul liste over stoffer' : 'Vis liste over stoffer'}
                    </button>
                </div>

                {showSubstances && (
                    <div className="mt-6 p-6 bg-[#F9FAF9] border border-[#E2E8DF] rounded-2xl text-sm text-[#5C6D63] animate-fade-in shadow-inner">
                        <h4 className="font-bold text-[#3A4A40] mb-4 uppercase tracking-wide">Liste over stoffer (OBS! Ikke alkohol)</h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div>
                                <strong className="text-[#3A4A40] block mb-2 border-b border-[#E2E8DF] pb-1">Cannabis</strong>
                                <ul className="space-y-1">
                                    <li>Marihuana</li>
                                    <li>Hash</li>
                                    <li>Hasholie</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-[#3A4A40] block mb-2 border-b border-[#E2E8DF] pb-1">Amfetamin</strong>
                                <ul className="space-y-1">
                                    <li>Methamfetamin</li>
                                    <li>Fenmetraline</li>
                                    <li>Khat</li>
                                    <li>Betelnød</li>
                                    <li>Ritaline (Methylphenidat)</li>
                                    <li>Dexamin (Amfetamin)</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-[#3A4A40] block mb-2 border-b border-[#E2E8DF] pb-1">Kokain</strong>
                                <ul className="space-y-1">
                                    <li>Crack</li>
                                    <li>Freebase</li>
                                    <li>Koka-blade</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-[#3A4A40] block mb-2 border-b border-[#E2E8DF] pb-1">Opiater</strong>
                                <ul className="space-y-1">
                                    <li>Heroin</li>
                                    <li>Opium</li>
                                    <li>Rygeheroin</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-[#3A4A40] block mb-2 border-b border-[#E2E8DF] pb-1">Hallucinogener</strong>
                                <ul className="space-y-1">
                                    <li>Ecstasy</li>
                                    <li>LSD</li>
                                    <li>Mescaline</li>
                                    <li>Peyote (kaktus)</li>
                                    <li>PCP, Englestøv</li>
                                    <li>Psilocybin (svampe)</li>
                                    <li>DMT</li>
                                    <li>Muskat</li>
                                </ul>
                            </div>
                            <div>
                                <strong className="text-[#3A4A40] block mb-2 border-b border-[#E2E8DF] pb-1">Opløsningsmidler</strong>
                                <ul className="space-y-1">
                                    <li>Fortynder</li>
                                    <li>Triklorætylen</li>
                                    <li>Benzin</li>
                                    <li>Gas</li>
                                    <li>Opløsningsmiddel</li>
                                    <li>Lim</li>
                                </ul>
                            </div>
                            <div className="lg:col-span-2">
                                <strong className="text-[#3A4A40] block mb-2 border-b border-[#E2E8DF] pb-1">GHB og andre</strong>
                                <ul className="space-y-1">
                                    <li>GHB, Anabolske steroider, Lattergas, Amylnitrit (poppers), Antikolinergika (Disipal, Akineton)</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-[#E8E4D9]/40 p-5 rounded-xl border border-[#E2E8DF]">
                            <h4 className="font-bold text-[#3A4A40] mb-3 uppercase tracking-wide text-center">Tabletter - Lægemidler</h4>

                            <p className="font-medium text-[#3A4A40] mb-2">Tabletter tæller som stoffer når du tager:</p>
                            <ul className="list-disc pl-5 mb-5 space-y-1">
                                <li>lægemidler mere eller oftere end lægen har sagt du bør gøre</li>
                                <li>tabletter for at have det sjovt, føle velbehag, blive "høj" eller for at prøve deres virkning</li>
                                <li>tabletter du har fået fra et familiemedlem eller en ven</li>
                                <li>tabletter du har købt på det "sorte marked" eller stjålet</li>
                            </ul>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow-sm mb-5">
                                <div>
                                    <strong className="text-[#3A4A40] block mb-2">SOVE/BEROLIGENDE MIDLER</strong>
                                    <p className="text-xs leading-relaxed text-[#5C6D63]">
                                        Alopam, Alprazolam, Alprox, Apodorm, Apozepam, Broman, Diazepam, Dormicum, Flunipam, Flunitrazepam, Frisium, Halcion, Hexalid, Klopoxid, Lexotan, Midazolam, Mogadon, Nimadorm, Nitrazepam, Noctamide, Oxabenz, Oxapax, Oxazepam, Pacisyn, Pronoctan, Imoclone, Imovane, Imozop, Risolid, Ronal, Sonata, Stilnoct, Stesolid, Tafil, Temesta, Trizolam, Valaxona, Valium, Zolpidem, Zonoct, Zopiclone
                                    </p>
                                </div>
                                <div>
                                    <strong className="text-[#3A4A40] block mb-2">SMERTESTILLENDE</strong>
                                    <p className="text-xs leading-relaxed text-[#5C6D63]">
                                        Abalgin, Actiq, Buprenorfin, Bupivacain-morfin, Contalgin, Depolan, Dolol, Doltrad, Doloxene, Durogesic, Fentanyl, Fortamol, Jurnista, Ketogan, Kodamid, Kodimagnyl, Kodein, Kodipar, Malfin, Mandolgin, Matrifen, Metadon, Metracop, Morfin, Nobligan, Norspan, OxyContin, OxyNorm, Palladon, Pamol, Panodil, Paracetamol, Paratabs, Perfalgan, Petidin, Pinex, Pinex comp., Skopolamin, Suboxone, Subutex, Tadol, Temgesic, Tradolan, Tramadol, Transtec, Vilan
                                    </p>
                                </div>
                            </div>

                            <p className="text-center font-semibold text-[#839788] italic px-4">
                                Tabletter tæller IKKE som stoffer når du har fået dem udskrevet af læge og du tager dem i rette mængde.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {DUDIT_QUESTIONS.map((q) => {
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
                                {Object.keys(scores).length} af {DUDIT_QUESTIONS.length} besvaret
                            </p>
                        </div>
                    </div>

                    <div className="text-3xl font-black tracking-tight">
                        {totalScore}<span className="text-lg font-bold opacity-70 ml-1">/44</span>
                    </div>
                </div>
            </div>

            <div className="bg-[#F2F6F3]/50 rounded-2xl p-6 border border-[#E2E8DF] flex gap-4 items-start">
                <Info className="w-5 h-5 text-[#839788] shrink-0 mt-0.5" />
                <div className="text-sm text-[#5C6D63] space-y-4 w-full">
                    <div>
                        <p className="font-semibold text-[#3A4A40] mb-2">Faglig Tolkning af Total Score:</p>
                        <p className="mb-2">Pointgrænserne afhænger af kønnet. Der kan max scores 44 point.</p>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>
                                <strong>Mænd:</strong>
                                <ul className="list-circle pl-6 mt-1 space-y-1">
                                    <li>0-5 point: Ingen umiddelbare stofrelaterede problemer.</li>
                                    <li>6-24 point: Sandsynlige stofrelaterede problemer (skadeligt forbrug eller misbrug).</li>
                                    <li>≥ 25 point: Sandsynlig stofafhængighed.</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Kvinder:</strong>
                                <ul className="list-circle pl-6 mt-1 space-y-1">
                                    <li>0-1 point: Ingen umiddelbare stofrelaterede problemer.</li>
                                    <li>2-24 point: Sandsynlige stofrelaterede problemer (skadeligt forbrug eller misbrug).</li>
                                    <li>≥ 25 point: Sandsynlig stofafhængighed.</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dudit;
