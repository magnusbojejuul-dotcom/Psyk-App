export const AUTISME_GUIDELINE = {
    title: 'Autismespektrumforstyrrelser (Børn og Unge)',
    subtitle: 'National Klinisk Retningslinje for behandling af autisme hos børn og unge',
    pdfs: [
        { title: 'NKR Autisme', url: `${import.meta.env.BASE_URL}pdf/nkr-for-behandling-af-autismespektrumforstyrrelser-hos-boern-og-unge.pdf` }
    ],
    intro: 'Vejledninger anbefaler primært helhedsorienterede, pædagogiske og forældremedierede indsatser for børn og unge med autisme. Farmakologisk behandling er yderst restriktivt.',
    algorithmTitle: 'Klinisk Vejledning',
    isStepBased: false,
    algorithm: [
        {
            title: 'Ikke-Farmakologiske (Pædagogisk/Psykologisk)',
            details: `Træning af sociale færdigheder (18 mdr - 17 år):\n• Overvej at tilbyde målrettet og manualiseret behandling. Monitorér dog belastningsgraden, da det kan være krævende for barnet/den unge.\n\nForældremedieret intervention (18 mdr - 17 år):\n• Overvej at tilbyde målrettet psykoedukation med konkrete redskaber for at klæde forældrene bedst muligt på og øge barnets trivsel.\n\nSprogintervention (18 mdr - 6 år):\n• Overvej at tilbyde ved forsinket eller afvigende sprogudvikling for førskolebørn.\n\nKognitiv adfærdsterapi (6 - 17 år med komorbid angst):\n• STÆRK ANBEFALING: Tilbyd KAT mod evt. komorbid angst.\n• Skal være særligt tilpasset autismespektrumforstyrrelse (standard KAT kan have skadevirkninger for autister).`
        },
        {
            title: 'Ikke-Anbefalede Indsatser',
            details: `Gluten- og casein eliminationsdiæt (3 - 17 år):\n• STÆRK ANBEFALING IMOD: Frarådes stærkt, medmindre der foreligger diagnostisk afklaret cøliaki eller mælkeprotein-intolerance.\n\nNeurofeedback (3 - 17 år):\n• STÆRK ANBEFALING IMOD: Ingen dokumenteret effekt, muligvis krævende og usikre skadevirkninger.\n\nSanseintegrationsbehandling (18 mdr - 17 år):\n• SVAG ANBEFALING IMOD: Bør kun overvejes ved moderate til svære, specifikke sanseintegrationsforstyrrelser. Autisme i sig selv er ikke grundlag for behandlingen.`
        },
        {
            title: 'Farmakologisk Behandling',
            details: `Melatonin ved søvnforstyrrelser (2 - 17 år):\n• Overvej ved specifikke indsovningsproblemer (indsovning >30 min) og kun hvor forudgående søvnhygiejniske tiltag har været afprøvet i min. 4 uger uden effekt.\n• Opstart og behandling sker i børne- og ungdomspsykiatrisk regi.\n• Effekt bør evalueres efter 3 måneder, med overvejelse om seponering hvis klinisk effekt udebliver.\n\n2. Generations Antipsykotika (5 - 17 år):\n• SVAG ANBEFALING IMOD: Bør udelukkende overvejes, efter nøje overvejelse, til behandling af svær irritabilitet og udadreagerende adfærd/aggression, når alle non-farmakologiske/pædagogiske tiltag har været afprøvet uden tilstrækkelig effekt.\n• Der er væsentlige bivirkninger, hvorfor behandlingen understøttes af tæt monitorering og plan for seponering.`
        }
    ]
};
