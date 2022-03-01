const { randomID } = require("~/function/utility/randomID");
const {
	schemaPropertyKeyGenerator,
	schemaTemplateGenerator,
} = require("~/function/utility/generators");

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

const chatID = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(35, CHAT_ID_MAX_LENGTH_REACH),
	schemaPropertyKeyGenerator(30, CHAT_ID_MIN_LENGTH_REACH),
	schemaPropertyKeyGenerator(true, CHAT_ID_REQUIRED),
	schemaPropertyKeyGenerator(true),
	schemaPropertyKeyGenerator("string", CHAT_ID_INVALID_TYPE),
	schemaPropertyKeyGenerator(true, CHAT_ID_EXIST),
	"1.0.0",
);

const createdAt = commonSchemaTemplate.createdAt;

const messageID = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(45, MESSAGE_ID_MAX_LENGTH_REACH),
	schemaPropertyKeyGenerator(40, MESSAGE_ID_MIN_LENGTH_REACH),
	schemaPropertyKeyGenerator(true, MESSAGE_ID_REQUIRED),
	schemaPropertyKeyGenerator(true),
	schemaPropertyKeyGenerator("string", MESSAGE_ID_INVALID_TYPE),
	schemaPropertyKeyGenerator(true, MESSAGE_ID_EXIST),
	schemaPropertyKeyGenerator(randomID),
	"1.0.0",
);

const messageSender = schemaTemplateGenerator("1.0.0");

const messageStatus = schemaTemplateGenerator("1.0.0");

const message = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(10, MESSAGE_TEXT_MAX_LENGTH_REACH),
	schemaPropertyKeyGenerator(1, MESSAGE_TEXT_MIN_LENGTH_REACH),
	null,
	null,
	schemaPropertyKeyGenerator("string", MESSAGE_TEXT_INVALID_TYPE),
	null,
	null,
	"1.0.0",
);

const participantID = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(privateID.maxlength.value, PARTICIPANT_ID_MAX_LENGTH_REACH),
	schemaPropertyKeyGenerator(privateID.minlength.value, PARTICIPANT_ID_MIN_LENGTH_REACH),
	schemaPropertyKeyGenerator(privateID.required.value, PARTICIPANT_ID_REQUIRED),
	schemaPropertyKeyGenerator(privateID.trim.value),
	schemaPropertyKeyGenerator(privateID.type.value, PARTICIPANT_ID_INVALID_TYPE),
	schemaPropertyKeyGenerator(privateID.unique.value, PARTICIPANT_ID_EXIST),
	null,
	"1.0.0",
);

const participantStatus = schemaTemplateGenerator("1.0.0");

const participantVisibility = schemaTemplateGenerator("1.0.0");

const chatSchemaTemplate = {
	version: "1.0.0",

	chatID,
	createdAt,
	message,
	messageID,
	messageSender,
	messageStatus,
	participantID,
	participantStatus,
	participantVisibility,
};

module.exports = {
	chatSchemaTemplate,
};
