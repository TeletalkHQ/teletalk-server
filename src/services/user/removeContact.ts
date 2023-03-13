import { errorThrower } from "utility-store";

import { userUtilities } from "@/classes/UserUtilities";

import { commonServices } from "@/services/common";

import { Cellphone, HydratedUserMongo, UserMongo } from "@/types";

import { errors } from "@/variables/errors";

const removeContact = async (data: {
  currentUserId: string;
  targetCellphone: Cellphone;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  const { index } = checkExistenceOfContactItem(
    data.targetCellphone,
    currentUser.contacts
  );

  await removeContactAndSave(currentUser, index);
};

const findCurrentUser = async (currentUserId: string) => {
  return await commonServices.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const checkExistenceOfContactItem = (
  targetContact: Cellphone,
  contacts: UserMongo["contacts"]
) => {
  const { item: contactItem, index } = userUtilities.findByCellphone(
    contacts,
    targetContact
  );
  errorThrower(!contactItem, () => ({
    ...errors.CONTACT_ITEM_NOT_EXIST,
    targetContact,
  }));

  return { index };
};

const removeContactAndSave = async (
  currentUser: HydratedUserMongo,
  index: number
) => {
  currentUser.contacts.splice(index, 1);
  await currentUser.save();
};

export { removeContact };
