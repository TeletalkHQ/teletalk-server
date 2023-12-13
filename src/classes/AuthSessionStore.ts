import { SessionId } from "teletalk-type-store";

import { StoredAuthSession } from "~/types";

import { Store } from "./Store";

export class AuthSessionStore extends Store {
  protected STATE_KEY = "SESSION_ID";

  async find(sessionId: SessionId): Promise<StoredAuthSession | null> {
    return super.find(sessionId);
  }

  async add(sessionId: SessionId, data: StoredAuthSession) {
    await super.add(sessionId, data);
  }

  async update(sessionId: SessionId, newData: StoredAuthSession) {
    await super.update(sessionId, newData);
  }
}

export const authSessionStore = new AuthSessionStore();
