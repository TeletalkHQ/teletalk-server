const { authManager } = require("@/classes/AuthManager");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { randomMaker } = require("@/classes/RandomMaker");
const { objectUtilities } = require("@/classes/ObjectUtilities");

const { getErrorObject, errorThrower } = require("@/functions/utilities/utils");

const {
  createNewNormalUser,
  userFinder,
} = require("@/models/userModels/userModelFunctions");
const {
  commonModels: { privateIdCommonModel },
} = require("@/models/commonModels/commonModels");

const {
  tokenValidator,
  firstNameValidator,
  lastNameValidator,
} = require("@/validators/userValidators");

const {
  userErrors: { USER_NOT_EXIST, FULL_NAME_INVALID, USER_EXIST },
} = require("@/variables/errors/userErrors");

const createNewUserUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { firstName, lastName },
    } = req;

    const verifyToken = authManager.getTokenFromRequest(req);

    const jwtSecret = authManager.getJwtSignInSecret();
    const verifiedToken = await tokenValidator(verifyToken, jwtSecret);

    errorThrower(verifiedToken.done === false, () =>
      getErrorObject(verifiedToken.error)
    );

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

    const cellphone = userPropsUtilities.extractCellphone(
      verifiedToken.payload
    );
    const client = await temporaryClients.findClient(cellphone);
    errorThrower(!client, () => getErrorObject(USER_NOT_EXIST, cellphone));

    const user = await userFinder(cellphone);

    errorThrower(user, () => getErrorObject(USER_EXIST));

    const privateId = randomMaker.randomId(
      privateIdCommonModel.maxlength.value
    );

    const mainToken = await authManager.tokenSigner({
      ...cellphone,
      privateId,
    });

    const defaultUserData = userPropsUtilities.defaultUserData();
    const allUserData = {
      ...defaultUserData,
      ...cellphone,
      firstName,
      lastName,
      privateId,
      tokens: [{ mainToken }],
    };

    const userDataForDatabase = objectUtilities.excludeProps(allUserData, [
      "bio",
    ]);
    await createNewNormalUser(userDataForDatabase);

    res.checkDataAndResponse({
      user: { ...cellphone, privateId, firstName, lastName, mainToken },
    });
  } catch (error) {
    logger.log("createNewUserUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { createNewUserUserController };
