const { userProps } = require("@/classes/UserProps");
const { cellphoneValidator } = require("@/validators/userValidators");

const cellphoneValidatorMiddleware = async (req, res, next) => {
  try {
    const cellphone = userProps.getCellphone(req.body);
    await cellphoneValidator(cellphone);

    next();

    return { done: true };
  } catch (error) {
    logger.log("cellphoneValidatorMiddleware catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
    return { done: false };
  }
};

module.exports = { cellphoneValidatorMiddleware };
