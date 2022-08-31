const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utils");

const { contactValidator } = require("@/validators/userValidators");

const contactValidatorMiddleware = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;

    const validationResult = await contactValidator({
      ...userPropsUtilities.extractCellphone(req.body),
      firstName,
      lastName,
    });

    errorThrower(validationResult.ok !== true, validationResult);

    next();

    return { ok: true };
  } catch (error) {
    logger.log("contactValidatorMiddleware catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
    return { ok: false };
  }
};

module.exports = { contactValidatorMiddleware };
