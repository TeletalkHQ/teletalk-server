const { randomID } = require("~/function/utility/randomID");

const {
	userSchemaTemplate: {
		privateID: { properties: privateID },
	},
} = require("~/template/schemaTemplate/userSchemaTemplate");

const { commonSchemaTemplate } = require("~/template/schemaTemplate/commonSchemaTemplate");

const {
	chatErrorTemplate: {
		CHAT_ID_EXIST: { properties: CHAT_ID_EXIST },
		CHAT_ID_INVALID_TYPE: { properties: CHAT_ID_INVALID_TYPE },
		CHAT_ID_MAX_LENGTH_REACH: { properties: CHAT_ID_MAX_LENGTH_REACH },
		CHAT_ID_MIN_LENGTH_REACH: { properties: CHAT_ID_MIN_LENGTH_REACH },
		CHAT_ID_REQUIRED: { properties: CHAT_ID_REQUIRED },
		MESSAGE_ID_EXIST: { properties: MESSAGE_ID_EXIST },
		MESSAGE_ID_INVALID_TYPE: { properties: MESSAGE_ID_INVALID_TYPE },
		MESSAGE_ID_MAX_LENGTH_REACH: { properties: MESSAGE_ID_MAX_LENGTH_REACH },
		MESSAGE_ID_MIN_LENGTH_REACH: { properties: MESSAGE_ID_MIN_LENGTH_REACH },
		MESSAGE_ID_REQUIRED: { properties: MESSAGE_ID_REQUIRED },
		MESSAGE_TEXT_INVALID_TYPE: { properties: MESSAGE_TEXT_INVALID_TYPE },
		MESSAGE_TEXT_MAX_LENGTH_REACH: { properties: MESSAGE_TEXT_MAX_LENGTH_REACH },
		MESSAGE_TEXT_MIN_LENGTH_REACH: { properties: MESSAGE_TEXT_MIN_LENGTH_REACH },
		PARTICIPANT_ID_EXIST: { properties: PARTICIPANT_ID_EXIST },
		PARTICIPANT_ID_INVALID_TYPE: { properties: PARTICIPANT_ID_INVALID_TYPE },
		PARTICIPANT_ID_MAX_LENGTH_REACH: { properties: PARTICIPANT_ID_MAX_LENGTH_REACH },
		PARTICIPANT_ID_MIN_LENGTH_REACH: { properties: PARTICIPANT_ID_MIN_LENGTH_REACH },
		PARTICIPANT_ID_REQUIRED: { properties: PARTICIPANT_ID_REQUIRED },
	},
} = require("~/template/errorTemplate/chatErrorTemplate");

const fn = (value, error = { reason: "undefined", message: "undefined" }) => ({
	value,
	error,
});

const chatID = {
	properties: {
		maxlength: fn(35, CHAT_ID_MAX_LENGTH_REACH),
		minlength: fn(30, CHAT_ID_MIN_LENGTH_REACH),
		required: fn(true, CHAT_ID_REQUIRED),
		trim: fn(true, "undefined"),
		type: fn("string", CHAT_ID_INVALID_TYPE),
		unique: fn(true, CHAT_ID_EXIST),
	},
	info: {
		version: "1.0.0",
	},
};

const createdAt = commonSchemaTemplate.createdAt;

const messageID = {
	properties: {
		default: fn(randomID, "undefined"),
		maxlength: fn(45, MESSAGE_ID_MAX_LENGTH_REACH),
		minlength: fn(40, MESSAGE_ID_MIN_LENGTH_REACH),
		required: fn(true, MESSAGE_ID_REQUIRED),
		trim: fn(true, "undefined"),
		type: fn("string", MESSAGE_ID_INVALID_TYPE),
		unique: fn(true, MESSAGE_ID_EXIST),
	},
	info: {
		version: "1.0.0",
	},
};

const messageSender = {
	info: {
		version: "1.0.0",
	},
};

const messageStatus = {
	info: {
		version: "1.0.0",
	},
};

const messageText = {
	properties: {
		maxlength: fn(10, MESSAGE_TEXT_MAX_LENGTH_REACH),
		minlength: fn(1, MESSAGE_TEXT_MIN_LENGTH_REACH),
		type: fn("string", MESSAGE_TEXT_INVALID_TYPE),
	},
	info: {
		version: "1.0.0",
	},
};

const participantID = {
	properties: {
		maxlength: fn(privateID.maxlength.value, PARTICIPANT_ID_MAX_LENGTH_REACH),
		minlength: fn(privateID.minlength.value, PARTICIPANT_ID_MIN_LENGTH_REACH),
		required: fn(privateID.required.value, PARTICIPANT_ID_REQUIRED),
		trim: fn(privateID.trim.value, "undefined"),
		type: fn(privateID.type.value, PARTICIPANT_ID_INVALID_TYPE),
		unique: fn(privateID.unique.value, PARTICIPANT_ID_EXIST),
	},
	info: {
		version: "1.0.0",
	},
};

const participantStatus = {
	info: {
		version: "1.0.0",
	},
};

const participantVisibility = {
	info: {
		version: "1.0.0",
	},
};

const chatSchemaTemplate = {
	info: {
		version: "1.0.0",
	},

	chatID,
	createdAt,
	messageID,
	messageSender,
	messageStatus,
	messageText,
	participantID,
	participantStatus,
	participantVisibility,
};

module.exports = {
	chatSchemaTemplate,

	chatID,
	createdAt,
	messageID,
	messageSender,
	messageStatus,
	messageText,
	participantID,
	participantStatus,
	participantVisibility,
};
