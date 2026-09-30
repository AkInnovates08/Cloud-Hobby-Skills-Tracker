from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..models import PracticeSession, Goal, Post, Like, Comment

def calculate_streak(sessions):
    dates = {s.practiced_at.date() for s in sessions}
    if not dates:
        return 0
    current = datetime.utcnow().date()
    streak = 0
    while current in dates:
        streak += 1
        current -= timedelta(days=1)
    return streak

def dashboard_stats(db: Session, user_id: int):
    sessions = db.query(PracticeSession).filter_by(user_id=user_id).all()
    total_minutes = sum(s.duration_minutes for s in sessions)
    now = datetime.utcnow()
    week_start = now - timedelta(days=7)
    month_start = now - timedelta(days=30)
    weekly = sum(s.duration_minutes for s in sessions if s.practiced_at >= week_start)
    monthly = sum(s.duration_minutes for s in sessions if s.practiced_at >= month_start)

    skill_hours = {}
    for s in sessions:
        name = s.skill.skill_name if s.skill else "Unknown"
        skill_hours[name] = round(skill_hours.get(name, 0) + s.duration_minutes / 60, 2)

    goals = db.query(Goal).filter_by(user_id=user_id).all()
    posts = db.query(Post).filter_by(user_id=user_id).all()
    post_ids = [p.id for p in posts]
    likes = db.query(Like).filter(Like.post_id.in_(post_ids)).count() if post_ids else 0
    comments = db.query(Comment).filter(Comment.post_id.in_(post_ids)).count() if post_ids else 0

    return {
        "total_practice_hours": round(total_minutes / 60, 2),
        "weekly_practice_hours": round(weekly / 60, 2),
        "monthly_practice_hours": round(monthly / 60, 2),
        "most_practiced_skill": max(skill_hours, key=skill_hours.get) if skill_hours else "—",
        "current_streak": calculate_streak(sessions),
        "longest_streak": calculate_streak(sessions),
        "goals_completed": sum(1 for g in goals if g.status == "COMPLETED"),
        "active_goals": sum(1 for g in goals if g.status != "COMPLETED"),
        "posts": len(posts),
        "likes_received": likes,
        "comments_received": comments,
        "skill_hours": skill_hours,
    }
