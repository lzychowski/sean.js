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

-- stored procedures

CREATE OR REPLACE FUNCTION public.modifygroupscopes(
	_group_id integer,
	_scopes integer[])
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE 
AS $BODY$

DECLARE
	field INT;
	temprow RECORD;
BEGIN

-- disable all rows not in list
FOR temprow IN 
select gs.id, gs.group_id, gs.scope_id from group_scope gs where gs.group_id = _group_id and gs.scope_id != all(_scopes) 
LOOP
	UPDATE group_scope
	SET	active = false, updated_time = now()
	WHERE group_id = temprow.group_id AND scope_id = temprow.scope_id AND active != false;
END LOOP;

FOREACH field IN ARRAY _scopes LOOP
	INSERT INTO group_scope (group_id, scope_id)
	SELECT _group_id, field
	WHERE
	NOT EXISTS (
		SELECT gs.group_id, gs.scope_id FROM group_scope gs WHERE gs.group_id = _group_id AND gs.scope_id = field AND gs.active != false
	);
END LOOP;

END;

$BODY$;

ALTER FUNCTION public.modifygroupscopes(integer, integer[])
    OWNER TO postgres;

--------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.modifyuserscopes(
	_user_id integer,
	_scopes integer[])
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE 
AS $BODY$

DECLARE
	field INT;
	temprow RECORD;
BEGIN

-- disable all rows not in list
FOR temprow IN 
select us.id, us.user_id, us.scope_id from user_scope us where us.user_id = _user_id and us.scope_id != all(_scopes) 
LOOP
	UPDATE user_scope
	SET	active = false, updated_time = now()
	WHERE user_id = temprow.user_id AND scope_id = temprow.scope_id AND active != false;
END LOOP;

FOREACH field IN ARRAY _scopes LOOP
	INSERT INTO user_scope (user_id, scope_id)
	SELECT _user_id, field
	WHERE
	NOT EXISTS (
		SELECT us.user_id, us.scope_id FROM user_scope us WHERE us.user_id = _user_id AND us.scope_id = field AND us.active != false
	);
END LOOP;

	
END;

$BODY$;

ALTER FUNCTION public.modifyuserscopes(integer, integer[])
    OWNER TO postgres;

-------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.modifyusergroups(
	_user_id integer,
	_groups integer[])
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE 
AS $BODY$

DECLARE
	field INT;
	temprow RECORD;
BEGIN

-- disable all rows not in list
FOR temprow IN 
select ug.id, ug.user_id, ug.group_id from user_group ug where ug.user_id = _user_id and ug.group_id != all(_groups) 
LOOP
	UPDATE user_group
	SET	active = false, updated_time = now()
	WHERE user_id = temprow.user_id AND group_id = temprow.group_id AND active != false;
END LOOP;

FOREACH field IN ARRAY _groups LOOP
	INSERT INTO user_group (user_id, group_id)
	SELECT _user_id, field
	WHERE
	NOT EXISTS (
		SELECT ug.user_id, ug.group_id FROM user_group ug WHERE ug.user_id = _user_id AND ug.group_id = field AND ug.active != false
	);
END LOOP;

	
END;

$BODY$;

ALTER FUNCTION public.modifyuserscopes(integer, integer[])
    OWNER TO postgres;