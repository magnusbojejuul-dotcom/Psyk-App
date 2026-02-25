export const PSYKOSE_VOKSNE_GUIDELINE = {
    title: 'Psykotiske Tilstande hos Voksne',
    subtitle: 'NKR og RADS-vejledning for voksne',
    pdfs: [
        { title: 'RADS Psykotiske Tilstande (2016)', url: `${import.meta.env.BASE_URL}pdf/beh-jan-2016-psykotiske-tilstande-hos-voksne.pdf` },
        { title: 'Forholdsregler Antipsykotika', url: `${import.meta.env.BASE_URL}pdf/Forholdsregler_ved_anvendelse_af_antipsykotika_hos_voksne_faelles_retningslinje_voksenpsykiatri_RM.pdf` },
        { title: 'NKR Medicinsk Behandling Skizofreni', url: `${import.meta.env.BASE_URL}pdf/medicinsk-behandling-af-voksne-diagnosticeret-med-skizofreni.pdf` }
    ],
    intro: 'Vejledningen dækker medicinsk behandling og forholdsregler for voksne med psykotiske lidelser. Den indeholder bl.a. information om præparatvalg, monitorering og EKG-krav.',
    algorithmTitle: 'Trinvise Anbefalinger',
    algorithm: [
        {
            title: 'Forprøver (Før Behandlingsstart)',
            summary: 'Obligatoriske parakliniske undersøgelser og grundig anamnese.',
            details: `Før start af behandling med antipsykotika BØR der som minimum foreligge svar på:\n• Blodtryksmåling (BT)\n• Blodprøver: HbA1c og Lipider\n• Antropometri: Højde, Vægt og BMI\n• EKG (Vurdering af kardiel risikoprofil / QTc-forlængelse)\n• Screening for bivirkninger (f.eks. via UKU)\n\nUndtagelse: I særdeles akutte situationer kan måling af vægt og optagelse af EKG før opstart fraviges, såfremt patienten ikke kan kooperere.\n\nDerudover skal der sikres informeret samtykke og udformes en klar behandlingsplan (indikation, målsymptomer, forventet varighed, dosis og bivirkningsmonitorering, herunder taget stilling til kørselsforbud).`
        },
        {
            title: '1. Behandlingsforsøg (Førstevalg)',
            summary: 'Medicinrådets førstevalg: Amisulprid, Aripiprazol, Brexpiprazol, Lurasidon, Paliperidon, Risperidon.',
            details: `Monoterapi foretrækkes, og kombinationsbehandling af flere antipsykotika BØR undgås.\nTil debuterende patienter vælges som udgangspunkt ud fra bivirkningsprofil og pris:\n\n• Amisulprid\n• Aripiprazol\n• Brexpiprazol\n• Lurasidon\n• Paliperidon\n• Risperidon\n\nSærligt om Aripiprazol: \nBetragtes som et oplagt muligt førstevalg til nydebuterede, behandlingsnaive patienter pga. en meget gunstig samlet bivirkningsprofil og fordi det findes som depotinjektion.`
        },
        {
            title: '2. og evt. 3. Behandlingsforsøg (Skift)',
            summary: 'Skift præparat ved uacceptable bivirkninger eller manglende effekt.',
            details: `Overvej ved 2. (og evt. 3.) forsøg lægemidler med en anden virkningsmekanisme:\n• Aripiprazol, Amisulprid, Brexpiprazol, Cariprazin, Lurasidon, Paliperidon, Risperidon.\n\nOvervej tidligst ved 3. forsøg:\nDisse præparater gemmes typisk pga. højere frekvens af specifikke bivirkninger (EPS, metaboliske, QT-forlængelse, sedation):\n• Haloperidol, Olanzapin, Perfenazin, Quetiapin, Sertindol, Ziprasidon, Zuclopenthixol.\n\nVigtigt om skift:\n• I udgangspunktet skiftes præparat ved varige og ikke-tolerérbare bivirkninger eller manglede effekt.\n• Ved ambulant skift anbefales overkrydsning over nogle uger (indfør nyt præparat og aftrap gradvist det gamle).`
        },
        {
            title: 'Behandlingsresistent (Clozapin)',
            summary: 'Anvendes ved behandlingsresistent skizofreni eller efter 2 fejlslagne forsøg.',
            details: `Clozapin anbefales som hovedregel ved 3. behandlingsforsøg, medmindre der er tungtvejende argumenter imod, fordi det har uovertruffen effekt hos en del svære patienter.\n\nVigtige Forholdsregler:\n• Bivirkninger: Høj risiko for metaboliske forstyrrelser, udtalt sedation, spytflåd og sænket krampetærskel (EPS er derimod sjældent, og lindrer evt. tardiv dyskinesi).\n• Alvorlige risici: Risiko for myocarditis og knoglemarvspåvirkning. Kræver stram, livslang hæmatologisk monitorering (hvide blodlegemer).\n• INTERAKTION: Rygning og Clozapin:\n  - Rygning reducerer plasmakoncentrationen med ca. 30-50%.\n  - Et evt. rygeophør medfører over 14 dage en dramatisk stigning i koncentrationen og enorm risiko for forgiftning. Dosis MÅ/SKAL derfor gradvist halveres over 14 dage.`
        },
        {
            title: 'Efterprøver og Bivirkningsmonitorering',
            summary: 'Systematisk opfølgning fastlagt af Sundhedsstyrelsen.',
            details: `Minimumskrav fastlagt af Sundhedsstyrelsen:\n• Inden for de første par uger: Opfølgende samtale om effekt/bivirkninger. Kontrol af BT og EKG.\n• Senest efter 3 måneder (oftere ved vægtstigning el. højmetabolske præparater t.ex. Olanzapin, Quetiapin, Clozapin): Vægt og BMI samt Blodprøver (HbA1c & Lipider).\n• Mindst én gang Årligt (når stabilizeret): Fysisk konsultation m. revurdering af indikation. Screening for bivirkninger (UKU / EPS). Ny måling af Vægt, BMI, BT, Blodprøver og EKG.\n\nSærlige Monitoreringskrav:\n• Sertindol: EKG før, VED steady-state (efter normalt 3 uger) og derefter hver 3. måned. Seponer hvis QTc > 500ms.\n\nBehandlingsvarighed\n• Førsteepisode: 1-2 år\n• Et tidligere tilbagefald: 2-5 år\n• Gentagne tilbagefald: > 5 år (livslang overvejes)\nUdtrapning KUN efter lang tids stabilisering, MEGET langsomt, under tæt observation.`
        },
        {
            title: 'Særlige Patientprofiler',
            summary: 'Tilpasning af behandling til komorbiditeter og specifikke risikogrupper.',
            details: `Skræddersy behandlingen baseret på patientens baseline-risici:\n\n• Metabolisk Risiko (Overvægt, type 2 diabetis, dyslipidæmi): Vælg Aripiprazol, Brexpiprazol, Cariprazin, Lurasidon, Ziprasidon, Amisulprid. UNDGÅ: Olanzapin, Quetiapin og Clozapin.\n• Kardiel Arytmi (QTc / EKG): Vælg Brexpiprazol, Cariprazin, Lurasidon, Paliperidon. UNDGÅ: Sertindol, Ziprasidon evt. Amisulprid.\n• Gravide/Ammende: Henvises ofte til regionsfunktion. Nuværende DPS data: Aripiprazol, Quetiapin, Olanzapin er muligvis de sikreste ift. manglende tegn på misdannelser. Depot vurderes for restriktivt.\n• Ældre (>65 år): Øget risiko for parkinsonisme, faldskader (pga. ortostatisk hypotension/sedation), sygdomme. "Start low, go slow". Førstevalg: Risperidon. Højdosis antipsykotika kontraindiceret. \n• EPS & Akatisi tendens: Vælg evt. Quetiapin, Olanzapin eller Clozapin. Undgå højdosis Haloperidol, Paliperidon og Amisulprid.`
        }
    ]
};
