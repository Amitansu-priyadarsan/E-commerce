from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.database import supabase
from app.models import UserCreate, UserUpdate
from app.config import settings

router = APIRouter(prefix="/users", tags=["users"])

_bearer = HTTPBearer()

JWT_ALGORITHM = "HS256"


def _get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(_bearer)) -> str:
    try:
        payload = jwt.decode(credentials.credentials, settings.jwt_secret, algorithms=[JWT_ALGORITHM])
        user_id: str = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


@router.get("/me")
def get_profile(user_id: str = Depends(_get_current_user_id)):
    res = supabase.table("users").select("id, email, full_name, phone_number, address, city, pincode, created_at").eq("id", user_id).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="User not found")
    return res.data


@router.patch("/me")
def update_profile(user: UserUpdate, user_id: str = Depends(_get_current_user_id)):
    data = {k: v for k, v in user.model_dump().items() if v is not None}
    res = supabase.table("users").update(data).eq("id", user_id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="User not found")
    return res.data[0]


@router.get("/{user_id}")
def get_user(user_id: str):
    res = supabase.table("users").select("*").eq("id", user_id).single().execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="User not found")
    return res.data


@router.post("/", status_code=201)
def create_user(user: UserCreate):
    existing = supabase.table("users").select("id").eq("email", user.email).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Email already registered")
    res = supabase.table("users").insert(user.model_dump()).execute()
    return res.data[0]


@router.patch("/{user_id}")
def update_user(user_id: str, user: UserUpdate):
    data = {k: v for k, v in user.model_dump().items() if v is not None}
    res = supabase.table("users").update(data).eq("id", user_id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="User not found")
    return res.data[0]
