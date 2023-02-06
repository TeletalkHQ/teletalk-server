const { ioFieldMaker } = require("utility-store/src/classes/IoFieldMaker");

const { FIELD_TYPE } = require("@/variables/others/fieldType");

const statics = {
  array: (value) =>
    ioFieldMaker.create().type(FIELD_TYPE.ARRAY).value([value]).build(),
  boolean: ioFieldMaker.create().type(FIELD_TYPE.BOOLEAN).build(),
  number: ioFieldMaker.create().type(FIELD_TYPE.NUMBER).build(),
  object: (value) =>
    ioFieldMaker.create().type(FIELD_TYPE.OBJECT).value(value).build(),
  string: ioFieldMaker.create().type(FIELD_TYPE.STRING).build(),
};

const bio = statics.string;
const chatId = statics.string;
const countryCode = statics.string;
const countryName = statics.string;
const countryShortName = statics.string;
const createdAt = statics.number;
const description = statics.string;
const errorReason = statics.string;
const firstName = statics.string;
const language = statics.string;
const lastName = statics.string;
const message = statics.string;
const messageId = statics.string;
const newUser = statics.boolean;
const ok = statics.boolean;
const participantId = statics.string;
const phoneNumber = statics.string;
const senderId = statics.string;
const status = statics.string;
const token = statics.string;
const userId = statics.string;
const username = statics.string;
const verificationCode = statics.string;
const welcomeMessage = statics.string;

const country = {
  countryCode,
  countryName,
  countryShortName,
};

const cellphone = {
  countryCode,
  countryName,
  phoneNumber,
};

const contact = {
  countryCode,
  countryName,
  firstName,
  lastName,
  phoneNumber,
  userId,
};

const fullName = {
  firstName,
  lastName,
};

const { userId: _userId, ...contactWithoutUserId } = contact;

const sender = statics.object({
  senderId,
});

const messageItem = {
  createdAt,
  message,
  messageId,
  sender,
};

const participantItem = {
  participantId,
};

const blacklist = statics.array(cellphone);
const contacts = statics.array(contact);
const countries = statics.array(country);
const messages = statics.array(messageItem);

const participants = statics.array(participantItem);

const privateChat = {
  chatId,
  createdAt,
  messages,
  participants,
};

const user = {
  bio,
  blacklist,
  contacts,
  countryCode,
  countryName,
  firstName,
  lastName,
  phoneNumber,
  userId,
  username,
  createdAt,
};

const single = {
  bio,
  chatId,
  countryCode,
  countryName,
  countryShortName,
  createdAt,
  description,
  errorReason,
  firstName,
  language,
  lastName,
  message,
  messageId,
  newUser,
  ok,
  participantId,
  phoneNumber,
  senderId,
  status,
  token,
  userId,
  username,
  verificationCode,
  welcomeMessage,
};

const collection = {
  blacklist,
  cellphone,
  contact,
  contacts,
  contactWithoutUserId,
  countries,
  country,
  fullName,
  messageItem,
  messages,
  participants,
  privateChat,
  sender,
  user,
};

const fields = {
  collection,
  single,
  statics,
};

module.exports = { fields };
