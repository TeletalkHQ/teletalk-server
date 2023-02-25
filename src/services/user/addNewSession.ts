import { serviceBuilder } from "@/classes/service/ServiceBuilder";
import { serviceHelper } from "@/classes/service/ServiceHelper";

import { errors } from "@/variables/errors";

const addNewSession = serviceBuilder
  .create()
  .body(async ({ userId, newToken }) => {
    const currentUser = await findCurrentUser(userId);
    await addAndSaveNewToken(currentUser, newToken);
  })
  .build();

const findCurrentUser = async (userId) => {
  return await serviceHelper.findOneUserById(
    userId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const addAndSaveNewToken = async (currentUser, newToken) => {
  currentUser.sessions.push({ token: newToken });
  await currentUser.save();
};

export { addNewSession };
