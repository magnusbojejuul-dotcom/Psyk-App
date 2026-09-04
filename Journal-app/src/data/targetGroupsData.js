export const targetGroupsData = [
  {
    "id": "adhd",
    "name": "ADHD og ADD",
    "icdCode": "DF90, DF98",
    "category": "Neuropsykiatri",
    "shortDescription": "Voksne med mistanke om eller kendt ADHD/ADD. Ukomplicerede tilfælde udredes i primærsektoren, mens hospitalspsykiatrien varetager svær komorbiditet og markant funktionsfald.",
    "primaryRule": "Ukompliceret udredes hos privatpraktiserende psykiater · Hospitalspsykiatrien ved svær komorbiditet (CGI ≥ 5) eller IQ < 85",
    "originalFile": "malgruppebeskrivelse-adhd-add-df9-28.08.2025.pdf",
    "guidelineInfo": {
      "primarySector": "Henvisning for ukompliceret ADHD/ADD går sædvanligvis til privatpraktiserende speciallæge i psykiatri. Efter endt udredning og eventuel medicinsk stabilisering afsluttes patienten til egen læge til videre receptfornyelse og kontrol.",
      "hospitalCriteria": [
        "Svær psykiatrisk komorbiditet: Psykoselidelser, bipolar lidelse, organiske psykiske lidelser eller svære angstlidelser/OCD i målgruppe for regional behandling.",
        "Samtidigt misbrug: Skadeligt brug (DF1x.1) eller afhængighedssyndrom (DF1x.2), som komplicerer vurdering og behandling.",
        "Svære adfærdsforstyrrelser eller udtalt adfærdsmæssig dysfunktionalitet.",
        "Kognitiv funktionsnedsættelse: Patienter med IQ < 85 og neuropsykiatriske tilstande indenfor autismespektret.",
        "Komplicerende somatisk sygdom: Sklerose, epilepsi, hjerneskader (herunder føtalt alkoholsyndrom), svære neurologiske lidelser, kardiovaskulære risikotilstande, ubehandlet hyperthyreoidisme, fæokromocytom og glaukom."
      ],
      "specialistSupport": "Ved behov for råd og vejledning ift. medicinsk behandling kan egen læge benytte Region Midtjyllands specialisttelefon eller kontakte det lokale ambulatorium via korrespondancebrev."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde / Mangelfuld",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller manglende symptombeskrivelse i henvisningen.",
          "Hvis der mistænkes ADHD/ADD og mulig anden psykisk lidelse (komorbiditet), men denne ikke er beskrevet fyldestgørende."
        ],
        "action": "Tilbagevises med henblik på uddybning af mistanke til både ADHD/ADD og den komorbide lidelse. Hvis der kun er mistanke om ren ADHD uden komorbiditet, tilbagevises henvisningen som værende udenfor hospitalspsykiatriens målgruppe.",
        "clipboardSummary": "ADHD/ADD (CGI 2): Henvisning tilbagevist pga. uklar/mangelfuld symptombeskrivelse eller manglende beskrivelse af hospitalskrævende komorbiditet. Egen læge anmodes om uddybning eller henvisning til praktiserende speciallæge."
      },
      {
        "label": "CGI 3",
        "title": "Ukompliceret ADHD/ADD",
        "severity": "Mild / Ukompliceret",
        "levelType": "primary",
        "badgeText": "Privatpraktiserende psykiater",
        "symptoms": [
          "Mistanke om ADHD/ADD uden psykiatrisk komorbiditet.",
          "Eller kendt ADHD/ADD uden komorbiditet med ønske om medicinopstart, genoptagelse eller præparatskift."
        ],
        "action": "Tilbagevises med anbefaling om henvisning til privatpraktiserende psykiater. Egen læge orienteres om muligheden for rådgivning via Specialisttelefonen eller korrespondancebrev til ambulatoriet.",
        "clipboardSummary": "ADHD/ADD (CGI 3): Ukompliceret ADHD/ADD uden hospitalskrævende komorbiditet. Tilbagevist med anbefaling om henvisning til privatpraktiserende psykiater jf. målgruppebeskrivelsen."
      },
      {
        "label": "CGI 4",
        "title": "Moderat ADHD/ADD uden svær komorbiditet",
        "severity": "Moderat",
        "levelType": "primary",
        "badgeText": "Privatpraktiserende psykiater",
        "symptoms": [
          "Mistanke om eller kendt ADHD/ADD med opmærksomhedsforstyrrelse, hyperaktivitet og impulsivitet til stede fra tidlig barndom (før 7-års alderen).",
          "Komorbiditet eller rusmiddelbrug er til stede, men vurderes IKKE i en sværhedsgrad, der berettiger til hospitalspsykiatri.",
          "Patienten oplever vanskeligheder socialt og erhvervsmæssigt, men fungerer fortsat på trods og uden massiv støtteforanstaltning."
        ],
        "action": "Tilbagevises med anbefaling om henvisning til privatpraktiserende speciallæge i psykiatri. Ved medicinske tvivlsspørgsmål kan egen læge benytte Specialisttelefonen.",
        "clipboardSummary": "ADHD/ADD (CGI 4): Moderat ADHD/ADD uden svær komorbiditet. Funktionsniveau bevaret uden massiv støtte. Tilbagevist til privatpraktiserende psykiater jf. gældende regional retningslinje."
      },
      {
        "label": "CGI 5",
        "title": "Svær ADHD/ADD med komorbiditet eller funktionsfald",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Kendt med ADHD/ADD og ledsaget af svær psykiatrisk komorbiditet, kaotisk misbrug eller svære adfærdsforstyrrelser.",
          "Dyssocial, aggressiv eller trodsig adfærd.",
          "Udtalt funktionsnedsættelse med udtalte problemer med at gennemføre uddannelse eller fastholde beskæftigelse."
        ],
        "action": "Hvis problemstillingen er velbeskrevet og entydig, visiteres der direkte til regionalt Pakkeforløb for ADHD. Hvis det kliniske billede er uklart, visiteres til en afklarende samtale.",
        "clipboardSummary": "ADHD/ADD (CGI 5): Svær ADHD med dokumenteret psykiatrisk komorbiditet / kaotisk misbrug og udtalt funktionsnedsættelse. Visiteret til Pakkeforløb for ADHD i hospitalspsykiatrien."
      },
      {
        "label": "CGI 6",
        "title": "Udtalt / Ekstrem svær ADHD med massivt funktionssammenbrud",
        "severity": "Svær / Invaliderende",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Kendt med ADHD/ADD og ledsaget af vedvarende svære adfærdsforstyrrelser med brud på sociale normer (herunder evt. personfarlig kriminalitet).",
          "Kaotisk misbrug med afgørende destruktiv indflydelse på grundlidelse og funktionsniveau.",
          "Massivt funktionsfald, hvor patienten ikke magter uddannelse eller job på trods af mentor, støtteperson eller botilbud."
        ],
        "action": "Visiteres til regionalt Pakkeforløb for ADHD. Ved uafklaret klinisk tilstand visiteres til afklarende samtale.",
        "clipboardSummary": "ADHD/ADD (CGI 6): Udtalt invaliderende ADHD med massive adfærdsforstyrrelser, kaotisk misbrug og tab af funktionsevne trods støtteforanstaltninger. Visiteret til regionalt Pakkeforløb for ADHD."
      }
    ]
  },
  {
    "id": "angst",
    "name": "Angsttilstande",
    "icdCode": "DF40, DF41",
    "category": "Angst & Belastning",
    "shortDescription": "Panikangst, agorafobi, enkeltfobier, socialfobi og generaliseret angst (GAD). Primærsektoren varetager udredning og let/moderat behandling. Hospitalspsykiatrien varetager svær angst og behandlingsresistens.",
    "primaryRule": "Primærsektor ved let/moderat angst · Hospitalspsykiatri ved behandlingssvigt (psykologisk + medicinsk) og CGI ≥ 5",
    "originalFile": "malgruppebeskrivelse-angst.pdf",
    "guidelineInfo": {
      "primarySector": "Udredning og behandlingsopstart bør som oftest foregå i almen praksis. Egen læge kan henvise til psykolog med tilskud, henvise til Internetpsykiatrien (www.internetpsykiatrien.dk), kommunale ungetilbud (18-25 år) eller opstarte farmakologisk behandling med SSRI/SNRI.",
      "hospitalCriteria": [
        "Moderat angst med behandlingssvigt i almen praksis henvises primært til privatpraktiserende psykiater.",
        "Hospitalspsykiatrien varetager svær angst (CGI ≥ 5), hvor der har været forsøgt sufficient behandling i primær regi (både psykologisk terapi og medicinsk behandling, eller dokumenteret medicinvægring).",
        "Svær komorbiditet eller samtidig udtalt selvmordsrisiko berettiger til direkte henvisning til hospitalspsykiatrien."
      ],
      "specialistSupport": "Ved tvivl om medicinvalg eller behandlingsstrategi kan egen læge kontakte den regionale Specialisttelefon."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde / Mangelfuld",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller mangelfuld beskrivelse af angstsymptomer, varighed og funktionspåvirkning."
        ],
        "action": "Tilbagevises til henvisende læge med henblik på klinisk uddybning.",
        "clipboardSummary": "Angst (CGI 2): Henvisning tilbagevist pga. uklar symptombeskrivelse og manglende dokumentation for hidtidige interventioner."
      },
      {
        "label": "CGI 3",
        "title": "Let angst / Enkeltfobi",
        "severity": "Mild",
        "levelType": "primary",
        "badgeText": "Almen praksis / Psykolog",
        "symptoms": [
          "Lette angstsymptomer eller enkeltfobi (f.eks. frygt for specifikke objekter, tandlæge, nåle).",
          "Ubehag og autonome symptomer (rødmen, sveden, hjertebanken) begrænset til specifikke situationer.",
          "Der er IKKE forsøgt sufficient behandling i primær regi (psykolog, samtaleterapi eller SSRI)."
        ],
        "action": "Tilbagevises med anbefaling om behandling i primær regi (almen praksis, psykolog med tilskud eller internetpsykiatri).",
        "clipboardSummary": "Angst (CGI 3): Let angst/enkeltfobi uden forudgående behandlingsforsøg. Tilbagevist med anbefaling om udredning og behandling i almen praksis / primærsektor."
      },
      {
        "label": "CGI 4",
        "title": "Moderat angst uden sufficient primærbehandling",
        "severity": "Moderat",
        "levelType": "primary",
        "badgeText": "Primærsektor / Praktiserende psykiater",
        "symptoms": [
          "Lette til moderate angstsymptomer (social fobi, panikanfald, undgåelsesadfærd, vegetative symptomer).",
          "Symptomerne påvirker livskvaliteten, men der er IKKE gennemført sufficient evidensbaseret behandling i primær regi."
        ],
        "action": "Tilbagevises med anbefaling om primærbehandling. OBS: Ved dokumenterede selvmordstanker eller mistanke om svær psykiatrisk komorbiditet visiteres der til en afklarende samtale i hospitalspsykiatrien.",
        "clipboardSummary": "Angst (CGI 4): Moderat angsttilstand uden udtømt primærbehandling. Tilbagevist til behandling i primær regi / praktiserende psykiater jf. målgruppekriterierne."
      },
      {
        "label": "CGI 5",
        "title": "Moderat/svær angst med behandlingssvigt i primærsektoren",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Udtalt frygt for kritik/opmærksomhed, massive panikanfald eller generaliseret invaliderende bekymringstendens.",
          "Udtalt undgåelsesadfærd, der begrænser patientens livsudfoldelse og medfører væsentligt funktionsfald.",
          "Dokumenteret forsøg med sufficient evidensbaseret psykologisk behandling OG medicinsk behandling i primær regi (eller velbegrundet medicinvægring)."
        ],
        "action": "Hvis henvisningen er entydig, visiteres direkte til regionalt Pakkeforløb for Angst. Ved diagnostisk uklarhed visiteres til afklarende samtale.",
        "clipboardSummary": "Angst (CGI 5): Moderat til svær angst med væsentligt funktionsfald og dokumenteret behandlingsresistens overfor psykologisk og farmakologisk primærbehandling. Visiteret til Pakkeforløb for Angst."
      },
      {
        "label": "CGI 6",
        "title": "Invaliderende / Svær angst med massivt funktionssammenbrud",
        "severity": "Svær / Invaliderende",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Svære invaliderende angstsymptomer og konstant alarmberedskab.",
          "Massiv undgåelsesadfærd (f.eks. forladt hjemmet i måneder, total isolation).",
          "Funktionsniveauet er svært kompromitteret i en grad, hvor patienten ikke kan varetage basale daglige fornødenheder.",
          "Sufficient behandling forsøgt i primær regi."
        ],
        "action": "Visiteres til regionalt Pakkeforløb for Angst (eller afklarende samtale ved uafklaret tilstand).",
        "clipboardSummary": "Angst (CGI 6): Svært invaliderende angst med udtalt isolation og funktionssvigt trods behandlingsforsøg. Visiteret til regionalt Pakkeforløb for Angst."
      }
    ]
  },
  {
    "id": "autisme",
    "name": "Autismespektrumforstyrrelse (ASF)",
    "icdCode": "DF84",
    "category": "Neuropsykiatri",
    "shortDescription": "Udredning og støtte ved ASF hos voksne. Ukompliceret udredning henhører under privatpraktiserende speciallæge eller psykolog. Hospitalspsykiatrien udreder ved svær komorbiditet.",
    "primaryRule": "Ukompliceret udredes hos privatpraktiserende psykiater · Hospitalspsykiatrien udreder ved svær psykiatrisk komorbiditet",
    "originalFile": "malgruppebeskrivelse-autismespektrumforstyrrelse.pdf",
    "guidelineInfo": {
      "primarySector": "Udredning for autismespektrumforstyrrelser (herunder Aspergers syndrom og atypisk autisme) uden komorbiditet varetages i primær regi af privatpraktiserende speciallæge i psykiatri eller psykolog. Den efterfølgende støtte varetages i kommunalt regi jf. Serviceloven.",
      "hospitalCriteria": [
        "Hospitalspsykiatrien varetager alene udredning for autisme, hvis der samtidig foreligger en udtalt/svær psykiatrisk komorbiditet (f.eks. psykose, bipolar lidelse, svær depression eller svær OCD), som er i målgruppe for regional psykiatri.",
        "Ved samtidig komorbiditet er det den komorbide lidelse, der afgør visitationen og visitationstypen."
      ],
      "specialistSupport": "Kommunale støttetilbud og rådgivning skal ofte iværksættes parallelt med eventuel medicinsk behandling af komorbiditet."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller manglende symptombeskrivelse i henvisningen."
        ],
        "action": "Hvis der kun mistænkes autisme, tilbagevises henvisningen til privatpraktiserende psykiater/psykolog. Hvis der mistænkes komorbiditet, tilbagevises med anmodning om uddybning heraf.",
        "clipboardSummary": "Autisme (CGI 2): Henvisning tilbagevist pga. uklar beskrivelse. Ukompliceret mistanke om ASF henvises til privatpraktiserende psykiater/psykolog."
      },
      {
        "label": "CGI 3",
        "title": "ASF uden komorbiditet",
        "severity": "Mild / Ukompliceret",
        "levelType": "primary",
        "badgeText": "Privatpraktiserende psykiater / Psykolog",
        "symptoms": [
          "Mistanke om autismespektrumforstyrrelse uden psykiatrisk komorbiditet.",
          "Patienten har vanskeligheder med social interaktion og kommunikation, men fremtræder uden anden aktiv psykiatrisk lidelse."
        ],
        "action": "Tilbagevises med anbefaling om henvisning til privatpraktiserende psykiater eller privatpraktiserende psykolog.",
        "clipboardSummary": "Autisme (CGI 3): Mistanke om autisme uden hospitalskrævende komorbiditet. Tilbagevist med anbefaling om henvisning til privatpraktiserende psykiater/psykolog."
      },
      {
        "label": "CGI 4",
        "title": "ASF med lettere/moderat komorbiditet",
        "severity": "Moderat",
        "levelType": "primary",
        "badgeText": "Privatpraktiserende psykiater",
        "symptoms": [
          "Mistanke om eller kendt autisme med samtidig mistanke om lettere til moderat angst, depression eller stressbelastning.",
          "Komorbiditeten er ikke af en sværhedsgrad, der opfylder kriterierne for hospitalspsykiatri."
        ],
        "action": "Tilbagevises med anbefaling om udredning og behandling hos privatpraktiserende psykiater. Hvis den komorbide lidelse derimod vurderes i sværhedsgrad til regional psykiatri, visiteres til afklarende samtale.",
        "clipboardSummary": "Autisme (CGI 4): Autismespektrumtilstand med lettere komorbiditet uden for hospitalspsykiatriens målgruppe. Tilbagevist til privatpraktiserende psykiater."
      },
      {
        "label": "CGI 5",
        "title": "ASF med svær psykiatrisk komorbiditet",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb (Komorbiditet)",
        "symptoms": [
          "Mistanke om eller kendt autisme ledsaget af svær psykiatrisk komorbiditet (svær affektiv lidelse, psykosesuspekt tilstand, svær OCD, massivt funktionsfald).",
          "Komorbiditeten forhindrer almindelig livsudfoldelse og fordrer tværfaglig hospitalspsykiatrisk indsats."
        ],
        "action": "Visiteres til afklarende samtale eller direkte til relevant Pakkeforløb for den komorbide psykiatriske lidelse.",
        "clipboardSummary": "Autisme (CGI 5): Autismespektrumforstyrrelse ledsaget af svær behandlingskrævende komorbiditet. Visiteret til Pakkeforløb for komorbiditeten i hospitalspsykiatrien."
      },
      {
        "label": "CGI 6",
        "title": "ASF med massiv, akut dekompenserende komorbiditet",
        "severity": "Svær / Invaliderende",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb / Akut",
        "symptoms": [
          "Kendt eller mistænkt autisme med akut, udtalt forværring af komorbid svær psykisk lidelse (psykotisk dekompensering, udtalt suicidalitet, ekstrem isolation/funktionssammenbrud)."
        ],
        "action": "Visiteres til behandling/pakkeforløb for den primære psykiatriske grundlidelse i hospitalsbaseret regi.",
        "clipboardSummary": "Autisme (CGI 6): Svær dekompenseret komorbid tilstand hos patient med autisme. Visiteret til regional behandling for den primære psykiatriske lidelse."
      }
    ]
  },
  {
    "id": "bipolar",
    "name": "Bipolar Affektiv Sindslidelse",
    "icdCode": "DF30, DF31",
    "category": "Affektive & Psykotiske",
    "shortDescription": "Bipolar lidelse (mani, hypomani, depression og blandingstilstande). Udredning og ustabile forløb hører under hospitalspsykiatrien. Stabile patienter følges i primærsektoren.",
    "primaryRule": "Udredning og ustabil sygdom varetages i hospitalspsykiatrien · Stabiliseret sygdom følges hos praktiserende psykiater/egen læge",
    "originalFile": "malgruppebeskrivelse-bipolar-lidelse.pdf",
    "guidelineInfo": {
      "primarySector": "Opfølgning og medicinsk vedligeholdelse af velbehandlet og stabiliseret bipolar affektiv sindslidelse kan varetages af privatpraktiserende psykiater. Patienter, der har været stabile i længere tid, kan overgå til kontrol i almen praksis (kontrol af litiumspejl, nyretal, TSH).",
      "hospitalCriteria": [
        "Udredning for bipolar affektiv sindslidelse varetages som udgangspunkt altid i den hospitalsbaserede psykiatri.",
        "Ubehandlet, nydiagnosticeret eller ustabil bipolar lidelse henvises til hospitalspsykiatrien.",
        "Blandingstilstande, hurtigt cyklende forløb (rapid cycling), svære maniske episoder eller bipolar depression med selvmordsfare hører under hospitalspsykiatrien."
      ],
      "specialistSupport": "Egen læge kan ved tvivl om medicinmonitorering eller lette dosisjusteringer kontakte Specialisttelefonen eller sende et korrespondancebrev."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller manglende symptombeskrivelse i henvisningen."
        ],
        "action": "Tilbagevises til henvisende læge med henblik på uddybning af de affektive episoder.",
        "clipboardSummary": "Bipolar lidelse (CGI 2): Henvisning tilbagevist til uddybning af anamnese og maniske/depressive episoder."
      },
      {
        "label": "CGI 3",
        "title": "Stabil bipolar lidelse med ønske om medicinjustering",
        "severity": "Mild / Stabil",
        "levelType": "primary",
        "badgeText": "Privatpraktiserende psykiater",
        "symptoms": [
          "Patienter med kendt bipolar affektiv sindslidelse, som aktuelt har været stabile i en længere periode, men har ønske om medicinomlægning eller dosisjustering."
        ],
        "action": "Tilbagevises med anbefaling om henvisning til privatpraktiserende psykiater, eller orientering om at egen læge kan benytte Specialisttelefonen for rådgivning.",
        "clipboardSummary": "Bipolar lidelse (CGI 3): Kendt, langvarigt stabiliseret bipolar lidelse med ønske om medicinjustering. Tilbagevist med henvisning til praktiserende psykiater eller specialistrådgivning."
      },
      {
        "label": "CGI 4 (Mistanke)",
        "title": "Mistanke om bipolar affektiv sindslidelse",
        "severity": "Moderat",
        "levelType": "clarify",
        "badgeText": "Afklarende samtale",
        "symptoms": [
          "Mistanke om bipolar lidelse med anamnese på mindst 1-2 episoder af minimum 4 dages varighed med mulige hypomane/maniske symptomer (løftet stemningsleje, øget energi, nedsat søvnbehov, talepres, købetrang, øget libido).",
          "Beskrivelse af depressive perioder med kernesymptomer og ledsagesymptomer.",
          "Organisk ætiologi skal være overvejet og udelukket."
        ],
        "action": "Visiteres til afklarende samtale i hospitalspsykiatrien med henblik på diagnostisk udredning.",
        "clipboardSummary": "Bipolar lidelse (CGI 4 - Mistanke): Mistanke om bipolar affektiv sindslidelse med anamnestiske hypomane/maniske og depressive episoder. Visiteret til afklarende samtale i hospitalspsykiatrien."
      },
      {
        "label": "CGI 4 (Kendt)",
        "title": "Kendt bipolar lidelse med let/moderat affektivt skift",
        "severity": "Moderat",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Kendt med bipolar affektiv sindslidelse.",
          "Patienten beskrives med ændring i stemningsleje i form af opstemthed, øget energi eller nedtrykthed.",
          "Patienten er påvirket af tilstanden, men fortsat i stand til at opretholde visse sædvanlige aktiviteter og social kontakt."
        ],
        "action": "Visiteres til regionalt Pakkeforløb for Bipolar Affektiv Sindslidelse.",
        "clipboardSummary": "Bipolar lidelse (CGI 4 - Kendt): Kendt bipolar lidelse med påbegyndende affektivt udsving. Visiteret til regionalt Pakkeforløb for Bipolar Lidelse."
      },
      {
        "label": "CGI 5",
        "title": "Kendt bipolar lidelse med udtalte stemningssvingninger",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Kendt med bipolar lidelse.",
          "Beskrives med udtalte ændringer i stemningslejet eller blandingstilstand (f.eks. udtalt opstemthed, motorisk uro, talepres, søvnløshed, hæmningsløs adfærd eller udtalt depressiv forpinthed med selvmordstanker).",
          "Patienten har store vanskeligheder ved at fortsætte sædvanlige aktiviteter og fungere socialt."
        ],
        "action": "Visiteres til regionalt Pakkeforløb for Bipolar Affektiv Sindslidelse.",
        "clipboardSummary": "Bipolar lidelse (CGI 5): Udtalt affektivt udsving / blandingstilstand med markant funktionsfald. Visiteret til Pakkeforløb for Bipolar Affektiv Sindslidelse."
      },
      {
        "label": "CGI 6",
        "title": "Svær mani eller depression med psykose / fare",
        "severity": "Svær / Akut",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb / Akut",
        "symptoms": [
          "Kendt med bipolar lidelse med svære og ukontrollable stemningsudsving.",
          "Ustyrlig eksaltation, voldsom tankeflugt, manglende søvn, grandiositet, hæmningsløs og personfarlig adfærd.",
          "Eller svær depressiv stupor, udtalt suicidalfare eller psykotiske symptomer (vrangforestillinger, hallucinationer).",
          "Almindelig daglig funktion er fuldstændig umuliggjort."
        ],
        "action": "Visiteres til Pakkeforløb for Bipolar Affektiv Sindslidelse (eller akut indlæggelse ved fare for sig selv eller andre).",
        "clipboardSummary": "Bipolar lidelse (CGI 6): Svær manisk eller depressiv tilstand med psykotiske symptomer og/eller massiv adfærdspåvirkning. Visiteret til Pakkeforløb / Akutpsykiatrien."
      }
    ]
  },
  {
    "id": "depression",
    "name": "Unipolar Depression",
    "icdCode": "DF32, DF33",
    "category": "Affektive & Psykotiske",
    "shortDescription": "Enkelte og tilbagevendende depressive episoder. Let til moderat depression behandles i primærsektoren. Hospitalspsykiatrien varetager behandlingsresistens, svær depression og psykotisk depression.",
    "primaryRule": "Primærsektor ved let/moderat · Hospitalspsykiatri ved behandlingssvigt på 2 antidepressiva eller svær grad (CGI ≥ 5)",
    "originalFile": "malgruppebeskrivelse-depression-nov-2024.pdf",
    "guidelineInfo": {
      "primarySector": "Udredning og behandlingsopstart for let og moderat depression bør foregå i almen praksis med henvisning til psykolog, Internetpsykiatrien, kommunale ungetilbud (18-25 år) og eventuel medicinsk behandling (SSRI). Moderat depression med behandlingssvigt i almen praksis kan henvises til privatpraktiserende psykiater.",
      "hospitalCriteria": [
        "Udtalt funktionsnedsættelse efter forudgående behandlingsforsøg i primær regi.",
        "Medicinsk behandlingsresistens: Manglende sufficient effekt efter behandling med mindst 2 forskellige antidepressiva i sufficient dosis og sufficient tid (måneder).",
        "Svær depression (MDI ≥ 35 / HAM-D ≥ 30) eller depression ledsaget af psykotiske symptomer eller akut selvmordsrisiko berettiger til direkte hospitalshenvisning."
      ],
      "specialistSupport": "Ved tvivl om medicinomlægning eller augmentationsbehandling kan Specialisttelefonen kontaktes af egen læge."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller manglende symptombeskrivelse i henvisningen."
        ],
        "action": "Tilbagevises til henvisende læge med henblik på uddybning.",
        "clipboardSummary": "Depression (CGI 2): Henvisning tilbagevist til uddybning af depressive symptomer og forudgående behandling."
      },
      {
        "label": "CGI 3",
        "title": "Let depression",
        "severity": "Mild",
        "levelType": "primary",
        "badgeText": "Almen praksis",
        "symptoms": [
          "Symptomer på depression af let grad af mindst 2 ugers varighed (organisk årsag udelukket).",
          "1-2 kernesymptomer (nedtrykthed, nedsat lyst/interesse, nedsat energi/øget trætbarhed).",
          "Mindst 2 ledsagesymptomer. MDI 20-24 / Hamilton 13-17.",
          "Der er IKKE forsøgt sufficient behandling i primær regi ved psykolog eller SSRI."
        ],
        "action": "Tilbagevises med rådgivning om opstart af behandling i primær regi (almen praksis/psykolog).",
        "clipboardSummary": "Depression (CGI 3): Let depression (MDI 20-24). Ikke forsøgt primærbehandling. Tilbagevist til behandling i almen praksis."
      },
      {
        "label": "CGI 4",
        "title": "Let til moderat depression",
        "severity": "Moderat",
        "levelType": "primary",
        "badgeText": "Primærsektor / Praktiserende psykiater",
        "symptoms": [
          "Symptomer på let til moderat depression (varighed ≥ 2 uger, organisk årsag udelukket).",
          "Mindst 2 kernesymptomer og mindst 4 ledsagesymptomer. MDI 25-29 / Hamilton 18-24.",
          "Funktionsniveauet er påvirket, men patienten kan fortsætte med visse daglige gøremål.",
          "Der er IKKE forsøgt sufficient behandling i primær regi."
        ],
        "action": "Tilbagevises med anbefaling om udredning og behandling i primær regi eller hos privatpraktiserende psykiater. OBS: Ved dokumenterede selvmordstanker eller mistanke om svær komorbiditet visiteres der til afklarende samtale.",
        "clipboardSummary": "Depression (CGI 4): Moderat depression (MDI 25-29) uden forudgående udtømt primærbehandling. Tilbagevist til behandling i primærsektoren jf. målgruppekriterierne."
      },
      {
        "label": "CGI 5",
        "title": "Moderat/svær depression med behandlingssvigt",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Symptomer på moderat til svær depression af mindst 2 ugers varighed. MDI 30-34 / Hamilton 25-29.",
          "Væsentligt påvirket funktionsniveau med vanskeligheder ved sædvanlige aktiviteter.",
          "Dokumenteret behandlingssvigt på sufficient psykologisk terapi OG sufficient medicinsk behandling (eller velbegrundet medicinvægring)."
        ],
        "action": "Hvis der er veldokumenteret behandlingsresistens og klar problemstilling, visiteres direkte til regionalt Pakkeforløb for Depression. Hvis tilstanden er uafklaret, visiteres til afklarende samtale.",
        "clipboardSummary": "Depression (CGI 5): Moderat/svær depression (MDI 30-34) med udtalt funktionsfald og dokumenteret behandlingssvigt på både psykoterapi og medicin. Visiteret til Pakkeforløb for Depression."
      },
      {
        "label": "CGI 6",
        "title": "Svær depression, psykotisk depression eller suicidalfare",
        "severity": "Svær / Invaliderende",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb / Akut",
        "symptoms": [
          "Svær depression af mindst 2 ugers varighed. MDI 35-50 / Hamilton ≥ 30.",
          "Sædvanlig aktivitet og social udfoldelse er umuliggjort; udtalt psykomotorisk hæmning eller agitation.",
          "Eventuelt ledsaget af psykotiske symptomer (vrangforestillinger om skyld, ruin eller sygdom, auditive hallucinationer) eller udtalt selvmordsfare."
        ],
        "action": "Visiteres akut eller subakut til regionalt Pakkeforløb for Depression / hospitalsindlæggelse ved overhængende selvmordsrisiko.",
        "clipboardSummary": "Depression (CGI 6): Svær depression med massivt funktionssammenbrud / psykotiske symptomer / høj selvmordsrisiko. Visiteret til regional hospitalspsykiatrisk behandling."
      }
    ]
  },
  {
    "id": "ocd",
    "name": "Obsessiv-Kompulsiv Tilstand (OCD)",
    "icdCode": "DF42",
    "category": "Angst & Belastning",
    "shortDescription": "Tvangstanker og tvangshandlinger hos voksne. Let til moderat OCD behandles i primærsektoren. Hospitalspsykiatrien varetager svær OCD med udtalt tidsforbrug og behandlingsresistens.",
    "primaryRule": "Primærsektor ved tidsforbrug < 3 timer/døgn · Hospitalspsykiatri ved svær grad (CGI ≥ 5, tidsforbrug > 3 timer) og behandlingssvigt",
    "originalFile": "malgruppebeskrivelse-ocd.pdf",
    "guidelineInfo": {
      "primarySector": "Udredning og behandlingsopstart bør foregå i almen praksis med henvisning til psykolog med offentligt tilskud (eksponering og responshindring / ERP) og evt. medicinsk behandling med høj-dosis SSRI. Moderat OCD med behandlingssvigt i almen praksis kan henvises til privatpraktiserende psykiater.",
      "hospitalCriteria": [
        "Hospitalspsykiatrien varetager moderat til svær OCD (CGI ≥ 5), hvor der er dokumenteret behandlingssvigt efter forudgående sufficiente behandlingsforsøg (både specialiseret psykologisk behandling og farmakologisk behandling i relevant dosis og varighed).",
        "Svær komorbiditet eller akut selvmordsrisiko berettiger til direkte henvisning til hospitalspsykiatrien."
      ],
      "specialistSupport": "Specialisttelefonen kan kontaktes af egen læge ved tvivl om dosisoptimering ved OCD (hvor SSRI-doser ofte er højere end ved depression)."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller manglende beskrivelse af tvangstanker, tvangshandlinger og tidsforbrug."
        ],
        "action": "Tilbagevises til henvisende læge med henblik på uddybning.",
        "clipboardSummary": "OCD (CGI 2): Henvisning tilbagevist med henblik på uddybning af tvangssymptomer og tidsforbrug."
      },
      {
        "label": "CGI 3",
        "title": "Let OCD",
        "severity": "Mild",
        "levelType": "primary",
        "badgeText": "Almen praksis / Psykolog",
        "symptoms": [
          "Lette symptomer på OCD i form af tvangstanker eller tvangshandlinger.",
          "Tidsforbrug under 1 time dagligt.",
          "Patienten erkender det overdrevne i handlingerne og kan modstå dem i sociale situationer.",
          "Der er IKKE forsøgt sufficient behandling i primær regi med psykolog eller SSRI."
        ],
        "action": "Tilbagevises med anbefaling om behandling i primær regi.",
        "clipboardSummary": "OCD (CGI 3): Let OCD med tidsforbrug < 1 time/døgn uden forudgående behandlingsforsøg. Tilbagevist til primær regi."
      },
      {
        "label": "CGI 4",
        "title": "Moderat OCD uden sufficient primærbehandling",
        "severity": "Moderat",
        "levelType": "primary",
        "badgeText": "Primærsektor / Praktiserende psykiater",
        "symptoms": [
          "Moderate symptomer på OCD med tvangstanker og tvangshandlinger.",
          "Tidsforbrug mellem 1 og 3 timer dagligt.",
          "Patienten kan kun i begrænset omfang modstå tvangshandlingerne, men fungerer fortsat uden massiv støtte.",
          "Der er IKKE forsøgt sufficient behandling i primær regi."
        ],
        "action": "Tilbagevises med anbefaling om primærbehandling. OBS: Ved selvmordstanker eller svær komorbiditet visiteres til afklarende samtale.",
        "clipboardSummary": "OCD (CGI 4): Moderat OCD (tidsforbrug 1-3 timer/døgn) uden udtømt primærbehandling. Tilbagevist til primær regi / praktiserende psykiater."
      },
      {
        "label": "CGI 5",
        "title": "Moderat/svær OCD med behandlingssvigt",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Moderate til svære symptomer på OCD med tvangstanker og tvangshandlinger.",
          "Tidsforbrug mellem 3 og 8 timer dagligt.",
          "Udtalt undgåelsesadfærd, der kompromitterer livsudfoldelse og medfører væsentligt funktionsfald.",
          "Dokumenteret forsøg på sufficient psykologisk (ERP) og medicinsk behandling i primær regi."
        ],
        "action": "Hvis henvisningen er entydig, visiteres direkte til regionalt Pakkeforløb for OCD. Ved diagnostisk uklarhed visiteres til afklarende samtale.",
        "clipboardSummary": "OCD (CGI 5): Svær OCD (tidsforbrug 3-8 timer/døgn) med væsentligt funktionsfald og dokumenteret behandlingssvigt på ERP og medicin. Visiteret til Pakkeforløb for OCD."
      },
      {
        "label": "CGI 6",
        "title": "Ekstrem / Invaliderende OCD",
        "severity": "Svær / Invaliderende",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Svære invaliderende tvangstanker og tvangshandlinger med tidsforbrug over 8 timer dagligt.",
          "Total manglende evne til at modstå trangen; patienten er isoleret i hjemmet.",
          "Sædvanlig funktion, egenomsorg og social kontakt er fuldstændigt umuliggjort.",
          "Sufficient behandling forsøgt i primær regi."
        ],
        "action": "Visiteres til regionalt Pakkeforløb for OCD (eller afklarende samtale ved uafklaret tilstand).",
        "clipboardSummary": "OCD (CGI 6): Ekstrem invaliderende OCD (> 8 timer dagligt) med total isolation og funktionssvigt. Visiteret til Pakkeforløb for OCD i hospitalspsykiatrien."
      }
    ]
  },
  {
    "id": "pf_over",
    "name": "Personlighedsforstyrrelser (Overkontrollerende)",
    "icdCode": "DF60.5, DF60.6, DF60.7",
    "category": "Personlighed & Øvrige",
    "shortDescription": "Ængstelig/evasiv, dependent og tvangspræget personlighedsstruktur. Let/moderat grad udredes og behandles i speciallægepraksis. Hospitalspsykiatrien varetager svær grad med udtalt funktionsfald.",
    "primaryRule": "Let/moderat varetages af privatpraktiserende psykiater · Hospitalspsykiatrien ved svær grad (CGI ≥ 5) og udtalt funktionsnedsættelse",
    "originalFile": "malgruppebeskrivelse-personlighedsforstyrrelse---overkontrollerende.pdf",
    "guidelineInfo": {
      "primarySector": "Udredning og behandling for overkontrollerende personlighedsforstyrrelser af let eller moderat grad varetages i primær regi af privatpraktiserende speciallæge i psykiatri jf. Moderniseringsrapporten.",
      "hospitalCriteria": [
        "Hospitalspsykiatrien varetager udredning og psykoterapeutisk behandling af svære personlighedsforstyrrelser (CGI ≥ 5), hvor der foreligger udtalt funktionsnedsættelse og/eller behandlingsresistent komorbiditet.",
        "Ved akut selvmordsrisiko eller svær ledsagende depression visiteres til afklarende samtale i hospitalspsykiatrien."
      ],
      "specialistSupport": "Henvisninger til hospitalspsykiatrien skal redegøre for tidligere gennemførte psykoterapeutiske tiltag og det aktuelle funktionsniveau i hverdagen."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller manglende beskrivelse af symptomer og personlighedstræk."
        ],
        "action": "Tilbagevises til henvisende læge med henblik på uddybning.",
        "clipboardSummary": "Overkontrollerende PF (CGI 2): Henvisning tilbagevist til uddybning af symptomer og funktionsniveau."
      },
      {
        "label": "CGI 3",
        "title": "Lette overkontrollerende træk",
        "severity": "Mild",
        "levelType": "primary",
        "badgeText": "Almen praksis / Psykolog",
        "symptoms": [
          "Beskrives med lette symptomer på overkontrollerende personlighedsforstyrrelse (ængstelig, dependent eller tvangspræget).",
          "Funktionsniveauet er intakt eller kun let påvirket; patienten klarer hverdagen uden støtte."
        ],
        "action": "Tilbagevises med anbefaling om udredning/behandling i primær regi.",
        "clipboardSummary": "Overkontrollerende PF (CGI 3): Lette træk med bevaret funktion. Tilbagevist til primær regi."
      },
      {
        "label": "CGI 4",
        "title": "Moderate overkontrollerende symptomer",
        "severity": "Moderat",
        "levelType": "primary",
        "badgeText": "Privatpraktiserende psykiater",
        "symptoms": [
          "Moderate symptomer med udtalt generthed, frygt for kritik, uselvstændighed eller rigid perfektionisme.",
          "Patienten fungerer i hverdagen, men oplever begrænsninger socialt eller arbejdsmæssigt.",
          "Funktionsniveauet er ikke svækket i en grad, der berettiger til hospitalspsykiatri."
        ],
        "action": "Tilbagevises med anbefaling om udredning/behandling hos privatpraktiserende psykiater. Ved selvmordstanker visiteres til afklarende samtale.",
        "clipboardSummary": "Overkontrollerende PF (CGI 4): Moderat personlighedsforstyrrelse uden udtalt funktionsfald. Tilbagevist til privatpraktiserende psykiater."
      },
      {
        "label": "CGI 5",
        "title": "Svær overkontrollerende PF med udtalt funktionsfald",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Svære symptomer på overkontrollerende personlighedsforstyrrelse med massiv social tilbagetrækning, isolation og angst.",
          "Udtalt funktionsnedsættelse med vanskeligheder ved uddannelse, arbejde og relationer.",
          "Har forsøgt behandling i primær regi."
        ],
        "action": "Hvis ukendt i afdelingen visiteres til afklarende samtale. Hvis kendt visiteres til Pakkeforløb for Personlighedsforstyrrelser.",
        "clipboardSummary": "Overkontrollerende PF (CGI 5): Svær personlighedsforstyrrelse med udtalt isolation og funktionssvigt. Visiteret til Pakkeforløb for Personlighedsforstyrrelser."
      },
      {
        "label": "CGI 6",
        "title": "Invaliderende overkontrollerende PF",
        "severity": "Svær / Invaliderende",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Udtalt svære symptomer med total isolation fra omverdenen.",
          "Funktionsniveauet er svært påvirket med udtalt tab af færdigheder og manglende evne til at opretholde basale behov.",
          "Sædvanlig livsudfoldelse er umuliggjort."
        ],
        "action": "Visiteres til regional behandling / Pakkeforløb for Personlighedsforstyrrelser.",
        "clipboardSummary": "Overkontrollerende PF (CGI 6): Invaliderende personlighedsforstyrrelse med massivt tab af funktionsevne. Visiteret til regionalt Pakkeforløb for Personlighedsforstyrrelser."
      }
    ]
  },
  {
    "id": "pf_under",
    "name": "Personlighedsforstyrrelser (Underkontrollerende / Borderline)",
    "icdCode": "DF60.3",
    "category": "Personlighed & Øvrige",
    "shortDescription": "Emotionelt ustabil personlighedsstruktur (borderline og impulsiv type). Let/moderat grad behandles i speciallægepraksis. Hospitalspsykiatrien varetager svær grad med udtalt selvskade og affektlabilitet.",
    "primaryRule": "Let/moderat varetages af privatpraktiserende psykiater · Hospitalspsykiatrien ved svær grad (CGI ≥ 5), selvskade og udtalt affektlabilitet",
    "originalFile": "malgruppebeskrivelse-personlighedsforstyrrelse---underkontrollerende.pdf",
    "guidelineInfo": {
      "primarySector": "Udredning og behandling af let eller moderat underkontrollerende personlighedsforstyrrelse varetages i primær regi af privatpraktiserende psykiater jf. Moderniseringsrapporten.",
      "hospitalCriteria": [
        "Hospitalspsykiatrien varetager udredning og psykoterapeutisk behandling (DAT/MBT) af svære tilstande (CGI ≥ 5), hvor der er gentagen selvskade, udtalt affektlabilitet, hyppige kriser eller svær komorbiditet.",
        "Ved akut suicidalitet eller uafklaret krise visiteres til afklarende samtale eller akut vurdering."
      ],
      "specialistSupport": "Henvisningen bør belyse hyppighed og karakter af selvskadende handlinger samt eventuelle tidligere terapeutiske forløb."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller manglende symptombeskrivelse i henvisningen."
        ],
        "action": "Tilbagevises til henvisende læge med henblik på uddybning.",
        "clipboardSummary": "Borderline/Underkontrollerende PF (CGI 2): Henvisning tilbagevist til uddybning af symptomatologi."
      },
      {
        "label": "CGI 3",
        "title": "Lette underkontrollerende symptomer",
        "severity": "Mild",
        "levelType": "primary",
        "badgeText": "Almen praksis / Psykolog",
        "symptoms": [
          "Beskrives med lette symptomer på emotionel ustabilitet eller impulsivitet.",
          "Funktionsniveauet er overvejende intakt uden behov for massiv støtte."
        ],
        "action": "Tilbagevises med anbefaling om udredning/behandling i primær regi.",
        "clipboardSummary": "Borderline/Underkontrollerende PF (CGI 3): Lette symptomer med intakt funktion. Tilbagevist til primær regi."
      },
      {
        "label": "CGI 4",
        "title": "Moderate symptomer uden massivt funktionsfald",
        "severity": "Moderat",
        "levelType": "primary",
        "badgeText": "Privatpraktiserende psykiater",
        "symptoms": [
          "Moderate symptomer med følelsesmæssig ustabilitet, tendens til konflikter og impulsivitet.",
          "Patienten fungerer fortsat i hverdagen uden massivt funktionstab.",
          "Ingen akut livstruende selvskadende adfærd."
        ],
        "action": "Tilbagevises med anbefaling om privatpraktiserende psykiater. Ved selvmordstanker/krise visiteres til afklarende samtale.",
        "clipboardSummary": "Borderline/Underkontrollerende PF (CGI 4): Moderat emotionel ustabilitet uden hospitalskrævende funktionsfald. Tilbagevist til privatpraktiserende psykiater."
      },
      {
        "label": "CGI 5",
        "title": "Svær borderline/underkontrollerende PF",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Svære symptomer på emotionel ustabilitet med udtalt impulsivitet, voldsom affektlabilitet, identitetsforstyrrelse og kronisk tomhedsfølelse.",
          "Gentagne selvskadende handlinger eller udtalte kriser; faldende funktionsniveau.",
          "Har forsøgt behandling i primær regi uden tilstrækkelig effekt."
        ],
        "action": "Hvis ukendt i afdelingen visiteres til afklarende samtale. Hvis kendt visiteres direkte til regionalt Pakkeforløb for Personlighedsforstyrrelser (DAT/MBT).",
        "clipboardSummary": "Borderline/Underkontrollerende PF (CGI 5): Svær emotionelt ustabil personlighedsstruktur med affektlabilitet, selvskade og funktionsfald. Visiteret til Pakkeforløb for Personlighedsforstyrrelser."
      },
      {
        "label": "CGI 6",
        "title": "Udtalt svær / Invaliderende borderline",
        "severity": "Svær / Invaliderende",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb / Intensiv",
        "symptoms": [
          "Udtalt svære symptomer med vedvarende destruktiv adfærd, alvorlig selvskade eller hyppige selvmordsforsøg.",
          "Svært påvirket funktionsniveau med manglende evne til at opretholde basale behov og massivt netværkssammenbrud.",
          "Sædvanlig aktivitet og social udfoldelse er umuliggjort."
        ],
        "action": "Visiteres til regional behandling / Pakkeforløb for Personlighedsforstyrrelser (eller afklarende samtale / akut vurdering).",
        "clipboardSummary": "Borderline/Underkontrollerende PF (CGI 6): Invaliderende emotionel ustabilitet med høj risiko for livsfarlig selvskade og massivt funktionstab. Visiteret til regionalt Pakkeforløb."
      }
    ]
  },
  {
    "id": "udvikling",
    "name": "Psykisk syge udviklingshæmmede",
    "icdCode": "DF70-DF79 + komorbiditet",
    "category": "Neuropsykiatri",
    "shortDescription": "Voksne med mental retardering (IQ < 70) og samtidig mistanke om eller kendt psykisk lidelse. Varetages af Team for Psykisk Syge Udviklingshæmmede (TPSU).",
    "primaryRule": "IQ < 70 uden psykisk lidelse håndteres pædagogisk i kommunen · Ved samtidig psykisk sygdom henvises til TPSU fra CGI 3",
    "originalFile": "malgruppebeskrivelse-psykisk-syge-udviklingshammede-25.02.2025.pdf",
    "guidelineInfo": {
      "primarySector": "Patienter med IQ < 70 og UDEN tegn på psykisk sygdom skal som udgangspunkt håndteres i primær/kommunal regi med en relevant specialpædagogisk indsats jf. Serviceloven.",
      "hospitalCriteria": [
        "Patienter med IQ < 70 og SAMTIDIG mistanke om eller kendt psykisk sygdom (affektiv lidelse, psykose, svær angst/OCD, adfærdsændring) visiteres til Team for Psykisk Syge Udviklingshæmmede (TPSU).",
        "TPSU varetager udredning, diagnostik og tværfaglig psykiatrisk behandling tilpasset patientens kognitive udviklingsalder.",
        "Der kræves ikke forudgående udtømt primær psykiatrisk behandling, da målgruppen har behov for højt specialiseret tilgang fra CGI 3 og opefter."
      ],
      "specialistSupport": "TPSU yder rådgivning til bosteder, pårørende og egen læge omkring observationsmetoder og differentiering mellem somatisk gene, pædagogisk mistrivsel og primær psykiatrisk lidelse."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller manglende beskrivelse af adfærdsændring, psykiske symptomer og kognitivt niveau.",
          "Hvis patienten tidligere er behandlet i hospitalspsykiatrien og afsluttes uden aktuelt behandlingsbehov, men hvor egen læge ønsker rådgivning."
        ],
        "action": "Tilbagevises med henblik på uddybning af den formodede psykiatriske lidelse eller rådgivning via Specialisttelefonen.",
        "clipboardSummary": "Psykisk syge udviklingshæmmede (CGI 2): Henvisning tilbagevist til uddybning af kognitivt niveau og psykiatriske symptomer."
      },
      {
        "label": "CGI 3",
        "title": "Lette psykiske symptomer hos udviklingshæmmet",
        "severity": "Mild",
        "levelType": "hospital",
        "badgeText": "Visiteres til TPSU",
        "symptoms": [
          "Kendt mental retardering (IQ < 70) og samtidig symptomer på let psykisk lidelse (f.eks. lette depressive træk, let angst eller adfærdsændring).",
          "Patienten beskrives med lette adfærdsændringer, men bevarer sit vante funktionsniveau."
        ],
        "action": "Visiteres til udredning og behandling i Team for Psykisk Syge Udviklingshæmmede (TPSU).",
        "clipboardSummary": "Psykisk syge udviklingshæmmede (CGI 3): Kendt mental retardering med mistanke om debuterende psykisk lidelse. Visiteret til TPSU."
      },
      {
        "label": "CGI 4",
        "title": "Moderate psykiske symptomer / adfærdsproblemer",
        "severity": "Moderat",
        "levelType": "hospital",
        "badgeText": "Visiteres til TPSU",
        "symptoms": [
          "Kendt mental retardering og ledsaget af moderate psykiske symptomer eller adfærdsforstyrrelser.",
          "Adfærd påvirket af den psykiske tilstand; patienten er mere udfordret i forhold til sin vanlige trivsel.",
          "Funktionsniveauet er påvirket, men basale behov kan opretholdes med vanligt støtteniveau."
        ],
        "action": "Visiteres til udredning og behandling i Team for Psykisk Syge Udviklingshæmmede (TPSU).",
        "clipboardSummary": "Psykisk syge udviklingshæmmede (CGI 4): Mental retardering med moderate psykiske symptomer og adfærdsforstyrrelse. Visiteret til TPSU."
      },
      {
        "label": "CGI 5",
        "title": "Svær psykisk sygdom hos udviklingshæmmet",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til TPSU",
        "symptoms": [
          "Kendt mental retardering og ledsaget af svær psykisk sygdom (f.eks. mani, psykotiske symptomer, svær depression, selvmordstanker).",
          "Udtalt adfærdsændring præget af uro, vrede, mistillid eller aggression.",
          "Faldende funktionsniveau med tab af færdigheder og stigende støttebehov."
        ],
        "action": "Visiteres til behandling i Team for Psykisk Syge Udviklingshæmmede (TPSU).",
        "clipboardSummary": "Psykisk syge udviklingshæmmede (CGI 5): Mental retardering med svær psykisk lidelse (psykose/mani/svær depression) og markant adfærdsændring. Visiteret til TPSU."
      },
      {
        "label": "CGI 6",
        "title": "Udtalt / Invaliderende forværring og adfærdssammenbrud",
        "severity": "Svær / Invaliderende",
        "levelType": "hospital",
        "badgeText": "Visiteres til TPSU / Akut",
        "symptoms": [
          "Kendt mental retardering med svær, udtalt forværring af psykotiske eller affektive symptomer.",
          "Vedvarende massiv udadreagerende eller selvskadende adfærd.",
          "Udtalt tab af basale færdigheder; ude af stand til at klare daglige fornødenheder uden massiv ekstra hjælp."
        ],
        "action": "Visiteres til Team for Psykisk Syge Udviklingshæmmede (TPSU) / Akutpsykiatrien ved akut fare.",
        "clipboardSummary": "Psykisk syge udviklingshæmmede (CGI 6): Svært dekompenseret tilstand med udtalt udadreagerende adfærd og funktionstab. Visiteret til TPSU / Akutpsykiatrien."
      }
    ]
  },
  {
    "id": "psykose",
    "name": "Psykoser og Skizofreni",
    "icdCode": "DF20-DF29",
    "category": "Affektive & Psykotiske",
    "shortDescription": "Skizofreni, skizotypisk sindslidelse, paranoide psykoser og akutte forbigående psykotiske tilstande. Mistanke om debuterende psykose henvises ALTID til hospitalspsykiatrien.",
    "primaryRule": "Mistanke om psykose henvises ALTID til hospitalspsykiatrien · Kun velbehandlede, langvarigt stabile følges i primærsektor",
    "originalFile": "malgruppebeskrivelse-psykoser.pdf",
    "guidelineInfo": {
      "primarySector": "Patienter med psykoser, hvor tilstanden i længere tid har været fuldstændig stabil og velbehandlet, kan overgå til kontrol i almen praksis (kontrol af bivirkninger, somatisk helbred og metabolisk syndrom).",
      "hospitalCriteria": [
        "Ved enhver mistanke om debuterende eller aktiv psykose henvises patienten direkte til den hospitalsbaserede psykiatri (tidlig opsporing / OPUS / psykoseteam).",
        "Opfølgning og behandling af psykoser, hvor tilstanden er ustabil eller ikke velbehandlet, varetages i hospitalspsykiatrien.",
        "Somatisk/organisk årsag, herunder delir, rusmiddeludløst forgiftning eller cerebral lidelse, bør som udgangspunkt være overvejet og udelukket."
      ],
      "specialistSupport": "Ved tvivl om medicinjustering hos stabile patienter i almen praksis kan egen læge kontakte Specialisttelefonen eller det lokale ambulatorium via korrespondancebrev."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller manglende beskrivelse af symptomer og virkelighedskontakt."
        ],
        "action": "Tilbagevises til henvisende læge med henblik på uddybning.",
        "clipboardSummary": "Psykose (CGI 2): Henvisning tilbagevist til uddybning af psykosenære symptomer."
      },
      {
        "label": "CGI 3",
        "title": "Stabil psykose med ønske om medicinrådgivning",
        "severity": "Mild / Stabil",
        "levelType": "primary",
        "badgeText": "Almen praksis / Specialistrådgivning",
        "symptoms": [
          "Patienter kendt med psykose, som har været stabile i en længere periode og ikke aktuelt har et hospitalsbehandlingsbehov, hvor egen læge ønsker rådgivning om medicinsk behandling."
        ],
        "action": "Tilbagevises med anbefaling om at benytte Specialisttelefonen eller sende et korrespondancebrev til det lokale ambulatorium.",
        "clipboardSummary": "Psykose (CGI 3): Stabil velbehandlet psykose uden aktuelt hospitalsbehandlingsbehov. Tilbagevist med henvisning til specialistrådgivning for egen læge."
      },
      {
        "label": "CGI 4 (Mistanke)",
        "title": "Mistanke om debuterende psykose",
        "severity": "Moderat / Tidlig opsporing",
        "levelType": "clarify",
        "badgeText": "Afklarende samtale (OPUS)",
        "symptoms": [
          "Mistanke om psykose med mulige førsterangssymptomer (høre- og synshallucinationer, tankepåvirkningsoplevelser, styringsoplevelser eller bizarre vrangforestillinger).",
          "Eller mulige negative symptomer (træghed, sløvhed, kontaktforringelse, manglende fremdrift og social tilbagetrækning).",
          "Somatisk/organisk årsag skal være overvejet og udelukket."
        ],
        "action": "Visiteres til afklarende samtale i hospitalspsykiatrien (typisk OPUS / tidlig opsporing af psykose).",
        "clipboardSummary": "Psykose (CGI 4 - Mistanke): Mistanke om debuterende psykotisk tilstand med førsterangs-/negative symptomer. Visiteret til afklarende samtale (OPUS/psykoseteam) i hospitalspsykiatrien."
      },
      {
        "label": "CGI 4 (Kendt)",
        "title": "Kendt psykose med mild/moderat forværring",
        "severity": "Moderat",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Kendt med psykose.",
          "Patienten beskrives med ændring eller forværring af psykotiske symptomer.",
          "Kan rimeligvis korrigeres i de psykotiske oplevelser; patienten er påvirket, men formår fortsat visse sædvanlige aktiviteter."
        ],
        "action": "Visiteres til behandling i regionalt Pakkeforløb for Skizofreni / Psykotiske lidelser.",
        "clipboardSummary": "Psykose (CGI 4 - Kendt): Kendt psykotisk lidelse med forværring i symptomer. Visiteret til regionalt Pakkeforløb for Psykoser."
      },
      {
        "label": "CGI 5",
        "title": "Kendt psykose med udtalt forværring",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Kendt med psykose med udtalt forværring af symptomer.",
          "Kan kun til dels korrigeres i de psykotiske oplevelser.",
          "Adfærd markant ændret fra habituelt; præget af vrede, mistillid eller aggression.",
          "Faldende funktionsniveau med tab af færdigheder og stigende behov for hjælp i hverdagen."
        ],
        "action": "Visiteres til behandling i regionalt Pakkeforløb for Psykoser.",
        "clipboardSummary": "Psykose (CGI 5): Udtalt forværring af psykotisk grundlidelse med nedsat virkelighedskorrigerbarhed og funktionstab. Visiteret til Pakkeforløb for Psykoser."
      },
      {
        "label": "CGI 6",
        "title": "Svær psykotisk tilstand / Tab af virkelighedskontakt",
        "severity": "Svær / Invaliderende",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb / Akut",
        "symptoms": [
          "Kendt med psykose med svær ændring og massiv forværring.",
          "Kan IKKE korrigeres i de psykotiske symptomer og er helt vedholdende i disse.",
          "Svære adfærdsforstyrrelser, vedvarende uhensigtsmæssig eller udadreagerende adfærd.",
          "Svært påvirket funktionsniveau; har behov for hjælp til at opretholde basale behov; sædvanlig aktivitet umuliggjort."
        ],
        "action": "Visiteres til behandling i Pakkeforløb for Psykoser (eller akut indlæggelse ved manglende egenomsorg eller fare).",
        "clipboardSummary": "Psykose (CGI 6): Svær udtalt psykotisk tilstand uden virkelighedskorrektion med tab af basale funktioner. Visiteret til Pakkeforløb / Akutpsykiatrien."
      }
    ]
  },
  {
    "id": "ptsd",
    "name": "Posttraumatisk Belastningsreaktion (PTSD)",
    "icdCode": "DF43.1",
    "category": "Angst & Belastning",
    "shortDescription": "Traumerelateret tilstand efter exceptionelt truende begivenhed. Let til moderat PTSD varetages i primærsektoren. Hospitalspsykiatrien varetager svær PTSD, behandlingsresistens og traumatiserede flygtninge.",
    "primaryRule": "Primærsektor ved let/moderat PTSD · Hospitalspsykiatri ved svær grad (CGI ≥ 5), behandlingssvigt og traumatiserede flygtninge",
    "originalFile": "malgruppebeskrivelse-ptsd.pdf",
    "guidelineInfo": {
      "primarySector": "Udredning og primær behandling for PTSD bør foregå i almen praksis med henvisning til psykolog med tilskud (KAT, EMDR eller stresskontrol) og evt. farmakologisk behandling med SSRI. Moderat PTSD med behandlingssvigt kan henvises til privatpraktiserende psykiater.",
      "hospitalCriteria": [
        "Målgruppen i hospitalspsykiatrien omfatter alene aktiv PTSD (ikke enkeltstående traumereaktioner som led i andre lidelser), hvor patienten opfylder ICD-10 Kriterium A for DF43.1 (udsættelse for katastrofe, tortur, krig, voldtægt, alvorlig ulykke).",
        "Svær PTSD (CGI ≥ 5) med udtalt funktionsfald, hvor der har været forsøgt både psykologisk og medicinsk behandling i primær regi.",
        "Traumatiserede flygtninge udredes og behandles i hospitalspsykiatrien på regionsfunktionsniveau."
      ],
      "specialistSupport": "Ved mistanke om kompleks PTSD med svær dissociering eller komorbiditet kan der henvises til afklarende samtale."
    },
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar henvisning",
        "severity": "Grænsetilfælde",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Uklar eller mangelfuld beskrivelse af traume, traumekarakter og PTSD-kernesymptomer."
        ],
        "action": "Tilbagevises til henvisende læge med henblik på uddybning.",
        "clipboardSummary": "PTSD (CGI 2): Henvisning tilbagevist med anmodning om uddybning af traume og PTSD-kriterier."
      },
      {
        "label": "CGI 3",
        "title": "Let traume / Ikke exceptionelt truende karakter",
        "severity": "Mild",
        "levelType": "primary",
        "badgeText": "Almen praksis / Psykolog",
        "symptoms": [
          "Beskrives med traume, men ikke af exceptionel truende eller katastrofeagtig karakter (opfylder ikke Kriterium A fuldt ud).",
          "Lette mulige symptomer på PTSD.",
          "Der er IKKE forsøgt sufficient behandling i primær regi med relevant psykologforløb (KAT/EMDR) eller medicin."
        ],
        "action": "Tilbagevises med anbefaling om udredning og behandling i primær regi.",
        "clipboardSummary": "PTSD (CGI 3): Traume uden katastrofeagtig karakter og uden forudgående psykologbehandling. Tilbagevist til primær regi."
      },
      {
        "label": "CGI 4",
        "title": "Moderat PTSD uden udtømt primærbehandling",
        "severity": "Moderat",
        "levelType": "primary",
        "badgeText": "Primærsektor / Praktiserende psykiater",
        "symptoms": [
          "Beskrives med traume af mulig katastrofeagtig karakter.",
          "Moderate symptomer på PTSD (flashbacks, mareridt, undgåelsesadfærd, alarmberedskab).",
          "Der er IKKE forsøgt sufficient behandling i primær regi med psykolog eller medicin."
        ],
        "action": "Tilbagevises med anbefaling om primærbehandling. OBS: Ved selvmordstanker visiteres der til afklarende samtale i hospitalspsykiatrien.",
        "clipboardSummary": "PTSD (CGI 4): Moderat PTSD uden udtømt primærbehandling. Tilbagevist til primærsektoren / privatpraktiserende psykiater jf. retningslinjerne."
      },
      {
        "label": "CGI 5",
        "title": "Svær PTSD med behandlingssvigt i primærsektoren",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Dokumenteret traume af exceptionelt truende eller katastrofeagtig karakter, som vil medføre kraftig påvirkning hos enhver.",
          "Moderate til svære PTSD-symptomer (flashbacks, mareridt, massiv undgåelse, hypervigilitet).",
          "Dokumenteret forsøg med både psykologisk terapi (KAT/EMDR) OG medicinsk behandling i primær regi."
        ],
        "action": "Hvis patienten er ukendt i afdelingen visiteres til afklarende samtale. Hvis kendt visiteres direkte til Pakkeforløb for PTSD.",
        "clipboardSummary": "PTSD (CGI 5): Svær PTSD med dokumenteret Kriterium A-traume, væsentligt funktionsfald og resistens overfor psykolog- og medicinbehandling i primær regi. Visiteret til Pakkeforløb for PTSD."
      },
      {
        "label": "CGI 6",
        "title": "Invaliderende PTSD med massivt funktionssammenbrud",
        "severity": "Svær / Invaliderende",
        "levelType": "hospital",
        "badgeText": "Visiteres til Pakkeforløb",
        "symptoms": [
          "Exceptionelt katastrofeagtigt traume med invaliderende PTSD-symptomatologi.",
          "Massiv undgåelsesadfærd, konstant alarmberedskab, udtalte søvnproblemer, affektekplosioner, koncentrationsbesvær og personlighedsændringer.",
          "Mulige psykosenære symptomer; totalt sammenbrud i daglig funktion og sociale relationer.",
          "Sufficient behandling forsøgt i primær regi."
        ],
        "action": "Hvis ukendt visiteres til afklarende samtale. Hvis kendt visiteres til Pakkeforløb for PTSD.",
        "clipboardSummary": "PTSD (CGI 6): Invaliderende PTSD med personlighedsændring og massivt funktionstab trods tidligere behandlingsforsøg. Visiteret til Pakkeforløb for PTSD."
      }
    ],
    "specialSection": {
      "title": "Særlig Målgruppe: Traumatiserede Flygtninge",
      "badge": "Regionsfunktionsniveau",
      "description": "Udredning og behandling for PTSD hos traumatiserede flygtninge varetages som udgangspunkt altid i den hospitalsbaserede psykiatri på regionsfunktionsniveau.",
      "criteria": [
        "Flygtninge eller familiesammenførte med lovligt ophold i Danmark, som i et andet land er blevet traumatiseret som følge af krig, forfølgelse, tortur, fængsel, flugt eller organiseret vold.",
        "Symptomer forenelige med PTSD, angst eller depression (CGI ≥ 5 / Belastningsgrad ≥ 5).",
        "Ved samtidig svær depression skal depressionen behandles først jf. gældende retningslinjer.",
        "Patienter uden officiel flygtningsstatus, men som i øvrigt opfylder kriterierne, behandles ligeledes på regionsfunktionsniveau uden for det specifikke pakkeforløb for flygtninge."
      ],
      "actionText": "Visiteres direkte til afklarende samtale / regionsfunktionstilbud for Traumatiserede Flygtninge."
    }
  },
  {
    "id": "spiseforstyrrelse",
    "name": "Spiseforstyrrelser",
    "icdCode": "DF50",
    "category": "Personlighed & Øvrige",
    "shortDescription": "Anorexia nervosa, bulimia nervosa og atypiske spiseforstyrrelser. Lettere grader udredes og støttes i almen praksis. Hospitalspsykiatrien varetager moderate og svære tilstande (BMI ≤ 17,5 eller hyppige opkastninger).",
    "primaryRule": "Lettere tilfælde varetages i almen praksis/privat regi · Hospitalspsykiatri ved BMI ≤ 17,5, hurtigt vægttab el. bulimi ≥ 2x/uge",
    "originalFile": "Målgruppebeskrivelse - DF5 Spiseforstyrrelser - Sundhed Fagperson.html",
    "guidelineInfo": {
      "primarySector": "Udredning og behandlingsopstart af lettere spiseforstyrrelser bør foregå i almen praksis. Her foretages somatisk udredning, vægtkontrol over tid og rådgivning om normalisering af spisning (3 hovedmåltider og 3 mellemmåltider). Der kan henvises til privatpraktiserende psykolog med erfaring i spiseforstyrrelser eller kommunale tilbud.",
      "hospitalCriteria": [
        "Ved moderate eller svære kernesymptomer på spiseforstyrrelse, eller ved manglende effekt af relevant behandling i primær sektor, henvises der til den hospitalsbaserede psykiatri (Klinik for Spiseforstyrrelser).",
        "Anoreksi: BMI ≤ 17,5 eller et stort og hurtigt vægttab over kort tid, kombineret med vægtangst, fedmefølelse og restriktiv spisning/motion.",
        "Bulimi: Overspisninger med kontroltab kombineret med kompenserende adfærd (opkastning, laksantia, faste) med en hyppighed på minimum 2 episoder ugentligt gennem de seneste 3 måneder.",
        "Klinisk betydende somatisk påvirkning: Påvirket væsketal/elektrolytter, påvirket EKG, lanugobehåring, syreskader eller amenoré."
      ],
      "specialistSupport": "Ved svær somatisk afkræftelse, bradykardi eller svære elektrolytforstyrrelser skal patienten vurderes akut somatisk."
    },
    "referralChecklist": [
      "Vægt og højde (herunder aktuelt BMI og vægtudvikling over de seneste måneder)",
      "Menstruationsstatus og evt. brug af p-piller / hormonel prævention",
      "Beskrivelse af restriktiv spisning (kalorieindtag, faste, selektiv føde)",
      "Hyppighed af overspisningsepisoder gennem de seneste 3 måneder",
      "Hyppighed af kompenserende adfærd (opkastninger, laksantia, diuretika, overdreven motion)",
      "Vurdering af psykologiske symptomer (vægtangst, fedmefølelse, overoptagethed af kropsfigur)",
      "Komorbiditet (depression, OCD, personlighedsforstyrrelse, selvmordsfare)",
      "Objektive fund og paraklinik (BT, puls, EKG, elektrolytter, væsketal, tænder)",
      "Beskrivelse af hidtidige interventioner og behandlingsforsøg i primær sektor"
    ],
    "options": [
      {
        "label": "CGI 2",
        "title": "Uklar / Mangelfuld henvisning",
        "severity": "Grænsetilfælde",
        "levelType": "reject",
        "badgeText": "Tilbagevises til uddybning",
        "symptoms": [
          "Manglende obligatoriske oplysninger i henvisningen (f.eks. manglende vægt/højde, manglende oplysninger om opkastninger, menstruation eller somatisk status)."
        ],
        "action": "Tilbagevises med anmodning om uddybning af de obligatoriske henvisningsoplysninger (se tjeklisten ovenfor).",
        "clipboardSummary": "Spiseforstyrrelser (CGI 2): Henvisning tilbagevist med henblik på uddybning af obligatoriske somatiske og adfærdsmæssige data (BMI, menstruation, opkastninger, blodprøver)."
      },
      {
        "label": "CGI 3",
        "title": "Let grad af spiseforstyrrelse",
        "severity": "Mild",
        "levelType": "primary",
        "badgeText": "Almen praksis / Psykolog",
        "symptoms": [
          "Anoreksi: Vægtkriteriet er IKKE opfyldt (BMI > 17,5 uden hurtigt vægttab). Fravær af udtalte psykologiske eller adfærdsmæssige symptomer.",
          "Bulimi: Hyppighed af overspisning og opkastning er under 2 gange ugentligt de seneste 3 måneder.",
          "Der er IKKE forsøgt relevant behandling i primær regi."
        ],
        "action": "Tilbagevises med anbefaling om behandling i primær regi (kostvejledning, almen praksis, privat psykolog eller relevant kommunalt tilbud).",
        "clipboardSummary": "Spiseforstyrrelser (CGI 3): Let spiseforstyrrelse uden opfyldt vægtkriterie / < 2 ugentlige bulimiske episoder. Tilbagevist til behandling i primær regi."
      },
      {
        "label": "CGI 4-6",
        "title": "Moderat til svær spiseforstyrrelse",
        "severity": "Markant / Svær",
        "levelType": "hospital",
        "badgeText": "Visiteres til Afklarende / Pakkeforløb",
        "symptoms": [
          "Anoreksi: Vægtkriteriet er opfyldt (BMI ≤ 17,5 eller stort hurtigt vægttab), restriktiv spisning, faste, overdreven motion. Fysiske tegn (amenoré, påvirket væsketal/EKG, lanugo). Udtalt vægtangst og lav sygdomserkendelse.",
          "Bulimi: Overspisninger med kontroltab minimum 2 gange ugentligt i de seneste 3 måneder med kompenserende adfærd (opkastning, afføringsmidler, faste). Fysiske symptomer (elektrolytpåvirkning, syreskader).",
          "Udtalt fedmefølelse, overoptagethed af vægt/figur og væsentlig påvirket funktionsevne."
        ],
        "action": "Patienten visiteres til afklarende samtale i Klinik for Spiseforstyrrelser. Hvis patienten allerede er udredt i psykiatrisk regi inden for de sidste 6 måneder, og spiseforstyrrelse er A-diagnose, kan der visiteres direkte til regionalt Pakkeforløb.",
        "clipboardSummary": "Spiseforstyrrelser (CGI 4-6): Moderat/svær spiseforstyrrelse med opfyldte diagnostiske kriterier (BMI ≤ 17,5 / hyppige kompenserende episoder / somatiske følger). Visiteret til afklarende samtale / Pakkeforløb for Spiseforstyrrelser."
      }
    ]
  },
  {
    "id": "dobbelt",
    "name": "Integreret Dobbeltdiagnosebehandling",
    "icdCode": "DF1x + DF2x-DF6x, DF8x-DF9x",
    "category": "Personlighed & Øvrige",
    "shortDescription": "Samtidig moderat/svær psykisk lidelse OG rusmiddelafhængighed hos patienter med markant nedsat funktionsevne (GAF 1-40). Et integreret regionalt tilbud i Region Midtjylland.",
    "primaryRule": "Moderat/svær psykiatrisk lidelse (CGI ≥ 5, eller CGI ≥ 4 ved psykose/bipolar) SAMT GAF 1-40",
    "originalFile": "malgruppebeskrivelse-region-midt-integreret-dobbeltdiagnosebehandling-02.09.25-tg.pdf",
    "guidelineInfo": {
      "primarySector": "Patienter med lette eller ukomplicerede rusmiddelproblemer eller patienter med intakt funktionsevne (GAF > 40) behandles i parallelle/koordinerede forløb mellem den kommunale rusmiddelbehandling og almen praksis / praktiserende psykiater.",
      "hospitalCriteria": [
        "Patienten skal have en moderat til svær behandlelig psykisk lidelse eller stærk begrundet mistanke herom (CGI-score 5-7, fraset Bipolar og Psykose, hvor CGI=4-7 også er gældende).",
        "Funktionsevnen skal være massivt nedsat svarende til en samlet GAF-score på 1-40.",
        "Patienten vurderes ikke at kunne følge eller profitere af behandling i et opdelt/parallelt tilbud, hvorfor integreret samtænkning af psykiatrisk behandling og misbrugsbehandling er påkrævet.",
        "Behandlingsmulighederne i primær sektor må ikke tidligere være vurderet udtømte, medmindre der er sket væsentlige kliniske ændringer."
      ],
      "specialistSupport": "Henvisninger visiteres tværfagligt mellem regional psykiatri og kommunale misbrugscentre."
    },
    "options": [
      {
        "label": "Ikke opfyldt",
        "title": "Udenfor målgruppe for integreret tilbud",
        "severity": "Udenfor målgruppe",
        "levelType": "reject",
        "badgeText": "Parallelbehandling / Primærsektor",
        "symptoms": [
          "Patienten har et rusmiddelforbrug, men den psykiatriske grundlidelse er af let eller moderat grad (CGI < 5, eller CGI < 4 ved psykose/bipolar).",
          "Funktionsevnen er moderat eller velbevaret (GAF > 40); patienten kan varetage boevne og daglige fornødenheder.",
          "Eller rusmiddelindtaget forklarer symptomerne fuldt ud (simpel rusmiddelpåvirkning/abstinens)."
        ],
        "action": "Tilbagevises med henvisning til parallel/koordineret indsats mellem kommunal rusmiddelbehandling og almen praksis / privatpraktiserende psykiater.",
        "clipboardSummary": "Dobbeltdiagnose (Ikke opfyldt): Opfylder ikke visitationskriterierne for integreret dobbeltdiagnose (CGI < 5 eller GAF > 40). Tilbagevist til parallelbehandling i kommunalt/primært regi."
      },
      {
        "label": "Opfyldt",
        "title": "I målgruppe for Integreret Dobbeltdiagnosebehandling",
        "severity": "Moderat/Svær + Lav GAF",
        "levelType": "hospital",
        "badgeText": "Visiteres til Integreret Dobbeltdiagnose",
        "symptoms": [
          "Psykiatrisk kriterium: Moderat til svær lidelse (CGI 5-7, eller 4-7 ved F2/F3): F1 (kun stofudløst psykose), F2 (skizofreni/psykose), F3 (affektiv/bipolar), F4 (angst/PTSD/OCD), F5 (spiseforstyrrelse), F6 (personlighedsforstyrrelse med komorbiditet) eller F8/F9 (ADHD/autisme med komorbiditet).",
          "Funktionsevnekriterium: Samlet nedsat funktionsevne svarende til GAF-score 1-40.",
          "Autonomi og boevne: Har udtalt behov for støtte til daglige gøremål, hygiejne, økonomi, eller er truet af hjemløshed/funktionel hjemløs.",
          "Netværk og beskæftigelse: Massivt netværkstap, social isolation og ingen reel tilknytning til arbejdsmarked eller uddannelse."
        ],
        "action": "Patienten visiteres til Integreret Dobbeltdiagnosebehandling i Region Midtjylland.",
        "clipboardSummary": "Dobbeltdiagnose (Opfyldt): Patienten opfylder kriterierne for Integreret Dobbeltdiagnosebehandling i Region Midtjylland (Moderat/svær psykiatrisk lidelse CGI ≥ 5/4 SAMT massivt nedsat funktionsevne GAF 1-40). Visiteret til integreret regional behandling."
      }
    ]
  }
];
