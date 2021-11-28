const {
	chatSchemaTemplate: { participantID },
} = require("~/template/schemaTemplate/chatSchemaTemplate");

const participantIDValidationSchema = {
	participantID: {
		type: participantID.type.value,
		unique: participantID.unique.value,
		min: participantID.minlength.value,
		max: participantID.maxlength.value,
		trim: participantID.trim.value,
		messages: {
			string: participantID.type.error.message,
			required: participantID.required.error.message,
			unique: participantID.unique.error.message,
			stringMin: participantID.minlength.error.message,
			stringMax: participantID.maxlength.error.message,
		},
	},
};

module.exports = { participantIDValidationSchema };
