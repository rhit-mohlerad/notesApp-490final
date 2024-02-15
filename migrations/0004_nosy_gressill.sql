CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'New Category' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hasCategory" (
	"categoryID" integer,
	"noteID" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hasCategory" ADD CONSTRAINT "hasCategory_categoryID_categories_id_fk" FOREIGN KEY ("categoryID") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hasCategory" ADD CONSTRAINT "hasCategory_noteID_notes_id_fk" FOREIGN KEY ("noteID") REFERENCES "notes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
