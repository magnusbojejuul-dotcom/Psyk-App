import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, ChevronRight, RotateCcw, Sparkles, HelpCircle, Eye, EyeOff, Activity, BookOpen, Layers } from '../Icons';
import EkgViewer from './EkgViewer';

export default function EkgQuizTrainer({
    cases = [],
    currentCase,
    onSelectCase,
    onShowOnHeart
}) {
    const [isBlinded, setIsBlinded] = useState(false);
    const [selectedLead, setSelectedLead] = useState('II');
    const [feedbackMode, setFeedbackMode] = useState('immediate'); // 'immediate' | 'exam'
    const [selectedCategory, setSelectedCategory] = useState('Alle');
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const quizQuestions = currentCase?.quiz || [];

    const categories = ['Alle', 'Normal', 'Iskæmi & Infarkt', 'Arytmi', 'Ledningsblok', 'Elektrolyt & QTc'];
    const filteredCases = selectedCategory === 'Alle'
        ? cases
        : cases.filter(c => c.category === selectedCategory);

    const handleSelectOption = (qIdx, optIdx) => {
        if (showResults && feedbackMode === 'exam') return; // Låst efter evaluering i eksamenstilstand
        const updated = {
            ...selectedAnswers,
            [qIdx]: optIdx
        };
        setSelectedAnswers(updated);

        // Opdater score dynamisk
        let correctCount = 0;
        quizQuestions.forEach((q, idx) => {
            if (updated[idx] === q.correctIndex) {
                correctCount++;
            }
        });
        setScore(correctCount);
    };

    const handleEvaluate = () => {
        let correctCount = 0;
        quizQuestions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correctIndex) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setShowResults(true);
    };

    const handleResetQuiz = () => {
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);
    };

    const handleRevealSolution = () => {
        const sol = {};
        quizQuestions.forEach((q, idx) => {
            sol[idx] = q.correctIndex;
        });
        setSelectedAnswers(sol);
        setScore(quizQuestions.length);
        setShowResults(true);
    };

    const handleNextRandomCase = () => {
        const pool = filteredCases.length > 1 ? filteredCases : cases;
        const otherCases = pool.filter(c => c.id !== currentCase.id);
        const randomCase = otherCases[Math.floor(Math.random() * otherCases.length)] || pool[0];
        if (randomCase) {
            onSelectCase(randomCase);
            handleResetQuiz();
        }
    };

    const isAllAnswered = quizQuestions.length > 0 && quizQuestions.every((_, idx) => selectedAnswers[idx] !== undefined);
    const answeredCount = Object.keys(selectedAnswers).length;

    // Skjul metadata i blindet tilstand
    const displayCase = isBlinded && !showResults ? {
        ...currentCase,
        title: 'Ukendt EKG-Case (Blindet Træning)',
        subtitle: 'Vurder 12-aflednings EKG\'et systematisk og besvar spørgsmålene herunder',
        badge: 'Træning'
    } : currentCase;

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Værktøjslinje for Træningsmodul */}
            <div className="glass-panel rounded-3xl p-5 border border-[#E8E4D9] bg-white/80 shadow-sm flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#839788] p-2.5 rounded-2xl text-white shadow-xs">
                            <Award className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#3A4A40] leading-tight">EKG Træningssimulator & Quiz</h2>
                            <p className="text-xs text-[#839788]">Lær at aflæse 12-aflednings EKGr systematisk efter Hampton-metoden</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {/* Feedback-tilstand vælger */}
                        <div className="flex bg-[#F2F6F3] p-1 rounded-2xl border border-[#E8E4D9] text-xs">
                            <button
                                onClick={() => setFeedbackMode('immediate')}
                                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${feedbackMode === 'immediate'
                                    ? 'bg-white text-[#3A4A40] shadow-sm'
                                    : 'text-[#839788] hover:text-[#3A4A40]'
                                    }`}
                                title="Få feedback med forklaring for hvert trin med det samme"
                            >
                                Øjeblikkelig Feedback
                            </button>
                            <button
                                onClick={() => setFeedbackMode('exam')}
                                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${feedbackMode === 'exam'
                                    ? 'bg-white text-[#3A4A40] shadow-sm'
                                    : 'text-[#839788] hover:text-[#3A4A40]'
                                    }`}
                                title="Testtilstand: besvar alle trin før facit"
                            >
                                Testtilstand
                            </button>
                        </div>

                        {/* Blindet tilstand knap */}
                        <button
                            onClick={() => setIsBlinded(!isBlinded)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${isBlinded
                                ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                                : 'bg-[#F2F6F3] text-[#3A4A40] border-[#E8E4D9] hover:bg-[#E2E8DF]'
                                }`}
                            title="Skjul diagnosenavnet på EKG-papiret for realistisk tolkning"
                        >
                            {isBlinded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            <span>{isBlinded ? 'Blindet Aktiv' : 'Slå Blindet Til'}</span>
                        </button>

                        {/* Vælg tilfældig case */}
                        <button
                            onClick={handleNextRandomCase}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#839788] text-white hover:bg-[#6A7A6E] transition-colors shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            Tilfældig Case
                        </button>
                    </div>
                </div>

                {/* Hurtigvælger for Case og Kategori */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E4D9]/70">
                    <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-0.5">
                        <span className="text-[11px] font-bold text-[#839788] mr-1">Filter:</span>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-2.5 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-colors border ${selectedCategory === cat
                                    ? 'bg-[#3A4A40] text-white border-[#2C3F34] font-bold shadow-xs'
                                    : 'bg-[#F2F6F3] text-[#839788] border-[#E8E4D9] hover:bg-[#E2E8DF]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#839788]">Vælg Case:</span>
                        <select
                            value={currentCase.id}
                            onChange={(e) => {
                                const found = cases.find(c => c.id === e.target.value);
                                if (found) {
                                    onSelectCase(found);
                                    handleResetQuiz();
                                }
                            }}
                            className="bg-[#F2F6F3] border border-[#E8E4D9] rounded-xl px-3 py-1.5 text-xs font-bold text-[#3A4A40] focus:outline-none cursor-pointer max-w-[240px] truncate"
                        >
                            {filteredCases.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Patient anamnese kort */}
            <div className="p-4 bg-[#EFF3F0] rounded-2xl border border-[#D9E1DA] text-xs text-[#3A4A40] flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-[#839788] shrink-0 mt-0.5" />
                <div>
                    <strong className="text-[#2C3F34] font-bold block mb-0.5">Klinisk Kontekst:</strong>
                    <p className="text-[#3A4A40]">{currentCase.description}</p>
                </div>
            </div>

            {/* EKG Strimmel Fremviser med aktiv afledningsvalg */}
            <EkgViewer
                caseData={displayCase}
                selectedLead={selectedLead}
                onSelectLead={setSelectedLead}
                onShowOnHeart={onShowOnHeart}
            />

            {/* SPØRGSMÅL OG SYSTEMATISK DIAGNOSTIK */}
            <div className="glass-panel rounded-3xl p-6 border border-[#E8E4D9] bg-white/90 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E8E4D9]">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#E2E8DF] p-2 rounded-xl text-[#3A4A40]">
                            <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-[#3A4A40]">Systematisk Tolknings-Quiz</h3>
                            <p className="text-xs text-[#839788]">Gennemgå EKG'et trin for trin og afgiv dine svar</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-[#839788] font-medium">
                            Besvaret: <strong className="text-[#3A4A40]">{answeredCount}</strong> / {quizQuestions.length}
                        </span>
                        {(showResults || (feedbackMode === 'immediate' && answeredCount > 0)) && (
                            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs">
                                <Award className="w-4 h-4 text-emerald-600" />
                                Rigtige: {score} af {answeredCount} besvarede
                            </div>
                        )}
                    </div>
                </div>

                {/* Spørgsmålskort */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {quizQuestions.map((q, qIdx) => {
                        const isAnswered = selectedAnswers[qIdx] !== undefined;
                        const isCorrect = isAnswered && selectedAnswers[qIdx] === q.correctIndex;
                        const showFeedbackForCard = showResults || (feedbackMode === 'immediate' && isAnswered);

                        return (
                            <div
                                key={qIdx}
                                className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${showFeedbackForCard
                                    ? isCorrect
                                        ? 'bg-emerald-50/70 border-emerald-300'
                                        : 'bg-red-50/70 border-red-300'
                                    : isAnswered
                                        ? 'bg-white border-[#839788] shadow-xs'
                                        : 'bg-[#F9F8F6] border-[#E8E4D9]'
                                    }`}
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#839788]">
                                            Trin {qIdx + 1}: {q.step}
                                        </span>
                                        {showFeedbackForCard && (
                                            isCorrect ? (
                                                <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                                    <span>Korrekt</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-red-700 text-xs font-bold">
                                                    <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                                                    <span>Forkert</span>
                                                </div>
                                            )
                                        )}
                                    </div>

                                    <h4 className="text-sm font-bold text-[#3A4A40] mb-3 leading-snug">
                                        {q.question}
                                    </h4>

                                    {/* Svarmuligheder */}
                                    <div className="space-y-2 mb-4">
                                        {q.options.map((opt, optIdx) => {
                                            const isSelected = selectedAnswers[qIdx] === optIdx;
                                            const isThisCorrect = optIdx === q.correctIndex;

                                            let btnClass = "bg-white border-[#E8E4D9] text-[#3A4A40] hover:bg-[#F2F6F3]";

                                            if (showFeedbackForCard) {
                                                if (isThisCorrect) {
                                                    btnClass = "bg-emerald-600 text-white border-emerald-700 font-bold shadow-xs";
                                                } else if (isSelected) {
                                                    btnClass = "bg-red-600 text-white border-red-700 font-medium";
                                                } else {
                                                    btnClass = "bg-white/60 border-[#E8E4D9] text-slate-400 opacity-60";
                                                }
                                            } else if (isSelected) {
                                                btnClass = "bg-[#839788] text-white border-[#6A7A6E] font-bold shadow-xs";
                                            }

                                            return (
                                                <button
                                                    key={optIdx}
                                                    disabled={showResults && feedbackMode === 'exam'}
                                                    onClick={() => handleSelectOption(qIdx, optIdx)}
                                                    className={`w-full text-left text-xs p-3 rounded-xl border transition-all flex items-start gap-2.5 ${btnClass}`}
                                                >
                                                    <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                                                        {String.fromCharCode(65 + optIdx)}
                                                    </span>
                                                    <span className="leading-snug">{opt}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Forklaring når resultaterne vises */}
                                {showFeedbackForCard && (
                                    <div className="pt-3 mt-2 border-t border-[#E8E4D9]/80 text-xs text-[#3A4A40] leading-relaxed bg-white/70 p-3 rounded-xl">
                                        <strong className="block text-[#2C3F34] font-bold mb-1">Pædagogisk Forklaring:</strong>
                                        <p className="text-[#3A4A40]">{q.explanation}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Handlingsknapper i bunden af quizzen */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E8E4D9]">
                    <div className="flex flex-wrap items-center gap-2.5">
                        {feedbackMode === 'exam' && !showResults && (
                            <button
                                disabled={!isAllAnswered}
                                onClick={handleEvaluate}
                                className={`px-6 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-sm ${isAllAnswered
                                    ? 'bg-[#3A4A40] text-white hover:bg-[#2C3F34]'
                                    : 'bg-[#E2E8DF] text-[#839788] cursor-not-allowed'
                                    }`}
                            >
                                Evaluer Mine Svar
                            </button>
                        )}

                        {!showResults && (
                            <button
                                onClick={handleRevealSolution}
                                className="px-4 py-2.5 rounded-2xl font-bold text-xs bg-[#F2F6F3] text-[#3A4A40] border border-[#E8E4D9] hover:bg-[#E2E8DF] transition-colors"
                            >
                                Vis Facit & Forklaringer
                            </button>
                        )}

                        <button
                            onClick={handleResetQuiz}
                            className="px-4 py-2.5 rounded-2xl font-bold text-xs bg-[#F2F6F3] text-[#3A4A40] border border-[#E8E4D9] hover:bg-[#E2E8DF] transition-colors flex items-center gap-1.5"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Nulstil Svar
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleNextRandomCase}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold bg-[#839788] text-white hover:bg-[#6A7A6E] transition-colors shadow-sm"
                        >
                            Næste Træningscase <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* HAMPTOMS KLINISKE PERLER SEKTION (Afsløres efter evaluering eller ved ønske) */}
                {showResults && (
                    <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 mt-2 text-xs text-amber-950 leading-relaxed shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <h4 className="font-bold text-sm text-amber-900">Hamptons Kliniske Perler for {currentCase.title}:</h4>
                        </div>
                        <p className="mb-3 text-amber-900 leading-relaxed italic">
                            "{currentCase.hamptonPearls}"
                        </p>
                        <div className="p-3 bg-white/80 rounded-xl border border-amber-200/80 text-amber-950">
                            <strong>Anatomisk og patofysiologisk mekanisme: </strong>
                            <span>{currentCase.anatomicalEffect}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
