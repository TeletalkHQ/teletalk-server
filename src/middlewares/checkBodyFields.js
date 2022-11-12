const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { errorThrower } = require("@/functions/utilities/utilities");
const { ioFieldsChecker } = require("@/functions/utilities/ioFieldsChecker");

const { errors } = require("@/variables/errors");
const { appConfigs } = require("@/classes/AppConfigs");

const tryToCheckBodyFields = (body, inputFields) => {
  errorThrower(
    customTypeof.isUndefined(body),
    errors.REQUEST_BODY_IS_UNDEFINED
  );

  const checkResult = ioFieldsChecker(body, inputFields, {
    missingFieldsError: errors.INPUT_FIELDS_MISSING,
    overloadFieldsError: errors.INPUT_FIELDS_OVERLOAD,
    ioDataFieldTypeWrongError: errors.INPUT_FIELD_TYPE_WRONG,
  });

  const configs = appConfigs.getConfigs();
  const checkResultErrorReason = checkResult.errorObject?.reason;
  const wrongTypeErrorReason = errors.INPUT_FIELD_TYPE_WRONG.reason;
  if (
    configs.server.shouldIgnoreInputFieldWrongTypeError &&
    checkResultErrorReason === wrongTypeErrorReason
  ) {
    return { ok: true };
  }

  errorThrower(checkResult.ok === false, () => ({
    ...checkResult.errorObject,
    inputFields,
    inputData: body,
  }));

  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchCheckBodyFields = (error, res) => {
  commonFunctionalities.controllerCatchResponse(error, res);
  return { ok: false };
};

const checkBodyFields = (req, res, next) => {
  const {
    body,
    routeObject: { inputFields },
  } = req;

  return trier(checkBodyFields.name)
    .try(tryToCheckBodyFields, body, inputFields)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchCheckBodyFields, res)
    .result();
};

module.exports = { checkBodyFields };
