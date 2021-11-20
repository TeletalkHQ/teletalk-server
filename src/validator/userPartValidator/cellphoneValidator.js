const Validator = require("fastest-validator");

const {
	userSchemaTemplate: { cellphone },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const v = new Validator();

const cellphoneValidation = {
	cellphone: {
		type: cellphone.type[0],
		// unique: cellphone.unique[0],
		min: cellphone.minlength[0],
		max: cellphone.maxlength[0],
		messages: {
			string: cellphone.type[1],
			// unique: cellphone.unique[1],
			required: cellphone.required[1],
			stringMin: cellphone.minlength[1],
			stringMax: cellphone.maxlength[1],
		},
	},
};

const cellphoneValidator = v.compile(cellphoneValidation);

module.exports = { cellphoneValidator, cellphoneValidation };
