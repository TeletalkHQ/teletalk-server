const CHAT_EXIST = {
	properties: { message: "chat is already initialized", reason: "CHAT_EXIST" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_ID_EXIST = {
	properties: { message: "", reason: "CHAT_ID_EXIST" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_ID_INVALID_TYPE = {
	properties: { message: "", reason: "CHAT_ID_INVALID_TYPE" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_ID_MAX_LENGTH_REACH = {
	properties: { message: "", reason: "CHAT_ID_MAX_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_ID_MIN_LENGTH_REACH = {
	properties: { message: "", reason: "CHAT_ID_MIN_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_ID_REQUIRED = {
	properties: { message: "", reason: "CHAT_ID_REQUIRED" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_NOT_EXIST = {
	properties: {
		message: "chat not exist, maybe deleted or something :)",
		reason: "CHAT_NOT_EXIST",
	},
	info: {
		version: "1.0.0",
	},
};
const CREATED_AT_INVALID_TYPE = {
	properties: { message: "", reason: "CREATED_AT_INVALID_TYPE" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_ID_EXIST = {
	properties: { message: "", reason: "MESSAGE_ID_EXIST" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_ID_INVALID_TYPE = {
	properties: { message: "", reason: "MESSAGE_ID_INVALID_TYPE" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_ID_MAX_LENGTH_REACH = {
	properties: { message: "", reason: "MESSAGE_ID_MAX_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_ID_MIN_LENGTH_REACH = {
	properties: { message: "", reason: "MESSAGE_ID_MIN_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_ID_REQUIRED = {
	properties: { message: "", reason: "MESSAGE_ID_REQUIRED" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_TEXT_INVALID_TYPE = {
	properties: { message: "", reason: "MESSAGE_TEXT_INVALID_TYPE" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_TEXT_MAX_LENGTH_REACH = {
	properties: { message: "", reason: "MESSAGE_TEXT_MAX_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_TEXT_MIN_LENGTH_REACH = {
	properties: { message: "", reason: "MESSAGE_TEXT_MIN_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_ID_EXIST = {
	properties: { message: "", reason: "PARTICIPANT_ID_EXIST" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_ID_INVALID_TYPE = {
	properties: { message: "", reason: "PARTICIPANT_ID_INVALID_TYPE" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_ID_MAX_LENGTH_REACH = {
	properties: { message: "", reason: "PARTICIPANT_ID_MAX_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_ID_MIN_LENGTH_REACH = {
	properties: { message: "", reason: "PARTICIPANT_ID_MIN_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_ID_REQUIRED = {
	properties: { message: "", reason: "PARTICIPANT_ID_REQUIRED" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_NOT_EXIST = {
	properties: { message: "", reason: "PARTICIPANT_NOT_EXIST" },
	info: {
		version: "1.0.0",
	},
};
const USER_NO_LONGER_PARTICIPANT = {
	properties: { message: "", reason: "USER_NO_LONGER_PARTICIPANT" },
	info: {
		version: "1.0.0",
	},
};

const chatErrorTemplate = {
	info: {
		version: "1.0.0",
	},

	CHAT_EXIST,
	CHAT_ID_EXIST,
	CHAT_ID_INVALID_TYPE,
	CHAT_ID_MAX_LENGTH_REACH,
	CHAT_ID_MIN_LENGTH_REACH,
	CHAT_ID_REQUIRED,
	CHAT_NOT_EXIST,
	CREATED_AT_INVALID_TYPE,
	MESSAGE_ID_EXIST,
	MESSAGE_ID_INVALID_TYPE,
	MESSAGE_ID_MAX_LENGTH_REACH,
	MESSAGE_ID_MIN_LENGTH_REACH,
	MESSAGE_ID_REQUIRED,
	MESSAGE_TEXT_INVALID_TYPE,
	MESSAGE_TEXT_MAX_LENGTH_REACH,
	MESSAGE_TEXT_MIN_LENGTH_REACH,
	PARTICIPANT_ID_EXIST,
	PARTICIPANT_ID_INVALID_TYPE,
	PARTICIPANT_ID_MAX_LENGTH_REACH,
	PARTICIPANT_ID_MIN_LENGTH_REACH,
	PARTICIPANT_ID_REQUIRED,
	PARTICIPANT_NOT_EXIST,
	USER_NO_LONGER_PARTICIPANT,
};

module.exports = {
	chatErrorTemplate,

	CHAT_EXIST,
	CHAT_ID_EXIST,
	CHAT_ID_INVALID_TYPE,
	CHAT_ID_MAX_LENGTH_REACH,
	CHAT_ID_MIN_LENGTH_REACH,
	CHAT_ID_REQUIRED,
	CHAT_NOT_EXIST,
	CREATED_AT_INVALID_TYPE,
	MESSAGE_ID_EXIST,
	MESSAGE_ID_INVALID_TYPE,
	MESSAGE_ID_MAX_LENGTH_REACH,
	MESSAGE_ID_MIN_LENGTH_REACH,
	MESSAGE_ID_REQUIRED,
	MESSAGE_TEXT_INVALID_TYPE,
	MESSAGE_TEXT_MAX_LENGTH_REACH,
	MESSAGE_TEXT_MIN_LENGTH_REACH,
	PARTICIPANT_ID_EXIST,
	PARTICIPANT_ID_INVALID_TYPE,
	PARTICIPANT_ID_MAX_LENGTH_REACH,
	PARTICIPANT_ID_MIN_LENGTH_REACH,
	PARTICIPANT_ID_REQUIRED,
	PARTICIPANT_NOT_EXIST,
	USER_NO_LONGER_PARTICIPANT,
};
