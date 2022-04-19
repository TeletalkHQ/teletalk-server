const JWT = require("jsonwebtoken");

const { errorThrower, getEnvironment } = require("~/functions/utilities/utils");
const { environmentsKey } = require("~/variables/constants/environmentsKey");

const {
  initialValue,
} = require("~/variables/constants/initialValues/initialValue");

const initialOptions = initialValue.jwtOptions;

const tokenSigner = async ({ data, secret, options = initialOptions }) => {
  try {
    return JWT.sign(
      data,
      secret || getEnvironment(environmentsKey.JWT_MAIN_SECRET),
      {
        ...initialOptions,
        ...options,
      }
    );
  } catch (error) {
    errorThrower(error, error);
  }
};

module.exports = { tokenSigner };
