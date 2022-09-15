const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { cellphoneValidator } = require("@/validators/userValidators");
const { trier } = require("utility-store/src/classes/Trier");

const tryToValidateCellphone = async (userData) => {
  const cellphone = userPropsUtilities.extractCellphone(userData);
  await cellphoneValidator(cellphone);
  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchValidateCellphone = (error, res) => {
  commonFunctionalities.controllerCatchResponse(error, res);
  return { ok: false };
};

const cellphoneValidatorMiddleware = async (req, res, next) => {
  return (
    await trier(cellphoneValidatorMiddleware.name).tryAsync(
      tryToValidateCellphone,
      req.body
    )
  )
    .executeIfNoError(executeIfNoError, next)
    .catch(catchValidateCellphone, res)
    .result();
};

module.exports = { cellphoneValidatorMiddleware };
