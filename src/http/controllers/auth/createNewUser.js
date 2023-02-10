const { errorThrower } = require("utility-store/src/utilities/utilities");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { authManager } = require("@/classes/AuthManager");
const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userUtilities } = require("@/classes/UserUtilities");

const { models } = require("@/models");

const { services } = require("@/services");

const { validators } = require("@/validators");

const { errors } = require("@/variables/errors");

const tryToCreateNewUser = async (req, res) => {
  const {
    authData: {
      data: {
        payload: { tokenId },
      },
    },
    body: { firstName, lastName },
  } = req;

  const client = await findClient(tokenId);
  checkClient(client);
  const cellphone = userUtilities.extractCellphone(client);

  await validators.firstName(firstName);
  await validators.lastName(lastName);
  await checkExistenceOfUser(cellphone);

  const userId = getRandomId();
  const token = signToken(userId);
  authManager.setTokenToResponse(res, token);

  const data = {
    user: {
      ...userUtilities.defaultUserData(),
      ...cellphone,
      firstName,
      lastName,
      createdAt: Date.now(),
      userId,
    },
  };

  const userDataForDatabase = fixUserDataForDb(data, token);
  await createNewUserAndSave(userDataForDatabase);
  await removeTemporaryClient(client.tokenId);
  return data;
};

const findClient = async (tokenId) => await temporaryClients.find(tokenId);

const checkClient = (client) => {
  errorThrower(!client, errors.TEMPORARY_CLIENT_NOT_FOUND);
  errorThrower(!client.isVerified, {
    ...errors.TEMPORARY_CLIENT_NOT_VERIFIED,
    createNewUser: "failed",
  });
};

const checkExistenceOfUser = async (cellphone) => {
  const foundUser = await services.findOneUser(cellphone);
  errorThrower(foundUser, () => errors.USER_EXIST);
  return foundUser;
};

const getRandomId = () =>
  randomMaker.id(models.native.user.userId.maxlength.value);

const signToken = (tokenId) => {
  return authManager.signToken({
    tokenId,
    date: Date.now(),
  });
};

const fixUserDataForDb = (data, token) => {
  return {
    ...data.user,
    sessions: [{ token }],
  };
};

const createNewUserAndSave = async (userDataForDatabase) => {
  await services.createNewUser().run(userDataForDatabase);
};

const removeTemporaryClient = async (cellphone) => {
  await temporaryClients.remove(cellphone);
};

const createNewUser = controllerBuilder
  .create()
  .body(tryToCreateNewUser)
  .build();

module.exports = { createNewUser };
