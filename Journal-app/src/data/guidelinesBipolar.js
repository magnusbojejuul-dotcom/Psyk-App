export const BIPOLAR_GUIDELINE = {
    title: 'Medicinsk Behandling af Bipolar Lidelse',
    subtitle: 'Referenceprogram (RADS) og NKR (2021)',
    pdfs: [
        { title: 'RADS Bipolar Lidelse (2015)', url: `${import.meta.env.BASE_URL}pdf/beh-bipolar-okt-2015-221233.pdf` },
        { title: 'Pixi-udgave Bipolar Lidelse', url: `${import.meta.env.BASE_URL}pdf/bipolar-lidelse-pixiudgave-februar-2016.pdf` },
        { title: 'NKR Farmakologisk Behandling', url: `${import.meta.env.BASE_URL}pdf/nkr-for-farmakologisk-behandling-af-bipolar-lidelse.pdf` }
    ],
    intro: 'Vejledningen sikrer national konsensus om kriterier for opstart, opfølgning, varighed og seponering af medicinsk behandling for voksne med bipolar lidelse. Den bygger på internationale guidelines (WFSBP, CANMAT, NICE, BAP).',
    algorithmTitle: 'Trinvise Anbefalinger',
    algorithm: [
        {
            title: 'Sygdomskarakteristika (Type I vs. Type II)',
            summary: 'Vigtig skelnen mellem Type I (Mani) og Type II (Hypomani) forud for behandlingsvalg.',
            details: `Bipolar Lidelse Type I:\n• Karakteriseret ved mindst én fuld manisk episode (afledt svær funktionsnedsættelse, evt. psykotiske symptomer eller indlæggelseskrævende).\n• Tit forekommer også svære depressive episoder.\n\nBipolar Lidelse Type II:\n• Karakteriseret ved mindst én hypoman episode (mildere opstemthed uden alvorlig funktionsnedsættelse) og mindst én egentlig depressiv episode.\n• Omfatter ALDRIG en fuld manisk episode.\n\nBlandingstilstand:\n• Samtidig eller hurtigt vekslende tilstedeværelse af maniske og depressive symptomer.`
        },
        {
            title: 'Akut Manisk Episode (Type I)',
            summary: 'Lithium, Quetiapin, Aripiprazol, Olanzapin eller Risperidon anbefales som 1. valg.',
            details: `Trinvis farmakologisk behandling af akut mani:\n\n1. Valg (Anvend til min. 70%):\n• Lithium (Kun ved mild til moderat mani i monoterapi). Optitreres til 0,8-1,0 mmol/l (evt. op til 1,2 under indlæggelse).\n• Antipsykotika: Aripiprazol, Quetiapin, Olanzapin, Risperidon\n• Antiepileptika: Valproat (Frarådes til kvinder i fertil alder)\n\nKombinationsbehandling (ved manglende respons):\n• Kombinér to af følgende: Antipsykotikum, Lithium eller Valproat.\n• Anvend generelt IKKE to antipsykotika eller to antiepileptika samtidig pga. øget bivirkningsrisiko.\n\nECT (Elektrokonvulsiv Terapi):\n• Har effekt hos 80% med mani og kan være livreddende ved manisk delir.`
        },
        {
            title: 'Akut Depressiv Episode (Type I)',
            summary: 'Quetiapin (1. valg) eller kombinationsbehandling. Antidepressiva bør kun tages under dække af maniforebyggende.',
            details: `Trinvis farmakologisk behandling af akut bipolar depression type I:\n\n1. Valg:\n• Quetiapin\n\n2. Valg (Overvej):\n• Lithium (Individuel vurdering ved svær depression med selvmordsrisiko pga. toxicitet)\n• Lurasidon, Olanzapin\n• Lamotrigin (Antiepileptikum)\n\nKombinationsbehandling:\n• Kombinér to af følgende: Lithium, Quetiapin og Lamotrigin.\n• SSRI kan forsøges i kombination, men KUN under dække af maniforebyggende præparat, for at undgå at fremprovokere mani eller lynhurtige stemningsskift (rapid cycling).`
        },
        {
            title: 'Blandingstilstande',
            summary: 'Specifikke anbefalinger gælder, hvis patienten har både maniske og depressive symptomer.',
            details: `Manisk blandingstilstand (Akut mani med depressive symptomer):\n• 1. Valg: Aripiprazol, Asenapin, Olanzapin eller Ziprasidon.\n• Evt. kombination af Lithium, Valproat eller Quetiapin.\n\nDepressiv blandingstilstand (Akut depression med hypomane symptomer):\n• 1. Valg: Lamotrigin, Lithium, Olanzapin, Quetiapin eller Ziprasidon.`
        },
        {
            title: 'Bipolar Lidelse Type II',
            summary: 'Lithium, Quetiapin og Lamotrigin som 1. valg. SSRI kan evt. overvejes i monoterapi.',
            details: `Bipolar Lidelse Type II har en anden profil end Type I. Depressive episoder er ofte den primære byrde.\n\n1. Valg (Anvend til min. 60%):\n• Lithium\n• Quetiapin\n• Lamotrigin\n• SSRI (Til forskel fra Type I kan SSRI overvejes i monoterapi her, idet risikoen for at inducere mani generelt vurderes at være lavere. Bør dog stadig anvendes med forsigtighed).\n\nIkke anbefalet rutinemæssigt:\n• Lurasidon, Olanzapin, Valproat, SNRI, TCA.`
        },
        {
            title: 'Vedligeholdelsesbehandling & Monitorering',
            summary: 'Forebyggelse af nye episoder kræver ofte flerårig behandling. TDM er afgørende for Lithium.',
            details: `Forebyggelse af Mani:\n• 1. Valg: Lithium, Quetiapin, Aripiprazol, Olanzapin, Risperidon, Valproat.\n\nForebyggelse af Depression:\n• 1. Valg: Lithium, Quetiapin, Lamotrigin.\n\nLithium Monitorering (Therapeutic Drug Monitoring - TDM):\n• Obligatorisk pga. snævert terapeutisk interval. Måles som 12-timers værdi.\n• Vedligeholdelsesbehandling: 0,5 - 0,8 mmol/L.\n• Akut Mani eller Depression: 0,6 - 1,2 mmol/L.\n\nSeponering:\n• Skal foregå over måneder for at reducere tilbagefaldsrisiko. Undtagelse: Antidepressiva seponeres ofte straks ved akut mani.`
        },
        {
            title: 'Særlige Grupper: Børn, Unge og Gravide',
            summary: 'Behandling kræver tæt specialist-opfølgning og streng overvågning af bivirkninger.',
            details: `Børn og Unge (Under 18 år):\n• 1. Valgspræparater ved mani: Lithium, Aripiprazol, Quetiapin og Risperidon.\n• Olanzapin bør undgås som 1. valg pga. svær risiko for vægtøgning hos børn.\n• Valproat frarådes generelt til børn/unge, og må IKKE anvendes til piger i fertil alder pga. teratogenicitet og risiko for PCOS (Polycystisk Ovariesyndrom).\n• Diagnosticering (via B&U psykiatri) kræver observation og rating-scales på tværs af miljøer.\n\nGravide:\n• Særlig forsigtighed. Valproat er kontraindiceret. ECT kan overvejes i særlige tilfælde ved svær depression eller mani.`
        }
    ]
};
