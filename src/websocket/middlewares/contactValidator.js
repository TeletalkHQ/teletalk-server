const { trier } = require("simple-trier");

const { commonUtilities } = require("@/classes/CommonUtilities");
const { userUtilities } = require("@/classes/UserUtilities");

const { validators } = require("@/validators");

const tryToValidateContact = async (userData) => {
  const { firstName, lastName } = userData;
  await validators.contact({
    ...userUtilities.extractCellphone(userData),
    firstName,
    lastName,
  });
  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchValidateContact = (error, res) => {
  commonUtilities.controllerErrorResponse(error, res);
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
