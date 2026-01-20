from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.scheme_engine import match_schemes, get_all_schemes, refresh_schemes, get_api_status
from core.logger import get_logger

router = APIRouter()
logger = get_logger(__name__)

class SchemeRequest(BaseModel):
    age: int
    income: int
    occupation: str
    state: str
    category: str

@router.get("/schemes/status")
def api_status():
    """
    Get API connection status and data source information.
    Shows if data.gov.in API is connected.
    """
    try:
        status = get_api_status()
        return status
    except Exception as e:
        logger.error(f"Error getting API status: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Error retrieving API status"
        )

@router.get("/schemes")
def list_all_schemes():
    """
    Get all available government schemes.
    Frontend can use this to display full scheme catalog.
    """
    try:
        all_schemes = get_all_schemes()
        logger.info(f"Returning {len(all_schemes)} schemes")
        return {
            "schemes": all_schemes,
            "total": len(all_schemes)
        }
    except Exception as e:
        logger.error(f"Error fetching schemes: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while fetching schemes."
        )

@router.post("/find-schemes")
def find_schemes(data: SchemeRequest):
    """
    Find schemes user is eligible for based on their profile.
    Returns full scheme objects with name, description, etc.
    """
    try:
        logger.info(f"Finding schemes for: age={data.age}, income={data.income}")
        
        # Validate input
        if data.age < 0 or data.age > 120:
            raise HTTPException(status_code=400, detail="Invalid age")
        if data.income < 0:
            raise HTTPException(status_code=400, detail="Invalid income")
        
        schemes = match_schemes(data.dict())
        
        logger.info(f"Found {len(schemes)} eligible schemes")
        
        return {
            "eligible_schemes": schemes,
            "total": len(schemes)
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error finding schemes: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while finding schemes. Please try again."
        )

@router.get("/schemes/refresh")
def refresh_all_schemes():
    """
    Reload schemes from data file.
    Useful after manual updates to schemes database.
    """
    try:
        schemes = refresh_schemes()
        logger.info(f"Reloaded {len(schemes)} schemes")
        return {
            "message": "Schemes reloaded successfully",
            "total": len(schemes)
        }
    except Exception as e:
        logger.error(f"Error reloading schemes: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while reloading schemes."
        )

