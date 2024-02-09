import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { page } from '$app/stores';
import { db } from "$lib/db/db.server";
import { users, notes } from "$lib/db/schema";
import { hash } from 'bcrypt';
import { createSession } from '$lib/sessionStore/index.server';
import { eq } from 'drizzle-orm';
export const load = (async (context) => {
    const { locals } = context;
    if (!locals || !locals.email) {
        throw redirect(303, '/');
    }
    const [current_user] = await db.select().from(users).where(eq(users.email, locals.email))
    return {
        current_user
    };
})
const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const actions = {
    updateProfile: async ({ cookies, locals, request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');

        if (!email || !name) {
            return fail(400, { name, email, missing: true });
        }
        if (!validateEmail(email.toString().toLowerCase())) {
            return fail(400, { name, invalidEmail: true });
        }

        const [user] = await db.select().from(users).where(eq(users.email, email.toString().toLowerCase()));

        if (user && user.email != locals.email) {
            return fail(400, { exists: true })
        }

        // @ts-ignore
        const oldEmail = locals.email.toString();
        await db.update(users).set({ name: name.toString(), email: email.toString().toLowerCase()}).where(eq(users.email, oldEmail));
        await db.update(notes).set({email: email.toString().toLowerCase()}).where(eq(notes.email, oldEmail));
        locals.email = email.toString();
        const maxAge = 1000 * 60 * 60 * 24 * 30; // 30 days
        const sessionid = createSession(locals.email, maxAge);
        cookies.set('sessionid', sessionid, {
            maxAge,
            path: "/"
        });
    },
    deleteAccount: async ({ cookies, locals, request }) => {
        let userEmail = locals.email.toString();
        await db.delete(notes).where(eq(notes.email, userEmail.toLowerCase()));
        await db.delete(users).where(eq(users.email, userEmail.toLowerCase()));
        cookies.delete('sessionid', {path: '/'});
        throw redirect(303, '/');

    },

} satisfies Actions;