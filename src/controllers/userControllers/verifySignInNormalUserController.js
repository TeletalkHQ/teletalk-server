const { sendableUserData } = require("@/functions/utilities/sendableUserData");
const { temporaryClients } = require("@/functions/tools/TemporaryClients");
const {
  getEnvironment,
  getCellphone,
  errorThrower,
  getErrorObject,
} = require("@/functions/utilities/utilsNoDeps");

const {
  userErrors: {
    properties: {
      VERIFICATION_CODE_INVALID: { properties: VERIFICATION_CODE_INVALID },
      USER_NOT_EXIST: { properties: USER_NOT_EXIST },
    },
  },
} = require("@/variables/errors/userErrors");

const { getTokenFromRequest } = require("@/functions/utilities/utils");
const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

const { userFinder } = require("@/models/userModels/userModelFunctions");
const {
  userRoutes: {
    properties: {
      verifySignInNormalRoute: { properties: verifySignInNormalRoute },
    },
  },
} = require("@/variables/routes/userRoutes");
const {
  tokenValidator,
  verificationCodeValidator,
} = require("@/validators/userValidators");

const verifySignInNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { verificationCode },
    } = req;

    await verificationCodeValidator(verificationCode);

    const verifyToken = getTokenFromRequest(req);

    const verifiedToken = await tokenValidator(
      verifyToken,
      getEnvironment(ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET)
    );

    errorThrower(verifiedToken.done === false, verifiedToken.error);

    const cellphone = getCellphone(verifiedToken.payload);
    const client = await temporaryClients.findClient(cellphone);
    errorThrower(!client, USER_NOT_EXIST);

    errorThrower(client?.verificationCode !== verificationCode, () =>
      getErrorObject(VERIFICATION_CODE_INVALID)
    );

    const user = await userFinder(cellphone);

    res.sendJsonResponse(verifySignInNormalRoute, {
      user: user
        ? {
            ...sendableUserData(user),
            token: user.tokens[0].token,
            newUser: false,
          }
        : { newUser: true },
    });
  } catch (error) {
    logger.log("verifySignInNormalUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { verifySignInNormalUserController };
