//REFACTOR statusCheckUserController
const { userProps } = require("@/classes/UserProps");
const { authManager } = require("@/classes/AuthManager");

const { cellphoneValidator } = require("@/validators/userValidators");

const {
  userErrors: { TOKEN_REQUIRED, USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const {
  errorThrower,
  getTokenFromRequest,
} = require("@/functions/utilities/utils");

const { userFinder } = require("@/models/userModels/userModelFunctions");

const statusCheckUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const mainToken = getTokenFromRequest(req);

    errorThrower(!mainToken, TOKEN_REQUIRED);

    const tokenData = authManager.tokenVerifier(mainToken);

    const cellphone = userProps.makeCellphoneByObjectParam(tokenData.payload);

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
