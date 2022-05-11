const {
  checkOutputFields,
} = require("@/functions/utilities/inputOutputFieldsChecker");
const {
  errorThrower,
  getErrorObject,
  crashServer,
} = require("@/functions/utilities/utils");

const {
  appErrors: { SEND_JSON_RESPONSE_IS_NOT_FUNCTION },
} = require("@/variables/errors/appErrors");

const checkAndResponseMiddleware = (_, res, next) => {
  crashServer(
    typeof res.sendJsonResponse !== "function",
    SEND_JSON_RESPONSE_IS_NOT_FUNCTION
  );

  res.checkAndResponse = (routeObject, data, outputIndex) => {
    try {
      const checkResult = checkOutputFields(
        data,
        routeObject.outputFields,
        outputIndex
      );

      errorThrower(checkResult.done === false, () =>
        getErrorObject(checkResult.errorObject, {
          outputFields: data,
          fields: routeObject.outputFields,
        })
      );

      res.sendJsonResponse(routeObject, data);
    } catch (error) {
      logger.log("checkAndResponse catch, error:", error);
      res.errorCollector(error);
      res.errorResponser();
    }
  };

  next();
};

module.exports = { checkAndResponseMiddleware };
