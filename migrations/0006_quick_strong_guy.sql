ALTER TABLE "hasCategory" DROP CONSTRAINT "hasCategory_noteID_notes_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hasCategory" ADD CONSTRAINT "hasCategory_noteID_notes_id_fk" FOREIGN KEY ("noteID") REFERENCES "notes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
