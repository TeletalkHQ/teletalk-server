const JWT = require("jsonwebtoken");

const { errorThrower } = require("~/functions/utilities/utils");

const {
  initialValue,
} = require("~/variables/constants/initialValues/initialValue");

const initialOptions = initialValue.jwtOptions;

const tokenSigner = async ({ data, secret, options = initialOptions }) => {
  try {
    return JWT.sign(data, secret || process.env.JWT_MAIN_SECRET, {
      ...initialOptions,
      ...options,
    });
  } catch (error) {
    errorThrower(error, error);
  }
};

module.exports = { tokenSigner };
