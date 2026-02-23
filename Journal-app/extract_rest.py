import os
try:
    from pypdf import PdfReader
except ImportError:
    os.system('python -m pip install pypdf')
    from pypdf import PdfReader

files = [
    'Gode instrukser + Edoks/beh-jan-2016-psykotiske-tilstande-hos-voksne.pdf',
    'Gode instrukser + Edoks/bipolar-lidelse-pixiudgave-februar-2016.pdf',
    'Gode instrukser + Edoks/psykotiske-tilstande-boern-behandlingsvejledning.pdf',
    'Gode instrukser + Edoks/rads_adhd-pixi_4.pdf',
    'Gode instrukser + Edoks/unipolar-depression-beh-og-rek-april-2015-193678.pdf'
]

for file in files:
    try:
        reader = PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        base_name = os.path.basename(file).replace('.pdf', '')
        with open(f"{base_name}_extracted.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Extracted: {file}")
    except Exception as e:
        print(f"Failed {file}: {e}")
