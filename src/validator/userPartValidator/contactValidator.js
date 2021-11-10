const Validator = require("fastest-validator");

const {
	schemaUserTemplate: { contact },
} = require("~/template/userTemplate/schemaUserTemplate");

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
