from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.models import OrderCreate, OrderStatusUpdate

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("/user/{user_id}")
def get_user_orders(user_id: str):
    res = (
        supabase.table("orders")
        .select("*, order_items(*, products(*))")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )
    return res.data


@router.get("/{order_id}")
def get_order(order_id: str):
    res = (
        supabase.table("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", order_id)
        .single()
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail="Order not found")
    return res.data


@router.post("/", status_code=201)
def create_order(order: OrderCreate):
    order_payload = {
        "user_id": order.user_id,
        "subtotal": order.subtotal,
        "discount": order.discount,
        "delivery_fee": order.delivery_fee,
        "total": order.total,
        "status": "pending",
        "delivery_address": order.delivery_address,
        "delivery_city": order.delivery_city,
        "delivery_pincode": order.delivery_pincode,
    }
    order_res = supabase.table("orders").insert(order_payload).execute()
    order_id = order_res.data[0]["id"]

    items_payload = [
        {
            "order_id": order_id,
            "product_id": item.product_id,
            "quantity": item.quantity,
            "selected_color": item.selected_color,
            "selected_size": item.selected_size,
            "price_at_purchase": item.price_at_purchase,
        }
        for item in order.items
    ]
    supabase.table("order_items").insert(items_payload).execute()

    return {"order_id": order_id, "status": "pending"}


@router.patch("/{order_id}/status")
def update_order_status(order_id: str, body: OrderStatusUpdate):
    res = (
        supabase.table("orders")
        .update({"status": body.status})
        .eq("id", order_id)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail="Order not found")
    return res.data[0]
