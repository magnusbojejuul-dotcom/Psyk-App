export const BORDERLINE_GUIDELINE = {
    title: 'Emotionel Ustabil Personlighedsstruktur (Borderline)',
    subtitle: 'National Klinisk Retningslinje for behandling af BPF',
    pdfs: [
        { title: 'NKR Borderline Type 2019', url: `${import.meta.env.BASE_URL}pdf/nkr-for-behandling-af-emotionel-ustabil-personlighedsstruktur-borderline-type-2019.pdf` }
    ],
    intro: 'Vejledningen til emotionel ustabil personlighedsstruktur (Borderline, BPF) fokuserer på systematisk diagnostik, psykoterapeutiske indsatser og kriseplaner, mens farmakologisk behandling generelt frarådes for selve lidelsen.',
    algorithmTitle: 'Klinisk Vejledning',
    isStepBased: false,
    algorithm: [
        {
            title: 'Diagnostik',
            details: `• Anvend et semi-struktureret personlighedsinterview (fx SCID-5-PD, IPDE) til diagnostik af BPF. Det bør varetages af kvalificeret sundhedspersonale, da ustruktureret interview har betydelig risiko for over- og underdiagnosticering.\n• SVAG ANBEFALING MOD rutinemæssig anvendelse af screeningsredskaber alene til at identificere mulig BPF i primærsektor (pga. betydelig risiko for over- og underdiagnostik). Dog bør man overveje det ved gentagen selvskadende adfærd, selvmordsadfærd og emotionel ustabilitet hos især unge.`
        },
        {
            title: 'Psykoterapeutisk Behandling',
            details: `• Overvej at tilbyde multimodal eller unimodal psykoterapi (fx KAT, MBT, DBT) - der ses ingen signifikant forskel i effekt for selve behandlingsformen. Multimodalitet er især en fordel ved komplekse/alvorlige forløb (kombination af fx gruppeterapi, individuel terapi, psykoedukation, mindfulness eller kropsterapi).\n• Varigheden bør individualiseres, enten kortvarigt (<12 mdr) eller langvarigt (≥12 mdr). Overvej forløbslængden løbende ud fra sværhedsgrad og komorbiditet.\n• Psykoedukation: Anbefales. Foregår ofte i grupper, hvilket desuden afstigmatiserer og træner evnen til de relationelle aspekter.\n• Monitorering: SVAG ANBEFALING MOD meget jævnlig struktureret monitorering (fx månedligt) det første år, da studier peger på, at det muligvis kan medføre symptomforværring.`
        },
        {
            title: 'Individuel Krisekredtering',
            details: `• Overvej at indføre individuelle kriseplaner.\n• Planen skal udarbejdes i samarbejde med patienten for at finde frem til personlige erfaringer med konkrete handlemuligheder, der hjælper under en krise.\n• Bør typisk indeholde information til patient (hvad der fremkalder krisen, hvem de kan kontakte) og behandler (hvordan kan patienten bedst mødes).\n• Et SKAL-krav til patienter der er selvmordstruede.`
        },
        {
            title: 'Farmakologisk Behandling',
            details: `• Antidepressiv, stemningsstabiliserende og antipsykotisk medicin har IKKE BPF som indikation (med andre ord: det er off-label).\n• SVAG ANBEFALING MOD rutinemæssig brug af disse tre præparatgrupper specifikt for BPF-symptomer.\n• Balancen mellem positive effekter og bivirkninger (særlig vægtøgning, hjerterytme) skal i de særlige tilfælde (f.eks. ved brug til behandling af specifikke svære komorbide lidelser) altid balanceres over for ulemperne.`
        }
    ]
};
