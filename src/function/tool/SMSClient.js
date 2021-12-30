const MelipayamakApi = require("melipayamak");
const { SMS_CLIENT_PASSWORD, SMS_CLIENT_USERNAME } = require("~/config/secret/secret");

const api = new MelipayamakApi(
	process.env.SMS_CLIENT_USERNAME,
	process.env.SMS_CLIENT_PASSWORD,
);

const sms = api.sms();
const from = "50004001700470";
const to = "09012700470";
const text = "تست وب سرویس ملی پیامک";

const isFlash = false;

const SMSClient = async () => {
	const result = await sms.send(to, from, text, isFlash);

	console.log(result);
};

SMSClient();

module.exports = { SMSClient };
