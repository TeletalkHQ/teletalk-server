const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");
const { cellphoneFinder } = require("~/function/utility/cellphoneFinder");

const selfStuffControllerMDW = (req, res, next) => {
	try {
		const user = req.authData.data.payload;

		const { cellphone } = req.body;

		const { cellphone: userCellphone } = cellphoneFinder({
			cellphones: [
				{
					...user.cellphone,
				},
			],
			targetCell: cellphone,
		});

		if (userCellphone) {
			const error = {
				cellphone,
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
