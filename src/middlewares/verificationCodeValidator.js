const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { validators } = require("@/validators");

const tryToValidateVerificationCode = async (verificationCode) => {
  await validators.verificationCode(verificationCode);
};

const catchValidateVerificationCode =
  commonFunctionalities.controllerErrorResponse;

const verificationCodeValidatorMiddleware = async (req, res, next) => {
  const { verificationCode } = req.body;

  await trier(verificationCodeValidatorMiddleware.name)
    .tryAsync(tryToValidateVerificationCode, verificationCode)
    .executeIfNoError(() => next())
    .catch(catchValidateVerificationCode, res)
    .runAsync();
};

module.exports = {
  verificationCodeValidator: verificationCodeValidatorMiddleware,
};
