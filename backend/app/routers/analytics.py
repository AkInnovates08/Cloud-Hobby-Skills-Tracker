from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..deps import get_current_user
from ..services.analytics import dashboard_stats

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.get("/dashboard")
def analytics(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return dashboard_stats(db, user.id)
