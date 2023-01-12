const { failTestBuilder } = require("$/classes/FailTestBuilder");
const { errors } = require("@/variables/errors");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const inputOverloadFailTest = (configuredRequester, data = {}) => {
  it(
    failTestBuilder
      .create()
      .createTestMessage(
        errors.INPUT_FIELDS_OVERLOAD,
        configuredRequester.getRoute()
      ),
    async () => {
      const copyData = { ...data };
      const randomKey = randomMaker.string(8);
      const randomValue = randomMaker.string(8);
      copyData[randomKey] = randomValue;
      await configuredRequester.sendFullFeaturedRequest(
        copyData,
        errors.INPUT_FIELDS_OVERLOAD,
        {
          shouldFilterRequestData: false,
        }
      );
    }
  );
};

module.exports = { inputOverloadFailTest };
