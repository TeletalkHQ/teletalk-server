const stateKeys = {
  temporaryClients: "temporaryClients",
  aliveClients: "aliveClients",
  users: "users",
  testUsers: "testUsers",
};

const inputOutputFields = {
  addedContact: "addedContact",
  bio: "bio",
  blacklist: "blacklist",
  blockedCellphone: "blockedCellphone",
  chatId: "chatId",
  chats: "chats",
  contacts: "contacts",
  countryCode: "countryCode",
  countryName: "countryName",
  editedContact: "editedContact",
  firstName: "firstName",
  lastName: "lastName",
  macAddress: "macAddress",
  mainToken: "mainToken",
  message: "message",
  messageId: "messageId",
  messages: "messages",
  messageSender: "messageSender",
  newMessage: "newMessage",
  newUser: "newUser",
  participantId: "participantId",
  phoneNumber: "phoneNumber",
  privateId: "privateId",
  removedBlockedCellphone: "removedBlockedCellphone",
  removedContact: "removedContact",
  senderId: "senderId",
  user: "user",
  username: "username",
  verificationCode: "verificationCode",
  verifyToken: "verifyToken",
};

const jwtDefaultOptions = { algorithm: "HS256" };

const userInitialOptions = {
  bio: "",
  blacklist: [],
  contacts: [],
  countryCode: "",
  countryName: "",
  createdAt: "",
  firstName: "",
  lastName: "",
  macAddress: "",
  phoneNumber: "",
  privateId: "",
  mainToken: "",
  verifyToken: "",
  username: "",
};

module.exports = {};

const initialOptions = {
  stateKeys,
  jwtDefaultOptions,
  userInitialOptions,
  inputOutputFields,
};

module.exports = {
  ...initialOptions,
  initialOptions,
};
