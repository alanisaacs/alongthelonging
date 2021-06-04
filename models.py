#!/usr/bin/env python3

""" Database models for ATL Apps """

import os

from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import urllib.parse

# Define class to map to db table
Base = declarative_base()

class Mani(Base):
    __tablename__ = 'manis'
    id = Column(Integer, primary_key=True)
    gid = Column(Integer)
    gname = Column(String(32))
    soundbite = Column(Text)
    description = Column(Text)
    notes = Column(Text)
    keywords = Column(ARRAY(String))
    rank = Column(Integer)
    level = Column(Integer)

# Create interface to db without connecting
pw = os.getenv('ATL_DB_USER_PW')
pw_encoded = urllib.parse.quote_plus(pw)
engine = create_engine('postgresql://atl_dbuser:' + pw_encoded + \
    '@localhost/manifesto')
# Create a session (not a connection, more a "workspace" for objects)
open_db_session = sessionmaker(bind=engine)
# To be made available throughout the app using syntax:
# from models import open_db_session
# DBSession = open_db_session()