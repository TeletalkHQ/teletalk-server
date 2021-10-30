exports.verify = async (req, res) => {
	try {
		const {
			body: { cellphone, verify_code },
			SMSClient,
		} = req;
		const isValid = await SMSClient.checkCode(cellphone, verify_code);

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
	}
};
