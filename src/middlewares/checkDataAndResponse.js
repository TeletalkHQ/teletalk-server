const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");
const {
  ioFieldsChecker,
} = require("utility-store/src/functions/ioFieldsChecker");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { crashServerWithCondition } = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors");

const tryToCheckDataAndResponse = ({
  data,
  outputFields,
  requiredFieldsIndex = 0,
}) => {
  const selectedOutputFields = outputFields[requiredFieldsIndex];
  const checkResult = ioFieldsChecker(data, selectedOutputFields, {
    ioDataFieldTypeWrongError: errors.OUTPUT_FIELD_TYPE_WRONG,
    missingFieldsError: errors.OUTPUT_FIELDS_MISSING,
    overloadFieldsError: errors.OUTPUT_FIELDS_OVERLOAD,
    requiredFieldsIndex,
    requiredFieldsNotDefinedError: errors.REQUIRED_FIELDS_NOT_DEFINED,
    requiredFieldTypeWrongError: errors.REQUIRED_FIELD_TYPE_WRONG,
  });

  //TODO: If there is no valid error object, throw UNKNOWN_ERROR
  if (checkResult.ok === false) {
    if (!checkResult.errorObject || !checkResult.errorObject.reason) {
      const error = {
        ...errors.UNKNOWN_ERROR,
        checkResult,
      };
      throw error;
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
      .result();
  };

  next();
};

module.exports = { checkDataAndResponse };
