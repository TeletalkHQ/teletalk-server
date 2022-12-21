const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { errors } = require("@/variables/errors");

const inputMissing = (configuredCustomRequest, data = {}) => {
  failTestBuilder
    .create(configuredCustomRequest, data)
    .inputMissing(errors.INPUT_FIELDS_MISSING, { filterDataCondition: false });
};

module.exports = { inputMissing };
