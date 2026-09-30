from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..deps import get_current_user
from ..models import Goal, Skill, Milestone
from ..schemas import GoalCreate, GoalUpdate, GoalOut

router = APIRouter(prefix="/api/goals", tags=["Goals"])

@router.get("", response_model=list[GoalOut])
def get_goals(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return db.query(Goal).filter_by(user_id=user.id).order_by(Goal.id.desc()).all()

@router.post("", response_model=GoalOut)
def create_goal(data: GoalCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if not db.query(Skill).filter_by(id=data.skill_id, user_id=user.id).first():
        raise HTTPException(404, "Skill not found")
    goal = Goal(user_id=user.id, **data.model_dump())
    db.add(goal); db.commit(); db.refresh(goal)
    for value in sorted(set([max(1, int(data.target_value*0.25)), max(1, int(data.target_value*0.5)), max(1, int(data.target_value*0.75)), data.target_value])):
        db.add(Milestone(goal_id=goal.id, title=f"{value} {data.unit}", target_value=value))
    db.commit(); db.refresh(goal)
    return goal

@router.put("/{goal_id}", response_model=GoalOut)
def update_goal(goal_id: int, data: GoalUpdate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    goal = db.query(Goal).filter_by(id=goal_id, user_id=user.id).first()
    if not goal: raise HTTPException(404, "Goal not found")
    goal.current_value = data.current_value
    goal.status = data.status or ("COMPLETED" if goal.current_value >= goal.target_value else "ACTIVE")
    db.commit(); db.refresh(goal)
    return goal

@router.delete("/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    goal = db.query(Goal).filter_by(id=goal_id, user_id=user.id).first()
    if not goal: raise HTTPException(404, "Goal not found")
    db.delete(goal); db.commit()
    return {"message":"Goal deleted"}
