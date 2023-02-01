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
    authData,
    body: { firstName, lastName },
  } = req;
  const cellphone = await extractCellphoneFromToken(authData.payload);

  const userId = getRandomId();

  await validators.firstName(firstName);
  await validators.lastName(lastName);
  await checkTemporaryClient(cellphone);
  await checkExistenceOfUser(cellphone);

  const token = signToken(userId);
  authManager.setTokenToResponse(res, token);

  const data = {
    user: {
      ...userUtilities.defaultUserData(),
      ...cellphone,
      firstName,
      lastName,
      userId,
    },
  };

  const userDataForDatabase = fixUserDataForDb(data, token);
  await createNewUserAndSave(userDataForDatabase);
  await removeTemporaryClient(cellphone);
  return data;
};

const extractCellphoneFromToken = async (authData) => {
  return userUtilities.extractCellphone(authData);
};

const checkTemporaryClient = async (cellphone) => {
  const client = await temporaryClients.find(cellphone);
  errorThrower(!client, {
    ...errors.TEMPORARY_CLIENT_NOT_FOUND,
    cellphone,
  });

  errorThrower(!client.isVerified, errors.TEMPORARY_CLIENT_NOT_VERIFIED);
};

const checkExistenceOfUser = async (cellphone) => {
  const foundUser = await services.findOneUser(cellphone);
  errorThrower(foundUser, () => errors.USER_EXIST);
  return foundUser;
};

const getRandomId = () =>
  randomMaker.id(models.native.user.userId.maxlength.value);

const signToken = (userId) => {
  return authManager.signToken({
    userId,
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
  await temporaryClients.removeByCellphone(cellphone);
};

const createNewUser = controllerBuilder
  .create()
  .body(tryToCreateNewUser)
  .build();

module.exports = { createNewUser };
