import sys
import os

try:
    from pypdf import PdfReader
except ImportError:
    os.system('python -m pip install pypdf')
    from pypdf import PdfReader

def extract_pdf(pdf_path, output_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)

if __name__ == "__main__":
    pdf_file = sys.argv[1]
    out_file = sys.argv[2] if len(sys.argv) > 2 else "pdf_extracted.txt"
    extract_pdf(pdf_file, out_file)
    print(f"Extraction complete for {pdf_file} -> {out_file}")
