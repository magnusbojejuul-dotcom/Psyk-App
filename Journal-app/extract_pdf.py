import pdfplumber
import os

files = [
    'Gode instrukser + Edoks/farmakologisk-behandling-i-almen-praksis-af-angsttilstande_2020.pdf'
]

with open('angst_extracted.txt', 'w', encoding='utf-8') as f:
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
