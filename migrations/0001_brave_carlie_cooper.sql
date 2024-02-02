CREATE TABLE IF NOT EXISTS "notes" (
	"email" text NOT NULL,
	"name" text DEFAULT 'New Note' NOT NULL,
	"content" text
);
