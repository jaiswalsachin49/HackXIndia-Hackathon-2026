from fastapi import APIRouter, UploadFile, File
from services.ocr_service import extract_text
from services.notice_classifier import classify_notice
from services.severity_analyzer import analyze_severity
from services.simplifier import simplify_notice
from services.scheme_engine import suggest_schemes

router = APIRouter()

@router.post("/upload-notice")
async def upload_notice(file: UploadFile = File(...)):
    text = extract_text(file)
    
    notice_type = classify_notice(text)
    severity = analyze_severity(text)
    explanation = simplify_notice(text)
    schemes = suggest_schemes(text)

    return {
        "notice_type": notice_type,
        "severity": severity,
        "explanation": explanation,
        "scheme_suggestions": schemes
    }
