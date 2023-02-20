const {
  socketRouteBuilder,
} = require("@/classes/routeBuilder/SocketRouteBuilder");

const { fields } = require("@/variables/others/fields");

const { userHandlers } = require("@/websocket/events/user/handlers");

const builder = socketRouteBuilder();

const addBlock = builder
  .create()
  .name("addBlock")
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      blockedCellphone: fields.statics.object(fields.collection.cellphone),
    },
  ])
  .handler(userHandlers.addBlock)
  .build();

const addContact = builder
  .create()
  .name("addContact")
  .inputFields(fields.collection.contactWithoutUserId)
  .outputFields([
    {
      addedContact: fields.statics.object(fields.collection.contact),
    },
  ])
  .handler(userHandlers.addContact)
  .build();

const disconnect = builder
  .create()
  .name("disconnect")
  .handler(userHandlers.disconnect)
  .build();

const editContact = builder
  .create()
  .name("editContact")
  .inputFields(fields.collection.contactWithoutUserId)
  .outputFields([
    {
      editedContact: fields.statics.object(
        fields.collection.contactWithoutUserId
      ),
    },
  ])
  .handler(userHandlers.editContact)
  .build();

const getContacts = builder
  .create()
  .name("getContacts")
  .outputFields([
    {
      contacts: fields.statics.array(fields.collection.contact),
    },
  ])
  .handler(userHandlers.getContacts)
  .build();

const getCurrentUserData = builder
  .create()
  .name("getCurrentUserData")
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .handler(userHandlers.getCurrentUserData)
  .build();

const getPublicUserData = builder
  .create()
  .name("getPublicUserData")
  .inputFields({
    userId: fields.single.userId,
  })
  .outputFields([
    {
      publicUserData: fields.statics.object({
        ...fields.collection.fullName,
        bio: fields.single.bio,
        userId: fields.single.userId,
        username: fields.single.username,
      }),
    },
  ])
  .handler(userHandlers.getPublicUserData)
  .build();

const removeBlock = builder
  .create()
  .name("removeBlock")
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      removedBlock: fields.statics.object(fields.collection.cellphone),
    },
  ])
  .handler(userHandlers.removeBlock)
  .build();

const removeContact = builder
  .create()
  .name("removeContact")
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      removedContact: fields.statics.object(fields.collection.cellphone),
    },
  ])
  .handler(userHandlers.removeContact)
  .build();

const updateOnlineStatus = builder
  .create()
  .name("updateOnlineStatus")
  .handler(userHandlers.updateOnlineStatus)
  .build();

const updatePublicUserData = builder
  .create()
  .name("updatePublicUserData")
  .inputFields({
    ...fields.collection.fullName,
    bio: fields.single.bio,
    username: fields.single.username,
  })
  .outputFields([
    {
      publicUserData: fields.statics.object({
        ...fields.collection.fullName,
        bio: fields.single.bio,
        status: fields.collection.status,
        userId: fields.single.userId,
        username: fields.single.username,
      }),
    },
  ])
  .handler(userHandlers.updatePublicUserData)
  .build();

const userRoutes = {
  addBlock,
  addContact,
  disconnect,
  editContact,
  getContacts,
  getCurrentUserData,
  getPublicUserData,
  removeBlock,
  removeContact,
  updateOnlineStatus,
  updatePublicUserData,
};

module.exports = {
  userRoutes,
};
