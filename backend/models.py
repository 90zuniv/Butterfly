from sqlalchemy import Column, TEXT, INT, BIGINT, Integer, String, Boolean, Float, ForeignKey, DateTime, VARCHAR
from database import Base
import passlib.hash as hash

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(VARCHAR(50), unique=True, nullable=False)
    password = Column(VARCHAR(50), nullable=False)
    level = Column(Integer, nullable=True)
    # def verify_password(self, password:str):
    #     return hash.bcrypt.verify(password,self.password)
    

class Chatting(Base):
    __tablename__ = "chatting"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    date = Column(DateTime, nullable=False, default=DateTime)
    chat = Column(VARCHAR(50), nullable=False)
    user_id = Column(Integer,ForeignKey("user.id"))


class Content(Base):
    __tablename__ = "content"
    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(VARCHAR(505), nullable=False)
    content_thumbnail = Column(VARCHAR(505), nullable=True)

class Level_test(Base):
    __tablename__ = "level_test"

    que_num = Column(Integer, primary_key=True, index=True)
    question = Column(VARCHAR(50), nullable=False)
    ops_1 = Column(VARCHAR(50), nullable=True)
    ops_2 = Column(VARCHAR(50), nullable=True)
    ops_3 = Column(VARCHAR(50), nullable=True)
    ops_4 = Column(VARCHAR(50), nullable=True)
    ops_5 = Column(VARCHAR(50), nullable=True)
    correct = Column(VARCHAR(50), nullable=False)