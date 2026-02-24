export const ANGST_GUIDELINE = {
    title: 'Angsttilstande i Almen Praksis',
    subtitle: 'National Rekommandationsliste for farmakologisk behandling',
    pdfs: [
        { title: 'NKR Angsttilstande 2020', url: `${import.meta.env.BASE_URL}pdf/farmakologisk-behandling-i-almen-praksis-af-angsttilstande_2020.pdf` }
    ],
    intro: 'Vejledningen beskriver farmakologisk behandling i almen praksis af medicinsk behandlingskrævende generaliseret angst, socialfobi, panikangst og andre angsttilstande for voksne over 18 år.',
    algorithm: [
        {
            title: 'Generaliseret Angst',
            summary: 'SSRI, SNRI og Gabapentinoider anbefales.',
            details: `• SSRI: Escitalopram er anbefalet fremfor Paroxetin grundet færre interaktioner (Paroxetin kun i særlige tilfælde).\n• SNRI: Duloxetin og Venlafaxin er begge ligeværdige og anbefales.\n• Gabapentinoider: Pregabalin anbefales generelt (obs. bilkørsel og misbrugspotentiale).\n• Bivirkninger: Opstarts-kvalme, QT-forlængelse (især ved SSRI/Venlafaxin), seksuelle bivirkninger og seponeringssymptomer skal monitoreres.`
        },
        {
            title: 'Socialfobi',
            summary: 'Sertralin og Escitalopram er førstevalg. Venlafaxin kan benyttes.',
            details: `Lægemidler til medicinsk behandling:\n\nSSRI:\n• Escitalopram: 10 mg (5-20 mg) - Rekommanderet. QTc-opmærksomhed.\n• Sertralin: 50 mg (50-150 mg) - Rekommanderet. QTc-opmærksomhed.\n• Paroxetin: 20 mg (20-50 mg) - KUN i særlige tilfælde.\n\nSNRI:\n• Venlafaxin: 75 mg (oftest sufficient, evt. op til 225 mg v. manglende respons).`
        },
        {
            title: 'Panikangst (med og uden agorafobi)',
            summary: '1. valg er Citalopram, Escitalopram, Sertralin eller Venlafaxin.',
            details: `Lægemidler til medicinsk behandling (Starter lavere, doser her er vedligeholdelsesdoser):\n\nSSRI:\n• Citalopram: 20 mg (20-40 mg)\n• Escitalopram: 10 mg (10-20 mg)\n• Sertralin: 50 mg (50-150 mg)\n• Paroxetin: 40 mg (40-60 mg) - KUN i særlige tilfælde.\n\nSNRI:\n• Venlafaxin: 75 mg (75-225 mg)`
        },
        {
            title: 'Kortvarig behandling / PN (Andre angsttilstande)',
            summary: 'Brug af Antihistaminer (Hydroxyzin) eller korterevarende Benzodiazepiner.',
            details: `Azapironer:\n• Buspiron: 30 mg (20-60 mg) - For generaliseret angst/uro, når SSRI/SNRI ikke er egnet. NNT er højt og effekt moderat.\n\nAntihistaminer:\n• Hydroxyzin: 10 mg (10-50 mg) - Bør anvendes i lavest mulige dosis og kortest mulige tid. Opmærksom på QTc forlængelse.\n\nBenzodiazepiner (BZD) - KUN kortvarigt (<4 uger):\n• Alprazolam: 0,5-2 mg\n• Bromazepam: 1,5-9 mg\n• Clobazam: 10-30 mg\n• Diazepam: 5-15 mg\n• Lorazepam: 1-3 mg\n• Oxazepam: 15-45 mg\n*Længerevarende brug vurderes i samråd med speciallæge i psykiatri.*`
        }
    ]
};
