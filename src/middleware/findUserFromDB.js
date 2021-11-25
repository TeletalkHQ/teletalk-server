const { userFinder } = require("~/function/helper/userFinder");

const { userError } = require("~/constant/error/userError/userError");

const findUserFromDB = async (req, res, next) => {
	try {
		const { countryCode, countryName, phoneNumber } = req.body.authData.data.payload;

		const cellphone = { countryCode, countryName, phoneNumber };

		const { user } = await userFinder({ ...cellphone });

		if (user === null) {
			const error = { cellphone, error: userError.CELLPHONE_NOT_EXIST };
			throw error;
		}

		req.body.DB = { user };
	} catch (error) {
		console.log("findUserFromDB catch: " + error);
		res.errorCollector({ error });
	} finally {
		next();
	}
};

module.exports = { findUserFromDB };
