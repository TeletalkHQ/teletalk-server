const {
  checkInputFields,
} = require("@/functions/utilities/inputOutputFieldsChecker");
const {
  errorThrower,
  getErrorObject,
  crashServerWithCondition,
} = require("@/functions/utilities/utils");

const {
  appErrors: { REQUEST_BODY_IS_UNDEFINED },
} = require("@/variables/errors/appErrors");

const checkBodyFieldsMiddleware = (req, res, next) => {
  try {
    const { body, routeObject } = req;

    crashServerWithCondition(
      typeof body === "undefined",
      REQUEST_BODY_IS_UNDEFINED
    );

    const checkResult = checkInputFields(body, routeObject.inputFields);

    errorThrower(checkResult.done === false, () =>
      getErrorObject(checkResult.errorObject, {
        inputFields: body,
        fields: routeObject.inputFields,
      })
    );

    next();
  } catch (error) {
    logger.log("checkBodyFieldsMiddleware catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { checkBodyFieldsMiddleware };
