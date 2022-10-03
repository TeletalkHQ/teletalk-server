/*
 * Require test files as your wish
 * All test files are independent
 */

const { eventManager } = require("@/classes/EventManager");

//? Requirements ==>
require("$/requirements.spec");

eventManager.addListener(eventManager.eventKeys.requirementsGetDone, () => {
  //? Database ==>
  require("$/database/userDb.spec");
  //? User api's ==>
  require("$/api/userApis/signInNormalApi.spec");
  require("$/api/userApis/verifySignInNormalApi.spec");
  require("$/api/userApis/createNewUserApi.spec");
  require("$/api/userApis/logoutNormalApi.spec");
  //? Cellphone api's ==>
  require("$/api/cellphoneApis/addContactApi.spec");
  require("$/api/cellphoneApis/editContactApi.spec");
  require("$/api/cellphoneApis/removeContactApi.spec");
  require("$/api/cellphoneApis/addBlockApi.spec");
  require("$/api/cellphoneApis/removeBlockApi.spec");
  require("$/api/privateChatApis/sendMessageApi.spec");
  require("$/api/privateChatApis/getAllChatsApi.spec");
  require("$/api/privateChatApis/getPrivateChatMessagesApi.spec");
});
