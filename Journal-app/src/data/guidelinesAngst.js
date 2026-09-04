export const ANGST_GUIDELINE = {
    title: 'Angsttilstande i Almen Praksis',
    subtitle: 'National Rekommandationsliste (NRL 2020) for farmakologisk behandling',
    pdfs: [
        { title: 'NRL Angsttilstande 2020', url: `${import.meta.env.BASE_URL}pdf/farmakologisk-behandling-i-almen-praksis-af-angsttilstande_2020.pdf` }
    ],
    intro: 'Vejledningen beskriver farmakologisk behandling i almen praksis af medicinsk behandlingskrævende generaliseret angst, socialfobi, panikangst og andre angsttilstande for voksne over 18 år.',
    algorithmTitle: 'Klinisk Vejledning',
    isStepBased: false,
    algorithm: [
        {
            title: 'Generaliseret Angst (GAD)',
            summary: '1. valg: Escitalopram, Duloxetin, Venlafaxin eller Pregabalin. Andenlinje: Buspiron (fast dosering, IKKE p.n.).',
            details: `Generaliseret angst: Karakteriseret ved overdreven bekymring og spændinger mere end halvdelen af dagene over mindst 6 mdr.\n\nSSRI:\n• Escitalopram: 10 mg (10-20 mg) - REKOMMANDERET. Risiko for dosisafhængig forlængelse af QT-interval.\n• Paroxetin: 20 mg (20-40 mg) - KUN I SÆRLIGE TILFÆLDE. Flere interaktioner og seponeringssymptomer.\n\nSNRI:\n• Duloxetin: 60 mg (30-60 mg) - REKOMMANDERET. Forsigtighed ved nedsat nyrefunktion. Kontraindiceret ved nedsat leverfunktion.\n• Venlafaxin: 75 mg (75-225 mg) - REKOMMANDERET. Potentiel QTc-forlængelse; dosisreduktion ved nedsat lever-/nyrefunktion.\n\nGabapentinoider:\n• Pregabalin: 300 mg (150-600 mg) - REKOMMANDERET. Forsigtighed ved bilkørsel. Opmærksomhed på misbrugspotentiale.\n\nAzapironer (Alternativ/Andenlinje):\n• Buspiron: 30 mg (20-60 mg fordelt på 2-3 doser dagligt) - REKOMMANDERET som alternativ, når SSRI/SNRI/Pregabalin ikke tåles eller svigter. OBS: Buspiron har INGEN akut virkning og kan IKKE anvendes som p.n.-medicin; det kræver 2-4 ugers fast kontinuerlig behandling før effekt.\n\nKardial Profil:\n• Sundhedsstyrelsen anbefaler, at patientens kardiale risikoprofil vurderes inden start af behandling med SSRI/Venlafaxin samt at der foreligger et aktuelt EKG pga. risiko for proarytmi.`
        },
        {
            title: 'Socialfobi',
            summary: '1. valg: Escitalopram, Sertralin eller Venlafaxin. Vurder kardial profil og seksuelle bivirkninger.',
            details: `Lægemidler til medicinsk behandling af socialfobi:\n\nSSRI:\n• Escitalopram: 10 mg (5-20 mg) - REKOMMANDERET. Risiko for dosisafhængig forlængelse af QT-interval.\n• Sertralin: 50 mg (50-150 mg) - REKOMMANDERET. Risiko for dosisafhængig forlængelse af QT-interval.\n• Paroxetin: 20 mg (20-50 mg) - KUN i særlige tilfælde grundet flere interaktioner end escitalopram og sertralin.\n\nSNRI:\n• Venlafaxin: 75 mg (75-225 mg). 75 mg er oftest sufficient. Der er ikke evidens for, at højere doser medfører en yderligere fordel. Til enkelte patienter, som ikke responderer på initialdosen, kan det overvejes at øge til maks 225 mg/dag.\n\nSammenfatning:\n• Lægemidlerne vurderes at have klinisk relevant samt forebyggende effekt på tilbagefald.\n• Forbundet med risiko for seksuelle bivirkninger.\n• Opmærksomhed på QTc-forlængelse ved SSRI. Vurder kardial risikoprofil + tag aktuelt EKG.`
        },
        {
            title: 'Panikangst (med og uden agorafobi)',
            summary: '1. valg: Citalopram, Escitalopram, Sertralin eller Venlafaxin. Start i lav dosis for at undgå initial angstforværring.',
            details: `Lægemidler til medicinsk behandling (Starter lavere, doser her er vedligeholdelsesdoser):\n\nSSRI:\n• Citalopram: 20 mg (20-40 mg) - REKOMMANDERET.\n• Escitalopram: 10 mg (10-20 mg) - REKOMMANDERET.\n• Sertralin: 50 mg (50-150 mg) - REKOMMANDERET.\n• Paroxetin: 40 mg (40-60 mg) - KUN i særlige tilfælde (flere interaktioner).\n\nSNRI:\n• Venlafaxin: 75 mg (75-225 mg) - REKOMMANDERET.\n\nSammenfatning:\n• Alle har klinisk relevant effekt og forebyggende effekt på tilbagefald (hos patienter som responderer). \n• Paroxetin frarådes som førstevalg.\n• Samme EKG / QTc-forholdsregler gælder.`
        },
        {
            title: 'Kortvarig Symptomatisk Behandling / PN',
            summary: 'Kortvarig dæmpning (< 4 uger) ved svære kriser/uro. Hydroxyzin eller Benzodiazepiner. Høj afhængighedsrisiko.',
            details: `Akutte tilpasningsreaktioner, kriser eller svær akut uro som midlertidigt supplement til igangsat basisbehandling:\n\nAntihistaminer (Ikke-afhængighedsskabende):\n• Hydroxyzin: 10-25 mg p.n. (maks 50-100 mg/døgn) - REKOMMANDERET. Symptomatisk dæmpning af uro/angst. Bør anvendes i lavest mulige dosis og kortest mulige tid. Vær opmærksom på QTc-forlængelse og antikolinerge bivirkninger (især hos ældre).\n\nBenzodiazepiner (BZD) - KUN kortvarigt som supplement (maks. 2-4 uger):\n• Oxazepam: 15-30 mg (foretrækkes ofte pga. kortere halveringstid og ingen aktive metabolitter)\n• Diazepam: 5-10 mg\n• Lorazepam: 1-2 mg\n• Alprazolam: 0,5-1 mg\n\nVIGTIG SIKKERHEDSADVARSEL:\n• Benzodiazepiner medfører hurtigt tolerance og svær afhængighed.\n• Bør som hovedregel aldrig anvendes i mere end et par uger.\n• Forud for længerevarende brug skal det sikres, at angstlidelsen ikke kan behandles anderledes, og behandlingen bør varetages i samråd med speciallæge i psykiatri.`
        }
    ]
};
