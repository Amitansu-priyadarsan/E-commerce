from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.models import CartItemAdd, CartItemUpdate

router = APIRouter(prefix="/cart", tags=["cart"])


def _get_or_create_cart(user_id: str) -> str:
    res = supabase.table("carts").select("id").eq("user_id", user_id).execute()
    if res.data:
        return res.data[0]["id"]
    new_cart = supabase.table("carts").insert({"user_id": user_id}).execute()
    return new_cart.data[0]["id"]


@router.get("/{user_id}")
def get_cart(user_id: str):
    cart_id = _get_or_create_cart(user_id)
    items = (
        supabase.table("cart_items")
        .select("*, products(*)")
        .eq("cart_id", cart_id)
        .execute()
    )
    return {"cart_id": cart_id, "items": items.data}


@router.post("/{user_id}/items", status_code=201)
def add_item(user_id: str, item: CartItemAdd):
    cart_id = _get_or_create_cart(user_id)

    # Check if item already exists with same product/color/size
    existing = (
        supabase.table("cart_items")
        .select("id, quantity")
        .eq("cart_id", cart_id)
        .eq("product_id", item.product_id)
        .eq("selected_color", item.selected_color or "")
        .eq("selected_size", item.selected_size or "")
        .execute()
    )

    if existing.data:
        item_id = existing.data[0]["id"]
        new_qty = existing.data[0]["quantity"] + item.quantity
        res = (
            supabase.table("cart_items")
            .update({"quantity": new_qty})
            .eq("id", item_id)
            .execute()
        )
        return res.data[0]

    payload = item.model_dump()
    payload["cart_id"] = cart_id
    res = supabase.table("cart_items").insert(payload).execute()
    return res.data[0]


@router.patch("/{user_id}/items/{item_id}")
def update_item(user_id: str, item_id: str, update: CartItemUpdate):
    if update.quantity <= 0:
        supabase.table("cart_items").delete().eq("id", item_id).execute()
        return {"detail": "Item removed"}
    res = (
        supabase.table("cart_items")
        .update({"quantity": update.quantity})
        .eq("id", item_id)
        .execute()
    )
    if not res.data:
        raise HTTPException(status_code=404, detail="Cart item not found")
    return res.data[0]


@router.delete("/{user_id}/items/{item_id}", status_code=204)
def remove_item(user_id: str, item_id: str):
    supabase.table("cart_items").delete().eq("id", item_id).execute()


@router.delete("/{user_id}/clear", status_code=204)
def clear_cart(user_id: str):
    cart_id = _get_or_create_cart(user_id)
    supabase.table("cart_items").delete().eq("cart_id", cart_id).execute()
