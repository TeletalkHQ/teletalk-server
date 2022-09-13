const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { verificationCodeValidator } = require("@/validators/userValidators");

const tryToValidateVerificationCode = async (verificationCode) => {
  await verificationCodeValidator(verificationCode);
};

const catchValidateVerificationCode =
  commonFunctionalities.controllerCatchResponse;

const validateVerificationCodeMiddleware = async (req, res, next) => {
  const { verificationCode } = req.body;
  (
    await trier(validateVerificationCodeMiddleware.name).tryAsync(
      tryToValidateVerificationCode,
      verificationCode
    )
  )
    .executeIfNoError(() => next())
    .catch(catchValidateVerificationCode, res);
};

module.exports = { validateVerificationCodeMiddleware };
