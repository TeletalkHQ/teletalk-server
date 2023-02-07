const { customTypeof } = require("custom-typeof");
const { errorThrower } = require("utility-store/src/utilities/utilities");
const {
  ioFieldsChecker,
} = require("utility-store/src/utilities/ioFieldsChecker");
const { trier } = require("utility-store/src/classes/Trier");

const { commonUtilities } = require("@/classes/CommonUtilities");

const { errors } = require("@/variables/errors");

const checkBodyFields = (req, res, next) => {
  const {
    body,
    custom: {
      route: { inputFields },
    },
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

  errorThrower(checkResult.ok === false, () => ({
    ...checkResult.error,
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
