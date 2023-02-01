const { authManager } = require("@/classes/AuthManager");
const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const tryToVerify = async (req, res) => {
  const { authData } = req;
  const cellphone = userUtilities.extractCellphone(authData.payload);
  const foundUser = await services.findOneUser(cellphone);

  if (foundUser) {
    await removeTemporaryClient(foundUser);

    const userData = userUtilities.extractUserData(foundUser);

    const token = signToken(userData.userId);

    authManager.setTokenToResponse(res, token);

    await addNewSession(userData.userId, token);

    return {
      newUser: false,
      requiredFieldsIndex: 0,
      user: userData,
    };
  }

  return {
    newUser: true,
    //CLEANME: ...
    requiredFieldsIndex: 1,
  };
};

const signToken = (userId) => {
  return authManager.signToken(
    {
      userId,
      date: Date.now(),
    },
    authManager.getJwtMainSecret()
  );
};

const addNewSession = async (userId, newToken) => {
  await services.addNewSession().run({
    newToken,
    userId,
  });
};

const removeTemporaryClient = async (cellphone) => {
  await temporaryClients.removeByCellphone(cellphone);
};

const verify = controllerBuilder.create().body(tryToVerify).build();

module.exports = { verify };
