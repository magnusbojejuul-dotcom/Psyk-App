const fs = require('fs');
(async () => {
  const pdf = (await import('pdf-parse')).default;
  const files = [
    'Gode instrukser + Edoks/Eksempel på behandlingsplan Anoreksi.pdf',
    'Gode instrukser + Edoks/Eksempel på behandlingsplan.pdf',
    'Gode instrukser + Edoks/Gennemgang.pdf'
  ];

  for (const file of files) {
    const dataBuffer = fs.readFileSync(file);
    const data = await pdf(dataBuffer);
    const textOutput = `\n\n--- START OF ${file} ---\n${data.text}\n--- END OF ${file} ---\n\n`;
    fs.appendFileSync('pdf_texts.txt', textOutput);
    console.log(`Extracted: ${file}`);
  }
})().catch(console.error);
