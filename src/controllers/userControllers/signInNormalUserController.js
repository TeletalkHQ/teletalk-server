const { authManager } = require("@/classes/AuthManager");
const { userProps } = require("@/classes/UserProps");
const { smsClient } = require("@/classes/SmsClient");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { envManager } = require("@/classes/EnvironmentManager");

const { getHostFromRequest } = require("@/functions/utilities/utils");
const {
  passwordGenerator,
} = require("@/functions/utilities/passwordGenerator");

const { verificationCodeValidator } = require("@/validators/userValidators");

const signInNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const cellphone = userProps.makeCellphoneByObjectParam(req.body);

    const verificationCode = passwordGenerator();

    await verificationCodeValidator(verificationCode);

    const NODE_ENV = envManager.getNodeEnv();
    const { production } = envManager.getNodeEnvValues();
    const sendCondition = NODE_ENV === production;
    if (sendCondition) {
      const smsText = smsClient
        .smsTemplates()
        .sendVerificationCode(verificationCode, getHostFromRequest(req));

      await smsClient.sendSms(
        cellphone.countryCode,
        cellphone.phoneNumber,
        smsText,
        { sendCondition }
      );
    }

    const verifyToken = await authManager.tokenSigner(
      cellphone,
      authManager.getJwtSignInSecret()
    );

    const client = await temporaryClients.findClient(cellphone);

    if (client) {
      await temporaryClients.updateClient(client, {
        verificationCode,
        verifyToken,
      });
    } else {
      await temporaryClients.addClient({
        verifyToken,
        verificationCode,
        ...cellphone,
      });
    }

    logger.log("verificationCode", verificationCode);

    const responseData = {
      ...cellphone,
      verifyToken,
    };

    if (envManager.getNodeEnv() === envManager.getNodeEnvValues().test) {
      userProps.setTestVerificationCode(verificationCode);
    }

    res.checkDataAndResponse({ user: responseData });
  } catch (error) {
    logger.log("signInNormalUserController catch, error: ", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { signInNormalUserController };
