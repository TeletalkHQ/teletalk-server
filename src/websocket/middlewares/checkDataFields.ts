const { customTypeof } = require("custom-typeof");
const { errorThrower } = require("utility-store/src/utilities/utilities");
const {
  ioFieldsChecker,
} = require("utility-store/src/utilities/ioFieldsChecker");
const { trier } = require("simple-trier");

const { errors } = require("@/variables/errors");

const { arrayOfRoutes } = require("@/websocket/events");

const checkDataFields = (_socket, next, event) =>
  trier(checkDataFields.name)
    .try(tryBlock, event)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchBlock)
    .run();

const tryBlock = ([name, data, callback]) => {
  if (callback && customTypeof.isNotFunction(callback))
    throw errors.IS_NOT_A_CALLBACK;

  const { inputFields } = arrayOfRoutes.find((item) => item.name === name);
  const checkResult = ioFieldsChecker(data || {}, inputFields, errors.io.input);
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
