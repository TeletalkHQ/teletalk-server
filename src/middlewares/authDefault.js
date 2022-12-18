const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { validators } = require("@/validators");

const tryToValidateToken = async (req) => {
  const token = authManager.getTokenFromRequest(req);
  const secret = authManager.getSecretWithUrlCondition(req.url);
  const validationResult = await validators.token(token, secret);

  return { validationResult, ok: true };
};

const executeIfNoError = ({ validationResult }, req, next) => {
  req.authData = validationResult;
  next();
};

const catchAuthDefault = (error, res) => {
  commonFunctionalities.controllerErrorResponse(error, res);
  return { ok: false };
};

const authDefault = async (req, res, next) => {
  return await trier(authDefault.name)
    .tryAsync(tryToValidateToken, req)
    .executeIfNoError(executeIfNoError, req, next)
    .catch(catchAuthDefault, res)
    .runAsync();
};

module.exports = { authDefault };
