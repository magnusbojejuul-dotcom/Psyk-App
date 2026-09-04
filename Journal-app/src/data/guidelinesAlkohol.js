export const ALKOHOL_GUIDELINE = {
    title: 'Samtidig Alkoholafhængighed og Psykisk Lidelse',
    subtitle: 'National Klinisk Retningslinje (2019)',
    pdfs: [
        { title: 'NKR Alkoholafhængighed og Psykisk Lidelse', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-alkoholafhaengighed.pdf` }
    ],
    intro: 'NKR omhandler udredning og behandling af samtidig alkoholafhængighed og psykisk lidelse (fx personlighedsforstyrrelser, affektive lidelser, angstlidelser, psykotiske lidelser og ADHD).',
    algorithmTitle: 'Klinisk Vejledning',
    isStepBased: false,
    algorithm: [
        {
            title: 'Identifikation og Udredning',
            summary: 'Systematisk screening for psykisk lidelse og alkoholafhængighed (fx AUDIT). Ingen må afvises pga. komorbiditet.',
            details: `• Det er god praksis systematisk at identificere psykisk lidelse i forbindelse med udredning og behandling af alkoholafhængighed og vice-versa.\n• Der bør anvendes validerede screeningsværktøjer (fx AUDIT).\n• Screeningen bør foretages så tidligt, som eventuelle abstinenssymptomer tillader (når de er ovre).\n• En person bør IKKE afvises fra behandling af den psykiske lidelse, fordi vedkommende også har en alkoholafhængighed, eller omvendt.`
        },
        {
            title: 'Behandlingstilgang',
            summary: 'Integreret og koordineret indsats frem for sekventielle forløb. Sammenhæng mellem ambulant og døgnbehandling.',
            details: `• Der bør tilbydes en integreret/koordineret behandling frem for et sekventielt forløb. Praktiske hensyn kan afgøre, om den er integreret eller blot koordineret.\n• For personer med påvirket funktionsevne er integreret behandling formentligt bedst.\n• Ambulant behandling og døgnbehandling bør kombineres efter behov og ses som et sammenhængende flow.\n• Døgnbehandling bør ikke betragtes som en akut foranstaltning alene.\n• Tilbud som Dialektisk Adfærdsterapi (DAT) / dobbeltfokuseret skematerapi anbefales især til komorbid personlighedsforstyrrelse.\n• Opsøgende / udgående indsatser i eget hjem eller nærmiljø anbefales for at støtte dem, der har svært ved at møde stabilt op.`
        },
        {
            title: 'Farmakologisk Behandling',
            summary: 'Acamprosat (ved ønske om afholdenhed/craving) eller Naltrexon (ved ønske om reduktion) som supplement.',
            details: `• Overvej at tilbyde Acamprosat eller Naltrexon i tillæg til samtalebehandling til personer med samtidig alkoholafhængighed og affektiv lidelse, angstlidelse eller psykotisk lidelse.\n• Acamprosat: Primært overvejet som støtte til dem der ønsker fuldstændig afholdenhed. Særligt gavnligt ved 'craving' eller angst. Forsigtighed ved nedsat nyrefunktion.\n• Naltrexon: Kan være relevant til dem, der ikke har afholdenhed som målsætning (men reduktion i stedet), især ved tidlig debut og familiær disposition. Forsigtighed ved svær leversygdom.\n• Forvent øget risiko for polyfarmaci, vær opmærksom på interaktionseffekter.\n• Positiv virkning forventes typisk efter et par uger. Opleves ingen effekt inden for denne periode, bør medicinen seponeres straks.\n• (For Disulfiram / Antabus henvises til NKR for Alkohol (2015)).`
        },
        {
            title: 'Efterbehandling / Opfølgning',
            summary: 'Længerevarende opfølgning og efterbehandling pga. forhøjet recidivrisiko ved samtidig psykisk lidelse.',
            details: `• Efterbehandling/opfølgning bør tilbydes (fx telefonopkald eller individuelle/gruppebaserede ambulante samtaler ved fremmøde).\n• Opfølgningen skal ofte strække sig længere end ved ren alkoholafhængighed pga. øget tilbagefaldsrisiko ved komorbid psykisk lidelse.\n• Skal forhandles og aftales med modtageren ved afslutningen af den aktive behandling.`
        }
    ]
};
