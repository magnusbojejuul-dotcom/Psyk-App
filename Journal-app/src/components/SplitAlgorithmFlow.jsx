import React, { useState } from 'react';
import { Info } from './Icons';
import { renderWithDrugLinks } from '../utils/linkifyDrugs';

export function SplitAlgorithmFlow({ data, onNavigate }) {
    const [hoveredNode, setHoveredNode] = useState(null);

    // Render a single node block
    const renderNode = (node, pathId) => {
        const nodeId = `${pathId}-${node.id || node.title}`;
        const isHovered = hoveredNode === nodeId;

        return (
            <div
                key={nodeId}
                className="group relative flex flex-col items-center gap-4 w-full"
                onMouseEnter={() => setHoveredNode(nodeId)}
                onMouseLeave={() => setHoveredNode(null)}
            >
                {/* Connecting Line from Top (unless first node) */}
                <div className="w-0.5 h-6 bg-gradient-to-b from-[#839788] to-[#839788]/50 z-0 hidden md:block"></div>

                {/* Content Card */}
                <div className="w-full bg-white/80 backdrop-blur-sm border border-[#E8E4D9] rounded-2xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#839788]/50 transition-all duration-300 relative overflow-hidden isolate">
                    {/* Inner glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F2F6F3]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

                    <h3 className="text-lg font-bold text-[#3A4A40] mb-2 text-center whitespace-pre-line">{renderWithDrugLinks(node.title, onNavigate)}</h3>
                    {node.summary && <p className="text-[#5C6B61] text-sm leading-relaxed mb-3 text-center whitespace-pre-line">{renderWithDrugLinks(node.summary, onNavigate)}</p>}

                    {/* Detailed Info Indicator */}
                    {node.details && (
                        <div className="flex justify-center mt-3">
                            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#5C6B61] bg-gradient-to-r from-[#F2F6F3] to-white border border-[#E8E4D9] px-3 py-1.5 rounded-full hover:bg-gradient-to-r hover:from-[#839788] hover:to-[#6A7A6E] hover:text-white hover:border-transparent hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-help">
                                <Info className="w-3.5 h-3.5" /> KLINISK BAGGRUND
                            </div>
                        </div>
                    )}

                    {/* Expandable Details on Hover */}
                    {node.details && (
                        <div className={`mt-4 grid transition-all duration-500 ease-in-out ${isHovered ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="pt-4 border-t border-[#E8E4D9]/60 mt-1">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#839788] mb-2">Uddybende:</h4>
                                    <div className="bg-[#FAF9F6] p-3.5 rounded-xl border border-[#E8E4D9]/50 text-xs text-[#4A5A50] whitespace-pre-line leading-relaxed shadow-inner">
                                        {renderWithDrugLinks(node.details, onNavigate)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render a branch (a vertical column of nodes)
    const renderTrack = (track, trackIndex) => {
        return (
            <div key={`track-${trackIndex}`} className="flex flex-col items-center w-full md:w-[calc(50%-1rem)] xl:w-auto xl:flex-1 px-2 relative">
                {/* Header for Track if available */}
                {track.title && (
                    <div className="w-full py-3 mb-2 bg-[#F2F6F3] border border-[#E8E4D9] rounded-xl text-center shadow-sm relative z-10">
                        <span className="text-sm font-bold text-[#3A4A40]">{track.title}</span>
                    </div>
                )}

                <div className="flex flex-col items-center w-full gap-2 relative z-10">
                    {track.nodes.map((node, i) => renderNode(node, `t${trackIndex}-n${i}`))}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full mx-auto py-6 overflow-x-auto pb-12">
            <div className="flex flex-col items-center min-w-max md:min-w-0 w-full px-4">

                {/* Root Common Nodes (Pre-Split) */}
                {data.rootNodes && data.rootNodes.length > 0 && (
                    <div className="w-full max-w-2xl flex flex-col items-center mb-6 relative z-10">
                        {data.rootNodes.map((node, i) => renderNode(node, `root-n${i}`))}
                    </div>
                )}

                {/* The Split Section */}
                {data.tracks && data.tracks.length > 0 && (
                    <div className="relative w-full flex flex-col items-center">

                        {/* Horizontal Split Line Divider (Desktop) */}
                        {data.rootNodes && data.rootNodes.length > 0 && (
                            <div className="w-full max-w-3xl hidden xl:flex justify-center relative h-8 -mt-2 z-0">
                                <div className="w-0.5 h-4 bg-gradient-to-b from-[#839788]/50 to-[#839788] absolute top-0"></div>
                                {/* Horizontal distribution line based on number of tracks */}
                                <div className="h-0.5 bg-[#839788] absolute bottom-4"
                                    style={{
                                        width: `${100 * (data.tracks.length - 1) / data.tracks.length}%`,
                                        left: `${50 / data.tracks.length}%`
                                    }}>
                                </div>
                                {/* Vertical drop downs for each track */}
                                {data.tracks.map((_, i) => (
                                    <div key={`drop-${i}`} className="w-0.5 h-4 bg-gradient-to-b from-[#839788] to-[#839788]/50 absolute bottom-0"
                                        style={{ left: `${(100 / data.tracks.length) * (i + 0.5)}%` }}>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row md:flex-wrap xl:flex-nowrap w-full max-w-6xl md:justify-center gap-6 md:gap-4 lg:gap-6 relative z-10 mt-2">
                            {/* Render Each Track Column */}
                            {data.tracks.map((track, i) => renderTrack(track, i))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default SplitAlgorithmFlow;
