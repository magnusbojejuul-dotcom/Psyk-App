import React, { useState, useEffect, useMemo } from 'react';
import './index.css';
import {
    ANOREXIA_OPTIONS,
    ACTUAL_PSYCH_OPTIONS,
    PSYCH_OPTIONS,
    SOMATIC_ACT_OPTIONS
} from './data.js';

export default function App() {
    const [activeTab, setActiveTab] = useState('actual');
    const [selections, setSelections] = useState({});
    const [inputs, setInputs] = useState({});
    const [generatedText, setGeneratedText] = useState('');

    const tabs = [
        { id: 'actual', label: 'Aktuelt', options: ACTUAL_PSYCH_OPTIONS },
        { id: 'psych', label: 'Obj. Psykisk', options: PSYCH_OPTIONS },
        { id: 'somatic', label: 'Obj. Somatisk', options: SOMATIC_ACT_OPTIONS },
        { id: 'anorexia', label: 'Anoreksi', options: ANOREXIA_OPTIONS }
    ];

    useEffect(() => {
        const initialSelections = {};
        [...ACTUAL_PSYCH_OPTIONS, ...PSYCH_OPTIONS, ...SOMATIC_ACT_OPTIONS, ...ANOREXIA_OPTIONS].forEach(opt => {
            if (opt.isDefault) {
                initialSelections[opt.id] = true;
            }
        });
        setSelections(initialSelections);
    }, []);

    const toggleOption = (option, optionsArray) => {
        setSelections(prev => {
            const newState = { ...prev, [option.id]: !prev[option.id] };

            if (newState[option.id] && option.exclude) {
                option.exclude.forEach(exId => {
                    newState[exId] = false;
                });
            }

            return newState;
        });
    };

    const handleInputChange = (id, value) => {
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const resetToDefaults = () => {
        const initialSelections = {};
        [...ACTUAL_PSYCH_OPTIONS, ...PSYCH_OPTIONS, ...SOMATIC_ACT_OPTIONS, ...ANOREXIA_OPTIONS].forEach(opt => {
            if (opt.isDefault) {
                initialSelections[opt.id] = true;
            }
        });
        setSelections(initialSelections);
        setInputs({});
    };

    useEffect(() => {
        let fullText = '';

        tabs.forEach(tab => {
            const selectedOptions = tab.options.filter(opt => selections[opt.id]);
            if (selectedOptions.length === 0) return;

            fullText += `--- ${tab.label.toUpperCase()} ---\n`;

            const byCategory = {};
            selectedOptions.forEach(opt => {
                if (!byCategory[opt.category]) byCategory[opt.category] = [];
                byCategory[opt.category].push(opt);
            });

            Object.keys(byCategory).forEach(category => {
                const opts = byCategory[category];
                
                const smartMergeGroups = {};
                const standalone = [];

                opts.forEach(opt => {
                    if (opt.smartMerge) {
                        const prefix = opt.smartMerge.prefix;
                        if (!smartMergeGroups[prefix]) smartMergeGroups[prefix] = { suffix: opt.smartMerge.suffix, items: [] };
                        
                        let itemText = opt.smartMerge.item;
                        if (opt.hasInput && inputs[opt.id]) {
                            itemText += opt.detailInParens ? ` (${inputs[opt.id]})` : ` ${inputs[opt.id]}`;
                        }
                        smartMergeGroups[prefix].items.push(itemText);
                    } else {
                        standalone.push(opt);
                    }
                });

                Object.keys(smartMergeGroups).forEach(prefix => {
                    const group = smartMergeGroups[prefix];
                    let mergedText = prefix;
                    if (group.items.length === 1) {
                        mergedText += group.items[0];
                    } else if (group.items.length === 2) {
                        mergedText += group.items.join(' og ');
                    } else {
                        mergedText += group.items.slice(0, -1).join(', ') + ' og ' + group.items[group.items.length - 1];
                    }
                    mergedText += group.suffix + '\n';
                    fullText += mergedText;
                });

                standalone.forEach(opt => {
                    let text = opt.text;
                    if (opt.hasInput && inputs[opt.id]) {
                        text += opt.detailInParens ? ` (${inputs[opt.id]})` : ` ${inputs[opt.id]}`;
                    }
                    if (!text.endsWith('.') && !text.endsWith(':') && !text.endsWith('\n')) text += '.';
                    fullText += text + '\n';
                });
            });

            fullText += '\n';
        });

        setGeneratedText(fullText.trim());
    }, [selections, inputs]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedText);
    };

    const currentTabObj = tabs.find(t => t.id === activeTab);

    const categories = useMemo(() => {
        const cats = {};
        currentTabObj.options.forEach(opt => {
            if (!cats[opt.category]) cats[opt.category] = [];
            cats[opt.category].push(opt);
        });
        return cats;
    }, [currentTabObj]);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Psykiatrisk Journalværktøj</h1>
                <div className="tab-container">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </header>

            <main className="app-main">
                <div className="options-panel">
                    {Object.keys(categories).map(category => (
                        <div key={category} className="category-section">
                            <h3 className="category-title">{category}</h3>
                            <div className="options-grid">
                                {categories[category].map(opt => (
                                    <div key={opt.id} className="option-wrapper">
                                        <button
                                            className={`option-btn ${selections[opt.id] ? 'selected' : ''}`}
                                            onClick={() => toggleOption(opt, currentTabObj.options)}
                                        >
                                            {opt.label}
                                        </button>
                                        
                                        {selections[opt.id] && opt.hasInput && (
                                            <input
                                                type="text"
                                                className="option-input"
                                                placeholder={opt.inputPlaceholder || "Uddyb..."}
                                                value={inputs[opt.id] || ''}
                                                onChange={(e) => handleInputChange(opt.id, e.target.value)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="preview-panel">
                    <div className="preview-header">
                        <h2>Genereret Journaltekst</h2>
                        <div className="action-buttons">
                            <button className="btn-secondary" onClick={resetToDefaults}>Nulstil til standard</button>
                            <button className="btn-primary" onClick={copyToClipboard}>Kopier tekst</button>
                        </div>
                    </div>
                    <textarea 
                        className="preview-textarea"
                        readOnly
                        value={generatedText}
                    />
                </div>
            </main>
        </div>
    );
}