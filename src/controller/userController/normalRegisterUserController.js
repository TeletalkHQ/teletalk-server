const { UserModel } = require("~/model/userModel/UserModel");

const {
	registerUserValidator,
} = require("~/validator/userValidator/registerUserValidator");

const {
	randomID: { randomID },
} = require("~/function/utility/randomID");
const { tokenMaker } = require("~/function/utility/tokenMaker");

const {
	userError: { cellphone_exist },
} = require("~/constant/error/userError/userError");
const bodyClarify = require("~/function/utility/bodyClearify");

const normalRegisterUserController = async (req, res) => {
	try {
		const privateID = randomID();

		const { body: userData } = bodyClarify(req.body);

		userData.privateID = privateID;

		const validationResult = await registerUserValidator(userData);

		if (validationResult === true) {
			const isUserExist = await UserModel.findOne({
				cellphone: userData.cellphone,
			});

			// console.log(isUserExist);
			if (isUserExist === null) {
				const token = await tokenMaker(userData);
				userData.tokens = [];
				userData.tokens.push(token);
				console.log(userData);

				const user = new UserModel(userData);

				await user.save();

				res.status(200).json(userData);
			} else {
				throw cellphone_exist;
			}
		} else {
			throw validationResult;
		}
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = { normalRegisterUserController };
