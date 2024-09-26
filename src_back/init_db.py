# init_db.py

from app.database import SessionLocal, engine
from app import models

# Create the tables
models.Base.metadata.create_all(bind=engine)

# Insert some data
db = SessionLocal()

sample_questions = [
    models.Question(question_number=1, correct_answer="42"),
    models.Question(question_number=2, correct_answer="Python"),
    models.Question(question_number=3, correct_answer="FastAPI"),
]

db.add_all(sample_questions)
db.commit()
db.close()
