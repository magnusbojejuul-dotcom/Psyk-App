/**
 * Kliniske sammenligninger og forskelle for EKG Cases
 * 
 * Baseret på:
 * - Sundhed.dk Lægehåndbogen (Dansk Almen Medicin & Hospitalsretningslinjer)
 * - Dansk Cardiologisk Selskab (DCS) Nationale Behandlingsvejledninger (nbv.cardio.dk)
 * - John R. Hampton: 'EKG - let at se'
 * - Autentiske 12-aflednings hospital-scans (Public Domain & Open Medical Archives)
 */

import normalSinusImg from '../assets/ekg_scans/normal_sinus.jpg';
import anteriorStemiImg from '../assets/ekg_scans/anterior_stemi.jpg';
import inferiorStemiImg from '../assets/ekg_scans/inferior_stemi.jpg';
import lbbbImg from '../assets/ekg_scans/lbbb.jpg';
import rbbbImg from '../assets/ekg_scans/rbbb.jpg';
import afibImg from '../assets/ekg_scans/afib.jpg';

export const CASE_CLINICAL_COMPARISONS = {
    normal_sinus: {
        keyFindings: 'Regelmæssig sinusrytme (72 bpm), positiv P-tak foran hvert QRS i afledning II, normal hjerteakse (+60°), PR-interval 160 ms (normalt 120-200 ms), smalt QRS 85 ms (< 120 ms), isoelektrisk ST-segment og afrundede asymmetriske T-takker.',
        diffFromNormal: 'Dette er det fysiologiske reference-EKG. Alle tidsintervaller (PR, QRS, QTc), tak-amplituder og overledninger er inden for normale referencegrænser. Danner det faste udgangspunkt for sammenligning med alle patologiske tilstande.',
        pathophysiology: 'Normal fysiologisk impulsudbredelse fra SA-knuden i højre atrium, fysiologisk forsinkelse i AV-knuden (sikrer fuld atrietømning) og lynhurtig synkron aktivering af begge ventrikler via His-Purkinje systemet fra endokardium mod epikardium.',
        sundhedDkTitle: 'Sundhed.dk: EKG-tjekliste i almen praksis',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/undersoegelser/ekg-tjekliste/',
        dcsTitle: 'DCS: Nationale Vejledninger for EKG',
        dcsUrl: 'https://nbv.cardio.dk',
        realEkgImage: normalSinusImg,
        realEkgCaption: 'Autentisk 12-aflednings hospital-EKG fra rask person med normal sinusrytme (Kilde: Wikimedia Commons, Public Domain).'
    },
    anterior_stemi: {
        keyFindings: 'Karakteristiske konvekse ("tombstone") ST-elevationer på 4-6 mm i brystafledningerne V1–V4. Samtidige reciprokke ST-depressioner i de inferiore afledninger (II, III og aVF). Tab af normal r-progression i brystvæggen.',
        diffFromNormal: 'I et normalt EKG er ST-segmentet helt fladt (isoelektrisk på grundlinjen). Ved Anterior STEMI løftes ST-segmentet dramatisk flere millimeter op over grundlinjen pga. akut transmural iskæmi. T-takkerne bliver hyperakutte og fusionerer med ST-stykket. Modstående afledninger (II, III, aVF) udviser et elektrisk spejlbillede (reciprok ST-depression).',
        pathophysiology: 'Akut total trombotisk okklusion af LAD (Left Anterior Descending) arterien forårsager iltmangel i hele forvæggen og septum. De iskæmiske ventrikelmyocytter mister deres hvilemembranpotentiale, hvilket skaber en permanent skadestrøm (injury current) rettet fremad mod V1–V4.',
        clinicalCriteria: 'DCS Kriterier for STEMI: ST-elevation ved J-punktet i to sammenhængende afledninger: ≥ 2.0 mm hos mænd ≥ 40 år (≥ 2.5 mm hos mænd < 40 år) eller ≥ 1.5 mm hos kvinder i V2–V3, samt ≥ 1.0 mm i øvrige afledninger.',
        sundhedDkTitle: 'Sundhed.dk: ST-elevationsmyokardieinfarkt (STEMI)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/koronarsygdom/st-elevationsmyokardieinfarkt/',
        dcsTitle: 'DCS Behandlingsvejledning: Akut Koronart Syndrom (AKS / STEMI)',
        dcsUrl: 'https://nbv.cardio.dk/aks',
        realEkgImage: anteriorStemiImg,
        realEkgCaption: 'Autentisk 12-aflednings hospital-EKG fra patient med akut forvægsinfarkt (Anterior STEMI) med udtalte konvekse ST-elevationer i V1-V4 (Kilde: Wikimedia Commons, Public Domain).'
    },
    inferior_stemi: {
        keyFindings: 'Udtalte ST-elevationer i de tre inferiore afledninger II, III og aVF (her tydeligt i III og aVF). Reciprok ST-depression i I og aVL. Høj risiko for ledsagende AV-blok og sinusbradykardi.',
        diffFromNormal: 'Normale inferiore afledninger har fladt ST-segment og positiv R-tak. Ved inferior STEMI er ST-linjen løftet i bunden af hjertet. Fundet af ST-elevation i III og aVF ledsaget af reciprok depression i aVL er > 95% sensitivt og specifikt for akut koronarokklusion.',
        pathophysiology: 'Akut okklusion af RCA (Højre Koronararterie) eller sjældnere LCx. Da RCA forsyner AV-knuden hos ca. 90% af befolkningen, ses ofte ledsagende sinusbradykardi eller AV-blok.',
        clinicalCriteria: 'DCS Kriterier: ST-elevation ≥ 1.0 mm i mindst to af afledningerne II, III og aVF, ledsaget af reciprok depression i aVL.',
        sundhedDkTitle: 'Sundhed.dk: Akut myokardieinfarkt og koronarsygdom',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/koronarsygdom/st-elevationsmyokardieinfarkt/',
        dcsTitle: 'DCS NBV: Revaskularisering ved akut STEMI',
        dcsUrl: 'https://nbv.cardio.dk/aks',
        realEkgImage: inferiorStemiImg,
        realEkgCaption: 'Autentisk 12-aflednings klinisk hospitalstracing fra patient med akut inferiort STEMI (ST-elevation i II, III, aVF; reciprok depression i I, aVL) (Kilde: PMC Open Medical Archives).'
    },
    lbbb: {
        keyFindings: 'QRS-varighed markant forlænget til ≥ 120 ms (her 145 ms). Dyb, bred QS- eller rS-tak i V1–V2. Bred, kærvet eller plateaudannet R-tak (M-form) i laterale afledninger I, aVL, V5 og V6 uden normale septale Q-takker. Sekundære ST-T diskordante forandringer.',
        diffFromNormal: 'Et normalt QRS er smalt (< 120 ms) og har fysiologiske små septale q-takker i V5/V6. Ved LBBB forsvinder de septale q-takker fuldstændigt, fordi septum aktiveres i modsat retning (fra højre mod venstre). Hele venstre ventrikel aktiveres asynkront og forsinket, hvilket gør QRS-komplekset bredt, klodset og kærvet.',
        pathophysiology: 'Blokering i venstre grenbundt tvinger aktiveringsbølgen til først at gå gennem højre ventrikel og derefter sprede sig langsomt celle-til-celle gennem myokardiet til den store venstre ventrikel. Den asynkrone kontraktion nedsætter venstre ventrikels pumpefunktion.',
        clinicalCriteria: 'DCS / Sundhed.dk Kriterier: QRS ≥ 120 ms hos voksne, bred kærvet R-tak i I, aVL, V5–V6, fravær af q i V5–V6. OBS: Nyopstået LBBB ved mistanke om akut myokardieiskæmi skal håndteres som STEMI-ækvivalent!',
        sundhedDkTitle: 'Sundhed.dk: Grenblok og fascikelblok',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/arytmier/grenblok-og-fascikelblok/',
        dcsTitle: 'DCS Retningslinjer: Ledningsforstyrrelser og LBBB',
        dcsUrl: 'https://nbv.cardio.dk',
        realEkgImage: lbbbImg,
        realEkgCaption: 'Autentisk 12-aflednings klinisk hospital-EKG med venstresidigt grenblok (LBBB) (Kilde: Wikimedia Commons).'
    },
    rbbb: {
        keyFindings: 'QRS-varighed ≥ 120 ms (her 135 ms). Klassisk rsR\' ("kaninører" / M-mønster) i V1–V2. Bred, dyb og sløret S-tak i afledning I, aVL og V6 (W-formet afslutning i V6).',
        diffFromNormal: 'I et normalt EKG er V1 domineret af en lille r og en dyb, slank S-tak, og QRS er smalt (< 120 ms). Ved RBBB depolariseres venstre ventrikel først normalt, hvorefter den forsinkede højre ventrikel danner en ekstra, sen positiv tak (R\') i V1 og en sen bred S-tak i V6.',
        pathophysiology: 'Blokering i højre grenbundt. Venstre ventrikel aktiveres normalt via venstre gren, hvorefter impulsen spreder sig langsomt over i højre ventrikel. Den sene aktivering af højre ventrikel giver en kraftig vektor rettet fremad og mod højre.',
        clinicalCriteria: 'DCS / Sundhed.dk Kriterier: QRS ≥ 120 ms, rsR\' eller bred kærvet R i V1–V2, samt bred sløret S-tak (varighed > R eller > 40 ms) i afledning I og V6. RBBB kan forekomme hos hjertesunde, men kan også signalere højresidig belastning (lungeemboli, cor pulmonale).',
        sundhedDkTitle: 'Sundhed.dk: Højresidigt grenblok',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/arytmier/grenblok-og-fascikelblok/',
        dcsTitle: 'DCS Retningslinjer: Højresidig hjertebelastning & Grenblok',
        dcsUrl: 'https://nbv.cardio.dk',
        realEkgImage: rbbbImg,
        realEkgCaption: 'Autentisk klinisk EKG-morfologi ved højresidigt grenblok (RBBB) med rsR\' i V1 og bred S-tak i V6 (Kilde: Wikimedia Commons).'
    },
    afib: {
        keyFindings: 'Fuldstændig uregelmæssig hjerterytme (arrhythmia absoluta - uens afstande mellem R-takkerne). Total mangel på veldefinerede P-takker, som erstattes af uregelmæssige, fluktuerende f-bølger (flimrelinje på grundlinjen). Smalle QRS-komplekser.',
        diffFromNormal: 'Et normalt EKG har regelmæssige, identiske P-takker med fast PR-interval (120-200 ms) foran hvert eneste QRS, og hjerteaktionen er helt regelmæssig. Ved atrieflimren er der ingen koordineret atrieaktivering, ingen P-takker og helt tilfældige RR-intervaller.',
        pathophysiology: 'Kaotisk mikro-reentry elektrisk aktivitet i atrierne med frekvens på 400-600/min. AV-knuden fungerer som fysiologisk filter og overleder kun en brøkdel af impulserne helt uregelmæssigt til ventriklerne.',
        clinicalCriteria: 'DCS Kriterier: Uregelmæssige RR-intervaller uden P-takker af mindst 30 sekunders varighed på EKG/telemetri. Vigtigste kliniske fokus: Antikoagulation (AK-behandling vurderet ud fra CHA2DS2-VASc score) for at forebygge apopleksi.',
        sundhedDkTitle: 'Sundhed.dk: Atrieflimren og atrieflagren',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/arytmier/atrieflimren-og-atrieflagren/',
        dcsTitle: 'DCS Behandlingsvejledning: Atrieflimren',
        dcsUrl: 'https://nbv.cardio.dk/afib',
        realEkgImage: afibImg,
        realEkgCaption: 'Autentisk 12-aflednings hospital-EKG fra patient med atrieflimren og uregelmæssig ventrikelaktion (Kilde: Wikimedia Commons).'
    },
    aflutter: {
        keyFindings: 'Regelmæssige, savtaks-formede flutterbølger (F-bølger) med konstant frekvens på ca. 300/min, bedst synlige i II, III og aVF. Ventrikelfrekvensen er ofte præcis 150/min (ved 2:1 AV-blok) eller 100/min (ved 3:1 blok). Ingen flad isoelektrisk grundlinje i inferiore afledninger.',
        diffFromNormal: 'Normale atriebølger er diskrete afrundede P-takker efterfulgt af en flad isoelektrisk PR-linje. Ved atrieflagren oscillerer grundlinjen kontinuerligt som en savtakket klinge uden flad hvilefase.',
        pathophysiology: 'Makro-reentry kredsløb typisk mod uret i højre atrium omkring den cavotrikuspidale isthmus (CTI). AV-knuden kan ikke nå at overlede 300 impulser i minuttet og blokerer hver anden impuls fysiologisk.',
        clinicalCriteria: 'DCS Kriterier: Regelmæssig atriefrekvens på ca. 250-350/min med typisk savtakket udseende. Kurativ behandling er ofte radiofrekvensablation (RFA) af cavotrikuspidale isthmus.',
        sundhedDkTitle: 'Sundhed.dk: Atrieflagren i almen praksis',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/arytmier/atrieflimren-og-atrieflagren/',
        dcsTitle: 'DCS NBV: Atrieflagren og ablation',
        dcsUrl: 'https://nbv.cardio.dk',
        realEkgImage: afibImg,
        realEkgCaption: 'Klinisk hospitalstracing af supraventrikulær arytmi (Wikimedia Commons).'
    },
    hyperkalemia: {
        keyFindings: 'Høje, spidse, symmetriske T-takker med smal basis ("teltformede" T-takker), bedst synlige i brystafledningerne V2–V4. Ved sværere hyperkaliæmi ses affladning og tab af P-takker, breddeøget QRS og til sidst sinusbølge-mønster (høj risiko for ventrikelflimren og asystoli).',
        diffFromNormal: 'Normale T-takker er asymmetriske (stiger langsomt og falder hurtigere) og har en bred basis. Ved hyperkaliæmi bliver T-takkerne ekstremt høje, nålespidse og symmetriske som teltdug.',
        pathophysiology: 'Forhøjet ekstracellulært kalium (K+ > 5.5-6.0 mmol/L) øger membranens kaliumpermeabilitet, hvilket drastisk accelererer fase 3 repolariseringen (høje spidse T-takker) og nedsætter ledningshastigheden i hele ledningssystemet (bredt QRS).',
        clinicalCriteria: 'Akut livstruende medicinsk nødsituation ved K+ > 6.5 mmol/L. Kræver omgående akut EKG og akut behandling med calciumchlorid/calciumgluconat til stabilisering af kardiomyocytternes tærskelpotentiale, efterfulgt af glukose-insulin infusion.',
        sundhedDkTitle: 'Sundhed.dk: Hyperkaliæmi (Lægehåndbogen)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/endokrinologi/tilstande-og-sygdomme/elektrolytforstyrrelser/hyperkaliaemi/',
        dcsTitle: 'DCS NBV: Elektrolytforstyrrelser og arytmi',
        dcsUrl: 'https://nbv.cardio.dk',
        realEkgImage: normalSinusImg,
        realEkgCaption: 'Klinisk reference-EKG til sammenligning med kaliumpåvirkede T-takker.'
    }
};
