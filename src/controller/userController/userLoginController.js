var generator = require("generate-password");

const UserSchema = require("~/model/schema/userSchema/UserSchema");

const {
	userLoginValidator,
} = require("~/model/validator/userValidator/userLoginValidator");

exports.login = async (req, res) => {
	try {
		const {
			body: { cellphone, country_code, country_name },
			SMSClient,
		} = req;

		const validationResult = userLoginValidator({
			cellphone,
			country_code,
			country_name,
		});

		if (validationResult === true) {
			const user = await UserSchema.findOne({ cellphone, country_code });
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
					cellphone: `${country_code}${cellphone}`,
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
};
