const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { ioFieldsChecker } = require("@/functions/utilities/ioFieldsChecker");
const { crashServerWithCondition } = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors/errors");

const tryToCheckDataAndResponse = ({
  data,
  outputFields,
  requiredFieldsIndex,
}) => {
  const checkResult = ioFieldsChecker(data, outputFields, {
    requiredFieldsIndex,
    missingFieldsError: errors.OUTPUT_FIELDS_MISSING,
    overloadFieldsError: errors.OUTPUT_FIELDS_OVERLOAD,
  });

  return { ok: true, data, checkResult };
};

const executeIfNoError = ({ data }, res) => {
  res.sendJsonResponse(data);
};

const catchCheckDataAndResponse = (error, { data, outputFields, res }) => {
  const sendingError = {
    ...error.errorObject,
    outputFields: data,
    fields: outputFields,
  };

  commonFunctionalities.controllerCatchResponse(sendingError, res);
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
      .catch(catchCheckDataAndResponse, {
        data,
        outputFields,
        res,
      })
      .result();
  };

  next();
};

module.exports = { checkDataAndResponse };
