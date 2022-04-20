const generatePassword = require("generate-password");

const { errorThrower } = require("~/functions/utilities/utilsNoDeps");

const initialOptions = {
  length: 6,
  numbers: true,
  lowercase: false,
  uppercase: false,
  symbol: false,
  exclude: "",
};

const passwordGenerator = (options = initialOptions) => {
  try {
    const randomPassword = generatePassword.generate({
      ...initialOptions,
      ...options,
    });

    return randomPassword;
  } catch (error) {
    logger.log("passwordGenerator", error);
    errorThrower(error, error);
  }
};

module.exports = { passwordGenerator };
