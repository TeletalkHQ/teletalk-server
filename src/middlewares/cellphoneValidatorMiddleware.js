const {
  cellphoneValidator,
} = require("~/validators/userValidators/cellphoneValidator");

const cellphoneValidatorMiddleware = async (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.body;

    const cellphone = { phoneNumber, countryCode, countryName };
    await cellphoneValidator(cellphone);

    next();
  } catch (error) {
    logger.log("cellphoneValidatorMiddleware catch", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { cellphoneValidatorMiddleware };
