import { serviceBuilder } from "@/classes/service/ServiceBuilder";
import { serviceHelper } from "@/classes/service/ServiceHelper";

import { errors } from "@/variables/errors";

const updatePublicUserData = serviceBuilder
  .create()
  .body(async ({ currentUserId, ...updateProperties }) => {
    const currentUser = await findCurrentUser(currentUserId);
    await currentUser.updateOne(updateProperties);
    return await findCurrentUser(currentUserId);
  })
  .build();

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

export { updatePublicUserData };
