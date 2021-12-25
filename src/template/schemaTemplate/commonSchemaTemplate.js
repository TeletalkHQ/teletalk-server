const {
	userError: { CREATED_AT_INVALID_TYPE },
} = require("~/constant/error/userError/userError");

const fn = (value, error = { reason: "undefined", message: "undefined" }) => ({
	value,
	error,
});

const createdAt = {
	default: fn(Date.now, "undefined"),
	required: fn(true, "undefined"),
	type: fn("date", CREATED_AT_INVALID_TYPE),
	version: "1.0.0",
};

const commonSchemaTemplate = {
	createdAt,
	version: "1.0.0",
};

module.exports = { commonSchemaTemplate };
