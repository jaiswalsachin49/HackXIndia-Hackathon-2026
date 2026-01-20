from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.scheme_engine import match_schemes
from core.logger import get_logger

router = APIRouter()
logger = get_logger(__name__)

class SchemeRequest(BaseModel):
    age: int
    income: int
    occupation: str
    state: str
    category: str

@router.post("/find-schemes")
def find_schemes(data: SchemeRequest):
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
            "eligible_schemes": schemes
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error finding schemes: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while finding schemes. Please try again."
        )
