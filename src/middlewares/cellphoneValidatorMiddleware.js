const {
  errorThrower,
  getErrorObject,
} = require("~/functions/utilities/utilsNoDeps");

const {
  cellphoneValidator,
} = require("~/validators/userValidators/cellphoneValidator");
const { userErrors } = require("~/variables/errors/userErrors");

const cellphoneValidatorMiddleware = async (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    const cellphoneValidate = await cellphoneValidator({
      ...cellphone,
    });

    const { statusCode, ...error } = getErrorObject(
      userErrors.properties.CELLPHONE_INVALID_TYPE
    );
    errorThrower(cellphoneValidate !== true, {
      cellphoneValidation: {
        validatedCellphoneErrors: cellphoneValidate,
        ...error,
      },
      statusCode,
    });

    next();
  } catch (error) {
    logger.log("cellphoneValidatorMiddleware catch", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { cellphoneValidatorMiddleware };
