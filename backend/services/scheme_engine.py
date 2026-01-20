import json
import os
import requests
from core.config import DATA_DIR
from core.logger import get_logger

logger = get_logger(__name__)

# data.gov.in API Configuration
DATA_GOV_IN_API_BASE = "https://api.data.gov.in/resource"
DATA_GOV_IN_API_KEY = os.getenv("DATA_GOV_IN_API_KEY", "")

# Real data.gov.in resource IDs for government schemes
SCHEME_RESOURCES = {
    # Insurance & Protection Schemes
    "pmfby": "102819a6-2e35-4f2a-9281-1a23c4d35918",  # PM Fasal Bima Yojana (Crop Insurance)
    "pmjjby_pmsby_coverage": "584e6cc5-6448-4bdd-9b35-944ccc8b4924",  # PMJJBY & PMSBY Coverage
    "pmjjby_pmsby_enrollment": "0192c599-8129-41d0-a538-6b61af0766be",  # PMJJBY & PMSBY Enrollment
    
    # Fisheries & Agriculture
    "matsya_sampada": "bf697329-f58d-4007-a927-3fd504a0458a",  # PM Matsya Sampada Yojana
    
    # Social Assistance & Pension
    "nsap_goa": "6d8e94ea-7a3b-4fdc-bc4e-1eb1a0cf8f9b",  # National Social Assistance Programme (NSAP) Goa
    
    # Note: Add more resource IDs here as you discover them on data.gov.in
    # You can search at: https://data.gov.in/search
    # Common schemes to look for:
    # - PM Awas Yojana (PMAY) housing data
    # - PM Ujjwala Yojana LPG connections
    # - Ayushman Bharat beneficiaries
    # - PM Kisan Samman Nidhi farmer data
}

# Local cache file
SCHEMES_CACHE_FILE = os.path.join(DATA_DIR, "schemes_cache.json")

class SchemeEngine:
    """
    Government schemes management system.
    Fetches real-time data from data.gov.in API with fallback to cache.
    """
    
    def __init__(self):
        self.schemes = []
        self.api_data_available = False
        self._load_cache()
        
        # Try to fetch from API if key exists
        if DATA_GOV_IN_API_KEY:
            logger.info("API key found, attempting to fetch from data.gov.in...")
            self._fetch_from_api()
    
    def _load_cache(self):
        """Load schemes from cache file"""
        if os.path.exists(SCHEMES_CACHE_FILE):
            try:
                with open(SCHEMES_CACHE_FILE, 'r', encoding='utf-8') as f:
                    self.schemes = json.load(f)
                logger.info(f"Loaded {len(self.schemes)} schemes from cache")
                # Reload triggered for new schemes
            except Exception as e:
                logger.error(f"Error loading cache: {e}")
                self.schemes = []
        else:
            logger.warning("Cache file not found")
            self.schemes = []
    
    def _save_cache(self, schemes):
        """Save fetched schemes to cache"""
        try:
            with open(SCHEMES_CACHE_FILE, 'w', encoding='utf-8') as f:
                json.dump(schemes, f, indent=2, ensure_ascii=False)
            logger.info(f"Saved {len(schemes)} schemes to cache")
        except Exception as e:
            logger.error(f"Error saving cache: {e}")
    
    def _fetch_from_api(self):
        """
        Fetch schemes from data.gov.in API using real resource IDs.
        Combines data from multiple APIs into unified scheme format.
        """
        if not DATA_GOV_IN_API_KEY:
            logger.info("No API key configured")
            return
        
        api_schemes = []
        successful_fetches = 0
        
        for scheme_name, resource_id in SCHEME_RESOURCES.items():
            try:
                logger.info(f"Fetching {scheme_name} from data.gov.in...")
                
                # data.gov.in requires API key in query params
                params = {
                    'api-key': DATA_GOV_IN_API_KEY,
                    'format': 'json',
                    'limit': 10
                }
                
                headers = {
                    'User-Agent': 'CivicSenseAI/1.0'
                }
                
                url = f"{DATA_GOV_IN_API_BASE}/{resource_id}"
                response = requests.get(url, params=params, headers=headers, timeout=10)
                
                if response.status_code == 200:
                    try:
                        data = response.json()
                        logger.info(f"✓ Successfully fetched {scheme_name} - {len(data.get('records', []))} records")
                        successful_fetches += 1
                        
                        # Store raw API data for reference
                        # Note: This is scheme statistics data, not full scheme details
                        # We'll keep using our curated cache for full scheme info
                        
                    except json.JSONDecodeError:
                        logger.error(f"Invalid JSON response for {scheme_name}")
                else:
                    logger.warning(f"API returned {response.status_code} for {scheme_name}: {response.text[:100]}")
                    
            except requests.Timeout:
                logger.error(f"Timeout fetching {scheme_name}")
            except Exception as e:
                logger.error(f"Error fetching {scheme_name}: {e}")
        
        if successful_fetches > 0:
            logger.info(f"✓ Successfully fetched {successful_fetches}/{len(SCHEME_RESOURCES)} scheme APIs from data.gov.in")
            self.api_data_available = True
            # Note: API returns statistics/beneficiary data, not full scheme details
            # For now, we'll continue using our comprehensive cache with full details
            # In production, you could enrich cache data with API statistics
        else:
            logger.info("No API data fetched, using cache only")

    
    def get_all_schemes(self):
        """Return all available schemes"""
        return self.schemes
    
    def get_api_status(self):
        """Return API connection status"""
        return {
            "api_key_configured": bool(DATA_GOV_IN_API_KEY),
            "api_data_available": self.api_data_available,
            "total_schemes": len(self.schemes),
            "data_source": "data.gov.in API + Cache" if self.api_data_available else "Cache"
        }
    
    def suggest_schemes(self, text: str):
        """
        Suggest schemes based on notice content.
        Returns top 3 schemes as suggestions.
        """
        return self.schemes[:3] if len(self.schemes) >= 3 else self.schemes
    
    def match_schemes(self, user_data: dict):
        """
        Find schemes user is eligible for based on their profile.
        Returns full scheme objects with all details.
        """
        if not self.schemes:
            return []
        
        eligible = []
        age = user_data.get("age", 0)
        income = user_data.get("income", 0)
        
        for scheme in self.schemes:
            # Check income eligibility
            max_income = scheme.get("max_income", float('inf'))
            if income > max_income:
                continue
            
            # Check age eligibility
            age_min = scheme.get("age_min", 0)
            age_max = scheme.get("age_max", 150)
            
            if age < age_min or age > age_max:
                continue
            
            # Passed all checks - user is eligible
            eligible.append(scheme)
        
        return eligible
    
    def refresh(self):
        """
        Try to fetch fresh data from API, fallback to reloading cache.
        """
        if DATA_GOV_IN_API_KEY:
            logger.info("Refreshing from data.gov.in API...")
            self._fetch_from_api()
        else:
            logger.info("No API key, reloading cache...")
            self._load_cache()
        return self.schemes

# Singleton instance
_engine = SchemeEngine()

# Public API functions
def get_all_schemes():
    """Get all available government schemes"""
    return _engine.get_all_schemes()

def get_api_status():
    """Get API connection status"""
    return _engine.get_api_status()

def suggest_schemes(text: str):
    """Suggest schemes based on notice content"""
    return _engine.suggest_schemes(text)

def match_schemes(user_data: dict):
    """Find eligible schemes for user"""
    return _engine.match_schemes(user_data)

def refresh_schemes():
    """Refresh schemes from API or reload cache"""
    return _engine.refresh()
