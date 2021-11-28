const { userFinder } = require("~/function/helper/userFinder");
const { randomID } = require("~/function/utility/randomID");
const { tokenSigner } = require("~/function/utility/tokenSigner");
const { tokenVerifier } = require("~/function/utility/tokenVerifier");

const { UserModel } = require("~/model/userModel/UserModel");

const { userError } = require("~/constant/error/userError/userError");
const { cellphoneValidator } = require("~/validator/userValidator/cellphoneValidator");

const verifySignInNormalUserController = async (req, res) => {
	try {
		const token = req.headers.authorization;

		const verifiedToken = await tokenVerifier({
			token,
			secret: process.env.JWT_SIGN_IN_SECRET,
		});

		const data = verifiedToken.data.payload;

		delete data.iat;

		const cellphoneValidation = cellphoneValidator({ ...data.cellphone });

		if (cellphoneValidation !== true) {
			throw cellphoneValidation;
		}

		const { user: foundUser } = await userFinder({ ...data.cellphone });

		//FIXME
		if (foundUser !== null) {
			const error = {
				cellphone: data.cellphone,
				...userError.CELLPHONE_EXIST,
			};
			throw error;
		}

		const dataForSign = { cellphone: data.cellphone, privateID: randomID() };

		const { token: mainToken } = await tokenSigner({ data: dataForSign });

		const dataForDB = {
			...data.cellphone,
			privateID: dataForSign.privateID,
			firstName: "DEFAULT NAME",
			tokens: [{ token: mainToken }],
		};

		const finalUser = new UserModel(dataForDB);
		console.log("finalUser", finalUser);
		await finalUser.save();

		res.status(200).json({
			//TODO Change it to data =>
			user: finalUser,
		});
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { verifySignInNormalUserController };
