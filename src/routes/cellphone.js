const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const cellphoneRouteBuilder = routeBuilder(baseUrls.cellphone);

const addBlock = cellphoneRouteBuilder
  .create()
  //TODO: Use METHODS
  .method("post")
  .url("/addBlock")
  .statusCode(200)
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      blockedCellphone: fields.statics.object(fields.collection.cellphone),
    },
  ])
  .build();

const addBlocks = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addBlocks")
  .statusCode(200)
  .build();

const addContact = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addContact")
  .statusCode(200)
  .inputFields(fields.collection.contactWithoutUserId)
  .outputFields([
    {
      addedContact: fields.statics.object(fields.collection.contact),
    },
  ])
  .build();

const addContacts = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/addContacts")
  .statusCode(200)
  .build();

const editContact = cellphoneRouteBuilder
  .create()
  .method("patch")
  .url("/editContact")
  .statusCode(200)
  .inputFields(fields.collection.contactWithoutUserId)
  .outputFields([
    {
      editedContact: fields.statics.object(
        fields.collection.contactWithoutUserId
      ),
    },
  ])
  .build();

const getContacts = cellphoneRouteBuilder
  .create()
  .method("get")
  .url("/getContacts")
  .statusCode(200)
  .outputFields([
    {
      contacts: fields.statics.object(fields.collection.contact),
    },
  ])
  .build();

const removeBlock = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeBlock")
  .statusCode(200)
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      removedBlockedCellphone: fields.statics.object(
        fields.collection.cellphone
      ),
    },
  ])
  .build();

const removeBlocks = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeBlocks")
  .statusCode(200)
  .build();

const removeContact = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeContact")
  .statusCode(200)
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      removedContact: fields.statics.object(fields.collection.cellphone),
    },
  ])
  .build();

const removeContacts = cellphoneRouteBuilder
  .create()
  .method("delete")
  .url("/removeContacts")
  .statusCode(200)
  .build();

const shareContact = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/shareContact")
  .statusCode(200)
  .build();

const shareContacts = cellphoneRouteBuilder
  .create()
  .method("post")
  .url("/shareContacts")
  .statusCode(200)
  .build();

const routes = {
  addBlock,
  addBlocks,
  addContact,
  addContacts,
  editContact,
  getContacts,
  removeBlock,
  removeBlocks,
  removeContact,
  removeContacts,
  shareContact,
  shareContacts,
};

const cellphone = {
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = {
  cellphone,
};
