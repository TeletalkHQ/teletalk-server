const JWT = require("jsonwebtoken");
const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");

const {
  initialValue,
} = require("~/variables/constants/initialValues/initialValue");
const { getEnvironment } = require("~/functions/utilities/utils");

const initialOptions = initialValue.jwtOptions;

const tokenVerifier = async (
  token,
  secret = getEnvironment(ENVIRONMENT_KEYS.JWT_MAIN_SECRET),
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
