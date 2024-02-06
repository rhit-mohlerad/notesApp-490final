import { db } from "$lib/db/db.server";
import type { Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import {notes} from "../../../../lib/db/schema";
import type { PageServerLoad } from './$types';

export const actions = {
    default: async ({ locals, params , request }) => {
        const { id } = params;
        const data = await request.formData();
        const title = data.get('title');
        const content = data.get('textarea');
        let email;
        if (!locals.email) {
            email = " ";
        } else {
            email = locals.email;
        }

        if (!title || !content) {
            return fail(400, { content, title, missing: true });
        }
        if (id) {
            await db.update(notes).set({content: content, name: title }).where(eq(notes.id, parseInt(id)));
        } else {
            await db.insert(notes).values({email: email, content: content, name: title });
        }

        throw redirect(303, '/homepage');
    },
} satisfies Actions;


export const load = (async (context) => {
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
    const [current_note] = await db.select().from(notes).where(eq(notes.id, parseInt(id)))
    return {
        current_note
    };
}) satisfies PageServerLoad;

