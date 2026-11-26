import React, { useState, useEffect, useMemo } from 'react';
import {
    BookOpen, FileText, Download, ExternalLink, Search, ChevronRight, ChevronLeft,
    Users, Stethoscope, Clipboard, ShieldAlert, Activity, Info, AlertTriangle,
    Copy, Check, X
} from './Icons';
import PdfViewer from './PdfViewer';
import { GROENSPAETTEBOG_META, GROENSPAETTEBOG_THEMES } from '../data/groenspaettebogData';

const ICON_MAP = {
    Users,
    Stethoscope,
    Clipboard,
    ShieldAlert,
    FileText,
    Activity,
    BookOpen,
};

function getThemeIcon(iconName, className = 'w-5 h-5') {
    const IconComp = ICON_MAP[iconName] || BookOpen;
    return <IconComp className={className} />;
}

function CopyTemplateBlock({ block }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(block.templateText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-2xs">
            <div className="px-4 py-3 bg-[#FAF9F6] border-b border-[#E8E4D9] flex flex-wrap items-center justify-between gap-2">
                <div>
                    <h4 className="font-bold text-sm text-[#3A4A40]">{block.title}</h4>
                    {block.description && (
                        <p className="text-xs text-[#839788] mt-0.5">{block.description}</p>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 bg-white border border-[#E8E4D9] text-[#3A4A40] hover:bg-[#F2F6F3] rounded-xl transition-colors font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Kopiér tekstskabelon"
                >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#839788]" />}
                    <span>{copied ? 'Kopieret!' : 'Kopiér tekst'}</span>
                </button>
            </div>
            <pre className="p-4 text-xs md:text-[13px] leading-relaxed text-[#3A4A40] font-sans whitespace-pre-wrap bg-white overflow-x-auto select-text">
                {block.templateText}
            </pre>
        </div>
    );
}

function ImageBlock({ block }) {
    const [failed, setFailed] = useState(false);
    if (failed) return null;

    const cleanSrc = block.src.startsWith('/') ? block.src.slice(1) : block.src;
    const imgUrl = `${import.meta.env.BASE_URL}${cleanSrc}`;

    return (
        <div className="bg-white rounded-2xl border border-[#E8E4D9] p-4 shadow-2xs">
            <div className="overflow-x-auto flex justify-center bg-[#FAF9F6] rounded-xl p-3 border border-[#E8E4D9]/60">
                <img
                    src={imgUrl}
                    alt={block.alt || ''}
                    onError={() => setFailed(true)}
                    className="max-w-full max-h-[520px] object-contain rounded-lg shadow-xs"
                />
            </div>
            {block.caption && (
                <p className="text-xs text-[#839788] mt-2.5 text-center font-medium">{block.caption}</p>
            )}
        </div>
    );
}

function SocialDirectoryBlock({ block }) {
    const [query, setQuery] = useState('');
    const [selectedCat, setSelectedCat] = useState('all');

    const normalizedQuery = query.trim().toLowerCase();

    const filteredCategories = useMemo(() => {
        return block.categories
            .filter(cat => selectedCat === 'all' || cat.name === selectedCat)
            .map(cat => ({
                ...cat,
                items: cat.items.filter(item => {
                    if (!normalizedQuery) return true;
                    return (
                        item.name.toLowerCase().includes(normalizedQuery) ||
                        item.target.toLowerCase().includes(normalizedQuery) ||
                        (item.afsnit && item.afsnit.toLowerCase().includes(normalizedQuery))
                    );
                }),
            }))
            .filter(cat => cat.items.length > 0);
    }, [block.categories, selectedCat, normalizedQuery]);

    return (
        <div className="space-y-4">
            {block.intro && (
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs md:text-sm text-blue-950 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p>{block.intro}</p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#839788] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Filtrér tilbud, målgruppe eller afsnit (fx S7, S8, S10)..."
                        className="w-full pl-9 pr-8 py-2 bg-white border border-[#E8E4D9] rounded-xl text-sm text-[#3A4A40] placeholder:text-[#839788]/70 focus:outline-none focus:ring-2 focus:ring-[#839788]"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#839788] hover:text-[#3A4A40]"
                            title="Ryd filter"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <select
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    className="px-3 py-2 bg-white border border-[#E8E4D9] rounded-xl text-sm text-[#3A4A40] font-medium focus:outline-none focus:ring-2 focus:ring-[#839788]"
                >
                    <option value="all">Alle kategorier ({block.categories.length})</option>
                    {block.categories.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {filteredCategories.length === 0 ? (
                <div className="p-6 bg-white rounded-2xl border border-[#E8E4D9] text-center text-sm text-[#839788]">
                    Ingen sociale tilbud matcher din søgning.
                </div>
            ) : (
                filteredCategories.map(cat => (
                    <div key={cat.name} className="bg-white rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-2xs">
                        <div className="px-4 py-2.5 bg-[#F2F6F3] border-b border-[#E8E4D9] flex items-center justify-between">
                            <h4 className="font-bold text-sm text-[#3A4A40]">{cat.name}</h4>
                            <span className="text-[11px] font-semibold text-[#839788]">{cat.items.length} tilbud</span>
                        </div>
                        <div className="divide-y divide-[#E8E4D9]/70">
                            {cat.items.map((item, idx) => (
                                <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#FAF9F6]/60 transition-colors">
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-bold text-sm text-[#3A4A40]">{item.name}</span>
                                            {item.afsnit && (
                                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E2E8DF] text-[#3A4A40]">
                                                    {item.afsnit}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs md:text-sm text-[#5C6B61] leading-relaxed whitespace-pre-line">{item.target}</p>
                                    </div>
                                    {(item.linkUrl || item.secondaryLinkUrl) && (
                                        <div className="flex flex-wrap gap-2 shrink-0">
                                            {item.linkUrl && (
                                                <a
                                                    href={item.linkUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E8E4D9] text-xs font-medium text-[#3A4A40] hover:bg-[#E2E8DF] transition-colors"
                                                >
                                                    <span>{item.linkLabel || 'Link'}</span>
                                                    <ExternalLink className="w-3 h-3 text-[#839788]" />
                                                </a>
                                            )}
                                            {item.secondaryLinkUrl && (
                                                <a
                                                    href={item.secondaryLinkUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E8E4D9] text-xs font-medium text-[#3A4A40] hover:bg-[#E2E8DF] transition-colors"
                                                >
                                                    <span>{item.secondaryLinkLabel || 'Link'}</span>
                                                    <ExternalLink className="w-3 h-3 text-[#839788]" />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

function renderBlock(block, idx) {
    switch (block.type) {
        case 'paragraph':
            return (
                <p key={idx} className="text-sm text-[#4A5A50] leading-relaxed whitespace-pre-line">
                    {block.text}
                </p>
            );

        case 'callout': {
            const styles = {
                info: 'bg-blue-50/80 border-blue-200 text-blue-950',
                warning: 'bg-amber-50/90 border-amber-200 text-amber-950',
                danger: 'bg-red-50/85 border-red-200 text-red-950',
                success: 'bg-emerald-50/85 border-emerald-200 text-emerald-950',
            };
            const iconColors = {
                info: 'text-blue-600',
                warning: 'text-amber-600',
                danger: 'text-red-600',
                success: 'text-emerald-600',
            };
            const variant = block.variant || 'info';
            const Icon = variant === 'danger' ? ShieldAlert : variant === 'warning' ? AlertTriangle : Info;

            return (
                <div key={idx} className={`p-4 rounded-2xl border ${styles[variant] || styles.info}`}>
                    <div className="flex items-start gap-2.5">
                        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColors[variant] || iconColors.info}`} />
                        <div className="space-y-1.5 flex-1">
                            {block.title && <h4 className="font-bold text-sm">{block.title}</h4>}
                            {block.text && <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line">{block.text}</p>}
                            {block.items && (
                                <ul className="space-y-1 text-xs md:text-sm leading-relaxed list-disc pl-4">
                                    {block.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        case 'epjPath':
            return (
                <div key={idx} className="p-3.5 rounded-xl bg-[#F2F6F3] border border-[#D4DFD5] flex flex-col sm:flex-row sm:items-center gap-2">
                    {block.label && (
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#3A4A40] text-white shrink-0 w-fit">
                            {block.label}
                        </span>
                    )}
                    <code className="text-xs md:text-sm font-mono text-[#3A4A40] break-words">{block.path}</code>
                </div>
            );

        case 'bullets':
            return (
                <div key={idx} className="bg-white rounded-2xl border border-[#E8E4D9] p-4 shadow-2xs">
                    {block.title && <h4 className="font-bold text-sm text-[#3A4A40] mb-2.5">{block.title}</h4>}
                    <ul className="space-y-1.5 text-xs md:text-sm text-[#4A5A50] list-disc pl-5 leading-relaxed">
                        {block.items.map((item, i) => (
                            <li key={i} className="whitespace-pre-line">{item}</li>
                        ))}
                    </ul>
                </div>
            );

        case 'numbered':
            return (
                <div key={idx} className="bg-white rounded-2xl border border-[#E8E4D9] p-4 shadow-2xs">
                    {block.title && <h4 className="font-bold text-sm text-[#3A4A40] mb-2.5">{block.title}</h4>}
                    <ol className="space-y-2 text-xs md:text-sm text-[#4A5A50] list-decimal pl-5 leading-relaxed">
                        {block.items.map((item, i) => (
                            <li key={i} className="whitespace-pre-line">{item}</li>
                        ))}
                    </ol>
                </div>
            );

        case 'kvList':
            return (
                <div key={idx} className="bg-white rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-2xs">
                    {block.title && (
                        <div className="px-4 py-2.5 bg-[#FAF9F6] border-b border-[#E8E4D9]">
                            <h4 className="font-bold text-sm text-[#3A4A40]">{block.title}</h4>
                        </div>
                    )}
                    <div className="divide-y divide-[#E8E4D9]/70">
                        {block.items.map((item, i) => (
                            <div key={i} className="p-3.5 md:px-4 flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
                                <div className="sm:w-56 shrink-0">
                                    <div className="font-bold text-xs md:text-sm text-[#3A4A40]">{item.key}</div>
                                    {item.badge && (
                                        <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#E2E8DF] text-[#3A4A40]">
                                            {item.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs md:text-sm text-[#4A5A50] leading-relaxed whitespace-pre-line flex-1">
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case 'table':
            return (
                <div key={idx} className="bg-white rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-2xs">
                    {block.title && (
                        <div className="px-4 py-2.5 bg-[#FAF9F6] border-b border-[#E8E4D9]">
                            <h4 className="font-bold text-sm text-[#3A4A40]">{block.title}</h4>
                        </div>
                    )}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                            <thead>
                                <tr className="bg-[#F2F6F3] border-b border-[#E8E4D9] text-[#3A4A40]">
                                    {block.headers.map((h, i) => (
                                        <th key={i} className="px-4 py-2.5 font-bold whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E4D9]/70 text-[#4A5A50]">
                                {block.rows.map((row, rIdx) => (
                                    <tr key={rIdx} className="hover:bg-[#FAF9F6]/60">
                                        {row.map((cell, cIdx) => (
                                            <td key={cIdx} className={`px-4 py-3 align-top whitespace-pre-line ${cIdx === 0 ? 'font-semibold text-[#3A4A40]' : ''}`}>
                                                {typeof cell === 'object' && cell !== null && cell.url ? (
                                                    <a
                                                        href={cell.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-[#3A4A40] hover:text-[#6A7A6E] underline decoration-[#839788]"
                                                    >
                                                        <span>{cell.label}</span>
                                                        <ExternalLink className="w-3.5 h-3.5 text-[#839788]" />
                                                    </a>
                                                ) : (
                                                    cell
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );

        case 'copyTemplate':
            return <CopyTemplateBlock key={idx} block={block} />;

        case 'links':
            return (
                <div key={idx} className="bg-white rounded-2xl border border-[#E8E4D9] p-4 shadow-2xs">
                    {block.title && <h4 className="font-bold text-sm text-[#3A4A40] mb-3">{block.title}</h4>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {block.items.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#FAF9F6] border border-[#E8E4D9] hover:bg-[#F2F6F3] hover:border-[#839788]/50 transition-all group"
                            >
                                <div className="min-w-0">
                                    <div className="text-xs md:text-sm font-semibold text-[#3A4A40] group-hover:underline truncate">
                                        {link.label}
                                    </div>
                                    {link.description && (
                                        <div className="text-[11px] text-[#839788] truncate mt-0.5">{link.description}</div>
                                    )}
                                </div>
                                <ExternalLink className="w-4 h-4 text-[#839788] shrink-0" />
                            </a>
                        ))}
                    </div>
                </div>
            );

        case 'image':
            return <ImageBlock key={idx} block={block} />;

        case 'colorLegend': {
            const dotColors = {
                blue: 'bg-blue-500',
                amber: 'bg-amber-500',
                red: 'bg-red-500',
                green: 'bg-emerald-500',
                purple: 'bg-purple-500',
            };
            return (
                <div key={idx} className="bg-white rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-2xs">
                    {block.title && (
                        <div className="px-4 py-2.5 bg-[#FAF9F6] border-b border-[#E8E4D9]">
                            <h4 className="font-bold text-sm text-[#3A4A40]">{block.title}</h4>
                        </div>
                    )}
                    <div className="divide-y divide-[#E8E4D9]/70">
                        {block.items.map((item, i) => (
                            <div key={i} className="p-3.5 flex items-start gap-3">
                                <span className={`w-3 h-3 rounded-full shrink-0 mt-1.5 ${dotColors[item.color] || 'bg-[#839788]'}`} />
                                <div>
                                    <div className="font-bold text-xs md:text-sm text-[#3A4A40]">{item.label}</div>
                                    <div className="text-xs md:text-sm text-[#4A5A50] leading-relaxed mt-0.5">{item.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        case 'statusBadges': {
            const badgeStyles = {
                green: 'bg-emerald-50/90 border-emerald-200 text-emerald-950',
                amber: 'bg-amber-50/90 border-amber-200 text-amber-950',
                red: 'bg-red-50/90 border-red-200 text-red-950',
            };
            const pillStyles = {
                green: 'bg-emerald-600 text-white',
                amber: 'bg-amber-500 text-white',
                red: 'bg-red-600 text-white',
            };
            return (
                <div key={idx} className="space-y-2.5">
                    {block.title && <h4 className="font-bold text-sm text-[#3A4A40]">{block.title}</h4>}
                    <div className="grid grid-cols-1 gap-2.5">
                        {block.items.map((item, i) => (
                            <div key={i} className={`p-3.5 rounded-2xl border ${badgeStyles[item.color] || badgeStyles.green}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-full ${pillStyles[item.color] || pillStyles.green}`}>
                                        {item.badge}
                                    </span>
                                    <span className="font-bold text-xs md:text-sm">{item.title}</span>
                                </div>
                                <p className="text-xs md:text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        case 'socialDirectory':
            return <SocialDirectoryBlock key={idx} block={block} />;

        default:
            return null;
    }
}

function collectBlockSearchText(block) {
    const parts = [];
    if (block.title) parts.push(block.title);
    if (block.text) parts.push(block.text);
    if (block.description) parts.push(block.description);
    if (block.path) parts.push(block.path);
    if (block.templateText) parts.push(block.templateText);
    if (block.intro) parts.push(block.intro);
    if (Array.isArray(block.items)) {
        block.items.forEach(item => {
            if (typeof item === 'string') parts.push(item);
            else if (item && typeof item === 'object') {
                parts.push(item.key || '', item.value || '', item.label || '', item.description || '', item.title || '', item.text || '');
            }
        });
    }
    if (Array.isArray(block.rows)) {
        block.rows.forEach(row => row.forEach(c => parts.push(typeof c === 'string' ? c : c?.label || '')));
    }
    if (Array.isArray(block.categories)) {
        block.categories.forEach(cat => {
            parts.push(cat.name);
            cat.items.forEach(it => parts.push(it.name, it.target, it.afsnit || ''));
        });
    }
    return parts.join(' ').toLowerCase();
}

export default function GroenspaettebogView({ activeId, initialSubSection = null, onSelectView }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSubFilter, setActiveSubFilter] = useState('all');

    const pdfUrl = `${import.meta.env.BASE_URL}${GROENSPAETTEBOG_META.pdfFile}`;

    useEffect(() => {
        if (initialSubSection) {
            setActiveSubFilter(initialSubSection);
        } else {
            setActiveSubFilter('all');
        }
    }, [activeId, initialSubSection]);

    // Search results for Overview
    const searchResults = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q) return [];
        const matches = [];
        GROENSPAETTEBOG_THEMES.forEach(theme => {
            theme.subSections.forEach(sub => {
                const haystack = `${theme.title} ${theme.summary} ${sub.title} ${sub.blocks.map(collectBlockSearchText).join(' ')}`.toLowerCase();
                if (haystack.includes(q)) {
                    matches.push({
                        theme,
                        subSection: sub,
                    });
                }
            });
        });
        return matches;
    }, [searchQuery]);

    // -------------------------------------------------------------
    // 1. Full PDF View
    // -------------------------------------------------------------
    if (activeId === 'gs_fuld_pdf') {
        return (
            <div className="max-w-5xl mx-auto h-full flex flex-col pb-6">
                <div className="mb-4 shrink-0 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <button
                            onClick={() => onSelectView('groenspaettebog_oversigt')}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#839788] hover:text-[#3A4A40] mb-1 cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" /> Tilbage til Grønspættebogen-overblik
                        </button>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40]">{GROENSPAETTEBOG_META.title} (Fuld PDF)</h2>
                        <p className="text-[#839788] text-sm">
                            {GROENSPAETTEBOG_META.subtitle} · {GROENSPAETTEBOG_META.totalPages} sider
                        </p>
                    </div>
                </div>

                <div className="flex-1 min-h-[600px] flex flex-col">
                    <PdfViewer
                        url={pdfUrl}
                        title={GROENSPAETTEBOG_META.title}
                        downloadName={GROENSPAETTEBOG_META.downloadName}
                    />
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    // 2. Theme Detail View
    // -------------------------------------------------------------
    const themeIndex = GROENSPAETTEBOG_THEMES.findIndex(t => t.navId === activeId);
    if (themeIndex !== -1) {
        const theme = GROENSPAETTEBOG_THEMES[themeIndex];
        const prevTheme = themeIndex > 0 ? GROENSPAETTEBOG_THEMES[themeIndex - 1] : null;
        const nextTheme = themeIndex < GROENSPAETTEBOG_THEMES.length - 1 ? GROENSPAETTEBOG_THEMES[themeIndex + 1] : null;

        const visibleSubSections =
            activeSubFilter === 'all'
                ? theme.subSections
                : theme.subSections.filter(s => s.id === activeSubFilter);

        return (
            <div className="max-w-4xl mx-auto pb-14 space-y-6 animate-in fade-in duration-300">
                {/* Top Header */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-[#E8E4D9] p-5 shadow-2xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <button
                            onClick={() => onSelectView('groenspaettebog_oversigt')}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#839788] hover:text-[#3A4A40] transition-colors cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" /> Tilbage til Grønspættebogen-overblik
                        </button>
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E2E8DF] text-[#3A4A40]">
                            Grønspættebogen · {theme.pages}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-xl bg-[#839788]/15 text-[#3A4A40] shrink-0">
                                {getThemeIcon(theme.icon, 'w-6 h-6')}
                            </div>
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-[#3A4A40]">{theme.title}</h2>
                                <p className="text-xs md:text-sm text-[#839788] mt-0.5">{theme.summary}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <button
                                onClick={() => onSelectView('gs_fuld_pdf')}
                                className="px-3 py-1.5 bg-white border border-[#E8E4D9] text-[#3A4A40] hover:bg-[#F2F6F3] rounded-xl transition-colors font-medium text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
                            >
                                <BookOpen className="w-3.5 h-3.5 text-[#839788]" />
                                <span>Vis fuld PDF</span>
                            </button>
                            <a
                                href={`${pdfUrl}#page=${theme.startPage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-white border border-[#E8E4D9] text-[#3A4A40] hover:bg-[#F2F6F3] rounded-xl transition-colors font-medium text-xs flex items-center gap-1.5 shadow-2xs"
                                title={`Åbn PDF på side ${theme.startPage}`}
                            >
                                <ExternalLink className="w-3.5 h-3.5 text-[#839788]" />
                                <span>Åbn PDF ({theme.pages})</span>
                            </a>
                            <a
                                href={pdfUrl}
                                download={GROENSPAETTEBOG_META.downloadName}
                                className="px-3 py-1.5 bg-[#839788] text-white hover:bg-[#6A7A6E] rounded-xl transition-colors font-medium text-xs flex items-center gap-1.5 shadow-2xs"
                            >
                                <Download className="w-3.5 h-3.5" />
                                <span>Hent PDF</span>
                            </a>
                        </div>
                    </div>

                    {/* Sub-section filter chips */}
                    {theme.subSections.length > 1 && (
                        <div className="pt-2 border-t border-[#E8E4D9]/70 flex items-center gap-2 overflow-x-auto pb-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#839788] shrink-0">Sektion:</span>
                            <button
                                onClick={() => setActiveSubFilter('all')}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer border ${
                                    activeSubFilter === 'all'
                                        ? 'bg-[#3A4A40] text-white border-[#3A4A40]'
                                        : 'bg-[#FAF9F6] text-[#5C6B61] border-[#E8E4D9] hover:bg-white'
                                }`}
                            >
                                Alle ({theme.subSections.length})
                            </button>
                            {theme.subSections.map(sub => (
                                <button
                                    key={sub.id}
                                    onClick={() => setActiveSubFilter(sub.id)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer border ${
                                        activeSubFilter === sub.id
                                            ? 'bg-[#839788] text-white border-[#839788]'
                                            : 'bg-[#FAF9F6] text-[#5C6B61] border-[#E8E4D9] hover:bg-white'
                                    }`}
                                >
                                    {sub.title}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Subsections content */}
                <div className="space-y-8">
                    {visibleSubSections.map(sub => (
                        <section key={sub.id} className="space-y-4">
                            <div className="flex items-center justify-between gap-2 border-b border-[#E8E4D9] pb-2">
                                <h3 className="text-lg md:text-xl font-bold text-[#3A4A40]">{sub.title}</h3>
                                <span className="text-xs font-semibold text-[#839788] shrink-0">{sub.pages}</span>
                            </div>
                            <div className="space-y-4">
                                {sub.blocks.map((block, bIdx) => renderBlock(block, bIdx))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Prev / Next Footer Navigation */}
                <div className="pt-4 border-t border-[#E8E4D9] flex flex-wrap items-center justify-between gap-3">
                    {prevTheme ? (
                        <button
                            onClick={() => onSelectView(prevTheme.navId)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E8E4D9] text-sm font-semibold text-[#3A4A40] hover:bg-[#F2F6F3] transition-colors cursor-pointer shadow-2xs"
                        >
                            <ChevronLeft className="w-4 h-4 text-[#839788]" />
                            <span>Forrige: {prevTheme.shortTitle}</span>
                        </button>
                    ) : <div />}

                    {nextTheme && (
                        <button
                            onClick={() => onSelectView(nextTheme.navId)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E8E4D9] text-sm font-semibold text-[#3A4A40] hover:bg-[#F2F6F3] transition-colors cursor-pointer shadow-2xs ml-auto"
                        >
                            <span>Næste: {nextTheme.shortTitle}</span>
                            <ChevronRight className="w-4 h-4 text-[#839788]" />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    // 3. Overview View (Default: groenspaettebog_oversigt)
    // -------------------------------------------------------------
    return (
        <div className="max-w-5xl mx-auto pb-14 space-y-6 animate-in fade-in duration-300">
            {/* Hero Header */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-[#E8E4D9] p-6 shadow-2xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                        <div className="p-3 rounded-2xl bg-[#839788] text-white shadow-sm shrink-0">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E2E8DF] text-[#3A4A40]">
                                    Velkomstmanual · {GROENSPAETTEBOG_META.totalPages} sider
                                </span>
                                <span className="text-xs text-[#839788]">
                                    {GROENSPAETTEBOG_META.authors} · Opdateret {GROENSPAETTEBOG_META.updated}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-[#3A4A40]">{GROENSPAETTEBOG_META.title}</h2>
                            <p className="text-sm text-[#5C6B61] mt-1">{GROENSPAETTEBOG_META.subtitle}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                            onClick={() => onSelectView('gs_fuld_pdf')}
                            className="px-3.5 py-2 bg-white border border-[#E8E4D9] text-[#3A4A40] hover:bg-[#F2F6F3] rounded-xl transition-colors font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                            <FileText className="w-4 h-4 text-[#839788]" />
                            <span>Vis fuld PDF</span>
                        </button>
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 bg-white border border-[#E8E4D9] text-[#3A4A40] hover:bg-[#F2F6F3] rounded-xl transition-colors font-semibold text-xs flex items-center gap-1.5 shadow-2xs"
                        >
                            <ExternalLink className="w-4 h-4 text-[#839788]" />
                            <span>Åbn i ny fane</span>
                        </a>
                        <a
                            href={pdfUrl}
                            download={GROENSPAETTEBOG_META.downloadName}
                            className="px-3.5 py-2 bg-[#839788] text-white hover:bg-[#6A7A6E] rounded-xl transition-colors font-semibold text-xs flex items-center gap-1.5 shadow-2xs"
                        >
                            <Download className="w-4 h-4" />
                            <span>Hent PDF</span>
                        </a>
                    </div>
                </div>

                {/* Quick Search */}
                <div className="mt-5 relative">
                    <Search className="w-4 h-4 text-[#839788] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Søg i Grønspættebogen (fx Skema 1, bælte, HAT, epikrise, PANSS-6, bosteder, Anywhere)..."
                        className="w-full pl-10 pr-9 py-2.5 bg-[#FAF9F6] border border-[#E8E4D9] rounded-xl text-sm text-[#3A4A40] placeholder:text-[#839788]/75 focus:outline-none focus:ring-2 focus:ring-[#839788] focus:bg-white transition-colors"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#839788] hover:text-[#3A4A40] cursor-pointer"
                            title="Ryd søgning"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Search Results or Theme Grid */}
            {searchQuery.trim() ? (
                <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#839788] px-1">
                        Søgeresultater ({searchResults.length})
                    </div>
                    {searchResults.length === 0 ? (
                        <div className="p-8 bg-white rounded-2xl border border-[#E8E4D9] text-center text-sm text-[#839788]">
                            Ingen afsnit i Grønspættebogen matcher &ldquo;{searchQuery}&rdquo;.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {searchResults.map(({ theme, subSection }) => (
                                <button
                                    key={`${theme.id}-${subSection.id}`}
                                    onClick={() => onSelectView(theme.navId, subSection.id)}
                                    className="text-left p-4 bg-white rounded-2xl border border-[#E8E4D9] hover:border-[#839788] hover:shadow-sm transition-all cursor-pointer group flex items-start justify-between gap-3"
                                >
                                    <div>
                                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#839788]">
                                            {theme.shortTitle} · {subSection.pages}
                                        </div>
                                        <div className="font-bold text-sm text-[#3A4A40] group-hover:underline mt-0.5">
                                            {subSection.title}
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-[#839788] shrink-0 mt-1" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GROENSPAETTEBOG_THEMES.map((theme) => (
                        <div
                            key={theme.id}
                            className="bg-white rounded-2xl border border-[#E8E4D9] p-5 shadow-2xs hover:shadow-sm hover:border-[#839788]/60 transition-all flex flex-col justify-between gap-4"
                        >
                            <div>
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <button
                                        onClick={() => onSelectView(theme.navId)}
                                        className="flex items-center gap-2.5 text-left group cursor-pointer"
                                    >
                                        <div className="p-2 rounded-xl bg-[#F2F6F3] text-[#3A4A40] group-hover:bg-[#E2E8DF] transition-colors">
                                            {getThemeIcon(theme.icon, 'w-5 h-5')}
                                        </div>
                                        <h3 className="font-bold text-base text-[#3A4A40] group-hover:underline">
                                            {theme.title}
                                        </h3>
                                    </button>
                                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E8E4D9] text-[#839788] shrink-0">
                                        {theme.pages}
                                    </span>
                                </div>
                                <p className="text-xs md:text-sm text-[#5C6B61] leading-relaxed mb-3">
                                    {theme.summary}
                                </p>

                                {/* Direct subsection chips */}
                                <div className="flex flex-wrap gap-1.5">
                                    {theme.subSections.map(sub => (
                                        <button
                                            key={sub.id}
                                            onClick={() => onSelectView(theme.navId, sub.id)}
                                            className="px-2.5 py-1 rounded-lg bg-[#FAF9F6] border border-[#E8E4D9] hover:bg-[#E2E8DF] hover:border-[#839788]/40 text-[11px] font-medium text-[#3A4A40] transition-colors cursor-pointer text-left"
                                        >
                                            {sub.title}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2 border-t border-[#E8E4D9]/60 flex items-center justify-between">
                                <button
                                    onClick={() => onSelectView(theme.navId)}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-[#3A4A40] hover:text-[#6A7A6E] cursor-pointer"
                                >
                                    <span>Åbn sektion</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <a
                                    href={`${pdfUrl}#page=${theme.startPage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-medium text-[#839788] hover:text-[#3A4A40]"
                                    title={`Åbn original PDF på side ${theme.startPage}`}
                                >
                                    <span>PDF {theme.pages}</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
