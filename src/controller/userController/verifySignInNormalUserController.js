const { userFinder } = require("~/function/helper/userFinder");
const { randomID } = require("~/function/utility/randomID");
const { tokenSigner } = require("~/function/utility/tokenSigner");
const { tokenVerifier } = require("~/function/utility/tokenVerifier");

const { UserModel } = require("~/model/userModel/UserModel");

const { userError } = require("~/constant/error/userError/userError");

const verifySignInNormalUserController = async (req, res) => {
	try {
		const token = req.headers.authorization;

		const verifiedToken = await tokenVerifier({
			token,
			secret: process.env.JWT_SIGN_IN_SECRET,
		});

		const userData = verifiedToken.data.payload;

		console.log(userData);

		const { user } = await userFinder({ cellphone: userData.cellphone });

		if (user === null) {
			const { token } = await tokenSigner({ data: userData });

			const data = {
				...userData,
				privateID: randomID(),
				firstName: "DEFAULT NAME",
				cellphone: userData.cellphone,
				countryCode: userData.countryCode,
				countryName: userData.countryName,
				tokens: [token],
			};

			const user = new UserModel(data);

			await user.save();

			res.status(200).json({
				userData: user,
			});
		} else {
			const error = {
				cellphone: userError.CELLPHONE_EXIST,
				statusCode: 400,
			};
			throw error;
		}
	} catch (ex) {
		res.errorCollector({
			error: ex.cellphone || ex,
			statusCode: ex.statusCode,
		});
		res.errorResponser();
	}
};

module.exports = {
	verifySignInNormalUserController,
};
