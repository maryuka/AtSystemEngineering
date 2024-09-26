# app/models.py

from sqlalchemy import Column, Integer, String
from .database import Base

class Question(Base):
    __tablename__ = "questions"

    question_number = Column(Integer, primary_key=True, index=True)
    correct_answer = Column(String, index=True)
