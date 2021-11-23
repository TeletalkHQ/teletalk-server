const { tokenVerifier } = require("~/function/utility/tokenVerifier");

const authDefaultMDW = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		req.body.authData = await tokenVerifier({ token });
	} catch (error) {
		console.log("authDefaultMDW  catch ", error);
		res.errorCollector({ error, statusCode: 401 });
	} finally {
		// next();
		res.errorResponser();
	}
};

module.exports = { authDefaultMDW };
