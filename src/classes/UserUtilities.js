const {
  UserUtilities: UserUtilitiesMain,
} = require("utility-store/src/classes/UserUtilities");

class UserUtilities extends UserUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  getDataFromVerifiedToken(verifiedToken) {
    return verifiedToken.payload;
  }
  getUserIdFromVerifiedToken(verifiedToken) {
    return this.getDataFromVerifiedToken(verifiedToken).tokenId;
  }
}

const userUtilities = new UserUtilities();

module.exports = { userUtilities };
