import { errorThrower, userUtils } from "utility-store";
import {
  ContactItem,
  FUllNameWithUserId,
  UserData,
  UserId,
} from "utility-store/lib/types";

import { findOneUserById } from "~/services/common/findOneUserById";
import { HydratedUser } from "~/types/models";
import { errors } from "~/variables";

const updateContact = async (data: {
  currentUserId: UserId;
  editValues: FUllNameWithUserId;
}) => {
  const currentUser = (await findCurrentUser(data.currentUserId))!;

  const { index, contact: oldContact } = findContact(
    currentUser.contacts,
    data.editValues.userId
  );

  errorThrower(index === -1, {
    ...errors.contactItemNotExist,
    editValues: data.editValues,
  });

  const newContact = {
    ...userUtils.extractCellphone(oldContact as ContactItem),
    ...data.editValues,
  };

  await saveNewContact(currentUser, newContact, index);
};

const findCurrentUser = async (currentUserId: string) => {
  return await findOneUserById(currentUserId);
};

const findContact = (contacts: UserData["contacts"], targetUserId: string) => {
  const index = contacts.findIndex((c) => c.userId === targetUserId);

  return { contact: contacts[index], index };
};

const saveNewContact = async (
  currentUser: HydratedUser,
  editValues: ContactItem | ContactItem,
  index: number
) => {
  currentUser.contacts.splice(index, 1, editValues);
  await currentUser.save();
};

export { updateContact };
