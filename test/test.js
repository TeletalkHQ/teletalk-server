/*
 * All test files are independent to each other, so orders not matter
 * Require test files as your wish
 */

const { eventManager } = require("@/classes/EventManager");

//? Requirements ==>
require("$/functions/helpers/requirements.spec");

eventManager.addListener(eventManager.eventKeys.setRequirementsGetDone, () => {
  //? Database ==>
  require("$/database/crudUser.spec");
  //? User api's ==>
  require("$/integration/userRouter/signInNormal.spec");
  require("$/integration/userRouter/verifySignInNormal.spec");
  require("$/integration/userRouter/createNewUser.spec");
  // require("$/integration/user/logoutNormalApi.spec");
  //? Cellphone api's ==>
  require("$/integration/cellphoneRouter/addContact.spec");
  require("$/integration/cellphoneRouter/editContact.spec");
  require("$/integration/cellphoneRouter/removeContact.spec");
  require("$/integration/cellphoneRouter/addBlock.spec");
  require("$/integration/cellphoneRouter/removeBlock.spec");
  require("$/integration/privateChatRouter/sendMessage.spec");
  require("$/integration/privateChatRouter/getAllPrivateChats.spec");
  require("$/integration/privateChatRouter/getPrivateChatMessages.spec");
});
