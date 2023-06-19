import { errorThrower } from "utility-store";

import { commonServices } from "~/services/common";
import { Contact, HydratedUserMongo, UserMongo } from "~/types";
import { errors } from "~/variables";

const addContact = async (data: {
  currentUserId: string;
  newContact: Contact;
}) => {
  const currentUser = await commonServices.findOneUserById(data.currentUserId);

  if (!currentUser) throw errors.currentUserNotExist;

  checkExistenceOfContactItem(currentUser.contacts, data.newContact);

  const targetUser = await commonServices.findOneUserById(
    data.newContact.userId
  );
  if (!targetUser) throw errors.targetUserNotExist;

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
    ...errors.contactItemExist,
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
