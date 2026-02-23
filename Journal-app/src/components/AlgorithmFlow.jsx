import React, { useState } from 'react';
import { ChevronRight, Info } from './Icons';

export function AlgorithmFlow({ steps }) {
    const [hoveredStep, setHoveredStep] = useState(null);

    return (
        <div className="relative max-w-3xl mx-auto py-8">
            {/* Main vertical line */}
            <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-[#839788] via-[#839788]/50 to-transparent z-0 hidden md:block"></div>

            <div className="space-y-6 relative z-10">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="group relative flex flex-col md:flex-row items-start gap-4 md:gap-6"
                        onMouseEnter={() => setHoveredStep(index)}
                        onMouseLeave={() => setHoveredStep(null)}
                    >
                        {/* Number Indicator */}
                        <div className="shrink-0 w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#E8E4D9] flex flex-col items-center justify-center text-[#839788] font-bold group-hover:bg-[#839788] group-hover:text-white transition-all duration-300 group-hover:shadow-md z-10 relative">
                            <span className="text-xs uppercase tracking-widest opacity-70">Trin</span>
                            <span className="text-xl">{index + 1}</span>
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 bg-white/80 backdrop-blur-sm border border-[#E8E4D9] rounded-2xl p-6 shadow-sm group-hover:shadow-md group-hover:border-[#D9E1DA] transition-all duration-300 relative overflow-hidden isolate">
                            {/* Inner glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#F2F6F3]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                            <h3 className="text-xl font-bold text-[#3A4A40] mb-2">{step.title}</h3>
                            <p className="text-[#5C6B61] leading-relaxed mb-4">{step.summary}</p>

                            {/* Detailed Info Button (Mobile) or Hover Indicator (Desktop) */}
                            {step.details && (
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#839788] bg-[#F2F6F3] px-3 py-1.5 rounded-lg group-hover:bg-[#839788] group-hover:text-white transition-colors">
                                    <Info className="w-4 h-4" /> Hold musen over for originaltekst
                                </div>
                            )}

                            {/* Expandable Details on Hover */}
                            <div className={`mt-4 grid transition-all duration-500 ease-in-out ${hoveredStep === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="pt-4 border-t border-[#E8E4D9]/60 mt-2">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#839788] mb-3">Uddrag fra originalt dokument:</h4>
                                        <div className="bg-[#FAF9F6] p-4 rounded-xl border border-[#E8E4D9]/50 text-sm text-[#4A5A50] whitespace-pre-line leading-relaxed shadow-inner">
                                            {step.details}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlgorithmFlow;
