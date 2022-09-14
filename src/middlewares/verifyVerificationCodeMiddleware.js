const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");

const {
  userErrors: { USER_NOT_EXIST, VERIFICATION_CODE_INVALID },
} = require("@/variables/errors/userErrors");

const tryToGetTemporaryClient = async (cellphone) => {
  const tempClient = await temporaryClients.findClient(cellphone);
  errorThrower(!tempClient, () => USER_NOT_EXIST);
  return tempClient;
};

const tryToVerifyVerificationCode = (
  actualVerificationCode,
  sentVerificationCode
) => {
  errorThrower(
    sentVerificationCode !== actualVerificationCode,
    () => VERIFICATION_CODE_INVALID
  );
};

const catchVerifyVerificationCode =
  commonFunctionalities.controllerCatchResponse;

const verifyVerificationCodeMultiTry = async (
  sentVerificationCode,
  cellphone
) => {
  const trierInstance = trier(verifyVerificationCodeMultiTry.name, {
    autoThrowError: true,
  });

  const tempClient = (
    await trierInstance.tryAsync(tryToGetTemporaryClient, cellphone)
  ).result();

  const { verificationCode: actualVerificationCode } = tempClient;

  trierInstance.try(
    tryToVerifyVerificationCode,
    actualVerificationCode,
    sentVerificationCode
  );
};

const verifyVerificationCodeMiddleware = async (req, res, next) => {
  const {
    authData,
    body: { verificationCode: sentVerificationCode },
  } = req;
  const cellphone = userPropsUtilities.extractCellphone(authData.payload);

  (
    await trier(verifyVerificationCodeMiddleware.name).tryAsync(
      verifyVerificationCodeMultiTry,
      sentVerificationCode,
      cellphone
    )
  )
    .executeIfNoError(() => next())
    .catch(catchVerifyVerificationCode, res);
};

module.exports = { verifyVerificationCodeMiddleware };
