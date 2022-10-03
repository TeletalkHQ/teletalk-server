const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { errorThrower } = require("@/functions/utilities/utilities");
const { ioFieldsChecker } = require("@/functions/utilities/ioFieldsChecker");

const {
  appErrors: {
    INPUT_FIELDS_MISSING,
    INPUT_FIELDS_OVERLOAD,
    REQUEST_BODY_IS_UNDEFINED,
  },
} = require("@/variables/errors/appErrors");

const tryToCheckBodyFields = (body, inputFields) => {
  errorThrower(customTypeof.isUndefined(body), REQUEST_BODY_IS_UNDEFINED);

  const checkResult = ioFieldsChecker(body, inputFields, {
    missingFieldsError: INPUT_FIELDS_MISSING,
    overloadFieldsError: INPUT_FIELDS_OVERLOAD,
  });

  errorThrower(checkResult.ok === false, () => ({
    ...checkResult.errorObject,
    fields: inputFields,
    inputFields: body,
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
