export const SPISEFORSTYRRELSER_GUIDELINE = {
    title: 'Spiseforstyrrelser (Anoreksi og Bulimi)',
    subtitle: 'Nationale Kliniske Retningslinjer (Anorexia Nervosa 2019, Bulimi)',
    pdfs: [
        { title: 'NKR Anorexia Nervosa', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-anorexia-nervosa.pdf` },
        { title: 'NKR Bulimi', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-for-behandling-af-moderat-og-svaer-bulimi.pdf` }
    ],
    intro: 'Vejledninger for udredning og behandling af Anorexia Nervosa og Bulimia Nervosa, baseret på Sundhedsstyrelsens NKR.',
    algorithmTitle: 'Klinisk Vejledning',
    isStepBased: false,
    algorithm: [
        {
            title: 'Generelle Principper',
            summary: 'Tidlig intervention og fokus på vægt/symptomer.',
            details: `• Evaluering: Hvis ingen effekt (særligt manglende vægtindhentning) inden for 1-2 mdr. (børn/unge) eller 1-3 mdr. (voksne), bør behandlingen intensiveres eller ændres.\n• Undtagelse: For langvarigt syge kan det tage længere tid at komme i gang, og behandlingen bør ikke nødvendigvis ændres de første måneder, hvis en god relation opbygges.\n• Somatisk stabilitet er en absolut forudsætning.\n• Indlæggelser bør generelt være så kortvarige som muligt, og udskrivelse ske snarest efter påbegyndt vægtindhentning ved selvstændig spisning, efterfulgt af udvidet ambulant støtte.\n• Måltidsstøtte/Spisetræning anbefales stærkt som supplement til al ambulant behandling.`
        },
        {
            title: 'Anorexia Nervosa (Børn og Unge)',
            summary: 'Familiebaseret behandling er førstevalg.',
            details: `• Familiebaseret spiseforstyrrelsesbehandling (FBT) overvejes som absolut førstevalg.\n• Udskrivning fra indlæggelse bør ske snarest muligt, når barnet/den unge kan spise selvstændigt med forældrestøtte uden sondeberedskab.\n• Mål for vægtindhentning: Min. 500 g/uge ambulant, min. 1 kg/uge under døgnindlæggelse.\n• Vægtmål for raskmelding: Målet bør ramme barnets/den unges tidligere vækstkurve (ofte pejlet mod 50-percentilen på højde-vægt-kurven).\n• Fysisk markør: Menstruation og øvrig kropsudvikling SKAL normaliseres før vægten kan anses for tilstrækkelig restitution.`
        },
        {
            title: 'Anorexia Nervosa (Voksne)',
            summary: 'Psykoterapi (Individuel/Gruppe) samt specifikke vægtmål.',
            details: `• Gruppebaseret eller individuel psykoterapi er ligestillede som førstevalg; valget bør tage udgangspunkt i patientens præferencer og specifikke behov.\n• Fysisk aktivitet under tæt vejledning kan overvejes som del af vægtøgningsfasen, særligt hos patienter med tendens til tvangsmotion.\n• Inddragelse af pårørende: Bør overvejes som en aktiv del af behandlingen.\n• Vægtmål: Specifikke mål for vægtindhentning bør opstilles. Slutmålet er typisk et BMI på 20-25 for kvinder og 21-26 for mænd.\n• Behandlingsfokus kan både rette sig snævert mod kernesymptomer (vægt) og bredere (interpersonelle relationer, traumer mv.), men fokus på vægt bedrer oftest symptomerne her-og-nu.`
        },
        {
            title: 'Bulimia Nervosa',
            summary: 'Kognitiv adfærdsterapi (CBT-ED) og evt. medicinsk tillæg.',
            details: `• Førstevalg er specialiseret kognitiv adfærdsterapi for spiseforstyrrelser (CBT-ED).\n• For børn/unge er familiebaseret terapi oftest udgangspunktet.\n• Farmakologisk (hvis indikeret): SSRI, hyppigst Fluoxetin (i højere doser, fx 60 mg), kan anvendes som supplement til fald i overspisning og udrensning, i kombination med terapi.`
        }
    ]
};
