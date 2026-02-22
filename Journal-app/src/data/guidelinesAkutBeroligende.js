export const GUIDELINE_ADVARSLER = [
    { type: 'critical', text: 'I.m.-olanzepin må aldrig kombineres med i.m.-benzodiazepin. Har man behov for at give im Lorazepam efter im Olanzapin, må det tidligst ske efter 1 time. Har man behov for at give im Olanzapin efter im Lorazepam, må det tidligst ske efter 2 timer.' },
    { type: 'warning', text: 'Ved behandling af ældre skal der generelt varetages med forsigtighed. Doser skal som udgangspunkt være 1/4 eller 1/2 af voksendoser. Injektion olanzapin bør undgås til ældre med demens.' },
    { type: 'warning', text: 'Toksisk psykose (udløst af centralstimulantia) bør i den akutte fase ikke behandles med antipsykotika på grund af risiko for udvikling af kramper og malignt neuroleptika syndrom. Behandles udelukkende med benzodiazepiner.' },
    { type: 'info', text: 'Antipsykotisk behandling skal så vidt muligt forudgås af EKG.' }
];

export const VOKSNE_UDEN_PSYKOTISKE_SYMPTOMER = {
    peroral: [
        { valg: '1', praeparat: 'Tbl. lorazepam 1-2 mg', bemaerkning: 'Biotilgængelighed: P.o.=i.m.=i.v.: 100%. Tmax p.o: 2 timer.' },
        { valg: 'Note', praeparat: 'Tbl. promethazin 25 mg', bemaerkning: 'Kan benyttes ved tidligere paradoks virkning ved benzodiazepin. Off-label brug... Udvis særlig opmærksomhed på den antikolinerge belastning.' }
    ],
    im: [
        { valg: '1', praeparat: 'Inj. lorazepam 1-2 mg i.m.', bemaerkning: 'Kan ved behov gentages efter 1-2 timer. Døgndosis > 4 mg skal godkendes af overlæge. Kræver monitorering.' }
    ]
};

export const VOKSNE_MED_PSYKOTISKE_SYMPTOMER = {
    peroral: [
        { valg: '1', praeparat: 'Tbl. olanzapin 5-10 mg\neller Tbl. risperidon 1-2 mg\neller Tbl. quetiapin 50-100 mg', bemaerkning: 'Smeltetabletter kan anvendes ved usikker compliance. Antipsykotisk behandling forudgås af EKG.' },
        { valg: '2', praeparat: 'Tbl. eller dråber zuclopenthixol (cisordinol) 10 mg', bemaerkning: 'Antipsykotisk behandling forudgås af EKG.' },
        { valg: '3', praeparat: 'Tbl. haloperidol sædvanligvis 5-10 mg fordelt på 2 doser', bemaerkning: 'Undgå relaterede antipsykotika. Forudgås af EKG.' }
    ],
    im: [
        { valg: '1', praeparat: 'Inj. olanzapin 5-10 mg i.m.\neller Inj. aripiprazol 9.75 mg i.m.', bemaerkning: 'Olanzapin dosis kan gentages efter 2 timer og evt. igen 4 timer efter 2. injektion. Højst 3 injektioner (max 20mg/døgn). Aripiprazol kan gentages efter mindst 2 timer (max 30mg/døgn).' },
        { valg: '2', praeparat: 'Inj. zuclopenthixolacetat (cisordinol-acutard) 100 mg i.m.', bemaerkning: 'Doseringen gentages ved behov, almindeligvis efter 2-3 døgn. Må kun gives hvis pt tidl. har tålt cisordinol.' },
        { valg: '3', praeparat: 'Inj. haloperidol 5 mg i.m.', bemaerkning: 'Dosis kan justeres med 2-4 timers mellemrum til højest 20 mg/døgn. Høj forekomst af akut dystoni (Giv akineton).' }
    ]
};

export const IV_BEHANDLING_VOKSNE = [
    { valg: '1', praeparat: 'I.v. diazepam 5-10 mg\neller I.v. lorazepam 1-2 mg', bemaerkning: 'Indgives over mindst 2 minutter. Kræver fast vagt og tæt monitorering. Hav flumazenil til rådighed.' },
    { valg: '2', praeparat: 'I.v. haloperidol 0,5-2 mg', bemaerkning: 'Der anbefales et EKG før behandling. Obs risiko for QT-forlængelse.' }
];

export const DEMENS_BEHANDLING = [
    { valg: '1', praeparat: 'Risperidon (Lewy Body KONTRAINDICERET)', bemaerkning: 'Tbl./smeltetbl. startdosis: 0,25 mg til 1 mg dagligt, doser over 2 mg dagligt bør undgås. Indikation: Vedvarende aggression ved moderat til svær Alzheimers.' },
    { valg: '2', praeparat: 'Quetiapin', bemaerkning: 'Startdosis: 25 mg til 50 mg dagligt, doser over 200 mg dagligt bør undgås. Obs. risiko for blodtryksfald.' }
];
