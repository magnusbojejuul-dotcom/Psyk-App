export const DEP_CORE_IDS = ['dep_core_mood', 'dep_core_interest', 'dep_core_energy'];
export const DEP_ACC_IDS = ['dep_acc_conf', 'dep_acc_guilt', 'dep_acc_sui', 'dep_acc_conc', 'dep_acc_agit', 'dep_acc_sleep', 'dep_acc_app'];

export const PSYCH_NORMAL_IDS = [
    'orient_normal', 'appear_normal', 'att_coop', 'anx_none', 
    'c_form_norm', 'c_emo_good', 'contact_eye_norm', 'aff_adekvat', 
    'mood_neutral', 'motor_normal', 'think_form_norm', 'think_speed_norm', 
    'think_content_norm', 'cog_normal', 'insight_good'
];

export const SOMATIC_NORMAL_IDS = [
    'gen_upavirket', 'cp_normal', 'abd_normal', 'cn_normal', 
    'motor_sys_normal', 'reflex_normal', 'coord_normal', 'gait_normal', 
    'eps_none', 'skin_normal'
];

export const SOMATIC_ACT_NORMAL_IDS = [
    'act_cns_ok', 'act_cp_ok', 'act_gi_ok', 'act_uro_ok', 'act_musc_ok', 'act_sleep_ok', 'act_appetite_ok'
];

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

export const PSYCH_OPTIONS = [
    { id: 'orient_normal', label: 'Fuldt orienteret', category: 'Bevidsthed', text: 'Vågen, klar og orienteret i tid, sted og egne data.', isDefault: true, exclude: ['orient_confused', 'orient_delir', 'orient_sløv'] },
    { id: 'orient_sløv', label: 'Somnolent/Sløv', category: 'Bevidsthed', text: 'Somnolent og sløv i kontakten.', exclude: ['orient_normal', 'orient_confused', 'orient_delir'] },
    { id: 'orient_confused', label: 'Konfus', category: 'Bevidsthed', text: 'Konfus og desorienteret.', exclude: ['orient_normal', 'orient_delir', 'orient_sløv'] },
    
    { id: 'appear_normal', label: 'Normal fremtoning', category: 'Fremtoning & Kontakt', text: 'Normal fremtoning, herunder soigneret og alderssvarende påklædning.', isDefault: true, exclude: ['appear_unkept'] },
    { id: 'appear_unkept', label: 'Usoigneret', category: 'Fremtoning & Kontakt', text: 'Usoigneret.', exclude: ['appear_normal'], smartMerge: { prefix: 'Fremtræden er ', item: 'usoigneret', suffix: '.' } },
    
    { id: 'att_coop', label: 'Samarbejdsvillig', category: 'Fremtoning & Kontakt', text: 'Venlig og samarbejdsvillig i kontakten.', isDefault: true, exclude: ['att_guard', 'att_hostile'] },
    { id: 'att_guard', label: 'Afvisende/Guarded', category: 'Fremtoning & Kontakt', text: 'Guarded og afvisende.', exclude: ['att_coop'], smartMerge: { prefix: 'Holdningen er ', item: 'guarded og afvisende', suffix: '.' } },
    { id: 'att_hostile', label: 'Fjendtlig', category: 'Fremtoning & Kontakt', text: 'Fjendtlig.', exclude: ['att_coop'], smartMerge: { prefix: 'Holdningen er ', item: 'fjendtlig', suffix: '.' } },
    
    { id: 'contact_eye_norm', label: 'Naturlig øjenkontakt', category: 'Fremtoning & Kontakt', text: 'Øjenkontakten er naturlig.', isDefault: true, exclude: ['contact_eye_avoid', 'contact_eye_stare'] },
    { id: 'contact_eye_avoid', label: 'Undvigende øjne', category: 'Fremtoning & Kontakt', text: 'Undvigende øjenkontakt.', exclude: ['contact_eye_norm'], smartMerge: { prefix: 'Øjenkontakten er ', item: 'undvigende', suffix: '.' } },
    
    { id: 'mood_neutral', label: 'Neutralt', category: 'Stemningsleje', text: 'Stemningslejet vurderes neutralt.', isDefault: true, exclude: ['mood_low', 'mood_high'] },
    { id: 'mood_low', label: 'Sænket', category: 'Stemningsleje', text: 'Stemningslejet vurderes sænket.', exclude: ['mood_neutral', 'mood_high'] },
    { id: 'mood_high', label: 'Løftet/Manisk', category: 'Stemningsleje', text: 'Stemningslejet er løftet.', exclude: ['mood_neutral', 'mood_low'] },
    
    { id: 'aff_adekvat', label: 'Adækvat affekt', category: 'Stemningsleje', text: 'Affekten er adækvat og svinger relevant.', isDefault: true, exclude: ['aff_flat', 'aff_labil'] },
    { id: 'aff_flat', label: 'Affladet', category: 'Stemningsleje', text: 'Affekten er affladet.', exclude: ['aff_adekvat'], smartMerge: { prefix: 'Affekten er ', item: 'affladet', suffix: '.' } },
    { id: 'aff_labil', label: 'Affektlabil', category: 'Stemningsleje', text: 'Labil.', exclude: ['aff_adekvat'], smartMerge: { prefix: 'Affekten er ', item: 'labil', suffix: '.' } },

    { id: 'think_form_norm', label: 'Normal form/sprog', category: 'Tænkning (Form & Indhold)', text: 'Sproget er nuanceret. Talen er samlet og relevant.', isDefault: true, exclude: ['think_incoh', 'think_flight'] },
    { id: 'think_incoh', label: 'Inkohærent', category: 'Tænkning (Form & Indhold)', text: 'Springende og inkohærent.', exclude: ['think_form_norm'], smartMerge: { prefix: 'Tanken er ', item: 'springende og inkohærent', suffix: '.' } },
    { id: 'think_flight', label: 'Tankeflugt', category: 'Tænkning (Form & Indhold)', text: 'Præget af tankeflugt.', exclude: ['think_form_norm'], smartMerge: { prefix: 'Tanken er ', item: 'præget af tankeflugt', suffix: '.' } },
    
    { id: 'ap_delusion_none', label: 'Ingen vrangforestillinger', category: 'Tænkning (Form & Indhold)', text: 'Beskriver ingen vrangforestillinger.', isDefault: true, exclude: ['ap_delusion_para', 'ap_delusion_megalo'] },
    { id: 'ap_delusion_para', label: 'Paranoia (Persekutorisk)', category: 'Tænkning (Form & Indhold)', text: 'Oplever paranoide/persekutoriske vrangforestillinger', hasInput: true, exclude: ['ap_delusion_none'], smartMerge: { prefix: 'Tankeindholdet er præget af ', item: 'paranoide (persekutoriske) vrangforestillinger', suffix: ':' } },
    
    { id: 'p_hallu_none', label: 'Ingen hallucinationer', category: 'Psykotiske symptomer', text: 'Beskriver ingen hallucinationer. Viser ikke tegn på hallucineret adfærd.', isDefault: true, exclude: ['p_hallu_aud', 'p_hallu_vis'] },
    { id: 'p_hallu_aud', label: 'Hørehallucinationer', category: 'Psykotiske symptomer', text: 'Beskriver hørehallucinationer.', hasInput: true, exclude: ['p_hallu_none'] },
    { id: 'p_hallu_vis', label: 'Synshallucinationer', category: 'Psykotiske symptomer', text: 'Beskriver synshallucinationer.', hasInput: true, exclude: ['p_hallu_none'] },

    { id: 'insight_good', label: 'God indsigt', category: 'Kognition & Indsigt', text: 'Har relevant og god sygdomsindsigt.', isDefault: true, exclude: ['insight_none', 'insight_part'] },
    { id: 'insight_part', label: 'Partiel indsigt', category: 'Kognition & Indsigt', text: 'Har partiel sygdomsindsigt.', exclude: ['insight_good', 'insight_none'] },
    { id: 'insight_none', label: 'Ingen indsigt', category: 'Kognition & Indsigt', text: 'Ingen sygdomsindsigt.', exclude: ['insight_good', 'insight_part'] },
];

export const SOMATIC_ACT_OPTIONS = [
    { id: 'act_cns_ok', label: 'Ingen CNS klager', category: 'CNS', text: 'Benægter hovedpine, svimmelhed, besvimelse, synsforstyrrelser eller kramper.', isDefault: true, exclude: ['act_cns_headache', 'act_cns_dizzy'] },
    { id: 'act_cns_headache', label: 'Hovedpine', category: 'CNS', text: 'Angiver hovedpine.', exclude: ['act_cns_ok'], smartMerge: { prefix: 'Angiver ', item: 'hovedpine', suffix: '.' } },
    { id: 'act_cns_dizzy', label: 'Svimmelhed', category: 'CNS', text: 'Angiver svimmelhed.', hasInput: true, detailInParens: true, exclude: ['act_cns_ok'], smartMerge: { prefix: 'Angiver ', item: 'svimmelhed', suffix: '.' } },
    
    { id: 'act_cp_ok', label: 'Ingen CP klager', category: 'Cardio/Pulm', text: 'Ingen klager over brystsmerter, hjertebanken eller dyspnø.', isDefault: true, exclude: ['act_cp_pain', 'act_cp_dysp'] },
    { id: 'act_cp_pain', label: 'Brystsmerter', category: 'Cardio/Pulm', text: 'Angiver brystsmerter.', exclude: ['act_cp_ok'], smartMerge: { prefix: 'Angiver ', item: 'brystsmerter', suffix: '.' } },
    { id: 'act_cp_dysp', label: 'Dyspnø', category: 'Cardio/Pulm', text: 'Angiver dyspnø.', exclude: ['act_cp_ok'], smartMerge: { prefix: 'Angiver ', item: 'dyspnø', suffix: '.' } },
    
    { id: 'act_gi_ok', label: 'Ingen GI klager', category: 'Gastro-Intestinal', text: 'Ingen kvalme, opkastninger eller ændring i afføringsmønster.', isDefault: true, exclude: ['act_gi_nausea', 'act_gi_pain'] },
    { id: 'act_gi_nausea', label: 'Kvalme', category: 'Gastro-Intestinal', text: 'Angiver kvalme.', exclude: ['act_gi_ok'], smartMerge: { prefix: 'Angiver ', item: 'kvalme', suffix: '.' } },
    { id: 'act_gi_pain', label: 'Mavesmerter', category: 'Gastro-Intestinal', text: 'Angiver mavesmerter.', exclude: ['act_gi_ok'], smartMerge: { prefix: 'Angiver ', item: 'mavesmerter', suffix: '.' } },
    
    { id: 'act_uro_ok', label: 'Ingen URO klager', category: 'Urologisk', text: 'Ingen vandladningsgener.', isDefault: true, exclude: ['act_uro_pain', 'act_uro_dysuria'] },
    { id: 'act_uro_dysuria', label: 'Svie/Smerter', category: 'Urologisk', text: 'Angiver svie/smerter ved vandladning.', exclude: ['act_uro_ok'], smartMerge: { prefix: 'Angiver ', item: 'svie/smerter ved vandladning', suffix: '.' } },
    
    { id: 'act_sleep_ok', label: 'Søvn normal', category: 'Søvn', text: 'Sover uforstyrret igennem natten.', isDefault: true, exclude: ['act_sleep_insom'] },
    { id: 'act_sleep_insom', label: 'Indsovningsbesvær', category: 'Søvn', text: 'Angiver indsovningsbesvær.', exclude: ['act_sleep_ok'], smartMerge: { prefix: 'Angiver ', item: 'indsovningsbesvær', suffix: '.' } }
];

export const SOMATIC_OBJ_OPTIONS = [
    { id: 'gen_upavirket', label: 'Upåvirket', category: 'Almentilstand', text: 'Upåvirket. Normal ernæringstilstand.', isDefault: true, exclude: ['gen_medtaget'] },
    { id: 'gen_medtaget', label: 'Medtaget', category: 'Almentilstand', text: 'Fremstår medtaget.', exclude: ['gen_upavirket'], smartMerge: { prefix: 'Fremstår ', item: 'medtaget', suffix: '.' } },
    
    { id: 'cp_normal', label: 'St.c. et p. normal', category: 'Stethoscopia', text: 'St.c.: Regelmæssig hjerteaktion uden mislyde. St.p.: Vesikulær respiration uden bilyde.', isDefault: true, exclude: ['cp_abnorm_c', 'cp_abnorm_p'] },
    { id: 'cp_abnorm_c', label: 'St.c. uregelmæssig', category: 'Stethoscopia', text: 'St.c.: Uregelmæssig hjerteaktion (arytmi).', exclude: ['cp_normal'] },
    { id: 'cp_abnorm_p', label: 'St.p. bilyde', category: 'Stethoscopia', text: 'St.p.: Der høres bilyde.', exclude: ['cp_normal'] },
    
    { id: 'abd_normal', label: 'Abdomen normal', category: 'Abdomen & Nyreloger', text: 'Abdomen blød og uøm. Ingen udfyldninger. Normale tarmlyde.', isDefault: true, exclude: ['abd_tender'] },
    { id: 'abd_tender', label: 'Ømhed', category: 'Abdomen & Nyreloger', text: 'Ømhed ved palpation.', exclude: ['abd_normal'], hasInput: true, detailInParens: true, smartMerge: { prefix: 'Der findes ', item: 'ømhed ved palpation', suffix: '.' } },
    
    { id: 'cn_normal', label: 'Kranienerver normal', category: 'Neurologisk', text: 'Intet abnormt påvist. Pupiller egale med normal lysrefleks.', isDefault: true, exclude: ['cn_pupil'] },
    { id: 'cn_pupil', label: 'Pupilforhold afviger', category: 'Neurologisk', text: 'Afvigende pupilforhold:', hasInput: true, exclude: ['cn_normal'] },
    
    { id: 'motor_sys_normal', label: 'Motorik/Kraft normal', category: 'Neurologisk', text: 'Strakt arm- og bentest uden nedsynkning.', isDefault: true, exclude: ['motor_weak_oe'] },
    { id: 'motor_weak_oe', label: 'Kraftnedsættelse', category: 'Neurologisk', text: 'Nedsat kraft.', exclude: ['motor_sys_normal'] },
    
    { id: 'eps_none', label: 'Ingen EPS', category: 'Neurologisk (EPS)', text: 'Ingen bradykinesi, rigiditet eller ufrivillige bevægelser.', isDefault: true, exclude: ['eps_rigid', 'eps_tremor'] },
    { id: 'eps_rigid', label: 'Rigiditet', category: 'Neurologisk (EPS)', text: 'Der findes rigiditet ved passiv bevægelse.', exclude: ['eps_none'], smartMerge: { prefix: 'Der observeres ', item: 'rigiditet', suffix: '.' } },
    { id: 'eps_tremor', label: 'Tremor', category: 'Neurologisk (EPS)', text: 'Der observeres tremor.', exclude: ['eps_none'], smartMerge: { prefix: 'Der observeres ', item: 'tremor', suffix: '.' } },
    
    { id: 'skin_normal', label: 'Hud: ingen mærker', category: 'Hud/Traumer', text: 'Ingen tegn på friske eller ældre læsioner eller injektionsmærker.', isDefault: true, exclude: ['skin_cut_fresh'] },
    { id: 'skin_cut_fresh', label: 'Friske snitsår', category: 'Hud/Traumer', text: 'Der ses friske snitsår.', hasInput: true, detailInParens: true, exclude: ['skin_normal'], smartMerge: { prefix: 'Der ses ', item: 'friske snitsår', suffix: '.' } }
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

export const ANOREXIA_OPTIONS = [
    { id: 'an_cal_count', label: 'Tæller kalorier', category: 'Spiseadfærd & Mønstre', text: 'Der tælles kalorier.', smartMerge: { prefix: 'Der ', item: 'tælles kalorier', suffix: '.' } },
    { id: 'an_meals_skipped', label: 'Springes måltider over?', category: 'Spiseadfærd & Mønstre', text: 'Der springes måltider over.', hasInput: true, inputPlaceholder: 'Hvilke måltider?', detailInParens: true, smartMerge: { prefix: 'Der ', item: 'springes måltider over', suffix: '.' } },
    { id: 'an_fluid_meal', label: 'Væske til måltid', category: 'Spiseadfærd & Mønstre', text: 'Der drikkes væske til hvert måltid.', smartMerge: { prefix: 'Der ', item: 'drikkes væske til hvert måltid', suffix: '.' } },
    { id: 'an_comp_lax', label: 'Afføringsmiddel', category: 'Kompenserende Adfærd', text: 'Benytter afføringsmidler.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'afføringsmidler', suffix: '.' } },
    { id: 'an_comp_vomit', label: 'Opkast', category: 'Kompenserende Adfærd', text: 'Benytter provokeret opkast.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'provokeret opkast', suffix: '.' } },
    { id: 'an_comp_exercise', label: 'Motion', category: 'Kompenserende Adfærd', text: 'Benytter overdreven motion.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'overdreven motion', suffix: '.' } },
    { id: 'an_ord_standard', label: 'Standard kosttilskud pt.', category: 'Standard Ordinationer', text: 'Patienten får ikke kosttilskud. Der ordineres:\nMEDICIN:\nrp. Multivitamin x 1 dagl\nrp. Thiamin 300 mg x 1 dagl i 3 uger, gerne før første måltid.\nrp. Unikalk x 2 dagl' }
];
