//* Using in mongoose schema and validators

const {
	userError: {
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
		CREATED_AT_INVALID_TYPE,
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
		PHONE_NUMBER_INVALID_TYPE,
		PHONE_NUMBER_EXIST,
		PHONE_NUMBER_REQUIRED,
		PHONE_NUMBER_MINLENGTH_REACH,
		PHONE_NUMBER_MAXLENGTH_REACH,
		PRIVATE_ID_EXIST,
		PRIVATE_ID_INVALID_TYPE,
		PRIVATE_ID_MAX_LENGTH_REACH,
		PRIVATE_ID_MIN_LENGTH_REACH,
		PRIVATE_ID_REQUIRED,
		TOKEN_EXIST,
		TOKEN_REQUIRED,
		TOKEN_INVALID_TYPE,
		USERNAME_EXIST,
		USERNAME_INVALID_TYPE,
		USERNAME_MAXLENGTH_REACH,
		USERNAME_MINLENGTH_REACH,
		VERIFICATION_CODE_INVALID_LENGTH,
		VERIFICATION_CODE_INVALID_TYPE,
	},
} = require("~/constant/error/userError/userError");

const fn = (value, error) => ({ value, error });

const userSchemaTemplate = {
	bio: {
		type: fn("string", BIO_INVALID_TYPE),
		required: [false],
		Type: fn(String, BIO_INVALID_TYPE),
		minlength: fn(1, BIO_MINLENGTH_REACH),
		maxlength: fn(255, BIO_MAXLENGTH_REACH),
		default: fn("", "undefined"),
	},
	blacklist: {
		type: fn("array", BLACKLIST_INVALID_TYPE),
		Type: fn(Array, BLACKLIST_INVALID_TYPE),
		default: fn([], "undefined"),
	},
	contacts: {
		type: fn("array", CONTACT_INVALID_TYPE),
		Type: fn(Array, CONTACT_INVALID_TYPE),
		minlength: fn(10, "undefined"),
		maxlength: fn(14, "undefined"),
		required: fn(false, "undefined"),
		default: fn([], "undefined"),
	},
	countryCode: {
		type: fn("string", COUNTRY_CODE_INVALID_TYPE),
		Type: fn(String, COUNTRY_CODE_INVALID_TYPE),
		required: fn(true, COUNTRY_CODE_REQUIRED),
		minlength: fn(2, COUNTRY_CODE_MINLENGTH_REACH),
		maxlength: fn(8, COUNTRY_CODE_MAXLENGTH_REACH),
		trim: fn(true, "undefined"),
	},
	countryName: {
		type: fn("string", COUNTRY_NAME_INVALID_TYPE),
		Type: fn(String, COUNTRY_NAME_INVALID_TYPE),
		required: fn(true, COUNTRY_NAME_REQUIRED),
		minlength: fn(2, COUNTRY_NAME_MINLENGTH_REACH),
		maxlength: fn(32, COUNTRY_NAME_MAXLENGTH_REACH),
	},
	createdAt: {
		type: fn("date", CREATED_AT_INVALID_TYPE),
		Type: fn(Date, CREATED_AT_INVALID_TYPE),
		required: fn(true, "undefined"),
		default: fn(Date.now, "undefined"),
	},
	firstName: {
		type: fn("string", FIRST_NAME_INVALID_TYPE),
		Type: fn(String, FIRST_NAME_INVALID_TYPE),
		required: fn(true, FIRST_NAME_REQUIRED),
		minlength: fn(1, FIRST_NAME_MINLENGTH_REACH),
		maxlength: fn(18, FIRST_NAME_MAXLENGTH_REACH),
		trim: fn(false, "undefined"),
	},
	lastName: {
		type: fn("string", LAST_NAME_INVALID_TYPE),
		Type: fn(String, LAST_NAME_INVALID_TYPE),
		required: [false],
		minlength: fn(1, LAST_NAME_MINLENGTH_REACH),
		maxlength: fn(18, LAST_NAME_MAXLENGTH_REACH),
		trim: fn(false, "undefined"),
		default: fn("", "undefined"),
	},
	macAddress: {
		type: fn("string", MAC_ADDRESS_INVALID_TYPE),
		Type: fn(String, MAC_ADDRESS_INVALID_TYPE),
		unique: fn(true, MAC_ADDRESS_EXIST),
		required: fn(true, MAC_ADDRESS_REQUIRED),
		minlength: fn(12, MAC_ADDRESS_MINLENGTH_REACH),
		maxlength: fn(16, MAC_ADDRESS_MAXLENGTH_REACH),
		trim: fn(true, "undefined"),
	},
	phoneNumber: {
		type: fn("string", PHONE_NUMBER_INVALID_TYPE),
		Type: fn(String, PHONE_NUMBER_INVALID_TYPE),
		unique: fn(true, PHONE_NUMBER_EXIST),
		required: fn(true, PHONE_NUMBER_REQUIRED),
		minlength: fn(10, PHONE_NUMBER_MINLENGTH_REACH),
		maxlength: fn(14, PHONE_NUMBER_MAXLENGTH_REACH),
	},
	privateID: {
		type: fn("string", PRIVATE_ID_INVALID_TYPE),
		Type: fn(String, PRIVATE_ID_INVALID_TYPE),
		unique: fn(true, PRIVATE_ID_EXIST),
		required: fn(true, PRIVATE_ID_REQUIRED),
		minlength: fn(30, PRIVATE_ID_MIN_LENGTH_REACH),
		maxlength: fn(35, PRIVATE_ID_MAX_LENGTH_REACH),
		trim: fn(true, "undefined"),
	},
	tokens: {
		type: fn("array", TOKEN_INVALID_TYPE),
		Type: fn(Array, TOKEN_INVALID_TYPE),
		unique: fn(true, TOKEN_EXIST),
		required: fn(true, TOKEN_REQUIRED),
	},
	username: {
		type: fn("string", USERNAME_INVALID_TYPE),
		Type: fn(String, USERNAME_INVALID_TYPE),
		unique: fn(false, USERNAME_EXIST),
		required: [false],
		minlength: fn(4, USERNAME_MINLENGTH_REACH),
		maxlength: fn(12, USERNAME_MAXLENGTH_REACH),
		trim: fn(true, "undefined"),
		lowercase: fn(true, "undefined"),
		default: fn("", "undefined"),
	},
	verificationCode: {
		type: fn("string", VERIFICATION_CODE_INVALID_TYPE),
		Type: fn(String, VERIFICATION_CODE_INVALID_TYPE),
		length: fn(6, VERIFICATION_CODE_INVALID_LENGTH),
		trim: fn(true, "undefined"),
	},
};

module.exports = { userSchemaTemplate };
