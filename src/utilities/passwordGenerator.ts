import generatePassword from "generate-password";

const initialOptions = {
  exclude: "",
  length: 6,
  lowercase: false,
  numbers: true,
  symbol: false,
  uppercase: false,
};

const passwordGenerator = (options = initialOptions) => {
  return generatePassword.generate({
    ...initialOptions,
    ...options,
  });
};

export { passwordGenerator };
