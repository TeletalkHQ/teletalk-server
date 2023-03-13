import { errorThrower } from "utility-store";

import { userUtilities } from "@/classes/UserUtilities";

import { findOneUserById } from "@/services/common/findOneUserById";

import { Contact, HydratedUserMongo, UserMongo } from "@/types";

import { errors } from "@/variables/errors";

const updateContact = async (data: {
  currentUserId: string;
  editValues: Contact;
}) => {
  const currentUser = (await findCurrentUser(
    data.currentUserId
  )) as HydratedUserMongo;

  const { index, contact: oldContact } = findContact(
    currentUser.contacts,
    data.editValues
  );

  errorThrower(!oldContact, {
    ...errors.CONTACT_ITEM_NOT_EXIST,
    editValues: data.editValues,
  });

  await saveNewContact(currentUser, data.editValues, index);
};

const findCurrentUser = async (currentUserId: string) => {
  return await findOneUserById(currentUserId, errors.CURRENT_USER_NOT_EXIST);
};

const findContact = (
  contacts: UserMongo["contacts"],
  targetCellphone: Contact
) => {
  const { item: contact, index } = userUtilities.findByCellphone(
    contacts,
    targetCellphone
  );

  return { contact, index };
};

const saveNewContact = async (
  currentUser: HydratedUserMongo,
  editValues: Contact,
  index: number
) => {
  currentUser.contacts.splice(index, 1, editValues);
  await currentUser.save();
};

export { updateContact };
