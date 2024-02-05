import { db } from "$lib/db/db.server";
import { users } from "$lib/db/schema";
import type { Actions } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { hash } from 'bcrypt';
import { eq } from 'drizzle-orm';

const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const password = data.get('password');
        const password_confirmation = data.get('password_confirmation');

        if (!email || !name || !password || !password_confirmation) {
            return fail(400, { name, email, missing: true });
        }
        if (!validateEmail(email.toString().toLowerCase())) {
            return fail(400, { name, invalidEmail: true });
        }
        if (password != password_confirmation) {
            return fail(400, { name, email, incorrect: true });
        }

        const hashed_password = await hash(password.toString(), 12)

        const user = await db.select().from(users).where(eq(users.email, email.toString().toLowerCase()));

        if (user.length != 0) {
            return fail(400, { exists: true })
        }

        await db.insert(users).values({ name: name.toString(), email: email.toString().toLowerCase(), password: hashed_password });

        throw redirect(303, '/login?signupsuccess');
    },
} satisfies Actions;