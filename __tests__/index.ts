import "module-alias/register";

import "@/configs/customGlobals";
import "@/helpers/requireDotenv";

import { PrivateChat } from "@/models/database/mongoDb/PrivateChat";
import { User } from "@/models/database/mongoDb/User";

import { runner } from "@/servers";

//#region //? Routers =>
// ? authRouter =>
import "$/e2e/events/auth/createNewUser.spec";
// import "$/integration/routes/auth/logout.spec";
import "$/e2e/events/auth/signIn.spec";
import "$/e2e/events/auth/verify.spec";
// ? privateChatRouter =>
import "$/e2e/events/privateChat/getPrivateChat.spec";
import "$/e2e/events/privateChat/getPrivateChats.spec";
import "$/e2e/events/privateChat/sendPrivateMessage.spec";
// ? userRouter =>
import "$/e2e/events/user/addBlock.spec";
import "$/e2e/events/user/addContact.spec";
import "$/e2e/events/user/editContact.spec";
import "$/e2e/events/user/getContacts.spec";
import "$/e2e/events/user/getCurrentUserData.spec";
import "$/e2e/events/user/getPublicUserData.spec";
import "$/e2e/events/user/removeContact.spec";
import "$/e2e/events/user/updatePublicUserData.spec";
import "$/integration/events/user/removeBlock.spec";
// ? otherRouter =>
//TODO: Add getCountries
//TODO: Add getWelcomeMessage
import "$/e2e/events/other/getStaff.spec";
// #endregion

// #region //? middlewares =>
import "$/e2e/middleware/notFound.spec";
// import "$/integration/middleware/requestMethodChecker.spec";
// import "$/integration/middleware/authDefault.spec";
import "$/e2e/middleware/checkDataFields.spec";
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
