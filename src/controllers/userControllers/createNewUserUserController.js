const { userFinder } = require("~/functions/helpers/userFinder");
const { randomID } = require("~/functions/utilities/randomID");
const { sendableUserData } = require("~/functions/utilities/sendableUserData");
const { tokenSigner } = require("~/functions/utilities/tokenSigner");
const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");

const { UserModel } = require("~/models/userModels/UserModel");
const { clients } = require("~/temp/Clients");
const { userErrorTemplate } = require("~/templates/errorTemplates/userErrorTemplate");

const { userSchemaTemplate } = require("~/templates/schemaTemplates/userSchemaTemplate");
const { firstNameValidator } = require("~/validators/userValidators/firstNameValidator");
const { lastNameValidator } = require("~/validators/userValidators/lastNameValidator");

const createNewUserUserController = async (req = expressRequest, res = expressResponse) => {
	try {
		const {
			body: { firstName, lastName },
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

		const errors = [];

		const isFirstNameValid = firstNameValidator({ firstName });
		const isLastNameValid = lastNameValidator({ lastName });

		if (isFirstNameValid !== true) errors.push(isFirstNameValid);
		if (isLastNameValid !== true) errors.push(isLastNameValid);

		if (errors.length) {
			throw errors;
		}

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

		const { user } = await userFinder({ ...cellphone });

		if (user) {
			await UserModel.findOneAndUpdate(
				{ privateID: user.privateID },
				{ tokens: user.token, firstName, lastName },
			);

			res.status(200).json({
				user: {
					...sendableUserData({ user }).userData,
					firstName,
					lastName,
					token: user.tokens[0],
				},
			});
		} else if (!user) {
			const privateID = randomID(userSchemaTemplate.privateID.properties.maxlength.value);

			const { token } = await tokenSigner({ data: { ...cellphone, privateID } });

			const userData = {
				...cellphone,
				firstName,
				lastName,
				privateID,
				tokens: [{ token }],
			};

			const newUser = new UserModel(userData);
			await newUser.save();

			res.status(200).json({ user: { ...cellphone, privateID, firstName, lastName, token } });
		}
	} catch (error) {
		console.log("createNewUserUserController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { createNewUserUserController };
