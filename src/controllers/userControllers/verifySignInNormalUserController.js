const { temporaryClients } = require("@/classes/TemporaryClients");
const { errorThrower, getErrorObject } = require("@/functions/utilities/utils");
const { userProps } = require("@/classes/UserProps");

const {
  userErrors: { VERIFICATION_CODE_INVALID, USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const { userFinder } = require("@/models/userModels/userModelFunctions");

const { verificationCodeValidator } = require("@/validators/userValidators");

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
    const tempClient = await temporaryClients.findClient(cellphone);
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
              ...user,
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
