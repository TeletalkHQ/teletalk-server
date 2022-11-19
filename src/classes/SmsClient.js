const { envManager } = require("@/classes/EnvironmentManager");

const axios = require("axios");

const { errorThrower } = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors");

const defaultSendFunction = () => {
  console.log("Trying to send sms with default configs...");
  const https = require("https");

  const data = JSON.stringify({
    from: "50004001700470",
    to: "09012700470",
    text: "test sms from default",
  });

  const options = {
    hostname: "console.melipayamak.com",
    port: 443,
    path: "/api/send/simple/65fccecf79c34fad92f998de3ffff3c9",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = https.request(options, (res) => {
    console.log("statusCode: " + res.statusCode);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
};

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
    defaultSendFunction();

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
