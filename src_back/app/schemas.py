# app/schemas.py

from pydantic import BaseModel
from typing import List

class AnswerRequest(BaseModel):
    question_number: int
    answer: List[int]

class AnswerResponse(BaseModel):
    set: int
    results: List[bool]
    correct: int
    incorrect:int
