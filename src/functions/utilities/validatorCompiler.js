const Validator = require("fastest-validator");

const { errorThrower, customTypeof } = require("@/functions/utilities/utils");

const v = new Validator();

const validatorCompiler = ({ version, ...validationModel }) => {
  try {
    errorThrower(
      !customTypeof(validationModel).type.object,
      "You must pass validationModel as a object"
    );

    return v.compile(validationModel);
  } catch (error) {
    logger.log("validatorCompiler catch, error:", error);
    errorThrower(error, error);
  }
};

module.exports = { validatorCompiler };
