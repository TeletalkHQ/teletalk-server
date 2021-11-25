const {
	userSchemaTemplate: { verificationCode },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const verificationCodeValidationSchema = {
	verificationCode: {
		type: verificationCode.type[0],
		length: verificationCode.length[0],
		trim: verificationCode.trim[0],
		messages: {
			string: verificationCode.type[1],
			length: verificationCode.length[1],
		},
	},
};

module.exports = { verificationCodeValidationSchema };
