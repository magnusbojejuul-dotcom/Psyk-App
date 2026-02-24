export const ALKOHOL_GUIDELINE = {
    title: 'Samtidig Alkoholafhængighed og Psykisk Lidelse',
    subtitle: 'National Klinisk Retningslinje (2019)',
    pdfs: [
        { title: 'NKR Alkoholafhængighed og Psykisk Lidelse', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-alkoholafhaengighed.pdf` }
    ],
    intro: 'NKR omhandler udredning og behandling af samtidig alkoholafhængighed og psykisk lidelse (fx personlighedsforstyrrelser, affektive lidelser, angstlidelser, psykotiske lidelser og ADHD).',
    algorithm: [
        {
            title: 'Identifikation og Udredning',
            summary: 'Systematisk identifikation af både psykisk lidelse og alkoholafhængighed.',
            details: `• Det er god praksis systematisk at identificere psykisk lidelse i forbindelse med udredning og behandling af alkoholafhængighed, og vice-versa.\n• Der bør anvendes validerede screeningsværktøjer (fx AUDIT).\n• En person bør ikke afvises fra behandling af den psykiske lidelse, fordi vedkommende også har en alkoholafhængighed.`
        },
        {
            title: 'Behandlingstilgang',
            summary: 'Integreret eller koordineret indsats anbefales.',
            details: `• Der bør tilbydes en integreret/koordineret behandling frem for et sekventielt forløb.\n• Ambulant behandling og døgnbehandling bør kombineres efter behov.\n• Familie-/netværksorienteret behandling, Dialektisk Adfærdsterapi (DAT) for Borderline, og udgående/opsøgende indsatser bør særligt overvejes.`
        },
        {
            title: 'Farmakologisk Behandling',
            summary: 'Acamprosat og Naltrexon som supplement til samtalebehandling.',
            details: `• Overvej at tilbyde acamprosat eller naltrexon i tillæg til samtalebehandling til personer med samtidig alkoholafhængighed og affektiv lidelse, angstlidelse eller psykotisk lidelse.\n• Acamprosat: Primært hjælp til fuldstændig afholdenhed. Forsigtighed ved nedsat nyrefunktion.\n• Naltrexon: Hjælp til personer, som ikke har absolut afholdenhed som målsætning (reduktion). Forsigtighed ved svær leversygdom.\n• Positiv virkning forventes inden for få uger. Ellers bør den seponeres.\n• (For Disulfiram / Antabus henvises generelt til Sundhedsstyrelsens NKR for Alkohol (2015)).`
        },
        {
            title: 'Efterbehandling / Opfølgning',
            summary: 'Længerevarende opfølgning for at forebygge tilbagefald.',
            details: `• Efterbehandling/opfølgning bør tilbydes (fx telefonopkald eller ambulante samtaler).\n• Opfølgningen skal ofte strække sig længere end ved ren alkoholafhængighed pga. øget tilbagefaldsrisiko ved komorbid psykisk lidelse.`
        }
    ]
};
