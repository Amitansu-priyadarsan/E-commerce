from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.models import WishlistAdd

router = APIRouter(prefix="/wishlist", tags=["wishlist"])


@router.get("/{user_id}")
def get_wishlist(user_id: str):
    res = (
        supabase.table("wishlists")
        .select("*, products(*)")
        .eq("user_id", user_id)
        .execute()
    )
    return res.data


@router.post("/{user_id}", status_code=201)
def add_to_wishlist(user_id: str, body: WishlistAdd):
    existing = (
        supabase.table("wishlists")
        .select("id")
        .eq("user_id", user_id)
        .eq("product_id", body.product_id)
        .execute()
    )
    if existing.data:
        return existing.data[0]
    res = supabase.table("wishlists").insert({"user_id": user_id, "product_id": body.product_id}).execute()
    return res.data[0]


@router.delete("/{user_id}/{product_id}", status_code=204)
def remove_from_wishlist(user_id: str, product_id: str):
    supabase.table("wishlists").delete().eq("user_id", user_id).eq("product_id", product_id).execute()
