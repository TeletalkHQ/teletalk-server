const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");
const {
  ioFieldsChecker,
} = require("utility-store/src/functions/ioFieldsChecker");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { crashServerWithCondition } = require("@/utilities/utilities");

const { errors } = require("@/variables/errors");

const tryToCheckDataAndResponse = ({
  data,
  outputFields,
  requiredFieldsIndex = 0,
}) => {
  const selectedOutputFields = outputFields[requiredFieldsIndex];
  const checkResult = ioFieldsChecker(data, selectedOutputFields, {
    ...errors.IO.output,
    requiredFieldsIndex,
  });

  //TODO: If there is no valid error object, throw UNKNOWN_ERROR
  if (checkResult.ok === false) {
    if (!checkResult.errorObject || !checkResult.errorObject.reason) {
      throw {
        ...errors.UNKNOWN_ERROR,
        checkResult,
      };
    }

    throw checkResult.errorObject;
  }

  return { data };
};

const executeIfNoError = ({ data }, res) => {
  res.sendJsonResponse(data);
};

const catchCheckDataAndResponse = (error, res) => {
  commonFunctionalities.controllerErrorResponse(error, res);
  return { ok: false };
};

const checkDataAndResponse = (req, res, next) => {
  crashServerWithCondition(
    customTypeof.isNotFunction(res.sendJsonResponse),
    errors.SEND_JSON_RESPONSE_IS_NOT_FUNCTION
  );

  res.checkDataAndResponse = (data, requiredFieldsIndex) => {
    const {
      routeObject: { outputFields },
    } = req;

    return trier(checkDataAndResponse.name)
      .try(tryToCheckDataAndResponse, {
        data,
        requiredFieldsIndex,
        outputFields,
      })
      .executeIfNoError(executeIfNoError, res)
      .catch(catchCheckDataAndResponse, res)
      .run();
  };

  next();
};

module.exports = { checkDataAndResponse };
