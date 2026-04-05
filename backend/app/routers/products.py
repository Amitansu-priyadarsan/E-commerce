from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from app.database import supabase
from app.models import ProductCreate, ProductUpdate

router = APIRouter(prefix="/products", tags=["products"])


@router.get("/")
def list_products(
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None),
    max_price: Optional[float] = Query(None),
    color: Optional[str] = Query(None),
    size: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("created_at"),
    order: Optional[str] = Query("desc"),
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=100),
):
    query = supabase.table("products").select("*")

    if category:
        query = query.eq("category", category)
    if min_price is not None:
        query = query.gte("price", min_price)
    if max_price is not None:
        query = query.lte("price", max_price)
    if color:
        query = query.contains("colors", [color])
    if size:
        query = query.contains("sizes", [size])

    ascending = order.lower() == "asc"
    query = query.order(sort_by, desc=not ascending)

    offset = (page - 1) * limit
    query = query.range(offset, offset + limit - 1)

    response = query.execute()
    return {"data": response.data, "page": page, "limit": limit}


@router.get("/{product_id}")
def get_product(product_id: str):
    response = supabase.table("products").select("*").eq("id", product_id).single().execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Product not found")
    return response.data


@router.post("/", status_code=201)
def create_product(product: ProductCreate):
    response = supabase.table("products").insert(product.model_dump()).execute()
    return response.data[0]


@router.patch("/{product_id}")
def update_product(product_id: str, product: ProductUpdate):
    data = {k: v for k, v in product.model_dump().items() if v is not None}
    response = supabase.table("products").update(data).eq("id", product_id).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Product not found")
    return response.data[0]


@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: str):
    supabase.table("products").delete().eq("id", product_id).execute()
