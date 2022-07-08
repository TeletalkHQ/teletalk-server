const { userProps } = require("@/classes/UserProps");

const { errorThrower } = require("@/functions/utilities/utils");

const { contactValidator } = require("@/validators/userValidators");

const contactValidatorMiddleware = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;

    const validationResult = await contactValidator({
      ...userProps.makeCellphoneByObjectParam(req.body),
      firstName,
      lastName,
    });

    errorThrower(validationResult.done !== true, validationResult);

    next();

    return { done: true };
  } catch (error) {
    logger.log("contactValidatorMiddleware catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
    return { done: false };
  }
};

module.exports = { contactValidatorMiddleware };
