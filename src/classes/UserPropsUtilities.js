const {
  UserPropsUtilities: UserPropsUtilitiesMain,
} = require("utility-store/src/classes/UserPropsUtilities");

class UserPropsUtilities extends UserPropsUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  getDataFromVerifiedToken(verifiedToken) {
    return verifiedToken.payload;
  }
  getUserIdFromVerifiedToken(verifiedToken) {
    return this.getDataFromVerifiedToken(verifiedToken).userId;
  }
}

const userPropsUtilities = new UserPropsUtilities();

module.exports = { userPropsUtilities };
