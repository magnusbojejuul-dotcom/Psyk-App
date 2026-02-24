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
                    }
                ]
            },
            {
                title: 'Ikke-hospitaliserede',
                nodes: [
                    {
                        title: 'Moderat depression',
                        summary: 'Behandling med SSRI, som ikke har interaktioner med andre lægemidler:\n• Citalopram\n• Escitalopram\n• Sertralin',
                    },
                    {
                        title: 'Ingen tegn på bedring efter 2-4 uger på optimal dosis'
                    },
                    {
                        title: 'Skift til præparat af anden farmakologisk klasse:\n• Venlafaxin, duloxetin (SNRI)\n• Mirtazapin (NaSSA)\n• TCA (evt. i samråd med psykiater)'
                    },
                    {
                        title: 'Ingen tegn på bedring efter yderligere 2-4 uger på optimal dosis'
                    },
                    {
                        title: '• Addér lithium i samråd med psykiater\n• Ved manglende effekt henvisning til psykiater eller indlæggelse på psykiatrisk afdeling'
                    }
                ]
            },
            {
                title: 'Hospitaliserede patienter',
                nodes: [
                    {
                        title: 'Svær depression',
                        summary: 'Behandling med dual action eller TCA',
                    },
                    {
                        title: 'Ingen tegn på bedring efter 2-4 uger på optimal dosis'
                    },
                    {
                        title: 'Addér lithium\n(for almen praksis i samråd med psykiater)'
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
