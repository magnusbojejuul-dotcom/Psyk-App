export const SPISEFORSTYRRELSER_GUIDELINE = {
    title: 'Spiseforstyrrelser (Anoreksi og Bulimi)',
    subtitle: 'Nationale Kliniske Retningslinjer (Anorexia Nervosa 2019, Bulimi)',
    pdfs: [
        { title: 'NKR Anorexia Nervosa', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-anorexia-nervosa.pdf` },
        { title: 'NKR Bulimi', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-for-behandling-af-moderat-og-svaer-bulimi.pdf` }
    ],
    intro: 'Vejledninger for udredning og behandling af Anorexia Nervosa og Bulimia Nervosa, baseret på Sundhedsstyrelsens NKR.',
    algorithm: [
        {
            title: 'Generelle Principper',
            summary: 'Tidlig intervention og fokus på vægt/symptomer.',
            details: `• Behandling evalueres tidligt: Hvis ingen effekt (fx vægtindhentning) inden for 1-2 mdr. (børn/unge) eller 1-3 mdr. (voksne), bør behandlingen intensiveres eller ændres.\n• Somatisk stabilitet er altid en forudsætning. Indlæggelser bør generelt være så kortvarige som muligt, efterfulgt af intensiv ambulant opfølgning.\n• Måltidsstøtte/Spisetræning anbefales generelt i ambulant regi.`
        },
        {
            title: 'Anorexia Nervosa (Børn og Unge)',
            summary: 'Familiebaseret behandling er førstevalg.',
            details: `• Familiebaseret spiseforstyrrelsesbehandling (FBT) overvejes som førstevalg.\n• Udskrivning snarest muligt efter påbegyndt vægtindhentning ved selvstændig spisning (med forældrestøtte).\n• Mål for vægtindhentning: Min. 500 g/uge ambulant, min. 1 kg/uge under indlæggelse.\n• Vægtmål: Skal ramme barnets tidligere vækstkurve (ofte omkring 50-percentilen).`
        },
        {
            title: 'Anorexia Nervosa (Voksne)',
            summary: 'Psykoterapi (Individuel/Gruppe) samt specifikke vægtmål.',
            details: `• Gruppebaseret og individuel psykoterapeutisk behandling er ligestillede som førstevalg.\n• Vægtmål: Specifikke mål for vægtindhentning (fx 500g/uge) bør opstilles. Slutmålet er typisk et BMI på 20-25 for kvinder og 21-26 for mænd, suppleret med normalisering af menstruation/kropsfunktioner.\n• Behandlingen kan både bære fokus på kernesymptomer (vægt) og have et bredere fokus (relationer, selvværd mv.).`
        },
        {
            title: 'Bulimia Nervosa',
            summary: 'Kognitiv adfærdsterapi (CBT-ED) og evt. medicinsk tillæg.',
            details: `• Førstevalg er specialiseret kognitiv adfærdsterapi for spiseforstyrrelser (CBT-ED).\n• For børn/unge er familiebaseret terapi oftest udgangspunktet.\n• Farmakologisk (hvis indikeret): SSRI, hyppigst Fluoxetin (i højere doser, fx 60 mg), kan anvendes som supplement til fald i overspisning og udrensning, i kombination med terapi.`
        }
    ]
};
