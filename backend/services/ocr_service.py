import pytesseract
from PIL import Image
import io
import PyPDF2

def extract_text(file) -> str:
    """
    Extract text from uploaded file (image or PDF).
    Supports: JPG, PNG, PDF
    """
    filename = file.filename.lower()
    
    try:
        if filename.endswith('.pdf'):
            # Extract text from PDF
            return _extract_from_pdf(file)
        else:
            # Extract text from image using OCR
            return _extract_from_image(file)
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""


def _extract_from_image(file) -> str:
    """Extract text from image using Tesseract OCR"""
    image = Image.open(io.BytesIO(file.file.read()))
    text = pytesseract.image_to_string(image)
    return text.strip()


def _extract_from_pdf(file) -> str:
    """Extract text from PDF document"""
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(file.file.read()))
    
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() + "\n"
    
    return text.strip()
