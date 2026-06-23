-- Esquema de base de datos para la app de mantenimiento (Supabase / Postgres).
-- Ejecuta este script en: Supabase → SQL Editor → New query → Run.
--
-- Crea dos tablas y activa Row Level Security (RLS) para que cada usuario
-- sólo pueda ver y modificar SUS propios datos.

-- Estado por vehículo (kilómetros actuales)
create table if not exists public.vehicle_state (
  user_id    uuid not null references auth.users (id) on delete cascade,
  vehicle_id text not null,
  current_km integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, vehicle_id)
);

-- Registros de mantenimiento (cada operación realizada)
create table if not exists public.maintenance_records (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  vehicle_id text not null,
  task_id    text not null,
  date       date not null,
  km         integer not null default 0,
  cost       numeric not null default 0,
  notes      text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists maintenance_records_user_idx
  on public.maintenance_records (user_id, vehicle_id);

-- Row Level Security
alter table public.vehicle_state      enable row level security;
alter table public.maintenance_records enable row level security;

-- Cada usuario sólo accede a sus filas (auth.uid() = user_id)
drop policy if exists "vehicle_state propio" on public.vehicle_state;
create policy "vehicle_state propio" on public.vehicle_state
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "maintenance_records propio" on public.maintenance_records;
create policy "maintenance_records propio" on public.maintenance_records
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
