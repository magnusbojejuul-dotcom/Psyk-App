import pdfplumber
import os

files = [
    'Gode instrukser + Edoks/Eksempel på behandlingsplan Anoreksi.pdf',
    'Gode instrukser + Edoks/Eksempel på behandlingsplan.pdf',
    'Gode instrukser + Edoks/Gennemgang.pdf'
]

with open('pdf_texts2.txt', 'w', encoding='utf-8') as f:
    for file in files:
        f.write(f"\n\n--- START OF {file} ---\n")
        try:
             with pdfplumber.open(file) as pdf:
                 for page in pdf.pages:
                     text = page.extract_text()
                     if text:
                        f.write(text + "\n")
        except Exception as e:
             f.write(f"Error extracting: {e}\n")
        f.write(f"\n--- END OF {file} ---\n\n")
        print(f"Extracted: {file}")
