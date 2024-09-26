# app/main.py

from fastapi import FastAPI
from app import models
from app.database import engine
from app.routers import judge

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/hello")
async def hello():
    return {"message": "hello world!"}

# Include the router
app.include_router(judge.router)

