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

const tryToCreateNewUser = async (req) => {
  const {
    body: { firstName, lastName },
  } = req;
  const token = authManager.getTokenFromRequest(req);

  const cellphone = await extractCellphoneFromToken(token);

  const userId = getRandomId();

  await validators.firstName(firstName);
  await validators.lastName(lastName);
  await checkTemporaryClient(cellphone);
  await checkExistenceOfUser(cellphone);

  const newToken = signToken(userId);

  const data = {
    user: {
      ...userUtilities.defaultUserData(),
      ...cellphone,
      firstName,
      lastName,
      userId,
    },
    token: newToken,
  };

  const userDataForDatabase = fixUserDataForDb(data);
  await createNewUserAndSave(userDataForDatabase);
  await removeTemporaryClient(cellphone);
  return data;
};

const extractCellphoneFromToken = async (token) => {
  const jwtSecret = authManager.getJwtSignInSecret();
  const verifiedToken = await validators.token(token, jwtSecret);
  return userUtilities.extractCellphone(verifiedToken.payload);
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

const fixUserDataForDb = ({ token, ...rest }) => {
  return {
    ...rest.user,
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
