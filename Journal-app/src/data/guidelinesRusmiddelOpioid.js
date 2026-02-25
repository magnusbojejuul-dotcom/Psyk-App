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
            title: 'Substitutionsbehandling: Buprenorphin (1. Valg)',
            details: `• Buprenorphin (Suboxone/Subutex) er partiel agonist og er hyppigt et førstevalg pga. højere sikkerhed for overdosis.\n• VIGTIGT: Buprenorphin displacerer fulde agonister fra receptorerne. Gives det for tidligt udløses et AKUT ABSTINENS-syndrom (precipitated withdrawal). Derfor KRAV at patienten har objektive abstinenser ved opstart.\n• Start fx med 2-4 mg sublingualt overvåget, vurder derefter effekt.`
        },
        {
            title: 'Substitutionsbehandling: Metadon',
            details: `• Metadon er fuld agonist og anvendes ved utilstrækkelig effekt af Buprenorphin, eller til personer med mangeårigt tungt misbrug og høj tolerance.\n• Risiko for akkumulering og QT-FORLÆNGELSE. EKG anbefales ved doser >100 mg/dag eller ift. anden risikomedicin.\n• Initialdosis oftest 20-30 mg (afhængigt af opbygget tolerancens). OBS: Metadon-steady state opnås først efter flere dage, så øg langsomt for at undgå utilsigtet overdosis efter 3-4 dage.`
        },
        {
            title: 'Symptomatisk Lindring under Abstinens (Uden Substitution)',
            details: `• Smerte/Rastløshed: Undgå primært BZD uden speciallæge; Truxal (Quetiapin off-label) for søvn.\n• NSAID / Paracetamol for knoglesmerter.\n• Loperamid for diarre og evt. Ondansetron for kvalme og opkast.`
        }
    ]
};
