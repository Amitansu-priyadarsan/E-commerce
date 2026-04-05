from pydantic import BaseModel, EmailStr
from typing import Optional, List
from enum import Enum


class CategoryEnum(str, Enum):
    kurtis = "kurtis"
    saree = "saree"
    lehenga = "lehenga"
    salwar = "salwar"
    anarkali = "anarkali"
    pashtuni = "pashtuni"
    cotton = "cotton"
    linen = "linen"


class OrderStatusEnum(str, Enum):
    pending = "pending"
    processing = "processing"
    shipped = "shipped"
    delivered = "delivered"
    cancelled = "cancelled"


# ── Products ────────────────────────────────────────────────────────────────

class ProductCreate(BaseModel):
    name: str
    category: CategoryEnum
    price: float
    original_price: Optional[float] = None
    rating: float = 0.0
    reviews_count: int = 0
    image_url: str
    colors: List[str] = []
    sizes: List[str] = []
    tags: Optional[List[str]] = []


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[CategoryEnum] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    rating: Optional[float] = None
    reviews_count: Optional[int] = None
    image_url: Optional[str] = None
    colors: Optional[List[str]] = None
    sizes: Optional[List[str]] = None
    tags: Optional[List[str]] = None


# ── Cart ─────────────────────────────────────────────────────────────────────

class CartItemAdd(BaseModel):
    product_id: str
    quantity: int = 1
    selected_color: Optional[str] = None
    selected_size: Optional[str] = None
    price_at_purchase: float


class CartItemUpdate(BaseModel):
    quantity: int


# ── Wishlist ──────────────────────────────────────────────────────────────────

class WishlistAdd(BaseModel):
    product_id: str


# ── Orders ────────────────────────────────────────────────────────────────────

class OrderCreate(BaseModel):
    user_id: str
    items: List[CartItemAdd]
    subtotal: float
    discount: float = 0.0
    delivery_fee: float = 0.0
    total: float
    delivery_address: Optional[str] = None
    delivery_city: Optional[str] = None
    delivery_pincode: Optional[str] = None


class OrderStatusUpdate(BaseModel):
    status: OrderStatusEnum


# ── Reviews ───────────────────────────────────────────────────────────────────

class ReviewCreate(BaseModel):
    product_id: str
    user_id: str
    rating: float
    content: str
    verified: bool = False


# ── Users ─────────────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    phone_number: Optional[str] = None


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    pincode: Optional[str] = None


# ── Auth ──────────────────────────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    full_name: Optional[str] = None


# ── Contact ───────────────────────────────────────────────────────────────────

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str


# ── Admin ─────────────────────────────────────────────────────────────────────

class AdminLoginRequest(BaseModel):
    email: str
    password: str
