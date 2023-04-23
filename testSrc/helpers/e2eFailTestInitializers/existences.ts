import { helpers } from "$/helpers";

import { E2eFailTestInitializer } from "$/types";

import { ERRORS } from "@/variables";

const blacklistItemNotExistE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      ERRORS.BLACKLIST_ITEM_NOT_EXIST,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        ERRORS.BLACKLIST_ITEM_NOT_EXIST
      );
    }
  );
};

const blacklistItemExistE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      ERRORS.BLACKLIST_ITEM_EXIST,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        ERRORS.BLACKLIST_ITEM_EXIST
      );
    }
  );
};

const contactItemNotExistE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      ERRORS.CONTACT_ITEM_NOT_EXIST,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        ERRORS.CONTACT_ITEM_NOT_EXIST
      );
    }
  );
};
const contactItemExistE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      ERRORS.CONTACT_ITEM_EXIST,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        ERRORS.CONTACT_ITEM_EXIST
      );
    }
  );
};

const targetUserNotExistE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      ERRORS.TARGET_USER_NOT_EXIST,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        ERRORS.TARGET_USER_NOT_EXIST
      );
    }
  );
};

export {
  blacklistItemExistE2eFailTestInitializer,
  blacklistItemNotExistE2eFailTestInitializer,
  contactItemExistE2eFailTestInitializer,
  contactItemNotExistE2eFailTestInitializer,
  targetUserNotExistE2eFailTestInitializer,
};
