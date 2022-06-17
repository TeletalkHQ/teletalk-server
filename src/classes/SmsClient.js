const MelipayamakApi = require("melipayamak");

const { errorThrower, getErrorObject } = require("@/functions/utilities/utils");
const { envManager } = require("@/classes/EnvironmentManager");
const {
  appErrors: { SEND_SMS_FAILED },
} = require("@/variables/errors/appErrors");

class SmsClient {
  constructor() {
    const { username, password } = envManager.getSmsClientProps();

    this.api = new MelipayamakApi(username, password);
    this.sms = this.api.sms("rest", "async");

    this.defaultOptions = {
      sendFrom: "50004001700470",
      to: "",
      text: "",
      isFlash: false,
      sendCondition: true,
    };
  }

  async sendSms(countryCode, phoneNumber, text, options = this.defaultOptions) {
    const { sendFrom, isFlash } = {
      ...this.defaultOptions,
      ...options,
    };

    const sendTo = `+${countryCode}${phoneNumber}`;

    const smsResult = await this.sms.send(sendTo, sendFrom, text, isFlash);

    errorThrower(
      smsResult.StrRetStatus !== "ok" && smsResult.RetStatus !== 1,
      () => getErrorObject(SEND_SMS_FAILED, smsResult)
    );

    return { done: true };
  }

  smsTemplates() {
    return {
      sendVerificationCode: (
        verificationCode,
        host
      ) => `Hi! this sms is from teletalk! Your verify code is: ${verificationCode} \n\n ${host}        
        `,
    };
  }
}

const smsClient = new SmsClient();

module.exports = { smsClient };
