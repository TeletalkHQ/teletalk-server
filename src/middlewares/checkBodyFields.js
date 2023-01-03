const { customTypeof } = require("custom-typeof");
const { errorThrower } = require("utility-store/src/utilities/utilities");
const {
  ioFieldsChecker,
} = require("utility-store/src/utilities/ioFieldsChecker");
const { trier } = require("utility-store/src/classes/Trier");

const { appConfigs } = require("@/classes/AppConfigs");
const { commonUtilities } = require("@/classes/CommonUtilities");

const { errors } = require("@/variables/errors");

const checkBodyFields = (req, res, next) => {
  const {
    body,
    routeObject: { inputFields },
  } = req;

  return trier(checkBodyFields.name)
    .try(tryToCheckBodyFields, body, inputFields)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchCheckBodyFields, res)
    .run();
};

const tryToCheckBodyFields = (body, inputFields) => {
  errorThrower(
    customTypeof.isUndefined(body),
    errors.REQUEST_BODY_IS_UNDEFINED
  );

  const checkResult = ioFieldsChecker(body, inputFields, errors.io.input);

  const configs = appConfigs.getConfigs();
  const checkResultErrorReason = checkResult.errorObject?.reason;
  const inputDataWrongTypeErrorReason = errors.INPUT_FIELD_TYPE_WRONG.reason;

  if (
    configs.server.shouldIgnoreInputFieldTypeWrongError &&
    inputDataWrongTypeErrorReason === checkResultErrorReason
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
  commonUtilities.controllerErrorResponse(error, res);
  return { ok: false };
};

module.exports = { checkBodyFields };
