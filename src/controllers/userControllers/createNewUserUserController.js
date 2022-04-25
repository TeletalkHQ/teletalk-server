const { randomId } = require("~/functions/utilities/randomId");
const { sendableUserData } = require("~/functions/utilities/sendableUserData");
const { tokenSigner } = require("~/functions/utilities/tokenSigner");
const { clients } = require("~/functions/tools/Clients");
const {
  getEnvironment,
  getCellphone,
  getErrorObject,
} = require("~/functions/utilities/utilsNoDeps");
const {
  errorThrower,
  getTokenFromRequest,
} = require("~/functions/utilities/utils");

const {
  firstNameValidator,
} = require("~/validators/userValidators/firstNameValidator");
const {
  lastNameValidator,
} = require("~/validators/userValidators/lastNameValidator");

const {
  commonModel: {
    properties: {
      commonPrivateIdModel: { properties: commonPrivateIdModel },
    },
  },
} = require("~/models/commonModels/commonModel");
const {
  userFinder,
  createNewNormalUser,
  updateUserDataByPrivateId,
} = require("~/models/userModels/userModelFunctions");

const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");
const {
  userErrors: {
    properties: {
      USER_NOT_EXIST: { properties: USER_NOT_EXIST },
      FULL_NAME_INVALID: { properties: FULL_NAME_INVALID },
    },
  },
} = require("~/variables/errors/userErrors");
const {
  userRoutes: {
    properties: { createNewUserRoute },
  },
} = require("~/variables/routes/userRoutes");
const {
  tokenValidator,
} = require("~/validators/userValidators/tokenValidator");

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

    const validatedFirstName = firstNameValidator({ firstName });
    const validatedLastName = lastNameValidator({ lastName });
    errorThrower(
      validatedFirstName !== true || validatedLastName !== true,
      () => {
        return getErrorObject(FULL_NAME_INVALID, {
          validatedFullName: { validatedFirstName, validatedLastName },
        });
      }
    );

    const cellphone = getCellphone(verifiedToken.payload);
    const client = clients.findClient(cellphone);
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
      const privateId = randomId(commonPrivateIdModel.maxlength.value);

      const token = await tokenSigner({
        data: { ...cellphone, privateId },
      });

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
