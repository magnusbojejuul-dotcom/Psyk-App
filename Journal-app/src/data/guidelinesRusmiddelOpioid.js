export const RUSMIDDEL_OPIOID = {
    title: 'Opioider: Forgiftning & Abstinenser',
    subtitle: 'Vejledning for Substitutionsbehandling og Overdosis',
    pdfs: [
        { title: 'Lægelig substitutionsbehandling (Opioidafhængighed)', url: `${import.meta.env.BASE_URL}pdf/vejledning-laegelig-substitutionsbehandling-opioidafhaengighed.pdf` }
    ],
    intro: 'Opioider (Heroin, Morfin, Metadon, Fentanyl, Oxycodon) er stærkt smertestillende og euforiserende. Overdosering er ofte direkte livstruende pga. respirationsstop.',
    toxication: {
        title: 'Opioidforgiftning (Intoksikation)',
        description: 'Den klassiske opioid-triade er: Koma, Knappenålspupiller og Respirationsdepression. Hurtig genkendelse og behandling med Naloxon er livreddende.',
        symptoms: [
            { name: 'Miosis (Knappenålspupiller)', icon: 'eye', desc: 'Stærkt forsnævrede pupiller (bortset fra ved blanding med fx kokain/amfetamin eller svær hypoksi).' },
            { name: 'Respirationsdepression', icon: 'wind', desc: 'Langsom (< 8-10/min) eller overfladisk respiration. Den direkte dødsårsag ved overdosering.' },
            { name: 'Koma / Nedsat bevidsthed', icon: 'brain', desc: 'Dyb bevidstløshed, manglende reaktion på tiltale og smertestimulation.' },
            { name: 'Cyanose / Bleghed', icon: 'activity', desc: 'Perifer eller central cyanose (blå læber/negle) som tegn på hypoksi.' },
            { name: 'Muskelslaphed & Indstik', icon: 'shield', desc: 'Slap muskeltonus, frie luftveje truede. Evt. synlige friske indstiksmærker.' }
        ],
        management: 'AKUT ABCDE: Skab frie luftveje og ventiler med maske/pose (100% ilt) ved respirationssvigt. Antidot er NALOXON (0,4 - 0,8 mg i.v., i.m. eller som næsespray). Gentages hvert 2.-3. minut til spontan respiration. OBS: Naloxon har kortere halveringstid end de fleste opioider – patienten SKAL observeres for risiko for re-sedation og respirationsstop!'
    },
    algorithmTitle: 'Abstinens- og Substitutionsbehandling',
    isStepBased: true,
    algorithm: [
        {
            title: 'Opioidabstinenser (Klinisk Billede)',
            summary: 'Influenzalignende billede med mydriasis, sved, gåsehud, kramper og svær craving. Sjældent livstruende.',
            details: `• Symptomer debuterer 6-12 timer (heroin/morfin) til 24-48 timer (metadon) efter ophør.\n• Initiale symptomer: Rastløshed, gabende, tåre- og næseflåd (rhinorré), svedeture, gåsehud (piloerektion) og pupildilatation (mydriasis).\n• Tiltagende symptomer: Diffuse muskel- og knoglesmerter, mavekramper, kvalme, opkastning, profus diarré og intens stoftrang (craving).\n• Opioidabstinenser er ekstremt pinefulde for patienten, men i sig selv sjældent livstruende (i modsætning til alkohol- og benzodiazepinabstinenser).`
        },
        {
            title: 'Objektiv Abstinensvurdering (COWS)',
            summary: 'Anvend Clinical Opiate Withdrawal Scale (COWS). Krav om objektive abstinenser før Buprenorphin opstartes.',
            details: `• Anvend et standardiseret, valideret scoringsværktøj: COWS (Clinical Opiate Withdrawal Scale).\n• Opstart ALDRIG substitutionsbehandling hvis patienten er påvirket eller asymptomatisk.\n• Forud for 1. dosis Buprenorphin SKAL patienten frembyde tydelige, objektive abstinenser (COWS-score typisk ≥ 12-13) for at undgå at fremkalde akutte abstinenser.`
        },
        {
            title: 'Substitutionsbehandling: Buprenorphin (1. Valg)',
            summary: 'Partiel my-agonist med højere sikkerhed og loft-effekt på respirationsdepression. OBS: Precipitated withdrawal.',
            details: `• Buprenorphin (Suboxone / Buvidal / Subutex) er førstevalg ved lægelig substitutionsbehandling pga. god sikkerhedsprofil og 'ceiling effect' for respirationsdepression.\n• VIGTIGT OM PRECIPITATED WITHDRAWAL: Buprenorphin har ekstrem høj receptoraffinitet og displacerer fulde agonister fra my-receptorerne. Gives det for tidligt, udløses voldsomme, akutte abstinenser. Der skal gå minimum 12-24 timer efter kortvirkende opioider og 24-48 timer efter metadon før opstart.\n• Startdosis: 2-4 mg sublingualt under overvågning. Dosis optitreres til 8-16 mg (maks 24 mg dagligt). Depotformuleringer (Buvidal ugentlig/månedlig s.c.) kan overvejes.`
        },
        {
            title: 'Substitutionsbehandling: Metadon',
            summary: 'Fuld my-agonist. Anvendes ved utilstrækkelig effekt af Buprenorphin eller høj tolerance. Obs QTc-forlængelse.',
            details: `• Metadon (fuld agonist) anvendes primært, hvis Buprenorphin har utilstrækkelig effekt, eller hos patienter med mangeårig, massiv tolerance.\n• Risiko for akkumulering: Halveringstiden er 15-60 timer, og steady-state opnås først efter 3-5 dage. Øg dosis langsomt for at undgå utilsigtet overdosis efter nogle dage.\n• Kardial sikkerhed: Metadon forlænger QTc-intervallet (rødt præparat). EKG er obligatorisk ved baseline og ved doser >100 mg dagligt samt ved polyfarmaci.\n• Startdosis typisk 20-30 mg p.o. som enkeltdosis, titreres gradvist.`
        },
        {
            title: 'Symptomatisk Lindring under Abstinens',
            summary: 'Non-opioid understøttende behandling: Paracetamol/NSAID, Loperamid, og sederende antihistamin / antipsykotikum til natten.',
            details: `Ved udtrapning eller abstinensbehandling uden substitutionsmedicin:\n• Muskelsmerter / knoglesmerter: Paracetamol 1 g x 4 p.o. kombineret med NSAID (fx Ibuprofen 400 mg x 3).\n• Diarré: Loperamid (Imodium) 2-4 mg p.n. (maks 16 mg/døgn).\n• Kvalme / mavekramper: Ondansetron 4-8 mg eller Metoclopramid / Domperidon.\n• Søvnløshed og uro: Chlorprothixen (Truxal) 25-50 mg til natten eller Quetiapin 25-50 mg (off-label). Undgå som hovedregel benzodiazepiner pga. høj afhængigheds- og overdosisrisiko.`
        }
    ]
};
