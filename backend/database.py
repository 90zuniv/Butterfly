# from sqlalchemy import *
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

UNAME = os.getenv('UNAME')
PASSWORD = os.getenv('PASSWORD')
HOST = os.getenv('HOST')
PORT = os.getenv('PORT')

DB_URL = f'mysql+pymysql://{UNAME}:{PASSWORD}@{HOST}:{PORT}/dbmaster'

engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind = engine)

Base = declarative_base()

# class engineconn:

#     def __init__(self):
#         self.engine = create_engine(DB_URL, pool_recycle = 500) 

#     def sessionmaker(self):
#         Session = sessionmaker(bind=self.engine)
#         session = Session()
#         return session

#     def connection(self):
#         conn = self.engine.connect()
#         return conn
