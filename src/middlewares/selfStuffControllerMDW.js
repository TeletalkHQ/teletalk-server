const { userErrorTemplate } = require("~/templates/errorTemplates/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");

const selfStuffControllerMDW = (req, res, next) => {
	try {
		const { phoneNumber, countryCode, countryName } = req.authData.data.payload;

		const { ...targetCellphone } = req.body;

		const cellphone = { phoneNumber, countryCode, countryName };

		const { cellphone: userCellphone } = cellphoneFinder({
			cellphones: [cellphone],
			targetCell: targetCellphone,
		});

		if (userCellphone) {
			const error = {
				...targetCellphone,
				...userErrorTemplate.SELF_STUFF,
			};

			throw error;
		}

		next();
	} catch (error) {
		console.log("selfStuffControllerMDW catch", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { selfStuffControllerMDW };
