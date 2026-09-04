export const DEPRESSION_GUIDELINE = {
    title: 'Farmakologisk Behandling af Unipolar Depression',
    subtitle: 'Klinisk retningslinje fra Sundhedsvæsenets Kvalitetsinstitut & DMPG (Godkendt Juni 2026)',
    pdfs: [
        { title: 'DMPG Retningslinje 2026 (Original PDF)', url: `${import.meta.env.BASE_URL}pdf/dmpg-farmakologisk-behandling-af-unipolar-depression-2026.pdf` },
        { title: 'NKR Non-farmakologisk (2016)', url: `${import.meta.env.BASE_URL}pdf/national-klinisk-retningslinje-non-fatmakologisk-behandling-af-unipolar-depression.pdf` },
        { title: 'Tidl. Referenceprogram (SST)', url: `${import.meta.env.BASE_URL}pdf/Referenceprogram_SST.pdf` }
    ],
    intro: 'Retningslinjen fra Dansk Multidisciplinær Psykiatrisk Gruppe (DMPG) og Sundhedsvæsenets Kvalitetsinstitut (version 1.0, 2026) sikrer evidensbaseret, algoritmestyret farmakologisk behandling af unipolar depression. Retningslinjen dækker voksne samt særlige populationer: gravide/ammende, børn/unge (<18 år) og ældre (>65 år).',
    algorithmTitle: 'Klinisk Retningslinje & Algoritme',
    isStepBased: false,
    algorithm: [
        {
            title: '1. Indikation, Sværhedsgrad & Forundersøgelser (Anbefaling 1, 2, 4)',
            summary: 'Moderat depression: Overvej antidepressivum (A). Svær depression: Antidepressiva SKAL tilbydes (A). Vurder EKG og somatisk komorbiditet.',
            details: `Indikation efter sværhedsgrad:
• Let depression: Antidepressiva bør IKKE rutinemæssigt tilbydes. Førstevalg er watchful waiting, psykoedukation, aflastning og psykoterapi.
• Moderat depression: Behandling med antidepressivum bør overvejes (A). Evt. kombineret med psykoterapi.
• Svær depression: Medicinsk behandling med et antidepressivum SKAL altid tilbydes (A).

Præparatvalg (A):
• Foretages i samråd med patienten ud fra tidligere erfaringer med præparater, bivirkningsprofil, somatisk og psykisk komorbiditet samt patientens præferencer (f.eks. ønske om at undgå vægtøgning, sedation eller seksuel dysfunktion).
• Metaanalyser viser ingen overordnet effektforskel mellem klasserne (SSRI, SNRI, NaSSA, TCA) i monoterapi; valget styres derfor af bivirkningsprofil og komorbiditeter.

Paraklinik og EKG-krav før opstart:
• Blodtryk og EKG før behandlingsstart iht. gældende vejledning (DCS/DPS 2023).
• EKG er IKKE nødvendigt ved: Agomelatin og Vortioxetin.
• EKG er IKKE nødvendigt ved: Bupropion (hos somatisk raske).
• EKG kan UDSKYDES ved: Sertralin, Mirtazapin, Duloxetin og Mianserin i fravær af kardiologiske risikofaktorer.
• EKG OBLIGATORISK ved: Citalopram og Escitalopram (dosisafhængig risiko for QTc-forlængelse) samt ved TCA.

Psykometrisk monitorering (A):
• Baseline sværhedsgrad monitoreres ved hjælp af HAM-D6 (mere sensitiv for behandlingsrespons end HAM-D17 og registrerer ikke uhensigtsmæssige bivirkninger som manglende effekt).
• Behandlingsmålet er altid remission (HAM-D6 < 5).`
        },
        {
            title: '2. Førstelinjebehandling: Monoterapi & Præparater (Tabel 1 & Anbefaling 2)',
            summary: '1. valg: Sertralin, Escitalopram, Citalopram (SSRI), Duloxetin (SNRI), Mirtazapin (NaSSA), Vortioxetin eller Agomelatin. Start i laveste effektive dosis.',
            details: `Førstelinjebehandlinger til voksne (Tabel 1):
• SSRI (Selektive Serotonin Reuptake Inhibitorer):
  - 1. rang: Sertralin (50-100 mg), Escitalopram (10-20 mg), Citalopram (20-40 mg).
    * Sertralin foretrækkes ofte pga. laveste bivirknings- og interaktionsrisiko.
  - 2. rang: Fluoxetin (20-40 mg), Fluvoxamin (50-150 mg), Paroxetin (20-40 mg).
    * Paroxetin har højere frekvens af seponeringssymptomer og antikolinerge bivirkninger.
• SNRI (Serotonin-Noradrenalin Reuptake Inhibitorer):
  - 1. rang: Duloxetin (60-120 mg).
  - 2. rang: Venlafaxin (75-225 mg).
    * OBS: Doser under 225 mg venlafaxin giver sjældent dual noradrenerg virkning.
• NaSSA (Noradrenerge og Specifikke Serotonerge Antidepressiva):
  - 1. rang: Mirtazapin (15-45 mg). Velegnet ved udtalt insomni eller nedsat appetit (sedation og vægtøgning).
  - 2. rang: Mianserin (30-90 mg).
• Serotoninmodulator:
  - Vortioxetin (10-20 mg). Færre seksuelle bivirkninger; gavnlig effekt på kognitive symptomer.
• Melatoninagonist & 5-HT2c-antagonist:
  - Agomelatin (25-50 mg). Forbedrer søvnarkitektur; ingen seksuel dysfunktion el. vægtøgning.
    * OBS: Monitorér levertal (ALAT) efter 3, 6, 12 og 24 uger.

Doseringsprincipper:
• Start altid i laveste potentielt effektive dosis.
• Dosis øges som udgangspunkt kun ÉN gang ved manglende respons (f.eks. sertralin 50 mg -> 100 mg).
• For sertralin viser evidensen, at 200 mg ikke giver bedre effekt målt på HAM-D6 end 100 mg, men markant flere bivirkninger.
• TCA og MAO-hæmmere anbefales IKKE som førstelinjebehandling pga. toksicitet og bivirkningsbyrde.`
        },
        {
            title: '3. Algoritmestyret Forløb: Evaluering Uge 2-12 (Figur 1 & Anbefaling 4)',
            summary: 'Systematisk monitorering med HAM-D6 efter 2 uger og herefter hver 2.-4. uge. Skift eller kombination allerede efter 4 uger ved manglende respons!',
            details: `Standardalgoritme for justering, præparatskifte og kombinationsbehandling (Figur 1):
Maksimalt 4 uger uden respons før behandlingsændring! Hvis der ikke ses bedring inden for 4 uger på relevant dosis, er sandsynligheden for respons efter 8-12 uger minimal.

Beslutningstrin ud fra ændring i HAM-D6 fra baseline:

• UGE 2:
  - Respons < 20%: Øg dosis.
  - Respons 20-50%: Øg dosis.
  - Respons > 50%: Afvent yderligere respons på uændret dosis.
  - Remission (HAM-D6 < 5): Fortsæt som vedligeholdelsesbehandling.

• UGE 4:
  - Respons < 20%: Skift til antidepressivum fra anden klasse (algoritmen starter forfra).
  - Respons 20-50%: Overvej skift til anden klasse ELLER opstart kombinationsbehandling.
  - Respons > 50%: Øg dosis.
  - Remission (HAM-D6 < 5): Fortsæt som vedligeholdelse.

• UGE 6:
  - Respons < 20%: Skift til antidepressivum fra anden klasse.
  - Respons 20-50%: Overvej kombinationsbehandling.
  - Respons > 50%: Overvej kombinationsbehandling.
  - Remission: Fortsæt som vedligeholdelse.

• UGE 8:
  - Respons < 20%: Overvej kombinationsbehandling.
  - Respons > 50% / Remission: Fortsæt som vedligeholdelse.

• UGE 12:
  - Respons < 20%: Overvej skift til anden klasse eller kombinationsbehandling.
  - Remission: Fortsæt som vedligeholdelse.

Akut stabilisering:
• Hos indlagte patienter kan kombination og akut stabilisering med benzodiazepiner eller z-stoffer med fordel igangsættes hurtigere for at sikre søvn og dæmpe akut angst/uro.`
        },
        {
            title: '4. Andenlinje: Præparatskift & Kombination/Augmentation (Anbefaling 7, 8 & Tabel 1)',
            summary: 'Skift til anden førstelinjeklasse eller TCA (Nortriptylin). Ved partiel respons: Kombinér med Aripiprazol (A), Lithium (A), Quetiapin (A) eller Mirtazapin (B).',
            details: `A. Præparatskift (B):
• Overvej primært skift til en anden førstelinjeklasse (SSRI -> SNRI, NaSSA, Vortioxetin eller Agomelatin).
• Overvej sekundært skift til TCA (Tricykliske Antidepressiva):
  - 1. rang: Nortriptylin. Foretrækkes pga. mindst risiko for ortostatisk hypotension. Initialdosis 50 mg.
    * TDM (Plasmakoncentration) er obligatorisk ca. 5 døgn efter opstart/dosisøgning (terapeutisk interval 200-600 nmol/L).
    * Ved mistanke om langsom omsætter (slow metabolizer) pga. højt niveau/bivirkninger gentages måling efter 10 døgn.
  - 2. rang: Amitriptylin, Clomipramin.
  - 3. rang: Imipramin, Dosulepin.

B. Kombinationsbehandling (Augmentation) (Anbefaling 8):
Anbefales ved utilstrækkelig effekt af et antidepressivum, som ellers tåles godt:
• Aripiprazol* (A): 3,25 - 15 mg dgl. (aktiverende profil; velegnet ved psykomotorisk hæmning og træthed).
• Quetiapin (A): 150 - 300 mg dgl. (beroligende/angstdæmpende; kræver metabolisk kontrol: vægt, talje, lipider, blodsukker).
• Lithium* (A): Målniveau 0,4 - 0,8 mmol/L (kræver forprøver: kreatinin, eGFR, TSH, væsketal; kontrol hver 3. måned).
• Mirtazapin (B): 7,5 - 45 mg til natten sammen med et SSRI eller SNRI (bedre dokumenteret end andre kombinationer).

Vigtige forholdsregler ved kombinationsbehandling:
• Anvend kun ÉT kombinationspræparat ad gangen for at undgå uoverskuelig polyfarmaci.
• Off-label brug (*aripiprazol, lithium m.fl. er ikke EMA-godkendt specifikt til unipolar depression) kræver grundig patientinformation og journalføring af informeret samtykke.
• Ved god effekt fastholdes kombinationsbehandlingen i mindst 6-9 måneder.`
        },
        {
            title: '5. Tredjelinje: Behandlingsresistens (TRD), Esketamin & MAO-hæmmer (Anbefaling 7, 8)',
            summary: 'Ved svigt af ≥2 behandlinger: Esketamin næsespray (A) el. MAO-I (Isocarboxazid). Sekundært Olanzapin, Pramipexol, Methylphenidat. Lamotrigin frarådes!',
            details: `Udredning før konklusion om resistens (TRD):
• Tjek altid behandlingsadhærens/compliance (evt. via plasmakoncentrationsmåling).
• Revurder diagnosen (bipolar lidelse, autismespektrum, personlighedsstruktur).
• Udeluk somatiske årsager (hypothyreose, søvnapnø, B12/D-vitaminmangel) og skjult rusmiddelforbrug.

Tredjelinjestrategier (Tabel 1):
• Esketamin næsespray (A):
  - Anbefalet af Medicinrådet til behandlingsresistent depression (og ved akut selvmordsrisiko).
  - Skal ALTID gives i kombination med et SSRI eller et SNRI.
  - RCT-studie (N=676) påviste signifikant højere remissionsrate i uge 8 end quetiapin-augmentation.
• Isocarboxazid (MAO-inhibitor):
  - Tertiært skift ved svær terapiresistens. Meget potent, men kræver streng tyraminfattig diæt og observation for hypertensiv krise og serotonergt syndrom.
• Øvrige augmentationspræparater (B):
  - Olanzapin* (2,5 - 10 mg - metabolisk monitorering).
  - Pramipexol* (dopaminagonist, op til 2,5 mg - god ved udtalt anhedoni og dopaminerg mangel).
  - Methylphenidat* / Centralstimulantia (lav evidens, kan overvejes ved udtalt somnolens/træthed).
  - Levothyroxin* (thyroideahormon - i samarbejde med endokrinolog).

KLINISK ADVARSEL:
• Lamotrigin anbefales IKKE som kombinationsbehandling ved unipolar depression (overvejende negativ evidens i store metaanalyser) (B).

Elektrokonvulsiv Terapi (ECT):
• ECT er guldstandard og har den højeste remissionsrate ved behandlingsresistent, svær depression.`
        },
        {
            title: '6. Psykotisk Depression (Anbefaling 3)',
            summary: 'Kombination af et antidepressivum og et atypisk antipsykotikum i fuld antipsykotisk dosis (A). ECT bør altid overvejes som akut førstevalg.',
            details: `Karakteristika:
• Psykotisk depression er en særligt alvorlig, potentiel livstruende tilstand med høj selvmordsrisiko, udtalt funktionstab og ofte manglende sygdomsindsigt.
• Indlæggelse på psykiatrisk afdeling er oftest indiceret.

Behandlingsanbefalinger:
• ECT (Elektrokonvulsiv Terapi) bør overvejes som førstevalg, særligt ved:
  - Akut selvmordsfare
  - Svær depressiv stupor / psykomotorisk hæmning
  - Spise- og væskevægring
• Farmakologisk kombinationsbehandling (A):
  - Kombination af et antidepressivum og et atypisk antipsykotikum.
  - Antipsykotikummet SKAL doseres i fuld antipsykotisk dosis (f.eks. højere doser end ved simpel augmentering af ikke-psykotisk depression).
• Opfølgning og varighed:
  - Efter opnået remission skal den farmakologiske kombinationsbehandling fortsættes i mindst 12 måneder med henblik på at forebygge recidiv.
  - Hvis ECT er anvendt som primær behandling, indledes medicinsk vedligeholdelse mod slutningen af ECT-serien.`
        },
        {
            title: '7. Vedligeholdelse, Recidivprofylakse & Udtrapning (Anbefaling 5, 6)',
            summary: 'Fortsæt i samme effektive dosis i mindst 6-9 mdr. (≥12 mdr. ved risikofaktorer) (A). Udtrapning over uger til måneder med halvering af dosis hver 2. uge (A).',
            details: `Vedligeholdelsesbehandling (A):
• Fortsæt behandlingen med det/de præparat(er) og ved den dosis, hvor remission blev opnået.
• Standardvarighed: Mindst 6-9 måneder i stabil remission for patienter med enkeltstående episode.
• Forlænget varighed (≥12 måneder eller flerårig):
  - Ved residuale symptomer (især anhedoni og kognitive vanskeligheder).
  - Ved recidiverende depression (tidligere episoder).
  - Ved svær depression eller tidligere psykotiske symptomer.
  - Ved tidlige psykiske traumer, fysisk/seksuelt misbrug i barndommen.
  - Ved vedvarende psykosociale belastninger eller kroniske søvnproblemer.

Udtrapning og håndtering af seponeringssymptomer (A):
• Udtrapning planlægges altid i tæt samarbejde med patienten med en skriftlig plan.
• Standard udtrapningshastighed: Halvering af dosis hver 2. uge og seponering fra lavest tilgængelige konventionelle præparatstyrke.
• Præparater med HØJEST risiko for seponeringssymptomer:
  - Paroxetin, Venlafaxin, Duloxetin og Escitalopram.
• Præparater med LAVEST risiko for seponeringssymptomer:
  - Fluoxetin (pga. aktiv metabolit norfluoxetin med t½ på 7-15 dage).
• Ved svære/længerevarende seponeringssymptomer:
  - Udtrap i endnu langsommere tempo over flere måneder.
  - Alternativt: Skift patienten til Fluoxetin 20 mg dagligt i 1 uge, hvorefter medicinen seponeres.

Differentialdiagnose: Seponering vs. Recidiv:
• Seponeringssymptomer (svimmelhed, elektriske stød i hovedet/kroppen, kvalme, influenzalignende symptomer, angst): Opstår få dage efter dosisreduktion og forsvinder hurtigt (timer/dage) ved genoptagelse af forrige dosis.
• Recidiv af depression: Opstår typisk først uger til måneder efter dosisændring.`
        },
        {
            title: '8. Særlige Forhold: Gravide og Ammende (Anbefaling 9, 10)',
            summary: 'Sertralin er førstevalg ved opstart under graviditet og amning (A). Konferér altid med speciallæge i psykiatri / perinatal klinik (D).',
            details: `Præparatvalg (A):
• Sertralin anbefales som førstevalg ved behov for opstart af farmakologisk behandling under graviditet, post-partum og amning.
• Sertralin har en veldokumenteret sikkerhedsprofil; store registerstudier har ikke påvist øget risiko for alvorlige medfødte misdannelser.
• Amning: Sertralin udskilles kun i minimal grad i modermælk og har ikke vist klinisk betydende bivirkninger hos det ammede barn.

Kliniske overvejelser:
• Ubehandlet depression hos den gravide medfører betydelige risici for både mor og foster (mistrivsel, præmatur fødsel, selvmordsrisiko).
• Kvinder, der allerede er i velfungerende medicinsk behandling, bør som udgangspunkt IKKE foretage unødige præparatskift, da dette øger recidivrisikoen markant.
• Neonatalt Adaptationssyndrom (NAS): Kan optræde forbigående hos det nyfødte barn (uro, sitren, diebesvær) og svinder oftest spontant inden for få dage.
• Anvendelse af psykofarmaka til gravide og ammende bør altid konfereres med speciallæge i psykiatri med særlig viden på området eller via perinatalpsykiatrisk regionsklinik (D).`
        },
        {
            title: '9. Særlige Forhold: Børn og Unge under 18 år (Anbefaling 11, 12, 13 & Tabel 3)',
            summary: 'Fluoxetin er ENESTE godkendte og anbefalede præparat (A). Venlafaxin, Paroxetin og TCA frarådes strengt (A). EKG ved baseline og >50% dosisøgning.',
            details: `Trinvis tilgang hos børn og unge:
• Første skridt er altid non-farmakologisk: Aflastning, psykoedukation samt specifik psykoterapi (Kognitiv Adfærdsterapi / Interpersonel Terapi).
• Farmakologisk behandling påbegyndes hvis der ikke er respons efter 4-8 uger (moderat depression) eller 2-3 uger (svær depression).

Anbefalet præparat (A):
• Fluoxetin er det ENESTE antidepressivum med dokumenteret effekt og officiel indikation til behandling af depression hos børn og unge (8-17 år) i Danmark.

Optrapningsplan for Fluoxetin (Tabel 3):
• Opstart: 10 mg x 1 dagligt i 1 uge.
• 1. kontrol (efter 1 uge): Øges til 20 mg x 1 dagligt i 2-3 uger.
• 2. kontrol (efter 2-3 uger): Ved manglende respons kan undtagelsesvis øges til 30 mg x 1 dagligt (off-label).
• Maksimal dosis: 30 mg dagligt.
• Udtrapning: Reduktion på 10 mg med 2-3 ugers interval.

KONTRAINDICEREDE PRÆPARATER (A):
• Der er en generel og stærk anbefaling IMOD anvendelse af Venlafaxin, Paroxetin og TCA til børn og unge.
• Disse præparater har ingen dokumenteret effekt over placebo og er forbundet med markant øget risiko for selvmordstanker, agitation og selvmordsadfærd.

Sikkerhed & Monitorering:
• EKG: Skal tages før behandlingsstart (baseline) samt ved dosisøgning på ≥ 50% fra targetdosis.
• Tæt klinisk opfølgning med fokus på initial forværring, agitation og selvmordsrisiko (anvend MFQ og SSRI-UKU).`
        },
        {
            title: '10. Særlige Forhold: Ældre over 65 år (Anbefaling 14, 15)',
            summary: 'Sertralin overvejes som førstevalg (A). Start low, go slow: Halv startdosis, 4-6 uger mellem justeringer (D). Undgå TCA og Paroxetin pga. antikolinerg byrde og fald.',
            details: `Præparatvalg hos ældre:
• Sertralin overvejes som førstevalg (A) pga. god bivirkningsprofil og lavest dokumenteret risiko for hyponatriæmi.
• Tidligere respons: Har patienten tidligere haft god effekt af et specifikt præparat, tages dette med i overvejelserne.
• Vortioxetin har vist fin tolerabilitet og positiv effekt på kognitiv funktion hos ældre.
• PRÆPARATER DER SKAL UNDGÅS: TCA og Paroxetin frarådes generelt pga. kraftig antikolinerg virkning, ortostatisk hypotension, kognitiv forringelse og faldulykker.

Doseringsprincip ("Start low, go slow") (D):
• Startdosis bør typisk være det halve af normal startdosis for yngre voksne.
• Hurtig opfølgning efter 1 uge mhp. tolerans og bivirkninger (svimmelhed, ortostatisme).
• Herefter længere observationsintervaller (4-6 uger) mellem dosisvurderinger, da tid til fuld effekt kan være forsinket hos ældre.

Særlige risici hos ældre:
• Hyponatriæmi: Forekommer hos ca. 8% af 55+ årige og forstærkes af SSRI/SNRI. Særlig risiko ved samtidig behandling med thiazid-diuretika eller NSAID. Kontroller elektrolytter før og under behandling.
• Faldrisiko: Antidepressiva øger faldrisikoen generelt (OR 1,57) pga. sedation, svimmelhed, hyponatriæmi og blodtryksfald.`
        },
        {
            title: '11. Bivirkninger, Interaktioner & TDM (Tabel 2 & Bilag 2)',
            summary: 'Klassespecifikke bivirkninger, CYP2D6/CYP1A2 interaktioner, QTc-risiko samt retningslinjer for Therapeutic Drug Monitoring (TDM).',
            details: `Klassespecifikke bivirkninger (Tabel 2):
• SSRI: Kvalme/diarré, søvnforstyrrelser, seksuel dysfunktion (libidotab, anorgasmi - mindre ved fluoxetin), hyponatriæmi, øget blødningstendens (trombocytpåvirkning; obs samtidig NSAID/AK), forlænget QTc (særligt citalopram/escitalopram).
• SNRI: GI-gener, forhøjet blodtryk, svedtendens, tremor, udtalte seponeringssymptomer (venlafaxin/duloxetin).
• NaSSA: Vægtøgning, sedation, metaboliske forstyrrelser.
• Agomelatin: Leverpåvirkning (monitorér ALAT efter 3, 6, 12, 24 uger). Ingen seksuelle bivirkninger.
• Vortioxetin: Let kvalme, hovedpine. Færre seksuelle bivirkninger.
• TCA: Antikolinerge symptomer (mundtørhed, obstipation, urinretention, synsforstyrrelser), ortostatisk hypotension, arytmier/QT-forlængelse, høj dødelighed ved overdosering.

CYP450 Enzymatiske Interaktioner (Bilag 2):
• CYP2D6-hæmning: Fluoxetin og Paroxetin er potente CYP2D6-hæmmere og øger plasmakoncentrationen kraftigt af f.eks. Aripiprazol, Risperidon, Nortriptylin, Duloxetin og Tramadol.
• Bupropion: Hæmmer CYP2D6 og inducerer CYP3A4.
• CYP1A2 & Rygning: Agomelatin omsættes af CYP1A2. Rygning inducerer enzymet (sænker koncentrationen). Ved rygestop stiger koncentrationen markant med risiko for toksicitet! Fluvoxamin (potent hæmmer) er kontraindiceret sammen med agomelatin.

Therapeutic Drug Monitoring (TDM):
• TDM er standard for Lithium (0,4-0,8 mmol/L) og TCA (Nortriptylin: 200-600 nmol/L).
• TDM "de nouveau": Plasmamåling hvor patienten er sin egen kontrol ved opstart af interagerende lægemidler (f.eks. aripiprazol-koncentration før og efter opstart af fluoxetin).
• Genetisk polymorfi: Langsomme omsættere (CYP2D6 / CYP2C19 slow metabolizers) har markant forlænget halveringstid og øget bivirkningsrisiko ved standarddoser.`
        }
    ]
};

export const DEPRESSION_PREVIOUS_SPLIT_ALGORITHM = {
    title: 'Tidligere Behandlingsalgoritme (Referenceprogram)',
    subtitle: 'Referenceprogram for unipolar depression (SST)',
    rootNodes: [
        {
            title: 'Mistanke om depression (F32.0 - F33.9)',
            summary: 'Verifikation af diagnosen:\nKlinisk vurdering, oplysninger fra pårørende, observation, udelukkelse af somatisk årsag',
        }
    ],
    tracks: [
        {
            title: 'Ikke-hospitaliserede',
            nodes: [
                {
                    title: 'Let depression',
                    summary: 'Watchful waiting',
                    details: 'Patienter med let depression (HAM-D17: 13-17) skal ikke rutinemæssigt tilbydes farmakologisk behandling med antidepressiva. "Watchful monitoring" anbefales.'
                }
            ]
        },
        {
            title: 'Ikke-hospitaliserede',
            nodes: [
                {
                    title: 'Moderat depression',
                    summary: 'Behandling med SSRI, som ikke har interaktioner med andre lægemidler:\n• Citalopram\n• Escitalopram\n• Sertralin',
                    details: 'Patienter med moderat depression (HAM-D17: 18-24) eller dystymi tilbydes farmakologisk behandling eller psykoterapi – evt. i kombination.\n\n• 1. valg: Sertralin anbefales som førstevalg pga. lavere bivirknings- og interaktionsrisiko.\n• 2. valg: Citalopram og escitalopram er ikke førstevalg pga. dosisrestriktion og krav om EKG-monitorering.\n\nMonitorering: Patienter bør ses hurtigt (inden for ca. 1 uge) efter behandlingsstart mhp. effekt, bivirkninger og selvmordsrisiko.'
                },
                {
                    title: 'Ingen tegn på bedring efter 2-4 uger på optimal dosis'
                },
                {
                    title: 'Skift til præparat af anden farmakologisk klasse:\n• Venlafaxin, duloxetin (SNRI)\n• Mirtazapin (NaSSA)\n• TCA (evt. i samråd med psykiater)',
                    details: 'Kriterier for skift af behandling:\n• Det anbefales først at forsøge skift til et antidepressivum med en anden farmakodynamisk virkningsprofil (fx fra SSRI til SNRI eller TCA).\n• Alternativt kan overvejes at tillægge mianserin eller mirtazepin givet til natten oveni SSRI, specielt ved fortsat søvnbesvær.\n• Duloxetin og venlafaxin kan anvendes ved svigt af SSRI, men er ikke førstevalg pga. flere bivirkninger.'
                },
                {
                    title: 'Ingen tegn på bedring efter yderligere 2-4 uger på optimal dosis'
                },
                {
                    title: '• Addér lithium i samråd med psykiater\n• Ved manglende effekt henvisning til psykiater eller indlæggelse på psykiatrisk afdeling',
                    details: 'Behandlingsresistens over for to eller flere antidepressiva taler i sig selv for lithium som førstevalg i forsøg på at forebygge udvikling af bipolar lidelse.\n\nVed fortsat utilstrækkelig effekt anbefales augmentation med lithium eller antipsykotikum (fx quetiapin eller aripiprazol).'
                }
            ]
        },
        {
            title: 'Hospitaliserede patienter',
            nodes: [
                {
                    title: 'Svær depression',
                    summary: 'Behandling med dual action eller TCA',
                    details: 'Patienter med svær depression (HAM-D17: 25-52) tilbydes altid behandling med antidepressiva.\n\n• TCA: Nortriptylin foretrækkes frem for øvrige TCA pga. lavere tendens til ortostatisk hypotension.\n• Mirtazepin kan overvejes som tillæg ved søvnbesvær.'
                },
                {
                    title: 'Ingen tegn på bedring efter 2-4 uger på optimal dosis'
                },
                {
                    title: 'Addér lithium\n(for almen praksis i samråd med psykiater)',
                    details: 'Behandlingsresistens over for to eller flere antidepressiva taler for lithium. Ved familiær disposition for bipolar lidelse og mange tidligere depressioner øges indikationen for lithium yderligere.'
                },
                {
                    title: 'Ingen tegn på bedring efter yderligere 2-4 uger'
                },
                {
                    title: 'ECT'
                }
            ]
        },
        {
            title: 'Hospitaliserede patienter',
            nodes: [
                {
                    title: 'Depression med psykotiske symptomer',
                    summary: '• Behandling med TCA\n• Overvej ECT',
                    details: 'Behandling foregår altid under indlæggelse (specialistopgave).\n\n• 1. valg: ECT anbefales pga. bedst effekt.\n• 2. valg: Kombination af TCA (fx nortriptylin) og antipsykotika kan overvejes hos patienter, som ikke kan behandles med eller ikke ønsker ECT.'
                },
                {
                    title: 'Ingen tegn på bedring efter 2-4 uger på optimal dosis'
                },
                {
                    title: '• Addér antipsykotikum\n• Overvej ECT'
                },
                {
                    title: 'Ingen tegn på bedring efter yderligere 2-4 uger'
                },
                {
                    title: 'ECT'
                }
            ]
        }
    ]
};

DEPRESSION_GUIDELINE.splitAlgorithm = DEPRESSION_PREVIOUS_SPLIT_ALGORITHM;

