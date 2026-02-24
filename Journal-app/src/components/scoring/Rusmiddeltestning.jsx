import React from 'react';
import { ExternalLink, Activity, Info, CheckCircle2 } from '../Icons';

function Rusmiddeltestning() {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 pb-32 animate-fade-in-up">

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2E8DF]/30 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2F6F3] text-[#839788] text-sm font-semibold mb-4">
                            <Activity className="w-4 h-4" />
                            Misbrug & Afhængighed
                        </div>
                        <h1 className="text-3xl font-bold text-[#3A4A40] mb-3">Rusmiddeltestning</h1>
                        <p className="text-[#839788] text-base max-w-xl leading-relaxed">
                            Oversigt over påvisningstider for lægemidler og rusmidler i urin. Denne oversigt tjener som lynopslag til klinisk brug ved mistanke om misbrug.
                        </p>
                    </div>

                    <a
                        href="https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/psykiatri/undersoegelser/rusmiddeltestning/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E8DF] shadow-sm text-[#839788] hover:text-[#3A4A40] hover:border-[#839788] transition-all group shrink-0"
                    >
                        <span className="text-sm font-medium">Lægehåndbogen</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Sporingstider Tabel */}
            <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 shadow-sm border border-white">
                <h2 className="text-xl font-bold text-[#3A4A40] mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#839788]" />
                    Vejledende Påvisningstider i Urin
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#E2E8DF]">
                                <th className="py-3 px-4 text-[#839788] font-semibold text-sm">Stofgruppe</th>
                                <th className="py-3 px-4 text-[#839788] font-semibold text-sm">Enkeltindtag / Korttidsbrug</th>
                                <th className="py-3 px-4 text-[#839788] font-semibold text-sm">Længerevarende brug</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#3A4A40] text-sm divide-y divide-[#E2E8DF]/50">

                            {/* Cannabis/Hash */}
                            <tr className="hover:bg-[#F2F6F3]/50 transition-colors">
                                <td className="py-4 px-4 font-medium">Cannabis (Hash / THC)</td>
                                <td className="py-4 px-4">2-4 dage</td>
                                <td className="py-4 px-4">Op til længe (flere uger, &gt;30 dage) e. misbrug</td>
                            </tr>

                            {/* Amfetamin */}
                            <tr className="hover:bg-[#F2F6F3]/50 transition-colors">
                                <td className="py-4 px-4 font-medium">Amfetamin & Metamfetamin</td>
                                <td className="py-4 px-4">2-4 dage</td>
                                <td className="py-4 px-4">Ofte uændret (evt lille forlængelse)</td>
                            </tr>

                            {/* Kokain */}
                            <tr className="hover:bg-[#F2F6F3]/50 transition-colors">
                                <td className="py-4 px-4 font-medium">Kokain</td>
                                <td className="py-4 px-4">Op til 1-2 døgn</td>
                                <td className="py-4 px-4">Ca. 2-3 døgn</td>
                            </tr>

                            {/* Opioider (Heroin/Morfin) */}
                            <tr className="hover:bg-[#F2F6F3]/50 transition-colors">
                                <td className="py-4 px-4 font-medium">Heroin, Morfin, Kodein</td>
                                <td className="py-4 px-4">Ca. 2-4 dage</td>
                                <td className="py-4 px-4">Uændret til let forlængelse</td>
                            </tr>

                            {/* Metadon */}
                            <tr className="hover:bg-[#F2F6F3]/50 transition-colors">
                                <td className="py-4 px-4 font-medium">Metadon</td>
                                <td className="py-4 px-4">Op til 7-10 døgn</td>
                                <td className="py-4 px-4">Forlænget</td>
                            </tr>

                            {/* Buprenorfin */}
                            <tr className="hover:bg-[#F2F6F3]/50 transition-colors">
                                <td className="py-4 px-4 font-medium">Buprenorfin</td>
                                <td className="py-4 px-4">Op til 8 døgn</td>
                                <td className="py-4 px-4">Måske svagt forlænget</td>
                            </tr>

                            {/* Benzodiazepiner */}
                            <tr className="hover:bg-[#F2F6F3]/50 transition-colors">
                                <td className="py-4 px-4 font-medium">Benzodiazepiner (Diazepam)</td>
                                <td className="py-4 px-4">Cirka 1-3 uger</td>
                                <td className="py-4 px-4">Op til flere uger (op til 4-6 uger)</td>
                            </tr>

                            {/* Ritalin */}
                            <tr className="hover:bg-[#F2F6F3]/50 transition-colors">
                                <td className="py-4 px-4 font-medium">Methylphenidat (Ritalin®)</td>
                                <td className="py-4 px-4">Op til ca. 2 døgn</td>
                                <td className="py-4 px-4">Normalt max 2-3 døgn</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* General Info */}
            <div className="bg-[#F2F6F3]/50 rounded-2xl p-6 border border-[#E2E8DF] flex gap-4 items-start">
                <Info className="w-6 h-6 text-[#839788] shrink-0 mt-0.5" />
                <div className="text-sm text-[#5C6D63] space-y-2">
                    <p><strong>Vigtigt ved Urinscreening:</strong></p>
                    <ul className="list-disc pl-4 space-y-1">
                        <li>Falsk positive resultater kan udelukkes ved specifik verifikationsanalyse.</li>
                        <li>Fortyndet urin (ved stærkt vandindtag) kan medføre falsk negativ prøve. Derfor bedømmes urinens kreatinin ofte for at fastslå pålidelighed.</li>
                        <li>Påvisningstider er vejledende og varierer efter individets metabolisme samt urinens pH.</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default Rusmiddeltestning;
