export const PSYKOFARMAKA_DATA = [
    // Skift og Udtrapning (Switchtabel)
    {
        id: 'switchtabel_antidepressiva',
        name: 'Medicinskift (Switchtabel)',
        group: 'Antidepressiva',
        subgroup: 'Krydstiltrædelse & Seponering',
        effect: 'Ved skift mellem forskellige antidepressiva (fx SSRI til SNRI eller NaSSA) er det afgørende at følge korrekte retningslinjer for overlappende dosering, udtrapning og wash-out perioder. Dette gøres for at forhindre farlige interaktioner ned til receptorniveau og for at minimere patientens seponeringssymptomer.',
        normalDose: 'Brug altid den interaktive hollandske "Switchtabel" til at slå det specifikke skift op (fra lægemiddel A til lægemiddel B). Tabellen viser præcis hvornår man går ned, holder pause, og starter det nye.',
        featuredLink: {
            title: 'Åbn Switchtabel.nl',
            description: 'Slå direkte op mellem to præparater for at se korrekt overlappende dosering.',
            url: 'https://www.psychiatrienet.nl/switchtabel'
        },
        sideEffects: [
            { symptom: 'Serotonergt Syndrom', description: 'Livstruende tilstand med kognitive (konfusion), autonome (feber, sved) og somatiske (rigiditet, hyperrefleksi, klonus) symptomer. Udløses af overskud af serotonin – klassisk ved skift uden tilstrækkelig udvaskning.', treatment: 'Seponér omgående alle serotonerge midler! Kræver akut indlæggelse til støttende/kølende behandling og evt. benzodiazepin/cyproheptadin.' },
            { symptom: 'Seponeringssyndrom', description: 'Fysisk abstinenslignende tilstand (influenzasymptomer, svimmelhed, elektriske stød "brain-zaps" i hovedet) udløst ved for brat reduktion.', treatment: 'Langsommere udtrapning. Kan især være kritisk ved stoffer med kort halveringstid som Venlafaxin og Paroxetin.' }
        ],
        sources: [{ title: 'Psychiatrienet.nl (Switchtabel)', url: 'https://www.psychiatrienet.nl/switchtabel' }]
    },
    // Antidepressiva (SSRI)
    {
        id: 'sertralin',
        name: 'Sertralin',
        group: 'Antidepressiva',
        subgroup: 'SSRI',
        effect: 'Selektiv Serotonin Reuptake Inhibitor (SSRI). Øger serotonerg neurotransmission ved at hæmme genoptagelsen i den præsynaptiske nerveterminal. Anvendes især som førstevalg til moderat/svær depression, samt bredspektret mod generaliseret angst, panikangst, socialfobi og OCD. God sikkerhedsprofil ved hjertesygdom.',
        normalDose: 'Depression/Angst: Start dosis 25-50 mg (25 mg ved panikangst for at undgå aktiveringsangst). Øges med 50 mg hver 1-2 uge. Vedligeholdelsesdosis 50-100 mg dgl., max 200 mg. OCD: Kræver ofte højere dosering (op til 200 mg dgl). Seponeres via ugevis nedtrapning.',
        sideEffects: [
            { symptom: 'Gastrointestinale gener', description: 'Kvalme, diarré, reduceret appetit. Forekommer hyppigst i de første 1-2 uger.', treatment: 'Startdosis minimeres ved langsom optrapning. Information om forbigående natur ("the worst comes first"). Kan lindres ved indtagelse i forbindelse med måltid.' },
            { symptom: 'Seksuel dysfunktion', description: 'Meget hyppig (ofte >50%). Nedsat libido, anorgasmi, forsinket ejakulation hos mænd.', treatment: 'Dosisreduktion hvis klinisk forsvarligt. Ellers overvej tillæg (Tadalafil p.n.) eller skift af/kombination med præparat uden sexologisk sløvende effekt (Mirtazapin, Vortioxetin, Bupropion, Agomelatin).' },
            { symptom: 'Søvnforstyrrelser / Aktivering', description: 'Insomni (især tidligt), træthed eller emotionel afstumpning ("blunting").', treatment: 'Adfærd: Dosis gives morgen ved insomni, aften ved træthed.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Sertralin)', url: 'https://pro.medicin.dk/Sog/Sog?query=sertralin' }]
    },
    {
        id: 'citalopram',
        name: 'Citalopram',
        group: 'Antidepressiva',
        subgroup: 'SSRI',
        effect: 'SSRI. Har historisk været meget udbredt i almen praksis mod depression og panikangst. Vær dog obs på hjertesikkerhed hos ældre sammenlignet med Sertralin.',
        normalDose: 'Startdosis 10-20 mg dgl. Vedligeholdelse 20-40 mg (max 40 mg dgl). VIGTIGT: Max 20 mg/dgl hos ældre >65 år og ved nedsat leverfunktion pga. forlænget halveringstid og dermed øget QTc-risiko.',
        sideEffects: [
            { symptom: 'QTc-forlængelse', description: 'Dosisafhængig risiko for forlænget QTc-interval, som kan lede til Torsades de Pointes (livstruende arytmi).', treatment: 'Mål EKG før opstart hos disponerede / ældre, og gentag ved dosisjustering. Udeluk hypokaliæmi. Undgå samtidig brug af andre overvejende QTc-forlængende stoffer (amiodaron, antipsykotika, makrolider m.fl.).' },
            { symptom: 'Svedtendens', description: 'Øget svedtendens ses som en almen serotonerg effekt.', treatment: 'Information og reassurance. Undgå syntetisk tøj.' },
            { symptom: 'Gastrointestinale gener', description: 'Kvalme og mavesmerter i opstartsfasen.', treatment: 'Opstart med skånsom, gradvis dosisøgning.' },
            { symptom: 'Hyponatriæmi (SIADH)', description: 'Risiko for forstyrrelser i ADH-sekretion, især hos ældre.', treatment: 'Mål elektrolytter (P-Na) hvis patienten udvikler letargi, konfusion eller muskelkramper.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Citalopram)', url: 'https://pro.medicin.dk/Sog/Sog?query=citalopram' }]
    },
    {
        id: 'escitalopram',
        name: 'Escitalopram',
        group: 'Antidepressiva',
        subgroup: 'SSRI',
        effect: 'S-enantiomeren (den biologisk aktive form) af Citalopram, hvilket gør det til et mere specifikt og potent (kræver det halve i milligram) SSRI. Udbredt afledt præparat med færre interaktioner og muligvis hurtigere indsættende effekt hos nogle.',
        normalDose: 'Startdosis 5-10 mg. (5 mg ved panikangst). Vedligeholdelse 10-20 mg (max 20 mg dgl). VIGTIGT: Max 10 mg/dgl hos ældre >65 år.',
        sideEffects: [
            { symptom: 'Hjerte (QTc-interval)', description: 'Som Citalopram indebærer Escitalopram også risiko for dosisafhængig QTc-forlængelse.', treatment: 'Følg samme forsigtighedsregler for EKG før/under behandling som beskrevet for Citalopram, specielt for risikogrupper.' },
            { symptom: 'Øvrige Serotonerge', description: 'Gastrointestinale (kvalme), seksuelle (nedsat libido), blødningsrisiko osv. Lige som øvrige SSRI.', treatment: 'Måltidsindtagelse / overvej tillæg el skift. Forsigtighed med NSAID.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Escitalopram)', url: 'https://pro.medicin.dk/Sog/Sog?query=escitalopram' }]
    },
    {
        id: 'fluoxetin',
        name: 'Fluoxetin',
        group: 'Antidepressiva',
        subgroup: 'SSRI',
        effect: 'Doseringsvenligt SSRI kendetegnet ved en usædvanlig lang halveringstid (ofte præparatvalg ved uregelmæssig medicinindtagelse, non-compliance eller hos børn/unge). Godkendt specifikt til behandling af Bulimia Nervosa udover depression og TOCD.',
        normalDose: 'Depression/Angst: Start 20 mg dgl, stigende til 20-60 mg. Bulimi: Typisk behandlet i den højere skala, ca. 60 mg dgl pga manglende affekt på de lave mg doser. Pga. de aktive metabolitter (norfluoxetin) tager det uger før steady state opnås.',
        sideEffects: [
            { symptom: 'Neuropsykiatrisk aktivering', description: 'Agitation, søvnløshed (især startfase). Øger risiko evt. paradoksalt udløst angst mere udpræget end andre SSRI.', treatment: 'Doseres om morgenen! Optrap og overvåg nøje for svær angst, specielt hos unge.' },
            { symptom: 'Anergisk effekt / Vægt', description: 'I modsætning til mange modifikationer opnås der en "aktiverende" energigivende tilstand, og til tider forårsager det vægttab.', treatment: 'Overvej dette lægemiddel positivt ved dominerende træthed/apati som depressivt symptom.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Fluoxetin)', url: 'https://pro.medicin.dk/Sog/Sog?query=fluoxetin' }]
    },

    // Antidepressiva (SNRI)
    {
        id: 'venlafaxin',
        name: 'Venlafaxin',
        group: 'Antidepressiva',
        subgroup: 'SNRI',
        effect: 'Serotonin- og Noradrenalin Reuptake Inhibitor (SNRI). Virkningsprofilen er dosisafhængig: Op til ca. 150 mg virker det primært serotonergt som et SSRI. Først ved højere doser (>150 mg) begynder en klinisk betydelig hæmning af noradrenalin-genoptagelsen for alvor at fremstå. Anvendes især ved svær, behandlingsresistent depression.',
        normalDose: 'Startdosis: 75 mg dgl (depotkapsel anbefales for færre bivirkningsudsving). Vedligeholdelsesdosis: 75-225 mg (til tider op til 375 mg under specialistkontrol i fuldt udbyggede svære tilfælde).',
        sideEffects: [
            { symptom: 'Kardiovaskulært', description: 'Noradrenerg effekt medfører dosisafhængig blodtryksstigning og takykardi.', treatment: 'Mål puls og BT før opstart og især jævnligt ved doser >150mg. Undgå eller seponér ved utilstrækkeligt behandlet hypertension.' },
            { symptom: 'Ekstremt Seponeringssyndrom', description: 'På grund af dets meget korte halveringstid (selv for depot) udløser et missende døgn ofte voldsomme seponeringssymptomer i form af "brain zaps" (stød-lignende fornemmelser i hovedet), stærk svimmelhed, og influenzalignende myalgier.', treatment: 'Aftrapning skal foregå _ubeskriveligt_ langsomt, ned til meget små doser (off-label) eller ved et midlertidigt dækkende SSRI overlappende.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Venlafaxin)', url: 'https://pro.medicin.dk/Sog/Sog?query=venlafaxin' }]
    },
    {
        id: 'duloxetin',
        name: 'Duloxetin',
        group: 'Antidepressiva',
        subgroup: 'SNRI',
        effect: 'SNRI med mere symmetrisk balancering af serotonin/noradrenalin effekten allerede i de lavere testværdier. Har udover psykiatrisk virkning på depression og GAD udvist særdeles god og dokumenteret effekt i forhold til smertemodulation af kroniske smertetilstande (fx diabetisk neuropati og fibromyalgi).',
        normalDose: 'Depression/kroniske smerter: Startdosis 30-60 mg dgl. Max 120 mg. Bemærk at depotkapsler ikke må tygges/knuses da det deaktiverer beskyttelsen mod mavesyrer.',
        sideEffects: [
            { symptom: 'Kraftig initial kvalme', description: 'Kvalme er rapporteret som meget markant hos over 20% af patienter de første uger.', treatment: 'Det er ofte klogt at starte ekstremt blødt med 30 mg den første uge for at øge compliance før evt stigning.' },
            { symptom: 'Urologisk', description: 'Urinretention - Vandladningsbesvær (grundet øget sfinkter-tonus fra noradrenalin).', treatment: 'Obs hos ældre mænd m. kendt prostatahypertrofi. Urin-retention vil oftest kræve seponering.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Duloxetin)', url: 'https://pro.medicin.dk/Sog/Sog?query=duloxetin' }]
    },

    // Antidepressiva (NaSSA / Andre)
    {
        id: 'mirtazapin',
        name: 'Mirtazapin',
        group: 'Antidepressiva',
        subgroup: 'NaSSA',
        effect: 'Noradrenergt og specifikt serotonergt antidepressivum (NaSSA). Virker primært via blokade af centrale alfa-2-receptorer, som forhindrer den negative feedback i synapsespalten (dermed fritsættes mere serotonin + noradrenalin stærkt). Antagonistisk for visse 5HT-receptorer, hvilket reducerer angst/kvalme, og besidder slet ikke de klassiske bivirkninger med manglende libido!',
        normalDose: 'Startdosis: Typisk 15-30 mg til natten. Vedligeholdelse: 15-45 mg dgl.',
        sideEffects: [
            { symptom: 'Metabolisk', description: 'Markant og meget hyppigt (og potent underkendt) problem via især 5-HT2C-antagonisme; inducerer kulhydrat-cravings og svær vægtøgning.', treatment: 'Skærpet opmærksomhed! Hos deprimerede med lavt BMI som en start-anormalitet er Mirtazapin dog ofte gavnligt netop baseret på denne virkningsprofil.' },
            { symptom: 'Klinisk paradoksal sedation (Antihistamin)', description: 'Mirtazapin blokkerer H1 receptorer udtalt. Dette mættes dog meget hurtigt. Den voldsomme "hang-over" sedation dagen efter ses derfor PARADOKSALT mere udtalt på de mindste doser (15 mg), hvorimod høje doser (45 mg) resulterer i formindsket træthed fordi de aktiverende noradrenerge systemer tager mere over.', treatment: 'Doseres generelt tæt ind til sengetid for at udnytte den sove-forbedrende virkning.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Mirtazapin)', url: 'https://pro.medicin.dk/Sog/Sog?query=mirtazapin' }]
    },

    // Antipsykotika (Generel Info)
    {
        id: 'receptor_info_antipsykotika',
        name: 'Receptorprofiler (Info)',
        group: 'Antipsykotika',
        subgroup: 'Klasserelateret farmakologi',
        isInfoComponent: true,
        effect: 'Dette opslag indeholder information om de generelle mekanismer for antipsykotisk medicin og hvordan blokering af forskellige receptorer hænger sammen med både klinisk effekt og bivirkninger.',
        normalDose: '',
        sideEffects: [],
        sources: []
    },
    // Antipsykotika (SGA)
    {
        id: 'quetiapin',
        name: 'Quetiapin',
        group: 'Antipsykotika',
        subgroup: 'SGA (Anden generation)',
        effect: 'Atypisk antipsykotikum (SGA). Antagonistisk primært på 5-HT2A og i mindre grad D2 receptorer (hvilket giver lav risiko for EPS). Har desuden en kraftig antihistaminerg (H1) og alfa-1-adrenerg blokerende virkning, som klinisk udnyttes flittigt til søvn/uro.',
        normalDose: 'Skizofreni: 300-800 mg dgl (ofte depot for jævnt spejl). Bipolar/Depression (add-on): 150-300 mg. Angstdæmpende/Søvn (off-label anvendt systematisk): 25-50 mg.',
        receptorAffinities: { 'D2': 1, '5-HT2A': 1, 'H1': 2, 'M1': 1, 'Alfa-1': 2 },
        sideEffects: [
            { symptom: 'Udtalt Sedation', description: 'Svært nedsat energiniveau, "hang-over" og sedation pga. potent H1-blokade.', treatment: 'Doseres overvejende aften/nat. Start altid meget lavt (fx 25 mg).' },
            { symptom: 'Metabolisk Syndrom', description: 'Øget appetit, vægtøgning og udtalt risiko for dyslipidæmi samt diabetes type 2 udvikling.', treatment: 'Systematisk screening af metabolisk profil (vægt, lipider, HbA1c, EKG) min. årligt.' },
            { symptom: 'Alfa-1 Antagonisme (Svimmelhed)', description: 'Kan give dosisafhængig, potent ortostatisk hypotension.', treatment: 'Langsom optrapning. Information til patienten om at skifte stilling (liggende til stående) langsomt.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Quetiapin)', url: 'https://pro.medicin.dk/Sog/Sog?query=quetiapin' }]
    },
    {
        id: 'olanzapin',
        name: 'Olanzapin',
        group: 'Antipsykotika',
        subgroup: 'SGA',
        effect: 'Særdeles potent, bredspektret atypisk antipsykotikum (SGA). Førstevalg til akutte psykoser, svære maniske faser og som systemisk mani-profylaktikum grundet hurtigt indsættende dæmpende effekt.',
        normalDose: 'Startdosis: 5-10 mg dgl (ofte fordelt over to doser i akut fasen). Vedligeholdelse: 10-20 mg dgl.',
        receptorAffinities: { 'D2': 2, '5-HT2A': 2, 'H1': 2, 'M1': 2, 'Alfa-1': 1 },
        sideEffects: [
            { symptom: 'Metabolisk (Sværrisiko!)', description: 'Klassens absolut "tungere" dreng ift. kardiometabolisk påvirkning. Relateret til >10% vægtøgning, induktion af insulinresistens.', treatment: 'Tæt klinisk vægt/BMI + lipid/glukose kontrol især det første halve år. Metformin profylakse kan overvejes tidligt, især hvis BMI > 27-30 under stigning. Diætishenvisning.' },
            { symptom: 'H1 / Sedation og Anticholinerg', description: 'Kraftig sedation og mild mundtørhed/obstipation pga multireceptor påvirkning.', treatment: 'Døgndosis placeres til natten for at udnytte den søvngivende effekt profylaktisk mod insomni.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Olanzapin)', url: 'https://pro.medicin.dk/Sog/Sog?query=olanzapin' }]
    },
    {
        id: 'aripiprazol',
        name: 'Aripiprazol',
        group: 'Antipsykotika',
        subgroup: 'SGA',
        effect: 'Unik partiel D2-agonist (stabiliserer receptoren; blokerer ved overskud, stimulerer let ved underskud). Giver i modsætning til stort set alle andre SGA/FGA et "aktiverende/vågent" niveau med markant færre metaboliske og hæmmende bivirkninger.',
        normalDose: 'Startdosis: 10-15 mg dgl. Max 30 mg. Giver som udgangspunkt en fænomenal negativ-symptom virkning.',
        receptorAffinities: { 'D2': 3, '5-HT2A': 1, 'H1': 0, 'M1': 0, 'Alfa-1': 0 }, // 3 indicating partial agonist
        sideEffects: [
            { symptom: 'Akatisi (Myrekryb)', description: 'Ekstrem indre uro/rastløshed specielt placeret i muskulaturen/benene. Hyppig (kommer ofte tidligt inden for 1-2 uger) og bliver TRAGISK FEJLTOLKET som forværring af patientens angst eller psykose-agitation.', treatment: 'Erkend og diagnosticer korrekt (modsat agitation, er akatisi fysisk motorisk bunden). Reduktion af aktiv dosis, eller medicinsk modgift i form af b-blokker (Propranolol 10-20mg p.n.) eller kortvarigt low-dose Mirtazapin/Benzo.' },
            { symptom: 'Aktivering / Insomni', description: 'Mangler sedationsaffekten; virker let speedende / "vågenheds-promoverende" ift trætheden associeret med skizofreni.', treatment: 'Doseres KUN morgen; skærpet opmærksomhed ved opstart hos i forvejen manieradede / overaktive pt.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Aripiprazol)', url: 'https://pro.medicin.dk/Sog/Sog?query=aripiprazol' }]
    },
    {
        id: 'risperidon',
        name: 'Risperidon',
        group: 'Antipsykotika',
        subgroup: 'SGA',
        effect: 'Hyppigt anvendt potent D2 og 5-HT2A antagonist. "Bindeleddet" mellem 1. generation (dopamin-blokkerende EPS) og atypiske SGA. Bruges udtalt som akut beroligende v/ demens i lav-dosis og oftest første line i autisme-relateret udadreagerende adfærd hos børn.',
        normalDose: 'Psykose: 2-6 mg dgl (kræver titrering). Børne/Demens psykiatri (aggression): ekstremt små doser 0,25 - 1,5 mg dgl.',
        receptorAffinities: { 'D2': 2, '5-HT2A': 2, 'H1': 0, 'M1': 0, 'Alfa-1': 1 },
        sideEffects: [
            { symptom: 'Endokrin / Hyperprolaktinæmi', description: 'Udtalt stigning i P-prolaktin resulterende i udvikling af bryster hos mænd (gynækomasti), mælkeudskyl v/ikke-gravide, libidostab, amaneoré og knogleskørhed over sigt.', treatment: 'Screen/Mål prolaktin v/ symptomer. Oftest kræves behandlingsskifte (fx til det prolaktin-sænkende Aripiprazol) for at stoppe hormonforstyrrelsen.' },
            { symptom: 'Ekstrapyramidale (EPS)', description: 'Oftest over 4-6 mg / dgl mister risperidon dets atypiske (SGA) EPS-beskyttende fordel via 5-HT2A og slår fuldt igennem som et klassisk FGA (tremor, stivhed).', treatment: 'Dosisreduktion. Alternativt tillæg af det centrale antikolinergikum Biperiden (Akineton 2mg 1-2x dgl) symptombehandlende.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Risperidon)', url: 'https://pro.medicin.dk/Sog/Sog?query=risperidon' }]
    },
    {
        id: 'clozapin',
        name: 'Clozapin',
        group: 'Antipsykotika',
        subgroup: 'SGA',
        effect: 'Guldkalven i antipsykotisk præparater. Er signifikant *overlegen* alle markedsførte andre antipsykotika (reducerer selvmordsrisikoen markant!), men reserveres til behandlingsresistent skizofreni pga et potentielt livstruende (men velkontrolleret) bivirkningsspektrum.',
        normalDose: 'Startes stort set udelukkende under indlæggelse. Dosis optitrieres til 200-450 mg (Max 900 mg ekstremt). Kontinuerlig overvågning af spejl (S-Clozapin).',
        receptorAffinities: { 'D2': 1, '5-HT2A': 2, 'H1': 2, 'M1': 2, 'Alfa-1': 2 },
        sideEffects: [
            { symptom: 'Agranulocytose', description: 'Knoglemarvshæmning/neutropeni – tab modstand ift. infektion (potentielt fatalt immundefekt syndrom).', treatment: 'OBLIGATORISK stringent ugentlig (senere månedlig) L+D / CRP differentialtælling for hvide blodlegemer jvf. Clozapin-registrerets standarder.' },
            { symptom: 'Sialoré (Øget Mundvand) & Parasympatisk effekt', description: 'En udtalt, paradoksal hypersalivation (ofte massivt klagepunkt / voldsomt generende især under søvn) pga mistænkt agonisme på M4-receptorer, på trods af andre antikolinerge effekter.', treatment: 'Medicinsk modbehandling via antikolinergika er the go-to: Specifik M1 evt lokal Pirenzepin. Atropin-øjendråber lægges Sub-lingualt natlig under tungen (lokal effekt!). Glycopyrronium er også markedsført ofte til bedring.' },
            { symptom: 'Kardielt / Obstipation', description: 'Myokarditis risiko (monitorér C-reaktiv prot/troponiner ved opstart), og voldsomt farlig gastroparese/obstipation opstået via anti-M1 og serotonin-H1', treatment: 'FOREBYG obstipation aggressivt med dobbelt laksantia-regime (Movicol + Laxoberal). Pt. dør af ileus, hvis stoppet underkendes.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Clozapin)', url: 'https://pro.medicin.dk/Sog/Sog?query=clozapin' }]
    },

    // Antipsykotika (FGA)
    {
        id: 'haloperidol',
        name: 'Haloperidol (Serenase)',
        group: 'Antipsykotika',
        subgroup: 'FGA (Første generation)',
        effect: 'Prototypen på højpotent første-generations antipsykotikum (FGA) med ren, kraftig (og dermed farlig bivirkningsmæssigt) blokade af Dopamin-2 specielt. Giver ro i hjernen/stop i hallucinationer.',
        normalDose: 'Akut roterende agitation/delir (IM / IV): 2,5 - 5 mg (max 10-15 mg/døgn u. EKG-obs).',
        receptorAffinities: { 'D2': 2, '5-HT2A': 0, 'H1': 0, 'M1': 0, 'Alfa-1': 0 },
        sideEffects: [
            { symptom: 'Akut Dystoni/Ekstrapyramidale Bivirkninger (EPS)', description: 'Fulminant, invaliderende motoriske EPS: Torticollis (halsvrang), okulogyre kriser (rullende øjne låst), stivhed (Parkinsonisme). Livstids risiko for TD (tardive dyskinesier som tiks i læbe/tunge/mund).', treatment: 'AKUT antidot er nødvendig: Biperiden (Akineton) 2,5 - 5 mg Intramuskulært (løser spasm-vridet efter få min!). Forebyg kronisk EPS ved at give lavere doser tidsbegrænset, eller skifte til SGA.', },
            { symptom: 'Kardiovaskulær (Malign)', description: 'Dosisafhængig QTc-forlængelse der særligt ses klinisk relevant ved INTRAVENØS haloperidol indgivelse.', treatment: 'Telemetri og EKG hvis anvendt intravenøst; tænk elektrolytbalancen ind før givning.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Haloperidol)', url: 'https://pro.medicin.dk/Sog/Sog?query=haloperidol' }]
    },
    {
        id: 'zuclopenthixol',
        name: 'Zuclopenthixol (Cisordinol)',
        group: 'Antipsykotika',
        subgroup: 'FGA',
        effect: 'Midt / Lavpotent typisk (FGA) antipsykotikum. Ganske udbredt som IM depotinjektion (Cisordinol Depot) til fastholdelse af skizofrendes behandling ved compliance-svigt samt Cisordinol-Acutard medicin mod eksplosiv, voldelig psykose man ønsker nedstiret i løbet ad timer.',
        normalDose: 'Acutard (IM Depot kortsigtet eff): Typisk 50-100 mg for en 2-3 dages dyb sedation. Peroral dgl: 10-50 mg.',
        receptorAffinities: { 'D2': 2, '5-HT2A': 1, 'H1': 1, 'M1': 0, 'Alfa-1': 1 },
        sideEffects: [
            { symptom: 'Blytung Motorisk Sedition', description: 'Både klassisk parkinsonisme (EPS stivhed), men pga Alpha-1/H1-blokaden i høj grad en ekstrem form for sløvhed. Forringer negativ-symptomer udtalt ("Zombified").', treatment: 'Cisordinol er et fantastisk "Bremse-lægemiddel" akut som "kemisk spændetrøje", men langtidsterapi bør ideelt stiftes for et mildere SGA lægemiddel når tilstanden stabiliseres for at værne om den kognitive funktion og livskvalitet. Tillæg evt Biperiden ved slem rigiditet.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Zuclopenthixol)', url: 'https://pro.medicin.dk/Sog/Sog?query=zuclopenthixol' }]
    },

    // Stemningsstabiliserende / Antiepileptika
    {
        id: 'lithium',
        name: 'Lithium',
        group: 'Stemningsstabiliserende',
        subgroup: 'Lithium',
        effect: 'Førstevalg og veldokumenteret "Golden Standard" ved forebyggelse og behandling af Bipolar Lidelse, samt unikt selvmordsforebyggende. Modulerer second-messenger systemer (bl.a. inositoltrifosfat). Har et uhyre smalt terapeutisk indeks.',
        normalDose: 'Oftest 600-1200 mg (fordelt på 1-2 doser). VIGTIGT: Doseringen styres KUN ud fra blodprøvespejl (P-Lithium) fremfor mg. Mål er 0,6 - 0,8 mmol/L.',
        sideEffects: [
            { symptom: 'Intoxikation (Livsfare)', description: 'Symptomer starter som neurologiske: Grov tremor, utydelig tale, ataksi, nystagmus, konfusion og evt. opkast/diarré. Livstruende kramper, koma og hjertestop ved konc. typisk >1,5 mmol/L.', treatment: 'Spejl fastholdes strengt (0,6-0,8 mmol/L). Væskemangel/dehydrering + NSAID og tiazider LØFTER spejlet. Behandling: Seponering omgående, saltvand IV, og oftest regelret dialyse ved spejl > 2,0 mmol/L.' },
            { symptom: 'Nyre/Thyroidea', description: 'Nedsat renal koncentrationsevne inducerer polyuri og sekundær polydipsi (nefrogen diabetes insipidus). Kan også give blivende nedsat eGFR (Nyresvigt) og Hypothyreose.', treatment: 'Rutinæssig klinisk TSH / Kreatinin overvågning (halvårligt minimum).' },
            { symptom: 'Psoriasis / Acne', description: 'Kendt for at kunne reaktivere og forværre hudsygdomme.', treatment: 'Henvis evt til dermatolog.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Lithium)', url: 'https://pro.medicin.dk/Sog/Sog?query=lithium' }]
    },
    {
        id: 'lamotrigin',
        name: 'Lamotrigin',
        group: 'Stemningsstabiliserende',
        subgroup: 'Antiepileptikum',
        effect: 'Effektivt stemningsstabiliserende primært rettet imod profylakse af _depressive_ episoder ved Bipolar lidelse (men forhindrer ikke manier synderligt). Bruges også ved epilepsi.',
        normalDose: 'Optrappes EKSTREMT STRATEGISK langsomt (oftest kun 25 mg hver 2. uge) til oftest 100-200 mg/dag (voksne uden VPA-interaktion).',
        sideEffects: [
            { symptom: 'Livstruende Hududslæt (SJS)', description: 'Allergisk hypersensitivitet: Stevens-Johnson syndrom eller Toksisk epidermal nekrolyse (Lyell syndrome). Oftest trigget ved for hurtig optrapning, specielt i kombination med valproat.', treatment: 'SKAL SEPONERES OMGÅENDE og vurderes mhp. indlæggelse ved enhver tegn til HELE KROPS UDSLÆT især på slimhinder (øjne/mund) eller ledsagede influenzasymptomer/feber.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Lamotrigin)', url: 'https://pro.medicin.dk/Sog/Sog?query=lamotrigin' }]
    },

    // Benzodiazepiner / Angstdæmpende / Søvn
    {
        id: 'diazepam',
        name: 'Diazepam (Stesolid)',
        group: 'Angstdæmpende / Sedativa',
        subgroup: 'Benzodiazepin',
        effect: 'Klassisk angstdæmpende og muskelafslappende benzodiazepin. Binder (GABA_A - allosterisk) til komplekset og øger inhibitorisk kloridkanal-åbning. Præparatet er decideret berygtet for dets uhyrligt lange halveringstid (ofte over 100 timer inklusiv dets markante aktive metabolit desmethyldiazepam).',
        normalDose: 'Let uro/angst (P.N): 2-5 mg (kortvarigt brug). Akut svær uro / kramper: 10 mg (kan da gives IV langsomt, IM eller rektalt).',
        sideEffects: [
            { symptom: 'Tilvænning & Abstinens', description: 'Massiv fysiologisk og psykologisk toleransudvikling og afhængighed – ("benzo-afhængighed").', treatment: 'Regimet må som udgangspunkt absolut kun løbe tidsbegrænset og kortvarigt under en måned som hovedregel (eller kun p.n). Håndter seponering over LANG tid da hurtigt stop kan medføre status epilepticus.' },
            { symptom: 'Risiko for Ældre (Fald/Koma)', description: 'Akkumulerer og lagrer sig enormt grundet svindende leverfunktion (nedsat CYP evne). Døsighed, motorisk svigt og respirations-understøttelse.', treatment: 'GIV ALDRIG DIAZEPAM TIL ÆLDRE SOM BEROLIGENDE uden absolut exceptionel grund. Konverter hellere til Oxazepam (som ikke har aktive metabolitter) eller brug SGA.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Diazepam)', url: 'https://pro.medicin.dk/Sog/Sog?query=diazepam' }]
    },
    {
        id: 'lorazepam',
        name: 'Lorazepam',
        group: 'Angstdæmpende / Sedativa',
        subgroup: 'Benzodiazepin',
        effect: 'Middel/kortvirkende benzodiazepin. Særlig udbredt sublingualt/po til den absolut akutte agiterede/angste patient pga fravær af mærkbare aktive metabolitter og en meget fornuftig profil i forhold til belastning af leveren.',
        normalDose: 'IM/Peroral/sublingual: typisk 1 til max 2,5 mg pr. administration.',
        sideEffects: [
            { symptom: 'Respirationshæmning (Farlig cocktail)', description: 'Især ved IV og i kombination med CNS-depressiva (som alkohol eller især opioider) kan respirationen fatalt paralyseres fuldstændigt.', treatment: 'Mål kontinuerligt respirationsfrekvens / ilt-SAT. Har patienten fået metadon/heroin er BZ stærkt kontraindiceret indtil de er metaboliseret eller der gives Naloxon. Antidot ved overdosering er Flumazenil.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Lorazepam)', url: 'https://pro.medicin.dk/Sog/Sog?query=lorazepam' }]
    },

    // ADHD
    {
        id: 'methylphenidat',
        name: 'Methylphenidat (Ritalin/Concerta)',
        group: 'ADHD / Centralstimulerende',
        subgroup: 'Dopamin genoptagelseshæmmer',
        effect: 'Systemisk centralstimulerende. Blokerer præsynaptiske transportproteiner for dopamin og noradrenalin (re-uptake inhibitor). Bedrer markant den eksekutive funktion, mindsker motorisk uopmærksomhed og hyperaktivitet. Gylden standard.',
        normalDose: 'Startdosis: Kortvirkende 5-10 mg x 2-3 / dgl. Modificeret frigivelse (Depot): Start oftest 18-36 mg, titreres op til et "sweet spot" – for voksne op mod max 80-100 mg (officielt 60 mg m. forbehold).',
        sideEffects: [
            { symptom: 'Anoreksi og Vækst Hæmning', description: 'Betydeligt nedsat eller fuldstændig blokeret appetit på medicinens peak er utrolig almen. Medfører stagnation i barnets længde og faretruende vægttab.', treatment: 'Konstant kontrol-regime (Længde/Vægt kurve til børn). Indlæg "drug-holidays" (i weekender / lange ferier) for at tillade indhentningsvækst. Kost-tilskud efter medicinens udtømning om aftenen.' },
            { symptom: 'Hjerte (Sympatikus aktivering)', description: 'Tachycardi, forhøjet tonus (blodtryksstigninger). Kan evt udløse underliggende arytmier udtalt.', treatment: 'Screen klinisk forud og jævnligt for EKG anormaliteter. Kontroller BT / Puls årligt / ved ny dosis. Stop behandling hvis BT forbliver forhøjet uhåndteret.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Methylphenidat)', url: 'https://pro.medicin.dk/Sog/Sog?query=methylphenidat' }]
    },
    {
        id: 'lisdexamfetamin',
        name: 'Lisdexamfetamin (Elvanse)',
        group: 'ADHD / Centralstimulerende',
        subgroup: 'Amfetamin',
        effect: 'Prodrug til dextroamfetamin forbundet til lysin. Frigives derfor fysiologisk stabilt (gennem spaltning i røde blodlegemer) over en hel dag; kan klinisk ikke frigives her-og-nu (ved at sniffe/knuse pilen), forhindrer groft narkotisk misbrug ift. rene varianter.',
        normalDose: 'Startdosis: 30 mg. Optitreres evt. 20 mg/ugen. Vedligeholdelse: 30-70 mg (Max 70 mg officielt).',
        sideEffects: [
            { symptom: 'Aften Insomni', description: 'På grund af dets extremt stabile, 13-14 timers tidsrum kan det forårsage alvorlige søvnrytme-forstyrrelser og manglende indtræden at træthed hos visse brugere ift Methylphenidat.', treatment: 'Medicinen gives kategorisk altid KUN allertidligste morgenstund for at medicinen kan "tømmes" inden aften. Overvej seponering / tillæg søvn-regime ved svær søvnløshed.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Lisdexamfetamin)', url: 'https://pro.medicin.dk/Sog/Sog?query=lisdexamfetamin' }]
    },
    {
        id: 'atomoxetin',
        name: 'Atomoxetin (Strattera)',
        group: 'ADHD / Non-stimulerende',
        subgroup: 'Noradrenalin Reuptake Inhibitor',
        effect: 'Potent non-stimulerende selektiv noradrenalin-genoptagelseshæmmer, der mangler det klassiske affekt på dopamin systemet. Det giver IKKE the rush/misbrugspotentiale som centralstimulerende giver, og er oftere af dette brugt som et glimrende valg hvor tic / tics komorbiditet eller tidl drug-abuse overskygger.',
        normalDose: 'Start 40 mg dgl, øges til 80-100 mg efter min. en uges stabil fase.',
        sideEffects: [
            { symptom: 'Hepatotoksitet', description: 'Kan af ukendte grunde inducere sjælden (men fatal) auto-immun leverskade.', treatment: 'Stop medicinering fuldstændigt og straks henvendelse jvf blodprøvekontrol hvis svære mavesmerter, tegn på gulsot/ikterus mm. forekommer.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Atomoxetin)', url: 'https://pro.medicin.dk/Sog/Sog?query=atomoxetin' }]
    },

    // Abstinens / Misbrug / Andet
    {
        id: 'chlordiazepoxid',
        name: 'Chlordiazepoxid (Risolid)',
        group: 'Abstinensbehandling',
        subgroup: 'Benzodiazepin',
        effect: 'Klassisk benzodiazepin der i psykiatri/rusmiddel regimet stortset besidder kongeværdigheden ift at dæmpe massive CNS-excitatoriske tilstande, nemlig indlæggende Alkohol/Benzo dæmpende kure (abstinensbehandlinger).',
        normalDose: 'Indlæggelse/Afrusning: Styres stringent via scorer. (Fx BAS-skema, 25-50 mg chlordiazepoxid administreret kun når abstinensscore vurderes høj nok ved overvågning timer for timer).',
        sideEffects: [
            { symptom: 'Alvorlig Kumulering', description: 'Mange aktive metabolitter – halveringstiden strækker op mod 100 timer! Over medicinering den 1. og 2. dag kan pludselig lægge patienten livstruende i dyb sedation på dag 3/4 pga depot effetten blusser i blodet.', treatment: 'Gives ALTID (såfremt overhoved muligt) scoring-bestemt fremfor fast skemalagt. Ved overkumulering holdes medicinen helt ude min. nogle døgn, hold observation.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Chlordiazepoxid)', url: 'https://pro.medicin.dk/Sog/Sog?query=chlordiazepoxid' }]
    },
    {
        id: 'flumazenil',
        name: 'Flumazenil (Lanexat)',
        group: 'Antidot',
        subgroup: 'Benzodiazepin Antagonist',
        effect: 'Den rene spejl-antagonist til GABA-A (Benzodiazepin) receptorerne. Det eneste stof klinisk i stand til at vække en patient fra en overdosis/koma forårsaget udelukkende af midler som fx diazepam via omgående skubbing af agonisten ud.',
        normalDose: '0,2 mg IV injektion direkte ind over halve halve minut - observer klinin. Gentages 100 µg med hyppige mellemrum op til total fx 1-3 mg indtil vågenhed.',
        sideEffects: [
            { symptom: 'Udløsning af Status Epilepticus (Livsfare!!)', description: 'Flumazenil trækker tæppet væk momentant – hos en patient med underliggende misbrugsbåren GABA regulering (tidligere misbrugere) udløses akut fuld-blods benzodiazepin-abstinens der ofte munder i u-behandlelig og fatal status epileptus da ens vigtigste medicin netop var benzo (som nu er blokeret!).', treatment: 'En kontraindikeret absolut livsfare at give Flumazenil hvis det blotte kendskab til Benzo-misbrug eller tri-cykliske (TCA) antydes pre! Vurder i stedet at intubere til respiratoren uden antidot og lade det slide af.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Flumazenil)', url: 'https://pro.medicin.dk/Sog/Sog?query=flumazenil' }]
    },
    {
        id: 'naloxon',
        name: 'Naloxon',
        group: 'Antidot',
        subgroup: 'Opioid Antagonist',
        effect: 'Opioid receptor komptiv antagonist (Mu). Livs-redderen ved respirationsstop grundet morfica overdosering. Binder med ekstrem høj affinitet og dislocerer midlertidigt opioid receptorents agonist - resultatet er dramtisk vågenhed sekunder efter IV.',
        normalDose: '0,4 mg (voksne) skubbet pr. IV hurtigt. Er tillige tilgængelig IM samt ved en dedikeret nasal-spray til førstehjælpsmedicum i ambulancerne.',
        sideEffects: [
            { symptom: 'Rekylanfald (Re-sedation)', description: 'Naloxon udrenses hurtigere (t1/2 ~ 1 t) end effekten af de oftest stærkt akkumulerende lægemidler patienten overdoseres med (Metadon, Heroin fx tager mange timer/dage). Overlevere *tror* de er raske men falder i en pludselig døds-koma når tømningskoncentrationen af Naloxon igen falder til fordel for opioiden under en tur hjem.', treatment: 'Holdes indlagt for massiv monitorering! Iværksæt Naloxon dropp hvis det kliniske spejl antyder faretruende re-sedation over timerne efter.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Naloxon)', url: 'https://pro.medicin.dk/Sog/Sog?query=naloxon' }]
    },
    {
        id: 'disulfiram',
        name: 'Disulfiram (Antabus)',
        group: 'Misbrugsbehandling',
        subgroup: 'Acetaldehyddehydrogenase-hæmmer',
        effect: 'Aversiv-betingende anti-craving/alkohol terapi. Inhiberer enzymet acetaldehyd-dehydrogenase, medfører at under en genstand alkoholindtagelse danner kroppen toksiske mængder acetaldehyd, der giver en frygtelig usmags / organisk straf-reaktion på kroppen.',
        normalDose: 'Opstarts-fase p.o: 800 mg de første dage-uge for loading. Derefter rutine udleveres klinisk typisk 400-800 mg fx kun to gange i ugen, grundet god t1/2.',
        sideEffects: [
            { symptom: 'Den klassiske "Antabus-Alkohol"-reaktion', description: 'Oplevelse af at være levende "afkodet". Brystsmerter, eksplosiv hjertebanken, kvalme/brek, massiv hud-rubor i ansigtet, åndedrætsbesvær, og blodtrykfald opstået i farlig kardiovaskulært chok / død worstcase.', treatment: 'En indgående, bindende psykiatrisk samarbejdsaftale om nul-tolerance med alkohol under dækning af de op til _uger_ disulfiramen dvæler forude.' }
        ],
        sources: [{ title: 'Pro.medicin.dk (Disulfiram)', url: 'https://pro.medicin.dk/Sog/Sog?query=disulfiram' }]
    }
];
