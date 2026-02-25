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
        description: 'Forgiftningsbilledet er præget af sedering. Den primære fare opstår ved kombinationsforgiftninger. Iatrogen overdosering kan ofte afhjælpes med specifik antidot.',
        symptoms: [
            { name: 'Somnolens & Sedation', icon: 'moon', desc: 'Patienten er træt, slap og søvnig, men kan ofte vækkes.' },
            { name: 'Ataksi & Dysartri', icon: 'activity', desc: 'Fulen, usikker gang og sløret, uforståelig tale.' },
            { name: 'Nedsat Reflekser', icon: 'shield', desc: 'Hyporefleksi og nedsat muskeltonus.' },
            { name: 'Normale Pupiller', icon: 'eye', desc: 'I modsætning til opioider (miosis), er pupillerne ofte normale / midtstillede.' },
            { name: 'Respirationsdepression', icon: 'wind', desc: 'Sjælden ved rent BZD-brug, men farlig. Observer hyppighed.' }
        ],
        management: 'ABCDE. Ren BZD-overdosis kræver primært observation. Antidot er FLUMAZENIL (Lanexat) 0,2-0,3 mg I.V., men OBS: Kontraindiceret ved blandingsforgiftning med tricykliske antidepressiva pga. kramperisiko. Flumazenil har kortere halveringstid end de fleste BZDer - obs resedering!'
    },
    algorithmTitle: 'Abstinensbehandling & Nedtrapning',
    isStepBased: true,
    algorithm: [
        {
            title: 'Symptomer på Benzodiazepinabstinenser',
            details: `Abstinenstilstanden inddeles i 3 sværhedsgrader efter pludseligt seponering (typisk 1-3 dages forsinkelse).\n\n• Milde: Angst, insomni, svimmelhed, hovedpine, manglende appetit, irritabilitet.\n• Moderate: Agitation, panik, nedsat koncentration, tremor, svedeture, palpitationer, muskelsmerter, mave-tarm forstyrrelser.\n• Svære: Hypertermi, muskelfascikulationer, kramper, delirium, psykoser.\n\nBehandling skal sikre, at der ikke indtræder forværring (kramper/delir). Indlæggelse til observation er indiceret ved moderate og svære abstinenser.`
        },
        {
            title: 'Akut Abstinensbehandling & Indlæggelse',
            details: `• Pludselig seponering frarådes altid ved langvarigt forbrug.\n• Hvis patienten præsenterer med svære abstinenser: Giv BZD for at slå abstinenserne ned (se lokal instruks), og start derefter kontrolleret udtrapning.\n• Målrettet medicninsk dæmpning prioriteres for at forebygge kramper. Benyt evt. BAS abstinensscorer-skema.`
        },
        {
            title: 'Omlægning til Langtidsvirkende BZD',
            details: `• Første led i omlægningen af behandlingen er, at benzodiazepin seponeres. Startdosis af fast Clonazepam (Rivotril) eller Klopoxid (Chlordiazepoxid/Risolid) ordineres fordelt på 3-4 doser dagligt.\n• Begyndelsesdosis skal være den omregnede dosis, der er ækvipotent med den observerede døgndosis.\n• VIGTIGT: Døgndosis bør IKKE overstige 12 mg Clonazepam eller 150-200 mg Klopoxid.`
        },
        {
            title: 'Langvarig Nedtrapning (Planlagt)',
            details: `• Efter 1 uges behandling på begyndelsesdosis, nedtrappes langsomt over 3 uger til halv dosis (halvdelen af dosis dag 1).\n• Herefter skal der ske en udtrapning over 10 uger af den resterende dosis til 0 mg.\n• Advarsel: Er patienten i substitutionsbehandling for opioidafhængighed udvis stor forsigtighed, da kombinationen har alvorlig additiv dæmpende effekt på respiration.`
        }
    ]
};
