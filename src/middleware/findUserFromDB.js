const { userFinder } = require("~/function/helper/userFinder");

const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");

const findUserFromDB = async (req, res, next) => {
	try {
		const { cellphone } = req.authData.data.payload;

		const { user } = await userFinder({ ...cellphone });

		if (user === null) {
			const error = { cellphone, ...userErrorTemplate.CELLPHONE_NOT_EXIST };
			throw error;
		}

		req.DB = { ...req.DB, user };
	} catch (error) {
		console.log("findUserFromDB catch: " + error);
		res.errorCollector({ data: { error } });
	} finally {
		next();
	}
};

module.exports = { findUserFromDB };
