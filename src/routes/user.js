const { routeBuilder } = require("@/classes/RouteBuilder");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const userRouteBuilder = routeBuilder(baseUrls.user);

const addBlock = userRouteBuilder
  .create()
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

const addBlocks = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/addBlocks")
  .statusCode(200)
  .build();

const addContact = userRouteBuilder
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

const addContacts = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/addContacts")
  .statusCode(200)
  .build();

const editContact = userRouteBuilder
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

const getContacts = userRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getContacts")
  .statusCode(200)
  .outputFields([
    {
      contacts: fields.statics.array(fields.collection.contact),
    },
  ])
  .build();

const removeBlock = userRouteBuilder
  .create()
  .method(METHODS.DELETE)
  .url("/removeBlock")
  .statusCode(200)
  .inputFields(fields.collection.cellphone)
  .outputFields([
    {
      removedBlock: fields.statics.object(fields.collection.cellphone),
    },
  ])
  .build();

const removeBlocks = userRouteBuilder
  .create()
  .method(METHODS.DELETE)
  .url("/removeBlocks")
  .statusCode(200)
  .build();

const removeContact = userRouteBuilder
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

const removeContacts = userRouteBuilder
  .create()
  .method(METHODS.DELETE)
  .url("/removeContacts")
  .statusCode(200)
  .build();

const shareContact = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/shareContact")
  .statusCode(200)
  .build();

const shareContacts = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/shareContacts")
  .statusCode(200)
  .build();

const getCurrentUserData = userRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getCurrentUserData")
  .statusCode(200)
  .outputFields([
    {
      user: fields.statics.object(fields.collection.user),
    },
  ])
  .build();

const getPublicUserData = userRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/getPublicUserData")
  .statusCode(200)
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
  .build();

const updatePersonalInfo = userRouteBuilder
  .create()
  .method(METHODS.PATCH)
  .url("/updatePersonalInfo")
  .statusCode(200)
  .inputFields(fields.collection.fullName)
  .outputFields([
    {
      ...fields.collection.fullName,
      bio: fields.single.bio,
      username: fields.single.username,
    },
  ])
  .build();

const userRoutes = {
  addBlock,
  addBlocks,
  addContact,
  addContacts,
  editContact,
  getContacts,
  getCurrentUserData,
  getPublicUserData,
  removeBlock,
  removeBlocks,
  removeContact,
  removeContacts,
  shareContact,
  shareContacts,
  updatePersonalInfo,
};

module.exports = {
  userRoutes,
};
