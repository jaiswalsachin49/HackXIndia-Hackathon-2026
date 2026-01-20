def classify_notice(text: str):
    if "income tax" in text.lower():
        return "Income Tax Notice"
    if "court" in text.lower():
        return "Legal / Court Notice"
    return "General Government Notice"
