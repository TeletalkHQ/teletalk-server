const { authManager } = require("@/classes/AuthManager");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userProps } = require("@/classes/UserProps");
const { envManager } = require("@/classes/EnvironmentManager");
const { randomMaker } = require("@/classes/RandomMaker");

const { getErrorObject, errorThrower } = require("@/functions/utilities/utils");
const { getTokenFromRequest } = require("@/functions/utilities/utils");

const {
  tokenValidator,
  firstNameValidator,
  lastNameValidator,
} = require("@/validators/userValidators");

const {
  userFinder,
  createNewNormalUser,
  updateUserDataByPrivateId,
} = require("@/models/userModels/userModelFunctions");
const {
  commonModels: { privateIdCommonModel },
} = require("@/models/commonModels/commonModels");

const {
  userErrors: { USER_NOT_EXIST, FULL_NAME_INVALID },
} = require("@/variables/errors/userErrors");

const createNewUserUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { firstName, lastName },
    } = req;

    const verifyToken = getTokenFromRequest(req);

    const verifiedToken = await tokenValidator(
      verifyToken,
      envManager.getJwtSignInSecret()
    );

    errorThrower(verifiedToken.done === false, verifiedToken.error);

    const validatedFirstName = await firstNameValidator(firstName);
    const validatedLastName = await lastNameValidator(lastName);

    errorThrower(
      validatedFirstName.done !== true || validatedLastName.done !== true,
      () => {
        return getErrorObject(FULL_NAME_INVALID, {
          validatedFullName: { validatedFirstName, validatedLastName },
        });
      }
    );

    const cellphone = userProps.getCellphone(verifiedToken.payload);
    const client = await temporaryClients.findClient(cellphone);
    errorThrower(!client, USER_NOT_EXIST);

    const user = await userFinder(cellphone);

    if (user) {
      await updateUserDataByPrivateId({
        tokens: user.token,
        firstName,
        lastName,
        privateId: user.privateId,
      });

      res.checkDataAndResponse({
        user: {
          ...cellphone,
          firstName,
          lastName,
          privateId: user.privateId,
          mainToken: userProps.getTokenFromUserObject(user),
        },
      });
    } else if (!user) {
      const privateId = randomMaker.randomId(
        privateIdCommonModel.maxlength.value
      );

      const mainToken = await authManager.tokenSigner({
        ...cellphone,
        privateId,
      });

      const userData = {
        ...cellphone,
        firstName,
        lastName,
        privateId,
        tokens: [{ mainToken: mainToken }],
      };

      await createNewNormalUser(userData);

      res.checkDataAndResponse({
        user: { ...cellphone, privateId, firstName, lastName, mainToken },
      });
    }
  } catch (error) {
    logger.log("createNewUserUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { createNewUserUserController };
