const userDataDefaultIoFields = {
  bio: "bio",
  blacklist: "blacklist",
  chats: "chats",
  contacts: "contacts",
  countryCode: "countryCode",
  countryName: "countryName",
  firstName: "firstName",
  lastName: "lastName",
  mainToken: "mainToken",
  phoneNumber: "phoneNumber",
  privateId: "privateId",
  username: "username",
};

const inputOutputFields = {
  ...userDataDefaultIoFields,
  addedContact: "addedContact",
  blockedCellphone: "blockedCellphone",
  chatId: "chatId",
  countries: "countries",
  countryShortName: "countryShortName",
  editedContact: "editedContact",
  macAddress: "macAddress",
  message: "message",
  messageId: "messageId",
  messages: "messages",
  messageSender: "messageSender",
  newMessage: "newMessage",
  newUser: "newUser",
  ok: "ok",
  participantId: "participantId",
  removedBlockedCellphone: "removedBlockedCellphone",
  removedContact: "removedContact",
  senderId: "senderId",
  user: "user",
  verificationCode: "verificationCode",
  verifyToken: "verifyToken",
};

module.exports = {
  inputOutputFields,
  userDataDefaultIoFields,
};
