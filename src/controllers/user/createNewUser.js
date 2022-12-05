const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");

const {
  common: { userId: userIdCommonModel },
} = require("@/models/native/common");

const { services } = require("@/services");

const { validators } = require("@/validators");

const { errors } = require("@/variables/errors");

const tryToExtractCellphoneFromToken = async (token) => {
  const jwtSecret = authManager.getJwtSignInSecret();
  const verifiedToken = await validators.token(token, jwtSecret);
  errorThrower(verifiedToken.ok === false, () => verifiedToken.error);
  return userPropsUtilities.extractCellphone(verifiedToken.payload);
};

const tryToValidateFirstName = async (firstName) => {
  await validators.firstName(firstName);
};

const tryToValidateLastName = async (lastName) => {
  await validators.lastName(lastName);
};

const tryToFindTemporaryClient = async (cellphone) => {
  const client = await temporaryClients.findClientByCellphone(cellphone);
  errorThrower(!client, () => ({
    ...errors.CURRENT_USER_NOT_EXIST,
    cellphone,
  }));
  return client;
};

const tryToFindUserInDb = async (cellphone) => {
  const foundUser = await services.userFinder(cellphone);
  errorThrower(foundUser, () => errors.USER_EXIST);
  return foundUser;
};

const getRandomId = () =>
  randomMaker.randomId(userIdCommonModel.maxlength.value);

const tryToSignToken = async (cellphone, userId) => {
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

const tryToCreateNewUser = async (userDataForDatabase) => {
  await services.createNewNormalUser(userDataForDatabase);
};

const responseToCreateNewUser = (user, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { user });
};

const catchCreateNewUser = commonFunctionalities.controllerErrorResponse;

const createNewUserTrier = async ({ firstName, lastName, verifyToken }) => {
  const trierInstance = trier(createNewUserTrier.name, {
    autoThrowError: true,
  });

  const cellphone = (
    await trierInstance.tryAsync(tryToExtractCellphoneFromToken, verifyToken)
  ).result();

  await trierInstance.tryAsync(tryToValidateFirstName, firstName);
  await trierInstance.tryAsync(tryToValidateLastName, lastName);
  await trierInstance.tryAsync(tryToFindTemporaryClient, cellphone);
  await trierInstance.tryAsync(tryToFindUserInDb, cellphone);

  const userId = getRandomId();

  const token = (
    await trierInstance.tryAsync(tryToSignToken, cellphone, userId)
  ).result();

  const defaultUserData = {
    ...userPropsUtilities.defaultUserData(),
    ...cellphone,
    firstName,
    lastName,
    token,
    userId,
  };

  const userDataForDatabase = fixUserDataForDb(defaultUserData);

  await trierInstance.tryAsync(tryToCreateNewUser, userDataForDatabase);

  return defaultUserData;
};

const createNewUser = async (req = expressRequest, res = expressResponse) => {
  const {
    body: { firstName, lastName },
  } = req;
  const token = authManager.getTokenFromRequest(req);
  const trierInstance = trier(createNewUser.name);

  (
    await trierInstance.tryAsync(createNewUserTrier, {
      firstName,
      lastName,
      verifyToken: token,
    })
  )
    .executeIfNoError(responseToCreateNewUser, res)
    .catch(catchCreateNewUser, res);
};

module.exports = { createNewUser };
