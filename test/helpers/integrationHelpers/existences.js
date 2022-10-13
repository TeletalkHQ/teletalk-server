const { errors } = require("@/variables/errors/errors");

const blacklistItemNotExistFailureTests = (configuredCustomRequest, data) => {
  it("should get error, BLACKLIST_ITEM_NOT_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.BLACKLIST_ITEM_NOT_EXIST
    );
  });
};
const blacklistItemExistFailureTests = (configuredCustomRequest, data) => {
  it("should get error, BLACKLIST_ITEM_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.BLACKLIST_ITEM_EXIST
    );
  });
};

const contactItemNotExistFailureTests = (configuredCustomRequest, data) => {
  it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.CONTACT_ITEM_NOT_EXIST
    );
  });
};
const contactItemExistFailureTests = (configuredCustomRequest, data) => {
  it("should get error, CONTACT_ITEM_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.CONTACT_ITEM_EXIST
    );
  });
};

const targetUserNotExistFailureTests = (configuredCustomRequest, data) => {
  it("should get error, TARGET_USER_NOT_EXIST", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      data,
      errors.TARGET_USER_NOT_EXIST
    );
  });
};

module.exports = {
  blacklistItemExistFailureTests,
  blacklistItemNotExistFailureTests,
  contactItemExistFailureTests,
  contactItemNotExistFailureTests,
  targetUserNotExistFailureTests,
};
