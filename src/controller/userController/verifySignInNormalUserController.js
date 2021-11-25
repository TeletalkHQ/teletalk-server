const { userFinder } = require("~/function/helper/userFinder");
const { randomID } = require("~/function/utility/randomID");
const { tokenSigner } = require("~/function/utility/tokenSigner");
const { tokenVerifier } = require("~/function/utility/tokenVerifier");

const { UserModel } = require("~/model/userModel/UserModel");

const { userError } = require("~/constant/error/userError/userError");
const { cellphoneValidator } = require("~/validator/userPartValidator/cellphoneValidator");

const verifySignInNormalUserController = async (req, res) => {
	try {
		const token = req.headers.authorization;

		const verifiedToken = await tokenVerifier({
			token,
			secret: process.env.JWT_SIGN_IN_SECRET,
		});

		const userData = verifiedToken.data.payload;

		const cellphone = {
			phoneNumber: userData.phoneNumber,
			countryCode: userData.countryCode,
			countryName: userData.countryName,
		};

		const cellphoneValidation = cellphoneValidator({ ...cellphone });

		if (cellphoneValidation !== true) {
			throw cellphoneValidation;
		}

		const { user } = await userFinder({ phoneNumber: userData.phoneNumber });

		//FIXME //! ?!?!?!
		if (user !== null) {
			const error = {
				cellphone,
				message: userError.CELLPHONE_EXIST,
			};
			throw error;
		}

		const { token: mainToken } = await tokenSigner({ data: userData });

		const data = {
			...userData,
			...cellphone,
			privateID: randomID(),
			firstName: "DEFAULT NAME",
			tokens: [mainToken],
		};

		const finalUser = new UserModel(data);

		await finalUser.save();

		res.status(200).json({
			user: finalUser,
		});
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { verifySignInNormalUserController };
