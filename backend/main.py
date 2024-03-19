from fastapi import FastAPI, Depends, Path, HTTPException, status
from pydantic import BaseModel
from typing import Annotated, List
from database import engine, SessionLocal
import models
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from fastapi.routing import APIRouter
import os
from dotenv import load_dotenv

# from domain.chatting import chatting_router

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI()

origins = [
    os.environ["FRONTEND_URL"]
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credential = True,
    allow_methods = ['*'],
    allow_headers = ['*'],

)

models.Base.metadata.create_all(bind=engine)


class ChattingBase(BaseModel):
    story : str
    thumbnail : str
    user_id : int

class UserBase(BaseModel):
    id : str
    email : str
    password : str

class ContentBase(BaseModel):
    content_id : str
    content_thumbnail : str

class ContentModel(ContentBase):
    id : int
    class Config:
        from_attributes  = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]



@app.post("/content/", response_model=ContentModel)
async def create_youtube(content: ContentBase, db:db_dependency):
    db_content = models.Content(**content.dict())
    db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content

# @app.get("/content", response_model=List[ContentModel])
# async def read_content(db:db_dependency, skip:int = 0, limit:int = 100):
#     content = db.query(models.Content).offset(skip).limit(limit).all()
#     return content


# app.include_router(chatting_router.router)

@app.post("/chatting/", status_code=status.HTTP_201_CREATED)
async def create_post(chatting:ChattingBase, db:db_dependency):
    db_chat = models.Chatting(**chatting.dict())
    db.add(db_chat)
    db.commit()

@app.get("/chatting/{chatting_id}", status_code=status.HTTP_200_OK)
async def read_chatting(chatting_id:int, db:db_dependency):
    chatting = db.query(models.Chatting).filter(models.Chatting.id == chatting_id).first()
    if chatting is None:
        HTTPException(status_code=404, detail='Chatting was not found')
    return chatting



@app.post("/user/", status_code=status.HTTP_201_CREATED)
async def create_user(user:UserBase, db:db_dependency):
        db_user = models.User(**user.dict())
        db.add(db_user)
        db.commit()


@app.get("/user/{user_id}", status_code=status.HTTP_200_OK)
async def read_user(user_id: int, db:db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail='User not found')
    return user