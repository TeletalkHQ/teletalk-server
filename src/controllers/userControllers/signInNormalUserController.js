const {
  passwordGenerator,
} = require("@/functions/utilities/passwordGenerator");
const { tokenSigner } = require("@/functions/utilities/tokenSigner");
const { userProps } = require("@/functions/helpers/UserProps");
const { getHostFromRequest } = require("@/functions/utilities/utils");
const {
  getEnvironment,
  setEnvironment,
} = require("@/functions/utilities/utils");
const { sendSms, smsTexts } = require("@/functions/tools/SmsClient");
const { TemporaryClients } = require("@/functions/tools/TemporaryClients");

const {
  ENVIRONMENT_KEYS,
  ENVIRONMENT_VALUES,
} = require("@/variables/constants/environmentInitialValues");
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
      getEnvironment(ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET)
    );

    const client = await TemporaryClients.findClient(cellphone);

    if (client) {
      await TemporaryClients.updateClient(client, {
        verificationCode,
        mainToken: verifyToken,
      });
    } else {
      await TemporaryClients.addClient({
        mainToken: verifyToken,
        verificationCode: verificationCode,
        ...cellphone,
      });
    }

    logger.log(verificationCode);

    const responseData = {
      ...cellphone,
      verifyToken,
    };

    if (
      getEnvironment(ENVIRONMENT_KEYS.NODE_ENV) ===
      ENVIRONMENT_VALUES.NODE_ENV.test
    ) {
      setEnvironment(ENVIRONMENT_KEYS.TEST_VERIFICATION_CODE, verificationCode);
    }

    res.checkAndResponse({ user: responseData });
  } catch (error) {
    logger.log("signInNormalUserController catch, error: ", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { signInNormalUserController };
