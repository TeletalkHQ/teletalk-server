import { FailTestExecutor } from "$/types";

import { utilities } from "$/utilities";

import { errors } from "@/variables/errors";

const blacklistItemNotExistFailTest: FailTestExecutor = (
  configuredRequester,
  data
) => {
  it(
    utilities.createFailTestMessage(
      errors.BLACKLIST_ITEM_NOT_EXIST,
      configuredRequester.getRoute()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.BLACKLIST_ITEM_NOT_EXIST
      );
    }
  );
};

const blacklistItemExistFailTest: FailTestExecutor = (
  configuredRequester,
  data
) => {
  it(
    utilities.createFailTestMessage(
      errors.BLACKLIST_ITEM_EXIST,
      configuredRequester.getRoute()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.BLACKLIST_ITEM_EXIST
      );
    }
  );
};

const contactItemNotExistFailTest: FailTestExecutor = (
  configuredRequester,
  data
) => {
  it(
    utilities.createFailTestMessage(
      errors.CONTACT_ITEM_NOT_EXIST,
      configuredRequester.getRoute()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.CONTACT_ITEM_NOT_EXIST
      );
    }
  );
};
const contactItemExistFailTest: FailTestExecutor = (
  configuredRequester,
  data
) => {
  it(
    utilities.createFailTestMessage(
      errors.CONTACT_ITEM_EXIST,
      configuredRequester.getRoute()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.CONTACT_ITEM_EXIST
      );
    }
  );
};

const targetUserNotExistFailTest: FailTestExecutor = (
  configuredRequester,
  data
) => {
  it(
    utilities.createFailTestMessage(
      errors.TARGET_USER_NOT_EXIST,
      configuredRequester.getRoute()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.TARGET_USER_NOT_EXIST
      );
    }
  );
};

export {
  blacklistItemExistFailTest,
  blacklistItemNotExistFailTest,
  contactItemExistFailTest,
  contactItemNotExistFailTest,
  targetUserNotExistFailTest,
};
