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

const statusCheckUserController = async (req, res) => {
  try {
    const mainToken = req.headers.authorization?.split("Bearer ")[1];

    if (!mainToken) {
      const error = userErrorTemplate.TOKEN_REQUIRED;
      throw error;
    }

    const verifiedToken = await tokenVerifier({
      token: mainToken,
    });

    const { phoneNumber, countryCode, countryName } =
      verifiedToken.data.payload;

    const cellphone = { phoneNumber, countryCode, countryName };

    const validatedCellphone = await cellphoneValidator(cellphone);

    if (!validatedCellphone) {
      throw validatedCellphone;
    }

    const { user } = await userFinder(cellphone);

    if (!user) {
      const error = userErrorTemplate.USER_NOT_EXIST;
      throw error;
    }

    const { userData } = sendableUserData({ user });

    console.log(ioFunctions.io.on);

    res.status(200).json({ user: userData });
  } catch (error) {
    console.log("statusCheckUserController", error);
    res.errorCollector({ data: { error, statusCode: 401 } });
    res.errorResponser();
  }
};

module.exports = { statusCheckUserController };
