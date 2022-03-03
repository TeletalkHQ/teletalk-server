const MelipayamakApi = require("melipayamak");

const USERNAME = process.env.SMS_CLIENT_USERNAME;
const PASSWORD = process.env.SMS_CLIENT_PASSWORD;

const api = new MelipayamakApi(USERNAME, PASSWORD);

const sms = api.sms();

const SMSClient = async ({ from, to, text, isFlash = false }) => {
  try {
    const result = await sms.send(to, from, text, isFlash);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { SMSClient };
