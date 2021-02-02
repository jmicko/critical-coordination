CREATE TABLE "User" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL,
	"company" VARCHAR(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"company_fk" integer NOT NULL,
	"admin" BOOLEAN NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Project" (
	"id" integer NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"PO_Number" varchar(255) NOT NULL,
	"due_date" DATE NOT NULL DEFAULT 'today',
	"company_fk" integer NOT NULL,
	"location_fk" integer NOT NULL,
	CONSTRAINT "Project_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Task" (
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
	CONSTRAINT "Task_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Task_name" (
	"id" serial NOT NULL,
	"task_name" varchar(255) NOT NULL,
	"task_phase" varchar(255) NOT NULL,
	CONSTRAINT "Task_name_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "Task_Status" (
	"id" serial NOT NULL,
	"status_type" varchar(255) NOT NULL,
	CONSTRAINT "Task_Status_pk" PRIMARY KEY ("id")
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
ALTER TABLE "User" ADD CONSTRAINT "User_fk0" FOREIGN KEY ("company_fk") REFERENCES "company"("id");
ALTER TABLE "Project" ADD CONSTRAINT "Project_fk0" FOREIGN KEY ("company_fk") REFERENCES "company"("id");
ALTER TABLE "Project" ADD CONSTRAINT "Project_fk1" FOREIGN KEY ("location_fk") REFERENCES "company_location"("id");
ALTER TABLE "Task" ADD CONSTRAINT "Task_fk0" FOREIGN KEY ("poc_fk") REFERENCES "User"("id");
ALTER TABLE "Task" ADD CONSTRAINT "Task_fk1" FOREIGN KEY ("task_name_fk") REFERENCES "Task_name"("id");
ALTER TABLE "Task" ADD CONSTRAINT "Task_fk2" FOREIGN KEY ("project_fk") REFERENCES "Project"("id");
ALTER TABLE "Task" ADD CONSTRAINT "Task_fk3" FOREIGN KEY ("task_status_fk") REFERENCES "Task_Status"("id");
ALTER TABLE "company_location" ADD CONSTRAINT "company_location_fk0" FOREIGN KEY ("company_fk") REFERENCES "company"("id");