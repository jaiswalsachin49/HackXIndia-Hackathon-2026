def analyze_severity(text: str):
    keywords = ["penalty", "fine", "legal action", "court"]
    for word in keywords:
        if word in text.lower():
            return "🔴 Urgent"
    return "🟡 Needs Attention"
