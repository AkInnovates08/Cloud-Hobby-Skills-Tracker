from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import User
from ..schemas import RegisterRequest, LoginRequest, UserOut
from ..auth import hash_password, verify_password, create_token
from ..deps import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register")
def register(data: RegisterRequest, db: Session = Depends(get_db)):
    if db.query(User).filter((User.username == data.username) | (User.email == data.email)).first():
        raise HTTPException(409, "Username or email already exists")
    user = User(name=data.name, username=data.username, email=data.email, password_hash=hash_password(data.password))
    db.add(user); db.commit(); db.refresh(user)
    return {"access_token": create_token(user.id), "user": UserOut.model_validate(user)}

@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == data.username).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(401, "Invalid username or password")
    return {"access_token": create_token(user.id), "user": UserOut.model_validate(user)}

@router.get("/me", response_model=UserOut)
def me(user=Depends(get_current_user)):
    return user
