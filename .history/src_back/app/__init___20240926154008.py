# app/__init__.py

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

from .database import get_db
