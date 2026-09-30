from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..deps import get_current_user
from ..schemas import UserOut, ProfileUpdate
from ..models import User

router = APIRouter(prefix="/api/profile", tags=["Profile"])

@router.get("", response_model=UserOut)
def get_profile(user=Depends(get_current_user)):
    return user

@router.put("", response_model=UserOut)
def update_profile(data: ProfileUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    user.name = data.name
    user.bio = data.bio
    db.commit(); db.refresh(user)
    return user
