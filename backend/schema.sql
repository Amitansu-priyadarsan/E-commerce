-- Run this in your Supabase SQL editor to set up all tables

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- USERS
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  full_name text,
  phone_number text,
  created_at timestamptz default now()
);
-- If upgrading an existing DB, run: ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash text;

-- PRODUCTS
create type category_enum as enum (
  'kurtis', 'saree', 'lehenga', 'salwar', 'anarkali', 'pashtuni', 'cotton', 'linen'
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category category_enum not null,
  price numeric(10,2) not null,
  original_price numeric(10,2),
  rating numeric(3,1) default 0,
  reviews_count integer default 0,
  image_url text not null,
  colors jsonb default '[]',
  sizes jsonb default '[]',
  tags jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CARTS
create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- CART ITEMS
create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references carts(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  quantity integer not null default 1,
  selected_color text default '',
  selected_size text default '',
  price_at_purchase numeric(10,2) not null,
  created_at timestamptz default now()
);

-- WISHLISTS
create table if not exists wishlists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, product_id)
);

-- ORDERS
create type order_status_enum as enum (
  'pending', 'processing', 'shipped', 'delivered', 'cancelled'
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  subtotal numeric(10,2) not null,
  discount numeric(10,2) default 0,
  delivery_fee numeric(10,2) default 0,
  total numeric(10,2) not null,
  status order_status_enum default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ORDER ITEMS
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  quantity integer not null,
  selected_color text,
  selected_size text,
  price_at_purchase numeric(10,2) not null
);

-- REVIEWS
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  user_id uuid references users(id) on delete set null,
  rating numeric(3,1) not null check (rating >= 1 and rating <= 5),
  content text not null,
  verified boolean default false,
  created_at timestamptz default now(),
  unique(product_id, user_id)
);

-- CONTACT MESSAGES
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
