from core.config import LLM_PROVIDER, OPENAI_API_KEY, GOOGLE_API_KEY, GROQ_API_KEY

def simplify_notice(text: str, notice_type: str = "", severity: str = ""):
    """
    Converts government/legal notice into simple Hinglish explanation
    with actionable next steps using LLM.
    """
    
    prompt = f"""You are an AI assistant helping Indian citizens understand government and legal notices.

Notice Text:
{text}

Notice Type: {notice_type}
Severity: {severity}

Please analyze the text strictly.

CRITICAL INSTRUCTION: FIRST, VALIDATE IF THIS IS A GOVERNMENT/LEGAL NOTICE.
If the text is a Resume, CV, Personal Photo, Homework, or clearly NOT a government notice:
Return "is_notice": false, and set "english" and "hinglish" values explaining that this is not a valid notice.

If it IS a valid notice, set "is_notice": true and provide the following:
1. A simple Hinglish explanation
2. Reason for receiving
3. Next steps
4. Deadlines

Format your response as a JSON object with these keys:
- "is_notice": boolean
- "english": object with keys "Explanation", "Reason", "Next Steps", "Important Deadlines"
- "hinglish": object with keys "Explanation", "Reason", "Next Steps", "Important Deadlines"

For INVALID documents (is_notice: false):
- "english": "This appears to be a [Document Type], which is not a processed government notice. Please upload a valid government or legal notice."
- "hinglish": "Yeh ek [Document Type] lag raha hai, jo ki sarkari notice nahi hai. Kripya sahi notice upload karein."
"""

    import json
    
    explanation = None
    try:
        # Try API first (in priority order), fallback if it fails
        if LLM_PROVIDER == "groq" and GROQ_API_KEY:
            # Groq now returns JSON string
            json_str = _simplify_with_groq(prompt)
            try:
                explanation = json.loads(json_str)
            except:
                # Fallback if valid JSON not returned
                explanation = {"hinglish": json_str, "english": "English summary not available via API."}
                
        elif LLM_PROVIDER == "gemini" and GOOGLE_API_KEY:
            text_resp = _simplify_with_gemini(prompt)
            explanation = {"hinglish": text_resp, "english": "English summary available in Hinglish section."}
            
        elif LLM_PROVIDER == "openai" and OPENAI_API_KEY:
            text_resp = _simplify_with_openai(prompt)
            explanation = {"hinglish": text_resp, "english": "English summary available in Hinglish section."}
            
        else:
            # Fallback to rule-based if no API key
            fallback_text = _fallback_simplification(text, notice_type, severity)
            explanation = {"hinglish": fallback_text, "english": "This is a government notice. Please review the details carefully."}
            
        return explanation
        
    except Exception as e:
        print(f"LLM Error: {e}")
        # Auto-fallback if API fails
        fallback_text = _fallback_simplification(text, notice_type, severity)
        return {"hinglish": fallback_text, "english": "This is a government notice. Please review the details carefully."}


def _simplify_with_openai(prompt: str) -> str:
    """Use OpenAI API for simplification"""
    try:
        from openai import OpenAI
        client = OpenAI(api_key=OPENAI_API_KEY)
        
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that explains government notices in simple Hinglish."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise Exception(f"OpenAI API error: {e}")


def _simplify_with_gemini(prompt: str) -> str:
    """Use Google Gemini API for simplification"""
    try:
        import google.generativeai as genai
        genai.configure(api_key=GOOGLE_API_KEY)
        
        # Use latest stable Gemini model
        model = genai.GenerativeModel('models/gemini-2.0-flash')
        response = model.generate_content(prompt)
        
        return response.text.strip()
    except Exception as e:
        raise Exception(f"Gemini API error: {e}")


def _simplify_with_groq(prompt: str) -> str:
    """Use Groq API with Mixtral for simplification - FAST & FREE!"""
    try:
        from groq import Groq
        
        client = Groq(api_key=GROQ_API_KEY)
        
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",  # Current supported model
            messages=[
                {"role": "system", "content": "You are a helpful assistant. You must provide your response in valid JSON format with two keys: 'english' and 'hinglish'."},
                {"role": "user", "content": prompt + "\n\nProvide the response as a JSON object with 'english' and 'hinglish' fields containing the respective explanations."}
            ],
            temperature=0.3,
            max_tokens=1000,
            response_format={"type": "json_object"}
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise Exception(f"Groq API error: {e}")



def _fallback_simplification(text: str, notice_type: str, severity: str) -> str:
    """Fallback rule-based simplification - extracts key info from actual text"""
    
    text_lower = text.lower()
    explanation = "**Explanation (Hinglish mein):**\n"
    
    # Context-aware explanations based on actual content
    if "income tax" in text_lower or "tax return" in text_lower:
        explanation += "Yeh Income Tax department ka notice hai. "
        if "verification" in text_lower:
            explanation += "Aapki tax return verify karni hai. "
        if "document" in text_lower:
            explanation += "Kuch documents submit karne honge. "
        explanation += "Time pe action nahi liya toh penalty lag sakti hai."
        
    elif "court" in text_lower or "summons" in text_lower:
        explanation += "Yeh court notice hai. Court mein haazir hona hoga. Lawyer se turant consult karein."
        
    elif "traffic" in text_lower or "challan" in text_lower:
        explanation += "Yeh traffic challan hai. Fine jaldi pay karo varna amount badh sakta hai."
        
    elif "property" in text_lower and "tax" in text_lower:
        explanation += "Yeh property tax notice hai. Municipal tax pay karna hoga."
        
    elif "regulation" in text_lower or "compliance" in text_lower:
        explanation += "Yeh naye rules/regulations ke baare mein hai. Businesses ko compliance ke liye systems update karne honge."
        
    elif "waste" in text_lower and "management" in text_lower:
        explanation += "Yeh waste management ke naye rules ke baare mein hai. Businesses ko waste segregation properly karna hoga."
        
    else:
        explanation += f"Yeh {notice_type} ka sarkari notice hai. "
        # Extract first meaningful line
        lines = [l.strip() for l in text.split('\n') if len(l.strip()) > 20]
        if lines:
            explanation += f"Main point: {lines[0][:80]}..."
    
    explanation += "\n\n**Next Steps (Kya karna hai):**\n"
    
    if severity == "🔴 Urgent":
        explanation += "- Turant notice ko pura padho\n- Deadline check karo\n- Documents collect karo\n- Expert se help lo\n- Time pe action lo\n"
    else:
        explanation += "- Notice carefully padho\n- Records maintain karo\n- Zarurat ho toh expert advice lo\n"
    
    explanation += "\n**Important:** Sarkari notices ignore mat karo, time pe action lena zaroori hai.\n"
    return explanation
