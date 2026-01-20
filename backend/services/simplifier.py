from core.config import LLM_PROVIDER, OPENAI_API_KEY, GOOGLE_API_KEY

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

Please provide:
1. A simple Hinglish (Hindi + English mix) explanation of what this notice means
2. Why the person received this notice
3. Clear, actionable next steps they should take
4. Any important deadlines or consequences

Keep the tone friendly and reassuring. Use common Hinglish words that everyday people understand.
Make it concise (3-4 sentences for explanation, bullet points for next steps).

Format your response like this:
**Explanation (Hinglish mein):**
[Your explanation here]

**Aapko yeh notice kyun mila:**
[Reason here]

**Next Steps (Kya karna hai):**
- [Step 1]
- [Step 2]
- [Step 3]

**Important Deadlines:**
[Any deadlines or "No immediate deadline" if none]
"""

    try:
        if LLM_PROVIDER == "openai" and OPENAI_API_KEY:
            return _simplify_with_openai(prompt)
        elif LLM_PROVIDER == "gemini" and GOOGLE_API_KEY:
            return _simplify_with_gemini(prompt)
        else:
            # Fallback to rule-based if no API key
            return _fallback_simplification(text, notice_type, severity)
    except Exception as e:
        print(f"LLM Error: {e}")
        return _fallback_simplification(text, notice_type, severity)


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
        
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        
        return response.text.strip()
    except Exception as e:
        raise Exception(f"Gemini API error: {e}")


def _fallback_simplification(text: str, notice_type: str, severity: str) -> str:
    """Fallback rule-based simplification when LLM is unavailable"""
    
    explanation = "**Explanation (Hinglish mein):**\n"
    
    if "income tax" in text.lower():
        explanation += "Yeh Income Tax department ka notice hai. Aapki tax filing ya verification related kuch action pending hai."
    elif "court" in text.lower() or "legal" in text.lower():
        explanation += "Yeh legal/court notice hai. Kisi legal matter mein aapki involvement hai ya response chahiye."
    elif "bill" in text.lower() or "payment" in text.lower():
        explanation += "Yeh payment ya bill related notice hai. Kuch payment due ho sakta hai."
    else:
        explanation += "Yeh sarkari notice hai jo aapko kuch important information ya action ke baare mein bata raha hai."
    
    explanation += "\n\n**Next Steps (Kya karna hai):**\n"
    
    if severity == "🔴 Urgent":
        explanation += "- Turant notice padho aur samjho\n"
        explanation += "- Agar deadline hai toh usse pehle action lo\n"
        explanation += "- Zarurat ho toh CA/lawyer se consult karo\n"
        explanation += "- Related documents gather karo\n"
    else:
        explanation += "- Notice ko carefully padho\n"
        explanation += "- Deadline check karo\n"
        explanation += "- Agar confusion hai toh expert advice lo\n"
        explanation += "- Time pe response do\n"
    
    explanation += "\n**Important:**\nInko ignore mat karo, time pe action lena zaroori hai."
    
    return explanation
