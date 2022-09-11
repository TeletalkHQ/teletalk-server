const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");

const { userFinder } = require("@/services/userServices");

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
    errorThrower(!foundUser, () => ({ ...USER_NOT_EXIST, cellphone }));

    const { tokens, ...defaultUserObject } =
      userPropsUtilities.extractUserData(foundUser);

    res.checkDataAndResponse({
      user: {
        ...defaultUserObject,
        mainToken: userPropsUtilities.getTokenFromUserObject({
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
