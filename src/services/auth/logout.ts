import { serviceBuilder } from "@/classes/service/ServiceBuilder";
import { serviceHelper } from "@/classes/service/ServiceHelper";

import { errors } from "@/variables/errors";

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

export { logout };
