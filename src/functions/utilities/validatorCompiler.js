const Validator = require("fastest-validator");

const v = new Validator();

const validatorCompiler = (validationSchema) => {
  try {
    if (typeof validationSchema !== "object") {
      const error = "You must pass validationSchema as a object";
      throw error;
    }

    const validator = v.compile(validationSchema);

    return validator;
  } catch (error) {
    logger.log("validatorCompiler catch, error:", error);
  }
};

module.exports = { validatorCompiler };
