-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query)
-- for the completion-tracking sync feature. course_id is `numeric` (not
-- integer) because alt courses use decimal ids (1.1, 7.1, 10.1, 14.1, 18.1, 18.2).

create table if not exists completions (
  course_id numeric primary key,
  date text not null,
  companions text,
  memo text,
  actual_distance numeric,
  actual_duration text,
  lodge_name text,
  lodge_cost numeric,
  updated_at timestamptz not null default now()
);

alter table completions enable row level security;

-- Open read/write policy: anyone with the app's anon key (i.e. anyone who
-- loads the deployed site) can read and write. There's no login for this
-- personal single-writer app, so this is a deliberate simplicity/security
-- tradeoff — see the app's memory notes for context if revisiting.
create policy "public read completions" on completions
  for select using (true);

create policy "public insert completions" on completions
  for insert with check (true);

create policy "public update completions" on completions
  for update using (true);

create policy "public delete completions" on completions
  for delete using (true);
