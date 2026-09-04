export const RUSMIDDEL_BENZO = {
    title: 'Benzodiazepiner: Forgiftning & Abstinenser',
    subtitle: 'National Vejledning for Håndtering og Nedtrapning',
    pdfs: [
        { title: 'Håndtering af Forgiftning & Abstinens', url: `${import.meta.env.BASE_URL}pdf/haandtering-af-behandling-af-benzodiazepin-forgiftning-og-abstinens.pdf` },
        { title: 'Benzodiazepinnedtrapning', url: `${import.meta.env.BASE_URL}pdf/Benzodiazepinnedtrapning.pdf` }
    ],
    intro: 'Benzodiazepiner (BZD) virker inhibitorisk i CNS ved at binde sig til GABA-receptoren. Overdosering er hyppig, men sjældent fatal i sig selv, medmindre de blandes med andre CNS-dæmpende stoffer (fx Alkohol eller Opioider).',
    toxication: {
        title: 'Benzodiazepinforgiftning (Intoksikation)',
        description: 'Forgiftningsbilledet er præget af sedering. Den primære fare opstår ved kombinationsforgiftninger (med alkohol eller opioider). Ren benzodiazepinforgiftning er sjældent fatal.',
        symptoms: [
            { name: 'Somnolens & Sedation', icon: 'moon', desc: 'Patienten er træt, slap og søvnig, men kan ofte vækkes ved tiltale/rusk.' },
            { name: 'Ataksi & Dysartri', icon: 'activity', desc: 'Fumlende, usikker gang og sløret, snøvlende tale.' },
            { name: 'Nedsatte Reflekser', icon: 'shield', desc: 'Hyporefleksi og nedsat muskeltonus.' },
            { name: 'Normale Pupiller', icon: 'eye', desc: 'I modsætning til opioider (miosis) er pupillerne oftest normale eller midtstillede.' },
            { name: 'Respirationsdepression', icon: 'wind', desc: 'Sjældent ved ren benzodiazepinindtagelse, men farlig ved blandingsforgiftning.' }
        ],
        management: 'ABCDE. Ren benzodiazepinoverdosering kræver primært tæt klinisk observation. Antidot er FLUMAZENIL (Lanexat) 0,2-0,3 mg i.v. OBS: Kontraindiceret ved kendt/mistænkt kronisk benzodiazepinmisbrug (risiko for svære kramper / status epilepticus) og ved blandingsforgiftning med TCA. Flumazenil har kortere virkningsvarighed end benzodiazepiner – obs. risiko for re-sedation!'
    },
    algorithmTitle: 'Abstinensbehandling & Nedtrapning',
    isStepBased: true,
    algorithm: [
        {
            title: 'Symptomer på Benzodiazepinabstinenser',
            summary: 'Inddeles i milde, moderate og svære. Debuterer 1-3 døgn (kortvirkende) til 4-7 døgn (langtidsvirkende) efter stop.',
            details: `Abstinenstilstanden inddeles i 3 sværhedsgrader efter pludselig seponering (typisk 1-3 dages forsinkelse ved korttidsvirkende, længere ved langtidsvirkende):\n\n• Milde: Angst, insomni, svimmelhed, hovedpine, nedsat appetit, irritabilitet.\n• Moderate: Agitation, panik, koncentrationsbesvær, tremor, svedeture, palpitationer, muskelsmerter, GI-forstyrrelser.\n• Svære: Hypertermi, muskelfascikulationer, kramper, delirium, psykotiske symptomer (paranoide vrangforestillinger).\n\nBehandlingen skal forebygge progression til kramper og delir. Indlæggelse er indiceret ved moderate og svære abstinenser.`
        },
        {
            title: 'Akut Abstinensbehandling & Indlæggelse',
            summary: 'Brat seponering frarådes. Giv benzodiazepin for at dæmpe abstinenserne akut og forebygge kramper.',
            details: `• Pludselig seponering frarådes altid ved langvarigt forbrug.\n• Hvis patienten præsenterer med svære abstinenser: Giv benzodiazepin for at slå abstinenserne ned akut, og start derefter en struktureret, kontrolleret udtrapning.\n• Målrettet medicinsk dæmpning prioriteres for at forebygge generaliserede krampeanfald. Benyt abstinensscoringsskema til monitorering.`
        },
        {
            title: 'Omlægning til Langtidsvirkende BZD',
            summary: 'Omlæg til ækvipotent dosis af Chlordiazepoxid (Risolid) eller Clonazepam fordelt på faste doser.',
            details: `• Første led i omlægningen af behandlingen er, at korttidsvirkende benzodiazepiner seponeres og erstattes med et langtidsvirkende præparat.\n• Startdosis af fast Clonazepam (Rivotril) eller Chlordiazepoxid (Risolid) ordineres fordelt på 3-4 doser dagligt.\n• Begyndelsesdosis skal være den omregnede dosis, der er ækvipotent med den observerede døgndosis.\n• VIGTIGT: Døgndosis bør som hovedregel ikke overstige 12 mg Clonazepam eller 150-200 mg Chlordiazepoxid.`
        },
        {
            title: 'Planlagt Langsom Nedtrapning',
            summary: 'Nedtrap over uger til måneder. Først til halv dosis på 3-4 uger, derefter gradvist til 0 mg.',
            details: `• Efter 1 uges stabilisering på begyndelsesdosis, nedtrappes langsomt over 3-4 uger til halv dosis (50% af udgangsdosis).\n• Herefter sker en gradvis udtrapning over 8-12 uger af den resterende dosis til 0 mg (ofte 10-20% reduktion hver 1.-2. uge).\n• Advarsel: Er patienten i substitutionsbehandling for opioidafhængighed udvises stor forsigtighed, da kombinationen har en potent, additiv dæmpende effekt på respirationen.`
        }
    ]
};
