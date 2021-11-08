const { AuthModel } = require("~/model/userModel/UserModel");

const {
	registerUserValidator,
} = require("~/validator/userValidator/registerUserValidator");

const {
	randomID: { randomID },
} = require("~/function/utility/randomID");
const { tokenMaker } = require("~/function/utility/tokenMaker");

const {
	userError: { CELLPHONE_EXIST },
} = require("~/constant/error/userError/userError");

const normalRegisterAuthController = async (req, res) => {
	try {
		const privateID = randomID();

		const userData = req.body;

		console.log(userData);
		userData.privateID = privateID;

		const validationResult = await registerUserValidator(userData);

		if (validationResult === true) {
			const isUserExist = await AuthModel.findOne({
				cellphone: userData.cellphone,
			});

			// console.log(isUserExist);
			if (isUserExist) {
				throw CELLPHONE_EXIST;
			} else {
				const token = await tokenMaker(userData);
				userData.tokens = [];
				userData.tokens.push(token);

				const user = new AuthModel(userData);

				await user.save();

				res.status(201).json(userData);
			}
		} else {
			console.log("validationResult!");
			throw validationResult;
		}
	} catch (err) {
		console.log("bad request!");
		res.status(400).json(err);
	}
};

module.exports = { normalRegisterAuthController };
