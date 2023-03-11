import { errorThrower } from "utility-store";

import { userUtilities } from "@/classes/UserUtilities";

import { commonServices } from "@/services/common";

import { Contact, HydratedUserMongo, UserMongo } from "@/types";

import { errors } from "@/variables/errors";

const removeContact = async (data: {
  currentUserId: string;
  targetContact: Contact;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  const { index } = checkExistenceOfContactItem(
    data.targetContact,
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
  targetContact: Contact,
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
