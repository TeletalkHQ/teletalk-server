const { envManager } = require("@/classes/EnvironmentManager");

const axios = require("axios");

const { errorThrower } = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors");
const { trier } = require("utility-store/src/classes/Trier");

class SmsClient {
  templates() {
    return {
      verificationCode: (
        verificationCode,
        host
      ) => `Hi! this sms is from teletalk! Your verification code is: ${verificationCode} \n\n ${host}        
        `,
    };
  }

  async sendVerificationCode(sendTo, host, verificationCode) {
    const text = this.templates().verificationCode(verificationCode, host);
    const providerIndex = envManager.getEnvironment(
      envManager.ENVIRONMENT_KEYS.SMS_PROVIDER_SELECTOR
    );

    const providers = [
      () => {
        //TODO: log something and say index is wrong
      },
      this.#verificationCodeProvider1,
      this.#verificationCodeProvider2,
    ];
    return (
      await trier(this.sendVerificationCode).tryAsync(
        providers[providerIndex],
        sendTo,
        text
      )
    )
      .catch((error) => ({
        ...errors.SEND_SMS_FAILED,
        providerError: error,
      }))
      .printAndThrow()
      .result();
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
}

const smsClient = new SmsClient();

module.exports = { smsClient };
