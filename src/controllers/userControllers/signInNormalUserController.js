const {
  passwordGenerator,
} = require("~/functions/utilities/passwordGenerator");
const { tokenSigner } = require("~/functions/utilities/tokenSigner");
const { getStatusCodeFromRoute } = require("~/functions/utilities/utilsNoDeps");
const {
  errorThrower,
  getEnvironment,
} = require("~/functions/utilities/utilsNoDeps");

const { SMSClient } = require("~/functions/tools/SMSClient");
const { clients } = require("~/functions/tools/Clients");

const {
  ENVIRONMENT_KEYS,
  ENVIRONMENT_VALUES,
} = require("~/variables/constants/environmentInitialValues");
const { userRoutes } = require("~/variables/routes/userRoutes");

const signInNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    const verificationCode = passwordGenerator();

    const from = "50004001700470";
    const to = `0${phoneNumber}`;
    const text = `Hi! this sms is from teletalk! Your verify code is: ${verificationCode}`;

    const smsResult = await SMSClient({ from, to, text });

    errorThrower(
      !smsResult.StrRetStatus === "ok" && !smsResult.RetStatus === 1,
      smsResult
    );

    const token = await tokenSigner({
      data: cellphone,
      secret: getEnvironment(ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET),
    });

    const client = clients.aliveClients.find((client) => {
      if (
        client.phoneNumber === phoneNumber &&
        client.countryCode === countryCode
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (client) {
      client.verificationCode = verificationCode;
    } else {
      clients.addClient({
        token,
        verificationCode: verificationCode,
        ...cellphone,
      });
    }

    logger.log(verificationCode);

    res
      .status(getStatusCodeFromRoute(userRoutes.properties.signInNormal))
      .json({
        ...cellphone,
        token,
        ...(() => {
          if (
            getEnvironment(ENVIRONMENT_KEYS.NODE_ENV) ===
            ENVIRONMENT_VALUES.NODE_ENV.test
          )
            return { verificationCode };
        })(),
      });
  } catch (error) {
    logger.log("signInNormalUserController catch, error: ", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { signInNormalUserController };
