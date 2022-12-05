/*
 * All test files are independent to each other, so orders not matter
 * Require test files as your wish
 */

//? Database ==>
require("$/tests/database/crudUser.spec");
//? userRouter api's ==>
require("$/tests/integration/userRouter/signInNormal.spec");
require("$/tests/integration/userRouter/verifySignInNormal.spec");
require("$/tests/integration/userRouter/createNewUser.spec");
require("$/tests/integration/userRouter/logoutNormal.spec");
//? cellphoneRouter api's ==>
require("$/tests/integration/cellphoneRouter/addContact.spec");
require("$/tests/integration/cellphoneRouter/editContact.spec");
require("$/tests/integration/cellphoneRouter/removeContact.spec");
require("$/tests/integration/cellphoneRouter/addBlock.spec");
require("$/tests/integration/cellphoneRouter/removeBlock.spec");
//? privateChatRouter api's ==>
require("$/tests/integration/privateChatRouter/sendPrivateMessage.spec");
require("$/tests/integration/privateChatRouter/getAllPrivateChats.spec");
