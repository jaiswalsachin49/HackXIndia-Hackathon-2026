from fastapi import FastAPI
from api.v1.router import api_router
from api import auth
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os

from contextlib import asynccontextmanager
from core.database import db

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    db.connect()
    yield
    # Shutdown
    db.close()

app = FastAPI(
    title="CivicSense AI",
    description="Understand government & legal notices and discover citizen entitlements",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from api.v1.routes import documents
from api.v1.routes import translate

# Include routers
app.include_router(api_router)
app.include_router(auth.router)
app.include_router(documents.router)
app.include_router(translate.router)

# Mount uploads directory
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def root():
    return {
        "message": "CivicSense AI Backend is running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
