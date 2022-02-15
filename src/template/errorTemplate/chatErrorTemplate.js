const CHAT_EXIST = {
	properties: { message: "chat is already initialized", code: 4000, reason: "CHAT_EXIST" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_ID_EXIST = {
	properties: { message: "", code: 4001, reason: "CHAT_ID_EXIST" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_ID_INVALID_TYPE = {
	properties: { message: "", code: 4002, reason: "CHAT_ID_INVALID_TYPE" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_ID_MAX_LENGTH_REACH = {
	properties: { message: "", code: 4003, reason: "CHAT_ID_MAX_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_ID_MIN_LENGTH_REACH = {
	properties: { message: "", code: 4004, reason: "CHAT_ID_MIN_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_ID_REQUIRED = {
	properties: { message: "", code: 4005, reason: "CHAT_ID_REQUIRED" },
	info: {
		version: "1.0.0",
	},
};
const CHAT_NOT_EXIST = {
	properties: {
		message: "chat not exist, maybe deleted or something :)",

		code: 4006,
		reason: "CHAT_NOT_EXIST",
	},
	info: {
		version: "1.0.0",
	},
};
const CREATED_AT_INVALID_TYPE = {
	properties: { message: "", code: 4007, reason: "CREATED_AT_INVALID_TYPE" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_ID_EXIST = {
	properties: { message: "", code: 4008, reason: "MESSAGE_ID_EXIST" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_ID_INVALID_TYPE = {
	properties: { message: "", code: 4009, reason: "MESSAGE_ID_INVALID_TYPE" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_ID_MAX_LENGTH_REACH = {
	properties: { message: "", code: 4010, reason: "MESSAGE_ID_MAX_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_ID_MIN_LENGTH_REACH = {
	properties: { message: "", code: 4011, reason: "MESSAGE_ID_MIN_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_ID_REQUIRED = {
	properties: { message: "", code: 4012, reason: "MESSAGE_ID_REQUIRED" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_TEXT_INVALID_TYPE = {
	properties: { message: "", code: 4013, reason: "MESSAGE_TEXT_INVALID_TYPE" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_TEXT_MAX_LENGTH_REACH = {
	properties: { message: "", code: 4014, reason: "MESSAGE_TEXT_MAX_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const MESSAGE_TEXT_MIN_LENGTH_REACH = {
	properties: { message: "", code: 4015, reason: "MESSAGE_TEXT_MIN_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_ID_EXIST = {
	properties: { message: "", code: 4016, reason: "PARTICIPANT_ID_EXIST" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_ID_INVALID_TYPE = {
	properties: { message: "", code: 4017, reason: "PARTICIPANT_ID_INVALID_TYPE" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_ID_MAX_LENGTH_REACH = {
	properties: { message: "", code: 4018, reason: "PARTICIPANT_ID_MAX_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_ID_MIN_LENGTH_REACH = {
	properties: { message: "", code: 4019, reason: "PARTICIPANT_ID_MIN_LENGTH_REACH" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_ID_REQUIRED = {
	properties: { message: "", code: 4020, reason: "PARTICIPANT_ID_REQUIRED" },
	info: {
		version: "1.0.0",
	},
};
const PARTICIPANT_NOT_EXIST = {
	properties: { message: "", code: 4021, reason: "PARTICIPANT_NOT_EXIST" },
	info: {
		version: "1.0.0",
	},
};
const USER_NO_LONGER_PARTICIPANT = {
	properties: { message: "", code: 4022, reason: "USER_NO_LONGER_PARTICIPANT" },
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
