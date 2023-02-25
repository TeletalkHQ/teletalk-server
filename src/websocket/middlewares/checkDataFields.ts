import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store/src/utilities/utilities";
import { ioFieldsChecker } from "utility-store/src/utilities/ioFieldsChecker";
import { trier } from "simple-trier";

import { errors } from "@/variables/errors";

import { arrayOfRoutes } from "@/websocket/events";

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

export { checkDataFields };
