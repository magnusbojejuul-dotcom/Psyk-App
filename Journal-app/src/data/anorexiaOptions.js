export const ANOREXIA_OPTIONS = [
    { id: 'an_cal_count', label: 'Tæller kalorier', category: 'Spiseadfærd & Mønstre', text: 'Der tælles kalorier.', smartMerge: { prefix: 'Der ', item: 'tælles kalorier', suffix: '.' } },
    { id: 'an_meals_skipped', label: 'Springes måltider over?', category: 'Spiseadfærd & Mønstre', text: 'Der springes måltider over.', hasInput: true, inputPlaceholder: 'Hvilke måltider?', detailInParens: true, smartMerge: { prefix: 'Der ', item: 'springes måltider over', suffix: '.' } },
    { id: 'an_fluid_meal', label: 'Væske til måltid', category: 'Spiseadfærd & Mønstre', text: 'Der drikkes væske til hvert måltid.', smartMerge: { prefix: 'Der ', item: 'drikkes væske til hvert måltid', suffix: '.' } },
    { id: 'an_comp_lax', label: 'Afføringsmiddel', category: 'Kompenserende Adfærd', text: 'Benytter afføringsmidler.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'afføringsmidler', suffix: '.' } },
    { id: 'an_comp_vomit', label: 'Opkast', category: 'Kompenserende Adfærd', text: 'Benytter provokeret opkast.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'provokeret opkast', suffix: '.' } },
    { id: 'an_comp_exercise', label: 'Motion', category: 'Kompenserende Adfærd', text: 'Benytter overdreven motion.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'overdreven motion', suffix: '.' } },
    { id: 'an_ord_standard', label: 'Standard kosttilskud pt.', category: 'Standard Ordinationer', text: 'Patienten får ikke kosttilskud. Der ordineres:\nMEDICIN:\nrp. Multivitamin x 1 dagl\nrp. Thiamin 300 mg x 1 dagl i 3 uger, gerne før første måltid.\nrp. Unikalk x 2 dagl' }
];

export const PLAN_OPTIONS = [
    { id: 'pl_adm', label: 'Indlæggelse (Frivillig)', category: 'Behandling & Forløb', text: 'Indlægges frivilligt til observation og behandling.' },
    { id: 'pl_adm_tvang', label: 'Indlæggelse (Tvang)', category: 'Behandling & Forløb', text: 'Indlægges på tvang (se særskilt tvangspapir).' },
    { id: 'pl_amb', label: 'Ambulant opfølgning', category: 'Behandling & Forløb', text: 'Udskrives til ambulant opfølgning.', hasInput: true },
    { id: 'pl_gp', label: 'Henvises til egen læge', category: 'Behandling & Forløb', text: 'Afsluttes herfra. Henvises til opfølgning hos egen læge.' },

    { id: 'pl_med_start', label: 'Opstart af medicin', category: 'Medicin', text: 'Der opstartes ny medicinsk behandling.', hasInput: true, inputPlaceholder: 'Præparat/Dosis' },
    { id: 'pl_med_adj', label: 'Justering af medicin', category: 'Medicin', text: 'Nuværende medicin justeres.', hasInput: true },

    { id: 'pl_obs', label: 'Tæt observation', category: 'Observationer', text: 'Ordineres tæt observation i afsnittet.' },

    { id: 'pl_blood', label: 'Blodprøver bestilt', category: 'Undersøgelser', text: 'Standard psykiatripakke og ekg er bestilt.' },
    { id: 'pl_tox', label: 'Urin-tox screen', category: 'Undersøgelser', text: 'Der udføres rusmiddelscreening (U-tox).' }
];
