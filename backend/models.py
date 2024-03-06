from sqlalchemy import Column, TEXT, INT, BIGINT, Integer, String
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(50), unique=True)
    number = Column(INT, nullable=False)

class Chatting(Base):
    __tablename__ = "chatting"

    id = Column(Integer, primary_key=True, index=True)
    # date = Column(String, datetime)
    thumbnail = Column(String(100))
    content = Column(String(100))
    user_id = Column(Integer)


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