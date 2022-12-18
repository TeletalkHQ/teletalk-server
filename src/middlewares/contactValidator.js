const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { validators } = require("@/validators");

const tryToValidateContact = async (userData) => {
  const { firstName, lastName } = userData;
  await validators.contact({
    ...userPropsUtilities.extractCellphone(userData),
    firstName,
    lastName,
  });
  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchValidateContact = (error, res) => {
  commonFunctionalities.controllerErrorResponse(error, res);
  return { ok: false };
};

const contactValidatorMiddleware = async (req, res, next) => {
  const { body: userData } = req;

  return await trier(contactValidatorMiddleware.name)
    .tryAsync(tryToValidateContact, userData)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchValidateContact, res)
    .runAsync();
};

module.exports = { contactValidator: contactValidatorMiddleware };
