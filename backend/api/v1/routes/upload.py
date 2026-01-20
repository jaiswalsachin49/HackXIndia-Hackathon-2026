from fastapi import APIRouter, UploadFile, File, HTTPException
from services.ocr_service import extract_text
from services.notice_classifier import classify_notice
from services.severity_analyzer import analyze_severity
from services.simplifier import simplify_notice
from services.scheme_engine import suggest_schemes
from core.logger import get_logger

router = APIRouter()
logger = get_logger(__name__)

@router.post("/upload-notice")
async def upload_notice(file: UploadFile = File(...)):
    """
    Upload and analyze a government/legal notice.
    Accepts PDF or image files.
    """
    try:
        logger.info(f"Processing file: {file.filename}")
        
        # Validate file type
        allowed_types = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=400, 
                detail="Invalid file type. Please upload JPG, PNG, or PDF."
            )
        
        text = extract_text(file)
        
        if not text or len(text.strip()) < 10:
            raise HTTPException(
                status_code=400,
                detail="Could not extract sufficient text from the document. Please ensure the image is clear."
            )
        
        notice_type = classify_notice(text)
        severity = analyze_severity(text)
        explanation = simplify_notice(text, notice_type, severity)
        schemes = suggest_schemes(text)
        
        logger.info(f"Successfully processed notice: {notice_type}")

        return {
            "notice_type": notice_type,
            "severity": severity,
            "explanation": explanation,
            "scheme_suggestions": schemes
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing notice: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing the notice. Please try again."
        )

