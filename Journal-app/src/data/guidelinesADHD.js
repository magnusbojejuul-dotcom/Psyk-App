export const ADHD_GUIDELINE = {
    title: 'Medicinsk Behandling af ADHD / ADD for Voksne',
    subtitle: 'NKR og RADS-vejledning for voksne',
    pdfs: [
        { title: 'RADS ADHD (2016)', url: `${import.meta.env.BASE_URL}pdf/rads_adhd-pixi_4.pdf` },
        { title: 'NKR ADHD Voksne', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-adhd-hos-voksne.pdf` },
        { title: 'Adhd-beh-juni-2016', url: `${import.meta.env.BASE_URL}pdf/adhd-beh-juni-2016.pdf` }
    ],
    intro: 'Vejledningen sikrer national konsensus for diagnostik, behandling og rammerne for kontrol af ADHD hos voksne.',
    algorithmTitle: 'Klinisk Vejledning',
    isStepBased: false,
    algorithm: [
        {
            title: 'Udredning (Diagnostik)',
            details: `Børn og Unge:\nEr tværfaglig og tværsektoriel og inkluderer:\n• Klinisk interview med anamnese.\n• Anvendelse af standardiseret rating-scales (ADHD-RS fra flere miljøer).\n• Oplysninger fra skole/daginstitution eller observation af barnet i et af disse.\n• Somatisk undersøgelse ved læge.\n• Psykologisk undersøgelse.\n\nSværhedsgraden i DSM-5 er baseret på en klinisk vurdering af antal symptomer sammenholdt med graden af funktionsnedsættelse:\n• Mild:\n• Få symptomer og mindre funktionsnedsættelse.\n• Moderat:\n• Symptomer og funktionsnedsættelse herimellem.\n• Svær:\n• Mange symptomer og svær funktionsnedsættelse.\n\nVoksne:\nInkluderer:\n• Klinisk interview og grundig anamnese med anvendelse af semistruktureret spørgeguide (fx DIVA 2.0).\n• Anvendelse af rating scale udført af den voksne selv (ASRS v.1.1).\n• Somatisk undersøgelse ved læge.`
        },
        {
            title: 'Kriterier for Igangsætning',
            details: `Børn og Unge:\n• Svær ADHD (6-17 år): Anvend medicin, såfremt ikke-medicinske tiltag har utilstrækkelig effekt.\n• Moderat ADHD: Det er god praksis at overveje medicinsk behandling ved betydelig varig funktionsnedsættelse for flere domæner, såfremt ikke-medicinske tiltag har utilstrækkelig effekt.\n• Mild ADHD: Anvend IKKE medicinsk behandling.\n• Under 6 år: Anvend kun efter nøje overvejelse medicin ved svær ADHD, hvor ikke-medicinske tiltag har utilstrækkelig effekt (højt specialiseret afdeling).\n\nVoksne:\n• Anvend medicin ved ADHD hos voksne med betydelig funktionsnedsættelse.\n• Øvrige støttende tiltag kan ikke udelades ved valg af medicinsk behandling.`
        },
        {
            title: 'Psykiatrisk Komorbiditet (VIGTIGT)',
            details: `Psykoser og affektive lidelser:\n• Patienter med bipolar lidelse (type I og II), svær depression eller skizofreni skal være velbehandlede, før man starter evt. ADHD-medicin.\n• Vær opmærksom på, at CNS-stimulerende medicin kan forværre angst, depression, bipolar lidelse og psykoser.\n\nMisbrug:\n• Effekten af ADHD-medicin hos personer med amfetamin og kokainmisbrug er tvivlsom. Det gælder både effekten på ADHD-symptomerne og selve misbruget.\n• Patienter med misbrug skal starte misbrugsbehandling og reducere misbrug mest muligt før evt. behandling med ADHD-medicin.\n\nPersonlighedsforstyrrelser:\n• Effekten af ADHD-medicin på ADHD-symptomer ved comorbide svære personlighedsforstyrrelser er tvivlsom.\n• Overvej ved stabil og lav grad af personlighedsforstyrrelse (især cluster B fx emotionel ustabil personlighedsstruktur impulsiv og borderline type) at behandle ADHD-lidelsen først, da psykoterapi ofte vil have en større chance for at virke herefter.`
        },
        {
            title: 'Valg af 1. Præparat',
            details: `Valg af lægemiddel:\n• Start med methylphenidat.\n\nOvervej at starte med atomoxetin:\n• Hvis methylphenidat er kontraindiceret.\n• Ved comorbid angst eller depression.\n• Ved behov for døgndækkende effekt.\n• Ved risiko for misbrug af methylphenidat hos patienten selv eller pårørende.\n\nGravide og ammende:\n• Anvend methylphenidat ved tvingende behov for medicinsk behandling.\n• Anvend INGEN andre former for ADHD-medicin.\n\nValg af methylphenidatpræparat:\n• Optitrer evt. til optimal dosis med korttidsvirkende methylphenidat.\n• Anvend/skift til det langtidsvirkende præparat, som passer bedst til patienten mht. tid til indsættende effekt og virkningsvarighed. Suppler, om nødvendigt, evt. med korttidsvirkende methylphenidat om morgenen eller sidst på eftermiddagen.\n• Vær opmærksom på, om barnet kan sluge depottabletten (må aldrig knuses eller tygges. Kun nogle kan åbnes og opslemmes).`
        },
        {
            title: 'Dosisøgning og Optitrering',
            details: `• Der er stor individuel variation i dosis respons. Ved manglende effekt af en veltålt behandling kan man derfor forsøge at øge dosis.\n• Vær opmærksom på, at et tilsyneladende behov for større doser kan skyldes, at bivirkninger til medicinen (fx hyperaktivitet) fejlagtigt bliver fortolket som mangelfuld respons med risiko for yderligere dosisøgning.\n• Behov for doser, som overstiger max. dosis angivet i produktresuméerne skal altid udredes grundigt mhp. afdækning af eventuelt misbrug.\n• For dexamfetamin, lisdexamfetamin og guanfacin er der ikke basis for at anbefale doser udover produktresuméets angivne max. doser for hverken børn eller voksne.\n\nAnbefalet max. dosis pr. dag:\nMethylphenidat:\n• Børn: RADS max 2,1 mg/kg eller 90 mg (Produktresumé 60 mg).\n• Voksne: RADS max 100 mg (Produktresumé 80 mg).\n\nAtomoxetin:\n• Børn: 1,8 mg/kg eller 120 mg.\n• Voksne: 120 mg.`
        },
        {
            title: 'Skift af Behandling / Kombinationsbehandling',
            details: `SKIFT AF BEHANDLING:\n• Genovervej diagnosen, hvis der er manglende respons trods dosisøgning.\n• Vælg skift til atomoxetin, dexamfetamin eller lisdexamfetamin afhængigt af, hvad der var årsag til behovet for præparatskift.\n• Skift til atomoxetin ved udtalte søvnvanskeligheder eller nedsat appetit ved behandling med methylphenidat, samt ved behov for døgndækkende behandling eller misbrug.\n• Ved misbrug af methylphenidat, lisdexamfetamin eller dexamfetamin seponerer man dette og skifter direkte over til atomoxetin.\n• Skift til dexamfetamin eller lisdexamfetamin, hvis der var god effekt af methylphenidat, men uacceptable bivirkninger heraf.\n• Overvej guanfacin til patienter, som oplever forværring i tics eller markant øgning af puls og blodtryk ved behandling med et af de øvrige lægemidler.\n\nKOMBINATIONSBEHANDLING:\n• Forsøg evt. kombinationsbehandling med centralstimulantia og atomoxetin, eller guanfacin, hvis der har været utilstrækkelig effekt af minimum to afprøvede lægemidler.\n• Vær særlig opmærksom på bivirkninger (kun i psykiatrisk regi).\n• Kombiner IKKE SSRI og atomoxetin (klinisk relevant stigning i BT og puls, men ingen bedre effekt).\n• Vær opmærksom på potentiel risiko for QTc-forlængelse ved kombination af atomoxetin og andre lægemidler med QTc-forlængende virkning.`
        },
        {
            title: 'Opfølgning & Seponering',
            details: `OPFØLGNING:\nBørn:\n• Vurder effekt og bivirkninger hver ½ år med ADHD-RS og systematisk bivirkningsskema.\n• Mål højde, vægt, puls og blodtryk.\n• Rutineblodprøver og EKG anbefales ikke som standard.\n\nVoksne:\n• Vurder effekt og bivirkninger mindst én gang årligt med ASRS (når klinisk relevant).\n• Mål ændringer i BT, puls og vægt.\n\nSEPONERING:\n• Ved tvivl om fortsat behov for medicin hos unge voksne anbefales seponeringsforsøg omkring 25 års alderen, hvor hjernen anses for færdigudviklet, mange har gennemført uddannelse, er flyttet hjemmefra mv.\n• Varigheden af pausen er ca. en måned for med sikkerhed at skelne mellem rebound symptomer og tilbagefald.\n• Genoptag behandlingen tidligere, hvis patienten ikke er i stand til at undvære medicin i en måned pga. recidiv af symptomer.`
        }
    ]
};
