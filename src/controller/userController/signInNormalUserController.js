const { passwordGenerator } = require("~/function/utility/passwordGenerator");
const { tokenSigner } = require("~/function/utility/tokenSigner");

const { SMSClient } = require("~/function/tool/SMSClient");
const { clients } = require("~/temp/Clients");

const signInNormalUserController = async (req, res) => {
	try {
		const { cellphone } = req.body;

		const { randomPassword } = passwordGenerator();

		const from = "50004001700470";
		const to = `0${cellphone.phoneNumber}`;
		const text = `Hi! this sms is from teletalk! Your verify code is: ${randomPassword}`;

		const smsResult = await SMSClient({ from, to, text });

		if (!smsResult.StrRetStatus === "ok" && !smsResult.RetStatus === 1) {
			throw smsResult;
		}

		const { token } = await tokenSigner({
			//! Pass is temporary!
			data: { cellphone },
			secret: process.env.JWT_SIGN_IN_SECRET,
		});

		clients.addClient({ token, verifyCode: randomPassword, cellphone });

		res.status(200).json({
			cellphone,
			token,
		});
	} catch (error) {
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { signInNormalUserController };
