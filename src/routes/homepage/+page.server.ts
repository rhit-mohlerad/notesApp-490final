import { db } from '$lib/db/db.server';
import { notes } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const current_user_notes = await db.select().from(notes).where(eq(notes.email, "henry@hmorin.com"))
    return {
        current_user_notes
    };
}) satisfies PageServerLoad;