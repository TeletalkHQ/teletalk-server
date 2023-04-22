import { commonServices } from "@/services/common";

import { ERRORS } from "@/variables";

const getUserContacts = async (data: { currentUserId: string }) => {
  const currentUser = await commonServices.findOneUserById(data.currentUserId);
  if (!currentUser) throw ERRORS.CURRENT_USER_NOT_EXIST;

  return currentUser.contacts;
};

export { getUserContacts };
