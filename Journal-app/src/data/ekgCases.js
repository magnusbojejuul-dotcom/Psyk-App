/**
 * EKG Cases Database
 * Baseret på principperne og cases fra John R. Hamptons "EKG - let at se"
 * Samt kardiologiske og psykiatriske retningslinjer (QTc, elektrolytter, infarktlokalisering).
 */

export const LEAD_NAMES = ['I', 'II', 'III', 'aVR', 'aVL', 'aVF', 'V1', 'V2', 'V3', 'V4', 'V5', 'V6'];

export const LEAD_DETAILS = {
    'I': { angle: 0, plane: 'frontal', wall: 'Lateral', territory: 'LCx / Diagonal', desc: 'Ser på venstre ventrikels laterale væg fra venstre arm.' },
    'II': { angle: 60, plane: 'frontal', wall: 'Inferior', territory: 'RCA (højre koronararterie)', desc: 'Ser på hjertets underside (diafragmale flade) mod venstre ben.' },
    'III': { angle: 120, plane: 'frontal', wall: 'Inferior', territory: 'RCA', desc: 'Ser på hjertets underside fra højre mod venstre ben.' },
    'aVR': { angle: -150, plane: 'frontal', wall: 'Kavitær / Højre atrie', territory: 'Højre forkammer / kavitetsretning', desc: 'Ser ind i hjertets indre hulrum fra højre skulder. Alt er normalt omvendt (negativt).' },
    'aVL': { angle: -30, plane: 'frontal', wall: 'Høj Lateral', territory: 'LCx / LAD', desc: 'Ser på venstre ventrikels øvre laterale væg.' },
    'aVF': { angle: 90, plane: 'frontal', wall: 'Inferior', territory: 'RCA', desc: 'Ser lige op mod hjertets underside fra fødderne.' },
    'V1': { angle: 110, plane: 'horizontal', wall: 'Septal / Højre ventrikel', territory: 'LAD septalgrene', desc: '4. interkostalrum højre sternalrand. Ser direkte på højre ventrikel og septum.' },
    'V2': { angle: 80, plane: 'horizontal', wall: 'Septal', territory: 'LAD septalgrene', desc: '4. interkostalrum venstre sternalrand. Ser på forreste del af septum.' },
    'V3': { angle: 60, plane: 'horizontal', wall: 'Anterior (Forvæg)', territory: 'LAD (venstre forreste nedadgående)', desc: 'Mellem V2 og V4. Ser på hjertets anteriore forvæg.' },
    'V4': { angle: 45, plane: 'horizontal', wall: 'Anterior / Apeks', territory: 'LAD', desc: '5. interkostalrum i medioklavikulærlinjen. Ser på hjertets spids (apeks).' },
    'V5': { angle: 20, plane: 'horizontal', wall: 'Lateral', territory: 'LCx / LAD', desc: 'Forreste aksillærlinje i samme horisontale niveau som V4. Ser på venstre ventrikels laterale væg.' },
    'V6': { angle: 0, plane: 'horizontal', wall: 'Lateral', territory: 'LCx', desc: 'Midterste aksillærlinje. Ser på venstre ventrikels laterale væg fra flanken.' }
};

export const EKG_CASES = [
    {
        id: 'normal_sinus',
        title: 'Normal Sinusrytme',
        subtitle: 'Reference EKG - 12 normale afledninger',
        category: 'Normal',
        badge: 'Reference',
        description: '28-årig rask person henvist til rutine-EKG før opstart af ADHD-medicin. Ingen hjertebanken eller synkoper.',
        heartRate: 72,
        rhythm: 'Regelmæssig sinusrytme',
        axis: 'Normal akse (+60°)',
        prInterval: '160 ms (normal: 120-200 ms)',
        qrsDuration: '85 ms (normal: < 120 ms)',
        qtc: '405 ms (normal: < 440 ms for mænd, < 460 ms for kvinder)',
        territory: 'Normal fysiologi',
        affectedLeads: [],
        reciprocalLeads: [],
        anatomicalEffect: 'Normal elektrisk impulsforplantning fra SA-knuden gennem atrierne til AV-knuden, videre gennem His-bundtet, begge grenbundter og Purkinje-fibrene.',
        hamptonPearls: 'Hampton pointerer: "Et normalt EKG udelukker ikke hjertesygdom, men definerer referencen." Læg mærke til den normale R-progression i brystafledningerne: lille r og dyb S i V1, der gradvist vokser til høj R og lille S i V5-V6, med overgangszone (R = S) typisk omkring V3-V4.',
        leads: {
            'I': { p: 0.12, pr: 160, q: -0.05, r: 0.8, s: -0.1, st: 0, t: 0.35 },
            'II': { p: 0.18, pr: 160, q: -0.05, r: 1.2, s: -0.15, st: 0, t: 0.45 },
            'III': { p: 0.08, pr: 160, q: 0, r: 0.5, s: -0.1, st: 0, t: 0.2 },
            'aVR': { p: -0.15, pr: 160, q: 0, r: 0.15, s: -0.9, st: 0, t: -0.3 },
            'aVL': { p: 0.08, pr: 160, q: -0.05, r: 0.5, s: -0.1, st: 0, t: 0.25 },
            'aVF': { p: 0.14, pr: 160, q: -0.05, r: 0.85, s: -0.1, st: 0, t: 0.35 },
            'V1': { p: 0.08, pr: 160, q: 0, r: 0.25, s: -0.85, st: 0, t: 0.15 },
            'V2': { p: 0.1, pr: 160, q: 0, r: 0.5, s: -1.1, st: 0.05, t: 0.4 },
            'V3': { p: 0.12, pr: 160, q: -0.05, r: 0.9, s: -0.7, st: 0.02, t: 0.45 },
            'V4': { p: 0.14, pr: 160, q: -0.05, r: 1.4, s: -0.3, st: 0, t: 0.5 },
            'V5': { p: 0.12, pr: 160, q: -0.08, r: 1.3, s: -0.15, st: 0, t: 0.4 },
            'V6': { p: 0.1, pr: 160, q: -0.06, r: 1.0, s: -0.1, st: 0, t: 0.35 }
        },
        quiz: [
            {
                step: 'Rytme & Frekvens',
                question: 'Hvad er hjerterytmen og frekvensen på dette EKG?',
                options: [
                    'Regelmæssig sinusrytme, frekvens ca. 70-75/min',
                    'Sinusbradykardi, frekvens under 50/min',
                    'Atrieflimren med hurtig ventrikelaktion',
                    'Sinustakykardi, frekvens over 110/min'
                ],
                correctIndex: 0,
                explanation: 'Der ses ensartede P-takker forud for hvert QRS-kompleks med konstant PR-interval. Afstanden mellem to R-takker er ca. 4 store tern (4 × 0.20 s = 0.80 s), svarende til en frekvens på 300 / 4 = 75 slag/min.'
            },
            {
                step: 'Hjerteakse',
                question: 'Hvordan vurderes hjerteaksen?',
                options: [
                    'Normal akse (positivt QRS-udslag i både afledning I og II)',
                    'Venstredrejet akse (positiv i I, negativ i II)',
                    'Højredrejet akse (negativ i I, positiv i III)',
                    'Ekstrem akse / ubestemmelig'
                ],
                correctIndex: 0,
                explanation: 'I afledning I og II er netto QRS-udslaget tydeligt overvejende positivt (høj R-tak). Dette placerer den gennemsnitlige depolarisationsvektor i det normale område mellem 0° og +90°.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er den samlede konklusion af dette EKG?',
                options: [
                    'Normalt EKG inden for referenceområdet',
                    'Venstresidigt grenblok (LBBB)',
                    'Akut forvægsinfarkt',
                    'Medicin-induceret lang QT-syndrom'
                ],
                correctIndex: 0,
                explanation: 'Alle intervaller, voltager, aksen og ST-T segmenterne er normale. Normal R-progression i V1-V6 uden patologiske Q-takker eller ledningshindringer.'
            }
        ]
    },
    {
        id: 'anterior_stemi',
        title: 'Akut Forvægsinfarkt (Anterior STEMI)',
        subtitle: 'ST-elevation i V1-V4 med reciprokke depressioner',
        category: 'Iskæmi & Infarkt',
        badge: 'Akut STEMI',
        description: '61-årig mand indbragt med 45 minutters intense retrosternale trykkende brystsmerter med udstråling til venstre arm, koldsved og åndenød.',
        heartRate: 88,
        rhythm: 'Regelmæssig sinusrytme',
        axis: 'Normal akse (+45°)',
        prInterval: '150 ms (normal)',
        qrsDuration: '95 ms',
        qtc: '435 ms',
        territory: 'LAD (Left Anterior Descending) - Forvæg og septum',
        affectedLeads: ['V1', 'V2', 'V3', 'V4'],
        reciprocalLeads: ['II', 'III', 'aVF'],
        anatomicalEffect: 'Akut total okklusion af LAD fører til transmural iskæmi i forvæggen af venstre ventrikel og det interventrikulære septum. Skadestrømmen skaber en vektor rettet mod V1-V4.',
        hamptonPearls: 'Hampton fremhæver: "Ved ST-elevation skal man altid lede efter to ting: 1) Hvilke anatomisk naboafledninger viser elevation? 2) Er der reciprokke ST-depressioner i de modstående afledninger?" Ved forvægsinfarkt ses ofte reciprokke depressioner i de inferiore afledninger (II, III, aVF).',
        leads: {
            'I': { p: 0.1, pr: 150, q: 0, r: 0.7, s: -0.1, st: 0.05, t: 0.3 },
            'II': { p: 0.12, pr: 150, q: 0, r: 0.8, s: -0.2, st: -0.15, t: -0.1 },
            'III': { p: 0.06, pr: 150, q: 0, r: 0.3, s: -0.3, st: -0.25, t: -0.2 },
            'aVR': { p: -0.1, pr: 150, q: 0, r: 0.1, s: -0.7, st: -0.05, t: -0.2 },
            'aVL': { p: 0.08, pr: 150, q: 0, r: 0.6, s: -0.1, st: 0.1, t: 0.3 },
            'aVF': { p: 0.1, pr: 150, q: 0, r: 0.5, s: -0.25, st: -0.2, t: -0.15 },
            'V1': { p: 0.08, pr: 150, q: 0, r: 0.2, s: -0.4, st: 0.35, t: 0.6, stShape: 'coved' },
            'V2': { p: 0.1, pr: 150, q: -0.1, r: 0.5, s: -0.2, st: 0.6, t: 0.85, stShape: 'tombstone' },
            'V3': { p: 0.12, pr: 150, q: -0.15, r: 0.7, s: -0.1, st: 0.55, t: 0.75, stShape: 'coved' },
            'V4': { p: 0.12, pr: 150, q: -0.1, r: 0.9, s: -0.1, st: 0.3, t: 0.5, stShape: 'coved' },
            'V5': { p: 0.12, pr: 150, q: -0.05, r: 1.1, s: -0.15, st: 0.08, t: 0.35 },
            'V6': { p: 0.1, pr: 150, q: -0.05, r: 0.9, s: -0.1, st: 0.02, t: 0.25 }
        },
        quiz: [
            {
                step: 'ST-segment & T-takker',
                question: 'Hvilke afledninger udviser udtalte patologiske ST-elevationer?',
                options: [
                    'V1, V2, V3 og V4 (forvæg/septum)',
                    'II, III og aVF (inferior væg)',
                    'I, aVL, V5 og V6 (lateral væg)',
                    'Kun aVR'
                ],
                correctIndex: 0,
                explanation: 'Der ses markante konvekse ("tombstone") ST-elevationer i brystafledningerne V1 til V4 på op mod 4-6 mm (0.4-0.6 mV), foreneligt med transmural iskæmi i LAD-territoriet.'
            },
            {
                step: 'Reciprokke forandringer',
                question: 'Hvad ses i de inferiore afledninger (II, III og aVF)?',
                options: [
                    'Reciprokke ST-depressioner (spejlbillede af forvægsinfarktet)',
                    'ST-elevationer i alle tre afledninger',
                    'Grenblokmønster',
                    'Fuldstændig normale forhold'
                ],
                correctIndex: 0,
                explanation: 'Når den transmurale skadestrøm i forvæggen peger fremad mod V1-V4, ses det modsat rettede elektriske spejlbillede som ST-depression i de nedadrettede afledninger II, III og aVF.'
            },
            {
                step: 'Diagnose & Håndtering',
                question: 'Hvad er diagnosen og den korrekte akutte handling?',
                options: [
                    'Akut Anterior STEMI - Akut kontakt til hjertecenter / Kardiologisk vagthavende mhp. akut primær PCI',
                    'Perikarditis - Send patienten hjem med ibuprofen',
                    'Ukompliceret venstresidigt grenblok',
                    'Normalvariant hos en ung atlet'
                ],
                correctIndex: 0,
                explanation: 'Dette er et klassisk livstruende forvægsinfarkt (STEMI). Patienten skal omgående visiteres til akut koronarangiografi og primær PCI (ballonudvidelse).'
            }
        ]
    },
    {
        id: 'inferior_stemi',
        title: 'Akut Inferiort Infarkt (Inferior STEMI)',
        subtitle: 'ST-elevation i II, III, aVF med reciprokke depressioner i I, aVL',
        category: 'Iskæmi & Infarkt',
        badge: 'Akut STEMI',
        description: '56-årig kvinde med 2 timers svære epigastriske smerter, kvalme, opkastning og koldsved, mistænkt for galdesten før EKG blev optaget.',
        heartRate: 64,
        rhythm: 'Sinusrytme (obs. risiko for AV-blok)',
        axis: 'Højredrejet tendens (+95°)',
        prInterval: '190 ms (øvre normalgrænse)',
        qrsDuration: '90 ms',
        qtc: '420 ms',
        territory: 'RCA (Højre Koronararterie) - Hjerteundersiden',
        affectedLeads: ['II', 'III', 'aVF'],
        reciprocalLeads: ['I', 'aVL'],
        anatomicalEffect: 'Okklusion af RCA medfører iskæmi i diafragmale væg af venstre ventrikel. RCA forsyner også AV-knuden hos ca. 90% af befolkningen, hvilket giver risiko for bradykardi og AV-blok.',
        hamptonPearls: 'Hampton understreger: "Inferiore infarkter præsenterer sig ofte atypisk med mavesmerter, sure opstød eller kvalme. Husk altid: ST-elevation i III > II tyder stærkt på RCA-okklusion, og ledsages næsten altid af reciprok ST-depression i aVL!"',
        leads: {
            'I': { p: 0.1, pr: 190, q: 0, r: 0.6, s: -0.2, st: -0.2, t: -0.15 },
            'II': { p: 0.12, pr: 190, q: -0.1, r: 0.9, s: 0, st: 0.35, t: 0.55, stShape: 'coved' },
            'III': { p: 0.08, pr: 190, q: -0.15, r: 0.7, s: 0, st: 0.5, t: 0.65, stShape: 'coved' },
            'aVR': { p: -0.12, pr: 190, q: 0, r: 0.1, s: -0.6, st: -0.1, t: -0.2 },
            'aVL': { p: 0.05, pr: 190, q: 0, r: 0.4, s: -0.3, st: -0.3, t: -0.25 },
            'aVF': { p: 0.12, pr: 190, q: -0.12, r: 0.85, s: 0, st: 0.45, t: 0.6, stShape: 'coved' },
            'V1': { p: 0.06, pr: 190, q: 0, r: 0.25, s: -0.7, st: 0, t: 0.15 },
            'V2': { p: 0.08, pr: 190, q: 0, r: 0.6, s: -0.9, st: -0.15, t: 0.3 },
            'V3': { p: 0.1, pr: 190, q: 0, r: 0.9, s: -0.5, st: -0.1, t: 0.35 },
            'V4': { p: 0.12, pr: 190, q: -0.05, r: 1.2, s: -0.2, st: 0, t: 0.4 },
            'V5': { p: 0.12, pr: 190, q: -0.06, r: 1.1, s: -0.15, st: 0.05, t: 0.35 },
            'V6': { p: 0.1, pr: 190, q: -0.05, r: 0.9, s: -0.1, st: 0.05, t: 0.3 }
        },
        quiz: [
            {
                step: 'Lokalisering af Iskæmi',
                question: 'I hvilke afledninger ses de primære ST-elevationer?',
                options: [
                    'II, III og aVF (Inferiort infarkt)',
                    'V1 til V4 (Anteriort infarkt)',
                    'I, aVL, V5 og V6 (Lateralt infarkt)',
                    'Ingen steder'
                ],
                correctIndex: 0,
                explanation: 'Klassiske ST-elevationer i de tre inferiore afledninger (II, III og aVF), som kigger på hjertets diafragmale flade.'
            },
            {
                step: 'Anatomisk Koronararterie',
                question: 'Hvilken koronararterie er med størst sandsynlighed okkluderet, når ST-elevationen i afledning III er større end i afledning II?',
                options: [
                    'RCA (Højre Koronararterie)',
                    'LAD (Left Anterior Descending)',
                    'Hovedstammen (Left Main)',
                    'Aorta ascendens'
                ],
                correctIndex: 0,
                explanation: 'Afledning III vender mod højre (+120°), mens II vender mod venstre (+60°). Når ST-elevationen er størst i III og ledsages af reciprok depression i I og aVL, skyldes det okklusion af RCA.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er den korrekte kliniske diagnose?',
                options: [
                    'Akut Inferiort STEMI',
                    'Akut galdestensanfald',
                    'Ukompliceret perikarditis',
                    'Venstresidigt grenblok'
                ],
                correctIndex: 0,
                explanation: 'Akut inferiort STEMI. Kræver omgående overflytning til hjertecenter mhp. KAG og akut PCI.'
            }
        ]
    },
    {
        id: 'lbbb',
        title: 'Venstresidigt Grenblok (LBBB)',
        subtitle: 'Bredt QRS (≥ 120 ms), dyb S i V1, bred kærvet R i I, aVL, V6',
        category: 'Ledningsforstyrrelser',
        badge: 'Grenblok',
        description: '74-årig kvinde med kendt hypertension og tiltagende funktionsdyspnø. EKG viser breddeøget QRS.',
        heartRate: 70,
        rhythm: 'Sinusrytme',
        axis: 'Venstredrejet akse (-20°)',
        prInterval: '170 ms',
        qrsDuration: '145 ms (udtalt forlænget ≥ 120 ms)',
        qtc: '450 ms',
        territory: 'Venstre grenbundt (His-Purkinje system)',
        affectedLeads: ['V1', 'V2', 'V5', 'V6', 'I', 'aVL'],
        reciprocalLeads: [],
        anatomicalEffect: 'Blokering i venstre grenbundt tvinger aktiveringsbølgen til først at gå gennem højre ventrikel og derefter langsomt sprede sig fra celle til celle gennem septum over i venstre ventrikel. Dette vender septaldepolariseringen om (højre mod venstre) og forlænger QRS markant.',
        hamptonPearls: 'Husk Hamptons mnemoteknik for grenblokke: "WiLLiaM MaRRoW". Ved LBBB har ordet L i midten: V1 ligner et W (dyb bred QS eller rS), mens V6 ligner et M (bred kærvet eller plateaudannet R-tak). OBS: Nyopstået LBBB med brystsmerter skal altid håndteres som et akut STEMI-ækvivalent!',
        leads: {
            'I': { p: 0.1, pr: 170, q: 0, r: 1.1, s: 0, notch: true, st: -0.1, t: -0.3 },
            'II': { p: 0.12, pr: 170, q: 0, r: 0.8, s: -0.1, st: 0, t: 0.15 },
            'III': { p: 0.05, pr: 170, q: 0, r: 0.2, s: -0.6, st: 0.1, t: 0.2 },
            'aVR': { p: -0.1, pr: 170, q: 0, r: 0.1, s: -0.7, st: 0.05, t: 0.1 },
            'aVL': { p: 0.08, pr: 170, q: 0, r: 0.9, s: 0, notch: true, st: -0.08, t: -0.25 },
            'aVF': { p: 0.1, pr: 170, q: 0, r: 0.4, s: -0.4, st: 0.05, t: 0.15 },
            'V1': { p: 0.08, pr: 170, q: 0, r: 0.1, s: -1.6, st: 0.18, t: 0.35, qrsWide: 145 },
            'V2': { p: 0.1, pr: 170, q: 0, r: 0.15, s: -1.8, st: 0.2, t: 0.4, qrsWide: 145 },
            'V3': { p: 0.1, pr: 170, q: 0, r: 0.25, s: -1.4, st: 0.15, t: 0.35, qrsWide: 145 },
            'V4': { p: 0.12, pr: 170, q: 0, r: 0.8, s: -0.5, st: -0.05, t: 0.1, qrsWide: 145 },
            'V5': { p: 0.12, pr: 170, q: 0, r: 1.5, s: 0, notch: true, st: -0.15, t: -0.4, qrsWide: 145 },
            'V6': { p: 0.1, pr: 170, q: 0, r: 1.3, s: 0, notch: true, st: -0.15, t: -0.35, qrsWide: 145 }
        },
        quiz: [
            {
                step: 'QRS-bredde',
                question: 'Hvad er QRS-kompleksets varighed?',
                options: [
                    'Breddeøget (≥ 120 ms / 3 små tern)',
                    'Normal bredde (< 120 ms)',
                    'Ekstremt smalt (< 60 ms)',
                    'Ikke målbart'
                ],
                correctIndex: 0,
                explanation: 'QRS måler ca. 145 ms (over 3.5 små tern). Et QRS-kompleks ≥ 120 ms definerer et komplet grenblok.'
            },
            {
                step: 'Morfologi i V1 og V6',
                question: 'Hvad karakteriserer QRS-morfologien i V1 og V6?',
                options: [
                    'Bred dyb QS/rS-kompleks i V1 og bred kærvet R-tak (M-form) i V6 uden Q-takker',
                    'Høj rsR\' (kaninører) i V1 og bred S-tak i V6',
                    'Korte spidse takker med normale ST-forhold',
                    'Delta-bølge foreneligt med WPW'
                ],
                correctIndex: 0,
                explanation: 'Dette er det klassiske LBBB-billede: bredt negativt udslag i V1 og bred kærvet R i V6 (WiLLiaM).'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'Venstresidigt grenblok (LBBB)',
                    'Højresidigt grenblok (RBBB)',
                    'Akut forvægsinfarkt',
                    'Ventrikulær takykardi'
                ],
                correctIndex: 0,
                explanation: 'Venstresidigt grenblok (LBBB). Husk altid at vurdere om blokket er kendt eller nyopstået ved brystsmerter.'
            }
        ]
    },
    {
        id: 'rbbb',
        title: 'Højresidigt Grenblok (RBBB)',
        subtitle: 'Bredt QRS (≥ 120 ms), rsR\' (kaninører) i V1, bred S i I og V6',
        category: 'Ledningsforstyrrelser',
        badge: 'Grenblok',
        description: '52-årig mand uden kardiale symptomer henvist af praktiserende læge til rutinevurdering.',
        heartRate: 74,
        rhythm: 'Sinusrytme',
        axis: 'Normal til let højredrejet (+85°)',
        prInterval: '160 ms',
        qrsDuration: '135 ms (≥ 120 ms)',
        qtc: '415 ms',
        territory: 'Højre grenbundt',
        affectedLeads: ['V1', 'V2', 'V6', 'I'],
        reciprocalLeads: [],
        anatomicalEffect: 'Ledningen i højre grenbundt er blokeret. Venstre ventrikel depolariserer først normalt, hvorefter aktiveringen spreder sig langsomt over til højre ventrikel. Den forsinkede højre ventrikel depolarisering skaber en sen anterior vektor (høj r\' i V1).',
        hamptonPearls: 'Husk Hamptons mnemoteknik "MaRRoW" for RBBB: R i midten. I V1 ses et M-formet QRS (rsR\' - ofte kaldet kaninører), og i V6 ses en bred, afrundet S-tak (W-formet afslutning). RBBB kan ses hos fuldkommen hjertesunde personer, men kan også skyldes højresidig belastning (fx lungeemboli eller ASD).',
        leads: {
            'I': { p: 0.1, pr: 160, q: 0, r: 0.8, s: -0.4, wideS: true, st: 0, t: 0.25 },
            'II': { p: 0.12, pr: 160, q: 0, r: 0.9, s: -0.2, st: 0, t: 0.3 },
            'III': { p: 0.06, pr: 160, q: 0, r: 0.5, s: -0.1, st: 0, t: 0.15 },
            'aVR': { p: -0.1, pr: 160, q: 0, r: 0.4, s: -0.5, wideR: true, st: 0, t: -0.2 },
            'aVL': { p: 0.08, pr: 160, q: 0, r: 0.5, s: -0.3, wideS: true, st: 0, t: 0.2 },
            'aVF': { p: 0.1, pr: 160, q: 0, r: 0.7, s: -0.15, st: 0, t: 0.25 },
            'V1': { p: 0.08, pr: 160, q: 0, r: 0.35, s: -0.2, rPrime: 1.1, st: -0.1, t: -0.25, qrsWide: 135 },
            'V2': { p: 0.1, pr: 160, q: 0, r: 0.4, s: -0.25, rPrime: 0.9, st: -0.05, t: -0.15, qrsWide: 135 },
            'V3': { p: 0.1, pr: 160, q: 0, r: 0.7, s: -0.3, st: 0, t: 0.2, qrsWide: 135 },
            'V4': { p: 0.12, pr: 160, q: -0.05, r: 1.1, s: -0.3, wideS: true, st: 0, t: 0.35, qrsWide: 135 },
            'V5': { p: 0.12, pr: 160, q: -0.06, r: 1.2, s: -0.4, wideS: true, st: 0, t: 0.35, qrsWide: 135 },
            'V6': { p: 0.1, pr: 160, q: -0.05, r: 1.0, s: -0.45, wideS: true, st: 0, t: 0.3, qrsWide: 135 }
        },
        quiz: [
            {
                step: 'V1 Morfologi',
                question: 'Hvilket karakteristisk mønster ses i afledning V1?',
                options: [
                    'rsR\' med to positive spidser ("kaninører")',
                    'Dyb QS-takt uden R-tak',
                    'ST-elevation på 5 mm',
                    'Savtaksformede flutterbølger'
                ],
                correctIndex: 0,
                explanation: 'I V1 ses det klassiske rsR\'-mønster, hvor den anden positive spids (R\') repræsenterer den forsinkede depolarisering af højre ventrikel.'
            },
            {
                step: 'V6 & I Morfologi',
                question: 'Hvad ses i de laterale afledninger I og V6?',
                options: [
                    'Bred, sløret S-tak som følge af forsinket højre ventrikel aktivering',
                    'Patologiske Q-takker',
                    'ST-elevation',
                    'Fuldstændig fravær af S-takker'
                ],
                correctIndex: 0,
                explanation: 'Når den forsinkede aktivering bevæger sig mod højre ventrikel, bevæger den sig væk fra de venstresidige afledninger I og V6, hvilket danner en bred, dyb S-tak.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'Højresidigt grenblok (RBBB)',
                    'Venstresidigt grenblok (LBBB)',
                    'Akut posterior infarkt',
                    'Brugada syndrom'
                ],
                correctIndex: 0,
                explanation: 'Højresidigt grenblok (RBBB) med QRS ≥ 120 ms, rsR\' i V1 og bred S-tak i I/V6.'
            }
        ]
    },
    {
        id: 'afib',
        title: 'Atrieflimren (A-flimren)',
        subtitle: 'Uregelmæssigt uregelmæssig rytme, manglende P-takker, flimrelinje',
        category: 'Supraventrikulære Rytmer',
        badge: 'Arytmi',
        description: '68-årig mand henvendt med pludseligt indsættende uregelmæssig hjertebanken, uro i brystet og let svimmelhed.',
        heartRate: 115,
        rhythm: 'Uregelmæssigt uregelmæssig (arrhythmia absoluta)',
        axis: 'Normal akse (+50°)',
        prInterval: 'Ikke til stede (ingen P-takker)',
        qrsDuration: '85 ms (smalkomplekset)',
        qtc: 'Vanskeligt at måle pga. varierende RR',
        territory: 'Atrier (kaotisk mikro-reentry)',
        affectedLeads: ['Alle'],
        reciprocalLeads: [],
        anatomicalEffect: 'Kaotisk elektrisk aktivitet i atrierne med frekvens på 400-600/min. AV-knuden fungerer som filter og overleder kun en brøkdel af impulserne uregelmæssigt til ventriklerne.',
        hamptonPearls: 'Hampton skriver: "Atrieflimren kendes på to kardinaltegn: 1) Fuldstændig uregelmæssig afstand mellem R-takkerne (uregelmæssigt uregelmæssig). 2) Ingen identificerbare P-takker på grundlinjen – i stedet ses en fin eller grov flimrelinje (f-bølger), bedst synlig i V1 og II."',
        leads: {
            'I': { p: 0, pr: 0, q: -0.05, r: 0.7, s: -0.1, st: 0, t: 0.25, afib: true },
            'II': { p: 0, pr: 0, q: -0.05, r: 1.0, s: -0.15, st: 0, t: 0.35, afib: true },
            'III': { p: 0, pr: 0, q: 0, r: 0.5, s: -0.1, st: 0, t: 0.15, afib: true },
            'aVR': { p: 0, pr: 0, q: 0, r: 0.15, s: -0.8, st: 0, t: -0.25, afib: true },
            'aVL': { p: 0, pr: 0, q: -0.05, r: 0.5, s: -0.1, st: 0, t: 0.2, afib: true },
            'aVF': { p: 0, pr: 0, q: -0.05, r: 0.8, s: -0.1, st: 0, t: 0.3, afib: true },
            'V1': { p: 0, pr: 0, q: 0, r: 0.25, s: -0.7, st: 0, t: 0.15, afib: true, coarseF: true },
            'V2': { p: 0, pr: 0, q: 0, r: 0.5, s: -0.9, st: 0, t: 0.35, afib: true },
            'V3': { p: 0, pr: 0, q: -0.05, r: 0.8, s: -0.5, st: 0, t: 0.4, afib: true },
            'V4': { p: 0, pr: 0, q: -0.05, r: 1.3, s: -0.2, st: 0, t: 0.45, afib: true },
            'V5': { p: 0, pr: 0, q: -0.08, r: 1.2, s: -0.15, st: 0, t: 0.35, afib: true },
            'V6': { p: 0, pr: 0, q: -0.06, r: 0.95, s: -0.1, st: 0, t: 0.3, afib: true }
        },
        quiz: [
            {
                step: 'Rytmeanalyse',
                question: 'Hvad kendetegner rytmen på denne strimmel?',
                options: [
                    'Uregelmæssigt uregelmæssig rytme uden synlige P-takker',
                    'Regelmæssig sinusrytme med ekstrasystoler',
                    'Regelmæssig takykardi med savtaks-bølger',
                    'Ventrikelrytme med AV-dissociation'
                ],
                correctIndex: 0,
                explanation: 'RR-intervallerne varierer fuldstændigt uden fast mønster, og grundlinjen udviser uregelmæssige små svingninger uden veldefinerede P-takker.'
            },
            {
                step: 'Klinisk Prioritet',
                question: 'Hvad er den vigtigste langsigtede medicinske overvejelse ved atrieflimren?',
                options: [
                    'Antikoagulationsbehandling (AK-behandling vurderet ud fra CHA2DS2-VASc score) for at forebygge iskæmisk apopleksi',
                    'Umiddelbar hjertekirurgi',
                    'Seponering af al væske',
                    'Ingen behandling nødvendig'
                ],
                correctIndex: 0,
                explanation: 'Ved atrieflimren er atrierne mekanisk ineffektive, hvilket disponerer for trombedannelse i venstre atrieaurikel med høj risiko for cerebral emboli. CHA2DS2-VASc scoren afgør indikationen for AK-behandling.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'Atrieflimren med hurtig ventrikelaktion (A-flimren)',
                    'Sinusarytmi',
                    'Atrieflagren med variabel blokering',
                    'Ventrikulær takykardi'
                ],
                correctIndex: 0,
                explanation: 'Atrieflimren (A-flimren).'
            }
        ]
    },
    {
        id: 'aflutter',
        title: 'Atrieflagren (A-flagren)',
        subtitle: 'Klassisk savtaks-mønster (F-bølger ~300/min) med 2:1 AV-blok',
        category: 'Supraventrikulære Rytmer',
        badge: 'Arytmi',
        description: '64-årig kvinde med pludselig hjertebanken. Pulsen er præcis 150 slag/min og fuldstændig regelmæssig.',
        heartRate: 150,
        rhythm: 'Regelmæssig med 2:1 blokering',
        axis: 'Normal akse (+65°)',
        prInterval: 'Erstattes af F-bølger',
        qrsDuration: '80 ms (smalkomplekset)',
        qtc: 'Normal',
        territory: 'Højre atrie (makro-reentry omkring cavotrikuspidale isthmus)',
        affectedLeads: ['II', 'III', 'aVF', 'V1'],
        reciprocalLeads: [],
        anatomicalEffect: 'Makro-reentry bølge løber typisk mod uret i højre atrium med ca. 300 omgange/minut. AV-knuden lader hver anden impuls passere (2:1 blok), hvilket giver en ventrikelfrekvens på præcis 150/min.',
        hamptonPearls: 'Hampton fremhæver en gylden kardiologisk tommelfingerregel: "Når du ser en regelmæssig smalkomplekset takykardi med en ventrikelfrekvens på nøjagtigt 150/min, skal du ALTID tænke på atrieflagren med 2:1 overledning indtil det modsatte er bevist!" Se efter de negative savtænder i II, III og aVF.',
        leads: {
            'I': { p: 0, pr: 0, q: -0.05, r: 0.7, s: -0.1, st: 0, t: 0.2, flutter: true },
            'II': { p: 0, pr: 0, q: 0, r: 0.9, s: -0.1, st: 0, t: 0.2, flutter: true, flutterAmp: -0.2 },
            'III': { p: 0, pr: 0, q: 0, r: 0.6, s: -0.1, st: 0, t: 0.15, flutter: true, flutterAmp: -0.25 },
            'aVR': { p: 0, pr: 0, q: 0, r: 0.15, s: -0.7, st: 0, t: -0.2, flutter: true, flutterAmp: 0.2 },
            'aVL': { p: 0, pr: 0, q: -0.05, r: 0.4, s: -0.1, st: 0, t: 0.15, flutter: true },
            'aVF': { p: 0, pr: 0, q: 0, r: 0.75, s: -0.1, st: 0, t: 0.2, flutter: true, flutterAmp: -0.22 },
            'V1': { p: 0, pr: 0, q: 0, r: 0.3, s: -0.6, st: 0, t: 0.15, flutter: true, flutterV1Positive: true },
            'V2': { p: 0, pr: 0, q: 0, r: 0.5, s: -0.8, st: 0, t: 0.25, flutter: true },
            'V3': { p: 0, pr: 0, q: -0.05, r: 0.8, s: -0.5, st: 0, t: 0.3, flutter: true },
            'V4': { p: 0, pr: 0, q: -0.05, r: 1.2, s: -0.2, st: 0, t: 0.35, flutter: true },
            'V5': { p: 0, pr: 0, q: -0.06, r: 1.1, s: -0.15, st: 0, t: 0.3, flutter: true },
            'V6': { p: 0, pr: 0, q: -0.05, r: 0.9, s: -0.1, st: 0, t: 0.25, flutter: true }
        },
        quiz: [
            {
                step: 'Grundlinje Karakteristika',
                question: 'Hvilket karakteristisk mønster ses på grundlinjen mellem QRS-komplekserne i afledning II, III og aVF?',
                options: [
                    'Savtaks-formede F-bølger med en frekvens på ca. 300/min',
                    'Helt flad isoelektrisk linje',
                    'Spidse teltformede T-takker',
                    'Breddeøgede P-takker med hak'
                ],
                correctIndex: 0,
                explanation: 'I de inferiore afledninger (II, III, aVF) ses de klassiske "savtænder" (flutterbølger), som løber med en konstant frekvens på ca. 300/min.'
            },
            {
                step: 'Ventrikelfrekvens',
                question: 'Hvorfor er ventrikelfrekvensen præcis 150/min?',
                options: [
                    'Fordi AV-knuden filtrerer impulserne med et fysiologisk 2:1 blok (300 / 2 = 150/min)',
                    'Fordi sinusknuden affyrer med 150/min',
                    'Pga. ventrikulær ekstrasystoli',
                    'Det er et tilfældigt sammentræf'
                ],
                correctIndex: 0,
                explanation: 'AV-knuden kan fysiologisk ikke overlede 300 impulser i minuttet til ventriklerne, men overleder typisk præcis hver anden impuls (2:1 blokering).'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'Atrieflagren med 2:1 overledning',
                    'Sinustakykardi',
                    'Ventrikulær takykardi (VT)',
                    'Total AV-blok'
                ],
                correctIndex: 0,
                explanation: 'Atrieflagren med 2:1 overledning.'
            }
        ]
    },
    {
        id: 'vt',
        title: 'Ventrikulær Takykardi (VT)',
        subtitle: 'Bredkomplekset regelmæssig monomorf takykardi (> 120 ms), frekvens ~160/min',
        category: 'Ventrikulære Rytmer',
        badge: 'Akut Livstruende',
        description: '70-årig mand med tidligere AMI, pludselig svær svimmelhed, koldsved og blodtryk på 85/55 mmHg.',
        heartRate: 160,
        rhythm: 'Regelmæssig bredkomplekset takykardi',
        axis: 'Ekstrem akse (-120° / Nordvest-akse)',
        prInterval: 'Dissocieret (AV-dissociation)',
        qrsDuration: '160 ms (kraftigt breddeøget)',
        qtc: 'Ikke beregnelig',
        territory: 'Ventrikulært myokardium (reentry omkring arvæv)',
        affectedLeads: ['Alle'],
        reciprocalLeads: [],
        anatomicalEffect: 'Ektopisk fokus eller reentry-kredsløb i ventrikelvæggen affyrer uafhængigt af atrierne. Impulsen breder sig langsomt gennem myokardiet uden om ledningssystemet, hvilket giver meget brede, bizarre QRS-komplekser.',
        hamptonPearls: 'Hampton understreger: "En bredkomplekset takykardi (QRS > 120 ms) skal ALTID behandles som Ventrikulær Takykardi (VT) indtil det modsatte er bevist – især hos patienter med kendt hjertesygdom eller tidligere AMI!" Læg mærke til AV-dissociation, fusionsslag og fravær af typisk grenbloksmønster.',
        leads: {
            'I': { p: 0, pr: 0, q: 0, r: 0.2, s: -1.4, st: 0.2, t: 0.4, vt: true, qrsWide: 160 },
            'II': { p: 0, pr: 0, q: 0, r: 0.2, s: -1.6, st: 0.25, t: 0.45, vt: true, qrsWide: 160 },
            'III': { p: 0, pr: 0, q: 0, r: 0.1, s: -1.3, st: 0.2, t: 0.4, vt: true, qrsWide: 160 },
            'aVR': { p: 0, pr: 0, q: 0, r: 1.4, s: -0.2, st: -0.2, t: -0.4, vt: true, qrsWide: 160 },
            'aVL': { p: 0, pr: 0, q: 0, r: 0.3, s: -1.1, st: 0.15, t: 0.35, vt: true, qrsWide: 160 },
            'aVF': { p: 0, pr: 0, q: 0, r: 0.15, s: -1.5, st: 0.22, t: 0.42, vt: true, qrsWide: 160 },
            'V1': { p: 0, pr: 0, q: 0, r: 1.6, s: -0.3, st: -0.25, t: -0.5, vt: true, qrsWide: 160 },
            'V2': { p: 0, pr: 0, q: 0, r: 1.8, s: -0.2, st: -0.3, t: -0.6, vt: true, qrsWide: 160 },
            'V3': { p: 0, pr: 0, q: 0, r: 1.7, s: -0.2, st: -0.28, t: -0.55, vt: true, qrsWide: 160 },
            'V4': { p: 0, pr: 0, q: 0, r: 1.5, s: -0.2, st: -0.25, t: -0.5, vt: true, qrsWide: 160 },
            'V5': { p: 0, pr: 0, q: 0, r: 1.4, s: -0.2, st: -0.22, t: -0.45, vt: true, qrsWide: 160 },
            'V6': { p: 0, pr: 0, q: 0, r: 1.2, s: -0.2, st: -0.2, t: -0.4, vt: true, qrsWide: 160 }
        },
        quiz: [
            {
                step: 'QRS-bredde & Rytme',
                question: 'Hvad er de grundlæggende kendetegn ved denne rytme?',
                options: [
                    'Bredkomplekset (QRS > 120 ms), regelmæssig takykardi med frekvens ~160/min',
                    'Smalkomplekset uregelmæssig takykardi',
                    'Normal sinusrytme',
                    'AV-blok grad 1'
                ],
                correctIndex: 0,
                explanation: 'QRS-komplekserne er kraftigt udvidede (ca. 160 ms) og kommer regelmæssigt med hurtig frekvens, hvilket opfylder kriterierne for bredkomplekset takykardi.'
            },
            {
                step: 'Klinisk Tommelfingerregel',
                question: 'Hvordan skal en regelmæssig bredkomplekset takykardi altid betragtes i akutmodtagelsen, indtil det modsatte er bevist?',
                options: [
                    'Som Ventrikulær Takykardi (VT)',
                    'Som harmløs sinustakykardi',
                    'Som psykogen angst-reaktion',
                    'Som atrieflimren'
                ],
                correctIndex: 0,
                explanation: 'Over 80-90% af alle bredkomplekse takykardier er VT. At fejlfortolke VT som SVT med aberration og give Verapamil kan udløse hæmodynamisk kollaps og hjertestop.'
            },
            {
                step: 'Diagnose & Behandling',
                question: 'Hvad er diagnosen og den akutte handling ved en påvirket patient med BT 85/55?',
                options: [
                    'Ventrikulær Takykardi (VT) - Akut synkroniseret DC-konvertering',
                    'Sinustakykardi - Afvent',
                    'Grenblok - Giv paracetamol',
                    'Atrieflagren - Send til øjenlæge'
                ],
                correctIndex: 0,
                explanation: 'Monomorf ventrikulær takykardi hos en hæmodynamisk ustabil patient (lavt blodtryk). Behandlingen er omgående synkroniseret DC-stød i sedation/narkose.'
            }
        ]
    },
    {
        id: 'vf',
        title: 'Ventrikelflimren (VF)',
        subtitle: 'Kaotisk, uregelmæssig bølgeaktivitet uden identificerbare QRS-komplekser',
        category: 'Ventrikulære Rytmer',
        badge: 'Hjertestop',
        description: '59-årig mand falder pludseligt om i venteværelset. Ikke kontaktbar, ingen palpabel puls, ingen normal respiration.',
        heartRate: 0,
        rhythm: 'Kaotisk ventrikelflimren',
        axis: 'Ubestemmelig',
        prInterval: 'Ingen',
        qrsDuration: 'Ingen identificerbare QRS',
        qtc: 'Ingen',
        territory: 'Hele ventrikelmyokardiet',
        affectedLeads: ['Alle'],
        reciprocalLeads: [],
        anatomicalEffect: 'Myokardiet i begge ventrikler kontraherer fuldstændig usynkront i små fragmenterede bølger. Der er intet slagvolumen (hjertestop med nul cardiac output).',
        hamptonPearls: 'Hampton skriver: "Ventrikelflimren er den ultimative kardiologiske nødsituation. EKG\'et viser kaotiske svingninger af varierende højde og form uden P, QRS eller T. Behandlingen er én: Umiddelbar defibrillering og HLR."',
        leads: {
            'I': { vf: true, amp: 0.4 },
            'II': { vf: true, amp: 0.6 },
            'III': { vf: true, amp: 0.5 },
            'aVR': { vf: true, amp: 0.45 },
            'aVL': { vf: true, amp: 0.35 },
            'aVF': { vf: true, amp: 0.55 },
            'V1': { vf: true, amp: 0.5 },
            'V2': { vf: true, amp: 0.7 },
            'V3': { vf: true, amp: 0.65 },
            'V4': { vf: true, amp: 0.6 },
            'V5': { vf: true, amp: 0.5 },
            'V6': { vf: true, amp: 0.45 }
        },
        quiz: [
            {
                step: 'Rytmegenkendelse',
                question: 'Hvad viser denne EKG-kurve?',
                options: [
                    'Ventrikelflimren (VF) - Kaotisk rytme uden identificerbare QRS-komplekser',
                    'Atrieflimren med hurtig overledning',
                    'Udtalt muskelrysten/artefakter hos en vågen patient',
                    'Normal sinusrytme'
                ],
                correctIndex: 0,
                explanation: 'Fuldstændig kaotiske bølger uden QRS-komplekser, foreneligt med ventrikelflimren.'
            },
            {
                step: 'Akut Handling',
                question: 'Hvad er den omgående livsreddende handling?',
                options: [
                    'Start basal HLR (30:2) og afgiv omgående asynkront DC-stød (defibrillering)',
                    'Giv 1 liter saltvand intravenøst',
                    'Optag et nyt 12-aflednings EKG for at bekræfte',
                    'Tag en arteriepunktur'
                ],
                correctIndex: 0,
                explanation: 'VF er en støtbar hjertestoprytme. Hver minuts forsinkelse af defibrillering reducerer overlevelseschancen med ca. 10%.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'Ventrikelflimren (VF)',
                    'Asystoli',
                    'Atrieflagren',
                    'Sinusbradykardi'
                ],
                correctIndex: 0,
                explanation: 'Ventrikelflimren (VF).'
            }
        ]
    },
    {
        id: 'long_qtc',
        title: 'Medicin-induceret Forlænget QTc',
        subtitle: 'Forlænget QTc (525 ms) under behandling med psykofarmaka (citalopram)',
        category: 'Elektrolytter & Medicin',
        badge: 'Psykofarmaka / QTc',
        description: '45-årig kvinde i behandling med Citalopram 40 mg dgl. samt Quetiapin 100 mg til natten. Rutine-EKG bestilt af psykiater forud for dosisjustering.',
        heartRate: 62,
        rhythm: 'Sinusrytme',
        axis: 'Normal akse (+50°)',
        prInterval: '165 ms',
        qrsDuration: '85 ms (smalt)',
        qtc: '525 ms (Kritisk forlænget: > 500 ms)',
        territory: 'Ventrikulær repolarisering (IKr-kaliumkanal blokade)',
        affectedLeads: ['Alle, tydeligst i II og V3-V5'],
        reciprocalLeads: [],
        anatomicalEffect: 'Blokering af hERG/IKr kaliumkanaler i ventrikelmyocytterne forsinker udstrømningen af kalium under fase 3 repolarisering. Dette forlænger aktionspotentialets varighed og skaber risiko for tidlige efterdepolariseringer (EADs), der kan trigge Torsades de Pointes.',
        hamptonPearls: 'Hampton understreger: "QT-intervallet skal altid korrigeres for hjertefrekvensen (QTc). En simpel klinisk tommelfingerregel er, at ved normal puls (omkring 60-70/min) bør T-takken altid være afsluttet inden halvvejen til den næste R-tak!" Når QTc overstiger 500 ms, er risikoen for Torsades de Pointes og pludselig død mangedoblet.',
        leads: {
            'I': { p: 0.12, pr: 165, q: -0.05, r: 0.75, s: -0.1, st: 0, t: 0.35, qtProlonged: true },
            'II': { p: 0.16, pr: 165, q: -0.05, r: 1.1, s: -0.15, st: 0, t: 0.45, qtProlonged: true },
            'III': { p: 0.08, pr: 165, q: 0, r: 0.45, s: -0.1, st: 0, t: 0.2, qtProlonged: true },
            'aVR': { p: -0.14, pr: 165, q: 0, r: 0.15, s: -0.85, st: 0, t: -0.3, qtProlonged: true },
            'aVL': { p: 0.08, pr: 165, q: -0.05, r: 0.45, s: -0.1, st: 0, t: 0.2, qtProlonged: true },
            'aVF': { p: 0.12, pr: 165, q: -0.05, r: 0.8, s: -0.1, st: 0, t: 0.32, qtProlonged: true },
            'V1': { p: 0.08, pr: 165, q: 0, r: 0.25, s: -0.8, st: 0, t: 0.15, qtProlonged: true },
            'V2': { p: 0.1, pr: 165, q: 0, r: 0.5, s: -1.0, st: 0, t: 0.4, qtProlonged: true },
            'V3': { p: 0.12, pr: 165, q: -0.05, r: 0.85, s: -0.6, st: 0, t: 0.48, qtProlonged: true },
            'V4': { p: 0.14, pr: 165, q: -0.05, r: 1.3, s: -0.25, st: 0, t: 0.52, qtProlonged: true },
            'V5': { p: 0.12, pr: 165, q: -0.08, r: 1.2, s: -0.15, st: 0, t: 0.42, qtProlonged: true },
            'V6': { p: 0.1, pr: 165, q: -0.06, r: 0.95, s: -0.1, st: 0, t: 0.35, qtProlonged: true }
        },
        quiz: [
            {
                step: 'Intervalmåling',
                question: 'Hvad observeres ved vurdering af QT-intervallet i forhold til RR-intervallet?',
                options: [
                    'T-takken slutter markant efter midtpunktet af RR-intervallet (forlænget QT)',
                    'T-takken slutter i god tid før midtpunktet af RR-intervallet (normalt)',
                    'QT-intervallet er patologisk forkortet (< 300 ms)',
                    'Der er ingen T-takker'
                ],
                correctIndex: 0,
                explanation: 'Når T-takken strækker sig forbi halvvejen af RR-intervallet ved en hjertefrekvens omkring 60/min, er QTc klinisk sikkert forlænget (her målt til 525 ms).'
            },
            {
                step: 'Klinisk Håndtering i Psykiatrien',
                question: 'Hvad er den korrekte kliniske konsekvens, når QTc er > 500 ms ifølge Dansk Psykiatrisk Selskab?',
                options: [
                    'Dosisreduktion eller udtrapning af det QT-forlængende præparat (citalopram), tjekke elektrolytter (kalium, magnesium) og genoptage EKG',
                    'Øge dosis af citalopram',
                    'Ingen handling, 525 ms er normalt',
                    'Udskrive patienten til egen læge uden opfølgning'
                ],
                correctIndex: 0,
                explanation: 'En QTc-værdi > 500 ms (eller stigning > 60 ms fra baseline) udgør en rød advarselstrekant i psykiatrien. Man skal reducere/seponere det udløsende lægemiddel, korrigere evt. hypokaliæmi/hypomagnesiæmi og kontrollere EKG.'
            },
            {
                step: 'Arytmirisiko',
                question: 'Hvilken specifik, livstruende polymorf ventrikulær arytmi kan udløses af udtalt forlænget QTc?',
                options: [
                    'Torsades de Pointes',
                    'Atrieflimren',
                    'AV-blok grad 1',
                    'Sinusbradykardi'
                ],
                correctIndex: 0,
                explanation: 'Torsades de Pointes ("spidsernes dans") er en potentielt fatal form for ventrikulær takykardi, der opstår på baggrund af forlænget ventrikulær repolarisering.'
            }
        ]
    },
    {
        id: 'hyperkalemia',
        title: 'Hyperkaliæmi',
        subtitle: 'Høje, spidse "teltede" T-takker, affladet P-tak og breddeøget QRS',
        category: 'Elektrolytter & Medicin',
        badge: 'Elektrolytforstyrrelse',
        description: '62-årig mand med kendt kronisk nyresvigt indlagt med udtalt muskelsvaghed, paræstesier og svag puls. Serum-kalium måles til 7.8 mmol/L.',
        heartRate: 58,
        rhythm: 'Sinusbradykardi / sinoventrikulær ledning',
        axis: 'Venstredrejet akse (-30°)',
        prInterval: '240 ms (forlænget) / næsten udslettet P-tak',
        qrsDuration: '130 ms (diffust breddeøget)',
        qtc: 'Kort ST-segment, men bred QRS',
        territory: 'Diffus cellulær membranpåvirkning',
        affectedLeads: ['Alle, særligt V2-V5'],
        reciprocalLeads: [],
        anatomicalEffect: 'Ekstracellulær kaliumophobning depolariserer hvilemembranpotentialet mod nul. Dette inaktiverer spændingsstyrede natriumkanaler (langsom ledning = bred QRS og flad P) og øger membranens kaliumkonduktans i fase 3 (hurtig repolarisering = høje spidse T-takker).',
        hamptonPearls: 'Hampton advarer: "Hyperkaliæmi er den store EKG-kamæleon og en akut kardiologisk dræber! Første tegn er høje, symmetriske, spidse T-takker (\'teltede T-takker\'). Derefter forsvinder P-takken, QRS-komplekset flyder ud i en sinuskurve, og uden akut kaliumsænkende behandling og calciumgluconat indtræder asystoli eller ventrikelflimren."',
        leads: {
            'I': { p: 0.04, pr: 240, q: 0, r: 0.6, s: -0.25, st: 0, t: 0.65, peakedT: true, qrsWide: 130 },
            'II': { p: 0.05, pr: 240, q: 0, r: 0.7, s: -0.3, st: 0, t: 0.85, peakedT: true, qrsWide: 130 },
            'III': { p: 0.02, pr: 240, q: 0, r: 0.3, s: -0.4, st: 0, t: 0.5, peakedT: true, qrsWide: 130 },
            'aVR': { p: -0.04, pr: 240, q: 0, r: 0.2, s: -0.5, st: 0, t: -0.6, peakedT: true, qrsWide: 130 },
            'aVL': { p: 0.03, pr: 240, q: 0, r: 0.4, s: -0.2, st: 0, t: 0.45, peakedT: true, qrsWide: 130 },
            'aVF': { p: 0.04, pr: 240, q: 0, r: 0.5, s: -0.3, st: 0, t: 0.7, peakedT: true, qrsWide: 130 },
            'V1': { p: 0.03, pr: 240, q: 0, r: 0.2, s: -0.9, st: 0, t: 0.6, peakedT: true, qrsWide: 130 },
            'V2': { p: 0.04, pr: 240, q: 0, r: 0.4, s: -1.2, st: 0, t: 1.4, peakedT: true, qrsWide: 130 },
            'V3': { p: 0.04, pr: 240, q: 0, r: 0.6, s: -0.9, st: 0, t: 1.5, peakedT: true, qrsWide: 130 },
            'V4': { p: 0.04, pr: 240, q: 0, r: 0.9, s: -0.5, st: 0, t: 1.3, peakedT: true, qrsWide: 130 },
            'V5': { p: 0.04, pr: 240, q: 0, r: 0.8, s: -0.3, st: 0, t: 1.0, peakedT: true, qrsWide: 130 },
            'V6': { p: 0.03, pr: 240, q: 0, r: 0.7, s: -0.2, st: 0, t: 0.75, peakedT: true, qrsWide: 130 }
        },
        quiz: [
            {
                step: 'T-taks Morfologi',
                question: 'Hvad er det mest iøjnefaldende træk ved T-takkerne i V2-V4?',
                options: [
                    'Ekstremt høje, symmetriske og spidse ("teltede") T-takker',
                    'Flade eller inverterede T-takker',
                    'U-takker',
                    'Normale T-takker'
                ],
                correctIndex: 0,
                explanation: 'Spidse, teltformede T-takker med smal basis er det klassiske tidlige EKG-tegn på hyperkaliæmi.'
            },
            {
                step: 'Akut Membranstabilisering',
                question: 'Hvad er den første akutte medicinske intervention ved hyperkaliæmi med EKG-forandringer for at beskytte myokardiet?',
                options: [
                    'Intravenøs Calciumchlorid eller Calciumgluconat',
                    'Insulin-glukose drop alene',
                    'Resonium peroralt',
                    'Kaliumchlorid infusion'
                ],
                correctIndex: 0,
                explanation: 'Calcium modvirker ikke kaliumkoncentrationen i blodet direkte, men stabiliserer hjertemyocytternes tærskelpotentiale inden for få minutter og afværger akut hjertestop.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'Hyperkaliæmi',
                    'Hypokaliæmi',
                    'Normalt EKG',
                    'Brugada syndrom'
                ],
                correctIndex: 0,
                explanation: 'Hyperkaliæmi med udtalte EKG-forandringer (teltede T-takker, affladet P, bred QRS).'
            }
        ]
    },
    {
        id: 'pericarditis',
        title: 'Akut Perikarditis',
        subtitle: 'Udbredte konkave ("hængekøje"-formede) ST-elevationer og PR-depression',
        category: 'Iskæmi & Infarkt',
        badge: 'Inflammation',
        description: '24-årig mand med skarpe stikkende brystsmerter, der forværres ved dyb inspiration og rygleje, men lindres ved foroverbøjning. Nylig viral luftvejsinfektion.',
        heartRate: 85,
        rhythm: 'Sinusrytme',
        axis: 'Normal akse (+55°)',
        prInterval: '140 ms (med PR-depression i II, aVF, V4-V6)',
        qrsDuration: '80 ms',
        qtc: '410 ms',
        territory: 'Udbredt epikardium / perikardium',
        affectedLeads: ['I, II, aVL, aVF, V2-V6'],
        reciprocalLeads: ['aVR (har reciprok ST-depression og PR-elevation)'],
        anatomicalEffect: 'Inflammation i det viscerale og parietale blad af hjertesækken (pericardium) medfører udbredt subepikardial skadestrøm over store dele af begge ventrikler.',
        hamptonPearls: 'Hampton understreger: "Hvordan adskiller man akut perikarditis fra et akut STEMI? 1) Ved perikarditis er ST-elevationerne udbredte på tværs af flere koronarterritorier (både forvæg, lateralt og inferiort). 2) Formen er konkav opad (\'hængekøje\'). 3) Der er PR-segment depression. 4) Den eneste reciprokke afledning er aVR (som viser ST-depression og PR-elevation)."',
        leads: {
            'I': { p: 0.1, pr: 140, prDep: -0.05, q: 0, r: 0.7, s: -0.1, st: 0.15, t: 0.35, stShape: 'concave' },
            'II': { p: 0.14, pr: 140, prDep: -0.08, q: 0, r: 1.0, s: -0.15, st: 0.25, t: 0.45, stShape: 'concave' },
            'III': { p: 0.08, pr: 140, prDep: -0.04, q: 0, r: 0.45, s: -0.1, st: 0.12, t: 0.25, stShape: 'concave' },
            'aVR': { p: -0.12, pr: 140, prDep: 0.08, q: 0, r: 0.15, s: -0.8, st: -0.15, t: -0.25 },
            'aVL': { p: 0.06, pr: 140, prDep: -0.04, q: 0, r: 0.45, s: -0.1, st: 0.12, t: 0.25, stShape: 'concave' },
            'aVF': { p: 0.12, pr: 140, prDep: -0.06, q: 0, r: 0.75, s: -0.15, st: 0.2, t: 0.38, stShape: 'concave' },
            'V1': { p: 0.08, pr: 140, prDep: 0, q: 0, r: 0.25, s: -0.75, st: 0.05, t: 0.2 },
            'V2': { p: 0.1, pr: 140, prDep: -0.05, q: 0, r: 0.5, s: -0.9, st: 0.25, t: 0.45, stShape: 'concave' },
            'V3': { p: 0.12, pr: 140, prDep: -0.06, q: 0, r: 0.8, s: -0.6, st: 0.3, t: 0.5, stShape: 'concave' },
            'V4': { p: 0.14, pr: 140, prDep: -0.07, q: 0, r: 1.2, s: -0.25, st: 0.28, t: 0.52, stShape: 'concave' },
            'V5': { p: 0.12, pr: 140, prDep: -0.06, q: 0, r: 1.1, s: -0.15, st: 0.22, t: 0.45, stShape: 'concave' },
            'V6': { p: 0.1, pr: 140, prDep: -0.05, q: 0, r: 0.9, s: -0.1, st: 0.18, t: 0.38, stShape: 'concave' }
        },
        quiz: [
            {
                step: 'ST-segment Fordeling',
                question: 'Hvad er bemærkelsesværdigt ved fordelingen af ST-elevationerne?',
                options: [
                    'De er udbredte i næsten alle afledninger (I, II, aVF, V2-V6) og ikke begrænset til ét koronarterritorium',
                    'De ses kun i V1-V2',
                    'De ses udelukkende i afledning III',
                    'Der er ingen elevationer'
                ],
                correctIndex: 0,
                explanation: 'Udbredte, saddelformede (konkave) ST-elevationer i mange afledninger uden reciprokke depressioner (bortset fra aVR) er det klassiske EKG-mønster ved perikarditis.'
            },
            {
                step: 'PR-segment forandring',
                question: 'Hvilken specifik forandring ses forud for QRS-komplekset?',
                options: [
                    'PR-segment depression i de fleste afledninger og PR-elevation i aVR',
                    'Konstant forlænget PR uden depression',
                    'Udfald af P-takker',
                    'Høje P-mitrale takker'
                ],
                correctIndex: 0,
                explanation: 'PR-depression skyldes atrie-epikarditis og er et meget specifikt tegn på akut perikarditis.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'Akut Perikarditis',
                    'Akut Anterior STEMI',
                    'Venstresidigt grenblok',
                    'Normalvariant'
                ],
                correctIndex: 0,
                explanation: 'Akut Perikarditis.'
            }
        ]
    },
    {
        id: 'av_block_1',
        title: 'AV-blok 1. grad',
        subtitle: 'Konstant forlænget PR-interval (> 200 ms / 5 små tern) uden bortfald',
        category: 'Ledningsforstyrrelser',
        badge: 'AV-blok',
        description: '72-årig kvinde henvist til rutine-EKG før opstart af behandling mod depression. Ingen svimmelhed eller synkoper.',
        heartRate: 65,
        rhythm: 'Regelmæssig sinusrytme',
        axis: 'Normal akse (+40°)',
        prInterval: '280 ms (udtalt forlænget, normal < 200 ms)',
        qrsDuration: '80 ms (normalt smalt QRS)',
        qtc: '410 ms',
        territory: 'AV-knuden',
        affectedLeads: ['Alle afledninger med synlig P-tak'],
        reciprocalLeads: [],
        anatomicalEffect: 'Abnorm fysiologisk forsinkelse af impulsledningen gennem AV-knuden, men hver enkelt P-tak overledes fortsat til ventriklerne (1:1 overledning).',
        hamptonPearls: 'Hampton understreger: "AV-blok 1. grad er egentlig ikke et sandt blok, men en forsinkelse. Hver P-tak følges af et QRS-kompleks, men afstanden er mere end ét stort tern (> 0.20 s). Det er ofte godartet, men kan være tegn på medicinpåvirkning (betablokkere, verapamil, digoxin) eller iskæmi i RCA."',
        leads: {
            'I': { p: 0.12, pr: 280, q: -0.05, r: 0.8, s: -0.1, st: 0, t: 0.35 },
            'II': { p: 0.18, pr: 280, q: -0.05, r: 1.1, s: -0.15, st: 0, t: 0.45 },
            'III': { p: 0.08, pr: 280, q: 0, r: 0.5, s: -0.1, st: 0, t: 0.2 },
            'aVR': { p: -0.15, pr: 280, q: 0, r: 0.15, s: -0.85, st: 0, t: -0.3 },
            'aVL': { p: 0.08, pr: 280, q: -0.05, r: 0.5, s: -0.1, st: 0, t: 0.25 },
            'aVF': { p: 0.14, pr: 280, q: -0.05, r: 0.8, s: -0.1, st: 0, t: 0.35 },
            'V1': { p: 0.08, pr: 280, q: 0, r: 0.25, s: -0.8, st: 0, t: 0.15 },
            'V2': { p: 0.1, pr: 280, q: 0, r: 0.5, s: -1.0, st: 0, t: 0.4 },
            'V3': { p: 0.12, pr: 280, q: -0.05, r: 0.85, s: -0.6, st: 0, t: 0.45 },
            'V4': { p: 0.14, pr: 280, q: -0.05, r: 1.3, s: -0.25, st: 0, t: 0.5 },
            'V5': { p: 0.12, pr: 280, q: -0.08, r: 1.2, s: -0.15, st: 0, t: 0.4 },
            'V6': { p: 0.1, pr: 280, q: -0.06, r: 0.95, s: -0.1, st: 0, t: 0.35 }
        },
        quiz: [
            {
                step: 'PR-interval måling',
                question: 'Hvad måler PR-intervallet på dette EKG?',
                options: [
                    'Over 200 ms (svarende til 7 små tern / 280 ms)',
                    'Normalt mellem 120-200 ms',
                    'Kortere end 120 ms',
                    'Ikke målbart pga. manglende P-takker'
                ],
                correctIndex: 0,
                explanation: 'Afstanden fra starten af P-takken til starten af QRS-komplekset er ca. 280 ms (konstant i alle slag), hvilket er forlænget ud over den øvre normalgrænse på 200 ms.'
            },
            {
                step: 'Overledning',
                question: 'Er der udfald af QRS-komplekser efter P-takkerne?',
                options: [
                    'Nej, hver eneste P-tak efterfølges af et QRS-kompleks (1:1 overledning)',
                    'Ja, hver anden P-tak falder ud',
                    'Ja, P-takkerne har ingen sammenhæng med QRS',
                    'Der er slet ingen P-takker'
                ],
                correctIndex: 0,
                explanation: 'Ved AV-blok grad 1 er overledningsforholdet 1:1. Alle atrielle impulser overledes til ventriklerne, blot med konstant forsinkelse.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'AV-blok 1. grad',
                    'AV-blok 2. grad type Wenckebach',
                    'AV-blok 3. grad (Totalblok)',
                    'Normal sinusrytme'
                ],
                correctIndex: 0,
                explanation: 'AV-blok 1. grad.'
            }
        ]
    },
    {
        id: 'av_block_2_wenckebach',
        title: 'AV-blok 2. grad Mobitz Type I (Wenckebach)',
        subtitle: 'Gradvis progredierende forlængelse af PR-intervallet indtil et QRS bortfalder',
        category: 'Ledningsforstyrrelser',
        badge: 'AV-blok',
        description: '35-årig veltrænet marathonløber med uregelmæssig puls i hvile fundet ved rutineundersøgelse. Fuldstændig symptomfri.',
        heartRate: 54,
        rhythm: 'Regelmæssigt uregelmæssig med periodiske pauser',
        axis: 'Normal akse (+60°)',
        prInterval: 'Progredierende: 180 ms -> 240 ms -> 300 ms -> Bortfald',
        qrsDuration: '80 ms (smalkomplekset)',
        qtc: '400 ms',
        territory: 'AV-knuden (øvre del)',
        affectedLeads: ['II, V1'],
        reciprocalLeads: [],
        anatomicalEffect: 'Træthed/refraktæritet i AV-knudens celler øges for hvert hjerteslag, hvilket forsinker overledningen mere og mere, indtil en impuls helt blokeres. Efter pausen har knuden hvilet sig, og cyklussen starter forfra med et kortere PR-interval.',
        hamptonPearls: 'Hampton skriver: "Wenckebach-fænomenet er næsten altid lokaliseret i selve AV-knuden og har som regel en godartet prognose (ofte fysiologisk hos veltrænede unge pga. høj vagustone). Det vigtigste er at adskille det fra Mobitz type II, som sidder under AV-knuden og kræver pacemaker!"',
        leads: {
            'II': { p: 0.16, prWenckebach: [180, 240, 310, 'drop'], q: -0.05, r: 1.1, s: -0.15, st: 0, t: 0.4 }
        },
        quiz: [
            {
                step: 'PR-mønster',
                question: 'Hvad sker der med PR-intervallet i slagene forud for det bortfaldne hjerteslag?',
                options: [
                    'PR-intervallet bliver gradvist længere for hvert slag, indtil en P-tak ikke efterfølges af et QRS',
                    'PR-intervallet er helt konstant indtil det pludselige bortfald',
                    'PR-intervallet bliver kortere og kortere',
                    'Der er ingen P-takker'
                ],
                correctIndex: 0,
                explanation: 'Dette er det klassiske Wenckebach-mønster (Mobitz type I): progressiv PR-forlængelse forud for en blokeret P-tak.'
            },
            {
                step: 'Anatomisk Placering',
                question: 'Hvor i hjertet sidder ledningshindringen typisk ved Mobitz type I?',
                options: [
                    'I selve AV-knuden (ofte vagalt medieret og godartet)',
                    'I His-Purkinje systemet under AV-knuden',
                    'I sinusknuden',
                    'I venstre ventrikelvæg'
                ],
                correctIndex: 0,
                explanation: 'Mobitz I sidder typisk højt i AV-knuden, hvor cellerne gradvist udtrættes, i modsætning til Mobitz II som sidder infra-nodalt i His-bundtet.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'AV-blok 2. grad Mobitz type I (Wenckebach)',
                    'AV-blok 2. grad Mobitz type II',
                    'AV-blok 3. grad',
                    'Sinusarrest'
                ],
                correctIndex: 0,
                explanation: 'AV-blok 2. grad Mobitz type I (Wenckebach).'
            }
        ]
    },
    {
        id: 'av_block_3',
        title: 'AV-blok 3. grad (Total AV-blok)',
        subtitle: 'Fuldstændig dissociation mellem P-takker (~75/min) og bredkomplekset erstatningsrytme (~35/min)',
        category: 'Ledningsforstyrrelser',
        badge: 'Akut Livstruende',
        description: '78-årig mand indbragt efter synkope (Adams-Stokes anfald). Bleg, langsom puls på 34 slag/min.',
        heartRate: 34,
        rhythm: 'AV-dissociation med langsom ventrikulær erstatningsrytme',
        axis: 'Venstredrejet akse (-40°)',
        prInterval: 'Ingen fast relation (P-takker vandrer frit igennem QRS)',
        qrsDuration: '140 ms (bred ventrikulær erstatningsrytme)',
        qtc: 'Langt RR giver forlænget absolut QT',
        territory: 'His-bundt / bilateralt grenblok',
        affectedLeads: ['Alle'],
        reciprocalLeads: [],
        anatomicalEffect: 'Ingen elektriske impulser fra atrierne kan passere gennem AV-knuden/His-bundtet til ventriklerne. Atrierne slår med sinusknudens egenfrekvens, mens ventriklerne drives af en langsom, ustabil ektopisk erstatningsrytme.',
        hamptonPearls: 'Hampton understreger: "Ved 3. grads AV-blok (totalblok) marcherer P-takkerne regelmæssigt med deres egen rytme (fx 70-80/min), og QRS-komplekserne marcherer regelmæssigt med en helt anden, langsom rytme (fx 30-40/min). P-takkerne har absolut ingen relation til QRS og kan falde oven i T-takker eller lige inde i et QRS! Kræver akut pacemakerbehandling."',
        leads: {
            'II': { p: 0.16, pr: 'dissociated', q: -0.1, r: 0.9, s: -0.4, st: 0.1, t: 0.35, qrsWide: 140, totalBlock: true }
        },
        quiz: [
            {
                step: 'P- og QRS-sammenhæng',
                question: 'Hvad er relationen mellem P-takkerne og QRS-komplekserne?',
                options: [
                    'Komplet dissociation: P-takker og QRS-komplekser slår uafhængigt af hinanden med hver sin faste frekvens',
                    'Konstant 1:1 overledning',
                    'Fast 2:1 overledning',
                    'Ingen P-takker overhovedet'
                ],
                correctIndex: 0,
                explanation: 'Der er ingen elektrisk forbindelse mellem atrier og ventrikler. P-P intervallet er regelmæssigt og R-R intervallet er regelmæssigt, men PR-afstanden ændrer sig vilkårligt fra slag til slag.'
            },
            {
                step: 'Behandling',
                question: 'Hvad er den definitive behandling af symptomatisk 3. grads AV-blok?',
                options: [
                    'Permanent Pacemaker (PPM)',
                    'Verapamil',
                    'Betablokker',
                    'Observation uden indgreb'
                ],
                correctIndex: 0,
                explanation: 'Totalblok med synkoper eller lav erstatningsfrekvens kræver akut temporær pacing og anlæggelse af permanent pacemaker for at forhindre pludselig død.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'AV-blok 3. grad (Totalblok)',
                    'Sinusbradykardi',
                    'AV-blok 1. grad',
                    'Atrieflimren'
                ],
                correctIndex: 0,
                explanation: 'AV-blok 3. grad (Totalblok).'
            }
        ]
    },
    {
        id: 'lvh',
        title: 'Venstre Ventrikelhypertrofi (LVH)',
        subtitle: 'Høje voltager (Sokolow-Lyon > 35 mm) med sekundære ST-T belastningsforandringer',
        category: 'Hypertrofi',
        badge: 'Hypertrofi',
        description: '67-årig mand med årelang ubehandlet arteriel hypertension. EKG optaget til årskontrol.',
        heartRate: 68,
        rhythm: 'Sinusrytme',
        axis: 'Venstredrejet akse (-15°)',
        prInterval: '170 ms',
        qrsDuration: '105 ms (let forlænget, men < 120 ms)',
        qtc: '430 ms',
        territory: 'Venstre ventrikel myokardiemasse',
        affectedLeads: ['V1, V2, V5, V6, I, aVL'],
        reciprocalLeads: [],
        anatomicalEffect: 'Trykbelastning har medført fortykkelse (hypertrofi) af venstre ventrikels muskelvægg. Den øgede myokardiemasse genererer større elektriske potentialer under depolariseringen og forsinker den subendokardiale repolarisering ("strain"-mønster).',
        hamptonPearls: 'Hampton lærer os Sokolow-Lyon kriteriet: "Dybden af S i V1 + højden af R i V5 eller V6 > 35 mm (3.5 mV). Læg dertil de asymmetriske, inverterede T-takker med let descenderende ST-depression i de laterale afledninger I, aVL, V5 og V6 – dette kaldes et venstresidigt belastningsmønster (strain)."',
        leads: {
            'I': { p: 0.1, pr: 170, q: 0, r: 1.4, s: -0.1, st: -0.08, t: -0.25 },
            'II': { p: 0.12, pr: 170, q: 0, r: 1.0, s: -0.2, st: 0, t: 0.2 },
            'III': { p: 0.05, pr: 170, q: 0, r: 0.3, s: -0.7, st: 0.05, t: 0.15 },
            'aVR': { p: -0.1, pr: 170, q: 0, r: 0.1, s: -0.9, st: 0.05, t: -0.1 },
            'aVL': { p: 0.08, pr: 170, q: 0, r: 1.2, s: -0.1, st: -0.06, t: -0.2 },
            'aVF': { p: 0.1, pr: 170, q: 0, r: 0.6, s: -0.4, st: 0, t: 0.15 },
            'V1': { p: 0.08, pr: 170, q: 0, r: 0.2, s: -2.2, st: 0.1, t: 0.3 },
            'V2': { p: 0.1, pr: 170, q: 0, r: 0.3, s: -2.5, st: 0.12, t: 0.35 },
            'V3': { p: 0.1, pr: 170, q: 0, r: 0.6, s: -1.6, st: 0.05, t: 0.3 },
            'V4': { p: 0.12, pr: 170, q: 0, r: 1.5, s: -0.5, st: 0, t: 0.15 },
            'V5': { p: 0.12, pr: 170, q: 0, r: 2.4, s: -0.2, st: -0.12, t: -0.35, strain: true },
            'V6': { p: 0.1, pr: 170, q: 0, r: 2.1, s: -0.15, st: -0.1, t: -0.3, strain: true }
        },
        quiz: [
            {
                step: 'Sokolow-Lyon Spændingskriterier',
                question: 'Hvad er summen af S-takken i V1 (22 mm) og R-takken i V5 (24 mm)?',
                options: [
                    '46 mm (klart over tærsklen på > 35 mm for LVH)',
                    '25 mm (under grænsen)',
                    '35 mm (lige på grænsen)',
                    'Ikke beregnelig'
                ],
                correctIndex: 0,
                explanation: 'S_V1 (22 mm) + R_V5 (24 mm) = 46 mm. En værdi over 35 mm er et stærkt elektrokardiografisk tegn på venstre ventrikelhypertrofi hos voksne.'
            },
            {
                step: 'ST-T Belastning ("Strain")',
                question: 'Hvilken sekundær forandring ses i de laterale afledninger V5, V6 og aVL?',
                options: [
                    'Asymmetrisk T-taks inversion med let skråt nedadgående ST-depression ("strain")',
                    'Spidse teltformede T-takker',
                    'STEMI-elevation',
                    'Helt normale ST-T forhold'
                ],
                correctIndex: 0,
                explanation: 'Det venstresidige belastningsmønster ("strain") ses som asymmetriske T-taks inversioner og descenderende ST-depression i afledninger med høje R-takker.'
            },
            {
                step: 'Diagnose',
                question: 'Hvad er diagnosen?',
                options: [
                    'Venstre Ventrikelhypertrofi (LVH) med belastningsmønster',
                    'Akut forvægsinfarkt',
                    'Højresidigt grenblok',
                    'Normalt EKG'
                ],
                correctIndex: 0,
                explanation: 'Venstre Ventrikelhypertrofi (LVH).'
            }
        ]
    }
];

/**
 * Hjælpefunktion til at generere præcise matematiske EKG-kurver for en given afledning
 */
export function generateLeadWaveform(caseData, leadName, numBeats = 3, sampleRate = 250) {
    const lead = (caseData.leads && caseData.leads[leadName]) || (caseData.leads && caseData.leads['II']) || { r: 1.0, st: 0, t: 0.3 };
    const hr = caseData.heartRate > 0 ? caseData.heartRate : 60;
    const beatDurationSec = 60 / hr;
    const totalDurationSec = beatDurationSec * numBeats;
    const totalSamples = Math.round(totalDurationSec * sampleRate);

    const points = [];

    for (let i = 0; i < totalSamples; i++) {
        const timeSec = i / sampleRate;
        const beatIndex = Math.floor(timeSec / beatDurationSec);
        const beatTime = timeSec - beatIndex * beatDurationSec;

        let voltage = 0;

        // Hvis Ventrikelflimren (VF)
        if (caseData.id === 'vf') {
            const f1 = Math.sin(timeSec * 16.0) * 0.35;
            const f2 = Math.sin(timeSec * 23.5 + 1.2) * 0.25;
            const f3 = Math.cos(timeSec * 9.2 + 0.4) * 0.2;
            const noise = (Math.sin(timeSec * 50) * 0.05);
            voltage = (f1 + f2 + f3 + noise) * (lead.amp || 0.5);
            points.push({ time: timeSec, voltage });
            continue;
        }

        // Hvis Ventrikulær Takykardi (VT)
        if (caseData.id === 'vt') {
            const vtCycle = beatTime / beatDurationSec;
            const rAmp = lead.r || 0.3;
            const sAmp = lead.s || -1.4;
            const tAmp = lead.t || 0.4;

            if (vtCycle < 0.4) {
                const p = vtCycle / 0.4;
                if (lead.vt && lead.r > 1.0) {
                    voltage = Math.sin(p * Math.PI) * rAmp;
                } else {
                    voltage = -Math.sin(p * Math.PI) * Math.abs(sAmp);
                }
            } else {
                const p = (vtCycle - 0.4) / 0.6;
                voltage = Math.sin(p * Math.PI) * tAmp;
            }
            points.push({ time: timeSec, voltage });
            continue;
        }

        // Atrieflimren støj (flimrelinje)
        let afibNoise = 0;
        if (caseData.id === 'afib') {
            afibNoise = Math.sin(timeSec * 45) * 0.04 + Math.sin(timeSec * 73 + 0.5) * 0.03;
            if (lead.coarseF) afibNoise *= 1.8;
        }

        // Atrieflagren savtænder (F-bølger ~300/min => periode 0.20 sek)
        let flutterWave = 0;
        if (caseData.id === 'aflutter') {
            const flutterPeriod = 0.20;
            const fPhase = (timeSec % flutterPeriod) / flutterPeriod;
            const fAmp = lead.flutterAmp || -0.2;
            flutterWave = (fPhase < 0.7 ? (fPhase / 0.7) : (1 - (fPhase - 0.7) / 0.3)) * fAmp;
        }

        // Standard bølgeparametre
        const pAmp = caseData.id === 'afib' || caseData.id === 'aflutter' ? 0 : (lead.p !== undefined ? lead.p : 0.12);
        const qAmp = lead.q !== undefined ? lead.q : -0.05;
        const rAmp = lead.r !== undefined ? lead.r : 1.0;
        const sAmp = lead.s !== undefined ? lead.s : -0.15;
        const stElev = lead.st || 0;
        const tAmp = lead.t !== undefined ? lead.t : 0.35;
        const rPrime = lead.rPrime || 0;

        const pStart = 0.08;
        const pEnd = 0.18;

        const prSec = (typeof lead.pr === 'number' ? lead.pr : 160) / 1000;
        const qrsStart = pStart + prSec - 0.03;
        const qrsWidthSec = (lead.qrsWide || (caseData.qrsDuration ? parseInt(caseData.qrsDuration) : 85)) / 1000;
        const qrsEnd = qrsStart + qrsWidthSec;

        const tStart = qrsEnd + (lead.qtProlonged ? 0.15 : 0.10);
        const tDuration = lead.qtProlonged ? 0.26 : 0.18;
        const tEnd = tStart + tDuration;

        // P-tak
        if (beatTime >= pStart && beatTime <= pEnd && pAmp !== 0) {
            const prog = (beatTime - pStart) / (pEnd - pStart);
            voltage += Math.sin(prog * Math.PI) * pAmp;
        }

        // PR-depression
        if (lead.prDep && beatTime >= pEnd && beatTime < qrsStart) {
            voltage += lead.prDep;
        }

        // QRS-kompleks
        if (beatTime >= qrsStart && beatTime <= qrsEnd) {
            const qrsProg = (beatTime - qrsStart) / qrsWidthSec;

            if (lead.notch) {
                if (qrsProg < 0.45) {
                    voltage += Math.sin((qrsProg / 0.45) * Math.PI) * rAmp * 0.9;
                } else if (qrsProg < 0.55) {
                    voltage += rAmp * 0.75;
                } else {
                    voltage += Math.sin(((qrsProg - 0.55) / 0.45) * Math.PI) * rAmp;
                }
            } else if (rPrime > 0) {
                if (qrsProg < 0.25) {
                    voltage += Math.sin((qrsProg / 0.25) * Math.PI) * rAmp;
                } else if (qrsProg < 0.5) {
                    voltage += sAmp * Math.sin(((qrsProg - 0.25) / 0.25) * Math.PI);
                } else {
                    voltage += Math.sin(((qrsProg - 0.5) / 0.5) * Math.PI) * rPrime;
                }
            } else {
                if (qrsProg < 0.2) {
                    voltage += Math.sin((qrsProg / 0.2) * Math.PI) * qAmp;
                } else if (qrsProg < 0.65) {
                    const rProg = (qrsProg - 0.2) / 0.45;
                    voltage += Math.sin(rProg * Math.PI) * rAmp;
                } else {
                    const sProg = (qrsProg - 0.65) / 0.35;
                    voltage += Math.sin(sProg * Math.PI) * sAmp;
                }
            }
        }

        // ST-segment og T-tak
        if (beatTime > qrsEnd && beatTime < tStart) {
            voltage += stElev;
        } else if (beatTime >= tStart && beatTime <= tEnd) {
            const tProg = (beatTime - tStart) / tDuration;
            let tWave = 0;

            if (lead.peakedT) {
                tWave = Math.pow(Math.sin(tProg * Math.PI), 1.6) * tAmp;
            } else if (lead.stShape === 'coved') {
                tWave = stElev * (1 - tProg * 0.5) + Math.sin(tProg * Math.PI) * tAmp;
            } else if (lead.stShape === 'tombstone') {
                tWave = stElev * Math.cos(tProg * (Math.PI / 2)) + Math.sin(tProg * Math.PI) * tAmp * 0.6;
            } else {
                tWave = Math.sin(tProg * Math.PI) * tAmp + stElev * (1 - tProg);
            }
            voltage += tWave;
        }

        voltage += afibNoise + flutterWave;
        points.push({ time: timeSec, voltage });
    }

    return points;
}
