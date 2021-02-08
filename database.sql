-- Drop existing tables to start fresh
DROP TABLE IF EXISTS "user", "project", "task", "task_name", "task_status", "company", "company_location" CASCADE;

-- Table creation
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"email" varchar(255) UNIQUE NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"password" varchar(255) NOT NULL,
	"token" varchar(255),
	"company_fk" integer DEFAULT 1,
	"user_type" varchar(255),
	"archived" BOOLEAN DEFAULT false,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "project" (
	"id" serial NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"PO_Number" varchar(255) NOT NULL,
	"due_date" DATE NOT NULL DEFAULT 'today',
	"company_fk" integer NOT NULL,
	"location_fk" integer NOT NULL,
	"archived" BOOLEAN DEFAULT false,
	CONSTRAINT "project_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "task" (
	"id" serial NOT NULL,
	"poc_fk" integer NOT NULL,
	"scheduled_date" DATE NOT NULL DEFAULT 'today',
	"nlt_date" DATE NOT NULL DEFAULT 'today',
	"task_name_fk" INTEGER NOT NULL,
	"token" varchar(255),
	"task_status_fk" integer NOT NULL,
	"tracking_id" integer,
	"updated_by" varchar(255),
	"technician_info" varchar(255),
	"project_fk" integer NOT NULL,
	"archived" BOOLEAN DEFAULT false,
	CONSTRAINT "task_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "task_name" (
	"id" serial NOT NULL,
	"task_name" varchar(255) NOT NULL,
	"archived" BOOLEAN DEFAULT false,
	CONSTRAINT "task_name_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "task_status" (
	"id" serial NOT NULL,
	"status_type" varchar(255) NOT NULL,
	"archived" BOOLEAN DEFAULT false,
	CONSTRAINT "task_Status_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "company" (
	"id" serial NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"archived" BOOLEAN DEFAULT false,
	CONSTRAINT "company_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "company_location" (
	"id" serial NOT NULL,
	"address" varchar(255) NOT NULL,
	"location_name" varchar(255) NOT NULL,
	"company_fk" integer NOT NULL,
	"archived" BOOLEAN DEFAULT false,
	CONSTRAINT "company_location_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "user" ADD CONSTRAINT "user_fk0" FOREIGN KEY ("company_fk") REFERENCES "company"("id");
ALTER TABLE "project" ADD CONSTRAINT "project_fk0" FOREIGN KEY ("company_fk") REFERENCES "company"("id");
ALTER TABLE "project" ADD CONSTRAINT "project_fk1" FOREIGN KEY ("location_fk") REFERENCES "company_location"("id");
ALTER TABLE "task" ADD CONSTRAINT "task_fk0" FOREIGN KEY ("poc_fk") REFERENCES "user"("id");
ALTER TABLE "task" ADD CONSTRAINT "task_fk1" FOREIGN KEY ("task_name_fk") REFERENCES "task_name"("id");
ALTER TABLE "task" ADD CONSTRAINT "task_fk2" FOREIGN KEY ("project_fk") REFERENCES "project"("id");
ALTER TABLE "task" ADD CONSTRAINT "task_fk3" FOREIGN KEY ("task_status_fk") REFERENCES "task_status"("id");
ALTER TABLE "company_location" ADD CONSTRAINT "company_location_fk0" FOREIGN KEY ("company_fk") REFERENCES "company"("id");
ALTER TABLE "task_status" ADD "archived" BOOLEAN NOT NULL DEFAULT 'false';

--inserts of starter data
insert into company ("company_name") VALUES ('Unassigned'); 
insert into company ("company_name") VALUES ('Critical Coordination'); 
insert into company ("company_name") VALUES ('Costco'); 
insert into company ("company_name") VALUES ('Walmart'); 
insert into company ("company_name") VALUES ('The Electric Contracting Company'); 
insert into company ("company_name") VALUES ('The Materials Supply Company'); 
insert into company_location ("address", "location_name", "company_fk") VALUES ('Unassigned', 'Unassigned', 1);
insert into company_location ("address", "location_name", "company_fk") VALUES ('Bayport, MN', 'Bayport', 2);
insert into company_location ("address", "location_name", "company_fk") VALUES ('1431 Beam Avenue, Maplewood, MN 55115', 'Maplewood', 3);
insert into company_location ("address", "location_name", "company_fk") VALUES ('11330 Fountains Dr, Maple Grove, MN 55369', 'Maple Grove', 3);
insert into company_location ("address", "location_name", "company_fk") VALUES ('850 E Co Rd E East, Vadnais Heights, MN 55127', 'Vadnais Heights', 4);
insert into company_location ("address", "location_name", "company_fk") VALUES ('10240 Hudson Rd, Woodbury, MN 55129', 'Woodbury', 4);
insert into company_location ("address", "location_name", "company_fk") VALUES ('99 Electric Avenue, Shakopee, MN 55379', 'Shakopee', 5);
insert into company_location ("address", "location_name", "company_fk") VALUES ('1000 Electric Supply Avenue, Shakopee, MN 55379', 'Shakopee', 6);
INSERT INTO "public"."user"("email", "first_name", "last_name", "company_fk", "password", "user_type") VALUES('admin@admin.com', 'Pail', 'Gwanlija', 2, '$2a$10$T1FRsJQ4Y9yesCleyQX9o.ssMB3wBjLMx.o9iwGeXtcnyH9bMqEAu', 'admin');
INSERT INTO "public"."user"("email", "first_name", "last_name", "company_fk", "password", "user_type") VALUES('costco@costco.com', 'Cost', 'Co', 3, '$2a$10$T1FRsJQ4Y9yesCleyQX9o.ssMB3wBjLMx.o9iwGeXtcnyH9bMqEAu', 'client');
INSERT INTO "public"."user"("email", "first_name", "last_name", "company_fk", "password", "user_type") VALUES('walmart@walmart.com', 'Wal', 'Mart', 4, '$2a$10$T1FRsJQ4Y9yesCleyQX9o.ssMB3wBjLMx.o9iwGeXtcnyH9bMqEAu', 'client');
INSERT INTO "public"."user"("email", "first_name", "last_name", "company_fk", "password", "user_type") VALUES('contractor@contractor.com', 'Dan', 'Electric', 5, '$2a$10$T1FRsJQ4Y9yesCleyQX9o.ssMB3wBjLMx.o9iwGeXtcnyH9bMqEAu', 'contractor');
INSERT INTO "public"."user"("email", "first_name", "last_name", "company_fk", "password", "user_type") VALUES('supply@supply.com', 'Tim', 'Warehouse', 6, '$2a$10$T1FRsJQ4Y9yesCleyQX9o.ssMB3wBjLMx.o9iwGeXtcnyH9bMqEAu', 'contractor');
--data for projects and tasks FK tables
INSERT INTO task_status ("status_type") VALUES ('Started'), ('Receipt Acknowledged'), ('Shipped'), ('Scheduled'), ('Complete'), ('Invoiced');
INSERT INTO task_name ("task_name") VALUES('Order Materials'), ('Schedule Installation'), ('Invoice');
--sample data for projects
INSERT INTO project ("project_name", "PO_Number", "due_date", "company_fk", "location_fk") VALUES('CostCo Bayport', '1000', '2021-03-01', 2, 2), ('CostCo MapleGrove', '1001', '2021-02-01', 2, 3),
('Walmart Vadnais Heights', '1002', '2021-03-01', 3, 4), ('Walmart Woodbury', '1003', '2021-03-02', 3, 5);

--sample data for tasks
INSERT INTO task ("poc_fk", "scheduled_date", "nlt_date", "task_name_fk", "task_status_fk", "project_fk") 
VALUES(5, '2021-02-08', '2021-02-09', 1, 1, 1), (4, '2021-02-10', '2021-02-11', 2, 1, 1), (5, '2021-02-10', '2021-02-11', 1, 1, 2), 
(4, '2021-02-10', '2021-02-11', 2, 1, 2), (5, '2021-02-10', '2021-02-11', 1, 1, 3), (4, '2021-02-10', '2021-02-11', 2, 1, 3), 
(5, '2021-02-10', '2021-02-11', 1, 1, 4), (4, '2021-02-10', '2021-02-11', 2, 1, 4);

