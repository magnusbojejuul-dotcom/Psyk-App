export const DEPRESSION_GUIDELINE = {
    title: 'Medicinsk Behandling af Unipolar Depression',
    subtitle: 'RADS-vejledning (National Konsensus)',
    pdfUrl: '/pdf/unipolar-depression-beh-og-rek-april-2015-193678.pdf',
    intro: 'Vejledningen sikrer national konsensus om kriterier for opstart, opfølgning, varighed og seponering af behandling med antidepressiva hos voksne med unipolar depression eller dystymi.',
    algorithm: [
        {
            title: 'Diagnostik og Udredning',
            summary: 'Grundigt interview og vurdering af sværhedsgrad (Let, Moderat, Svær).',
            details: `• Diagnosen stilles ud fra ICD-10 på baggrund af grundigt interview (som regel over to konsultationer).\n• Baseres på samlet klinisk vurdering, inkl. somatisk udredning (differentialdiagnostik).\n• Vær opmærksom på komorbide somatiske og psykiatriske sygdomme.\n\nSværhedsgrad (HAM-D17):\n• Let depression: 13-17\n• Moderat depression: 18-24\n• Svær depression: 25-52`
        },
        {
            title: 'Igangsætning af Behandling',
            summary: 'Behandlingsvalg afhænger af depressionens sværhedsgrad.',
            details: `Let depression:\n• Anbefales "Watchful monitoring". Tilbyd ikke rutinemæssigt antidepressiva.\n\nModerat depression / Dystymi:\n• Tilbyd antidepressiva eller psykoterapi (evt. kombination).\n• Medicinsk start bør oftest afvente revurdering ved 2. konsultation.\n\nSvær depression:\n• Tilbyd altid behandling med antidepressiva.\n\nÆldre og Demens:\n• Indikation for ældre er den samme som for yngre (dosis justeres).\n• Samtidig depression og demens: Tilbyd ikke rutinemæssigt antidepressiva (effekt meget usikker).`
        },
        {
            title: 'Valg af 1. Præparat',
            summary: 'Sertralin er førstevalg ved moderat til svær depression.',
            details: `Nye patienter (Moderat/Svær depression el. Dystymi):\n\n1. Valg:\n• Sertralin (SSRI). Kan øges til 200 mg ved utilstrækkelig effekt.\n\n2. Valg:\n• SSRI: Citalopram, Escitalopram (Dosisrestriktion & EKG krav).\n• TCA: Nortriptylin (Specialistopgave).\n• Andre: Duloxetin, Venlafaxin, Mirtazepin.\n\n3. Valg:\n• Andre TCA, Fluoxetin, Fluvoxamin, Paroxetin, Agomelatin, Bupropion, Mianserin.\n\nSamtidig angst eller søvnløshed:\n• Overvej skift til Mirtazepin (sederende).\n• Overvej tillæg af Mianserin/Mirtazepin eller kortvarigt benzodiazepin (få uger) til SSRI.`
        },
        {
            title: 'Psykotisk Depression',
            summary: 'Altid under indlæggelse. ECT eller kombinationsbehandling.',
            details: `• Behandling foregår altid under indlæggelse (specialistopgave).\n\n1. Valg:\n• ECT anbefales pga. bedst effekt.\n\n2. Valg:\n• TCA (Nortriptylin) + Antipsykotikum (Specialistopgave).`
        },
        {
            title: 'Kriterier for Skift af Behandling',
            summary: 'Ved utilstrækkelig effekt skiftes præparatklasse eller gives tillægsbehandling.',
            details: `Ved behandlingssvigt:\n1. Skift til antidepressivum med anden profil (fx SSRI -> SNRI/TCA).\n2. Tillæg af Mianserin/Mirtazepin til natten (især ved søvnbesvær).\n3. Augmentation med Lithium eller Antipsykotikum (Quetiapin, Aripiprazol).\n\nAugmentation valg:\n• Lithium: Ved resistens over for ≥2 antidepressiva eller familiær disposition for bipolar.\n• Quetiapin: Ved søvnproblemer.\n• Aripiprazol: Ved risiko for metabolisk syndrom.`
        },
        {
            title: 'Monitorering og Seponering',
            summary: 'Tæt opfølgning i starten. Langsom aftrapning ved seponering for at undgå ubehag.',
            details: `Monitorering:\n• Revurder efter ca. 1 uge (effekt, bivirkninger, compliance, selvmordsrisiko).\n• Varig behandling (> 2 år) vurderes min. 1 gang årligt.\n\nSeponering:\n• Skal foregå meget langsomt (uger til måneder).\n• Ved seponeringssymptomer vendes tilbage til forrige dosis.\n• Symptomer (svimmelhed, kvalme, paræstesier etc.) opstår typisk få dage efter nedtrapning og svinder efter 1-2 uger.`
        }
    ]
};
