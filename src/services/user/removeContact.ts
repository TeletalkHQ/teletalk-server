import { errorThrower } from "utility-store";

import { commonServices } from "@/services/common";

import { Contact, HydratedUserMongo, UserMongo } from "@/types";

import { ERRORS } from "@/variables";

const removeContact = async (data: {
  currentUserId: string;
  targetContact: Contact;
}) => {
  const currentUser = await findCurrentUser(data.currentUserId);
  if (!currentUser) throw ERRORS.CURRENT_USER_NOT_EXIST;

  const { index } = checkExistenceOfContactItem(
    currentUser.contacts,
    data.targetContact
  );

  await removeContactAndSave(currentUser, index);
};

const findCurrentUser = async (currentUserId: string) => {
  return await commonServices.findOneUserById(
    currentUserId,
    ERRORS.CURRENT_USER_NOT_EXIST
  );
};

const checkExistenceOfContactItem = (
  contacts: UserMongo["contacts"],
  targetContact: Contact
) => {
  const index = contacts.findIndex((c) => c.userId === targetContact.userId);
  errorThrower(index === -1, () => ({
    ...ERRORS.CONTACT_ITEM_NOT_EXIST,
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
