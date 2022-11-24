/*
 * All test files are independent to each other, so orders not matter
 * Require test files as your wish
 */

//? Database ==>
require("$/database/crudUser.spec");
//? User api's ==>
require("$/integration/userRouter/signInNormal.spec");
require("$/integration/userRouter/verifySignInNormal.spec");
require("$/integration/userRouter/createNewUser.spec");
require("$/integration/userRouter/getChatInfo.spec");
require("$/integration/userRouter/logoutNormal.spec");
//? Cellphone api's ==>
require("$/integration/cellphoneRouter/addContact.spec");
require("$/integration/cellphoneRouter/editContact.spec");
require("$/integration/cellphoneRouter/removeContact.spec");
require("$/integration/cellphoneRouter/addBlock.spec");
require("$/integration/cellphoneRouter/removeBlock.spec");
require("$/integration/privateChatRouter/sendPrivateMessage.spec");
require("$/integration/privateChatRouter/getPrivateChat.spec");
