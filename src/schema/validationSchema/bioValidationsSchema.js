const {
	userSchemaTemplate: { bio },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const bioValidationsSchema = {
	bio: {
		type: bio.type.value,
		optional: !bio.required.value,
		max: bio.maxlength.value,
		messages: {
			string: bio.type.error.message,
			stringMax: bio.maxlength.error.message,
		},
	},
};

module.exports = { bioValidationsSchema };

console.log(bio.minlength.error);
