# from sqlalchemy import *
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker



DB_URL = 'mysql+pymysql://root:0000@localhost:3306/Butterfly'

engine = create_engine(DB_URL)

SessionLocal = sessionmaker(autocomit=False, autoflush=False, bind = engine)

Base = declarative_base

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
