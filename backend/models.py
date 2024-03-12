from sqlalchemy import Column, TEXT, INT, BIGINT, Integer, String, Boolean, Float, ForeignKey, DateTime
from database import Base
import passlib.hash as hash

print(Base)
class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True, unique=True, nullable=False)
    name = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    def verify_password(self, password:str):
        return hash.bcrypt.verify(password,self.password)
    

class Chatting(Base):
    __tablename__ = "chatting"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime, nullable=False)
    chat = Column(TEXT)
    user_id = Column(Integer,ForeignKey("user.id"))


class Content(Base):
    __tablename__ = "content"
    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(TEXT, nullable=False)
    content_thumbnail = Column(TEXT, nullable=False)
    chatting_id = Column(Integer,ForeignKey("chatting.id"))