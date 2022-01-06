const { randomID } = require("~/function/utility/randomID");
const { userFinder } = require("~/function/helper/userFinder");
const { tokenSigner } = require("~/function/utility/tokenSigner");
const { tokenVerifier } = require("~/function/utility/tokenVerifier");
const { sendableUserData } = require("~/function/utility/sendableUserData");

const { cellphoneValidator } = require("~/validator/userValidator/cellphoneValidator");

const { UserModel } = require("~/model/userModel/UserModel");

const { userSchemaTemplate } = require("~/template/schemaTemplate/userSchemaTemplate");
const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");

const { clients } = require("~/temp/Clients");

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

		const { cellphone } = verifiedToken.data.payload;

		const client = clients.clients.find((client) => {
			if (
				client.cellphone.phoneNumber === cellphone.phoneNumber &&
				client.cellphone.countryCode === cellphone.countryCode
			) {
				return true;
			} else {
				return false;
			}
		});

		if (client && client.verifyCode !== verifyCode) {
			const error = userErrorTemplate.VERIFICATION_CODE_INVALID;
			throw error;
		}

		const cellphoneValidation = cellphoneValidator({ ...cellphone });

		if (cellphoneValidation !== true) {
			const error = { which: "cellphoneValidation", error: cellphoneValidation };
			throw error;
		}

		const { user } = await userFinder({ ...cellphone });

		if (user) {
			const { userData } = sendableUserData({ user });

			// const { token } = await tokenSigner({
			// 	data: { cellphone, privateID: copyUser.privateID },
			// });

			// user.tokens.push({ token });

			// await UserModel.findOneAndUpdate({ privateID: user.privateID }, { tokens: user.token });

			res.status(200).json({ user: { ...userData, token: user.tokens[0].token } });
		} else if (!user) {
			const firstName = "DEFAULT FIRST_NAME";
			const privateID = randomID(userSchemaTemplate.privateID.properties.maxlength.value);

			const { token } = await tokenSigner({ data: { cellphone, privateID } });

			const data = {
				...cellphone,
				firstName,
				privateID,
				tokens: [{ token }],
			};

			const newUser = new UserModel(data);
			await newUser.save();

			res.status(200).json({
				user: { cellphone, privateID, firstName, token },
			});
		}
	} catch (error) {
		console.log("verifySignInNormalUserController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { verifySignInNormalUserController };
