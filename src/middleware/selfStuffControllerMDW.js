const { userError } = require("~/constant/error/userError/userError");
const { cellphoneFinder } = require("~/function/utility/cellphoneFinder");

const selfStuffControllerMDW = (req, res, next) => {
	try {
		const user = req.body.authData.data.payload;

		const { cellphone } = req.body;

		const userCellphone = cellphoneFinder({
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
				...userError.SELF_STUFF,
			};

			throw error;
		}
	} catch (error) {
		console.log("selfStuffControllerMDW catch", error);
		res.errorCollector({ error });
	} finally {
		next();
	}
};

module.exports = { selfStuffControllerMDW };
