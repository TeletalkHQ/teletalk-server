const { userFinder } = require("~/function/helper/userFinder");
const { randomID } = require("~/function/utility/randomID");
const { tokenSigner } = require("~/function/utility/tokenSigner");
const { tokenVerifier } = require("~/function/utility/tokenVerifier");

const { cellphoneValidator } = require("~/validator/userValidator/cellphoneValidator");

const { UserModel } = require("~/model/userModel/UserModel");

const { userSchemaTemplate } = require("~/template/schemaTemplate/userSchemaTemplate");

const { userError } = require("~/constant/error/userError/userError");

const verifySignInNormalUserController = async (req, res) => {
	try {
		const {
			body: { verifyCode },
		} = req;

		const token = req.headers.authorization?.split("Bearer ")[1];

		console.log(token, "token");

		//TODO Verify token existence before verify
		const verifiedToken = await tokenVerifier({
			token,
			secret: process.env.JWT_SIGN_IN_SECRET,
		});

		const data = verifiedToken.data.payload;

		if (data.pass !== verifyCode) {
			const error = userError.VERIFICATION_CODE_INVALID;

			throw error;
		}

		const { cellphone } = data;

		delete data.iat;

		const cellphoneValidation = cellphoneValidator({ ...cellphone });

		if (cellphoneValidation !== true) {
			const error = { which: "cellphoneValidation", error: cellphoneValidation };
			throw error;
		}

		const { user: foundUser } = await userFinder({ ...cellphone });

		console.log("foundUser", foundUser);

		//FIXME
		if (foundUser !== null) {
			const error = {
				...cellphone,
				...userError.CELLPHONE_EXIST,
			};
			throw error;
		}

		const dataForSign = {
			...cellphone,
			privateID: randomID(userSchemaTemplate.privateID.maxlength.value),
		};

		const { token: mainToken } = await tokenSigner({ data: dataForSign });

		const dataForDB = {
			...cellphone,
			privateID: dataForSign.privateID,
			firstName: "DEFAULT NAME",
			tokens: [{ token: mainToken }],
		};

		const finalUser = new UserModel(dataForDB);
		console.log("finalUser", { ...finalUser, token: mainToken });
		await finalUser.save();

		res.status(200).json({
			//TODO Change it to data =>
			user: finalUser,
		});
	} catch (error) {
		console.log("verifySignInNormalUserController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { verifySignInNormalUserController };
