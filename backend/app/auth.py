import hashlib
import hmac
import secrets
from datetime import datetime, timedelta
from jose import jwt
import os

ALGORITHM = "HS256"
SECRET_KEY = os.getenv("SECRET_KEY", "local-development-secret")
TOKEN_MINUTES = 60 * 24

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 120_000)
    return f"{salt.hex()}${digest.hex()}"

def verify_password(password: str, stored: str) -> bool:
    try:
        salt_hex, digest_hex = stored.split("$", 1)
        digest = hashlib.pbkdf2_hmac("sha256", password.encode(), bytes.fromhex(salt_hex), 120_000)
        return hmac.compare_digest(digest.hex(), digest_hex)
    except Exception:
        return False

def create_token(user_id: int) -> str:
    expires = datetime.utcnow() + timedelta(minutes=TOKEN_MINUTES)
    return jwt.encode({"sub": str(user_id), "exp": expires}, SECRET_KEY, algorithm=ALGORITHM)
