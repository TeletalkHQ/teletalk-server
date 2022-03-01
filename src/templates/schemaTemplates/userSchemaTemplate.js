const {
	schemaPropertyKeyGenerator,
	schemaTemplateGenerator,
} = require("~/functions/utilities/generators");

const { commonSchemaTemplate } = require("~/templates/schemaTemplates/commonSchemaTemplate");

const {
	userErrorTemplate: {
		BIO_INVALID_TYPE: { properties: BIO_INVALID_TYPE },
		BIO_MAXLENGTH_REACH: { properties: BIO_MAXLENGTH_REACH },
		BIO_MINLENGTH_REACH: { properties: BIO_MINLENGTH_REACH },
		BLACKLIST_INVALID_TYPE: { properties: BLACKLIST_INVALID_TYPE },
		CONTACT_INVALID_TYPE: { properties: CONTACT_INVALID_TYPE },
		COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
		COUNTRY_CODE_MAXLENGTH_REACH: { properties: COUNTRY_CODE_MAXLENGTH_REACH },
		COUNTRY_CODE_MINLENGTH_REACH: { properties: COUNTRY_CODE_MINLENGTH_REACH },
		COUNTRY_CODE_REQUIRED: { properties: COUNTRY_CODE_REQUIRED },
		COUNTRY_NAME_INVALID_TYPE: { properties: COUNTRY_NAME_INVALID_TYPE },
		COUNTRY_NAME_MAXLENGTH_REACH: { properties: COUNTRY_NAME_MAXLENGTH_REACH },
		COUNTRY_NAME_MINLENGTH_REACH: { properties: COUNTRY_NAME_MINLENGTH_REACH },
		COUNTRY_NAME_REQUIRED: { properties: COUNTRY_NAME_REQUIRED },
		FIRST_NAME_INVALID_TYPE: { properties: FIRST_NAME_INVALID_TYPE },
		FIRST_NAME_MAXLENGTH_REACH: { properties: FIRST_NAME_MAXLENGTH_REACH },
		FIRST_NAME_MINLENGTH_REACH: { properties: FIRST_NAME_MINLENGTH_REACH },
		FIRST_NAME_REQUIRED: { properties: FIRST_NAME_REQUIRED },
		LAST_NAME_INVALID_TYPE: { properties: LAST_NAME_INVALID_TYPE },
		LAST_NAME_MAXLENGTH_REACH: { properties: LAST_NAME_MAXLENGTH_REACH },
		LAST_NAME_MINLENGTH_REACH: { properties: LAST_NAME_MINLENGTH_REACH },
		MAC_ADDRESS_EXIST: { properties: MAC_ADDRESS_EXIST },
		MAC_ADDRESS_INVALID_TYPE: { properties: MAC_ADDRESS_INVALID_TYPE },
		MAC_ADDRESS_MAXLENGTH_REACH: { properties: MAC_ADDRESS_MAXLENGTH_REACH },
		MAC_ADDRESS_MINLENGTH_REACH: { properties: MAC_ADDRESS_MINLENGTH_REACH },
		MAC_ADDRESS_REQUIRED: { properties: MAC_ADDRESS_REQUIRED },
		PHONE_NUMBER_EXIST: { properties: PHONE_NUMBER_EXIST },
		PHONE_NUMBER_INVALID_TYPE: { properties: PHONE_NUMBER_INVALID_TYPE },
		PHONE_NUMBER_MAXLENGTH_REACH: { properties: PHONE_NUMBER_MAXLENGTH_REACH },
		PHONE_NUMBER_MINLENGTH_REACH: { properties: PHONE_NUMBER_MINLENGTH_REACH },
		PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
		PRIVATE_ID_EXIST: { properties: PRIVATE_ID_EXIST },
		PRIVATE_ID_INVALID_TYPE: { properties: PRIVATE_ID_INVALID_TYPE },
		PRIVATE_ID_MAX_LENGTH_REACH: { properties: PRIVATE_ID_MAX_LENGTH_REACH },
		PRIVATE_ID_MIN_LENGTH_REACH: { properties: PRIVATE_ID_MIN_LENGTH_REACH },
		PRIVATE_ID_REQUIRED: { properties: PRIVATE_ID_REQUIRED },
		TOKEN_EXIST: { properties: TOKEN_EXIST },
		TOKEN_INVALID_TYPE: { properties: TOKEN_INVALID_TYPE },
		TOKEN_REQUIRED: { properties: TOKEN_REQUIRED },
		USERNAME_EXIST: { properties: USERNAME_EXIST },
		USERNAME_INVALID_TYPE: { properties: USERNAME_INVALID_TYPE },
		USERNAME_MAXLENGTH_REACH: { properties: USERNAME_MAXLENGTH_REACH },
		USERNAME_MINLENGTH_REACH: { properties: USERNAME_MINLENGTH_REACH },
		VERIFICATION_CODE_INVALID_LENGTH: { properties: VERIFICATION_CODE_INVALID_LENGTH },
		VERIFICATION_CODE_INVALID_TYPE: { properties: VERIFICATION_CODE_INVALID_TYPE },
	},
} = require("~/templates/errorTemplates/userErrorTemplate");

const bio = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(255, BIO_MAXLENGTH_REACH),
	schemaPropertyKeyGenerator(1, BIO_MINLENGTH_REACH),
	schemaPropertyKeyGenerator(false),
	null,
	schemaPropertyKeyGenerator("string", BIO_INVALID_TYPE),
	null,
	schemaPropertyKeyGenerator(""),
	"1.0.0",
);

const blacklist = schemaTemplateGenerator(
	null,
	null,
	null,
	null,
	schemaPropertyKeyGenerator("array", BLACKLIST_INVALID_TYPE),
	null,
	schemaPropertyKeyGenerator([]),
	"1.0.0",
);

const contacts = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(14),
	schemaPropertyKeyGenerator(10),
	schemaPropertyKeyGenerator(false),
	null,
	schemaPropertyKeyGenerator("array", CONTACT_INVALID_TYPE),
	null,
	schemaPropertyKeyGenerator([]),
	"1.0.0",
);

const countryCode = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(8, COUNTRY_CODE_MAXLENGTH_REACH),
	schemaPropertyKeyGenerator(2, COUNTRY_CODE_MINLENGTH_REACH),
	schemaPropertyKeyGenerator(true, COUNTRY_CODE_REQUIRED),
	schemaPropertyKeyGenerator(true),
	schemaPropertyKeyGenerator("string", COUNTRY_CODE_INVALID_TYPE),
	null,
	null,
	"1.0.0",
);

const countryName = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(32, COUNTRY_NAME_MAXLENGTH_REACH),
	schemaPropertyKeyGenerator(2, COUNTRY_NAME_MINLENGTH_REACH),
	schemaPropertyKeyGenerator(true, COUNTRY_NAME_REQUIRED),
	null,
	schemaPropertyKeyGenerator("string", COUNTRY_NAME_INVALID_TYPE),
	null,
	null,
	"1.0.0",
);

const createdAt = commonSchemaTemplate.createdAt;

const firstName = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(18, FIRST_NAME_MAXLENGTH_REACH),
	schemaPropertyKeyGenerator(1, FIRST_NAME_MINLENGTH_REACH),
	schemaPropertyKeyGenerator(true, FIRST_NAME_REQUIRED),
	schemaPropertyKeyGenerator(false),
	schemaPropertyKeyGenerator("string", FIRST_NAME_INVALID_TYPE),
	null,
	null,
	"1.0.0",
);

const lastName = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(18, LAST_NAME_MAXLENGTH_REACH),
	schemaPropertyKeyGenerator(1, LAST_NAME_MINLENGTH_REACH),
	[false],
	schemaPropertyKeyGenerator(false),
	schemaPropertyKeyGenerator("string", LAST_NAME_INVALID_TYPE),
	null,
	schemaPropertyKeyGenerator(""),
	"1.0.0",
);

const macAddress = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(16, MAC_ADDRESS_MAXLENGTH_REACH),
	schemaPropertyKeyGenerator(12, MAC_ADDRESS_MINLENGTH_REACH),
	schemaPropertyKeyGenerator(true, MAC_ADDRESS_REQUIRED),
	schemaPropertyKeyGenerator(true),
	schemaPropertyKeyGenerator("string", MAC_ADDRESS_INVALID_TYPE),
	schemaPropertyKeyGenerator(true, MAC_ADDRESS_EXIST),
	null,
	"1.0.0",
);

const phoneNumber = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(14, PHONE_NUMBER_MAXLENGTH_REACH),
	schemaPropertyKeyGenerator(10, PHONE_NUMBER_MINLENGTH_REACH),
	schemaPropertyKeyGenerator(true, PHONE_NUMBER_REQUIRED),
	null,
	schemaPropertyKeyGenerator("string", PHONE_NUMBER_INVALID_TYPE),
	schemaPropertyKeyGenerator(true, PHONE_NUMBER_EXIST),
	null,
	"1.0.0",
);

const privateID = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(35, PRIVATE_ID_MAX_LENGTH_REACH),
	schemaPropertyKeyGenerator(30, PRIVATE_ID_MIN_LENGTH_REACH),
	schemaPropertyKeyGenerator(true, PRIVATE_ID_REQUIRED),
	schemaPropertyKeyGenerator(true),
	schemaPropertyKeyGenerator("string", PRIVATE_ID_INVALID_TYPE),
	schemaPropertyKeyGenerator(true, PRIVATE_ID_EXIST),
	null,
	"1.0.0",
);

const token = schemaTemplateGenerator(
	null,
	null,
	schemaPropertyKeyGenerator(true, TOKEN_REQUIRED),
	null,
	schemaPropertyKeyGenerator("string", TOKEN_INVALID_TYPE),
	schemaPropertyKeyGenerator(true, TOKEN_EXIST),
	null,
	"1.0.0",
);

const username = schemaTemplateGenerator(
	schemaPropertyKeyGenerator(12, USERNAME_MAXLENGTH_REACH),
	schemaPropertyKeyGenerator(4, USERNAME_MINLENGTH_REACH),
	schemaPropertyKeyGenerator(false),
	schemaPropertyKeyGenerator(true),
	schemaPropertyKeyGenerator("string", USERNAME_INVALID_TYPE),
	schemaPropertyKeyGenerator(false, USERNAME_EXIST),
	schemaPropertyKeyGenerator(""),
	"1.0.0",
	schemaPropertyKeyGenerator(true),
);

const verificationCode = schemaTemplateGenerator(
	null,
	null,
	null,
	schemaPropertyKeyGenerator(true),
	schemaPropertyKeyGenerator("string", VERIFICATION_CODE_INVALID_TYPE),
	null,
	null,
	"1.0.0",
	null,
	schemaPropertyKeyGenerator(6, VERIFICATION_CODE_INVALID_LENGTH),
);

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
};
