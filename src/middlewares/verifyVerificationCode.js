const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("utility-store/src/functions/utilities");

const { errors } = require("@/variables/errors");

const tryToGetTemporaryClient = async (cellphone) => {
  const tempClient = await temporaryClients.findClientByCellphone(cellphone);
  errorThrower(!tempClient, () => errors.CURRENT_USER_NOT_EXIST);
  return tempClient;
};

const tryToVerifyVerificationCode = (
  actualVerificationCode,
  sentVerificationCode
) => {
  errorThrower(
    sentVerificationCode !== actualVerificationCode,
    () => errors.VERIFICATION_CODE_INVALID
  );
};

const catchVerifyVerificationCode =
  commonFunctionalities.controllerErrorResponse;

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

const verifyVerificationCode = async (req, res, next) => {
  const {
    authData,
    body: { verificationCode: sentVerificationCode },
  } = req;
  const cellphone = userPropsUtilities.extractCellphone(authData.payload);

  (
    await trier(verifyVerificationCode.name).tryAsync(
      verifyVerificationCodeMultiTry,
      sentVerificationCode,
      cellphone
    )
  )
    .executeIfNoError(() => next())
    .catch(catchVerifyVerificationCode, res);
};

module.exports = { verifyVerificationCode };
