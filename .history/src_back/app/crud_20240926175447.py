# app/crud.py

from sqlalchemy.orm import Session
from . import models

def get_questions_by_set(db: Session, set_number: int):
    return db.query(models.Question).filter(models.Question.set_number == set_number).all()
