const { errors } = require("@/variables/errors");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const inputOverloadFailTest = (configuredRequester, data = {}) => {
  it(`should get error: ${errors.INPUT_FIELDS_OVERLOAD.reason}`, async () => {
    const copyData = { ...data };
    const randomKey = randomMaker.randomString(8);
    const randomValue = randomMaker.randomString(8);
    copyData[randomKey] = randomValue;
    await configuredRequester.sendFullFeaturedRequest(
      copyData,
      errors.INPUT_FIELDS_OVERLOAD,
      {
        shouldFilterRequestData: false,
      }
    );
  });
};

module.exports = { inputOverloadFailTest };
