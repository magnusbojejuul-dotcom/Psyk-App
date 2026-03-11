import React, { useState, useEffect } from 'react';
import { ChevronRight, FileText, CheckCircle, Circle, Download, AlertTriangle, AlertCircle, Info, Stethoscope, Copy, Activity, BookOpen, ChevronDown, ChevronUp } from '../components/Icons';

const ECT_CHECKLIST = [
    {
        id: 'samtykke',
        title: '1. Informeret samtykke',
        items: [
            { 
                id: 'orienter', 
                label: 'Orientér voksne/pårørende om formål, teknik, effekt og bivirkninger.',
                infoPath: 'Vejledning - Afsnit 2.7 og 2.8',
                infoText: [
                    '**Børn og Unge:** Unge (15-17 år) giver *selv* samtykke, forældre inddrages og informeres. Børn (<15 år) kræver forældresamtykke (samt barnets samtykke hvis indlagt).',
                    '**Tvang (§12, stk. 3):** ECT kan gis på tvang ved aktuel eller potentiel livstruende tilstand (f.eks. akut selvmordsfare, svær spise/drikkevægring eller delirium acutum).'
                ]
            },
            { 
                id: 'vejledning', 
                label: 'Udlevér patientvejledning "Behandling med ECT".',
                infoPath: 'Vejledning - Fasteregler',
                infoText: [
                    '**Faste:** Patienten må ikke spise fra kl. 00.00 før ECT (heller ikke pastiller, bolsjer eller tyggegummi).',
                    '**Væske og medicin:** Klare væsker (vand, saft/juice u. frugtkød, kaffe/te u. mælk) og tilladt morgenmedicin må indtages indtil **senest kl. 06.00**.'
                ]
            }
        ]
    },
    {
        id: 'forundersogelse',
        title: '2. Forundersøgelser',
        items: [
            { id: 'stetoskopi', label: 'Somatisk undersøgelse inkl. hjerte-lungestetoskopi.' },
            { id: 'blodprove', label: 'Blodprøver (ECT-blodprøvepakke). (Maks. 1 uge gammel ved opstart).' },
            { id: 'ekg', label: 'EKG (Maks. 1 uge gammel ved opstart).' },
            { id: 'rtg', label: 'Røntgen af thorax (ved kardiopulmonale lidelser, hypertension, eller >70 år).' },
            { id: 'vitals', label: 'Mål Puls, BT, vægt og BMI.' },
            { id: 'tand', label: 'Vurder tandstatus og evt. tandlægetilsyn.' },
            { id: 'cave', label: 'Tjek og opdater allergi (CAVE).' }
        ]
    },
    {
        id: 'risiko',
        title: '3. Risikovurdering & Tilsyn',
        items: [
            { 
                id: 'somatisk_tilsyn', 
                label: 'Sikre relevant tilsyn (kardiolog, neurolog etc.) ved komplicerende lidelser og bestil f.eks INR blodprøve.',
                infoPath: 'Vejledning - Afsnit 2.4.3 og 2.4.4',
                infoText: [
                    '**Relative kontraindikationer (kun ved livstruende tilstand):**\nCerebralt/aortaaneurisme, forhøjet intrakranielt tryk, rumopfyldende processer, intracerebral blødning/apopleksi, nyligt myokardieinfarkt, kardiale arytmier, feocromocytom.',
                    '**Risikofaktorer (kræver forsigtighed/tilsyn):**\nKardiologiske sygdomme (angina pectoris, hypertension, pacemaker), Pulmonale sygdomme (astma, KOL), Øjensygdomme (glaukom), Graviditet, elektrolytforstyrrelser, nedsat nyrefunktion, svær overvægt (BMI > 35), Diabetes.'
                ]
            },
            { id: 'anaestesi', label: 'Bestil anæstesitilsyn på mail (eller akut på tlf. 7846 4803).' },
            { 
                id: 'hlr', 
                label: 'Tjek forhåndstilkendegivelse vedrørende fravalg af genoplivning.',
                infoPath: 'Vejledning - Afsnit 2.1',
                infoText: [
                    'Såfremt patienten har fravalgt genoplivning ved hjertestop i EPJ, SKAL henvisende læge informere patienten om risiko for hjertestop i forbindelse med ECT.',
                    'Drøft om fravalget fortsat skal gælde, eller om der skal laves en midlertidig ophævelse (deaktivering af ikon i EPJ) under ECT-serien.'
                ]
            }
        ]
    },
    {
        id: 'medicin',
        title: '4. Medicin & Ordinationer',
        items: [
            { 
                id: 'pause', 
                label: 'Pauser/justér relevant medicin forud for ECT.',
                infoPath: 'Vejledning - Afsnit 5',
                infoText: [
                    '**Seponeres fuldstændigt under forløbet:** Reserpin, Lidokain, Theophylin.',
                    '**Må IKKE gives efter kl. 17 dagen før:** Benzodiazepiner (hæver krampetærsklen), Lithium, Antiepileptika (bl.a Pregabalin, Valproat).',
                    '**Må IKKE gives på ECT-morgenen:** Diuretika (risiko for blæreruptur), korttidsvirkende Diabetes-medicin.',
                    '**MÅ gives senest kl. 06.00 ECT-morgen:** Antihypertensiva, Antianginøs hjertemedicin, Astmamedicin (ikke theophylin), syrepumpehæmmere, insulinpumpe/langtidsvirkende insulin.'
                ]
            },
            { id: 'toks', label: 'Ordinér måling af TOKS (obs. BT>160/100 mmHg).' },
            { id: 'hydrering', label: 'Ordinér hydrering (min. 1000ml væske dagen før ECT).' },
            { id: 'diabetes', label: 'Ved diabetes: Ordinér BS-måling kl. 7 og 1x/time indtil ECT.', isOptional: true }
        ]
    },
    {
        id: 'booking',
        title: '5. EPJ Booking & Standardplan',
        items: [
            { 
                id: 'henvisning', 
                label: 'Opret standardplanen "Henvisning til ECT" og udfyld SFIer (Indikation unilateral/bilateral).',
                infoPath: 'Vejledning - Afsnit 6',
                infoText: [
                    '**Unilateral (RUL):**\nFørstevalg hos depressive (ikke-psykotiske, ikke spisevægrende). Kan også overvejes frem for bilateral hos ældre patienter for at undgå svære kognitive bivirkninger.',
                    '**Bilateral (bitemporal):**\nFørstevalg ved behov for hurtigt indsættende effekt (psykotisk depression, selvmordsfare, agitation, katatoni, delir). Anvendes ALTID ved behandling under tvang og en bloc.'
                ]
            },
            { id: 'tilfoj_liste', label: 'Tilføj patient på ECT akut- eller elektivliste i EPJ.' },
            { id: 'kommentar', label: 'Skriv i kommentar, hvis pt. har diabetes eller er i Lithium-beh. (for at få en tidlig tid).' }
        ]
    }
];

function EctApp({ onNavigate }) {
    const [checkedItems, setCheckedItems] = useState({});
    const [expandedInfo, setExpandedInfo] = useState({});
    const [activePdf, setActivePdf] = useState('henvisning'); // 'henvisning' eller 'vejledning'
    
    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('ectChecklist');
        if (saved) {
            try {
                setCheckedItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed parsing checklist state");
            }
        }
    }, []);

    const toggleItem = (itemId) => {
        const newState = { ...checkedItems, [itemId]: !checkedItems[itemId] };
        setCheckedItems(newState);
        localStorage.setItem('ectChecklist', JSON.stringify(newState));
    };

    const toggleInfo = (itemId, e) => {
        e.stopPropagation(); // forhindrer tjeklisten i at krydse af
        setExpandedInfo((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
    };

    const clearChecklist = () => {
        if (window.confirm("Er du sikker på, at du vil rydde hele tjeklisten?")) {
            setCheckedItems({});
            localStorage.removeItem('ectChecklist');
        }
    };

    // Calculate progress
    const totalItems = ECT_CHECKLIST.reduce((acc, section) => acc + section.items.length, 0);
    const completedItems = Object.values(checkedItems).filter(Boolean).length;
    const progressPercent = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);

    return (
        <div className="flex flex-col h-screen bg-[#F9F8F6] font-sans">
            {/* Header */}
            <header className="glass-panel border-b-0 px-6 py-3 flex justify-between items-center shadow-sm shrink-0 z-20">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onNavigate('home')}
                        className="p-1.5 hover:bg-[#F9F8F6] rounded-xl transition-colors text-[#839788] hover:text-[#3A4A40]"
                        title="Tilbage til forsiden"
                    >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                    </button>
                    <div className="bg-amber-600 p-1.5 rounded-lg"><Activity className="text-white h-5 w-5" /></div>
                    <div>
                        <h1 className="text-lg font-bold text-[#3A4A40] leading-tight">ECT-Henvisning</h1>
                        <div className="flex items-center gap-1.5 text-xs text-[#839788]/80"><span>Tjekliste og vejledning for booking</span></div>
                    </div>
                </div>
            </header>

            {/* Main Layout - Split View */}
            <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
                
                {/* Left Side - Interactive Checklist */}
                <div className="w-full lg:w-1/2 flex flex-col h-full overflow-y-auto p-4 lg:p-8 border-r border-[#E8E4D9]">
                    <div className="max-w-2xl mx-auto w-full">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#3A4A40] mb-2">Henvisnings-Tjekliste</h2>
                            <p className="text-[#839788] text-sm mb-4">
                                Følg denne tjekliste for at sikre, at du har alle nødvendige trin med ifm. henvisning og booking af ECT. Din fremgang gemmes automatisk lokalt.
                            </p>
                            
                            {/* Progress Bar */}
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E8E4D9] flex flex-col">
                                <div className="flex justify-between text-sm font-medium mb-2">
                                    <span className="text-[#3A4A40]">Fremgang: {completedItems} af {totalItems}</span>
                                    <span className={progressPercent === 100 ? "text-green-600 font-bold" : "text-amber-600"}>{progressPercent}%</span>
                                </div>
                                <div className="w-full bg-[#F2F6F3] rounded-full h-2.5 overflow-hidden">
                                    <div 
                                        className={`h-2.5 rounded-full transition-all duration-500 ${progressPercent === 100 ? 'bg-green-500' : 'bg-amber-500'}`} 
                                        style={{ width: `${progressPercent}%` }}
                                    ></div>
                                </div>
                                {progressPercent === 100 && (
                                    <div className="mt-3 text-sm text-green-700 font-medium flex items-center gap-2 bg-green-50 p-2 rounded-lg">
                                        <CheckCircle className="w-4 h-4" /> Henvisning er nu klar til at blive sendt.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Checklist Items */}
                        <div className="space-y-6">
                            {ECT_CHECKLIST.map((section) => (
                                <div key={section.id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#E8E4D9]">
                                    <h3 className="text-lg font-bold text-[#3A4A40] border-b border-[#F2F6F3] pb-2 mb-3">
                                        {section.title}
                                    </h3>
                                    <div className="space-y-3">
                                        {section.items.map((item) => {
                                            const isChecked = checkedItems[item.id] || false;
                                            return (
                                                <div key={item.id} className="w-full flex flex-col p-2 rounded-xl hover:bg-[#F9F8F6] transition-colors border border-transparent group">
                                                    <div className="flex items-start gap-3 cursor-pointer" onClick={() => toggleItem(item.id)}>
                                                        <div className={`mt-0.5 shrink-0 transition-colors ${isChecked ? 'text-green-500' : 'text-[#839788] group-hover:text-amber-500'}`}>
                                                            {isChecked ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className={`text-sm ${isChecked ? 'text-[#839788] line-through' : 'text-[#3A4A40]'}`}>
                                                                {item.label}
                                                            </span>
                                                            {item.isOptional && (
                                                                <span className="ml-2 text-[10px] uppercase font-bold tracking-wider bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">Ved Relevans</span>
                                                            )}
                                                            {item.infoText && (
                                                                <button
                                                                    onClick={(e) => toggleInfo(item.id, e)}
                                                                    className={`ml-2 text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded flex items-center gap-1 inline-flex hover:opacity-80 transition-opacity ${expandedInfo[item.id] ? 'bg-amber-100 text-amber-800' : 'bg-[#E8E4D9] text-[#6A7A6E]'}`}
                                                                >
                                                                    <BookOpen className="w-3 h-3" />
                                                                    Læs mere
                                                                    {expandedInfo[item.id] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Fold-out Info Panel */}
                                                    {item.infoText && expandedInfo[item.id] && (
                                                        <div className="mt-3 ml-8 bg-amber-50 rounded-lg p-4 border border-amber-100 text-sm text-[#5D4037] shadow-inner mb-2">
                                                            <div className="font-bold flex items-center gap-1.5 mb-2 text-amber-800 text-xs uppercase tracking-wider">
                                                                <Info className="w-4 h-4" />
                                                                {item.infoPath}
                                                            </div>
                                                            <ul className="space-y-2 list-disc pl-4 marker:text-amber-400">
                                                                {item.infoText.map((text, idx) => (
                                                                    <li key={idx} dangerouslySetInnerHTML={{__html: text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}} />
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                            <button 
                                onClick={clearChecklist}
                                className="text-sm text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors font-medium border border-transparent hover:border-red-100"
                            >
                                Ryd tjekliste for næste patient
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side - PDF Frame */}
                <div className="w-full lg:w-1/2 flex flex-col h-[500px] lg:h-full bg-white relative p-4 lg:p-6">
                    
                    {/* Tabs for PDF selection */}
                    <div className="flex bg-[#F2F6F3] p-1 rounded-xl mb-4 shrink-0 shadow-inner">
                        <button
                            onClick={() => setActivePdf('henvisning')}
                            className={`flex flex-1 items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                                activePdf === 'henvisning' 
                                ? 'bg-white text-amber-600 shadow-sm' 
                                : 'text-[#839788] hover:text-[#3A4A40]'
                            }`}
                        >
                            <FileText className="w-4 h-4" />
                            Bilag 1 (Henvisning)
                        </button>
                        <button
                            onClick={() => setActivePdf('vejledning')}
                            className={`flex flex-1 items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                                activePdf === 'vejledning' 
                                ? 'bg-white text-amber-600 shadow-sm' 
                                : 'text-[#839788] hover:text-[#3A4A40]'
                            }`}
                        >
                            <BookOpen className="w-4 h-4" />
                            ECT Vejledning
                        </button>
                    </div>

                    <div className="flex justify-between items-center mb-4 shrink-0">
                        <h2 className="text-lg font-bold text-[#3A4A40] flex items-center gap-2">
                            {activePdf === 'henvisning' ? 'Afd. Specifik Henvisning' : 'Fælles Regional Retningslinje'}
                        </h2>
                        <a 
                            href={activePdf === 'henvisning' ? `${import.meta.env.BASE_URL}pdf/Bilag_1_Henvisning_ECT.pdf` : `${import.meta.env.BASE_URL}pdf/ECT_Retningslinje.pdf`} 
                            download 
                            className="flex items-center gap-2 bg-[#839788] text-white px-3 py-1.5 rounded-lg hover:bg-[#6A7A6E] transition-colors shadow-sm font-medium text-xs lg:text-sm"
                        >
                            <Download className="w-4 h-4" /> Download
                        </a>
                    </div>
                    
                    <div className="flex-1 border border-[#E8E4D9] rounded-xl overflow-hidden shadow-inner bg-[#F9F8F6]">
                        {activePdf === 'henvisning' ? (
                            <iframe
                                src={`${import.meta.env.BASE_URL}pdf/Bilag_1_Henvisning_ECT.pdf#toolbar=1`}
                                className="w-full h-full"
                                title="Bilag 1 - Henvisning og booking ECT"
                            />
                        ) : (
                            <iframe
                                src={`${import.meta.env.BASE_URL}pdf/ECT_Retningslinje.pdf#toolbar=1`}
                                className="w-full h-full"
                                title="ECT Vejledning Retningslinje"
                            />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EctApp;
