const generatePassword = require("generate-password");

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

    return { randomPassword };
  } catch (error) {
    throw error;
  }
};

module.exports = { passwordGenerator };
