# app/routers/judge.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import schemas, crud
from app.database import get_db

router = APIRouter()

@router.post("/judge_set", response_model=schemas.AnswerResponse)
def judge_set(answer_request: schemas.AnswerRequest, db: Session = Depends(get_db)):
    # リクエストデータからセット番号と回答を取得
    set_number = answer_request.set_number
    answers = answer_request.answers

    # データベースから指定されたセット番号の問題を取得
    questions = crud.get_questions_by_set(db, set_number)

    if not questions:
        raise HTTPException(status_code=404, detail="Set not found")

    results = []
    correct_count = 0
    incorrect_count = 0

    # 回答を一つずつ判定
    for question, user_answer in zip(questions, answers):
        is_correct = question.correct_answer_num == user_answer
        results.append(is_correct)
        if is_correct:
            correct_count += 1
        else:
            incorrect_count += 1

    return {
        "set": set_number,
        "results": results,  # 各回答の正誤判定
        "correct": correct_count,  # 正解数
        "incorrect": incorrect_count  # 誤答数
    }