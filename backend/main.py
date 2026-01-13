from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import API routes
from api.v1.health import router as health_router
from api.v1.auth import router as auth_router
from api.v1.tasks import router as tasks_router

# Create FastAPI app
app = FastAPI(title="Phase II Todo Backend API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000"),
                   os.getenv("CORS_ALLOW_ORIGINS", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(health_router, prefix="/health", tags=["health"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(tasks_router, prefix="/api/v1/tasks", tags=["tasks"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Phase II Todo Backend API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 5000)),
        reload=True
    )