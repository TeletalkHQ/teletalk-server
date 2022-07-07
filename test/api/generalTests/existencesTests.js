const {
  userErrors: {
    BLACKLIST_ITEM_EXIST,
    BLACKLIST_ITEM_NOT_EXIST,
    CONTACT_ITEM_EXIST,
    CONTACT_ITEM_NOT_EXIST,
    TARGET_USER_NOT_EXIST,
  },
} = require("@/variables/errors/userErrors");

const blacklistItemNotExistFailureTests = (configuredCustomRequest, data) => {
  it("should get error, BLACKLIST_ITEM_NOT_EXIST", async () => {
    await configuredCustomRequest.sendRequest(data, BLACKLIST_ITEM_NOT_EXIST);
  });
};
const blacklistItemExistFailureTests = (configuredCustomRequest, data) => {
  it("should get error, BLACKLIST_ITEM_EXIST", async () => {
    await configuredCustomRequest.sendRequest(data, BLACKLIST_ITEM_EXIST);
  });
};

const contactItemNotExistFailureTests = (configuredCustomRequest, data) => {
  it("should get error, CONTACT_ITEM_NOT_EXIST", async () => {
    await configuredCustomRequest.sendRequest(data, CONTACT_ITEM_NOT_EXIST);
  });
};
const contactItemExistFailureTests = (configuredCustomRequest, data) => {
  it("should get error, CONTACT_ITEM_EXIST", async () => {
    await configuredCustomRequest.sendRequest(data, CONTACT_ITEM_EXIST);
  });
};

const targetUserNotExistFailureTests = (configuredCustomRequest, data) => {
  it("should get error, TARGET_USER_NOT_EXIST", async () => {
    await configuredCustomRequest.sendRequest(data, TARGET_USER_NOT_EXIST);
  });
};

module.exports = {
  blacklistItemExistFailureTests,
  blacklistItemNotExistFailureTests,
  contactItemExistFailureTests,
  contactItemNotExistFailureTests,
  targetUserNotExistFailureTests,
};
