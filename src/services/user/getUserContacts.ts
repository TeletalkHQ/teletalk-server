const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const getUserContacts = serviceBuilder
  .create()
  .body(async ({ currentUserId }) => {
    const currentUser = await serviceHelper.findOneUserById(
      currentUserId,
      errors.CURRENT_USER_NOT_EXIST
    );

    return currentUser.contacts;
  })
  .build();

module.exports = { getUserContacts };
