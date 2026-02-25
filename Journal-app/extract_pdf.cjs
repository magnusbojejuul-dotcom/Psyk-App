const fs = require('fs');
const pdf = require('pdf-parse');

(async () => {
  const files = [
    'rusmiddelbehandling/Benzodiazepinnedtrapning.pdf',
    'rusmiddelbehandling/nkr-alkoholbehandling.pdf',
    'rusmiddelbehandling/vejledning-laegelig-substitutionsbehandling-opioidafhaengighed.pdf'
  ];

  for (const file of files) {
    try {
      const dataBuffer = fs.readFileSync(file);
      const data = await pdf(dataBuffer);
      fs.writeFileSync(file + '.txt', data.text);
      console.log(`Extracted: ${file}`);
    } catch (e) {
      console.error('Error on ' + file, e.message);
    }
  }
})().catch(console.error);
