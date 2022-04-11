const Validator = require("fastest-validator");

const { errorThrower } = require("~/functions/utilities/utils");

const v = new Validator();

const validatorCompiler = (validationModel) => {
  try {
    errorThrower(
      typeof validationModel !== "object",
      "You must pass validationModel as a object"
    );

    const validator = v.compile(validationModel);

    return validator;
  } catch (error) {
    logger.log("validatorCompiler catch, error:", error);
    errorThrower(error, error);
  }
};

module.exports = { validatorCompiler };
