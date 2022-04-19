const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");

const {
  cellphoneValidator,
} = require("~/validators/userValidators/cellphoneValidator");

const {
  userErrors: {
    properties: { TOKEN_REQUIRED, USER_NOT_EXIST },
  },
} = require("~/variables/errors/userErrors");
const { sendableUserData } = require("~/functions/utilities/sendableUserData");

const { ioFunctions } = require("~/socket/io");
const {
  errorThrower,
  getTokenFromRequest,
} = require("~/functions/utilities/utils");
const { userFinder } = require("~/models/userModels/userModelFunctions");

const statusCheckUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const mainToken = getTokenFromRequest(req);

    errorThrower(!mainToken, TOKEN_REQUIRED);

    const tokenData = await tokenVerifier(mainToken);

    const { phoneNumber, countryCode, countryName } = tokenData.payload;

    const cellphone = { phoneNumber, countryCode, countryName };

    const validatedCellphone = await cellphoneValidator(cellphone);

    errorThrower(!validatedCellphone, validatedCellphone);
    const user = await userFinder(cellphone);

    errorThrower(!user, USER_NOT_EXIST);

    const { userData } = sendableUserData({ user });

    logger.log(ioFunctions.io.on);

    res.status(200).json({ user: userData });
  } catch (error) {
    logger.log("statusCheckUserController", error);
    res.errorCollector({ data: { error, statusCode: 401 } });
    res.errorResponser();
  }
};

module.exports = { statusCheckUserController };
