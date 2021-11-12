// const { UserModel } = require("~/model/userModel/UserModel");

const { randomID } = require("~/function/utility/randomID");

const {
	userError: { CELLPHONE_EXIST },
} = require("~/constant/error/userError/userError");
const { userFinder } = require("~/function/helper/userFinder");

const registerNormalUserController = async (req, res, next) => {
	try {
		const userData = req.body;

		userData.privateID = randomID();
		const { user } = await userFinder({ data: userData });

		if (user) {
			throw CELLPHONE_EXIST;
		} else {
			res.status(201).json(userData);
		}
	} catch (error) {
		res.errorCollector(error);
		res.errorResponser();
	}
};

module.exports = { registerNormalUserController };
