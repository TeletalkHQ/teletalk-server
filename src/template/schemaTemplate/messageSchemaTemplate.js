const {
	messageError: {
		CREATED_AT_INVALID_TYPE,
		MESSAGE_ID_INVALID_TYPE,
		MESSAGE_ID_EXIST,
		MESSAGE_ID_REQUIRED,
		MESSAGE_ID_MIN_LENGTH_REACH,
		MESSAGE_ID_MAX_LENGTH_REACH,
	},
} = require("~/constant/error/userError/messageError");

const fn = (value, error = { reason: "undefined", message: "undefined" }) => ({
	value,
	error,
});

const messageSchemaTemplate = {
	messageID: {
		type: fn("string", MESSAGE_ID_INVALID_TYPE),
		Type: fn(String, MESSAGE_ID_INVALID_TYPE),
		unique: fn(true, MESSAGE_ID_EXIST),
		required: fn(true, MESSAGE_ID_REQUIRED),
		minlength: fn(30, MESSAGE_ID_MIN_LENGTH_REACH),
		maxlength: fn(35, MESSAGE_ID_MAX_LENGTH_REACH),
		trim: fn(true, "undefined"),
	},
	createdAt: {
		type: fn("date", CREATED_AT_INVALID_TYPE),
		Type: fn(Date, CREATED_AT_INVALID_TYPE),
		required: fn(true, "undefined"),
		default: fn(Date.now, "undefined"),
	},
};

module.exports = { messageSchemaTemplate };
