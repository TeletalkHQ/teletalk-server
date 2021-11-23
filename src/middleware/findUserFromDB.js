const { userFinder } = require("~/function/helper/userFinder");

const { userError } = require("~/constant/error/userError/userError");

const findUserFromDB = async (req, res, next) => {
	try {
		const { cellphone } = req.body.authData.data.payload;
		console.log("findUserFromDB" + cellphone);
		const { user } = await userFinder({ cellphone });
		//TODO Clean this up
		if (user) {
			req.body.DB = { user };
		} else {
			const error = { cellphone, error: userError.CELLPHONE_NOT_EXIST };
			throw error;
		}
	} catch (error) {
		console.log("findUserFromDB catch: " + error);
		res.errorCollector({ error });
	} finally {
		next();
	}
};

module.exports = { findUserFromDB };
