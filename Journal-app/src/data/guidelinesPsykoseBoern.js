export const PSYKOSE_BOERN_GUIDELINE = {
    title: 'Medicinsk Behandling af Psykotiske Tilstande (Børn og Unge)',
    subtitle: 'RADS-vejledning for skizofreni-spektret (F20-F29)',
    pdfUrl: `${import.meta.env.BASE_URL}pdf/psykotiske-tilstande-boern-behandlingsvejledning.pdf`,
    intro: 'Vejledningen sikrer national konsensus om behandling med antipsykotika til børn og unge (< 18 år) med lidelser inden for det skizofreniforme spektrum. Behandlingen varetages altid af speciallæger i børne- og ungdomspsykiatri.',
    algorithm: [
        {
            title: 'Børn under 13 år',
            summary: 'Meget tilbageholdende med antipsykotika. Risperidon er 1. valg på basis af sikkerhedsprofil.',
            details: `Generelt bør man være meget tilbageholdende og helst undgå antipsykotisk behandling hos børn under 13 år. Ingen præparater har registreret indikation for skizofreni i denne aldersgruppe.\n\nBehandlingsvalg (vægtet ud fra sikkerhed):\n• 1. Valg: Risperidon (Gennemprøvet, EMA/FDA godkendt fra 5 år v. andre diagnoser).\n• 2. Valg: Aripiprazol eller Quetiapin.\n• 3. Valg: Clozapin (KUN ved behandlingsresistent skizofreni, undersøgt fra 7 år).\n\nOlanzapin, Paliperidon og Haloperidol anbefales IKKE som førstevalg til denne aldersgruppe.`
        },
        {
            title: 'Unge fra 13 - 17 år',
            summary: 'Aripiprazol, Quetiapin, Paliperidon eller Risperidon anbefales som 1. og 2. valg.',
            details: `Behandlingsforsøg til 13-17 årige:\n\n1. og 2. Valg (Uprioriteret rækkefølge):\n• Aripiprazol (Vejl: 10-30 mg)\n• Quetiapin (Vejl: 400-800 mg)\n• Paliperidon (Vejl: 3-12 mg, max 6 mg v. vægt < 51 kg)\n• Risperidon (Vejl: 1-6 mg)\n\nBemærk for 15-17 årige: Her bør Aripiprazol eller Paliperidon forsøges FØRST, da de som de eneste har EMA indikation her.\n\n3. Valg:\n• Olanzapin (Vejl: 10-20 mg). Placeres som 3. valg trods FDA godkendelse pga. høj risiko for metaboliske bivirkninger.\n• Haloperidol. Høj EPS-risiko.\n• Clozapin (KUN ved behandlingsresistent skizofreni).`
        },
        {
            title: 'Særligt ift. Bivirkninger hos Børn og Unge',
            summary: 'Børn og unge er særligt følsomme overfor visse bivirkninger ift. voksne.',
            details: `Bemærk:\n• Paliperidon: EPS og moderat vægtøgning ses hyppigere end hos voksne.\n• Quetiapin: Risiko for dyslipidæmi og nogen vægtstigning hos børn/unge.\n• Risperidon: Nogen tendens til blodsukker- og vægtstigning. EPS især ved > 4mg.\n• Aripiprazol: Lav risiko for metaboliske bivirkninger, men risiko for akatisi.\n• Clozapin: Udtalt sedation, vægtøgning, risiko for knoglemarvspåvirkning (kræver specialmonitorering).`
        },
        {
            title: 'Monitorering og Seponering',
            summary: 'Klinisk vurdering og ratingskalaer. Langsom udtrapning ved remission.',
            details: `Monitorering:\n• Psykopatologi og bivirkninger (f.eks. via UKU-skala) følges tæt.\n• Ekstra opmærksomhed ift. off-label forbrug (under 13 år eller ikke-godkendte doser).\n\nBehandlingsvarighed & Seponering:\n• Høj risiko for tilbagefald i 1-2 år efter akut psykotisk episode.\n• Udtrapning KUN relevant ved remission af psykosesymptomer.\n• Skal foregå meget langsomt (over måneder til år) med tæt overvågning fra familie og behandler.`
        }
    ]
};
