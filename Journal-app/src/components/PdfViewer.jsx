import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ZoomIn, ZoomOut, RotateCcw, Download, ExternalLink, AlertCircle, FileText, Check, Copy } from './Icons';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';

// Configure the worker to use Vite's worker bundle with public fallback
try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker || `${import.meta.env.BASE_URL}pdf.worker.min.js`;
} catch (e) {
    console.warn("Could not set pdf workerSrc:", e);
}

export default function PdfViewer({ url, title, downloadName, extraActions }) {
    // Check if the browser natively supports inline PDF rendering (e.g. desktop Chrome, Edge, Safari, Firefox)
    const hasNativePdf = typeof navigator !== 'undefined' && Boolean(navigator.pdfViewerEnabled);

    // Default to native browser PDF iframe on desktop where supported, and canvas viewer on mobile
    const [useNative, setUseNative] = useState(() => hasNativePdf);

    const containerRef = useRef(null);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [scale, setScale] = useState(1.0);
    const [fitWidthScale, setFitWidthScale] = useState(1.0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [renderedPages, setRenderedPages] = useState({});
    const [pageDimensions, setPageDimensions] = useState({});

    const canvasRefs = useRef({});
    const textLayerRefs = useRef({});
    const renderTasksRef = useRef({});
    const textLayerTasksRef = useRef({});

    // Safe encoded URL for fetching
    const getSafeUrl = (rawUrl) => {
        try {
            return encodeURI(decodeURI(rawUrl));
        } catch {
            return rawUrl;
        }
    };

    const safeUrl = getSafeUrl(url);

    // Load document when in canvas mode
    useEffect(() => {
        if (useNative) return;

        let isCancelled = false;
        setLoading(true);
        setError(null);
        setPdfDoc(null);
        setNumPages(0);
        setRenderedPages({});
        setPageDimensions({});

        // Cancel running renders
        Object.values(renderTasksRef.current).forEach(task => {
            try {
                if (task && task.cancel) task.cancel();
            } catch (e) {
                // ignore
            }
        });
        renderTasksRef.current = {};

        Object.values(textLayerTasksRef.current).forEach(task => {
            try {
                if (task && task.cancel) task.cancel();
            } catch (e) {
                // ignore
            }
        });
        textLayerTasksRef.current = {};

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
    }, [safeUrl, useNative]);

    // Calculate fit-width scale based on container width
    const calculateFitScale = useCallback(async (doc) => {
        if (!doc || !containerRef.current) return;
        try {
            const page = await doc.getPage(1);
            const baseViewport = page.getViewport({ scale: 1.0 });
            const padding = window.innerWidth < 640 ? 24 : 48;
            const containerWidth = Math.max(containerRef.current.clientWidth - padding, 260);
            
            if (baseViewport.width > 0) {
                const optimalScale = Math.min(Math.max(Number((containerWidth / baseViewport.width).toFixed(2)), 0.45), 1.5);
                setFitWidthScale(optimalScale);
                setScale(optimalScale);
            }
        } catch (err) {
            console.error("Error calculating auto scale:", err);
        }
    }, []);

    useEffect(() => {
        if (pdfDoc && !useNative) {
            calculateFitScale(pdfDoc);
        }
    }, [pdfDoc, useNative, calculateFitScale]);

    // Render single page to canvas and textLayer overlay
    const renderPage = useCallback(async (pageNum, doc, currentScale) => {
        let canvas = canvasRefs.current[pageNum];
        if (!canvas) {
            await new Promise(r => setTimeout(r, 60));
            canvas = canvasRefs.current[pageNum];
        }
        if (!canvas || !doc) return;

        if (renderTasksRef.current[pageNum]) {
            try {
                renderTasksRef.current[pageNum].cancel();
            } catch (e) {}
        }
        if (textLayerTasksRef.current[pageNum]) {
            try {
                textLayerTasksRef.current[pageNum].cancel();
            } catch (e) {}
        }

        try {
            const page = await doc.getPage(pageNum);
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            const canvasViewport = page.getViewport({ scale: currentScale * pixelRatio });
            const textViewport = page.getViewport({ scale: currentScale });

            const cssWidth = Math.floor(textViewport.width);
            const cssHeight = Math.floor(textViewport.height);

            setPageDimensions(prev => ({
                ...prev,
                [pageNum]: { width: cssWidth, height: cssHeight }
            }));

            canvas.width = Math.floor(canvasViewport.width);
            canvas.height = Math.floor(canvasViewport.height);
            canvas.style.width = `${cssWidth}px`;
            canvas.style.height = `${cssHeight}px`;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const renderContext = {
                canvasContext: ctx,
                viewport: canvasViewport,
            };

            const renderTask = page.render(renderContext);
            renderTasksRef.current[pageNum] = renderTask;
            await renderTask.promise;
            delete renderTasksRef.current[pageNum];

            // Render TextLayer directly overlaid onto canvas
            const textLayerDiv = textLayerRefs.current[pageNum];
            if (textLayerDiv) {
                textLayerDiv.innerHTML = '';
                textLayerDiv.style.width = `${cssWidth}px`;
                textLayerDiv.style.height = `${cssHeight}px`;
                textLayerDiv.style.setProperty('--scale-factor', textViewport.scale);

                const textContent = await page.getTextContent();
                if (textContent && textContent.items && textContent.items.length > 0) {
                    const textTask = pdfjsLib.renderTextLayer({
                        textContentSource: textContent,
                        container: textLayerDiv,
                        viewport: textViewport,
                    });
                    textLayerTasksRef.current[pageNum] = textTask;
                    await textTask.promise;
                    delete textLayerTasksRef.current[pageNum];
                }
            }

            setRenderedPages(prev => ({ ...prev, [pageNum]: true }));
        } catch (err) {
            if (err?.name !== 'RenderingCancelledException') {
                console.error(`Page ${pageNum} render error:`, err);
            }
        }
    }, []);

    // Render all pages in canvas mode
    useEffect(() => {
        if (useNative || !pdfDoc || numPages === 0) return;

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
                } catch (e) {}
            });
            renderTasksRef.current = {};

            Object.values(textLayerTasksRef.current).forEach(task => {
                try {
                    if (task && task.cancel) task.cancel();
                } catch (e) {}
            });
            textLayerTasksRef.current = {};
        };
    }, [useNative, pdfDoc, numPages, scale, renderPage]);

    const handleZoomIn = () => {
        setScale(prev => Math.min(Number((prev + 0.15).toFixed(2)), 2.5));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(Number((prev - 0.15).toFixed(2)), 0.4));
    };

    const handleResetZoom = () => {
        setScale(fitWidthScale);
    };

    // -------------------------------------------------------------
    // 1. Native Desktop PDF Viewer (Pure iframe, standard Chrome/Edge reader)
    // -------------------------------------------------------------
    if (useNative) {
        return (
            <div className="flex flex-col h-full w-full bg-white rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-sm">
                {/* Header & Controls Toolbar */}
                <div className="bg-white/95 backdrop-blur-sm border-b border-[#E8E4D9] px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3 shrink-0 z-10">
                    <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-bold text-[#3A4A40] uppercase tracking-wider flex items-center gap-1.5 truncate">
                            <FileText className="w-4 h-4 text-[#839788] shrink-0" />
                            <span className="truncate">{title || 'Dokument'}</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        {extraActions}

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

                {/* Direct Native PDF Frame - User can mark text directly in document */}
                <div className="flex-1 w-full h-full min-h-[600px] bg-white">
                    <iframe
                        src={safeUrl}
                        className="w-full h-full border-0 min-h-[600px]"
                        title={title || "PDF Document"}
                    />
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    // 2. Mobile/Responsive Canvas Viewer (with exact text layer overlay)
    // -------------------------------------------------------------
    return (
        <div ref={containerRef} className="flex flex-col h-full w-full bg-[#F4F2EB] rounded-2xl border border-[#E8E4D9] overflow-hidden shadow-sm">
            {/* Scoped CSS to ensure textLayer is 100% transparent and overlaid directly on canvas */}
            <style>{`
                .pdf-page-wrapper {
                    position: relative !important;
                }
                .pdf-page-wrapper .textLayer {
                    position: absolute !important;
                    text-align: initial !important;
                    left: 0 !important;
                    top: 0 !important;
                    right: 0 !important;
                    bottom: 0 !important;
                    overflow: hidden !important;
                    opacity: 1 !important;
                    line-height: 1 !important;
                    -webkit-text-size-adjust: none !important;
                    -moz-text-size-adjust: none !important;
                    text-size-adjust: none !important;
                    forced-color-adjust: none !important;
                    transform-origin: 0 0 !important;
                    z-index: 10 !important;
                    user-select: text !important;
                    -webkit-user-select: text !important;
                }
                .pdf-page-wrapper .textLayer :is(span, br) {
                    color: transparent !important;
                    position: absolute !important;
                    white-space: pre !important;
                    cursor: text !important;
                    transform-origin: 0% 0% !important;
                }
                .pdf-page-wrapper .textLayer span.markedContent {
                    top: 0 !important;
                    height: 0 !important;
                }
                .pdf-page-wrapper .textLayer ::selection {
                    background: rgba(59, 130, 246, 0.35) !important;
                    color: transparent !important;
                }
                .pdf-page-wrapper .textLayer ::-moz-selection {
                    background: rgba(59, 130, 246, 0.35) !important;
                    color: transparent !important;
                }
                .pdf-page-wrapper .textLayer .endOfContent {
                    display: block !important;
                    position: absolute !important;
                    inset: 100% 0 0 !important;
                    z-index: -1 !important;
                    cursor: default !important;
                    user-select: none !important;
                    -webkit-user-select: none !important;
                }
            `}</style>

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
                            const dimensions = pageDimensions[pageNum];
                            return (
                                <div
                                    key={pageNum}
                                    className="pdf-page-wrapper mb-6 shadow-md rounded-xl overflow-hidden bg-white border border-[#E8E4D9] shrink-0 min-h-[250px] select-text"
                                    style={{
                                        width: dimensions?.width ? `${dimensions.width}px` : undefined,
                                        height: dimensions?.height ? `${dimensions.height}px` : undefined,
                                    }}
                                >
                                    <div className="absolute top-2 right-2 bg-slate-900/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full pointer-events-none z-20">
                                        Side {pageNum} af {numPages}
                                    </div>
                                    {!isRendered && (
                                        <div className="p-8 flex items-center justify-center gap-2 text-xs text-[#839788] h-full">
                                            <div className="w-4 h-4 border-2 border-[#839788] border-t-transparent rounded-full animate-spin"></div>
                                            <span>Gengiver side {pageNum}...</span>
                                        </div>
                                    )}
                                    <canvas
                                        ref={el => (canvasRefs.current[pageNum] = el)}
                                        className={`block transition-opacity duration-200 ${isRendered ? 'opacity-100' : 'opacity-0'}`}
                                    />
                                    <div
                                        ref={el => (textLayerRefs.current[pageNum] = el)}
                                        className="textLayer"
                                        style={{
                                            width: dimensions?.width ? `${dimensions.width}px` : undefined,
                                            height: dimensions?.height ? `${dimensions.height}px` : undefined,
                                        }}
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
