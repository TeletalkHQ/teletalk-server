import { trier } from "simple-trier";
import axios from "axios";
import { errorThrower } from "utility-store";

import { envManager } from "@/classes/EnvironmentManager";

import { errors } from "@/variables/errors";

import { loggerHelper } from "@/utilities/logHelper";

class SmsClient {
  templates() {
    return {
      verificationCode: (verificationCode, host) =>
        `verification code: ${verificationCode} ${loggerHelper.newLine()}${loggerHelper.newLine()} ${host}        
        `,
    };
  }

  async sendVerificationCode(sendTo, host, verificationCode) {
    const text = this.templates().verificationCode(verificationCode, host);
    const providerIndex = envManager.getEnvironment(
      envManager.ENVIRONMENT_KEYS.SMS_PROVIDER_SELECTOR
    );

    const providers = [this.devProvider, this.#provider1, this.#provider2];
    await trier(this.sendVerificationCode.name)
      .tryAsync(providers[providerIndex].bind(this), sendTo, text)
      .catch((error) => ({
        ...errors.SEND_SMS_FAILED,
        providerError: error,
      }))
      .throw()
      .runAsync();
  }

  devProvider(sendTo, text) {
    logger.debug(`verificationCode sending to:${sendTo}`, `text:${text}`);
  }

  async #provider1(sendTo, text) {
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
  async #provider2(sendTo, text) {
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

export { smsClient };
