import { UserUtilities as UserUtilitiesMain } from "utility-store";

import { authManager } from "@/classes/AuthManager";
import { VerifiedSession } from "@/types";

class UserUtilities extends UserUtilitiesMain {
  constructor() {
    super();
  }

  getDataFromVerified(verified: VerifiedSession) {
    return verified.data;
  }
  getPayloadFromVerified(verified: VerifiedSession) {
    return this.getDataFromVerified(verified).payload;
  }
  getUserIdFromVerified(verified: VerifiedSession) {
    return this.getPayloadFromVerified(verified).sessionId;
  }
  getId(session: string) {
    const verified = authManager.verify(session);
    return this.getUserIdFromVerified(verified);
  }
}

const userUtilities = new UserUtilities();

export { userUtilities };
