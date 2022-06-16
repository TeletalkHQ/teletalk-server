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

    const cellphone = userProps.getCellphone(authData.payload);
    const tempClient = await temporaryClients.findClient(cellphone);
    errorThrower(!tempClient, USER_NOT_EXIST);

    logger.log(
      "rm",
      "tempClient?.verificationCode",
      tempClient?.verificationCode
    );
    errorThrower(tempClient?.verificationCode !== verificationCode, () =>
      getErrorObject(VERIFICATION_CODE_INVALID)
    );

    const user = await userFinder(cellphone);

    const dataOutputIndex = user ? 0 : 1;

    res.checkDataAndResponse(
      {
        user: user
          ? {
              ...user,
              mainToken: user.tokens[0].mainToken,
              newUser: false,
            }
          : { newUser: true },
      },
      dataOutputIndex
    );
  } catch (error) {
    logger.log("verifySignInNormalUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { verifySignInNormalUserController };
