const TrezSmsClient = require("trez-sms-client");

const SMSClient = new TrezSmsClient(
	process.env.SMS_CLIENT_USERNAME,
	process.env.SMS_CLIENT_PASSWORD
);

const smsValidator = async (cellphone, verifyCode) => {
	const isValid = await SMSClient.checkCode(cellphone, verifyCode);

	return isValid;
};

module.exports = { smsValidator };
