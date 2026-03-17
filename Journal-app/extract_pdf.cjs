const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('Gode instrukser + Edoks/Bilag 1 - Henvisning og booking ECT (AUHP).pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.error(err);
});
