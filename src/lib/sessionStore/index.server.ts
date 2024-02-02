import { randomBytes } from 'node:crypto';

let nextClean = Date.now() + 1000 * 60 * 60;

type SessionInfo = {
    email: string;
    invalidAt: number;
};

const sessionStore = new Map<string, SessionInfo>();


function clean() {
    const now = Date.now();
    for (const [sessionid, session] of sessionStore) {
      if (session.invalidAt < now) {
        sessionStore.delete(sessionid);
      }
    }
    nextClean = Date.now() + 1000 * 60 * 60; // 1 hour
}

function getSessionid(): string {
    return randomBytes(64).toString('hex');
}

export function createSession(email: string, maxAge: number): string {
    let sessionid: string = '';

    do {
        sessionid = getSessionid();
    } while (sessionStore.has(sessionid));

    sessionStore.set(sessionid, {
        email,
        invalidAt: Date.now() + maxAge,
    });

    return sessionid;
}

if (Date.now() > nextClean) {
    setTimeout(() => {
      clean();
    }, 5000);
}

export function getSession(sessionid: string): SessionInfo | undefined {
    const session = sessionStore.get(sessionid);
    if (session) {
      if (Date.now() > session.invalidAt) {
        console.log('delete invalid session', sessionid);
        sessionStore.delete(sessionid);
        return undefined;
      } else {
        return session;
      }
    } else {
      console.log('session not found', sessionid);
      return undefined;
    }
  }