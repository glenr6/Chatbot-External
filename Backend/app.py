from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from models import User
from database import SessionLocal, Base, engine
from auth import hash_password, verify_password, create_jwt_token, decode_jwt_token
from llm import get_response #, analyze_sentiment, recognize_entities

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class TokenData(BaseModel):
    username: str = None


@app.post("/api/users/register")
async def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    new_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"id": new_user.id, "username": new_user.username, "email": new_user.email}


@app.post("/api/users/login")
async def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_jwt_token(db_user)

    return {"access_token": token, "token_type": "bearer"}


@app.post("/api/chat/ask")
async def ask_question(question: str, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user_id = decode_jwt_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    #sentiment = analyze_sentiment(question)
    #entities = recognize_entities(question)

    response = get_response(question)

    return {"response": response  }#, "sentiment": sentiment, "entities": entities}
