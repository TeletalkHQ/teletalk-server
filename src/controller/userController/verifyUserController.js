const { smsValidator } = require("~/function/tool/SMSClient");

const verifyUserController = async (req, res) => {
	try {
		const {
			body: { cellphone, verifyCode },
		} = req;

		const isValid = await smsValidator(cellphone, verifyCode);

		if (isValid) {
			console.log(
				"Code 595783 for this number 09301234567 is valid and verified."
			);
		} else {
			console.log("Provided code for that number is not valid!");
		}

		res.json({ isValid });
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

module.exports = { verifyUserController };
