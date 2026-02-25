export const DEPRESSION_GUIDELINE = {
    title: 'Medicinsk Behandling af Unipolar Depression',
    subtitle: 'Referenceprogram for unipolar depression (SST)',
    pdfs: [
        { title: 'SST Referenceprogram (2007)', url: `${import.meta.env.BASE_URL}pdf/Referenceprogram_SST.pdf` },
        { title: 'NKR Non-farmakologisk (2016)', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-non-fatmakologisk-behandling-af-unipolar-depression.pdf` },
        { title: 'NRL Antidepressiva (2019)', url: `${import.meta.env.BASE_URL}pdf/bagnot-antidepressiva.pdf` }
    ],
    intro: 'Behandlingsalgoritme: klinisk vejledning for medicinsk behandling og ECT ved unipolar depression',
    splitAlgorithm: {
        rootNodes: [
            {
                title: 'Mistanke om depression (F32.0 - F33.9)',
                summary: 'Verifikation af diagnosen:\nKlinisk vurdering, oplysninger fra pårørende, observation, udelukkelse af somatisk årsag',
            }
        ],
        tracks: [
            {
                title: 'Ikke-hospitaliserede',
                nodes: [
                    {
                        title: 'Let depression',
                        summary: 'Watchful waiting',
                        details: 'Patienter med let depression (HAM-D17: 13-17) skal ikke rutinemæssigt tilbydes farmakologisk behandling med antidepressiva. "Watchful monitoring" anbefales.'
                    }
                ]
            },
            {
                title: 'Ikke-hospitaliserede',
                nodes: [
                    {
                        title: 'Moderat depression',
                        summary: 'Behandling med SSRI, som ikke har interaktioner med andre lægemidler:\n• Citalopram\n• Escitalopram\n• Sertralin',
                        details: 'Patienter med moderat depression (HAM-D17: 18-24) eller dystymi tilbydes farmakologisk behandling eller psykoterapi – evt. i kombination.\n\n• 1. valg: Sertralin anbefales som førstevalg pga. lavere bivirknings- og interaktionsrisiko.\n• 2. valg: Citalopram og escitalopram er ikke førstevalg pga. dosisrestriktion og krav om EKG-monitorering.\n\nMonitorering: Patienter bør ses hurtigt (inden for ca. 1 uge) efter behandlingsstart mhp. effekt, bivirkninger og selvmordsrisiko.'
                    },
                    {
                        title: 'Ingen tegn på bedring efter 2-4 uger på optimal dosis'
                    },
                    {
                        title: 'Skift til præparat af anden farmakologisk klasse:\n• Venlafaxin, duloxetin (SNRI)\n• Mirtazapin (NaSSA)\n• TCA (evt. i samråd med psykiater)',
                        details: 'Kriterier for skift af behandling:\n• Det anbefales først at forsøge skift til et antidepressivum med en anden farmakodynamisk virkningsprofil (fx fra SSRI til SNRI eller TCA).\n• Alternativt kan overvejes at tillægge mianserin eller mirtazepin givet til natten oveni SSRI, specielt ved fortsat søvnbesvær.\n• Duloxetin og venlafaxin kan anvendes ved svigt af SSRI, men er ikke førstevalg pga. flere bivirkninger.'
                    },
                    {
                        title: 'Ingen tegn på bedring efter yderligere 2-4 uger på optimal dosis'
                    },
                    {
                        title: '• Addér lithium i samråd med psykiater\n• Ved manglende effekt henvisning til psykiater eller indlæggelse på psykiatrisk afdeling',
                        details: 'Behandlingsresistens over for to eller flere antidepressiva taler i sig selv for lithium som førstevalg i forsøg på at forebygge udvikling af bipolar lidelse.\n\nVed fortsat utilstrækkelig effekt anbefales augmentation med lithium eller antipsykotikum (fx quetiapin eller aripiprazol).'
                    }
                ]
            },
            {
                title: 'Hospitaliserede patienter',
                nodes: [
                    {
                        title: 'Svær depression',
                        summary: 'Behandling med dual action eller TCA',
                        details: 'Patienter med svær depression (HAM-D17: 25-52) tilbydes altid behandling med antidepressiva.\n\n• TCA: Nortriptylin foretrækkes frem for øvrige TCA pga. lavere tendens til ortostatisk hypotension.\n• Mirtazepin kan overvejes som tillæg ved søvnbesvær.'
                    },
                    {
                        title: 'Ingen tegn på bedring efter 2-4 uger på optimal dosis'
                    },
                    {
                        title: 'Addér lithium\n(for almen praksis i samråd med psykiater)',
                        details: 'Behandlingsresistens over for to eller flere antidepressiva taler for lithium. Ved familiær disposition for bipolar lidelse og mange tidligere depressioner øges indikationen for lithium yderligere.'
                    },
                    {
                        title: 'Ingen tegn på bedring efter yderligere 2-4 uger'
                    },
                    {
                        title: 'ECT'
                    }
                ]
            },
            {
                title: 'Hospitaliserede patienter',
                nodes: [
                    {
                        title: 'Depression med psykotiske symptomer',
                        summary: '• Behandling med TCA\n• Overvej ECT',
                        details: 'Behandling foregår altid under indlæggelse (specialistopgave).\n\n• 1. valg: ECT anbefales pga. bedst effekt.\n• 2. valg: Kombination af TCA (fx nortriptylin) og antipsykotika kan overvejes hos patienter, som ikke kan behandles med eller ikke ønsker ECT.'
                    },
                    {
                        title: 'Ingen tegn på bedring efter 2-4 uger på optimal dosis'
                    },
                    {
                        title: '• Addér antipsykotikum\n• Overvej ECT'
                    },
                    {
                        title: 'Ingen tegn på bedring efter yderligere 2-4 uger'
                    },
                    {
                        title: 'ECT'
                    }
                ]
            }
        ]
    }
};
