const { userFinder } = require("~/function/helper/userFinder");

const { userError } = require("~/constant/error/userError/userError");

const findUserFromDB = async (req, res, next) => {
	try {
		const { cellphone } = req.body.authData.data.payload;
		const { user } = await userFinder({ cellphone });

		if (user) {
			req.body.DB = { user };
		} else {
			const error = { cellphone, error: userError.CELLPHONE_NOT_EXIST };
			throw error;
		}
	} catch (error) {
		res.errorCollector({ error });
	} finally {
		next();
	}
};

module.exports = { findUserFromDB };
