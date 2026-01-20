from fastapi import APIRouter, HTTPException, status, Depends
from models.user import UserCreate, UserResponse, Token, PasswordChange, UserUpdate
from utils.auth import verify_password, get_password_hash, create_access_token
from core.middleware import get_current_user
from core.database import db
from datetime import datetime
from bson import ObjectId
from core.logger import get_logger

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])
logger = get_logger(__name__)

@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate):
    """
    Register a new user and return access token
    """
    database = db.get_db()
    if database is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable"
        )

    # Check if user already exists
    existing_user = await database.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    # Create user document
    user_doc = {
        "email": user_data.email,
        "full_name": user_data.full_name,
        "password_hash": get_password_hash(user_data.password),
        "phone": user_data.phone,
        "dob": user_data.dob,
        "gender": user_data.gender,
        "address": user_data.address,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }

    # Insert user
    result = await database.users.insert_one(user_doc)
    logger.info(f"New user registered: {user_data.email}")

    # Create access token
    access_token = create_access_token(data={"sub": user_data.email})

    return Token(access_token=access_token)

@router.post("/login", response_model=Token)
async def login(email: str, password: str):
    """
    Login user and return access token
    """
    database = db.get_db()
    if database is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable"
        )

    # Find user
    user_doc = await database.users.find_one({"email": email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Verify password
    if not verify_password(password, user_doc["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    # Create access token
    access_token = create_access_token(data={"sub": email})
    logger.info(f"User logged in: {email}")

    return Token(access_token=access_token)

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user = Depends(get_current_user)):
    """
    Get current user profile
    """
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        phone=current_user.phone,
        dob=current_user.dob,
        gender=current_user.gender,
        address=current_user.address,
        created_at=current_user.created_at
    )

@router.put("/profile", response_model=UserResponse)
async def update_profile(
    profile_data: UserUpdate,
    current_user = Depends(get_current_user)
):
    """
    Update user profile
    """
    database = db.get_db()
    if database is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable"
        )

    # Build update document
    update_data = {k: v for k, v in profile_data.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No fields to update"
        )

    update_data["updated_at"] = datetime.utcnow()

    # Update user
    await database.users.update_one(
        {"_id": ObjectId(current_user.id)},
        {"$set": update_data}
    )

    # Fetch updated user
    updated_user = await database.users.find_one({"_id": ObjectId(current_user.id)})
    logger.info(f"User profile updated: {current_user.email}")

    return UserResponse(
        id=str(updated_user["_id"]),
        email=updated_user["email"],
        full_name=updated_user["full_name"],
        phone=updated_user.get("phone"),
        dob=updated_user.get("dob"),
        gender=updated_user.get("gender"),
        address=updated_user.get("address"),
        created_at=updated_user["created_at"]
    )

@router.put("/password")
async def change_password(
    password_data: PasswordChange,
    current_user = Depends(get_current_user)
):
    """
    Change user password
    """
    database = db.get_db()
    if database is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable"
        )

    # Verify current password
    if not verify_password(password_data.current_password, current_user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Current password is incorrect"
        )

    # Update password
    new_password_hash = get_password_hash(password_data.new_password)
    await database.users.update_one(
        {"_id": ObjectId(current_user.id)},
        {"$set": {
            "password_hash": new_password_hash,
            "updated_at": datetime.utcnow()
        }}
    )

    logger.info(f"Password changed for user: {current_user.email}")

    return {"message": "Password updated successfully"}

@router.post("/logout")
async def logout(current_user = Depends(get_current_user)):
    """
    Logout user (client should remove token)
    """
    logger.info(f"User logged out: {current_user.email}")
    return {"message": "Logged out successfully"}
