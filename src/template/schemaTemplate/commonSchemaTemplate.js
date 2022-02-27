const {
	schemaPropertyKeyGenerator,
	schemaTemplateGenerator,
} = require("~/function/utility/generators");

const {
	userErrorTemplate: { CREATED_AT_INVALID_TYPE },
} = require("~/template/errorTemplate/userErrorTemplate");

const createdAt = schemaTemplateGenerator(
	null,
	null,
	schemaPropertyKeyGenerator(true),
	null,
	schemaPropertyKeyGenerator("date", CREATED_AT_INVALID_TYPE),
	null,
	schemaPropertyKeyGenerator(Date.now),
	"1.0.0",
);

const commonSchemaTemplate = {
	version: "1.0.0",

	createdAt,
};

module.exports = {
	commonSchemaTemplate,
};
