const {
  UserPropsUtilities: UserPropsUtilitiesMain,
} = require("utility-store/src/classes/UserPropsUtilities");

class UserPropsUtilities extends UserPropsUtilitiesMain {
  constructor(id) {
    super();
    this.id = id;
  }

  getTokenFromUserObject(userObject) {
    return userObject.sessions[0]?.token || "";
  }
}

const userPropsUtilities = new UserPropsUtilities();

module.exports = { userPropsUtilities };
