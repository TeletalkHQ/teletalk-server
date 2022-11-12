const { errors } = require("@/variables/errors");

const blacklistItemNotExist = (configuredCustomRequest, data) => {
  it("should get error, BLACKLIST_ITEM_NOT_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.BLACKLIST_ITEM_NOT_EXIST
    );
  });
};

const blacklistItemExist = (configuredCustomRequest, data) => {
  it("should get error, BLACKLIST_ITEM_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.BLACKLIST_ITEM_EXIST
    );
  });
};

const contactItemNotExist = (configuredCustomRequest, data) => {
  it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.CONTACT_ITEM_NOT_EXIST
    );
  });
};
const contactItemExist = (configuredCustomRequest, data) => {
  it("should get error, CONTACT_ITEM_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.CONTACT_ITEM_EXIST
    );
  });
};

const targetUserNotExist = (configuredCustomRequest, data) => {
  it("should get error, TARGET_USER_NOT_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.TARGET_USER_NOT_EXIST
    );
  });
};

module.exports = {
  blacklistItemExist,
  blacklistItemNotExist,
  contactItemExist,
  contactItemNotExist,
  targetUserNotExist,
};
