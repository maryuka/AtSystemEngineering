# app/models.py

from sqlalchemy import Column, Integer, String,JSON
from .database import Base

class Question(Base):
    __tablename__ = "questions"
    set_name = Column(String, primary_key=True, index=True)
    set_id = Column(Integer, primary_key=True, index=True)
    prob = Column(String, primary_key=True, index=True)#問題文
    choices = Column(JSON)#選択肢
    correct_answer = Column(String, index=True)
    correct_ans_num = Column(Integer, index=True)#正解の選択肢番号
    