import { UserUtilities as UserUtilitiesMain } from "utility-store";

import { authManager } from "@/classes/AuthManager";
import { VerifiedToken } from "@/types";

class UserUtilities extends UserUtilitiesMain {
  constructor() {
    super();
  }

  getDataFromVerifiedToken(verifiedToken: VerifiedToken) {
    return verifiedToken.data;
  }
  getPayloadFromVerifiedToken(verifiedToken: VerifiedToken) {
    return this.getDataFromVerifiedToken(verifiedToken).payload;
  }
  getUserIdFromVerifiedToken(verifiedToken: VerifiedToken) {
    return this.getPayloadFromVerifiedToken(verifiedToken).sessionId;
  }
  getTokenId(token: string) {
    const verifiedToken = authManager.verifyToken(token);
    return this.getUserIdFromVerifiedToken(verifiedToken);
  }
}

const userUtilities = new UserUtilities();

export { userUtilities };
