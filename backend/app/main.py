from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import os
from .database import Base, engine
from .routers import auth, profile, skills, goals, practice, posts, analytics

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Online Hobby & Skills Tracker API", version="1.0.0")

origins = [x.strip() for x in os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

Path(os.getenv("UPLOAD_DIR", "uploads")).mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=os.getenv("UPLOAD_DIR", "uploads")), name="uploads")

app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(skills.router)
app.include_router(goals.router)
app.include_router(practice.router)
app.include_router(posts.router)
app.include_router(analytics.router)

@app.get("/")
def root():
    return {"status":"ok","service":"Online Hobby & Skills Tracker API"}

@app.get("/health")
def health():
    return {"status":"healthy"}
