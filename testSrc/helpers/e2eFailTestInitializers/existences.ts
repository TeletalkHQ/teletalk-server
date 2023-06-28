import { errors } from "~/variables";

import { helpers } from "@/helpers";
import { E2eFailTestInitializer } from "@/types";

export const blacklistItemNotExistE2eFailTestInitializer: E2eFailTestInitializer<
  any
> = (configuredRequester, data) => {
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

export const blacklistItemExistE2eFailTestInitializer: E2eFailTestInitializer =
  (configuredRequester, data) => {
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

export const contactItemNotExistE2eFailTestInitializer: E2eFailTestInitializer =
  (configuredRequester, data) => {
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

export const contactItemExistE2eFailTestInitializer: E2eFailTestInitializer = (
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

export const targetUserNotExistE2eFailTestInitializer: E2eFailTestInitializer =
  (configuredRequester, data) => {
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
