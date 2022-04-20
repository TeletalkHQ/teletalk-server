const { errorThrower } = require("~/functions/utilities/utilsNoDeps");

const {
  cellphoneValidator,
} = require("~/validators/userValidators/cellphoneValidator");

const cellphoneValidatorMiddleware = async (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    const cellphoneValidate = await cellphoneValidator({
      ...cellphone,
    });

    errorThrower(cellphoneValidate !== true, cellphoneValidate);

    next();
  } catch (error) {
    logger.log("cellphoneValidatorMiddleware catch", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { cellphoneValidatorMiddleware };
