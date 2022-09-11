//UNUSED updateUserDataUserController
//CLEANME updateUserDataUserController
//REFACTOR updateUserDataUserController
const { authManager } = require("@/classes/AuthManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const {
  updateUserDataByPrivateId,
  userFinder,
} = require("@/services/userServices");
const { tokenValidator } = require("@/validators/userValidators");

const updateUserDataUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { firstName, lastName },
    } = req;

    const verifyToken = authManager.getTokenFromRequest(req);
    const verifiedToken = await tokenValidator(
      verifyToken,
      authManager.getJwtSignInSecret()
    );
    const cellphone = userPropsUtilities.extractCellphone(
      verifiedToken.payload
    );

    const user = await userFinder(cellphone);

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
        mainToken: userPropsUtilities.getTokenFromUserObject(user),
      },
    });
  } catch (error) {
    logger.log("updateUserDataUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { updateUserDataUserController };
