const JWT = require("jsonwebtoken");

const {
  initialValue,
} = require("~/variables/constants/initialValues/initialValue");

const initialOptions = initialValue.jwtOptions;

const tokenSigner = async ({ data, secret, options = initialOptions }) => {
  try {
    // logger.log(options);
    const token = JWT.sign(data, secret || process.env.JWT_MAIN_SECRET, {
      ...initialOptions,
      ...options,
    });

    // logger.log(token);

    return { token };
  } catch (err) {
    throw err;
  }
};

module.exports = { tokenSigner };
