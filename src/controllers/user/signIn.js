const { appConfigs } = require("@/classes/AppConfigs");
const { authManager } = require("@/classes/AuthManager");
const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { smsClient } = require("@/classes/SmsClient");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { getHostFromRequest } = require("@/utilities/utilities");
const { passwordGenerator } = require("@/utilities/passwordGenerator");

const { validators } = require("@/validators");

const tryToSignIn = async (req) => {
  const verificationCode = passwordGenerator();
  await validateVerificationCode(verificationCode);

  const cellphone = userPropsUtilities.extractCellphone(req.body);

  const configs = appConfigs.getConfigs();
  if (configs.sms.shouldSendSms) {
    const host = getHostFromRequest(req);
    const fullNumber = makeFullNumber(cellphone);
    await sendVerificationCode(fullNumber, host, verificationCode);
  }

  const token = signToken(cellphone);

  await manageTemporaryClient(cellphone, verificationCode, token);

  logger.debug("rm", "verificationCode", verificationCode);

  return {
    user: {
      ...cellphone,
      token,
    },
  };
};

const validateVerificationCode = async (verificationCode) => {
  await validators.verificationCode(verificationCode);
};

const makeFullNumber = (cellphone) => {
  return userPropsUtilities.concatCountryCodeWithPhoneNumber(
    cellphone.countryCode,
    cellphone.phoneNumber
  );
};

const sendVerificationCode = async (fullNumber, host, verificationCode) => {
  await smsClient.sendVerificationCode(fullNumber, host, verificationCode);
};

const signToken = (cellphone) => {
  return authManager.signToken(cellphone, authManager.getJwtSignInSecret());
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
