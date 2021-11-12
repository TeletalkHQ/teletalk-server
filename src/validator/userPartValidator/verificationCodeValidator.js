const Validator = require("fastest-validator");

const {
	schemaUserTemplate: { verificationCode },
} = require("~/template/userTemplate/schemaUserTemplate");

const v = new Validator();

const verificationCodeValidation = {
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

const verificationCodeValidator = v.compile(verificationCodeValidation);

module.exports = { verificationCodeValidator, verificationCodeValidation };
