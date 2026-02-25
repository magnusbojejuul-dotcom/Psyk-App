export const PSYKOSE_BOERN_GUIDELINE = {
    title: 'Medicinsk Behandling af Psykotiske Tilstande (Børn og Unge)',
    subtitle: 'RADS-vejledning for skizofreni-spektret (F20-F29)',
    pdfUrl: `${import.meta.env.BASE_URL}pdf/psykotiske-tilstande-boern-behandlingsvejledning.pdf`,
    intro: 'Vejledningen sikrer national konsensus om behandling med antipsykotika til børn og unge (< 18 år) med lidelser inden for det skizofreniforme spektrum. Behandlingen varetages altid af speciallæger i børne- og ungdomspsykiatri.',
    algorithmTitle: 'Klinisk Vejledning',
    isStepBased: false,
    algorithm: [
        {
            title: 'Børn under 13 år',
            summary: 'Meget tilbageholdende med antipsykotika. Risperidon er 1. valg på basis af sikkerhedsprofil.',
            details: `• Generelt bør man være meget tilbageholdende og helst undgå antipsykotisk behandling hos børn under 13 år. Ingen antipsykotika har registreret indikation (EMA/FDA) for skizofreni i denne aldersgruppe.\n• Behandlingsvalg baseres først og fremmest på lægemidlernes sikkerhedsprofil:\n• 1. Valg: Risperidon (mest gennemprøvet; EMA/FDA godkendt fra 5 år til andre lidelser).\n• 2. Valg: Aripiprazol eller Quetiapin (begge er dog også off-label for skizofreni under 13 år).\n• 3. Valg: Clozapin (kun som absolut sidste udvej ved overbevisende behandlingsresistent skizofreni, da den har effekt hos en del; undersøgt fra 7 års alderen).`
        },
        {
            title: 'Unge fra 13 - 17 år',
            summary: 'Aripiprazol, Quetiapin, Paliperidon eller Risperidon anbefales som 1. og 2. valg.',
            details: `• 1. og 2. Valg: Aripiprazol (Vejl. 10–30 mg), Quetiapin (Vejl. 400–800 mg), Paliperidon (Vejl. 3–12 mg) eller Risperidon (Vejl. 1–6 mg). Prioriteringen afhænger af den enkeltes risiko-profil for bivirkninger.\n• 15-17 år: Her bør Aripiprazol ELLER Paliperidon forsøges FØRST, idet disse (som de eneste) har direkte EMA indikation fra 15-års alderen for skizofreni.\n• 3. Valg: Olanzapin (trods FDA godkendelse anbefales denne kun som 3. valg grundet høj forekomst af metaboliske bivirkninger og sedation), Haloperidol (grundet høj risiko for EPS), eller Clozapin (som altid kun er forbeholdt svær terapiresistens – tidligst som 3. lægemiddelforsøg).`
        },
        {
            title: 'Særligt ift. Bivirkninger hos Børn og Unge',
            summary: 'Børn og unge er særligt følsomme overfor visse bivirkninger ift. voksne.',
            details: `• Børn og unge udviser ofte øget følsomhed for bivirkninger ift. voksne.\n• Paliperidon: Visse bivirkninger, især ekstrapyramidale symptomer (EPS) og moderat vægtøgning ses hyppigere end hos voksne. Risiko for hyperprolaktinæmi.\n• Quetiapin: Risiko for dyslipidæmi og en vis vægtstigning (dog ringe risiko for EPS).\n• Risperidon: Nogen tendens til blodsukker- og vægtstigning; dosisafhængig EPS, særligt udtalt v. doser > 4 mg.\n• Aripiprazol: Generelt lav risiko for metaboliske bivirkninger, men klinisk signifikant risiko for akatisi.\n• Clozapin: Bangebuks for udtalt sedation, vægtøgning og speciel knoglemarvspåvirkning, der fordrer lovpligtig monitorering.`
        },
        {
            title: 'Monitorering og Seponering',
            summary: 'Klinisk vurdering og ratingskalaer. Langsom udtrapning ved remission.',
            details: `• Psykopatologi-ratingskalaer (inkl. bivirkninger f.eks. via UKU) anbefales til objektiv monitorering.\n• Da megen antipsykotisk brug til børn er off-label for både alder og indikation, er det pålagt en *særlig* øget agtpågivenhed for at indberette bivirkninger til Sundhedsstyrelsen.\n• Skift af præparat overvejes ved vedvarende psykotiske symptomer eller ikke-tolerable bivirkninger (kan dosen optimeres først?).\n• Udtrapning: KUN relevant ved remission. Den overordnede behandlingsvarighed kræver tæt vurdering, idet der er kendt høj rate for tilbagefald 1-2 år efter en akut psykotisk episode, specielt i en ung alder. Udtrapning bør forløbe yderst langsomt (måneder-år).`
        }
    ]
};
