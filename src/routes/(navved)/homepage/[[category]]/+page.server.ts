import { db } from '$lib/db/db.server';
import { notes } from '$lib/db/schema';
import type { Actions } from "./$types";
import {and, eq} from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import {redirect} from "@sveltejs/kit";
import {categories, hasCategory} from "../../../../lib/db/schema";

export const load = (async (context) => {
    const { locals } = context;
    if (!locals || !locals.email) {
        throw redirect(303, '/');
    }
    const { params } = context;
    const { category } = params;
    let current_user_notes;
    if (category != null && category != "") {
        current_user_notes = await db
            .select({id: notes.id, name: notes.name}).from(hasCategory)
            .innerJoin(categories, eq(hasCategory.categoryID, categories.id))
            .innerJoin(notes, eq(notes.id, hasCategory.noteID))
            .where(and(eq(categories.name, category), eq(notes.email, locals.email.toString())));
    } else {
        current_user_notes = await db.select().from(notes).where(eq(notes.email, locals.email))
    }
    const note_categories = await db
        .select({noteID: notes.id, categoryName: categories.name}).from(hasCategory)
        .innerJoin(categories, eq(hasCategory.categoryID, categories.id))
        .innerJoin(notes, eq(notes.id, hasCategory.noteID))
        .where(eq(notes.email, locals.email.toString()));

    const just_categories = await db
        .selectDistinct({categoryName: categories.name}).from(hasCategory)
        .innerJoin(categories, eq(hasCategory.categoryID, categories.id))
        .innerJoin(notes, eq(notes.id, hasCategory.noteID))
        .where(eq(notes.email, locals.email.toString()));
    return {
        current_user_notes,
        note_categories,
        just_categories
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ locals , request }) => {
        const data = await request.formData();
        const id = data.get('delButton');

        if (id) {
            await db.delete(hasCategory).where(eq(hasCategory.noteID, parseInt(id)));
            await db.delete(notes).where(and(eq(notes.id, parseInt(id)), eq(notes.email, locals.email.toString())));
            return {success: true};
        } else {
            return {success: false};
        }
    },
} satisfies Actions;