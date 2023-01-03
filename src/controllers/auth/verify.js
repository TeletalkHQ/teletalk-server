const { authManager } = require("@/classes/AuthManager");
const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToVerify = async (req) => {
  const { authData } = req;
  const cellphone = userPropsUtilities.extractCellphone(authData.payload);
  const foundUser = await services.findOneUser(cellphone);

  if (foundUser) {
    await removeTemporaryClient(foundUser);

    const { sessions, ...userData } =
      userPropsUtilities.extractUserData(foundUser);

    const token = signToken(userData);
    await addNewToken(userData.userId, token);

    return {
      newUser: false,
      requiredFieldsIndex: 0,
      token,
      user: userData,
    };
  }

  return {
    newUser: true,
    requiredFieldsIndex: 1,
  };
};

const signToken = (userData) => {
  return authManager.signToken({
    ...userPropsUtilities.extractCellphone(userData),
    userId: userData.userId,
  });
};

const addNewToken = async (userId, newToken) => {
  await services.addNewToken().run({
    newToken,
    userId,
  });
};

const removeTemporaryClient = async (cellphone) => {
  await temporaryClients.remove(cellphone);
};

const verify = controllerBuilder.create().body(tryToVerify).build();

module.exports = { verify };
