from pydantic import BaseModel

class Notice(BaseModel):
    category: str
    severity: str
    explanation: str
