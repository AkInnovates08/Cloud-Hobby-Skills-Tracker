from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..deps import get_current_user
from ..models import Skill
from ..schemas import SkillCreate, SkillOut

router = APIRouter(prefix="/api/skills", tags=["Skills"])

@router.get("", response_model=list[SkillOut])
def get_skills(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Skill).filter_by(user_id=user.id).order_by(Skill.created_at.desc()).all()

@router.post("", response_model=SkillOut)
def create_skill(data: SkillCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    skill = Skill(user_id=user.id, **data.model_dump())
    db.add(skill); db.commit(); db.refresh(skill)
    return skill

@router.get("/{skill_id}", response_model=SkillOut)
def get_skill(skill_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    skill = db.query(Skill).filter_by(id=skill_id, user_id=user.id).first()
    if not skill: raise HTTPException(404, "Skill not found")
    return skill

@router.put("/{skill_id}", response_model=SkillOut)
def update_skill(skill_id: int, data: SkillCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    skill = db.query(Skill).filter_by(id=skill_id, user_id=user.id).first()
    if not skill: raise HTTPException(404, "Skill not found")
    for k,v in data.model_dump().items(): setattr(skill,k,v)
    db.commit(); db.refresh(skill)
    return skill

@router.delete("/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    skill = db.query(Skill).filter_by(id=skill_id, user_id=user.id).first()
    if not skill: raise HTTPException(404, "Skill not found")
    db.delete(skill); db.commit()
    return {"message": "Skill deleted"}
