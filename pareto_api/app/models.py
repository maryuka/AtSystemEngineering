# app/models.py

from sqlalchemy import Column, Integer, Text, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ERDiagram(Base):
    __tablename__ = "er_diagrams"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    relation_score = Column(Float, nullable=False)
    entity_score = Column(Float, nullable=False)
    column_name_score = Column(Float, nullable=False)
