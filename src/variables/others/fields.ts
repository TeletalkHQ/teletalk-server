import { IoFields, ioFieldMaker } from "check-fields";

const statics = {
	array: (value: IoFields) =>
		ioFieldMaker().type("array").value([value]).build(),
	boolean: ioFieldMaker().type("boolean").build(),
	number: ioFieldMaker().type("number").build(),
	object: (value: IoFields) =>
		ioFieldMaker().type("object").value(value).build(),
	string: ioFieldMaker().type("string").build(),
};

//TODO: Sync with FieldTypes
const bio = statics.string;
const chatId = statics.string;
const clientId = statics.string;
const countryCode = statics.string;
const countryName = statics.string;
const countryShortName = statics.string;
const createdAt = statics.number;
const description = statics.string;
const errorReason = statics.string;
const firstName = statics.string;
const isActive = statics.boolean;
const language = statics.string;
const lastName = statics.string;
const messageId = statics.string;
const messageText = statics.string;
const newUser = statics.boolean;
const ok = statics.boolean;
const participantId = statics.string;
const phoneNumber = statics.string;
const senderId = statics.string;
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

const fullName = {
	firstName,
	lastName,
};

const contact = {
	...cellphone,
	...fullName,
	userId,
};

const sender = statics.object({
	senderId,
});

const messageItem = {
	createdAt,
	messageId,
	messageText,
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

const FullNameWithUserId = { ...fullName, userId };

const status = statics.object({ isActive });

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
	isActive,
	language,
	lastName,
	messageText,
	messageId,
	newUser,
	ok,
	participantId,
	phoneNumber,
	senderId,
	status,
	clientId,
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
	countries,
	country,
	fullName,
	FullNameWithUserId,
	messageItem,
	messages,
	participants,
	privateChat,
	sender,
	status,
	user,
};

export const fields = {
	collection,
	single,
	statics,
};
