const { randomId } = require("@/functions/utilities/randomId");
const { sendableUserData } = require("@/functions/utilities/sendableUserData");
const { tokenSigner } = require("@/functions/utilities/tokenSigner");
const { TemporaryClients } = require("@/functions/tools/TemporaryClients");
const {
  getEnvironment,
  getCellphone,
  getErrorObject,
  errorThrower,
} = require("@/functions/utilities/utilsNoDeps");
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
  commonModels: {
    properties: {
      privateIdCommonModel: { properties: privateIdCommonModel },
    },
  },
} = require("@/models/commonModels/commonModels");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");
const {
  userErrors: {
    properties: {
      USER_NOT_EXIST: { properties: USER_NOT_EXIST },
      FULL_NAME_INVALID: { properties: FULL_NAME_INVALID },
    },
  },
} = require("@/variables/errors/userErrors");
const {
  userRoutes: {
    properties: {
      createNewUserRoute: { properties: createNewUserRoute },
    },
  },
} = require("@/variables/routes/userRoutes");

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
      getEnvironment(ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET)
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

    const cellphone = getCellphone(verifiedToken.payload);
    const client = await TemporaryClients.findClient(cellphone);
    errorThrower(!client, USER_NOT_EXIST);

    const user = await userFinder(cellphone);

    if (user) {
      await updateUserDataByPrivateId({
        tokens: user.token,
        firstName,
        lastName,
        privateId: user.privateId,
      });

      res.sendJsonResponse(createNewUserRoute, {
        user: {
          ...sendableUserData(user),
          firstName,
          lastName,
          token: user.tokens[0],
        },
      });
    } else if (!user) {
      const privateId = randomId(privateIdCommonModel.maxlength.value);

      const token = await tokenSigner({ ...cellphone, privateId });

      const userData = {
        ...cellphone,
        firstName,
        lastName,
        privateId,
        tokens: [{ token }],
      };

      await createNewNormalUser(userData);

      res.sendJsonResponse(createNewUserRoute, {
        user: { ...cellphone, privateId, firstName, lastName, token },
      });
    }
  } catch (error) {
    logger.log("createNewUserUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { createNewUserUserController };
