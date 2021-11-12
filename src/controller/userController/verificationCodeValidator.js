const { verificationCodeValidator } = require("~/function/tool/SMSClient");

const verifyLoginNormalUserController = async (req, res) => {
	try {
		const {
			body: { cellphone, verificationCode },
		} = req;

		const isValid = await verificationCodeValidator(
			cellphone,
			verificationCode
		);

		if (isValid) {
			console.log(
				`Code ${595783} for this number ${cellphone} is valid and verified.`
			);
		} else {
			const error = "Provided code for that number is not valid!";
			console.log(error);
			throw error;
		}

		res.status(200).json({ isValid });
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
};

module.exports = { verifyLoginNormalUserController };
