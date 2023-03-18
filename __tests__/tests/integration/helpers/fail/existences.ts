import { failTestBuilder } from "$/classes/FailTestBuilder";

import { errors } from "@/variables/errors";

const blacklistItemNotExistFailTest = (configuredRequester, data) => {
  it(
    failTestBuilder
      .create()
      .createTestMessage(
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

const blacklistItemExistFailTest = (configuredRequester, data) => {
  it(
    failTestBuilder
      .create()
      .createTestMessage(
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

const contactItemNotExistFailTest = (configuredRequester, data) => {
  it(
    failTestBuilder
      .create()
      .createTestMessage(
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
const contactItemExistFailTest = (configuredRequester, data) => {
  it(
    failTestBuilder
      .create()
      .createTestMessage(
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

const targetUserNotExistFailTest = (configuredRequester, data) => {
  it(
    failTestBuilder
      .create()
      .createTestMessage(
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
