export const GROENSPAETTEBOG_META = {
    title: 'Grønspættebog – Læger AFP',
    subtitle: 'Velkomstmanual for læger i Afdeling for Psykoser (AFP), AUH Psykiatrien',
    authors: 'NGK og MBB, februar 2023',
    updated: '20.02.2023',
    pdfFile: 'pdf/Groenspaettebog_AFP.pdf',
    downloadName: 'Groenspaettebog_Laeger_AFP.pdf',
    totalPages: 45,
};

export const GROENSPAETTEBOG_THEMES = [
    {
        id: 'afp_opbygning',
        navId: 'gs_afp_opbygning',
        title: 'AFP – Afdelingens opbygning',
        shortTitle: 'AFP Opbygning',
        pages: 's. 2',
        startPage: 2,
        icon: 'Users',
        summary: 'Overblik over sengeafsnit (S6, S7, S8, S10), Klinik 1 og Klinik 2 samt overgang fra Børn og Unge Psykiatri.',
        subSections: [
            {
                id: 'afdelingsoversigt',
                title: 'Psykiatrien – Afdeling for Psykoser (AFP) opbygning',
                pages: 's. 2',
                blocks: [
                    {
                        type: 'links',
                        title: 'Afdelingens officielle side',
                        items: [
                            {
                                label: 'Afdeling for Psykoser (AUH Psykiatrien)',
                                url: 'https://www.psykiatrien.rm.dk/afdelinger/auhpsykiatrien/afdeling-for-psykoser/',
                                description: 'Overordnet information om AFP',
                            },
                        ],
                    },
                    {
                        type: 'table',
                        title: 'Afsnit og klinikker i AFP',
                        headers: ['Afsnit / Klinik', 'Typiske diagnoser / patienter', 'Info-link'],
                        rows: [
                            [
                                'S6 (De Særlige Pladser)',
                                'Svære psykiske lidelser\nTendens til udadreagerende adfærd\nOfte misbrug + flere afbrudte behandlingsforløb + komplicerede sociale forhold',
                                { label: 'Link S6', url: 'https://www.psykiatrien.rm.dk/afdelinger/auhpsykiatrien/afdeling-for-psykoser/i-behandling/indlaggelse/sengeafsnit-6/' },
                            ],
                            [
                                'S7',
                                'Skizofreni + Andre psykoser\nUdviklingsforstyrrelser',
                                { label: 'Link - S7', url: 'https://www.psykiatrien.rm.dk/afdelinger/auhpsykiatrien/afdeling-for-psykoser/i-behandling/indlaggelse/sengeafsnit-7/' },
                            ],
                            [
                                'S8',
                                'Skizofreni + Andre psykoser\nUdviklingsforstyrrelser + retslige patienter',
                                { label: 'Link - S8', url: 'https://www.psykiatrien.rm.dk/klinikker-og-sengeafsnit/aarhus-universitetshospital-psykiatrien/afdeling-for-psykoser/sengeafsnit-8/' },
                            ],
                            [
                                'S10',
                                'Skizofreni + Andre psykoser\nGerontopsykiatriske patienter (demens og delir)',
                                { label: 'Link - S10', url: 'https://www.psykiatrien.rm.dk/klinikker-og-sengeafsnit/aarhus-universitetshospital-psykiatrien/afdeling-for-psykoser/sengeafsnit-10/' },
                            ],
                            [
                                'Klinik 1',
                                'Udredning + behandling\n- Skizofreni + andre psykotiske lidelser',
                                { label: 'Link - Klinik 1', url: 'https://www.psykiatrien.rm.dk/afdelinger/auhpsykiatrien/afdeling-for-psykoser/i-behandling/ambulant-behandling/psykiatrisk-klinik-1/' },
                            ],
                            [
                                'Klinik 2',
                                '3 Teams:\n1) Team for Skizofreni – OPUS: Intensivt forløb op til 2 år for personer >18 år med skizofreni.\n2) Team for Dobbeltdiagnoser: Udredning af psykiatriske symptomer samtidig med alvorligt misbrug.\n3) Team for ADHD: Behandling af ADHD når samtidig anden psykiatrisk sygdom.',
                                { label: 'Link - Klinik 2', url: 'https://www.psykiatrien.rm.dk/afdelinger/auhpsykiatrien/afdeling-for-psykoser/i-behandling/ambulant-behandling/psykiatrisk-klinik-2/' },
                            ],
                        ],
                    },
                    {
                        type: 'callout',
                        variant: 'info',
                        title: 'Overgang fra Børn og Unge Psykiatri',
                        items: [
                            'Personer som har haft et forløb inden 18 årsalderen har forløb i Børn og Unge Psykiatrien indtil de fylder 21 år.',
                            'Spiseforstyrrelser ses i Børn og Unge Psykiatrien, uanset alder over 18 år.',
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'vagt',
        navId: 'gs_vagt',
        title: 'Vagt & Modtagelse',
        shortTitle: 'Vagt & Modtagelse',
        pages: 's. 3–13',
        startPage: 3,
        icon: 'Stethoscope',
        summary: 'Forberedelse før patienten ankommer, journaloptagelse i modtagelsen, somatisk/neurologisk/psykisk US, selvmords- & risikovurdering samt indlæggelses-kladde.',
        subSections: [
            {
                id: 'forberedelse',
                title: 'Forberedelse før patienten ankommer',
                pages: 's. 3',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Du kan med fordel orientere dig i nedenstående 8 punkter i EPJ før patienten ankommer:',
                    },
                    {
                        type: 'kvList',
                        title: 'Journalforberedelse i EPJ',
                        items: [
                            {
                                key: '"Henvisninger"',
                                badge: 'Korrespondance -> Henvisninger',
                                value: 'Læs henvisningen fra vagtlæge/egen læge (OBS: husk at vælge "Alle henvisninger"). Ved planlagt/elektiv indlæggelse eller efterlyst på baggrund af dom: Hvad står der i oplægget til indlæggelse eller efterlysningsnotatet? Hvem har besluttet at pt. skal indlægges, hvad er formålet, og hvad står der i koordinationsplanen?',
                            },
                            {
                                key: '"Diagnoseoversigt"',
                                badge: 'Dokumentation -> Diagnoseoversigt',
                                value: 'Aktuelle somatiske samt psykiatriske diagnoser. Hvor lang tid har pt. haft diagnoserne?',
                            },
                            {
                                key: '"Journal"',
                                badge: 'F8',
                                value: 'Læs visitation og forsamtale. Hvis tidl. indlagt: læs seneste epikrise.',
                            },
                            {
                                key: '"Kontakter"',
                                badge: 'Person og forløb -> Kontakter',
                                value: 'Kontakter kan åbnes en ad gangen v. højreklik + "Vis i læs journal". Følges patienten ambulant? Hvis ja: Hvor, hvornår senest set, og hvornår er næste tid? Hvilke typer kontakter er der til psykiatrien samt somatiske hospitaler?',
                            },
                            {
                                key: '"Sygdomshistorik"',
                                badge: 'Dokumentation -> Sygdomshistorik',
                                value: 'Læs kort såfremt denne findes. Er der dokumenteret/beskrevet tidligere tvang eller voldsepisoder?',
                            },
                            {
                                key: '"Ordinationsoversigt"',
                                badge: 'Medicin -> Ordinationsoversigt',
                                value: 'Hvilken medicin har pt. aktuelt ordineret i EPJ? Stemmer denne overens med ordinationerne i FMK? Se evt. hvornår pt. sidst har indløst recept på præparatet ift. compliance.',
                            },
                            {
                                key: '"Retslige foranstaltninger, psykiatri"',
                                badge: 'Dokumentation -> Plan og resultater',
                                value: 'Hvis der er retslige foranstaltninger for pt. findes disse her. Der gøres opslag i: Koordinationsplan og Retslige foranstaltninger, psykiatri.',
                            },
                            {
                                key: 'Opslag i Sundhedsjournal',
                                badge: 'Alt + Shift + 8',
                                value: 'Evt. behov for opslag. Se i journalen efter: Kontakter m. psykiatrien i andre regioner samt Kontakter før EPJ.',
                            },
                        ],
                    },
                ],
            },
            {
                id: 'dokumentation_oversigt',
                title: 'Dokumentation i psykiatrisk modtagelse',
                pages: 's. 4',
                blocks: [
                    {
                        type: 'kvList',
                        title: 'Valg af notattype – ny ankomst',
                        items: [
                            { key: 'Skal indlægges', value: '"Journaloptagelse"' },
                            { key: 'IKKE indlægges på sengeafsnit, men have nat i modtagelsen', value: '"Journaloptagelse"' },
                            { key: 'IKKE indlægges, men have HAT (Hurtig Ambulant Tid)', value: '"Skadenotat + Henvisning"' },
                            { key: 'IKKE indlægges, men hjem igen', value: 'Skadenotat' },
                        ],
                    },
                    {
                        type: 'kvList',
                        title: 'Patienter der ligger i modtagelsen (fx efter overnatning med journaloptagelse)',
                        items: [
                            { key: 'Hvis ny nat i modtagelsen', value: '"Journalnotat"' },
                            { key: 'Hvis udskrivelse', value: '"Udskrivningsnotat"' },
                            { key: 'Hvis indlæggelse', value: '"Journalnotat"' },
                        ],
                    },
                    {
                        type: 'callout',
                        variant: 'warning',
                        title: 'Minimumsdokumentation & manglende samarbejde',
                        items: [
                            'OBS: I toppen af journalnotatets boks ses "Minimumsdokumentation" – dette SKAL skrives. Øvrige ting KAN dikteres.',
                            'Der er patienter hvor det ikke er muligt at indhente alle informationer i forbindelse med journaloptagelsen, da patienten ikke kan/vil samarbejde. Skriv/uddyb da dette i de relevante afsnit.',
                        ],
                    },
                    {
                        type: 'bullets',
                        title: 'Forløbsbeskrivelse (vælg kun ét forløb)',
                        items: [
                            '"I henhold til dom m. mulighed for indlæggelse"',
                            '"Suicidalitet eller selvskade"',
                            '"Udadreagerende adfærd"',
                            '"Mgl. sociale ressourcer og udtalt forpinthed"',
                            '"Diagnostiske vanskeligheder"',
                            '"Placeret uden for forløbsbeskrivelse"',
                        ],
                    },
                    {
                        type: 'kvList',
                        title: 'Indledende dokumentationspunkter',
                        items: [
                            {
                                key: 'Samtale m. behandlingssigte',
                                value: 'Beskriv hvem der er til stede i rummet. Eksempel: Tilstede: Pt. + Kp (navn) + ut.',
                            },
                            {
                                key: 'Kontaktårsag',
                                value: 'Hvem (alder, køn). Aktuelle diagnoser / aktuelle problemstillinger (misbrug, alkohol mv.). Hvordan er de kommet i kontakt med psykiatrien (frivillig / selvhenvender / gennem akutmodtagelsen / henvisning fra vagtlæge / kommer med politiet / aktiveret dom / røde eller gule papirer). Hvorfor kommer de? Særlige omstændigheder i forbindelse med kontakten?',
                            },
                            {
                                key: 'KRAM / Misbrugsoplysninger',
                                value: 'Registrering eller opdatering af KRAM samt misbrugsoplysninger fra forsamtale. Følg SFI’ens opbygning. Registrer hvordan patienten forholder sig til sit forbrug/misbrug, og om pt. modtager eller ønsker behandling af sit misbrug.',
                            },
                        ],
                    },
                ],
            },
            {
                id: 'socialt_somatisk',
                title: 'Socialt, Somatisk & Neurologisk US',
                pages: 's. 5–6',
                blocks: [
                    {
                        type: 'bullets',
                        title: 'Socialt (informationer vedr. børn registreres i "Patientens netværk")',
                        items: [
                            'Gift/single? Børn (antal, køn og alder) – hvor er de aktuelt?',
                            'Boligforhold?',
                            'Jobstatus (i job – hvilket / arbejdsløs / pensioneret / sygemeldt / førtidspensionist / invalidepensionist).',
                            'Kommunal støtte? Hjælp i hjemmet? Bostøtte? Hjemmepleje?',
                            'Forhold til venner / familie og sociale forhold der presser patienten?',
                        ],
                    },
                    {
                        type: 'bullets',
                        title: 'Aktuelt somatisk – systematisk adspurgt',
                        items: [
                            'Kendte somatiske sygdomme (og evt. behandling – fx diabetes) + familiære dispositioner til somatisk sygdom + somatiske klager.',
                            'CNS: Hovedpine, svimmelhed, synsforstyrrelser/dobbeltsyn, ændret kraft/styrelse, snurren i kroppen, besvimelser?',
                            'CP: Brystsmerter, åndenød, hjertebanken, hoste (evt. opspyt)?',
                            'GI: Kvalme (opkastninger), abdominalsmerter, påvirket appetit, vægttab?',
                            'UG: Kløe, svie, smerte ved vandladning, hyppig vandladning?',
                            'Bevægeapparatet: Ondt i kroppen, slået sig? Udslæt?',
                        ],
                    },
                    {
                        type: 'callout',
                        variant: 'info',
                        title: 'Objektivt somatisk (journalføres i "Somatisk undersøgelse – ZZ0149A")',
                        text: 'Somatisk samt neurologisk US udføres. Er patienten aktuelt svært affektpræget, psykotisk, truende, eller ude af stand til at samarbejde om somatisk undersøgelse, må der på baggrund af vurdering af patientens aktuelle somatiske tilstand ventes med grundigere somatisk/neurologisk US til senere -> Notér da dette.',
                    },
                    {
                        type: 'links',
                        title: 'Inspiration til neurologisk US',
                        items: [
                            { label: 'www.neurous.dk', url: 'http://www.neurous.dk/', description: 'Vejledning og inspiration til neurologisk undersøgelse' },
                        ],
                    },
                    {
                        type: 'bullets',
                        title: 'Somatisk US – tjekliste',
                        items: [
                            'Øjne: Inspektion. Lysreaktion. Bevægelighed. H-konfiguration.',
                            'Cavum Oris: Inspektion, tungebevægelser.',
                            'Columna/hals: Inspektion. Bevægelse i alle planer. Palpation for struma samt forstørrede lymfeknuder.',
                            'St.c: Stetoskopi samt sammenhold med perifere pulsforhold.',
                            'St.p: Stetoskopi samt evt. perkussion v. bilyde.',
                            'Abdomen: Inspektion. Palpation. Dunkeømhed over nyreloger. Stetoskopi.',
                            'Ekstremiteter: Undersøgelse af eventuelle sår mv. Palpation af puls A. radialis samt A. tibialis.',
                            'Herudover andet på baggrund af evt. somatiske klager.',
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Eksempel på Somatisk US (normalt fund)',
                        templateText: `Overblik: Almentilstand normal. Ernæringstilstand middel. Huden varm og tør. Respiration ubesværet.
Øjne: Runde egale pupiller m. normalt lysrespons. Fri bevægelighed. Normal H-konfiguration. Ingen nystagmus.
Cavum Oris: God tandstatus. Tunge uden belægninger, atrofi eller sidedeviation, ingen rødme eller tonsilsvulst i fauces.
Columna: Fri bevægelighed. Ikke nakke-ryg stiv. Ingen struma. Ingen palpable lymfeknuder.
St.c.: Regelmæssig hjerterytme = perifær puls. Ingen hørbare mislyde.
St.p.: Vesikulær respiration bilat. Ingen hørbare bilyde. Ingen dæmpning ved percussion.
Abdomen: Blødt, fladt, indolent. Ingen palpable udfyldninger. Ingen ømhed over nyreloger. Normale tarmlyde.
Ekstremiteter: Ingen cicatricer, sår eller ødemer. Palpabel puls v. A. radialis samt A. tibialis posterior.`,
                    },
                    {
                        type: 'bullets',
                        title: 'Neurologisk US – 9 punkter',
                        items: [
                            'Sprog: Afasi/dysarthri? (Talen klar og tydelig?)',
                            'Kranienerver: Gennemgang af II–XII.',
                            'Gang & Stand: Vurdering af stand samt gang flad fod, hæl samt tæer.',
                            'Rombergs test: Positiv v. korrektionsskridt.',
                            'Motorisk system: Strakt arm- og bentest (pronation mv. registreres). Kraftundersøgelse over skulder, albue, hånd, hofte, knæ og fodled.',
                            'Reflekser: Dybe senereflekser (biceps, triceps, brachioradialis, patellar og achilles) samt plantar respons.',
                            'Cerebellart: Finger-næse-finger forsøg samt knæ-hæl forsøg (ataksi/problemer registreres).',
                            'Ekstrapyramidalt: Bradykinesi (langsomme/træge bevægelser?), rigiditet eller ufrivillige bevægelser?',
                            'Sensorisk: Sensibilitet for berøring samt stik bilateralt på fingre/tæer samt på niveau m. papiller og umbilicus (klager pt. ikke over sensoriske udfald undersøges der ikke yderligere).',
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Neurologisk US – Detaljeret tekst (Kranienerver II–XII)',
                        templateText: `Kranienerve: II-XII
II: Normalt synsfelt monokulært samt binokulært
III, IV, VI: Runde, egale pupiller m. normalt lysrespons. Fri bevægelighed, normal H-konfiguration, ingen nystagmus.
V: Normal ansigtssensorik for berøring samt smerte
VII: Normal motorik samt styrke v. smil, øjenlukning samt panderynkning.
VIII: Hører fingergnidning
IX, X: Midtstillet uvula, bilateralt ens løft af ganesejl
XI: Normal kraft samt bevægelighed v. hoveddrejning, hovedløft samt skulderløft
XII: Normal styrke samt fri bevægelighed af tunge.

Sprog: Talen klar og tydelig.
Gang og stand: Normal stand, intet besvær v. gang på flad fod, hæl samt tæer.
Rombergs test: Negativ.
Motorisk system: Strakt arm samt bentest uden deviation. Bilateral ens, normal kraft over skulder, albue, hånd, fingre, hofte, knæ og fodled.
Reflekser: Normale reflekser v. biceps/triceps/brachioradialis, patellar og achilles. Normalt plantar respons.
Cerebellart: Normalt Finger-næse-finger samt knæ-hæl forsøg. Normal diadokokinese.
Ekstrapyramidalt: Ingen bradykinesi, rigiditet eller ufrivillige bevægelser.
Sensorisk: Normal sensorik for berøring samt smerte på UE samt OE.`,
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Neurologisk US – Kort variant 1 (Grovneurologisk US)',
                        templateText: `Grovneurologisk US.
Kranienerver II-XII. i.a.
Talen klar og tydelig. Normal gang og stand. Rombergs test negativ.
Bilateral ens kraft over alle store muskelgrupper. Normal, egal biceps, triceps, brachioradialis, patella samt achilles-refleks. Normalt plantar-respons.
Normal Finger-næse-finger samt knæ-hæl-knæ forsøg. Normal diadokokinese.
Ingen ufrivillige bevægelser eller rigiditet.
Normal sensibilitet for berøring samt smerte på UE samt OE.`,
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Neurologisk US – Kort variant 2 (ej undersøgt synsfelt/visus)',
                        templateText: `Kranienerver 2-12 søgt sufficient undersøgt, ingen udfald. Bemærk ej undersøgt synsfelt eller visus.
Der er normal kraft og sensibilitet på OE og UE. Neg. Romberg. Normal FNF-forsøg eller knæ-hæl-forsøg. Normal diadokokinese-us. Normale reflekser (biceps, achilles og patella). Normal stand og gang.`,
                    },
                ],
            },
            {
                id: 'psykisk_risiko',
                title: 'Aktuelt/Objektivt psykisk, Selvmord, Risiko & Medicin',
                pages: 's. 7–8',
                blocks: [
                    {
                        type: 'numbered',
                        title: 'Aktuelt psykisk (15 punkter – brug evt. "ad. XYZ" for overblik)',
                        items: [
                            'Hvad har der tidligere været psykiatrisk med patienten (kort). Hvis ukendt i hospitalsregi: evt. behandling ved egen læge/privat psykiater/psykolog. Hvis ambulant enhed: hvilken, sidst set, problematikker, næste tid.',
                            'Ukendt patient / ukendt i hospitalsregi: Dispositioner (psykiatrisk sygdom + selvmord i familien + traumatiske oplevelser + hovedtraumer eller CNS-infektioner).',
                            'Hvad er der sket forud for indlæggelse/patientens kontakt til psykiatrien?',
                            'Hvornår er det startet?',
                            'Hvor længe har det stået på?',
                            'Hvad oplever pt. nu?',
                            'Søvn den seneste uge/op til aktuelle?',
                            'Er der nogle udløsende stressende faktorer?',
                            'Eventuelle udtalelser fra pårørende.',
                            'Kort opsummering af patientens aktuelle symptomer (flyttes evt. til konklusion/diagnosenotat).',
                            'Selvskade / indtag af medicinoverdosis forud for aktuelle kontakt?',
                            'Adspurgt til medicinsvigt.',
                            'Adspurgt til selvmedicinering / alkohol / stoffer.',
                            'Adspurgt til psykotiske symptomer (stemmehøring, visuelle hallucinationer, berøringsoplevelser, forfølgelsesoplevelser, styringsoplevelser, særlige evner).',
                            'Adspurgt til affektive symptomer (stemningsleje, suicidalitet, tristhed, eleveret stemningsleje mv.).',
                        ],
                    },
                    {
                        type: 'bullets',
                        title: 'Objektivt psykisk – tjekliste',
                        items: [
                            'Er patienten aktuelt forpint, psykotisk, suicidalfarlig eller personfarlig? Påfaldende adfærd under/før/efter samtale.',
                            'Bevidsthed: Orienteringsgrad. Påvirket af stoffer eller alkohol.',
                            'Intellekt: Sygdomserkendelse, indtryk af vidensniveau/kognitivt funktionsniveau.',
                            'Kontakt: Formel/emotionel (god/læderet), garderet, mistroisk, usamarbejdsvillig/samarbejdsvillig, blikkontakt.',
                            'Stemningsleje & affekt: Forsænket/neutralt/eleveret/euforisk/svingende. Grådlabil/affektlabil/inkongruent/inadækvat affekt/affektfladhed, verbal/fysisk aggression, latent vrede/irritabilitet.',
                            'Psykomotorik/Fremtoning/tale: Rolig/omvandrende, mimik (reduceret/normal/øget), rodende/pillende, stemmeføring (lav/normal/høj), latenstid/talepres, påklædning, personlig hygiejne, misère-præget.',
                            'Tankegang og sprog: Samlet/usamlet, klar og logisk vs. vag/springende/afsporet, privat logik, neologismer, tankestop, perseverende tale, formelle tankeforstyrrelser.',
                            'Psykotiske symptomer: Hallucinationer/illusioner, tankeindhold (vrangforestillinger + type, overflødige ideer, obsessioner mv.).',
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Eksempel på Objektivt Psykisk',
                        templateText: `VKO. Fremstår træt. Kognitivt alderssvarende. God formel og emotionel kontakt. Sparsom øjenkontakt. Nedsat stemningsleje. Fint emotionelt medsving. Ej affektpræget. Grådlabil. Sidder stille på stolen. Nedsat mimik og gestik. Lav stemmeføring. Enkelte gange med latenstid. Fremstår med samlet tankegang. Svarer relevant. Fremstår depressiv. Fremstår troværdig når tager afstand til selvmordsplaner. Fremstår ikke produktivt psykotisk.`,
                    },
                    {
                        type: 'bullets',
                        title: 'Selvmordsscreening + handling (jf. standardscreening)',
                        items: [
                            'Selvmordstanker: Spørg ud til lyst til selvmord samt intentioner herom.',
                            'Selvmordsplaner: Hvis ja – hvilke og hvor konkrete er de?',
                            'Tidligere forsøg: Kort beskrivelse (hvis de fremgår af sygdomshistorik, skriv "se sygdomshistorik").',
                            'Beskyttende faktorer: Skal noteres hvis der er angivet ja til et af punkterne i selvmordsscreeningen.',
                            'HUSK: Indgå antisuicidal aftale med pt.! Kan der ikke laves troværdig aftale, skal pt. observeres hyppigt de første timer på afdelingen.',
                            'Risikovurdering: (Ingen øget, øget eller akut øget) + begrundelse. Angiv om det er habituelt (se tidligere epikriser/selvmordsratinger) og om det er aktuelt forværret.',
                            'Handlingsmæssige konsekvenser: Indlæggelse, øget observationsniveau/fokus, udgang, fjernelse af farlige genstande, evt. skærmning til stuen eller konstant overvågning.',
                        ],
                    },
                    {
                        type: 'bullets',
                        title: 'Risikovurdering (vold / farlighed)',
                        items: [
                            'Ud fra samtalen m. pt., erfaringer fra tidligere indlæggelser og Bröset Violence Checklist (BVC) score.',
                            'Spørg om pt. tidligere har begået vold mod andre under indlæggelser. Ved patienter m. dom: undersøg årsagen til dommen.',
                            'Vær særligt opmærksom på psykotiske og maniske patienter (tendens til impulsiv og periodisk handling).',
                            'Angives som: Ingen/lille risiko, moderat øget risiko eller høj risiko.',
                            'Handlemæssige konsekvenser: Skærmning til stuen, aftale med pt. om hvordan aggressive handlinger kan undgås, hyppige tilsyn, skærmning på afstand, evt. bestilling af sikkerhedsvagt.',
                        ],
                    },
                    {
                        type: 'callout',
                        variant: 'warning',
                        title: 'Medicin & FMK-opslag',
                        items: [
                            'Husk at patientens medicin skal godkendes i medicinmodulet, da plejepersonalet ellers ikke må udlevere denne til pt.',
                            'Opslag i FMK: Hvornår er FMK sidst afstemt? Hvilken medicin får patienten, og hvornår er der sidst udskrevet/hentet recepter?',
                            'Adspørg pt. til aktuel medicinsk behandling (også præparater fra FMK/EPJ som pt. ikke nævner – spørg hvorfor).',
                            'Hvis FMK svarer til EPJ og det pt. tager, skrives: "Cont. vanlig medicin, fremgår af EPJ".',
                            'Beroligende kan tillægges jf. "Akut beroligende medicin, fællespsykiatrisk retningslinje".',
                        ],
                    },
                ],
            },
            {
                id: 'ordination_plan',
                title: 'Ordinationer, Udgang, Konklusion, Plan & Forhåndstilkendegivelser',
                pages: 's. 9–10',
                blocks: [
                    {
                        type: 'kvList',
                        title: 'Ordination, psykiatri – Observationsfokus & Observationsfrekvens',
                        items: [
                            {
                                key: 'Observationsfokus',
                                value: 'Fx depressive symptomer, maniske symptomer, psykotiske symptomer, påfaldende adfærd, suicidalitet, selvskadende handlinger, truende/voldelig adfærd, fødeindtag, pludselige ændringer i adfærd m.m.',
                            },
                            {
                                key: 'Fast vagt / kontinuert overvågning',
                                badge: 'OBS: Tvang hvis ufrivilligt i 24+ timer',
                                value: 'Overhængende fare for at suicidere/selvskade. Manisk, råbende og usamarbejdsvillig med behov for skærmning. Personfarlig og skal skærmes.',
                            },
                            {
                                key: 'Hvert 15. minut',
                                value: 'Stor risiko for selvskadende adfærd. Kan ikke indgå aftaler eller fremstår utroværdig. Svært affektpræget og skal falde til ro, eller behov for skærmning til stuen.',
                            },
                            {
                                key: 'Hvert 30. minut',
                                value: 'Affektpræget. Ukendt patient m. øget selvmordsrisiko. Psykotisk m. behov for hyppige observationer og skærmning. Moderat risiko for udadreagerende adfærd.',
                            },
                            {
                                key: 'Standard på nyindlagte',
                                value: 'Typisk 1 gang i timen eller hver 3. time / 3x i vagten. Eksempel på aftrappet plan for suicidal/affektpræget pt. m. aftale: "Den 1. time, hvert 15. minut. Den 2. time hvert 30. minut. Den 3. time og frem 1 gang i timen. Almindeligt tilsyn til natten."',
                            },
                            {
                                key: 'Øvrige ordinationer & Udgang',
                                value: 'Undersøgelser, blodprøver, EKG, U-stix, drug-screening m.m. Udgang: Som udgangspunkt uden udgang frem til gennemgang (pga. indsamling af observationer). I særlige tilfælde (rolige, ikke suicidale/psykotiske/affektprægede) evt. ledsaget udgang.',
                            },
                        ],
                    },
                    {
                        type: 'callout',
                        variant: 'info',
                        title: 'Diagnosenotat',
                        text: 'Anvendes primært under udredning. Kort beskrivelse af diagnostiske overvejelser/symptomer og om der er noget man bør være særligt opmærksom på i den videre behandling/udredning.',
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Konklusion – eksempel',
                        templateText: `52 årig mand kendt med paranoid skizofreni kommer til vurdering med følge af politiet. Har slået en tilfældig forbipasserende mand på gaden.
Psykotiske symptomer tiltaget over 14 dage. Hører kommanderende stemme, der opfordrer til vold. Ser hemmelige agenter omkring sig. Vrangforestilling om at mænd med blåt tøj på overvåger ham og vil skade ham.
Har ikke taget medicin i 4 uger, ønsker ej heller at tage medicin.
Accepterer frivillig indlæggelse. Skal motiveres til indtag af antipsykotisk medicin.
Vurderes aktuelt psykotisk og personfarlig.
Såfremt patienten kræver sig udskrevet er han tvangstilbageholdelig.`,
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Plan – anbefalet struktur',
                        templateText: `Indlægges pt. frivilligt eller på tvang.
Indlægges på sengeafsnit [XX] med henblik på [ro og stabilisering / suicidalitet / voldelig adfærd / skærmning / observation og udredning / søvnstabilisering / affektafklingning].
Eventuelle overvejelser i forhold til indlæggelsens varighed: ...
Medicinsk plan: [Ved medicinsvigt: genopstart/motivation | Ved manglende respons: optimering | Ved ingen behandling: opstart af relevant behandling].
Plan for andet (fx somatisk behandling eller udredning): ...
Revurdering af plan v. gennemgang.
Konfereret m. [Navn på læge].`,
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Forhåndstilkendegivelser (formål: at reducere tvang)',
                        templateText: `Oplever at følgende hjælper v. opkørte situationer, angst, frygt mv.:
- ...
Angiver at følgende kan udløse opkørte situationer eller angst:
- ...
Angiver følgende ønsker til indlæggelsen:
- ...
Informeret om at ovenstående vil forsøges imødekommet så vidt muligt.

Tidligere udsat for tvang: JA / NEJ
Pt. angiver følgende prioritering af evt. tvangsforanstaltninger: ...
Der er talt m. pt. om mindste middels princip.

(Hvis pt. ikke kan samarbejde nu: "Patienten ønsker indlæggelse, er aktuelt svært forpint/i affekt. Kan aktuelt ikke komme med yderligere forhåndstilkendegivelser. Anbefales opdateret ved gennemgang.")`,
                    },
                ],
            },
            {
                id: 'indlaeggelses_kladde',
                title: 'Indlæggelses-kladde (skabelon)',
                pages: 's. 11–13',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'PDF’en indeholder på s. 11–13 en samlet kladde til brug ved indlæggelse i modtagelsen (stamdata, medicin, misbrug/KRAM, sociale forhold, dispositioner, somatisk, aktuelt, psykopatologisk skema, forhåndstilkendegivelser, plan, objektivt psykiatri, organsystemer, somatisk objektivt og neurologisk US).',
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Komplet Indlæggelses-kladde (tekstskabelon)',
                        templateText: `INDLÆGGELSES-KLADDE
Dato:         Navn:         CPR:         Alder:
Kendt(e) diagnose(r):
Henvist fra: Egen læge / Vagtlæge / Skadestue / Ambulant / Kommer med politi
Indlæggelsesmåde: Akut / Elektivt | Frivilligt / Tvangsindlæggelse "Rød"/"Gul" / Dom
Kontaktårsag:

Ukendt psykiatrisk regi / Kendt (afdeling):
Tidligere fulgt ambulant (hvad, hvor, hvornår):
Følges ambulant (hvad, hvor længe):
Tidligere indlagt / Senest indlagt/udskrevet og for hvad:
CAVE:
Forløbsbeskrivelse: Dom / Suicidalitet / Udadreagerende adfærd / Forpinthed el. socialt / Diagnostisk / Uden for forløb

MEDICIN
Medicinsvigt? Siden hvornår:
Præparat & administrationsform | Dosering | Indikation:

MISBRUG / KRAM
Rygning: Ja / Nej / Tidligere / Aldrig | Antal: ___ | Pakkeår: ___
Alkohol: Dagligt / Ugentligt / Festlige lejligheder | Genstande: ___ | Abstinenser: Ja/Nej | Kramper: Ja/Nej
Misbrugsstof (Aktuelt / Tidligere / Sidst anvendt / Type, omfang):

SOCIALE FORHOLD
Civilstatus: Enlig / I forhold / Samboende / Gift / Skilt | Børn (under 18 år):
Kontakt til pårørende / Ensom / Godt netværk
Uddannelse:         Seneste/aktuelle job:
Boligforhold: Klarer sig selv / Hjælp/hjemmepleje / Bostøtte
Forsørgelse: Arbejde / Sygemeldt / Pension / Førtidspension / Kontanthjælp / Intet

DISPOSITIONER & SOMATISK
Familiære somatiske (Cancer, sukkersyge, hjerte, lunge, andet):
Familiære psykiatriske (Selvmord, psykiske lidelser):
Aktuelle somatiske sygdomme:
Tidligere somatiske (Epilepsi, hovedtraumer, CNS-infektioner):

AKTUELT (Hvad er der sket, debut, varighed, noget der hjælper?)
Selvskade/OD:
Selvmordsscreening (tanker, planer, impulsiv, tidl. forsøg, troværdig aftale, beskyttende faktorer, antisuicidal aftale):
- Søvn (normal / varighed / indsovningsbesvær / opvågninger):
- Depression (nedtrykthed / nedsat energi/træthed / nedsat lyst/interesse / nedsat appetit/vægttab / håbløshed):
- Mani (opstemthed / irritabilitet / hyperaktivitet / seksualdrift / nedsat søvnbehov / hæmningsløs adfærd):
- Hallucinationer (høre / syns / føle / lugte/smag):
- Vrangforestillinger (persekutoriske / megalomane / nihilistiske / andre):
- Førsterangssymptomer (tankepåføring/fradrag/hørlighed/udspredning, 3. persons hørehallucination, styringsoplevelse, påvirkningsoplevelse):

FORHÅNDSTILKENDEGIVELSER
Tidligere tvang (opslag, adspurgt): Ja / Nej
Egne erfaringer m. tiltag der hjælper når pt. bliver dårlig eller vred:
Ønsker/forventninger til indlæggelse:

PLAN: Indlægges sengeafsnit _____ i ADA / AFP
Formål m. indlæggelse:
1. Afdæmpning af tilstand / Ro og stabilisering
2. Beskyttelse (Suicidalrisiko / voldelig adfærd)
3. Skærmning (fx fra misbrug og stimuli)
4. Observation og diagnostisk udredning
Medicinsk behandling (Opstart / Genoptagelse / Justering + p.n. medicin + forslag til akut medicinplan):

OBJEKTIVT PSYKIATRI
Orientering (Tid/Sted/Egne data) | Bevidsthedsniveau (Vågen/Klar/Sløv/Somnolent/Komatøs)
Intellekt / Sygdomserkendelse | Stemningsleje | Affekt | Psykomotorik/fremtoning
Kontakt (Formel & Emotionel) | Tankegang og sprog | Psykotiske symptomer

ORGANSYSTEMER, AKTUELT
Generelt / CNS / CP / GI / UG / Bevæg:

SOMATISK, OBJEKTIVT
Overblik (AT/ET/Hud/Respiration) | Øjne | Cavum oris & Fauces | Columna/hals | St.p | St.c | Abdomen | Ekstremiteter

NEUROLOGISK US
Sprog | Gang/stand | Rombergs test | Kranienerver II-XII | Motorisk system | Reflekser | Cerebellart | Ekstrapyramidalt | Sensorisk`,
                    },
                ],
            },
        ],
    },
    {
        id: 'sengeafsnit',
        navId: 'gs_sengeafsnit',
        title: 'Sengeafsnit',
        shortTitle: 'Sengeafsnit',
        pages: 's. 14–29',
        startPage: 14,
        icon: 'Clipboard',
        summary: 'Ugeskema, gennemgang, behandlingsplan, sygdomshistorik, koordinationsplan, epikrise, fokuspatienter, ratings, aktivitetstilbud og sociale indsatser.',
        subSections: [
            {
                id: 'ugeskema',
                title: 'Ugeskema (ALLE & S6/S7/S8/S10)',
                pages: 's. 14',
                blocks: [
                    {
                        type: 'kvList',
                        title: 'Fælles for ALLE afsnit',
                        items: [
                            { key: 'Morgenkonference', value: 'Kl. 08.00' },
                            { key: 'Tirsdag + onsdag + fredag', value: 'Undervisning/rating efter morgenkonferencen' },
                            { key: 'Frokost', value: 'Ca. kl. 12.00' },
                            { key: 'Supervision', value: 'Kl. 12.30 (på nær onsdag)' },
                            { key: 'Onsdag kl. 13.00–15.30', value: 'Lægemøder og undervisning' },
                        ],
                    },
                    {
                        type: 'table',
                        title: 'Afsnitsspecifikke tider',
                        headers: ['Afsnit', 'Forstuegang', 'Behandlingskonference'],
                        rows: [
                            ['S6', 'Ad hoc: kl. 8.15 mandag og torsdag. Kl. 8.45 onsdag.', 'Kl. 9.00–11.00 onsdag'],
                            ['S7', 'Kl. 08.45–9.30 (onsdag dog 09.00–09.45).', 'Med FACT tirsdag kl. 09.30–10.30.'],
                            ['S8', 'Kl. 8.30–9.15 (man, tir, tor), 8.45–9.30 onsdag og 9.00–9.45 fredag.', 'Med FACT torsdag ca. kl. 11 og med RETSPSYK fredag ca. 11.30–11.45.'],
                            ['S10', 'Kl. 09.00–09.30 mandag + onsdag + fredag.', 'Kl. 09.00–10.00 med FACT tirsdag + torsdag.'],
                        ],
                    },
                ],
            },
            {
                id: 'gennemgang',
                title: 'Gennemgang',
                pages: 's. 15',
                blocks: [
                    {
                        type: 'callout',
                        variant: 'info',
                        title: 'Hvornår og hvad er fokus?',
                        items: [
                            'Første hverdag efter indlæggelse (ved indlæggelse fredag laves weekendgennemgang i weekenden, men der skal fortsat laves en reel gennemgang om mandagen).',
                            'Fokus: Opfølgning/uddybelse af væsentlige problemstillinger, iværksættelse af relevant udredning og behandling samt kontakt til eksterne behandlere (fx ved domspatienter).',
                            'Tjek mangler fra indlæggelsen: forløbsbeskrivelse, CAVE, somatisk US, ordinerede blodprøver, EKG eller lignende. Afhængigt af tiden må der selekteres.',
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Journalnotat – Skabelon til Gennemgang',
                        description: 'Punkter markeret med (hvis mangler / ny situation) udfyldes efter behov.',
                        templateText: `Samtale med behandlingssigte: GENNEMGANG
Tilstede: Pt. + Kp XX + Ut.

Forhåndstilkendegivelser (hvis mangler):
Aktuelt psykisk: Gentagelse af historien med nye øjne. Fokus på uddybelse af psykopatologi og problemstilling. Nye problemstillinger/faktorer efter indlæggelsen (søvn, medicin, uro, udgang m.m.).
Objektiv psykisk:
Screening for selvmordsrisiko (hvis mangler eller hvis ny situation – evt. beskyttende faktorer):
Vurdering af trusselsniveau (hvis pt. har scoret højt og der skal tages stilling til plan):
Aktuelt somatisk (hvis mangler eller ny situation):
Objektiv somatisk, neurologisk og funktionsneurologisk (hvis mangler v. indlæggelse eller ny situation):
EKG: Beskriv EKG'et. (HUSK at godkende EKG'et i fx MUSE.)
Vurdering af prøvesvar / Blodprøver (hvis mangler): Beskriv påfaldende prøver + evt. årsag, ellers "upåfaldende blodprøvesvar". (HUSK at godkende blodprøverne.)
Info til pt. om prøvesvar: Givet / ikke givet + plan for givning.
Medicin: (Husk at godkende medicin i medicinmodulet.)
Aktuelt socialt (hvis mangler eller opdatering – OBS vurdering af støttebehov):
Misbrugsoplysninger (hvis mangler):
Udgang: (Patienterne har typisk ingen udgang indtil der er lavet GENNEMGANG.)
Ordinationer: Opdatering af plan for observationsfokus og -hyppighed. Undersøgelser / hvad plejepersonalet skal gøre frem til næste lægesamtale.
Plan:
- Tentativ diagnose
- Fortæl pt. hvad din plan er (inkl. plan for udskrivelse) mhp. at lave en behandlingsplan som godkendes eller afvises af patienten.`,
                    },
                ],
            },
            {
                id: 'behandlingsplan',
                title: 'Behandlingsplan',
                pages: 's. 16–18',
                blocks: [
                    {
                        type: 'links',
                        title: 'E-dok retningslinjer',
                        items: [
                            {
                                label: 'Behandlingsplaner i psykiatrien, fællespsykiatrisk retningslinje',
                                url: 'https://e-dok.rm.dk/edok/Admin/GUI.nsf/Desktop.html?open&openlink=https://e-dok.rm.dk/edok/enduser/portal.nsf/Main.html?open&unid=X11AB16CA953010DFC12575EE004626A5&level=7016PA&dbpath=/edok/editor/7016.nsf/&windowwidth=1100&windowheight=600&windowtitle=S%F8g',
                            },
                            {
                                label: 'PAL i psykiatrien i Region Midtjylland, fællespsykiatrisk instruks',
                                url: 'https://e-dok.rm.dk/edok/Admin/GUI.nsf/Desktop.html?open&openlink=https://e-dok.rm.dk/edok/enduser/portal.nsf/Main.html?open&unid=X4E1268DEDFD0A7EBC12583F5002E271B&level=7016&dbpath=/edok/editor/7016.nsf/&windowwidth=1100&windowheight=600&windowtitle=S%F8g',
                            },
                        ],
                    },
                    {
                        type: 'callout',
                        variant: 'warning',
                        title: 'Tidsfrist & formulering',
                        items: [
                            'Kan påbegyndes ved indlæggelsen. Skal udfyldes/opdateres samt gøres gældende inden for 7 dage efter indlæggelse (eller hvis indlæggelsen forventes > 7 døgn). Opdateres ved væsentlige ændringer.',
                            'Brug let forståeligt sprog og generelle termer.',
                            'Angiv IKKE løfter/lovning på behandling som andre skal garantere/udføre (fx løsning af økonomi/bolig eller skriftlig lovning på kognitiv terapi).',
                        ],
                    },
                    {
                        type: 'epjPath',
                        label: 'Oprettelse i EPJ',
                        path: 'EPJ -> Dokumentation -> Psykiatriske planer (Ingen tidl.: Højreklik og opret ny | Tidl.: Højreklik og opret ny version)',
                    },
                    {
                        type: 'kvList',
                        title: 'Stamfelter i behandlingsplanen',
                        items: [
                            { key: 'Evalueringsdato', value: 'Fx formodet udskrivelse eller 14 dage fra oprettelse.' },
                            { key: 'Afdeling*', value: 'Vælg "AFP Psykiatri Sengeafsnit for Psykoser"' },
                            { key: 'Afsnit', value: 'Vælg dit afsnit, fx "AFP Psykiatri – Sengeafsnit 10"' },
                            { key: 'Patientansvarlig læge (PAL)', value: '(Står ofte tom)' },
                            { key: 'Behandlingsansvarlig læge', value: 'Vælg overlæge på dit sengeafsnit.' },
                            { key: 'Primær læge', value: 'Vælg dig selv eller anden læge i afdelingen som har samtaler med pt.' },
                            { key: 'Primær behandler', value: 'Ofte den primære ambulante behandler.' },
                            { key: 'Stedfortrædende overlæge', value: '(Står ofte tom)' },
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Inspiration til tekst (s. 17–18)',
                        templateText: `Følgende planer foreligger: "Behandlingsplan" / "Møde med XX" / "Medicinsk plan lavet d. x/x"

Psykiatrisk og somatisk diagnose (husk diagnosekoder):
- F25.9 Skizoaffektiv psykose UNS
- DJ449 Kronisk obstruktiv lungesygdom UNS

Aktuelle problemstillinger/symptomer der underbygger diagnoserne:
"Højt aktivitetsniveau, springende tankegang, associerende og usammenhængende. Svarer ikke relevant. Tiltagende impulsiv adfærd. Øget købetrang. Seksualiserende. Nedsat søvnbehov."

Plan for undersøgelser:
"Observation af psykotiske og stemningsmæssige symptomer", "Observation af medicinens virkning og bivirkninger", "Somatisk undersøgelse, blodprøver og EKG", "PSE interview", "Psykometriske tests (HAM-D17, MAS-M, PANSS-6)"

Foreliggende undersøgelsessvar og observationsfund:
"Normale blodprøver og EKG"

Mål – aktuelle og langsigtede (Indlæggelse):
Aktuelle mål:
- At din tilstand stabiliseres
- At der laves plan for videre ambulant opfølgning
- Opstart/optrapning og optimering af medicinsk behandling
- Tilknytning til bostøtte/udskrivningsmentor
- Evt. besøg fra ambulant behandler under indlæggelsen hvis det kan bedre behandlingsalliance

Langsigtede mål:
- Stabilisere den psykiske tilstand mhp. så få symptomer fra din sygdom som muligt
- Videre ambulant arbejde med forebyggelse af recidiv medførende indlæggelse, herunder øget sygdomsindsigt og håndtering af symptomer
- Skabe en hverdag med meningsfyldt indhold afstemt ift. ressourcer og støttebehov
- Lære at fastholde dine relationer/aktiviteter over tid – både personlige og fritids-/arbejdsrelaterede

Observationsplan (kun indlagte patienter):
"Du observeres for psykotiske og maniske symptomer."

Plan for behandling – Medicin (undgå specifikke doser, henvis til aktuel medicinliste):
"Nyligt øget i aripiprazol. Lavet plan for opstart af Olanzapin med optrapning heraf afhængigt af effekt og bivirkninger."

Plan for behandling – Psykoterapeutisk:
"Støttende samtaler med personale, lægesamtale minimum 1x ugentligt."

Plan for behandling – Miljøterapeutisk:
"Fokus på måltider med pt., da dette virker til at bedre indtag." / "Pt. tilbydes samtale og aktiviteter efter psykiske tilstand."

Plan for behandling – Socialt:
"Tilknytning til udskrivningsmentor." / "Du ønsker at flytte til bosted, opfølgning herpå ved socialrådgiver." / "Ved udskrivelse forventes at hjemmehjælp kommer mhp. at sikre medicinering, hvilket du har accepteret."

Plan for behandling – Livsstil:
"Du følges af egen læge mhp. din KOL og forhøjede kolesterol. Forsøger at være aktiv med gåture og fitness. Skal løbende støttes heri." / "Du ønsker hjælp til at stoppe misbrug via misbrugscenter."

Plan for behandling – Andet: Andre planer for behandling, fx ECT.
Forventet varighed: "Uger til måneder"
Samarbejde med pårørende, herunder børn: "Du tilbydes pårørendesamtaler" / "Tidl. haft god gavn af pårørendesamtaler med XX"
Patientens holdning til behandlingsplanen: "Samtykker" / "Udarbejdet mundtligt/skriftligt i samarbejde med patienten som samtykker."
Samarbejde med andre: "Der samarbejdes med personalet på bosted (X)."`,
                    },
                ],
            },
            {
                id: 'sygdomshistorik',
                title: 'Sygdomshistorik',
                pages: 's. 19–20',
                blocks: [
                    {
                        type: 'epjPath',
                        label: 'Oprettelse i EPJ',
                        path: 'EPJ -> Dokumentation -> Sygdomshistorik (Ingen: Højreklik, opret ny -> indsæt standardtekst | Tidl.: Opret ny version)',
                    },
                    {
                        type: 'callout',
                        variant: 'warning',
                        title: 'Regler for Sygdomshistorik',
                        items: [
                            'Alene til anamnestiske oplysninger. Oprettes ved ALLE nye patienter ved første kontakt.',
                            'Opdateres løbende ved modtagelse af nye oplysninger (nyeste version er altid gældende).',
                            'Der SKAL IKKE ændres i rækkefølgen af overskrifter eller i titlerne.',
                        ],
                    },
                    {
                        type: 'kvList',
                        title: 'De 12 obligatoriske overskrifter',
                        items: [
                            { key: '1. Dispositioner', value: 'Familiære dispositioner og arvelige anlæg for sygdomme.' },
                            { key: '2. Social anamnese', value: 'Tidligere sociale situation: familieforhold, opvækstvilkår, bolig-, erhvervs- og økonomiforhold, tidligere kontakter med socialvæsenet fx kommunal støtte.' },
                            { key: '3. Tidligere misbrug', value: 'Patientens tidligere misbrug og misbrugsbehandling.' },
                            { key: '4. Sprog, kultur og religion', value: 'Behov for tolkebistand samt religiøse/kulturelt afledte ønsker til behandlingsforløbet.' },
                            { key: '5. Graviditet, fødsel og udvikling', value: 'Svangerskabsvarighed, fødselsvægt, længde, specielle problemer under svangerskab, perinatale problemer, tidlig motorisk og sproglig udvikling.' },
                            { key: '6. Institutioner og skolegang', value: 'Gennemført skolegang/uddannelse.' },
                            { key: '7. Tidligere somatisk', value: 'Tidligere somatiske lidelser, tidligere indlæggelser og ambulante behandlinger.' },
                            { key: '8. Præmorbid psyke', value: 'Psykisk habitus inden sygdom: humør, selvstændighed/dependens, selvværd, indadvendt/udadvendt, temperament, angst/depressionstendens, sociale relationer, interesser, seksualitet, intelligens, fobier.' },
                            { key: '9. Tidligere psykiatrisk', value: 'Tidligere psykiske lidelser, psykiatriske indlæggelser og ambulante behandlinger, evt. psykisk traume, selvskade.' },
                            { key: '10. Tidligere selvmordsforsøg', value: 'Hvornår, metode, farlighed af forsøget.' },
                            { key: '11. Tidligere psykofarmakologisk behandling', value: '(Udfyldes ved relevant kompleksitet) Præparat, indikation, dosis, tidsinterval, effekt samt årsag til seponering.' },
                            { key: '12. Tidligere tvang', value: 'Har patienten tidligere været underlagt tvangsforanstaltninger?' },
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Eksempel på udfyldt Sygdomshistorik (s. 20)',
                        templateText: `DISPOSITIONER:
Mor & Mormor: Bipolar affektiv sindslidelse.

SOCIAL ANAMNESE:
Ingen søskende. Forældre skilt da pt var 7 år. Vokset op hos moderen, idet faderen frasagde sig al kontakt. Har aldrig haft kontakt m. faderens familie. Moderen arbejdede som folkeskolelærer, havde mange sygemeldinger pga. depressive og maniske episoder.
Pt er aktuelt kandidatstuderende, Græsk litteratur. Har studiejob som fremviser på museum.
Har barn (dreng, 3 år) med samboende kæreste.

TIDLIGERE MISBRUG:
Intet tidligere misbrug

SPROG, KULTUR, RELIGION:
Etnisk dansker. Ikke religiøs

GRAVIDITET, FØDSEL & UDVIKLING:
Ingen information

INSTITUTIONER & SKOLEGANG:
Børnehave, normalt forløb.
Folkeskole 0-10 klasse. Gennemført på normal tid. Klarede sig godt, var især god til sproglige fag. Blev mobbet grundet svær overvægt.
Gymnasium. Gennemført på 3 år. Gode karakterer, få venner.
Bacheloruddannelse i Oldtidslitteratur.

TIDLIGERE SOMATISK:
2014 – kort indlæggelse på afdeling for kvindesygdomme og fødsler grundet fødsel.

PRÆMORBID PSYKE:
Indadvendt pige, har haft episoder med tristhed og manglende overskud op gennem livet. Har aldrig haft mange venner, har dog et par nære veninder fra studiet som hun ses med regelmæssigt. Bruger meget af tiden med kæresten. Intellektuelt over middel.

TIDLIGERE PSYKIATRISK:
- indlæggelse (dato – dato) 25 dage. Frivilligt indlagt på kærestes initiativ 15 dage efter fødsel af barn i svær depressiv tilstand m. psykotiske symptomer (vrangforestilling om at barnet ikke er hendes og det er en anden som har født det). Behandles med SSRI (Sertralin 75 mg) og antipsykotika (Risperidon 4 mg) hvorefter den psykotiske tilstand bedres.
- indlæggelse (dato - nu). Indlægges på røde papirer, er motorisk urolig, talepresset, fremstår mere usamlet og springende tankegang. Der er mistanke om Bipolar Affektiv Sindslidelse grundet tidligere indlæggelse samt dispositioner. Opstartet i behandling m. Lithium og Abilify.

TIDLIGERE SUICIDALFORSØG:
Ingen

TIDLIGERE TVANG:
Ingen`,
                    },
                ],
            },
            {
                id: 'koordinationsplan',
                title: 'Koordinationsplan',
                pages: 's. 21–23',
                blocks: [
                    {
                        type: 'links',
                        title: 'E-dok retningslinje',
                        items: [
                            {
                                label: 'Udskrivningsaftaler og koordinationsplaner, fællespsykiatrisk retningslinje',
                                url: 'https://e-dok.rm.dk/edok/Admin/GUI.nsf/Desktop.html?open&openlink=https://e-dok.rm.dk/edok/enduser/portal.nsf/Main.html?open&unid=X477A9777A00E1602C125764700375BB9&level=701631&dbpath=/edok/editor/7016.nsf/&windowwidth=1100&windowheight=600&windowtitle=S%F8g',
                            },
                        ],
                    },
                    {
                        type: 'callout',
                        variant: 'warning',
                        title: 'Obligatorisk krav & ansvarsfordeling',
                        items: [
                            'OBS: Det er obligatorisk at indgå en udskrivningsaftale eller lave en koordinationsplan, hvis patienten modtager støtte efter servicelovens afsnit V.',
                            'Udarbejdes i samarbejde mellem læge, socialrådgiver og sekretær – men det er ALTID lægen, der har ansvaret for planens samlede og retmæssige indhold.',
                            'Planen udarbejdes løbende under indlæggelsen og sendes i høring når muligt (nås det ikke inden udskrivelse, følges der op så den gøres gældende). Sekretær modtager høringssvar; væsentlige ændringer laves af lægen.',
                        ],
                    },
                    {
                        type: 'colorLegend',
                        title: 'Typisk opgavefordeling (som farvekodet i manualen)',
                        items: [
                            { color: 'red', label: 'Lægen', description: 'Begrundelse for koordinationsplan, fremadrettet behov for støtte, fordeling af opgaver og ansvar, koordinerende kontaktperson, ændring af gyldighedsperiode og supplerende.' },
                            { color: 'green', label: 'Socialrådgiveren', description: 'Bevilligede kommunale indsatser (fx medicinadministration, hjemmepleje, botilbud, bostøtte, kontanthjælp).' },
                            { color: 'blue', label: 'Sekretæren', description: 'Planens indhold (kan deles), modtage høringssvar, samt navne, adresser og telefonnumre på samarbejdspartnere.' },
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Inspirationstekst – "Ikke retslig patient" (s. 21–22)',
                        templateText: `Begrundelse for udarbejdelse af koordinationsplan:
"Ifølge Psykiatrilovens § 13 skal alle borgere, der har været indlagt, og som har eller kunne have behov for en kommunal indsats, have en koordinationsplan."
Planen udarbejdes i henhold til psykiatrilovens kapitel 4a., da ...
- ... patienten modtager støtte efter lov om socialservice afsnit V.
- ... patienten vurderes ikke selv at ville søge den behandling eller de sociale tilbud, der er nødvendige for patientens helbred.
- ... patienten har dom til behandling.

Planens indhold:
"Sikre koordination af de regionale og kommunale indsatser."
"Patienten har behov for medicinsk behandling og ambulant opfølgning i Klinik X mhp. stabilisering og forebyggelse af forværring i den psykiske tilstand."

Patienten har fremadrettet behov for støtte til:
"Opretholde medicinsk behandling under ambulant opfølgning i Klinik X, med henblik på at hindre recidiv af XX."
"Hjælp til at genetablere en hverdag med egen bolig og job."
"Bostøtte i forhold til at skabe struktur i hverdagen."

Patienten er bevilliget følgende kommunale indsatser:
"Der er søgt kontanthjælp og pt. er meldt ledig ved Jobcenteret." (Samt evt. medicinadministration, hjemmepleje, misbrugsbehandling, botilbud, bostøtte, dagtilbud, opsøgende indsats, bofællesskab.)

Fordeling af opgaver og ansvar mellem de involverede parter:
"Primærbehandler sikrer koordination."
"Kommunal sagsbehandler vurderer behovet for socialpsykiatrisk indsats. Besked til ambulant behandler for koordinering af indsatser."
"Bostøtten støtter op om ambulant psykiatrisk behandling."
"Ambulant behandler i Klinik X informerer bostøtte ved udeblivelser."
"Bostøtte kontaktes hvis patienten indlægges igen."
"Sengeafdeling orienterer relevante parter ved indlæggelse mhp. koordinering af udskrivelse."

Aftaler ved forværring:
"Ved tegn på forværring kontaktes Klinik X."
"Såfremt pt. ikke følger aftalte medicinske behandling, fremstår øget psykotisk, afviser aftalt kontakt x gange i træk, ses med vedvarende øget misbrug, etc. – orienteres ambulante behandler/egen læge herom efter xx dage, mhp. vurdering af videre indsats."
"Ved svære akutte symptomer udenfor almindelig arbejdstid ringes til Vagtlægen tlf. 70 11 31 31. Ved behov for støttende samtaler udenfor almindelig arbejdstid kan der ringes til Rådgivningstelefonen, tlf. 78 47 04 70."

Koordinerende kontaktperson, der er ansvarlig for at påse, at planen følges:
"Ambulant behandler i Klinik X" / "(Bostøtte)"`,
                    },
                    {
                        type: 'bullets',
                        title: 'Tillægspunkter ved "Retslig patient" (typisk ifbm. netværksmøde med retspsykiatrien)',
                        items: [
                            '"Oplysninger vedr. dom og kriminalitetsrecidiv"',
                            '"Særlige observationskrav, herunder behov for hjælp til medicin"',
                            '"Patienten skal indlægges i følgende situationer" + klik om "Patienten kan indlægges i henhold til dom"',
                            '"Aftaler vedr. indlæggelse og udskrivelse"',
                            '"Supplerende oplysninger" + klik om "Tilsyn ved Kriminalforsorgen" samt "Bemærkning"',
                        ],
                    },
                ],
            },
            {
                id: 'epikrise',
                title: 'Epikrise / Udskrivningsnotat',
                pages: 's. 24–25',
                blocks: [
                    {
                        type: 'links',
                        title: 'Nyttige links til Epikrise',
                        items: [
                            {
                                label: 'E-dok: Epikrise / Udskrivningsnotat',
                                url: 'https://e-dok.rm.dk/edok/Admin/GUI.nsf/Desktop.html?open&openlink=https://e-dok.rm.dk/edok/enduser/portal.nsf/Main.html?open&unid=X14772C51139AD77DC12575F2002E2486&dbpath=/edok/editor/7016.nsf/&windowwidth=1100&windowheight=600&windowtitle=S%F8g',
                            },
                            {
                                label: 'www.diagnosekoder.dk',
                                url: 'http://www.diagnosekoder.dk/',
                                description: 'Opslag af diagnosekoder',
                            },
                        ],
                    },
                    {
                        type: 'epjPath',
                        label: 'Oprettelse af Afslutningsnotat / Epikrise',
                        path: 'EPJ -> Dokumentation -> Plan og Resultater -> Fælles indlæggelse Skejby -> Udskrivningsnotat -> Opret afslutningsnotat (sendes automatisk til godkendelse hos overlæge)',
                    },
                    {
                        type: 'statusBadges',
                        title: 'Opfølgning hos egen læge (farvemarkering)',
                        items: [
                            {
                                color: 'green',
                                badge: 'Grøn',
                                title: 'Anbefalet opfølgning (patient/netværk kontakter selv)',
                                text: 'Epikriser med anbefaling til egen læge om opfølgning, hvor patienten selv, pårørende eller fx hjemmepleje tager kontakt til lægen. (OBS: En ambulant epikrise kan kun være grøn ved anbefaling om opfølgning.)',
                            },
                            {
                                color: 'amber',
                                badge: 'Gul',
                                title: 'Særligt sårbar – aktiv opfølgning inden for 14 hverdage',
                                text: 'Den udskrivende læge vurderer, at patienten er særligt sårbar og ikke selv (eller via netværk/hjemmepleje) forventes at henvende sig til almen praksis.',
                            },
                            {
                                color: 'red',
                                badge: 'Rød',
                                title: 'Akut opfølgning inden for 1–2 hverdage (RING ALTID)',
                                text: 'Behov for akut opfølgning i almen praksis inden for 1–2 hverdage efter udskrivelse. Ved markering med rød kontaktes egen læge (eller stedfortræder) ALTID telefonisk inden afsendelse af epikrise.',
                            },
                        ],
                    },
                    {
                        type: 'kvList',
                        title: 'Tjekliste ved udfærdigelse af afslutningsnotat',
                        items: [
                            { key: 'Diagnosekoder (F10)', value: 'Tryk F10 og fremsøg ALLE relevante diagnoser på kontakten (tjek evt. Diagnoseoversigt).' },
                            { key: 'Koordinationsplan', value: 'Tjek om der er behov for koordinationsplan, og at denne er lavet.' },
                            { key: 'FMK-afstemning', value: 'Afstem medicinen i FMK INDEN udfærdigelse. Klik "Ajourfør/Gem medicinliste" for automatisk overførsel.' },
                            { key: 'Resumé af behandlingsforløb', value: 'Indlæggelses-/henvisningsårsag, udførte undersøgelser, effekt af behandling, ændringer, compliance, tvang under indlæggelsen samt status på suicidalitet.' },
                            { key: 'Patientinformation og -aftaler', value: 'Info givet til pt./pårørende, inddragelse, social indsats, underretning, kørselsforbud, PAL, bolig, beskæftigelse etc.' },
                            { key: 'Medicinoplysninger', value: 'Ny medicin m. indikation/opfølgning, ændringer/pausering/ophør, dosisdispensering + info til apotek, udleveret medicin (mængde/type), evt. farmaceutisk medicingennemgang.' },
                            { key: 'Forebyggelses- og sundhedsfremmende plan', value: 'Koordinationsplan/Udskrivningsaftale + misbrugsbehandling (husk misbrugsdiagnose) + KRAM.' },
                            { key: 'Ikke-afsluttede undersøgelser & henvisninger', value: 'Væsentlige prøvesvar der afventes og hvornår de eftersendes + sendte henvisninger.' },
                            { key: 'Screening for selvmordsrisiko', value: 'OBS: Overføres IKKE til selve epikrisen! Væsentlige betragtninger ift. suicidalitet SKAL nævnes under "Resumé af behandlingsforløb".' },
                            { key: 'Ved diktat', value: 'Som epikrise: Opret diktat "Epikrise", diktér at afslutningsnotat anvendes som epikrise til egen læge med A- og B-diagnoser. Som henvisning: Opret diktat "Epikrise", diktér at afslutningsnotat anvendes som henvisning til X med A- og B-diagnoser.' },
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Eksempel på Epikrise (s. 25)',
                        templateText: `"Opfølgning hos egen læge": -> Opfølgning. Grøn
Anbefalet kontrol af d-vitamin.
Vurdering af behandling m. Sertralin: Ved forværring af tilstand anbefales optrapning af Sertralin med 2-4 ugers interval stigende til højest 200 mg. Efter 1-1½ års stemningsneutralitet kan behandlingen langsomt seponeres.

Resumé af behandlingsforløb:
31-årig mand ukendt i psykiatrisk regi indlægges frivilligt via psykiatrisk skadestue, grundet depressive symptomer samt presserende selvmordstanker og -planer.
Gennem 3 måneder tiltagende depressive symptomer med manglende interesse for tidligere aktiviteter, reduceret energi og nedtrykthed. Herudover koncentrationsbesvær, selvbebrejdelser, vægttab, nedsat selvtillid, søvnforstyrrelser. I 2 uger op til indlæggelse plaget af tanker om død og selvmord. Anskaffet sig reb og været i skoven for at lede efter sted at hænge sig; informerer pårørende herom som kører ham til psykiatrisk skadestue.
Vurderes svært deprimeret og starter behandling med SSRI. Stemningsneutral uden selvmordstanker efter 5 uger.

Patientinformation og -aftaler:
Pt. er opfordret til at tale med egen læge om henvisning til psykolog.
Opfordret til at søge egen læge eller vagtlæge ved forværring af tilstanden eller selvmordstanker.

Medicinoplysninger:
Mod depression: Tabl. Sertralin 100 mg
Mod D-vitaminmangel: Tabl. D-vitamin 35 mikg

Forebyggelse og sundhedsfremmende plan: ...
Ikke-afsluttede undersøgelser, planlagte undersøgelser samt henvisninger: ...
Screening af selvmordsrisiko: Udført jf. gældende retningslinje.
Etablering af kontakt til pårørende ikke muligt.`,
                    },
                ],
            },
            {
                id: 'fokuspatienter',
                title: 'Fokuspatienter',
                pages: 's. 26',
                blocks: [
                    {
                        type: 'callout',
                        variant: 'info',
                        title: 'Hvad er en fokuspatient?',
                        items: [
                            'Patienter som statistisk er i øget risiko for bæltefiksering de næste 42 timer (identificeres automatisk ud fra sundhedsdata i journalerne).',
                            'OBS: Patienter der har været bæltefikseret 2 gange det seneste år frasorteres af computeren, da afdelingen i forvejen forventes at være opmærksom på risikoen.',
                        ],
                    },
                    {
                        type: 'callout',
                        variant: 'danger',
                        title: 'Hos alle fokuspatienter SKAL ske følgende:',
                        items: [
                            'Handlingsplan med mestringsstrategier (inden for 1 døgn)',
                            'Akut medicinplan (inden for 1 døgn på hverdage – gøres ikke i weekend og helligdage)',
                            'Behandlingsplan (inden for 3 dage)',
                        ],
                    },
                    {
                        type: 'bullets',
                        title: 'Forslag til interventioner',
                        items: [
                            'Beroligende aktiviteter: Samtale, kugledyne/kædedyne, NADA, Ballstick, tættere skærmning af personalet.',
                            'Fysiske aktiviteter: Aktivitet ved fysio-/ergoterapeut, træning i fitnesscenter, yoga/mild bevægelse på stuen eller i multihal, bordtennis/bordfodbold, gåtur/løbetur.',
                            'Andre tiltag: Ændring i udgangsordination, medicin og p.n.-ordinationer, tilknytte kendt/erfarent personale, fællesdokumentation.',
                        ],
                    },
                ],
            },
            {
                id: 'ratings',
                title: 'Ratings (Værktøjskassen)',
                pages: 's. 26',
                blocks: [
                    {
                        type: 'links',
                        title: 'Flowchart til PANSS-6 i E-dok',
                        items: [
                            {
                                label: 'Farmakologisk behandling af voksne med skizofreni, fællespsykiatrisk retningslinje',
                                url: 'https://e-dok.rm.dk/edok/Admin/GUI.nsf/Desktop.html?open&openlink=https://e-dok.rm.dk/edok/enduser/portal.nsf/Main.html?open&unid=XFD0F5FCE9771C7C0C125779700474012&level=7016PA&dbpath=/edok/editor/7016.nsf/&windowwidth=1100&windowheight=600&windowtitle=S%F8g',
                            },
                        ],
                    },
                    {
                        type: 'table',
                        title: 'Oversigt over psykometriske ratings',
                        headers: ['Rating', 'Målgruppe / Formål', 'Hvem udfører'],
                        rows: [
                            ['Hamilton D6', 'Monitorering af depression – Selvrating', 'Patienten'],
                            ['Hamilton D17', 'Monitorering af depression', 'Typisk kontaktperson. Ellers læge, stud.med. m.fl.'],
                            ['MAS-M', 'Mani', 'Typisk kontaktperson'],
                            ['Bröset violence score', 'Vurdere farlighed', 'Typisk kontaktperson. Ellers læge, stud.med. m.fl.'],
                            ['PANSS-6', 'Monitorering af skizofreni (Flowchart findes i E-dok)', 'Typisk kontaktperson. Ellers læge, stud.med. m.fl.'],
                            ['CDSS (Calgary Depression Scale for Schizophrenia)', 'Vurderer depression ved skizofreni – adskiller depressive symptomer fra positive, negative og ekstrapyramidale symptomer.', 'Typisk kontaktperson. Ellers læge, stud.med. m.fl.'],
                            ['ASAQ (Aarhus Side effect Assessment Questionnaire)', 'Screening af bivirkninger (laves af patienten selv og vurderes derefter af lægen)', 'Patienten'],
                            ['Abstinensscore', 'Vurderer abstinenser (alkohol)', 'Typisk kontaktperson. Ellers læge, stud.med. m.fl.'],
                            ['COWS', 'Vurderer abstinenser (misbrug)', 'Typisk kontaktperson. Ellers læge, stud.med. m.fl.'],
                            ['MMSE', 'Kognitiv test (obs. demens)', 'Typisk kontaktperson. Ellers læge, stud.med. m.fl.'],
                            ['ADRS', 'ADHD (laves af patienten selv og vurderes derefter af lægen)', 'Patienten'],
                        ],
                    },
                ],
            },
            {
                id: 'aktivitetstilbud',
                title: 'Aktivitets- og behandlingstilbud',
                pages: 's. 27',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Dette er plejepersonalets/kontaktpersonens opgave(r). Nogle patienter har meget gavn af disse miljøterapeutiske tiltag – hvorfor der ved gennemgang/stuegang kan spørges ind til dette.',
                    },
                    {
                        type: 'table',
                        title: 'Miljøterapeutiske tilbud',
                        headers: ['Tilbud', 'Formål'],
                        rows: [
                            ['NADA (akupunktur)', 'Beroligende'],
                            ['Lysterapi', 'Optimere virkning af medicinsk behandling'],
                            ['Varmeterapi', 'Dæmpe uro, angst, tankemylder. Løsne muskelspændinger.'],
                            ['Gågruppe', 'Frisk luft, løfte stemning, opnå velvære'],
                            ['KRAM', 'Forbedre kost- og motionsvaner. Rådgivning ift. rygning og alkohol. Forebygge livsstilssygdomme.'],
                            ['Læsegruppe', 'Positiv oplevelse og socialt samvær'],
                            ['Cirkeltræning', 'Bedre form. Opleve glæde og velvære ved kroppen + socialt samvær med medpatienter.'],
                            ['Afspænding', 'Dæmpe muskulære spændinger + slappe af i kroppen. Dæmpe uro. Afgrænse kroppen og øge kropskontakten.'],
                            ['Det åbne kreative rum', 'Bruge positive ressourcer og yde selvhjælp. Øge socialt samvær. Tid hvor der ikke snakkes sygdom og medicin.'],
                            ['Bibliotek', 'Mulighed for at låne bøger.'],
                            ['Musikaften', 'Øge socialt velvære'],
                            ['Filmaften', 'Hygge og socialt samvær'],
                            ['Fredagskaffe', 'Hygge og socialt samvær. God afslutning på ugen.'],
                            ['PEER-guides', 'Give håb, inspiration og støtte'],
                            ['Psykoedukation', 'Blive bedre til at tage hånd om egen mentale sundhed og mestre egne psykiske vanskeligheder.'],
                        ],
                    },
                    {
                        type: 'table',
                        title: 'Fysioterapeutiske tilbud',
                        headers: ['Tilbud', 'Formål'],
                        rows: [
                            ['Mild bevægelse', 'Afhjælpe nakke- og skulderspændinger. Lindre smerter fx hovedpine. Bevæge og mærke kroppen positivt.'],
                            ['Afspænding', 'Dæmpe muskulære spændinger + slappe af i kroppen. Dæmpe uro. Afgrænse kroppen og øge kropskontakten.'],
                            ['Motionscenter', 'Øge muskelstyrke og udholdenhed. Komme i form. Opleve glæde og velvære ved at bruge kroppen.'],
                        ],
                    },
                ],
            },
            {
                id: 'sociale_indsatser',
                title: 'Sociale indsatser (Bosteder, Bofællesskaber m.m.)',
                pages: 's. 28–29',
                blocks: [
                    {
                        type: 'socialDirectory',
                        title: 'Oversigt over bosteder, bofællesskaber og sociale tilbud',
                        intro: 'Nedenstående er til orientering, da du vil opleve flere af navnene nævnt. Samtale med patienterne herom er ikke typisk arbejde for læger eller medicinstuderende.',
                        categories: [
                            {
                                name: 'Bosteder',
                                items: [
                                    {
                                        name: 'Haslekollegiet ungetilbud',
                                        target: '18-35 årige med svære psykiske og sociale problemer. Specielt til de som er klar til at bo i socialt og praktisk forpligtende fællesskab. Typisk 2-3 år.',
                                        afsnit: 'S8',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/botilbud-og-bofaellesskaber/botilbud/haslekollegiet-ungetilbud/',
                                    },
                                    {
                                        name: 'Holmstrupgård',
                                        target: 'Institution for unge 15-23 år. Med sociale, psykiske problemer samt spiseforstyrrelser.',
                                        afsnit: '',
                                        linkLabel: 'holmstrupgaard.rm.dk',
                                        linkUrl: 'https://www.holmstrupgaard.rm.dk/',
                                    },
                                    {
                                        name: 'Kragelund',
                                        target: '18-65 årige med svære psykiske og sociale udfordringer. Inkl. rusmiddelproblematik.',
                                        afsnit: 'S7',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/botilbud-og-bofaellesskaber/botilbud/kragelund-botilbud/',
                                    },
                                    {
                                        name: 'Nygårdsvej',
                                        target: 'Socialpsykiatrisk tilbud med socialpædagogisk støtte til voksne over 18 år som er særligt socialt udsatte med komplekse problemstillinger.',
                                        afsnit: '',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/job/botilbuddet-nygaardsvej/',
                                    },
                                    {
                                        name: 'Projekt Havnen',
                                        target: 'Helhedsorienteret støtte og udviklingsindsats til unge hjemløse, 18-29 år (Housing First-tilgang).',
                                        afsnit: '',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/forsorgshjem/projekt-havnen/',
                                    },
                                    {
                                        name: 'Sletten',
                                        target: 'Socialpsykiatrisk tilbud med socialpædagogisk støtte til voksne over 18 år med komplekse problemstillinger og dobbeltdiagnose.',
                                        afsnit: 'S10',
                                        linkLabel: 'Hasselager Bofællesskab',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/handicap/voksne-med-handicap/botilbud-og-bofaellesskaber/udviklingshaemning/bofaellesskaber-uden-doegndaekning/hasselager-bofaellesskab/',
                                    },
                                    {
                                        name: 'Snåstrup Vestergaard',
                                        target: 'Bo- og aktivitetstilbud til voksne med udviklingshæmning og evt. udviklingsforstyrrelser samt dom til ophold i boform.',
                                        afsnit: 'S8',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/handicap/voksne-med-handicap/botilbud-og-bofaellesskaber/udviklingsforstyrrelser/snaastrup-vestergaard-boform/',
                                    },
                                    {
                                        name: 'Tuesten Huse',
                                        target: '18-65 årige med svære psykiske og sociale problemer. Midlertidigt ophold uden konkret tidsramme.',
                                        afsnit: 'S8',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/botilbud-og-bofaellesskaber/botilbud/tuesten-huse/',
                                    },
                                    {
                                        name: 'Windsor',
                                        target: '18-65 årige med svære psykiske og sociale problemer. Særligt tilbud til spiseforstyrrelser.',
                                        afsnit: 'S7',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/botilbud-og-bofaellesskaber/botilbud/windsor/',
                                    },
                                ],
                            },
                            {
                                name: 'Bofællesskaber',
                                items: [
                                    {
                                        name: 'Grøfthøjen',
                                        target: '18-65 år med psykiske og sociale problemer som kan bo i egen bolig med lejekontrakt og bostøtte. Rehabiliteringsforløb med individuel handleplan.',
                                        afsnit: 'S7',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/botilbud-og-bofaellesskaber/bofaellesskaber/groefthoej/',
                                    },
                                    {
                                        name: 'Kilden, Søhuset, Mose-Bækken, Klyngehusene',
                                        target: 'For 18+ år, som er fysisk nedslidt og har store sociale problemer og misbrug.',
                                        afsnit: '',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/botilbud-og-bofaellesskaber/botilbud/kilden-soehuset-mosen-og-baekken/',
                                    },
                                    {
                                        name: 'Korsagergården',
                                        target: '18-65 årige med psykiske og sociale problemer evt. med behov for længere ophold i omsorgsbetonet og socialt støttende tilbud.',
                                        afsnit: 'S10',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/botilbud-og-bofaellesskaber/botilbud/korsagergaarden/',
                                    },
                                    {
                                        name: 'Lindely',
                                        target: '18-65 år med psykiske og sociale problemer som kan bo i egen bolig med lejekontrakt og bostøtte.',
                                        afsnit: 'S8',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/botilbud-og-bofaellesskaber/bofaellesskaber/',
                                    },
                                    {
                                        name: 'Provstebakken',
                                        target: '18-65 årige med svære psykiske og sociale problemer med særligt behov for oftere og tættere kontakt. Støtte til fysiske og sundhedsmæssige problemer.',
                                        afsnit: 'S8',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/botilbud-og-bofaellesskaber/botilbud/provstebakken/',
                                    },
                                    {
                                        name: 'Skejbyhave',
                                        target: 'Bofællesskab uden døgndækning til voksne med udviklingshæmning, der har brug for pædagogisk støtte i hverdagen.',
                                        afsnit: 'S10',
                                        linkLabel: 'Skejbyparken (aarhus.dk)',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/handicap/voksne-med-handicap/botilbud-og-bofaellesskaber/udviklingshaemning/bofaellesskaber-uden-doegndaekning/skejbyparken/',
                                    },
                                    {
                                        name: 'Søndervangen',
                                        target: 'Over 18 år med psykiske og sociale problemer som har brug for længerevarende bostøtte.',
                                        afsnit: 'S10',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/botilbud-og-bofaellesskaber/bofaellesskaber/soendervangen/',
                                    },
                                    {
                                        name: 'Tilst Søndervej',
                                        target: 'Over 18 år med psykiske og sociale problemer som har brug for længerevarende støtte.',
                                        afsnit: 'S7',
                                        linkLabel: '',
                                        linkUrl: '',
                                    },
                                ],
                            },
                            {
                                name: 'Plejehjem og ældreboliger',
                                items: [
                                    {
                                        name: 'Vejlbygade',
                                        target: 'Plejehjem',
                                        afsnit: 'S7',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://plejehjem.aarhus.dk/vaelg-plejehjem/8240-risskov/vejlbygade/',
                                    },
                                    {
                                        name: 'Hestehavevej',
                                        target: 'Plejehjem',
                                        afsnit: 'S7',
                                        linkLabel: 'Hestehavehusene',
                                        linkUrl: 'https://plejehjem.aarhus.dk/vaelg-plejehjem/8270-hoejbjerg/hestehavehusene/',
                                    },
                                    {
                                        name: 'Carl Blochsgade',
                                        target: 'Plejehjem',
                                        afsnit: 'S10',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://plejehjem.aarhus.dk/vaelg-plejehjem/8000-aarhus-c/carl-blochs-gade/',
                                    },
                                    {
                                        name: 'Skovvang',
                                        target: 'Plejehjem – demens',
                                        afsnit: '(S10)',
                                        linkLabel: 'Demens, Aarhus Kommune',
                                        linkUrl: 'https://demens.aarhus.dk/',
                                    },
                                    {
                                        name: 'Vikærgården',
                                        target: 'Aflastning – genoptræning',
                                        afsnit: '',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/sundhed-og-sygdom/traening-og-rehabilitering/vikaergaarden/',
                                    },
                                ],
                            },
                            {
                                name: 'Forsorgshjem / Krisecenter',
                                items: [
                                    {
                                        name: 'Egåhus',
                                        target: 'Akut og midlertidigt ophold for 18-30-årige hjemløse m. sociale problemer. Housing First koncept.',
                                        afsnit: 'Privat',
                                        linkLabel: 'Blå Kors',
                                        linkUrl: 'https://www.blaakors.dk/vores-arbejde/misbrugsbehandling-og-botilbud/blaa-kors-egaahus',
                                    },
                                    {
                                        name: 'Ellengaarden',
                                        target: 'Midlertidigt ophold til kvinder med børn under 18 år samt til enlige kvinder uden hjemmeboende børn med særlige sociale problemer.',
                                        afsnit: 'Kommunalt',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/kriseramte-familier/ellengaarden/',
                                    },
                                    {
                                        name: 'Tre ege',
                                        target: 'Akut og midlertidigt ophold for 18+ årige som er hjemløse og har sociale problemer.',
                                        afsnit: 'Kirkens Korshær',
                                        linkLabel: 'kirkenskorshaer.dk',
                                        linkUrl: 'https://kirkenskorshaer.dk/aarhus/saadan-hjaelper-vi/tre-ege',
                                    },
                                    {
                                        name: 'Østervang',
                                        target: 'Akut og midlertidigt ophold for 18+ årige som er hjemløse og har sociale problemer.',
                                        afsnit: 'Kommunalt',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/personlig-hjaelp-og-stoette/psykisk-sygdom-og-saarbarhed/voksne-med-psykisk-sygdom-eller-saarbarhed-og-hjemloese/forsorgshjem/forsorgshjemmet-ostervang/',
                                    },
                                ],
                            },
                            {
                                name: 'Misbrugsbehandling',
                                items: [
                                    {
                                        name: 'Halvvejshuset',
                                        target: 'Midlertidigt botilbud til 18-67 årige med sociale problemer og behov for støtte til ny livssituation eller forblive stof-/alkoholfri (typisk ½-2 år).',
                                        afsnit: '',
                                        linkLabel: 'aarhus.dk',
                                        linkUrl: 'https://www.aarhus.dk/borger/sundhed-og-sygdom/stofbehandling/hold-fast-i-et-liv-uden-stoffer/halvvejshuset/',
                                    },
                                    {
                                        name: 'Gratis stofbehandling (Aarhus)',
                                        target: 'Gratis. Ved opioider (morfin, heroin, metadon el.lign.): Sumatravej 3. Ved hash, kokain, ecstasy/MDMA el.lign.: Jægergårdsgade 66.',
                                        afsnit: '',
                                        linkLabel: 'Stofbehandling Aarhus / AUH dagtilbud',
                                        linkUrl: 'https://www.aarhus.dk/borger/sundhed-og-sygdom/stofbehandling/',
                                        secondaryLinkLabel: 'AUH Socialsygeplejerskerne',
                                        secondaryLinkUrl: 'https://www.auh.dk/afdelinger/akutafdelingen/til-fagfolk/socialsygeplejerskerne/tilbud-uden-for-auh/tilbud---om-dagen/misbrug/',
                                    },
                                ],
                            },
                            {
                                name: 'Private, uden kommunale eller regionale tilbud',
                                items: [
                                    {
                                        name: 'Enghaven',
                                        target: 'Botilbud med flere enheder. Fysisk og psykisk handicap.',
                                        afsnit: 'Privat',
                                        linkLabel: 'ok-fonden.dk',
                                        linkUrl: 'https://ok-fonden.dk/enghaven/',
                                    },
                                    {
                                        name: 'Kofoedsminde',
                                        target: 'Landsdækkende specialinstitution for domsanbragte udviklingshæmmede.',
                                        afsnit: 'Region Sjælland',
                                        linkLabel: 'kofoedsminde.dk',
                                        linkUrl: 'https://kofoedsminde.dk/',
                                    },
                                    {
                                        name: 'Gårdhaven',
                                        target: 'Socialpsykiatrisk plejehjem for psykisk syge borgere med fysisk plejebehov, herunder demente og udadreagerende borgere.',
                                        afsnit: 'Region Midt',
                                        linkLabel: 'svo.rm.dk',
                                        linkUrl: 'https://www.svo.rm.dk/botilbud/pilebakken/',
                                    },
                                    {
                                        name: 'Pilebakken',
                                        target: 'Socialpsykiatrisk plejehjem for psykisk syge borgere med fysisk plejebehov, herunder demente og udadreagerende borgere.',
                                        afsnit: 'Region Midt',
                                        linkLabel: 'svo.rm.dk',
                                        linkUrl: 'https://www.svo.rm.dk/botilbud/pilebakken/',
                                    },
                                    {
                                        name: 'Sønderparken',
                                        target: '18-65 årige med svære psykiske og sociale problemer + særlig indsats for spiseforstyrrede.',
                                        afsnit: 'Region Midt',
                                        linkLabel: 'svo.rm.dk',
                                        linkUrl: 'https://www.svo.rm.dk/botilbud/sonderparken/',
                                    },
                                    {
                                        name: 'Tangkær',
                                        target: '18-65 årige med svære psykiske og sociale problemer.',
                                        afsnit: 'Region Midt',
                                        linkLabel: 'svo.rm.dk',
                                        linkUrl: 'https://www.svo.rm.dk/botilbud/tangkar---socialpsykiatri/',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'tvang',
        navId: 'gs_tvang',
        title: 'Tvang (Skema 1–3)',
        shortTitle: 'Tvang (Skema 1–3)',
        pages: 's. 30–40',
        startPage: 30,
        icon: 'ShieldAlert',
        summary: 'Skema 1 (frihedsberøvelse, revurdering, tvangstilbageførsel), Skema 2 (tvangsbehandling + somatisk tvang), Skema 3 (beroligende, fastholdelse, bælte/remme) og bæltetilsyn.',
        subSections: [
            {
                id: 'tvang_info',
                title: 'Info, lovgivning & oprettelse i EPJ',
                pages: 's. 30',
                blocks: [
                    {
                        type: 'links',
                        title: 'Lovgivning & værktøjskasse',
                        items: [
                            {
                                label: 'Værktøjskassen AFP ("Vagtfunktion" -> "Jurahjørnet" -> "Links til relevant lovgivning")',
                                url: 'https://www.fagperson.psykiatrien.rm.dk/ansatte/informationer-fra-afdelingerne/afdeling-for-psykoser/varktojskasse/',
                            },
                            {
                                label: 'Psykiatriloven (retsinformation.dk)',
                                url: 'https://www.retsinformation.dk/eli/lta/2022/185',
                            },
                        ],
                    },
                    {
                        type: 'callout',
                        variant: 'danger',
                        title: 'OBS: Gyldighed & tidspunkt',
                        items: [
                            'Psykiatriloven gælder KUN for personer indlagt på psykiatrisk afdeling.',
                            'Ved oprettelse af tvangsskema i EPJ – indsæt ALTID det korrekte tidspunkt!',
                        ],
                    },
                    {
                        type: 'epjPath',
                        label: 'Oprettelse af Tvangsskema i EPJ',
                        path: 'Plan og resultater -> højreklik -> Indsæt Standardplan (eller Ctrl + O) -> søg "skema" -> vælg relevant skema (fx Skema 3 – Akut Beroligende)',
                    },
                ],
            },
            {
                id: 'skema1',
                title: 'Skema 1 – Frihedsberøvelse (§5–10a)',
                pages: 's. 30–33',
                blocks: [
                    {
                        type: 'kvList',
                        title: 'Udfærdigelse af Skema 1 (s. 30)',
                        items: [
                            { key: 'Frihedsberøvelse startet som', value: 'Klik om det er "Tvangsindlæggelse" eller "Tvangstilbageholdelse".' },
                            { key: 'Begrundelse i henhold til §5', value: 'Klik om det er "Af helbredsmæssige grunde" (gule papirer) eller "På grund af farlighed" (røde papirer).' },
                            { key: 'Uddybende begrundelse', value: '1) Indskriv de overlægegodkendte tvangspapirer. 2) Tilføj evt. kort hvordan patienten ses ved ankomst (overensstemmelse med tvangspapirer). 3) Sikre at det lovmæssige ift. psykiatrilovens §5 er beskrevet.' },
                            { key: 'Dato & Ansvarlig overlæge', value: 'Indsæt tidspunkt for godkendelse af tvangspapirerne samt den godkendende overlæge.' },
                            { key: 'Mundtligt og skriftligt orienteret', value: 'Klik i dette felt (OBS: husk at udfærdige fysiske papirer i afdelingen til patienten).' },
                        ],
                    },
                    {
                        type: 'callout',
                        variant: 'warning',
                        title: 'Tvangsindlæggelse (§5–9) – Lovtekst',
                        items: [
                            'Behandling (Gule papirer): "Sindssyg eller befinder sig i en tilstand, der ganske må ligestilles hermed, og det vil være uforsvarligt ikke at frihedsberøve den pågældende med henblik på behandling, fordi udsigten til helbredelse eller en betydelig og afgørende bedring af tilstanden ellers vil blive væsentligt forringet."',
                            'Fare (Røde papirer): "Sindssyg eller befinder sig i en tilstand, der ganske må ligestilles hermed, og det vil være uforsvarligt ikke at frihedsberøve den pågældende med henblik på behandling, fordi den pågældende frembyder en nærliggende og væsentlig fare for sig selv eller andre."',
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Tvangsindlæggelse – Inspiration til tekst (Gule & Røde papirer)',
                        templateText: `BEHANDLING (Gule papirer):
Pt. nægter at blive indlagt og kan ikke motiveres for frivillig indlæggelse.
Pt. vurderes at være sindssyg, og det vil være uforsvarligt ikke at frihedsberøve pt. med henblik på behandling, da udsigten til afgørende bedring af tilstanden vil være væsentligt forringet, hvis pt. ikke bliver indlagt. Der er et klart behandlingsbehov, som ikke kan klares ambulant for nuværende. Det vurderes, at pt. i nuværende tilstand ikke vil kunne tage imod relevant behandling i ambulant regi.
Pt. er underrettet om den iværksatte tvang, om baggrunden for tvangsindlæggelsen, om formålet hermed, samt vejledt om udsigterne til en bedring af helbredstilstanden.

FARE (Røde papirer):
Pt. nægter at blive indlagt og kan ikke motiveres for frivillig indlæggelse.
Pt. vurderes at være sindssyg, og det vil være uforsvarligt ikke at frihedsberøve pt., da pt. er til væsentlig og nærliggende fare for ...`,
                    },
                    {
                        type: 'callout',
                        variant: 'danger',
                        title: 'Tvangstilbageholdelse (§5+10) – Tidsfrister',
                        items: [
                            'Forlanger en patient sig udskrevet skal overlægen snarest og senest inden for 24 timer meddele patienten, om denne kan udskrives eller skal tvangstilbageholdes.',
                            'OBS: Forlanger en patient sig udskrevet inden for 24 timer efter tvangsindlæggelse, skal overlægens beslutning meddeles senest inden 48 timer fra tvangsindlæggelsens start.',
                            'Er pt. tvangsindlagt uden at have forlangt sig udskrevet, bør holdningen til indlæggelsen vurderes ved 1. revurdering. Hvis pt. også skal tvangstilbageholdes: opret notat under aktuelle Skema 1 og klik "Tvangstilbageholdelse af frihedsberøvet patient".',
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Tvangstilbageholdelse – Inspiration til tekst (Gule & Røde papirer)',
                        templateText: `BEHANDLING (Gule papirer):
Pt. kræver sig udskrevet og kan ikke motiveres for frivillig indlæggelse.
Pt. vurderes at være sindssyg, og det vil være uforsvarligt ikke at frihedsberøve pt. med henblik på behandling, da udsigten til afgørende bedring af tilstanden vil være væsentligt forringet, hvis pt. ikke er indlagt. Der er et klart behandlingsbehov, som ikke kan klares ambulant for nuværende. Det vurderes, at pt. i nuværende tilstand ikke vil kunne tage imod relevant behandling i ambulant regi.
Pt. er underrettet om den iværksatte tvang, om baggrunden for tvangstilbageholdelsen, om formålet hermed, samt vejledt om udsigterne til en bedring af helbredstilstanden.

FARE (Røde papirer):
Pt. kræver sig udskrevet og kan ikke motiveres for frivillig indlæggelse.
Pt. vurderes at være sindssyg, og det vil være uforsvarligt ikke at frihedsberøve pt., da pt. er til væsentlig og nærliggende fare for ...`,
                    },
                    {
                        type: 'bullets',
                        title: 'Revurdering & Tvangstilbageførsel (§10a)',
                        items: [
                            'Revurdering af frihedsberøvelse skal ske på dag 3, dag 10, dag 20, dag 30 og herefter mindst hver 4. uge så længe frihedsberøvelsen opretholdes.',
                            'Vurder om betingelserne fortsat er opfyldt, og om det er på behandlings- eller fareindikation (indikationen kan ændre sig undervejs). Fokusér på sygdomsindsigt, behandlingsalliance og klart behandlingsbehov der ikke kan klares ambulant. Journalføres i Skema 1 under "Efterprøvelse".',
                            'Forlanger en tvangstilbageholdt pt. sig udskrevet på andre dage end revurderingerne, skal overlægen tage stilling inden for 24 timer.',
                            'Tvangstilbageførsel (§10a): Hvis en tvangsindlagt/tvangstilbageholdt pt. forlader afdelingen og ikke vender tilbage, kan overlægen beslutte tilbageførsel med politiets bistand. Skal ske inden for 1 uge efter udeblivelsen er konstateret. Ved udeblivelse efter udgang må der ikke være givet tilladelse til udgang med mere end 3 overnatninger.',
                        ],
                    },
                ],
            },
            {
                id: 'skema2_medicin',
                title: 'Skema 2 – Tvangsbehandling (§12–13)',
                pages: 's. 34–35',
                blocks: [
                    {
                        type: 'callout',
                        variant: 'info',
                        title: 'Betingelser & 3 dages motivationsfase',
                        items: [
                            'Tvangsbehandling må kun anvendes over for personer, der opfylder betingelserne for tvangstilbageholdelse jf. §10.',
                            'Afgørelse træffes af overlægen (inkl. omfang af fornøden magtanvendelse).',
                            'Betænkningstid på højst 3 dage: I praksis laves 3 dages motivationsfase (lægen har dag 1; andet personale eller lægen kan motivere på dag 2 og 3).',
                            'Herefter (dag 4) iværksættes tvangsbehandlingen, medmindre patienten klager – så udsættes tvangsbehandlingen med opsættende virkning indtil afgørelse i Patientklagenævnet.',
                        ],
                    },
                    {
                        type: 'kvList',
                        title: 'Udfærdigelse af motivationsfase',
                        items: [
                            { key: 'Begrundelse for medicinering', value: 'Grundig beskrivelse af pt., psykisk sygdom, adfærd, objektivt psykisk, psykotisk grad, evt. medicinsvigt/tidligere effekt på funktionsniveau, hvad der er forsøgt og hvad pt. har kunnet/ikke kunnet samarbejde om.' },
                            { key: 'Motivationsperiode', value: 'Klik den relevante dag – ved opstart "Dag 1".' },
                            { key: 'Motivation af patient', value: 'Patienten motiveres til præp. X initielt dosis X pr. døgn stigende afhængigt af effekt og bivirkninger til dosis X pr. døgn. Alternativt præp. X i X dosis. (OBS: særlige forhold for præparatet).' },
                            { key: 'Præparat og dosis (tilbudt + i.m. alternativ)', value: 'Angiv for både tilbudte præparat og dets i.m.-alternativ: Præparat, Form, Initialdosis, Vedligeholdelsesdosis, Dosisinterval.' },
                            { key: 'Patientens holdning', value: 'Skriv patientens holdning – fx årsagen til at patienten nægter medicinen.' },
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Information til patienten – Inspiration til tekst (s. 35)',
                        templateText: `Patienten er informeret om, at vi opstarter motivationsfase d.d. samt at vi hver dag de kommende 3 dage vil komme og tilbyde patienten xx mg xx til frivilligt indtag.
Patienten er informeret om, at hvis der efter de 3 dages motivationsfase ikke har været samarbejde om frivilligt indtag af medicinen, da påtænkes at opstarte medicinering på tvang enten xx mg xx tablet eller alternativt xx mg xx som injektion.

Patienten er informeret om behandlingens formål, virkning og mulige bivirkninger ved følgende præparater: XX.
(Beskriv evt. den forventede virkning samt hyppigste bivirkninger samt at patienten har fået udleveret et udprint fra pro.medicin.dk om præparatet.)

Patienten er informeret om risikoen ved ikke at modtage behandlingen.
Patienten er informeret om dennes ret til at klage samt orienteret om adgang til at klage over beslutningen til Det Psykiatriske Patientklagenævn.
Patienten er tilbudt mulighed for at drøfte beslutningen om tvangsbehandling ved patientrådgiver.`,
                    },
                ],
            },
            {
                id: 'skema2_somatisk',
                title: 'Skema 2 – Somatisk tvangsbehandling (§13)',
                pages: 's. 36',
                blocks: [
                    {
                        type: 'callout',
                        variant: 'danger',
                        title: 'Krav ved somatisk tvangsbehandling',
                        items: [
                            'Udføres ved somatisk tilstand med væsentlig fare for liv eller helbred, hvor patienten afviser behandling.',
                            'Beslutningen skal godkendes af psykiatrisk overlæge OG somatisk overlæge.',
                            'Somatisk tvangsbehandling kræver IKKE motivationsfase.',
                            'OBS: Hvis patienten skal modtage behandling i somatikken, skal der laves Skema 1 (tvangstilbageholdelse) på patienten (dobbeltindlæggelse, da Psykiatriloven kun gælder i Psykiatrien).',
                        ],
                    },
                    {
                        type: 'kvList',
                        title: 'Udfærdigelse af "Skema 2 – Tvangsbehandling – Legemlig lidelse"',
                        items: [
                            { key: 'Begrundelse (§13)', value: 'Klik "Nærliggende eller væsentlig fare for patienten eller andre" eller "Udsigt til væsentlig forringelse af helbredet" SAMT klik "Lidelsen udsætter patientens liv eller helbred for væsentlig fare".' },
                            { key: 'Art og omfang', value: 'Fx: "Transport til og fra operation, undersøgelser (klinisk, paraklinisk og billeddiagnostisk) mhp. operativt indgreb. Operativt indgreb i XX regi. Nødvendig behandling med medicin, væske m.m. mhp. at udføre nævnte behandling forsvarligt."' },
                            { key: 'Tilladt magtanvendelse', value: 'Fx: "Fastholdelse, bælte, remme samt alle somatiske procedurer ifbm. XX".' },
                            { key: 'Uddybende begrundelse', value: 'Beskriv situationen, hvorfor tilstanden er farlig (evt. vital indikation), og at betingelserne for frihedsberøvelse (§5) er opfyldt.' },
                            { key: 'Læger & datoer', value: 'Dato + navn for psykiatrisk overlæge, ordinerende somatisk læge, dato + navn for somatisk overlæge, samt afkrydsning for mundtlig/skriftlig orientering (+ fysiske papirer til pt.).' },
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Eksempel på begrundelse ved somatisk tvang (s. 36)',
                        templateText: `Patienten har indtaget batterier. Det vurderes, at batterierne udgør særligt ætsende risiko med nærliggende fare for patientens liv. Somatiske læger finder det akut indiceret, at patienten skal have behandling. Patienten vil på ingen måde samarbejde om at få batterierne fjernet. Patienten vil ikke svare på spørgsmål, stirrer ud i luften.
Patienten vurderes som værende i en tilstand der kan sidestilles med psykose grundet affekt. Lægefagligt vurderes det, at det for patientens helbred er nødvendigt at anvende tvangsbehandling. Somatisk læge har vurderet det akut indiceret, da der er udsigt til væsentlig fare såfremt patienten ikke modtager behandling. Patienten kan ikke indgå i behandlingsalliance og ønsker ikke hjælp.`,
                    },
                ],
            },
            {
                id: 'skema3_beroligende_fastholdelse',
                title: 'Skema 3 – Beroligende medicin & Fastholdelse (§17)',
                pages: 's. 37',
                blocks: [
                    {
                        type: 'kvList',
                        title: 'Beroligende medicin (§17) – Udfærdigelse af Skema 3',
                        items: [
                            { key: 'Regel (§17)', value: 'Af afgørende betydning for bedring af en meget urolig patients tilstand – lægen kan bestemme beroligende middel om fornødent med magt.' },
                            { key: 'Begrundelse i henhold til §17', value: 'Klik "Urolig tilstand".' },
                            { key: 'Tilbudt medicin (afvist)', value: 'Skriv præparat og dosis. OBS: Der skal være overensstemmelse mellem det tilbudte præparat til peroral og parenteral administration. Anfør kun dét/de præparat(er), der er motiveret for OG som patienten modtog.' },
                            { key: 'Adfærd, citater & vurdering', value: 'Beskriv situationen/årsagen/patientens adfærd samt samlet vurdering. Klik at patienten er mundtligt og skriftligt orienteret (+ fysiske papirer).' },
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Beroligende medicin – Inspiration til tekst (s. 37)',
                        templateText: `Lægefagligt vurderes det, at beroligende medicin er af afgørende betydning for bedring af pt.s meget urolige tilstand. Mindre indgribende foranstaltninger vurderes ikke at have været tilstrækkelige. Det valgte lægemiddel er afprøvet i sædvanlig dosering med færrest mulige bivirkninger.
Der er givet ..XXX..`,
                    },
                    {
                        type: 'kvList',
                        title: 'Fastholdelse (§17) – Udfærdigelse af Skema 3',
                        items: [
                            { key: 'Betingelse', value: 'En indlagt pt. kan fastholdes og om fornødent med magt føres til et andet opholdssted, såfremt betingelserne for tvangsfiksering (§14 stk. 2) er opfyldte.' },
                            { key: 'Begrundelse (§17)', value: 'Klik "Farlighed", "Forulempelse" eller "Hærværk".' },
                            { key: 'Uddybende begrundelse & tider', value: 'Beskriv situationen/årsagen/patientens adfærd. Notér fastholdelsens start og slutning. Klik orienteret mundtligt og skriftligt (+ fysiske papirer).' },
                        ],
                    },
                ],
            },
            {
                id: 'skema3_fiksering',
                title: 'Skema 3 – Fiksering: Bælte & Remme (§14–16)',
                pages: 's. 38–39',
                blocks: [
                    {
                        type: 'bullets',
                        title: 'Betingelser for tvangsfiksering (§14–16)',
                        items: [
                            'Må kun anvendes kortvarigt og i det omfang det er nødvendigt for at afværge, at en patient:',
                            '1) Udsætter sig selv eller andre for nærliggende fare for at lide skade på legeme og helbred',
                            '2) Forfølger eller på anden måde groft forulemper medpatienter',
                            '3) Øver hærværk af ikke ubetydeligt omfang.',
                            'Kan foregå i længere tid, når hensynet til patientens eller andres liv, førlighed eller sikkerhed tilsiger dette.',
                        ],
                    },
                    {
                        type: 'kvList',
                        title: 'Udfærdigelse af Skema 3 – Bælte & Remme',
                        items: [
                            { key: 'Begrundelse (§14)', value: 'Bælte: Klik "Farlighed", "Forulempelse", "Hærværk" eller "Frivillig bæltefiksering". Remme: Klik "Farlighed", "Forulempelse" eller "Hærværk".' },
                            { key: 'Mindste middels princippet (Bælte)', value: 'Klik af i de forsøgte tiltag (skærmet, talt til ro, tilbudt beroligende medicin til frivillig indtagelse).' },
                            { key: 'Adfærd, citater & begrundelse', value: 'Sikre at det lovmæssige ift. §14–16 er omfattet. Ved remme kan refereres til bæltefikseringsnotat og evt. at remme sikrer bæltefiksering pga. anatomi.' },
                            { key: 'Godkendelse & orientering', value: 'Indsæt dato for overlæges stillingtagen + ansvarlig overlæge + orientering (+ fysiske papirer). OBS: Hvis anvendt som led i Tvangsbehandling (Skema 2), klikkes af i relevant boks.' },
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Bæltefiksering – Inspiration til tekst (s. 38)',
                        templateText: `Lægefagligt vurderes det, at det er nødvendigt at tvangsfiksere pt. med bælte mhp. at afværge, at pt. udsætter ..... for nærliggende fare for at lide skade på legeme og helbred. Mindre indgribende foranstaltninger vurderes ikke at have været tilstrækkelige. Fiksering vurderes at være mindstemiddel aktuelt. Der kan ikke peges på relevante alternativer til fiksering på nuværende tidspunkt.`,
                    },
                ],
            },
            {
                id: 'skema3_tilsyn',
                title: 'Tilsyn (Bælte + evt. remme, §21)',
                pages: 's. 40',
                blocks: [
                    {
                        type: 'callout',
                        variant: 'danger',
                        title: 'Tidsintervaller for lægelig vurdering (§21)',
                        items: [
                            '1) Mindst 3 gange i døgnet – jævnt fordelt.',
                            '2) Første vurdering skal ske 2–4 timer efter beslutningen om tvangsfiksering er truffet.',
                            '3) Efterfølgende vurderinger skal laves med højst 10 timers mellemrum.',
                            'Undtagelse ved søvn: Punkt 2 og 3 gælder ikke, hvis pt. sover og det lægefagligt vurderes skadeligt at vække pt. (Husk at journalføre søvn + kort argument!).',
                        ],
                    },
                    {
                        type: 'bullets',
                        title: 'Ekstern tilsyn & indberetning',
                        items: [
                            '> 24 timer: Ekstern tilsyn ved overlæge der ikke er involveret i behandlingen. (OBS: Ved uenighed er den behandlende læges vurdering afgørende.)',
                            '> 48 timer: Nyt eksternt tilsyn, derefter på fjerdedagen og efterfølgende 1 gang om ugen.',
                            '> 30 dage: Overlægen skal lave indberetning til Styrelsen for Patientsikkerhed.',
                        ],
                    },
                    {
                        type: 'bullets',
                        title: 'Udfærdigelse af Bæltetilsyn (og remme)',
                        items: [
                            'Klik i den relevante tvangsdot. Hvis pt. ligger i remme, notér hvis man skifter remme eller anlægger flere (ellers intet særskilt revurderingsnotat for remme).',
                            'Ved ophør af fiksering: Klik heri, skriv kort kommentar, og HUSK at seponere aktiviteten.',
                            'Ved opretholdelse: Inddrag beskrivelser fra den faste vagt (klik af i boks) og sikre at §14–16 er omfattet i begrundelsen.',
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Bæltetilsyn – Inspiration til tekst (sovende vs. fortsat fiksering)',
                        templateText: `VED SØVN (undlader vækning):
Patienten sover ved tilsyn. Der er normal vejrtrækning. Det vurderes kontraindiceret at vække patienten af behandlingsmæssige årsager. Personale og fast vagt er instrueret i at kontakte psykiatrisk læge når patienten vågner mhp. bæltetilsyn.

VED FORTSAT FIKSERING:
Lægefagligt vurderes det, at det er nødvendigt at opretholde tvangsfiksering med bælte mhp. at afværge, at pt. udsætter ..... for nærliggende fare for at lide skade på legeme og helbred. Hensynet til ..... liv, førlighed og sikkerhed tilsiger dette. Mindre indgribende foranstaltninger vurderes ikke at have været tilstrækkelige. Fiksering vurderes at være mindstemiddel aktuelt. Der kan ikke peges på relevante alternativer til fiksering på nuværende tidspunkt. Der arbejdes løbende mod en gradvis udtrapning af fikseringen.`,
                    },
                ],
            },
        ],
    },
    {
        id: 'laegeerklaering',
        navId: 'gs_laegeerklaering',
        title: 'Lægeerklæring – Patientklagenævn',
        shortTitle: 'Lægeerklæring (Klager)',
        pages: 's. 41',
        startPage: 41,
        icon: 'FileText',
        summary: 'Komplet skabelon til lægeerklæring ved klage til Det Psykiatriske Patientklagenævn inkl. kronologisk oversigt over tvangstiltag.',
        subSections: [
            {
                id: 'laegeerklaering_skabelon',
                title: 'Skabelon til Lægeerklæring – Patientklagenævn',
                pages: 's. 41',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Standardopbygning til lægeerklæring ved klage over tvangstiltag (fx påtænkt tvangsmedicinering eller tvangsindlæggelse). Erstat alle XX-felter med patientens aktuelle oplysninger.',
                    },
                    {
                        type: 'copyTemplate',
                        title: 'Kopiérbar Lægeerklæring – Patientklagenævn',
                        templateText: `Lægeerklæring - patientklagenævn
Navn, CPR-nr

Lægeerklæring
Navn (initialer) er indlagt på Sengeafsnit XX (Sxx), Afdeling for Psykoser, Aarhus Universitetshospital Psykiatrien.

XX har via sin patientrådgiver XXX d. xx.xx.20xx valgt at klage over påtænkt tvangsmedicinering/tvangsindlæggelse/andet.
Begrundelse: "xxx".

Oversigt over tvangstiltag under aktuelle indlæggelse:
xx.xx.xx: Tvangsindlæggelse på XX-indikation. Kort beskrivelse XX
fx: Fremstår psykotisk, garderet samt meget underernæret. Tiltagende isolationstendens, spisevægring og mistanke om synshallucinationer, sproglige tankeforstyrrelser og medicinsvigt.
Modtaget af læge XX – godkendt af overlæge XX.

xx.xx.xx: Revurdering dag X, Frihedsberøvelse. Opretholdt. Kort beskrivelse XX
fx: Fremstår garderet og med formelle tankeforstyrrelser med privat logik.
Foretaget af læge XX – godkendt af overlæge XX.

xx.xx.xx: Beroligende medicin – xx mg xx. Grundet xx.
Foretaget af læge XX.

xx.xx.xx: Tvang – Bæltefiksering grundet xx.
Foretaget af læge xx.xx – Godkendt af overlæge xx.

xx.xx.xx: Tvang – remme grundet xx.
Udført af læge xx. – Godkendt af overlæge xx.

Aktuelle klage: (eksempel)
xx.xx.xx: (Væsentligt fra motivationstekst kan indsættes)
fx Informeret om opstart af motivationsfase (dag 1) forud for evt. tvangsbehandling med XX med startdosis xx mg stigende til xx mg med dosisinterval hver xx. dag efter effekt og bivirkninger.
Udført af XX.

xx.xx.xx: Motivationsperiode dag 1 – Udført af XX.
xx.xx.xx: Motivationsperiode dag 2 – Udført af XX.
xx.xx.xx: Motivationsperiode dag 3 – Udført af XX.
xx.xx.xx: Tvangsbehandling – Medicinering. Grundet udsigt til væsentlig forringelse af helbredet. xx ønsker at klage. Opsættende virkning.
Foretaget af læge XX – godkendt af overlæge XX.

Socialt:

Tidligere psykisk:

Aktuelt psykisk:

Konklusion:`,
                    },
                ],
            },
        ],
    },
    {
        id: 'klinisk_logistik',
        navId: 'gs_klinisk_logistik',
        title: 'Klinisk logistik – Anywhere',
        shortTitle: 'Klinisk logistik',
        pages: 's. 42–43',
        startPage: 42,
        icon: 'Activity',
        summary: 'Visuel guide til Anywhere: valg af sengeafdeling, Aktivitetsbar, Belægning, Stuegang, Pleje samt planlægning af stuegang og PANSS-6 / Hamilton D17.',
        subSections: [
            {
                id: 'anywhere_overblik',
                title: 'Overblik over menupunkter i Anywhere',
                pages: 's. 42',
                blocks: [
                    {
                        type: 'colorLegend',
                        title: 'De 5 vigtigste menupunkter i venstremenuen',
                        items: [
                            { color: 'blue', label: 'Vælg sengeafdeling (topdropdown: PSYK AUH AFP...)', description: 'Skift mellem sengeafsnittene (Blå pil i PDF).' },
                            { color: 'amber', label: 'AKTIVITETSBAR', description: 'Giver overblik over planlagte aktiviteter for patienterne. Man kan også planlægge aktiviteter her (Orange pil i PDF).' },
                            { color: 'red', label: 'BELÆGNING', description: 'Svarer til skærmene i afdelingen med overblik over patienterne (Rød pil i PDF).' },
                            { color: 'green', label: 'STUEGANG', description: 'Giver overblik over stuegangslisten (Grøn pil i PDF).' },
                            { color: 'purple', label: 'PLEJE', description: 'Viser alle plejeopgaverne. Her kan du fx få overblik over hvilke patienter som skal have lavet psykologiske ratings (Hamilton, PANSS-6) (Lilla pil i PDF).' },
                        ],
                    },
                    {
                        type: 'image',
                        src: 'img/groenspaettebog/anywhere_menu.png',
                        alt: 'Skærmbillede af venstremenuen i Klinisk logistik (Anywhere)',
                        caption: 'Side 42: Venstremenuen i Anywhere (rækkefølge oppefra: Sengeafdeling-vælger -> Aktivitetsbar -> Belægning -> Stuegang -> Pleje).',
                    },
                ],
            },
            {
                id: 'planlaeg_stuegang',
                title: 'Planlæg stuegang for patient',
                pages: 's. 43',
                blocks: [
                    {
                        type: 'numbered',
                        title: 'Trin-for-trin: Planlæg stuegang i Anywhere',
                        items: [
                            'Tryk på "Belægning" i venstremenuen.',
                            'Klik på navnet på patienten.',
                            'Klik på "Kliniske aktiviteter".',
                            'Klik på "+"-ikonet ud for enten "idag" eller "fremtid".',
                            'Klik på boksen "aktivitet" og vælg den aktivitet du ønsker at planlægge. Vælg herefter hvilken dato (og evt. tidspunkt), og klik på OK.',
                            'Klik på "Stuegang" i venstremenuen. Her kan du tjekke om din stuegangsaktivitet er oprettet på den ønskede dato.',
                            'I kolonnen "aktivitet" kan du ud for patienten tilføje ønsket tekst – fx "Stuegang ift. medicin" eller "Pårørendesamtale - søster kommer kl. 11".',
                            'I kolonnen "læge" eller "sekundær" sætter du dig selv som behandler på den givne patient.',
                        ],
                    },
                    {
                        type: 'image',
                        src: 'img/groenspaettebog/anywhere_aktivitet.png',
                        alt: 'Skærmbillede af Opret Aktivitet-dialogen i Anywhere',
                        caption: 'Side 43: Dialogboksen "Opret Aktivitet" efter klik på "+"-ikonet ud for "idag" eller "fremtid".',
                    },
                ],
            },
            {
                id: 'planlaeg_rating',
                title: 'Planlæg rating, PANSS-6 & Hamilton D17',
                pages: 's. 43',
                blocks: [
                    {
                        type: 'numbered',
                        title: 'Planlæg rating for patient (via Belægning)',
                        items: [
                            'Tryk på "Belægning".',
                            'Klik på navnet på patienten.',
                            'Klik på "Kliniske aktiviteter".',
                            'Klik på "+"-ikonet ud for enten "idag" eller "fremtid".',
                            'Klik på boksen "aktivitet", vælg aktiviteten (her PANSS-6), vælg dato/tidspunkt og klik OK.',
                            'Klik på "Pleje" for at tjekke om aktiviteten er oprettet på den ønskede dato.',
                        ],
                    },
                    {
                        type: 'numbered',
                        title: 'Hurtigvej: Opret aktivitet samme dag (via Aktivitetsbar)',
                        items: [
                            'Tryk på "Aktivitetsbar".',
                            'Klik på "+" under bjælken "Note".',
                            'Søg på ønskede aktivitet (her "PANSS-6") i søgefeltet ved "Opgaver".',
                            'Markér den ønskede aktivitet -> herefter er aktiviteten booket til samme dag.',
                        ],
                    },
                    {
                        type: 'kvList',
                        title: 'Løbende opdatering af PANSS-6 & Hamilton D17 under "Pleje"',
                        items: [
                            {
                                key: 'PANSS-6',
                                value: '1) Klik på "Pleje" og derefter kolonnen "PANSS-6" for overblik.\n2) Sæt "Status" til "I gang" forud for PANSS-6.\n3) Efter ratingen ændres "Status" tilbage til "Planlagt".\n4) Klik i kolonnen "Aktivitetsstart" og vælg ny dato – typisk 2 uger frem eller til næste aftalte PANSS-6 dag i afdelingen (OBS: hør ad i afdelingen hvad de plejer).',
                            },
                            {
                                key: 'Hamilton D17',
                                value: '1) Klik på "Pleje" og derefter kolonnen "HAM-D17" for overblik.\n2) Sæt "Status" til "I gang" forud for Hamilton.\n3) Efter ratingen ændres "Status" tilbage til "Planlagt".\n4) Klik i kolonnen "Aktivitetsstart" og vælg ny dato – typisk 1 uge frem eller til næste faste Hamilton-dag i afdelingen (OBS: hør ad i afdelingen hvad de plejer).',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'andet',
        navId: 'gs_andet',
        title: 'Andet, HAT & Nyttige links',
        shortTitle: 'Andet, HAT & Links',
        pages: 's. 44–45',
        startPage: 44,
        icon: 'BookOpen',
        summary: 'HAT (Hurtig Ambulant Tid), Psykiatriens Hus, De særlige/ommærkede pladser, Værktøjskasse, RADS, Psykofarmakologi og Medicinskift.',
        subSections: [
            {
                id: 'hat',
                title: 'HAT (Hurtig Ambulant Tid)',
                pages: 's. 44',
                blocks: [
                    {
                        type: 'paragraph',
                        text: 'Hurtig Ambulant Tid er et tilbud, hvor Psykiatrisk Modtagelse eller sengeafsnittene kan give patienterne en ambulant tid næstfølgende hverdag (evt. de følgende 2–3 hverdage) som et alternativ til akut indlæggelse eller for at understøtte udskrivelsesprocessen.',
                    },
                    {
                        type: 'epjPath',
                        label: 'Find HAT-tider i EPJ',
                        path: 'EPJ -> "Booking" -> "Kalenderlister" -> "PSY2 HAT tid"',
                    },
                    {
                        type: 'image',
                        src: 'img/groenspaettebog/epj_hat_tid.png',
                        alt: 'EPJ menu-navigation til PSY2 HAT tid',
                        caption: 'Side 44: Booking -> Kalenderlister -> PS Afdeling for Psykoser Skejby -> PSY2 HAT-tid.',
                    },
                    {
                        type: 'callout',
                        variant: 'warning',
                        title: 'Arbejdsgang & Dokumentation ved HAT',
                        items: [
                            'HUSK at starte og afslutte besøg i afviklingslisten. Patienter konfereres med HAT-ansvarlig læge.',
                            'Diktat dikteres under: "AFP Team for ADHD – AUH, 66.00.41.Q.PSY-ADHD".',
                            'Når dokumentation/diktat er udført sendes mail til sekretærer på: psy.auhp.ap.klinik2@rm.dk',
                            'Godkend + send epikrise når den kommer i opgavelisten. (OBS: Man skal IKKE selv oprette epikrise – denne arbejdsgang ligger hos sekretæren. Send mail til sekretær.)',
                        ],
                    },
                    {
                        type: 'copyTemplate',
                        title: 'HAT Journalføring – Obligatoriske SFI’er i dotten (s. 44)',
                        description: 'Hele notatet bruges som epikrise. Alle nedenstående SFI’er skal udfyldes:',
                        templateText: `HAT – HURTIG AMBULANT TID (SFI-tjekliste)
- Overskrift: Hurtig ambulant samtale
- Ambulant besøg – AAF22
- Samtale med behandlingssigte – BVAA34A
- Patientidentifikation
- Screening for selvmordsrisiko – ZZ9970FA
- Aktuelt psykisk
- Objektivt psykisk
- Aktuelt socialt
- Alkohol og rusmidler
- Vurdering af trusselsniveau/Risiko for vold
- Diagnosenotat
- Vurdering/konklusion - Konklusion og foreslået efterbehandling
  – herunder hvilken læge patienten er konfereret med
  – patientens diagnoser`,
                    },
                ],
            },
            {
                id: 'psykiatriens_hus',
                title: 'Psykiatriens Hus',
                pages: 's. 45',
                blocks: [
                    {
                        type: 'links',
                        title: 'E-dok retningslinje',
                        items: [
                            {
                                label: 'Henvisning til ambulant team i Psykiatriens Hus, AUH Psykiatrien',
                                url: 'https://e-dok.rm.dk/edok/Admin/GUI.nsf/Desktop.html?open&openlink=https://e-dok.rm.dk/edok/enduser/portal.nsf/Main.html?open&unid=XDAECB9E22D7A45DFC12583910037DC7A&level=7016PA&dbpath=/edok/editor/7016FA.nsf/&windowwidth=1100&windowheight=600&windowtitle=S%F8g',
                            },
                        ],
                    },
                ],
            },
            {
                id: 'gode_links',
                title: 'Særlige pladser, Gode links & Medicinskift',
                pages: 's. 45',
                blocks: [
                    {
                        type: 'links',
                        title: 'Pladser & Retningslinjer',
                        items: [
                            {
                                label: 'De særlige pladser',
                                url: 'https://www.fagperson.psykiatrien.rm.dk/henvisning-og-visitation/sarlige-pladser/',
                                description: 'Henvisning og visitation',
                            },
                            {
                                label: 'De ommærkede pladser',
                                url: 'https://www.fagperson.psykiatrien.rm.dk/henvisning-og-visitation/sarlige-pladser/de-ommarkede-pladser/',
                                description: 'Information om ommærkede pladser',
                            },
                            {
                                label: 'Værktøjskasse – Afdeling for Psykoser',
                                url: 'https://www.fagperson.psykiatrien.rm.dk/ansatte/informationer-fra-afdelingerne/afdeling-for-psykoser/varktojskasse/',
                                description: 'Skemaer, instrukser og hjælpeværktøjer',
                            },
                            {
                                label: 'www.psykofarmakologi.dk',
                                url: 'http://www.psykofarmakologi.dk/',
                                description: 'Psykofarmakologisk opslagsværk',
                            },
                            {
                                label: 'RADS Behandlingsvejledninger – Psykiatri',
                                url: 'https://rads.dk/behandlingsvejledninger/psykiatri',
                                description: 'Nationale behandlingsvejledninger',
                            },
                        ],
                    },
                    {
                        type: 'links',
                        title: 'Medicinskift (Psychiatrienet.nl)',
                        items: [
                            {
                                label: 'SwitchAntipsychotics (Skift mellem antipsykotika)',
                                url: 'https://wiki.psychiatrienet.nl/wiki/SwitchAntipsychotics',
                            },
                            {
                                label: 'SwitchAntidepressants (Skift mellem antidepressiva)',
                                url: 'https://wiki.psychiatrienet.nl/wiki/SwitchAntidepressants',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
