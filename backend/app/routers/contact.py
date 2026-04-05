from fastapi import APIRouter
from app.database import supabase
from app.models import ContactMessage

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("/", status_code=201)
def send_message(message: ContactMessage):
    res = supabase.table("contact_messages").insert(message.model_dump()).execute()
    return {"detail": "Message received", "id": res.data[0]["id"]}
