const { allStuff } = require("~/variables/otherVariables");

const getAllStuffVersionControlController = async (
	req = expressRequest,
	res = expressResponse,
) => {
	try {
		res.status(200).json({ allStuff });
	} catch (error) {
		console.log("getAllStuffVersionControlController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { getAllStuffVersionControlController };
