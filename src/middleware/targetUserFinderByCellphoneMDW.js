const { userFinder } = require("~/function/helper/userFinder");

const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");

const targetUserFinderByCellphoneMDW = async (req, res, next) => {
	try {
		const { phoneNumber, countryCode, countryName } = req.body;

		const cellphone = { phoneNumber, countryCode, countryName };

		const { user: targetUser } = await userFinder(cellphone);

		if (targetUser === null) {
			const error = {
				...cellphone,
				...userErrorTemplate.CELLPHONE_NOT_EXIST,
			};
			throw error;
		}

		req.DB = { ...req.DB, targetUser };

		next();
	} catch (error) {
		console.log("targetUserFinderByCellphone catch", error);

		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { targetUserFinderByCellphoneMDW };
