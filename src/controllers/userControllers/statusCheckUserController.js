//UNUSED

const { tokenVerifier } = require("@/functions/utilities/tokenVerifier");

const { cellphoneValidator } = require("@/validators/userValidators");

const {
  userErrors: {
    properties: { TOKEN_REQUIRED, USER_NOT_EXIST },
  },
} = require("@/variables/errors/userErrors");
const { sendableUserData } = require("@/functions/utilities/sendableUserData");

const {
  errorThrower,
  getTokenFromRequest,
} = require("@/functions/utilities/utils");
const { userFinder } = require("@/models/userModels/userModelFunctions");
const { getCellphone } = require("@/functions/utilities/utilsNoDeps");

const statusCheckUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const mainToken = getTokenFromRequest(req);

    errorThrower(!mainToken, TOKEN_REQUIRED);

    const tokenData = await tokenVerifier(mainToken);

    const cellphone = getCellphone(tokenData.payload);

    const validatedCellphone = await cellphoneValidator(cellphone);

    errorThrower(!validatedCellphone, validatedCellphone);
    const user = await userFinder(cellphone);

    errorThrower(!user, USER_NOT_EXIST);

    const userData = sendableUserData(user);

    res.status(200).json({ user: userData });
  } catch (error) {
    logger.log("statusCheckUserController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { statusCheckUserController };
