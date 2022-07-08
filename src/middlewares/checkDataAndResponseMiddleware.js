const { customTypeof } = require("@/classes/CustomTypeof");

const { ioFieldsChecker } = require("@/functions/utilities/ioFieldsChecker");
const {
  errorThrower,
  getErrorObject,
  crashServerWithCondition,
} = require("@/functions/utilities/utils");

const {
  appErrors: {
    SEND_JSON_RESPONSE_IS_NOT_FUNCTION,
    OUTPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_OVERLOAD,
  },
} = require("@/variables/errors/appErrors");

const checkAndResponseMiddleware = (req, res, next) => {
  try {
    crashServerWithCondition(
      !customTypeof.check(res.sendJsonResponse).type.function,
      SEND_JSON_RESPONSE_IS_NOT_FUNCTION
    );

    res.checkDataAndResponse = (data, outputIndex) => {
      try {
        const {
          routeObject: { outputFields },
        } = req;

        const checkResult = ioFieldsChecker(data, outputFields, {
          fieldsIndex: outputIndex,
          missingFieldsError: OUTPUT_FIELDS_MISSING,
          overloadFieldsError: OUTPUT_FIELDS_OVERLOAD,
        });

        // logger.log(
        //   "checkResult",
        //   JSON.stringify({
        //     checkResult,
        //     outputFields: data,
        //     fields: outputFields,
        //   })
        // );

        errorThrower(checkResult.done === false, () =>
          getErrorObject(checkResult.errorObject, {
            outputFields: data,
            fields: outputFields,
          })
        );

        logger.log("response body: ", data);
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
