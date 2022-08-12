const { authManager } = require("@/classes/AuthManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
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
    const cellphone = userPropsUtilities.makeCellphoneByObjectParam(req.body);

    const verificationCode = passwordGenerator();

    await verificationCodeValidator(verificationCode);

    const NODE_ENV = envManager.getNodeEnv();
    const { production } = envManager.getNodeEnvValues();

    //TODO Move to appConfigs
    const sendCondition = NODE_ENV === production;
    if (sendCondition) {
      const host = getHostFromRequest(req);
      const smsText = smsClient
        .smsTemplates()
        .sendVerificationCode(verificationCode, host);

      const sendTo = userPropsUtilities.makeFullNumber(
        cellphone.countryCode,
        cellphone.phoneNumber
      );

      await smsClient.sendSms(sendTo, smsText);
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

    const NODE_ENV_KEY = envManager.getNodeEnv();
    const NODE_ENV_VALUE = envManager.getNodeEnvValues().test;
    if (NODE_ENV_KEY === NODE_ENV_VALUE) {
      userPropsUtilities.setTestVerificationCode(verificationCode);
    }

    res.checkDataAndResponse({ user: responseData });
  } catch (error) {
    logger.log("signInNormalUserController catch, error: ", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { signInNormalUserController };
