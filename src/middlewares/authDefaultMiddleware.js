const { authManager } = require("@/classes/AuthManager");

const { tokenValidator } = require("@/validators/userValidators");

const authDefaultMiddleware = async (req, res, next) => {
  try {
    const token = authManager.getTokenFromRequest(req);

    const secret = authManager.getSecretWithUrlCondition(req.url);

    const validationResult = await tokenValidator(token, secret);

    req.authData = validationResult;

    next();

    return { done: true };
  } catch (error) {
    logger.log(
      "🚀 ~ file: authDefaultMiddleware.js ~ line 11 ~ authDefaultMiddleware ~ error",
      error
    );
    res.errorCollector(error);
    res.errorResponser();
    return { done: false };
  }
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
