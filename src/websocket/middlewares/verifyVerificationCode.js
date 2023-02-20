const { errorThrower } = require("utility-store/src/utilities/utilities");
const { trier } = require("simple-trier");

const { commonUtilities } = require("@/classes/CommonUtilities");
const { temporaryClients } = require("@/classes/TemporaryClients");

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
    authData: {
      data: {
        payload: { tokenId },
      },
    },
    body: { verificationCode: sentVerificationCode },
  } = req;

  const tempClient = await findTemporaryClient(tokenId);
  const { verificationCode: actualVerificationCode } = tempClient;

  errorThrower(sentVerificationCode !== actualVerificationCode, {
    ...errors.VERIFICATION_CODE_INVALID,
    sentVerificationCode,
  });

  await temporaryClients.update(tokenId, { ...tempClient, isVerified: true });
};

const findTemporaryClient = async (tokenId) => {
  const tempClient = await temporaryClients.find(tokenId);
  errorThrower(!tempClient, errors.TEMPORARY_CLIENT_NOT_FOUND);
  return tempClient;
};

const catchVerifyVerificationCode = commonUtilities.controllerErrorResponse;

module.exports = { verifyVerificationCode };
