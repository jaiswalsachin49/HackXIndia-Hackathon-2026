import json
import os
from core.config import DATA_DIR

# Load notice classification rules
rules_path = os.path.join(DATA_DIR, "notice_rules.json")
notice_rules = {}

if os.path.exists(rules_path):
    with open(rules_path, 'r', encoding='utf-8') as f:
        notice_rules = json.load(f)

def classify_notice(text: str) -> str:
    """
    Classifies notice type based on keywords and patterns.
    Returns the most likely notice category.
    """
    if not notice_rules:
        return "General Government Notice"
    
    text_lower = text.lower()
    
    # Score each category based on keyword matches
    category_scores = {}
    
    for category, data in notice_rules.items():
        if category == "severity_keywords":
            continue  # Skip severity keywords
            
        keywords = data.get("keywords", [])
        score = sum(1 for keyword in keywords if keyword in text_lower)
        
        if score > 0:
            category_scores[category] = score
    
    # Return the category with highest score
    if category_scores:
        best_category = max(category_scores, key=category_scores.get)
        types = notice_rules[best_category].get("types", [])
        
        # Try to match specific type within category
        for notice_type in types:
            if any(word in text_lower for word in notice_type.lower().split()):
                return notice_type
        
        # Return first type if no specific match
        return types[0] if types else "Government Notice"
    
    return "General Government Notice"

