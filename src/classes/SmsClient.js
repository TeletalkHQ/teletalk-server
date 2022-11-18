const { envManager } = require("@/classes/EnvironmentManager");

const axios = require("axios");

const { errorThrower } = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors");

class SmsClient {
  #smsProviderToken = envManager.getEnvironment(
    envManager.ENVIRONMENT_KEYS.SMS_PROVIDER_TOKEN
  );
  #smsProviderSender = envManager.getEnvironment(
    envManager.ENVIRONMENT_KEYS.SMS_PROVIDER_SENDER
  );
  #smsProviderUrl = envManager.getEnvironment(
    envManager.ENVIRONMENT_KEYS.SMS_PROVIDER_URL
  );

  #options = {
    method: "POST",
    sendFrom: this.#smsProviderSender,
    url: `${this.#smsProviderUrl}/${this.#smsProviderToken}`,
  };

  async sendSms(sendTo, text, options = this.#options) {
    const { sendFrom, method, url } = {
      ...this.#options,
      ...options,
    };

    const smsResult = await axios.post(
      url,
      {
        from: sendFrom,
        to: sendTo,
        text,
      },
      {
        method,
      }
    );

    errorThrower(smsResult.status !== 200, errors.SEND_SMS_FAILED);
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
