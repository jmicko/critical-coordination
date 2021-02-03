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
	"company_fk" integer,
	"admin" BOOLEAN,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "project" (
	"id" integer NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"PO_Number" varchar(255) NOT NULL,
	"due_date" DATE NOT NULL DEFAULT 'today',
	"company_fk" integer NOT NULL,
	"location_fk" integer NOT NULL,
	CONSTRAINT "project_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "task" (
	"id" serial NOT NULL,
	"poc_fk" integer NOT NULL,
	"task_name" varchar(255) NOT NULL,
	"scheduled_date" DATE NOT NULL DEFAULT 'today',
	"nlt_date" DATE NOT NULL DEFAULT 'today',
	"task_name_fk" INTEGER NOT NULL,
	"token" varchar(255) NOT NULL,
	"task_status_fk" integer NOT NULL,
	"tracking_id" integer,
	"updated_by" varchar(255),
	"technician_info" varchar(255),
	"project_fk" integer NOT NULL,
	CONSTRAINT "task_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "task_name" (
	"id" serial NOT NULL,
	"task_name" varchar(255) NOT NULL,
	"task_phase" varchar(255) NOT NULL,
	CONSTRAINT "task_name_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "task_status" (
	"id" serial NOT NULL,
	"status_type" varchar(255) NOT NULL,
	CONSTRAINT "task_Status_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "company" (
	"id" serial NOT NULL,
	"company_name" varchar(255) NOT NULL,
	CONSTRAINT "company_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "company_location" (
	"id" serial NOT NULL,
	"address" varchar(255) NOT NULL,
	"location_name" varchar(255) NOT NULL,
	"company_fk" integer NOT NULL,
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
INSERT INTO "public"."user"("email", "first_name", "last_name", "password", "admin") VALUES('admin@admin.com', 'Pail', 'Gwanlija', '$2a$10$T1FRsJQ4Y9yesCleyQX9o.ssMB3wBjLMx.o9iwGeXtcnyH9bMqEAu', TRUE);
insert into company ("company_name") VALUES ('Costco'); 
insert into company_location ("address", "location_name", "company_fk") VALUES ('1431 Beam Avenue, Maplewood, MN 55115', 'Maplewood', 1);
insert into company_location ("address", "location_name", "company_fk") VALUES ('11330 Fountains Dr, Maple Grove, MN 55369', 'Maple Grove', 1);

