import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('Gode instrukser + Edoks/Bilag 1 - Henvisning og booking ECT (AUHP).pdf');

const pdfFunc = typeof pdf === 'function' ? pdf : (pdf.default || pdf);

pdfFunc(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.error(err);
});
