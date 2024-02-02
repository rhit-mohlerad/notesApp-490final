import { db } from "$lib/db/db.server";
import { users } from "$lib/db/schema";
import { createSession } from '$lib/sessionStore/index.server';
import type { Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { hash, compare } from 'bcrypt';
import { eq } from 'drizzle-orm';


export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
            return fail(400, { email, incorrect: true });
        }

        // const hashed_password = await hash(password.toString(), 12)
        const user_matches = await db.select().from(users).where(eq(users.email, email.toString().toLowerCase()));
        if (user_matches.length == 0) {
            return fail(400, { email, incorrect: true })
        }

        const user = user_matches[0];
        const valid = await compare(password.toString(), user.password)

        if (!valid) {
            return fail(400, { email, incorrect: true });
        }

        const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
        const sessionid = createSession(user.email, maxAge);
        cookies.set('sessionid', sessionid, {
            maxAge,
            path: "/"
        });

        throw redirect(303, '/homepage');
    },
} satisfies Actions;