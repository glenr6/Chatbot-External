import jwt
import bcrypt 
from config import JWT_SECRET_KEY
from datetime import datetime, timedelta
from models import User
from typing import Optional

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def create_jwt_token(user: User) -> str:
    expiration = datetime.utcnow() + timedelta(days=7)
    payload = {
        "sub": user.id,
        "exp": expiration,
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm="HS256")

def decode_jwt_token(token: str) -> Optional[int]:
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=["HS256"])
        return payload["sub"]
    except jwt.PyJWTError:
        return None
