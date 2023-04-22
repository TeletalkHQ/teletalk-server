import { errorThrower } from "utility-store";
import { ContactWithCellphone } from "utility-store/lib/types";

import { commonServices } from "@/services/common";

import { Contact, HydratedUserMongo, UserMongo } from "@/types";

import { ERRORS } from "@/variables";

const addContactWithCellphone = async (data: {
  currentUserId: string;
  newContact: ContactWithCellphone;
}) => {
  const currentUser = await commonServices.findOneUserById(data.currentUserId);

  if (!currentUser) throw ERRORS.CURRENT_USER_NOT_EXIST;

  checkExistenceOfContactItem(currentUser.contacts, data.newContact);

  const targetUser = await commonServices.findOneUserById(
    data.newContact.userId
  );
  if (!targetUser) throw ERRORS.TARGET_USER_NOT_EXIST;

  await saveNewContactItem(currentUser, data.newContact);
};

const checkExistenceOfContactItem = (
  contacts: UserMongo["contacts"],
  contact: Contact
) => {
  const index = contacts.findIndex((i) => i.userId == contact.userId);
  errorThrower(index !== -1, () => ({
    ...ERRORS.CONTACT_ITEM_EXIST,
    queryData: contact,
  }));
};

const saveNewContactItem = async (
  currentUser: HydratedUserMongo,
  newContact: ContactWithCellphone
) => {
  currentUser.contacts.push(newContact);
  await currentUser.save();
};

export { addContactWithCellphone };
