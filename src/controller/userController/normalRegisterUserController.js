const { UserModel } = require("~/model/userModel/UserModel");

const { randomID } = require("~/function/utility/randomID");
const { tokenMaker } = require("~/function/utility/tokenMaker");

const {
	userError: { CELLPHONE_EXIST },
} = require("~/constant/error/userError/userError");

const normalRegisterUserController = async (req, res, next) => {
	try {
		const userData = req.body;

		userData.privateID = randomID();

		const user = await UserModel.findOne({
			cellphone: userData.cellphone,
		});

		if (user) {
			throw CELLPHONE_EXIST;
		} else {
			const token = await tokenMaker(userData);
			userData.tokens = [token];

			const user = new UserModel(userData);

			await user.save();

			res.status(201).json(userData);
		}
	} catch (error) {
		console.log("catch controller", error);
		res.errorCollector(error);
		res.errorResponser();
	}
};

module.exports = { normalRegisterUserController };
