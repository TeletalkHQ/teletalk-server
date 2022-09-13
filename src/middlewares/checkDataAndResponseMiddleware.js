const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

const { ioFieldsChecker } = require("@/functions/utilities/ioFieldsChecker");
const {
  crashServerWithCondition,
  errorThrower,
} = require("@/functions/utilities/utilities");

const {
  appErrors: {
    OUTPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_OVERLOAD,
    SEND_JSON_RESPONSE_IS_NOT_FUNCTION,
  },
} = require("@/variables/errors/appErrors");

const checkAndResponseMiddleware = (req, res, next) => {
  try {
    crashServerWithCondition(
      customTypeof.isNotFunction(res.sendJsonResponse),
      SEND_JSON_RESPONSE_IS_NOT_FUNCTION
    );

    res.checkDataAndResponse = (data, requiredFieldsIndex) => {
      try {
        const {
          routeObject: { outputFields },
        } = req;

        const checkResult = ioFieldsChecker(data, outputFields, {
          requiredFieldsIndex,
          missingFieldsError: OUTPUT_FIELDS_MISSING,
          overloadFieldsError: OUTPUT_FIELDS_OVERLOAD,
        });

        errorThrower(checkResult.ok === false, () => ({
          ...checkResult.errorObject,
          outputFields: data,
          fields: outputFields,
        }));

        res.sendJsonResponse(data);
      } catch (error) {
        logger.log("checkDataAndResponse catch, error:", error);
        res.errorCollector(error);
        res.errorResponser();
      }
    };

    next();
  } catch (error) {
    logger.log("checkAndResponseMiddleware catch, error:", error);

    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { checkAndResponseMiddleware };
