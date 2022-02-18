const { userFinder } = require("~/function/helper/userFinder");
const { tokenVerifier } = require("~/function/utility/tokenVerifier");
const { sendableUserData } = require("~/function/utility/sendableUserData");

const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");

const { clients } = require("~/temp/Clients");
const { UserModel } = require("~/model/userModel/UserModel");

const verifySignInNormalUserController = async (req, res) => {
	try {
		const {
			body: { verifyCode },
		} = req;

		const verifyToken = req.headers.authorization?.split("Bearer ")[1];

		if (!verifyToken) {
			const error = userErrorTemplate.TOKEN_REQUIRED;
			throw error;
		}

		const verifiedToken = await tokenVerifier({
			token: verifyToken,
			secret: process.env.JWT_SIGN_IN_SECRET,
		});

		const { phoneNumber, countryCode, countryName } = verifiedToken.data.payload;

		const cellphone = { phoneNumber, countryCode, countryName };

		const client = clients.aliveClients.find((client) => {
			if (client.phoneNumber === phoneNumber && client.countryCode === countryCode) {
				return true;
			} else {
				return false;
			}
		});

		if (!client) {
			//TODO Handle dead clients here =>
			const error = userErrorTemplate.USER_NOT_EXIST;
			throw error;
		}

		if (client?.verifyCode !== verifyCode) {
			const error = userErrorTemplate.VERIFICATION_CODE_INVALID;
			throw error;
		}

		const { user } = await userFinder({ ...cellphone });

		if (user) {
			const { userData } = sendableUserData({ user });

			await UserModel.findOneAndUpdate({ privateID: user.privateID }, { tokens: user.token });

			res.status(200).json({ user: { ...userData, token: user.tokens[0].token } });
		} else if (!user) {
			res.status(200).json({
				user: { newUser: true },
			});
		}
	} catch (error) {
		console.log("verifySignInNormalUserController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { verifySignInNormalUserController };
