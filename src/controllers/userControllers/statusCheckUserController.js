const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower, getErrorObject } = require("@/functions/utilities/utils");

const { userFinder } = require("@/models/userModels/userModelFunctions");

const {
  userErrors: { USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const statusCheckUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { authData } = req;

    const cellphone = userPropsUtilities.extractCellphone(authData.payload);

    const foundUser = await userFinder(cellphone);
    errorThrower(!foundUser, () =>
      getErrorObject(USER_NOT_EXIST, { cellphone })
    );

    const { tokens, ...defaultUserObject } =
      userPropsUtilities.extractDefaultUserData(foundUser);

    res.checkDataAndResponse({
      user: {
        ...defaultUserObject,
        mainToken: userPropsUtilities.getTokenFromUserObjectByParam({
          tokens,
        }),
      },
    });
  } catch (error) {
    logger.log("statusCheckUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { statusCheckUserController };
