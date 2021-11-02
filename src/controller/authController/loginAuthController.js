var generator = require("generate-password");

const UserSchema = require("~/model/schema/authSchema/UserAuthSchema");

const {
	userLoginValidator,
} = require("~/model/validator/authValidator/loginAuthValidator");

exports.loginAuthController = async (req, res) => {
	try {
		const {
			body: { cellphone, countryCode, countryName },
			SMSClient,
		} = req;

		const validationResult = userLoginValidator({
			cellphone,
			countryCode,
			countryName,
		});

		if (validationResult === true) {
			const user = await UserSchema.findOne({ cellphone, countryCode });
			if (user) {
				const randomPassword = generator.generate({
					numbers: true,
					lowercase: false,
					uppercase: false,
					symbols: false,
				});

				// const messageID = await client.manualSendCode(
				// 	`0${cellphone}`,
				// 	`Verification Code: ${randomPassword} \n Teletalk-messenger`
				// );
				const messageID = await SMSClient.autoSendCode(
					"09012700470",
					"Signiture Footer For Branding"
				);

				console.log("Sent Message ID: " + messageID);

				res.json({
					messageID,
					randomPassword,
					cellphone: `${countryCode}${cellphone}`,
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
};
