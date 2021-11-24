const { userError } = require("~/constant/error/userError/userError");

const selfStuffControllerMDW = (req, res, next) => {
	try {
		const user = req.body.authData.data.payload;
		const { cellphone } = req.body;

		if (user.cellphone === cellphone) {
			const error = userError.SELF_STUFF;
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
