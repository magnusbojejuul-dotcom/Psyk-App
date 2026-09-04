export const PSYKOFARMAKA_DATA = [
    // Skift og Udtrapning (Switchtabel)
    {
        id: 'switchtabel_antidepressiva',
        name: 'Medicinskift (Switchtabel)',
        group: 'Antidepressiva',
        subgroup: 'Krydstiltrædelse & Seponering',
        effect: 'Ved skift mellem forskellige antidepressiva (fx SSRI til SNRI eller NaSSA) er det afgørende at følge evidensbaserede retningslinjer for dosisreduktion, overlappende dosering (krydstitrering) og eventuelle wash-out-perioder. Dette minimerer risikoen for serotonergt syndrom og reducerer generende seponeringssymptomer.',
        normalDose: 'Anvend den interaktive hollandske Switchtabel til at slå det konkrete præparatskift op (fra lægemiddel A til lægemiddel B). Tabellen anviser den præcise strategi: direkte skift, aftrapning med pause, eller krydstitrering.',
        featuredLink: {
            title: 'Åbn Switchtabel.nl',
            description: 'Slå direkte op mellem to præparater for at se korrekt fremgangsmåde ved præparatskift.',
            url: 'https://www.psychiatrienet.nl/switchtabel'
        },
        sideEffects: [
            { symptom: 'Serotonergt Syndrom', description: 'Potentielt livstruende tilstand med kognitive symptomer (agitation, konfusion), autonom ustabilitet (hypertermi, diaforese, takykardi) og neuromuskulær hyperaktivitet (myoklonus, hyperrefleksi, tremor, klonus). Udløses af udtalt serotonerg overstimulering – typisk ved kombination eller for hurtigt skift uden tilstrækkelig udvaskning.', treatment: 'Seponér omgående alle serotonerge lægemidler. Kræver akut indlæggelse til understøttende og kølende behandling samt monitorering. Ved svære symptomer kan gives benzodiazepiner og eventuelt serotoninantagonisten cyproheptadin.' },
            { symptom: 'Seponeringssyndrom', description: 'Ubehagelige seponeringssymptomer (svimmelhed, paræstesier / elektriske stød i hovedet ("brain-zaps"), influenzalignende symptomer, angst, søvnforstyrrelser) udløst af brat dosisreduktion eller udtrapning.', treatment: 'Langsom, gradvis dosisreduktion over uger til måneder. Særlig udtalt ved præparater med kort halveringstid som Venlafaxin og Paroxetin. Ved svære symptomer kan genoptages forrige dosis eller midlertidigt skiftes til Fluoxetin.' }
        ],
        sources: [{ title: 'Psychiatrienet.nl (Switchtabel)', url: 'https://www.psychiatrienet.nl/switchtabel' }]
    },

    // Antidepressiva (SSRI)
    {
        id: 'sertralin',
        name: 'Sertralin',
        group: 'Antidepressiva',
        subgroup: 'SSRI',
        effect: 'Selektiv serotonin-genoptagelseshæmmer (SSRI). Øger den serotonerge neurotransmission ved selektivt at hæmme genoptagelsen i præsynaptiske nerveterminaler. Førstevalg til moderat og svær unipolar depression samt veldokumenteret ved generaliseret angst, panikangst, socialfobi og OCD. God sikkerhedsprofil ved kardiovaskulær komorbiditet og hos ældre/gravide.',
        normalDose: 'Depression og angst: Startdosis 25-50 mg dagligt (25 mg ved panikangst for at undgå initial angstforværring). Kan øges med 50 mg med 1-2 ugers interval til vedligeholdelsesdosis 50-100 mg dagligt (maks 200 mg). OCD: Kræver ofte højere doser (op til 200 mg dagligt). Seponeres ved langsom udtrapning.',
        sideEffects: [
            { symptom: 'Gastrointestinale gener', description: 'Kvalme, løs afføring/diarré, nedsat appetit. Optræder hyppigst i de første 1-2 ugers behandling og aftager herefter.', treatment: 'Start i lav dosis og optrap gradvist. Indtagelse i forbindelse med et måltid mindsker kvalme. Informer patienten om symptomernes forbigående karakter.' },
            { symptom: 'Seksuel dysfunktion', description: 'Meget almindelig bivirkning (>30-50%): Nedsat libido, anorgasmi, forsinket ejakulation hos mænd.', treatment: 'Dosisreduktion hvis klinisk forsvarligt. Alternativt skift til antidepressivum med minimal seksuel bivirkningsprofil (f.eks. Mirtazapin, Vortioxetin, Bupropion eller Agomelatin).' },
            { symptom: 'Søvnforstyrrelser / Rastløshed', description: 'Initial insomni, livlige drømme eller let motorisk rastløshed i opstartsfasen. Hos nogle ses emotionel affladning på sigt.', treatment: 'Doseres om morgenen ved insomni, eller til natten hvis patienten oplever døsighed.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Sertralin)', url: 'https://pro.medicin.dk/Sog/Sog?query=sertralin' }]
    },
    {
        id: 'citalopram',
        name: 'Citalopram',
        group: 'Antidepressiva',
        subgroup: 'SSRI',
        effect: 'Selektiv serotonin-genoptagelseshæmmer (SSRI). Anvendes til behandling af unipolar depression og panikangst. Vær opmærksom på dosisafhængig risiko for forlængelse af QTc-intervallet.',
        normalDose: 'Startdosis 10-20 mg dagligt. Vedligeholdelse 20-40 mg dagligt (maks 40 mg dagligt). VIGTIGT: Maksimal dosis er 20 mg dagligt hos ældre >65 år og ved nedsat leverfunktion grundet forlænget halveringstid og øget QTc-risiko.',
        sideEffects: [
            { symptom: 'QTc-forlængelse', description: 'Dosisafhængig forlængelse af QTc-intervallet med risiko for Torsades de Pointes og maligne ventrikulære arytmier.', treatment: 'Optag EKG før opstart hos ældre og disponerede patienter. Kontroller elektrolytter (P-Kalium og P-Magnesium). Undgå kombination med andre QTc-forlængende lægemidler.' },
            { symptom: 'Svedtendens', description: 'Øget transpiration er en almindelig serotonerg bivirkning.', treatment: 'Psykoedukation, anvend let tøj i naturlige materialer.' },
            { symptom: 'Gastrointestinale gener', description: 'Kvalme, mundtørhed og appetitændring i de første behandlingsuger.', treatment: 'Skånsom, gradvis dosisoptrapning og indtagelse sammen med mad.' },
            { symptom: 'Hyponatriæmi (SIADH)', description: 'Risiko for uhensigtsmæssig ADH-sekretion med hyponatriæmi, særligt hos ældre og patienter i samtidig diuretikabehandling.', treatment: 'Mål P-Natrium ved konfusion, sløvhed, kramper eller faldtendens.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Citalopram)', url: 'https://pro.medicin.dk/Sog/Sog?query=citalopram' }]
    },
    {
        id: 'escitalopram',
        name: 'Escitalopram',
        group: 'Antidepressiva',
        subgroup: 'SSRI',
        effect: 'S-enantiomeren (den aktive form) af Citalopram. Højt selektivt SSRI med minimal affinitet for andre receptorer, hvilket giver færre farmakokinetiske interaktioner og god tolerabilitet. Anvendes ved depression, generaliseret angst, socialfobi, panikangst og OCD.',
        normalDose: 'Startdosis: 5-10 mg dagligt (5 mg ved panikangst). Vedligeholdelsesdosis: 10-20 mg dagligt (maks 20 mg dagligt). VIGTIGT: Maksimal dosis er 10 mg dagligt hos ældre >65 år.',
        sideEffects: [
            { symptom: 'QTc-forlængelse', description: 'Dosisafhængig risiko for QTc-forlængelse, analogt med Citalopram (dog ved det halve milligram-niveau).', treatment: 'EKG ved baseline hos risikopatienter, og ved doser >10 mg eller kombination med andre risikolægemidler.' },
            { symptom: 'Klassiske serotonerge bivirkninger', description: 'Kvalme, nedsat libido/forsinket orgasme, initial søvnløshed og let øget blødningstendens.', treatment: 'Indtages med mad. Forsigtighed ved samtidig brug af NSAID eller antikoagulantia.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Escitalopram)', url: 'https://pro.medicin.dk/Sog/Sog?query=escitalopram' }]
    },
    {
        id: 'fluoxetin',
        name: 'Fluoxetin',
        group: 'Antidepressiva',
        subgroup: 'SSRI',
        effect: 'Selektiv serotonin-genoptagelseshæmmer kendetegnet ved en usædvanlig lang halveringstid (2-4 døgn for modersubstansen, 7-15 døgn for den aktive metabolit norfluoxetin). ENESTE godkendte antidepressivum til børn og unge (fra 8 år) i Danmark. Specifikt godkendt til Bulimia Nervosa udover depression og OCD.',
        normalDose: 'Depression/angst/OCD: Startdosis 20 mg dagligt (børn: 10 mg dagligt). Maks 60 mg dagligt. Bulimia Nervosa: 60 mg dagligt (højere dosis nødvendig for antibulimisk effekt). Steady-state opnås først efter flere uger.',
        sideEffects: [
            { symptom: 'Aktivering og agitation', description: 'Udtalt aktiverende profil: Rastløshed, insomni og initial forværring af angst i de første uger.', treatment: 'Doseres altid om morgenen. Tæt klinisk opfølgning på agitation og suicidalitetsrisiko, særligt hos unge.' },
            { symptom: 'Vægttab og nedsat appetit', description: 'I modsætning til visse andre psykofarmaka medfører Fluoxetin ofte let vægttab og nedsat appetit initialt.', treatment: 'Velegnet ved depression med hypersomni og psykomotorisk hæmning.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Fluoxetin)', url: 'https://pro.medicin.dk/Sog/Sog?query=fluoxetin' }]
    },

    // Antidepressiva (SNRI)
    {
        id: 'venlafaxin',
        name: 'Venlafaxin',
        group: 'Antidepressiva',
        subgroup: 'SNRI',
        effect: 'Serotonin- og noradrenalin-genoptagelseshæmmer (SNRI). Dosisafhængig virkningsmekanisme: Ved doser under ca. 150 mg virker stoffet overvejende serotonergt (som et SSRI); ved doser ≥150 mg ses markant noradrenerg genoptagelseshæmning. Anvendes ved moderat til svær depression, generaliseret angst, socialfobi og panikangst.',
        normalDose: 'Startdosis: 75 mg dagligt som depotkapsel (giver jævnere plasmakoncentration). Vedligeholdelse: 75-225 mg dagligt (i specialpsykiatrisk regi op til 375 mg dagligt ved svær behandlingsresistens).',
        sideEffects: [
            { symptom: 'Kardiovaskulære bivirkninger', description: 'Noradrenerg stimulation medfører dosisafhængig stigning i blodtryk og hvilepuls samt let risiko for QTc-forlængelse.', treatment: 'Mål blodtryk og puls før opstart og regelmæssigt undervejs, særligt ved doser over 150 mg dagligt. Seponér eller justér ved behandlingsrefraktær hypertension.' },
            { symptom: 'Udtalte seponeringssymptomer', description: 'Pga. kort halveringstid medfører forglemmelse af blot en enkelt dosis eller brat seponering svære symptomer: "Brain zaps" (elektriske stødfornemmelser i hovedet), svimmelhed, kvalme og influenzalignende symptomer.', treatment: 'Udtrapning skal foregå meget langsomt og gradvist over mange uger. Ved svære seponeringsproblemer kan der skiftes midlertidigt til Fluoxetin.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Venlafaxin)', url: 'https://pro.medicin.dk/Sog/Sog?query=venlafaxin' }]
    },
    {
        id: 'duloxetin',
        name: 'Duloxetin',
        group: 'Antidepressiva',
        subgroup: 'SNRI',
        effect: 'Balanceret serotonin- og noradrenalin-genoptagelseshæmmer (SNRI) med dual effekt allerede i standarddoser. Udover godkendelse til depression og generaliseret angst har Duloxetin dokumenteret effekt på diabetisk perifer neuropatisk smerte og kroniske smertetilstande.',
        normalDose: 'Depression/smerter: Startdosis 30-60 mg dagligt. Maksimal dosis 120 mg dagligt. Kapsler må ikke tygges eller åbnes, da granulatet er syreresistent beskyttet.',
        sideEffects: [
            { symptom: 'Initial kvalme', description: 'Kvalme forekommer hos op mod 20% i starten af behandlingen.', treatment: 'Start i lav dosis (30 mg dagligt i 1 uge) og indtag sammen med et måltid for at bedre tolerabiliteten.' },
            { symptom: 'Urinretention', description: 'Noradrenerg stimulation øger tonus i blæresfinkter, hvilket kan give vandladningsbesvær.', treatment: 'Udvis forsigtighed hos mænd med prostatahypertrofi. Seponér ved udtalt retention.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Duloxetin)', url: 'https://pro.medicin.dk/Sog/Sog?query=duloxetin' }]
    },

    // Antidepressiva (NaSSA)
    {
        id: 'mirtazapin',
        name: 'Mirtazapin',
        group: 'Antidepressiva',
        subgroup: 'NaSSA',
        effect: 'Noradrenergt og specifikt serotonergt antidepressivum (NaSSA). Blokerer centrale præsynaptiske alfa-2-autoreceptorer og heteroreceptorer, hvilket øger frigivelsen af både noradrenalin og serotonin. Blokerer desuden 5-HT2- og 5-HT3-receptorer (hvilket modvirker angst, kvalme og seksuel dysfunktion) samt histamin H1-receptorer.',
        normalDose: 'Startdosis: 15-30 mg til natten. Vedligeholdelse: 15-45 mg dagligt som enkeltdosis ved sengetid.',
        sideEffects: [
            { symptom: 'Vægtøgning og øget appetit', description: 'Kombineret H1- og 5-HT2c-blokade medfører udtalt appetitstigning, kulhydrat-craving og vægtøgning.', treatment: 'Kostvejledning og vægtmonitorering. Kan være terapeutisk fordelagtigt hos afmagrede eller ældre deprimerede patienter med appetitløshed.' },
            { symptom: 'Klinisk paradoksal sedation', description: 'Sedation via H1-blokade mættes ved lave doser. Den sederende virkning kan derfor paradoksalt opleves mere dominerende ved 15 mg end ved 30-45 mg, hvor den noradrenerge aktivering tiltager.', treatment: 'Indtages altid umiddelbart før sengetid for at udnytte den søvnfremmende virkning.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Mirtazapin)', url: 'https://pro.medicin.dk/Sog/Sog?query=mirtazapin' }]
    },

    // Antipsykotika (Generel Info & Arytmi)
    {
        id: 'receptor_info_antipsykotika',
        name: 'Receptorprofiler (Info)',
        group: 'Antipsykotika',
        subgroup: 'Klasserelateret farmakologi',
        isInfoComponent: true,
        effect: 'Oversigt over de farmakologiske mekanismer bag antipsykotika. Viser sammenhængen mellem receptoraffinitet (D2, 5-HT2A, H1, M1, Alfa-1) og klinisk virkning samt bivirkninger (EPS, prolaktinstigning, sedation, vægtøgning og ortostatisme).',
        normalDose: '',
        sideEffects: [],
        sources: []
    },
    {
        id: 'arytmi_info_antipsykotika',
        name: 'Arytmi og Antipsykotika (Info)',
        group: 'Antipsykotika',
        subgroup: 'Kardiovaskulær Sikkerhed',
        isArytmiComponent: true,
        effect: 'Klinisk vejledning fra DCS, DPS og DSKF (2023) om vurdering og håndtering af arytmirisiko ved anvendelse af psykofarmaka. Inddeler præparater i Grønne (ikke QTc-forlængende), Gule (let risiko / <10 ms) og Røde (markant QTc-forlængelse og dokumenteret TdP-risiko). Indeholder algoritme for risikovurdering og EKG-krav.',
        normalDose: `Vurder kardiologiske risikofaktorer før opstart:\n• Høj alder (>65 år)\n• Kendt hjertesygdom (hjertesvigt, tidligere AMI, præeksisterende QTc > 480 ms)\n• Familieanamnese med arytmi eller uforklaret pludselig død\n• Symptomer: Synkoper, palpitationer, dyspnø eller brystsmerter\n• Bradykardi (<50 slag/min)\n• Elektrolytforstyrrelser (hypokaliæmi P-K < 3,5 mmol/L, hypomagnesiæmi)\n• Polyfarmaci med andre QTc-forlængende stoffer\n\nMonitorering: Kontrol-EKG anbefales 1-2 uger efter opstart samt ved dosisøgning >50% for gule og røde præparater.`,
        featuredLink: {
            title: 'Åbn Arytmi og Antipsykotika (PDF)',
            description: 'Læs den fulde kliniske vejledning om kardial risikovurdering ved psykofarmaka.',
            url: `${import.meta.env.BASE_URL}pdf/arytmi_og_antipsykotika.pdf`
        },
        sideEffects: [
            { symptom: 'Røde præparater (Høj QTc-risiko)', description: 'Dokumenteret risiko for markant QTc-forlængelse og Torsades de Pointes (TdP). Omfatter bl.a. Haloperidol, Chlorprotixen, Levomepromazin, Melperon, Clozapin, Quetiapin, Ziprasidon, Sertindol, Citalopram, Escitalopram, Lithium og Metadon.', treatment: 'Baseline-EKG er obligatorisk før opstart. Konferér med kardiolog ved baseline QTc > 480 ms. Seponér eller reducer dosis hvis QTc overstiger 500 ms eller stiger > 60 ms fra baseline.' },
            { symptom: 'Gule præparater (Moderat QTc-risiko)', description: 'Let QTc-forlængelse (< 10 ms) eller proarytmisk risiko under særlige omstændigheder. Omfatter bl.a. Zuclopenthixol, Flupenthixol, Risperidon, Paliperidon, Amisulprid, Mirtazapin og Sertralin.', treatment: 'Baseline-EKG anbefales, men kan i fravær af kardiologiske risikofaktorer udskydes for visse præparater (fx Sertralin og Mirtazapin).' },
            { symptom: 'Grønne præparater (Lav/Ingen QTc-risiko)', description: 'Ikke associeret med klinisk betydende QTc-forlængelse. For atypiske antipsykotika omfatter dette udelukkende Aripiprazol og Olanzapin. Omfatter desuden Benzodiazepiner, visse antidepressiva (Duloxetin, Paroxetin, Agomelatin, Vortioxetin) samt Valproat og Lamotrigin.', treatment: 'EKG kan som udgangspunkt fraviges forud for opstart, medmindre der foreligger anden kardial indikation.' }
        ],
        sources: [{ title: 'DCS, DPS m.fl.: Arytmi-risiko ved anvendelse af psykofarmaka (Version 2, 2023)', url: `${import.meta.env.BASE_URL}pdf/arytmi_og_antipsykotika.pdf` }]
    },

    // Antipsykotika (SGA - Anden Generation)
    {
        id: 'quetiapin',
        name: 'Quetiapin',
        group: 'Antipsykotika',
        subgroup: 'SGA (Anden generation)',
        effect: 'Atypisk antipsykotikum (SGA). Blokerer primært 5-HT2A-receptorer og har moderat D2-receptoraffinitet med hurtig dissociation (giver meget lav risiko for ekstrapyramidale symptomer). Har kraftig antihistaminerg (H1) og alfa-1-adrenerg blokerende virkning, hvilket medfører udtalt sedation og ortostatisme. Anvendes ved skizofreni, bipolar mani/depression samt som add-on ved unipolar depression.',
        normalDose: 'Skizofreni: 300-800 mg dagligt (depottabletter foretrækkes for jævnt plasmaniveau). Bipolar depression: 300 mg dagligt. Unipolar depression (add-on): 150-300 mg dagligt. Lavdosis til natten (25-50 mg) anvendes ofte off-label mod søvnløshed/uro.',
        receptorAffinities: { 'D2': 1, '5-HT2A': 1, 'H1': 2, 'M1': 1, 'Alfa-1': 2 },
        sideEffects: [
            { symptom: 'Udtalt sedation', description: 'Svært nedsat energiniveau, døsighed og morgen-hangover pga. potent H1-blokade.', treatment: 'Doseres til natten. Start i lav dosis (fx 25-50 mg) og optrap langsomt.' },
            { symptom: 'Metaboliske forstyrrelser', description: 'Øget appetit, vægtøgning samt øget risiko for dyslipidæmi og type 2-diabetes.', treatment: 'Systematisk monitorering af vægt, taljemål, fasteblodsukker/HbA1c og lipider ved opstart, efter 3 måneder og årligt.' },
            { symptom: 'Ortostatisk hypotension', description: 'Svimmelhed ved stillingsskift pga. alfa-1-adrenerg blokade.', treatment: 'Langsom optrapning. Instruer patienten i at rejse sig langsomt.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Quetiapin)', url: 'https://pro.medicin.dk/Sog/Sog?query=quetiapin' }]
    },
    {
        id: 'olanzapin',
        name: 'Olanzapin',
        group: 'Antipsykotika',
        subgroup: 'SGA',
        effect: 'Højpotent, bredspektret atypisk antipsykotikum (SGA). Meget effektiv dæmpende og antipsykotisk virkning. Førstevalg ved akut psykose, akut manisk episode og maniprofylakse. Ingen QTc-forlængende effekt (grønt præparat), men udtalt metabolisk bivirkningsrisiko.',
        normalDose: 'Startdosis: 5-10 mg dagligt (i akutte faser ofte 10-20 mg). Vedligeholdelse: 10-20 mg dagligt som enkeltdosis til natten.',
        receptorAffinities: { 'D2': 2, '5-HT2A': 2, 'H1': 2, 'M1': 2, 'Alfa-1': 1 },
        sideEffects: [
            { symptom: 'Svær metabolisk påvirkning', description: 'Blandt de antipsykotika med størst risiko for markant vægtøgning (>10% af kropsvægt), insulinresistens og dyslipidæmi.', treatment: 'Tæt kontrol af vægt, BMI, HbA1c og lipider (baseline, 3 mdr. og derefter regelmæssigt). Kost- og motionsvejledning. Tidlig intervention med Metformin kan overvejes ved kraftig vægtstigning.' },
            { symptom: 'Sedation og antikolinerge gener', description: 'Døsighed, mundtørhed og obstipation pga. multireceptor-blokade.', treatment: 'Doseres ved sengetid for at udnytte den søvnfremmende virkning.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Olanzapin)', url: 'https://pro.medicin.dk/Sog/Sog?query=olanzapin' }]
    },
    {
        id: 'aripiprazol',
        name: 'Aripiprazol',
        group: 'Antipsykotika',
        subgroup: 'SGA',
        effect: 'Partiel D2- og 5-HT1A-agonist samt 5-HT2A-antagonist (dopamin-system-stabilisator). Blokerer ved dopamin-overskud og stimulerer partielt ved mangel. Har en aktiverende profil med minimal metabolisk påvirkning, ingen sedation og ingen QTc-forlængelse (grønt præparat). Findes som tabletter og langtidsvirkende depotinjektion.',
        normalDose: 'Startdosis: 10-15 mg dagligt (om morgenen). Vedligeholdelse: 10-30 mg dagligt. Unipolar depression (add-on): 2,5-10 mg dagligt.',
        receptorAffinities: { 'D2': 3, '5-HT2A': 1, 'H1': 0, 'M1': 0, 'Alfa-1': 0 },
        sideEffects: [
            { symptom: 'Akatisi (motorisk rastløshed)', description: 'Udtalt indre uro og manglende evne til at sidde stille, primært lokaliseret til benene. Optræder hyppigst inden for de første 1-2 uger og forveksles desværre ofte med psykotisk agitation eller angstforværring.', treatment: 'Korrekt klinisk differentiering fra agitation (akatisi er fysisk-motorisk betinget). Dosisreduktion, tillæg af betablokker (Propranolol 10-40 mg dagligt) eller midlertidigt lavdosis benzodiazepin/mirtazapin.' },
            { symptom: 'Søvnløshed og aktivering', description: 'Vågenhedsfremmende effekt med risiko for indsovningsbesvær.', treatment: 'Doseres altid om morgenen. Forsigtighed ved akut mani, hvor initial sedation ofte er påkrævet.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Aripiprazol)', url: 'https://pro.medicin.dk/Sog/Sog?query=aripiprazol' }]
    },
    {
        id: 'risperidon',
        name: 'Risperidon',
        group: 'Antipsykotika',
        subgroup: 'SGA',
        effect: 'Potent D2- og 5-HT2A-antagonist. Udbredt førstevalg ved skizofreni og psykotiske episoder, ved kortvarig behandling af vedvarende aggression ved moderat/svær Alzheimers demens (i lave doser) og ved adfærdsforstyrrelser hos børn og unge. Findes som tabletter, smeltetabletter, mikstur og depotinjektion.',
        normalDose: 'Psykose: 2-6 mg dagligt fordelt på 1-2 doser. Ældre/demens: 0,25 - 1 mg dagligt (maks 2 mg dagligt). B&U: 0,5 - 3 mg dagligt.',
        receptorAffinities: { 'D2': 2, '5-HT2A': 2, 'H1': 0, 'M1': 0, 'Alfa-1': 1 },
        sideEffects: [
            { symptom: 'Hyperprolaktinæmi', description: 'Blokade af D2-receptorer i tuberoinfundibulære bane medfører udtalt stigning i P-Prolaktin, resulterende i galaktorré, gynækomasti hos mænd, amenorré/cyklusforstyrrelser, nedsat fertilitet og på sigt osteoporose.', treatment: 'Mål P-Prolaktin ved kliniske symptomer. Ved vedvarende hyperprolaktinæmi overvejes præparatskift (fx til Aripiprazol, som sænker prolaktin).' },
            { symptom: 'Ekstrapyramidale bivirkninger (EPS)', description: 'Dosisafhængig EPS (tremor, rigiditet, hypokinesi). Ses særligt ved doser over 4-6 mg dagligt, hvor D2-blokaden overstiger det atypiske vindue.', treatment: 'Dosisreduktion. Ved akutte symptomer kan gives Biperiden (Akineton).' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Risperidon)', url: 'https://pro.medicin.dk/Sog/Sog?query=risperidon' }]
    },
    {
        id: 'clozapin',
        name: 'Clozapin',
        group: 'Antipsykotika',
        subgroup: 'SGA',
        effect: 'Mest potente og veldokumenterede atypiske antipsykotikum (SGA). Signifikant overlegent øvrige antipsykotika ved behandlingsresistent skizofreni og reducerer selvmordsrisikoen markant. Reserveres til behandlingsresistens (efter mindst to uvirksomme antipsykotikaforsøg af tilstrækkelig varighed og dosis) pga. potentielt livstruende bivirkninger, der kræver lovpligtig monitorering.',
        normalDose: 'Startes altid i meget lav dosis (12,5 mg 1-2 gange første dag) og optrappes langsomt over uger til måldosis 200-450 mg dagligt (maksimalt 900 mg dagligt). Behandlingen styres af terapeutisk lægemiddelmonitorering (S-Clozapin terapeutisk interval ca. 1000-2000 nmol/L).',
        receptorAffinities: { 'D2': 1, '5-HT2A': 2, 'H1': 2, 'M1': 2, 'Alfa-1': 2 },
        sideEffects: [
            { symptom: 'Agranulocytose og neutropeni', description: 'Knoglemarvshæmning med fald i neutrofile granulocytter og risiko for livstruende infektioner.', treatment: 'OBLIGATORISK hæmatologisk kontrol (leukocytter og differentialtælling): Hver uge i de første 18 uger, derefter hver 4. uge så længe behandlingen pågår, samt i 4 uger efter seponering. Seponeres straks ved leukocytter < 3,0 x 10^9/L eller neutrofile < 1,5 x 10^9/L.' },
            { symptom: 'Sialoré (hypersalivation)', description: 'Udtalt natlig spytflåd og savlen (rammer op mod 50%). Skyldes formodentlig agonisme på M4-receptorer kombineret med nedsat synkerefleks under søvn.', treatment: 'Lokal antikolinerg behandling: Atropin-øjendråber (1-2 dråber sublingualt til natten) eller peroral pirenzepin / glycopyrronium.' },
            { symptom: 'Gastrointestinal hypomotilitet (Obstipation)', description: 'Potent antikolinerg og 5-HT-blokerende virkning medfører alvorlig risiko for svær obstipation, paralytisk ileus og tarmiskæmi. Kan være fatal, hvis tilstanden overses.', treatment: 'Forebyg aggressivt med laksantia (macrogol/Movicol, evt. kombineret med peristaltikfremmende som natriumpicosulfat). Spørg aktivt til afføringsmønster ved alle kliniske kontroller.' },
            { symptom: 'Myokarditis og kardiomyopati', description: 'Sjælden, men potentielt fatal betændelsestilstand i hjertemusklen, hyppigst inden for de første 2 måneder.', treatment: 'Monitorér troponiner og CRP ved feber, takykardi, dyspnø eller brystsmerter. Optag EKG.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Clozapin)', url: 'https://pro.medicin.dk/Sog/Sog?query=clozapin' }]
    },

    // Antipsykotika (FGA - Første Generation)
    {
        id: 'haloperidol',
        name: 'Haloperidol (Serenase)',
        group: 'Antipsykotika',
        subgroup: 'FGA (Første generation)',
        effect: 'Klassisk højpotent første-generations antipsykotikum (FGA) med ren, kraftig Dopamin D2-blokade. Hurtig og effektiv dæmpning af positive psykotiske symptomer, svær agitation og delir.',
        normalDose: 'Akut svær agitation/delir: 2,5 - 5 mg i.m. (eller p.o. 2-10 mg dagligt fordelt på 1-2 doser). Maks 20 mg dagligt. Intravenøs anvendelse kræver EKG-monitorering pga. QTc-risiko.',
        receptorAffinities: { 'D2': 2, '5-HT2A': 0, 'H1': 0, 'M1': 0, 'Alfa-1': 0 },
        sideEffects: [
            { symptom: 'Akut dystoni og ekstrapyramidale symptomer (EPS)', description: 'Høj risiko for akutte dystonier (torticollis, okulogyre kriser, tunge-kæbespasmer), parkinsonisme (rigiditet, hviletremor, bradykinesi) og på sigt tardive dyskinesier.', treatment: 'Akut antidot ved dystoni: Biperiden (Akineton) 2,5 - 5 mg i.m./i.v. (kuperer krampen inden for få minutter). Vedligeholdende: Dosisreduktion eller skift til SGA.' },
            { symptom: 'Kardiovaskulær risiko (QTc-forlængelse)', description: 'Dosisafhængig forlængelse af QTc-intervallet og risiko for Torsades de Pointes, særligt ved intravenøs administration eller hypokaliæmi.', treatment: 'Optag EKG før og under behandling, især ved i.v. administration. Korriger elektrolytter.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Haloperidol)', url: 'https://pro.medicin.dk/Sog/Sog?query=haloperidol' }]
    },
    {
        id: 'zuclopenthixol',
        name: 'Zuclopenthixol (Cisordinol)',
        group: 'Antipsykotika',
        subgroup: 'FGA',
        effect: 'Middelpotent første-generations antipsykotikum (FGA). Findes som tabletter, som korttidsvirkende depotinjektion (Cisordinol-Acutard) til akut dæmpning af voldsom psykotisk uro/agitation, og som langtidsvirkende depot (Cisordinol Depot) til vedligeholdelsesbehandling ved skizofreni.',
        normalDose: 'Peroral: 10-50 mg dagligt fordelt på 2-3 doser. Acutard i.m.: 50-100 mg (maksimalt 400 mg pr. behandlingsforløb, virker i 2-3 døgn). Depot i.m.: 200-400 mg hver 2.-4. uge.',
        receptorAffinities: { 'D2': 2, '5-HT2A': 1, 'H1': 1, 'M1': 0, 'Alfa-1': 1 },
        sideEffects: [
            { symptom: 'Sedation og ekstrapyramidale symptomer', description: 'Udtalt sedation pga. histamin-H1 og alfa-1-blokade kombineret med ekstrapyramidale symptomer (parkinsonisme, rigiditet).', treatment: 'Acutard anvendes kun til kortvarig akut stabilisering (maks. 4 injektioner over 1-2 uger). Ved langtidsbehandling bør der stiles mod skift til et 2. generations antipsykotikum (SGA) for at bevare kognitiv funktion og reducere EPS-byrden. Biperiden kan gives ved akutte EPS.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Zuclopenthixol)', url: 'https://pro.medicin.dk/Sog/Sog?query=zuclopenthixol' }]
    },

    // Stemningsstabiliserende / Antiepileptika
    {
        id: 'lithium',
        name: 'Lithium',
        group: 'Stemningsstabiliserende',
        subgroup: 'Lithium',
        effect: 'Guldstandard ved stemningsstabiliserende behandling og profylakse af bipolar lidelse samt unikt dokumenteret selvmordsforebyggende effekt. Modulerer intracellulære second-messenger-kaskader (bl.a. inositoltrifosfat og GSK-3). Har et snævert terapeutisk indeks og kræver obligatorisk terapeutisk lægemiddelmonitorering (TDM).',
        normalDose: 'Doseringen styres udelukkende efter 12-timers dalværdi i serum (P-Lithium måles præcis 12 timer efter aftendosis). Typisk målniveau: Vedligeholdelse 0,5 - 0,8 mmol/L (hos ældre ofte 0,4 - 0,6 mmol/L). Akut mani: 0,8 - 1,2 mmol/L.',
        sideEffects: [
            { symptom: 'Intoxikation (Lithium-forgiftning)', description: 'Symptomer starter neurologisk og gastrointestinalt: Grov tremor, dysartri (snøvlet tale), ataksi, nystagmus, diarré og konfusion. Ved svær forgiftning (>1,5-2,0 mmol/L): Kramper, nyresvigt, bevidsthedspåvirkning og arytmier.', treatment: 'Akut seponering. Rigelig intravenøs væskebehandling med isotont saltvand for at fremme renal elimination. Hæmodialyse er indiceret ved svære neurologiske symptomer eller ved serum-lithium typisk > 2,5 - 4,0 mmol/L.' },
            { symptom: 'Renale og thyroideapåvirkninger', description: 'Nedsat renal koncentrationsevne med polyuri og sekundær polydipsi (nefrogen diabetes insipidus), risiko for kronisk nyresygdom (faldende eGFR) samt hypothyreose.', treatment: 'Obligatorisk kontrol af P-Kreatinin, eGFR, P-TSH og væsketal før opstart og regelmæssigt hver 3.-6. måned.' },
            { symptom: 'Dermatologiske gener', description: 'Kan udløse eller forværre psoriasis og akne.', treatment: 'Dermatologisk tilsyn og lokalbehandling. Dosisreduktion ved svære tilfælde.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Lithium)', url: 'https://pro.medicin.dk/Sog/Sog?query=lithium' }]
    },
    {
        id: 'lamotrigin',
        name: 'Lamotrigin',
        group: 'Stemningsstabiliserende',
        subgroup: 'Antiepileptikum',
        effect: 'Effektivt stemningsstabiliserende lægemiddel primært rettet mod profylakse af depressive episoder ved bipolar lidelse type I og II (forhindrer ikke maniske episoder). Anvendes desuden ved epilepsi. Frarådes ved unipolar depression ifølge DMPG 2026.',
        normalDose: 'Optrappes meget langsomt for at minimere risikoen for alvorlige hudreaktioner (typisk 25 mg dagligt i uge 1-2, 50 mg dagligt i uge 3-4, derefter 100 mg dagligt, måldosis 100-200 mg dagligt). OBS: Ved kombination med valproat (hæmmer glucuronidering) skal dosis halveres!',
        sideEffects: [
            { symptom: 'Alvorlige hududslæt (Stevens-Johnsons syndrom / TEN)', description: 'Sjælden, men potentielt fatal overfølsomhedsreaktion med udbredt hudafskalning og slimhindeinvolvering (øjne, mund, genitalia). Optræder oftest inden for de første 8 uger ved for hurtig optrapning.', treatment: 'BEHANDLINGEN SKAL SEPONERES OMGÅENDE ved ethvert tegn på nyt hududslæt, især hvis ledsaget af feber, lymfeknudesvulst eller slimhindelæsioner. Kræver akut lægevurdering.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Lamotrigin)', url: 'https://pro.medicin.dk/Sog/Sog?query=lamotrigin' }]
    },

    // Benzodiazepiner / Angstdæmpende / Sedativa
    {
        id: 'diazepam',
        name: 'Diazepam (Stesolid)',
        group: 'Angstdæmpende / Sedativa',
        subgroup: 'Benzodiazepin',
        effect: 'Klassisk langtidsvirkende benzodiazepin med udtalt anxiolytisk, sedativ, krampestillende og muskelrelakserende virkning. Binder allosterisk til GABA_A-receptorkomplekset og forstærker GABA-transmissionen. Kendetegnet ved en meget lang halveringstid (20-100 timer for modersubstansen, og for den aktive metabolit desmethyldiazepam op til 100-200 timer).',
        normalDose: 'Akut uro/angst p.n.: 2-5 mg (kortvarig brug). Akut svær agitation eller kramper: 5-10 mg (kan gives langsomt i.v., i.m. eller rektalt som klysma).',
        sideEffects: [
            { symptom: 'Tolerans og afhængighed', description: 'Hurtig udvikling af fysiologisk og psykologisk tolerans og afhængighed allerede efter få ugers fast brug.', treatment: 'Behandlingen bør som hovedregel være kortvarig (maks. 1-2 uger) eller p.n. Udtrapning efter længere tids brug skal ske gradvist for at undgå abstinenskramper og delirium.' },
            { symptom: 'Akkumulering og faldrisiko hos ældre', description: 'Grundet lang halveringstid og nedsat hepatisk clearance hos ældre er der stor risiko for akkumulering med sedation, konfusion, ataksi og faldulykker.', treatment: 'Diazepam bør generelt undgås til ældre som beroligende middel. Vælg i stedet et kort- eller mellemvirkende præparat uden aktive metabolitter (fx Oxazepam).' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Diazepam)', url: 'https://pro.medicin.dk/Sog/Sog?query=diazepam' }]
    },
    {
        id: 'lorazepam',
        name: 'Lorazepam',
        group: 'Angstdæmpende / Sedativa',
        subgroup: 'Benzodiazepin',
        effect: 'Mellemvirkende benzodiazepin uden aktive metabolitter. Særligt velegnet sublingualt eller peroralt til den akut agiterede eller angste patient. Omsættes udelukkende ved direkte glukuronidering, hvilket gør det skånsomt for patienter med nedsat leverfunktion.',
        normalDose: 'Peroral / sublingual / i.m.: Typisk 1-2 mg pr. administration (maks. 4 mg dagligt uden forudgående overlægegodkendelse).',
        sideEffects: [
            { symptom: 'Respirationsdepression', description: 'Risiko for respirationsdepression, særligt ved intravenøs administration eller i kombination med andre CNS-depressiva (alkohol, opioider).', treatment: 'Monitorér respirationsfrekvens og saturation. Ved samtidig opioidindgift udvises ekstrem forsigtighed. Antidot ved overdosering er Flumazenil.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Lorazepam)', url: 'https://pro.medicin.dk/Sog/Sog?query=lorazepam' }]
    },

    // ADHD / Centralstimulerende & Non-stimulerende
    {
        id: 'methylphenidat',
        name: 'Methylphenidat (Ritalin/Concerta)',
        group: 'ADHD / Centralstimulerende',
        subgroup: 'Dopamin- og noradrenalingenoptagelseshæmmer',
        effect: 'Centralstimulerende førstevalgspræparat til behandling af ADHD hos børn, unge og voksne. Blokerer præsynaptiske genoptagelsestransportere for dopamin (DAT) og noradrenalin (NET), hvilket øger den synaptiske koncentration i præfrontale cortex og basalganglier. Forbedrer opmærksomhed, impulskontrol og eksekutive funktioner markant.',
        normalDose: 'Optrapning sker ofte med korttidsvirkende tabletter (5-10 mg x 2-3 dagligt) for at finde optimal dosis. Derefter konvertering til depottabletter/kapsler (18-54 mg om morgenen). Vejledende maksimaldosis: Voksne 80-100 mg dagligt, børn op til 2,1 mg/kg/dag (eller 60-90 mg dagligt).',
        sideEffects: [
            { symptom: 'Nedsat appetit og vægttab', description: 'Appetitløshed på medicinens virkningspeak er meget almindelig og kan føre til vægttab og væksthæmning hos børn.', treatment: 'Følg vægt- og vækstkurve nøje. Indtag måltider før medicinindgift om morgenen og tæt på sengetid. "Medicinpauser" i weekender/ferier kan overvejes efter aftale.' },
            { symptom: 'Kardiovaskulære effekter', description: 'Takykardi og stigning i blodtryk pga. sympatomimetisk stimulering. Kan afsløre underliggende arytmier.', treatment: 'Klinisk undersøgelse og EKG forud for opstart. Monitorér puls og blodtryk regelmæssigt (hver 3.-6. måned).' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Methylphenidat)', url: 'https://pro.medicin.dk/Sog/Sog?query=methylphenidat' }]
    },
    {
        id: 'lisdexamfetamin',
        name: 'Lisdexamfetamin (Elvanse)',
        group: 'ADHD / Centralstimulerende',
        subgroup: 'Amfetamin-prodrug',
        effect: 'Prodrug til dextroamfetamin kovalent bundet til L-lysin. Spaltes enzymatisk af røde blodlegemer til aktivt dextroamfetamin, hvilket giver en jævn og forudsigelig terapeutisk profil over 12-14 timer. Den manglende direkte biotilgængelighed ved knusning eller nasal administration minimerer misbrugspotentialet.',
        normalDose: 'Startdosis: 30 mg om morgenen. Kan øges med 20 mg ugentligt til vedligeholdelse 30-70 mg dagligt (maks 70 mg dagligt).',
        sideEffects: [
            { symptom: 'Insomni (søvnforstyrrelser)', description: 'Grundet den lange virkningsvarighed (12-14 timer) kan indtagelse senere på dagen forårsage betydelige indsovningsvanskeligheder.', treatment: 'Skal altid indtages tidligt om morgenen. Ved vedvarende insomni revurderes dosis eller præparat.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Lisdexamfetamin)', url: 'https://pro.medicin.dk/Sog/Sog?query=lisdexamfetamin' }]
    },
    {
        id: 'atomoxetin',
        name: 'Atomoxetin (Strattera)',
        group: 'ADHD / Non-stimulerende',
        subgroup: 'Selektiv noradrenalingenoptagelseshæmmer',
        effect: 'Selektiv noradrenalin-genoptagelseshæmmer (SNRI uden dopaminerg effekt i nucleus accumbens). Non-stimulerende alternativ til ADHD. Har intet misbrugspotentiale og er ikke omfattet af euforiserende stoffer-reglerne. Velegnet ved komorbid angst, tics eller tidligere/aktuelt rusmiddelmisbrug.',
        normalDose: 'Startdosis 40 mg dagligt i 1-2 uger, optitreres til 80-100 mg dagligt (maks 100-120 mg dagligt).',
        sideEffects: [
            { symptom: 'Hepatotoksicitet', description: 'Sjælden, men potentielt alvorlig leverskade er rapporteret.', treatment: 'Informer patienten om at kontakte læge ved tegn på leversygdom (mavesmerter, ikterus, mørk urin). Seponér ved forhøjede levertal.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Atomoxetin)', url: 'https://pro.medicin.dk/Sog/Sog?query=atomoxetin' }]
    },

    // Abstinens / Antidot / Misbrug
    {
        id: 'chlordiazepoxid',
        name: 'Chlordiazepoxid (Risolid)',
        group: 'Abstinensbehandling',
        subgroup: 'Benzodiazepin',
        effect: 'Langtidsvirkende benzodiazepin. Førstevalg ved afrusning og abstinensbehandling ved alkohol- og benzodiazepinabstinenser. Hæmmer CNS-hyperexcitabilitet og forebygger abstinenskramper og delirium tremens.',
        normalDose: 'Doseringsstyret ud fra valideret abstinensscore (fx BAS eller CIWA-Ar): 25-50-100 mg p.o. ved symptomer med intervaller af 1-2 timer, indtil patienten er beroliget og abstinensscoren falder. Aftrappes derefter over 4-7 døgn.',
        sideEffects: [
            { symptom: 'Kumulering og oversedation', description: 'Har aktive metabolitter med meget lang halveringstid (op til 100 timer). Tæt dosering de første 1-2 døgn kan medføre kraftig kumulering og dyb sedation på dag 3-4.', treatment: 'Dosering bør så vidt muligt styres af løbende score (symptom-trigget) frem for faste skemaer. Ved oversedation pauseres medicinen under tæt observation.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Chlordiazepoxid)', url: 'https://pro.medicin.dk/Sog/Sog?query=chlordiazepoxid' }]
    },
    {
        id: 'flumazenil',
        name: 'Flumazenil (Lanexat)',
        group: 'Antidot',
        subgroup: 'Benzodiazepin Antagonist',
        effect: 'Specifik, kompetitiv antagonist på benzodiazepin-bindingsstedet på GABA_A-receptoren. Ophæver hurtigt og selektivt de sedative og respirationsdeprimerende virkninger af benzodiazepiner.',
        normalDose: '0,2 mg i.v. over 15-30 sekunder. Hvis ønsket bevidsthedsniveau ikke opnås inden for 60 sekunder, kan der gives yderligere 0,1 mg med 60 sekunders mellemrum, op til maksimalt 1-2 mg.',
        sideEffects: [
            { symptom: 'Udløsning af akutte abstinenser og status epilepticus', description: 'Hos patienter med kronisk benzodiazepinforbrug eller afhængighed vil flumazenil momentant fremkalde svære abstinenser med høj risiko for behandlingsresistente kramper og status epilepticus. Ligeledes farligt ved blandingsforgiftning med tricykliske antidepressiva (TCA).', treatment: 'Flumazenil er kontraindiceret ved mistanke om kronisk benzodiazepinmisbrug eller samtidig TCA-intoksikation. I disse tilfælde sikres luftveje og ventilation understøttes frem for anvendelse af antidot.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Flumazenil)', url: 'https://pro.medicin.dk/Sog/Sog?query=flumazenil' }]
    },
    {
        id: 'naloxon',
        name: 'Naloxon',
        group: 'Antidot',
        subgroup: 'Opioid Antagonist',
        effect: 'Kompetitiv opioid-antagonist med høj affinitet for my-opioidreceptorer. Livreddende antidot ved opioidoverdosering med respirationsstop eller svær bevidsthedspåvirkning.',
        normalDose: '0,4 - 0,8 mg i.v. (eller i.m. / subkutant / som næsespray). Dosis kan gentages med 2-3 minutters interval, indtil spontan og tilstrækkelig respiration er genetableret.',
        sideEffects: [
            { symptom: 'Re-sedation (relaps)', description: 'Naloxon har en kort plasmahalveringstid (ca. 30-60 minutter), hvilket er markant kortere end de fleste opioider (fx metadon og morfin). Patienten risikerer at glide tilbage i respirationsstop, når naloxon udvaskes.', treatment: 'Patienten skal observeres i mindst 4-6 timer (ved depot/metadon længere). Ved recidiverende respirationsdepression opstartes kontinuerlig i.v. Naloxon-infusion.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Naloxon)', url: 'https://pro.medicin.dk/Sog/Sog?query=naloxon' }]
    },
    {
        id: 'disulfiram',
        name: 'Disulfiram (Antabus)',
        group: 'Misbrugsbehandling',
        subgroup: 'Acetaldehyddehydrogenase-hæmmer',
        effect: 'Aversiv behandling af alkoholafhængighed. Hæmmer enzymet acetaldehyd-dehydrogenase irreversibelt, hvilket medfører akkumulering af toksisk acetaldehyd ved samtidig alkoholindtagelse og udløser en kraftig fysisk ubehagsreaktion.',
        normalDose: 'Startdosis: Typisk 800 mg p.o. som enkeltdosis første dag, derefter vedligeholdelse med 400 mg 2 gange ugentligt eller 200 mg dagligt under overvågning.',
        sideEffects: [
            { symptom: 'Disulfiram-alkohol-reaktion (DER)', description: 'Flush (ansigtsrødme), pulserende hovedpine, takykardi, hypotension, dyspnø, kvalme og opkastning. Ved store mængder alkohol kan reaktionen udvikle sig til kardiovaskulært kollaps og arytmi.', treatment: 'Behandling kræver patientens fulde informerede samtykke og motivation. Ved svær reaktion: Sengeleje, ilt, intravenøs væskebehandling og symptomatisk behandling under monitorering.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Disulfiram)', url: 'https://pro.medicin.dk/Sog/Sog?query=disulfiram' }]
    }
];
