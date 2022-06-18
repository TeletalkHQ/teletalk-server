const { customTypeof } = require("@/classes/CustomTypeof");

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

        const checkResult = checkOutputFields(data, outputFields, outputIndex);

        // logger.log(
        //   "rm",
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
