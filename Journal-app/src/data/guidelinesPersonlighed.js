export const BORDERLINE_GUIDELINE = {
    title: 'Emotionel Ustabil Personlighedsstruktur (Borderline)',
    subtitle: 'National Klinisk Retningslinje for behandling af BPF',
    pdfs: [
        { title: 'NKR Borderline Type 2019', url: `${import.meta.env.BASE_URL}pdf/nkr-for-behandling-af-emotionel-ustabil-personlighedsstruktur-borderline-type-2019.pdf` }
    ],
    intro: 'Vejledningen til emotionel ustabil personlighedsstruktur (Borderline, BPF) fokuserer på systematisk diagnostik, psykoterapeutiske indsatser og kriseplaner, mens farmakologisk behandling generelt frarådes for selve lidelsen.',
    algorithm: [
        {
            title: 'Diagnostik',
            summary: 'Brug struktureret gruppeinterview i stedet for kun screening.',
            details: `• Anvend et semi-struktureret personlighedsinterview (fx SCID-5-PD, IPDE) til diagnostik af BPF som foretrukket standard.\n• Frarådes at anvende rutinemæssige screeningsredskaber alene til identifikation i primærsektor.`
        },
        {
            title: 'Psykoterapeutisk Behandling',
            summary: 'Tilpas multimodalitet og varighed efter patientens forudsætninger.',
            details: `• Overvej at tilbyde multimodal eller unimodal psykoterapi (fx KAT, MBT, DBT) - der ses ingen signifikant forskel i nettoeffekt for selve behandlingsformen.\n• Varigheden bør individualiseres, typisk ses forløb både <12 mdr og >12 mdr (særligt ved komorbiditet).\n• Psykoedukation: Anbefales stærkt som et strukturerende element.\n• Monitorering: Vær varsom (svag anbefaling MOD) med meget jævnlig struktureret monitorering de første 12 mdr., da det muligvis kan give symptomforværring.`
        },
        {
            title: 'Individuel Krisekredtering',
            summary: 'Kriseplaner anbefales til at skabe tryghed.',
            details: `• Udarbejd individuelle kriseplaner sammen med patienten. Fastlægger faresignaler og handlinger ved kriser.\n• Særligt indiceret hos patienter med historik af selvskade eller suicidalitet.`
        },
        {
            title: 'Farmakologisk Behandling',
            summary: 'Svag anbefaling IMOD medicin generelt for selve Borderline lidelsen.',
            details: `• Antidepressiv, stemningsstabiliserende og antipsykotisk medicin har IKKE BPF som indikation (off-label).\n• Giver SVAG ANBEFALING MOD rutinemæssig brug af disse præparater for BPF.\n• Overvej kun nøje kortvarig farmakologi til specifikke svære komorbide lidelser (fx depression eller psykotisk gennembrud), men balancer altid i forhold til bivirkningsrisici.`
        }
    ]
};
