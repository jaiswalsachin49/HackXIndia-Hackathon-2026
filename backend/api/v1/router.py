from fastapi import APIRouter
from api.v1.routes import upload, schemes, health

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(upload.router, tags=["Notice Processing"])
api_router.include_router(schemes.router, tags=["Scheme Search"])
api_router.include_router(health.router, tags=["Health"])
