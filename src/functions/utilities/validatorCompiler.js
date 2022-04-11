const Validator = require("fastest-validator");
const { errorThrower } = require("./utils");

const v = new Validator();

const validatorCompiler = (validationSchema) => {
  try {
    errorThrower(
      typeof validationSchema !== "object",
      "You must pass validationSchema as a object"
    );

    const validator = v.compile(validationSchema);

    return validator;
  } catch (error) {
    logger.log("validatorCompiler catch, error:", error);
    errorThrower(error, error);
  }
};

module.exports = { validatorCompiler };
