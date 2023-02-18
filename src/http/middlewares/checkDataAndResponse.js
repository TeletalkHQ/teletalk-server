const { trier } = require("simple-trier");
const {
  ioFieldsChecker,
} = require("utility-store/src/utilities/ioFieldsChecker");
const { errorThrower } = require("utility-store/src/utilities/utilities");

const { commonUtilities } = require("@/classes/CommonUtilities");

const { errors } = require("@/variables/errors");

const tryToCheckDataAndResponse = ({
  data,
  outputFields,
  requiredFieldsIndex = 0,
}) => {
  const selectedOutputFields = outputFields[requiredFieldsIndex];

  const checkResult = ioFieldsChecker(data, selectedOutputFields, {
    ...errors.io.output,
    requiredFieldsIndex,
  });

  if (checkResult.ok === false) {
    errorThrower(!checkResult.error || !checkResult.error.reason, {
      ...errors.UNKNOWN_ERROR,
      checkResult,
    });

    throw checkResult.error;
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
      custom: {
        route: { outputFields },
      },
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
