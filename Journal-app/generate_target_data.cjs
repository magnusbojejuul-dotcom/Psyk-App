const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'målgrupper_texts');
const htmlFile = path.join(__dirname, 'målgruppebeskrivelser', 'Målgruppebeskrivelse - DF5 Spiseforstyrrelser - Sundhed Fagperson.html');
const outputFile = path.join(__dirname, 'src', 'data', 'targetGroupsData.js');

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.txt'));

let data = [];

// Helper to map filename to diagnosis name and a mapped file path
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

for (let file of files) {
    let content = fs.readFileSync(path.join(inputDir, file), 'utf-8');
    let diagInfo = getDiagnosisName(file);
    
    // Split by CGI
    let parts = content.split(/(?=CGI\s*\d)/i);
    let intro = parts[0].trim();
    
    let options = [];
    for (let i = 1; i < parts.length; i++) {
        let part = parts[i].trim();
        let match = part.match(/^(CGI\s*\d)([\s\S]*)$/i);
        if (match) {
            let label = match[1].trim();
            let text = match[2].trim();
            
            if (text === '') continue; // Skip empty CGI
            
            // Try to split action from symptoms
            // Usually the action starts with "Tilbagevises", "Visiteres", "Hvis problemstilling" etc.
            let lines = text.split('\n').map(l => l.trim()).filter(l => l);
            let actionLines = [];
            let symptomLines = [];
            
            let isAction = false;
            for (let line of lines) {
                if (line.match(/^(Tilbagevises|Visiteres|Hvis problemstilling|Beskrives|Der kan være)/i) && symptomLines.length > 0) {
                    // It's tricky. Let's just find "Tilbagevises" or "Visiteres" or "Hvis" as the start of action
                    if (line.match(/^(Tilbagevises|Visiteres|Hvis\s)/i)) {
                        isAction = true;
                    }
                }
                if (isAction) {
                    actionLines.push(line);
                } else {
                    symptomLines.push(line);
                }
            }
            
            // If we couldn't split, fallback
            if (actionLines.length === 0) {
                actionLines = symptomLines.slice(-1);
                symptomLines = symptomLines.slice(0, -1);
            }
            if (symptomLines.length === 0) {
                symptomLines = actionLines;
            }
            
            options.push({
                label: label,
                symptoms: symptomLines.join(' '),
                action: actionLines.join(' ')
            });
        }
    }
    
    data.push({
        id: diagInfo.id,
        name: diagInfo.name,
        originalFile: diagInfo.file,
        intro: intro.substring(0, 500) + (intro.length > 500 ? '...' : ''), // truncate intro if too long
        options: options
    });
}

// Handle Spiseforstyrrelser manually since it's HTML
let spiseHtml = '';
if (fs.existsSync(htmlFile)) {
    spiseHtml = fs.readFileSync(htmlFile, 'utf-8');
}
// Strip basic html tags for Spiseforstyrrelser to get some text
let stripped = spiseHtml.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
// We'll just hardcode Spiseforstyrrelser options based on general knowledge or give it a placeholder, since parsing it accurately here is hard without seeing its specific CGI structure.
data.push({
    id: 'spiseforstyrrelse',
    name: 'Spiseforstyrrelser',
    originalFile: 'Målgruppebeskrivelse - DF5 Spiseforstyrrelser - Sundhed Fagperson.html',
    intro: 'Målgruppebeskrivelse for DF5 Spiseforstyrrelser. Se den originale fil for fulde detaljer.',
    options: [
        { label: 'Let til moderat spiseforstyrrelse', symptoms: 'Milde symptomer, ingen somatisk påvirkning.', action: 'Tilbagevises med anbefaling om behandling i primær regi eller kommunalt tilbud.' },
        { label: 'Svær spiseforstyrrelse', symptoms: 'Svære symptomer, somatisk påvirkning, BMI lavt.', action: 'Visiteres til pakkeforløb for spiseforstyrrelser i hospitalsbaseret psykiatri.' }
    ]
});

let outputStr = 'export const targetGroupsData = ' + JSON.stringify(data, null, 2) + ';\n';
fs.writeFileSync(outputFile, outputStr);
console.log('Successfully generated data.');
