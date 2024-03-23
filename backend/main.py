from fastapi import FastAPI, Depends, Path, HTTPException, status
from pydantic import BaseModel
from typing import Annotated, List, Optional
from database import engine, SessionLocal
import models
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRouter
import os
from dotenv import load_dotenv

router = APIRouter()

from sqlalchemy.sql.expression import func
# from domain.chatting import chatting_router



BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI()

origins = [
    os.environ["FRONTEND_URL"],
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*'],

)

models.Base.metadata.create_all(bind=engine)



class UserCreate(BaseModel):
    email : str
    password : str

# class UserCreate(UserBase):
#     id : int
#     class config :
#         orm_mode = True
class UserRead(BaseModel):
    id: int
    email: str
    level: Optional[int] = None

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    email: Optional[str] = None
    level: Optional[int] = None

class LoginRequest(BaseModel):  # 로그인 요청을 위한 Pydantic 모델
    email: str
    password: str

class ChattingBase(BaseModel):
    id : int
    chat : str
    user_id : int
    date : int

class ChattingUpdate(BaseModel):
    chat: Optional[str] = None
    date: Optional[int] = None

class ContentBase(BaseModel):
    content_id : str
    content_thumbnail : Optional[str] = None

class ChattingUpdate(BaseModel):
    chat: Optional[str] = None
    date: Optional[int] = None

class TestModel(BaseModel):
    que_num : int
    question : str
    ops_1 : Optional[str] = None
    ops_2 : Optional[str] = None
    ops_3 : Optional[str] = None
    ops_4 : Optional[str] = None
    ops_5 : Optional[str] = None
    correct : str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]



@app.post("/content/", response_model=ContentBase)
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



@app.post("/user/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(user:UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/user/login")
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if user and (request.password == user.password):
        return {"message": "Login Successful"}
    else:
        raise HTTPException(status_code=400, detail="Incorrect email or password")

@app.get("/user/{user_id}", status_code=status.HTTP_200_OK)
async def read_user(user_id: int, db:db_dependency):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail='User not found')
    return user


@app.patch("/user/{user_id}", response_model=UserRead)
async def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user_update.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user













# @app.get("/user/{user_id}/level_test", status_code=status.HTTP_200_OK)
# async def submit_level_test(user_id: int, answers: List[str], db: db_dependency):
#     user = db.query(models.User).filter(models.User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     questions = db.query(models.Level_test).all()
#     if not questions:
#         raise HTTPException(status_code=404, detail="No questions found")

#     correct_answers = 0
#     for question, answer in zip(questions, answers):
#         if question.correct == answer:
#             correct_answers += 1
#     db.commit()
#     return {"message": "Test submitted successfully", "level": user.level}