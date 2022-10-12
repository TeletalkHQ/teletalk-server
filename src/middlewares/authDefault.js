const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { validators } = require("@/validators/validators");

const tryToValidateToken = async (req) => {
  const token = authManager.getTokenFromRequest(req);
  const secret = authManager.getSecretWithUrlCondition(req.url);
  const validationResult = await validators.token(token, secret);
  return { validationResult, ok: true };
};

const assignValidationResultToRequest = ({ validationResult }, req, next) => {
  req.authData = validationResult;
  next();
};

const catchValidateToken = (error, res) => {
  commonFunctionalities.controllerCatchResponse(error, res);
  return { ok: false };
};

const authDefault = async (req, res, next) => {
  return (await trier(authDefault.name).tryAsync(tryToValidateToken, req))
    .executeIfNoError(assignValidationResultToRequest, req, next)
    .catch(catchValidateToken, res)
    .result();
};

module.exports = { authDefault };
