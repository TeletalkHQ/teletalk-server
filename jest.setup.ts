import { runner } from "@/index";
import { services } from "$/services";
const resetDatabase = async () => {
  await services.deleteAllUsers();
  await services.deleteAllPrivateChats();
};

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
  await import("$/__tests__/e2e/middleware/auth.spec");
  await import("$/__tests__/e2e/middleware/checkClientIdExistence.spec");
  await import("$/__tests__/e2e/middleware/checkCurrentUserStatus.spec");
  await import("$/__tests__/e2e/middleware/checkDataFields.spec");
  await import("$/__tests__/e2e/middleware/checkEventAvailability.spec");
};

const requirements = {
  registerTestSuits,
  resetDatabase,
  runner,
};

const runRequirements = async () => {
  await requirements.runner();
  await requirements.resetDatabase();
  // await requirements.registerTestSuits();
};

await runRequirements();
