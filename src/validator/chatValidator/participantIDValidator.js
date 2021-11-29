const Validator = require("fastest-validator");

const {
	participantIDValidationSchema,
} = require("~/schema/validationSchema/chatValidationSchema/participantIDValidationSchema");

const v = new Validator();

const participantIDValidation = {
	...participantIDValidationSchema,
};

const participantIDValidator = v.compile(participantIDValidation);

module.exports = { participantIDValidator, participantIDValidation };
