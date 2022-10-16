const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");

const {
  common: { privateId: privateIdCommonModel },
} = require("@/models/native/common");

const { services } = require("@/services");

const { validators } = require("@/validators");

const { errors } = require("@/variables/errors/errors");

const tryToExtractCellphoneFromToken = async (verifyToken) => {
  const jwtSecret = authManager.getJwtSignInSecret();
  const verifiedToken = await validators.token(verifyToken, jwtSecret);
  errorThrower(verifiedToken.ok === false, () => verifiedToken.error);
  const cellphone = userPropsUtilities.extractCellphone(verifiedToken.payload);
  return cellphone;
};

const tryToValidateFirstName = async (firstName) => {
  await validators.firstName(firstName);
};

const tryToValidateLastName = async (lastName) => {
  await validators.lastName(lastName);
};

const tryToFindTemporaryClient = async (cellphone) => {
  const client = await temporaryClients.findClient(cellphone);
  errorThrower(!client, () => ({ ...errors.USER_NOT_EXIST, cellphone }));
  return client;
};

const tryToFindUserInDb = async (cellphone) => {
  const foundUser = await services.userFinder(cellphone);
  errorThrower(foundUser, () => errors.USER_EXIST);
  return foundUser;
};

const getRandomId = () =>
  randomMaker.randomId(privateIdCommonModel.maxlength.value);

const tryToSignMainToken = async (cellphone, privateId) => {
  const mainToken = await authManager.tokenSigner({
    ...cellphone,
    privateId,
  });
  return mainToken;
};

const fixUserDataForDb = ({
  cellphone,
  firstName,
  lastName,
  mainToken,
  privateId,
}) => {
  const defaultUserData = userPropsUtilities.defaultUserData();
  const allUserData = {
    ...defaultUserData,
    ...cellphone,
    firstName,
    lastName,
    privateId,
    tokens: [{ mainToken }],
  };
  const userDataForDatabase = objectUtilities.excludeProps(allUserData, [
    "bio",
  ]);
  return userDataForDatabase;
};

const tryToCreateNewUser = async (userDataForDatabase) => {
  await services.createNewNormalUser(userDataForDatabase);
};

const responseToCreateNewUser = (user, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { user });
};

const catchCreateNewUser = commonFunctionalities.controllerCatchResponse;

const createNewUserMultiTrier = async ({
  firstName,
  lastName,
  verifyToken,
}) => {
  const trierInstance = trier(createNewUserMultiTrier.name, {
    autoThrowError: true,
  });

  const cellphone = (
    await trierInstance.tryAsync(tryToExtractCellphoneFromToken, verifyToken)
  ).result();

  await trierInstance.tryAsync(tryToValidateFirstName, firstName);
  await trierInstance.tryAsync(tryToValidateLastName, lastName);
  await trierInstance.tryAsync(tryToFindTemporaryClient, cellphone);
  await trierInstance.tryAsync(tryToFindUserInDb, cellphone);

  const privateId = getRandomId();

  const mainToken = (
    await trierInstance.tryAsync(tryToSignMainToken, cellphone, privateId)
  ).result();

  const userDataForDatabase = fixUserDataForDb({
    cellphone,
    firstName,
    lastName,
    mainToken,
    privateId,
  });

  await trierInstance.tryAsync(tryToCreateNewUser, userDataForDatabase);

  const userDataForSendToClient = {
    ...cellphone,
    firstName,
    lastName,
    mainToken,
    privateId,
  };

  return userDataForSendToClient;
};

const createNewUser = async (req = expressRequest, res = expressResponse) => {
  const {
    body: { firstName, lastName },
  } = req;
  const verifyToken = authManager.getTokenFromRequest(req);
  const trierInstance = trier(createNewUser.name);

  (
    await trierInstance.tryAsync(createNewUserMultiTrier, {
      firstName,
      lastName,
      verifyToken,
    })
  )
    .executeIfNoError(responseToCreateNewUser, res)
    .catch(catchCreateNewUser, res);
};

module.exports = { createNewUser };
