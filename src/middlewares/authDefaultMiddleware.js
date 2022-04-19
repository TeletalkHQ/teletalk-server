const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");
const { getTokenFromRequest } = require("~/functions/utilities/utils");

const authDefaultMiddleware = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    req.authData = await tokenVerifier(token);

    next();
  } catch (error) {
    logger.log(
      "🚀 ~ file: authDefaultMiddleware.js ~ line 11 ~ authDefaultMiddleware ~ error",
      error
    );
    res.errorCollector({ data: { error, statusCode: 401 } });
    res.errorResponser();
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
