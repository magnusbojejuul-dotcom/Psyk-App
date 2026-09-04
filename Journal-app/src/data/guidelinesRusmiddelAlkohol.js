export const RUSMIDDEL_ALKOHOL = {
    title: 'Alkohol: Forgiftning & Abstinenser',
    subtitle: 'Vejledning baseret på NKR og klinisk praksis',
    pdfs: [
        { title: 'NKR Alkoholbehandling (Sundhedsstyrelsen)', url: `${import.meta.env.BASE_URL}pdf/nkr-alkoholbehandling.pdf` }
    ],
    intro: 'Alkohol er det hyppigst anvendte rusmiddel. Behandling er opdelt i håndtering af akut forgiftning (intoksikation) samt den potentielt livstruende abstinenstilstand.',
    toxication: {
        title: 'Alkoholforgiftning (Intoksikation)',
        description: 'Alkohol virker CNS-deprimerende. Graden af forgiftning afhænger stærkt af tolerance. Vær altid opmærksom på blandingsforgiftninger eller skjulte traumer pga. fald.',
        symptoms: [
            { name: 'Ataksi & Dårlig Koordination', icon: 'activity', desc: 'Bredsporet gang, rysten.' },
            { name: 'Dysartri', icon: 'message', desc: 'Sløret og snøvlende tale.' },
            { name: 'Nystagmus', icon: 'eye', desc: 'Ufrivillige øjenbevægelser (ofte horisontal).' },
            { name: 'Respirationsdepression', icon: 'wind', desc: 'Nedsat vejrtrækning ved høje promiller (Livstruende).' },
            { name: 'Nedsat bevidsthed / Koma', icon: 'brain', desc: 'Kan føre til aspiration af opkast (Læg i aflåst sideleje).' }
        ],
        management: 'Primært understøttende (ABCDE). Overvåg respiration og bevidsthed (GCS). Mål altid blodsukker (risiko for hypoglykæmi). Ved koma kan intubation være indiceret pga. aspirationsfare.'
    },
    algorithmTitle: 'Alkoholabstinenser (Klinisk Behandling)',
    isStepBased: true,
    algorithm: [
        {
            title: 'Diagnosticering og Sværhedsgradsvurdering',
            summary: 'Symptomer debuterer 6-24 timer efter ophør. Vurder for tremor, sved, takykardi og delir-tegn.',
            details: `• Symptomer opstår typisk 6-24 timer efter ophør med alkohol.\n• Milde symptomer: Tremor, svedtendens, let rødme, indre uro, let hypertension og takykardi.\n• Moderate/Svære symptomer: Udtalt tremor og sved, agitation, forhøjet BT/puls, hallucinationer (visuelle/auditive).\n• Livstruende: Delirium Tremens (fluktuerende bevidsthed, desorientering, svære hallucinationer, feber, autonom hyperaktivitet) eller Abstinenskramper (generaliseret tonisk-klonisk anfald).`
        },
        {
            title: 'Profylakse mod Wernickes Encefalopati',
            summary: 'Tiamin 400 mg i.v./i.m. + B-combin altid FØR glukose for at forebygge irreversibel hjerneskade.',
            details: `• Alle patienter med alkoholoverforbrug der indlægges / afgiftes BØR have B-vitamin.\n• I.V. / I.M. Tiamin 400 mg dagligt i 3-5 dage (ved manifest mistanke 400 mg x 3 i.v.) kombineret med B-combin stærk.\n• SKAL ALTID gives FØR eventuel tilførsel af kulhydrat/glukoseholdige væsker for at forhindre akut forværring til Wernickes encefalopati og Korsakoffs psykose.`
        },
        {
            title: 'Farmakologisk Abstinensbehandling',
            summary: 'Chlordiazepoxid (Risolid) styret efter scoringsskema (fx BAS). Diazepam i.v. ved kramper.',
            details: `• Grundstenen i behandlingen er krydstolerance med Benzodiazepiner (førstevalg er Chlordiazepoxid / Risolid, alternativt Diazepam / Stesolid).\n• Dosering bør styres via systematisk scoring (fx BAS - Bjerregaard Abstinens Score eller CIWA-Ar).\n• Standardregime ved moderate til svære abstinenser: Chlordiazepoxid (Risolid) 25-50-100 mg p.o. ved symptomer med 1-2 timers interval, derefter aftrapning over 4-7 dage efter skema.\n• Ved kramper: Diazepam 10-20 mg i.v. langsomt (eller rektalt). Overflyt til tæt observation / intermediærafsnit.`
        },
        {
            title: 'Langsigtet Tilbagefaldsforebyggelse',
            summary: 'Acamprosat (mod craving/afholdenhed), Naltrexon (mod drikketrang/reduktion) eller Disulfiram (Antabus).',
            details: `• Ved ønske om længerevarende AFHOLDENHED: Acamprosat (Campral) eller Naltrexon kombineret med psykoterapeutisk samtalebehandling. Disulfiram (Antabus) kræver stabil motivation og udelukkelse af kognitive skader; seponeres omgående ved alkoholindtagelse.\n• Ved ønske om REDUKTION i forbrug: Naltrexon (50 mg) for at dæmpe belønningskaskaden ved alkohol.\n• Farmakologisk støtte skal altid ledsages af struktureret samtalebehandling (fx CRA, motiverende samtaler eller kognitiv adfærdsterapi).`
        },
        {
            title: 'Monitorering og Skærmning',
            summary: 'Skærmet, veloplyst miljø og tæt monitorering af vitale værdier de første 48 timer.',
            details: `• Roligt, veloplyst miljø under afgiftning (dæmper synshallucinationer og konfusion). Beroligende og tryg kontakt.\n• Mål BT, puls, temperatur og abstinensscore regelmæssigt (minimum hver 4.-8. time i den akutte fase).\n• Særlig opmærksomhed de første 24-72 timer, hvor risikoen for kramper og Delirium Tremens kulminerer.\n• Ved uforklaret feber: Udred bredt for infektion (aspiration, pneumoni, urinveje, erysipelas).`
        }
    ]
};
