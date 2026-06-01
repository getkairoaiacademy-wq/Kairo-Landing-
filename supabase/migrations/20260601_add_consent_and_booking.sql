-- KAIRO audit_leads — legal consent + Cal.com booking columns.
-- Run this in Supabase SQL editor (project: niqjyhymkavwhknxgqus).

alter table public.audit_leads
  add column if not exists privacy_accepted boolean not null default false,
  add column if not exists terms_accepted boolean not null default false,
  add column if not exists marketing_consent boolean not null default false,
  add column if not exists booking_status text not null default 'pending'
    check (booking_status in ('pending','booked','no_show','completed','cancelled')),
  add column if not exists cal_booking_id text,
  add column if not exists cal_event_type_id text,
  add column if not exists scheduled_at timestamptz;

create index if not exists audit_leads_booking_status_idx on public.audit_leads (booking_status);
create index if not exists audit_leads_cal_booking_id_idx on public.audit_leads (cal_booking_id);
create index if not exists audit_leads_scheduled_at_idx on public.audit_leads (scheduled_at);
