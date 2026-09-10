export const DEP_CORE_IDS = ['dep_core_mood', 'dep_core_interest', 'dep_core_energy'];
export const DEP_ACC_IDS = ['dep_acc_conf', 'dep_acc_guilt', 'dep_acc_sui', 'dep_acc_conc', 'dep_acc_agit', 'dep_acc_sleep', 'dep_acc_app'];
export const MANIA_OPTION_IDS = [
    'ap_mania_elevated', 'ap_mania_irritable', 'ap_mania_hyper', 'ap_mania_sleep',
    'ap_mania_speech', 'ap_mania_flight', 'ap_mania_inhibit', 'ap_mania_megalo',
    'ap_mania_duration', 'ap_mania_freetext'
];

export const ACTUAL_PSYCH_OPTIONS = [
    // 1. Henvendelse & Problem
    { id: 'ap_reason', label: 'Søger hjælp fordi (Fritekst)', category: 'Henvendelse & Problem', text: 'Patienten henvender sig grundet', hasInput: true, inputPlaceholder: 'Primære problematik...' },
    { id: 'ap_prob_depress', label: 'Depressive symptomer', category: 'Henvendelse & Problem', text: 'Depressive symptomer.', smartMerge: { prefix: 'Henvendelsen drejer sig primært om ', item: 'depressive symptomer', suffix: '.' } },
    { id: 'ap_prob_anxiety', label: 'Angst/Uro', category: 'Henvendelse & Problem', text: 'Angst og uro.', smartMerge: { prefix: 'Henvendelsen drejer sig primært om ', item: 'angst og uro', suffix: '.' } },
    { id: 'ap_prob_suicid', label: 'Selvmordstanker', category: 'Henvendelse & Problem', text: 'Selvmordstanker.', smartMerge: { prefix: 'Henvendelsen drejer sig primært om ', item: 'selvmordstanker', suffix: '.' } },
    { id: 'ap_prob_hallu', label: 'Hallucinationer', category: 'Henvendelse & Problem', text: 'Oplevelser af hallucinationer.', smartMerge: { prefix: 'Henvendelsen drejer sig primært om ', item: 'oplevelser af hallucinationer', suffix: '.' } },
    { id: 'ap_prob_sleep', label: 'Søvnproblemer', category: 'Henvendelse & Problem', text: 'Søvnproblemer.', smartMerge: { prefix: 'Henvendelsen drejer sig primært om ', item: 'søvnproblemer', suffix: '.' } },

    // 2. Forløb & Historik
    { id: 'ap_sim_yes', label: 'Har oplevet før', category: 'Forløb & Historik', text: 'Der er anamnestisk oplysninger om lignende symptomer tidligere.', exclude: ['ap_sim_no'], smartMerge: { prefix: 'Anamnestisk er der oplysninger om ', item: 'tidligere lignende symptomer', suffix: '.' } },
    { id: 'ap_sim_no', label: 'Aldrig oplevet før', category: 'Forløb & Historik', text: 'Der er ikke tidligere oplevet lignende symptomer.', isDefault: true, exclude: ['ap_sim_yes'] },
    { id: 'ap_diag_yes', label: 'Tidl. diagnose', category: 'Forløb & Historik', text: 'Der foreligger tidligere psykiatriske diagnoser.', exclude: ['ap_diag_no'], smartMerge: { prefix: 'Anamnestisk er der oplysninger om ', item: 'tidligere diagnoser', suffix: '.' } },
    { id: 'ap_diag_no', label: 'Ingen tidl. diagnose', category: 'Forløb & Historik', text: 'Ingen tidligere psykiatriske diagnoser.', isDefault: true, exclude: ['ap_diag_yes'] },
    { id: 'ap_treat_yes', label: 'Tidl. behandling', category: 'Forløb & Historik', text: 'Pt. har tidligere modtaget behandling for dette.', exclude: ['ap_treat_no'], smartMerge: { prefix: 'Anamnestisk er der oplysninger om ', item: 'tidligere behandling for dette', suffix: '.' } },
    { id: 'ap_treat_no', label: 'Ingen tidl. beh.', category: 'Forløb & Historik', text: 'Ingen tidligere behandling for dette.', isDefault: true, exclude: ['ap_treat_yes'] },
    { id: 'ap_tried', label: 'Tidl. afprøvet (Fritekst)', category: 'Forløb & Historik', text: 'Af tidligere tiltag/behandling er afprøvet', hasInput: true, inputPlaceholder: 'Medicin, terapi, etc.' },

    // 3. Udvikling & Faktorer
    { id: 'ap_worse', label: 'Tilstand forværret', category: 'Udvikling & Faktorer', text: 'Tilstanden er blevet værre.', exclude: ['ap_unchanged', 'ap_better'], smartMerge: { prefix: 'Aktuelt er tilstanden ', item: 'forværret', suffix: '.' } },
    { id: 'ap_unchanged', label: 'Tilstand uændret', category: 'Udvikling & Faktorer', text: 'Tilstanden er uændret.', isDefault: true, exclude: ['ap_worse', 'ap_better'], smartMerge: { prefix: 'Aktuelt er tilstanden ', item: 'uændret', suffix: '.' } },
    { id: 'ap_better', label: 'Tilstand bedret', category: 'Udvikling & Faktorer', text: 'Tilstanden er blevet bedre.', exclude: ['ap_worse', 'ap_unchanged'], smartMerge: { prefix: 'Aktuelt er tilstanden ', item: 'bedret', suffix: '.' } },
    { id: 'ap_modifying', label: 'Modificeres af (Fritekst)', category: 'Udvikling & Faktorer', text: 'Symptomerne angives at forværres/bedres af', hasInput: true, inputPlaceholder: 'Hvad påvirker tilstanden?' },

    // 4. Sociale forhold
    { id: 'ap_soc_unspec', label: 'Socialt uafklaret', category: 'Sociale forhold', text: 'Sociale forhold ikke nærmere belyst.', isDefault: true, exclude: ['ap_soc_alone', 'ap_soc_cohab', 'ap_soc_kids', 'ap_soc_work', 'ap_soc_sick', 'ap_soc_pension', 'ap_soc_student'] },
    { id: 'ap_soc_alone', label: 'Bor alene', category: 'Sociale forhold', text: 'Bor alene.', exclude: ['ap_soc_unspec', 'ap_soc_cohab'], smartMerge: { prefix: 'Socialt: ', item: 'bor alene', suffix: '.' } },
    { id: 'ap_soc_cohab', label: 'Samlevende', category: 'Sociale forhold', text: 'Er samlevende.', exclude: ['ap_soc_unspec', 'ap_soc_alone'], smartMerge: { prefix: 'Socialt: ', item: 'er samlevende', suffix: '.' } },
    { id: 'ap_soc_kids', label: 'Har børn', category: 'Sociale forhold', text: 'Har børn.', exclude: ['ap_soc_unspec'], smartMerge: { prefix: 'Socialt: ', item: 'har børn', suffix: '.' } },
    { id: 'ap_soc_work', label: 'I arbejde', category: 'Sociale forhold', text: 'Er i arbejde.', exclude: ['ap_soc_unspec', 'ap_soc_sick', 'ap_soc_pension', 'ap_soc_student'], smartMerge: { prefix: 'Socialt: ', item: 'er i arbejde', suffix: '.' } },
    { id: 'ap_soc_student', label: 'Studerende', category: 'Sociale forhold', text: 'Er studerende.', exclude: ['ap_soc_unspec', 'ap_soc_work', 'ap_soc_sick', 'ap_soc_pension'], smartMerge: { prefix: 'Socialt: ', item: 'er studerende', suffix: '.' } },
    { id: 'ap_soc_sick', label: 'Sygemeldt', category: 'Sociale forhold', text: 'Er sygemeldt.', exclude: ['ap_soc_unspec', 'ap_soc_work', 'ap_soc_pension', 'ap_soc_student'], smartMerge: { prefix: 'Socialt: ', item: 'er sygemeldt', suffix: '.' } },
    { id: 'ap_soc_pension', label: 'Førtidspension', category: 'Sociale forhold', text: 'Modtager førtidspension.', exclude: ['ap_soc_unspec', 'ap_soc_work', 'ap_soc_sick', 'ap_soc_student'], smartMerge: { prefix: 'Socialt: ', item: 'modtager førtidspension', suffix: '.' } },

    // 5. Funktionsniveau & ADL
    { id: 'ap_func_unchanged', label: 'Hverdag uændret', category: 'Funktionsniveau & ADL', text: 'Funktionsniveauet er uændret.', isDefault: true, exclude: ['ap_func_school', 'ap_func_work', 'ap_func_social', 'ap_func_adl'] },
    { id: 'ap_func_school', label: 'Skole/Uddannelse', category: 'Funktionsniveau & ADL', text: 'Skole/uddannelse er påvirket.', exclude: ['ap_func_unchanged'], smartMerge: { prefix: 'Det daglige funktionsniveau er påvirket i forhold til ', item: 'skole/uddannelse', suffix: '.' } },
    { id: 'ap_func_work', label: 'Arbejde', category: 'Funktionsniveau & ADL', text: 'Arbejdet er påvirket.', exclude: ['ap_func_unchanged'], smartMerge: { prefix: 'Det daglige funktionsniveau er påvirket i forhold til ', item: 'arbejde', suffix: '.' } },
    { id: 'ap_func_social', label: 'Socialt/Fritid', category: 'Funktionsniveau & ADL', text: 'Sociale relationer/fritid er påvirket.', exclude: ['ap_func_unchanged'], smartMerge: { prefix: 'Det daglige funktionsniveau er påvirket i forhold til ', item: 'sociale relationer', suffix: '.' } },
    { id: 'ap_func_adl', label: 'ADL (Daglige gøremål)', category: 'Funktionsniveau & ADL', text: 'Daglige gøremål (ADL) er påvirket.', exclude: ['ap_func_unchanged'], smartMerge: { prefix: 'Det daglige funktionsniveau er påvirket i forhold til ', item: 'daglige gøremål (ADL)', suffix: '.' } },

    // --- ICD-10 F0-F4 PSYKIATRISK SCREENING ---

    // 6. F0 - Organiske årsager
    { id: 'ap_f0_none', label: 'Ingen organisk mistanke', category: 'F0 - Organiske årsager', text: 'Ingen oplysninger om tidligere hovedtraumer, cerebrale insult eller øvrig organisk årsag.', isDefault: true, exclude: ['ap_f0_trauma', 'ap_f0_neuro', 'ap_f0_somatic', 'ap_f0_cog'] },
    { id: 'ap_f0_trauma', label: 'Tidligere hovedtraumer', category: 'F0 - Organiske årsager', text: 'Anamnestisk oplysning om tidligere hovedtraume', hasInput: true, inputPlaceholder: 'Tidspunkt, bevidstløshed, følger...', exclude: ['ap_f0_none'], smartMerge: { prefix: 'Organisk screening: ', item: 'tidligere hovedtraume', suffix: '.' } },
    { id: 'ap_f0_neuro', label: 'Neurologisk sygdom / Kramper', category: 'F0 - Organiske årsager', text: 'Anamnese med kendt neurologisk lidelse eller kramper', hasInput: true, inputPlaceholder: 'Epilepsi, apopleksi, etc.', exclude: ['ap_f0_none'], smartMerge: { prefix: 'Organisk screening: ', item: 'neurologisk sygdom/kramper', suffix: '.' } },
    { id: 'ap_f0_somatic', label: 'Somatisk udløsende sygdom', category: 'F0 - Organiske årsager', text: 'Mistanke om somatisk tilgrundliggende sygdom', hasInput: true, inputPlaceholder: 'Infektion, endokrint, forgiftning...', exclude: ['ap_f0_none'], smartMerge: { prefix: 'Organisk screening: ', item: 'mistanke om somatisk ætiologi', suffix: '.' } },
    { id: 'ap_f0_cog', label: 'Kognitiv svækkelse / Delir', category: 'F0 - Organiske årsager', text: 'Tegn på kognitiv svækkelse eller fluktuerende bevidsthed (obs. delir)', hasInput: true, inputPlaceholder: 'Hukommelse, orientering, tempo...', exclude: ['ap_f0_none'], smartMerge: { prefix: 'Organisk screening: ', item: 'kognitiv påvirkning / obs. delir', suffix: '.' } },

    // 7. F1 - Misbrug & Rusmidler
    { id: 'ap_subst_none', label: 'Ingen rusmidler', category: 'F1 - Misbrug & Rusmidler', text: 'Der benægtes brug af rusmidler (både aktuelt og tidligere).', isDefault: true, exclude: ['ap_subst_alc', 'ap_subst_cann', 'ap_subst_stim', 'ap_subst_benzo', 'ap_subst_opioid', 'ap_subst_prev'] },
    { id: 'ap_subst_alc', label: 'Alkohol (Aktuelt)', category: 'F1 - Misbrug & Rusmidler', text: 'Angiver aktuelt forbrug af alkohol', hasInput: true, inputPlaceholder: 'Genstande pr. uge / mønster', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Rusmidler: Der angives forbrug af ', item: 'alkohol', suffix: '.' } },
    { id: 'ap_subst_cann', label: 'Cannabis', category: 'F1 - Misbrug & Rusmidler', text: 'Angiver forbrug af cannabis', hasInput: true, inputPlaceholder: 'Hyppighed / mængde', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Rusmidler: Der angives forbrug af ', item: 'cannabis', suffix: '.' } },
    { id: 'ap_subst_stim', label: 'Centralstimulerende', category: 'F1 - Misbrug & Rusmidler', text: 'Angiver forbrug af centralstimulerende stoffer (kokain/amfetamin)', hasInput: true, inputPlaceholder: 'Stof / hyppighed', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Rusmidler: Der angives forbrug af ', item: 'centralstimulerende stoffer', suffix: '.' } },
    { id: 'ap_subst_benzo', label: 'Benzodiazepiner', category: 'F1 - Misbrug & Rusmidler', text: 'Angiver forbrug af benzodiazepiner', hasInput: true, inputPlaceholder: 'Præparat / dosis / ordination', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Rusmidler: Der angives forbrug af ', item: 'benzodiazepiner', suffix: '.' } },
    { id: 'ap_subst_opioid', label: 'Opioider', category: 'F1 - Misbrug & Rusmidler', text: 'Angiver forbrug af opioider', hasInput: true, inputPlaceholder: 'Præparat / mængde', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Rusmidler: Der angives forbrug af ', item: 'opioider', suffix: '.' } },
    { id: 'ap_subst_prev', label: 'Tidligere misbrug', category: 'F1 - Misbrug & Rusmidler', text: 'Oplyser om tidligere misbrug i anamnesen', hasInput: true, inputPlaceholder: 'Hvilke stoffer? Remissionsperiode?', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Rusmidler: ', item: 'tidligere misbrugsanamnese', suffix: '.' } },

    // 8. F2 - Psykotiske symptomer
    { 
        id: 'ap_f2_none', 
        label: 'Ingen psykotiske symptomer', 
        category: 'F2 - Psykotiske symptomer', 
        text: 'Beskriver ingen hallucinationer, vrangforestillinger eller formelle tankeforstyrrelser.', 
        isDefault: true, 
        exclude: [
            'ap_hallu_audit', 'ap_hallu_visual', 'ap_hallu_olfact', 'ap_hallu_tactile',
            'ap_delusion_para', 'ap_delusion_megalo', 'ap_delusion_depress', 'ap_delusion_hypo',
            'ap_delusion_control', 'ap_thought_disorder'
        ] 
    },
    { id: 'ap_hallu_audit', label: 'Hørehallucinationer', category: 'F2 - Psykotiske symptomer', text: 'Beskriver hørehallucinationer', hasInput: true, inputPlaceholder: 'Stemmer, imperative, kommenterende...', exclude: ['ap_f2_none'], smartMerge: { prefix: 'Perception: Patienten beskriver ', item: 'hørehallucinationer', suffix: ':' } },
    { id: 'ap_hallu_visual', label: 'Synshallucinationer', category: 'F2 - Psykotiske symptomer', text: 'Beskriver synshallucinationer', hasInput: true, inputPlaceholder: 'Former, personer, skygger...', exclude: ['ap_f2_none'], smartMerge: { prefix: 'Perception: Patienten beskriver ', item: 'synshallucinationer', suffix: ':' } },
    { id: 'ap_hallu_olfact', label: 'Lugt/Smag', category: 'F2 - Psykotiske symptomer', text: 'Beskriver lugt- eller smagshallucinationer', hasInput: true, inputPlaceholder: 'Karakter...', exclude: ['ap_f2_none'], smartMerge: { prefix: 'Perception: Patienten beskriver ', item: 'lugt-/smagshallucinationer', suffix: ':' } },
    { id: 'ap_hallu_tactile', label: 'Taktile hallucinationer', category: 'F2 - Psykotiske symptomer', text: 'Beskriver taktile/somatiske hallucinationer', hasInput: true, inputPlaceholder: 'Karakter...', exclude: ['ap_f2_none'], smartMerge: { prefix: 'Perception: Patienten beskriver ', item: 'taktile hallucinationer', suffix: ':' } },
    { id: 'ap_delusion_para', label: 'Paranoia (Persekutorisk)', category: 'F2 - Psykotiske symptomer', text: 'Oplever paranoide/persekutoriske vrangforestillinger', hasInput: true, inputPlaceholder: 'Forfølgelse, overvågning...', exclude: ['ap_f2_none'], smartMerge: { prefix: 'Tankeindhold: Præget af ', item: 'paranoide (persekutoriske) vrangforestillinger', suffix: ':' } },
    { id: 'ap_delusion_megalo', label: 'Storhed (Megaloman)', category: 'F2 - Psykotiske symptomer', text: 'Giver udtryk for megalomane vrangforestillinger', hasInput: true, inputPlaceholder: 'Særlige evner, rigdom, mission...', exclude: ['ap_f2_none'], smartMerge: { prefix: 'Tankeindhold: Præget af ', item: 'megalomane vrangforestillinger', suffix: ':' } },
    { id: 'ap_delusion_depress', label: 'Depressive / Ruinering', category: 'F2 - Psykotiske symptomer', text: 'Udviser depressive vrangforestillinger', hasInput: true, inputPlaceholder: 'Skyld, straf, økonomisk ruin...', exclude: ['ap_f2_none'], smartMerge: { prefix: 'Tankeindhold: Præget af ', item: 'depressive vrangforestillinger', suffix: ':' } },
    { id: 'ap_delusion_hypo', label: 'Hypokondre', category: 'F2 - Psykotiske symptomer', text: 'Udviser hypokondre vrangforestillinger', hasInput: true, inputPlaceholder: 'Uhelbredelig sygdom, forrådnelse...', exclude: ['ap_f2_none'], smartMerge: { prefix: 'Tankeindhold: Præget af ', item: 'hypokondre vrangforestillinger', suffix: ':' } },
    { id: 'ap_delusion_control', label: 'Styrings- & Påvirkningsoplevelser', category: 'F2 - Psykotiske symptomer', text: 'Oplever styrings- og tankepåvirkningsoplevelser', hasInput: true, inputPlaceholder: 'Styret udefra, tankepåføring/fradrag/udspredelse...', exclude: ['ap_f2_none'], smartMerge: { prefix: 'Tankeindhold: Præget af ', item: 'styrings- og påvirkningsoplevelser', suffix: ':' } },
    { id: 'ap_thought_disorder', label: 'Tankeforstyrrelser', category: 'F2 - Psykotiske symptomer', text: 'Tegn på formelle tankeforstyrrelser', hasInput: true, inputPlaceholder: 'Tankemylder, tankestop, springende, inkohærens...', exclude: ['ap_f2_none'], smartMerge: { prefix: 'Tankegang: Præget af ', item: 'formelle tankeforstyrrelser', suffix: ':' } },

    // 9. F3 - Depression (ICD-10 screening)
    { id: 'dep_none', label: 'Ingen depr. symptomer', category: 'F3 - Depression (ICD-10 screening)', text: 'Ingen tegn på depressive symptomer.', isDefault: true, exclude: [...DEP_CORE_IDS, ...DEP_ACC_IDS, 'dep_duration_2w'] },
    { id: 'dep_core_mood', label: 'Nedtrykthed', category: 'F3 - Depression (ICD-10 screening)', text: 'Nedtrykthed.', exclude: ['dep_none'], smartMerge: { prefix: 'Kernesymptomer: ', item: 'nedtrykthed', suffix: '.' } },
    { id: 'dep_core_interest', label: 'Nedsat lyst/interesse', category: 'F3 - Depression (ICD-10 screening)', text: 'Nedsat lyst/interesse.', exclude: ['dep_none'], smartMerge: { prefix: 'Kernesymptomer: ', item: 'nedsat lyst og interesse', suffix: '.' } },
    { id: 'dep_core_energy', label: 'Nedsat energi/træthed', category: 'F3 - Depression (ICD-10 screening)', text: 'Nedsat energi/træthed.', exclude: ['dep_none'], smartMerge: { prefix: 'Kernesymptomer: ', item: 'nedsat energi og øget trætbarhed', suffix: '.' } },
    { id: 'dep_acc_conf', label: 'Nedsat selvtillid', category: 'F3 - Depression (ICD-10 screening)', text: 'Nedsat selvtillid.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'nedsat selvtillid/selvfølelse', suffix: '.' } },
    { id: 'dep_acc_guilt', label: 'Selvbebrejdelse/Skyld', category: 'F3 - Depression (ICD-10 screening)', text: 'Selvbebrejdelser.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'selvbebrejdelser eller skyldfølelse', suffix: '.' } },
    { id: 'dep_acc_sui', label: 'Døds-/Selvmordstanker', category: 'F3 - Depression (ICD-10 screening)', text: 'Tanker om død/selvmord.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'tanker om død eller selvmord', suffix: '.' } },
    { id: 'dep_acc_conc', label: 'Koncentrationsbesvær', category: 'F3 - Depression (ICD-10 screening)', text: 'Tænke-/koncentrationsbesvær.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'tænke- eller koncentrationsbesvær', suffix: '.' } },
    { id: 'dep_acc_agit', label: 'Agitation/Hæmning', category: 'F3 - Depression (ICD-10 screening)', text: 'Agitation eller hæmning.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'agitation eller hæmning', suffix: '.' } },
    { id: 'dep_acc_sleep', label: 'Søvnforstyrrelser', category: 'F3 - Depression (ICD-10 screening)', text: 'Søvnforstyrrelser.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'søvnforstyrrelser', suffix: '.' } },
    { id: 'dep_acc_app', label: 'Appetit-/Vægtændring', category: 'F3 - Depression (ICD-10 screening)', text: 'Appetit-/vægtændring.', exclude: ['dep_none'], smartMerge: { prefix: 'Ledsagesymptomer: ', item: 'appetit- eller vægtændring', suffix: '.' } },
    { id: 'dep_duration_2w', label: 'Varighed ≥ 2 uger (Tidskriterie opfyldt)', category: 'F3 - Depression (ICD-10 screening)', text: 'Symptomvarighed over 2 uger (tidskriterie for depression opfyldt).', exclude: ['dep_none'], smartMerge: { prefix: 'Tidskriterie: ', item: 'varighed over 2 uger opfyldt', suffix: '.' } },

    // 10. F3 - Maniske symptomer
    { 
        id: 'ap_mania_none', 
        label: 'Ingen maniske symptomer', 
        category: 'F3 - Maniske symptomer', 
        text: 'Benægter maniske eller hypomane symptomer (såsom løftet stemningsleje, nedsat søvnbehov eller øget energi).', 
        isDefault: true, 
        exclude: [
            'ap_mania_elevated', 'ap_mania_irritable', 'ap_mania_hyper', 'ap_mania_sleep',
            'ap_mania_speech', 'ap_mania_flight', 'ap_mania_inhibit', 'ap_mania_megalo',
            'ap_mania_duration', 'ap_mania_freetext'
        ] 
    },
    { 
        id: 'ap_mania_elevated', 
        label: 'Løftet stemningsleje / Eufori', 
        category: 'F3 - Maniske symptomer', 
        text: 'Løftet stemningsleje/eufori.', 
        exclude: ['ap_mania_none'], 
        hasInput: true, 
        inputPlaceholder: 'Uddybning af stemningsleje...', 
        smartMerge: { prefix: 'Maniske symptomer: ', item: 'løftet stemningsleje/eufori', suffix: '.' } 
    },
    { 
        id: 'ap_mania_irritable', 
        label: 'Irritabilitet / Vredladenhed', 
        category: 'F3 - Maniske symptomer', 
        text: 'Irritabilitet eller vredladenhed.', 
        exclude: ['ap_mania_none'], 
        hasInput: true, 
        inputPlaceholder: 'Konflikter, vredesudbrud...', 
        smartMerge: { prefix: 'Maniske symptomer: ', item: 'irritabilitet og vredladenhed', suffix: '.' } 
    },
    { 
        id: 'ap_mania_hyper', 
        label: 'Hyperaktivitet / Fysisk rastløshed', 
        category: 'F3 - Maniske symptomer', 
        text: 'Hyperaktivitet og fysisk rastløshed.', 
        exclude: ['ap_mania_none'], 
        hasInput: true, 
        inputPlaceholder: 'Adfærd, igangsatte projekter...', 
        smartMerge: { prefix: 'Maniske symptomer: ', item: 'hyperaktivitet og fysisk rastløshed', suffix: '.' } 
    },
    { 
        id: 'ap_mania_sleep', 
        label: 'Nedsat søvnbehov (uudtrættet)', 
        category: 'F3 - Maniske symptomer', 
        text: 'Udtalt nedsat søvnbehov uden oplevelse af træthed.', 
        exclude: ['ap_mania_none'], 
        hasInput: true, 
        inputPlaceholder: 'Søvnmængde, timer...', 
        smartMerge: { prefix: 'Maniske symptomer: ', item: 'nedsat søvnbehov (uudtrættet)', suffix: '.' } 
    },
    { 
        id: 'ap_mania_speech', 
        label: 'Taletrang (Presset tale)', 
        category: 'F3 - Maniske symptomer', 
        text: 'Udtalt taletrang og talepres.', 
        exclude: ['ap_mania_none'], 
        hasInput: true, 
        inputPlaceholder: 'Talepres, tempo...', 
        smartMerge: { prefix: 'Maniske symptomer: ', item: 'udtalt taletrang (presset tale)', suffix: '.' } 
    },
    { 
        id: 'ap_mania_flight', 
        label: 'Tankeflugt / Tankemylder', 
        category: 'F3 - Maniske symptomer', 
        text: 'Oplevelse af tankeflugt og accelereret tankegang.', 
        exclude: ['ap_mania_none'], 
        hasInput: true, 
        inputPlaceholder: 'Associationsspring, tankemylder...', 
        smartMerge: { prefix: 'Maniske symptomer: ', item: 'tankeflugt og associationsspring', suffix: '.' } 
    },
    { 
        id: 'ap_mania_inhibit', 
        label: 'Hæmningsløshed / Risikoadfærd', 
        category: 'F3 - Maniske symptomer', 
        text: 'Hæmningsløshed og hensynsløs risikoadfærd.', 
        exclude: ['ap_mania_none'], 
        hasInput: true, 
        inputPlaceholder: 'Pengeforbrug, seksuel hæmningsløshed...', 
        smartMerge: { prefix: 'Maniske symptomer: ', item: 'hæmningsløshed og risikobetonet adfærd', suffix: '.' } 
    },
    { 
        id: 'ap_mania_megalo', 
        label: 'Storhedstanker / Megalomani', 
        category: 'F3 - Maniske symptomer', 
        text: 'Storhedstanker og overvurdering af egne evner.', 
        exclude: ['ap_mania_none'], 
        hasInput: true, 
        inputPlaceholder: 'Karakter af storhedstanker...', 
        smartMerge: { prefix: 'Maniske symptomer: ', item: 'storhedstanker (megalomani)', suffix: '.' } 
    },
    { 
        id: 'ap_mania_duration', 
        label: 'Varighed ≥ 1 uge (el. indlæggelse)', 
        category: 'F3 - Maniske symptomer', 
        text: 'Symptomvarighed over 1 uge eller tilstand af en sværhedsgrad der nødvendiggør indlæggelse.', 
        exclude: ['ap_mania_none'], 
        smartMerge: { prefix: 'Tidskriterie: ', item: 'varighed ≥ 1 uge eller indlæggelseskrævende', suffix: '.' } 
    },
    { 
        id: 'ap_mania_freetext', 
        label: 'Uddybning / Bipolart forløb (Fritekst)', 
        category: 'F3 - Maniske symptomer', 
        text: 'Uddybning af maniske/hypomane træk og forløb:', 
        hasInput: true, 
        inputPlaceholder: 'Tidligere manier, hypomanier, cyklus...', 
        exclude: ['ap_mania_none'] 
    },

    // 11. F4 - Angst, OCD & Belastning
    { id: 'ap_f4_none', label: 'Ingen angst/OCD/traume', category: 'F4 - Angst, OCD & Belastning', text: 'Benægter generende angstsymptomer, tvangstanker, tvangshandlinger eller traumer.', isDefault: true, exclude: ['ap_f4_anx_gen', 'ap_f4_panic', 'ap_f4_phobia', 'ap_f4_ocd', 'ap_f4_trauma'] },
    { id: 'ap_f4_anx_gen', label: 'Generaliseret angst / Uro', category: 'F4 - Angst, OCD & Belastning', text: 'Beskriver generaliseret ængstelighed, bekymringstendens og indre uro', hasInput: true, inputPlaceholder: 'Karakter / fysiske angstsymptomer', exclude: ['ap_f4_none'], smartMerge: { prefix: 'Angst og belastning: Beskriver ', item: 'generaliseret angst og indre uro', suffix: '.' } },
    { id: 'ap_f4_panic', label: 'Panikangst (Anfald)', category: 'F4 - Angst, OCD & Belastning', text: 'Oplever pludselige panikanfald med hjertebanken, åndenød eller dødsangst', hasInput: true, inputPlaceholder: 'Hyppighed, varighed...', exclude: ['ap_f4_none'], smartMerge: { prefix: 'Angst og belastning: Beskriver ', item: 'panikangstanfald', suffix: '.' } },
    { id: 'ap_f4_phobia', label: 'Fobier / Socialangst', category: 'F4 - Angst, OCD & Belastning', text: 'Angiver socialangst eller specifikke fobier med udtalt undgåelsesadfærd', hasInput: true, inputPlaceholder: 'Udløsende situationer, undgåelse...', exclude: ['ap_f4_none'], smartMerge: { prefix: 'Angst og belastning: Beskriver ', item: 'fobisk angst / socialangst', suffix: '.' } },
    { id: 'ap_f4_ocd', label: 'OCD (Tvangstanker/-handlinger)', category: 'F4 - Angst, OCD & Belastning', text: 'Beskriver tvangstanker og/eller tvangshandlinger (OCD)', hasInput: true, inputPlaceholder: 'Ritualer, tidsforbrug, modstand...', exclude: ['ap_f4_none'], smartMerge: { prefix: 'Angst og belastning: Beskriver ', item: 'OCD-symptomer (tvangstanker/handlinger)', suffix: '.' } },
    { id: 'ap_f4_trauma', label: 'Traume / PTSD-symptomer', category: 'F4 - Angst, OCD & Belastning', text: 'Anamnese med psykiske traumer og genoplevelsessymptomer/flashbacks/mareridt (PTSD)', hasInput: true, inputPlaceholder: 'Traumetype, flashbacks, undgåelse...', exclude: ['ap_f4_none'], smartMerge: { prefix: 'Angst og belastning: Beskriver ', item: 'traumesymptomer / PTSD-træk', suffix: '.' } },

    // 12. Suicidalscreening & Risiko
    { id: 'ap_risk_none', label: 'Ingen selvskade/tanker', category: 'Suicidalscreening & Risiko', text: 'Benægter aktuelle selvmordstanker, planer eller intentioner. Benægter ligeledes aktuel selvskade.', isDefault: true, exclude: ['ap_risk_thoughts', 'ap_risk_plans', 'ap_risk_sh_curr', 'ap_risk_protective'] },
    { id: 'ap_risk_thoughts', label: 'Selvmordstanker', category: 'Suicidalscreening & Risiko', text: 'Tilkendegiver selvmordstanker', hasInput: true, inputPlaceholder: 'Karakter/Hyppighed', exclude: ['ap_risk_none'] },
    { id: 'ap_risk_plans', label: 'Konkrete planer', category: 'Suicidalscreening & Risiko', text: 'Har konkrete planer om selvmord', hasInput: true, inputPlaceholder: 'Beskriv planer', exclude: ['ap_risk_none'] },
    { id: 'ap_risk_protective', label: 'Modforestillinger', category: 'Suicidalscreening & Risiko', text: 'Patienten udtrykker klare modforestillinger mod selvmord', hasInput: true, inputPlaceholder: 'Børn, familie, fremtidsplaner...', exclude: ['ap_risk_none'], smartMerge: { prefix: 'Risikovurdering: Udtrykker modforestillinger i form af ', item: 'beskyttende faktorer', suffix: '.' } },
    { id: 'ap_risk_sh_curr', label: 'Aktuel selvskade', category: 'Suicidalscreening & Risiko', text: 'Aktuel selvskadende adfærd', hasInput: true, inputPlaceholder: 'Metode/Hyppighed', exclude: ['ap_risk_none'] },
    { id: 'ap_risk_hist_sui', label: 'Tidl. selvmordsforsøg', category: 'Suicidalscreening & Risiko', text: 'Tidligere selvmordsforsøg i anamnesen', hasInput: true, inputPlaceholder: 'Hvornår? Metode?' },
    { id: 'ap_risk_hist_sh', label: 'Tidl. selvskade', category: 'Suicidalscreening & Risiko', text: 'Tidligere selvskadende adfærd i anamnesen', hasInput: true, inputPlaceholder: 'Type? Periode?' },

    // 13. Søvn & Døgnrytme
    { id: 'ap_sleep_norm', label: 'Søvn upåfaldende', category: 'Søvn & Døgnrytme', text: 'Søvnen er fuldstændig upåfaldende.', isDefault: true, exclude: ['ap_sleep_insomnia_onset', 'ap_sleep_insomnia_maint', 'ap_sleep_early_awake', 'ap_sleep_nightmare', 'ap_sleep_circadian'] },
    { id: 'ap_sleep_insomnia_onset', label: 'Indsovningsbesvær', category: 'Søvn & Døgnrytme', text: 'Tilkendegiver indsovningsbesvær', hasInput: true, inputPlaceholder: 'Hvor længe/ofte?', exclude: ['ap_sleep_norm'], smartMerge: { prefix: 'Der er i perioden oplevet ', item: 'indsovningsbesvær', suffix: '.' } },
    { id: 'ap_sleep_insomnia_maint', label: 'Gennemsovningsbesvær', category: 'Søvn & Døgnrytme', text: 'Tilkendegiver gennemsovningsbesvær med hyppige opvågninger', hasInput: true, exclude: ['ap_sleep_norm'], smartMerge: { prefix: 'Der er i perioden oplevet ', item: 'gennemsovningsbesvær', suffix: '.' } },
    { id: 'ap_sleep_early_awake', label: 'Tidlig opvågnen', category: 'Søvn & Døgnrytme', text: 'Tilkendegiver tendens til for tidlig opvågnen', hasInput: true, exclude: ['ap_sleep_norm'], smartMerge: { prefix: 'Der er i perioden oplevet ', item: 'tendens til for tidlig opvågnen', suffix: '.' } },
    { id: 'ap_sleep_nightmare', label: 'Mareridt', category: 'Søvn & Døgnrytme', text: 'Oplever mareridt', hasInput: true, inputPlaceholder: 'Tema/Hyppighed', exclude: ['ap_sleep_norm'], smartMerge: { prefix: 'Søvnen er præget af ', item: 'hyppige mareridt', suffix: '.' } },
    { id: 'ap_sleep_circadian', label: 'Forskudt døgnrytme', category: 'Søvn & Døgnrytme', text: 'Døgnrytmen er forskudt', hasInput: true, inputPlaceholder: 'F.eks. sover om dagen', exclude: ['ap_sleep_norm'], smartMerge: { prefix: 'Søvnen er præget af ', item: 'forskudt døgnrytme', suffix: '.' } },

    // 14. Motivation & Ønsker
    { id: 'ap_mot_yes', label: 'Motiveret', category: 'Motivation & Ønsker', text: 'Er motiveret for behandling.', isDefault: true, exclude: ['ap_mot_no'] },
    { id: 'ap_mot_no', label: 'Ikke motiveret', category: 'Motivation & Ønsker', text: 'Er ikke motiveret for behandling.', exclude: ['ap_mot_yes'] },
    { id: 'ap_plan', label: 'Ønsker til plan (Fritekst)', category: 'Motivation & Ønsker', text: 'Patienten ønsker at følgende indgår i behandlingsplanen:', hasInput: true, inputPlaceholder: 'Hjælp til/Ønsker for forløbet...' },
];
