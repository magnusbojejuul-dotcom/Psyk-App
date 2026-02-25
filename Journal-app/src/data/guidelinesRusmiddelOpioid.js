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
            { name: 'Miosis (Knappenålspupiller)', icon: 'eye', desc: 'Bortset fra sjældne undtagelser/blanding er pupillerne stærkt formindskede.' },
            { name: 'Respirationsdepression', icon: 'wind', desc: 'Lav respirationsfrekvens (< 12/min). Den primære dødsårsag.' },
            { name: 'Koma / Nedsat bevidsthed', icon: 'brain', desc: 'Sover dybt og kan ofte slet ikke vækkes af smerte.' },
            { name: 'Cyanose / Bleghed', icon: 'activity', desc: 'Blå læber og negle pga. iltmangel (hypoxi).' },
            { name: 'Slappe muskler, evt frisk blødning', icon: 'shield', desc: 'Evt friske indstiksmærker ved I.V.-brug.' }
        ],
        management: 'AKUT: Skab frie luftveje. Ventiler m. maske/pose hvis respiration er < 8 pr min. Antidot er NALOXON (0,4 mg I.V./I.M. eller næsespray). Genses hyppigt, da Naloxons effekt klinger af FØR de fleste opioider = risiko for resedering. Naloxon udløser omgående (men kortvarige) abstinenser!'
    },
    algorithmTitle: 'Abstinens- og Substitutionsbehandling',
    isStepBased: true,
    algorithm: [
        {
            title: 'Opioidabstinenser (Klinisk Billede)',
            details: `• Symptomatologi ligner en svær influenza: Rastløshed, svedudbrud, "gåsehud", rindende øjne og næse (rhinorrhoea).\n• Senere: Smerter i led og muskler (knogle-smerter), mavekramper, kvalme, diarre, opkastning og dysfori / svær "craving".\n• Opioidabstinenser er enormt pinefulde, men yderst sjældent livsfarlige (i modsætning til alkohol/benzo-abstinenser).`
        },
        {
            title: 'Diagnosticering',
            details: `• Anvend et anerkendt scoringssystem (fx COWS - Clinical Opiate Withdrawal Scale).\n• Opstart aldrig substitutionsbehandling hvis patienten er påvirket. Patienten SKAL opleve synlige tegn på abstinenser før Buprenorphin startes.`
        },
        {
            title: 'Substitutionsbehandling',
            details: `• To primære stoffer: Buprenorphin (Suboxone/Subutex) og Metadon.\n• Buprenorphin (partiel agonist) vælges typisk som 1. valg grundet bedre sikkerhedsprofil og lavere overdosis-risiko.\n• Buprenorphin displacerer fulde agonister (fx heroin) fra receptorerne. Gives det for tidligt udløses et AKUT ABSTINENS-syndrom (precipitated withdrawal). Derfor skal patienten have målbare abstinenser ved opstart.\n• Metadon (fuld agonist) bruges til patienter, der ikke responderer på buprenorphin eller som har langvarig historik med svær afhængighed.`
        },
        {
            title: 'Symptomatisk Lindring under Abstinens',
            details: `• Uden substitution: Truxal / Quetiapin kan mildne rastløshed/søvnløshed.\n• Loperamid (Imodium) mod diarre, antiemetika (Ondansetron) mod kvalme.\n• NSAID/Paracetamol mod led/muskelsmerter.`
        }
    ]
};
