import { commonServices } from "@/services/common";

import { UserMongo } from "@/types";

import { errors } from "@/variables/errors";

const updatePublicUserData = async (data: {
  currentUserId: string;
  //FIXME: public data interface
  updateProperties: Partial<UserMongo>;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  await currentUser.updateOne(data.updateProperties);
  return await findCurrentUser(data.currentUserId);
};

const findCurrentUser = async (currentUserId: string) => {
  return await commonServices.findOneUserById(currentUserId);
};

export { updatePublicUserData };
