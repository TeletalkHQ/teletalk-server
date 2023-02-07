const { trier } = require("utility-store/src/classes/Trier");

const { commonUtilities } = require("@/classes/CommonUtilities");
const { userUtilities } = require("@/classes/UserUtilities");

const { validators } = require("@/validators");

const cellphoneValidator = async (req, res, next) => {
  return await trier(cellphoneValidator.name)
    .tryAsync(tryToValidateCellphone, req.body)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchValidateCellphone, res)
    .runAsync();
};

const tryToValidateCellphone = async (userData) => {
  const cellphone = userUtilities.extractCellphone(userData);
  await validators.cellphone(cellphone);
  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchValidateCellphone = (error, res) => {
  commonUtilities.controllerErrorResponse(error, res);
  return { ok: false };
};

module.exports = { cellphoneValidator };
