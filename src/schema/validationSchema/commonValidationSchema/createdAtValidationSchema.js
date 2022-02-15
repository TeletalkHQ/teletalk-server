const {
	commonSchemaTemplate: {
		createdAt: { properties: createdAt },
	},
} = require("~/template/schemaTemplate/commonSchemaTemplate");

const createdAtValidationSchema = {
	properties: {
		createdAt: {
			type: createdAt.type.value,
			optimal: !createdAt.required.value,
		},
	},

	info: {
		version: "1.0.0",
	},
};

module.exports = { createdAtValidationSchema };
