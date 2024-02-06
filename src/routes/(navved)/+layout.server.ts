import type { Actions, LayoutServerLoad } from './$types';
import {redirect} from "@sveltejs/kit";

export const load = (async ({locals}) => {
    const email = locals.email;
    return { email };
}) satisfies LayoutServerLoad;