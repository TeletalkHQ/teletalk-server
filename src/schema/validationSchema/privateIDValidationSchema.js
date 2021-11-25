const {
	userSchemaTemplate: { privateID },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const privateIDValidationSchema = {
	privateID: {
		type: privateID.type[0],
		unique: privateID.unique[0],
		min: privateID.minlength[0],
		max: privateID.maxlength[0],
		trim: privateID.trim[0],
		messages: {
			string: privateID.type[1],
			required: privateID.required[1],
			unique: privateID.unique[1],
			stringMin: privateID.minlength[1],
			stringMax: privateID.maxlength[1],
		},
	},
};

module.exports = { privateIDValidationSchema };
