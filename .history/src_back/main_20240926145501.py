# app/main.py

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, SessionLocal
from .database import Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/judge", response_model=schemas.AnswerResponse)
def judge_answer(answer_request: schemas.AnswerRequest, db: Session = Depends(get_db)):
    question = crud.get_correct_answer(db, answer_request.question_number)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    is_correct = answer_request.answer.strip().lower() == question.correct_answer.strip().lower()
    message = "Correct!" if is_correct else "Incorrect."
    return schemas.AnswerResponse(correct=is_correct, message=message)
