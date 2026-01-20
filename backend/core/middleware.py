from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
from utils.auth import decode_access_token
from core.database import db
from models.user import UserInDB
from bson import ObjectId

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> UserInDB:
    """
    Dependency to get the current authenticated user from JWT token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token = credentials.credentials
    token_data = decode_access_token(token)
    
    if token_data is None or token_data.email is None:
        raise credentials_exception

    # Get user from database
    database = db.get_db()
    if database is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable"
        )

    user_doc = await database.users.find_one({"email": token_data.email})
    
    if user_doc is None:
        raise credentials_exception

    # Convert MongoDB document to UserInDB
    user = UserInDB(
        id=str(user_doc["_id"]),
        email=user_doc["email"],
        full_name=user_doc["full_name"],
        password_hash=user_doc["password_hash"],
        phone=user_doc.get("phone"),
        dob=user_doc.get("dob"),
        gender=user_doc.get("gender"),
        address=user_doc.get("address"),
        created_at=user_doc["created_at"],
        updated_at=user_doc["updated_at"]
    )

    return user

async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False))
) -> Optional[UserInDB]:
    """
    Optional authentication - returns None if no token provided
    """
    if credentials is None:
        return None
    
    try:
        return await get_current_user(credentials)
    except HTTPException:
        return None
