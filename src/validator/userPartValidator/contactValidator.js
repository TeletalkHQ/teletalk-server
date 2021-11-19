const Validator = require("fastest-validator");

const {
	userSchemaTemplate: { contact },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const v = new Validator();

const contactValidation = {
	contact: {
		type: contact.type[0],
		unique: contact.unique[0],
		messages: {
			unique: contact.unique[1],
			required: contact.required[1],
		},
	},
};

const contactValidator = v.compile(contactValidation);

module.exports = { contactValidator, contactValidation };
