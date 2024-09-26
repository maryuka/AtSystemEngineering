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

@router.post("/judge_set",respose_model = schemas.AnswerResponse)
def judge_set(set_number: int,answers:list[int],db:Session = Depends(get_db)):
    questions = crud.get_questions_by_set(db,set_number)
    if not questions:
        raise HTTPException(status_code=404,detail="Questions not found")
    results = []
    correct_count = 0
    incorrect_count = 0

    for question,user_answer in zip(questions,answers):
        is_correct = question.correct_ans_num == user_answer
        results.append(is_correct)
        if is_correct:
            correct_count += 1
        else:
            incorrect_count += 1

    return schemas.AnswerResponse(set=set_number,results=results,correct=correct_count,incorrect=incorrect_count)