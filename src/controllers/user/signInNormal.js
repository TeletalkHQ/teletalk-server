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

const { validators } = require("@/validators");

const tryToValidateVerificationCode = async (verificationCode) => {
  await validators.verificationCode(verificationCode);
};

const makeFullNumber = (cellphone) => {
  return userPropsUtilities.concatCountryCodeWithPhoneNumber(
    cellphone.countryCode,
    cellphone.phoneNumber
  );
};

const tryToSendVerificationCodeAsSms = async (
  cellphone,
  host,
  verificationCode
) => {
  const fullNumber = makeFullNumber(cellphone);
  await smsClient.sendVerificationCode(fullNumber, host, verificationCode);
};

const tryToSignToken = async (cellphone) => {
  return await authManager.tokenSigner(
    cellphone,
    authManager.getJwtSignInSecret()
  );
};

const tryToAddNewTemporaryClient = async (
  cellphone,
  verificationCode,
  token
) => {
  await temporaryClients.addClient({
    token,
    verificationCode,
    ...cellphone,
  });
};

const tryToUpdateTemporaryClient = async (client, verificationCode, token) => {
  await temporaryClients.updateClient(client, {
    verificationCode,
    token,
  });
};

const tryToFindTemporaryClient = async (cellphone) => {
  return await temporaryClients.findClientByCellphone(cellphone);
};

const temporaryClientHelper = async ({
  cellphone,
  client,
  trierInstance,
  verificationCode,
  token,
}) => {
  if (client) {
    await trierInstance.tryAsync(
      tryToUpdateTemporaryClient,
      client,
      verificationCode,
      token
    );
  } else {
    await trierInstance.tryAsync(
      tryToAddNewTemporaryClient,
      cellphone,
      verificationCode,
      token
    );
  }
};

const tryToSignInNormalUser = async (req) => {
  const cellphone = userPropsUtilities.extractCellphone(req.body);
  const configs = appConfigs.getConfigs();
  const host = getHostFromRequest(req);
  const verificationCode = passwordGenerator();

  const trierInstance = trier(tryToSignInNormalUser, {
    autoThrowError: true,
  });

  await trierInstance.tryAsync(tryToValidateVerificationCode, verificationCode);

  await commonFunctionalities.checkAndExecute(
    configs.sms.shouldSendSms,
    async () => {
      await trierInstance.tryAsync(
        tryToSendVerificationCodeAsSms,
        cellphone,
        host,
        verificationCode
      );
    }
  );

  const token = (
    await trierInstance.tryAsync(tryToSignToken, cellphone)
  ).result();

  const client = (
    await trierInstance.tryAsync(tryToFindTemporaryClient, cellphone)
  ).result();

  await temporaryClientHelper({
    cellphone,
    client,
    trierInstance,
    verificationCode,
    token,
  });

  //TODO: Print it on log files
  logger.debug("rm", "verificationCode", verificationCode);

  return {
    ...cellphone,
    token,
  };
};

const responseToSignInNormalUser = (user, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { user });
};

const catchSignInNormalUser = commonFunctionalities.controllerErrorResponse;

const signInNormal = async (req = expressRequest, res = expressResponse) => {
  (await trier(signInNormal.name).tryAsync(tryToSignInNormalUser, req))
    .executeIfNoError(responseToSignInNormalUser, res)
    .catch(catchSignInNormalUser, res);
};

module.exports = { signInNormal };
