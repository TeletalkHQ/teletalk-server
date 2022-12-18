const { errorThrower } = require("utility-store/src/functions/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { envManager } = require("@/classes/EnvironmentManager");

const axios = require("axios");

const { errors } = require("@/variables/errors");

const { crashServer } = require("@/utilities/utilities");

class SmsClient {
  templates() {
    return {
      verificationCode: (verificationCode, host) =>
        `کد تایید: ${verificationCode} \n\n ${host}        
        `,
    };
  }

  async sendVerificationCode(sendTo, host, verificationCode) {
    const text = this.templates().verificationCode(verificationCode, host);
    const providerIndex = envManager.getEnvironment(
      envManager.ENVIRONMENT_KEYS.SMS_PROVIDER_SELECTOR
    );

    const providers = [
      this.wrongProvider,
      this.#verificationCodeProvider1,
      this.#verificationCodeProvider2,
    ];
    return await trier(this.sendVerificationCode)
      .tryAsync(providers[providerIndex], sendTo, text)
      .catch((error) => ({
        ...errors.SEND_SMS_FAILED,
        providerError: error,
      }))
      .throw()
      .runAsync();
  }

  async #verificationCodeProvider1(sendTo, text) {
    const {
      SMS_PROVIDER_1_HOST,
      SMS_PROVIDER_1_ROUTE,
      SMS_PROVIDER_1_SENDER,
      SMS_PROVIDER_1_TOKEN,
    } = envManager.getAllLocalEnvironments();

    const { method, sendFrom, url } = {
      method: "POST",
      sendFrom: SMS_PROVIDER_1_SENDER,
      url: `${SMS_PROVIDER_1_HOST}${SMS_PROVIDER_1_ROUTE}/${SMS_PROVIDER_1_TOKEN}`,
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
  async #verificationCodeProvider2(sendTo, text) {
    const {
      SMS_PROVIDER_2_HOST,
      SMS_PROVIDER_2_REPORT_URL,
      SMS_PROVIDER_2_ROUTE,
      SMS_PROVIDER_2_TOKEN,
    } = envManager.getAllLocalEnvironments();

    const config = {
      data: {
        messages: [
          {
            channel: "sms",
            content: text,
            data_coding: "text",
            msg_type: "text",
            recipients: [sendTo],
          },
        ],
        message_globals: {
          originator: "SignOTP",
          report_url: SMS_PROVIDER_2_REPORT_URL,
        },
      },
      headers: {
        Authorization: `Bearer ${SMS_PROVIDER_2_TOKEN}`,
      },
      method: "post",
      url: `${SMS_PROVIDER_2_HOST}${SMS_PROVIDER_2_ROUTE}`,
    };

    await axios(config);
  }

  wrongProvider() {
    const message =
      "SMS_PROVIDER_SELECTOR is 0 which is a wrong number, please check your environments";
    logger.error(message);
    crashServer(message);
  }
}

const smsClient = new SmsClient();

module.exports = { smsClient };
