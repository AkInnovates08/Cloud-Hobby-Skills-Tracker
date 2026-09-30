from pathlib import Path
from uuid import uuid4
from fastapi import UploadFile, HTTPException
import os

UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "uploads"))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MAX_BYTES = int(os.getenv("MAX_FILE_SIZE_MB", "5")) * 1024 * 1024
ALLOWED = {".png", ".jpg", ".jpeg", ".webp", ".pdf"}

async def save_upload(file: UploadFile, user_id: int) -> str:
    suffix = Path(file.filename or "").suffix.lower()
    if suffix not in ALLOWED:
        raise HTTPException(400, "Unsupported file type")
    data = await file.read()
    if len(data) > MAX_BYTES:
        raise HTTPException(400, "File is too large")
    user_dir = UPLOAD_DIR / f"user_{user_id}"
    user_dir.mkdir(parents=True, exist_ok=True)
    name = f"{uuid4().hex}{suffix}"
    path = user_dir / name
    path.write_bytes(data)
    return f"/uploads/user_{user_id}/{name}"
