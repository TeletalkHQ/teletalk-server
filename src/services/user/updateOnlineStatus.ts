import { serviceBuilder } from "@/classes/service/ServiceBuilder";
import { serviceHelper } from "@/classes/service/ServiceHelper";

import { errors } from "@/variables/errors";

const updateOnlineStatus = serviceBuilder
  .create()
  .body(async ({ currentUserId, online }) => {
    const currentUser = await findCurrentUser(currentUserId);

    await currentUser.updateOne({
      status: { ...currentUser.status, online },
    });

    return await findCurrentUser(currentUserId);
  })
  .build();

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

export { updateOnlineStatus };
