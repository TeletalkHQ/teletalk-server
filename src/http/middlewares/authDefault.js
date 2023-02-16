const { trier } = require("simple-trier");

const { authManager } = require("@/classes/AuthManager");
const { commonUtilities } = require("@/classes/CommonUtilities");

const { validators } = require("@/validators");

//TODO: Rename to authHttp
const authDefault = async (req, res, next) => {
  return await trier(authDefault.name)
    .tryAsync(tryToValidateToken, req)
    .executeIfNoError(executeIfNoError, req, next)
    .catch(catchAuthDefault, res)
    .runAsync();
};

const tryToValidateToken = async (req) => {
  const token = authManager.getTokenFromRequest(req);

  const secret = authManager.getSecret(req.url);
  const validationResult = await validators.token(token, secret);

  return { validationResult, ok: true };
};

const executeIfNoError = ({ validationResult }, req, next) => {
  req.authData = validationResult;
  next();
};

const catchAuthDefault = (error, res = expressResponse) => {
  commonUtilities.controllerErrorResponse(error, res);
  return { ok: false };
};

module.exports = { authDefault };
