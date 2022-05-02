const {
  errorThrower,
  getCellphone,
} = require("~/functions/utilities/utilsNoDeps");
const { contactValidator } = require("~/validators/userValidators");

const contactValidatorMiddleware = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;

    const cellphone = getCellphone(req.body);

    const validationResult = await contactValidator({
      ...cellphone,
      firstName,
      lastName,
    });

    errorThrower(validationResult !== true, validationResult);

    next();
  } catch (error) {
    logger.log("contactValidatorMiddleware catch: error" + error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { contactValidatorMiddleware };
