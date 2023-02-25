import { failTestBuilder } from "$/classes/FailTestBuilder";
import { errors } from "@/variables/errors";

const selfStuffFailTest = (configuredRequester, data) => {
  it(
    failTestBuilder
      .create()
      .createTestMessage(errors.SELF_STUFF, configuredRequester.getRoute()),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.SELF_STUFF
      );
    }
  );
};

export { selfStuffFailTest };
