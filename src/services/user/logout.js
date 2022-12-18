const { serviceBuilder } = require("@/classes/service/ServiceBuilder");
const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { errors } = require("@/variables/errors");

const logout = serviceBuilder
  .create()
  .body(async ({ currentUserId }) => {
    const currentUser = await serviceHelper.findOneUserById(
      currentUserId,
      errors.CURRENT_USER_NOT_EXIST
    );
    //FIXME: Remove current session, not all of them
    currentUser.sessions = [];
    await currentUser.save();
    return { ok: true };
  })
  .build();

module.exports = { logout };
