const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { tokenValidator } = require("@/validators/userValidators");

const tryToValidateToken = async (req) => {
  const token = authManager.getTokenFromRequest(req);
  const secret = authManager.getSecretWithUrlCondition(req.url);
  const validationResult = await tokenValidator(token, secret);
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

const authDefaultMiddleware = async (req, res, next) => {
  return (
    await trier(authDefaultMiddleware.name).tryAsync(tryToValidateToken, req)
  )
    .executeIfNoError(assignValidationResultToRequest, req, next)
    .catch(catchValidateToken, res)
    .result();
};

module.exports = { authDefaultMiddleware };

//TODO Add me in function!
// myConsole
// 	.bgRed("🚀")
// 	.bgGreen("~ file: authDefaultMiddleware.js")
// 	.bgYellow("~ line 11")
// 	.bgMagenta("~ authDefaultMiddleware")
// 	.bgCyan("error\n")
// 	.log("#)((@#)()(#(@(#@#(()@)@#@)()@#()#()(@#()@()");
