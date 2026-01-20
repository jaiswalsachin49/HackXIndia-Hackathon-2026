import json
import os

# Use relative path or setup proper config. 
# Assuming running from backend/
DATA_PATH = "data/schemes.json"

schemes = []
if os.path.exists(DATA_PATH):
    with open(DATA_PATH) as f:
        schemes = json.load(f)

def suggest_schemes(text: str):
    return [scheme["name"] for scheme in schemes[:2]]

def match_schemes(user_data: dict):
    eligible = []
    # Safeguard if no schemes loaded
    if not schemes:
        return []
        
    for scheme in schemes:
        if user_data.get("income", 0) <= scheme.get("max_income", 0):
            eligible.append(scheme["name"])
    return eligible
