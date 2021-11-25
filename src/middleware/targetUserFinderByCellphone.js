const { userFinder } = require("~/function/helper/userFinder");

const { userError } = require("~/constant/error/userError/userError");

const targetUserFinderByCellphone = async (req, res, next) => {
	try {
		const { phoneNumber, countryCode, countryName } = req.body;

		const cellphone = { countryCode, countryName, phoneNumber };

		const { user: targeUser } = await userFinder({ ...cellphone });

		if (targeUser === null) {
			const error = {
				cellphone,
				message: userError.CELLPHONE_NOT_EXIST,
			};
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
