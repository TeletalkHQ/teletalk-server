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
      authData,
    } = req;

    await verificationCodeValidator(verificationCode);

    errorThrower(authData.done === false, authData.error);

    const cellphone = userProps.getCellphone(authData.payload);
    const tempClient = await TemporaryClients.findClient(cellphone);
    errorThrower(!tempClient, USER_NOT_EXIST);

    errorThrower(tempClient?.verificationCode !== verificationCode, () =>
      getErrorObject(VERIFICATION_CODE_INVALID)
    );

    const user = await userFinder(cellphone);

    const outputIndex = user ? 0 : 1;

    res.checkAndResponse(
      {
        user: user
          ? {
              ...sendableUserData(user),
              mainToken: user.tokens[0].mainToken,
              newUser: false,
            }
          : { newUser: true },
      },
      outputIndex
    );
  } catch (error) {
    logger.log("verifySignInNormalUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { verifySignInNormalUserController };
