const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const logout = serviceBuilder
  .create()
  .body(async ({ currentUserId, currentToken }) => {
    const currentUser = await serviceHelper.findOneUserById(
      currentUserId,
      errors.CURRENT_USER_NOT_EXIST
    );
    //FIXME: Remove specific session
    currentUser.sessions = currentUser.sessions.filter(
      (i) => i.token !== currentToken
    );
    await currentUser.save();
  })
  .build();

module.exports = { logout };
