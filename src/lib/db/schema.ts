// src/lib/db/schema.ts

import { pgTable,serial,text } from "drizzle-orm/pg-core";

export const users = pgTable("users",{
    email:text("email").primaryKey(),
    password:text("password").notNull(),
})

export const notes = pgTable("notes",{
    id:serial("id").primaryKey(),
    email:text("email").notNull(),
    name:text("name").notNull().default("New Note"),
    content:text("content"),
})