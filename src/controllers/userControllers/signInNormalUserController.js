const {
  passwordGenerator,
} = require("@/functions/utilities/passwordGenerator");
const { tokenSigner } = require("@/functions/utilities/tokenSigner");
const {
  getCellphone,
  getHostFromRequest,
} = require("@/functions/utilities/utilsNoDeps");
const { getEnvironment } = require("@/functions/utilities/utilsNoDeps");
const { sendSms, smsTexts } = require("@/functions/tools/SmsClient");
const { TemporaryClients } = require("@/functions/tools/TemporaryClients");

const {
  ENVIRONMENT_KEYS,
  ENVIRONMENT_VALUES,
} = require("@/variables/constants/environmentInitialValues");
const {
  userRoutes: { signInNormalRoute },
} = require("@/variables/routes/userRoutes");
const { verificationCodeValidator } = require("@/validators/userValidators");

const signInNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const cellphone = getCellphone(req.body);

    const verificationCode = passwordGenerator();

    await verificationCodeValidator(verificationCode);

    sendSms(
      cellphone.countryCode,
      cellphone.phoneNumber,
      smsTexts.sendVerificationCode(verificationCode, getHostFromRequest(req))
    );

    const token = await tokenSigner(
      cellphone,
      getEnvironment(ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET)
    );

    const client = await TemporaryClients.findClient(cellphone);

    if (client) {
      await TemporaryClients.updateClient(client, { verificationCode, token });
    } else {
      await TemporaryClients.addClient({
        token,
        verificationCode: verificationCode,
        ...cellphone,
      });
    }

    logger.log(verificationCode);

    const responseData = {
      ...cellphone,
      token,
    };

    if (
      getEnvironment(ENVIRONMENT_KEYS.NODE_ENV) ===
      ENVIRONMENT_VALUES.NODE_ENV.test
    ) {
      responseData.verificationCode = verificationCode;
    }

    res.sendJsonResponse(signInNormalRoute, responseData);
  } catch (error) {
    logger.log("signInNormalUserController catch, error: ", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { signInNormalUserController };
