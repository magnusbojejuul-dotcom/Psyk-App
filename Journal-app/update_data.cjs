const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'målgrupper_texts');
const outputFile = path.join(__dirname, 'src', 'data', 'targetGroupsData.js');
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.txt'));

let data = [];

function getDiagnosisName(filename) {
    if (filename.includes('adhd')) return { name: 'ADHD og ADD', id: 'adhd', file: 'malgruppebeskrivelse-adhd-add-df9-28.08.2025.pdf' };
    if (filename.includes('angst')) return { name: 'Angst', id: 'angst', file: 'malgruppebeskrivelse-angst.pdf' };
    if (filename.includes('autismespektrum')) return { name: 'Autismespektrumforstyrrelse', id: 'autisme', file: 'malgruppebeskrivelse-autismespektrumforstyrrelse.pdf' };
    if (filename.includes('bipolar')) return { name: 'Bipolar Lidelse', id: 'bipolar', file: 'malgruppebeskrivelse-bipolar-lidelse.pdf' };
    if (filename.includes('depression')) return { name: 'Depression', id: 'depression', file: 'malgruppebeskrivelse-depression-nov-2024.pdf' };
    if (filename.includes('ocd')) return { name: 'OCD', id: 'ocd', file: 'malgruppebeskrivelse-ocd.pdf' };
    if (filename.includes('overkontrollerende')) return { name: 'Personlighedsforstyrrelse (Overkontrollerende)', id: 'pf_over', file: 'malgruppebeskrivelse-personlighedsforstyrrelse---overkontrollerende.pdf' };
    if (filename.includes('underkontrollerende')) return { name: 'Personlighedsforstyrrelse (Underkontrollerende)', id: 'pf_under', file: 'malgruppebeskrivelse-personlighedsforstyrrelse---underkontrollerende.pdf' };
    if (filename.includes('udviklingshammede')) return { name: 'Psykisk syge udviklingshæmmede', id: 'udvikling', file: 'malgruppebeskrivelse-psykisk-syge-udviklingshammede-25.02.2025.pdf' };
    if (filename.includes('psykoser')) return { name: 'Psykoser', id: 'psykose', file: 'malgruppebeskrivelse-psykoser.pdf' };
    if (filename.includes('ptsd')) return { name: 'PTSD', id: 'ptsd', file: 'malgruppebeskrivelse-ptsd.pdf' };
    if (filename.includes('dobbeltdiagnose')) return { name: 'Dobbeltdiagnosebehandling', id: 'dobbelt', file: 'malgruppebeskrivelse-region-midt-integreret-dobbeltdiagnosebehandling-02.09.25-tg.pdf' };
    return { name: filename, id: filename.replace('.txt', ''), file: filename.replace('.txt', '.pdf') };
}

function cleanText(text) {
    text = text.replace(/\r/g, '');
    text = text.replace(/Målgruppebeskrivelse[^\n]*\n/gi, '');
    text = text.replace(/Sidst redigeret[^\n]*Side\s*\d+\s*af\s*\d+\n?/gi, '');
    text = text.replace(/e s l e v i r k s e b e p p u r g ål M[^\n]*\n/gi, '');
    text = text.replace(/t s id S t e r e ig d re[^\n]*\n/gi, '');
    
    const fixes = [
        ['lett e', 'lette'], ['le tte', 'lette'], ['Tilbage vises', 'Tilbagevises'],
        ['særlig e', 'særlige'], ['gru ndlidelse', 'grundlidelse'], ['funkt ionsniveau', 'funktionsniveau'],
        ['ICD -10', 'ICD-10'], ['kunne t', 'kunnet'], ['varetag e', 'varetage'],
        ['enkelfobi', 'enkeltfobi'], ['mod erate', 'moderate'], ['sy mptomer', 'symptomer'],
        ['reg i', 'regi'], ['suffic ient', 'sufficient'], ['beh andling', 'behandling'],
        ['psyki sk', 'psykisk'], ['begrænse t', 'begrænset'], ['be handling', 'behandling'],
        ['sværhed sgraden', 'sværhedsgraden'], ['privatprak tiserende', 'privatpraktiserende'],
        ['mail/korrespondancebre v', 'mail/korrespondancebrev'], ['Visite res', 'Visiteres'],
        ['selvbebrejde lse', 'selvbebrejdelse'], ['sex -drift', 'sex-drift'], ['væ re', 'være'],
        ['mang lende', 'manglende'], ['Beskri ves', 'Beskrives'], ['meni ngsløse', 'meningsløse'],
        ['ha ve', 'have'], ['usa ndsynlig', 'usandsynlig'], ['Tvang stanker', 'Tvangstanker'],
        ['sværh edsgrad', 'sværhedsgrad'], ['s tereotyp', 'stereotyp'], ['Begiv enheden', 'Begivenheden'],
        ['tvangs handlinger', 'tvangshandlinger'], ['indflyde lse', 'indflydelse'], ['vis iteres', 'visiteres'],
        ['pro blemstilling', 'problemstilling'], ['forårs aget', 'forårsaget'], ['lide lse', 'lidelse'],
        ['sympto mbeskrivelse', 'symptombeskrivelse'], ['ik ke', 'ikke'], ['tr ods', 'trods'],
        ['personlig hedsstrukturen', 'personlighedsstrukturen'], ['kontrolle ringstendens', 'kontrolleringstendens'],
        ['a ndre', 'andre'], ['uddannel se', 'uddannelse'], ['underkontrol lerende', 'underkontrollerende'],
        ['personlighedsfors tyrrelse', 'personlighedsforstyrrelse'], ['hospi talsbaserede', 'hospitalsbaserede'],
        ['lune fuldt', 'lunefuldt'], ['ust abilt', 'ustabilt'], ['fun gere', 'fungere'],
        ['eksplosiv e', 'eksplosive'], ['identitetsføle lse', 'identitetsfølelse'], ['færd igheder', 'færdigheder'],
        ['hjæl p', 'hjælp'], ['Tilbag evises', 'Tilbagevises'], ['stresskontrolbehandlin g', 'stresskontrolbehandling'],
        ['lignend e', 'lignende'], ['behandli ng', 'behandling'], ['undgåelsesadfær d', 'undgåelsesadfærd'],
        ['væ ret', 'været'], ['fys isk', 'fysisk'], ['pa kkeforløb', 'pakkeforløb'],
        ['flyg tninge', 'flygtninge'], ['flashb ack', 'flashback'], ['opmær ksomhed', 'opmærksomhed'],
        ['pla ges', 'plages'], ['symptome r', 'symptomer'], ['pinli gt', 'pinligt'],
        ['ligne nde', 'lignende'], ['depersonalise ring', 'depersonalisering'], ['  +', ' ']
    ];

    for (let [bad, good] of fixes) {
        text = text.split(bad).join(good);
    }
    
    text = text.replace(/([^.!?:\-])\n([a-zæøå0-9])/gi, '$1 $2');
    text = text.replace(/\n+/g, ' '); 
    return text.trim();
}

function processSentences(text, labelStr) {
    let sentences = text.split(/(?<=[.!?])\s+(?=[A-ZÆØÅ])/).map(s => s.trim()).filter(s => s);
    let actionLines = [];
    let symptomLines = [];
    let isAction = false;
    for (let s of sentences) {
        if (s.match(/^(Tilbagevises|Visiteres|Hvis\s|Der henvises|Det anbefales)/i)) {
            isAction = true;
        }
        if (isAction) {
            actionLines.push(s);
        } else {
            symptomLines.push(s);
        }
    }
    if (actionLines.length === 0) {
        actionLines = symptomLines.slice(-1);
        symptomLines = symptomLines.slice(0, -1);
    }
    if (symptomLines.length === 0) {
        symptomLines = actionLines;
    }
    return {
        label: labelStr,
        symptoms: symptomLines,
        action: actionLines.join(' ')
    };
}

for (let file of files) {
    let diagInfo = getDiagnosisName(file);
    if (diagInfo.id === 'dobbelt') continue; // Manual override later

    let content = fs.readFileSync(path.join(inputDir, file), 'utf-8');
    content = cleanText(content);
    
    // PTSD special logic (split by CGI and "Traumatiserede flygtninge")
    if (diagInfo.id === 'ptsd') {
        content = content.replace('Traumatiserede flygtninge Udredning', 'CGI Flygtninge Udredning');
    }

    let parts = content.split(/(?=CGI\s*[1-9Flygtninge])/i);
    let intro = parts[0].trim();
    intro = intro.replace(/CGI\s+Beskrivelse/i, '').trim();
    intro = intro.split(/(?<=[.!?])\s+(?=[A-ZÆØÅ])/).join('\n\n');
    
    let options = [];
    for (let i = 1; i < parts.length; i++) {
        let part = parts[i].trim();
        let match = part.match(/^(CGI\s*[A-Za-z0-9]+)([\s\S]*)$/i);
        if (match) {
            let label = match[1].trim();
            let text = match[2].trim();
            if (text === '') continue;

            // Handle subgroups specifically
            if (diagInfo.id === 'bipolar' && label === 'CGI 4') {
                let mistankeIdx = text.indexOf('Mistanke om bipolar');
                let kendtIdx = text.indexOf('Kendt med bipolar');
                if (mistankeIdx !== -1 && kendtIdx !== -1) {
                    options.push(processSentences(text.substring(mistankeIdx, kendtIdx), 'CGI 4 (Mistanke)'));
                    options.push(processSentences(text.substring(kendtIdx), 'CGI 4 (Kendt)'));
                    continue;
                }
            }

            if (diagInfo.id === 'psykose' && label === 'CGI 4') {
                let mistankeIdx = text.indexOf('Mistanke om psykose');
                let kendtIdx = text.indexOf('Kendt med psykose');
                if (mistankeIdx !== -1 && kendtIdx !== -1) {
                    options.push(processSentences(text.substring(mistankeIdx, kendtIdx), 'CGI 4 (Mistanke)'));
                    options.push(processSentences(text.substring(kendtIdx), 'CGI 4 (Kendt)'));
                    continue;
                }
            }

            if (diagInfo.id === 'ptsd' && (label === 'CGI 5' || label === 'CGI 6')) {
                // Actions have "Hvis ukendt afklarende samtale. Hvis kendt visiteres til behandling."
                // My processSentences splits this nicely into action.
                options.push(processSentences(text, label));
                continue;
            }

            if (diagInfo.id === 'ptsd' && label === 'CGI Flygtninge') {
                options.push({
                    label: 'Flygtninge',
                    symptoms: [
                        'Målgruppen er flygtninge eller familiesammenførte med PTSD og andre komorbide sekundære diagnoser, med lovligt ophold i Danmark og som i et andet land er blevet traumatiseret eller på anden måde alvorligt belastet, psykisk, fysisk og/eller socialt som følge af krig, forfølgelse, tortur, flugt, fængselsophold eller andre former for organiseret vold og overgreb.',
                        'Beskrives med traume relateret til krig, forfølgelse, tortur, flugt, fængselsophold eller andre former for organiseret vold og overgreb.',
                        'Beskrives med symptomer på PTSD. Det kan være flashback, mareridt, undgåelsesadfærd, psykisk overfølsomhed, alarmberedskab, søvnproblemer, irritabilitet/vredesudbrud, koncentrationsbesvær, hypervigilitet, tilbøjelighed til sammenfaren, mulige psykotiske symptomer og personlighedsændring.'
                    ],
                    action: 'Visiteres til udredning og behandling for PTSD ved traumatiserede flygtninge i den hospitalsbaserede psykiatri. Ved svær depression, skal denne behandles først jf. gældende retningslinjer.'
                });
                continue;
            }

            options.push(processSentences(text, label));
        }
    }
    
    data.push({
        id: diagInfo.id,
        name: diagInfo.name,
        originalFile: diagInfo.file,
        intro: intro,
        options: options
    });
}

// Manual Spiseforstyrrelser
data.push({
    id: 'spiseforstyrrelse',
    name: 'Spiseforstyrrelser',
    originalFile: 'Målgruppebeskrivelse - DF5 Spiseforstyrrelser - Sundhed Fagperson.html',
    intro: 'Udredning og behandling af spiseforstyrrelser afhænger af sværhedsgrad og evt. somatisk påvirkning.',
    options: [
        { 
            label: 'CGI 2-3', 
            symptoms: [
                'Let til moderat spiseforstyrrelse.',
                'Milde symptomer, begrænset eller ingen somatisk påvirkning.',
                'Ikke forsøgt behandling i primær sektor.'
            ], 
            action: 'Tilbagevises med anbefaling om behandling i primær regi eller relevant kommunalt tilbud.' 
        },
        { 
            label: 'CGI 4-6', 
            symptoms: [
                'Svær eller kompleks spiseforstyrrelse (Anoreksi, Bulimi eller atypisk spiseforstyrrelse).',
                'Klinisk betydende somatisk påvirkning (lavt BMI, elektrolytforstyrrelser, gentagne opkastninger).',
                'Svær komorbiditet (depression, svær OCD, personlighedsforstyrrelse, selvmordsfare).',
                'Manglende effekt af behandling i primær sektor.'
            ], 
            action: 'Visiteres til udredning og behandling (pakkeforløb) for spiseforstyrrelser i den hospitalsbaserede psykiatri.' 
        }
    ]
});

// Manual Dobbeltdiagnosebehandling
data.push({
    id: 'dobbelt',
    name: 'Dobbeltdiagnosebehandling',
    originalFile: 'malgruppebeskrivelse-region-midt-integreret-dobbeltdiagnosebehandling-02.09.25-tg.pdf',
    intro: 'Målgruppebeskrivelse for integreret dobbeltdiagnosebehandling i Region Midtjylland.\n\nPatienten skal have moderat til svær behandlelig psykisk lidelse eller stærk mistanke herom (CGI-score 5-7, fraset Bipolar og Psykoser, hvor CGI=4-7 også er gældende).\nFunktionsevnen skal være påvirket i en sådan grad (GAF-score 1-40), at patienten ikke vurderes at kunne følge eller profitere af behandling i et parallelt/koordineret tilbud.',
    options: [
        {
            label: 'Psykiatriske Kriterier',
            symptoms: [
                'F1: Psykiske lidelser forårsaget af brug af psykoaktive stoffer (Moderat/svær grad - KUN stofudløst psykose).',
                'F2: Skizofreni og beslægtede lidelser (Moderat/svær grad).',
                'F3: Affektive sindslidelser (Moderat/svær grad).',
                'F4: Angst, PTSD, OCD mv. (Moderat/svær grad).',
                'F5: Spiseforstyrrelser (Moderat/svær grad).',
                'F6: Personlighedsforstyrrelser (Moderat/svær grad. OBS: Ved dyssocial PF skal der være samtidig behandlelig psykiatrisk komorbiditet).',
                'F8/F9: Udviklingsforstyrrelser / ADHD (Moderat/svær grad + samtidig behandlelig psykiatrisk komorbiditet).',
                'ELLER: Stærk mistanke/manglende udredning, men med klare symptomer på svær/moderat lidelse svarende til ovenstående, som rækker ud over, hvad der kan forklares af rusmiddelforbruget.'
            ],
            action: 'Hvis patienten opfylder et af ovenstående kriterier SAMT kriterierne for nedsat funktionsevne, vurderes patienten i målgruppe for integreret dobbeltdiagnosebehandling. Behandlingsmuligheder i primær sektor må ikke tidligere være vurderet udtømte, medmindre der er sket væsentlige ændringer.'
        },
        {
            label: 'Nedsat Funktionsevne',
            symptoms: [
                'Samlet nedsat funktionsevne svarende til en GAF-score på 1-40.',
                'Autonomi og boevne: Har behov for støtte til daglige gøremål, personlig hygiejne, økonomi, eller at klare sig i egen bolig (f.eks. hjemløs/funktionel hjemløs).',
                'Socialt netværk og interaktion: Massivt netværkstab eller social isolation.',
                'Beskæftigelse: Har intet tilknytningsforhold til arbejdsmarkedet eller uddannelse.'
            ],
            action: 'Hvis patienten opfylder de psykiatriske kriterier SAMT et eller flere af disse punkter for massivt nedsat funktionsevne i hverdagen, visiteres der til integreret dobbeltdiagnosebehandling.'
        }
    ]
});

let outputStr = 'export const targetGroupsData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(outputFile, outputStr);
console.log('Successfully generated clean data.');
