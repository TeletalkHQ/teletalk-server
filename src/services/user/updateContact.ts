import { errorThrower } from "utility-store";

import { userUtilities } from "@/classes/UserUtilities";
import { serviceBuilder } from "@/classes/service/ServiceBuilder";
import { serviceHelper } from "@/classes/service/ServiceHelper";

import { errors } from "@/variables/errors";

const updateContact = serviceBuilder
  .create()
  .body(async ({ currentUserId, editValues }) => {
    const currentUser = await findCurrentUser(currentUserId);

    const { index, contact: oldContact } = findContact(
      currentUser.contacts,
      editValues
    );

    errorThrower(!oldContact, {
      ...errors.CONTACT_ITEM_NOT_EXIST,
      editValues,
    });

    await saveNewContact(currentUser, editValues, index);
  })
  .build();

const findCurrentUser = async (currentUserId) => {
  return await serviceHelper.findOneUserById(
    currentUserId,
    errors.CURRENT_USER_NOT_EXIST
  );
};

const findContact = (contacts, targetCellphone) => {
  const { item: contact, index } = userUtilities.findByCellphone(
    contacts,
    targetCellphone
  );

  return { contact, index };
};

const saveNewContact = async (currentUser, editValues, index) => {
  currentUser.contacts.splice(index, 1, editValues);
  await currentUser.save();
};

export { updateContact };
