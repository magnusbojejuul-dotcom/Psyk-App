export const PSYCH_NORMAL_IDS = [
    'orient_normal', 'appear_normal', 'att_coop', 'anx_none',
    'c_form_norm', 'c_emo_good', 'contact_eye_norm', 'aff_adekvat',
    'mood_neutral', 'motor_normal', 'think_form_norm', 'think_speed_norm',
    'think_content_norm', 'cog_normal', 'insight_good'
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
