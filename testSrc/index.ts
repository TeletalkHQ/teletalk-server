import { runner } from "@/index";

import { services } from "$/services";

const registerTestSuits = async () => {
  await import("$/__tests__/e2e/events/auth/createNewUser.spec");
  await import("$/__tests__/e2e/events/auth/logout.spec");
  await import("$/__tests__/e2e/events/auth/signIn.spec");
  await import("$/__tests__/e2e/events/auth/verify.spec");
  await import("$/__tests__/e2e/events/other/getStaff.spec");
  await import("$/__tests__/e2e/events/privateChat/getPrivateChat.spec");
  await import("$/__tests__/e2e/events/privateChat/getPrivateChats.spec");
  await import("$/__tests__/e2e/events/privateChat/sendPrivateMessage.spec");
  await import("$/__tests__/e2e/events/user/addBlock.spec");
  await import("$/__tests__/e2e/events/user/addContact.spec");
  await import("$/__tests__/e2e/events/user/editContact.spec");
  await import("$/__tests__/e2e/events/user/getContacts.spec");
  await import("$/__tests__/e2e/events/user/getUserData.spec");
  await import("$/__tests__/e2e/events/user/getPublicUserData.spec");
  await import("$/__tests__/e2e/events/user/removeBlock.spec");
  await import("$/__tests__/e2e/events/user/removeContact.spec");
  await import("$/__tests__/e2e/events/user/updatePublicUserData.spec");
  // //TODO: Add getCountries
  // //TODO: Add getWelcomeMessage

  await import("$/__tests__/e2e/middleware/auth.spec");
  await import("$/__tests__/e2e/middleware/checkClientIdExistence.spec");
  await import("$/__tests__/e2e/middleware/checkCurrentUserStatus.spec");
  await import("$/__tests__/e2e/middleware/checkDataFields.spec");
  await import("$/__tests__/e2e/middleware/checkEventAvailability.spec");
};

const resetDatabase = async () => {
  await services.deleteAllUsers();
  await services.deleteAllPrivateChats();
};

const requirements = {
  registerTestSuits,
  resetDatabase,
  runner,
};

export { requirements };
