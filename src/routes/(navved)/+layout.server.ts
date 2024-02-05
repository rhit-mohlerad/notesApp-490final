import type { Actions, LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {
    const email = locals.email;
    return { email };
}) satisfies LayoutServerLoad;