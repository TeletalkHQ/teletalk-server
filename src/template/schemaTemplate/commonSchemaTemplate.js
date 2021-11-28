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
};

const commonSchemaTemplate = {
	createdAt,
};

module.exports = { commonSchemaTemplate };
