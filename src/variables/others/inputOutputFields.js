const types = {
  boolean: "boolean",
  number: "number",
  string: "string",
  array: "array",
  object: "object",
};

const userDataDefaultIoFields = {
  bio: types.string,
  blacklist: types.array,
  chatInfo: types.array,
  contacts: types.array,
  countryCode: types.string,
  countryName: types.string,
  firstName: types.string,
  lastName: types.string,
  mainToken: types.string,
  phoneNumber: types.string,
  userId: types.string,
  username: types.string,
};

const ioFieldTypes = {
  ...userDataDefaultIoFields,
  addedContact: types.object,
  blockedCellphone: types.object,
  chatId: types.string,
  chatIds: types.array,
  chats: types.array,
  countries: types.array,
  countryShortName: types.string,
  editedContact: types.object,
  macAddress: types.string,
  message: types.string,
  messageId: types.string,
  messages: types.array,
  messageSender: types.object,
  newMessage: types.object,
  newUser: types.boolean,
  ok: types.boolean,
  participantId: types.string,
  removedBlockedCellphone: types.object,
  removedContact: types.object,
  senderId: types.string,
  user: types.object,
  verificationCode: types.string,
  verifyToken: types.string,
};

module.exports = {
  ioFieldTypes,
  userDataDefaultIoFields,
};
