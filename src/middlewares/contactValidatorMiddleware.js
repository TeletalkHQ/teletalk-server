const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");

const { contactValidator } = require("@/validators/userValidators");

const tryToValidateContact = async (userData) => {
  const { firstName, lastName } = userData;
  const validationResult = await contactValidator({
    ...userPropsUtilities.extractCellphone(userData),
    firstName,
    lastName,
  });
  errorThrower(validationResult.ok !== true, validationResult);
  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchValidateContact = (error, res) => {
  commonFunctionalities.controllerCatchResponse(error, res);
  return { ok: false };
};

const contactValidatorMiddleware = async (req, res, next) => {
  const { body: userData } = req;

  return (
    await trier(contactValidatorMiddleware.name).tryAsync(
      tryToValidateContact,
      userData
    )
  )
    .executeIfNoError(executeIfNoError, next)
    .catch(catchValidateContact, res)
    .result();
};

module.exports = { contactValidatorMiddleware };
