const { trier } = require("utility-store/src/classes/Trier");
const {
  ioFieldsChecker,
} = require("utility-store/src/utilities/ioFieldsChecker");

const { commonUtilities } = require("@/classes/CommonUtilities");

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
  commonUtilities.controllerErrorResponse(error, res);
  return { ok: false };
};

const checkDataAndResponse = (req, res, next) => {
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
