export const PSYKOSE_VOKSNE_GUIDELINE = {
    title: 'Medicinsk Behandling af Psykotiske Tilstande (Voksne)',
    subtitle: 'Fælles retningslinje (RM) & Medicinrådets Anbefalinger (2020)',
    pdfs: [
        { title: 'Print Vejledning', url: `${import.meta.env.BASE_URL}pdf/beh-jan-2016-psykotiske-tilstande-hos-voksne.pdf` },
        { title: 'Print Forholdsregler', url: `${import.meta.env.BASE_URL}pdf/forholdsregler_antipsykotika_voksne.pdf` }
    ],
    intro: 'Vejledningen sikrer national konsensus og regionale forsigtighedsregler. Den præciserer, at der før ordination og under behandling tages systematisk højde for forprøver, monitorering og individuelle risikofaktorer for voksne.',
    algorithm: [
        {
            title: 'Forprøver (Før Behandlingsstart)',
            summary: 'Obligatoriske parakliniske undersøgelser og grundig anamnese.',
            details: `Før start af behandling med antipsykotika BØR der som minimum foreligge svar på:\n\n• Blodtryksmåling\n• Blodprøver: HbA1c og Lipider\n• Antropometri: Højde, Vægt og BMI\n• EKG (Vurdering af kardiel risikoprofil / QTc-forlængelse)\n\nUndtagelse: I rent akutte situationer kan måling af vægt og optagelse af EKG før opstart fraviges, hvis patienten ikke kan kooperere.\n\nDerudover skal der sikres informeret samtykke og udformes en behandlingsplan (indikation, målsymptomer, dosis og monitoreringsplan).`
        },
        {
            title: '1. Behandlingsforsøg (Førstevalg)',
            summary: 'Medicinrådets førstevalg: Amisulprid, Aripiprazol, Brexpiprazol, Lurasidon, Paliperidon, Risperidon.',
            details: `Til debuterende patienter vælges som udgangspunkt ud fra bivirkningsprofil og pris:\n\n• Amisulprid\n• Aripiprazol\n• Brexpiprazol\n• Lurasidon\n• Paliperidon\n• Risperidon\n\nSærligt om Aripiprazol: \nBetragtes som et oplagt muligt førstevalg til nydebuterede, behandlingsnaive patienter pga. gunstig samlet bivirkningsprofil og findes desuden som depot.`
        },
        {
            title: '2. og evt. 3. Behandlingsforsøg (Skift)',
            summary: 'Skift præparat ved uacceptable bivirkninger eller manglende effekt.',
            details: `Overvej ved 2. (og evt. 3.) forsøg:\n• Aripiprazol, Amisulprid, Brexpiprazol, Cariprazin, Lurasidon, Paliperidon, Risperidon.\n\nTidligst ved 3. forsøg:\nDisse præparater gemmes typisk pga. højere frekvens af specifikke bivirkninger (EPS, metaboliske, QT-forlængelse):\n• Haloperidol, Olanzapin, Perfenazin, Quetiapin, Sertindol, Ziprasidon, Zuclopenthixol.\n\nVigtigt om skift:\n• Kombinationsbehandling med flere antipsykotika BØR undgås.\n• Ved ambulant skift anbefales overkrydsning over nogle uger.`
        },
        {
            title: 'Behandlingsresistent (Clozapin)',
            summary: 'Anvendes ved behandlingsresistent skizofreni eller efter 2 fejlslagne forsøg.',
            details: `Clozapin anbefales som hovedregel ved 3. behandlingsforsøg, medmindre der er tungtvejende argumenter imod.\n\nVigtige Forholdsregler:\n• Høj risiko for metaboliske forstyrrelser, udtalt sedation og spytflåd.\n• Risiko for myocarditis og knoglemarvspåvirkning. Kræver stram, livslang hæmatologisk monitorering (hvide blodlegemer).\n• RYGNING: Rygeophør under clozapin-behandling reducerer nedbrydningen markant og øger plasmakoncentrationen med op til 50%. Clozapin-dosis SKAL halveres gradvist over 14 dage for at undgå livsfarlig forgiftning.`
        },
        {
            title: 'Efterprøver og Bivirkningsmonitorering',
            summary: 'Systematisk opfølgning fastlagt af Sundhedsstyrelsen.',
            details: `Inden for få uger efter start:\n• Samtale om effekt og bivirkninger. EKG-kontrol og BT-måling.\n\nSenest efter 3 måneder (oftere ved vægtøgning):\n• Vægt og BMI.\n• Blodprøver (HbA1c & Lipider).\n\nMindst én gang Årligt:\n• Fysisk konsultation med revurdering af indikation.\n• Screening for bivirkninger (UKU / EPS).\n• Ny måling af Vægt, BMI, Blodtryk, Blodprøver (HbA1c & Lipider) og EKG.\n\n(Obs: Særlige krav for Sertindol, som kræver EKG hver 3. måned. Clozapin kræver hyppige leukocyt-tællinger).`
        },
        {
            title: 'Særlige Patientprofiler',
            summary: 'Tilpasning af behandling til komorbiditeter og specifikke risikogrupper.',
            details: `Skræddersy behandlingen baseret på patientens baseline-risici:\n\n• Metabolisk Risiko (BMI/Lipider/HbA1c høje): Vælg Aripiprazol, Lurasidon, Ziprasidon. UNDGÅ Olanzapin, Quetiapin.\n• Arytmi / QTc forlængelse: Vælg Brexpiprazol, Aripiprazol, Lurasidon. UNDGÅ Sertindol, Ziprasidon.\n• Gravide/Ammende: Henvises ofte til regionsfunktion. Aripiprazol, Quetiapin, Olanzapin regnes ofte for de sikreste iht. DPS.\n• Ældre (>65 år): Øget risiko for parkinsonisme, fald, ortostatisme og demens-relateret mortalitet. Start lavt (low and go slow). Risperidon er oftest førstevalg.\n• Risiko for EPS / Tardiv Dyskinesi: Vælg Aripiprazol, Quetiapin, Olanzapin, eller (Clozapin ift tardiv dyskinesi).`
        }
    ]
};
