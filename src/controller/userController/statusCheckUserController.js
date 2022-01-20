const { userFinder } = require("~/function/helper/userFinder");
const { tokenVerifier } = require("~/function/utility/tokenVerifier");

const { cellphoneValidator } = require("~/validator/userValidator/cellphoneValidator");

const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");
const { sendableUserData } = require("~/function/utility/sendableUserData");

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

		const { phoneNumber, countryCode, countryName } = verifiedToken.data.payload;

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

		res.status(200).json({ user: userData });
	} catch (error) {
		console.log("statusCheckUserController", error);
		res.errorCollector({ data: { error, statusCode: 401 } });
		res.errorResponser();
	}
};

module.exports = { statusCheckUserController };
