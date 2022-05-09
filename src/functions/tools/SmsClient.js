const MelipayamakApi = require("melipayamak");

const { getEnvironment, errorThrower } = require("@/functions/utilities/utils");

const {
  ENVIRONMENT_KEYS,
  ENVIRONMENT_VALUES,
} = require("@/variables/constants/environmentInitialValues");

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
  const NODE_ENV = getEnvironment(ENVIRONMENT_KEYS.NODE_ENV);
  const { test, development } = ENVIRONMENT_VALUES.NODE_ENV;

  const condition = NODE_ENV === test || NODE_ENV === development;
  if (condition) {
    const from = "50004001700470";
    const to = `+${countryCode}${phoneNumber}`;

    const smsResult = await smsClient({ from, to, text });

    errorThrower(
      smsResult.StrRetStatus !== "ok" && smsResult.RetStatus !== 1,
      smsResult
    );
  }

  return { done: true };
};

const smsTexts = {
  sendVerificationCode: (
    verificationCode,
    host
  ) => `Hi! this sms is from teletalk! Your verify code is: ${verificationCode} \n\n ${host}        
        `,
};

module.exports = { smsClient, sendSms, smsTexts };
