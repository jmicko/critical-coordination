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
	"ordered_by" varchar(255),
	"started_date" DATE NOT NULL DEFAULT 'today',
	"due_date" DATE NOT NULL DEFAULT 'today',
	"notes" varchar(5000) DEFAULT 'none',
	"company_fk" integer NOT NULL,
	"location_fk" integer NOT NULL,
	"expedited" BOOLEAN DEFAULT false,
	"archived" BOOLEAN DEFAULT false,
	CONSTRAINT "project_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "task" (
	"id" serial NOT NULL,
	"poc_fk" integer,
	"company_fk" integer,
	"scheduled_date" DATE,
	"nlt_date" DATE NOT NULL DEFAULT 'today',
	"task_name_fk" INTEGER NOT NULL,
	"token" varchar(255),
	"task_status_fk" integer NOT NULL,
	"tracking_id" varchar(25),
	"updated_by" varchar(255),
	"technician_info" varchar(255),
	"project_fk" integer NOT NULL,
	"notes" varchar(9999),
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

--inserts of starter data
insert into company ("company_name") 
VALUES ('Unassigned'), ('Critical Coordination'), ('AT&T DataCenter'), ('Datalink'), ('The Electric Contracting Company'), ('The Materials Supply Company'), ('Verizon'); 
insert into company_location ("address", "location_name", "company_fk") 
-- company location data
VALUES ('Unassigned', 'Unassigned', 1),('Bayport, MN', 'Bayport', 2), ('1431 Beam Avenue, Maplewood, MN 55115', 'Maplewood', 3), 
('11330 Fountains Dr, Maple Grove, MN 55369', 'Maple Grove', 3), ('850 E Co Rd E East, Vadnais Heights, MN 55127', 'Vadnais Heights', 4), 
('10240 Hudson Rd, Woodbury, MN 55129', 'Woodbury', 4), ('99 Electric Avenue, Shakopee, MN 55379', 'Shakopee', 5), ('1000 Electric Supply Avenue, Shakopee, MN 55379', 'Shakopee', 6);
--user data
INSERT INTO "public"."user"("email", "first_name", "last_name", "company_fk", "password", "user_type") VALUES('admin@admin.com', 'Tom', 'Darrow', 2, '$2a$10$Web1/wZqAWT9p36Od3/b2.SAwVJr9NoygJrvWmu42LX1/3K.BXrL.', 'admin');
INSERT INTO "public"."user"("email", "first_name", "last_name", "company_fk", "password", "user_type") VALUES('client@att.com', 'John', 'Doe', 3, '$2a$10$Web1/wZqAWT9p36Od3/b2.SAwVJr9NoygJrvWmu42LX1/3K.BXrL.', 'client');
INSERT INTO "public"."user"("email", "first_name", "last_name", "company_fk", "password", "user_type") VALUES('client@datasite.com', 'John', 'Deer', 4, '$2a$10$Web1/wZqAWT9p36Od3/b2.SAwVJr9NoygJrvWmu42LX1/3K.BXrL.', 'client');
INSERT INTO "public"."user"("email", "first_name", "last_name", "company_fk", "password", "user_type") VALUES('dan@electric.com', 'Dan', 'Porter', 5, '$2a$10$Web1/wZqAWT9p36Od3/b2.SAwVJr9NoygJrvWmu42LX1/3K.BXrL.', 'contractor');
INSERT INTO "public"."user"("email", "first_name", "last_name", "company_fk", "password", "user_type") VALUES('tim@materials.com', 'Tim', 'Washman', 6, '$2a$10$Web1/wZqAWT9p36Od3/b2.SAwVJr9NoygJrvWmu42LX1/3K.BXrL.', 'contractor');
--data for projects and tasks FK tables
INSERT INTO task_status ("status_type") VALUES ('Started'), ('Receipt Acknowledged'), ('Shipped'), ('Scheduled'), ('Complete'), ('Invoiced');
INSERT INTO task_name ("task_name") VALUES('Order Materials'), ('Schedule Installation'), ('Invoice'), ('Custom');
--sample data for projects
INSERT INTO project ("project_name", "PO_Number", "due_date", "company_fk", "location_fk", "notes") VALUES('AT&T Install', '1000', '2021-03-01', 3, 2, 'Cable Install to be completed no later than 3-1-21'), ('AT&T Maplewood', '1001', '2021-02-28', 3, 3, 'Cable Install to be completed by 2-28-21'),
('Datalink Maple Grove', '1002', '2021-03-01', 4, 4, 'new project due 3-1-21'), ('Datalink Woodbury', '1003', '2021-03-02', 4, 5, 'new project/install due 3-2-21');
--sample data for tasks
INSERT INTO task ("poc_fk", "company_fk", "scheduled_date", "nlt_date", "task_name_fk", "task_status_fk", "project_fk") 
VALUES(5, 6, '2021-02-08', '2021-02-09', 1, 1, 1), (4, 5, '2021-02-10', '2021-02-11', 2, 1, 1), (5, 6, '2021-02-10', '2021-02-11', 1, 1, 2), 
(4, 5, '2021-02-10', '2021-02-11', 2, 1, 2), (5, 6, '2021-02-10', '2021-02-11', 1, 1, 3), (4, 5, '2021-02-10', '2021-02-11', 2, 1, 3), 
(5, 6, '2021-02-10', '2021-02-11', 1, 1, 4), (4, 5, '2021-02-10', '2021-02-11', 2, 1, 4);
