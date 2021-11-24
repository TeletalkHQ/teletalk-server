const { tokenVerifier } = require("~/function/utility/tokenVerifier");

const authDefaultMDW = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		req.body.authData = await tokenVerifier({ token });
		next();
	} catch (error) {
		console.log("authDefaultMDW  catch ", error);
		res.errorCollector({ error, statusCode: 401 });
		res.errorResponser();
	} finally {
		// next();
	}
};

module.exports = { authDefaultMDW };
