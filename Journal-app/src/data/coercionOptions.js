export const COERCION_SEDATIVE_BASE_TEXT = 'Lægefagligt vurderes det, at beroligende medicin er af afgørende betydning for bedring af pt.s meget urolige tilstand. Mindre indgribende foranstaltninger vurderes ikke at have været tilstrækkelige. Det valgte lægemiddel er afprøvet i sædvanlig dosering med færrest mulige bivirkninger.';

export const COERCION_OPTIONS = [
    // --- TVANGSTILBAGEHOLDELSE ---
    {
        id: 'coercion_retention_treatment',
        label: 'Behandling',
        category: 'Tvangstilbageholdelse',
        text: 'Pt. kræver sig udskrevet og kan ikke motiveres for frivillig indlæggelse. Der har været passende betænkningstid.\nPt. vurderes at være sindssyg, og det vil være uforsvarligt ikke at frihedsberøve pt. med henblik på behandling, da udsigten til afgørende bedring af tilstanden vil være væsentligt forringet, hvis pt. ikke er indlagt. Der er et klart behandlingsbehov, som ikke kan klares ambulant for nuværende. Det vurderes, at pt. i nuværende tilstand ikke vil kunne tage imod relevant behandling i ambulant regi.\n\nPt. er underrettet om den iværksatte tvang, om baggrunden for tvangstilbageholdelsen, om formålet hermed, samt vejledt om udsigterne til en bedring af helbredstilstanden.',
        exclude: ['coercion_retention_danger']
    },
    {
        id: 'coercion_retention_danger',
        label: 'Fare',
        category: 'Tvangstilbageholdelse',
        text: 'Pt. kræver sig udskrevet og kan ikke motiveres for frivillig indlæggelse. Der har været passende betænkningstid.\nPt. vurderes at være sindssyg, og det vil være uforsvarligt ikke at frihedsberøve pt., da pt. er til væsentlig og nærliggende fare for ...\n\nPt. er underrettet om den iværksatte tvang, om baggrunden for tvangstilbageholdelsen, om formålet hermed, samt vejledt om udsigterne til en bedring af helbredstilstanden.',
        hasPlaceholder: true,
        inputPlaceholder: 'Hvem/hvad er pt. til fare for? (f.eks. sig selv / andre)...',
        exclude: ['coercion_retention_treatment']
    },

    // --- TVANGSINDLÆGGELSE ---
    {
        id: 'coercion_admission_treatment',
        label: 'Behandling',
        category: 'Tvangsindlæggelse',
        text: 'Pt. nægter at blive indlagt og kan ikke motiveres for frivillig indlæggelse. Der har været passende betænkningstid.\nPt. vurderes at være sindssyg, og det vil være uforsvarligt ikke at frihedsberøve pt. med henblik på behandling, da udsigten til afgørende bedring af tilstanden vil være væsentligt forringet, hvis pt. ikke bliver indlagt. Der er et klart behandlingsbehov, som ikke kan klares ambulant for nuværende. Det vurderes, at pt. i nuværende tilstand ikke vil kunne tage imod relevant behandling i ambulant regi.\n\nPt. er underrettet om den iværksatte tvang, om baggrunden for tvangsindlæggelsen, om formålet hermed, samt vejledt om udsigterne til en bedring af helbredstilstanden.',
        exclude: ['coercion_admission_danger']
    },
    {
        id: 'coercion_admission_danger',
        label: 'Fare',
        category: 'Tvangsindlæggelse',
        text: 'Pt. nægter at blive indlagt og kan ikke motiveres for frivillig indlæggelse. Der har været passende betænkningstid.\nPt. vurderes at være sindssyg, og det vil være uforsvarligt ikke at frihedsberøve pt., da pt. er til væsentlig og nærliggende fare for ...\n\nPt. er underrettet om den iværksatte tvang, om baggrunden for tvangsindlæggelsen, om formålet hermed, samt vejledt om udsigterne til en bedring af helbredstilstanden.',
        hasPlaceholder: true,
        inputPlaceholder: 'Hvem/hvad er pt. til fare for? (f.eks. sig selv / andre)...',
        exclude: ['coercion_admission_treatment']
    },

    // --- REVURDERING ---
    {
        id: 'coercion_reassessment_treatment',
        label: 'Behandling',
        category: 'Revurdering',
        text: 'Pt. kræver sig udskrevet og kan ikke motiveres for frivillig indlæggelse. Der har været passende betænkningstid.\nPt. vurderes at være sindssyg, og det vil være uforsvarligt ikke at opretholde frihedsberøvelsen, da udsigten til afgørende bedring af tilstanden vil være væsentligt forringet, hvis pt. ikke er indlagt med henblik på behandling. Der er et klart behandlingsbehov, som ikke kan klares ambulant for nuværende. Det vurderes, at pt. i nuværende tilstand ikke vil kunne tage imod relevant behandling i ambulant regi.',
        exclude: ['coercion_reassessment_danger']
    },
    {
        id: 'coercion_reassessment_danger',
        label: 'Fare',
        category: 'Revurdering',
        text: 'Pt. kræver sig udskrevet og kan ikke motiveres for frivillig indlæggelse. Der har været passende betænkningstid.\nPt. vurderes at være sindssyg, og det vil være uforsvarligt ikke at opretholde frihedsberøvelsen, da pt. er til væsentlig og nærliggende fare for ...',
        hasPlaceholder: true,
        inputPlaceholder: 'Hvem/hvad er pt. til fare for? (f.eks. sig selv / andre)...',
        exclude: ['coercion_reassessment_treatment']
    },

    // --- BEROLIGENDE MEDICIN ---
    {
        id: 'coercion_sedative_lorazepam',
        label: 'Lorazepam',
        category: 'Beroligende medicin',
        isSedative: true,
        substance: 'Lorazepam',
        fixedDose: '2mg',
        defaultRoute: 'i.m.'
    },
    {
        id: 'coercion_sedative_olanzapine',
        label: 'Olanzapine',
        category: 'Beroligende medicin',
        isSedative: true,
        substance: 'Olanzapine',
        fixedDose: '10mg',
        defaultRoute: 'i.m.'
    },

    // --- BÆLTEFIKSERING ---
    {
        id: 'coercion_belt_application',
        label: 'Anlæggelse',
        category: 'Bæltefiksering',
        text: 'Lægefagligt vurderes det, at det er nødvendigt at tvangsfiksere pt. med bælte mhp. af afværge, at pt. udsætter ..... for nærliggende fare for at lide skade på legeme og helbred. Mindre indgribende foranstaltninger vurderes ikke at have været tilstrækkelige. Fiksering vurderes at være mindstemiddel aktuelt. Der kan ikke peges på relevante alternativer til fiksering på nuværende tidspunkt.',
        hasPlaceholder: true,
        inputPlaceholder: 'Hvem udsættes for fare? (f.eks. sig selv / personalet / medpatienter)...',
        exclude: ['coercion_belt_supervision']
    },
    {
        id: 'coercion_belt_supervision',
        label: 'Tilsyn',
        category: 'Bæltefiksering',
        text: 'Lægefagligt vurderes det, at det er nødvendigt at opretholde tvangsfiksering med bælte mhp. af afværge, at pt. udsætter ..... for nærliggende fare for at lide skade på legeme og helbred. Hensynet til ..... liv, førlighed og sikkerhed tilsiger dette. Mindre indgribende foranstaltninger vurderes ikke at have været tilstrækkelige. Fiksering vurderes at være mindstemiddel aktuelt. Der kan ikke peges på relevante alternativer til fiksering på nuværende tidspunkt. Der arbejdes løbende mod en gradvis udtrapning af fikseringen.',
        hasPlaceholder: true,
        inputPlaceholder: 'Hvem udsættes for fare? (f.eks. sig selv / personalet)...',
        exclude: ['coercion_belt_application']
    }
];
