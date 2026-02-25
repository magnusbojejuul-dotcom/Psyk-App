export const OCD_GUIDELINE = {
    title: 'Obsessiv-Kompulsiv Tilstand (OCD)',
    subtitle: 'National Klinisk Retningslinje for behandling af OCD',
    pdfs: [
        { title: 'NKR OCD', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-behandling-af-obsessiv-kompultiv-tilstand.pdf` }
    ],
    intro: 'Anbefalinger for behandling af børn, unge og voksne med OCD, med hovedvægt på Kognitiv Adfærdsterapi (KAT) og retningslinjer for farmakologisk tillæg.',
    algorithmTitle: 'Klinisk Vejledning',
    algorithm: [
        {
            title: 'Mild OCD',
            details: `• Det er "god praksis" at tilbyde kognitiv adfærdsterapi (KAT) til børn, unge og voksne med mild OCD.\n• Motivationsafklaring er vigtig inden opstart, især hos børn/unge hvor motivationen oftere ligger hos forældrene frem for barnet selv.\n• Afhængig af motivation og ressourcer kan selvhjælpsbehandlinger i form af biblioterapi, selvhjælpsgrupper eller internetbaseret KAT overvejes.`
        },
        {
            title: 'Moderat til Svær OCD (Børn og Unge)',
            details: `• Manualiseret familiebaseret KAT og standard KAT betragtes som ligestillede tilbud.\n• Vær generelt tilbageholdende med at tilbyde KAT i grupper til børn/unge.\n• STÆRK ANBEFALING MOD: Anvend ikke SSRI som tillæg til KAT som førstevalg (ingen dokumenteret merværdi og medfører kendte bivirkninger).\n• SSRI kan evt. overvejes, hvis KAT ikke har tilstrækkelig effekt (fx pga. komorbiditet), dog med tæt monitorering grundet risikoen for at fremkalde selvmordstanker.`
        },
        {
            title: 'Moderat til Svær OCD (Voksne)',
            details: `• KAT kan tilbydes individuelt eller i gruppe. Individuelle forløb kan foretrækkes ved følsomme/intime symptomer.\n• SVAG ANBEFALING MOD SSRI som førstevalg. Tillægsbehandling bør først forsøges, hvis KAT fejler.\n• SVAG ANBEFALING MOD Tredjebølge KAT (fx ACT og Mindfulness) i stedet for standard KAT, idet effekten er uvis. Bør kun anvendes ved stærkt patientønske og *kun* hvis eksponering stadig indgår.\n• SVAG ANBEFALING MOD atypisk antipsykotikum: Anvend kun off-label og efter nøje overvejelse hos voksne med svær OCD, der ikke har haft effekt af KAT og SSRI. Vær opmærksom på langsom optrapning og genovervej altid diagnosen først.`
        },
        {
            title: 'Opfølgning & Medicinseponering',
            details: `• Revurder altid terapi-formatet, hvis en patient fortsat har moderat/svær OCD efter opstartsforløbet i KAT; der kan med fordel overvejes yderligere et KAT-forløb i et andet format (fx fra gruppe til individuel).\n• For patienter i antidepressiv behandling bør man overveje at seponere behandlingen allerede 6 mdr. efter stabilisering af symptombilledet i stedet for 12 mdr.\n• Seponeringen bør ske med langsom nedtrapning udbredt over minimum to måneder pga. seponeringssymptomer.`
        }
    ]
};
