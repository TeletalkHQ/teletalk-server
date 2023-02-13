const { customTypeof } = require("custom-typeof");
const { errorThrower } = require("utility-store/src/utilities/utilities");
const {
  ioFieldsChecker,
} = require("utility-store/src/utilities/ioFieldsChecker");
const { trier } = require("utility-store/src/classes/Trier");

const { errors } = require("@/variables/errors");

const { arrayOfRoutes } = require("@/websocket/events");

const checkDataFields = (_socket, next, [name, data]) => {
  const foundRoute = arrayOfRoutes.find((item) => item.name === name);

  return trier(checkDataFields.name)
    .try(tryBlock, data || {}, foundRoute.inputFields)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchBlock)
    .run();
};

const tryBlock = (data, inputFields) => {
  errorThrower(
    customTypeof.isUndefined(data),
    errors.REQUEST_BODY_IS_UNDEFINED
  );

  const checkResult = ioFieldsChecker(data, inputFields, errors.io.input);

  errorThrower(checkResult.ok === false, () => ({
    ...checkResult.error,
    inputFields,
  }));
};

const executeIfNoError = (_, next) => {
  next();
};

const catchBlock = (error) => {
  throw error;
};

module.exports = { checkDataFields };
