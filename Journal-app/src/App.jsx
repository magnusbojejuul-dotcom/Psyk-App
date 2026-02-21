import React, { useState, useEffect, useRef, useMemo } from 'react';

// --- IKONER ---
const Icon = ({ children, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {children}
    </svg>
);
const Activity = ({ className }) => <Icon className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></Icon>;
const Brain = ({ className }) => <Icon className={className}><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></Icon>;
const Stethoscope = ({ className }) => <Icon className={className}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></Icon>;
const FileText = ({ className }) => <Icon className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></Icon>;
const RotateCcw = ({ className }) => <Icon className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></Icon>;
const Clipboard = ({ className }) => <Icon className={className}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></Icon>;
const Copy = ({ className }) => <Icon className={className}><rect width="13" height="13" x="9" y="9" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></Icon>;
const Maximize = ({ className }) => <Icon className={className}><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></Icon>;
const Minimize = ({ className }) => <Icon className={className}><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></Icon>;
const CheckCircle2 = ({ className }) => <Icon className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></Icon>;
const AlertCircle = ({ className }) => <Icon className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></Icon>;
const XCircle = ({ className }) => <Icon className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></Icon>;
const ToggleLeft = ({ className }) => <Icon className={className}><rect width="20" height="12" x="2" y="6" rx="6" ry="6"/><circle cx="8" cy="12" r="2"/></Icon>;
const ToggleRight = ({ className }) => <Icon className={className}><rect width="20" height="12" x="2" y="6" rx="6" ry="6"/><circle cx="16" cy="12" r="2"/></Icon>;
const MessageSquare = ({ className }) => <Icon className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Icon>;
const Layers = ({ className }) => <Icon className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></Icon>;
const Trash2 = ({ className }) => <Icon className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></Icon>;
const Star = ({ className }) => <Icon className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>;
const PenLine = ({ className }) => <Icon className={className}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></Icon>;
const Cookie = ({ className }) => <Icon className={className}><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></Icon>;
const Plus = ({ className }) => <Icon className={className}><path d="M5 12h14"/><path d="M12 5v14"/></Icon>;
const ChevronRight = ({ className }) => <Icon className={className}><path d="m9 18 6-6-6-6"/></Icon>;
const Layout = ({ className }) => <Icon className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></Icon>;
const Repeat = ({ className }) => <Icon className={className}><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></Icon>;
const AlertTriangle = ({ className }) => <Icon className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></Icon>;

// --- DATA DEFS ---
const DEP_CORE_IDS = ['dep_core_mood', 'dep_core_interest', 'dep_core_energy'];
const DEP_ACC_IDS = ['dep_acc_conf', 'dep_acc_guilt', 'dep_acc_sui', 'dep_acc_conc', 'dep_acc_agit', 'dep_acc_sleep', 'dep_acc_app'];

const PSYCH_NORMAL_IDS = [
    'orient_normal', 'appear_normal', 'att_coop', 'anx_none', 
    'c_form_norm', 'c_emo_good', 'contact_eye_norm', 'aff_adekvat', 
    'mood_neutral', 'motor_normal', 'think_form_norm', 'think_speed_norm', 
    'think_content_norm', 'cog_normal', 'insight_good'
];

const SOMATIC_NORMAL_IDS = [
    'gen_upavirket', 'cp_normal', 'abd_normal', 'cn_normal', 
    'motor_sys_normal', 'reflex_normal', 'coord_normal', 'gait_normal', 
    'eps_none', 'skin_normal'
];

const SOMATIC_ACT_NORMAL_IDS = [
    'act_cns_ok', 'act_cp_ok', 'act_gi_ok', 'act_uro_ok', 'act_musc_ok', 'act_sleep_ok', 'act_appetite_ok'
];

// --- OPTION ARRAYS ---
const ANOREXIA_OPTIONS = [
    { id: 'an_cal_count', label: 'Tæller kalorier', category: 'Spiseadfærd & Mønstre', text: 'Der tælles kalorier.', smartMerge: { prefix: 'Der ', item: 'tælles kalorier', suffix: '.' } },
    { id: 'an_meals_skipped', label: 'Springes måltider over?', category: 'Spiseadfærd & Mønstre', text: 'Der springes måltider over', hasInput: true, inputPlaceholder: 'Hvilke måltider?', detailInParens: true, smartMerge: { prefix: 'Der ', item: 'springes måltider over', suffix: '.' } },
    { id: 'an_fluid_meal', label: 'Væske til måltid', category: 'Spiseadfærd & Mønstre', text: 'Der drikkes væske til hvert måltid.', smartMerge: { prefix: 'Der ', item: 'drikkes væske til hvert måltid', suffix: '.' } },
    { id: 'an_fluid_type', label: 'Hvad drikkes?', category: 'Spiseadfærd & Mønstre', text: 'Væsketype:', hasInput: true, inputPlaceholder: 'Vand, sodavand, etc...' },
    { id: 'an_comp_lax', label: 'Afføringsmiddel', category: 'Kompenserende Adfærd', text: 'Benytter afføringsmidler.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'afføringsmidler', suffix: '.' } },
    { id: 'an_comp_vomit', label: 'Opkast', category: 'Kompenserende Adfærd', text: 'Benytter provokeret opkast.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'provokeret opkast', suffix: '.' } },
    { id: 'an_comp_exercise', label: 'Motion', category: 'Kompenserende Adfærd', text: 'Benytter overdreven motion.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'overdreven motion', suffix: '.' } },
    { id: 'an_comp_diuretic', label: 'Vanddrivende', category: 'Kompenserende Adfærd', text: 'Benytter vanddrivende midler.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'vanddrivende midler', suffix: '.' } },
    { id: 'an_comp_meds', label: 'Slankemedicin', category: 'Kompenserende Adfærd', text: 'Benytter slankemedicin.', smartMerge: { prefix: 'Af kompenserende adfærd benyttes ', item: 'slankemedicin', suffix: '.' } },
    { id: 'an_comp_prevent', label: 'Hvis forhindret?', category: 'Kompenserende Adfærd', text: 'Ved forhindring af kompenserende adfærd ses:', hasInput: true, inputPlaceholder: 'Angst, uro, etc...' },
    { id: 'an_ord_standard', label: 'Ingen aktuelle kosttilskud', category: 'Standard Ordinationer', text: 'Patienten får ikke kosttilskud. Der ordineres:\nMEDICIN:\nrp. Multivitamin x 1 dagl\nrp. Thiamin 300 mg x 1 dagl i 3 uger, gerne før første måltid.\nrp. Unikalk x 2 dagl' },
    { id: 'an_ord_thiamin_chronic', label: 'Kronisk pt. (Thiamin)', category: 'Standard Ordinationer', text: 'Rp. Thiamin 300mg x1 dgl, gerne før første måltid' },
    { id: 'an_ord_bcombin', label: 'B-combin tillæg', category: 'Standard Ordinationer', text: 'Rp. B-combin x3 dgl' },
];

const ACTUAL_PSYCH_OPTIONS = [
    { id: 'ap_reason', label: 'Søger hjælp fordi (Fritekst)', category: 'Henvendelse & Problem', text: 'Patienten henvender sig grundet', hasInput: true, inputPlaceholder: 'Primære problematik...' },
    
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
    { id: 'ap_tried', label: 'Tidl. afprøvet (Fritekst)', category: 'Forløb & Historik', text: 'Af tidligere tiltag/behandling er afprøvet', hasInput: true, inputPlaceholder: 'Medicin, terapi, etc.' },
    
    { id: 'ap_worse', label: 'Tilstand forværret', category: 'Udvikling & Faktorer', text: 'Tilstanden er blevet værre.', exclude: ['ap_unchanged', 'ap_better'], smartMerge: { prefix: 'Aktuelt er tilstanden ', item: 'forværret', suffix: '.' } },
    { id: 'ap_unchanged', label: 'Tilstand uændret', category: 'Udvikling & Faktorer', text: 'Tilstanden er uændret.', isDefault: true, exclude: ['ap_worse', 'ap_better'], smartMerge: { prefix: 'Aktuelt er tilstanden ', item: 'uændret', suffix: '.' } },
    { id: 'ap_better', label: 'Tilstand bedret', category: 'Udvikling & Faktorer', text: 'Tilstanden er blevet bedre.', exclude: ['ap_worse', 'ap_unchanged'], smartMerge: { prefix: 'Aktuelt er tilstanden ', item: 'bedret', suffix: '.' } },
    { id: 'ap_modifying', label: 'Modificeres af (Fritekst)', category: 'Udvikling & Faktorer', text: 'Symptomerne angives at forværres/bedres af', hasInput: true, inputPlaceholder: 'Hvad påvirker tilstanden?' },
    
    { id: 'ap_soc_unspec', label: 'Socialt uafklaret', category: 'Sociale forhold', text: 'Sociale forhold ikke nærmere belyst.', isDefault: true, exclude: ['ap_soc_alone', 'ap_soc_cohab', 'ap_soc_kids', 'ap_soc_work', 'ap_soc_sick', 'ap_soc_pension', 'ap_soc_student'] },
    { id: 'ap_soc_alone', label: 'Bor alene', category: 'Sociale forhold', text: 'Bor alene.', exclude: ['ap_soc_unspec', 'ap_soc_cohab'], smartMerge: { prefix: 'Socialt: ', item: 'bor alene', suffix: '.' } },
    { id: 'ap_soc_cohab', label: 'Samlevende', category: 'Sociale forhold', text: 'Er samlevende.', exclude: ['ap_soc_unspec', 'ap_soc_alone'], smartMerge: { prefix: 'Socialt: ', item: 'er samlevende', suffix: '.' } },
    { id: 'ap_soc_kids', label: 'Har børn', category: 'Sociale forhold', text: 'Har børn.', exclude: ['ap_soc_unspec'], smartMerge: { prefix: 'Socialt: ', item: 'har børn', suffix: '.' } },
    { id: 'ap_soc_work', label: 'I arbejde', category: 'Sociale forhold', text: 'Er i arbejde.', exclude: ['ap_soc_unspec', 'ap_soc_sick', 'ap_soc_pension', 'ap_soc_student'], smartMerge: { prefix: 'Socialt: ', item: 'er i arbejde', suffix: '.' } },
    { id: 'ap_soc_student', label: 'Studerende', category: 'Sociale forhold', text: 'Er studerende.', exclude: ['ap_soc_unspec', 'ap_soc_work', 'ap_soc_sick', 'ap_soc_pension'], smartMerge: { prefix: 'Socialt: ', item: 'er studerende', suffix: '.' } },
    { id: 'ap_soc_sick', label: 'Sygemeldt', category: 'Sociale forhold', text: 'Er sygemeldt.', exclude: ['ap_soc_unspec', 'ap_soc_work', 'ap_soc_pension', 'ap_soc_student'], smartMerge: { prefix: 'Socialt: ', item: 'er sygemeldt', suffix: '.' } },
    { id: 'ap_soc_pension', label: 'Førtidspension', category: 'Sociale forhold', text: 'Modtager førtidspension.', exclude: ['ap_soc_unspec', 'ap_soc_work', 'ap_soc_sick', 'ap_soc_student'], smartMerge: { prefix: 'Socialt: ', item: 'modtager førtidspension', suffix: '.' } },
    
    { id: 'ap_func_unchanged', label: 'Hverdag uændret', category: 'Funktionsniveau', text: 'Funktionsniveauet er uændret.', isDefault: true, exclude: ['ap_func_school', 'ap_func_work', 'ap_func_social', 'ap_func_adl'] },
    { id: 'ap_func_school', label: 'Skole/Uddannelse', category: 'Funktionsniveau', text: 'Skole/uddannelse er påvirket.', exclude: ['ap_func_unchanged'], smartMerge: { prefix: 'Det daglige funktionsniveau er påvirket i forhold til ', item: 'skole/uddannelse', suffix: '.' } },
    { id: 'ap_func_work', label: 'Arbejde', category: 'Funktionsniveau', text: 'Arbejdet er påvirket.', exclude: ['ap_func_unchanged'], smartMerge: { prefix: 'Det daglige funktionsniveau er påvirket i forhold til ', item: 'arbejde', suffix: '.' } },
    { id: 'ap_func_social', label: 'Socialt/Fritid', category: 'Funktionsniveau', text: 'Sociale relationer/fritid er påvirket.', exclude: ['ap_func_unchanged'], smartMerge: { prefix: 'Det daglige funktionsniveau er påvirket i forhold til ', item: 'sociale relationer', suffix: '.' } },
    { id: 'ap_func_adl', label: 'ADL (Daglige gøremål)', category: 'Funktionsniveau', text: 'ADL er påvirket.', exclude: ['ap_func_unchanged'], smartMerge: { prefix: 'Det daglige funktionsniveau er påvirket i forhold til ', item: 'daglige gøremål (ADL)', suffix: '.' } },
    
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
    
    { id: 'ap_subst_none', label: 'Ingen rusmidler', category: 'Rusmidler', text: 'Der benægtes brug af rusmidler.', isDefault: true, exclude: ['ap_subst_alc', 'ap_subst_cann', 'ap_subst_stim', 'ap_subst_benzo', 'ap_subst_opioid'] },
    { id: 'ap_subst_alc', label: 'Alkohol', category: 'Rusmidler', text: 'Angiver forbrug af alkohol.', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Der angives forbrug af ', item: 'alkohol', suffix: '.' } },
    { id: 'ap_subst_cann', label: 'Cannabis', category: 'Rusmidler', text: 'Angiver forbrug af cannabis.', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Der angives forbrug af ', item: 'cannabis', suffix: '.' } },
    { id: 'ap_subst_stim', label: 'Centralstimulerende', category: 'Rusmidler', text: 'Angiver forbrug af centralstimulerende stoffer.', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Der angives forbrug af ', item: 'centralstimulerende stoffer', suffix: '.' } },
    { id: 'ap_subst_benzo', label: 'Benzodiazepiner', category: 'Rusmidler', text: 'Angiver forbrug af benzodiazepiner.', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Der angives forbrug af ', item: 'benzodiazepiner', suffix: '.' } },
    { id: 'ap_subst_opioid', label: 'Opioider', category: 'Rusmidler', text: 'Angiver forbrug af opioider.', exclude: ['ap_subst_none'], smartMerge: { prefix: 'Der angives forbrug af ', item: 'opioider', suffix: '.' } },
    
    { id: 'ap_risk_none', label: 'Ingen selvskade/tanker', category: 'Selvskade & Risiko', text: 'Benægter aktuelle selvmordstanker, planer eller intentioner. Benægter ligeledes aktuel selvskade.', isDefault: true, exclude: ['ap_risk_thoughts', 'ap_risk_plans', 'ap_risk_sh_curr'] },
    { id: 'ap_risk_thoughts', label: 'Selvmordstanker', category: 'Selvskade & Risiko', text: 'Tilkendegiver selvmordstanker', hasInput: true, inputPlaceholder: 'Karakter/Hyppighed', exclude: ['ap_risk_none'] },
    { id: 'ap_risk_plans', label: 'Konkrete planer', category: 'Selvskade & Risiko', text: 'Har konkrete planer om selvmord', hasInput: true, inputPlaceholder: 'Beskriv planer', exclude: ['ap_risk_none'] },
    { id: 'ap_risk_sh_curr', label: 'Aktuel selvskade', category: 'Selvskade & Risiko', text: 'Aktuel selvskadende adfærd', hasInput: true, inputPlaceholder: 'Metode/Hyppighed', exclude: ['ap_risk_none'] },
    { id: 'ap_risk_hist_sui', label: 'Tidl. selvmordsforsøg', category: 'Selvskade & Risiko', text: 'Tidligere selvmordsforsøg i anamnesen', hasInput: true, inputPlaceholder: 'Hvornår? Metode?' },
    { id: 'ap_risk_hist_sh', label: 'Tidl. selvskade', category: 'Selvskade & Risiko', text: 'Tidligere selvskadende adfærd i anamnesen', hasInput: true, inputPlaceholder: 'Type? Periode?' },
    
    { id: 'ap_hallu_none', label: 'Ingen hallucinationer', category: 'Perception (Hallucinationer)', text: 'Beskriver ingen hallucinationer.', isDefault: true, exclude: ['ap_hallu_audit', 'ap_hallu_visual', 'ap_hallu_olfact'] },
    { id: 'ap_hallu_audit', label: 'Hørehallucinationer', category: 'Perception (Hallucinationer)', text: 'Beskriver hørehallucinationer', hasInput: true, exclude: ['ap_hallu_none'], smartMerge: { prefix: 'Patienten beskriver ', item: 'hørehallucinationer', suffix: ':' } },
    { id: 'ap_hallu_visual', label: 'Synshallucinationer', category: 'Perception (Hallucinationer)', text: 'Beskriver synshallucinationer', hasInput: true, exclude: ['ap_hallu_none'], smartMerge: { prefix: 'Patienten beskriver ', item: 'synshallucinationer', suffix: ':' } },
    { id: 'ap_hallu_olfact', label: 'Lugt/Smag', category: 'Perception (Hallucinationer)', text: 'Beskriver lugt- eller smagshallucinationer', hasInput: true, exclude: ['ap_hallu_none'], smartMerge: { prefix: 'Patienten beskriver ', item: 'lugt-/smagshallucinationer', suffix: ':' } },

    { id: 'ap_delusion_none', label: 'Ingen vrangforestillinger', category: 'Tankeindhold (Vrangforestillinger)', text: 'Beskriver ingen vrangforestillinger.', isDefault: true, exclude: ['ap_delusion_para', 'ap_delusion_megalo', 'ap_delusion_depress', 'ap_delusion_hypo', 'ap_delusion_control'] },
    { id: 'ap_delusion_para', label: 'Paranoia (Persekutorisk)', category: 'Tankeindhold (Vrangforestillinger)', text: 'Oplever paranoide/persekutoriske vrangforestillinger', hasInput: true, exclude: ['ap_delusion_none'], smartMerge: { prefix: 'Tankeindholdet er præget af ', item: 'paranoide (persekutoriske) vrangforestillinger', suffix: ':' } },
    { id: 'ap_delusion_megalo', label: 'Storhed (Megaloman)', category: 'Tankeindhold (Vrangforestillinger)', text: 'Giver udtryk for megalomane vrangforestillinger', hasInput: true, exclude: ['ap_delusion_none'], smartMerge: { prefix: 'Tankeindholdet er præget af ', item: 'megalomane vrangforestillinger', suffix: ':' } },
    { id: 'ap_delusion_depress', label: 'Depressive/Skyld', category: 'Tankeindhold (Vrangforestillinger)', text: 'Udviser depressive vrangforestillinger', hasInput: true, exclude: ['ap_delusion_none'], smartMerge: { prefix: 'Tankeindholdet er præget af ', item: 'depressive vrangforestillinger', suffix: ':' } },
    { id: 'ap_delusion_hypo', label: 'Hypokondre', category: 'Tankeindhold (Vrangforestillinger)', text: 'Udviser hypokondre vrangforestillinger', hasInput: true, exclude: ['ap_delusion_none'], smartMerge: { prefix: 'Tankeindholdet er præget af ', item: 'hypokondre vrangforestillinger', suffix: ':' } },
    { id: 'ap_delusion_control', label: 'Styring/Påvirkning', category: 'Tankeindhold (Vrangforestillinger)', text: 'Oplever tankepåvirknings- eller styringsoplevelser', hasInput: true, exclude: ['ap_delusion_none'], smartMerge: { prefix: 'Tankeindholdet er præget af ', item: 'tankepåvirknings-/styringsoplevelser', suffix: ':' } },
    
    { id: 'ap_mot_yes', label: 'Motiveret', category: 'Motivation & Ønsker', text: 'Er motiveret for behandling.', isDefault: true, exclude: ['ap_mot_no'] },
    { id: 'ap_mot_no', label: 'Ikke motiveret', category: 'Motivation & Ønsker', text: 'Er ikke motiveret for behandling.', exclude: ['ap_mot_yes'] },
    { id: 'ap_plan', label: 'Ønsker til plan (Fritekst)', category: 'Motivation & Ønsker', text: 'Patienten ønsker at følgende indgår i behandlingsplanen:', hasInput: true, inputPlaceholder: 'Hjælp til/Ønsker for forløbet...' },
];

// RENT OBJEKTIVT PSYKISK (Klassisk MSE)
const PSYCH_OPTIONS = [
    { id: 'orient_normal', label: 'Fuldt orienteret', category: 'Bevidsthed', text: 'Vågen, klar og orienteret i tid, sted og egne data.', isDefault: true, exclude: ['orient_confused', 'orient_delir', 'orient_sløv', 'orient_sopor', 'orient_cloud'] },
    { id: 'orient_sløv', label: 'Somnolent/Sløv', category: 'Bevidsthed', text: 'Somnolent og sløv i kontakten.', exclude: ['orient_normal', 'orient_confused', 'orient_delir', 'orient_sopor', 'orient_cloud'] },
    { id: 'orient_sopor', label: 'Sopor', category: 'Bevidsthed', text: 'Soporøs (dybt bevidsthedssvækket), men vækbar.', exclude: ['orient_normal', 'orient_confused', 'orient_delir', 'orient_sløv', 'orient_cloud'] },
    { id: 'orient_confused', label: 'Konfus', category: 'Bevidsthed', text: 'Konfus og desorienteret.', exclude: ['orient_normal', 'orient_delir', 'orient_sløv', 'orient_sopor', 'orient_cloud'] },
    { id: 'orient_cloud', label: 'Tågetilstand', category: 'Bevidsthed', text: 'Befinder sig i en tågetilstand med nedsat opfattelse af omverdenen.', exclude: ['orient_normal', 'orient_confused', 'orient_delir', 'orient_sløv', 'orient_sopor'] },
    { id: 'orient_delir', label: 'Delirøs', category: 'Bevidsthed', text: 'Svingende bevidsthedsniveau, opmærksomhedsforstyrrelse og usammenhængende tale, obs delir.', exclude: ['orient_normal', 'orient_confused', 'orient_sløv', 'orient_sopor', 'orient_cloud'] },
    { id: 'orient_auto_loss', label: 'Autopsykisk desorient.', category: 'Bevidsthed (Orientering)', text: 'Autopsykisk desorienteret (navn, data, civilstand).', exclude: ['orient_normal'] },
    { id: 'orient_allo_loss', label: 'Allopsykisk desorient.', category: 'Bevidsthed (Orientering)', text: 'Allopsykisk desorienteret (tid, sted, situation).', exclude: ['orient_normal'] },
    { id: 'appear_normal', label: 'Normal fremtoning', category: 'Fremtoning & Adfærd', text: 'Normal fremtoning, herunder soigneret og alderssvarende påklædning.', isDefault: true, exclude: ['appear_unkept', 'appear_bizarre_dress'] },
    { id: 'appear_unkept', label: 'Usoigneret', category: 'Fremtoning & Adfærd', text: 'Usoigneret.', exclude: ['appear_normal'], smartMerge: { prefix: 'Fremtræden er ', item: 'usoigneret', suffix: '.' } },
    { id: 'appear_bizarre_dress', label: 'Bizart påklædt', category: 'Fremtoning & Adfærd', text: 'Bizart eller uhensigtsmæssigt påklædt ift. årstiden.', exclude: ['appear_normal'], smartMerge: { prefix: 'Fremtræden er ', item: 'bizart eller uhensigtsmæssigt påklædt', suffix: '.' } },
    { id: 'att_coop', label: 'Samarbejdsvillig', category: 'Holdning & Samarbejde', text: 'Venlig og samarbejdsvillig i kontakten.', isDefault: true, exclude: ['att_guard', 'att_hostile', 'att_suspicious', 'att_ambivalent', 'att_aggress', 'att_threat'] },
    { id: 'att_guard', label: 'Afvisende/Guarded', category: 'Holdning & Samarbejde', text: 'Guarded og afvisende.', exclude: ['att_coop'], smartMerge: { prefix: 'Holdningen er ', item: 'guarded og afvisende', suffix: '.' } },
    { id: 'att_suspicious', label: 'Mistænksom', category: 'Holdning & Samarbejde', text: 'Mistænksom.', exclude: ['att_coop'], smartMerge: { prefix: 'Holdningen er ', item: 'mistænksom', suffix: '.' } },
    { id: 'att_hostile', label: 'Fjendtlig', category: 'Holdning & Samarbejde', text: 'Fjendtlig.', exclude: ['att_coop'], smartMerge: { prefix: 'Holdningen er ', item: 'fjendtlig', suffix: '.' } },
    { id: 'att_ambivalent', label: 'Ambivalent', category: 'Holdning & Samarbejde', text: 'Ambivalent.', exclude: ['att_coop'], smartMerge: { prefix: 'Holdningen er ', item: 'ambivalent', suffix: '.' } },
    { id: 'att_threat', label: 'Truende adfærd', category: 'Holdning & Samarbejde', text: 'Verbalt truende.', exclude: ['att_coop'], smartMerge: { prefix: 'Holdningen er ', item: 'verbalt truende og grænseoverskridende', suffix: '.' } },
    { id: 'att_aggress', label: 'Aggressiv', category: 'Holdning & Samarbejde', text: 'Aggressiv.', exclude: ['att_coop'], smartMerge: { prefix: 'Holdningen er ', item: 'fysisk aggressiv og udadreagerende', suffix: '.' } },
    { id: 'anx_none', label: 'Ingen angsttegn', category: 'Angst (Objektivt)', text: 'Ingen objektive tegn på angst.', isDefault: true, exclude: ['anx_sweat', 'anx_tremor', 'anx_hands', 'anx_hypervent'] },
    { id: 'anx_sweat', label: 'Svedende', category: 'Angst (Objektivt)', text: 'Svedende.', hasInput: true, detailInParens: true, exclude: ['anx_none'], smartMerge: { prefix: 'Objektivt ses patienten ', item: 'synligt svedende', suffix: '.' } },
    { id: 'anx_tremor', label: 'Rystende/Tremor', category: 'Angst (Objektivt)', text: 'Rystende.', hasInput: true, detailInParens: true, exclude: ['anx_none'], smartMerge: { prefix: 'Objektivt ses patienten ', item: 'rystende/tremorøs', suffix: '.' } },
    { id: 'anx_hands', label: 'Piller v. hænder/tøj', category: 'Angst (Objektivt)', text: 'Piller v. hænder/tøj.', hasInput: true, detailInParens: true, exclude: ['anx_none'], smartMerge: { prefix: 'Objektivt ses patienten ', item: 'pillende ved hænder eller tøj', suffix: '.' } },
    { id: 'anx_hypervent', label: 'Hyperventilerer', category: 'Angst (Objektivt)', text: 'Hyperventilerende.', hasInput: true, detailInParens: true, exclude: ['anx_none'], smartMerge: { prefix: 'Objektivt ses patienten ', item: 'hyperventilerende', suffix: '.' } },
    { id: 'c_form_norm', label: 'Normal/Upåfaldende', category: 'Formel Kontakt', text: 'Den formelle kontakt er upåfaldende. Patienten svarer relevant på spørgsmål og overholder almindelige samværsregler.', isDefault: true, exclude: ['c_form_dist', 'c_form_div', 'c_form_regr', 'c_form_bound', 'c_form_crit', 'c_form_cling', 'c_form_facade'] },
    { id: 'c_form_dist', label: 'Afvisende/Reserveret', category: 'Formel Kontakt', text: 'Kontaktformen er distancerende.', exclude: ['c_form_norm'], smartMerge: { prefix: 'Kontaktformen er ', item: 'distancerende og reserveret', suffix: '.' } },
    { id: 'c_form_bound', label: 'Grænseoverskridende', category: 'Formel Kontakt', text: 'Kontaktformen er grænseoverskridende.', hasInput: true, detailInParens: true, exclude: ['c_form_norm'], smartMerge: { prefix: 'Kontaktformen er ', item: 'grænseoverskridende', suffix: '.' } },
    { id: 'c_form_crit', label: 'Kritikløs', category: 'Formel Kontakt', text: 'Kontaktformen er kritikløs.', hasInput: true, detailInParens: true, exclude: ['c_form_norm'], smartMerge: { prefix: 'Kontaktformen er ', item: 'kritikløs', suffix: '.' } },
    { id: 'c_form_cling', label: 'Klæbende', category: 'Formel Kontakt', text: 'Kontaktformen er klæbende.', hasInput: true, detailInParens: true, exclude: ['c_form_norm'], smartMerge: { prefix: 'Kontaktformen er ', item: 'klæbende', suffix: '.' } },
    { id: 'c_form_facade', label: 'Facadebærende', category: 'Formel Kontakt', text: 'Kontaktformen er facadebærende.', hasInput: true, detailInParens: true, exclude: ['c_form_norm'], smartMerge: { prefix: 'Kontaktformen er ', item: 'facadebærende', suffix: '.' } },
    { id: 'c_form_regr', label: 'Regressiv', category: 'Formel Kontakt', text: 'Kontaktformen er regressiv.', hasInput: true, detailInParens: true, exclude: ['c_form_norm'], smartMerge: { prefix: 'Kontaktformen er ', item: 'regressiv', suffix: '.' } },
    { id: 'c_emo_good', label: 'God/Naturlig', category: 'Emotionel Kontakt', text: 'God og naturlig emotionel kontakt.', isDefault: true, exclude: ['c_emo_flat', 'c_emo_reject', 'c_emo_appeal', 'c_emo_susp', 'c_emo_aut'] },
    { id: 'c_emo_flat', label: 'Nedsat/Affladet', category: 'Emotionel Kontakt', text: 'Noget affladet.', exclude: ['c_emo_good'], smartMerge: { prefix: 'Emotionel kontakt er ', item: 'noget affladet', suffix: '.' } },
    { id: 'c_emo_reject', label: 'Afvisende', category: 'Emotionel Kontakt', text: 'Afvisende.', exclude: ['c_emo_good'], smartMerge: { prefix: 'Emotionel kontakt er ', item: 'afvisende', suffix: '.' } },
    { id: 'c_emo_appeal', label: 'Appellerende', category: 'Emotionel Kontakt', text: 'Kontakten er appellerende, idet patienten virker indtrængende og søger aktivt omsorg eller bekræftelse.', exclude: ['c_emo_good'], smartMerge: { prefix: 'Emotionel kontakt er ', item: 'appellerende og indtrængende hjælpsøgende', suffix: '.' } },
    { id: 'c_emo_susp', label: 'Mistænksom', category: 'Emotionel Kontakt', text: 'Præget af mistænksomhed.', exclude: ['c_emo_good'], smartMerge: { prefix: 'Emotionel kontakt er ', item: 'præget af mistænksomhed', suffix: '.' } },
    { id: 'c_emo_aut', label: 'Autistisk præg', category: 'Emotionel Kontakt', text: 'Præget af autistisk afskærmning.', exclude: ['c_emo_good'], smartMerge: { prefix: 'Emotionel kontakt er ', item: 'præget af autistisk afskærmning', suffix: '.' } },
    { id: 'contact_eye_norm', label: 'Øjenkontakt naturlig', category: 'Kontakt (Øjne)', text: 'Øjenkontakten er naturlig.', isDefault: true, exclude: ['contact_eye_avoid', 'contact_eye_stare'] },
    { id: 'contact_eye_avoid', label: 'Undvigende øjne', category: 'Kontakt (Øjne)', text: 'Undvigende øjenkontakt.', exclude: ['contact_eye_norm'], smartMerge: { prefix: 'Øjenkontakten er ', item: 'undvigende', suffix: '.' } },
    { id: 'contact_eye_stare', label: 'Stirrende', category: 'Kontakt (Øjne)', text: 'Stirrende øjenkontakt.', exclude: ['contact_eye_norm'], smartMerge: { prefix: 'Øjenkontakten er ', item: 'stirrende', suffix: '.' } },
    { id: 'aff_adekvat', label: 'Adækvat affekt', category: 'Affekt (Følelser)', text: 'Affekten er adækvat og svinger relevant.', isDefault: true, exclude: ['aff_flat', 'aff_labil', 'aff_incong', 'aff_eksplo', 'aff_inkont', 'aff_eufor', 'aff_fatuid'] },
    { id: 'aff_flat', label: 'Affladet/Følelsesflad', category: 'Affekt (Følelser)', text: 'Affladet.', exclude: ['aff_adekvat'], smartMerge: { prefix: 'Affekten er ', item: 'affladet', suffix: '.' } },
    { id: 'aff_labil', label: 'Affektlabil', category: 'Affekt (Følelser)', text: 'Labil.', exclude: ['aff_adekvat'], smartMerge: { prefix: 'Affekten er ', item: 'labil', suffix: '.' } },
    { id: 'aff_incong', label: 'Inkongruent', category: 'Affekt (Følelser)', text: 'Inkongruent.', exclude: ['aff_adekvat'], smartMerge: { prefix: 'Affekten er ', item: 'inkongruent', suffix: '.' } },
    { id: 'aff_eksplo', label: 'Affekteksplosiv', category: 'Affekt (Følelser)', text: 'Eksplosiv.', exclude: ['aff_adekvat'], smartMerge: { prefix: 'Affekten er ', item: 'eksplosiv', suffix: '.' } },
    { id: 'aff_inkont', label: 'Affektinkontinens', category: 'Affekt (Følelser)', text: 'Præget af inkontinens.', exclude: ['aff_adekvat'], smartMerge: { prefix: 'Affekten er ', item: 'præget af inkontinens', suffix: '.' } },
    { id: 'aff_eufor', label: 'Euforisk', category: 'Affekt (Følelser)', text: 'Euforisk.', exclude: ['aff_adekvat'], smartMerge: { prefix: 'Affekten er ', item: 'euforisk', suffix: '.' } },
    { id: 'aff_fatuid', label: 'Fatuid (Tom)', category: 'Affekt (Følelser)', text: 'Fatuid.', exclude: ['aff_adekvat'], smartMerge: { prefix: 'Affekten er ', item: 'fatuid', suffix: '.' } },
    { id: 'mood_neutral', label: 'Neutralt', category: 'Stemningsleje', text: 'Stemningslejet vurderes neutralt.', isDefault: true, exclude: ['mood_low_light', 'mood_low_severe', 'mood_high_hypo', 'mood_high_mania', 'mood_dys'] },
    { id: 'mood_low_light', label: 'Let sænket', category: 'Stemningsleje', text: 'Stemningslejet vurderes let sænket.', exclude: ['mood_neutral', 'mood_low_severe', 'mood_high_hypo', 'mood_high_mania'] },
    { id: 'mood_low_severe', label: 'Svært sænket', category: 'Stemningsleje', text: 'Stemningslejet vurderes svært sænket/depressivt.', exclude: ['mood_neutral', 'mood_low_light', 'mood_high_hypo', 'mood_high_mania'] },
    { id: 'mood_high_hypo', label: 'Løftet/Hypoman', category: 'Stemningsleje', text: 'Stemningslejet er løftet, præget af øget energi.', exclude: ['mood_neutral', 'mood_low_light', 'mood_low_severe', 'mood_high_mania'] },
    { id: 'mood_high_mania', label: 'Manisk', category: 'Stemningsleje', text: 'Stemningslejet er udtalt løftet (manisk).', exclude: ['mood_neutral', 'mood_low_light', 'mood_low_severe', 'mood_high_hypo'] },
    { id: 'mood_dys', label: 'Dysforisk', category: 'Stemningsleje', text: 'Dysforisk.', summaryLabel: 'Dysfori', smartMerge: { prefix: 'Patienten virker ', item: 'dysforisk', suffix: '.' } },
    { id: 'mood_irritabel', label: 'Irritabel', category: 'Stemningsleje', text: 'Irritabel.', summaryLabel: 'Irritabilitet', smartMerge: { prefix: 'Patienten virker ', item: 'irritabel', suffix: '.' } },
    { id: 'mood_labile', label: 'Grådlabil', category: 'Stemningsleje', text: 'Grådlabil.', summaryLabel: 'Grådlabil', smartMerge: { prefix: 'Patienten virker ', item: 'grådlabil', suffix: '.' } },
    { id: 'motor_normal', label: 'Normal psykomotorik', category: 'Psykomotorik', text: 'Psykomotorisk normalt.', isDefault: true, exclude: ['motor_agit', 'motor_inhib', 'motor_restless', 'motor_catatonic'] },
    { id: 'motor_agit', label: 'Agiteret (Øget)', category: 'Psykomotorik', text: 'Psykomotorisk agiteret.', exclude: ['motor_normal', 'motor_inhib', 'motor_catatonic'], smartMerge: { prefix: 'Psykomotorisk ', item: 'agiteret', suffix: '.' } },
    { id: 'motor_inhib', label: 'Hæmmet (Nedsat)', category: 'Psykomotorik', text: 'Psykomotorisk hæmmet.', exclude: ['motor_normal', 'motor_agit', 'motor_catatonic'], smartMerge: { prefix: 'Psykomotorisk ', item: 'hæmmet', suffix: '.' } },
    { id: 'motor_catatonic', label: 'Katatoni', category: 'Psykomotorik', text: 'Præget af katatoni.', exclude: ['motor_normal', 'motor_agit', 'motor_inhib'], smartMerge: { prefix: 'Psykomotorisk ', item: 'præget af katatoni', suffix: '.' } },
    { id: 'motor_restless', label: 'Indre uro (fremstår rolig)', category: 'Psykomotorik', text: 'Indre uro, men motorisk rolig.', exclude: ['motor_normal'], smartMerge: { prefix: 'Der angives ', item: 'indre uro (fremstår rolig)', suffix: '.' } },
    { id: 'think_form_norm', label: 'Normal form/sprog', category: 'Sprog & Tænkning (Form)', text: 'Sproget er nuanceret. Talen er samlet og relevant.', isDefault: true, exclude: ['think_incoh', 'think_tang', 'think_circum', 'think_neologism', 'think_persev', 'think_flight'] },
    { id: 'think_incoh', label: 'Inkohærent', category: 'Sprog & Tænkning (Form)', text: 'Springende og inkohærent.', exclude: ['think_form_norm'], smartMerge: { prefix: 'Tanken er ', item: 'springende og inkohærent', suffix: '.' } },
    { id: 'think_tang', label: 'Tangential', category: 'Sprog & Tænkning (Form)', text: 'Tangentiel.', exclude: ['think_form_norm'], smartMerge: { prefix: 'Tanken er ', item: 'tangentiel', suffix: '.' } },
    { id: 'think_neologism', label: 'Neologismer', category: 'Sprog & Tænkning (Form)', text: 'Præget af neologismer.', exclude: ['think_form_norm'], smartMerge: { prefix: 'Tanken er ', item: 'præget af neologismer', suffix: '.' } },
    { id: 'think_persev', label: 'Perseveration', category: 'Sprog & Tænkning (Form)', text: 'Præget af perseveration.', exclude: ['think_form_norm'], smartMerge: { prefix: 'Tanken er ', item: 'præget af perseveration', suffix: '.' } },
    { id: 'think_flight', label: 'Tankeflugt', category: 'Sprog & Tænkning (Form)', text: 'Præget af tankeflugt.', exclude: ['think_form_norm'], smartMerge: { prefix: 'Tanken er ', item: 'præget af tankeflugt', suffix: '.' } },
    { id: 'think_speed_norm', label: 'Normalt tempo', category: 'Sprog & Tænkning (Tempo)', text: 'Normal talestrøm og tempo.', isDefault: true, exclude: ['think_press', 'think_latency', 'think_block'] },
    { id: 'think_press', label: 'Talepres', category: 'Sprog & Tænkning (Tempo)', text: 'Talepres.', exclude: ['think_speed_norm', 'think_latency'], smartMerge: { prefix: 'Der er ', item: 'talepres', suffix: '.' } },
    { id: 'think_latency', label: 'Latenstid', category: 'Sprog & Tænkning (Tempo)', text: 'Latenstid.', exclude: ['think_speed_norm', 'think_press'], smartMerge: { prefix: 'Der er ', item: 'latenstid', suffix: '.' } },
    { id: 'think_block', label: 'Tankestop', category: 'Sprog & Tænkning (Tempo)', text: 'Tankestop.', exclude: ['think_speed_norm'], smartMerge: { prefix: 'Der er ', item: 'tankestop', suffix: '.' } },
    { id: 'think_content_norm', label: 'Normalt indhold', category: 'Tænkning (Indhold)', text: 'Indholdsmæssigt relevant uden bizariteter eller neologismer.', isDefault: true, exclude: ['think_ruminate', 'think_quarrel'] },
    { id: 'think_ruminate', label: 'Ruminerende', category: 'Tænkning (Indhold)', text: 'Tankeindholdet er præget af depressive grublerier (ruminationer).', exclude: ['think_content_norm'], smartMerge: { prefix: 'Tankeindholdet er præget af ', item: 'depressive grublerier (ruminationer)', suffix: '.' } },
    { id: 'think_quarrel', label: 'Kværulerende', category: 'Tænkning (Indhold)', text: 'Tankeindholdet er præget af kværulans.', exclude: ['think_content_norm'], smartMerge: { prefix: 'Tankeindholdet er præget af ', item: 'kværulans', suffix: '.' } },
    { id: 'cog_normal', label: 'Normal kognition', category: 'Kognition & Hukommelse', text: 'Kognitivt upåfaldende i samtalen. Intet tegn på hukommelsessvigt.', isDefault: true, exclude: ['cog_imp', 'cog_memory', 'cog_conc', 'cog_confab', 'cog_amnesia'] },
    { id: 'cog_imp', label: 'Kognitivt svækket', category: 'Kognition & Hukommelse', text: 'Virker generelt kognitivt svækket.', exclude: ['cog_normal'], smartMerge: { prefix: 'Der er tegn på ', item: 'generel kognitiv svækkelse', suffix: '.' } },
    { id: 'cog_memory', label: 'Hukommelsesbesvær', category: 'Kognition & Hukommelse', text: 'Udviser tegn på hukommelsesbesvær (indprentning/langtid).', exclude: ['cog_normal'], smartMerge: { prefix: 'Der er tegn på ', item: 'hukommelsesbesvær', suffix: '.' } },
    { id: 'cog_amnesia', label: 'Amnesi', category: 'Kognition & Hukommelse', text: 'Udviser tegn på amnesi (lakunær eller total).', exclude: ['cog_normal'], smartMerge: { prefix: 'Der er tegn på ', item: 'amnesi', suffix: '.' } },
    { id: 'cog_confab', label: 'Konfabulationer', category: 'Kognition & Hukommelse', text: 'Der ses konfabulationer (udfylder hukommelseshuller med fantasi).', exclude: ['cog_normal'], smartMerge: { prefix: 'Der ses ', item: 'konfabulationer', suffix: '.' } },
    { id: 'cog_conc', label: 'Koncentrationsbesvær', category: 'Kognition & Hukommelse', text: 'Præget af koncentrationsbesvær, svært ved at fastholde fokus.', exclude: ['cog_normal'], smartMerge: { prefix: 'Der er tegn på ', item: 'koncentrationsbesvær', suffix: '.' } },
    { id: 'insight_good', label: 'God indsigt', category: 'Indsigt', text: 'Har relevant og god sygdomsindsigt.', isDefault: true, exclude: ['insight_none', 'insight_part'] },
    { id: 'insight_part', label: 'Partiel indsigt', category: 'Indsigt', text: 'Har partiel sygdomsindsigt, erkender symptomer men ikke behandlingsbehov.', exclude: ['insight_good', 'insight_none'] },
    { id: 'insight_none', label: 'Ingen indsigt', category: 'Indsigt', text: 'Ingen sygdomsindsigt.', exclude: ['insight_good', 'insight_part'] },
];

const SOMATIC_ACT_OPTIONS = [
    { id: 'act_cns_ok', label: 'Ingen CNS klager', category: 'CNS', text: 'Benægter hovedpine, svimmelhed, besvimelse, synsforstyrrelser eller kramper.', isDefault: true, exclude: ['act_cns_headache', 'act_cns_dizzy', 'act_cns_faint'] },
    { id: 'act_cns_headache', label: 'Hovedpine', category: 'CNS', text: 'Angiver hovedpine.', exclude: ['act_cns_ok'], smartMerge: { prefix: 'Angiver ', item: 'hovedpine', suffix: '.' } },
    { id: 'act_cns_dizzy', label: 'Svimmelhed', category: 'CNS', text: 'Angiver svimmelhed.', hasInput: true, detailInParens: true, inputPlaceholder: 'Karakter/Hyppighed...', exclude: ['act_cns_ok'], smartMerge: { prefix: 'Angiver ', item: 'svimmelhed', suffix: '.' } },
    { id: 'act_cp_ok', label: 'Ingen CP klager', category: 'Cardio/Pulm', text: 'Ingen klager over brystsmerter, hjertebanken eller dyspnø.', isDefault: true, exclude: ['act_cp_pain', 'act_cp_palp', 'act_cp_dysp'] },
    { id: 'act_cp_pain', label: 'Brystsmerter', category: 'Cardio/Pulm', text: 'Angiver brystsmerter.', exclude: ['act_cp_ok'], smartMerge: { prefix: 'Angiver ', item: 'brystsmerter', suffix: '.' } },
    { id: 'act_cp_palp', label: 'Hjertebanken', category: 'Cardio/Pulm', text: 'Angiver hjertebanken.', exclude: ['act_cp_ok'], smartMerge: { prefix: 'Angiver ', item: 'hjertebanken', suffix: '.' } },
    { id: 'act_cp_dysp', label: 'Dyspnø', category: 'Cardio/Pulm', text: 'Angiver dyspnø.', exclude: ['act_cp_ok'], smartMerge: { prefix: 'Angiver ', item: 'dyspnø', suffix: '.' } },
    { id: 'act_gi_ok', label: 'Ingen GI klager', category: 'Gastro-Intestinal', text: 'Ingen kvalme, opkastninger eller ændring i afføringsmønster.', isDefault: true, exclude: ['act_gi_nausea', 'act_gi_obst', 'act_gi_dia', 'act_gi_pain', 'act_gi_blood', 'act_gi_def_pain'] },
    { id: 'act_gi_nausea', label: 'Kvalme', category: 'Gastro-Intestinal', text: 'Angiver kvalme.', exclude: ['act_gi_ok'], smartMerge: { prefix: 'Angiver ', item: 'kvalme', suffix: '.' } },
    { id: 'act_gi_obst', label: 'Obstipation', category: 'Gastro-Intestinal', text: 'Angiver tendens til forstoppelse.', exclude: ['act_gi_ok'], smartMerge: { prefix: 'Angiver ', item: 'tendens til forstoppelse', suffix: '.' } },
    { id: 'act_gi_dia', label: 'Diarré', category: 'Gastro-Intestinal', text: 'Angiver diarré.', exclude: ['act_gi_ok'], smartMerge: { prefix: 'Angiver ', item: 'diarré', suffix: '.' } },
    { id: 'act_gi_pain', label: 'Mavesmerter', category: 'Gastro-Intestinal', text: 'Angiver mavesmerter.', exclude: ['act_gi_ok'], smartMerge: { prefix: 'Angiver ', item: 'mavesmerter', suffix: '.' } },
    { id: 'act_gi_blood', label: 'Blod i afføring', category: 'Gastro-Intestinal', text: 'Angiver blod i afføringen.', exclude: ['act_gi_ok'], smartMerge: { prefix: 'Angiver ', item: 'blod i afføringen', suffix: '.' } },
    { id: 'act_gi_def_pain', label: 'Smerter v. afføring', category: 'Gastro-Intestinal', text: 'Angiver smerter ved afføring.', exclude: ['act_gi_ok'], smartMerge: { prefix: 'Angiver ', item: 'smerter ved afføring', suffix: '.' } },
    { id: 'act_uro_ok', label: 'Ingen URO klager', category: 'Urologisk', text: 'Ingen vandladningsgener (svie, hyppighed eller retention).', isDefault: true, exclude: ['act_uro_retention', 'act_uro_pain', 'act_uro_dysuria', 'act_uro_blood', 'act_uro_pollakisuria'] },
    { id: 'act_uro_retention', label: 'Retention', category: 'Urologisk', text: 'Angiver besvær med at lade vandet (retention).', exclude: ['act_uro_ok'], smartMerge: { prefix: 'Angiver ', item: 'retention', suffix: '.' } },
    { id: 'act_uro_dysuria', label: 'Svie/Smerter', category: 'Urologisk', text: 'Angiver svie/smerter ved vandladning.', exclude: ['act_uro_ok'], smartMerge: { prefix: 'Angiver ', item: 'svie/smerter ved vandladning', suffix: '.' } },
    { id: 'act_uro_blood', label: 'Blod i urin', category: 'Urologisk', text: 'Angiver synligt blod i urinen.', exclude: ['act_uro_ok'], smartMerge: { prefix: 'Angiver ', item: 'synligt blod i urinen', suffix: '.' } },
    { id: 'act_uro_pollakisuria', label: 'Hyppig vandladning', category: 'Urologisk', text: 'Angiver hyppig vandladning.', exclude: ['act_uro_ok'], smartMerge: { prefix: 'Angiver ', item: 'hyppig vandladning', suffix: '.' } },
    { id: 'act_musc_ok', label: 'Ingen smerter', category: 'Bevægeapparat', text: 'Ingen aktuelle smerter eller bevægeindskrænkning.', isDefault: true, exclude: ['act_musc_back', 'act_musc_joint'] },
    { id: 'act_musc_back', label: 'Rygsmerter', category: 'Bevægeapparat', text: 'Angiver rygsmerter.', exclude: ['act_musc_ok'], smartMerge: { prefix: 'Angiver ', item: 'rygsmerter', suffix: '.' } },
    { id: 'act_musc_joint', label: 'Ledsmerter', category: 'Bevægeapparat', text: 'Angiver ledsmerter.', exclude: ['act_musc_ok'], smartMerge: { prefix: 'Angiver ', item: 'ledsmerter', suffix: '.' } },
    { id: 'act_sleep_ok', label: 'Søvn normal', category: 'Søvn', text: 'Sover uforstyrret igennem natten, føler sig udhvilet.', isDefault: true, exclude: ['act_sleep_insom', 'act_sleep_broken', 'act_sleep_early'] },
    { id: 'act_sleep_insom', label: 'Indsovningsbesvær', category: 'Søvn', text: 'Angiver indsovningsbesvær.', exclude: ['act_sleep_ok'], smartMerge: { prefix: 'Angiver ', item: 'indsovningsbesvær', suffix: '.' } },
    { id: 'act_sleep_broken', label: 'Afbrudt søvn', category: 'Søvn', text: 'Mange opvågninger.', exclude: ['act_sleep_ok'], smartMerge: { prefix: 'Angiver ', item: 'mange opvågninger', suffix: '.' } },
    { id: 'act_sleep_early', label: 'Tidlig opvågning', category: 'Søvn', text: 'Vågner tidligt uden at kunne falde i søvn igen (terminal insomni).', exclude: ['act_sleep_ok'], smartMerge: { prefix: 'Angiver ', item: 'tidlig opvågning', suffix: '.' } },
    { id: 'act_appetite_ok', label: 'Appetit normal', category: 'Appetit/Vægt', text: 'Normal appetit og stabil vægt.', isDefault: true, exclude: ['act_appetite_low', 'act_appetite_high', 'act_weight_loss'] },
    { id: 'act_appetite_low', label: 'Nedsat appetit', category: 'Appetit/Vægt', text: 'Nedsat lyst til mad.', exclude: ['act_appetite_ok'], smartMerge: { prefix: 'Angiver ', item: 'nedsat appetit', suffix: '.' } },
    { id: 'act_weight_loss', label: 'Vægttab', category: 'Appetit/Vægt', text: 'Angiver utilsigtet vægttab.', exclude: ['act_appetite_ok'], smartMerge: { prefix: 'Angiver ', item: 'vægttab', suffix: '.' } },
];

const SOMATIC_OBJ_OPTIONS = [
    { id: 'gen_upavirket', label: 'Upåvirket', category: 'Almentilstand', text: 'Upåvirket. Normal ernæringstilstand.', isDefault: true, exclude: ['gen_medtaget', 'gen_adipos', 'gen_emaciated'] },
    { id: 'gen_medtaget', label: 'Medtaget', category: 'Almentilstand', text: 'Fremstår medtaget.', exclude: ['gen_upavirket'], smartMerge: { prefix: 'Fremstår ', item: 'medtaget', suffix: '.' } },
    { id: 'gen_emaciated', label: 'Afmagret/Kakektisk', category: 'Almentilstand', text: 'Fremstår afmagret/kakektisk.', exclude: ['gen_upavirket', 'gen_adipos'], smartMerge: { prefix: 'Fremstår ', item: 'afmagret/kakektisk', suffix: '.' } },
    { id: 'gen_adipos', label: 'Adipositas', category: 'Almentilstand', text: 'Adipøs ernæringstilstand.', exclude: ['gen_upavirket', 'gen_emaciated'] },
    { id: 'cp_normal', label: 'St.c. et p. normal', category: 'Stethoscopia', text: 'St.c.: Regelmæssig hjerteaktion uden mislyde. St.p.: Vesikulær respiration uden bilyde.', isDefault: true, exclude: ['cp_abnorm_c', 'cp_abnorm_p'] },
    { id: 'cp_abnorm_c', label: 'St.c. uregelmæssig', category: 'Stethoscopia', text: 'St.c.: Uregelmæssig hjerteaktion (arytmi).', exclude: ['cp_normal'] },
    { id: 'cp_abnorm_p', label: 'St.p. bilyde', category: 'Stethoscopia', text: 'St.p.: Der høres bilyde (rhonchi/crepitatio).', exclude: ['cp_normal'] },
    { id: 'abd_normal', label: 'Abdomen normal', category: 'Abdomen & Nyreloger', text: 'Abdomen blød og uøm. Ingen udfyldninger. Normale tarmlyde. Ingen flankeømhed.', isDefault: true, exclude: ['abd_tender', 'abd_guard', 'abd_mass', 'abd_sounds_missing', 'abd_sounds_hyper', 'abd_flank_tender'] },
    { id: 'abd_tender', label: 'Ømhed', category: 'Abdomen & Nyreloger', text: 'Ømhed ved palpation.', exclude: ['abd_normal'], hasInput: true, detailInParens: true, smartMerge: { prefix: 'Der findes ', item: 'ømhed ved palpation', suffix: '.' } },
    { id: 'abd_guard', label: 'Værn/Slipømhed', category: 'Abdomen & Nyreloger', text: 'Værn og slipømhed.', exclude: ['abd_normal'], hasInput: true, detailInParens: true, smartMerge: { prefix: 'Der findes ', item: 'værn og slipømhed', suffix: '.' } },
    { id: 'abd_mass', label: 'Udfyldninger', category: 'Abdomen & Nyreloger', text: 'Udfyldning.', exclude: ['abd_normal'], hasInput: true, detailInParens: true, smartMerge: { prefix: 'Der palperes ', item: 'udfyldning', suffix: '.' } },
    { id: 'abd_sounds_missing', label: 'Manglende tarmlyde', category: 'Abdomen & Nyreloger', text: 'Manglende tarmlyde.', exclude: ['abd_normal'], smartMerge: { prefix: 'Der høres ', item: 'manglende tarmlyde', suffix: '.' } },
    { id: 'abd_sounds_hyper', label: 'Hyperaktive tarmlyde', category: 'Abdomen & Nyreloger', text: 'Hyperaktive tarmlyde.', exclude: ['abd_normal'], smartMerge: { prefix: 'Der høres ', item: 'hyperaktive tarmlyde', suffix: '.' } },
    { id: 'abd_flank_tender', label: 'Flankeømhed', category: 'Abdomen & Nyreloger', text: 'Der er bankeømhed svarende til nyrelogerne.', exclude: ['abd_normal'], smartMerge: { prefix: 'Der er ', item: 'bankeømhed svarende til nyrelogerne', suffix: '.' } },
    { id: 'cn_normal', label: 'Kranienerver II-XII normal', category: 'Neurologisk (Kranienerver)', text: 'Intet abnormt påvist, systematisk undersøgt (II-XII). Synsfelter fundet normale ved Donders. Pupiller egale med normal lysrefleks. Ingen nystagmus. Ingen facialisparese. Ingen tungedeviation.', isDefault: true, exclude: ['cn_pupil', 'cn_nystag', 'cn_facial', 'cn_other'] },
    { id: 'cn_pupil', label: 'Pupilforhold afviger', category: 'Neurologisk (Kranienerver)', text: 'Afvigende pupilforhold:', hasInput: true, inputPlaceholder: 'Beskriv afvigelse...', exclude: ['cn_normal'] },
    { id: 'cn_nystag', label: 'Nystagmus', category: 'Neurologisk (Kranienerver)', text: 'Der ses nystagmus.', hasInput: true, detailInParens: true, exclude: ['cn_normal'], smartMerge: { prefix: 'Der ses ', item: 'nystagmus', suffix: '.' } },
    { id: 'cn_facial', label: 'Facialisparese', category: 'Neurologisk (Kranienerver)', text: 'Tegn på facialisparese (central/perifer).', hasInput: true, detailInParens: true, exclude: ['cn_normal'], smartMerge: { prefix: 'Der ses ', item: 'facialisparese', suffix: '.' } },
    { id: 'motor_sys_normal', label: 'Motorik/Kraft normal', category: 'Neurologisk (Motorik)', text: 'Strakt arm- og bentest uden nedsynkning. Egal kraft (5/5) over de større led (OE+UE). Normal tonus.', isDefault: true, exclude: ['motor_weak_oe', 'motor_weak_ue', 'motor_tonus'] },
    { id: 'motor_weak_oe', label: 'Kraftnedsættelse OE', category: 'Neurologisk (Motorik)', text: 'Nedsat kraft i overekstremiteter.', exclude: ['motor_sys_normal'], smartMerge: { prefix: 'Nedsat kraft i ', item: 'overekstremiteter', suffix: '.' } },
    { id: 'motor_weak_ue', label: 'Kraftnedsættelse UE', category: 'Neurologisk (Motorik)', text: 'Nedsat kraft i underekstremiteter.', exclude: ['motor_sys_normal'], smartMerge: { prefix: 'Nedsat kraft i ', item: 'underekstremiteter', suffix: '.' } },
    { id: 'reflex_normal', label: 'Reflekser normale (Alle)', category: 'Neurologisk (Reflekser)', text: 'Normale og sidelige dybe senereflekser. Babinski negativ bilat.', isDefault: true, exclude: ['reflex_hyper', 'reflex_babinski', 'reflex_biceps', 'reflex_triceps', 'reflex_brachiorad', 'reflex_patellar', 'reflex_achilles', 'reflex_babinski_neg', 'reflex_patho_other'] },
    { id: 'reflex_biceps', label: 'Biceps (Normal)', category: 'Neurologisk (Reflekser)', text: 'Biceps: bilat. normal.', isDefault: false, isNormal: true, exclude: ['reflex_normal'], smartMerge: { prefix: '', item: 'biceps', suffix: ' findes bilat. normale.' } },
    { id: 'reflex_triceps', label: 'Triceps (Normal)', category: 'Neurologisk (Reflekser)', text: 'Triceps: bilat. normal.', isDefault: false, isNormal: true, exclude: ['reflex_normal'], smartMerge: { prefix: '', item: 'triceps', suffix: ' findes bilat. normale.' } },
    { id: 'reflex_brachiorad', label: 'Brachioradialis (Normal)', category: 'Neurologisk (Reflekser)', text: 'Brachioradialis: bilat. normal.', isDefault: false, isNormal: true, exclude: ['reflex_normal'], smartMerge: { prefix: '', item: 'brachioradialis', suffix: ' findes bilat. normale.' } },
    { id: 'reflex_patellar', label: 'Patellar (Normal)', category: 'Neurologisk (Reflekser)', text: 'Patellar: bilat. normal.', isDefault: false, isNormal: true, exclude: ['reflex_normal'], smartMerge: { prefix: '', item: 'patellar', suffix: ' findes bilat. normale.' } },
    { id: 'reflex_achilles', label: 'Achilles (Normal)', category: 'Neurologisk (Reflekser)', text: 'Achilles: bilat. normal.', isDefault: false, isNormal: true, exclude: ['reflex_normal'], smartMerge: { prefix: '', item: 'achilles', suffix: ' findes bilat. normale.' } },
    { id: 'reflex_babinski_neg', label: 'Babinski Neg.', category: 'Neurologisk (Reflekser)', text: 'Babinski: Negativ.', isDefault: false, isNormal: true, exclude: ['reflex_normal', 'reflex_babinski'] },
    { id: 'reflex_hyper', label: 'Hyperrefleksi', category: 'Neurologisk (Reflekser)', text: 'Livlige/Hyperaktive reflekser.', exclude: ['reflex_normal'], smartMerge: { prefix: 'Der findes ', item: 'livlige/hyperaktive reflekser', suffix: '.' } },
    { id: 'reflex_babinski', label: 'Babinski Positiv', category: 'Neurologisk (Reflekser)', text: 'Babinski positiv (extensivt tå-respons).', exclude: ['reflex_normal', 'reflex_babinski_neg'], isPathology: true, smartMerge: { prefix: 'Der findes ', item: 'positiv Babinski (extensivt tå-respons)', suffix: '.' } },
    { id: 'reflex_patho_other', label: 'Andet patologisk (Beskriv)', category: 'Neurologisk (Reflekser)', text: 'Patologiske refleksfund.', hasInput: true, detailInParens: true, inputPlaceholder: 'Beskriv fund...', exclude: ['reflex_normal'], smartMerge: { prefix: 'Der findes ', item: 'patologiske refleksfund', suffix: '.' } },
    { id: 'coord_normal', label: 'Koordination normal', category: 'Neurologisk (Cerebellart)', text: 'Normal koordination ved finger-næse forsøg og knæ-hæl forsøg. Ingen ataksi.', isDefault: true, exclude: ['coord_ataxia', 'coord_romberg'] },
    { id: 'coord_ataxia', label: 'Ataksi/Usikker FNF', category: 'Neurologisk (Cerebellart)', text: 'Usikkerhed ved finger-næse forsøg (ataksi).', exclude: ['coord_normal'], smartMerge: { prefix: 'Der findes ', item: 'ataksi', suffix: '.' } },
    { id: 'coord_romberg', label: 'Romberg Positiv', category: 'Neurologisk (Cerebellart)', text: 'Rombergs test positiv (faldtendens ved lukkede øjne).', exclude: ['coord_normal'], smartMerge: { prefix: 'Der findes ', item: 'positiv Romberg', suffix: '.' } },
    { id: 'gait_normal', label: 'Gang/Stand normal', category: 'Neurologisk (Gang)', text: 'Sikker gang, vending og stand. Linegang upåfaldende.', isDefault: true, exclude: ['gait_unsure', 'gait_broad'] },
    { id: 'gait_unsure', label: 'Usikker gang', category: 'Neurologisk (Gang)', text: 'Gangen er usikker/bredsporet.', exclude: ['gait_normal'] },
    { id: 'eps_none', label: 'Ingen EPS', category: 'Neurologisk (EPS)', text: 'Ingen bradykinesi, rigiditet eller ufrivillige bevægelser. Ingen hvile- eller intentionstremor.', isDefault: true, exclude: ['eps_rigid', 'eps_tremor', 'eps_dyskinesia', 'eps_aca'] },
    { id: 'eps_rigid', label: 'Rigiditet', category: 'Neurologisk (EPS)', text: 'Der findes rigiditet ved passiv bevægelse.', exclude: ['eps_none'], smartMerge: { prefix: 'Der observeres ', item: 'rigiditet', suffix: '.' } },
    { id: 'eps_tremor', label: 'Tremor', category: 'Neurologisk (EPS)', text: 'Der observeres tremor (hvile/intention).', exclude: ['eps_none'], smartMerge: { prefix: 'Der observeres ', item: 'tremor', suffix: '.' } },
    { id: 'eps_dyskinesia', label: 'Dyskinesier', category: 'Neurologisk (EPS)', text: 'Der ses orofaciale dyskinesier.', exclude: ['eps_none'], smartMerge: { prefix: 'Der observeres ', item: 'dyskinesier', suffix: '.' } },
    { id: 'eps_aca', label: 'Akatisi', category: 'Neurologisk (EPS)', text: 'Motorisk urolig, tegn på akatisi.', exclude: ['eps_none'], smartMerge: { prefix: 'Der observeres ', item: 'akatisi', suffix: '.' } },
    { id: 'skin_normal', label: 'Hud: ingen mærker', category: 'Hud/Traumer', text: 'Ingen tegn på friske eller ældre læsioner eller injektionsmærker.', isDefault: true, exclude: ['skin_cut_fresh', 'skin_cut_old', 'skin_inject'] },
    { id: 'skin_cut_fresh', label: 'Friske snitsår', category: 'Hud/Traumer', text: 'Der ses friske snitsår.', hasInput: true, detailInParens: true, inputPlaceholder: 'Lokalisation...', exclude: ['skin_normal'], smartMerge: { prefix: 'Der ses ', item: 'friske snitsår', suffix: '.' } },
    { id: 'skin_cut_old', label: 'Gamle ar', category: 'Hud/Traumer', text: 'Gamle ar efter selvskade (scars).', exclude: ['skin_normal'], smartMerge: { prefix: 'Der ses ', item: 'gamle ar', suffix: '.' } },
    { id: 'skin_inject', label: 'Injektionsmærker', category: 'Hud/Traumer', text: 'Injektionsmærker i lysken/albuebøjning.', exclude: ['skin_normal'], smartMerge: { prefix: 'Der ses ', item: 'injektionsmærker', suffix: '.' } },
];

// --- INPUT COMPONENT ---
const Input = ({ label, value, onChange }) => (
    <div className="flex flex-col gap-0.5">
        <label className="text-[10px] uppercase font-bold text-slate-400">{label}</label>
        <input 
            className="text-xs p-1.5 rounded border border-slate-200 focus:outline-none focus:border-indigo-400 focus:bg-white bg-slate-50 transition-colors w-full"
            placeholder="..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

// --- APP KOMPONENT ---
function App() {
    const [activeSection, setActiveSection] = useState('psych_actual');
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [optionDetails, setOptionDetails] = useState({}); 
    const [generatedText, setGeneratedText] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [notification, setNotification] = useState(null);
    const [showSummary, setShowSummary] = useState(false);
    
    // Indledende Anamnese states
    const [contactReasonText, setContactReasonText] = useState('');
    const [timelineText, setTimelineText] = useState(''); 
    
    const [dietDays, setDietDays] = useState([]);
    const [activeDietDayId, setActiveDietDayId] = useState(null); 
    const [isUniformDiet, setIsUniformDiet] = useState(false); 

    const [manualEditMode, setManualEditMode] = useState(false);
    
    // Custom Modal State
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, action: null });

    useEffect(() => {
        const defaults = new Set();
        [...PSYCH_OPTIONS, ...SOMATIC_OBJ_OPTIONS, ...SOMATIC_ACT_OPTIONS, ...ACTUAL_PSYCH_OPTIONS, ...ANOREXIA_OPTIONS].forEach(opt => {
            if (opt.isDefault) defaults.add(opt.id);
        });
        setSelectedIds(defaults);
    }, []);
    
    // --- CORE TEXT GENERATION LOGIC ---

    const capitalize = (s) => {
        if (!s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };
    
    const formatList = (items) => {
        if (items.length === 0) return '';
        if (items.length === 1) return items[0];
        const last = items.pop();
        return items.join(', ') + ' og ' + last;
    };

    const formatWithDetail = (opt, detail) => {
        let base = opt.text.trim();
        const d = detail ? detail.trim() : '';

        if (d === '') {
            if (base.endsWith(':')) return base.slice(0, -1) + '.';
            return base + (base.match(/[.:?!]$/) ? '' : '.');
        }
        
        if (opt.detailInParens) {
            let cleanBase = base.replace(/\.$/, ''); 
            return `${cleanBase} (${d}).`;
        }
        
        if (!base.match(/[.:?!]$/)) {
            return `${base} ${d}.`; 
        }
        
        if (base.match(/[:?!]$/)) {
            const formattedDetail = d.charAt(0).toUpperCase() + d.slice(1);
            return `${base} ${formattedDetail}${formattedDetail.endsWith('.') ? '' : '.'}`;
        }
        
        const formattedDetail = d.charAt(0).toUpperCase() + d.slice(1);
        return `${base} ${formattedDetail}${formattedDetail.endsWith('.') ? '' : '.'}`;
    };

    const calculateDepressionSeverity = (selectedSet) => {
        const coreCount = DEP_CORE_IDS.filter(id => selectedSet.has(id)).length;
        const accCount = DEP_ACC_IDS.filter(id => selectedSet.has(id)).length;
        
        if (coreCount === 3 && accCount >= 5) return 'svær';
        if (coreCount >= 2 && accCount >= 4) return 'moderat';
        if (coreCount >= 2 && accCount >= 2) return 'lettere';
        
        return null;
    };

    const processCategoryOptions = (categoryOptions, categoryName, currentSelectedIds, currentDetails) => {
        const lines = [];
        const prefixUsage = new Set(); 

        const plainItemsByPrefix = {};
        const detailedOptions = [];
        const standaloneOptions = [];

        categoryOptions.forEach(opt => {
            if (!currentSelectedIds.has(opt.id)) return;

            const detail = currentDetails[opt.id];
            const hasDetail = detail && detail.trim() !== '';

            if (opt.smartMerge && !opt.isDefault) {
                const prefix = opt.smartMerge.prefix || '';
                if (!hasDetail) {
                    if (!plainItemsByPrefix[prefix]) plainItemsByPrefix[prefix] = [];
                    plainItemsByPrefix[prefix].push(opt);
                } else {
                    detailedOptions.push({ opt, detail });
                }
            } else {
                standaloneOptions.push({ opt, detail });
            }
        });

        Object.keys(plainItemsByPrefix).forEach(prefix => {
            const opts = plainItemsByPrefix[prefix];
            const items = opts.map(o => o.smartMerge.item);
            const suffix = opts[0].smartMerge.suffix || '.';
            const mergedItems = formatList(items);

            let safeSuffix = suffix.trim();
            if (safeSuffix === ':' || safeSuffix.endsWith(':')) safeSuffix = safeSuffix.replace(/:$/, '.');
            
            lines.push(capitalize(`${prefix}${mergedItems}${safeSuffix}`));
            prefixUsage.add(prefix.trim()); 
        });

        detailedOptions.forEach(({ opt, detail }) => {
            const prefix = opt.smartMerge.prefix || '';
            const item = opt.smartMerge.item;
            const suffix = opt.smartMerge.suffix || '.';
            const cleanedDetail = detail ? detail.trim() : '';

            let finalSentence = "";
            const cleanPrefix = prefix.trim();
            
            const shouldDropPrefix = cleanPrefix.length > 7 && prefixUsage.has(cleanPrefix);

            let effectivePrefix = shouldDropPrefix ? "" : prefix;
            let formattedItem = shouldDropPrefix ? capitalize(item) : item;

            if (cleanedDetail === '') {
                let fallbackS = suffix.trim();
                if (fallbackS === ':' || fallbackS.endsWith(':')) fallbackS = fallbackS.replace(/:$/, '.');
                if (!fallbackS.endsWith('.')) fallbackS += '.';
                finalSentence = capitalize(`${effectivePrefix}${formattedItem}${fallbackS}`);
            } else {
                if (opt.detailInParens) {
                    finalSentence = capitalize(`${effectivePrefix}${formattedItem} (${cleanedDetail})${suffix}`);
                } else {
                    let cleanS = suffix.trim();
                    if (cleanS === ':' || cleanS.endsWith(':')) {
                            finalSentence = capitalize(`${effectivePrefix}${formattedItem}${cleanS} ${capitalize(cleanedDetail)}.`);
                    } else {
                            if (!cleanS.endsWith('.')) cleanS += '.';
                            finalSentence = capitalize(`${effectivePrefix}${formattedItem}${cleanS} ${capitalize(cleanedDetail)}.`);
                    }
                }
            }

            lines.push(finalSentence);
            if (cleanPrefix.length > 0) prefixUsage.add(cleanPrefix); 
        });

        standaloneOptions.forEach(({ opt, detail }) => {
            lines.push(formatWithDetail(opt, detail));
        });
        
        if (categoryName === 'Depression (ICD-10 Screening)') {
                const severity = calculateDepressionSeverity(currentSelectedIds);
                if (severity) {
                    lines.push(`Opfylder dermed ICD-10 kriterierne for en depression i ${severity} grad.`);
                } else {
                    const hasAnySymptoms = [...DEP_CORE_IDS, ...DEP_ACC_IDS].some(id => currentSelectedIds.has(id));
                    if (hasAnySymptoms) {
                        lines.push('Opfylder ikke de fulde ICD-10 kriterier for en depressiv episode.');
                    }
                }
        }
        return lines.join(' ');
    };

    const generateTextContent = (section, ids, details, contactReason, timeline, diets, uniform, summaryMode) => {
        const allSections = [
            { id: 'psych_actual', title: 'AKTUELT PSYKISK (ANAMNESE)', options: ACTUAL_PSYCH_OPTIONS },
            { id: 'psych', title: 'OBJEKTIVT PSYKISK (MSE)', options: PSYCH_OPTIONS },
            { id: 'somatic_act', title: 'AKTUELT SOMATISK', options: SOMATIC_ACT_OPTIONS },
            { id: 'somatic_obj', title: 'SOMATISK VURDERING', options: SOMATIC_OBJ_OPTIONS },
            { id: 'diagnosis_anorexia', title: 'ANOREKSIA NERVOSA (F50.0)', options: ANOREXIA_OPTIONS }
        ];

        let sectionsToRender = [];
        if (section === 'full_note') {
            sectionsToRender = allSections;
        } else {
            sectionsToRender = allSections.filter(s => s.id === section);
        }

        const lines = [];
        const movedCategories = new Set(); 

        if (summaryMode) {
            const obsLines = [];
            sectionsToRender.forEach(sec => {
                const categories = Array.from(new Set(sec.options.map(o => o.category)));
                categories.forEach(cat => {
                    const selectedOptions = sec.options.filter(o => o.category === cat && ids.has(o.id));
                    const hasAbnormality = selectedOptions.some(o => o.isPathology || (!o.isDefault && !o.isNormal));
                    
                    if (hasAbnormality && selectedOptions.length > 0) {
                        const text = processCategoryOptions(sec.options, cat, ids, details); 
                        obsLines.push(`${cat}: ${text}`);
                        movedCategories.add(cat);
                    }
                });
            });

            if (obsLines.length > 0) {
                lines.push("OBSERVATIONER");
                lines.push(...obsLines);
                lines.push("");
                lines.push("---");
                lines.push(""); 
            }
        }

        sectionsToRender.forEach(sec => {
            const sectionLines = [];
            
            if (sec.id === 'psych_actual') {
                if (contactReason.trim()) {
                        sectionLines.push(`Kontaktårsag: ${contactReason.trim()}`);
                }
                if (timeline.trim()) {
                        sectionLines.push(`Sygdomsdebut & Udløsende faktorer: ${timeline.trim()}`);
                }
            }

            if (sec.id === 'diagnosis_anorexia' && diets.length > 0) {
                if (uniform) {
                        const day = diets[0];
                        if (day) {
                        sectionLines.push("Kostanamnese: Patienten angiver at spise det samme hver dag. Nedenstående er repræsentativt for det daglige indtag:");
                        if (day.meals.morgen) sectionLines.push(`- Morgen: ${day.meals.morgen}`);
                        if (day.meals.formiddag) sectionLines.push(`- Før frokost: ${day.meals.formiddag}`);
                        if (day.meals.frokost) sectionLines.push(`- Frokost: ${day.meals.frokost}`);
                        if (day.meals.eftermiddag) sectionLines.push(`- Eftermiddag: ${day.meals.eftermiddag}`);
                        if (day.meals.aften) sectionLines.push(`- Aften: ${day.meals.aften}`);
                        if (day.meals.sen_aften) sectionLines.push(`- Efter aften: ${day.meals.sen_aften}`);
                        if (day.meals.vaeske) sectionLines.push(`- Væske: ${day.meals.vaeske}`);
                        }
                } else {
                    sectionLines.push("Kostanamnese (eksempler fra sidste 14 dage):");
                    diets.forEach(day => {
                        sectionLines.push(`${day.label || 'Uden navn'}:`);
                        if (day.meals.morgen) sectionLines.push(`- Morgen: ${day.meals.morgen}`);
                        if (day.meals.formiddag) sectionLines.push(`- Før frokost: ${day.meals.formiddag}`);
                        if (day.meals.frokost) sectionLines.push(`- Frokost: ${day.meals.frokost}`);
                        if (day.meals.eftermiddag) sectionLines.push(`- Eftermiddag: ${day.meals.eftermiddag}`);
                        if (day.meals.aften) sectionLines.push(`- Aften: ${day.meals.aften}`);
                        if (day.meals.sen_aften) sectionLines.push(`- Efter aften: ${day.meals.sen_aften}`);
                        if (day.meals.vaeske) sectionLines.push(`- Væske: ${day.meals.vaeske}`);
                        sectionLines.push("");
                    });
                }
            }

            const categories = Array.from(new Set(sec.options.map(o => o.category)));
            categories.forEach(cat => {
                if (movedCategories.has(cat)) return;
                
                const categoryOptions = sec.options.filter(o => o.category === cat);
                const selectedInCat = categoryOptions.filter(o => ids.has(o.id));
                
                if (selectedInCat.length > 0) {
                    const text = processCategoryOptions(categoryOptions, cat, ids, details);
                    if (text) sectionLines.push(`${cat}: ${text}`);
                }
            });

            if (sectionLines.length > 0) {
                if (sec.id !== 'diagnosis_anorexia') {
                        lines.push(sec.title);
                }
                lines.push(...sectionLines);
                lines.push(""); 
            }
        });

        return lines.join('\n');
    };

    useEffect(() => {
        if (!manualEditMode) {
            const text = generateTextContent(activeSection, selectedIds, optionDetails, contactReasonText, timelineText, dietDays, isUniformDiet, showSummary);
            setGeneratedText(text);
        }
    }, [selectedIds, activeSection, showSummary, optionDetails, contactReasonText, timelineText, dietDays, isUniformDiet, manualEditMode]);

    const changeSection = (newSection) => {
        if (manualEditMode) setManualEditMode(false);
        setActiveSection(newSection);
    };
    
    const handleManualTextChange = (e) => {
        setGeneratedText(e.target.value);
        setManualEditMode(true);
    };

    const toggleOption = (option) => {
        const isSelected = selectedIds.has(option.id);
        const newSelection = new Set(selectedIds);
        
        if (isSelected) {
            newSelection.delete(option.id);
        } else {
            newSelection.add(option.id);
            option.exclude?.forEach(exId => newSelection.delete(exId));
        }
        setSelectedIds(newSelection);
        
        if (manualEditMode) {
            setNotification({ message: 'Valg gemt. Tekst opdateres ikke i manuel tilstand.', type: 'error' });
            setTimeout(() => setNotification(null), 2500);
        }
    };

    const setNormalStatus = () => {
        let sectionOptions = [];
        let normalIds = [];

        if (activeSection === 'psych') {
            sectionOptions = PSYCH_OPTIONS;
            normalIds = PSYCH_NORMAL_IDS;
        } else if (activeSection === 'somatic_obj') {
            sectionOptions = SOMATIC_OBJ_OPTIONS;
            normalIds = SOMATIC_NORMAL_IDS;
        } else if (activeSection === 'somatic_act') {
            sectionOptions = SOMATIC_ACT_OPTIONS;
            normalIds = SOMATIC_ACT_NORMAL_IDS;
        } else {
            return; 
        }

        const newSet = new Set(selectedIds);
        sectionOptions.forEach(opt => newSet.delete(opt.id));
        normalIds.forEach(id => newSet.add(id));
        
        setSelectedIds(newSet);
        
        if (manualEditMode) {
            setNotification({ message: 'Normalstatus sat. Tekst opdateres ikke i manuel tilstand.', type: 'error' });
        } else {
            setNotification({ message: 'Normalstatus indsat', type: 'success' });
        }
        setTimeout(() => setNotification(null), 3000);
    };

    const addDietDay = () => {
        if (isUniformDiet) return; 
        const newId = Date.now();
        const newDay = {
            id: newId,
            label: `Dag ${dietDays.length + 1}`,
            meals: { morgen: '', formiddag: '', frokost: '', eftermiddag: '', aften: '', sen_aften: '', vaeske: '' }
        };
        setDietDays([...dietDays, newDay]);
        setActiveDietDayId(newId); 
    };

    const updateDietDay = (id, field, value) => {
        setDietDays(prevDays => prevDays.map(day => {
            if (day.id === id) {
                if (field === 'label') return { ...day, label: value };
                return { ...day, meals: { ...day.meals, [field]: value } };
            }
            return day;
        }));
    };

    const removeDietDay = (id) => {
        setDietDays(prevDays => prevDays.filter(day => day.id !== id));
        if (activeDietDayId === id) {
            setActiveDietDayId(null);
        }
    };

    const toggleUniform = () => {
        const newState = !isUniformDiet;
        setIsUniformDiet(newState);
        
        if (newState) {
                setNotification({ message: 'Tilstand aktiveret: Spiser det samme hver dag', type: 'success' });
                if (dietDays.length === 0) {
                    const newId = Date.now();
                    const newDay = {
                        id: newId, label: 'Dag 1',
                        meals: { morgen: '', formiddag: '', frokost: '', eftermiddag: '', aften: '', sen_aften: '', vaeske: '' }
                    };
                    setDietDays([newDay]);
                    setActiveDietDayId(newId);
                } else {
                    setActiveDietDayId(dietDays[0].id);
                }
        } else {
                setNotification({ message: 'Tilstand deaktiveret: Individuelle dage', type: 'success' });
        }
        setTimeout(() => setNotification(null), 3000);
    };

        const copyPreviousDay = (id) => {
        setDietDays(prevDays => {
            const index = prevDays.findIndex(d => d.id === id);
            if (index <= 0) return prevDays;
            const prevDay = prevDays[index - 1];
            const currentDay = prevDays[index];
            const updatedDay = { ...currentDay, meals: { ...prevDay.meals } };
            const newDays = [...prevDays];
            newDays[index] = updatedDay;
            return newDays;
        });
        setNotification({ message: 'Måltider kopieret fra forrige dag', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleDetailChange = (id, value) => {
        setOptionDetails(prev => ({ ...prev, [id]: value }));
    };

    // MODAL LOGIC FOR "RYD ALT" OG "RYD SEKTION"
    const openClearConfirm = () => {
        setConfirmDialog({ isOpen: true, action: 'clear' });
    };

    const handleConfirm = () => {
        if (confirmDialog.action === 'clear') {
            executeClearAll();
        } else if (confirmDialog.action === 'sync') {
            executeForceSync();
        }
    };

    const executeClearAll = () => {
        if (activeSection === 'full_note') {
            setSelectedIds(new Set()); // Blanker alle valg
            setOptionDetails({});
            setContactReasonText('');
            setTimelineText('');
            setDietDays([]);
            setIsUniformDiet(false);
        } else {
            let currentOptions = [];
            if (activeSection === 'psych_actual') currentOptions = ACTUAL_PSYCH_OPTIONS;
            else if (activeSection === 'psych') currentOptions = PSYCH_OPTIONS;
            else if (activeSection === 'somatic_obj') currentOptions = SOMATIC_OBJ_OPTIONS;
            else if (activeSection === 'somatic_act') currentOptions = SOMATIC_ACT_OPTIONS;
            else if (activeSection === 'diagnosis_anorexia') currentOptions = ANOREXIA_OPTIONS;

            const newSet = new Set(selectedIds);
            const newDetails = { ...optionDetails };
            currentOptions.forEach(o => {
                newSet.delete(o.id);
                delete newDetails[o.id];
            });
            
            if (activeSection === 'psych_actual') {
                setContactReasonText('');
                setTimelineText('');
            }
            if (activeSection === 'diagnosis_anorexia') {
                setDietDays([]);
                setIsUniformDiet(false);
            }
            
            setSelectedIds(newSet);
            setOptionDetails(newDetails);
        }
        setManualEditMode(false);
        setConfirmDialog({ isOpen: false, action: null });
        setNotification({ message: 'Data slettet', type: 'success' });
        setTimeout(() => setNotification(null), 2500);
    };

    const resetSection = () => {
        let currentOptions = [];
            if (activeSection === 'psych_actual') currentOptions = ACTUAL_PSYCH_OPTIONS;
        else if (activeSection === 'psych') currentOptions = PSYCH_OPTIONS;
        else if (activeSection === 'somatic_obj') currentOptions = SOMATIC_OBJ_OPTIONS;
        else if (activeSection === 'somatic_act') currentOptions = SOMATIC_ACT_OPTIONS;
        else if (activeSection === 'diagnosis_anorexia') currentOptions = ANOREXIA_OPTIONS;
        else if (activeSection === 'full_note') {
            return;
        }

        const newSet = new Set(selectedIds);
        
        // Bevarer newDetails (fritekst), men fjerner markeringer
        currentOptions.forEach(o => {
            newSet.delete(o.id);
        });
        
        currentOptions.filter(o => o.isDefault).forEach(o => newSet.add(o.id));
        
        setSelectedIds(newSet);
        setManualEditMode(false);
        
        setNotification({ message: 'Valg nulstillet (fritekst bevaret)', type: 'success' });
        setTimeout(() => setNotification(null), 2500);
    };
    
    // MODAL LOGIC FOR "GENDAN SYNKRONISERING"
    const openSyncConfirm = () => {
        setConfirmDialog({ isOpen: true, action: 'sync' });
    };

    const executeForceSync = () => {
        setManualEditMode(false);
        setConfirmDialog({ isOpen: false, action: null });
        setNotification({ message: 'Synkronisering gendannet', type: 'success' });
        setTimeout(() => setNotification(null), 2500);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedText);
        setNotification({ message: 'Tekst kopieret til udklipsholder', type: 'success' });
        setTimeout(() => setNotification(null), 3000);
    };
    
    const toggleFullscreen = () => {
            if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(err);
                setNotification({ message: 'Fuldskærm er ikke understøttet i denne visning', type: 'error' });
                setTimeout(() => setNotification(null), 3000);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen().catch(err => console.error(err));
            setIsFullscreen(false);
        }
    };


    const renderCardGrid = (dataSet) => {
        const categories = Array.from(new Set(dataSet.map(o => o.category)));
        return (
            <div className={`pb-20 transition-all duration-300 ${manualEditMode ? 'opacity-50 pointer-events-none grayscale-[30%]' : ''}`}>
                {activeSection === 'psych_actual' && (
                        <div className="mb-6 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                                <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Indledende Anamnese</h3>
                                <PenLine className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="p-4 flex flex-col gap-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Kontaktårsag</label>
                                <textarea 
                                    className="w-full h-16 p-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-all placeholder:text-slate-400"
                                    placeholder="Hvorfor henvender patienten sig i dag? Hvad er det primære problem?"
                                    value={contactReasonText}
                                    onChange={(e) => setContactReasonText(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="h-px bg-slate-100 w-full"></div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Sygdomsdebut & Udløsende faktorer</label>
                                <textarea 
                                    className="w-full h-20 p-3 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-all placeholder:text-slate-400"
                                    placeholder="Beskriv hvornår symptomerne startede, hvordan de har udviklet sig, og om der er en udløsende årsag..."
                                    value={timelineText}
                                    onChange={(e) => setTimelineText(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        </div>
                )}

                {activeSection === 'diagnosis_anorexia' && (
                    <div className="mb-8">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-inner">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                                        <Layout className="w-4 h-4" /> Kostregistrering (14 dage)
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {isUniformDiet ? 'Ensartet kost registreret. Rediger Dag 1 for at ændre.' : 'Vælg en dag i listen til venstre for at redigere.'}
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={toggleUniform}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                                            isUniformDiet 
                                            ? 'bg-amber-100 text-amber-900 border border-amber-300 ring-1 ring-amber-300' 
                                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        <Repeat size={16} /> Spiser det samme hver dag
                                    </button>
                                    <button 
                                        onClick={addDietDay}
                                        disabled={isUniformDiet}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                                            isUniformDiet
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        }`}
                                    >
                                        <Plus size={16} /> Tilføj Dag
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row h-[550px] bg-white border border-slate-200 rounded-xl overflow-hidden relative">
                                {isUniformDiet && (
                                    <div className="absolute top-0 left-0 bottom-0 w-1/3 z-10 bg-slate-50/60 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 border-r border-slate-200 text-center">
                                            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm">
                                                <Repeat className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                                                <h4 className="font-bold text-amber-900 text-sm">Ensartet Kost</h4>
                                                <p className="text-xs text-amber-700 mt-1">Input er låst til <strong>Dag 1</strong>, da kosten er angivet som værende ens hver dag.</p>
                                            </div>
                                    </div>
                                )}
                                <div className="w-full md:w-1/3 border-r border-slate-200 bg-slate-50 flex flex-col">
                                        <div className="p-3 bg-slate-100 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase flex justify-between items-center">
                                        <span>Dage ({dietDays.length})</span>
                                        </div>
                                        <div className="overflow-y-auto flex-1 p-2 space-y-1">
                                        {dietDays.length === 0 ? (
                                            <div className="text-center py-10 text-slate-400 text-sm italic px-4">
                                                Ingen dage tilføjet. <br/> {isUniformDiet ? 'Systemet tilføjer automatisk en dag...' : 'Tryk på "Tilføj Dag".'}
                                            </div>
                                        ) : (
                                            dietDays.map((day, index) => {
                                                const isActive = activeDietDayId === day.id;
                                                if (isUniformDiet && index > 0) return null;
                                                return (
                                                    <div 
                                                        key={day.id}
                                                        onClick={() => setActiveDietDayId(day.id)} 
                                                        className={`w-full text-left px-3 py-3 rounded-lg flex items-center justify-between cursor-pointer transition-all border ${
                                                            isActive ? 'bg-white border-indigo-200 shadow-sm ring-1 ring-indigo-50' : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-1.5 h-8 rounded-full ${isActive ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                                                            <div>
                                                                <div className={`text-sm font-semibold ${isActive ? 'text-indigo-700' : 'text-slate-600'}`}>
                                                                    {isUniformDiet ? 'Standard Dag (Dag 1)' : (day.label || 'Uden navn')}
                                                                </div>
                                                                <div className="text-[10px] text-slate-400">{Object.values(day.meals).filter(v => v).length} måltider</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {!isUniformDiet && (
                                                                <button onClick={(e) => { e.stopPropagation(); removeDietDay(day.id); }} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={14}/></button>
                                                            )}
                                                            {isActive && <ChevronRight className="w-4 h-4 text-indigo-400" />}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                        </div>
                                </div>
                                <div className="w-full md:w-2/3 bg-white flex flex-col">
                                    {activeDietDayId && dietDays.find(d => d.id === activeDietDayId) ? (
                                        (() => {
                                            const activeDay = dietDays.find(d => d.id === activeDietDayId);
                                            const index = dietDays.findIndex(d => d.id === activeDietDayId);
                                            return (
                                                <div className="flex flex-col h-full">
                                                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                                                        <input 
                                                            className="text-lg font-bold text-slate-800 bg-transparent border-none focus:ring-0 p-0 w-full focus:underline focus:decoration-indigo-300 underline-offset-4 decoration-transparent transition-all" 
                                                            value={activeDay.label} 
                                                            onChange={(e) => updateDietDay(activeDay.id, 'label', e.target.value)}
                                                            placeholder="Navngiv dag..."
                                                            disabled={isUniformDiet}
                                                        />
                                                        {!isUniformDiet && index > 0 && (
                                                                <button onClick={() => copyPreviousDay(activeDay.id)} className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors">
                                                                <Copy className="w-3 h-3" /> Kopier forrige
                                                            </button>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-slate-50/30">
                                                        <Input label="Morgenmad" value={activeDay.meals.morgen} onChange={v => updateDietDay(activeDay.id, 'morgen', v)} />
                                                        <Input label="Før frokost" value={activeDay.meals.formiddag} onChange={v => updateDietDay(activeDay.id, 'formiddag', v)} />
                                                        <Input label="Frokost" value={activeDay.meals.frokost} onChange={v => updateDietDay(activeDay.id, 'frokost', v)} />
                                                        <Input label="Eftermiddag" value={activeDay.meals.eftermiddag} onChange={v => updateDietDay(activeDay.id, 'eftermiddag', v)} />
                                                        <Input label="Aften" value={activeDay.meals.aften} onChange={v => updateDietDay(activeDay.id, 'aften', v)} />
                                                        <Input label="Efter aften" value={activeDay.meals.sen_aften} onChange={v => updateDietDay(activeDay.id, 'sen_aften', v)} />
                                                        <div className="h-px bg-slate-200 my-2"></div>
                                                        <Input label="Væske (Type og mængde)" value={activeDay.meals.vaeske} onChange={v => updateDietDay(activeDay.id, 'vaeske', v)} />
                                                    </div>
                                                </div>
                                            );
                                        })()
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                                            <div className="bg-slate-50 p-4 rounded-full mb-3"><Layout className="w-8 h-8 text-slate-300" /></div>
                                            <p className="font-medium text-slate-500">Ingen dag valgt</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {categories.map(cat => (
                        <div key={cat} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
                            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                                <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">{cat}</h3>
                                {dataSet.filter(o => o.category === cat && !o.isDefault && !o.isNormal && selectedIds.has(o.id)).length > 0 && <AlertCircle className="w-4 h-4 text-red-500" />}
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                {dataSet.filter(o => o.category === cat).map(option => {
                                    const isSelected = selectedIds.has(option.id);
                                    const isPathology = option.isPathology || (!option.isDefault && !option.isNormal);
                                    let btnClass = "w-full text-left px-3 py-2.5 text-sm rounded-lg border transition-all duration-200 flex items-center justify-between group ";
                                    if (isSelected) {
                                        if (isPathology) btnClass += "bg-red-50 border-red-200 text-red-900 shadow-sm";
                                        else btnClass += "bg-emerald-50 border-emerald-200 text-emerald-900 shadow-sm";
                                    } else {
                                        btnClass += "bg-white border-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900";
                                    }

                                    return (
                                        <div key={option.id}>
                                            <button onClick={() => toggleOption(option)} className={btnClass}>
                                                <span className="truncate pr-2">{option.label}</span>
                                                {isSelected && (isPathology ? <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />)}
                                            </button>
                                            {isSelected && (isPathology || option.hasInput) && (
                                                <div className="mt-1 mb-1 ml-1 pl-2 border-l-2 border-slate-200">
                                                    <input 
                                                        type="text" 
                                                        placeholder={option.inputPlaceholder || "Uddybning..."} 
                                                        className="w-full text-xs p-1.5 bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
                                                        value={optionDetails[option.id] || ''}
                                                        onChange={(e) => handleDetailChange(option.id, e.target.value)}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-screen bg-slate-100 text-slate-900 font-sans overflow-hidden relative">
            
            {/* CUSTOM MODAL FOR CONFIRMATION DIALOGS */}
            {confirmDialog.isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center modal-overlay bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 p-6 max-w-sm w-full mx-4 modal-content">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-100 text-red-600 rounded-full">
                                <AlertTriangle className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">
                                {confirmDialog.action === 'clear' ? (activeSection === 'full_note' ? 'Ryd hele notatet?' : 'Ryd sektion?') : 'Gendan Synkronisering?'}
                            </h3>
                        </div>
                        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                            {confirmDialog.action === 'clear' 
                                ? 'Er du sikker på, at du vil rydde alle valg og fritekstfelter? Dette kan ikke fortrydes.' 
                                : 'Dette vil slette dine manuelle rettelser i højre side, og genopbygge teksten fuldstændigt ud fra formularens valg. Vil du fortsætte?'}
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button 
                                onClick={() => setConfirmDialog({ isOpen: false, action: null })} 
                                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                Annuller
                            </button>
                            <button 
                                onClick={handleConfirm} 
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                            >
                                {confirmDialog.action === 'clear' ? 'Ja, ryd data' : 'Ja, gendan teksten'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TOAST NOTIFICATION */}
            {notification && (
                <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all duration-300 ${notification.type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'}`}>
                    {notification.type === 'error' ? <XCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                    <span className="text-sm font-medium">{notification.message}</span>
                </div>
            )}

            <header className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm shrink-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-600 p-1.5 rounded-lg"><Activity className="text-white h-5 w-5" /></div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-800 leading-tight">Psykiatrisk Journalværktøj</h1>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500"><span>Klinisk dokumentationsstøtte</span><span className="text-slate-300">•</span><span>v10.2 (Modal Fix)</span></div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button type="button" onClick={openClearConfirm} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 cursor-pointer shadow-sm">
                        <Trash2 className="w-5 h-5" /> <span>{activeSection === 'full_note' ? 'Ryd Alt' : 'Ryd Sektion'}</span>
                    </button>
                    <button type="button" onClick={() => setShowSummary(!showSummary)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border cursor-pointer shadow-sm ${showSummary ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}>
                        {showSummary ? <ToggleRight className="w-5 h-5 text-emerald-400" /> : <ToggleLeft className="w-5 h-5 text-slate-400" />} <span>Vis fund øverst</span>
                    </button>
                    <div className="h-6 w-px bg-slate-200 mx-1"></div>
                    <button onClick={toggleFullscreen} className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                    </button>
                </div>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <nav className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col flex-shrink-0 z-10 overflow-y-auto">
                    <div className="p-4 space-y-2">
                        <button onClick={() => changeSection('psych_actual')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'psych_actual' ? 'bg-white text-indigo-700 shadow ring-1 ring-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}>
                            <MessageSquare className={`h-5 w-5 ${activeSection === 'psych_actual' ? 'text-indigo-600' : 'text-slate-400'}`} /> <span className="font-medium">Aktuelt Psykisk</span>
                        </button>
                        <button onClick={() => changeSection('psych')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'psych' ? 'bg-white text-indigo-700 shadow ring-1 ring-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}>
                            <Brain className={`h-5 w-5 ${activeSection === 'psych' ? 'text-indigo-600' : 'text-slate-400'}`} /> <span className="font-medium">Objektivt Psykisk</span>
                        </button>
                        <button onClick={() => changeSection('somatic_act')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'somatic_act' ? 'bg-white text-indigo-700 shadow ring-1 ring-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}>
                            <FileText className={`h-5 w-5 ${activeSection === 'somatic_act' ? 'text-indigo-600' : 'text-slate-400'}`} /> <span className="font-medium">Aktuelt Somatisk</span>
                        </button>
                        <button onClick={() => changeSection('somatic_obj')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'somatic_obj' ? 'bg-white text-indigo-700 shadow ring-1 ring-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}>
                            <Stethoscope className={`h-5 w-5 ${activeSection === 'somatic_obj' ? 'text-indigo-600' : 'text-slate-400'}`} /> <span className="font-medium">Somatisk Vurdering</span>
                        </button>
                        <div className="h-px bg-slate-200 my-2"></div>
                        <div className="px-3 py-1"><span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Diagnose-specifikke</span></div>
                        <button onClick={() => changeSection('diagnosis_anorexia')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'diagnosis_anorexia' ? 'bg-white text-indigo-700 shadow ring-1 ring-slate-200' : 'text-slate-600 hover:bg-slate-100'}`}>
                            <Cookie className={`h-5 w-5 ${activeSection === 'diagnosis_anorexia' ? 'text-indigo-600' : 'text-slate-400'}`} /> <span className="font-medium">Anoreksia Nervosa</span>
                        </button>
                        <div className="h-px bg-slate-200 my-2"></div>
                        <button onClick={() => changeSection('full_note')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeSection === 'full_note' ? 'bg-slate-800 text-white shadow ring-1 ring-slate-900' : 'text-slate-700 bg-slate-200 hover:bg-slate-300'}`}>
                            <Layers className={`h-5 w-5 ${activeSection === 'full_note' ? 'text-emerald-400' : 'text-slate-600'}`} /> <span className="font-bold">Samlet Notat</span>
                        </button>
                    </div>
                </nav>
                <main className="flex-1 overflow-y-auto bg-slate-100 p-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">
                                    {activeSection === 'psych_actual' && 'Aktuelt Psykisk (Anamnese)'}
                                    {activeSection === 'psych' && 'Klinisk vurdering (Objektivt Psykisk)'}
                                    {activeSection === 'somatic_obj' && 'Somatisk Vurdering'}
                                    {activeSection === 'somatic_act' && 'Somatisk Anamnese'}
                                    {activeSection === 'diagnosis_anorexia' && 'Anoreksia Nervosa (F50.0)'}
                                    {activeSection === 'full_note' && 'Samlet Journalnotat (Oversigt)'}
                                </h2>
                            </div>
                            <div className="flex gap-3">
                                {(activeSection === 'psych' || activeSection === 'somatic_obj' || activeSection === 'somatic_act') && (
                                    <button onClick={setNormalStatus} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors shadow-sm">
                                        <Star className="h-4 w-4" /> Sæt Normalstatus
                                    </button>
                                )}
                                {activeSection !== 'full_note' && (
                                    <button onClick={resetSection} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm">
                                        <RotateCcw className="h-4 w-4" /> Nulstil valg
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {manualEditMode && activeSection !== 'full_note' && (
                            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-6 h-6 text-amber-500" />
                                    <div>
                                        <h4 className="font-bold text-amber-800 text-sm">Fri redigering er aktiv</h4>
                                        <p className="text-amber-700 text-xs mt-0.5">Formularen er frosset for at beskytte dine manuelle indtastninger i højre side. Gendan synkronisering for at bruge formularen igen.</p>
                                    </div>
                                </div>
                                <button onClick={openSyncConfirm} className="px-4 py-2 bg-white text-indigo-700 border border-indigo-200 rounded-lg shadow-sm text-sm font-bold hover:bg-indigo-50 transition-colors whitespace-nowrap cursor-pointer">
                                    Gendan Synkronisering
                                </button>
                            </div>
                        )}

                        {activeSection === 'psych_actual' && renderCardGrid(ACTUAL_PSYCH_OPTIONS)}
                        {activeSection === 'psych' && renderCardGrid(PSYCH_OPTIONS)}
                        {activeSection === 'somatic_act' && renderCardGrid(SOMATIC_ACT_OPTIONS)}
                        {activeSection === 'somatic_obj' && renderCardGrid(SOMATIC_OBJ_OPTIONS)}
                        {activeSection === 'diagnosis_anorexia' && renderCardGrid(ANOREXIA_OPTIONS)}
                        {activeSection === 'full_note' && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 flex flex-col items-center justify-center text-center h-96">
                                <Layers className="h-16 w-16 text-slate-200 mb-4" />
                                <h3 className="text-lg font-medium text-slate-800">Samlet Visning</h3>
                                <p className="text-slate-500 max-w-md mt-2">Tekstboksen til højre viser nu det komplette notat samlet fra alle sektioner.<br/><br/>Gå til de enkelte sektioner i menuen til venstre for at redigere indholdet.</p>
                            </div>
                        )}
                    </div>
                </main>
                <aside className="w-80 xl:w-96 bg-white border-l border-slate-200 flex flex-col shadow-xl z-20 flex-shrink-0">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-slate-500" /><h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">{activeSection === 'full_note' ? 'Hele Notatet' : 'Resultat (Sektion)'}</h3></div>
                        {showSummary && <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-medium">Resume aktivt</span>}
                    </div>
                    <div className="flex-1 relative">
                        <textarea 
                            className={`absolute inset-0 w-full h-full p-5 border-none resize-none focus:ring-0 text-sm leading-relaxed text-slate-800 font-mono bg-white focus:outline-none ${manualEditMode ? 'bg-amber-50/20' : ''}`}
                            value={generatedText}
                            onChange={handleManualTextChange}
                            spellCheck="false"
                        ></textarea>
                    </div>
                    {manualEditMode && (
                        <div className="bg-amber-50 px-4 py-2 border-t border-amber-200 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5 text-amber-700 font-medium"><PenLine className="w-3.5 h-3.5" /><span>Fri redigering aktiv.</span></div>
                        </div>
                    )}
                    <div className="p-4 bg-slate-50 border-t border-slate-200">
                        <button onClick={copyToClipboard} className="w-full flex justify-center items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl active:transform active:scale-95">
                            <Clipboard className="h-4 w-4" /> {activeSection === 'full_note' ? 'Kopier HELE notatet' : 'Kopier SEKTION'}
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default App;