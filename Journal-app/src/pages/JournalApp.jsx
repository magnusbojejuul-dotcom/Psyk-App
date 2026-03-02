import React, { useState, useEffect, useRef, useMemo } from 'react';
import DiffMatchPatch from 'diff-match-patch';
import GdprBanner from '../GdprBanner';
import { ANOREXIA_OPTIONS } from '../data/anorexiaOptions';
import Input from '../components/Input';
import { Activity, Brain, Stethoscope, FileText, RotateCcw, Clipboard, Copy, Maximize, Minimize, CheckCircle2, AlertCircle, XCircle, ToggleLeft, ToggleRight, MessageSquare, Layers, Trash2, Star, PenLine, Cookie, Plus, ChevronRight, Layout, Repeat, AlertTriangle } from '../components/Icons';
import { ACTUAL_PSYCH_OPTIONS, DEP_CORE_IDS, DEP_ACC_IDS } from '../data/actualPsychOptions';
import { PSYCH_OPTIONS, PSYCH_NORMAL_IDS } from '../data/psychOptions';
import { SOMATIC_ACT_OPTIONS, SOMATIC_OBJ_OPTIONS, SOMATIC_NORMAL_IDS, SOMATIC_ACT_NORMAL_IDS } from '../data/somaticOptions';

// --- JOURNAL APP KOMPONENT ---
function JournalApp({ onNavigate }) {
    const [activeSection, setActiveSection] = useState('psych_actual');
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [optionDetails, setOptionDetails] = useState({});
    const [generatedText, setGeneratedText] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [notification, setNotification] = useState(null);
    const [showSummary, setShowSummary] = useState(false);

    // Indledende Anamnese states
    const [contactReasonText, setContactReasonText] = useState('');
    const [timelineText, setTimelineText] = useState('');

    const [dietDays, setDietDays] = useState([]);
    const [activeDietDayId, setActiveDietDayId] = useState(null);
    const [isUniformDiet, setIsUniformDiet] = useState(false);

    const [manualEditMode, setManualEditMode] = useState(false);

    // Auto-merge refs
    const lastAutoTextRef = useRef('');
    const lastUserTextRef = useRef('');
    const dmp = useMemo(() => new DiffMatchPatch(), []);

    // Custom Modal State
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, action: null });

    useEffect(() => {
        const defaults = new Set();
        [...PSYCH_OPTIONS, ...SOMATIC_OBJ_OPTIONS, ...SOMATIC_ACT_OPTIONS, ...ACTUAL_PSYCH_OPTIONS, ...ANOREXIA_OPTIONS].forEach(opt => {
            if (opt.isDefault) defaults.add(opt.id);
        });
        setSelectedIds(defaults);
    }, []);

    // --- CORE TEXT GENERATION LOGIC ---

    const capitalize = (s) => {
        if (!s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const formatList = (items) => {
        if (items.length === 0) return '';
        if (items.length === 1) return items[0];
        const last = items.pop();
        return items.join(', ') + ' og ' + last;
    };

    const formatWithDetail = (opt, detail) => {
        let base = opt.text.trim();
        const d = detail ? detail.trim() : '';

        if (d === '') {
            if (base.endsWith(':')) return base.slice(0, -1) + '.';
            return base + (base.match(/[.:?!]$/) ? '' : '.');
        }

        if (opt.detailInParens) {
            let cleanBase = base.replace(/\.$/, '');
            return `${cleanBase} (${d}).`;
        }

        if (!base.match(/[.:?!]$/)) {
            return `${base} ${d}.`;
        }

        if (base.match(/[:?!]$/)) {
            const formattedDetail = d.charAt(0).toUpperCase() + d.slice(1);
            return `${base} ${formattedDetail}${formattedDetail.endsWith('.') ? '' : '.'}`;
        }

        const formattedDetail = d.charAt(0).toUpperCase() + d.slice(1);
        return `${base} ${formattedDetail}${formattedDetail.endsWith('.') ? '' : '.'}`;
    };

    const calculateDepressionSeverity = (selectedSet) => {
        const coreCount = DEP_CORE_IDS.filter(id => selectedSet.has(id)).length;
        const accCount = DEP_ACC_IDS.filter(id => selectedSet.has(id)).length;

        if (coreCount === 3 && accCount >= 5) return 'svær';
        if (coreCount >= 2 && accCount >= 4) return 'moderat';
        if (coreCount >= 2 && accCount >= 2) return 'lettere';

        return null;
    };

    const processCategoryOptions = (categoryOptions, categoryName, currentSelectedIds, currentDetails) => {
        const lines = [];
        const prefixUsage = new Set();

        const plainItemsByPrefix = {};
        const detailedOptions = [];
        const standaloneOptions = [];

        categoryOptions.forEach(opt => {
            if (!currentSelectedIds.has(opt.id)) return;

            const detail = currentDetails[opt.id];
            const hasDetail = detail && detail.trim() !== '';

            if (opt.smartMerge && !opt.isDefault) {
                const prefix = opt.smartMerge.prefix || '';
                if (!hasDetail) {
                    if (!plainItemsByPrefix[prefix]) plainItemsByPrefix[prefix] = [];
                    plainItemsByPrefix[prefix].push(opt);
                } else {
                    detailedOptions.push({ opt, detail });
                }
            } else {
                standaloneOptions.push({ opt, detail });
            }
        });

        Object.keys(plainItemsByPrefix).forEach(prefix => {
            const opts = plainItemsByPrefix[prefix];
            const items = opts.map(o => o.smartMerge.item);
            const suffix = opts[0].smartMerge.suffix || '.';
            const mergedItems = formatList(items);

            let safeSuffix = suffix.trim();
            if (safeSuffix === ':' || safeSuffix.endsWith(':')) safeSuffix = safeSuffix.replace(/:$/, '.');

            lines.push(capitalize(`${prefix}${mergedItems}${safeSuffix}`));
            prefixUsage.add(prefix.trim());
        });

        detailedOptions.forEach(({ opt, detail }) => {
            const prefix = opt.smartMerge.prefix || '';
            const item = opt.smartMerge.item;
            const suffix = opt.smartMerge.suffix || '.';
            const cleanedDetail = detail ? detail.trim() : '';

            let finalSentence = "";
            const cleanPrefix = prefix.trim();

            const shouldDropPrefix = cleanPrefix.length > 7 && prefixUsage.has(cleanPrefix);

            let effectivePrefix = shouldDropPrefix ? "" : prefix;
            let formattedItem = shouldDropPrefix ? capitalize(item) : item;

            if (cleanedDetail === '') {
                let fallbackS = suffix.trim();
                if (fallbackS === ':' || fallbackS.endsWith(':')) fallbackS = fallbackS.replace(/:$/, '.');
                if (!fallbackS.endsWith('.')) fallbackS += '.';
                finalSentence = capitalize(`${effectivePrefix}${formattedItem}${fallbackS}`);
            } else {
                if (opt.detailInParens) {
                    finalSentence = capitalize(`${effectivePrefix}${formattedItem} (${cleanedDetail})${suffix}`);
                } else {
                    let cleanS = suffix.trim();
                    if (cleanS === ':' || cleanS.endsWith(':')) {
                        finalSentence = capitalize(`${effectivePrefix}${formattedItem}${cleanS} ${capitalize(cleanedDetail)}.`);
                    } else {
                        if (!cleanS.endsWith('.')) cleanS += '.';
                        finalSentence = capitalize(`${effectivePrefix}${formattedItem}${cleanS} ${capitalize(cleanedDetail)}.`);
                    }
                }
            }

            lines.push(finalSentence);
            if (cleanPrefix.length > 0) prefixUsage.add(cleanPrefix);
        });

        standaloneOptions.forEach(({ opt, detail }) => {
            lines.push(formatWithDetail(opt, detail));
        });

        if (categoryName === 'Depression (ICD-10 Screening)') {
            const severity = calculateDepressionSeverity(currentSelectedIds);
            if (severity) {
                lines.push(`Opfylder dermed ICD-10 kriterierne for en depression i ${severity} grad.`);
            } else {
                const hasAnySymptoms = [...DEP_CORE_IDS, ...DEP_ACC_IDS].some(id => currentSelectedIds.has(id));
                if (hasAnySymptoms) {
                    lines.push('Opfylder ikke de fulde ICD-10 kriterier for en depressiv episode.');
                }
            }
        }
        return lines.join(' ');
    };

    const generateTextContent = (section, ids, details, contactReason, timeline, diets, uniform, summaryMode) => {
        const allSections = [
            { id: 'psych_actual', title: 'AKTUELT PSYKISK (ANAMNESE)', options: ACTUAL_PSYCH_OPTIONS },
            { id: 'psych', title: 'OBJEKTIVT PSYKISK (MSE)', options: PSYCH_OPTIONS },
            { id: 'somatic_act', title: 'AKTUELT SOMATISK', options: SOMATIC_ACT_OPTIONS },
            { id: 'somatic_obj', title: 'SOMATISK VURDERING', options: SOMATIC_OBJ_OPTIONS },
            { id: 'diagnosis_anorexia', title: 'ANOREKSIA NERVOSA (F50.0)', options: ANOREXIA_OPTIONS }
        ];

        let sectionsToRender = [];
        if (section === 'full_note') {
            sectionsToRender = allSections;
        } else {
            sectionsToRender = allSections.filter(s => s.id === section);
        }

        const lines = [];
        const movedCategories = new Set();

        if (summaryMode) {
            const obsLines = [];
            sectionsToRender.forEach(sec => {
                const categories = Array.from(new Set(sec.options.map(o => o.category)));
                categories.forEach(cat => {
                    const selectedOptions = sec.options.filter(o => o.category === cat && ids.has(o.id));
                    const hasAbnormality = selectedOptions.some(o => o.isPathology || (!o.isDefault && !o.isNormal));

                    if (hasAbnormality && selectedOptions.length > 0) {
                        const text = processCategoryOptions(sec.options, cat, ids, details);
                        const formattedCat = cat.toLowerCase().replace(/&/g, 'og');
                        obsLines.push(`Ad ${formattedCat}:\n${text}\n`);
                        movedCategories.add(cat);
                    }
                });
            });

            if (obsLines.length > 0) {
                lines.push("OBSERVATIONER");
                lines.push(...obsLines);
                lines.push("");
                lines.push("---");
                lines.push("");
            }
        }

        sectionsToRender.forEach(sec => {
            const sectionLines = [];

            if (sec.id === 'psych_actual') {
                if (contactReason.trim()) {
                    sectionLines.push(`Ad kontaktårsag:\n${contactReason.trim()}\n`);
                }
                if (timeline.trim()) {
                    sectionLines.push(`Ad sygdomsdebut og udløsende faktorer:\n${timeline.trim()}\n`);
                }
            }

            if (sec.id === 'diagnosis_anorexia' && diets.length > 0) {
                if (uniform) {
                    const day = diets[0];
                    if (day) {
                        sectionLines.push("Ad kostanamnese:\nPatienten angiver at spise det samme hver dag. Nedenstående er repræsentativt for det daglige indtag:");
                        if (day.meals.morgen) sectionLines.push(`- Morgen: ${day.meals.morgen}`);
                        if (day.meals.formiddag) sectionLines.push(`- Før frokost: ${day.meals.formiddag}`);
                        if (day.meals.frokost) sectionLines.push(`- Frokost: ${day.meals.frokost}`);
                        if (day.meals.eftermiddag) sectionLines.push(`- Eftermiddag: ${day.meals.eftermiddag}`);
                        if (day.meals.aften) sectionLines.push(`- Aften: ${day.meals.aften}`);
                        if (day.meals.sen_aften) sectionLines.push(`- Efter aften: ${day.meals.sen_aften}`);
                        if (day.meals.vaeske) sectionLines.push(`- Væske: ${day.meals.vaeske}`);
                        sectionLines.push("");
                    }
                } else {
                    sectionLines.push("Ad kostanamnese:\nEksempler fra sidste 14 dage:");
                    diets.forEach(day => {
                        sectionLines.push(`${day.label || 'Uden navn'}:`);
                        if (day.meals.morgen) sectionLines.push(`- Morgen: ${day.meals.morgen}`);
                        if (day.meals.formiddag) sectionLines.push(`- Før frokost: ${day.meals.formiddag}`);
                        if (day.meals.frokost) sectionLines.push(`- Frokost: ${day.meals.frokost}`);
                        if (day.meals.eftermiddag) sectionLines.push(`- Eftermiddag: ${day.meals.eftermiddag}`);
                        if (day.meals.aften) sectionLines.push(`- Aften: ${day.meals.aften}`);
                        if (day.meals.sen_aften) sectionLines.push(`- Efter aften: ${day.meals.sen_aften}`);
                        if (day.meals.vaeske) sectionLines.push(`- Væske: ${day.meals.vaeske}`);
                        sectionLines.push("");
                    });
                }
            }

            const categories = Array.from(new Set(sec.options.map(o => o.category)));
            categories.forEach(cat => {
                if (movedCategories.has(cat)) return;

                const categoryOptions = sec.options.filter(o => o.category === cat);
                const selectedInCat = categoryOptions.filter(o => ids.has(o.id));

                if (selectedInCat.length > 0) {
                    const text = processCategoryOptions(categoryOptions, cat, ids, details);
                    if (text) {
                        const formattedCat = cat.toLowerCase().replace(/&/g, 'og');
                        sectionLines.push(`Ad ${formattedCat}:\n${text}\n`);
                    }
                }
            });

            if (sectionLines.length > 0) {
                if (sec.id !== 'diagnosis_anorexia') {
                    lines.push(sec.title);
                }
                lines.push(...sectionLines);
                lines.push("");
            }
        });

        return lines.join('\n');
    };



    useEffect(() => {
        const autoText = generateTextContent(activeSection, selectedIds, optionDetails, contactReasonText, timelineText, dietDays, isUniformDiet, showSummary);

        if (!manualEditMode) {
            setGeneratedText(autoText);
            lastAutoTextRef.current = autoText;
            lastUserTextRef.current = autoText;
        } else {
            // Manuel redigering slået til
            // Beregn linje-kalkuleret diff for at undgå at ny tekst skubber manuel tekst ned
            const a = dmp.diff_linesToChars_(lastAutoTextRef.current, autoText);
            const lineText1 = a.chars1;
            const lineText2 = a.chars2;
            const lineArray = a.lineArray;

            const diffs = dmp.diff_main(lineText1, lineText2, false);
            dmp.diff_charsToLines_(diffs, lineArray);

            let newText = generatedText;
            let appendText = '';

            diffs.forEach(([op, text]) => {
                const isOnlyWhitespace = !text.trim();

                if (op === -1 && !isOnlyWhitespace) {
                    // Fjern slettet auto-tekst fra vores current tekst
                    if (newText.includes(text)) {
                        newText = newText.replace(text, '');
                    } else {
                        // Hvis brugeren mangler linjeskiftet, søg uden
                        const trimmed = text.trim();
                        if (newText.includes(trimmed)) {
                            newText = newText.replace(trimmed, '');
                        }
                    }
                } else if (op === 1 && !isOnlyWhitespace) {
                    // Nye linjer tilføjes i bunden
                    appendText += text;
                }
            });

            if (appendText.trim()) {
                newText = newText.trimEnd() + '\n\n' + appendText.trim() + '\n';
            }

            // Oprydning hvis der opstod for mange tomme linjer
            newText = newText.replace(/\n{3,}/g, '\n\n');

            setGeneratedText(newText);
            lastAutoTextRef.current = autoText;
            lastUserTextRef.current = newText;
        }
    }, [selectedIds, activeSection, showSummary, optionDetails, contactReasonText, timelineText, dietDays, isUniformDiet, manualEditMode]);

    const changeSection = (newSection) => {
        if (manualEditMode) setManualEditMode(false);
        setActiveSection(newSection);
    };

    const handleManualTextChange = (e) => {
        const newValue = e.target.value;
        setGeneratedText(newValue);
        lastUserTextRef.current = newValue;

        // Auto-gendan hvis teksten matcher den auto-genererede tekst
        const autoText = generateTextContent(activeSection, selectedIds, optionDetails, contactReasonText, timelineText, dietDays, isUniformDiet, showSummary);
        if (newValue === autoText) {
            setManualEditMode(false);
        } else {
            setManualEditMode(true);
        }
    };

    const toggleOption = (option) => {
        const isSelected = selectedIds.has(option.id);
        const newSelection = new Set(selectedIds);

        if (isSelected) {
            newSelection.delete(option.id);
        } else {
            newSelection.add(option.id);
            option.exclude?.forEach(exId => newSelection.delete(exId));
        }
        setSelectedIds(newSelection);

    };

    const setNormalStatus = () => {
        let sectionOptions = [];
        let normalIds = [];

        if (activeSection === 'psych') {
            sectionOptions = PSYCH_OPTIONS;
            normalIds = PSYCH_NORMAL_IDS;
        } else if (activeSection === 'somatic_obj') {
            sectionOptions = SOMATIC_OBJ_OPTIONS;
            normalIds = SOMATIC_NORMAL_IDS;
        } else if (activeSection === 'somatic_act') {
            sectionOptions = SOMATIC_ACT_OPTIONS;
            normalIds = SOMATIC_ACT_NORMAL_IDS;
        } else {
            return;
        }

        const newSet = new Set(selectedIds);
        sectionOptions.forEach(opt => newSet.delete(opt.id));
        normalIds.forEach(id => newSet.add(id));

        setSelectedIds(newSet);

        setNotification({ message: 'Normalstatus indsat', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
    };

    const addDietDay = () => {
        if (isUniformDiet) return;
        const newId = Date.now();
        const newDay = {
            id: newId,
            label: `Dag ${dietDays.length + 1}`,
            meals: { morgen: '', formiddag: '', frokost: '', eftermiddag: '', aften: '', sen_aften: '', vaeske: '' }
        };
        setDietDays([...dietDays, newDay]);
        setActiveDietDayId(newId);
    };

    const updateDietDay = (id, field, value) => {
        setDietDays(prevDays => prevDays.map(day => {
            if (day.id === id) {
                if (field === 'label') return { ...day, label: value };
                return { ...day, meals: { ...day.meals, [field]: value } };
            }
            return day;
        }));
    };

    const removeDietDay = (id) => {
        setDietDays(prevDays => prevDays.filter(day => day.id !== id));
        if (activeDietDayId === id) {
            setActiveDietDayId(null);
        }
    };

    const toggleUniform = () => {
        const newState = !isUniformDiet;
        setIsUniformDiet(newState);

        if (newState) {
            setNotification({ message: 'Tilstand aktiveret: Spiser det samme hver dag', type: 'success' });
            if (dietDays.length === 0) {
                const newId = Date.now();
                const newDay = {
                    id: newId, label: 'Dag 1',
                    meals: { morgen: '', formiddag: '', frokost: '', eftermiddag: '', aften: '', sen_aften: '', vaeske: '' }
                };
                setDietDays([newDay]);
                setActiveDietDayId(newId);
            } else {
                setActiveDietDayId(dietDays[0].id);
            }
        } else {
            setNotification({ message: 'Tilstand deaktiveret: Individuelle dage', type: 'success' });
        }
        setTimeout(() => setNotification(null), 3000);
    };

    const copyPreviousDay = (id) => {
        setDietDays(prevDays => {
            const index = prevDays.findIndex(d => d.id === id);
            if (index <= 0) return prevDays;
            const prevDay = prevDays[index - 1];
            const currentDay = prevDays[index];
            const updatedDay = { ...currentDay, meals: { ...prevDay.meals } };
            const newDays = [...prevDays];
            newDays[index] = updatedDay;
            return newDays;
        });
        setNotification({ message: 'Måltider kopieret fra forrige dag', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleDetailChange = (id, value) => {
        setOptionDetails(prev => ({ ...prev, [id]: value }));
    };

    // MODAL LOGIC FOR "RYD ALT" OG "RYD SEKTION"
    const openClearConfirm = () => {
        setConfirmDialog({ isOpen: true, action: 'clear' });
    };

    const handleConfirm = () => {
        if (confirmDialog.action === 'clear') {
            executeClearAll();
        } else if (confirmDialog.action === 'sync') {
            executeForceSync();
        }
    };

    const executeClearAll = () => {
        if (activeSection === 'full_note') {
            setSelectedIds(new Set()); // Blanker alle valg
            setOptionDetails({});
            setContactReasonText('');
            setTimelineText('');
            setDietDays([]);
            setIsUniformDiet(false);
        } else {
            let currentOptions = [];
            if (activeSection === 'psych_actual') currentOptions = ACTUAL_PSYCH_OPTIONS;
            else if (activeSection === 'psych') currentOptions = PSYCH_OPTIONS;
            else if (activeSection === 'somatic_obj') currentOptions = SOMATIC_OBJ_OPTIONS;
            else if (activeSection === 'somatic_act') currentOptions = SOMATIC_ACT_OPTIONS;
            else if (activeSection === 'diagnosis_anorexia') currentOptions = ANOREXIA_OPTIONS;

            const newSet = new Set(selectedIds);
            const newDetails = { ...optionDetails };
            currentOptions.forEach(o => {
                newSet.delete(o.id);
                delete newDetails[o.id];
            });

            if (activeSection === 'psych_actual') {
                setContactReasonText('');
                setTimelineText('');
            }
            if (activeSection === 'diagnosis_anorexia') {
                setDietDays([]);
                setIsUniformDiet(false);
            }

            setSelectedIds(newSet);
            setOptionDetails(newDetails);
        }
        setManualEditMode(false);
        setConfirmDialog({ isOpen: false, action: null });
        setNotification({ message: 'Data slettet', type: 'success' });
        setTimeout(() => setNotification(null), 2500);
    };

    const resetSection = () => {
        let currentOptions = [];
        if (activeSection === 'psych_actual') currentOptions = ACTUAL_PSYCH_OPTIONS;
        else if (activeSection === 'psych') currentOptions = PSYCH_OPTIONS;
        else if (activeSection === 'somatic_obj') currentOptions = SOMATIC_OBJ_OPTIONS;
        else if (activeSection === 'somatic_act') currentOptions = SOMATIC_ACT_OPTIONS;
        else if (activeSection === 'diagnosis_anorexia') currentOptions = ANOREXIA_OPTIONS;
        else if (activeSection === 'full_note') {
            return;
        }

        const newSet = new Set(selectedIds);

        // Bevarer newDetails (fritekst), men fjerner markeringer
        currentOptions.forEach(o => {
            newSet.delete(o.id);
        });

        currentOptions.filter(o => o.isDefault).forEach(o => newSet.add(o.id));

        setSelectedIds(newSet);
        setManualEditMode(false);

        setNotification({ message: 'Valg nulstillet (fritekst bevaret)', type: 'success' });
        setTimeout(() => setNotification(null), 2500);
    };

    // MODAL LOGIC FOR "GENDAN SYNKRONISERING"
    const openSyncConfirm = () => {
        setConfirmDialog({ isOpen: true, action: 'sync' });
    };

    const executeForceSync = () => {
        setManualEditMode(false);
        setConfirmDialog({ isOpen: false, action: null });
        setNotification({ message: 'Synkronisering gendannet', type: 'success' });
        setTimeout(() => setNotification(null), 2500);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedText);
        setNotification({ message: 'Tekst kopieret til udklipsholder', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(err);
                setNotification({ message: 'Fuldskærm er ikke understøttet i denne visning', type: 'error' });
                setTimeout(() => setNotification(null), 3000);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch(err => console.error(err));
            setIsFullscreen(false);
        }
    };


    const renderCardGrid = (dataSet) => {
        const categories = Array.from(new Set(dataSet.map(o => o.category)));
        return (
            <div className={`pb-20 transition-all duration-300`}>
                {activeSection === 'psych_actual' && (
                    <div className="mb-6 glass-panel rounded-2xl overflow-hidden">
                        <div className="bg-[#FAF9F6]/50 px-5 py-4 border-b border-[#E8E4D9]/50 flex items-center gap-2">
                            <h3 className="font-bold text-[#3A4A40] text-sm uppercase tracking-wider">Indledende Anamnese</h3>
                            <PenLine className="w-4 h-4 text-[#839788]" />
                        </div>
                        <div className="p-6 flex flex-col gap-6">
                            <div>
                                <label className="block text-xs font-bold text-[#839788] uppercase mb-2 ml-1 tracking-wide">Kontaktårsag</label>
                                <textarea
                                    className="w-full h-20 p-4 text-sm bg-white/70 backdrop-blur-sm border border-[#E8E4D9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#839788]/20 focus:border-[#839788] resize-none transition-all placeholder:text-slate-300 text-[#3A4A40] shadow-sm"
                                    placeholder="Hvorfor henvender patienten sig i dag? Hvad er det primære problem?"
                                    value={contactReasonText}
                                    onChange={(e) => setContactReasonText(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="h-px bg-[#E8E4D9]/50 w-full"></div>
                            <div>
                                <label className="block text-xs font-bold text-[#839788] uppercase mb-2 ml-1 tracking-wide">Sygdomsdebut & Udløsende faktorer</label>
                                <textarea
                                    className="w-full h-24 p-4 text-sm bg-white/70 backdrop-blur-sm border border-[#E8E4D9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#839788]/20 focus:border-[#839788] resize-none transition-all placeholder:text-slate-300 text-[#3A4A40] shadow-sm"
                                    placeholder="Beskriv hvornår symptomerne startede, hvordan de har udviklet sig, og om der er en udløsende årsag..."
                                    value={timelineText}
                                    onChange={(e) => setTimelineText(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'diagnosis_anorexia' && (
                    <div className="mb-8">
                        <div className="glass-panel rounded-2xl p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-[#3A4A40] uppercase tracking-wider flex items-center gap-2">
                                        <Layout className="w-4 h-4 text-[#839788]" /> Kostregistrering (14 dage)
                                    </h3>
                                    <p className="text-xs text-[#839788]/80 mt-1">
                                        {isUniformDiet ? 'Ensartet kost registreret. Rediger Dag 1 for at ændre.' : 'Vælg en dag i listen til venstre for at redigere.'}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={toggleUniform}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm ${isUniformDiet
                                            ? 'bg-[#E8E4D9] text-[#3A4A40] border border-[#DEB887]/30 ring-1 ring-[#DEB887]/50'
                                            : 'bg-white/80 backdrop-blur-sm text-[#839788] border border-[#E8E4D9] hover:bg-white hover:text-[#3A4A40]'
                                            }`}
                                    >
                                        <Repeat size={16} /> Spiser det samme hver dag
                                    </button>
                                    <button
                                        onClick={addDietDay}
                                        disabled={isUniformDiet}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${isUniformDiet
                                            ? 'bg-[#F9F8F6] text-[#E8E4D9] cursor-not-allowed border border-[#E8E4D9]/50'
                                            : 'bg-[#839788] text-white hover:bg-[#6B8070] shadow-[#839788]/20'
                                            }`}
                                    >
                                        <Plus size={16} /> Tilføj Dag
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row h-[600px] bg-white/70 backdrop-blur-md border border-[#E8E4D9] rounded-2xl overflow-hidden relative shadow-sm">
                                {isUniformDiet && (
                                    <div className="absolute top-0 left-0 bottom-0 w-1/3 z-10 bg-[#FAF9F6]/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 border-r border-[#E8E4D9] text-center">
                                        <div className="bg-[#E8E4D9]/40 p-5 rounded-2xl border border-[#DEB887]/20 backdrop-blur-md">
                                            <Repeat className="w-8 h-8 text-[#839788] mx-auto mb-3" />
                                            <h4 className="font-bold text-[#3A4A40] text-sm tracking-wide uppercase">Ensartet Kost</h4>
                                            <p className="text-xs text-[#3A4A40]/70 mt-2 leading-relaxed">Input er låst til <strong>Dag 1</strong>, da kosten er angivet som værende ens hver dag.</p>
                                        </div>
                                    </div>
                                )}
                                <div className="w-full md:w-1/3 border-r border-[#E8E4D9] bg-[#FAF9F6]/50 flex flex-col">
                                    <div className="p-4 border-b border-[#E8E4D9] text-xs font-bold text-[#839788] uppercase tracking-wider flex justify-between items-center">
                                        <span>Dage ({dietDays.length})</span>
                                    </div>
                                    <div className="overflow-y-auto flex-1 p-3 space-y-2">
                                        {dietDays.length === 0 ? (
                                            <div className="text-center py-12 text-[#839788]/60 text-sm italic px-4">
                                                Ingen dage tilføjet. <br /> <br /> {isUniformDiet ? 'Systemet tilføjer automatisk en dag...' : 'Tryk på "Tilføj Dag" ovenfor.'}
                                            </div>
                                        ) : (
                                            dietDays.map((day, index) => {
                                                const isActive = activeDietDayId === day.id;
                                                if (isUniformDiet && index > 0) return null;
                                                return (
                                                    <div
                                                        key={day.id}
                                                        onClick={() => setActiveDietDayId(day.id)}
                                                        className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${isActive ? 'bg-white border-[#839788]/30 shadow-sm ring-1 ring-[#839788]/10' : 'bg-transparent border-transparent hover:bg-white/50 hover:border-[#E8E4D9]'
                                                            }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-1.5 h-10 rounded-full transition-colors ${isActive ? 'bg-[#839788]' : 'bg-[#E8E4D9]'}`}></div>
                                                            <div>
                                                                <div className={`text-sm font-bold ${isActive ? 'text-[#3A4A40]' : 'text-[#839788]'}`}>
                                                                    {isUniformDiet ? 'Standard Dag (Dag 1)' : (day.label || 'Uden navn')}
                                                                </div>
                                                                <div className="text-[11px] text-[#839788]/70 font-medium mt-0.5">{Object.values(day.meals).filter(v => v).length} måltider valgt</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            {!isUniformDiet && (
                                                                <button onClick={(e) => { e.stopPropagation(); removeDietDay(day.id); }} className="p-2 text-[#E8E4D9] hover:text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                                                            )}
                                                            {isActive && <ChevronRight className="w-5 h-5 text-[#839788]" />}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                                <div className="w-full md:w-2/3 bg-white flex flex-col">
                                    {activeDietDayId && dietDays.find(d => d.id === activeDietDayId) ? (
                                        (() => {
                                            const activeDay = dietDays.find(d => d.id === activeDietDayId);
                                            const index = dietDays.findIndex(d => d.id === activeDietDayId);
                                            return (
                                                <div className="flex flex-col h-full bg-white/40">
                                                    <div className="p-5 border-b border-[#E8E4D9] flex items-center justify-between bg-white/60 backdrop-blur-sm">
                                                        <input
                                                            className="text-xl font-bold text-[#3A4A40] bg-transparent border-none focus:ring-0 p-0 w-full focus:underline focus:decoration-[#839788]/30 underline-offset-4 decoration-transparent transition-all placeholder:text-[#E8E4D9]"
                                                            value={activeDay.label}
                                                            onChange={(e) => updateDietDay(activeDay.id, 'label', e.target.value)}
                                                            placeholder="Navngiv dag..."
                                                            disabled={isUniformDiet}
                                                        />
                                                        {!isUniformDiet && index > 0 && (
                                                            <button onClick={() => copyPreviousDay(activeDay.id)} className="shrink-0 flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#839788] bg-white border border-[#E8E4D9] hover:bg-[#FAF9F6] rounded-xl transition-all shadow-sm">
                                                                <Copy className="w-3.5 h-3.5" /> Kopier forrige
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 overflow-y-auto p-8 space-y-6">
                                                        <Input label="Morgenmad" value={activeDay.meals.morgen} onChange={v => updateDietDay(activeDay.id, 'morgen', v)} />
                                                        <Input label="Før frokost" value={activeDay.meals.formiddag} onChange={v => updateDietDay(activeDay.id, 'formiddag', v)} />
                                                        <Input label="Frokost" value={activeDay.meals.frokost} onChange={v => updateDietDay(activeDay.id, 'frokost', v)} />
                                                        <Input label="Eftermiddag" value={activeDay.meals.eftermiddag} onChange={v => updateDietDay(activeDay.id, 'eftermiddag', v)} />
                                                        <Input label="Aften" value={activeDay.meals.aften} onChange={v => updateDietDay(activeDay.id, 'aften', v)} />
                                                        <Input label="Efter aften" value={activeDay.meals.sen_aften} onChange={v => updateDietDay(activeDay.id, 'sen_aften', v)} />
                                                        <div className="h-px bg-[#E8E4D9] my-4"></div>
                                                        <Input label="Væske (Type og mængde)" value={activeDay.meals.vaeske} onChange={v => updateDietDay(activeDay.id, 'vaeske', v)} />
                                                    </div>
                                                </div>
                                            );
                                        })()
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-[#839788]/60 p-10 text-center">
                                            <div className="glass-panel p-6 rounded-3xl mb-4"><Layout className="w-10 h-10 text-[#839788]/40" /></div>
                                            <p className="font-bold text-[#3A4A40] text-lg">Ingen dag valgt</p>
                                            <p className="text-sm mt-2">Vælg en dag i listen, eller opret en ny.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {categories.map(cat => (
                        <div key={cat} className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-white/60">
                            <div className="bg-white/40 px-5 py-3.5 border-b border-[#E8E4D9]/50 flex items-center justify-between backdrop-blur-md">
                                <h3 className="font-bold text-[#3A4A40] text-sm uppercase tracking-wide">{cat}</h3>
                                {dataSet.filter(o => o.category === cat && !o.isDefault && !o.isNormal && selectedIds.has(o.id)).length > 0 && <AlertCircle className="w-4 h-4 text-[#D9A8A8]" />}
                            </div>
                            <div className="p-4 flex flex-col gap-2.5">
                                {dataSet.filter(o => o.category === cat).map(option => {
                                    const isSelected = selectedIds.has(option.id);
                                    const isPathology = option.isPathology || (!option.isDefault && !option.isNormal);
                                    let btnClass = "w-full text-left px-4 py-3 text-sm rounded-xl border transition-all duration-300 flex items-center justify-between group overflow-hidden relative shadow-sm ";
                                    if (isSelected) {
                                        if (isPathology) btnClass += "bg-[#FDF8F8] border-[#D9A8A8] text-[#7A4040] font-semibold";
                                        else btnClass += "bg-[#F2F6F3] border-[#9EAF9F] text-[#2C3F34] font-semibold";
                                    } else {
                                        btnClass += "bg-white/70 border-transparent hover:bg-white text-[#55695B] hover:text-[#3A4A40]";
                                    }

                                    return (
                                        <div key={option.id}>
                                            <button onClick={() => toggleOption(option)} className={btnClass}>
                                                <div className="relative z-10 flex w-full items-center justify-between">
                                                    <span className="truncate pr-3">{option.label}</span>
                                                    {isSelected && (isPathology ? <AlertCircle className="w-4 h-4 text-[#D9A8A8] flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-[#9EAF9F] flex-shrink-0" />)}
                                                </div>
                                            </button>
                                            {isSelected && (
                                                <div className="mt-2 mb-2 ml-2 pl-3 border-l-2 border-[#839788]/30">
                                                    <input
                                                        type="text"
                                                        placeholder={option.inputPlaceholder || "Uddybning..."}
                                                        className="w-full text-xs p-2.5 bg-white/50 border border-[#E8E4D9] rounded-lg focus:outline-none focus:border-[#839788] focus:bg-white transition-all shadow-sm text-[#3A4A40] placeholder:text-slate-400"
                                                        value={optionDetails[option.id] || ''}
                                                        onChange={(e) => handleDetailChange(option.id, e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-[#F9F8F6] text-slate-800 font-sans overflow-hidden relative selection:bg-[#E2E8DF] selection:text-slate-900">

            {/* CUSTOM MODAL FOR CONFIRMATION DIALOGS */}
            {confirmDialog.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center modal-overlay bg-[#3A4A40]/30 backdrop-blur-sm">
                    <div className="glass-panel rounded-2xl p-6 max-w-sm w-full mx-4 modal-content">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-100 text-red-600 rounded-full">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">
                                {confirmDialog.action === 'clear' ? (activeSection === 'full_note' ? 'Ryd hele notatet?' : 'Ryd sektion?') : 'Gendan Synkronisering?'}
                            </h3>
                        </div>
                        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                            {confirmDialog.action === 'clear'
                                ? 'Er du sikker på, at du vil rydde alle valg og fritekstfelter? Dette kan ikke fortrydes.'
                                : 'Dette vil slette dine manuelle rettelser i højre side, og genopbygge teksten fuldstændigt ud fra formularens valg. Vil du fortsætte?'}
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setConfirmDialog({ isOpen: false, action: null })}
                                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                Annuller
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                            >
                                {confirmDialog.action === 'clear' ? 'Ja, ryd data' : 'Ja, gendan teksten'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TOAST NOTIFICATION */}
            {notification && (
                <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 ${notification.type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'}`}>
                    {notification.type === 'error' ? <XCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                    <span className="text-sm font-medium">{notification.message}</span>
                </div>
            )}

            <header className="glass-panel border-b-0 px-6 py-3 flex justify-between items-center shadow-sm shrink-0 z-20">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onNavigate('home')}
                        className="p-1.5 hover:bg-[#F9F8F6] rounded-xl transition-colors text-[#839788] hover:text-[#3A4A40]"
                        title="Tilbage til forsiden"
                    >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                    </button>
                    <div className="bg-[#839788] p-1.5 rounded-lg"><Activity className="text-white h-5 w-5" /></div>
                    <div>
                        <h1 className="text-lg font-bold text-[#3A4A40] leading-tight">Psykiatrisk Journalværktøj</h1>
                        <div className="flex items-center gap-1.5 text-xs text-[#839788]/80"><span>Klinisk dokumentationsstøtte</span><span className="text-[#E8E4D9]">•</span><span>v10.3 (Portal Theme)</span></div>
                    </div>
                    <GdprBanner />
                </div>
                <div className="flex items-center gap-4">
                    <button type="button" onClick={openClearConfirm} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 cursor-pointer shadow-sm">
                        <Trash2 className="w-5 h-5" /> <span>{activeSection === 'full_note' ? 'Ryd Alt' : 'Ryd Sektion'}</span>
                    </button>
                    <button type="button" onClick={() => setShowSummary(!showSummary)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border cursor-pointer shadow-sm ${showSummary ? 'bg-[#3A4A40] text-white border-[#3A4A40]' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}>
                        {showSummary ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />} <span>Vis fund øverst</span>
                    </button>
                    <div className="h-6 w-px bg-[#E8E4D9] mx-1"></div>
                    <button onClick={toggleFullscreen} className="p-2 text-[#839788] hover:text-[#3A4A40] hover:bg-[#F9F8F6] rounded-lg transition-colors cursor-pointer">
                        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                    </button>
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <nav className="w-64 glass-panel border-r-0 flex flex-col flex-shrink-0 z-10 overflow-y-auto">
                    <div className="p-4 space-y-2">
                        <button onClick={() => changeSection('psych_actual')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'psych_actual' ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9]' : 'text-slate-600 hover:bg-white/60'}`}>
                            <MessageSquare className={`h-5 w-5 ${activeSection === 'psych_actual' ? 'text-[#839788]' : 'text-slate-400'}`} /> <span className="font-medium">Aktuelt Psykisk</span>
                        </button>
                        <button onClick={() => changeSection('psych')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'psych' ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9]' : 'text-slate-600 hover:bg-white/60'}`}>
                            <Brain className={`h-5 w-5 ${activeSection === 'psych' ? 'text-[#839788]' : 'text-slate-400'}`} /> <span className="font-medium">Objektivt Psykisk</span>
                        </button>
                        <button onClick={() => changeSection('somatic_act')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'somatic_act' ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9]' : 'text-slate-600 hover:bg-white/60'}`}>
                            <FileText className={`h-5 w-5 ${activeSection === 'somatic_act' ? 'text-[#839788]' : 'text-slate-400'}`} /> <span className="font-medium">Aktuelt Somatisk</span>
                        </button>
                        <button onClick={() => changeSection('somatic_obj')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'somatic_obj' ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9]' : 'text-slate-600 hover:bg-white/60'}`}>
                            <Stethoscope className={`h-5 w-5 ${activeSection === 'somatic_obj' ? 'text-[#839788]' : 'text-slate-400'}`} /> <span className="font-medium">Somatisk Vurdering</span>
                        </button>
                        <div className="h-px bg-[#E8E4D9] my-2"></div>
                        <div className="px-3 py-1"><span className="text-xs font-semibold text-[#839788]/80 uppercase tracking-wider">Diagnose-specifikke</span></div>
                        <button onClick={() => changeSection('diagnosis_anorexia')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'diagnosis_anorexia' ? 'bg-white text-[#3A4A40] shadow ring-1 ring-[#E8E4D9]' : 'text-slate-600 hover:bg-white/60'}`}>
                            <Cookie className={`h-5 w-5 ${activeSection === 'diagnosis_anorexia' ? 'text-[#839788]' : 'text-slate-400'}`} /> <span className="font-medium">Anoreksia Nervosa</span>
                        </button>
                        <div className="h-px bg-[#E8E4D9] my-2"></div>
                        <button onClick={() => changeSection('full_note')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'full_note' ? 'bg-[#3A4A40] text-white shadow shadow-[#3A4A40]/30' : 'text-[#3A4A40] bg-[#E8E4D9]/50 hover:bg-[#E8E4D9]'}`}>
                            <Layers className={`h-5 w-5 ${activeSection === 'full_note' ? 'text-white' : 'text-[#839788]'}`} /> <span className="font-bold">Samlet Notat</span>
                        </button>
                    </div>
                </nav>
                <main className="flex-1 overflow-y-auto bg-transparent p-6">
                    <div className="max-w-6xl mx-auto flex flex-col items-center">
                        <div className="flex w-full justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-[#3A4A40]">
                                    {activeSection === 'psych_actual' && 'Aktuelt Psykisk (Anamnese)'}
                                    {activeSection === 'psych' && 'Klinisk vurdering (Objektivt Psykisk)'}
                                    {activeSection === 'somatic_obj' && 'Somatisk Vurdering'}
                                    {activeSection === 'somatic_act' && 'Somatisk Anamnese'}
                                    {activeSection === 'diagnosis_anorexia' && 'Anoreksia Nervosa (F50.0)'}
                                    {activeSection === 'full_note' && 'Samlet Journalnotat (Oversigt)'}
                                </h2>
                            </div>
                            <div className="flex gap-3">
                                {(activeSection === 'psych' || activeSection === 'somatic_obj' || activeSection === 'somatic_act') && (
                                    <button onClick={setNormalStatus} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-800 bg-emerald-50/80 backdrop-blur-sm border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors shadow-sm">
                                        <Star className="h-4 w-4" /> Sæt Normalstatus
                                    </button>
                                )}
                                {activeSection !== 'full_note' && (
                                    <button onClick={resetSection} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white/80 backdrop-blur-sm border border-[#E8E4D9] rounded-xl hover:bg-[#F9F8F6] hover:text-[#839788] transition-colors shadow-sm">
                                        <RotateCcw className="h-4 w-4" /> Nulstil valg
                                    </button>
                                )}
                            </div>
                        </div>

                        {manualEditMode && activeSection !== 'full_note' && (
                            <div className="mb-6 w-full glass-panel border border-emerald-200/50 rounded-2xl p-4 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-6 h-6 text-emerald-600" />
                                    <div>
                                        <h4 className="font-bold text-[#3A4A40] text-sm">Fri redigering aktiv</h4>
                                        <p className="text-[#3A4A40]/80 text-xs mt-0.5">Dine valgte ændringer flettes automatisk ind, mens din manuelle tekst bevares.</p>
                                    </div>
                                </div>
                                <button onClick={openSyncConfirm} className="px-4 py-2 bg-white/90 text-[#3A4A40] border border-[#E8E4D9] rounded-xl shadow-sm text-sm font-bold hover:bg-white transition-colors whitespace-nowrap cursor-pointer">
                                    Overskriv med standard-valg
                                </button>
                            </div>
                        )}

                        {activeSection === 'psych_actual' && renderCardGrid(ACTUAL_PSYCH_OPTIONS)}
                        {activeSection === 'psych' && renderCardGrid(PSYCH_OPTIONS)}
                        {activeSection === 'somatic_act' && renderCardGrid(SOMATIC_ACT_OPTIONS)}
                        {activeSection === 'somatic_obj' && renderCardGrid(SOMATIC_OBJ_OPTIONS)}
                        {activeSection === 'diagnosis_anorexia' && renderCardGrid(ANOREXIA_OPTIONS)}
                        {activeSection === 'full_note' && (
                            <div className="glass-panel w-full rounded-2xl shadow-sm p-10 flex flex-col items-center justify-center text-center h-[500px]">
                                <Layers className="h-16 w-16 text-[#3A4A40]/10 mb-4" />
                                <h3 className="text-lg font-medium text-[#3A4A40]">Samlet Visning</h3>
                                <p className="text-slate-500 max-w-md mt-2">Tekstboksen til højre viser nu det komplette notat samlet fra alle sektioner.<br /><br />Gå til de enkelte sektioner i menuen til venstre for at redigere indholdet.</p>
                            </div>
                        )}
                    </div>
                </main>
                <aside className="w-80 xl:w-96 glass-panel border-l-0 flex flex-col shadow-xl z-20 flex-shrink-0">
                    <div className="p-5 border-b border-[#E8E4D9]/50 flex justify-between items-center bg-[#F9F8F6]/30">
                        <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-[#839788]" /><h3 className="font-semibold text-[#3A4A40] text-sm uppercase tracking-wide">{activeSection === 'full_note' ? 'Hele Notatet' : 'Resultat (Sektion)'}</h3></div>
                        {showSummary && <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-medium">Resume aktivt</span>}
                    </div>
                    <div className="flex-1 relative">
                        <textarea
                            className={`absolute inset-0 w-full h-full p-6 border-none resize-none focus:ring-0 text-sm leading-[1.8] text-[#3A4A40] font-mono bg-transparent focus:outline-none ${manualEditMode ? 'bg-[#F9F8F6]/50 shadow-inner' : ''}`}
                            value={generatedText}
                            onChange={handleManualTextChange}
                            spellCheck="false"
                        ></textarea>
                    </div>
                    {manualEditMode && (
                        <div className="bg-[#FAF9F6] px-5 py-3 border-t border-[#E8E4D9] flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 text-amber-700 font-medium"><PenLine className="w-3.5 h-3.5" /><span>Fri redigering aktiv.</span></div>
                        </div>
                    )}
                    <div className="p-5 bg-[#F9F8F6]/50 border-t border-[#E8E4D9]/50">
                        <button onClick={copyToClipboard} className="w-full flex justify-center items-center gap-2 bg-[#839788] hover:bg-[#6B8070] text-white px-4 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:transform active:scale-[0.98]">
                            <Clipboard className="h-4 w-4" /> {activeSection === 'full_note' ? 'Kopier HELE notatet' : 'Kopier SEKTION'}
                        </button>
                    </div>
                </aside>
            </div >
        </div >
    );
}

export default JournalApp;