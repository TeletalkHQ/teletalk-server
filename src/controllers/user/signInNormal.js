const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");
const { trier } = require("utility-store/src/classes/Trier");

const { appConfigs } = require("@/classes/AppConfigs");
const { authManager } = require("@/classes/AuthManager");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { smsClient } = require("@/classes/SmsClient");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { getHostFromRequest } = require("@/functions/utilities/utilities");
const {
  passwordGenerator,
} = require("@/functions/utilities/passwordGenerator");

const { validators } = require("@/validators/validators");

const makeSmsText = (verificationCode, host) => {
  const smsText = smsClient
    .smsTemplates()
    .sendVerificationCode(verificationCode, host);
  return smsText;
};

const makeFullNumber = (cellphone) => {
  const fullNumber = userPropsUtilities.concatCountryCodeWithPhoneNumber(
    cellphone.countryCode,
    cellphone.phoneNumber
  );

  return fullNumber;
};

const tryToValidateVerificationCode = async (verificationCode) => {
  await validators.verificationCode(verificationCode);
};

const tryToSendVerificationCodeAsSms = async (
  cellphone,
  host,
  verificationCode
) => {
  const fullNumber = makeFullNumber(cellphone);
  const smsText = makeSmsText(verificationCode, host);
  await smsClient.sendSms(fullNumber, smsText);
};

const tryToSignVerifyToken = async (cellphone) => {
  const verifyToken = await authManager.tokenSigner(
    cellphone,
    authManager.getJwtSignInSecret()
  );
  return verifyToken;
};

const tryToAddNewTemporaryClient = async (
  cellphone,
  verificationCode,
  verifyToken
) => {
  await temporaryClients.addClient({
    verifyToken,
    verificationCode,
    ...cellphone,
  });
};

const tryToUpdateTemporaryClient = async (
  client,
  verificationCode,
  verifyToken
) => {
  await temporaryClients.updateClient(client, {
    verificationCode,
    verifyToken,
  });
};

const tryToFindTemporaryClient = async (cellphone) => {
  const client = await temporaryClients.findClient(cellphone);
  return client;
};

const temporaryClientHelper = async ({
  client,
  verificationCode,
  verifyToken,
  trierInstance,
  cellphone,
}) => {
  if (client) {
    await trierInstance.tryAsync(
      tryToUpdateTemporaryClient,
      client,
      verificationCode,
      verifyToken
    );
  } else {
    await trierInstance.tryAsync(
      tryToAddNewTemporaryClient,
      cellphone,
      verificationCode,
      verifyToken
    );
  }
};

const tryToSignInNormalUser = async (req) => {
  const host = getHostFromRequest(req);
  const cellphone = userPropsUtilities.extractCellphone(req.body);
  const verificationCode = passwordGenerator();
  const {
    sms: { shouldSendSms },
  } = appConfigs.getConfigs();
  const trierInstance = trier(tryToSignInNormalUser, { autoThrowError: true });

  await trierInstance.tryAsync(tryToValidateVerificationCode, verificationCode);

  await commonFunctionalities.checkAndExecute(shouldSendSms, async () => {
    await trierInstance.tryAsync(
      tryToSendVerificationCodeAsSms,
      cellphone,
      host,
      verificationCode
    );
  });

  const verifyToken = (
    await trierInstance.tryAsync(tryToSignVerifyToken, cellphone)
  ).result();

  const client = (
    await trierInstance.tryAsync(tryToFindTemporaryClient, cellphone)
  ).result();

  await temporaryClientHelper({
    cellphone,
    client,
    trierInstance,
    verificationCode,
    verifyToken,
  });

  //TODO: Print it on log files
  logger.log("rm", "verificationCode", verificationCode);

  const defaultResponseData = {
    ...cellphone,
    verifyToken,
  };
  const responseDataWithVerificationCode = objectUtilities.addProperty(
    defaultResponseData,
    "verificationCode",
    verificationCode
  );

  const isTestServerRunning = commonFunctionalities.isTestServerRunning();
  const sendingResponseData = isTestServerRunning
    ? responseDataWithVerificationCode
    : defaultResponseData;

  return sendingResponseData;
};

const responseToSignInNormalUser = (user, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { user });
};

const catchSignInNormalUser = commonFunctionalities.controllerCatchResponse;

const signInNormal = async (req = expressRequest, res = expressResponse) => {
  (await trier(signInNormal.name).tryAsync(tryToSignInNormalUser, req))
    .executeIfNoError(responseToSignInNormalUser, res)
    .catch(catchSignInNormalUser, res);
};

module.exports = { signInNormal };
