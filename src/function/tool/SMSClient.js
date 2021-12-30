const MelipayamakApi = require("melipayamak");
// const MelipayamakApi = require("./melipayamak");

const { SMS_CLIENT_PASSWORD, SMS_CLIENT_USERNAME } = require("~/config/secret/secret");

const USERNAME = process.env.SMS_CLIENT_USERNAME;
const PASSWORD = process.env.SMS_CLIENT_PASSWORD;

console.log("from env", USERNAME, PASSWORD);
console.log("from secret", SMS_CLIENT_USERNAME, SMS_CLIENT_PASSWORD);

const api = new MelipayamakApi(
	USERNAME || SMS_CLIENT_USERNAME,
	PASSWORD || SMS_CLIENT_PASSWORD,
);

const sms = api.sms();
const from = "50004001700470";
const to = "09129675269";
const text = "Hi! this sms is from teletalk! Your verify code is: 605854";

const isFlash = false;

const SMSClient = async () => {
	const result = await sms.send(to, from, text, isFlash);

	console.log(result);
};

module.exports = { SMSClient };
