from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    bio = Column(Text, default="")
    profile_picture = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    skills = relationship("Skill", back_populates="user", cascade="all, delete-orphan")
    goals = relationship("Goal", back_populates="user", cascade="all, delete-orphan")
    practice_sessions = relationship("PracticeSession", back_populates="user", cascade="all, delete-orphan")
    posts = relationship("Post", back_populates="user", cascade="all, delete-orphan")

class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    skill_name = Column(String(100), nullable=False)
    category = Column(String(50), default="Other")
    current_level = Column(String(30), default="BEGINNER")
    target_level = Column(String(30), default="INTERMEDIATE")
    start_date = Column(String(20), nullable=True)
    target_date = Column(String(20), nullable=True)
    status = Column(String(30), default="ACTIVE")
    description = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="skills")
    goals = relationship("Goal", back_populates="skill", cascade="all, delete-orphan")
    practice_sessions = relationship("PracticeSession", back_populates="skill", cascade="all, delete-orphan")

class Goal(Base):
    __tablename__ = "goals"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    title = Column(String(150), nullable=False)
    target_value = Column(Integer, nullable=False)
    current_value = Column(Integer, default=0)
    unit = Column(String(30), default="hours")
    deadline = Column(String(20), nullable=True)
    status = Column(String(30), default="ACTIVE")
    user = relationship("User", back_populates="goals")
    skill = relationship("Skill", back_populates="goals")
    milestones = relationship("Milestone", back_populates="goal", cascade="all, delete-orphan")

class Milestone(Base):
    __tablename__ = "milestones"
    id = Column(Integer, primary_key=True)
    goal_id = Column(Integer, ForeignKey("goals.id"), nullable=False)
    title = Column(String(150), nullable=False)
    target_value = Column(Integer, nullable=False)
    achieved = Column(Integer, default=0)
    achieved_at = Column(DateTime, nullable=True)
    goal = relationship("Goal", back_populates="milestones")

class PracticeSession(Base):
    __tablename__ = "practice_sessions"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    activity = Column(String(255), nullable=False)
    notes = Column(Text, default="")
    practiced_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="practice_sessions")
    skill = relationship("Skill", back_populates="practice_sessions")

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=True)
    content = Column(Text, nullable=False)
    media_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="posts")
    skill = relationship("Skill")

class Like(Base):
    __tablename__ = "likes"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
    __table_args__ = (UniqueConstraint("user_id", "post_id", name="uq_user_post_like"),)

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
