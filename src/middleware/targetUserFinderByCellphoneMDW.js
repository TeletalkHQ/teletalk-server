const { userFinder } = require("~/function/helper/userFinder");

const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");

const targetUserFinderByCellphoneMDW = async (req, res, next) => {
	try {
		const { cellphone } = req.body;

		const { user: targetUser } = await userFinder({ ...cellphone });

		if (targetUser === null) {
			const error = {
				cellphone,
				...userErrorTemplate.CELLPHONE_NOT_EXIST,
			};
			throw error;
		}

		req.body.DB = { ...req.body.DB, targetUser };
	} catch (error) {
		console.log("targetUserFinderByCellphone catch", error);

		res.errorCollector({ data: { error } });
	} finally {
		next();
	}
};

module.exports = { targetUserFinderByCellphoneMDW };
