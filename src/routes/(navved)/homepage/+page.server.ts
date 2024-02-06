import { db } from '$lib/db/db.server';
import { notes } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async (context) => {
    const { locals } = context;
    if (!locals || !locals.email) {
        // Handle the case where locals or locals.email is undefined
        return {
            current_user_notes: [],
        };
    }
    const current_user_notes = await db.select().from(notes).where(eq(notes.email, locals.email))
    return {
        current_user_notes
    };
}) satisfies PageServerLoad;