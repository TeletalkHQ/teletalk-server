const { errors } = require("@/variables/errors");

const inputMissingFailTest = (configuredRequester, data = {}) => {
  it(`should get error: ${errors.INPUT_FIELDS_MISSING.reason}`, async () => {
    const copyData = { ...data };
    const firstKey = Object.keys(copyData).at(0);
    delete copyData[firstKey];
    await configuredRequester.sendFullFeaturedRequest(
      copyData,
      errors.INPUT_FIELDS_MISSING,
      {
        shouldFilterRequestData: false,
      }
    );
  });
};

module.exports = { inputMissingFailTest };
