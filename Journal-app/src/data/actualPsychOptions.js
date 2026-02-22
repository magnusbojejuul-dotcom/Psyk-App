export const DEP_CORE_IDS = ['dep_core_mood', 'dep_core_interest', 'dep_core_energy'];
export const DEP_ACC_IDS = ['dep_acc_conf', 'dep_acc_guilt', 'dep_acc_sui', 'dep_acc_conc', 'dep_acc_agit', 'dep_acc_sleep', 'dep_acc_app'];

export const ACTUAL_PSYCH_OPTIONS = [
    { id: 'ap_reason', label: 'Årsag (Fritekst)', category: 'Henvendelse & Problem', text: 'Patienten henvender sig grundet', hasInput: true, inputPlaceholder: 'Primære problematik...' },
    { id: 'ap_prob_depress', label: 'Depressive symptomer', category: 'Henvendelse & Problem', text: 'Depressive symptomer.', smartMerge: { prefix: 'Henvendelsen drejer sig primært om ', item: 'depressive symptomer', suffix: '.' } },
    { id: 'ap_prob_anxiety', label: 'Angst/Uro', category: 'Henvendelse & Problem', text: 'Angst og uro.', smartMerge: { prefix: 'Henvendelsen drejer sig primært om ', item: 'angst og uro', suffix: '.' } },
    { id: 'ap_prob_suicid', label: 'Selvmordstanker', category: 'Henvendelse & Problem', text: 'Selvmordstanker.', smartMerge: { prefix: 'Henvendelsen drejer sig primært om ', item: 'selvmordstanker', suffix: '.' } },
    { id: 'ap_prob_hallu', label: 'Hallucinationer', category: 'Henvendelse & Problem', text: 'Oplevelser af hallucinationer.', smartMerge: { prefix: 'Henvendelsen drejer sig primært om ', item: 'oplevelser af hallucinationer', suffix: '.' } },
    { id: 'ap_prob_sleep', label: 'Søvnproblemer', category: 'Henvendelse & Problem', text: 'Søvnproblemer.', smartMerge: { prefix: 'Henvendelsen drejer sig primært om ', item: 'søvnproblemer', suffix: '.' } },

    { id: 'ap_sim_yes', label: 'Har oplevet før', category: 'Forløb & Historik', text: 'Der er anamnestisk oplysninger om lignende symptomer tidligere.', exclude: ['ap_sim_no'], smartMerge: { prefix: 'Anamnestisk er der oplysninger om ', item: 'tidligere lignende symptomer', suffix: '.' } },
    { id: 'ap_sim_no', label: 'Aldrig oplevet før', category: 'Forløb & Historik', text: 'Der er ikke tidligere oplevet lignende symptomer.', isDefault: true, exclude: ['ap_sim_yes'] },
    { id: 'ap_diag_yes', label: 'Tidl. diagnose', category: 'Forløb & Historik', text: 'Der foreligger tidligere psykiatriske diagnoser.', exclude: ['ap_diag_no'], smartMerge: { prefix: 'Anamnestisk er der oplysninger om ', item: 'tidligere diagnoser', suffix: '.' } },
    { id: 'ap_diag_no', label: 'Ingen tidl. diagnose', category: 'Forløb & Historik', text: 'Ingen tidligere psykiatriske diagnoser.', isDefault: true, exclude: ['ap_diag_yes'] },
    { id: 'ap_treat_yes', label: 'Tidl. behandling', category: 'Forløb & Historik', text: 'Pt. har tidligere modtaget behandling for dette.', exclude: ['ap_treat_no'], smartMerge: { prefix: 'Anamnestisk er der oplysninger om ', item: 'tidligere behandling for dette', suffix: '.' } },
    { id: 'ap_treat_no', label: 'Ingen tidl. beh.', category: 'Forløb & Historik', text: 'Ingen tidligere behandling for dette.', isDefault: true, exclude: ['ap_treat_yes'] },

    { id: 'ap_worse', label: 'Tilstand forværret', category: 'Udvikling & Faktorer', text: 'Tilstanden er blevet værre.', exclude: ['ap_unchanged', 'ap_better'], smartMerge: { prefix: 'Aktuelt er tilstanden ', item: 'forværret', suffix: '.' } },
    { id: 'ap_unchanged', label: 'Tilstand uændret', category: 'Udvikling & Faktorer', text: 'Tilstanden er uændret.', isDefault: true, exclude: ['ap_worse', 'ap_better'], smartMerge: { prefix: 'Aktuelt er tilstanden ', item: 'uændret', suffix: '.' } },
    { id: 'ap_better', label: 'Tilstand bedret', category: 'Udvikling & Faktorer', text: 'Tilstanden er blevet bedre.', exclude: ['ap_worse', 'ap_unchanged'], smartMerge: { prefix: 'Aktuelt er tilstanden ', item: 'bedret', suffix: '.' } },

    { id: 'ap_soc_alone', label: 'Bor alene', category: 'Sociale forhold', text: 'Bor alene.', smartMerge: { prefix: 'Socialt: ', item: 'bor alene', suffix: '.' } },
    { id: 'ap_soc_cohab', label: 'Samlevende', category: 'Sociale forhold', text: 'Er samlevende.', smartMerge: { prefix: 'Socialt: ', item: 'er samlevende', suffix: '.' } },
    { id: 'ap_soc_kids', label: 'Har børn', category: 'Sociale forhold', text: 'Har børn.', smartMerge: { prefix: 'Socialt: ', item: 'har børn', suffix: '.' } },
    { id: 'ap_soc_work', label: 'I arbejde', category: 'Sociale forhold', text: 'Er i arbejde.', smartMerge: { prefix: 'Socialt: ', item: 'er i arbejde', suffix: '.' } },
    { id: 'ap_soc_sick', label: 'Sygemeldt', category: 'Sociale forhold', text: 'Er sygemeldt.', smartMerge: { prefix: 'Socialt: ', item: 'er sygemeldt', suffix: '.' } },

    { id: 'dep_none', label: 'Ingen depr. symptomer', category: 'Depression (ICD-10 Screening)', text: 'Ingen tegn på depressive symptomer.', isDefault: true, exclude: [...DEP_CORE_IDS, ...DEP_ACC_IDS] },
    { id: 'dep_core_mood', label: 'Nedtrykthed', category: 'Depression (ICD-10 Screening)', text: 'Nedtrykthed.', exclude: ['dep_none'], smartMerge: { prefix: 'Kernesymptomer: ', item: 'nedtrykthed', suffix: '.' } },
    { id: 'dep_core_interest', label: 'Nedsat lyst/interesse', category: 'Depression (ICD-10 Screening)', text: 'Nedsat lyst/interesse.', exclude: ['dep_none'], smartMerge: { prefix: 'Kernesymptomer: ', item: 'nedsat lyst og interesse', suffix: '.' } },
    { id: 'dep_core_energy', label: 'Nedsat energi/træthed', category: 'Depression (ICD-10 Screening)', text: 'Nedsat energi/træthed.', exclude: ['dep_none'], smartMerge: { prefix: 'Kernesymptomer: ', item: 'nedsat energi og øget trætbarhed', suffix: '.' } },
    { id: 'dep_acc_conf', label: 'Nedsat selvtillid', category: 'Depression (ICD-10 Screening)', text: 'Nedsat selvtillid.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'nedsat selvtillid/selvfølelse', suffix: '.' } },
    { id: 'dep_acc_guilt', label: 'Selvbebrejdelse/Skyld', category: 'Depression (ICD-10 Screening)', text: 'Selvbebrejdelser.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'selvbebrejdelser eller skyldfølelse', suffix: '.' } },
    { id: 'dep_acc_sui', label: 'Døds-/Selvmordstanker', category: 'Depression (ICD-10 Screening)', text: 'Tanker om død/selvmord.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'tanker om død eller selvmord', suffix: '.' } },
    { id: 'dep_acc_conc', label: 'Koncentrationsbesvær', category: 'Depression (ICD-10 Screening)', text: 'Tænke-/koncentrationsbesvær.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'tænke- eller koncentrationsbesvær', suffix: '.' } },
    { id: 'dep_acc_agit', label: 'Agitation/Hæmning', category: 'Depression (ICD-10 Screening)', text: 'Agitation eller hæmning.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'agitation eller hæmning', suffix: '.' } },
    { id: 'dep_acc_sleep', label: 'Søvnforstyrrelser', category: 'Depression (ICD-10 Screening)', text: 'Søvnforstyrrelser.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'søvnforstyrrelser', suffix: '.' } },
    { id: 'dep_acc_app', label: 'Appetit-/Vægtændring', category: 'Depression (ICD-10 Screening)', text: 'Appetit-/vægtændring.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'appetit- eller vægtændring', suffix: '.' } },

    { id: 'ap_subst_none', label: 'Ingen rusmidler', category: 'Rusmidler', text: 'Der benægtes brug af rusmidler.', isDefault: true, exclude: ['ap_subst_alc', 'ap_subst_cann', 'ap_subst_stim'] },
    { id: 'ap_subst_alc', label: 'Alkohol', category: 'Rusmidler', text: 'Angiver forbrug af alkohol.', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Der angives forbrug af ', item: 'alkohol', suffix: '.' } },
    { id: 'ap_subst_cann', label: 'Cannabis', category: 'Rusmidler', text: 'Angiver forbrug af cannabis.', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Der angives forbrug af ', item: 'cannabis', suffix: '.' } },

    { id: 'ap_risk_none', label: 'Ingen selvskade/tanker', category: 'Selvskade & Risiko', text: 'Benægter aktuelle selvmordstanker, planer eller intentioner. Benægter ligeledes aktuel selvskade.', isDefault: true, exclude: ['ap_risk_thoughts', 'ap_risk_plans', 'ap_risk_sh_curr'] },
    { id: 'ap_risk_thoughts', label: 'Selvmordstanker', category: 'Selvskade & Risiko', text: 'Tilkendegiver selvmordstanker', hasInput: true, inputPlaceholder: 'Karakter/Hyppighed', exclude: ['ap_risk_none'] },
    { id: 'ap_risk_plans', label: 'Konkrete planer', category: 'Selvskade & Risiko', text: 'Har konkrete planer om selvmord', hasInput: true, inputPlaceholder: 'Beskriv planer', exclude: ['ap_risk_none'] },
    { id: 'ap_risk_sh_curr', label: 'Aktuel selvskade', category: 'Selvskade & Risiko', text: 'Aktuel selvskadende adfærd', hasInput: true, inputPlaceholder: 'Metode/Hyppighed', exclude: ['ap_risk_none'] }
];
