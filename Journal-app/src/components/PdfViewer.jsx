import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ZoomIn, ZoomOut, RotateCcw, Download, ExternalLink, AlertCircle, FileText, Check } from './Icons';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';

// Configure the worker to use Vite's worker bundle with public fallback
try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker || `${import.meta.env.BASE_URL}pdf.worker.min.js`;
} catch (e) {
    console.warn("Could not set pdf workerSrc:", e);
}

export default function PdfViewer({ url, title, downloadName, extraActions }) {
    const containerRef = useRef(null);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [scale, setScale] = useState(1.0);
    const [fitWidthScale, setFitWidthScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [renderedPages, setRenderedPages] = useState({});

    const canvasRefs = useRef({});
    const renderTasksRef = useRef({});

    // Safe encoded URL for fetching
    const getSafeUrl = (rawUrl) => {
        try {
            return encodeURI(decodeURI(rawUrl));
        } catch {
            return rawUrl;
        }
    };

    const safeUrl = getSafeUrl(url);

    // Load document
    useEffect(() => {
        let isCancelled = false;
        setLoading(true);
        setError(null);
        setPdfDoc(null);
        setNumPages(0);
        setRenderedPages({});

        // Cancel running renders
        Object.values(renderTasksRef.current).forEach(task => {
            try {
                if (task && task.cancel) task.cancel();
            } catch (e) {
                // ignore
            }
        });
        renderTasksRef.current = {};

        const loadingTask = pdfjsLib.getDocument({
            url: safeUrl,
            cMapPacked: true,
        });

        loadingTask.promise
            .then(doc => {
                if (!isCancelled) {
                    setPdfDoc(doc);
                    setNumPages(doc.numPages);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (!isCancelled) {
                    console.error("PDF loading error:", err);
                    setError("Dokumentet kunne ikke vises direkte i denne visning. Brug knapperne foroven til at åbne eller downloade PDF-filen.");
                    setLoading(false);
                }
            });

        return () => {
            isCancelled = true;
            try {
                loadingTask.destroy();
            } catch (e) {
                // ignore
            }
        };
    }, [safeUrl]);

    // Calculate fit-width scale based on container width
    const calculateFitScale = useCallback(async (doc) => {
        if (!doc || !containerRef.current) return;
        try {
            const page = await doc.getPage(1);
            const baseViewport = page.getViewport({ scale: 1.0 });
            // Available width inside container minus padding
            const padding = window.innerWidth < 640 ? 28 : 48;
            const containerWidth = Math.max(containerRef.current.clientWidth - padding, 260);
            
            if (baseViewport.width > 0) {
                // Calculate scale to fit page neatly
                const optimalScale = Math.min(Math.max(Number((containerWidth / baseViewport.width).toFixed(2)), 0.45), 1.5);
                setFitWidthScale(optimalScale);
                setScale(optimalScale);
            }
        } catch (err) {
            console.error("Error calculating auto scale:", err);
        }
    }, []);

    useEffect(() => {
        if (pdfDoc) {
            calculateFitScale(pdfDoc);
        }
    }, [pdfDoc, calculateFitScale]);

    // Re-calculate on window resize
    useEffect(() => {
        let timeoutId;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (pdfDoc && containerRef.current) {
                    calculateFitScale(pdfDoc);
                }
            }, 150);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, [pdfDoc, calculateFitScale]);

    // Render single page
    const renderPage = useCallback(async (pageNum, doc, currentScale) => {
        let canvas = canvasRefs.current[pageNum];
        if (!canvas) {
            // Wait briefly if React DOM ref is just mounting
            await new Promise(r => setTimeout(r, 60));
            canvas = canvasRefs.current[pageNum];
        }
        if (!canvas || !doc) return;

        // Cancel previous render task for this page
        if (renderTasksRef.current[pageNum]) {
            try {
                renderTasksRef.current[pageNum].cancel();
            } catch (e) {
                // ignore
            }
        }

        try {
            const page = await doc.getPage(pageNum);
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            const viewport = page.getViewport({ scale: currentScale * pixelRatio });

            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);
            canvas.style.width = `${Math.floor(viewport.width / pixelRatio)}px`;
            canvas.style.height = `${Math.floor(viewport.height / pixelRatio)}px`;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport,
            };

            const renderTask = page.render(renderContext);
            renderTasksRef.current[pageNum] = renderTask;
            await renderTask.promise;
            delete renderTasksRef.current[pageNum];
            setRenderedPages(prev => ({ ...prev, [pageNum]: true }));
        } catch (err) {
            if (err?.name !== 'RenderingCancelledException') {
                console.error(`Page ${pageNum} render error:`, err);
            }
        }
    }, []);

    // Render all pages when scale or pdfDoc changes
    useEffect(() => {
        if (!pdfDoc || numPages === 0) return;

        let isCancelled = false;
        const renderAll = async () => {
            for (let i = 1; i <= numPages; i++) {
                if (isCancelled) break;
                await renderPage(i, pdfDoc, scale);
            }
        };

        renderAll();

        return () => {
            isCancelled = true;
            Object.values(renderTasksRef.current).forEach(task => {
                try {
                    if (task && task.cancel) task.cancel();
                } catch (e) {
                    // ignore
                }
            });
            renderTasksRef.current = {};
        };
    }, [pdfDoc, numPages, scale, renderPage]);

    const handleZoomIn = () => {
        setScale(prev => Math.min(Number((prev + 0.15).toFixed(2)), 2.5));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(Number((prev - 0.15).toFixed(2)), 0.4));
    };

    const handleResetZoom = () => {
        setScale(fitWidthScale);
    };

    return (
        <div ref={containerRef} className="flex flex-col h-full w-full bg-[#F4F2EB] rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-sm">
            {/* Header & Controls Toolbar */}
            <div className="bg-white/95 backdrop-blur-sm border-b border-[#E8E4D9] px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3 shrink-0 z-10">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-bold text-[#3A4A40] uppercase tracking-wider flex items-center gap-1.5 truncate">
                        <FileText className="w-4 h-4 text-[#839788] shrink-0" />
                        <span className="truncate">{title || 'Dokument'}</span>
                    </span>
                    {numPages > 0 && (
                        <span className="text-[11px] bg-[#E2E8DF] text-[#3A4A40] font-semibold px-2 py-0.5 rounded-full shrink-0">
                            {numPages} {numPages === 1 ? 'side' : 'sider'}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    {/* Extra actions (e.g. Kopiér skabelon) passed from parent */}
                    {extraActions}

                    {/* Zoom controls */}
                    <div className="flex items-center bg-[#F9F8F6] border border-[#E8E4D9] rounded-xl p-0.5">
                        <button
                            onClick={handleZoomOut}
                            title="Zoom ud"
                            disabled={loading || !!error}
                            className="p-1.5 hover:bg-white text-[#3A4A40] rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleResetZoom}
                            title="Nulstil / Tilpas til bredde"
                            disabled={loading || !!error}
                            className="px-2 sm:px-2.5 py-1 text-xs font-bold text-[#3A4A40] hover:bg-white rounded-lg transition-colors disabled:opacity-40 cursor-pointer min-w-[48px] sm:min-w-[52px] text-center"
                        >
                            {Math.round(scale * 100)}%
                        </button>
                        <button
                            onClick={handleZoomIn}
                            title="Zoom ind"
                            disabled={loading || !!error}
                            className="p-1.5 hover:bg-white text-[#3A4A40] rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Open in new tab */}
                    <a
                        href={safeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 sm:px-3 py-1.5 bg-white border border-[#E8E4D9] text-[#3A4A40] hover:bg-[#F2F6F3] rounded-xl transition-colors shadow-2xs font-medium text-xs flex items-center gap-1.5 cursor-pointer"
                        title="Åbn PDF i ny browserfane"
                    >
                        <ExternalLink className="w-3.5 h-3.5 text-[#839788]" />
                        <span className="hidden sm:inline">Åbn i ny fane</span>
                    </a>

                    {/* Download button */}
                    <a
                        href={safeUrl}
                        download={downloadName || true}
                        className="px-2.5 sm:px-3 py-1.5 bg-[#839788] text-white hover:bg-[#6A7A6E] rounded-xl transition-colors shadow-2xs font-medium text-xs flex items-center gap-1.5 cursor-pointer"
                        title="Hent original PDF til din enhed"
                    >
                        <Download className="w-3.5 h-3.5" />
                        <span>Hent PDF</span>
                    </a>
                </div>
            </div>

            {/* Document display scroll container */}
            <div className="flex-1 overflow-auto p-3 sm:p-6 flex flex-col items-center">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-24 text-[#839788] gap-3">
                        <div className="w-9 h-9 border-3 border-[#839788] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm font-semibold">Indlæser PDF-dokument...</p>
                    </div>
                )}

                {error && (
                    <div className="p-6 bg-white border border-amber-200 rounded-2xl max-w-md text-center shadow-sm my-10">
                        <AlertCircle className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                        <h4 className="font-bold text-[#3A4A40] text-base mb-1">Visning ikke tilgængelig direkte</h4>
                        <p className="text-xs text-[#839788] mb-4 leading-relaxed">{error}</p>
                        <div className="flex justify-center gap-3">
                            <a
                                href={safeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 bg-[#839788] text-white px-4 py-2 rounded-xl hover:bg-[#6A7A6E] transition-colors font-medium text-xs shadow-sm"
                            >
                                <ExternalLink className="w-3.5 h-3.5" /> Åbn PDF i ny fane
                            </a>
                            <a
                                href={safeUrl}
                                download={downloadName || true}
                                className="flex items-center gap-1.5 bg-white border border-[#E8E4D9] text-[#3A4A40] px-4 py-2 rounded-xl hover:bg-[#F2F6F3] transition-colors font-medium text-xs shadow-sm"
                            >
                                <Download className="w-3.5 h-3.5" /> Hent fil
                            </a>
                        </div>
                    </div>
                )}

                {!loading && !error && numPages > 0 && (
                    <div className="flex flex-col items-center w-full max-w-full">
                        {Array.from({ length: numPages }, (_, index) => {
                            const pageNum = index + 1;
                            const isRendered = renderedPages[pageNum];
                            return (
                                <div
                                    key={pageNum}
                                    className="relative mb-6 shadow-md rounded-xl overflow-hidden bg-white border border-[#E8E4D9] shrink-0 min-h-[250px] flex items-center justify-center"
                                >
                                    <div className="absolute top-2 right-2 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full pointer-events-none z-10">
                                        Side {pageNum} af {numPages}
                                    </div>
                                    {!isRendered && (
                                        <div className="p-8 flex items-center gap-2 text-xs text-[#839788]">
                                            <div className="w-4 h-4 border-2 border-[#839788] border-t-transparent rounded-full animate-spin"></div>
                                            <span>Gengiver side {pageNum}...</span>
                                        </div>
                                    )}
                                    <canvas
                                        ref={el => (canvasRefs.current[pageNum] = el)}
                                        className={`block transition-opacity duration-200 ${isRendered ? 'opacity-100' : 'opacity-0 absolute'}`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
