const {
	userSchemaTemplate: {
		bio: { properties: bio },
	},
} = require("~/template/schemaTemplate/userSchemaTemplate");

const bioValidationsSchema = {
	properties: {
		bio: {
			type: bio.type.value,
			optional: !bio.required.value,
			max: bio.maxlength.value,
			messages: {
				string: bio.type.error.message,
				stringMax: bio.maxlength.error.message,
			},
		},
	},

	info: {
		version: "1.0.0",
	},
};

module.exports = { bioValidationsSchema };
