from fastapi import APIRouter, HTTPException
from app.database import supabase
from app.models import ReviewCreate

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("/product/{product_id}")
def get_product_reviews(product_id: str):
    res = (
        supabase.table("reviews")
        .select("*")
        .eq("product_id", product_id)
        .order("created_at", desc=True)
        .execute()
    )
    return res.data


@router.post("/", status_code=201)
def create_review(review: ReviewCreate):
    existing = (
        supabase.table("reviews")
        .select("id")
        .eq("product_id", review.product_id)
        .eq("user_id", review.user_id)
        .execute()
    )
    if existing.data:
        raise HTTPException(status_code=400, detail="Review already submitted for this product")

    res = supabase.table("reviews").insert(review.model_dump()).execute()

    # Update product average rating
    all_reviews = (
        supabase.table("reviews")
        .select("rating")
        .eq("product_id", review.product_id)
        .execute()
    )
    ratings = [r["rating"] for r in all_reviews.data]
    avg_rating = sum(ratings) / len(ratings)
    supabase.table("products").update({
        "rating": round(avg_rating, 1),
        "reviews_count": len(ratings),
    }).eq("id", review.product_id).execute()

    return res.data[0]


@router.delete("/{review_id}", status_code=204)
def delete_review(review_id: str):
    supabase.table("reviews").delete().eq("id", review_id).execute()
