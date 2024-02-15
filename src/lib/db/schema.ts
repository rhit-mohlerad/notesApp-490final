// src/lib/db/schema.ts

import {integer, pgTable, primaryKey, serial, text} from "drizzle-orm/pg-core";

export const users = pgTable("users",{
    name:text("name").notNull(),
    email:text("email").primaryKey(),
    password:text("password").notNull(),
})

export const notes = pgTable("notes",{
    id:serial("id").primaryKey(),
    email:text("email").notNull(),
    name:text("name").notNull().default("New Note"),
    content:text("content"),
})

export const categories = pgTable("categories",{
    id:serial("id").primaryKey(),
    name:text("name").notNull().default("New Category")
})

export const hasCategory = pgTable("hasCategory",{
    categoryID: integer("categoryID").references(() => categories.id),
    noteID: integer("noteID").references(() => notes.id, { onDelete: 'cascade' })
}, (table) => {
    return {
        pk: primaryKey({columns: [table.categoryID, table.noteID]})
    };
});