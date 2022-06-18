const Validator = require("fastest-validator");

const { errorThrower } = require("@/functions/utilities/utils");
const { customTypeof } = require("@/classes/CustomTypeof");

const v = new Validator();

const validatorCompiler = ({ version, ...validationModel }) => {
  try {
    errorThrower(
      !customTypeof.check(validationModel).type.object,
      "You must pass validationModel as a object"
    );

    return v.compile(validationModel);
  } catch (error) {
    logger.log("validatorCompiler catch, error:", error);
    errorThrower(error, error);
  }
};

module.exports = { validatorCompiler };
