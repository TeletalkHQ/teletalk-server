import {
  AddBlockIO,
  AddContactWithCellphoneIO,
  AddContactWithUserIdIO,
  DisconnectIO,
  GetAvatarIO,
  GetClientStatusIO,
  GetContactsIO,
  GetOnlineClientsIO,
  GetPublicDataIO,
  GetUserDataIO,
  RemoveBlockIO,
  RemoveContactIO,
  UpdateAvatarIO,
  UpdateContactIO,
  UpdatePublicDataIO,
} from "teletalk-type-store";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import { fields } from "~/variables";

import { handlers } from "./handlers";

const builder = socketEventBuilder();

const addBlock = builder
  .create<AddBlockIO>()
  .name("addBlock")
  .inputFields({ userId: fields.single.userId })
  .outputFields({
    blockedUser: fields.statics.object({
      userId: fields.single.userId,
    }),
  })
  .handler(handlers.addBlock)
  .build();

const addContactWithCellphone = builder
  .create<AddContactWithCellphoneIO>()
  .name("addContactWithCellphone")
  .inputFields({
    ...fields.collection.cellphone,
    ...fields.collection.fullName,
  })
  .outputFields({
    newContact: fields.statics.object(fields.collection.contact),
  })
  .handler(handlers.addContactWithCellphone)
  .build();

const addContactWithUserId = builder
  .create<AddContactWithUserIdIO>()
  .name("addContactWithUserId")
  .inputFields({
    ...fields.collection.fullName,
    userId: fields.single.userId,
  })
  .outputFields({
    newContact: fields.statics.object(fields.collection.contact),
  })
  .handler(handlers.addContactWithUserId)
  .build();

const disconnect = builder
  .create<DisconnectIO>()
  .name("disconnect")
  .noAuth()
  .handler(handlers.disconnect)
  .build();

const updateContact = builder
  .create<UpdateContactIO>()
  .name("updateContact")
  .inputFields(fields.collection.FullNameWithUserId)
  .outputFields({
    updatedContact: fields.statics.object(fields.collection.FullNameWithUserId),
  })
  .handler(handlers.updateContact)
  .build();

const getContacts = builder
  .create<GetContactsIO>()
  .name("getContacts")
  .outputFields({
    contacts: fields.statics.array(fields.collection.contact),
  })
  .handler(handlers.getContacts)
  .build();

const getUserData = builder
  .create<GetUserDataIO>()
  .name("getUserData")
  .outputFields({
    user: fields.statics.object(fields.collection.user),
  })
  .handler(handlers.getUserData)
  .build();

const getClientStatus = builder
  .create<GetClientStatusIO>()
  .name("getClientStatus")
  .inputFields({
    userId: fields.single.userId,
  })
  .outputFields({
    isOnline: fields.single.isOnline,
    userId: fields.single.userId,
  })
  .handler(handlers.getClientStatus)
  .build();

const getOnlineClients = builder
  .create<GetOnlineClientsIO>()
  .name("getOnlineClients")
  .outputFields({
    onlineClients: fields.statics.array({
      userId: fields.single.userId,
    }),
  })
  .handler(handlers.getOnlineClients)
  .build();

const getPublicData = builder
  .create<GetPublicDataIO>()
  .name("getPublicData")
  .inputFields({
    userId: fields.single.userId,
  })
  .outputFields({
    publicData: fields.statics.object({
      ...fields.collection.fullName,
      bio: fields.single.bio,
      userId: fields.single.userId,
      username: fields.single.username,
    }),
  })
  .handler(handlers.getPublicData)
  .build();

const removeBlock = builder
  .create<RemoveBlockIO>()
  .name("removeBlock")
  .inputFields({ userId: fields.single.userId })
  .outputFields({
    removedBlock: fields.statics.object({
      userId: fields.single.userId,
    }),
  })
  .handler(handlers.removeBlock)
  .build();

const removeContact = builder
  .create<RemoveContactIO>()
  .name("removeContact")
  .inputFields({
    userId: fields.single.userId,
  })
  .outputFields({
    removedContact: fields.statics.object({
      userId: fields.single.userId,
    }),
  })
  .handler(handlers.removeContact)
  .build();

const updatePublicData = builder
  .create<UpdatePublicDataIO>()
  .name("updatePublicData")
  .inputFields({
    ...fields.collection.fullName,
    bio: fields.single.bio,
    username: fields.single.username,
  })
  .outputFields({
    userPublicData: fields.statics.object({
      ...fields.collection.fullName,
      bio: fields.single.bio,
      userId: fields.single.userId,
      username: fields.single.username,
    }),
  })
  .handler(handlers.updatePublicData)
  .build();

const getAvatar = builder
  .create<GetAvatarIO>()
  .name("getAvatar")
  .inputFields({
    userId: fields.single.userId,
  })
  .outputFields({
    avatarSrc: fields.single.avatarSrc,
    userId: fields.single.userId,
  })
  .handler(handlers.getAvatar)
  .build();

const updateAvatar = builder
  .create<UpdateAvatarIO>()
  .name("updateAvatar")
  .inputFields({
    avatarSrc: fields.single.avatarSrc,
  })
  .outputFields({
    avatarSrc: fields.single.avatarSrc,
    userId: fields.single.userId,
  })
  .handler(handlers.updateAvatar)
  .build();

export const user = {
  events: [
    addBlock,
    addContactWithCellphone,
    addContactWithUserId,
    disconnect,
    getAvatar,
    getClientStatus,
    getContacts,
    getOnlineClients,
    getPublicData,
    getUserData,
    removeBlock,
    removeContact,
    updateAvatar,
    updateContact,
    updatePublicData,
  ],
  handlers,
};
