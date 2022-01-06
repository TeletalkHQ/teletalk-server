const { userFinder } = require("~/function/helper/userFinder");

const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");

const findUserFromDB = async (req, res, next) => {
	try {
		const { phoneNumber, countryCode, countryName } = req.authData.data.payload;

		const cellphone = { phoneNumber, countryCode, countryName };

		const { user } = await userFinder({ ...cellphone });

		if (user === null) {
			const error = { ...cellphone, ...userErrorTemplate.CELLPHONE_NOT_EXIST };
			throw error;
		}

		req.DB = { ...req.DB, user };

		next();
	} catch (error) {
		console.log("findUserFromDB catch: " + error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { findUserFromDB };
