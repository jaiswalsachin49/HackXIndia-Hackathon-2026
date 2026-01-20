from pydantic import BaseModel

class Scheme(BaseModel):
    name: str
    description: str
    max_income: int
