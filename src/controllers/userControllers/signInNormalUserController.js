const {
  passwordGenerator,
} = require("@/functions/utilities/passwordGenerator");
const { tokenSigner } = require("@/functions/utilities/tokenSigner");
const { userProps } = require("@/functions/helpers/UserProps");
const { getHostFromRequest } = require("@/functions/utilities/utils");

const { sendSms, smsTexts } = require("@/functions/tools/SmsClient");
const { temporaryClients } = require("@/functions/tools/TemporaryClients");
const { envManager } = require("@/functions/utilities/EnvironmentManager");

const { verificationCodeValidator } = require("@/validators/userValidators");

const signInNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const cellphone = userProps.getCellphone(req.body);

    const verificationCode = passwordGenerator();

    await verificationCodeValidator(verificationCode);

    sendSms(
      cellphone.countryCode,
      cellphone.phoneNumber,
      smsTexts.sendVerificationCode(verificationCode, getHostFromRequest(req))
    );

    const verifyToken = await tokenSigner(
      cellphone,
      envManager.getJwtSignInSecret()
    );

    const client = await temporaryClients.findClient(cellphone);

    if (client) {
      await temporaryClients.updateClient(client, {
        verificationCode,
        mainToken: verifyToken,
      });
    } else {
      await temporaryClients.addClient({
        mainToken: verifyToken,
        verificationCode: verificationCode,
        ...cellphone,
      });
    }

    logger.log("verificationCode", verificationCode);

    const responseData = {
      ...cellphone,
      verifyToken,
    };

    if (envManager.getNodeEnv() === envManager.getNodeEnvValues().test) {
      envManager.setTestVerificationCode(verificationCode);
    }

    res.checkAndResponse({ user: responseData });
  } catch (error) {
    logger.log("signInNormalUserController catch, error: ", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { signInNormalUserController };
