const { userFinder } = require("~/functions/helpers/userFinder");
const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");

const {
  cellphoneValidator,
} = require("~/validators/userValidators/cellphoneValidator");

const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");
const { sendableUserData } = require("~/functions/utilities/sendableUserData");

const { ioFunctions } = require("~/socket/io");
const { errorThrower } = require("~/functions/utilities/utils");

const statusCheckUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const mainToken = req.headers.authorization?.split("Bearer ")[1];

    errorThrower(!mainToken, userErrorTemplate.TOKEN_REQUIRED);

    const tokenData = await tokenVerifier(mainToken);

    const { phoneNumber, countryCode, countryName } = tokenData.payload;

    const cellphone = { phoneNumber, countryCode, countryName };

    const validatedCellphone = await cellphoneValidator(cellphone);

    errorThrower(!validatedCellphone, validatedCellphone);
    const { user } = await userFinder(cellphone);

    errorThrower(!user, userErrorTemplate.USER_NOT_EXIST);

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
