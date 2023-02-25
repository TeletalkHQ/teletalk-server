import { serviceBuilder } from "@/classes/service/ServiceBuilder";
import { serviceHelper } from "@/classes/service/ServiceHelper";

import { errors } from "@/variables/errors";

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

export { getUserContacts };
