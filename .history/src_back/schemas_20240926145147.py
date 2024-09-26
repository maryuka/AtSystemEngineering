# app/schemas.py

from pydantic import BaseModel

class AnswerRequest(BaseModel):
    question_number: int
    answer: str

class AnswerResponse(BaseModel):
    correct: bool
    message: str
