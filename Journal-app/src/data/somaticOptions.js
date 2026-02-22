export const SOMATIC_NORMAL_IDS = [
    'gen_upavirket', 'cp_normal', 'abd_normal', 'cn_normal',
    'motor_sys_normal', 'reflex_normal', 'coord_normal', 'gait_normal',
    'eps_none', 'skin_normal'
];

export const SOMATIC_ACT_NORMAL_IDS = [
    'act_cns_ok', 'act_cp_ok', 'act_gi_ok', 'act_uro_ok', 'act_musc_ok', 'act_sleep_ok', 'act_appetite_ok'
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
