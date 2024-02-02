import { getSession } from '$lib/sessionStore/index.server';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
  const { cookies } = event;
  const sessionid = cookies.get('sessionid');
  if (sessionid) {
    const session = getSession(sessionid);
    if (session) {
      event.locals.email = session.email;
    } else {
      // remove invalid/expired/unknown cookie
      cookies.delete('sessionid', {path: '/'});
    }
  }

  const response = await resolve(event);
  return response;
}) satisfies Handle;