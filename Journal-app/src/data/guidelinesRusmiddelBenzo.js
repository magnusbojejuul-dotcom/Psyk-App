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
            details: `• Symptomer spejler grundlæggende kroppens baseline uden den dæmpende effekt: Udtalt angst, uro, takykardi, sved, søvnbesvær, paræstesier og følsomhed over for lys/lyd.\n• Alvorlige konsekvenser: Abstinenskramper og Delir.\n• Opstår efter pludseligt seponering, ofte med 1-3 dages forsinkelse afhængig af stoffets halveringstid.`
        },
        {
            title: 'Akut Abstinensbehandling',
            details: `• Pludselig seponering frarådes altid ved langvarigt forbrug.\n• Hvis patienten præsenterer med svære abstinenser (og bekræftet BZD-misbrug): Giv BZD (ofte Diazepam pga. lang halveringstid) for at slå abstinenserne ned, og start derefter kontrolleret udtrapning.\n• Målrettet medicninsk dæmpning prioriteres for at forebygge kramper.`
        },
        {
            title: 'Langvarig Nedtrapning (Planlagt)',
            details: `• Konverter først alle hurtigt- eller kortvirkende benzodizepiner og "z-medicin" (Zonoct, Imovane) til langtidsvirkende Diazepam (Stesolid/Apozepam) for at undgå svinginger i serumkoncentration.\n• Omregningsfaktor: fx svara 10 mg Oxazepam eller 0,5 mg Alprazolam groft til 5 mg Diazepam (konsulter altid omregningstabel).\n• Nedtrapning er typisk langvarig. En tommelfingerregel er at reducere dosis med 10-25% hver 1-2 uge over måneder.`
        },
        {
            title: 'Støttende Behandling',
            details: `• Nedtrapning kan give "rebound-angst". Kognitiv adfærdsterapi eller basal angsthåndtering (åndedrætsøvelser, grounding) bør ledsage den farmakologiske udtrapning.\n• Antidepressiva (SSRI/SNRI) kan startes op, hvis svær ledsagende angst lidelse er til stede.`
        }
    ]
};
