const { trier } = require("utility-store/src/classes/Trier");

const { commonUtilities } = require("@/classes/CommonUtilities");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("utility-store/src/functions/utilities");

const { errors } = require("@/variables/errors");

const verifyTemporaryClient = async (req, res, next) => {
  await trier(verifyTemporaryClient.name)
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

  const cellphone = userPropsUtilities.extractCellphone(authData.payload);
  const tempClient = await getTemporaryClient(cellphone);
  const { verificationCode: actualVerificationCode } = tempClient;

  errorThrower(sentVerificationCode !== actualVerificationCode, {
    ...errors.VERIFICATION_CODE_INVALID,
    sentVerificationCode,
  });

  temporaryClients.update(tempClient, { isVerified: true });
};

const getTemporaryClient = async (cellphone) => {
  const tempClient = await temporaryClients.find(cellphone);
  errorThrower(!tempClient, errors.CURRENT_USER_NOT_EXIST);
  return tempClient;
};

const catchVerifyVerificationCode = commonUtilities.controllerErrorResponse;

module.exports = { verifyTemporaryClient };
