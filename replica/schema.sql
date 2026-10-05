-- Schema for Mugshot Bot Clone: Dynamic OG Image & Twitter Card Generator

create extension if not exists "uuid-ossp";

-- Users and accounts
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text not null default 'free' check (subscription_status in ('free', 'pro', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_users_stripe_customer on users (stripe_customer_id);

-- Saved templates / presets
create table if not exists presets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  name text not null,
  website_url text not null,
  title text not null,
  description text not null,
  theme text not null default 'default' check (theme in ('default', 'bold', 'two_up', 'e_commerce')),
  mode text not null default 'light' check (mode in ('light', 'dark')),
  color text not null default 'purple',
  custom_hex text,
  pattern text not null default 'none' check (pattern in ('none', 'hideout', 'bubbles', 'texture', 'diagonal_lines', 'charlie_brown', 'lines_in_motion', 'topography', 'bank_note')),
  hide_watermark boolean not null default false,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_presets_user_id on presets (user_id);

-- Dynamic generation request telemetry / rate limiting
create table if not exists generation_logs (
  id uuid primary key default gen_random_uuid(),
  preset_id uuid references presets(id) on delete set null,
  request_ip text,
  user_agent text,
  requested_url text,
  theme text,
  color text,
  pattern text,
  duration_ms integer,
  created_at timestamptz not null default now()
);

create index if not exists idx_generation_logs_created_at on generation_logs (created_at);

-- Row Level Security (RLS) policies
alter table users enable row level security;
alter table presets enable row level security;
alter table generation_logs enable row level security;
