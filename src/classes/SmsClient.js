const MelipayamakApi = require("melipayamak");

const { envManager } = require("@/classes/EnvironmentManager");

const { errorThrower } = require("@/functions/utilities/utils");

const {
  appErrors: { SEND_SMS_FAILED },
} = require("@/variables/errors/appErrors");

class SmsClient {
  constructor() {
    const { username, password } = this.getSmsClientProps();

    this.api = new MelipayamakApi(username, password);
    this.sms = this.api.sms("rest", "async");

    this.defaultOptions = {
      sendFrom: "50004001700470",
      to: "",
      text: "",
      isFlash: false,
    };
  }

  async sendSms(sendTo, text, options = this.defaultOptions) {
    const { sendFrom, isFlash } = {
      ...this.defaultOptions,
      ...options,
    };

    const smsResult = await this.sms.send(sendTo, sendFrom, text, isFlash);

    errorThrower(
      smsResult.StrRetStatus !== "ok" && smsResult.RetStatus !== 1,
      () => ({
        ...SEND_SMS_FAILED,
        smsResult,
      })
    );

    return { ok: true };
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

  getSmsClientProps() {
    const { SMS_CLIENT_USERNAME, SMS_CLIENT_PASSWORD } =
      envManager.ENVIRONMENT_KEYS;

    return {
      username: envManager.getEnvironment(SMS_CLIENT_USERNAME),
      password: envManager.getEnvironment(SMS_CLIENT_PASSWORD),
    };
  }
}

const smsClient = new SmsClient();

module.exports = { smsClient };
