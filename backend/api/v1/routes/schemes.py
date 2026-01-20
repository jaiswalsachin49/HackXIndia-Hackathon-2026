from fastapi import APIRouter
from pydantic import BaseModel
from services.scheme_engine import match_schemes

router = APIRouter()

class SchemeRequest(BaseModel):
    age: int
    income: int
    occupation: str
    state: str
    category: str

@router.post("/find-schemes")
def find_schemes(data: SchemeRequest):
    schemes = match_schemes(data.dict())
    return {
        "eligible_schemes": schemes
    }
