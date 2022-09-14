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

const { verificationCodeValidator } = require("@/validators/userValidators");

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

//TODO: Add multi-try functionality, also abnormal activity for some of this repeating tasks
const tryToValidateVerificationCode = async (verificationCode) => {
  await verificationCodeValidator(verificationCode);
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

  const temporaryClientUpdateHelper = async (userData, trierFn) =>
    trierInstance.tryAsync(trierFn, userData, verificationCode, verifyToken);
  if (client) {
    await temporaryClientUpdateHelper(client, tryToUpdateTemporaryClient);
  } else {
    await temporaryClientUpdateHelper(cellphone, tryToAddNewTemporaryClient);
  }

  //TODO: Print it on log files
  logger.log("rm", "verificationCode", verificationCode);

  const responseData = {
    ...cellphone,
    verifyToken,
  };
  const isTestServerRunning = commonFunctionalities.isTestServerRunning();
  if (isTestServerRunning) {
    //TODO: Update with ObjectUtilities
    responseData.verificationCode = verificationCode;
  }
  return responseData;
};

const responseToSignInNormalUser = (user, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { user });
};

const catchSignInNormalUser = commonFunctionalities.controllerCatchResponse;

const signInNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  (
    await trier(signInNormalUserController.name).tryAsync(
      tryToSignInNormalUser,
      req
    )
  )
    .executeIfNoError(responseToSignInNormalUser, res)
    .catch(catchSignInNormalUser, res);
};

module.exports = { signInNormalUserController };
