const {
	userErrorTemplate: { CREATED_AT_INVALID_TYPE },
} = require("~/template/errorTemplate/userErrorTemplate");

const fn = (value, error = { reason: "undefined", message: "undefined" }) => ({
	value,
	error,
});

const createdAt = {
	properties: {
		default: fn(Date.now, "undefined"),
		required: fn(true, "undefined"),
		type: fn("date", CREATED_AT_INVALID_TYPE),
	},
	info: {
		version: "1.0.0",
	},
};

const commonSchemaTemplate = {
	info: {
		version: "1.0.0",
	},

	createdAt,
};

module.exports = {
	commonSchemaTemplate,

	createdAt,
};
