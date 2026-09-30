from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..deps import get_current_user
from ..models import PracticeSession, Skill, Goal
from ..schemas import PracticeCreate, PracticeOut

router = APIRouter(prefix="/api/practice", tags=["Practice"])

@router.get("", response_model=list[PracticeOut])
def get_practice(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(PracticeSession).filter_by(user_id=user.id).order_by(PracticeSession.practiced_at.desc()).limit(100).all()

@router.post("", response_model=PracticeOut)
def create_practice(data: PracticeCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if not db.query(Skill).filter_by(id=data.skill_id, user_id=user.id).first():
        raise HTTPException(404, "Skill not found")
    session = PracticeSession(user_id=user.id, **data.model_dump())
    db.add(session)
    goals = db.query(Goal).filter_by(user_id=user.id, skill_id=data.skill_id, status="ACTIVE").all()
    hours = data.duration_minutes / 60
    for goal in goals:
        goal.current_value += int(hours)
        if goal.current_value >= goal.target_value:
            goal.current_value = goal.target_value
            goal.status = "COMPLETED"
    db.commit(); db.refresh(session)
    return session
