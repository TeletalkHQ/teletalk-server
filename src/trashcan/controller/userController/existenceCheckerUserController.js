const { userFinder } = require("~/function/helper/userFinder");

const existenceCheckerUserController = async (req, res, next) => {
	try {
		const userData = req.body;

		const { user } = await userFinder({ data: userData.cellphone });

		res.status(200).json({ userExist: user ? true : false });
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { existenceCheckerUserController };
