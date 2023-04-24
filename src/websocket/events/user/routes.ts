import { socketRouteBuilder } from "@/classes/routeBuilder/SocketRouteBuilder";

import { SocketRoutePicker } from "@/types";

import { fields } from "@/variables";

import { userHandlers } from "@/websocket/events/user/handlers";

const builder = socketRouteBuilder();

const addBlock = builder
  .create()
  .name("addBlock")
  .inputFields({ userId: fields.single.userId })
  .outputFields({
    blockedUser: fields.statics.object({
      userId: fields.single.userId,
    }),
  })
  .handler(userHandlers.addBlock)
  .build();

const addContact = builder
  .create()
  .name("addContact")
  .inputFields(fields.collection.contact)
  .outputFields({
    addedContact: fields.statics.object(fields.collection.contact),
  })
  .handler(userHandlers.addContact)
  .build();

const addContactWithCellphone = builder
  .create()
  .name("addContactWithCellphone")
  .inputFields(fields.collection.contactWithCellphone)
  .outputFields({
    addedContact: fields.statics.object(fields.collection.contactWithCellphone),
  })
  .handler(userHandlers.addContactWithCellphone)
  .build();

const editContact = builder
  .create()
  .name("editContact")
  .inputFields(fields.collection.contact)
  .outputFields({
    editedContact: fields.statics.object(fields.collection.contact),
  })
  .handler(userHandlers.editContact)
  .build();

const getContacts = builder
  .create()
  .name("getContacts")
  .outputFields({
    contacts: fields.statics.array(fields.collection.contact),
  })
  .handler(userHandlers.getContacts)
  .build();

const getUserData = builder
  .create()
  .name("getUserData")
  .outputFields({
    user: fields.statics.object(fields.collection.user),
  })
  .handler(userHandlers.getUserData)
  .build();

const getPublicUserData = builder
  .create()
  .name("getPublicUserData")
  .inputFields({
    userId: fields.single.userId,
  })
  .outputFields({
    publicUserData: fields.statics.object({
      ...fields.collection.fullName,
      bio: fields.single.bio,
      userId: fields.single.userId,
      username: fields.single.username,
    }),
  })
  .handler(userHandlers.getPublicUserData)
  .build();

const removeBlock = builder
  .create()
  .name("removeBlock")
  .inputFields({ userId: fields.single.userId })
  .outputFields({
    removedBlock: fields.statics.object({
      userId: fields.single.userId,
    }),
  })
  .handler(userHandlers.removeBlock)
  .build();

const removeContact = builder
  .create()
  .name("removeContact")
  .inputFields({
    userId: fields.single.userId,
  })
  .outputFields({
    removedContact: fields.statics.object({
      userId: fields.single.userId,
    }),
  })
  .handler(userHandlers.removeContact)
  .build();

const updatePublicUserData = builder
  .create()
  .name("updatePublicUserData")
  .inputFields({
    ...fields.collection.fullName,
    bio: fields.single.bio,
    username: fields.single.username,
  })
  .outputFields({
    publicUserData: fields.statics.object({
      ...fields.collection.fullName,
      bio: fields.single.bio,
      status: fields.collection.status,
      userId: fields.single.userId,
      username: fields.single.username,
    }),
  })
  .handler(userHandlers.updatePublicUserData)
  .build();

type UserRoutes = SocketRoutePicker<
  | "addBlock"
  | "addContact"
  | "addContactWithCellphone"
  | "editContact"
  | "getContacts"
  | "getUserData"
  | "getPublicUserData"
  | "removeBlock"
  | "removeContact"
  | "updatePublicUserData"
>;

const userRoutes: UserRoutes = {
  addBlock,
  addContact,
  addContactWithCellphone,
  editContact,
  getContacts,
  getUserData,
  getPublicUserData,
  removeBlock,
  removeContact,
  updatePublicUserData,
};

export { userRoutes };
