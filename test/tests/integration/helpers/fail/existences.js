const { errors } = require("@/variables/errors");

const blacklistItemNotExistFailTest = (configuredCustomRequest, data) => {
  it("should get error: BLACKLIST_ITEM_NOT_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.BLACKLIST_ITEM_NOT_EXIST
    );
  });
};

const blacklistItemExistFailTest = (configuredCustomRequest, data) => {
  it("should get error: BLACKLIST_ITEM_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.BLACKLIST_ITEM_EXIST
    );
  });
};

const contactItemNotExistFailTest = (configuredCustomRequest, data) => {
  it("should get error: CONTACT_ITEM_NOT_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.CONTACT_ITEM_NOT_EXIST
    );
  });
};
const contactItemExistFailTest = (configuredCustomRequest, data) => {
  it("should get error: CONTACT_ITEM_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.CONTACT_ITEM_EXIST
    );
  });
};

const targetUserNotExistFailTest = (configuredCustomRequest, data) => {
  it("should get error: TARGET_USER_NOT_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.TARGET_USER_NOT_EXIST
    );
  });
};

module.exports = {
  blacklistItemExistFailTest,
  blacklistItemNotExistFailTest,
  contactItemExistFailTest,
  contactItemNotExistFailTest,
  targetUserNotExistFailTest,
};
