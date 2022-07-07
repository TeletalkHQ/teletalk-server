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

    const cellphone = userProps.makeCellphoneByObjectParam(authData.payload);
    const tempClient = await temporaryClients.findClient(cellphone);
    errorThrower(!tempClient, USER_NOT_EXIST);

    errorThrower(tempClient?.verificationCode !== verificationCode, () =>
      getErrorObject(VERIFICATION_CODE_INVALID)
    );

    //CLEANME
    const user = (await userFinder(cellphone)) || {};

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
    } = user;
    const isUserExist = privateId;

    const sendingDataOutputIndex = isUserExist ? 0 : 1;

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
            mainToken: userProps.getTokenFromUserObjectByParam(user),
            newUser: false,
            phoneNumber,
            privateId,
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
