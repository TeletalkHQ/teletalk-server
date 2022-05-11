const { sendableUserData } = require("@/functions/utilities/sendableUserData");
const { TemporaryClients } = require("@/functions/tools/TemporaryClients");
const {
  getEnvironment,
  errorThrower,
  getErrorObject,
} = require("@/functions/utilities/utils");
const { userProps } = require("@/functions/helpers/UserProps");

const {
  userErrors: { VERIFICATION_CODE_INVALID, USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const { getTokenFromRequest } = require("@/functions/utilities/utils");
const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

const { userFinder } = require("@/models/userModels/userModelFunctions");
const {
  userRoutes: { verifySignInNormalRoute },
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

    const cellphone = userProps.getCellphone(verifiedToken.payload);
    const tempClient = await TemporaryClients.findClient(cellphone);
    errorThrower(!tempClient, USER_NOT_EXIST);

    errorThrower(tempClient?.verificationCode !== verificationCode, () =>
      getErrorObject(VERIFICATION_CODE_INVALID)
    );

    const user = await userFinder(cellphone);

    res.sendJsonResponse(verifySignInNormalRoute, {
      user: user
        ? {
            ...sendableUserData(user),
            mainToken: user.tokens[0].mainToken,
            newUser: false,
          }
        : { newUser: true },
    });
  } catch (error) {
    logger.log("verifySignInNormalUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { verifySignInNormalUserController };
