import { errors } from "~/variables";

import { helpers } from "@/helpers";
import { E2eFailTestInitializer } from "@/types";

const blacklistItemNotExistE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      errors.blacklistItemNotExist,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.blacklistItemNotExist
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
      errors.blacklistItemExist,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.blacklistItemExist
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
      errors.contactItemNotExist,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.contactItemNotExist
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
      errors.contactItemExist,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.contactItemExist
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
      errors.targetUserNotExist,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.targetUserNotExist
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
