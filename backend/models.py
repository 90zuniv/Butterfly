from sqlalchemy import Column, TEXT, INT, BIGINT, Integer, String, Boolean, Float, ForeignKey
from database import Base
import datetime as dt
import passlib.hash as hash

print(Base)
class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)
    email = Column(String(50), unique=True)
    password = Column(String(50))
    def verify_password(self, password:str):
        return hash.bcrypt.verify(password,self.password)

class Chatting(Base):
    __tablename__ = "chatting"

    id = Column(Integer, primary_key=True, index=True)    
    # date = Column(String(50))
    thumbnail = Column(String(100))
    story = Column(String(100))
    user_id = Column(Integer,ForeignKey("user.id"))


class Content(Base):
    __tablename__ = "content"
    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(String(1000))
    content_thumbnail = Column(String(1000))




# CREATE TABLE `Users` (
#     `mem_seq` INT NOT NULL AUTO_INCREMENT,
#     `name` VARCHAR(255) NULL,
#     `mail` VARCHAR(255) NULL,
#     `pw` VARCHAR(255) NULL,
#     `profile` VARCHAR(50) NULL,
#     `grade` INT NULL,
#     PRIMARY KEY (`mem_seq`)
# );

# CREATE TABLE `Chatting` (
#     `chat_seq` INT NOT NULL AUTO_INCREMENT,
#     `mem_seq` INT NOT NULL,
#     `chat` TEXT NULL,
#     `date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
#     `thumbnail` VARCHAR(255) NULL,
#     `link` VARCHAR(50) NULL,
#     PRIMARY KEY (`chat_seq`),
#     CONSTRAINT `FK_Chatting_Users_mem_seq` FOREIGN KEY (`mem_seq`)
#     REFERENCES `Users` (`mem_seq`) ON DELETE CASCADE
# );