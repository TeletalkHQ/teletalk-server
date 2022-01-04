//* Using in mongoose schema and validators

const { commonSchemaTemplate } = require("~/template/schemaTemplate/commonSchemaTemplate");

const {
	userErrorTemplate: {
		BIO_INVALID_TYPE,
		BIO_MAXLENGTH_REACH,
		BIO_MINLENGTH_REACH,
		BLACKLIST_INVALID_TYPE,
		CONTACT_INVALID_TYPE,
		COUNTRY_CODE_INVALID_TYPE,
		COUNTRY_CODE_MAXLENGTH_REACH,
		COUNTRY_CODE_MINLENGTH_REACH,
		COUNTRY_CODE_REQUIRED,
		COUNTRY_NAME_INVALID_TYPE,
		COUNTRY_NAME_MAXLENGTH_REACH,
		COUNTRY_NAME_MINLENGTH_REACH,
		COUNTRY_NAME_REQUIRED,
		FIRST_NAME_INVALID_TYPE,
		FIRST_NAME_MAXLENGTH_REACH,
		FIRST_NAME_MINLENGTH_REACH,
		FIRST_NAME_REQUIRED,
		LAST_NAME_INVALID_TYPE,
		LAST_NAME_MAXLENGTH_REACH,
		LAST_NAME_MINLENGTH_REACH,
		MAC_ADDRESS_EXIST,
		MAC_ADDRESS_INVALID_TYPE,
		MAC_ADDRESS_MAXLENGTH_REACH,
		MAC_ADDRESS_MINLENGTH_REACH,
		MAC_ADDRESS_REQUIRED,
		PHONE_NUMBER_EXIST,
		PHONE_NUMBER_INVALID_TYPE,
		PHONE_NUMBER_MAXLENGTH_REACH,
		PHONE_NUMBER_MINLENGTH_REACH,
		PHONE_NUMBER_REQUIRED,
		PRIVATE_ID_EXIST,
		PRIVATE_ID_INVALID_TYPE,
		PRIVATE_ID_MAX_LENGTH_REACH,
		PRIVATE_ID_MIN_LENGTH_REACH,
		PRIVATE_ID_REQUIRED,
		TOKEN_EXIST,
		TOKEN_INVALID_TYPE,
		TOKEN_REQUIRED,
		USERNAME_EXIST,
		USERNAME_INVALID_TYPE,
		USERNAME_MAXLENGTH_REACH,
		USERNAME_MINLENGTH_REACH,
		VERIFICATION_CODE_INVALID_LENGTH,
		VERIFICATION_CODE_INVALID_TYPE,
	},
} = require("~/template/errorTemplate/userErrorTemplate");

const fn = (value, error = { reason: "undefined", message: "undefined" }) => ({
	value,
	error,
});

const bio = {
	default: fn("", "undefined"),
	maxlength: fn(255, BIO_MAXLENGTH_REACH),
	minlength: fn(1, BIO_MINLENGTH_REACH),
	required: fn(false, "undefined"),
	type: fn("string", BIO_INVALID_TYPE),
	version: "1.0.0",
};

const blacklist = {
	default: fn([], "undefined"),
	type: fn("array", BLACKLIST_INVALID_TYPE),
	version: "1.0.0",
};

const contacts = {
	default: fn([], "undefined"),
	maxlength: fn(14, "undefined"),
	minlength: fn(10, "undefined"),
	required: fn(false, "undefined"),
	type: fn("array", CONTACT_INVALID_TYPE),
	version: "1.0.0",
};

const countryCode = {
	maxlength: fn(8, COUNTRY_CODE_MAXLENGTH_REACH),
	minlength: fn(2, COUNTRY_CODE_MINLENGTH_REACH),
	required: fn(true, COUNTRY_CODE_REQUIRED),
	trim: fn(true, "undefined"),
	type: fn("string", COUNTRY_CODE_INVALID_TYPE),
	version: "1.0.0",
};

const countryName = {
	maxlength: fn(32, COUNTRY_NAME_MAXLENGTH_REACH),
	minlength: fn(2, COUNTRY_NAME_MINLENGTH_REACH),
	required: fn(true, COUNTRY_NAME_REQUIRED),
	type: fn("string", COUNTRY_NAME_INVALID_TYPE),
	version: "1.0.0",
};

const createdAt = commonSchemaTemplate.createdAt;

const firstName = {
	maxlength: fn(18, FIRST_NAME_MAXLENGTH_REACH),
	minlength: fn(1, FIRST_NAME_MINLENGTH_REACH),
	required: fn(true, FIRST_NAME_REQUIRED),
	trim: fn(false, "undefined"),
	type: fn("string", FIRST_NAME_INVALID_TYPE),
	version: "1.0.0",
};

const lastName = {
	default: fn("", "undefined"),
	maxlength: fn(18, LAST_NAME_MAXLENGTH_REACH),
	minlength: fn(1, LAST_NAME_MINLENGTH_REACH),
	required: [false],
	trim: fn(false, "undefined"),
	type: fn("string", LAST_NAME_INVALID_TYPE),
	version: "1.0.0",
};

const macAddress = {
	maxlength: fn(16, MAC_ADDRESS_MAXLENGTH_REACH),
	minlength: fn(12, MAC_ADDRESS_MINLENGTH_REACH),
	required: fn(true, MAC_ADDRESS_REQUIRED),
	trim: fn(true, "undefined"),
	type: fn("string", MAC_ADDRESS_INVALID_TYPE),
	unique: fn(true, MAC_ADDRESS_EXIST),
	version: "1.0.0",
};

const phoneNumber = {
	maxlength: fn(14, PHONE_NUMBER_MAXLENGTH_REACH),
	minlength: fn(10, PHONE_NUMBER_MINLENGTH_REACH),
	required: fn(true, PHONE_NUMBER_REQUIRED),
	type: fn("string", PHONE_NUMBER_INVALID_TYPE),
	unique: fn(true, PHONE_NUMBER_EXIST),
	version: "1.0.0",
};

const privateID = {
	maxlength: fn(35, PRIVATE_ID_MAX_LENGTH_REACH),
	minlength: fn(30, PRIVATE_ID_MIN_LENGTH_REACH),
	required: fn(true, PRIVATE_ID_REQUIRED),
	trim: fn(true, "undefined"),
	type: fn("string", PRIVATE_ID_INVALID_TYPE),
	unique: fn(true, PRIVATE_ID_EXIST),
	version: "1.0.0",
};

const token = {
	required: fn(true, TOKEN_REQUIRED),
	type: fn("string", TOKEN_INVALID_TYPE),
	unique: fn(true, TOKEN_EXIST),
	version: "1.0.0",
};

const username = {
	default: fn("", "undefined"),
	lowercase: fn(true, "undefined"),
	maxlength: fn(12, USERNAME_MAXLENGTH_REACH),
	minlength: fn(4, USERNAME_MINLENGTH_REACH),
	required: fn(false, "undefined"),
	trim: fn(true, "undefined"),
	type: fn("string", USERNAME_INVALID_TYPE),
	unique: fn(false, USERNAME_EXIST),
	version: "1.0.0",
};

const verificationCode = {
	length: fn(6, VERIFICATION_CODE_INVALID_LENGTH),
	trim: fn(true, "undefined"),
	type: fn("string", VERIFICATION_CODE_INVALID_TYPE),
	version: "1.0.0",
};

const userSchemaTemplate = {
	version: "1.0.0",

	bio,
	blacklist,
	contacts,
	countryCode,
	countryName,
	createdAt,
	firstName,
	lastName,
	macAddress,
	phoneNumber,
	privateID,
	token,
	username,
	verificationCode,
};

module.exports = {
	userSchemaTemplate,

	bio,
	blacklist,
	contacts,
	countryCode,
	countryName,
	createdAt,
	firstName,
	lastName,
	macAddress,
	phoneNumber,
	privateID,
	token,
	username,
	verificationCode,
};
