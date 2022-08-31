const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { cellphoneValidator } = require("@/validators/userValidators");

const cellphoneValidatorMiddleware = async (req, res, next) => {
  try {
    const cellphone = userPropsUtilities.extractCellphone(req.body);
    await cellphoneValidator(cellphone);

    next();

    return { ok: true };
  } catch (error) {
    logger.log("cellphoneValidatorMiddleware catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
    return { ok: false };
  }
};

module.exports = { cellphoneValidatorMiddleware };
