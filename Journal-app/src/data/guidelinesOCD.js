export const OCD_GUIDELINE = {
    title: 'Obsessiv-Kompulsiv Tilstand (OCD)',
    subtitle: 'National Klinisk Retningslinje for behandling af OCD',
    pdfs: [
        { title: 'NKR OCD', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-behandling-af-obsessiv-kompultiv-tilstand.pdf` }
    ],
    intro: 'Anbefalinger for behandling af børn, unge og voksne med OCD, med hovedvægt på Kognitiv Adfærdsterapi (KAT) og retningslinjer for farmakologisk tillæg.',
    algorithm: [
        {
            title: 'Mild OCD',
            summary: 'Kognitiv Adfærdsterapi (KAT) foreslås.',
            details: `• Det er god praksis at tilbyde kognitiv adfærdsterapi til børn, unge og voksne med mild OCD.\n• Overvej også internetbaseret eller biblioterapi afhængig af motivation og ressourcer.`
        },
        {
            title: 'Moderat til Svær OCD (Børn og Unge)',
            summary: 'Familiebaseret eller standard KAT; SSRI frarådes som førstevalg.',
            details: `• Manualiseret familiebaseret KAT og standard KAT er ligestillede som førstevalg.\n• Stærk anbefaling IMOD at anvende SSRI som tillæg til KAT som førstevalg. SSRI kan dog overvejes, hvis KAT ikke har tilstrækkelig effekt, men kræver tæt monitorering (risiko for selvmordstanker).`
        },
        {
            title: 'Moderat til Svær OCD (Voksne)',
            summary: 'Individuel eller gruppe-KAT; tilbageholdenhed med SSRI og antipsykotika.',
            details: `• Tilbyd KAT enten individuelt eller i gruppe.\n• Svag anbefaling mod SSRI som førstevalg. Brug kun SSRI-tillæg, hvis KAT alene ikke har effekt.\n• Tredjebølge KAT (fx ACT) bør kun anvendes efter nøje overvejelse frem for standard KAT.\n• Atypisk antipsykotikum: Anvend kun efter nøje overvejelse som absolut tillægsbehandling for voksne med meget svær OCD, der ikke har haft effekt af både KAT og SSRI. Genovervej altid diagnosen først.`
        },
        {
            title: 'Opfølgning & Medicinseponering',
            summary: 'Tidlig seponering kan forsøges.',
            details: `• Hvis en patient ikke responderer på et KAT forløb (ofte 10-14 sessioner), bør yderligere et forløb overvejes (evt. individuelt frem for gruppe).\n• For patienter i antidepressiv behandling: Overvej at forsøge seponering (langsom aftrapning) allerede 6 måneder efter stabilisering af symptombilledet, frem for at vente 12 måneder.`
        }
    ]
};
