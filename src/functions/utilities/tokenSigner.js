const JWT = require("jsonwebtoken");

const {
  initialValue,
} = require("~/variables/constants/initialValues/initialValue");
const { errorThrower } = require("./utils");

const initialOptions = initialValue.jwtOptions;

const tokenSigner = async ({ data, secret, options = initialOptions }) => {
  try {
    const token = JWT.sign(data, secret || process.env.JWT_MAIN_SECRET, {
      ...initialOptions,
      ...options,
    });

    return { token };
  } catch (error) {
    errorThrower(error, error);
  }
};

module.exports = { tokenSigner };
