export const GUIDELINES_RICH_DATA = {
  "bipolar": {
    "id": "bipolar",
    "sourceBadge": "RADS Referenceprogram & Sundhedsstyrelsen NKR (2021)",
    "title": "Medicinsk Behandling af Bipolar Lidelse",
    "subtitle": "Evidensbaserede retningslinjer for Type I, Type II, mani, depression og vedligeholdelse",
    "pdfs": [
      {
        "title": "RADS Bipolar Lidelse (Original PDF)",
        "url": "/pdf/beh-bipolar-okt-2015-221233.pdf"
      },
      {
        "title": "Pixi-udgave Bipolar",
        "url": "/pdf/bipolar-lidelse-pixiudgave-februar-2016.pdf"
      },
      {
        "title": "NKR Farmakologisk Behandling",
        "url": "/pdf/nkr-for-farmakologisk-behandling-af-bipolar-lidelse.pdf"
      }
    ],
    "takeaways": [
      {
        "type": "emerald",
        "title": "Kerne-Differentiering (Type I vs Type II)",
        "text": "Type I forudsætter mindst én fuld manisk episode (afledt svær funktionsnedsættelse, indlæggelse el. psykose). Type II har kun hypomanier og må ALDRIG have haft en fuld mani."
      },
      {
        "type": "blue",
        "title": "Akut Mani vs Akut Bipolar Depression",
        "text": "Mani: Quetiapin, Aripiprazol, Olanzapin, Risperidon el. Lithium som 1. valg. Bipolar depression: Quetiapin 1. valg; SSRI kun under dække af maniforebyggende (antimanisk) præparat."
      },
      {
        "type": "rose",
        "title": "Sikkerhed: Lithium TDM & Valproat-restriktioner",
        "text": "Lithium kræver snæver TDM-kontrol (0,6-0,8 mmol/L vedligeholdelse, 0,8-1,2 ved akut mani). Valproat er strengt kontraindiceret til fertile kvinder (årligt graviditetsforebyggende program) og har skærpede restriktioner for mænd."
      }
    ],
    "algorithm": [
      {
        "stepNumber": 1,
        "badge": "Klassifikation & Diagnostik",
        "title": "Diagnostisk Skelnen: Type I, Type II og Blandingstilstande",
        "summary": "Korrekt polaritets- og typeskelnen er afgørende for valg af farmakologisk strategi.",
        "keyPoints": [
          "Bipolar Type I: Mindst én verificeret manisk episode. Ofte svære depressive episoder.",
          "Bipolar Type II: Mindst én hypoman episode og mindst én depressiv episode. ALDRIG fuld mani.",
          "Blandingstilstand: Samtidig tilstedeværelse af maniske og depressive symptomer (høj selvmordsrisiko).",
          "Organiske årsager, somatiske lidelser (f.eks. hyperthyreose) og rusmiddeludløst mani skal udelukkes."
        ],
        "action": "Fastlæg polaritet og type ved hjælp af anamnese og interview. Tag baseline EKG, elektrolytter, nyre- og levertal samt TSH før behandlingsstart.",
        "details": "RADS og CANMAT guidelines understreger, at ubehandlet bipolar lidelse har en markant høj recidivrate og høj selvmordsrisiko. Hurtig diagnostisk afklaring og stabilisering er essentiel."
      },
      {
        "stepNumber": 2,
        "badge": "Akut Fase",
        "title": "Akut Manisk Episode (Type I)",
        "summary": "Antipsykotika (Quetiapin, Aripiprazol, Olanzapin, Risperidon) eller Lithium som 1. valg.",
        "keyPoints": [
          "1. Valg: Atypisk antipsykotikum (Quetiapin, Aripiprazol, Olanzapin eller Risperidon) eller Lithium.",
          "Lithium: Anvendes i monoterapi ved mild til moderat mani. Kræver optitrering mod 0,8-1,0 mmol/l.",
          "Valproat: Effektivt, men med skærpede restriktioner (kontraindiceret til fertile kvinder).",
          "Kombination: Ved manglende respons på monoterapi kombineres to præparater (f.eks. Lithium + Atypisk antipsykotikum). To antipsykotika bør undgås samtidigt.",
          "ECT: Højeffektivt (effekt hos 80%) og kan være livreddende ved delirøs/behandlingsresistent mani."
        ],
        "action": "Opstart 1. valgs atypisk antipsykotikum eller Lithium. Ved svær agitation overvejes kortvarig tillæg af benzodiazepin (f.eks. clonazepam/lorazepam).",
        "warning": "Valproat må IKKE anvendes til piger eller kvinder i den fødedygtige alder, medmindre vilkårene i det graviditetsforebyggende program er opfyldt. Nyeste EMA/Lægemiddelstyrelsen-data pålægger også forsigtighed for mænd."
      },
      {
        "stepNumber": 3,
        "badge": "Akut Fase",
        "title": "Akut Depressiv Episode ved Bipolar Lidelse",
        "summary": "Quetiapin er 1. valg. Antidepressiva i monoterapi er KONTRAINDICERET ved Bipolar Type I.",
        "keyPoints": [
          "1. Valg: Quetiapin (300 mg dgl.) er det bedst dokumenterede monoterapi-præparat.",
          "2. Valg: Lithium, Lamotrigin eller Lurasidon.",
          "Kombinationsbehandling: Kombination af Lithium + Quetiapin eller Lithium + Lamotrigin.",
          "Antidepressiva (SSRI): Må ALDRIG gives som monoterapi ved Type I pga. risiko for stemningsomslag (manisk switch) og rapid cycling. Må kun gives under dække af maniforebyggende stemningsstabilisator."
        ],
        "action": "Start Quetiapin med optitrering til 300 mg til aften. Monitorér for sedation og ortostatisk hypotension.",
        "details": "Depressive episoder udgør den tidsmæssigt største sygdomsbyrde for patienter med bipolar lidelse. Antidepressiv monoterapi uden stemningsstabiliserende dække frarådes stærkt i alle internationale retningslinjer."
      },
      {
        "stepNumber": 4,
        "badge": "Komplekse Tilstande",
        "title": "Blandingstilstande (Mixed Episodes)",
        "summary": "Kombineret manisk og depressiv symptomatologi. Antipsykotika og Valproat/Lithium foretrækkes.",
        "keyPoints": [
          "Manisk blandingstilstand: Aripiprazol, Olanzapin eller Ziprasidon som 1. valg.",
          "Depressiv blandingstilstand: Lamotrigin, Lithium, Quetiapin eller Olanzapin.",
          "Antidepressiva bør seponeres hurtigt, da de kan forværre blandingstilstanden og øge suicidalitet."
        ],
        "action": "Seponér eventuelle antidepressiva. Etabler stemningsstabiliserende behandling med atypisk antipsykotikum og/eller Lithium.",
        "details": "Blandingstilstande er forbundet med markant forhøjet selvmordsfare pga. kombinationen af depressiv forpinthed og manisk energi/impulsivitet."
      },
      {
        "stepNumber": 5,
        "badge": "Subtype Specifik",
        "title": "Bipolar Lidelse Type II",
        "summary": "Lithium, Quetiapin og Lamotrigin er 1. valg. Depressive episoder er den primære udfordring.",
        "keyPoints": [
          "1. Valg: Quetiapin, Lithium eller Lamotrigin.",
          "Lamotrigin har særlig god evidens som forebyggende mod depressive recidiver ved Type II.",
          "SSRI kan i udvalgte tilfælde overvejes som tillæg ved Type II, men fordrer fortsat agtpågivenhed for hypomant skift."
        ],
        "action": "Optitrér Lamotrigin meget langsomt (jf. optrapningsskema) for at minimere risiko for livstruende hududslæt (Stevens-Johnson syndrom).",
        "details": "Ved Bipolar Type II er hypomanierne sjældent behandlingskrævende i sig selv; fokus er rettet mod at forhindre langvarige invaliderende depressioner."
      },
      {
        "stepNumber": 6,
        "badge": "Langtidsbehandling",
        "title": "Vedligeholdelse & Lithium-monitorering",
        "summary": "Forebyggelse af nye episoder kræver ofte flerårig eller livslang medicinsk behandling.",
        "keyPoints": [
          "Forebyggelse af mani: Lithium, Quetiapin, Aripiprazol, Olanzapin, Risperidon.",
          "Forebyggelse af depression: Lithium, Quetiapin, Lamotrigin.",
          "Lithium er guldstandarden og har veldokumenteret antisuicidal effekt.",
          "TDM (Therapeutic Drug Monitoring): Standardiseret 12-timers dalværdi hver 3. måned.",
          "Mål-serumkoncentration ved vedligeholdelse: 0,6 - 0,8 mmol/L (ældre ofte 0,4 - 0,6 mmol/L)."
        ],
        "action": "Planlæg faste kontrolintervaller med nyretal (kreatinin, eGFR), TSH, Ca2+ og EKG hver 6.-12. måned.",
        "warning": "Lithium-toksicitet indtræder typisk ved serum-lithium > 1,5 mmol/L (grove tremor, ataksi, sløvhed, opkastning/diarré, kramper). Kræver omgående seponering, væskebehandling og evt. hæmodialyse ved svær forgiftning."
      },
      {
        "stepNumber": 7,
        "badge": "Særlige Grupper",
        "title": "Børn, Unge, Gravide og Ammende",
        "summary": "Specialiseret håndtering i B&U-psykiatri eller obstetrisk-psykiatrisk team.",
        "keyPoints": [
          "Børn/Unge (<18 år): Aripiprazol, Quetiapin og Risperidon er 1. valg ved mani. Olanzapin undgås pga. massiv vægtøgning.",
          "Gravide: Valproat er STRENGT kontraindiceret. Lithium medfører let øget risiko for Ebsteins anomali, men kan i visse svære tilfælde videreføres efter specialistkonference under tæt TDM-kontrol.",
          "ECT er en sikker og skånsom mulighed ved svær behandlingsresistent mani/depression under graviditet."
        ],
        "action": "Henvis altid gravide med bipolar lidelse til regionalt obstetrisk-psykiatrisk team.",
        "details": "Recidivrisikoen i puerperiet (efter fødslen) er ekstremt høj (op mod 50-70%) ved ubehandlet bipolar lidelse, hvorfor forebyggende plan for fødslen og barselsperioden skal foreligge i god tid."
      }
    ],
    "medications": [
      {
        "category": "Stemningsstabiliserende (Guldstandard)",
        "drugs": [
          {
            "name": "Lithium (Lithionit)",
            "class": "Stemningsstabilisator",
            "line": "1. Valg",
            "startDose": "1-2 depottabletter (83-166 mg) til aften",
            "targetDose": "Styres efter serumkoncentration (0,6-0,8 mmol/L)",
            "maxDose": "TDM-styret (toksisk > 1,5 mmol/L)",
            "notes": "Mani- og depressionsforebyggende. Dokumenteret antisuicidal effekt. 12-timers dalværdi."
          },
          {
            "name": "Lamotrigin (Lamictal)",
            "class": "Antiepileptikum / Stemningsstabilisator",
            "line": "1. Valg (Depression)",
            "startDose": "25 mg dgl. i 2 uger, derefter 50 mg dgl. i 2 uger",
            "targetDose": "100-200 mg dgl. (op til 400 mg)",
            "maxDose": "400 mg dgl.",
            "notes": "Særdeles effektiv mod bipolar depression. Langsom optitrering obligatorisk pga. Stevens-Johnson syndrom. Dosis halveres ved samtidig Valproat!"
          },
          {
            "name": "Valproat (Deprakine)",
            "class": "Antiepileptikum / Stemningsstabilisator",
            "line": "2. Valg (Mani)",
            "startDose": "500-1000 mg dgl.",
            "targetDose": "1000-2000 mg dgl. (serum: 350-700 µmol/L)",
            "maxDose": "2500 mg dgl.",
            "notes": "Effektiv mod mani. OBS: Skærpede restriktioner pga. teratogenicitet (kontraindiceret til fertile kvinder) og mandlig fertilitet."
          }
        ]
      },
      {
        "category": "Atypiske Antipsykotika (SGA)",
        "drugs": [
          {
            "name": "Quetiapin (Seroquel)",
            "class": "Atypisk antipsykotikum (SGA)",
            "line": "1. Valg (Mani & Depression)",
            "startDose": "50-100 mg dgl. ved sengetid",
            "targetDose": "300 mg dgl. ved depression, 400-800 mg ved mani",
            "maxDose": "800 mg dgl.",
            "notes": "Unikt præparat med dokumenteret effekt på både akut mani, akut depression og vedligeholdelse. Sedation og vægtøgning."
          },
          {
            "name": "Aripiprazol (Abilify)",
            "class": "D2 partiel agonist (SGA)",
            "line": "1. Valg (Mani)",
            "startDose": "10-15 mg dgl.",
            "targetDose": "15 mg dgl.",
            "maxDose": "30 mg dgl.",
            "notes": "Minimal vægtøgning og metabolisk påvirkning. God mod mani og maniforebyggelse. Pas på akatisi i opstart."
          },
          {
            "name": "Olanzapin (Zyprexa)",
            "class": "Atypisk antipsykotikum (SGA)",
            "line": "1. Valg (Akut Mani)",
            "startDose": "10-15 mg dgl.",
            "targetDose": "10-20 mg dgl.",
            "maxDose": "20 mg dgl.",
            "notes": "Hurtig og kraftig antimanisk og sedativ effekt. Høj risiko for vægtøgning og metabolisk syndrom."
          },
          {
            "name": "Risperidon (Risperdal)",
            "class": "Atypisk antipsykotikum (SGA)",
            "line": "1. Valg (Akut Mani)",
            "startDose": "2 mg dgl.",
            "targetDose": "2-6 mg dgl.",
            "maxDose": "6 mg dgl.",
            "notes": "Effektiv mod mani. Dosisafhængig risiko for ekstrapyramidale symptomer (EPS) og hyperprolaktinæmi."
          }
        ]
      }
    ],
    "monitoring": {
      "title": "Lithium TDM, Paraklinik & Metabolisk Monitorering",
      "items": [
        {
          "title": "Lithium Serumkoncentration (TDM)",
          "frequency": "Ugentligt i opstart, derefter hver 3. måned",
          "description": "Standardiseret prøvetagning præcis 12 timer efter aftendosis (12-timers dalværdi). Mål: 0,6-0,8 mmol/L (akut mani: 0,8-1,0 mmol/L, ældre: 0,4-0,6 mmol/L)."
        },
        {
          "title": "Nyrefunktion (Kreatinin, eGFR, væsketal)",
          "frequency": "Baseline, efter 3 mdr., derefter hver 6. måned",
          "description": "Lithium kan give nefrogen diabetes insipidus og kronisk nedsat eGFR. Vurder dosisreduktion ved faldende eGFR."
        },
        {
          "title": "Thyreoidea (TSH og frit T4)",
          "frequency": "Baseline og hver 6.-12. måned",
          "description": "Lithium inducerer ofte hypotyreose. Behandles med Levothyroxin uden at seponere Lithium."
        },
        {
          "title": "Calcium (Ioniseret Calcium)",
          "frequency": "Baseline og årligt",
          "description": "Lithium kan inducere primær hyperparatyreoidisme med hypercalcæmi."
        },
        {
          "title": "Metabolisk Monitorering for Antipsykotika",
          "frequency": "Baseline, 3 mdr. og årligt",
          "description": "Vægt, taljemål, faste-blodsukker/HbA1c, lipidstatus og blodtryk. EKG ved opstart og dosisøgning."
        }
      ],
      "ratingScales": [
        {
          "name": "YMRS (Young Mania Rating Scale)",
          "indication": "Mani-sværhedsgrad",
          "target": "< 12 (Remission < 8)"
        },
        {
          "name": "HAM-D6 / HAM-D17",
          "indication": "Depression-sværhedsgrad",
          "target": "HAM-D6 < 5 (Remission)"
        },
        {
          "name": "MDQ (Mood Disorder Questionnaire)",
          "indication": "Screening for bipolære træk",
          "target": "≥ 7 ja-svar + problembekræftelse"
        }
      ]
    },
    "specialGroups": [
      {
        "title": "Graviditet og Bipolar Lidelse",
        "content": "Valproat er absolut kontraindiceret pga. høj teratogenicitet (neuralrørsdefekter) og kognitiv udviklingshæmning hos barnet. Lithium medfører let øget risiko for Ebsteins hjerteanomali (fra 1:20.000 til ca. 1:1.000), men kan videreføres ved høj recidivfare efter specialistkonference under tæt kontrol. ECT er et sikkert alternativ."
      },
      {
        "title": "Seponering og Recidivrisiko",
        "content": "Pludselig seponering af stemningsstabiliserende medicin medfører massiv risiko for akut recidiv (ofte inden for uger). Udtrapning skal altid ske gradvist over mindst 2-4 måneder i stabil fase under tæt klinisk monitorering."
      }
    ]
  },
  "psykose_voksne": {
    "id": "psykose_voksne",
    "sourceBadge": "Sundhedsstyrelsen NKR & RADS (2016) · Region Midt Retningslinje",
    "title": "Psykotiske Tilstande (inkl. Skizofreni) hos Voksne",
    "subtitle": "NKR og RADS-vejledning for voksne (F20-F29)",
    "pdfs": [
      {
        "title": "RADS Psykotiske Tilstande (Original PDF)",
        "url": "/pdf/beh-jan-2016-psykotiske-tilstande-hos-voksne.pdf"
      },
      {
        "title": "Forholdsregler Antipsykotika",
        "url": "/pdf/forholdsregler_antipsykotika_voksne.pdf"
      },
      {
        "title": "NKR Medicinsk Behandling Skizofreni",
        "url": "/pdf/medicisk-behandling-af-voksne-diagnosticeret-med-skizofreni.pdf"
      }
    ],
    "takeaways": [
      {
        "type": "emerald",
        "title": "Førstelinje Monoterapi (SGA)",
        "text": "Atypiske 2.-generations antipsykotika (SGA) i laveste effektive dosis er 1. valg. Aripiprazol, Risperidon el. Olanzapin. Monitorér respons tæt de første 2-4 uger."
      },
      {
        "type": "blue",
        "title": "Behandlingsresistens: Clozapin overvejes tidligt",
        "text": "Ved manglende respons på 2 forskellige antipsykotika i sufficient dosis i 4-6 uger (mindst ét SGA), skal Clozapin (Leponex) altid tilbydes! Clozapin er overlegent ved terapiresistens."
      },
      {
        "type": "rose",
        "title": "Kardiologisk & Metabolisk Sikkerhed",
        "text": "EKG med QTc-måling før opstart og ved dosisøgning. Metabolisk syndrom skal monitoreres regelmæssigt. Ved Clozapin er ugentlig ANC-blodprøvekontrol obligatorisk de første 18 uger."
      }
    ],
    "algorithm": [
      {
        "stepNumber": 1,
        "badge": "Forundersøgelser",
        "title": "1. Forprøver & Somatisk Screening (Før Behandlingsstart)",
        "summary": "Obligatorisk paraklinik og somatisk udredning for at udelukke organisk ætiologi og sikre baseline.",
        "keyPoints": [
          "Somatisk udredning: Delir, cerebral lidelse (scanning/CT), infektion, endokrinopati og intoksikation udelukkes.",
          "Laboratorieprøver: Væsketal, kreatinin, ALAT, TSH, faste-blodsukker/HbA1c, lipidstatus, hæmatologi.",
          "Kardiovaskulær screening: Blodtryk, puls og standard 12-afledningers EKG (med fokus på QTc-interval).",
          "Fysiske målinger: Vægt, højde (BMI) og taljemål."
        ],
        "action": "Gennemfør somatisk og laboratoriemæssig screening forud for medicinstart. Ved QTc > 450 ms (mænd) eller > 470 ms (kvinder) skal kardiologisk konference afholdes.",
        "details": "Forholdsregler ved anvendelse af antipsykotika (Region Midt & DCS/DPS) kræver systematisk registrering for at forebygge overdødelighed som følge af kardiovaskulære risikofaktorer."
      },
      {
        "stepNumber": 2,
        "badge": "Første Behandlingsforsøg",
        "title": "2. Førstevalgspræparater (Monoterapi)",
        "summary": "Opstart med et 2.-generations antipsykotikum i laveste effektive dosis.",
        "keyPoints": [
          "1. Valg: Aripiprazol, Risperidon, Paliperidon eller Olanzapin.",
          "Start i lav dosis og optitrér gradvist over 1-2 uger.",
          "Præparatvalg styres af bivirkningsprofil: Aripiprazol foretrækkes ved ønske om at undgå vægtøgning og sedation; Olanzapin giver hurtig dæmpning men massiv metabolisk risiko.",
          "Evaluering: Første respons vurderes inden for 2-4 uger. Ved manglende effekt efter 4-6 uger på sufficient dosis bør skift overvejes."
        ],
        "action": "Vælg præparat i samråd med patienten. Aftal konkret opfølgning efter 1, 2 og 4 uger.",
        "details": "Førstegangspsykose-patienter responderer ofte på markant lavere doser end kronisk syge, men er samtidig mere sårbare over for ekstrapyramidale bivirkninger og vægtøgning."
      },
      {
        "stepNumber": 3,
        "badge": "Skift / 2. Valg",
        "title": "3. Andet Behandlingsforsøg ved Utilstrækkelig Effekt",
        "summary": "Krydstitrering til et andet antipsykotikum med en anden bivirknings- og receptorprofil.",
        "keyPoints": [
          "Ved terapisvigt eller uacceptable bivirkninger skiftes til et andet 1. valgspræparat eller 2. valg (f.eks. Ziprasidon, Haloperidol el. Quetiapin).",
          "Skift gennemføres som krydstitrering: Aftrapning af første præparat over 1-3 uger sideløbende med langsom optrapning af det nye præparat.",
          "Pludselig seponering af høj-affinitetspræparater kan udløse kolinergt eller dopaminergt rebound-syndrom."
        ],
        "action": "Gennemfør struktureret krydstitrering. Evaluer klinisk effekt på psykotiske kernesymptomer (PANSS / CGI)."
      },
      {
        "stepNumber": 4,
        "badge": "Behandlingsresistens",
        "title": "4. Behandlingsresistens: Clozapin (Leponex)",
        "summary": "Clozapin skal altid tilbydes ved manglende respons på 2 adækvate behandlingsforsøg.",
        "keyPoints": [
          "Definition: Manglende klinisk remission trods behandling med mindst 2 forskellige antipsykotika i sufficient dosis i mindst 4-6 uger.",
          "Clozapin er det mest potente antipsykotikum og det eneste med dokumenteret effekt ved terapiresistens og udtalt suicidalfare.",
          "Agranulocytose-risiko: Absolut krav om hæmatologisk monitorering (ANC / leukocytter) ugentligt de første 18 uger, derefter hver 4. uge.",
          "Gastrointestinal obstruktion (ileus): Myokarditis og svær obstipation er potentielt dødelige bivirkninger, som kræver aktiv profylakse."
        ],
        "action": "Informer patienten grundigt og tilmeld det obligatoriske Clozapin-kontrolprogram. Etabler laksantia-profylakse fra dag 1.",
        "warning": "Clozapin må KUN ordineres, hvis der foreligger godkendt og aktuelt leukocyttal med differentialtælling (ANC ≥ 1,5 x 10^9/L). Omgående seponering ved tegn på neutropeni eller myokarditis."
      },
      {
        "stepNumber": 5,
        "badge": "Monitorering & Efterkontrol",
        "title": "5. Langtidsmonitorering & Bivirkningskontrol",
        "summary": "Systematisk opfølgning for at forebygge kardiovaskulær morbiditet og tardive dyskinesier.",
        "keyPoints": [
          "3 måneder efter opstart: Vægt, taljemål, blodtryk, EKG, faste-blodsukker/HbA1c og lipidstatus.",
          "Derefter årligt somatisk tjek hos alle patienter i antipsykotisk behandling.",
          "Ekstrapyramidale symptomer (EPS): Vurderes regelmæssigt (parkinsonisme, akatisi, dystoni). Ved tardive dyskinesier overvejes skift til Clozapin el. Quetiapin.",
          "Prolaktin: Kontrolleres ved seksuelle bivirkninger, galaktore eller amenoré (især ved Risperidon)."
        ],
        "action": "Sikr at patienten er tilknyttet fast årskontrol for metabolisk syndrom i ambulatorium eller almen praksis."
      },
      {
        "stepNumber": 6,
        "badge": "Compliance & Depot",
        "title": "6. Depotbehandling (Long-Acting Injectables - LAI)",
        "summary": "Overvejes ved complianceproblemer eller efter patientønske for at sikre stabil serumkoncentration.",
        "keyPoints": [
          "Depotformuleringer (LAI): Aripiprazol (Abilify Maintena), Paliperidon (Xeplion/Trevicta), Risperidon (Risperdal Consta), Zuclopenthixol (Cisordinol Depot).",
          "Skal ALTID være afprøvet peroralt forinden for at sikre tolerance og udelukke alvorlige bivirkninger.",
          "Reducerer risikoen for recidiv og genindlæggelse markant sammenlignet med peroral behandling ved ustabil medicinindtagelse."
        ],
        "action": "Drøft depotbehandling som en tryg mulighed for at undgå daglig pillehuskning ved ustabil compliance."
      }
    ],
    "medications": [
      {
        "category": "1. Valgs Atypiske Antipsykotika (SGA)",
        "drugs": [
          {
            "name": "Aripiprazol (Abilify)",
            "class": "D2 partiel agonist / 5-HT2A antagonist",
            "line": "1. Valg",
            "startDose": "5-10 mg dgl.",
            "targetDose": "10-15 mg dgl.",
            "maxDose": "30 mg dgl.",
            "notes": "Førstevalg ved kardiometabolisk risiko. Minimal vægtøgning og sedation. Pas på akatisi."
          },
          {
            "name": "Risperidon (Risperdal)",
            "class": "D2/5-HT2A antagonist",
            "line": "1. Valg",
            "startDose": "1-2 mg dgl.",
            "targetDose": "2-4 mg dgl.",
            "maxDose": "6-8 mg dgl.",
            "notes": "Højeffektivt mod positive symptomer. Dosis over 4 mg øger EPS markant. Øger prolaktin."
          },
          {
            "name": "Olanzapin (Zyprexa)",
            "class": "Multireceptorantagonist (MARTA)",
            "line": "1. Valg (ved akut agitation)",
            "startDose": "5-10 mg dgl.",
            "targetDose": "10-20 mg dgl.",
            "maxDose": "20 mg dgl.",
            "notes": "Særdeles effektivt ved uro og svære hallucinationer. Høj risiko for vægtøgning og metabolisk syndrom."
          },
          {
            "name": "Paliperidon (Invega / Xeplion)",
            "class": "Aktiv metabolit af Risperidon",
            "line": "1. Valg",
            "startDose": "3-6 mg dgl. (depot: opstartsdoser)",
            "targetDose": "6-9 mg dgl.",
            "maxDose": "12 mg dgl.",
            "notes": "Udskilles primært renalt (færre CYP-interaktioner). Findes som måneds- og 3-måneders depot."
          }
        ]
      },
      {
        "category": "Behandlingsresistens & Andre",
        "drugs": [
          {
            "name": "Clozapin (Leponex)",
            "class": "Multireceptorantagonist (SGA)",
            "line": "Guldstandard ved resistens",
            "startDose": "12,5 mg dag 1, langsom optrapning",
            "targetDose": "200-450 mg dgl. (serum: 1000-2000 nmol/L)",
            "maxDose": "900 mg dgl.",
            "notes": "Eneste antipsykotikum med dokumenteret effekt ved terapiresistens og selvmord. Obligatorisk ANC-kontrol!"
          },
          {
            "name": "Quetiapin (Seroquel)",
            "class": "Atypisk antipsykotikum",
            "line": "2. Valg",
            "startDose": "50 mg dgl.",
            "targetDose": "400-800 mg dgl. ved psykose",
            "maxDose": "800 mg dgl.",
            "notes": "Lav EPS-risiko. Udtalt sedation og vægtøgning. Velegnet ved parkinsonisme eller tardive dyskinesier."
          },
          {
            "name": "Haloperidol (Serenase)",
            "class": "Klassisk 1.-generations antipsykotikum (FGA)",
            "line": "2. Valg / Akut",
            "startDose": "1-2 mg dgl.",
            "targetDose": "2-5 mg dgl.",
            "maxDose": "10 mg dgl.",
            "notes": "Potent D2-blokade uden metabolisk påvirkning. Høj risiko for EPS, dystoni og tardive dyskinesier."
          }
        ]
      }
    ],
    "monitoring": {
      "title": "Obligatorisk Paraklinik & Metabolisk Monitorering",
      "items": [
        {
          "title": "EKG & QTc-interval",
          "frequency": "Baseline, efter dosisøgning og årligt",
          "description": "Mange antipsykotika kan forlænge QTc. Grænseværdier: QTc > 450 ms (mænd) og > 470 ms (kvinder) fordrer konference. QTc > 500 ms medfører akut seponeringspligt."
        },
        {
          "title": "Hæmatologi ved Clozapin (ANC)",
          "frequency": "Ugentligt i 18 uger, derefter hver 4. uge",
          "description": "Absolut neutrofiltal (ANC) skal være ≥ 1,5 x 10^9/L. Ved fald til 1,0-1,5 monitoreres dagligt; ved < 1,0 seponeres omgående."
        },
        {
          "title": "Metabolisk Syndrom (HbA1c, Lipider, Vægt, Taljemål)",
          "frequency": "Baseline, 3 mdr. og årligt",
          "description": "Antipsykotika (især Olanzapin, Clozapin) øger risiko for type 2 diabetes og dyslipidæmi."
        },
        {
          "title": "Serumkoncentration (TDM)",
          "frequency": "Ved stabil dosis, terapisvigt eller mistanke om non-compliance",
          "description": "Sikrer at patienten er i det terapeutiske vindue og udelukker abnorm metabolisme (CYP2D6 / CYP1A2)."
        }
      ],
      "ratingScales": [
        {
          "name": "PANSS (Positive and Negative Syndrome Scale)",
          "indication": "Psykosesymptomer",
          "target": "≥ 20-50% reduktion"
        },
        {
          "name": "AIMS (Abnormal Involuntary Movement Scale)",
          "indication": "Tardive dyskinesier",
          "target": "Score 0 (ingen bevægelsesforstyrrelser)"
        },
        {
          "name": "BARS (Barnes Akathisia Rating Scale)",
          "indication": "Akatisi (motorisk rastløshed)",
          "target": "Score 0"
        }
      ]
    },
    "specialGroups": [
      {
        "title": "Førstegangspsykose (OPUS-målgruppe)",
        "content": "Unge voksne med debuterende psykose bør visiteres til specialiseret OPUS-team. Start i lavere doser (f.eks. aripiprazol 5-10 mg el. risperidon 1-2 mg) for at minimere bivirkninger og sikre alliance."
      },
      {
        "title": "Tardive Dyskinesier",
        "content": "Ufrivillige bevægelser i ansigt, tunge eller ekstremiteter efter længere tids antipsykotisk behandling. Aftrap det udløsende præparat og overvej skift til Clozapin eller Quetiapin."
      }
    ]
  },
  "adhd": {
    "id": "adhd",
    "sourceBadge": "Sundhedsstyrelsen NKR & RADS (2016)",
    "title": "Medicinsk Behandling af ADHD / ADD for Voksne",
    "subtitle": "NKR og RADS-vejledning for voksne (F90)",
    "pdfs": [
      {
        "title": "RADS ADHD Voksne (Original PDF)",
        "url": "/pdf/rads_adhd-pixi_4.pdf"
      },
      {
        "title": "NKR ADHD Voksne",
        "url": "/pdf/national-klinisk-retningslinje-adhd-hos-voksne.pdf"
      },
      {
        "title": "Behandlingsvejledning ADHD",
        "url": "/pdf/adhd-beh-juni-2016.pdf"
      }
    ],
    "takeaways": [
      {
        "type": "emerald",
        "title": "Førstelinje: Centralstimulerende Depot (Methylphenidat)",
        "text": "Modificeret/langtidsvirkende Methylphenidat er 1. valg. Ved utilstrækkelig effekt eller bivirkninger skiftes til Lisdexamfetamin (Aduvanz). Hurtigtvirkende anvendes kun som supplement."
      },
      {
        "type": "blue",
        "title": "Andenlinje & Ikke-centralstimulerende (Atomoxetin)",
        "text": "Atomoxetin (Strattera) er 1. valg ved kendt misbrug, udtalte tics eller kardiovaskulære kontraindikationer. Latenstid på 4-6 uger før fuld effekt."
      },
      {
        "type": "rose",
        "title": "Kardiovaskulær Sikkerhed & Blodtryk",
        "text": "BT og puls skal måles før opstart og ved enhver dosisjustering. EKG ved kardiologisk disposition eller bilyd. Pas på misbrugs- og videredistributionsrisiko."
      }
    ],
    "algorithm": [
      {
        "stepNumber": 1,
        "badge": "Forundersøgelser",
        "title": "1. Diagnostik & Kardiovaskulær Screening",
        "summary": "Grundig diagnostisk udredning og kardiovaskulær risikovurdering forud for medicinering.",
        "keyPoints": [
          "Diagnosen skal være stillet af speciallæge i psykiatri jf. ICD-10 (DF90/DF98). Symptomer fra tidlig barndom (< 7 år).",
          "Kardiovaskulær screening: Blodtryk, hvilepuls og kardiologisk anamnese (familiær disposition til pludselig død < 40 år).",
          "EKG tages ved kendt hjertesygdom, hypertension, bilyd eller familiær disposition.",
          "Misbrugsscreening: Urintox-screening ved mistanke om aktivt rusmiddelbrug."
        ],
        "action": "Mål baseline BT, puls og vægt. Ved systolisk BT > 140 eller puls > 100 udredes somatisk før opstart.",
        "details": "ADHD-medicin stimulerer det sympatiske nervesystem og medfører i gennemsnit en stigning i puls på 3-6 slag/min og BT på 2-4 mmHg."
      },
      {
        "stepNumber": 2,
        "badge": "Førstevalg",
        "title": "2. Førstevalg: Methylphenidat med Modificeret Udskillelse",
        "summary": "Opstart med langtidsvirkende methylphenidat (Ritalin Uno, Concerta, Medikinet CR).",
        "keyPoints": [
          "Startdosis: Typisk 18-20 mg om morgenen.",
          "Dosis øges gradvist med 10-20 mg med mindst 1-2 ugers interval.",
          "Måldosis for voksne er typisk 30-60 mg dgl. (maks. 80-108 mg dgl.).",
          "Langtidsvirkende formuleringer foretrækkes for at sikre jævn dækning over dagen og mindske misbrugsrisiko.",
          "Korttidsvirkende methylphenidat kan undtagelsesvis anvendes som lille eftermiddagsdosis (rebound-dæmpning)."
        ],
        "action": "Start med depottablet om morgenen sammen med morgenmåltid for at minimere appetitløshed og kvalme.",
        "details": "Cirka 70% af voksne med ADHD oplever markant symptomreduktion på methylphenidat. Evaluér med ASRS-skala."
      },
      {
        "stepNumber": 3,
        "badge": "Andenlinje",
        "title": "3. Andetvalg: Lisdexamfetamin (Aduvanz)",
        "summary": "Ved manglende respons på methylphenidat skiftes til lisdexamfetamin.",
        "keyPoints": [
          "Lisdexamfetamin er et prodrug, der omdannes i erytrocytterne til aktivt d-amfetamin (giver jævn effekt og lavt misbrugspotentiale).",
          "Startdosis: 20-30 mg om morgenen.",
          "Optitreres med 20 mg ugentligt til måldosis på 50-70 mg dgl. (maks. 70 mg dgl.).",
          "Mange patienter, som ikke responderer på methylphenidat, opnår god effekt af lisdexamfetamin."
        ],
        "action": "Skift direkte eller med 1 dags pause fra methylphenidat til Lisdexamfetamin 30 mg om morgenen."
      },
      {
        "stepNumber": 4,
        "badge": "Ikke-centralstimulerende",
        "title": "4. Tredjevalg / Alternativ: Atomoxetin (Strattera)",
        "summary": "Ikke-centralstimulerende præparat (selektiv noradrenalingenoptagelseshæmmer).",
        "keyPoints": [
          "Førstevalg ved: Aktivt misbrug/afhængighedshistorik, svær komorbid angst, udtalte tics eller kardiovaskulære kontraindikationer for centralstimulantia.",
          "Startdosis: 40 mg dgl. i 1-2 uger, derefter måldosis 80-100 mg dgl.",
          "Vigtigt: Fuld effekt indtræder først efter 4-6 ugers behandling. Intet misbrugspotentiale."
        ],
        "action": "Informer patienten om latenstiden før fuld klinisk effekt."
      },
      {
        "stepNumber": 5,
        "badge": "Opfølgning & Kontrol",
        "title": "5. Fast Opfølgning & Årskontrol",
        "summary": "Løbende kontrol af kardiovaskulære parametre, effekt og bivirkningsprofil.",
        "keyPoints": [
          "Hver 3. måned i stabil fase: Blodtryk, puls, vægt og symptomscore (ASRS).",
          "Årligt: Vurdering af fortsat behandlingsindikation og eventuel behandlingspause (f.eks. i ferie).",
          "Afslutning til egen læge: Når patienten er velbehandlet og stabil i speciallægeregi, kan videre receptfornyelse og årskontrol overgå til almen praksis."
        ],
        "action": "Sikr systematisk journalføring af BT og puls ved enhver receptudstedelse på centralstimulantia."
      }
    ],
    "medications": [
      {
        "category": "Centralstimulerende Midler",
        "drugs": [
          {
            "name": "Methylphenidat (Concerta, Ritalin Uno, Medikinet)",
            "class": "Dopamin- og noradrenalingenoptagelseshæmmer",
            "line": "1. Valg",
            "startDose": "18-20 mg om morgenen",
            "targetDose": "36-54 mg dgl.",
            "maxDose": "80 mg dgl. (op til 108 mg efter konference)",
            "notes": "Førstevalg til voksne. Vælg altid depotpræparat. Monitorér BT og puls."
          },
          {
            "name": "Lisdexamfetamin (Aduvanz)",
            "class": "Amfetamin prodrug",
            "line": "2. Valg (ved methylphenidat-svigt)",
            "startDose": "30 mg om morgenen",
            "targetDose": "50-70 mg dgl.",
            "maxDose": "70 mg dgl.",
            "notes": "Lang virkningsvarighed (op til 14 timer). Lavere misbrugsrisiko pga. prodrug-mekanisme."
          },
          {
            "name": "Dexamfetamin (Attentin)",
            "class": "Korttidsvirkende amfetamin",
            "line": "Specialistpræparat",
            "startDose": "5 mg 1-2 gange dgl.",
            "targetDose": "10-20 mg dgl.",
            "maxDose": "40 mg dgl.",
            "notes": "Kort virkningstid (4-6 timer). Anvendes primært som supplement til depotbehandling."
          }
        ]
      },
      {
        "category": "Ikke-centralstimulerende Midler",
        "drugs": [
          {
            "name": "Atomoxetin (Strattera)",
            "class": "Selektiv noradrenalingenoptagelseshæmmer (SNRI-lignende)",
            "line": "Alternativ / 1. valg ved misbrug",
            "startDose": "40 mg dgl.",
            "targetDose": "80-100 mg dgl.",
            "maxDose": "100 mg dgl.",
            "notes": "Intet misbrugspotentiale. Latenstid 4-6 uger. Kvalme, mundtørhed, erektil dysfunktion."
          },
          {
            "name": "Guanfacin (Intuniv)",
            "class": "Selektiv alfa-2A adrenerg receptoragonist",
            "line": "3. Valg (Off-label voksne)",
            "startDose": "1 mg ved sengetid",
            "targetDose": "2-4 mg dgl.",
            "maxDose": "7 mg dgl.",
            "notes": "Sænker blodtryk og puls. Særligt velegnet ved tics, agitation eller svær impulsivitet."
          }
        ]
      }
    ],
    "monitoring": {
      "title": "Kardiovaskulær & Somatisk Monitorering",
      "items": [
        {
          "title": "Blodtryk og Hvilepuls",
          "frequency": "Baseline, ved hver dosisjustering og hver 3. måned",
          "description": "Vedvarende systolisk BT > 140 mmHg, diastolisk > 90 mmHg eller puls > 100 bpm kræver dosisreduktion eller antihypertensiv behandling."
        },
        {
          "title": "Vægt og BMI",
          "frequency": "Hver 3.-6. måned",
          "description": "Centralstimulantia hæmmer appetitten og kan medføre utilsigtet vægttab."
        },
        {
          "title": "Psykiatrisk Komorbiditet & Misbrug",
          "frequency": "Løbende",
          "description": "Vær opmærksom på fremkomst af tics, angst, søvnløshed eller videredistribution af medicinen."
        }
      ],
      "ratingScales": [
        {
          "name": "ASRS v1.1 (Adult ADHD Self-Report Scale)",
          "indication": "Symptom monitorering",
          "target": "Normalisering af kernesymptomer"
        },
        {
          "name": "WEISS Functional Impairment Scale",
          "indication": "Funktionsnedsættelse i hverdagen",
          "target": "Forbedret funktionsniveau"
        }
      ]
    },
    "specialGroups": [
      {
        "title": "ADHD og Samtidigt Rusmiddelmisbrug",
        "content": "Ved aktivt kaotisk misbrug skal misbruget stabiliseres forud for centralstimulerende behandling. Atomoxetin er 1. valg pga. manglende misbrugs- og euforiserende potentiale. Ved brug af centralstimulantia vælges altid Lisdexamfetamin el. Concerta med kontrolleret udlevering."
      },
      {
        "title": "Bipolar Lidelse og ADHD Komorbiditet",
        "content": "Den bipolære lidelse skal ALTID stabiliseres med stemningsstabiliserende medicin (Lithium el. antipsykotikum), FØR der opstartes ADHD-medicin, for at undgå at udløse mani."
      }
    ]
  },
  "angst": {
    "id": "angst",
    "sourceBadge": "National Rekommandationsliste (NRL 2020) & DPS",
    "title": "Angsttilstande i Almen Praksis",
    "subtitle": "NRL 2020 for farmakologisk behandling af GAD, panikangst og socialfobi (F40-F41)",
    "pdfs": [
      {
        "title": "NRL Angsttilstande (Original PDF)",
        "url": "/pdf/farmakologisk-behandling-i-almen-praksis-af-angsttilstande_2020.pdf"
      }
    ],
    "takeaways": [
      {
        "type": "emerald",
        "title": "Førstevalg: SSRI (Sertralin el. Escitalopram)",
        "text": "SSRI er 1. valg ved alle primære angsttilstande (GAD, panikangst, socialfobi). Start i HALV dosis af depressionsdosis for at undgå paradoks forværring af angsten."
      },
      {
        "type": "blue",
        "title": "Andenlinje: SNRI (Venlafaxin el. Duloxetin)",
        "text": "SNRI anvendes ved manglende respons på SSRI. Pregabalin kan overvejes ved GAD efter specialistkonference. Buspiron KUN ved GAD (ingen effekt ved panikangst eller socialfobi)."
      },
      {
        "type": "rose",
        "title": "Strenge Benzodiazepin-restriktioner",
        "text": "Benzodiazepiner (Oxazepam, Diazepam) må ALDRIG bruges som fast langtidsbehandling. Kun til absolut akut krise i få dage (maks. 1-2 uger) pga. massiv afhængighedsrisiko."
      }
    ],
    "algorithm": [
      {
        "stepNumber": 1,
        "badge": "Klassifikation",
        "title": "1. Diagnostisk Afklaring & Ikke-farmakologisk Indsats",
        "summary": "Kortlæg specifik angsttype (GAD, panikangst, socialfobi, agorafobi) og tilbyd psykoterapi.",
        "keyPoints": [
          "Kognitiv adfærdsterapi (KAT) er førstevalg ved alle angstlidelser og bør tilbydes forud for eller parallelt med medicin.",
          "Internetpsykiatrien (www.internetpsykiatrien.dk) er et gratis, evidensbaseret online tilbud til panikangst og socialfobi.",
          "Somatisk screening: Udeluk somatisk årsag til palpitationer/angst (thyreotoksikose, arytmi, koffein/energidrikke, rusmidler)."
        ],
        "action": "Tag somatiske prøver (TSH, elektrolytter, EKG) og henvis til psykolog / Internetpsykiatrien."
      },
      {
        "stepNumber": 2,
        "badge": "Førstevalg",
        "title": "2. Førstevalg: SSRI Monoterapi",
        "summary": "Sertralin eller Escitalopram er 1. valg ved GAD, Panikangst og Socialfobi.",
        "keyPoints": [
          "Start i LAV dosis: Sertralin 25 mg dgl. eller Escitalopram 5 mg dgl. de første 1-2 uger.",
          "Vigtig patientinformation: Angsten kan forværres forbigående de første 1-2 uger (paradoks angst). Fuld effekt ses ofte først efter 4-6 uger.",
          "Måldosis: Sertralin 50-150 mg dgl., Escitalopram 10-20 mg dgl.",
          "Paroxetin og Citalopram er 2. valg (Paroxetin har markant flere seponeringssymptomer)."
        ],
        "action": "Informer omhyggeligt om latenstiden og den forbigående opstartsuro, så patienten ikke seponerer i utide."
      },
      {
        "stepNumber": 3,
        "badge": "Andenlinje",
        "title": "3. Andetvalg: SNRI ved Behandlingssvigt",
        "summary": "Ved utilstrækkelig effekt efter 6-8 uger på sufficient dosis skiftes til SNRI.",
        "keyPoints": [
          "Duloxetin (60-120 mg) el. Venlafaxin (75-225 mg).",
          "Duloxetin har særlig god dokumentation ved Generaliseret Angst (GAD).",
          "Venlafaxin er velegnet ved Socialfobi og Panikangst. Monitorér blodtryk ved doser ≥ 150-225 mg."
        ],
        "action": "Gennemfør krydstitrering fra SSRI til SNRI."
      },
      {
        "stepNumber": 4,
        "badge": "Supplerende Valg",
        "title": "4. Tredjevalg & Tillægsbehandling (GAD)",
        "summary": "Specifikke alternativer ved Generaliseret Angst: Buspiron eller Pregabalin.",
        "keyPoints": [
          "Buspiron: KUN indiceret ved GAD. Ingen p.n.-effekt; kræver 2-4 ugers fast dosering (15-30 mg dgl.). Intet misbrugspotentiale.",
          "Pregabalin: Hurtig indsættende anxiolytisk effekt ved GAD (150-600 mg dgl.), men OBS: stor risiko for toleransudvikling, misbrug og svære seponeringssymptomer.",
          "Kortvarig p.n. beroligende: Oxazepam (15-30 mg) må kun anvendes i få dage ved udtalt krise."
        ],
        "action": "Pregabalin bør reserveres til behandlingsresistens efter konference med psykiater."
      },
      {
        "stepNumber": 5,
        "badge": "Vedligeholdelse",
        "title": "5. Behandlingsvarighed & Udtrapning",
        "summary": "Behandlingen bør fortsætte i mindst 6-12 måneder efter opnået remission.",
        "keyPoints": [
          "Tidlig seponering øger risikoen for hurtigt recidiv af angsten markant.",
          "Udtrapning skal altid foregå meget langsomt over 2-6 måneder med dosisreduktioner hver 2.-4. uge.",
          "Seponeringssymptomer (svimmelhed, stød i hovedet/brain zaps, irritabilitet) kan forveksles med angsttilbagefald."
        ],
        "action": "Aftal fast udtrapningsplan og differentier mellem seponeringssymptomer og ægte recidiv."
      }
    ],
    "medications": [
      {
        "category": "1. Valgs SSRI",
        "drugs": [
          {
            "name": "Sertralin (Zoloft)",
            "class": "SSRI",
            "line": "1. Valg (GAD, Panik, Socialfobi)",
            "startDose": "25 mg dgl. i 1-2 uger",
            "targetDose": "50-100 mg dgl.",
            "maxDose": "200 mg dgl.",
            "notes": "Gunstig bivirkningsprofil. Lav interaktionsrisiko. Førstevalg ved hjerte-kar-sygdom."
          },
          {
            "name": "Escitalopram (Cipralex)",
            "class": "SSRI",
            "line": "1. Valg",
            "startDose": "5 mg dgl. i 1-2 uger",
            "targetDose": "10-20 mg dgl.",
            "maxDose": "20 mg dgl. (10 mg hos ældre > 65 år)",
            "notes": "Høj selektivitet. OBS: QTc-forlængelse ved høje doser (EKG obligatorisk)."
          }
        ]
      },
      {
        "category": "2. Valgs SNRI & Øvrige",
        "drugs": [
          {
            "name": "Duloxetin (Cymbalta)",
            "class": "SNRI",
            "line": "2. Valg (GAD)",
            "startDose": "30 mg dgl. i 1-2 uger",
            "targetDose": "60 mg dgl.",
            "maxDose": "120 mg dgl.",
            "notes": "Dokumenteret effekt ved GAD og ledsagende somatiske smerter. Kvalme og svedtendens."
          },
          {
            "name": "Venlafaxin (Efexor Depot)",
            "class": "SNRI",
            "line": "2. Valg (Panik, Socialfobi, GAD)",
            "startDose": "37,5 mg dgl. i 1-2 uger",
            "targetDose": "75-150 mg dgl.",
            "maxDose": "225 mg dgl.",
            "notes": "Dual effekt ved doser ≥ 150 mg. Svære seponeringssymptomer ved brat ophør. Mål BT."
          },
          {
            "name": "Buspiron",
            "class": "5-HT1A partiel agonist",
            "line": "3. Valg (KUN GAD)",
            "startDose": "5 mg 2-3 gange dgl.",
            "targetDose": "15-30 mg dgl.",
            "maxDose": "60 mg dgl.",
            "notes": "KUN ved GAD. Ingen PN-effekt; kræver 2-4 ugers fast behandling. Intet misbrugspotentiale."
          },
          {
            "name": "Pregabalin (Lyrica)",
            "class": "GABA-analog / calciumkanal-blokker",
            "line": "Specialistvalg (GAD)",
            "startDose": "50-75 mg dgl. fordelt på 2 doser",
            "targetDose": "150-300 mg dgl.",
            "maxDose": "600 mg dgl.",
            "notes": "Hurtig anxiolytisk effekt. Stor risiko for tilvænning, misbrug og afhængighed. Kræver specialistkonference."
          }
        ]
      }
    ],
    "monitoring": {
      "title": "Klinisk Evaluering & Monitorering",
      "items": [
        {
          "title": "Paradoks Angstforværring",
          "frequency": "Uge 1-2",
          "description": "Antidepressiva kan de første 10-14 dage fremkalde øget indre uro, agitation og autonome symptomer. Tæt telefonisk kontakt eller støttesamtale kan forhindre tidlig seponering."
        },
        {
          "title": "Blodtryk (ved Venlafaxin)",
          "frequency": "Baseline og ved dosis > 150 mg",
          "description": "Noradrenerg virkning kan medføre dosisafhængig blodtryksstigning."
        },
        {
          "title": "EKG (ved Escitalopram & Citalopram)",
          "frequency": "Baseline ved kardiologisk disposition el. doser > 10-20 mg",
          "description": "Dosisafhængig risiko for QTc-forlængelse."
        }
      ],
      "ratingScales": [
        {
          "name": "GAD-7",
          "indication": "Generaliseret angst monitorering",
          "target": "< 5 (Remission)"
        },
        {
          "name": "OASIS (Overall Anxiety Severity and Impairment Scale)",
          "indication": "Generel angstbelastning",
          "target": "< 8"
        },
        {
          "name": "Liebowitz Social Anxiety Scale (LSAS)",
          "indication": "Socialfobi",
          "target": "Normalisering"
        }
      ]
    },
    "specialGroups": [
      {
        "title": "Benzodiazepin-advarsel",
        "content": "Sundhedsstyrelsen og Lægemiddelstyrelsen fraråder fast brug af benzodiazepiner ved angstlidelser. Tilvænning og tolerans opstår allerede efter 2-4 uger, og medicinen kan forårsage rebound-angst, som fastholder patienten i sygdommen."
      }
    ]
  },
  "ocd": {
    "id": "ocd",
    "sourceBadge": "Sundhedsstyrelsen National Klinisk Retningslinje (NKR)",
    "title": "Obsessiv-Kompulsiv Tilstand (OCD)",
    "subtitle": "Nationale kliniske retningslinjer for behandling af OCD hos børn, unge og voksne (F42)",
    "pdfs": [
      {
        "title": "NKR Behandling af OCD (Original PDF)",
        "url": "/pdf/national-klinisk-retningslinje-behandling-af-obsessiv-kompultiv-tilstand.pdf"
      }
    ],
    "takeaways": [
      {
        "type": "emerald",
        "title": "Psykoterapi (ERP) er Grundstenen",
        "text": "Kognitiv adfærdsterapi med eksponering og responshindring (ERP) er 1. valg. Ved moderat til svær OCD er kombination af ERP og medicin mest effektiv."
      },
      {
        "type": "blue",
        "title": "Højdosis SSRI & Lang Latenstid",
        "text": "OCD kræver ofte markant højere doser end depression (f.eks. Sertralin op til 200 mg, Fluoxetin op til 60-80 mg). Responstiden er op til 10-12 uger før fuld effekt."
      },
      {
        "type": "rose",
        "title": "Behandlingsresistens: Augmentation & Clomipramin",
        "text": "Ved utilstrækkelig effekt af 2 SSRI i maksimal dosis augmenteres med lavdosis atypisk antipsykotikum (Aripiprazol el. Risperidon). 3. valg er Clomipramin (kræver EKG)."
      }
    ],
    "algorithm": [
      {
        "stepNumber": 1,
        "badge": "Mild OCD",
        "title": "1. Mild OCD: Psykoterapi (ERP) i Monoterapi",
        "summary": "Psykoterapi uden medicin er førstevalg ved mild OCD (Y-BOCS < 16).",
        "keyPoints": [
          "Kognitiv adfærdsterapi med eksponering og responshindring (ERP) bør altid tilbydes først.",
          "Psykoedukation til patient og pårørende omkring tvangens vedligeholdende mekanismer.",
          "Medicinsk behandling er som udgangspunkt ikke indiceret ved milde symptomer."
        ],
        "action": "Henvis til psykolog med specialisering i ERP-behandling."
      },
      {
        "stepNumber": 2,
        "badge": "Moderat / Svær",
        "title": "2. Moderat til Svær OCD: SSRI i Høj Dosis",
        "summary": "Kombinationsbehandling med ERP og højdosis SSRI (Sertralin, Fluoxetin el. Escitalopram).",
        "keyPoints": [
          "1. Valg: Sertralin (op til 200 mg), Fluoxetin (op til 60-80 mg) eller Escitalopram (op til 20 mg).",
          "Vigtigt: OCD kræver signifikant højere doser end depression.",
          "Tidsramme: Fuld evaluering kræver mindst 10-12 ugers behandling på maksimal tolereret dosis.",
          "Børn/Unge: Sertralin og Fluoxetin er godkendte førstevalg ved moderat/svær OCD."
        ],
        "action": "Optitrér gradvist mod øverste dosisinterval og evaluer efter 8-12 uger med Y-BOCS."
      },
      {
        "stepNumber": 3,
        "badge": "Terapisvigt",
        "title": "3. Andet Behandlingsforsøg: Skift til Andet SSRI",
        "summary": "Ved manglende respons på 1. SSRI skiftes til et andet præparat inden for SSRI-klassen.",
        "keyPoints": [
          "Skift til et andet højdosis SSRI (f.eks. fra Sertralin til Fluoxetin el. Paroxetin).",
          "Intensiver sideløbende den psykoterapeutiske eksponeringstræning (ERP)."
        ],
        "action": "Gennemfør krydstitrering og evaluer respons efter yderligere 10-12 uger."
      },
      {
        "stepNumber": 4,
        "badge": "Behandlingsresistens",
        "title": "4. Behandlingsresistens: Augmentation med Antipsykotikum eller Clomipramin",
        "summary": "Specialiseret farmakologisk tillægsbehandling ved svær behandlingsrefraktær OCD.",
        "keyPoints": [
          "Augmentation: Tillæg af lavdosis atypisk antipsykotikum (Aripiprazol 5-10 mg el. Risperidon 1-2 mg) til det igangværende højdosis SSRI.",
          "Clomipramin (Anafranil): Potent TCA med kraftig serotonerg profil. Meget effektivt, men højere bivirkningsbyrde (antikolinerge effekter, sedation, EKG-krav).",
          "Clomipramin kan gives i monoterapi eller i kombination med SSRI (OBS: specialistopgave pga. serotonergt syndrom og interaktionsrisiko)."
        ],
        "action": "Henvis til regionspsykiatrien / specialistteam for OCD ved behandlingsresistens."
      },
      {
        "stepNumber": 5,
        "badge": "Vedligeholdelse",
        "title": "5. Vedligeholdelsesbehandling & Seponering",
        "summary": "Langvarig medicinsk vedligeholdelse for at forhindre tilbagefald.",
        "keyPoints": [
          "Vedligeholdelsesbehandling bør fortsætte i mindst 1-2 år efter opnået remission.",
          "Ved svær, kronisk eller recidiverende OCD kan flerårig eller livslang behandling være indiceret.",
          "Udtrapning skal foregå ultra-langsomt over 6-12 måneder med fortsat fokus på ERP-vedligeholdelse."
        ],
        "action": "Planlæg årlig evaluering og aftal specifikke tilbagefaldsstrategier."
      }
    ],
    "medications": [
      {
        "category": "Højdosis SSRI (Førstevalg)",
        "drugs": [
          {
            "name": "Sertralin (Zoloft)",
            "class": "SSRI",
            "line": "1. Valg",
            "startDose": "50 mg dgl.",
            "targetDose": "150-200 mg dgl.",
            "maxDose": "200 mg dgl.",
            "notes": "Godkendt til voksne og børn fra 6 år. Førstevalg pga. bivirkningsprofil."
          },
          {
            "name": "Fluoxetin (Fontex)",
            "class": "SSRI",
            "line": "1. Valg",
            "startDose": "20 mg dgl.",
            "targetDose": "40-60 mg dgl.",
            "maxDose": "80 mg dgl.",
            "notes": "Godkendt til voksne og børn fra 8 år. Særlig lang halveringstid."
          },
          {
            "name": "Escitalopram (Cipralex)",
            "class": "SSRI",
            "line": "1. Valg",
            "startDose": "10 mg dgl.",
            "targetDose": "20 mg dgl.",
            "maxDose": "20 mg dgl.",
            "notes": "Høj selektivitet. Kræver EKG pga. QTc-risiko."
          }
        ]
      },
      {
        "category": "Augmentation & 3. Valg",
        "drugs": [
          {
            "name": "Aripiprazol (Abilify)",
            "class": "D2 partiel agonist (Augmentation)",
            "line": "Augmentationsvalg",
            "startDose": "2,5-5 mg dgl.",
            "targetDose": "5-10 mg dgl.",
            "maxDose": "15 mg dgl.",
            "notes": "Gunstig dokumentation ved behandlingsresistent OCD. Lav metabolisk belastning."
          },
          {
            "name": "Clomipramin (Anafranil)",
            "class": "Tricyklisk Antidepressivum (TCA)",
            "line": "3. Valg",
            "startDose": "25 mg dgl.",
            "targetDose": "100-150 mg dgl.",
            "maxDose": "250 mg dgl. (serum: 600-1500 nmol/L)",
            "notes": "Meget potent ved OCD. Kræver EKG og TDM. Antikolinerge bivirkninger."
          }
        ]
      }
    ],
    "monitoring": {
      "title": "Klinisk Evaluering & Monitorering",
      "items": [
        {
          "title": "Y-BOCS Evaluering",
          "frequency": "Baseline, 6 uger, 12 uger og ved seponering",
          "description": "Yale-Brown Obsessive Compulsive Scale er guldstandarden for måling af OCD-sværhedsgrad. Respons defineres som ≥ 25-35% reduktion i score."
        },
        {
          "title": "EKG ved højdosis SSRI og Clomipramin",
          "frequency": "Baseline og ved høje doser",
          "description": "Høje doser SSRI og især Clomipramin forlænger QTc-intervallet."
        }
      ],
      "ratingScales": [
        {
          "name": "Y-BOCS (Voksne)",
          "indication": "OCD-sværhedsgrad",
          "target": "Remission < 8 (Mild < 16)"
        },
        {
          "name": "CY-BOCS (Børn/Unge)",
          "indication": "Pædiatrisk OCD-sværhedsgrad",
          "target": "Remission < 8"
        }
      ]
    },
    "specialGroups": [
      {
        "title": "Børn og Unge med OCD",
        "content": "ERP tilpasset barnets udviklingsalder med massiv forældreinvolvering er altid 1. valg. Ved svær OCD kan Sertralin (fra 6 år) eller Fluoxetin (fra 8 år) tillægges under tæt børne- og ungdomspsykiatrisk overvågning."
      }
    ]
  },
  "alkohol": {
    "id": "alkohol",
    "sourceBadge": "Sundhedsstyrelsen National Klinisk Retningslinje (NKR 2019)",
    "title": "Samtidig Alkoholafhængighed og Psykisk Lidelse",
    "subtitle": "Nationale kliniske retningslinjer for integreret udredning og behandling (F10)",
    "pdfs": [
      {
        "title": "NKR Samtidig Alkohol og Psykisk Lidelse",
        "url": "/pdf/national-klinisk-retningslinje-alkoholafhaengighed.pdf"
      },
      {
        "title": "NKR Alkoholbehandling",
        "url": "/pdf/nkr-alkoholbehandling.pdf"
      },
      {
        "title": "AUDIT Test (Spørgeskema)",
        "url": "/pdf/8_Audit.pdf"
      }
    ],
    "takeaways": [
      {
        "type": "emerald",
        "title": "Integreret Samtidig Behandling",
        "text": "Misbrug og psykisk lidelse skal behandles samtidigt og koordineret (integreret indsats). Afvisning med krav om \"ædruelighed først\" strider mod gældende retningslinjer."
      },
      {
        "type": "blue",
        "title": "Trangdæmpende Medicin (Acamprosat & Naltrexon)",
        "text": "Acamprosat (Campral) dæmper craving/glutamataktivitet. Naltrexon mindsker eufori ved indtag. Disulfiram (Antabus) fordrer compliance og fast aftale."
      },
      {
        "type": "rose",
        "title": "Akut Abstinens: Tiamin FØR Glukose!",
        "text": "Parenteral Tiamin (400 mg i.v./i.m.) SKAL gives før eller samtidigt med glukose for at afværge akut Wernickes encefalopati. Chlordiazepoxid doseres efter AWS/CIWA."
      }
    ],
    "algorithm": [
      {
        "stepNumber": 1,
        "badge": "Identifikation",
        "title": "1. Screening, Udredning & Diagnostik",
        "summary": "Systematisk identifikation af skadeligt forbrug eller afhængighedssyndrom.",
        "keyPoints": [
          "Screening med AUDIT (Alcohol Use Disorders Identification Test). Score ≥ 8 indikerer problematisk forbrug.",
          "Biomarkører: B-PEth (Phosphatidylethanol) er den mest præcise markør for alkoholforbrug de seneste 2-4 uger.",
          "Differentialdiagnostik: Vurder om psykiske symptomer (angst, depression, søvnløshed) er rusmiddelinducerede eller selvstændige lidelser.",
          "Undersøg altid for somatiske komplikationer (levercirrose, polyneuropati, kognitive deficit)."
        ],
        "action": "Bestil B-PEth, levertal, MCV, væsketal og gennemfør AUDIT screening."
      },
      {
        "stepNumber": 2,
        "badge": "Akutfase",
        "title": "2. Akut Abstinensbehandling & Wernicke-Profylakse",
        "summary": "Sikker abstinensbehandling og obligatorisk profylakse mod Wernicke-Korsakoffs syndrom.",
        "keyPoints": [
          "Wernicke-profylakse: Injektion Tiamin 400 mg i.v. eller i.m. dagligt i 3 dage SAMT B-combin. SKAL gives FØR kulhydrat/glukoseindgift!",
          "Abstinensdæmpning: Chlordiazepoxid (Risolid/Klopoxid) er 1. valg pga. lang halveringstid og lavt misbrugspotentiale.",
          "Doseringsstyring: Styres efter scoringsskala (AWS eller CIWA-Ar). Målet er at forhindre kramper og Delirium Tremens.",
          "Ved leversvigt/svær cirrose kan Oxazepam anvendes frem for Chlordiazepoxid pga. kortere halveringstid uden aktive metabolitter."
        ],
        "action": "Administrer straks parenteral Tiamin og optitrér Chlordiazepoxid efter objektiv abstinensscore.",
        "warning": "Glukoseinfusion uden forudgående parenteral tiaminindgift hos alkoholafhængige kan akut udløse irreversibel Wernickes encefalopati."
      },
      {
        "stepNumber": 3,
        "badge": "Relapsforebyggelse",
        "title": "3. Farmakologisk Tilbagefaldsforebyggelse",
        "summary": "Medicinsk støtte til at opretholde afholdenhed eller reducere skadeligt indtag.",
        "keyPoints": [
          "Acamprosat (Campral): Modulerer NMDA/GABA-balancen og reducerer trang (craving). 1. valg ved ønske om total afholdenhed. Dosis: 666 mg x 3 dgl.",
          "Naltrexon: Opioidantagonist, der blokerer belønningskicket ved alkoholindtag og dæmper tab af kontrol (binge drinking). Dosis: 50 mg x 1 dgl.",
          "Disulfiram (Antabus): Hæmmer aldehyddehydrogenase og giver kraftig ubehagsreaktion ved alkoholindtag. Effektivt ved overvåget indtag, men påvirker ikke trangen i sig selv."
        ],
        "action": "Vælg præparat ud fra patientens målsætning (afholdenhed vs. reduktion) og compliance."
      },
      {
        "stepNumber": 4,
        "badge": "Integreret Indsats",
        "title": "4. Samtidig Behandling af Psykisk Komorbiditet",
        "summary": "Behandling af den psykiatriske grundlidelse parallelt med misbrugsbehandlingen.",
        "keyPoints": [
          "Depression og angst: SSRI (Sertralin) kan med fordel opstartes efter overstået akut afgiftning (efter 1-2 uger).",
          "ADHD: Atomoxetin eller Lisdexamfetamin med fast kontrol.",
          "Psykoterapi: Kognitiv adfærdsterapi og motiverende samtale (MI) er hjørnesten i den psykoterapeutiske indsats."
        ],
        "action": "Etabler tæt tværfagligt samarbejde mellem regional psykiatri og kommunalt rusmiddelcenter."
      }
    ],
    "medications": [
      {
        "category": "Relapsforebyggende Midler",
        "drugs": [
          {
            "name": "Acamprosat (Campral)",
            "class": "NMDA-modulator / GABA-agonist",
            "line": "1. Valg (Trangdæmpende)",
            "startDose": "666 mg x 3 dgl. (ved vægt < 60 kg: 666 mg morgen, 333 mg middag/aften)",
            "targetDose": "1998 mg dgl.",
            "maxDose": "1998 mg dgl.",
            "notes": "Dæmper trang (craving) og abstinensbetinget hyperglutamatergi. Udskilles renalt (kontraindiceret ved svær nyreinsufficiens)."
          },
          {
            "name": "Naltrexon",
            "class": "Opioidreceptorantagonist",
            "line": "1. Valg (Reduktion/craving)",
            "startDose": "25-50 mg dgl.",
            "targetDose": "50 mg dgl.",
            "maxDose": "50 mg dgl.",
            "notes": "Dæmper euforisk forstærkning ved alkohol. Kontraindiceret ved samtidig opioidbehandling eller akut leversvigt."
          },
          {
            "name": "Disulfiram (Antabus)",
            "class": "Aldehyddehydrogenase-hæmmer",
            "line": "2. Valg (Strukturskabende)",
            "startDose": "200-400 mg 2-3 gange ugentligt (eller 600-800 mg 2 gange ugentligt)",
            "targetDose": "Individuelt overvåget",
            "maxDose": "400 mg dgl.",
            "notes": "Giver voldsom flushing, takykardi og hypotension ved alkoholindtag. Kræver monitorering af ALAT (hepatotoksicitet)."
          }
        ]
      },
      {
        "category": "Abstinensbehandling & Vitaminer",
        "drugs": [
          {
            "name": "Chlordiazepoxid (Risolid / Klopoxid)",
            "class": "Benzodiazepin med lang halveringstid",
            "line": "1. Valg (Abstinenser)",
            "startDose": "25-50 mg p.n. styret efter AWS-score",
            "targetDose": "Aftrapning over 4-8 dage",
            "maxDose": "Individuelt akut",
            "notes": "Guldstandard ved alkoholabstinenser. Forhindrer kramper og delirium tremens."
          },
          {
            "name": "Tiamin (B1-vitamin)",
            "class": "Vandopløseligt vitamin",
            "line": "Obligatorisk profylakse",
            "startDose": "400 mg i.v. el. i.m. dgl. i 3 dage",
            "targetDose": "Derefter 300 mg peroralt dgl.",
            "maxDose": "400-800 mg dgl.",
            "notes": "SKAL gives FØR glukose! Forebygger Wernicke-Korsakoff syndrom hos alle risikopatienter."
          }
        ]
      }
    ],
    "monitoring": {
      "title": "Biomarkører & Sikkerhedsovervågning",
      "items": [
        {
          "title": "B-PEth (Phosphatidylethanol)",
          "frequency": "Baseline og hver 2.-4. uge",
          "description": "Høj specifik biomarkør for alkoholindtag inden for de seneste 2-4 uger. Værdier: < 0,05 µmol/L (afholden/lavt), 0,05-0,30 (moderat), > 0,30 (stort/skadeligt forbrug)."
        },
        {
          "title": "Levertal (ALAT, Basisk Fosfatase, Bilirubin, INR)",
          "frequency": "Baseline og løbende",
          "description": "Særligt vigtigt ved Disulfiram (Antabus), som kan udløse toksisk hepatitis. Kontrolleres hver 2. uge de første 2 måneder."
        },
        {
          "title": "AWS / CIWA-Ar Score",
          "frequency": "Hver 2.-4. time i akut abstinensfase",
          "description": "Objektiv vurdering af tremor, sved, takykardi, agitation og hallucinationer til styring af Chlordiazepoxid-dosis."
        }
      ],
      "ratingScales": [
        {
          "name": "AUDIT",
          "indication": "Identifikation af alkoholvaner",
          "target": "< 8 (lavrisiko)"
        },
        {
          "name": "AWS (Alcohol Withdrawal Scale)",
          "indication": "Abstinensgrad",
          "target": "< 4 (lette abstinenser)"
        },
        {
          "name": "CIWA-Ar",
          "indication": "Abstinens monitorering",
          "target": "< 10"
        }
      ]
    },
    "specialGroups": [
      {
        "title": "Delirium Tremens (DT)",
        "content": "Akut livstruende tilstand med konfusion, synshallucinationer, udtalt agitation, takykardi og hypertermi. Kræver omgående akut indlæggelse på somatisk afdeling / intensiv til højdosis sedering med diazepam/chlordiazepoxid og i.v. tiamin."
      }
    ]
  },
  "spiseforstyrrelser": {
    "id": "spiseforstyrrelser",
    "sourceBadge": "Sundhedsstyrelsen NKR (Anorexia Nervosa & Bulimi)",
    "title": "Spiseforstyrrelser (Anoreksi og Bulimi)",
    "subtitle": "Nationale kliniske retningslinjer for behandling af voksne, børn og unge (F50)",
    "pdfs": [
      {
        "title": "NKR Anorexia Nervosa (Original PDF)",
        "url": "/pdf/national-klinisk-retningslinje-anorexia-nervosa.pdf"
      },
      {
        "title": "NKR Bulimia Nervosa",
        "url": "/pdf/national-klinisk-retningslinje-for-behandling-af-moderat-og-svaer-bulimi.pdf"
      },
      {
        "title": "Blodprøvevejledning",
        "url": "/pdf/Blodproever_Spiseforstyrrelse.pdf"
      }
    ],
    "takeaways": [
      {
        "type": "emerald",
        "title": "Ernæringsrehabilitering & Psykoterapi",
        "text": "Vægt- og måltidsstabilisering er hjørnestenen. Medicinsk behandling kan ALDRIG stå alene og er sekundær i forhold til specialiseret psykoterapeutisk og diætetisk behandling."
      },
      {
        "type": "blue",
        "title": "Bulimi: Højdosis Fluoxetin (60 mg)",
        "text": "Fluoxetin 60 mg dgl. har solid dokumentation for at reducere hyppigheden af overspisninger og kompenserende opkastninger/laksantiabrug ved Bulimia Nervosa."
      },
      {
        "type": "rose",
        "title": "Somatisk Risiko: Refeeding Syndrom & EKG",
        "text": "Ved BMI < 13-14 eller hurtigt vægttab er der livsfare pga. refeeding syndrom (hypofosfatæmi) og arytmier (lang QTc, hypokaliæmi). Kræver somatisk indlæggelse."
      }
    ],
    "algorithm": [
      {
        "stepNumber": 1,
        "badge": "Diagnostik & Somatik",
        "title": "1. Diagnostik, BMI & Somatisk Risikovurdering",
        "summary": "Grundig somatisk udredning og vurdering af fysiologisk ustabilitet.",
        "keyPoints": [
          "Anorexia Nervosa (F50.0): BMI ≤ 17,5 (voksne) eller percentilfald (børn/unge), intens frygt for vægtøgning, forstyrret kropsopfattelse.",
          "Bulimia Nervosa (F50.2): Tilbagevendende overspisninger med kontroltab og kompenserende adfærd (opkast, laksantia, faste, motion) ≥ 1-2 gange ugentligt.",
          "Obligatorisk somatisk status: Blodtryk, ortostatisk puls, standard 12-afledningers EKG (QTc, bradykardi) og blodprøver.",
          "Blodprøvepanel: Væsketal, kalium, natrium, magnesium, fosfat, levertal, albumin, hæmatologi, blodsukker og TSH."
        ],
        "action": "Beregn præcist BMI og vurder somatiske indlæggelseskriterier (puls < 40, BT < 90/60, QTc > 460 ms, kalium < 3,0 mmol/L, fosfat < 0,8 mmol/L)."
      },
      {
        "stepNumber": 2,
        "badge": "Anoreksi",
        "title": "2. Behandling af Anorexia Nervosa",
        "summary": "Specialiseret psykoterapi, familieterapi (FBT til børn/unge) og ernæringsgenopbygning.",
        "keyPoints": [
          "Børn og unge: Familiebaseret terapi (FBT) er den absolut bedst dokumenterede førstelinjebehandling.",
          "Voksne: Specialiseret psykoterapi (CBT-ED, MANTRA el. SSCM) kombineret med fast diætetisk måltidsplan.",
          "Farmakoterapi har INGEN primær helbredende effekt på kernesymptomerne ved anoreksi.",
          "Undtagelse: Lavdosis Olanzapin (2,5-5 mg) kan overvejes som kortvarigt supplement ved udtalt obsessiv tankemylder, massiv spiseangst og motorisk hyperaktivitet."
        ],
        "action": "Etabler struktureret vægtmonitorering (vejning 1-2 gange ugentligt i undertøj om morgenen efter vandladning)."
      },
      {
        "stepNumber": 3,
        "badge": "Bulimi",
        "title": "3. Behandling af Bulimia Nervosa",
        "summary": "Kognitiv adfærdsterapi (CBT-E) kombineret med farmakoterapi (Fluoxetin).",
        "keyPoints": [
          "Psykoterapi: Kognitiv adfærdsterapi for spiseforstyrrelser (CBT-E) er førstevalg.",
          "Farmakoterapi: Fluoxetin i høj dosis (60 mg dgl.) er det eneste godkendte præparat med dokumenteret effekt på at reducere overspisning og kompenserende adfærd.",
          "OBS: Start med 20 mg dgl. og optitrér til 60 mg over 2-3 uger for at minimere bivirkninger."
        ],
        "action": "Kombiner CBT-E med Fluoxetin 60 mg dgl. hos voksne med moderat til svær bulimi."
      },
      {
        "stepNumber": 4,
        "badge": "Sikkerhed",
        "title": "4. Forebyggelse af Refeeding Syndrom",
        "summary": "Livstruende elektrolytforstyrrelser ved for hurtig genoptagelse af kalorieindtag.",
        "keyPoints": [
          "Mekanisme: Insulinsekretion udløst af kulhydrater trækker fosfat, kalium og magnesium ind i cellerne, hvilket fører til akut hjertesvigt, arytmi og respirationssvigt.",
          "Risikopatienter: BMI < 14, vægttab > 15% på få måneder, eller minimalt fødeindtag i > 10 dage.",
          "Profylakse: Start med lavt kalorieindtag (15-20 kcal/kg/døgn), tilskud af fosfat og parenteral tiamin/B-vitaminer forud for kalorietilførsel."
        ],
        "action": "Mål dagligt s-fosfat, s-kalium og magnesium i de første 1-2 ugers reernæring hos risikopatienter."
      }
    ],
    "medications": [
      {
        "category": "Dokumenteret Farmakoterapi",
        "drugs": [
          {
            "name": "Fluoxetin (Fontex)",
            "class": "SSRI",
            "line": "1. Valg (KUN Bulimi)",
            "startDose": "20 mg dgl.",
            "targetDose": "60 mg dgl.",
            "maxDose": "60 mg dgl.",
            "notes": "Højdosis Fluoxetin (60 mg) reducerer overspisninger og opkastninger markant ved Bulimia Nervosa. Ikke indiceret ved Anoreksi."
          },
          {
            "name": "Olanzapin (Zyprexa)",
            "class": "Atypisk antipsykotikum",
            "line": "Sekundært supplement (Anoreksi)",
            "startDose": "1,25-2,5 mg ved sengetid",
            "targetDose": "2,5-5 mg dgl.",
            "maxDose": "7,5 mg dgl.",
            "notes": "Kan dæmpe invaliderende kropsangst, motorisk uro og obsessiv tankemylder forud for måltider. Kræver EKG."
          }
        ]
      },
      {
        "category": "Vitamin- og Elektrolyttilskud",
        "drugs": [
          {
            "name": "Fosfat & Kaliumtilskud",
            "class": "Mineralsubstitution",
            "line": "Obligatorisk ved mangel",
            "startDose": "Styres efter daglige blodprøver",
            "targetDose": "Normalisering af s-fosfat og s-kalium",
            "maxDose": "Individuelt",
            "notes": "Forebygger kardiomyopati og arytmier under refeeding. Måles dagligt ved svær underernæring."
          },
          {
            "name": "Calcium + D-vitamin",
            "class": "Osteoporoseprofylakse",
            "line": "Fast supplement",
            "startDose": "Calcium 800-1000 mg + D-vitamin 20-40 µg dgl.",
            "targetDose": "Fast profylakse",
            "maxDose": "Standard profylakse",
            "notes": "Obligatorisk ved amenoré og undervægt for at forebygge irreversibel osteopeni og knogletab."
          }
        ]
      }
    ],
    "monitoring": {
      "title": "Somatisk & Laboratoriemæssig Monitorering",
      "items": [
        {
          "title": "S-Fosfat, S-Kalium og S-Magnesium",
          "frequency": "Dagligt i starten ved svær undervægt, derefter ugentligt",
          "description": "Faldende s-fosfat er det tidligste tegn på livstruende refeeding syndrom."
        },
        {
          "title": "EKG (med QTc og hjerterytme)",
          "frequency": "Ved optagelse og ugentligt ved lav vægt",
          "description": "Hypokaliæmi og hjertemuskelatrofi medfører risiko for for forlænget QTc og torsades de pointes."
        },
        {
          "title": "Vægt og BMI-udvikling",
          "frequency": "Fast 1-2 gange ugentligt under standardiserede forhold",
          "description": "Morgenvejning i undertøj efter vandladning for at undgå vandindtagelse (water-loading)."
        }
      ],
      "ratingScales": [
        {
          "name": "EDE-Q (Eating Disorder Examination Questionnaire)",
          "indication": "Spiseforstyrrelsessymptomatologi",
          "target": "Normalisering < 2,5"
        },
        {
          "name": "BMI Percentilkurver (Børn)",
          "indication": "Vækst og vægtudvikling",
          "target": "Normalisering mod præmorbid vækstkurve"
        }
      ]
    },
    "specialGroups": [
      {
        "title": "Somatiske Indlæggelseskriterier",
        "content": "Patienten SKAL overflyttes til medicinsk afdeling ved: BMI < 13, hastigt vægttab > 1 kg/uge i flere uger, puls < 40 bpm, systolisk BT < 80 mmHg, kropstemperatur < 35,5°C, QTc > 460 ms eller behandlingsrefraktær elektrolytforstyrrelse."
      }
    ]
  },
  "borderline": {
    "id": "borderline",
    "sourceBadge": "Sundhedsstyrelsen National Klinisk Retningslinje (NKR 2019)",
    "title": "Emotionel Ustabil Personlighedsstruktur (Borderline)",
    "subtitle": "Nationale kliniske retningslinjer for psykoterapeutisk og medicinsk behandling (F60.3)",
    "pdfs": [
      {
        "title": "NKR Borderline Behandling (Original PDF)",
        "url": "/pdf/nkr-for-behandling-af-emotionel-ustabil-personlighedsstruktur-borderline-type-2019.pdf"
      }
    ],
    "takeaways": [
      {
        "type": "emerald",
        "title": "Psykoterapi er 1. Valg (DAT & MBT)",
        "text": "Dialektisk Adfærdsterapi (DAT) og Mentaliseringsbaseret Terapi (MBT) er de veldokumenterede kernebehandlinger. De reducerer selvskade, kriser og indlæggelser markant."
      },
      {
        "type": "blue",
        "title": "Medicin har Kun Sekundær/Kortvarig Rolle",
        "text": "Der findes intet præparat godkendt til personlighedsforstyrrelsen i sig selv. Farmaka kan kun anvendes målrettet og tidsbegrænset mod specifikke komorbide tilstande."
      },
      {
        "type": "rose",
        "title": "Undgå Polyfarmaci & Benzodiazepiner",
        "text": "Benzodiazepiner er KONTRAINDICEREDE pga. afhængighedsfare, emotionel afstumpning og adfærdsmæssig dishæmning (paradoks aggressivitet/selvskade). Undgå gentagne medicinskift."
      }
    ],
    "algorithm": [
      {
        "stepNumber": 1,
        "badge": "Diagnostik",
        "title": "1. Diagnostik & Differentiering",
        "summary": "Grundig struktureret diagnostisk udredning (SCID-5-PD / DIB-R) og komorbiditetsafklaring.",
        "keyPoints": [
          "Kerneelementer: Følelsesmæssig ustabilitet, udtalt impulsivitet, usikker identitetsfølelse, intense/ustabile relationer, frygt for at blive forladt og kronisk tomhedsfølelse.",
          "Selvskadende adfærd og suicidale kriser forekommer hyppigt.",
          "Differentialdiagnoser: Bipolar lidelse (stemningsskift varer dage/uger ved bipolar, men timer/minutter ved borderline), ADHD, kompleks PTSD og autismespektrumforstyrrelse.",
          "Diagnosen forudsætter mønstre med debut i ungdomsårene og gennemgribende påvirkning af funktionsevnen."
        ],
        "action": "Anvend strukturerede diagnostiske redskaber og opret en kriseplan forud for behandlingsstart."
      },
      {
        "stepNumber": 2,
        "badge": "Psykoterapi",
        "title": "2. Specialiseret Psykoterapi (Evidensbaseret Guldstandard)",
        "summary": "Manualiseret individuel og gruppebaseret psykoterapi (DAT, MBT, SFT).",
        "keyPoints": [
          "Dialektisk Adfærdsterapi (DAT): Særlig effektiv til at reducere selvskade, selvmordsadfærd og akutte hospitalsindlæggelser via færdighedstræning i følelsesregulering.",
          "Mentaliseringsbaseret Terapi (MBT): Styrker evnen til at reflektere over egne og andres sindstilstande i emotionelt ladede relationer.",
          "Skemafokuseret Terapi (SFT): Målrettet dybereliggende dysfunktionelle skemata.",
          "Behandlingen fordrer en varighed på typisk 1-2 år i regionalt pakkeforløb."
        ],
        "action": "Henvis til regionalt pakkeforløb for personlighedsforstyrrelser."
      },
      {
        "stepNumber": 3,
        "badge": "Krisehåndtering",
        "title": "3. Krisehåndtering, Sikkerhedsplan & 'Min Plan'",
        "summary": "Struktureret samarbejde om kriser for at undgå gentagne unødige akutte indlæggelser.",
        "keyPoints": [
          "Udarbejdelse af skriftlig Kriseplan / Sikkerhedsplan i rolig fase i samarbejde med patient og behandler.",
          "Identifikation af tidlige advarselstegn, triggere og konkrete mestringsstrategier (f.eks. TIPP-færdigheder: kulde, intens motion, kontrolleret vejrtrækning).",
          "Aftaler om kontaktpersoner og grænser for hvornår der søges professionel hjælp.",
          "Korte, planlagte indlæggelser (brugerstyret indlæggelse) foretrækkes frem for akutte kaotiske tvangsindlæggelser."
        ],
        "action": "Gennemgå og opdater kriseplanen ved enhver henvendelse i akutmodtagelsen."
      },
      {
        "stepNumber": 4,
        "badge": "Farmakologi",
        "title": "4. Farmakoterapi: Meget Restriktiv Holdning",
        "summary": "Medicin bør kun bruges målrettet og kortvarigt mod veldefinerede målsymptomer.",
        "keyPoints": [
          "NKR anbefaler IKKE farmakologisk behandling af emotionel ustabil personlighedsstruktur som generel behandling.",
          "Akut svær affekt/agitation: Lavdosis 2.-generations antipsykotikum (f.eks. Quetiapin 25-100 mg el. Aripiprazol 5-10 mg) kan anvendes kortvarigt som krisedæmper.",
          "Komorbid svær depression / angst: SSRI (Sertralin) kan forsøges i standarddoser.",
          "Benzodiazepiner er KONTRAINDICEREDE pga. dishæmning, misbrug og tab af mestringsevne."
        ],
        "action": "Aftal altid en fast seponeringsdato (f.eks. 1-3 måneder) for enhver nyopstartet psykofarmakologisk behandling."
      }
    ],
    "medications": [
      {
        "category": "Kortvarig Symptomlindring (Sekundær)",
        "drugs": [
          {
            "name": "Quetiapin (Seroquel)",
            "class": "Atypisk antipsykotikum",
            "line": "Kortvarigt supplement",
            "startDose": "25 mg p.n. ved udtalt affektstorm",
            "targetDose": "25-100 mg dgl.",
            "maxDose": "150-200 mg dgl.",
            "notes": "Kan dæmpe akut uro, tankemylder og søvnløshed. Bør evalueres løbende for at undgå fast afhængighedsskabende adfærd."
          },
          {
            "name": "Aripiprazol (Abilify)",
            "class": "D2 partiel agonist",
            "line": "Kortvarigt supplement",
            "startDose": "2,5-5 mg dgl.",
            "targetDose": "5-10 mg dgl.",
            "maxDose": "15 mg dgl.",
            "notes": "Kan overvejes ved vedvarende svær impulsivitet og aggression, hvor psykoterapi er utilstrækkelig."
          },
          {
            "name": "Sertralin (Zoloft)",
            "class": "SSRI",
            "line": "Ved komorbiditet",
            "startDose": "50 mg dgl.",
            "targetDose": "50-100 mg dgl.",
            "maxDose": "150 mg dgl.",
            "notes": "Anvendes KUN hvis patienten opfylder de diagnostiske kriterier for samtidig moderat/svær depression eller svær angst."
          }
        ]
      }
    ],
    "monitoring": {
      "title": "Klinisk Evaluering & Kriseopfølgning",
      "items": [
        {
          "title": "Regelmæssig Sanering af Medicinliste",
          "frequency": "Hver 3.-6. måned",
          "description": "Borderline-patienter akkumulerer ofte polyfarmaci uden effekt. Medicinsanering er en vigtig lægefaglig opgave."
        },
        {
          "title": "Selvmordsrisikovurdering",
          "frequency": "Ved enhver krise og ændring i tilstand",
          "description": "Differentier mellem kronisk suicidalitet/selvskade og akut forhøjet selvmordsfare."
        }
      ],
      "ratingScales": [
        {
          "name": "BSL-23 (Borderline Symptom List)",
          "indication": "Symptombelastning",
          "target": "Signifikant scorefald"
        },
        {
          "name": "C-SSRS (Columbia Suicide Severity Rating Scale)",
          "indication": "Suicidalitetsmonitorering",
          "target": "Ingen aktive planer"
        }
      ]
    },
    "specialGroups": [
      {
        "title": "Advarsel mod Indlæggelsesskader",
        "content": "Langvarige ustrukturerede indlæggelser medfører ofte regression, tab af mestringsfærdigheder og eskalering af selvskade. Indlæggelser bør være korte (1-3 døgn), kontraktbaserede og have fokus på hurtig tilbagevenden til eget netværk og mestringsstrategier."
      }
    ]
  },
  "autisme": {
    "id": "autisme",
    "sourceBadge": "Sundhedsstyrelsen National Klinisk Retningslinje (NKR)",
    "title": "Autismespektrumforstyrrelser (Børn og Unge)",
    "subtitle": "Nationale kliniske retningslinjer for udredning og behandling (F84)",
    "pdfs": [
      {
        "title": "NKR Autisme Børn og Unge (Original PDF)",
        "url": "/pdf/nkr-for-behandling-af-autismespektrumforstyrrelser-hos-boern-og-unge.pdf"
      }
    ],
    "takeaways": [
      {
        "type": "emerald",
        "title": "Pædagogisk & Strukturel Kerneindsats",
        "text": "Behandlingen af autisme er grundlæggende ikke-medicinsk. Miljøterapi, visuel struktur, forudsigelighed og specialpædagogisk støtte i skole/hjem er 1. valg."
      },
      {
        "type": "blue",
        "title": "Medicin Retter Sig Kun Mod Komorbiditet",
        "text": "Farmaka behandler IKKE kernesymptomerne på autisme. Medicin anvendes målrettet mod komorbid ADHD (methylphenidat), søvnforstyrrelser (melatonin) eller angst."
      },
      {
        "type": "rose",
        "title": "Svær Udadreagering: Restriktiv Antipsykotika",
        "text": "Ved massiv selvskade eller aggression, hvor alle pædagogiske tiltag er udtømte, kan lavdosis Aripiprazol eller Risperidon overvejes i tæt B&U-specialistregi."
      }
    ],
    "algorithm": [
      {
        "stepNumber": 1,
        "badge": "Pædagogisk Indsats",
        "title": "1. Pædagogiske, Psykologiske & Strukturelle Tiltag",
        "summary": "Grundlaget for enhver autismebehandling er miljømæssig tilpasning og psykoedukation.",
        "keyPoints": [
          "Forældretræningsprogrammer og psykoedukation til familie, skole og netværk.",
          "Visuel og tidsmæssig strukturering af hverdagen (f.eks. piktogrammer, skemaer, forudsigelige overgange).",
          "Skærmning mod sensorisk overstimulering (høreværn, rolige pauserum, sansetilpasset miljø).",
          "Social færdighedstræning i trygge og forudsigelige rammer."
        ],
        "action": "Udarbejd specialpædagogisk handleplan i samarbejde med PPR og kommunen."
      },
      {
        "stepNumber": 2,
        "badge": "Ikke-anbefalet",
        "title": "2. Uvirksomme og Ikke-anbefalede Indsatser (NKR)",
        "summary": "Undgå alternative, udokumenterede og potentielt skadelige behandlinger.",
        "keyPoints": [
          "Sundhedsstyrelsens NKR fraråder følgende metoder pga. manglende evidens eller risiko for skade:",
          "Neurofeedback.",
          "Hyperbar iltbehandling (trykkammer).",
          "Specialdiæter (gluten-/kaseinfri diæt) uden dokumenteret somatisk cøliaki/allergi.",
          "Kelatbehandling (afgiftning for tungmetaller) - POTENTIELT LIVSFARLIGT og strengt frarådet."
        ],
        "action": "Rådgiv forældre mod at investere i udokumenterede alternative kure."
      },
      {
        "stepNumber": 3,
        "badge": "Komorbiditet",
        "title": "3. Farmakologisk Behandling af Komorbide Tilstande",
        "summary": "Målrettet medicinsk intervention mod ledsagende psykiatriske lidelser.",
        "keyPoints": [
          "Søvnforstyrrelser: Melatonin er førstevalg ved indsovningsbesvær efter optimering af søvnhygiejne.",
          "Samtidig ADHD: Methylphenidat eller Atomoxetin. Børn med autisme har ofte lavere tolerance og højere bivirkningsfrekvens overfor centralstimulantia.",
          "Komorbid angst / depression: SSRI (Sertralin el. Fluoxetin) i meget lave startdoser.",
          "Svær udadreagerende adfærd / selvskade: Aripiprazol eller Risperidon i lav dosis som absolut sidste udvej."
        ],
        "action": "Start altid med ekstra lave doser pga. øget sensorisk og farmakodynamisk følsomhed hos personer med ASF."
      }
    ],
    "medications": [
      {
        "category": "Medicin mod Komorbiditet ved Autisme",
        "drugs": [
          {
            "name": "Melatonin",
            "class": "Melatoninreceptor-agonist",
            "line": "1. Valg (Søvnforstyrrelser)",
            "startDose": "1-2 mg ved sengetid (30-60 min før)",
            "targetDose": "2-5 mg ved sengetid",
            "maxDose": "10 mg dgl.",
            "notes": "Højeffektivt mod døgnrytmeforstyrrelser og forlænget indsovningstid hos børn med ASF. Gunstig bivirkningsprofil."
          },
          {
            "name": "Methylphenidat",
            "class": "Centralstimulerende (ved komorbid ADHD)",
            "line": "1. Valg (Komorbid ADHD)",
            "startDose": "Ekstra lav startdosis (5-10 mg morgen)",
            "targetDose": "Individuelt optitreret",
            "maxDose": "Standard børnedosis",
            "notes": "Patienter med ASF + ADHD har højere risiko for irritabilitet og tics som bivirkning."
          },
          {
            "name": "Aripiprazol (Abilify)",
            "class": "Atypisk antipsykotikum",
            "line": "Sidste udvej (Svær aggression)",
            "startDose": "1,25-2,5 mg dgl.",
            "targetDose": "2,5-5 mg dgl.",
            "maxDose": "10 mg dgl.",
            "notes": "Anvendes KUN ved alvorlig selvskade eller personfarlig adfærd, hvor pædagogik er udtømt. B&U-specialistopgave."
          }
        ]
      }
    ],
    "monitoring": {
      "title": "Opfølgning & Bivirkningskontrol",
      "items": [
        {
          "title": "Søvn- og Døgnrytmeregistrering",
          "frequency": "Løbende",
          "description": "Søvndagbog til at vurdere indsovningstid, natlige opvågninger og effekt af Melatonin."
        },
        {
          "title": "Vægt og Metabolisk Status (ved Antipsykotika)",
          "frequency": "Baseline, 3 mdr. og hver 6. måned",
          "description": "Højde, vægt, BMI, blodsukker og lipider ved brug af Aripiprazol eller Risperidon."
        }
      ],
      "ratingScales": [
        {
          "name": "ABC (Aberrant Behavior Checklist)",
          "indication": "Udadreagerende adfærd",
          "target": "Målbart fald i irritabilitet"
        },
        {
          "name": "CSHQ (Children's Sleep Habits Questionnaire)",
          "indication": "Søvnvaner",
          "target": "Forbedret søvnmønster"
        }
      ]
    },
    "specialGroups": [
      {
        "title": "Sensorisk Overfølsomhed & Pilleindtag",
        "content": "Mange børn med autisme har udtalt taktil og sensorisk overfølsomhed i munden, som gør pilleslugning vanskelig. Vælg opløselige tabletter, mikstur eller kapsler der må åbnes og drysses på kold mad (f.eks. yoghurt) uden at tygges."
      }
    ]
  },
  "psykose_boern": {
    "id": "psykose_boern",
    "sourceBadge": "Børne- og Ungdomspsykiatrisk Selskab & RADS",
    "title": "Psykotiske Tilstande hos Børn og Unge",
    "subtitle": "RADS-vejledning for skizofreni-spektret hos børn og unge under 18 år (F20-F29)",
    "pdfs": [
      {
        "title": "RADS Børn og Unge (Original PDF)",
        "url": "/pdf/psykotiske-tilstande-boern-behandlingsvejledning.pdf"
      }
    ],
    "takeaways": [
      {
        "type": "emerald",
        "title": "Specialiseret B&U Psykiatri",
        "text": "Udredning og medicinering foregår altid i børne- og ungdomspsykiatrisk regi. Børn under 13 år behandles kun i absolut undtagelsestilfælde og efter regional konference."
      },
      {
        "type": "blue",
        "title": "Aripiprazol er 1. Valg (13-17 år)",
        "text": "Aripiprazol (Abilify) er det eneste antipsykotikum godkendt i Danmark til skizofreni fra 13 år. Risperidon er godkendt til adfærdsforstyrrelser, men off-label til psykose."
      },
      {
        "type": "rose",
        "title": "Vægtøgning & Vækstovervågning",
        "text": "Børn er ekstremt modtagelige for hurtig og massiv vægtøgning samt hyperprolaktinæmi (amenoré, gynækomasti). Olanzapin frarådes som førstevalg pga. fedmerisiko."
      }
    ],
    "algorithm": [
      {
        "stepNumber": 1,
        "badge": "Under 13 år",
        "title": "1. Børn under 13 år: Ekstrem Restriktivitet",
        "summary": "Ingen godkendte antipsykotika til skizofreni under 13 år. Kræver altid specialistkonference.",
        "keyPoints": [
          "Meget sjælden tilstand (Very Early Onset Schizophrenia - VEOS).",
          "Organisk, metabolisk og genetisk udredning skal altid gennemføres grundigt forud for mistanke.",
          "Eventuel medicinsk behandling er eksperimentel off-label og fordrer forældresamtykke samt tæt overvågning i højtspecialiseret enhed."
        ],
        "action": "Henvis altid til højtspecialiseret børne- og ungdomspsykiatrisk afdeling."
      },
      {
        "stepNumber": 2,
        "badge": "13-17 år",
        "title": "2. Unge fra 13 til 17 år: Trinvis Behandling",
        "summary": "Aripiprazol i lav startdosis som 1. valg; Risperidon eller Quetiapin som alternativer.",
        "keyPoints": [
          "1. Valg: Aripiprazol (startdosis 2-5 mg dgl., måldosis 10 mg dgl., maks. 15 mg dgl.).",
          "Aripiprazol foretrækkes pga. markant lavere risiko for vægtøgning og hyperprolaktinæmi.",
          "2. Valg: Risperidon (startdosis 0,5 mg dgl., måldosis 2-4 mg dgl.) eller Quetiapin (100-400 mg dgl.).",
          "Olanzapin bør undgås som 1. valg pga. svær risiko for vægtøgning, som hos unge ofte er irreversibel."
        ],
        "action": "Start Aripiprazol i lav dosis med optrapning over 2-3 uger. Følg vægt og puls ugentligt."
      },
      {
        "stepNumber": 3,
        "badge": "Bivirkninger",
        "title": "3. Monitorering af Særlige Bivirkninger hos Unge",
        "summary": "Tæt kontrol af metabolisk status, somatisk vækst, pubertet og prolaktin.",
        "keyPoints": [
          "Hyperprolaktinæmi: Særlig risiko ved Risperidon. Medfører amenoré, galaktoré, gynækomasti og hæmmet knoglemineralisering.",
          "Ekstrapyramidale bivirkninger (EPS): Akatisi (indre rastløshed) kan forveksles med forværring af psykosen.",
          "Kognitiv afstumpning og sedation kan kompromittere skolegang og social udvikling."
        ],
        "action": "Følg højde/vægt-kurver og mål prolaktin ved tegn på endokrin påvirkning."
      },
      {
        "stepNumber": 4,
        "badge": "Seponering",
        "title": "4. Behandlingsvarighed & Seponering",
        "summary": "Remission efter 1. episode kræver mindst 1-2 års vedligeholdelse.",
        "keyPoints": [
          "Efter 1. psykotiske episode bør behandlingen fortsætte i 1-2 år efter fuld symptomremission.",
          "Udtrapning skal altid foregå over mange måneder i samarbejde med forældre og skole.",
          "Uddannelsesmæssig og social støtte er afgørende for prognosen."
        ],
        "action": "Aftal fast opfølgningsplan under hele udtrapningsforløbet."
      }
    ],
    "medications": [
      {
        "category": "Antipsykotika til Børn & Unge",
        "drugs": [
          {
            "name": "Aripiprazol (Abilify)",
            "class": "D2 partiel agonist",
            "line": "1. Valg (Godkendt fra 13 år)",
            "startDose": "2-5 mg dgl.",
            "targetDose": "10 mg dgl.",
            "maxDose": "15 mg dgl.",
            "notes": "Eneste præparat godkendt til skizofreni fra 13 år i DK. Lav risiko for vægtøgning."
          },
          {
            "name": "Risperidon (Risperdal)",
            "class": "SGA",
            "line": "2. Valg (Off-label skizofreni)",
            "startDose": "0,5 mg dgl.",
            "targetDose": "2-3 mg dgl.",
            "maxDose": "4-6 mg dgl.",
            "notes": "Høj risiko for prolaktinstigning hos unge. Kræver monitorering af pubertetsudvikling."
          },
          {
            "name": "Quetiapin (Seroquel)",
            "class": "SGA",
            "line": "2. Valg",
            "startDose": "25-50 mg dgl.",
            "targetDose": "200-400 mg dgl.",
            "maxDose": "600 mg dgl.",
            "notes": "Sedation og vægtøgning. Lav EPS-risiko."
          }
        ]
      }
    ],
    "monitoring": {
      "title": "Pædiatrisk Sikkerhed & Bivirkningsmonitorering",
      "items": [
        {
          "title": "Højde, Vægt og BMI-percentilkurver",
          "frequency": "Baseline, uge 4, uge 8, uge 12 og hver 3. måned",
          "description": "Hurtig vægtøgning hos børn og unge kan have livsvarige metaboliske konsekvenser."
        },
        {
          "title": "S-Prolaktin",
          "frequency": "Baseline og ved klinisk mistanke",
          "description": "Kontrolleres ved menstruationsforstyrrelser, brystspænding eller galaktoré."
        },
        {
          "title": "EKG og QTc",
          "frequency": "Baseline og ved dosisøgning",
          "description": "Screening for arytmirisiko hos børn og unge."
        }
      ],
      "ratingScales": [
        {
          "name": "PANSS / CGI-S",
          "indication": "Symptom monitorering",
          "target": "Målbart respons"
        }
      ]
    },
    "specialGroups": [
      {
        "title": "Skolegang og Social Kognition",
        "content": "Psykotiske lidelser hos unge forstyrrer ofte kritisk identitetsdannelse og skolegang. Tæt koordination med PPR, skole og socialforvaltning er lige så vigtig som den medicinske behandling."
      }
    ]
  }
};
