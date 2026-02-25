export const ANGST_GUIDELINE = {
    title: 'Angsttilstande i Almen Praksis',
    subtitle: 'National Rekommandationsliste for farmakologisk behandling',
    pdfs: [
        { title: 'NKR Angsttilstande 2020', url: `${import.meta.env.BASE_URL}pdf/farmakologisk-behandling-i-almen-praksis-af-angsttilstande_2020.pdf` }
    ],
    intro: 'Vejledningen beskriver farmakologisk behandling i almen praksis af medicinsk behandlingskrævende generaliseret angst, socialfobi, panikangst og andre angsttilstande for voksne over 18 år.',
    algorithmTitle: 'Klinisk Vejledning',
    algorithm: [
        {
            title: 'Generaliseret Angst',
            details: `Generaliseret angst: Karakteriseret ved overdreven bekymring og spændinger mere end halvdelen af dagene over mindst 6 mdr.\n\nSSRI:\n• Escitalopram: 10 mg (10-20 mg) - REKOMMANDERET. Risiko for dosisafhængig forlængelse af QT-interval.\n• Paroxetin: 20 mg (20-40 mg) - KUN I SÆRLIGE TILFÆLDE. Giver anledning til flere interaktioner, samt risiko for dosisafhængig forlængelse af QT-interval.\n\nSNRI:\n• Duloxetin: 60 mg (30-60 mg) - REKOMMANDERET. Potentielle interaktioner + forsigtighed ved nedsat nyrefunktion. Kontraindiceret ved nedsat leverfunktion.\n• Venlafaxin: 75 mg (75-225 mg) - REKOMMANDERET. Potentiel QTc-forlængelse samt forsigtighed og dosisreduktion ved nedsat lever- og/eller nyrefunktion.\n\nGabapentinoider:\n• Pregabalin: 300 mg (150-600 mg) - REKOMMANDERET. Forsigtighed tilrådes ved bilkørsel og maskinbetjening. Dosisreduktion ved nedsat nyrefunktion.\n\nKardial Profil:\n• Sundhedsstyrelsen anbefaler, at patientens kardiale risikoprofil vurderes inden start af behandling med SSRI/Venlafaxin samt at der foreligger et aktuelt EKG pga. risiko for proarytmi.`
        },
        {
            title: 'Socialfobi',
            details: `Lægemidler til medicinsk behandling af socialfobi:\n\nSSRI:\n• Escitalopram: 10 mg (5-20 mg) - REKOMMANDERET. Risiko for dosisafhængig forlængelse af QT-interval.\n• Sertralin: 50 mg (50-150 mg) - REKOMMANDERET. Risiko for dosisafhængig forlængelse af QT-interval.\n• Paroxetin: 20 mg (20-50 mg) - KUN i særlige tilfælde grundet flere interaktioner end escitalopram og sertralin.\n\nSNRI:\n• Venlafaxin: 75 mg (75-225 mg). 75 mg er oftest sufficient. Der er ikke evidens for, at højere doser medfører en yderligere fordel. Til enkelte patienter, som ikke responderer på initialdosen, kan det overvejes at øge til maks 225 mg/dag.\n\nSammenfatning:\n• Lægemidlerne vurderes at have klinisk relevant samt forebyggende effekt på tilbagefald.\n• Forbundet med risiko for seksuelle bivirkninger.\n• Opmærksomhed på QTc-forlængelse ved SSRI. Vurder kardial risikoprofil + tag aktuelt EKG.`
        },
        {
            title: 'Panikangst (med og uden agorafobi)',
            details: `Lægemidler til medicinsk behandling (Starter lavere, doser her er vedligeholdelsesdoser):\n\nSSRI:\n• Citalopram: 20 mg (20-40 mg) - REKOMMANDERET.\n• Escitalopram: 10 mg (10-20 mg) - REKOMMANDERET.\n• Sertralin: 50 mg (50-150 mg) - REKOMMANDERET.\n• Paroxetin: 40 mg (40-60 mg) - KUN i særlige tilfælde (flere interaktioner).\n\nSNRI:\n• Venlafaxin: 75 mg (75-225 mg) - REKOMMANDERET.\n\nSammenfatning:\n• Alle har klinisk relevant effekt og forebyggende effekt på tilbagefald (hos patienter som responderer). \n• Paroxetin frarådes som førstevalg.\n• Samme EKG / QTc-forholdsregler gælder.`
        },
        {
            title: 'Kortvarig behandling / PN (Andre angsttilstande)',
            details: `Akutte tilpasningsreaktioner, enkeltfobier, angst som ledsagefænomen/anden psykisk lidelse el. som medicin-supplement:\n\nAzapironer:\n• Buspiron: 30 mg (20-60 mg) - REKOMMANDERET. Bruges ved generaliseret angst, når SSRI/SNRI/Pregabalin ikke tåles eller har manglende effekt.\n\nAntihistaminer:\n• Hydroxyzin: 10 mg (10-50 mg) - REKOMMANDERET. Symptomatisk behandling, hvis der IKKE er indikation for anden medicin. Bør anvendes i lavest mulige dosis og kortest mulige tid. Opmærksom på QTc forlængelse.\n\nBenzodiazepiner (BZD) - KUN kortvarigt evt som supplement (< 4 uger):\n• Alprazolam: 0,5-2 mg\n• Bromazepam: 1,5-9 mg\n• Clobazam: 10-30 mg\n• Diazepam: 5-15 mg\n• Lorazepam: 1-3 mg\n• Oxazepam: 15-45 mg\n\n*Længerevarende BZD forbundet med svær afhængighed og evt. kognitiv påvirkning. Forud for langsigtet behandling med BZD skal det sikres, at angstlidelsen ikke kan behandles på anden måde, og kun efter samråd med speciallæge i psykiatri.*`
        }
    ]
};
