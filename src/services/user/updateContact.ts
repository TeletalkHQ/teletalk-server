import { errorThrower, userUtilities } from "utility-store";
import { ContactWithCellphone } from "utility-store/lib/types";

import { findOneUserById } from "@/services/common/findOneUserById";

import { Contact, HydratedUserMongo, UserMongo } from "@/types";

import { ERRORS } from "@/variables";

const updateContact = async (data: {
  currentUserId: string;
  editValues: Contact;
}) => {
  const currentUser = (await findCurrentUser(
    data.currentUserId
  )) as HydratedUserMongo;

  const { index, contact: oldContact } = findContact(
    currentUser.contacts,
    data.editValues.userId
  );

  errorThrower(index === -1, {
    ...ERRORS.CONTACT_ITEM_NOT_EXIST,
    editValues: data.editValues,
  });

  const newContact = {
    ...userUtilities.extractCellphone(oldContact as ContactWithCellphone),
    ...data.editValues,
  };

  await saveNewContact(currentUser, newContact, index);
};

const findCurrentUser = async (currentUserId: string) => {
  return await findOneUserById(currentUserId);
};

const findContact = (contacts: UserMongo["contacts"], targetUserId: string) => {
  const index = contacts.findIndex((c) => c.userId === targetUserId);

  return { contact: contacts[index], index };
};

const saveNewContact = async (
  currentUser: HydratedUserMongo,
  editValues: ContactWithCellphone | Contact,
  index: number
) => {
  currentUser.contacts.splice(index, 1, editValues);
  await currentUser.save();
};

export { updateContact };
