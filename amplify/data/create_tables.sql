
SET search_path to public;

GRANT USAGE ON SCHEMA public TO postgres;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO postgres;

create table tblUser (
  id serial primary key,
  aws_id text,
  firstName text not null,
  lastName text not null,
  email text not null,
  phone text,
  timezone text default 'America/New_York',
  userRole text not null,
  active boolean default true,
  deleted boolean default false,
  createdAt timestamp default (now() at time zone 'utc'),
  updatedAt timestamp default (now() at time zone 'utc'),
  createdBy integer default 1 references tblUser(id) on delete set default,
  updatedBy integer default 1 references tblUser(id) on delete set default
);

-- Create a policy: Users can only see/edit their own record
create policy "Users can view own record" 
on tblUser 
for select 
using (
  id = nullif(current_setting('app.current_user_id', true), '')::integer
);

create policy "Users can update own record" 
on tblUser 
for update 
using (
  id = nullif(current_setting('app.current_user_id', true), '')::integer
);




create table tblTask (
  id serial primary key,
  dependentUser integer not null references tblUser(id) on delete cascade,
  task text not null,
  taskCategoryId integer not null,
  instructions text,
  rrule text,
  active boolean default true,
  createdAt timestamp default (now() at time zone 'utc'),
  updatedAt timestamp default (now() at time zone 'utc'),
  createdBy integer default 1 references tblUser(id) on delete set default,
  updatedBy integer default 1 references tblUser(id) on delete set default  
);


create table tblTaskCategory (
  id serial primary key,
  category text,
  createdAt timestamp default (now() at time zone 'utc'),
  createdBy integer references tblUser(id) on delete set null
);

create table tblReminder (
  id serial primary key,
  taskId integer not null references tblTask(id) on delete cascade,
  scheduledAt text,
  reminderStatusId integer,
  sentAt text,
  confirmedAt text,
  confirmedBy text not null,
  note text
);

create table tblReminderCategory (
  id serial primary key,
  category text
);

create table tblSubscription (
  id serial primary key,
  userId integer not null references tblUser(id) on delete cascade,
  stripeCustomerId text,
  stripeSubscriptionId text,
  status text not null,
  planId text not null,
  currentPeriodStart text,
  currentPeriodEnd text,
  cancelAtPeriodEnd boolean,
  createdAt timestamp default (now() at time zone 'utc'),
  updatedAt timestamp default (now() at time zone 'utc'),
  createdBy integer references tblUser(id) on delete set null,
  updatedBy integer references tblUser(id) on delete set null
);
