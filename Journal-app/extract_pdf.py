import sys
import PyPDF2

def extract_text(pdf_path, txt_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
            
    with open(txt_path, 'w', encoding='utf-8') as out_file:
        out_file.write(text)

if __name__ == "__main__":
    extract_text(sys.argv[1], sys.argv[2])
