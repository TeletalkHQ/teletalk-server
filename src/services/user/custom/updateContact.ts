import {
  DBContactItem,
  DBContacts,
  FullName,
  SessionId,
  UserId,
} from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedUser } from "~/types/model";

export const updateContact = serviceBuilder
  .create<
    {
      currentSessionId: SessionId;
      editValues: FullName;
      targetUserId: UserId;
    },
    void,
    {
      currentUser: HydratedUser;
    }
  >()
  .setBeforeRunMiddlewares(
    serviceMiddlewares.findCurrentUser,
    serviceMiddlewares.throwIfSelfDataRequested
  )
  .setBody(async (data) => {
    const { index, contact: oldContact } = findContact(
      data.currentUser.contacts,
      data.targetUserId
    );

    if (index < 0)
      throw {
        ...errorStore.find("CONTACT_ITEM_NOT_EXIST"),
        editValues: data.editValues,
      };

    const updatedContact: DBContactItem = {
      ...data.editValues,
      isCellphoneAccessible: oldContact.isCellphoneAccessible,
      userId: data.targetUserId,
    };

    await saveContact(data.currentUser, updatedContact, index);
  })
  .build();

const findContact = (contacts: DBContacts, targetUserId: string) => {
  const index = contacts.findIndex((c) => c.userId === targetUserId);

  return {
    contact: contacts[index],
    index,
  };
};

const saveContact = async (
  currentUser: HydratedUser,
  updatedContact: DBContactItem,
  index: number
) => {
  currentUser.contacts.splice(index, 1, updatedContact);
  await currentUser.save();
};
