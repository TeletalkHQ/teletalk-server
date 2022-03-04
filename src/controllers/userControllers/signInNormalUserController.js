const {
  passwordGenerator,
} = require("~/functions/utilities/passwordGenerator");
const { tokenSigner } = require("~/functions/utilities/tokenSigner");

const { SMSClient } = require("~/functions/tools/SMSClient");
const { clients } = require("~/temp/Clients");

const signInNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    const { randomPassword } = passwordGenerator();

    const from = "50004001700470";
    const to = `0${phoneNumber}`;
    const text = `Hi! this sms is from teletalk! Your verify code is: ${randomPassword}`;

    const smsResult = await SMSClient({ from, to, text });

    if (!smsResult.StrRetStatus === "ok" && !smsResult.RetStatus === 1) {
      throw smsResult;
    }

    const { token } = await tokenSigner({
      data: cellphone,
      secret: process.env.JWT_SIGN_IN_SECRET,
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
      client.verifyCode = randomPassword;
    } else {
      clients.addClient({ token, verifyCode: randomPassword, ...cellphone });
    }

    console.log(randomPassword);

    res.status(200).json({
      ...cellphone,
      token,
    });
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { signInNormalUserController };
