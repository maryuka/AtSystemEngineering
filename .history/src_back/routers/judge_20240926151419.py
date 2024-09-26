# app/routers/judge.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, crud
from app.database import get_db

router = APIRouter()

@router.post("/judge", response_model=schemas.AnswerResponse)
def judge_answer(answer_request: schemas.AnswerRequest, db: Session = Depends(get_db)):
    question = crud.get_correct_answer(db, answer_request.question_number)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found")
    is_correct = answer_request.answer.strip().lower() == question.correct_answer.strip().lower()
    message = "Correct!" if is_correct else "Incorrect."
    return schemas.AnswerResponse(correct=is_correct, message=message)
