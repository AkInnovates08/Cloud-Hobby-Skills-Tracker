from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from ..database import get_db
from ..deps import get_current_user
from ..models import Post, Like, Comment, Skill, User
from ..schemas import PostCreate, CommentCreate
from ..services.storage import save_upload

router = APIRouter(prefix="/api", tags=["Community"])

def serialize_post(db, post, user_id=None):
    likes = db.query(Like).filter_by(post_id=post.id).count()
    comments = db.query(Comment).filter_by(post_id=post.id).order_by(Comment.created_at.asc()).all()
    return {
        "id": post.id,
        "content": post.content,
        "media_url": post.media_url,
        "created_at": post.created_at,
        "username": post.user.username,
        "name": post.user.name,
        "skill_name": post.skill.skill_name if post.skill else None,
        "like_count": likes,
        "liked": bool(user_id and db.query(Like).filter_by(post_id=post.id, user_id=user_id).first()),
        "comments": [{"id": c.id, "content": c.content, "username": db.get(User, c.user_id).username, "created_at": c.created_at} for c in comments]
    }

@router.get("/feed")
def feed(db: Session = Depends(get_db), user=Depends(get_current_user)):
    posts = db.query(Post).order_by(Post.created_at.desc()).limit(50).all()
    return [serialize_post(db,p,user.id) for p in posts]

@router.post("/posts")
def create_post(data: PostCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if data.skill_id and not db.query(Skill).filter_by(id=data.skill_id, user_id=user.id).first():
        raise HTTPException(404, "Skill not found")
    post = Post(user_id=user.id, **data.model_dump())
    db.add(post); db.commit(); db.refresh(post)
    return serialize_post(db, post, user.id)

@router.delete("/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    post = db.query(Post).filter_by(id=post_id, user_id=user.id).first()
    if not post: raise HTTPException(404, "Post not found or not owned by you")
    db.delete(post); db.commit()
    return {"message":"Post deleted"}

@router.post("/posts/{post_id}/like")
def like(post_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if not db.get(Post, post_id): raise HTTPException(404, "Post not found")
    if not db.query(Like).filter_by(post_id=post_id, user_id=user.id).first():
        db.add(Like(post_id=post_id, user_id=user.id)); db.commit()
    return {"liked": True}

@router.delete("/posts/{post_id}/like")
def unlike(post_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    item = db.query(Like).filter_by(post_id=post_id, user_id=user.id).first()
    if item: db.delete(item); db.commit()
    return {"liked": False}

@router.post("/posts/{post_id}/comments")
def comment(post_id: int, data: CommentCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    if not db.get(Post, post_id): raise HTTPException(404, "Post not found")
    c = Comment(post_id=post_id, user_id=user.id, content=data.content)
    db.add(c); db.commit(); db.refresh(c)
    return {"id": c.id, "content": c.content, "username": user.username, "created_at": c.created_at}

@router.delete("/comments/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    c = db.query(Comment).filter_by(id=comment_id, user_id=user.id).first()
    if not c: raise HTTPException(404, "Comment not found or not owned by you")
    db.delete(c); db.commit()
    return {"message":"Comment deleted"}

@router.post("/files/upload")
async def upload_file(file: UploadFile = File(...), user=Depends(get_current_user)):
    return {"url": await save_upload(file, user.id)}
