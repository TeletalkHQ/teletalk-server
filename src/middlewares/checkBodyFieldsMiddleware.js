const {
  checkInputFields,
} = require("@/functions/utilities/inputOutputFieldsChecker");
const {
  errorThrower,
  getErrorObject,
  crashServerWithCondition,
  customTypeof,
} = require("@/functions/utilities/utils");

const {
  appErrors: { REQUEST_BODY_IS_UNDEFINED },
} = require("@/variables/errors/appErrors");

const checkBodyFieldsMiddleware = (req, res, next) => {
  try {
    const { body, routeObject } = req;

    crashServerWithCondition(
      customTypeof(body).type.undefined,
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
    logger.log("fields", error.INPUT_OUTPUT_FIELDS?.fields);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { checkBodyFieldsMiddleware };
