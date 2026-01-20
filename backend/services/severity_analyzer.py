import json
import os
from core.config import DATA_DIR

# Load severity rules
rules_path = os.path.join(DATA_DIR, "notice_rules.json")
severity_keywords = {}

if os.path.exists(rules_path):
    with open(rules_path, 'r', encoding='utf-8') as f:
        rules = json.load(f)
        severity_keywords = rules.get("severity_keywords", {})

def analyze_severity(text: str) -> str:
    """
    Analyzes notice severity based on keywords.
    Returns: 🔴 Urgent / 🟡 Action Required / 🟢 Informational
    """
    text_lower = text.lower()
    
    # Check for urgent keywords first
    urgent_keywords = severity_keywords.get("urgent", [
        "penalty", "fine", "legal action", "court", "arrest", "warrant", 
        "immediate", "deadline", "last notice", "foreclosure", "eviction"
    ])
    
    for keyword in urgent_keywords:
        if keyword in text_lower:
            return "🔴 Urgent"
    
    # Check for action required keywords
    action_keywords = severity_keywords.get("action_required", [
        "submit", "response required", "verification", "clarification", 
        "documents needed", "appear", "within days", "compliance"
    ])
    
    for keyword in action_keywords:
        if keyword in text_lower:
            return "🟡 Action Required"
    
    # Default to informational
    return "🟢 Informational"

