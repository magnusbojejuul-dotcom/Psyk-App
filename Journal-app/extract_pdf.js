import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const files = [
    'Gode instrukser + Edoks/Eksempel på behandlingsplan Anoreksi.pdf',
    'Gode instrukser + Edoks/Eksempel på behandlingsplan.pdf',
    'Gode instrukser + Edoks/Gennemgang.pdf'
];

async function extract() {
    for (const file of files) {
        const dataBuffer = fs.readFileSync(file);
        const data = await pdf(dataBuffer);
        const textOutput = `\n\n--- START OF ${file} ---\n${data.text}\n--- END OF ${file} ---\n\n`;
        fs.appendFileSync('pdf_texts.txt', textOutput);
        console.log(`Extracted: ${file}`);
    }
}

extract().catch(console.error);
