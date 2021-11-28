const {
	commonSchemaTemplate: { createdAt },
} = require("~/template/schemaTemplate/commonSchemaTemplate");

const createdAtValidationSchema = {
	createdAt: {
		type: createdAt.type.value,
		optimal: !createdAt.required.value,
	},
};

module.exports = { createdAtValidationSchema };
