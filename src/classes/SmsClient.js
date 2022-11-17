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
    url: `${this.#smsProviderUrl}/${this.#smsProviderToken}`,
    method: "POST",
    sendFrom: this.#smsProviderSender,
  };

  async sendSms(sendTo, text, options = this.#options) {
    const { sendFrom } = {
      ...this.#options,
      ...options,
    };

    const smsResult = await axios.post(
      this.#options.url,
      {
        from: sendFrom,
        text,
        to: sendTo,
      },
      {
        method: this.#options.method,
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
