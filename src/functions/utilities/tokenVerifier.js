const JWT = require("jsonwebtoken");

const {
  initialValue,
} = require("~/variables/constants/initialValues/initialValue");

const initialOptions = initialValue.jwtOptions;

const tokenVerifier = async (
  token,
  secret = process.env.JWT_MAIN_SECRET,
  options = initialOptions
) => {
  const data = JWT.verify(token, secret, {
    complete: true,
    ...initialOptions,
    ...options,
  });

  return data;
};

module.exports = { tokenVerifier };
