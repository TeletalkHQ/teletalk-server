const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");
const { sendableUserData } = require("~/functions/utilities/sendableUserData");
const { clients } = require("~/functions/tools/Clients");
const {
  getEnvironment,
  getCellphone,
} = require("~/functions/utilities/utilsNoDeps");

const {
  userErrors: {
    properties: { VERIFICATION_CODE_INVALID, TOKEN_REQUIRED, USER_NOT_EXIST },
  },
} = require("~/variables/errors/userErrors");

const {
  errorThrower,
  getTokenFromRequest,
} = require("~/functions/utilities/utils");
const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");

const { userFinder } = require("~/models/userModels/userModelFunctions");
const {
  userRoutes: {
    properties: { verifySignInNormalRoute },
  },
} = require("~/variables/routes/userRoutes");

const verifySignInNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { verificationCode },
    } = req;

    const verifyToken = getTokenFromRequest(req);
    errorThrower(!verifyToken, TOKEN_REQUIRED);
    const tokenData = await tokenVerifier(
      verifyToken,
      getEnvironment(ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET)
    );

    const cellphone = getCellphone(tokenData.payload);
    const client = clients.findClient(cellphone);
    errorThrower(!client, USER_NOT_EXIST);

    errorThrower(
      client?.verificationCode !== verificationCode,
      VERIFICATION_CODE_INVALID
    );

    const user = await userFinder(cellphone);

    res.sendJsonResponse(verifySignInNormalRoute, {
      user: user
        ? { ...sendableUserData(user), token: user.tokens[0].token }
        : { newUser: true },
    });
  } catch (error) {
    logger.log("verifySignInNormalUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { verifySignInNormalUserController };
