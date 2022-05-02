const { getCellphone } = require("@/functions/utilities/utilsNoDeps");
const { cellphoneValidator } = require("@/validators/userValidators");

const cellphoneValidatorMiddleware = async (req, res, next) => {
  try {
    const cellphone = getCellphone(req.body);
    await cellphoneValidator(cellphone);

    next();
  } catch (error) {
    logger.log("cellphoneValidatorMiddleware catch", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { cellphoneValidatorMiddleware };
