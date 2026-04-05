from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timedelta, timezone
from jose import jwt

from app.config import settings
from app.database import supabase
from app.models import AdminLoginRequest
from app.dependencies import JWT_ALGORITHM

router = APIRouter(prefix="/admin", tags=["admin"])

ADMIN_TOKEN_EXPIRE_DAYS = 7


@router.post("/login")
def admin_login(body: AdminLoginRequest):
    if body.email != settings.admin_email or body.password != settings.admin_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin credentials",
        )

    expire = datetime.now(timezone.utc) + timedelta(days=ADMIN_TOKEN_EXPIRE_DAYS)
    token = jwt.encode(
        {"sub": "admin", "email": body.email, "role": "admin", "exp": expire},
        settings.jwt_secret,
        algorithm=JWT_ALGORITHM,
    )
    return {"access_token": token, "role": "admin"}


@router.get("/dashboard")
def admin_dashboard():
    orders_res = supabase.table("orders").select("id, status, total, created_at").execute()
    orders = orders_res.data or []

    total_orders = len(orders)
    total_revenue = sum(float(o["total"]) for o in orders)

    status_counts = {}
    for o in orders:
        s = o["status"]
        status_counts[s] = status_counts.get(s, 0) + 1

    recent_res = (
        supabase.table("orders")
        .select("id, user_id, status, total, created_at, users(email, full_name)")
        .order("created_at", desc=True)
        .limit(10)
        .execute()
    )

    users_res = supabase.table("users").select("id", count="exact").execute()
    total_users = users_res.count or 0

    products_res = supabase.table("products").select("id", count="exact").execute()
    total_products = products_res.count or 0

    return {
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "total_users": total_users,
        "total_products": total_products,
        "status_counts": status_counts,
        "recent_orders": recent_res.data or [],
    }


@router.get("/orders")
def admin_get_all_orders():
    res = (
        supabase.table("orders")
        .select(
            "id, user_id, status, subtotal, discount, delivery_fee, total, created_at, "
            "delivery_address, delivery_city, delivery_pincode, "
            "users(email, full_name), "
            "order_items(id, product_id, quantity, selected_color, selected_size, price_at_purchase, products(name, image_url, category))"
        )
        .order("created_at", desc=True)
        .execute()
    )
    return res.data or []


@router.get("/orders/{order_id}")
def admin_get_order(order_id: str):
    res = (
        supabase.table("orders")
        .select(
            "id, user_id, status, subtotal, discount, delivery_fee, total, created_at, "
            "delivery_address, delivery_city, delivery_pincode, "
            "users(email, full_name, phone_number), "
            "order_items(id, product_id, quantity, selected_color, selected_size, price_at_purchase, products(name, image_url, category))"
        )
        .eq("id", order_id)
        .single()
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail="Order not found")
    return res.data


@router.patch("/orders/{order_id}/status")
def admin_update_order_status(order_id: str, body: dict):
    new_status = body.get("status")
    if not new_status:
        raise HTTPException(status_code=400, detail="status is required")

    valid = {"pending", "processing", "shipped", "delivered", "cancelled"}
    if new_status not in valid:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(valid)}")

    res = (
        supabase.table("orders")
        .update({"status": new_status})
        .eq("id", order_id)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail="Order not found")
    return res.data[0]
