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

    errorThrower(tempClient?.verificationCode !== verificationCode, () =>
      getErrorObject(VERIFICATION_CODE_INVALID)
    );

    const {
      blacklist,
      // username,
      chats,
      // bio,
      contacts,
      countryCode,
      countryName,
      firstName,
      lastName,
      phoneNumber,
      privateId,
      tokens,
    } = (await userFinder(cellphone)) || {};

    const isUserExist = privateId;

    const dataOutputIndex = isUserExist ? 0 : 1;

    const responseData = {
      user: isUserExist
        ? {
            blacklist,
            // username,
            chats,
            // bio,
            contacts,
            countryCode,
            countryName,
            firstName,
            lastName,
            mainToken: tokens[0].mainToken,
            newUser: false,
            phoneNumber,
            privateId,
          }
        : { newUser: true },
    };

    res.checkDataAndResponse(responseData, dataOutputIndex);
  } catch (error) {
    logger.log("verifySignInNormalUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { verifySignInNormalUserController };
