import { errorThrower } from "utility-store";

import { commonServices } from "@/services/common";

import { Contact, HydratedUserMongo, UserMongo } from "@/types";

import { errors } from "@/variables/errors";

const addContact = async (data: {
  currentUserId: string;
  newContact: Contact;
}) => {
  const currentUser = await commonServices.findOneUserById(data.currentUserId);

  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  checkExistenceOfContactItem(currentUser.contacts, data.newContact);

  const targetUser = await commonServices.findOneUserById(
    data.newContact.userId
  );
  if (!targetUser) throw errors.TARGET_USER_NOT_EXIST;

  const contact = {
    ...data.newContact,
    userId: targetUser.userId,
  };

  await saveNewContactItem(currentUser, contact);

  return { addedContact: contact };
};

const checkExistenceOfContactItem = (
  contacts: UserMongo["contacts"],
  contact: Contact
) => {
  const index = contacts.findIndex((i) => i.userId == contact.userId);
  errorThrower(index !== -1, () => ({
    ...errors.CONTACT_ITEM_EXIST,
    queryData: contact,
  }));
};

const saveNewContactItem = async (
  currentUser: HydratedUserMongo,
  newContact: Contact
) => {
  (currentUser.contacts as Contact[]).push(newContact);
  await currentUser.save();
};

export { addContact };
