const { errorThrower } = require("utility-store/src/functions/utilities");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { authManager } = require("@/classes/AuthManager");
const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

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
  await findTemporaryClient(cellphone);
  await findUserInDb(cellphone);

  const newToken = await signToken(cellphone, userId);

  const userData = {
    ...userPropsUtilities.defaultUserData(),
    ...cellphone,
    firstName,
    lastName,
    token: newToken,
    userId,
  };

  const userDataForDatabase = fixUserDataForDb(userData);
  await createNewUserAndSave(userDataForDatabase);

  return { user: userData };
};

const extractCellphoneFromToken = async (token) => {
  const jwtSecret = authManager.getJwtSignInSecret();
  const verifiedToken = await validators.token(token, jwtSecret);
  errorThrower(verifiedToken.ok === false, () => verifiedToken.error);
  return userPropsUtilities.extractCellphone(verifiedToken.payload);
};

const findTemporaryClient = async (cellphone) => {
  const client = await temporaryClients.findClientByCellphone(cellphone);
  errorThrower(!client, () => ({
    ...errors.CURRENT_USER_NOT_EXIST,
    cellphone,
  }));
  return client;
};

const findUserInDb = async (cellphone) => {
  const foundUser = await services.findOneUser(cellphone);
  errorThrower(foundUser, () => errors.USER_EXIST);
  return foundUser;
};

const getRandomId = () =>
  randomMaker.randomId(models.native.user.userId.maxlength.value);

const signToken = async (cellphone, userId) => {
  return await authManager.tokenSigner({
    ...cellphone,
    userId,
  });
};

const fixUserDataForDb = ({ token, ...rest }) => {
  return {
    ...rest,
    sessions: [{ token }],
  };
};

const createNewUserAndSave = async (userDataForDatabase) => {
  await services.createNewUser().run(userDataForDatabase);
};

const createNewUser = controllerBuilder
  .create()
  .body(tryToCreateNewUser)
  .build();

module.exports = { createNewUser };
