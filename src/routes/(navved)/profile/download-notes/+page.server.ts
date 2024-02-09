import {redirect} from '@sveltejs/kit';
import {db} from "$lib/db/db.server";
import {notes} from "$lib/db/schema";
import {eq} from 'drizzle-orm';
export const load = (async (context) => {
    const {locals} = context;
    if (!locals || !locals.email) {
        throw redirect(303, '/');
    }
    const noteArray = await db.select().from(notes).where(eq(notes.email, locals.email));
    return {
        noteArray
    }
})