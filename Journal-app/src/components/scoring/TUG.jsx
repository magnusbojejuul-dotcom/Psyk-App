import React from 'react';
import { ExternalLink, Activity, Info, CheckCircle2 } from '../Icons';

function TUG() {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-8 pb-32 animate-fade-in-up">

            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E2E8DF]/30 rounded-full blur-[80px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>

                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F2F6F3] text-[#839788] text-sm font-semibold mb-4">
                            <Activity className="w-4 h-4" />
                            Geriatri / Fysioterapi
                        </div>
                        <h1 className="text-3xl font-bold text-[#3A4A40] mb-3">TUG (Timed Up and Go)</h1>
                        <p className="text-[#839788] text-base max-w-xl leading-relaxed">
                            Simpel og hurtig test af basal mobilitet, balance og faldrisiko, primært anvendt til ældre. Testen uretager tiden det tager at rejse sig, gå 3 meter, vende om og sætte sig igen.
                        </p>
                    </div>

                    <a
                        href="https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/undersoegelser-og-proever/skemaer/geriatri/timed-up-and-go-tug/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E2E8DF] shadow-sm text-[#839788] hover:text-[#3A4A40] hover:border-[#839788] transition-all group shrink-0"
                    >
                        <span className="text-sm font-medium">Lægehåndbogen</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>

            {/* Testens Udførelse */}
            <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 shadow-sm border border-white">
                <h2 className="text-xl font-bold text-[#3A4A40] mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-[#839788]" />
                    Testens Udførelse
                </h2>

                <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-xl bg-[#F9FAF9] border border-[#E2E8DF]">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#839788] text-white flex items-center justify-center font-bold">1</div>
                        <div>
                            <h3 className="font-semibold text-[#3A4A40]">Forberedelse</h3>
                            <p className="text-[#5C6D63] text-sm mt-1">
                                Patienten sidder på en standardstol (ca. 46 cm sædehøjde) med armlæn, ryggen mod ryglænet.
                                Sæt en markering på gulvet 3 meter fra stolens forreste ben.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-xl bg-[#F9FAF9] border border-[#E2E8DF]">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#839788] text-white flex items-center justify-center font-bold">2</div>
                        <div>
                            <h3 className="font-semibold text-[#3A4A40]">Instruktion</h3>
                            <p className="text-[#5C6D63] text-sm mt-1">
                                "Når jeg siger TIL, vil jeg have, at du rejser dig op, og går frem til stregen på gulvet i dit almindelige tempo. Vend om ved stregen, gå tilbage og sæt dig ned igen."
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 p-4 rounded-xl bg-[#F9FAF9] border border-[#E2E8DF]">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#839788] text-white flex items-center justify-center font-bold">3</div>
                        <div>
                            <h3 className="font-semibold text-[#3A4A40]">Måling</h3>
                            <p className="text-[#5C6D63] text-sm mt-1">
                                Start stopuret i det øjeblik patientens ryg slipper ryglænet. Stop tiden i det øjeblik patientens bagdel rører sædet igen. (Ganghjælpemiddel må benyttes og skal registreres).
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tolkning af Resultat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-emerald-50/50 rounded-[2rem] p-6 border border-emerald-100 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                        <Activity className="w-32 h-32 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-800 mb-2">≤ 10-12 Sekunder</h3>
                    <p className="text-emerald-700/80 text-sm">
                        Indikerer at personen generelt er uafhængig, har normal mobilitet og ingen markant forhøjet faldrisiko.
                    </p>
                </div>

                <div className="bg-red-50/50 rounded-[2rem] p-6 border border-red-100 relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                        <Activity className="w-32 h-32 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-red-800 mb-2">≥ 14-20 Sekunder</h3>
                    <p className="text-red-700/80 text-sm">
                        Indikerer forringet mobilitet og forhøjet faldrisiko ved hverdagsaktiviteter. Over 20 sekunder indikerer udtalte balanceproblemer.
                    </p>
                </div>
            </div>

            {/* General Info */}
            <div className="bg-[#F2F6F3]/50 rounded-2xl p-6 border border-[#E2E8DF] flex gap-4 items-start">
                <Info className="w-6 h-6 text-[#839788] shrink-0 mt-0.5" />
                <div className="text-sm text-[#5C6D63] space-y-2">
                    <p><strong>Observationer udover tid:</strong></p>
                    <p>
                        Læg mærke til patientens skridtlængde, reaktionsspænding, sving med armene, holdning og brug af hjælpemiddel. Subjektiv usikkerhed (fx at de skal bruge hænder på armlæn for at rejse sig) kan have stærk prognostisk værdi.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default TUG;
