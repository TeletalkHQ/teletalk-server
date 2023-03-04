import { UserUtilities as UserUtilitiesMain } from "utility-store";

import { authManager } from "@/classes/AuthManager";

class UserUtilities extends UserUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  getDataFromVerifiedToken(verifiedToken) {
    return verifiedToken.data;
  }
  getPayloadFromVerifiedToken(verifiedToken) {
    return this.getDataFromVerifiedToken(verifiedToken).payload;
  }
  getUserIdFromVerifiedToken(verifiedToken) {
    return this.getPayloadFromVerifiedToken(verifiedToken).tokenId;
  }
  getUserIdFromToken(token) {
    const verifiedToken = authManager.verifyToken(token);
    return this.getUserIdFromVerifiedToken(verifiedToken);
  }
}

const userUtilities = new UserUtilities();

export { userUtilities };
