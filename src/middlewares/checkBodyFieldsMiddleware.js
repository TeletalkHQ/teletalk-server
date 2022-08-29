const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

const { ioFieldsChecker } = require("@/functions/utilities/ioFieldsChecker");
const {
  errorThrower,
  crashServerWithCondition,
} = require("@/functions/utilities/utils");

const {
  appErrors: {
    REQUEST_BODY_IS_UNDEFINED,
    INPUT_FIELDS_OVERLOAD,
    INPUT_FIELDS_MISSING,
  },
} = require("@/variables/errors/appErrors");

const checkBodyFieldsMiddleware = (req, res, next) => {
  try {
    const {
      body,
      routeObject: { inputFields },
    } = req;

    crashServerWithCondition(
      customTypeof.check(body).type.isUndefined,
      REQUEST_BODY_IS_UNDEFINED
    );

    const checkResult = ioFieldsChecker(body, inputFields, {
      missingFieldsError: INPUT_FIELDS_MISSING,
      overloadFieldsError: INPUT_FIELDS_OVERLOAD,
    });

    errorThrower(checkResult.done === false, () => ({
      ...checkResult.errorObject,
      inputFields: body,
      fields: inputFields,
    }));

    next();
  } catch (error) {
    logger.log("checkBodyFieldsMiddleware catch, error:", error);
    logger.log("fields", error.INPUT_OUTPUT_FIELDS?.fields);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { checkBodyFieldsMiddleware };
