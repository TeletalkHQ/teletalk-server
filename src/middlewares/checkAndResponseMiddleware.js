const {
  checkOutputFields,
} = require("@/functions/utilities/inputOutputFieldsChecker");
const {
  errorThrower,
  getErrorObject,
  crashServerWithCondition,
  customTypeof,
} = require("@/functions/utilities/utils");

const {
  appErrors: { SEND_JSON_RESPONSE_IS_NOT_FUNCTION },
} = require("@/variables/errors/appErrors");

const checkAndResponseMiddleware = (req, res, next) => {
  try {
    crashServerWithCondition(
      !customTypeof(res.sendJsonResponse).type.function,
      SEND_JSON_RESPONSE_IS_NOT_FUNCTION
    );

    res.checkAndResponse = (data, outputIndex) => {
      try {
        const {
          routeObject: { outputFields },
        } = req;

        const checkResult = checkOutputFields(data, outputFields, outputIndex);

        errorThrower(checkResult.done === false, () =>
          getErrorObject(checkResult.errorObject, {
            outputFields: data,
            fields: outputFields,
          })
        );

        logger.log("response body: ", data);
        res.sendJsonResponse(data);
      } catch (error) {
        logger.log("checkAndResponse catch, error:", error);
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
