from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class RegisterRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=6, max_length=100)

class LoginRequest(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    username: str
    email: str
    bio: str
    profile_picture: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

class ProfileUpdate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    bio: str = Field(default="", max_length=1000)

class SkillCreate(BaseModel):
    skill_name: str = Field(min_length=2, max_length=100)
    category: str = "Other"
    current_level: str = "BEGINNER"
    target_level: str = "INTERMEDIATE"
    start_date: Optional[str] = None
    target_date: Optional[str] = None
    description: str = ""

class SkillOut(SkillCreate):
    id: int
    status: str
    class Config:
        from_attributes = True

class GoalCreate(BaseModel):
    skill_id: int
    title: str = Field(min_length=2, max_length=150)
    target_value: int = Field(gt=0)
    unit: str = "hours"
    deadline: Optional[str] = None

class GoalUpdate(BaseModel):
    current_value: int = Field(ge=0)
    status: Optional[str] = None

class GoalOut(BaseModel):
    id: int
    skill_id: int
    title: str
    target_value: int
    current_value: int
    unit: str
    deadline: Optional[str]
    status: str
    class Config:
        from_attributes = True

class PracticeCreate(BaseModel):
    skill_id: int
    duration_minutes: int = Field(gt=0, le=1440)
    activity: str = Field(min_length=2, max_length=255)
    notes: str = ""

class PracticeOut(BaseModel):
    id: int
    skill_id: int
    duration_minutes: int
    activity: str
    notes: str
    practiced_at: datetime
    class Config:
        from_attributes = True

class PostCreate(BaseModel):
    content: str = Field(min_length=1, max_length=2000)
    skill_id: Optional[int] = None

class CommentCreate(BaseModel):
    content: str = Field(min_length=1, max_length=500)
