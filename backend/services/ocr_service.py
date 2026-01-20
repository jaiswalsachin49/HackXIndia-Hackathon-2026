import pytesseract
from PIL import Image
import io

def extract_text(file):
    image = Image.open(io.BytesIO(file.file.read()))
    text = pytesseract.image_to_string(image)
    return text
