# app/crud.py

from sqlalchemy.orm import Session
from . import models

def get_correct_answer(db: Session, question_number: int):
    return db.query(models.Question).filter(models.Question.question_number == question_number).first()
