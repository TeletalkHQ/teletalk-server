const MelipayamakApi = require("melipayamak");

const { getEnvironment, errorThrower } = require("../utilities/utilsNoDeps");

const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");

const USERNAME = getEnvironment(ENVIRONMENT_KEYS.SMS_CLIENT_USERNAME);
const PASSWORD = getEnvironment(ENVIRONMENT_KEYS.SMS_CLIENT_PASSWORD);

const api = new MelipayamakApi(USERNAME, PASSWORD);

const sms = api.sms();

const smsClient = async ({ from, to, text, isFlash = false }) => {
  try {
    const result = await sms.send(to, from, text, isFlash);

    return result;
  } catch (error) {
    errorThrower(error, error);
  }
};

const sendSms = async (countryCode, phoneNumber, text) => {
  const from = "50004001700470";
  const to = `+${countryCode}${phoneNumber}`;

  const smsResult = await smsClient({ from, to, text });

  errorThrower(
    !smsResult.StrRetStatus === "ok" && !smsResult.RetStatus === 1,
    smsResult
  );
};

module.exports = { smsClient, sendSms };
