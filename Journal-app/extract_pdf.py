import sys
import os

try:
    import fitz  # PyMuPDF
except ImportError:
    os.system('pip install PyMuPDF')
    import fitz

def extract_pdf(pdf_path, output_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)

if __name__ == "__main__":
    pdf_file = sys.argv[1]
    out_file = "pdf_extracted.txt"
    extract_pdf(pdf_file, out_file)
    print("Extraction complete.")
