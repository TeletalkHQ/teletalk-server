const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { validators } = require("@/validators");

const tryToValidateVerificationCode = async (verificationCode) => {
  await validators.verificationCode(verificationCode);
};

const catchValidateVerificationCode =
  commonFunctionalities.controllerCatchResponse;

const verificationCodeValidatorMiddleware = async (req, res, next) => {
  const { verificationCode } = req.body;
  (
    await trier(verificationCodeValidatorMiddleware.name).tryAsync(
      tryToValidateVerificationCode,
      verificationCode
    )
  )
    .executeIfNoError(() => next())
    .catch(catchValidateVerificationCode, res);
};

module.exports = {
  verificationCodeValidator: verificationCodeValidatorMiddleware,
};
