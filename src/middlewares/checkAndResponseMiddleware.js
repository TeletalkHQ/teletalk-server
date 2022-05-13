const {
  checkOutputFields,
} = require("@/functions/utilities/inputOutputFieldsChecker");
const {
  errorThrower,
  getErrorObject,
  crashServerWithCondition,
} = require("@/functions/utilities/utils");

const {
  appErrors: { SEND_JSON_RESPONSE_IS_NOT_FUNCTION },
} = require("@/variables/errors/appErrors");

const checkAndResponseMiddleware = (req, res, next) => {
  crashServerWithCondition(
    typeof res.sendJsonResponse !== "function",
    SEND_JSON_RESPONSE_IS_NOT_FUNCTION
  );

  const {
    routeObject: { outputFields },
  } = req;

  res.checkAndResponse = (data, outputIndex) => {
    try {
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
};

module.exports = { checkAndResponseMiddleware };
