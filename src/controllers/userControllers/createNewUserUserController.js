const { userFinder } = require("~/functions/helpers/userFinder");
const { randomID } = require("~/functions/utilities/randomID");
const { sendableUserData } = require("~/functions/utilities/sendableUserData");
const { tokenSigner } = require("~/functions/utilities/tokenSigner");
const { tokenVerifier } = require("~/functions/utilities/tokenVerifier");
const { errorThrower } = require("~/functions/utilities/utils");

const { UserModel } = require("~/models/userModels/user.mongo");
const { clients } = require("~/functions/tools/Clients");
const { userErrorTemplate } = require("~/variables/errors/userErrorTemplate");

const { userModel } = require("~/models/userModels/user.model");
const {
  firstNameValidator,
} = require("~/validators/userValidators/firstNameValidator");
const {
  lastNameValidator,
} = require("~/validators/userValidators/lastNameValidator");

const createNewUserUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { firstName, lastName },
    } = req;

    const verifyToken = req.headers.authorization?.split("Bearer ")[1];

    errorThrower(!verifyToken, userErrorTemplate.TOKEN_REQUIRED);
    const tokenData = await tokenVerifier(
      verifyToken,
      process.env.JWT_SIGN_IN_SECRET
    );

    const errors = [];

    const isFirstNameValid = firstNameValidator({ firstName });
    const isLastNameValid = lastNameValidator({ lastName });

    if (isFirstNameValid !== true) errors.push(isFirstNameValid);
    if (isLastNameValid !== true) errors.push(isLastNameValid);

    errorThrower(errors.length, errors);
    const { phoneNumber, countryCode, countryName } = tokenData.payload;

    const cellphone = { phoneNumber, countryCode, countryName };

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

    errorThrower(!client, userErrorTemplate.USER_NOT_EXIST);

    const user = await userFinder({ ...cellphone });

    if (user) {
      await UserModel.findOneAndUpdate(
        { privateID: user.privateID },
        { tokens: user.token, firstName, lastName }
      );

      res.status(200).json({
        user: {
          ...sendableUserData({ user }).userData,
          firstName,
          lastName,
          token: user.tokens[0],
        },
      });
    } else if (!user) {
      const privateID = randomID(
        userModel.privateID.properties.maxlength.value
      );

      const token = await tokenSigner({
        data: { ...cellphone, privateID },
      });

      const userData = {
        ...cellphone,
        firstName,
        lastName,
        privateID,
        tokens: [{ token }],
      };

      const newUser = new UserModel(userData);
      await newUser.save();

      res.status(200).json({
        user: { ...cellphone, privateID, firstName, lastName, token },
      });
    }
  } catch (error) {
    logger.log("createNewUserUserController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { createNewUserUserController };
