-- KAIRO audit_leads — legal consent + Cal.com booking + new form columns.
-- Run in Supabase SQL editor (project: niqjyhymkavwhknxgqus).

alter table public.audit_leads
  -- New form fields (company / phone / email split).
  add column if not exists company_name text,
  add column if not exists email text,
  add column if not exists phone text,
  -- Legal consents.
  add column if not exists privacy_accepted boolean not null default false,
  add column if not exists terms_accepted boolean not null default false,
  add column if not exists marketing_consent boolean not null default false,
  -- Cal.com booking lifecycle.
  add column if not exists booking_status text not null default 'pending'
    check (booking_status in ('pending','booked','no_show','completed','cancelled')),
  add column if not exists cal_booking_id text,
  add column if not exists cal_event_type_id text,
  add column if not exists scheduled_at timestamptz;

-- Back-fill new columns from existing legacy data where present.
update public.audit_leads
   set company_name = coalesce(company_name, clinic_name)
 where company_name is null;

update public.audit_leads
   set email = coalesce(email, case when contact ~ '^\S+@\S+\.\S+$' then contact end)
 where email is null;

update public.audit_leads
   set phone = coalesce(phone, case when contact !~ '^\S+@\S+\.\S+$' then contact end)
 where phone is null;

create index if not exists audit_leads_booking_status_idx on public.audit_leads (booking_status);
create index if not exists audit_leads_cal_booking_id_idx on public.audit_leads (cal_booking_id);
create index if not exists audit_leads_scheduled_at_idx on public.audit_leads (scheduled_at);
create index if not exists audit_leads_email_idx on public.audit_leads (email);
