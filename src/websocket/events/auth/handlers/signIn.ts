const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { authManager } = require("@/classes/AuthManager");
const { smsClient } = require("@/classes/SmsClient");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userUtilities } = require("@/classes/UserUtilities");

const { models } = require("@/models");

const { getHostFromRequest } = require("@/utilities/utilities");
const { passwordGenerator } = require("@/utilities/passwordGenerator");

const { validators } = require("@/validators");

const signIn = async (req, res) => {
  const verificationCode = passwordGenerator();
  await validateVerificationCode(verificationCode);

  const cellphone = userUtilities.extractCellphone(req.body);

  const host = getHostFromRequest(req);
  const fullNumber = userUtilities.makeFullNumber(
    cellphone.countryCode,
    cellphone.phoneNumber
  );
  await sendVerificationCode(fullNumber, host, verificationCode);

  const tokenId = createClientId();
  const token = signToken({
    tokenId,
    date: Date.now(),
  });
  authManager.setTokenToResponse(res, token);
  await addClient(tokenId, {
    ...cellphone,
    isVerified: false,
    verificationCode,
  });
};

const validateVerificationCode = async (verificationCode) => {
  await validators.verificationCode(verificationCode);
};

const sendVerificationCode = async (fullNumber, host, verificationCode) => {
  await smsClient.sendVerificationCode(fullNumber, host, verificationCode);
};

const createClientId = () =>
  randomMaker.id(models.native.user.userId.maxlength.value);

const signToken = (data) => {
  return authManager.signToken(data, authManager.getSignInSecret());
};

const addClient = async (tokenId, data) =>
  await temporaryClients.add(tokenId, data);

module.exports = { signIn };
