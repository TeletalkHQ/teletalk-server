const {
	chatError: {
		CHAT_ID_INVALID_TYPE,
		CHAT_ID_EXIST,
		CHAT_ID_REQUIRED,
		CHAT_ID_MIN_LENGTH_REACH,
		CHAT_ID_MAX_LENGTH_REACH,
		CREATED_AT_INVALID_TYPE,
		MESSAGE_ID_INVALID_TYPE,
		MESSAGE_ID_EXIST,
		MESSAGE_ID_REQUIRED,
		MESSAGE_ID_MIN_LENGTH_REACH,
		MESSAGE_ID_MAX_LENGTH_REACH,
	},
} = require("~/constant/error/chatError/chatError");

const fn = (value, error = { reason: "undefined", message: "undefined" }) => ({
	value,
	error,
});

const chatSchemaTemplate = {
	chatID: {
		type: fn("string", CHAT_ID_INVALID_TYPE),
		Type: fn(String, CHAT_ID_INVALID_TYPE),
		unique: fn(true, CHAT_ID_EXIST),
		required: fn(true, CHAT_ID_REQUIRED),
		minlength: fn(30, CHAT_ID_MIN_LENGTH_REACH),
		maxlength: fn(35, CHAT_ID_MAX_LENGTH_REACH),
		trim: fn(true, "undefined"),
	},
	messages: [
		{
			messageID: {
				type: fn("string", MESSAGE_ID_INVALID_TYPE),
				Type: fn(String, MESSAGE_ID_INVALID_TYPE),
				unique: fn(true, MESSAGE_ID_EXIST),
				required: fn(true, MESSAGE_ID_REQUIRED),
				minlength: fn(30, MESSAGE_ID_MIN_LENGTH_REACH),
				maxlength: fn(35, MESSAGE_ID_MAX_LENGTH_REACH),
				trim: fn(true, "undefined"),
			},
			messageText: {},
			createdAt: {
				type: fn("date", CREATED_AT_INVALID_TYPE),
				Type: fn(Date, CREATED_AT_INVALID_TYPE),
				required: fn(true, "undefined"),
				default: fn(Date.now, "undefined"),
			},
		},
	],
};

module.exports = { chatSchemaTemplate };
