const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");

const authDefaultMDW = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split("Bearer ")[1];

		req.authData = await tokenVerifier({ token });

		next();
	} catch (error) {
		console.log("🚀 ~ file: authDefaultMDW.js ~ line 11 ~ authDefaultMDW ~ error", error);
		res.errorCollector({ data: { error, statusCode: 401 } });
		res.errorResponser();
	}
};

module.exports = { authDefaultMDW };

//TODO Add me in function!
// myConsole
// 	.bgRed("🚀")
// 	.bgGreen("~ file: authDefaultMDW.js")
// 	.bgYellow("~ line 11")
// 	.bgMagenta("~ authDefaultMDW")
// 	.bgCyan("error\n")
// 	.log("#)((@#)()(#(@(#@#(()@)@#@)()@#()#()(@#()@()");
