const {
	userSchemaTemplate: { verificationCode },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const verificationCodeValidationSchema = {
	verificationCode: {
		type: verificationCode.type.value,
		length: verificationCode.length.value,
		trim: verificationCode.trim.value,
		messages: {
			string: verificationCode.type.error.message,
			length: verificationCode.length.error.message,
		},
	},
};

module.exports = { verificationCodeValidationSchema };
