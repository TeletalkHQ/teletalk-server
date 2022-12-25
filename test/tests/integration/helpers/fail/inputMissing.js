const { errors } = require("@/variables/errors");

const inputMissingFailTest = (configuredCustomRequest, data = {}) => {
  it(`should get error: ${errors.INPUT_FIELDS_MISSING.reason}`, async () => {
    const copyData = { ...data };
    const firstKey = Object.keys(copyData).at(0);
    delete copyData[firstKey];
    await configuredCustomRequest.sendFullFeaturedRequest(
      copyData,
      errors.INPUT_FIELDS_MISSING,
      {
        filterDataCondition: false,
      }
    );
  });
};

module.exports = { inputMissingFailTest };
