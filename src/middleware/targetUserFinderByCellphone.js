const { userFinder } = require("~/function/helper/userFinder");

const { userError } = require("~/constant/error/userError/userError");

const targetUserFinderByCellphone = async (req, res, next) => {
	try {
		const { cellphone, countryCode, countryName } = req.body;

		const { user: targeUser } = await userFinder({ cellphone, countryCode, countryName });

		if (targeUser === null) {
			const error = userError.CELLPHONE_NOT_EXIST;
			throw error;
		}
	} catch (error) {
		console.log("targetUserFinderByCellphone catch", error);
		res.errorCollector({ error });
	} finally {
		next();
	}
};

module.exports = { targetUserFinderByCellphone };
