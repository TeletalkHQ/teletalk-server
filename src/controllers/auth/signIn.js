const { appConfigs } = require("@/classes/AppConfigs");
const { authManager } = require("@/classes/AuthManager");
const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { smsClient } = require("@/classes/SmsClient");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userUtilities } = require("@/classes/UserUtilities");

const { getHostFromRequest } = require("@/utilities/utilities");
const { passwordGenerator } = require("@/utilities/passwordGenerator");

const { validators } = require("@/validators");

const tryToSignIn = async (req) => {
  const verificationCode = passwordGenerator();
  await validateVerificationCode(verificationCode);

  const cellphone = userUtilities.extractCellphone(req.body);

  const configs = appConfigs.getConfigs();
  if (configs.sms.shouldSendSms) {
    const host = getHostFromRequest(req);
    const fullNumber = userUtilities.makeFullNumber(
      cellphone.countryCode,
      cellphone.phoneNumber
    );
    await sendVerificationCode(fullNumber, host, verificationCode);
  }

  const token = signToken(cellphone);
  await manageTemporaryClient(cellphone, verificationCode, token);
  logger.debug("rm", "verificationCode", verificationCode);
  return {
    token,
  };
};

const validateVerificationCode = async (verificationCode) => {
  await validators.verificationCode(verificationCode);
};

const sendVerificationCode = async (fullNumber, host, verificationCode) => {
  await smsClient.sendVerificationCode(fullNumber, host, verificationCode);
};

const signToken = (cellphone) => {
  return authManager.signToken(
    {
      ...cellphone,
      date: Date.now(),
    },
    authManager.getJwtSignInSecret()
  );
};

const manageTemporaryClient = async (cellphone, verificationCode, token) => {
  const client = await findTemporaryClient(cellphone);

  if (client)
    return await updateTemporaryClient(client, verificationCode, token);

  await addNewTemporaryClient(cellphone, verificationCode, token);
};

const findTemporaryClient = async (cellphone) => {
  return await temporaryClients.find(cellphone);
};
const updateTemporaryClient = async (client, verificationCode, token) => {
  await temporaryClients.update(client, {
    verificationCode,
    token,
    isVerified: false,
  });
};
const addNewTemporaryClient = async (cellphone, verificationCode, token) => {
  await temporaryClients.add({
    token,
    verificationCode,
    ...cellphone,
    isVerified: false,
  });
};

const signIn = controllerBuilder.create().body(tryToSignIn).build();

module.exports = { signIn };
