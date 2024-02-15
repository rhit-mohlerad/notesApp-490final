import { db } from "$lib/db/db.server";
import type { Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import {and, eq, sql, isNull} from 'drizzle-orm';
import {hasCategory, notes, categories} from "../../../../lib/db/schema";
import type { PageServerLoad } from './$types';

export const actions = {
    saveNote: async ({ locals, params , request }) => {
        const { id } = params;
        const data = await request.formData();
        const title = data.get('title');
        const content = data.get('textarea');
        const categoriesList = JSON.parse(data.get('categories'));
        let email = locals.email;
        let noteID;
        // let [currentNote] = await db.select().from(notes).where(and(eq(notes.id, parseInt(id)), eq(notes.email, email.toString())));
        if (!title || !content) {
            return fail(400, { content, title, missing: true });
        }
        if (id) {
            noteID = parseInt(id);
            await db.update(notes).set({content: content, name: title }).where(and(eq(notes.id, parseInt(id)), eq(notes.email, email.toString())));
        } else {
            const newNote = await db.insert(notes).values({email: email, content: content, name: title }).returning();
            noteID = newNote[0].id;
        }



        //Deleting categories that exist in case user removed categories
        await db.delete(hasCategory).where(eq(hasCategory.noteID, noteID));
        //all categories are added to note
        for (const category of categoriesList) {
            const existingCategory = await db.select().from(categories).where(eq(categories.name, category))
            if (existingCategory.length != 0) {
                await db.insert(hasCategory).values({categoryID: existingCategory[0].id, noteID: noteID})
            } else {
                const newCategory = await db.insert(categories).values({name: category}).returning();
                console.log(newCategory[0].id);
                await db.insert(hasCategory).values({categoryID: newCategory[0].id, noteID: noteID})
            }
        }

        //gets rid of phantom categories if no notes use them
        const catsToDelete = await db.select().from(categories).leftJoin(hasCategory, eq(categories.id, hasCategory.categoryID)).where(isNull(hasCategory.noteID));
        for (const category of catsToDelete) {
            await db.delete(categories).where(eq(categories.id, category.categories.id))
        }

        throw redirect(303, '/homepage');
    },
} satisfies Actions;


export const load = (async (context) => {
    const { locals } = context;
    if (!locals.email) {
        throw redirect(303, '/');
    }
    const { params } = context;
    // Access route parameters
    const { id } = params;
    if (id === undefined) {
        // Handle the case where locals or locals.email is undefined
        const current_note = {
            content: "# Start typing!",
            id: 0,
            email: "",
            name: ""

        };
        return {current_note};
    }
    const [current_note] = await db.select().from(notes).where(and(eq(notes.id, parseInt(id)), eq(notes.email, locals.email.toString())));
    const note_categories = await db
        .select({categoryName: categories.name}).from(hasCategory)
        .innerJoin(categories, eq(hasCategory.categoryID, categories.id))
        .innerJoin(notes, eq(notes.id, hasCategory.noteID))
        .where(and(eq(notes.id, parseInt(id)), eq(notes.email, locals.email.toString())));
    return {
        current_note,
        note_categories
    };
}) satisfies PageServerLoad;

