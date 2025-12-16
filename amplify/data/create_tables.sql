create table tblUser (
  id serial primary key,
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
