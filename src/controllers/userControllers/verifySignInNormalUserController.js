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

    logger.log("rm", "cellphone", cellphone);

    const tempClient = await temporaryClients.findClient(cellphone);

    logger.log("rm", "tempClient", tempClient);

    errorThrower(!tempClient, USER_NOT_EXIST);

    errorThrower(tempClient?.verificationCode !== verificationCode, () =>
      getErrorObject(VERIFICATION_CODE_INVALID)
    );

    const { tokens, ...user } =
      (await userFinder(cellphone, { lean: true })) || {};

    const isUserExist = user?.privateId;

    const dataOutputIndex = isUserExist ? 0 : 1;

    res.checkDataAndResponse(
      {
        user: isUserExist
          ? {
              ...user,
              mainToken: tokens[0].mainToken,
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
