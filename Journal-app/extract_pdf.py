import pdfplumber
import sys

# Extract text from the new Angst PDF to provide accurate data for the app
pdf_path = "C:/Users/magnu/Desktop/Apps/Psyk App/Journal-app/public/pdf/national-klinisk-retningslinje-for-behandling-af-moderat-og-svaer-bulimi.pdf"
output_txt_path = "C:/Users/magnu/Desktop/Apps/Psyk App/Journal-app/bulimi_extracted.txt"

def extract_text(pdf_path, output_path):
    print(f"Extracting text from {pdf_path}...")
    try:
        with pdfplumber.open(pdf_path) as pdf:
            with open(output_path, "w", encoding="utf-8") as out_file:
                out_file.write(f"--- START OF {pdf_path} ---\n")
                for page in pdf.pages:
                    text = page.extract_text()
                    if text:
                        out_file.write(text + "\n")
        print(f"Extraction complete. Text saved to {output_path}")
    except Exception as e:
        print(f"Error extracting text: {e}", file=sys.stderr)

if __name__ == "__main__":
    extract_text(pdf_path, output_txt_path)
