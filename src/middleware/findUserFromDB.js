const { userFinder } = require("~/function/helper/userFinder");

const { userError } = require("~/constant/error/userError/userError");

const findUserFromDB = async (req, res, next) => {
	try {
		const { cellphone } = req.body.authData.data.payload;

		const { user } = await userFinder({ ...cellphone });

		if (user === null) {
			const error = { cellphone, ...userError.CELLPHONE_NOT_EXIST };
			throw error;
		}

		req.body.DB = { user };
	} catch (error) {
		console.log("findUserFromDB catch: " + error);
		res.errorCollector({ data: { error } });
	} finally {
		next();
	}
};

module.exports = { findUserFromDB };
