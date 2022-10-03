const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { verificationCodeValidator } = require("@/validators/userValidators");

const tryToValidateVerificationCode = async (verificationCode) => {
  await verificationCodeValidator(verificationCode);
};

const catchValidateVerificationCode =
  commonFunctionalities.controllerCatchResponse;

const verificationCodeValidatorMiddleware = async (req, res, next) => {
  const { verificationCode } = req.body;
  (
    await trier(verificationCodeValidator.name).tryAsync(
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
