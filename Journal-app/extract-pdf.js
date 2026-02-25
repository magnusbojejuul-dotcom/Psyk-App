import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

async function extract() {
    let auditBuffer = fs.readFileSync('Scoringsværktøjer/8_Audit.pdf');
    let auditData = await pdf(auditBuffer);
    fs.writeFileSync('audit-text.txt', auditData.text);

    let duditBuffer = fs.readFileSync('Scoringsværktøjer/9_DUDIT Dansk version.pdf');
    let duditData = await pdf(duditBuffer);
    fs.writeFileSync('dudit-text.txt', duditData.text);

    console.log("Done extracting");
}

extract().catch(console.error);
