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
            title: 'Diagnosticering og Vurdering',
            details: `• Symptomer opstår typisk 6-24 timer efter ophør med alkohol.\n• Milde symptomer: Tremor, svedtendens, let rødme, indre uro, let hypertension og takykardi.\n• Moderate/Svære symptomer: Udtalt tremor og sved, agitation, forhøjet BT/puls, hallucinationer (visuelle/auditive).\n• Livstruende: Delirium Tremens (fluktuerende bevidsthed, svære hallucinationer, feber) eller Abstinenskramper (Grand Mal).`
        },
        {
            title: 'Profylakse mod Wernickes Encefalopati',
            details: `• Alle patienter med alkoholoverforbrug der indlægges / afgiftes BØR have B-vitamin.\n• I.V. / I.M. Tiamin 400 mg x 1 i 3-5 dage (afhængigt af mistanke) FØR tilførsel af glukose for at forebygge Wernickes-Korsakoffs syndrom.\n• Supplér med B-combin stærk og D-vitamin.`
        },
        {
            title: 'Farmakologisk Abstinensbehandling',
            details: `• Grundstenen i behandlingen er krydstolerance med Benzodiazepiner (hyppigst Klopoxid fx Risolid, eller Diazepam).\n• Dosering bør styres via systematisk scoring (fx BAS - Bjerregaard Abstinens Score).\n• Standard regimen for ukomplicerede abstinenser: Klopoxid (Risolid) 50 mg x 4 dgl i starten, udtrapning over 5-7 dage efter skema.\n• Ved kramper: Diazepam / Stesolid (fx 10 mg I.V. gentaget ved behov). Overflyt evt. til observation/ICU ifølge lokal instruks.`
        },
        {
            title: 'Målsætning (Afholdenhed vs. Reduktion)',
            details: `• Ved ønske om længerevarende AFHOLDENHED (SST 2018 anbefaling): Acamprosat evt. Naltrexon eller (dog med forsigtighed) Disulfiram (Antabus). Behandling med Disulfiram kræver udelukkelse af kognitive skader, og seponeres ved første indtag af alkohol.\n• Ved ønske om REDUKTION i forbrug: Naltrexon fremfor Acamprosat, og kun sjældent Nalmefen (Selincro) hos få udvalgte uden svær abstinenttilstand eller psykiatrisk dobbeltdiagnose.\n• Gennemgang viser at samtale/CRA-behandling altid bør følge farmakologisk støtte.`
        },
        {
            title: 'Monitorering og Miljø',
            details: `• Roligt, velbelyst miljø under afgiftning. Tal beroligende.\n• Mål BT/Puls minimum 3 gange i døgnet i starten.\n• Tæt observation specielt de første 48 timer for at undgå progression til Delirium Tremens.\n• Ved tegn på infektion (feber der ikke primært er abstinensbetinget) → udred bredt.`
        }
    ]
};
