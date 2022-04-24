const {
  passwordGenerator,
} = require("~/functions/utilities/passwordGenerator");
const { tokenSigner } = require("~/functions/utilities/tokenSigner");
const {
  getCellphone,
  getHostFromRequest,
} = require("~/functions/utilities/utilsNoDeps");
const { getEnvironment } = require("~/functions/utilities/utilsNoDeps");
const { sendSms, smsTexts } = require("~/functions/tools/smsClient");
const { clients } = require("~/functions/tools/Clients");

const {
  ENVIRONMENT_KEYS,
  ENVIRONMENT_VALUES,
} = require("~/variables/constants/environmentInitialValues");
const {
  userRoutes: {
    properties: {
      signInNormalRoute: { properties: signInNormalRoute },
    },
  },
} = require("~/variables/routes/userRoutes");
const {
  verificationCodeValidator,
} = require("~/validators/userValidators/verificationCodeValidator");

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

    const token = await tokenSigner({
      data: cellphone,
      secret: getEnvironment(ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET),
    });

    const client = clients.findClient(cellphone);

    if (client) {
      clients.updateClient(client, { verificationCode, token });
    } else {
      clients.addClient({
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
