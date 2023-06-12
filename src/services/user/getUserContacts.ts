import { commonServices } from "~/services/common";

import { errors } from "~/variables";

const getUserContacts = async (data: { currentUserId: string }) => {
  const currentUser = await commonServices.findOneUserById(data.currentUserId);
  if (!currentUser) throw errors.currentUserNotExist;

  return currentUser.contacts;
};

export { getUserContacts };
