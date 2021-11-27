const {
	chatError: {
		CHAT_ID_EXIST,
		CHAT_ID_INVALID_TYPE,
		CHAT_ID_MAX_LENGTH_REACH,
		CHAT_ID_MIN_LENGTH_REACH,
		CHAT_ID_REQUIRED,
		CREATED_AT_INVALID_TYPE,
		MESSAGE_ID_EXIST,
		MESSAGE_ID_INVALID_TYPE,
		MESSAGE_ID_MAX_LENGTH_REACH,
		MESSAGE_ID_MIN_LENGTH_REACH,
		MESSAGE_ID_REQUIRED,
		MESSAGE_TEXT_INVALID_TYPE,
		MESSAGE_TEXT_MAX_LENGTH_REACH,
		MESSAGE_TEXT_MIN_LENGTH_REACH,
		PARTICIPANT_ID_INVALID_TYPE,
		PARTICIPANT_ID_EXIST,
		PARTICIPANT_ID_REQUIRED,
		PARTICIPANT_ID_MIN_LENGTH_REACH,
		PARTICIPANT_ID_MAX_LENGTH_REACH,
	},
} = require("~/constant/error/chatError/chatError");

const fn = (value, error = { reason: "undefined", message: "undefined" }) => ({
	value,
	error,
});

const chatSchemaTemplate = {
	chatID: {
		type: fn("string", CHAT_ID_INVALID_TYPE),
		unique: fn(true, CHAT_ID_EXIST),
		required: fn(true, CHAT_ID_REQUIRED),
		minlength: fn(30, CHAT_ID_MIN_LENGTH_REACH),
		maxlength: fn(35, CHAT_ID_MAX_LENGTH_REACH),
		trim: fn(true, "undefined"),
	},
	chatParticipants: [
		{
			participantID: {
				type: fn("string", PARTICIPANT_ID_INVALID_TYPE),
				unique: fn(true, PARTICIPANT_ID_EXIST),
				required: fn(true, PARTICIPANT_ID_REQUIRED),
				minlength: fn(35, PARTICIPANT_ID_MIN_LENGTH_REACH),
				maxlength: fn(40, PARTICIPANT_ID_MAX_LENGTH_REACH),
				trim: fn(true, "undefined"),
			},
			status: {},
			visibility: {},
		},
	],
	messages: [
		{
			createdAt: {
				type: fn("date", CREATED_AT_INVALID_TYPE),
				required: fn(true, "undefined"),
				default: fn(Date.now, "undefined"),
			},
			messageID: {
				type: fn("string", MESSAGE_ID_INVALID_TYPE),
				unique: fn(true, MESSAGE_ID_EXIST),
				required: fn(true, MESSAGE_ID_REQUIRED),
				minlength: fn(30, MESSAGE_ID_MIN_LENGTH_REACH),
				maxlength: fn(35, MESSAGE_ID_MAX_LENGTH_REACH),
				trim: fn(true, "undefined"),
			},
			messageText: {
				type: fn("string", MESSAGE_TEXT_INVALID_TYPE),
				minlength: fn(1, MESSAGE_TEXT_MIN_LENGTH_REACH),
				maxlength: fn(10, MESSAGE_TEXT_MAX_LENGTH_REACH),
			},
			sender: {},
			status: {},
		},
	],
};

module.exports = { chatSchemaTemplate };
