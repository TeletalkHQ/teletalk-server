const { authManager } = require("@/classes/AuthManager");
const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const tryToVerify = async (req, res) => {
  const {
    authData: {
      data: {
        payload: { tokenId },
      },
    },
  } = req;
  const client = await temporaryClients.find(tokenId);

  const cellphone = userUtilities.extractCellphone(client);
  const foundUser = await services.findOneUser(cellphone);

  if (foundUser) {
    await removeTemporaryClient(tokenId);

    const token = signToken(foundUser.userId);
    authManager.setTokenToResponse(res, token);
    await addNewSession(foundUser.userId, token);

    return {
      newUser: false,
    };
  }

  return {
    newUser: true,
  };
};

const signToken = (tokenId) => {
  return authManager.signToken(
    {
      tokenId,
      date: Date.now(),
    },
    authManager.getMainSecret()
  );
};

const addNewSession = async (userId, newToken) => {
  await services.addNewSession().run({
    newToken,
    userId,
  });
};

const removeTemporaryClient = async (tokenId) => {
  await temporaryClients.remove(tokenId);
};

const verify = controllerBuilder.create().body(tryToVerify).build();

module.exports = { verify };
