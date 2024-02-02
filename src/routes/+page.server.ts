import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    const email = locals.email;
    return { email };
}) satisfies PageServerLoad;

export const actions = {
    logout: async ({ cookies }) => {
        cookies.delete('sessionid', {path: '/'});

        throw redirect(303, '/login?logout');
    },
} satisfies Actions;