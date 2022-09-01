const generatePassword = require("generate-password");

const initialOptions = {
  exclude: "",
  length: 6,
  lowercase: false,
  numbers: true,
  symbol: false,
  uppercase: false,
};

const passwordGenerator = (options = initialOptions) => {
  const randomPassword = generatePassword.generate({
    ...initialOptions,
    ...options,
  });

  return randomPassword;
};

module.exports = { passwordGenerator };
