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

const updateOnlineStatus = builder
  .create()
  .name("updateOnlineStatus")
  .handler(userHandlers.updateOnlineStatus)
  .build();

const userRoutes = {
  addBlock,
  addContact,
  disconnect,
  editContact,
  getContacts,
  updateOnlineStatus,
};

module.exports = {
  userRoutes,
};
