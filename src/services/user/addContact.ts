import { errorThrower } from "utility-store";

import { userUtilities } from "@/classes/UserUtilities";

import { commonServices } from "@/services/common";

import { Contact, HydratedUserMongo, UserMongo } from "@/types";

import { errors } from "@/variables/errors";

const addContact = async (data: {
  currentUserId: string;
  newContact: Contact;
}) => {
  const currentUser = await commonServices.findOneUserById(data.currentUserId);

  if (!currentUser) throw errors.CURRENT_USER_NOT_EXIST;

  checkExistenceOfContactItem(data.newContact, currentUser.contacts);

  const targetUserCellphone = userUtilities.extractCellphone(data.newContact);

  const targetUser = await commonServices.findOneUser(targetUserCellphone);
  if (!targetUser) throw errors.TARGET_USER_NOT_EXIST;

  const contact = {
    ...data.newContact,
    userId: targetUser.userId,
  };

  await saveNewContactItem(currentUser, contact);

  return { newContact: contact };
};

const checkExistenceOfContactItem = (
  contact: Contact,
  contacts: UserMongo["contacts"]
) => {
  const { item: isContactExist } = userUtilities.findByCellphone(
    contacts,
    contact
  );
  errorThrower(isContactExist, () => ({
    ...errors.CONTACT_ITEM_EXIST,
    queryData: contact,
  }));
};

const saveNewContactItem = async (
  currentUser: HydratedUserMongo,
  newContact: Contact
) => {
  currentUser.contacts.push(newContact);
  await currentUser.save();
};

export { addContact };
