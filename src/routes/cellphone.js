const { routeBuilder } = require("@/classes/RouteBuilder");

const { extractVersions, versionCalculator } = require("@/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const cellphoneRouteBuilder = routeBuilder(baseUrls.cellphone);

const addBlock = cellphoneRouteBuilder
  .create()
  //TODO: Use METHODS
  .method(METHODS.POST)
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
  .method(METHODS.POST)
  .url("/addBlocks")
  .statusCode(200)
  .build();

const addContact = cellphoneRouteBuilder
  .create()
  .method(METHODS.POST)
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
  .method(METHODS.POST)
  .url("/addContacts")
  .statusCode(200)
  .build();

const editContact = cellphoneRouteBuilder
  .create()
  .method(METHODS.PATCH)
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
  .method(METHODS.GET)
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
  .method(METHODS.DELETE)
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
  .method(METHODS.DELETE)
  .url("/removeBlocks")
  .statusCode(200)
  .build();

const removeContact = cellphoneRouteBuilder
  .create()
  .method(METHODS.DELETE)
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
  .method(METHODS.DELETE)
  .url("/removeContacts")
  .statusCode(200)
  .build();

const shareContact = cellphoneRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/shareContact")
  .statusCode(200)
  .build();

const shareContacts = cellphoneRouteBuilder
  .create()
  .method(METHODS.POST)
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
