const Validator = require("fastest-validator");

const {
	userSchemaTemplate: { createdAt },
} = require("~/template/schemaTemplate/userSchemaTemplate");

const v = new Validator();

const createdAtValidation = {
	createdAt: {
		type: createdAt.type[0],
		optimal: !createdAt.required[0],
	},
};

const createdAtValidator = v.compile(createdAtValidation);

module.exports = { createdAtValidator, createdAtValidation };
