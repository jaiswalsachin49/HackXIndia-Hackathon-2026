from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from services.simplifier import _simplify_with_groq
from core.config import GROQ_API_KEY
import json

router = APIRouter(prefix="/api/v1", tags=["Translation"])

class TranslationRequest(BaseModel):
    text: str
    target_language: str

class TranslationResponse(BaseModel):
    translated_text: str

@router.post("/translate", response_model=TranslationResponse)
async def translate_text(request: TranslationRequest):
    """
    Translate text using Groq LLM
    """
    try:
        if not request.text:
            return TranslationResponse(translated_text="")

        prompt = f"""Translate the following text to {request.target_language}. 
        Maintain the tone and formatting. 
        Return ONLY the translated text, no introductory or concluding remarks.
        
        Text to translate:
        {request.text}
        """

        # Reuse the Groq helper but we need to bypass the strict JSON constraint of _simplify_with_groq 
        # or adapt it. Since _simplify_with_groq enforces JSON output matching a specific schema,
        # we should probably instantiate a direct client here or make a generic helper.
        # For speed, let's use a direct client call similar to _simplify_with_groq but for plain text/translation.
        
        from groq import Groq
        client = Groq(api_key=GROQ_API_KEY)
        
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": f"You are a professional translator. Translate content to {request.target_language} accurately."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1000
        )
        
        translated = response.choices[0].message.content.strip()
        
        # Cleanup if it returns quotes
        if translated.startswith('"') and translated.endswith('"'):
            translated = translated[1:-1]
            
        return TranslationResponse(translated_text=translated)

    except Exception as e:
        print(f"Translation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Translation service failed"
        )
