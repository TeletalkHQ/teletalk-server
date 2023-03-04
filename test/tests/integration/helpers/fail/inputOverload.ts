import { failTestBuilder } from "$/classes/FailTestBuilder";
import { errors } from "@/variables/errors";
import { randomMaker } from "utility-store";

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

export { inputOverloadFailTest };
