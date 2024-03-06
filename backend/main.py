from fastapi import FastAPI, Depends, Path, HTTPException, status
from pydantic import BaseModel
from typing import Annotated
from database import engine, SessionLocal
import models
from sqlalchemy.orm import Session

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

class ChattingBase(BaseModel):
    content : str
    thumbnail : str
    user_id : int

class UserBase(BaseModel):
    name : str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(user:UserBase, db:db_dependency):
        db_user = models.User(**user.dict())
        db.add(db_user)
        db.commit()



