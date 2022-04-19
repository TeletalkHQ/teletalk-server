const MelipayamakApi = require("melipayamak");
const { errorThrower, getEnvironment } = require("~/functions/utilities/utils");
const { environmentsKey } = require("~/variables/constants/environmentsKey");

const USERNAME = getEnvironment(environmentsKey.SMS_CLIENT_USERNAME);
const PASSWORD = getEnvironment(environmentsKey.SMS_CLIENT_PASSWORD);

const api = new MelipayamakApi(USERNAME, PASSWORD);

const sms = api.sms();

const SMSClient = async ({ from, to, text, isFlash = false }) => {
  try {
    const result = await sms.send(to, from, text, isFlash);

    return result;
  } catch (error) {
    errorThrower(error, error);
  }
};

module.exports = { SMSClient };
