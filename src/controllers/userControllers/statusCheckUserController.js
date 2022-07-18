//REFACTOR statusCheckUserController
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { authManager } = require("@/classes/AuthManager");

const { errorThrower } = require("@/functions/utilities/utils");

const { userFinder } = require("@/models/userModels/userModelFunctions");

const { cellphoneValidator } = require("@/validators/userValidators");

const {
  userErrors: { TOKEN_REQUIRED, USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const statusCheckUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const mainToken = authManager.getTokenFromRequest(req);
    errorThrower(!mainToken, TOKEN_REQUIRED);

    const tokenData = authManager.tokenVerifier(mainToken);

    const cellphone = userPropsUtilities.makeCellphoneByObjectParam(
      tokenData.payload
    );
    const validatedCellphone = await cellphoneValidator(cellphone);
    errorThrower(!validatedCellphone, validatedCellphone);

    const user = await userFinder(cellphone);
    errorThrower(!user, USER_NOT_EXIST);

    res.status(200).json({ user });
  } catch (error) {
    logger.log("statusCheckUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { statusCheckUserController };
