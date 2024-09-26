# app/schemas.py

from pydantic import BaseModel
from typing import List

class ERDiagramInput(BaseModel):
    content: str

class ERDiagramOutput(BaseModel):
    input_scores: dict
    pareto_scores: dict
    score_differences: dict
    pareto_diagrams: List[str]
    feedback: str
