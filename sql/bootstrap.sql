create table "user" (
    id serial not null,
    email_address varchar(100) not null,
    first_name varchar(100),
    last_name varchar(100),
    created_time timestamp default now(),
    updated_time timestamp,
    active boolean default true,
    primary key (id)
);

create table "group" (
    id serial not null,
    name varchar(100) unique not null,
    parent_group int,
    created_time timestamp default now(),
    updated_time timestamp,
    active boolean default true,
    primary key (id),
    foreign key (parent_group) references "group" (id)
);

create table scope (
    id serial not null,
    name varchar(100) unique not null,
    parent_scope int,
    parent_group int,
    created_time timestamp default now(),
    updated_time timestamp,
    active boolean default true,
    primary key (id),
    foreign key (parent_scope) references scope (id),
    foreign key (parent_group) references "group" (id)
);

create table group_scope (
    id serial not null,
    group_id int,
    scope_id int,
    created_time timestamp default now(),
    updated_time timestamp,
    active boolean default true,
    primary key (id),
    foreign key (group_id) references "group" (id),
    foreign key (scope_id) references scope (id)
);

create table user_scope (
    id serial not null,
    user_id int,
    scope_id int,
    created_time timestamp default now(),
    updated_time timestamp,
    active boolean default true,
    primary key (id),
    foreign key (user_id) references "user" (id),
    foreign key (scope_id) references scope (id)
);

create table user_group (
    id serial not null,
    user_id int,
    group_id int,
    created_time timestamp default now(),
    updated_time timestamp,
    active boolean default true,
    primary key (id),
    foreign key (user_id) references "user" (id),
    foreign key (group_id) references "group" (id)
);

create table transactions (
    id serial not null,
    created_time timestamp default now(),
    description text not null
);

-- data users

INSERT INTO public."user"
(email_address, first_name, last_name)
VALUES ('les@test.com', 'Les', 'Zychowski');

INSERT INTO public."user"
(email_address, first_name, last_name)
VALUES ('bob@test.com', 'Bob', 'Smith');

INSERT INTO public."user"
(email_address, first_name, last_name)
VALUES ('matt@test.com', 'Matt', 'LeBlanc');

INSERT INTO public."user"
(email_address, first_name, last_name)
VALUES ('jane@test.com', 'Jane', 'Doe');

-- data scopes

insert into scope (name)
values 
('wt:admin'),
('wt:owner:container1'),
('wt:owner:container2'),
('wt:owner:container3'),
('wt:owner:container4'),
('wt:owner:container5'),
('wt:owner:container6'),
('wt:owner:container7'),
('wt:owner:container8'),
('wt:owner:container9');

-- data groups

insert into "group" (name)
values 
('Group - 1 to 5'),
('Group - ALL'),
('Group - 1, 2'),
('Group - 5, 6');

-- data group scopes

insert into group_scope (group_id, scope_id)
values 
(1, 2),(1, 3),(1, 4),(1, 5),(1, 6),
(2, 2),(2, 3),(2, 4),(2, 5),(2, 6),(2, 7),(2, 8),(2, 9),
(3, 2),(3, 3),
(4, 6),(4, 7);

-- data user scopes

insert into user_scope (user_id, scope_id)
values 
(1, 1),
(2, 2),(2, 3);

-- data user groups

insert into user_group (user_id, group_id)
values 
(3, 1),
(4, 2);