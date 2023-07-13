import { errorStore } from "~/classes/ErrorStore";

import { helpers } from "@/helpers";
import { E2eFailTestInitializer } from "@/types";

export const blacklistItemNotExistE2eFailTestInitializer: E2eFailTestInitializer<
  any
> = (configuredRequester, data) => {
  it(
    helpers.createFailTestMessage(
      errorStore.find("BLACKLIST_ITEM_NOT_EXIST"),
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errorStore.find("BLACKLIST_ITEM_NOT_EXIST")
      );
    }
  );
};

export const blacklistItemExistE2eFailTestInitializer: E2eFailTestInitializer =
  (configuredRequester, data) => {
    it(
      helpers.createFailTestMessage(
        errorStore.find("BLACKLIST_ITEM_EXIST"),
        configuredRequester.getEventName()
      ),
      async () => {
        await configuredRequester.sendFullFeaturedRequest(
          data,
          errorStore.find("BLACKLIST_ITEM_EXIST")
        );
      }
    );
  };

export const contactItemNotExistE2eFailTestInitializer: E2eFailTestInitializer =
  (configuredRequester, data) => {
    it(
      helpers.createFailTestMessage(
        errorStore.find("CONTACT_ITEM_NOT_EXIST"),
        configuredRequester.getEventName()
      ),
      async () => {
        await configuredRequester.sendFullFeaturedRequest(
          data,
          errorStore.find("CONTACT_ITEM_NOT_EXIST")
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
      errorStore.find("CONTACT_ITEM_EXIST"),
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errorStore.find("CONTACT_ITEM_EXIST")
      );
    }
  );
};

export const targetUserNotExistE2eFailTestInitializer: E2eFailTestInitializer =
  (configuredRequester, data) => {
    it(
      helpers.createFailTestMessage(
        errorStore.find("TARGET_USER_NOT_EXIST"),
        configuredRequester.getEventName()
      ),
      async () => {
        await configuredRequester.sendFullFeaturedRequest(
          data,
          errorStore.find("TARGET_USER_NOT_EXIST")
        );
      }
    );
  };
