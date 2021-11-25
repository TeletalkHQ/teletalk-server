const {
	userSchemaTemplate: { createdAt },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const createdAtValidationSchema = {
	createdAt: {
		type: createdAt.type[0],
		optimal: !createdAt.required[0],
	},
};

module.exports = { createdAtValidationSchema };
