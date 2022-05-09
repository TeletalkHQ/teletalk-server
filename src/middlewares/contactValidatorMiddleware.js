const { userProps } = require("@/functions/helpers/UserProps");
const { errorThrower } = require("@/functions/utilities/utilsNoDeps");
const { contactValidator } = require("@/validators/userValidators");

const contactValidatorMiddleware = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;

    const validationResult = await contactValidator({
      ...userProps.getCellphone(req.body),
      firstName,
      lastName,
    });

    errorThrower(validationResult.done !== true, validationResult);

    next();
  } catch (error) {
    logger.log("contactValidatorMiddleware catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { contactValidatorMiddleware };
