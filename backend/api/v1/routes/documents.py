from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from models.document import DocumentCreate, DocumentResponse
from core.middleware import get_current_user
from core.database import db
from datetime import datetime
from bson import ObjectId
from core.logger import get_logger

router = APIRouter(prefix="/api/v1/documents", tags=["Documents"])
logger = get_logger(__name__)

@router.post("/save", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def save_document(
    doc_data: DocumentCreate,
    current_user = Depends(get_current_user)
):
    """
    Save an analyzed document for the current user
    """
    database = db.get_db()
    if database is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable"
        )

    # Create document
    doc_dict = doc_data.dict()
    doc_dict.update({
        "user_id": str(current_user.id),
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    })

    # Insert into database
    result = await database.documents.insert_one(doc_dict)
    
    # Return response with generated ID
    return DocumentResponse(
        id=str(result.inserted_id),
        **doc_dict
    )

@router.get("/history", response_model=List[DocumentResponse])
async def get_document_history(
    current_user = Depends(get_current_user)
):
    """
    Get all saved documents for the current user
    """
    database = db.get_db()
    if database is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable"
        )

    # Fetch documents sorted by date (newest first)
    cursor = database.documents.find({"user_id": str(current_user.id)}).sort("created_at", -1)
    documents = []
    
    async for doc in cursor:
        documents.append(DocumentResponse(
            id=str(doc["_id"]),
            filename=doc["filename"],
            notice_type=doc.get("notice_type"),
            severity=doc.get("severity"),
            explanation=doc["explanation"],
            metadata=doc.get("metadata"),
            created_at=doc["created_at"]
        ))
    
    return documents

@router.delete("/{doc_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_document(
    doc_id: str,
    current_user = Depends(get_current_user)
):
    """
    Delete a saved document
    """
    database = db.get_db()
    if database is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection unavailable"
        )

    # Check validity of ObjectId
    if not ObjectId.is_valid(doc_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid document ID"
        )

    # Delete document ensuring it belongs to current user
    result = await database.documents.delete_one({
        "_id": ObjectId(doc_id),
        "user_id": str(current_user.id)
    })

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found or access denied"
        )
    
    return None
