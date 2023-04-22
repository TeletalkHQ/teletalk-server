import axios from "axios";
import { errorThrower } from "utility-store";
import { trier } from "simple-trier";

import { appConfigs } from "@/classes/AppConfigs";

import { loggerHelper } from "@/helpers/logHelper";

import { errors } from "@/variables/errors";

class SmsClient {
  templates() {
    return {
      verificationCode: (verificationCode: string, host: string) =>
        `verification code: ${verificationCode} ${loggerHelper.newLine()}${loggerHelper.newLine()} ${host}        
        `,
    };
  }

  async sendVerificationCode(
    sendTo: string,
    host: string,
    verificationCode: string
  ) {
    const text = this.templates().verificationCode(verificationCode, host);
    const { SMS_PROVIDER_SELECTOR } = appConfigs.getConfigs().SMS_CLIENT;

    const providers = [this.devProvider, this.provider1, this.provider2];
    await trier(this.sendVerificationCode.name)
      .tryAsync(providers[SMS_PROVIDER_SELECTOR].bind(this), sendTo, text)
      .catch((error) => ({
        ...errors.SEND_SMS_FAILED,
        providerError: error,
      }))
      .throw()
      .runAsync();
  }

  private async devProvider(sendTo: string, text: string) {
    logger.debug(`verificationCode sending to:${sendTo}`, `text:${text}`);
  }

  private async provider1(sendTo: string, text: string) {
    const {
      SMS_PROVIDER_1_HOST,
      SMS_PROVIDER_1_ROUTE,
      SMS_PROVIDER_1_SENDER,
      SMS_PROVIDER_1_SESSION,
    } = appConfigs.getConfigs().SMS_CLIENT;

    const { method, sendFrom, url } = {
      method: "POST",
      sendFrom: SMS_PROVIDER_1_SENDER,
      url: `${SMS_PROVIDER_1_HOST}${SMS_PROVIDER_1_ROUTE}/${SMS_PROVIDER_1_SESSION}`,
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
  private async provider2(sendTo: string, text: string) {
    const {
      SMS_PROVIDER_2_HOST,
      SMS_PROVIDER_2_REPORT_URL,
      SMS_PROVIDER_2_ROUTE,
      SMS_PROVIDER_2_SESSION,
    } = appConfigs.getConfigs().SMS_CLIENT;

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
        Authorization: `Bearer ${SMS_PROVIDER_2_SESSION}`,
      },
      method: "post",
      url: `${SMS_PROVIDER_2_HOST}${SMS_PROVIDER_2_ROUTE}`,
    };

    await axios(config);
  }
}

const smsClient = new SmsClient();

export { smsClient };
