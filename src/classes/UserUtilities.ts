import { UserUtilities as UserUtilitiesMain } from "utility-store";

import { authManager } from "@/classes/AuthManager";
import { Verified } from "@/types";

class UserUtilities extends UserUtilitiesMain {
  constructor() {
    super();
  }

  getDataFromVerified(verified: Verified) {
    return verified.data;
  }
  getPayloadFromVerified(verified: Verified) {
    return this.getDataFromVerified(verified).payload;
  }
  getUserIdFromVerified(verified: Verified) {
    return this.getPayloadFromVerified(verified).sessionId;
  }
  getId(session: string) {
    const verified = authManager.verify(session);
    return this.getUserIdFromVerified(verified);
  }
}

const userUtilities = new UserUtilities();

export { userUtilities };
