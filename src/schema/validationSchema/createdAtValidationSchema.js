const {
	userSchemaTemplate: { createdAt },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const createdAtValidationSchema = {
	createdAt: {
		type: createdAt.type.value,
		optimal: !createdAt.required.value,
	},
};

module.exports = { createdAtValidationSchema };
