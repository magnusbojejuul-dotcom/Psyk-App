export const ADHD_GUIDELINE = {
    title: 'Medicinsk Behandling af ADHD / ADD for Voksne',
    subtitle: 'NKR og RADS-vejledning for voksne',
    pdfs: [
        { title: 'RADS ADHD (2016)', url: `${import.meta.env.BASE_URL}pdf/rads_adhd-pixi_4.pdf` },
        { title: 'NKR ADHD Voksne', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-adhd-hos-voksne.pdf` },
        { title: 'Adhd-beh-juni-2016', url: `${import.meta.env.BASE_URL}pdf/adhd-beh-juni-2016.pdf` }
    ],
    intro: 'Vejledningen sikrer national konsensus for diagnostik, behandling og rammerne for kontrol af ADHD hos voksne.',
    algorithm: [
        {
            title: 'Udredning (Diagnostik)',
            summary: 'Tværfaglig/tværsektoriel udredning før behandlingsstart.',
            details: `BØRN OG UNGE:\n• Klinisk interview med anamnese.\n• Anvendelse af standardiseret rating-scales (ADHD-RS) fra flere miljøer.\n• Oplysninger fra skole/daginstitution eller observation.\n• Somatisk & psykologisk undersøgelse.\n\nVOKSNE:\n• Klinisk interview og grundig anamnese (fx DIVA 2.0).\n• Rating scale udført af den voksne selv (ASRS v.1.1).\n• Somatisk undersøgelse (BT og puls skal altid måles før opstart).`
        },
        {
            title: 'Kriterier for Igangsætning',
            summary: 'Vurdering af ADHD sværhedsgrad og indikation for medicinering.',
            details: `BØRN OG UNGE:\n• Anvend medicin ved svær ADHD, såfremt ikke-medicinske tiltag har utilstrækkelig effekt (pædagogik/forældretræning).\n• Overvej medicinsk behandling ved moderate symptomer men betydelig og varig funktionsnedsættelse.\n• Anvend IKKE medicin ved mild ADHD.\n\nVOKSNE:\n• Anvend medicin som førstevalg ved ADHD med svær/betydelig funktionsnedsættelse.\n• Øvrige støttende psykosociale tiltag kan og bør ikke udelades.`
        },
        {
            title: 'Psykiatrisk Komorbiditet (VIGTIGT)',
            summary: 'Behandl den mest belastende lidelse først. Centralstimulantia kan forværre andre lidelser.',
            details: `Vær meget forsigtig ved samtidig depression, bipolar lidelse, skizofreni eller psykoser:\n• Centralstimulantia (som Methylphenidat) kan forværre disse tilstande markant.\n• Bipolare og skizofrene tilstande SKAL være velbehandlede (med stemningsstabiliserende / antipsykotika) før ADHD-medicin opstartes.\n• Ved angst eller depression bør disse oftest behandles først (fx med SSRI), hvorefter ADHD-medicin (især Atomoxetin) kan tillægges evt.\n• Ved amfetamin/kokain misbrug eller svære personlighedsforstyrrelser er effekten af ADHD-medicin ofte tvivlsom. Misbrug skal altid behandles først.`
        },
        {
            title: 'Valg af 1. Præparat',
            summary: 'Methylphenidat (MPH) er førstevalg til de fleste.',
            details: `1. Valg til > 90%:\n• Methylphenidat (MPH). Hurtigt indsættende effekt gør det overlegent til indstilling. Skift gerne til depot-form for compliance.\n\nOvervej Atomoxetin (ATX) som 1. valg hvis:\n• MPH er kontraindiceret eller gav svære bivirkninger (fx angst/sovebesvær).\n• Patienten har comorbid angst eller depression (ATX kan virke på begge).\n• Der er behov for døgndækkende effekt (fx børn med svær autisme).\n• Der er risiko for misbrug af centralstimulantia (hos pt. eller pårørende).\n\nGravide & ammende:\n• Kun MPH ved strengt/tvingende behov.`
        },
        {
            title: 'Dosisøgning og Optitrering',
            summary: 'Titrer op til optimal dosis. Store individuelle forskelle.',
            details: `Titreringsanbefalinger (Børn):\n• MPH (< 30 kg): Start 2,5 mg x 2. Optitreres 1-2 gange ugentligt.\n• MPH (> 30 kg): Start 5 mg x 2. Optitreres 1-2 gange ugentligt.\n\nDosisloft og Erfaringer:\n• Børn: MPH max 2,1 mg/kg. ATX max 1,8 mg/kg.\n• Voksne: De fleste responderer fint på 60-70 mg MPH dagligt. Kan øges op til 100 mg (RADS anbefaling overstiger produktresuméet på max 80 mg).\n• Obs: Fejlfortolk ikke uro/hyperaktivitet udløst som bivirkning som "manglende effekt" (og øg fejlagtigt dosis).`
        },
        {
            title: 'Skift af Behandling / Kombinationsbehandling',
            summary: 'Specialistopgave ved uacceptable bivirkninger eller svigt af 1. valg.',
            details: `Ved Manglende effekt/bivirkninger af MPH:\n• Forsøg skift til Atomoxetin, Dexamfetamin eller Lisdexamfetamin.\n• Skift direkte til ATX ved misbrugsproblematikker.\n• Lisdexamfetamin/Dexamfetamin kan oftest overgås til via "krydstitrering".\n• Kombinationsbehandling (fx MPH + ATX) kan forsøges af speciallæge ved behandlingsresistens.`
        },
        {
            title: 'Opfølgning & Seponering',
            summary: 'Tæt monitorering af parametre. Hjernen modner omkring 25-års alderen.',
            details: `Monitorering (Børn hhv. Voksne):\n• Børn: Effekt/bivirkninger + højde, vægt, puls, BT tjekkes mindst hvert ½ år.\n• Voksne: Effekt, vægt, BT og puls måles mindst 1 gang årligt.\n• Rutinemæssigt EKG og blodprøver anbefales generelt IKKE for raske.\n\nSeponering / Pauser:\n• Rutinemæssige medicinpauser (fx uge-pauser i ferier) anbefales IKKE.\n• Medicin kan oftest seponeres fuldstændig brat uden kliniske seponeringssymptomer.\n• Hos unge voksne (ca. 25 år) er hjernen ofte modnet færdig, og uddannelse typisk overstået, hvilket gør dette til et optimalt udtrapningsvindue for at teste fortsat medicinbehov (en måneds pause).`
        }
    ]
};
