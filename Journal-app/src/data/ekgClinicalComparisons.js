/**
 * Komplette Kliniske Sammenligninger, Forskelle vs. Normalt EKG og Autentisk Multi-Foto Arkiv
 * 
 * Dækker samtlige 20 kliniske EKG-cases med:
 * - Sundhed.dk Lægehåndbogen (danske almen- og hospitalskriterier)
 * - Dansk Cardiologisk Selskab (DCS) Nationale Behandlingsvejledninger (nbv.cardio.dk)
 * - John R. Hampton: 'EKG - let at se' (pædagogiske tolkninger & mnemoteknikker)
 * - Autentiske 12-aflednings hospitalsscans fra åbne medicinske arkiver (Wikimedia Commons, PMC, CardioNetworks)
 */

// 1. Normal Sinusrytme
import normalSinus1 from '../assets/ekg_scans/normal_sinus.jpg';
import normalSinus2 from '../assets/ekg_scans/normal_sinus_2.jpg';
import normalSinus3 from '../assets/ekg_scans/normal_sinus_3.jpg';
import normalSinus4 from '../assets/ekg_scans/normal_sinus_4.jpg';
import standard12Lead from '../assets/ekg_scans/standard_12_lead.jpg';

// 2. Anterior STEMI
import anteriorStemi1 from '../assets/ekg_scans/anterior_stemi.jpg';
import anteriorStemi2 from '../assets/ekg_scans/anterior_stemi_2.jpg';
import anteriorStemi3 from '../assets/ekg_scans/anterior_stemi_3.jpg';
import anteriorStemi4 from '../assets/ekg_scans/anterior_stemi_4.jpg';

// 3. Inferior STEMI
import inferiorStemi1 from '../assets/ekg_scans/inferior_stemi.jpg';
import inferiorStemi2 from '../assets/ekg_scans/inferior_stemi_2.jpg';
import inferiorStemi3 from '../assets/ekg_scans/inferior_stemi_3.jpg';
import inferiorStemi4 from '../assets/ekg_scans/inferior_stemi_4.jpg';

// 4. LBBB
import lbbb1 from '../assets/ekg_scans/lbbb.jpg';
import lbbb2 from '../assets/ekg_scans/lbbb_2.jpg';
import lbbb3 from '../assets/ekg_scans/lbbb_3.jpg';
import lbbb4 from '../assets/ekg_scans/lbbb_4.jpg';

// 5. RBBB
import rbbb1 from '../assets/ekg_scans/rbbb.jpg';
import rbbb2 from '../assets/ekg_scans/rbbb_2.jpg';
import rbbb3 from '../assets/ekg_scans/rbbb_3.jpg';
import rbbb4 from '../assets/ekg_scans/rbbb_4.jpg';

// 6. Atrieflimren
import afib1 from '../assets/ekg_scans/afib.jpg';
import afib2 from '../assets/ekg_scans/afib_2.jpg';
import afib3 from '../assets/ekg_scans/afib_3.jpg';

// 7. Atrieflagren
import aflutter1 from '../assets/ekg_scans/aflutter_1.jpg';
import aflutter2 from '../assets/ekg_scans/aflutter_2.jpg';
import aflutter3 from '../assets/ekg_scans/aflutter_3.jpg';

// 8. Ventrikulær Takykardi (VT)
import vt1 from '../assets/ekg_scans/vt_1.png';
import vt2 from '../assets/ekg_scans/vt_2.jpg';
import vt3 from '../assets/ekg_scans/vt_3.jpg';

// 9. Ventrikelflimren (VF)
import vf1 from '../assets/ekg_scans/vf_1.jpg';
import vf2 from '../assets/ekg_scans/vf_2.png';

// 10. Forlænget QTc & Torsades
import longQtc1 from '../assets/ekg_scans/long_qtc_1.jpg';
import longQtc2 from '../assets/ekg_scans/long_qtc_2.jpg';
import longQtc3 from '../assets/ekg_scans/long_qtc_3.jpg';

// 11. Hyperkaliæmi
import hyperkalemia1 from '../assets/ekg_scans/hyperkalemia_1.jpg';
import hyperkalemia2 from '../assets/ekg_scans/hyperkalemia_2.jpg';
import hyperkalemia3 from '../assets/ekg_scans/hyperkalemia_3.jpg';
import hyperkalemia4 from '../assets/ekg_scans/hyperkalemia_4.jpg';

// 12. Hypokaliæmi
import hypokalemia1 from '../assets/ekg_scans/hypokalemia_1.png';
import hypokalemia2 from '../assets/ekg_scans/hypokalemia_2.jpg';
import hypokalemia3 from '../assets/ekg_scans/hypokalemia_3.jpg';

// 13. Akut Perikarditis
import pericarditis1 from '../assets/ekg_scans/pericarditis_1.jpg';
import pericarditis2 from '../assets/ekg_scans/pericarditis_2.jpg';
import pericarditis3 from '../assets/ekg_scans/pericarditis_3.jpg';

// 14. AV-blok 1. grad
import avBlock1_1 from '../assets/ekg_scans/av_block_1_1.jpg';
import avBlock1_2 from '../assets/ekg_scans/av_block_1_2.jpg';
import avBlock1_3 from '../assets/ekg_scans/av_block_1_3.jpg';

// 15. AV-blok 2. grad Wenckebach (Mobitz I)
import avBlock2W_1 from '../assets/ekg_scans/av_block_2_wenckebach_1.png';
import avBlock2W_2 from '../assets/ekg_scans/av_block_2_wenckebach_2.png';
import avBlock2W_3 from '../assets/ekg_scans/av_block_2_wenckebach_3.png';

// 16. AV-blok 2. grad Mobitz II
import avBlock2M_1 from '../assets/ekg_scans/av_block_2_mobitz2_1.jpg';
import avBlock2M_2 from '../assets/ekg_scans/av_block_2_mobitz2_2.jpg';

// 17. AV-blok 3. grad (Totalblok)
import avBlock3_1 from '../assets/ekg_scans/av_block_3_1.jpg';
import avBlock3_2 from '../assets/ekg_scans/av_block_3_2.png';

// 18. Venstre Ventrikelhypertrofi (LVH)
import lvh1 from '../assets/ekg_scans/lvh_1.jpg';
import lvh2 from '../assets/ekg_scans/lvh_2.jpg';
import lvh3 from '../assets/ekg_scans/lvh_3.jpg';

// 19. Akut Posteriort STEMI (Bagvæg)
import posteriorStemi1 from '../assets/ekg_scans/posterior_stemi_1.jpg';
import posteriorStemi2 from '../assets/ekg_scans/posterior_stemi_2.png';
import posteriorStemiFull from '../assets/ekg_scans/posterior_stemi_1.png';

// 20. Akut Lungeemboli (Cor Pulmonale - S1Q3T3)
import pe1 from '../assets/ekg_scans/pulmonary_embolism_1.jpg';
import pe2 from '../assets/ekg_scans/pulmonary_embolism_2.jpg';
import pe3 from '../assets/ekg_scans/pulmonary_embolism_3.jpg';

export const CASE_CLINICAL_COMPARISONS = {
    // 1. NORMAL SINUSRYTME
    normal_sinus: {
        keyFindings: 'Regelmæssig sinusrytme (72 bpm), positiv P-tak foran hvert QRS i afledning II, normal hjerteakse (+60°), PR-interval 160 ms (normalt 120-200 ms), smalt QRS 85 ms (< 120 ms), isoelektrisk ST-segment og afrundede asymmetriske T-takker.',
        diffFromNormal: 'Dette er det fysiologiske reference-EKG. Alle tidsintervaller (PR, QRS, QTc), tak-amplituder og overledninger er inden for normale referencegrænser. Danner udgangspunkt for sammenligning med alle patologiske tilstande.',
        pathophysiology: 'Normal impulsudbredelse fra SA-knuden i højre atrium, fysiologisk forsinkelse i AV-knuden (sikrer fuld atrietømning) og lynhurtig synkron aktivering af begge ventrikler via His-Purkinje systemet fra endokardium mod epikardium.',
        clinicalCriteria: 'Sundhed.dk / DCS Kriterier for Normal-EKG: Frekvens 50-100/min, regelmæssig sinusrytme med positiv P i II og negativ i aVR, PR-interval 120-200 ms, QRS-bredde < 120 ms, normal akse (-30° til +90°), QTc < 440 ms (mænd) / < 460 ms (kvinder), normal R-progression i V1–V6 og isoelektrisk ST-segment.',
        sundhedDkTitle: 'Sundhed.dk: EKG-tjekliste i almen praksis',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/undersoegelser/ekg-tjekliste/',
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

    // 2. AKUT FORVÆGSINFARKT (ANTERIOR STEMI)
    anterior_stemi: {
        keyFindings: 'Karakteristiske konvekse ("tombstone") ST-elevationer på 4-6 mm i brystafledningerne V1–V4. Samtidige reciprokke ST-depressioner i de inferiore afledninger (II, III og aVF). Tab af normal r-progression i brystvæggen.',
        diffFromNormal: 'I et normalt EKG er ST-segmentet helt fladt (isoelektrisk på grundlinjen). Ved Anterior STEMI løftes ST-segmentet dramatisk flere millimeter op over grundlinjen pga. akut transmural iskæmi. T-takkerne bliver hyperakutte og fusionerer med ST-stykket. Modstående afledninger (II, III, aVF) udviser et elektrisk spejlbillede (reciprok ST-depression).',
        pathophysiology: 'Akut total trombotisk okklusion af LAD (Left Anterior Descending) arterien forårsager iltmangel i hele forvæggen og septum. De iskæmiske ventrikelmyocytter mister deres hvilemembranpotentiale, hvilket skaber en permanent skadestrøm (injury current) rettet fremad mod V1–V4.',
        clinicalCriteria: 'DCS Kriterier for STEMI: ST-elevation ved J-punktet i to sammenhængende afledninger: ≥ 2.0 mm hos mænd ≥ 40 år (≥ 2.5 mm hos mænd < 40 år) eller ≥ 1.5 mm hos kvinder i V2–V3, samt ≥ 1.0 mm i øvrige afledninger.',
        sundhedDkTitle: 'Sundhed.dk: ST-elevationsmyokardieinfarkt (STEMI)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/koronarsygdom/akut-koronart-syndrom/',
        dcsTitle: 'DCS Behandlingsvejledning: Akut Koronart Syndrom (AKS / STEMI)',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/aks/',
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

    // 3. AKUT INFERIORT INFARKT (INFERIOR STEMI)
    inferior_stemi: {
        keyFindings: 'Udtalte ST-elevationer i de tre inferiore afledninger II, III og aVF (her tydeligt i III og aVF). Reciprok ST-depression i I og aVL. Høj risiko for ledsagende AV-blok og sinusbradykardi.',
        diffFromNormal: 'Normale inferiore afledninger har fladt ST-segment og positiv R-tak. Ved inferior STEMI er ST-linjen løftet i bunden af hjertet. Fundet af ST-elevation i III og aVF ledsaget af reciprok depression i aVL er > 95% sensitivt og specifikt for akut koronarokklusion.',
        pathophysiology: 'Akut okklusion af RCA (Højre Koronararterie) eller sjældnere LCx. Da RCA forsyner AV-knuden hos ca. 90% af befolkningen, ses ofte ledsagende sinusbradykardi eller AV-blok.',
        clinicalCriteria: 'DCS Kriterier: ST-elevation ≥ 1.0 mm i mindst to af afledningerne II, III og aVF, ledsaget af reciprok depression i aVL.',
        sundhedDkTitle: 'Sundhed.dk: Akut myokardieinfarkt og koronarsygdom',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/koronarsygdom/akut-koronart-syndrom/',
        dcsTitle: 'DCS NBV: Revaskularisering ved akut STEMI',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/aks/',
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

    // 4. VENSTRESIDIGT GRENBLOK (LBBB)
    lbbb: {
        keyFindings: 'QRS-varighed markant forlænget til ≥ 120 ms (her 145 ms). Dyb, bred QS- eller rS-tak i V1–V2. Bred, kærvet eller plateaudannet R-tak (M-form) i laterale afledninger I, aVL, V5 og V6 uden normale septale Q-takker. Sekundære ST-T diskordante forandringer.',
        diffFromNormal: 'Et normalt QRS er smalt (< 120 ms) og har fysiologiske små septale q-takker i V5/V6. Ved LBBB forsvinder de septale q-takker fuldstændigt, fordi septum aktiveres i modsat retning (fra højre mod venstre). Hele venstre ventrikel aktiveres asynkront og forsinket, hvilket gør QRS-komplekset bredt, klodset og kærvet.',
        pathophysiology: 'Blokering i venstre grenbundt tvinger aktiveringsbølgen til først at gå gennem højre ventrikel og derefter sprede sig langsomt celle-til-celle gennem myokardiet til den store venstre ventrikel. Den asynkrone kontraktion nedsætter venstre ventrikels pumpefunktion.',
        clinicalCriteria: 'DCS / Sundhed.dk Kriterier: QRS ≥ 120 ms hos voksne, bred kærvet R-tak i I, aVL, V5–V6, fravær af q i V5–V6. OBS: Nyopstået LBBB ved mistanke om akut myokardieiskæmi skal håndteres som STEMI-ækvivalent!',
        sundhedDkTitle: 'Sundhed.dk: Grenblok og fascikelblok',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/undersoegelser/ekg-ledningsforstyrrelser/',
        dcsTitle: 'DCS Vejledning: Pacemakerbehandling & Ledningsforstyrrelser',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/pacemakerbehandling/',
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

    // 5. HØJRESIDIGT GRENBLOK (RBBB)
    rbbb: {
        keyFindings: 'QRS-varighed ≥ 120 ms (her 135 ms). Klassisk rsR\' ("kaninører" / M-mønster) i V1–V2. Bred, dyb og sløret S-tak i afledning I, aVL og V6 (W-formet afslutning i V6).',
        diffFromNormal: 'I et normalt EKG er V1 domineret af en lille r og en dyb, slank S-tak, og QRS er smalt (< 120 ms). Ved RBBB depolariseres venstre ventrikel først normalt, hvorefter den forsinkede højre ventrikel danner en ekstra, sen positiv tak (R\') i V1 og en sen bred S-tak i V6.',
        pathophysiology: 'Blokering i højre grenbundt. Venstre ventrikel aktiveres normalt via venstre gren, hvorefter impulsen spreder sig langsomt over i højre ventrikel. Den sene aktivering af højre ventrikel giver en kraftig vektor rettet fremad og mod højre.',
        clinicalCriteria: 'DCS / Sundhed.dk Kriterier: QRS ≥ 120 ms, rsR\' eller bred kærvet R i V1–V2, samt bred sløret S-tak (varighed > R eller > 40 ms) i afledning I og V6. RBBB kan forekomme hos hjertesunde, men kan også signalere højresidig belastning (lungeemboli, cor pulmonale).',
        sundhedDkTitle: 'Sundhed.dk: Højresidigt grenblok',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/undersoegelser/ekg-ledningsforstyrrelser/',
        dcsTitle: 'DCS Vejledning: Pacemakerbehandling & Ledningsforstyrrelser',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/pacemakerbehandling/',
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

    // 6. ATRIEFLIMREN (A-FLIMREN)
    afib: {
        keyFindings: 'Fuldstændig uregelmæssig hjerterytme (arrhythmia absoluta - uens afstande mellem R-takkerne). Total mangel på veldefinerede P-takker, som erstattes af uregelmæssige, fluktuerende f-bølger (flimrelinje på grundlinjen). Smalle QRS-komplekser.',
        diffFromNormal: 'Et normalt EKG har regelmæssige, identiske P-takker med fast PR-interval (120-200 ms) foran hvert eneste QRS, og hjerteaktionen er helt regelmæssig. Ved atrieflimren er der ingen koordineret atrieaktivering, ingen P-takker og helt tilfældige RR-intervaller.',
        pathophysiology: 'Kaotisk mikro-reentry elektrisk aktivitet i atrierne med frekvens på 400-600/min. AV-knuden fungerer som fysiologisk filter og overleder kun en brøkdel af impulserne helt uregelmæssigt til ventriklerne.',
        clinicalCriteria: 'DCS Kriterier: Uregelmæssige RR-intervaller uden P-takker af mindst 30 sekunders varighed på EKG/telemetri. Vigtigste kliniske fokus: Antikoagulation (AK-behandling vurderet ud fra CHA2DS2-VASc score) for at forebygge apopleksi.',
        sundhedDkTitle: 'Sundhed.dk: Atrieflimren og atrieflagren',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/arytmier/atrieflimren-og-flagren/',
        dcsTitle: 'DCS Behandlingsvejledning: Atrieflimren',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/af/',
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

    // 7. ATRIEFLAGREN (A-FLAGREN)
    aflutter: {
        keyFindings: 'Regelmæssige, savtaks-formede flutterbølger (F-bølger) med konstant frekvens på ca. 300/min, bedst synlige i II, III og aVF. Ventrikelfrekvensen er ofte præcis 150/min (ved 2:1 AV-blok) eller 100/min (ved 3:1 blok). Ingen flad isoelektrisk grundlinje i inferiore afledninger.',
        diffFromNormal: 'Normale atriebølger er diskrete afrundede P-takker efterfulgt af en flad isoelektrisk PR-linje. Ved atrieflagren oscillerer grundlinjen kontinuerligt som en savtakket klinge uden flad hvilefase.',
        pathophysiology: 'Makro-reentry kredsløb typisk mod uret i højre atrium omkring den cavotrikuspidale isthmus (CTI). AV-knuden kan ikke nå at overlede 300 impulser i minuttet og blokerer hver anden impuls fysiologisk.',
        clinicalCriteria: 'DCS Kriterier: Regelmæssig atriefrekvens på ca. 250-350/min med typisk savtakket udseende. Kurativ behandling er ofte radiofrekvensablation (RFA) af cavotrikuspidale isthmus.',
        sundhedDkTitle: 'Sundhed.dk: Atrieflagren i almen praksis',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/arytmier/atrieflimren-og-flagren/',
        dcsTitle: 'DCS Vejledning: Atrieflimren og -flagren',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/af/',
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

    // 8. VENTRIKULÆR TAKYKARDI (VT)
    vt: {
        keyFindings: 'Regelmæssig bredkomplekset takykardi (frekvens typisk 140-220 bpm, QRS > 120 ms og ofte > 140-160 ms). Ensartet bred QRS-morfologi (monomorf) eller variabel (polymorf). Tegn på AV-dissociation, fusionsslag og capture-beats.',
        diffFromNormal: 'Et normalt EKG har smalle QRS-komplekser styret af SA-knuden via His-Purkinje systemet. Ved VT udspringer impulsen fra et ektopisk fokus i ventrikelmyokardiet. Strømmen spredes langsomt muskelcelle-til-muskelcelle, hvilket giver kæmpe brede QRS-komplekser og ophæver atriernes kontrol over ventriklerne.',
        pathophysiology: 'Ofte et re-entry fænomen omkring arvæv efter tidligere myokardieinfarkt, eller udløst af iskæmi, kardiomyopati eller elektrolytforstyrrelser. Hæmodynamisk ustabilitet skyldes manglende fyldningstid og tab af atriebidrag (atrial kick).',
        clinicalCriteria: 'DCS Kriterier: Enhver bredkomplekset takykardi hos patient med tidligere AMI eller kendt hjertesygdom skal behandles som VT indtil det modsatte er bevist! Brugada- og Vereckei-kriterier benyttes til differentialdiagnose mod SVT med grenblok.',
        sundhedDkTitle: 'Sundhed.dk: Ventrikulær takykardi (Lægehåndbogen)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/arytmier/ventrikulaer-takykardi/',
        dcsTitle: 'DCS Vejledning: Ventrikulære arytmier',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/vt/',
        realEkgImages: [
            {
                id: 'vt1',
                title: '12-Aflednings EKG: Monomorf Ventrikulær Takykardi',
                badge: 'Akut Livstruende',
                caption: 'Klassisk monomorf VT med hjertefrekvens ~160 bpm, ekstremt brede QRS-komplekser (> 160 ms) og markant akseafvigelse.',
                src: vt1
            },
            {
                id: 'vt2',
                title: 'Lead II Rytmestrimmel: Hurtig VT (Vtach)',
                badge: 'Telemetri',
                caption: 'Rytmestrimmel af akut indsættende ventrikulær takykardi. Kræver akut vurdering for DC-konvertering eller antiarytmika.',
                src: vt2
            },
            {
                id: 'vt3',
                title: 'Fuldt 12-Aflednings Tracing: Klassisk Ventrikeltakykardi',
                badge: '12-Aflednings Tracing',
                caption: 'Højopløselig 12-aflednings optagelse. Tydelig AV-dissociation, fusion beats og ekstreme breddeforandringer der bekræfter ventrikulær oprindelse.',
                src: vt3
            }
        ]
    },

    // 9. VENTRIKELFLIMREN (VF)
    vf: {
        keyFindings: 'Fuldstændig kaotisk, uregelmæssig elektrisk aktivitet uden identificerbare P-takker, QRS-komplekser eller T-takker. Svingende amplitude og frekvens (150-500/min). Grov VF i starten, gradvist overgående i fin VF og til sidst asystoli.',
        diffFromNormal: 'Et normalt EKG har veldefinerede takker og koordineret pumpefunktion. Ved VF er der ingen koordineret mekanisk kontraktion af ventriklerne overhovedet – patienten er klinisk død med hjertestop uden puls og respiration.',
        pathophysiology: 'Flere samtidige kaotiske re-entry bølger i ventrikelmyokardiet. Ventriklerne sitrer mekanisk uden at pumpe blod ud i kredsløbet, hvilket medfører akut cirkulatorisk kollaps og irreversibel hjerneskade inden for få minutter uden HLR og defibrillering.',
        clinicalCriteria: 'DCS / ERC Retningslinjer: Stødbar hjertestoprytme! Omgående uafbrudt hjertelungeredning (30:2) og øjeblikkelig defibrillering med bifasisk DC-stød (150-200 J) hurtigst muligt. Adrenalin 1 mg og Amiodaron 300 mg iv jf. ALS-algoritmen.',
        sundhedDkTitle: 'Sundhed.dk: Hjertestop og genoplivning',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/akut-og-foerstehjaelp/tilstande-og-sygdomme/foerstehjaelp/akutte-medicinske-tilstande/ventrikelflimren-og-takykardi/',
        dcsTitle: 'DCS Vejledning: Genoplivning og Hjertestop',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/hjertestop/',
        realEkgImages: [
            {
                id: 'vf1',
                title: 'Akut Ventrikelflimren: Kaotisk Bølgemønster',
                badge: 'Stødbar Rytme (112)',
                caption: 'Klassisk grov ventrikelflimren under hjertestop. Ingen koordinerede QRS-komplekser; kræver omgående defibrillering.',
                src: vf1
            },
            {
                id: 'vf2',
                title: 'Kontinuerlig Monitorering: Overgang til VF',
                badge: 'Klinisk Registrering',
                caption: 'Telemetrisk registrering af ventrikulær fibrillering under monitoreret hjertestopforløb.',
                src: vf2
            }
        ]
    },

    // 10. MEDICIN-INDUCERET FORLÆNGET QTC & TORSADES DE POINTES
    long_qtc: {
        keyFindings: 'QTc-interval forlænget ud over øvre referencegrænse (mænd > 450 ms, kvinder > 460 ms; ved QTc > 500 ms er der høj risiko for Torsades de Pointes). Brede eller bifasiske T-takker, prominente U-takker eller T-bølge alternans.',
        diffFromNormal: 'I et normalt EKG slutter ventrikelforløbet (QTc) inden for 400-440 ms (mindre end halvdelen af RR-intervallet). Ved forlænget QTc forsinkes repolariseringen markant, hvilket skaber et sårbart tidsvindue ("R-on-T fænomen"), hvor et tidligt ekstraslag kan udløse malign ventrikelarytmi.',
        pathophysiology: 'Blokering af de spændingsafhængige hERG kaliumkanaler (IKr) forlænger aktionspotentialets fase 3. Særligt hyppigt udløst af psykofarmaka (antipsykotika som haloperidol, ziprasidon; antidepressiva som citalopram/escitalopram) eller elektrolytforstyrrelser.',
        clinicalCriteria: 'DCS Kriterier for Psykofarmaka: QTc > 500 ms (eller stigning > 60 ms fra baseline) kræver omgående dosisreduktion eller seponering af udløsende lægemiddel! Korrektion af elektrolytter (hypokaliæmi, hypomagnesiæmi). Ved Torsades gives magnesiumsulfat iv.',
        sundhedDkTitle: 'Sundhed.dk: Langt QT-syndrom (LQTS)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/arytmier/langt-qt-syndrom/',
        dcsTitle: 'DCS Vejledning: Farmakologisk påvirkning & Arytmier',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/farmaka/',
        realEkgImages: [
            {
                id: 'lqt1',
                title: 'Langt QT-syndrom Type 1: Ekstrem Repolariseringsforsinkelse',
                badge: 'QTc > 500 ms',
                caption: 'Patient med udtalt forlænget QTc. Bemærk den ekstremt sene afslutning af T-takken i forhold til det foregående QRS-kompleks.',
                src: longQtc1
            },
            {
                id: 'lqt2',
                title: 'Morfologiske Varianter af LQTS (LQT1, LQT2, LQT3)',
                badge: 'Subtyper & Morfologi',
                caption: 'Sammenligning af T-taks morfologi ved forskellige ionkanal-defekter og medicinpåvirkninger.',
                src: longQtc2
            },
            {
                id: 'lqt3',
                title: 'Klassisk LQT1 Bølgeform (Bredbaseret T-tak)',
                badge: 'LQT1 Mønster',
                caption: 'Skoleeksempel på type 1 langt QT-syndrom med sen og bredbaseret T-tak der optager størstedelen af hjertecyklussen.',
                src: longQtc3
            }
        ]
    },

    // 11. HYPERKALIÆMI
    hyperkalemia: {
        keyFindings: 'Høje, spidse, symmetriske T-takker med smal basis ("teltformede" T-takker), bedst synlige i brystafledningerne V2–V4. Ved sværere hyperkaliæmi ses affladning og tab af P-takker, breddeøget QRS og til sidst sinusbølge-mønster (høj risiko for ventrikelflimren og asystoli).',
        diffFromNormal: 'Normale T-takker er asymmetriske (stiger langsomt og falder hurtigere) og har en bred basis. Ved hyperkaliæmi bliver T-takkerne ekstremt høje, nålespidse og symmetriske som teltdug.',
        pathophysiology: 'Forhøjet ekstracellulært kalium (K+ > 5.5-6.0 mmol/L) øger membranens kaliumpermeabilitet, hvilket drastisk accelererer fase 3 repolariseringen (høje spidse T-takker) og nedsætter ledningshastigheden i hele ledningssystemet (bredt QRS).',
        clinicalCriteria: 'Akut livstruende medicinsk nødsituation ved K+ > 6.5 mmol/L. Kræver omgående akut EKG og akut behandling med calciumchlorid/calciumgluconat til stabilisering af kardiomyocytternes tærskelpotentiale, efterfulgt af glukose-insulin infusion.',
        sundhedDkTitle: 'Sundhed.dk: Hyperkaliæmi (Lægehåndbogen)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/generelt/tilstande-og-sygdomme/elektrolytforstyrrelser/hyperkaliaemi/',
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
    },

    // 12. HYPOKALIÆMI
    hypokalemia: {
        keyFindings: 'Affladede eller inverterede T-takker, fremtrædende U-takker (bedst synlige i V2–V4 som en ekstra positiv tak efter T-takken), ST-segment depression og forlænget QU-interval (der ofte fejltolkes som forlænget QT).',
        diffFromNormal: 'I et normalt EKG er T-takken den dominerende repolariseringsbølge, og U-takken er enten fraværende eller knap synlig. Ved hypokaliæmi skrumper T-takken, mens U-takken vokser og ofte bliver højere end T-takken.',
        pathophysiology: 'Lavt ekstracellulært kalium (K+ < 3.5 mmol/L) forsinker ventriklernes repolarisering og hyperpolariserer membranpotentialet. Dette øger ventriklernes excitabilitet og disponerer for både supraventrikulære og ventrikulære arytmier (særligt ved samtidig digitalisbehandling).',
        clinicalCriteria: 'DCS Kriterier: S-kalium < 3.0 mmol/L betragtes som moderat/svær og kræver substitution med kaliumchlorid (oralt eller iv under telemetri). Samtidig korrektion af hypomagnesiæmi er ofte nødvendig for at genoprette kaliumbalancen.',
        sundhedDkTitle: 'Sundhed.dk: Hypokaliæmi (Lægehåndbogen)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/generelt/tilstande-og-sygdomme/elektrolytforstyrrelser/hypokaliaemi/',
        dcsTitle: 'DCS Retningslinjer: Elektrolytforstyrrelser i kardiologien',
        dcsUrl: 'https://nbv.cardio.dk',
        realEkgImages: [
            {
                id: 'hypo1',
                title: 'Karakteristisk Hypokaliæmi-mønster med U-bølger',
                badge: 'U-takker & ST-fald',
                caption: 'Affladede T-takker efterfulgt af markante U-bølger i de prækordiale afledninger. Bemærk det pseudoforlængede QU-interval.',
                src: hypokalemia1
            },
            {
                id: 'hypo2',
                title: 'Klinisk Hospitalstracing: Svær Hypokaliæmi',
                badge: 'Virkelig Patient',
                caption: '12-aflednings EKG fra patient med kaliummangel. Tydelig udbredt ST-depression og abnorme repolariseringsbølger.',
                src: hypokalemia2
            },
            {
                id: 'hypo3',
                title: 'Svær Hypokaliæmi: Kæmpe U-takker & Arytmirisiko',
                badge: 'U-Tak Fænomen',
                caption: 'Svær elektrolytforstyrrelse (< 2.5 mmol/L). U-takkerne dominerer fuldstændig efter-depolariseringen og øger risikoen for Torsades de Pointes.',
                src: hypokalemia3
            }
        ]
    },

    // 13. AKUT PERIKARDITIS
    pericarditis: {
        keyFindings: 'Udbredte konkave ("hængekøje"-formede) ST-elevationer i næsten alle afledninger (I, II, III, aVL, aVF, V2–V6) UDEN reciprokke ST-depressioner (undtagen i aVR og sjældent V1). Karakteristisk PR-segmentsænkning (PR-depression), som er et af de tidligste og mest specifikke tegn.',
        diffFromNormal: 'Et normalt EKG har isoelektrisk ST- og PR-segment. Forskellen fra STEMI er afgørende: Ved STEMI er ST-elevationen konveks/hvælvet og begrænset til ét anatomisk koronarterritorium med reciprokke depressioner. Ved perikarditis er inflammationen diffus i hele hjertesækken, hvorfor elevationerne er konkave og ses i næsten samtlige afledninger.',
        pathophysiology: 'Inflammation i det viscerale og parietale perikardium skaber en overfladisk epikardiel skadestrøm over hele hjertets overflade. Atriernes epikardium afficeres også, hvilket forårsager den karakteristiske PR-segmentsænkning.',
        clinicalCriteria: 'DCS Kriterier for Akut Perikarditis (mindst 2 af 4): 1) Pleuritiske, stillingsafhængige brystsmerter (lindres ved foroverbøjning), 2) Perikardiel gnidningslyd ved stetoskopi, 3) Typiske EKG-forandringer (udbredt konkav ST-elevation + PR-depression), 4) Perikardieekssudat på ekkokardiografi.',
        sundhedDkTitle: 'Sundhed.dk: Akut perikarditis',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/oevrige-sygdomme/perikardit/',
        dcsTitle: 'DCS NBV: Perikardiesygdomme',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/perikardiesygdomme/',
        realEkgImages: [
            {
                id: 'peri1',
                title: 'Akut Perikarditis: Udbredt Konkav ST-elevation',
                badge: 'Diffus Hængekøje-form',
                caption: 'Klassisk perikarditis-EKG med konkave elevationer i både ekstremitets- og brystafledninger samt PR-depression.',
                src: pericarditis1
            },
            {
                id: 'peri2',
                title: 'Hospitalsoptagelse: Typisk PR-depression',
                badge: 'PR-depression',
                caption: '12-aflednings hospital-EKG der viser udbredte ST-elevationer og ledsagende PR-depression som differentialdiagnose til STEMI.',
                src: pericarditis2
            },
            {
                id: 'peri3',
                title: 'Klinisk Forløb af Perikarditis (Stadium I-IV)',
                badge: 'Klinisk Arkiv',
                caption: 'Stadium I perikarditis med udbredt ST-elevation forud for normalisering og T-taks inversion i senere stadier.',
                src: pericarditis3
            }
        ]
    },

    // 14. AV-BLOK 1. GRAD
    av_block_1: {
        keyFindings: 'Konstant forlænget PR-interval > 200 ms (> 5 små tern / 1 stort tern) ved alle hjerteslag. Hver eneste P-tak efterfølges af et QRS-kompleks (1:1 overledning uden udfald). Regelmæssig hjerteaktion.',
        diffFromNormal: 'I et normalt EKG er PR-intervallet 120-200 ms. Ved 1. grads AV-blok er forsinkelsen i AV-knuden øget, men ingen impulser blokeres fuldstændigt.',
        pathophysiology: 'Abnorm fysiologisk eller patologisk ledningsforsinkelse i AV-knuden. Kan være et uskyldigt fund hos veltrænede unge atleter (høj vagustone), men kan også skyldes medicin (betablokkere, verapamil, digoxin) eller aldersbetinget degenerativ ledningssygdom.',
        clinicalCriteria: 'Sundhed.dk / DCS Kriterier: PR > 200 ms. Kræver som udgangspunkt ingen pacemakerbehandling alene, men medicingennemgang for AV-nodale hæmmere bør foretages.',
        sundhedDkTitle: 'Sundhed.dk: AV-blok 1. grad',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/undersoegelser/ekg-ledningsforstyrrelser/',
        dcsTitle: 'DCS Vejledning: Pacemakerbehandling & Bradykardi',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/pacemakerbehandling/',
        realEkgImages: [
            {
                id: 'av1_1',
                title: '12-Aflednings Ark: Forlænget PR-interval (280 ms)',
                badge: 'Konstant PR > 200 ms',
                caption: 'Rent AV-blok 1. grad. Se det lange flade stykke mellem P-takkens start og QRS-komplekset uden et eneste tabt hjerteslag.',
                src: avBlock1_1
            },
            {
                id: 'av1_2',
                title: 'Hospitalsregistrering: Markant AV-forsinkelse',
                badge: 'Hospitalsarkiv',
                caption: 'Konstant forsinket impulsudbredelse gennem AV-knuden med normal QRS-morfologi.',
                src: avBlock1_2
            },
            {
                id: 'av1_3',
                title: 'Kombineret AV-blok 1. grad + RBBB',
                badge: 'Bifascikulært Blok',
                caption: 'Bifascikulær ledningshindring: forlænget PR-interval kombineret med højresidigt grenblok. Kræver tæt klinisk opfølgning for progression.',
                src: avBlock1_3
            }
        ]
    },

    // 15. AV-BLOK 2. GRAD WENCKEBACH (MOBITZ I)
    av_block_2_wenckebach: {
        keyFindings: 'Gradvis forlængelse af PR-intervallet fra slag til slag, indtil en P-tak pludselig ikke overledes (et QRS falder ud). Efter det tabte slag er det næste PR-interval det korteste i cyklussen, hvorefter sekvensen gentager sig ("Wenckebach-periodicitet"). RR-intervallerne bliver paradoksalt kortere op til udfaldet.',
        diffFromNormal: 'Et normalt EKG har et helt fast PR-interval ved alle slag. Ved Wenckebach udtrættes AV-knuden progressivt, indtil den refraktære tilstand forhindrer én enkelt impuls i at passere.',
        pathophysiology: 'Funktionel udtrætning i selve AV-knuden. Ofte benign og reversibel (fx under søvn hos unge pga. vagustone eller under akut inferiort STEMI pga. iskæmi i RCA/AV-nodal gren).',
        clinicalCriteria: 'DCS Kriterier: Behandlingskrævende pacemaker er sjældent indiceret ved asymptomatisk Wenckebach, medmindre der er udtalt bradykardi med symptomer (svimmelhed, synkope).',
        sundhedDkTitle: 'Sundhed.dk: AV-blok 2. grad (Wenckebach)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/undersoegelser/ekg-ledningsforstyrrelser/',
        dcsTitle: 'DCS Vejledning: Pacemakerbehandling & Bradykardi',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/pacemakerbehandling/',
        realEkgImages: [
            {
                id: 'wenck1',
                title: 'Klassisk Wenckebach-periodicitet (5:4 Blokering)',
                badge: 'Gradvis PR-forlængelse',
                caption: 'Klassisk Wenckebach-sekvens. Bemærk hvordan PR-intervallet bliver længere for hvert hjerteslag, indtil den 5. P-tak ikke efterfølges af et QRS.',
                src: avBlock2W_1
            },
            {
                id: 'wenck2',
                title: '5:4 Wenckebach Periode (Progressiv Ledningsforsinkelse)',
                badge: '5:4 Overledning',
                caption: 'Skoleeksempel på trinvis stigning i overledningstid (PR fra 160 ms til 320 ms) efterfulgt af blokeret P-tak.',
                src: avBlock2W_2
            },
            {
                id: 'wenck3',
                title: 'Klinisk Rytmestrimmel: Mobitz I med Gruppe-slag',
                badge: 'CardioNetworks Arkiv',
                caption: 'Kontinuerlig hospitalsmonitorering visende karakteristisk grupperet rytme (footprints of Wenckebach) med vekslende R-R intervaller og pauser.',
                src: avBlock2W_3
            }
        ]
    },

    // 16. AV-BLOK 2. GRAD MOBITZ TYPE II
    av_block_2_mobitz2: {
        keyFindings: 'Konstant, uændret PR-interval efterfulgt af pludseligt og uvarslet udfald af ét eller flere QRS-komplekser. Ingen forudgående forlængelse af PR-intervallet. Ofte ledsaget af breddeøget QRS (grenblok). Høj risiko for akut progression til totalblok (Adams-Stokes anfald).',
        diffFromNormal: 'Modsat Wenckebach, hvor overledningen bliver gradvist længere, er PR-intervallet ved Mobitz II helt konstant før udfaldet.',
        pathophysiology: 'Blokeringen sidder dybere i ledningssystemet (infranodalt i His\' bundt eller grenbundterne) pga. strukturel fibrose eller svær iskæmi. His-Purkinje cellerne arbejder efter "alt-eller-intet" princippet og fejler pludseligt.',
        clinicalCriteria: 'DCS Kriterier: Absolut klasse I indikation for permanent pacemaker! Mobitz II er ustabil og livstruende, uanset om patienten aktuelt har symptomer eller ej.',
        sundhedDkTitle: 'Sundhed.dk: AV-blok Mobitz type II',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/undersoegelser/ekg-ledningsforstyrrelser/',
        dcsTitle: 'DCS Vejledning: Pacemakerbehandling & Bradykardi',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/pacemakerbehandling/',
        realEkgImages: [
            {
                id: 'mob2_1',
                title: 'Mobitz II: Uvarslet Bortfald af QRS-kompleks',
                badge: 'Pacemaker Indikation',
                caption: 'Konstante PR-intervaller med pludseligt isoleret udfald af QRS. Indikerer infranodal ledningsdefekt med høj risiko for totalblok.',
                src: avBlock2M_1
            },
            {
                id: 'mob2_2',
                title: '2:1 AV-blokering (Hvert Andet Slag Blokeret)',
                badge: '2:1 Overledning',
                caption: 'Avanceret 2. grads AV-blok med 2:1 overledning. Kræver nøje vurdering om blokket er nodalt eller infranodalt.',
                src: avBlock2M_2
            }
        ]
    },

    // 17. AV-BLOK 3. GRAD (TOTAL AV-BLOK)
    av_block_3: {
        keyFindings: 'Fuldstændig AV-dissociation: P-takkerne og QRS-komplekserne slår helt uafhængigt af hinanden med hver deres faste frekvens. Atriefrekvensen (PP-interval) er hurtigere end ventrikelfrekvensen (RR-interval). Erstatningsrytmen kan være nodal (smalle QRS, 40-50 bpm) eller ventrikulær/idioventrikulær (brede QRS, 20-40 bpm).',
        diffFromNormal: 'I et normalt EKG udløses ethvert QRS af en forudgående P-tak. Ved totalblok er forbindelsen mellem atrier og ventrikler fuldstændig afbrudt.',
        pathophysiology: 'Total blokering i AV-knuden eller His-Purkinje systemet. Ventriklerne holdes kun i gang af en langsom, ustabil perifer erstatningsrytme, hvilket medfører svær bradykardi, hypotension og risiko for asystoli.',
        clinicalCriteria: 'DCS Kriterier: Akut livstruende tilstand! Kræver indlæggelse på kardiologisk afdeling under kontinuerlig telemetri, akut temporær pacing ved hæmodynamisk ustabilitet (eller isoprenalin/atropin som nødbehandling) og permanent pacemaker (PPM).',
        sundhedDkTitle: 'Sundhed.dk: Tredjegrads AV-blok (Totalblok)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/undersoegelser/ekg-ledningsforstyrrelser/',
        dcsTitle: 'DCS Vejledning: Pacemakerbehandling ved Totalblok',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/pacemakerbehandling/',
        realEkgImages: [
            {
                id: 'av3_1',
                title: 'Total AV-blok: Komplet AV-dissociation',
                badge: 'Totalblok (PPM påkrævet)',
                caption: 'P-takker vandrer uafhængigt hen over grundlinjen og ind i QRS-komplekserne. Ventrikelfrekvensen er langsom og regelmæssig (~35 bpm).',
                src: avBlock3_1
            },
            {
                id: 'av3_2',
                title: 'Klinisk Rytmestrimmel: 3. Grads Hjerteblok',
                badge: 'Idioventrikulær Rytme',
                caption: 'Langsom bredkomplekset erstatningsrytme ved totalt ledningsstop i AV-knuden.',
                src: avBlock3_2
            }
        ]
    },

    // 18. VENSTRE VENTRIKELHYPERTROFI (LVH)
    lvh: {
        keyFindings: 'Høje R-takker i de laterale afledninger (I, aVL, V5, V6) og dybe S-takker i de højresidige brystafledninger (V1, V2). Sekundære repolariseringsforandringer ("LVH strain"-mønster: asymmetrisk ST-depression og T-taks inversion i I, aVL, V5, V6). Venstredrejet akse.',
        diffFromNormal: 'Et normalt EKG har moderate voltager (< 35 mm sammenlagt). Ved LVH medfører den fortykkede venstre ventrikelvæg langt kraftigere elektriske vektorer og forlænget depolariseringstid.',
        pathophysiology: 'Kronisk trykbelastning (hypertension, aortastenose) eller volumenbelastning tvinger kardiomyocytterne i venstre ventrikel til hypertrofi for at modstå vægspændingen (Laplaces lov). Den øgede muskelmasse genererer kraftigere voltager mod venstre og bagud.',
        clinicalCriteria: 'Sokolow-Lyon Kriterium: S i V1 + R i V5 eller V6 ≥ 35 mm (3.5 mV). Cornell Voltagescore: R i aVL + S i V3 > 28 mm (mænd) eller > 20 mm (kvinder). Ekkokardiografi er guldstandard til verifikation af vægtykkelse og masse.',
        sundhedDkTitle: 'Sundhed.dk: Venstre ventrikelhypertrofi (LVH)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/undersoegelser/ekg-tjekliste/',
        dcsTitle: 'DCS Vejledning: Arteriel Hypertension og Hjertepåvirkning',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/hypertension/',
        realEkgImages: [
            {
                id: 'lvh1',
                title: 'Klassisk LVH: Sokolow-Lyon Kriterier Opfyldt (> 35 mm)',
                badge: 'Sokolow-Lyon ≥ 35 mm',
                caption: 'Klassiske kæmpevoltager med dyb S i V1-V2 og tårnhøj R i V5. Samlet voltage overstiger 45 mm.',
                src: lvh1
            },
            {
                id: 'lvh2',
                title: 'LVH med Sekundær Repolariseringsbelastning (Strain)',
                badge: 'Strain Mønster',
                caption: 'Udtalt venstre ventrikelbelastning med nedadskrånende ST-depression og asymmetrisk negative T-takker i I, aVL og V5-V6.',
                src: lvh2
            },
            {
                id: 'lvh3',
                title: 'LVH kombineret med Venstre Anterior Hemiblok (LAH)',
                badge: 'LVH + LAH',
                caption: 'Svær venstresidig hypertrofi ledsaget af udtalt venstredrejet akse som tegn på fascikelblok.',
                src: lvh3
            }
        ]
    },

    // 19. AKUT POSTERIORT INFARKT (BAGVÆGSINFARKT)
    posterior_stemi: {
        keyFindings: 'Horisontal ST-depression i V1–V3, høje brede R-takker i V1–V2 (R/S ratio > 1) og opretstående høje T-takker. Dette er det direkte elektriske spejlbillede (inverteret billede) af et transmuralt infarkt på hjertets bagvæg. Verificeres ved ST-elevation ≥ 0.5 mm i de dorsale afledninger V7–V9.',
        diffFromNormal: 'I et normalt EKG er V1 domineret af en lille r og dyb S-tak med isoelektrisk ST-segment. Ved bagvægsinfarkt kigger de anteriore afledninger V1–V3 på "bagsiden" af skadestrømmen, så en posterior ST-elevation registreres som en anterior ST-depression!',
        pathophysiology: 'Akut okklusion af arteria circumflexa (LCx) eller en distal gren af RCA forårsager transmural iskæmi i hjertets posterobasale væg. Da der ikke sidder standardelektroder på ryggen, registreres skadestrømmen omvendt forfra.',
        clinicalCriteria: 'DCS Kriterier: ST-depression i V1–V3 hos patient med akutte brystsmerter skal ALTID give mistanke om posteriort STEMI! Kræver supplerende optagelse af bagvægsafledninger V7–V9. Ved ST-elevation ≥ 0.5 mm i V7–V9 aktiveres akut STEMI-kald til KAG/PCI.',
        sundhedDkTitle: 'Sundhed.dk: Akut koronarsygdom og atypiske infarkter',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/koronarsygdom/akut-koronart-syndrom/',
        dcsTitle: 'DCS NBV: Posteriort STEMI og supplerende afledninger (V7-V9)',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/aks/',
        realEkgImages: [
            {
                id: 'post1',
                title: 'Posteriort STEMI: Spejlbillede i V1-V3 (Vendt Test)',
                badge: 'V7-V9 Bagvægsinfarkt',
                caption: 'Klassisk spejlbilled-fænomen: De horisontale ST-depressioner og høje R-takker i V1-V3 vender her om til klassisk ST-elevation når EKG-arket betragtes bagfra mod lyset.',
                src: posteriorStemi1
            },
            {
                id: 'post2',
                title: 'Spejltesten: Flipped V1-V3 Afslører Elevation',
                badge: 'Spejlvendt Test',
                caption: 'Når tracinget fra V1-V3 vendes spejlvendt på hovedet ("the mirror test"), fremstår den horisontale depression som en umiskendelig transmural ST-elevation!',
                src: posteriorStemi2
            },
            {
                id: 'post3',
                title: 'Højopløselig Bagvægsoptagelse (V1-V6)',
                badge: 'Hospitalsarkiv',
                caption: 'Komplet 12-aflednings hospitalstracing af akut bagvægsinfarkt (okklusion af circumflexa). Tydelig R/S ratio > 1 i V2 og markant ST-depression.',
                src: posteriorStemiFull
            }
        ]
    },

    // 20. AKUT LUNGEEMBOLI (COR PULMONALE - S1Q3T3)
    pulmonary_embolism: {
        keyFindings: 'Sinustakykardi (det hyppigste fund, > 90%), akut højre ventrikelbelastning med T-taks inversion i V1–V4, ukomplet eller komplet RBBB, højredrejet hjerteakse og det klassiske McGinn-White mønster: S1Q3T3 (dyb S i afledning I, patologisk Q i III og inverteret T i III).',
        diffFromNormal: 'Et normalt EKG har normal akse, slanke højre ventrikel voltager og ingen isolerede Q-takker i afledning III. Ved massiv lungeemboli stiger trykket i lungekredsløbet akut, hvilket dilaterer højre ventrikel og drejer hjertet anatomisk.',
        pathophysiology: 'Tromboembolisk okklusion af truncus pulmonalis eller store lungearteriegrene giver akut trykstigning i det pulmonale karsystem. Højre ventrikel overbelastes akut (cor pulmonale), hvilket medfører iskæmi i højre ventrikelvæg og rotation af hjertets elektriske akse mod højre.',
        clinicalCriteria: 'DCS / ESC Kriterier for Akut Lungeemboli: EKG er sjældent diagnostisk alene, men afspejler graden af akut højre ventrikelbelastning! S1Q3T3 ses kun hos ca. 15-20% ved større embolier. Vigtigste diagnostiske redskab er CT-pulmonal angiografi (CTPA) og D-dimer.',
        sundhedDkTitle: 'Sundhed.dk: Lungeemboli (Lægehåndbogen)',
        sundhedDkUrl: 'https://www.sundhed.dk/sundhedsfaglig/laegehaandbogen/hjerte-kar/tilstande-og-sygdomme/tromboembolisk-sygdom/lungeemboli/',
        dcsTitle: 'DCS NBV: Akut lungeemboli og højresidig overbelastning',
        dcsUrl: 'https://nbv.cardio.dk/kapitel/lungeemboli/',
        realEkgImages: [
            {
                id: 'pe1',
                title: 'Akut Lungeemboli: Klassisk S1Q3T3 & Sinustakykardi',
                badge: 'S1Q3T3 Mønster',
                caption: 'Klassisk akut cor pulmonale: Dyb S-tak i afledning I, Q-tak og negativ T-tak i afledning III samt takykardi.',
                src: pe1
            },
            {
                id: 'pe2',
                title: 'Højresidig Belastning: Prækordial T-inversion (V1-V3)',
                badge: 'Akut Cor Pulmonale',
                caption: 'Inverterede T-takker i højre brystafledninger V1-V3 som følge af akut iskæmi i den trykbelastede højre ventrikel.',
                src: pe2
            },
            {
                id: 'pe3',
                title: 'Kucher Tegn (QR-mønster i V1) ved Massiv Emboli',
                badge: 'Kucher Tegn',
                caption: 'QR-mønster i V1 (Kucher-tegn) indikerer svær pulmonal hypertension og udtalt højre ventrikelsvigt.',
                src: pe3
            }
        ]
    }
};
