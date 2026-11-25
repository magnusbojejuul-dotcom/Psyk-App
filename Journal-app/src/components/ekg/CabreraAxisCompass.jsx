import React, { useId, useState } from 'react';
import { MODEL_LEADS, meanQrsAngle, waveformPath } from '../../data/ekgSimulation';

const CX = 170;
const CY = 170;
const R_IN = 98;
const R_OUT = 118;
const R_BADGE = 142;

const rad = deg => deg * Math.PI / 180;
const polar = (cx, cy, r, deg) => [cx + Math.cos(rad(deg)) * r, cy + Math.sin(rad(deg)) * r];

function sectorPath(cx, cy, rIn, rOut, startDeg, endDeg) {
    const [x1, y1] = polar(cx, cy, rOut, startDeg);
    const [x2, y2] = polar(cx, cy, rOut, endDeg);
    const [x3, y3] = polar(cx, cy, rIn, endDeg);
    const [x4, y4] = polar(cx, cy, rIn, startDeg);
    const span = ((endDeg - startDeg) % 360 + 360) % 360;
    const largeArc = span > 180 ? 1 : 0;
    return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${rOut} ${rOut} 0 ${largeArc} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)} A ${rIn} ${rIn} 0 ${largeArc} 0 ${x4.toFixed(1)} ${y4.toFixed(1)} Z`;
}

const COMPASS_PRESETS = [
    {
        id: 'normal',
        label: 'Normal',
        angleLabel: '+50°',
        offsetDeg: 0,
        color: '#2f7a62',
        badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        summary: 'Både afledning I og II er overvejende positive — aksen ligger i det fysiologiske grønne felt (−30° til +90°).'
    },
    {
        id: 'lad',
        label: 'Venstredrejet (LAD)',
        angleLabel: '−50°',
        offsetDeg: -100,
        color: '#c87a19',
        badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
        summary: 'Afledning I er positiv, mens afledning II og aVF er overvejende negative (< −30°). Ses fx ved LAFB eller svær LVH.'
    },
    {
        id: 'rad',
        label: 'Højredrejet (RAD)',
        angleLabel: '+110°',
        offsetDeg: 60,
        color: '#d45b2c',
        badgeBg: 'bg-orange-100 text-orange-900 border-orange-300',
        summary: 'Afledning I er negativ, mens afledning III og aVF er kraftigt positive (> +90°). Ses fx ved akut lungeemboli eller RVH.'
    },
    {
        id: 'extreme',
        label: 'Ekstrem akse',
        angleLabel: '−135°',
        offsetDeg: 175,
        color: '#be3c48',
        badgeBg: 'bg-rose-100 text-rose-900 border-rose-300',
        summary: 'Både afledning I og II/aVF er negative (nordvest-aksen). Ses fx ved ventrikulær takykardi (VT) eller svær RVH.'
    }
];

const SECTORS = [
    { id: 'normal', start: -30, end: 90, color: '#2f7a62', fill: 'rgba(47, 122, 98, 0.16)' },
    { id: 'lad', start: -90, end: -30, color: '#c87a19', fill: 'rgba(200, 122, 25, 0.18)' },
    { id: 'rad', start: 90, end: 180, color: '#d45b2c', fill: 'rgba(212, 91, 44, 0.16)' },
    { id: 'extreme', start: 180, end: 270, color: '#be3c48', fill: 'rgba(190, 60, 72, 0.13)' }
];

const LIMB_LEADS = ['aVL', 'I', 'II', 'aVF', 'III', 'aVR'];
const PREVIEW_LEADS = ['I', 'II', 'aVF', 'III'];

export default function CabreraAxisCompass() {
    const id = useId().replace(/:/g, '');
    const [selectedId, setSelectedId] = useState('normal');
    const preset = COMPASS_PRESETS.find(p => p.id === selectedId) || COMPASS_PRESETS[0];
    const axisDeg = meanQrsAngle(preset.offsetDeg);
    const [axX, axY] = polar(CX, CY, 92, axisDeg);

    return (
        <div className="p-4 bg-[#F4F7F3] rounded-2xl border border-[#D8E2D7] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                    <strong className="block text-xs font-bold text-[#2C3F34]">
                        Interaktiv Cabrera-Cirkel &amp; 2-Afledningsmetoden
                    </strong>
                    <span className="text-[11px] text-[#667B6E]">
                        Klik på en aksetype for at se, hvordan hjertevektoren ændrer QRS i I, II, aVF og III
                    </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {COMPASS_PRESETS.map(item => {
                        const active = item.id === preset.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedId(item.id)}
                                aria-pressed={active}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                                    active
                                        ? `${item.badgeBg} shadow-xs`
                                        : 'bg-white text-[#4A6053] border-[#D5DFD4] hover:border-[#839788]'
                                }`}
                            >
                                {item.label} ({item.angleLabel})
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-5">
                <div className="w-64 h-64 sm:w-72 sm:h-72 shrink-0">
                    <svg viewBox="0 0 340 340" className="w-full h-full" role="img" aria-label={`Cabrera kompas: ${preset.label}`}>
                        <defs>
                            <marker id={`${id}-arrow`} viewBox="0 0 10 10" markerWidth="11" markerHeight="11" refX="8" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                                <path d="M1,1 L9,5 L1,9 Z" fill={preset.color} />
                            </marker>
                        </defs>

                        <circle cx={CX} cy={CY} r={R_OUT} fill="#fffef9" stroke="#d5dfd3" strokeWidth="1.5" />

                        {SECTORS.map(sec => (
                            <path
                                key={sec.id}
                                d={sectorPath(CX, CY, R_IN, R_OUT, sec.start, sec.end)}
                                fill={sec.fill}
                                stroke={sec.color}
                                strokeWidth={sec.id === preset.id ? 1.8 : 0.7}
                                strokeOpacity={sec.id === preset.id ? 0.9 : 0.35}
                            />
                        ))}

                        {/* Radial dashed lines */}
                        {LIMB_LEADS.map(name => {
                            const angle = MODEL_LEADS[name].angle;
                            const [lx, ly] = polar(CX, CY, R_IN, angle);
                            const [ox, oy] = polar(CX, CY, R_IN, angle + 180);
                            return (
                                <line key={name} x1={ox} y1={oy} x2={lx} y2={ly} stroke="#cdd8cc" strokeWidth="1" strokeDasharray="2 4" />
                            );
                        })}

                        {/* -aVR reference (+30 deg) */}
                        {(() => {
                            const [tx, ty] = polar(CX, CY, R_OUT + 10, 30);
                            return <text x={tx + 8} y={ty + 3} fontSize="8" fontWeight="600" fill="#7a8c7e" textAnchor="start">−aVR</text>;
                        })()}

                        {/* Minimal anatomical heart silhouette in center */}
                        <g transform={`translate(${CX} ${CY}) scale(0.42)`} opacity="0.48">
                            <path d="M -52 -58 C -72 -48 -72 -14 -50 2 C -62 32 -36 68 8 82 C 26 88 40 82 46 74 C 70 50 74 12 46 -12 C 62 -30 56 -56 32 -66 C 10 -74 -14 -64 -26 -50 C -34 -58 -44 -62 -52 -58 Z" fill="#d9b2a8" stroke="#9e6d63" strokeWidth="3" />
                        </g>

                        {/* Rotating electric axis arrow */}
                        <line x1={CX} y1={CY} x2={axX} y2={axY} stroke="#fffef9" strokeWidth="7" strokeLinecap="round" />
                        <line x1={CX} y1={CY} x2={axX} y2={axY} stroke={preset.color} strokeWidth="4" markerEnd={`url(#${id}-arrow)`} />
                        <circle cx={CX} cy={CY} r="4.5" fill={preset.color} stroke="#fffef9" strokeWidth="1.5" />

                        {/* Limb lead labels */}
                        {LIMB_LEADS.map(name => {
                            const angle = MODEL_LEADS[name].angle;
                            const [bx, by] = polar(CX, CY, R_BADGE, angle);
                            return (
                                <g key={name}>
                                    <rect x={bx - 21} y={by - 12} width="42" height="24" rx="8" fill="#ffffff" stroke="#cdd8cc" strokeWidth="1" />
                                    <text x={bx} y={by - 0.5} textAnchor="middle" fontSize="9.5" fontWeight="750" fill="#2C3F34">{name}</text>
                                    <text x={bx} y={by + 8.5} textAnchor="middle" fontSize="7.5" fill="#6F8274">{angle > 0 ? `+${angle}°` : `${angle}°`}</text>
                                </g>
                            );
                        })}
                    </svg>
                </div>

                <div className="flex-1 w-full space-y-2.5">
                    <div className="p-2.5 rounded-xl bg-white border border-[#D9E1DA] text-[11px] text-[#2C3F34]">
                        <strong className="font-bold">{preset.label} ({Math.round(axisDeg) > 0 ? `+${Math.round(axisDeg)}°` : Math.round(axisDeg) < 0 ? `−${Math.abs(Math.round(axisDeg))}°` : '0°'}): </strong>
                        <span>{preset.summary}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {PREVIEW_LEADS.map(leadName => {
                            const path = waveformPath(leadName, 110, 32, 20, preset.offsetDeg);
                            return (
                                <div key={leadName} className="p-2 rounded-xl bg-white border border-[#D9E1DA]">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-[#2C3F34] mb-1">
                                        <span>Afledn. {leadName}</span>
                                        <span className="text-[#788B7D]">{MODEL_LEADS[leadName].angle > 0 ? `+${MODEL_LEADS[leadName].angle}°` : `${MODEL_LEADS[leadName].angle}°`}</span>
                                    </div>
                                    <svg viewBox="0 0 110 60" className="w-full h-12 bg-[#FCFDF9] rounded border border-[#EEF2EC]">
                                        <line x1="0" y1="32" x2="110" y2="32" stroke="#D7E0D6" strokeWidth="0.8" strokeDasharray="2 2" />
                                        <path d={path} fill="none" stroke={preset.color} strokeWidth="2" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap gap-2 text-[10px] text-[#5B7062]">
                        <span className="inline-flex items-center gap-1"><i className="w-2.5 h-2.5 rounded-full bg-[#2f7a62]" /> Normal (−30° til +90°)</span>
                        <span className="inline-flex items-center gap-1"><i className="w-2.5 h-2.5 rounded-full bg-[#c87a19]" /> LAD (−90° til −30°)</span>
                        <span className="inline-flex items-center gap-1"><i className="w-2.5 h-2.5 rounded-full bg-[#d45b2c]" /> RAD (+90° til +180°)</span>
                        <span className="inline-flex items-center gap-1"><i className="w-2.5 h-2.5 rounded-full bg-[#be3c48]" /> Ekstrem (&lt; −90°)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
