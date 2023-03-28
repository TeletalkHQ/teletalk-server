import "module-alias/register";

import "@/configs/customGlobals";
import "@/helpers/requireDotenv";

import { PrivateChat } from "@/models/database/mongoDb/PrivateChat";
import { User } from "@/models/database/mongoDb/User";

import { runner } from "@/servers";

//#region //? Database =>
import "$/integration/database/crudUser.spec";
//#endregion

// The big hack

//#region //? Routers =>
// ? authRouter api's =>
// import "$/integration/routes/auth/signIn.spec";
// import "$/integration/routes/auth/verify.spec";
// import "$/integration/routes/auth/createNewUser.spec";
// import "$/integration/routes/auth/logout.spec";
// ? privateChatRouter api's =>
// import "$/integration/routes/privateChat/sendPrivateMessage.spec";
// import "$/integration/routes/privateChat/getPrivateChats.spec";
import "$/integration/routes/privateChat/getPrivateChat.spec";
// ? userRouter api's =>
// import "$/integration/routes/user/addBlock.spec";
// import "$/integration/routes/user/addContact.spec";
// import "$/integration/routes/user/editContact.spec";
// import "$/integration/routes/user/getContacts.spec";
// import "$/integration/routes/user/getCurrentUserData.spec";
// import "$/integration/routes/user/getPublicUserData.spec";
// import "$/integration/routes/user/removeBlock.spec";
// import "$/integration/routes/user/removeContact.spec";
// import "$/integration/routes/user/updatePublicUserData.spec";
// ? otherRouter api's =>
//TODO: Add getCountries
//TODO: Add getWelcomeMessage
// import "$/integration/routes/other/getStaff.spec";
// #endregion

// #region //? middlewares =>
// import "$/integration/middleware/notFound.spec";
// import "$/integration/middleware/requestMethodChecker.spec";
// import "$/integration/middleware/authDefault.spec";
// import "$/integration/middleware/checkDataFields.spec";
// import "$/integration/middleware/checkCurrentUserStatus.spec";
// #endregion

const testServer = async () => {
  await deleteAllUsers();
  await deleteAllPrivateChats();
};

const deleteAllUsers = async () => {
  await User.deleteMany();
};

const deleteAllPrivateChats = async () => {
  await PrivateChat.deleteMany();
};

const data = {
  requirements: {
    runner,
    testServer,
  },
};
export { data as requirements };
