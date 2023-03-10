import { ioFieldMaker } from "check-fields";

const statics = {
  array: (value: object) => ioFieldMaker().type("array").value([value]).build(),
  boolean: ioFieldMaker().type("boolean").build(),
  number: ioFieldMaker().type("number").build(),
  object: (value: object) => ioFieldMaker().type("object").value(value).build(),
  string: ioFieldMaker().type("string").build(),
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
const online = statics.boolean;
const participantId = statics.string;
const phoneNumber = statics.string;
const senderId = statics.string;
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

const status = statics.object({ online });

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
  createdAt,
  firstName,
  lastName,
  phoneNumber,
  status,
  userId,
  username,
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
  online,
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
  status,
  user,
};

const fields = {
  collection,
  single,
  statics,
};

export { fields };
