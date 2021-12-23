const { userFinder } = require("~/function/helper/userFinder");
const { tokenVerifier } = require("~/function/utility/tokenVerifier");

const { cellphoneValidator } = require("~/validator/userValidator/cellphoneValidator");

const { userError } = require("~/constant/error/userError/userError");

const statusCheckUserController = async (req, res) => {
	try {
		const mainToken = req.headers.authorization?.split("Bearer ")[1];

		if (!mainToken) {
			const error = userError.TOKEN_REQUIRED;
			throw error;
		}

		const verifiedToken = await tokenVerifier({
			token: mainToken,
		});

		const { cellphone } = verifiedToken.data.payload;

		const validatedCellphone = await cellphoneValidator(cellphone);

		if (!validatedCellphone) {
			throw validatedCellphone;
		}

		const { user } = await userFinder(cellphone);

		if (!user) {
			const error = userError.USER_NOT_EXIST;
			throw error;
		}

		//! Unnecessary data sending
		res
			.status(200)
			.json({ user: { privateID: user.privateID, cellphone, chats: user.chats } });
	} catch (error) {
		console.log("statusCheckUserController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { statusCheckUserController };
