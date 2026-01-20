import pytesseract
from PIL import Image
import io
import PyPDF2
from core.logger import get_logger

logger = get_logger(__name__)

def extract_text(file) -> str:
    """
    Extract text from uploaded file (image or PDF).
    Supports: JPG, PNG, PDF
    """
    filename = file.filename.lower()
    
    try:
        logger.info(f"Extracting text from: {filename}")
        
        if filename.endswith('.pdf'):
            text = _extract_from_pdf(file)
        else:
            text = _extract_from_image(file)
        
        logger.info(f"Extracted {len(text)} characters from {filename}")
        return text
        
    except Exception as e:
        logger.error(f"OCR Error for {filename}: {str(e)}")
        raise Exception(f"Failed to extract text: {str(e)}")


def _extract_from_image(file) -> str:
    """Extract text from image using Tesseract OCR"""
    try:
        # Read file bytes
        file_bytes = file.file.read()
        
        # Reset file pointer for potential re-reads
        file.file.seek(0)
        
        # Open image
        image = Image.open(io.BytesIO(file_bytes))
        
        # Convert to RGB if necessary (some images might be RGBA or other formats)
        if image.mode not in ('L', 'RGB'):
            image = image.convert('RGB')
        
        # Extract text using Tesseract
        text = pytesseract.image_to_string(image, lang='eng')
        
        extracted_text = text.strip()
        logger.info(f"OCR extracted {len(extracted_text)} characters from image")
        
        return extracted_text
        
    except pytesseract.TesseractNotFoundError:
        logger.error("Tesseract not found. Please install tesseract-ocr.")
        raise Exception("Server configuration error: Tesseract OCR is not installed. Please ask the administrator to install 'tesseract' on the backend server.")
    except Exception as e:
        logger.error(f"Image OCR failed: {str(e)}")
        # Check for common "command not found" type errors that might come as generic exceptions
        if "No such file or directory: 'tesseract'" in str(e) or "command not found" in str(e):
             raise Exception("Server configuration error: Tesseract OCR is not installed.")
        raise


def _extract_from_pdf(file) -> str:
    """Extract text from PDF document"""
    try:
        # Read file bytes
        file_bytes = file.file.read()
        
        # Reset file pointer
        file.file.seek(0)
        
        # Create PDF reader
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_bytes))
        
        logger.info(f"PDF has {len(pdf_reader.pages)} pages")
        
        text = ""
        for i, page in enumerate(pdf_reader.pages):
            page_text = page.extract_text()
            text += page_text + "\n"
            logger.debug(f"Page {i+1}: extracted {len(page_text)} characters")
        
        extracted_text = text.strip()
        logger.info(f"PDF extraction: {len(extracted_text)} total characters")
        
        return extracted_text
        
    except Exception as e:
        logger.error(f"PDF extraction failed: {str(e)}")
        raise

