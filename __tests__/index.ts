import "module-alias/register";

import "@/configs/customGlobals";
import "@/helpers/requireDotenv";

import { PrivateChat } from "@/models/database/mongoDb/PrivateChat";
import { User } from "@/models/database/mongoDb/User";

import { runner } from "@/servers";

//#region //? Routers =>
// ? authRouter =>
import "$/integration/events/auth/createNewUser.spec";
// import "$/integration/routes/auth/logout.spec";
import "$/integration/events/auth/signIn.spec";
import "$/integration/events/auth/verify.spec";
// ? privateChatRouter =>
import "$/integration/events/privateChat/getPrivateChat.spec";
import "$/integration/events/privateChat/getPrivateChats.spec";
import "$/integration/events/privateChat/sendPrivateMessage.spec";
// ? userRouter =>
import "$/integration/events/user/addBlock.spec";
import "$/integration/events/user/addContact.spec";
import "$/integration/events/user/editContact.spec";
import "$/integration/events/user/getContacts.spec";
import "$/integration/events/user/getCurrentUserData.spec";
import "$/integration/events/user/getPublicUserData.spec";
import "$/integration/events/user/removeBlock.spec";
import "$/integration/events/user/removeContact.spec";
import "$/integration/events/user/updatePublicUserData.spec";
// ? otherRouter =>
//TODO: Add getCountries
//TODO: Add getWelcomeMessage
import "$/integration/events/other/getStaff.spec";
// #endregion

// #region //? middlewares =>
import "$/integration/middleware/notFound.spec";
// import "$/integration/middleware/requestMethodChecker.spec";
// import "$/integration/middleware/authDefault.spec";
import "$/integration/middleware/checkDataFields.spec";
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
