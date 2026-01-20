from fastapi import FastAPI
from api.v1.router import api_router

app = FastAPI(
    title="CivicSense AI",
    description="Understand government & legal notices and discover citizen entitlements",
    version="1.0.0"
)

app.include_router(api_router)

@app.get("/")
def root():
    return {
        "message": "CivicSense AI Backend is running"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
