from sqlalchemy import Column, TEXT, INT, BIGINT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Test(Base):
    __tablename__ = "test"

    id = Column(BIGINT, nullable=False, autoincrement=True, primary_key=True)
    name = Column(TEXT, nullable=False)
    number = Column(INT, nullable=False)
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