const MelipayamakApi = require("melipayamak");

const { getEnvironment, errorThrower } = require("../utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");

const USERNAME = getEnvironment(ENVIRONMENT_KEYS.SMS_CLIENT_USERNAME);
const PASSWORD = getEnvironment(ENVIRONMENT_KEYS.SMS_CLIENT_PASSWORD);

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
