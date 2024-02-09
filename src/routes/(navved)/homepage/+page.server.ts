import { db } from '$lib/db/db.server';
import { notes } from '$lib/db/schema';
import type { Actions } from "./$types";
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import {redirect} from "@sveltejs/kit";

export const load = (async (context) => {
    const { locals } = context;
    if (!locals || !locals.email) {
        throw redirect(303, '/');
    }
    const current_user_notes = await db.select().from(notes).where(eq(notes.email, locals.email))
    return {
        current_user_notes
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ locals , request }) => {
        const data = await request.formData();
        const id = data.get('delButton');

        if (id) {
            await db.delete(notes).where(eq(notes.id, parseInt(id)));
            return {success: true};
        } else {
            return {success: false};
        }
    },
} satisfies Actions;