const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utils");

const { userFinder } = require("@/models/userModels/userModelFunctions");

const {
  userErrors: { VERIFICATION_CODE_INVALID, USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

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

    const cellphone = userPropsUtilities.extractCellphone(authData.payload);
    const tempClient = await temporaryClients.findClient(cellphone);
    errorThrower(!tempClient, () => USER_NOT_EXIST);

    errorThrower(
      tempClient?.verificationCode !== verificationCode,
      () => VERIFICATION_CODE_INVALID
    );

    const foundUser = (await userFinder(cellphone)) || {};
    const { tokens, ...defaultUserObject } =
      userPropsUtilities.extractUserData(foundUser);

    const isUserExist = defaultUserObject.privateId;
    const sendingDataOutputIndex = isUserExist ? 0 : 1;
    const responseData = {
      user: isUserExist
        ? {
            ...defaultUserObject,
            mainToken: userPropsUtilities.getTokenFromUserObject({
              tokens,
            }),
            newUser: false,
          }
        : { newUser: true },
    };

    res.checkDataAndResponse(responseData, sendingDataOutputIndex);
  } catch (error) {
    logger.log("verifySignInNormalUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { verifySignInNormalUserController };
