/**
 * Kliniske sammenligninger, forskelle vs normalt EKG og multi-billede arkiv
 * 
 * Baseret på:
 * - Sundhed.dk Lægehåndbogen (Dansk Almen Medicin & Hospitalsretningslinjer)
 * - Dansk Cardiologisk Selskab (DCS) Nationale Behandlingsvejledninger (nbv.cardio.dk)
 * - John R. Hampton: 'EKG - let at se'
 * - Autentiske 12-aflednings hospital-scans (Public Domain & Open Medical Archives)
 */

// Normal Sinus
import normalSinus1 from '../assets/ekg_scans/normal_sinus.jpg';
import normalSinus2 from '../assets/ekg_scans/normal_sinus_2.jpg';
import normalSinus3 from '../assets/ekg_scans/normal_sinus_3.jpg';
import normalSinus4 from '../assets/ekg_scans/normal_sinus_4.jpg';
import standard12Lead from '../assets/ekg_scans/standard_12_lead.jpg';

// Anterior STEMI
import anteriorStemi1 from '../assets/ekg_scans/anterior_stemi.jpg';
import anteriorStemi2 from '../assets/ekg_scans/anterior_stemi_2.jpg';
import anteriorStemi3 from '../assets/ekg_scans/anterior_stemi_3.jpg';
import anteriorStemi4 from '../assets/ekg_scans/anterior_stemi_4.jpg';

// Inferior STEMI
import inferiorStemi1 from '../assets/ekg_scans/inferior_stemi.jpg';
import inferiorStemi2 from '../assets/ekg_scans/inferior_stemi_2.jpg';
import inferiorStemi3 from '../assets/ekg_scans/inferior_stemi_3.jpg';
import inferiorStemi4 from '../assets/ekg_scans/inferior_stemi_4.jpg';

// LBBB
import lbbb1 from '../assets/ekg_scans/lbbb.jpg';
import lbbb2 from '../assets/ekg_scans/lbbb_2.jpg';
import lbbb3 from '../assets/ekg_scans/lbbb_3.jpg';
import lbbb4 from '../assets/ekg_scans/lbbb_4.jpg';

// RBBB
import rbbb1 from '../assets/ekg_scans/rbbb.jpg';
import rbbb2 from '../assets/ekg_scans/rbbb_2.jpg';
import rbbb3 from '../assets/ekg_scans/rbbb_3.jpg';
import rbbb4 from '../assets/ekg_scans/rbbb_4.jpg';

// Atrieflimren
import afib1 from '../assets/ekg_scans/afib.jpg';
import afib2 from '../assets/ekg_scans/afib_2.jpg';
import afib3 from '../assets/ekg_scans/afib_3.jpg';

// Atrieflagren
import aflutter1 from '../assets/ekg_scans/aflutter_1.jpg';
import aflutter2 from '../assets/ekg_scans/aflutter_2.jpg';
import aflutter3 from '../assets/ekg_scans/aflutter_3.jpg';

// Hyperkaliæmi
import hyperkalemia1 from '../assets/ekg_scans/hyperkalemia_1.jpg';
import hyperkalemia2 from '../assets/ekg_scans/hyperkalemia_2.jpg';
import hyperkalemia3 from '../assets/ekg_scans/hyperkalemia_3.jpg';
import hyperkalemia4 from '../assets/ekg_scans/hyperkalemia_4.jpg';

export const CASE_CLINICAL_COMPARISONS = {
    normal_sinus: {
        keyFindings: 'Regelmæssig sinusrytme (72 bpm), positiv P-tak foran hvert QRS i afledning II, normal hjerteakse (+60°), PR-interval 160 ms (normalt 120-200 ms), smalt QRS 85 ms (< 120 ms), isoelektrisk ST-segment og afrundede asymmetriske T-takker.',
        diffFromNormal: 'Dette er det fysiologiske reference-EKG. Alle tidsintervaller (PR, QRS, QTc), tak-amplituder og overledninger er inden for normale referencegrænser. Danner det faste udgangspunkt for sammenligning med alle patologiske tilstande.',
        pathophysiology: 'Normal fysiologisk impulsudbredelse fra SA-knuden i højre atrium, fysiologisk forsinkelse i AV-knuden (sikrer fuld atrietømning) og lynhurtig synkron aktivering af begge ventrikler via His-Purkinje systemet fra endokardium mod epikardium.',
        sundhedDkTitle: 'Sundhed.dk: EKG-tjekliste i almen praksis',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/undersoegelser/ekg-tjekliste/',
        dcsTitle: 'DCS: Nationale Vejledninger for EKG',
        dcsUrl: 'https://nbv.cardio.dk',
        realEkgImages: [
            {
                id: 'ns1',
                title: 'Klinisk Reference: 12 Normale Afledninger',
                badge: 'Reference Optagelse',
                caption: 'Standard 12-aflednings hospital-EKG fra en rask person. Bemærk de positive P-takker i II, de slanke QRS-komplekser og de helt flade isoelektriske ST-stykker.',
                src: normalSinus1
            },
            {
                id: 'ns2',
                title: 'Hospitalstracing: 66-årig mand (Normalfysiologi)',
                badge: 'Virkelig Patient',
                caption: 'Fuldt hospitalsarkiv-tracing fra 66-årig mand. Normal progression af R-takker fra V1 til V6 uden iskæmitegn eller ledningsblok.',
                src: normalSinus2
            },
            {
                id: 'ns3',
                title: 'Ung Voksen: 26-årig mand',
                badge: 'Ung Patient',
                caption: '12-aflednings EKG fra 26-årig mand. Tydelige normale fysiologiske voltager og regelmæssig sinusrytme.',
                src: normalSinus3
            },
            {
                id: 'ns4',
                title: 'Standard Kalibreringsark (25 mm/s, 10 mm/mV)',
                badge: 'Teknisk Standard',
                caption: 'Genereret 12-aflednings reference med præcise intervaller til kontrol af papirhastighed og voltager.',
                src: normalSinus4
            },
            {
                id: 'ns5',
                title: 'Klinisk Monitorering: 12-aflednings tracing',
                badge: 'Hospitalsformat',
                caption: 'Hospitalsoptagelse med Lead II rytmestrimmel forneden til rytmeverifikation.',
                src: standard12Lead
            }
        ]
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
        realEkgImages: [
            {
                id: 'as1',
                title: 'Massiv Anterior STEMI: "Tombstone" Elevationer i V1-V4',
                badge: 'Akut LAD-okklusion',
                caption: 'Klassisk akut forvægsinfarkt. Se de dramatiske ST-elevationer i V1–V4 (tombstone-mønster) og reciprokke depressioner i II, III og aVF.',
                src: anteriorStemi1
            },
            {
                id: 'as2',
                title: 'Farvekodet Analyse: Forvæg vs. Inferiore Spejlbilleder',
                badge: 'Pædagogisk Analyse',
                caption: 'Samme patient med farvemarkering: Orange fremhæver ST-elevationerne i forvægsafledningerne, mens blå fremhæver de reciprokke ST-depressioner i bunden af hjertet.',
                src: anteriorStemi2
            },
            {
                id: 'as3',
                title: 'Præhospital Ambulancetransmission (Akut 112)',
                badge: 'Præhospital Telemetri',
                caption: 'Telemedicinsk 12-aflednings EKG transmitteret direkte fra ambulancelæge til kardiologisk modtagelse mhp. direkte kørsel til akut primær PCI.',
                src: anteriorStemi3
            },
            {
                id: 'as4',
                title: 'Akut Myokardieinfarkt: Udtalte Elevationer',
                badge: 'Hospitalsoptagelse',
                caption: 'Højopløseligt hospitalsarkiv-EKG med udtalt transmural iskæmi i forvæggen.',
                src: anteriorStemi4
            }
        ]
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
        realEkgImages: [
            {
                id: 'is1',
                title: 'Klassisk Inferior STEMI: Elevation i II, III, aVF',
                badge: 'Akut RCA-okklusion',
                caption: 'Autentisk 12-aflednings hospital-EKG fra patient med akut inferiort STEMI (PMC Open Medical Archives). Tydelig ST-elevation i II, III og aVF samt reciprok depression i I og aVL.',
                src: inferiorStemi1
            },
            {
                id: 'is2',
                title: 'Inferiort + Højresidigt Infarkt (RCA Okklusion)',
                badge: 'Højre Ventrikel Involveret',
                caption: 'Akut inferiort STEMI ledsaget af højre ventrikel affektion. Kræver stor forsigtighed med nitroglycerin pga. risiko for voldsomt blodtryksfald.',
                src: inferiorStemi2
            },
            {
                id: 'is3',
                title: 'Standardiseret Inferiort Infarkt med Q-takker',
                badge: 'Klinisk Model',
                caption: '12-aflednings mønster med udvikling af patologiske Q-takker og ST-elevation i de diafragmale afledninger.',
                src: inferiorStemi3
            },
            {
                id: 'is4',
                title: 'Inferiort STEMI Kompliceret med AV-blok Grad III',
                badge: 'Komplikation: Totalblok',
                caption: 'Da RCA forsyner AV-knuden, ses her totalt AV-blok (P-takker og QRS-komplekser helt uafhængige af hinanden) under det akutte undervægsinfarkt.',
                src: inferiorStemi4
            }
        ]
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
        realEkgImages: [
            {
                id: 'lb1',
                title: 'Klassisk LBBB: Dyb QS i V1 og Kærvet R i V6',
                badge: 'Klassisk WiLLiaM',
                caption: 'Klassisk venstresidigt grenblok (LBBB). QRS måler ca. 145 ms med bred kærvet R-tak i V5-V6 og dyb QS i V1-V2.',
                src: lbbb1
            },
            {
                id: 'lb2',
                title: 'Hospitalsarkiv: Komplet LBBB',
                badge: '12-Aflednings Ark',
                caption: 'Fuldt 12-aflednings ark fra patient med hypertension og komplet venstresidigt grenblok. Bemærk fraværet af normale septale Q-takker.',
                src: lbbb2
            },
            {
                id: 'lb3',
                title: 'LBBB med Chapmans Tegn',
                badge: 'Klinisk Fund',
                caption: 'Chapmans tegn (et lille hak i den opadstigende del af R-takken i afledning I eller aVL) indikerer ofte underliggende forvægsinfarkt hos patienter med LBBB.',
                src: lbbb3
            },
            {
                id: 'lb4',
                title: 'LBBB med Supraventrikulære Ekstraslag',
                badge: 'Arytmi & Grenblok',
                caption: 'Klinisk optagelse af LBBB med ledsagende supraventrikulære ekstrasystoler (SVES).',
                src: lbbb4
            }
        ]
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
        realEkgImages: [
            {
                id: 'rb1',
                title: 'Klassisk RBBB: rsR\' ("Kaninører") i V1',
                badge: 'Klassisk MaRRoW',
                caption: 'Klassisk højresidigt grenblok med det typiske M-formede rsR\'-mønster i V1 og brede afrundede S-takker i de laterale afledninger I og V6.',
                src: rbbb1
            },
            {
                id: 'rb2',
                title: 'Fuldt 12-Aflednings Kardiogram med RBBB',
                badge: 'Hospitalsarkiv',
                caption: 'Klinisk hospitalstracing af komplet højresidigt grenblok med breddeøget QRS og diskordante T-taksforandringer i V1-V2.',
                src: rbbb2
            },
            {
                id: 'rb3',
                title: 'RBBB ledsaget af Takykardi',
                badge: 'Takykardi & RBBB',
                caption: 'Højresidigt grenblok optaget under takykardi. Viser hvordan frekvensen påvirker det perifere ledningsbillede.',
                src: rbbb3
            },
            {
                id: 'rb4',
                title: 'Normal Sinusrytme med RBBB (74 bpm)',
                badge: 'Stabil Sinusrytme',
                caption: 'Stabil hjerteaktion på 74/min med faste PR-intervaller og komplet højre grenblok.',
                src: rbbb4
            }
        ]
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
        realEkgImages: [
            {
                id: 'af1',
                title: 'Atrieflimren med Hurtig Ventrikelaktion (98 bpm)',
                badge: 'Arrhythmia Absoluta',
                caption: 'Udtalt arrhythmia absoluta. Ingen P-takker kan identificeres på grundlinjen; i stedet ses fin flimren, og afstanden mellem R-takkerne varierer vilkårligt.',
                src: afib1
            },
            {
                id: 'af2',
                title: 'Atrieflimren med Moderat Frekvens (90 bpm)',
                badge: 'Frekvensreguleret',
                caption: 'Klinisk hospitalstracing af patient med atrieflimren. Tydelig uregelmæssig grundlinje bedst synlig i de prækordiale afledninger.',
                src: afib2
            },
            {
                id: 'af3',
                title: 'Fuldt 12-Aflednings Hospitalsark: A-flimren',
                badge: 'Hospitalsoptagelse',
                caption: '12-aflednings EKG der demonstrerer smalkomplekset takyarytmi uden koordineret atriekontraktion.',
                src: afib3
            }
        ]
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
        realEkgImages: [
            {
                id: 'afl1',
                title: 'Klassisk Savtaks-Mønster (Atriefrekvens 294 bpm)',
                badge: '2:1 AV-blok',
                caption: 'Klassisk atrieflagren med kontinuerlige savtænder i afledning II, III og aVF. Ventrikelfrekvensen er præcis 147-150/min.',
                src: aflutter1
            },
            {
                id: 'afl2',
                title: '12-Aflednings Hospitalsark: Typisk Flagren',
                badge: 'Hospitalsarkiv',
                caption: 'Fuld 12-aflednings registrering. Bemærk fraværet af flad isoelektrisk linje i bunden af hjertet.',
                src: aflutter2
            },
            {
                id: 'afl3',
                title: 'Atrieflagren med Variabel Blokering',
                badge: 'Variabel Overledning',
                caption: 'Atrieflagren hvor AV-knudens overledning skifter mellem 2:1, 3:1 og 4:1 blokering, hvilket giver let uregelmæssig puls.',
                src: aflutter3
            }
        ]
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
        realEkgImages: [
            {
                id: 'hk1',
                title: 'Klassiske Teltformede T-takker (Hyperkaliæmi)',
                badge: 'Teltformede T-takker',
                caption: 'Klassiske symmetriske, nålespidse T-takker med smal basis. Sammenlign med normale asymmetriske T-takker.',
                src: hyperkalemia1
            },
            {
                id: 'hk2',
                title: 'Udtalte Hyperkaliæmi-forandringer i Brystafledninger',
                badge: 'V2 - V4 Affektion',
                caption: 'Høje spidse T-takker der overstiger R-takkens amplitude i de prækordiale afledninger.',
                src: hyperkalemia2
            },
            {
                id: 'hk3',
                title: 'Svær Hyperkaliæmi med Tab af P-takker',
                badge: 'Avanceret Toksicitet',
                caption: 'Fremskreden hyperkaliæmi: P-takkerne er næsten fuldstændig udviskede fra grundlinjen, og QRS-komplekset begynder at breddeøges.',
                src: hyperkalemia3
            },
            {
                id: 'hk4',
                title: 'Livstruende Hyperkaliæmi (S-Kalium 7.6 mmol/L)',
                badge: 'Akut Nødsituation (K+ 7.6)',
                caption: 'Akut livstruende tilstand hos patient med S-kalium på 7.6 mmol/L. Ekstrem QRS-breddeøgning og overgang mod præ-terminal sinusbølge. Kræver omgående intravenøs calcium.',
                src: hyperkalemia4
            }
        ]
    }
};
