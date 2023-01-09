const { errorThrower } = require("utility-store/src/utilities/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { commonUtilities } = require("@/classes/CommonUtilities");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userUtilities } = require("@/classes/UserUtilities");

const { errors } = require("@/variables/errors");

const verifyVerificationCode = async (req, res, next) => {
  await trier(verifyVerificationCode.name)
    .tryAsync(tryToVerifyVerificationCode, req)
    .executeIfNoError(() => next())
    .catch(catchVerifyVerificationCode, res)
    .runAsync();
};

const tryToVerifyVerificationCode = async (req) => {
  const {
    authData,
    body: { verificationCode: sentVerificationCode },
  } = req;

  const cellphone = userUtilities.extractCellphone(authData.payload);
  const tempClient = await findTemporaryClient(cellphone);
  const { verificationCode: actualVerificationCode } = tempClient;

  errorThrower(sentVerificationCode !== actualVerificationCode, {
    ...errors.VERIFICATION_CODE_INVALID,
    sentVerificationCode,
  });

  await temporaryClients.update(tempClient, { isVerified: true });
};

const findTemporaryClient = async (cellphone) => {
  const tempClient = await temporaryClients.find(cellphone);
  errorThrower(!tempClient, errors.TEMPORARY_CLIENT_NOT_FOUND);
  return tempClient;
};

const catchVerifyVerificationCode = commonUtilities.controllerErrorResponse;

module.exports = { verifyVerificationCode };
