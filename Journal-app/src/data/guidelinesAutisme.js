export const AUTISME_GUIDELINE = {
    title: 'Autismespektrumforstyrrelser (Børn og Unge)',
    subtitle: 'National Klinisk Retningslinje for behandling af autisme hos børn og unge',
    pdfs: [
        { title: 'NKR Autisme', url: `${import.meta.env.BASE_URL}pdf/nkr-for-behandling-af-autismespektrumforstyrrelser-hos-boern-og-unge.pdf` }
    ],
    intro: 'Vejledninger anbefaler primært helhedsorienterede, pædagogiske og forældremedierede indsatser for børn og unge med autisme. Farmakologisk behandling er yderst restriktivt.',
    algorithm: [
        {
            title: 'Ikke-Farmakologiske (Pædagogisk/Psykologisk)',
            summary: 'Træning af sociale færdigheder og forældremedieret intervention foreslås.',
            details: `• Træning af sociale færdigheder og sprogintervention (især førskolebørn) kan overvejes, dog under observation af barnets belastningsgrad.\n• Forældremedieret intervention (psykoedukation med konkrete redskaber) foreslås stærkt som støtte.\n• Kognitiv Adfærdsterapi (KAT) er STÆRKT anbefalet til autisme med komorbid angst, forudsat det tilpasses autisme-profilen.`
        },
        {
            title: 'Ikke-Anbefalede Indsatser',
            summary: 'Diæter og neurofeedback frarådes generelt.',
            details: `• STÆRK anbefaling IMOD gluten- og kaseinfri diæt (medmindre der foreligger diagnosticeret intolerance/cøliaki).\n• STÆRK anbefaling IMOD neurofeedback.\n• Sanseintegrationsbehandling har en svag anbefaling IMOD og bør kun gøres ved svære sanseforstyrrelser.`
        },
        {
            title: 'Farmakologisk Behandling',
            summary: 'Kun ved specifikke symptomer som søvnbesvær eller svær udadreagerende adfærd.',
            details: `• Melatonin: Overvej ved søvnforstyrrelser (indsovning >30 min) hos børn/unge (2-17 år), hvor søvnhygiejniske tiltag ikke har haft effekt efter min. 4 uger.\n• 2. Generations Antipsykotika (fx Aripiprazol, Risperidon): Svag anbefaling IMOD. Bør udelukkende overvejes ved svær irritabilitet og udadreagerende adfærd/aggression, når alle pædagogiske tiltag har fejlet, underlagt streng kontrolopstart i specialregi.`
        }
    ]
};
