const errorTemplateGenerator = (code, message, reason, version) => {
	try {
		if (!code || message || reason || version) {
			const error = {
				errorMessage: `required arguments should passed`,
				code,
				message,
				reason,
				version,
			};

			throw error;
		}
		return { code, message, reason, version };
	} catch (error) {
		console.log("templateGenerator catch, error:", error);
	}
};

const routeTemplateGenerator = (method, route, version, description = "") => {
	try {
		if (!method || !route || !version) {
			const error = {
				errorMessage: `required arguments should passed`,
				method,
				route,
				version,
			};

			throw error;
		}
		return { method, route, version, description };
	} catch (error) {
		console.log("templateGenerator catch, error:", error);
	}
};

const mongooseSchemaGenerator = () => {};

const schemaTemplateGenerator = (
	maxlength,
	minlength,
	required,
	trim,
	type,
	unique,
	defaultValue,
	version,
	lowercase,
	length,
) => {
	try {
		return {
			maxlength,
			minlength,
			required,
			trim,
			type,
			unique,
			default: defaultValue,
			version,
			lowercase,
			length,
		};
	} catch (error) {
		logger.log("schemaTemplateGenerator catch, error:", error);
	}
};

const schemaPropertyKeyGenerator = (
	value,
	error = { reason: "Not set!", message: "Not set!", code: "Not set!", version: "Not set!" },
) => {
	if (typeof value === "undefined") {
		const error = "Value need to be set!";
		throw error;
	}

	try {
		return {
			value,
			error,
		};
	} catch (error) {
		logger.log("schemaPropertyKeyGenerator catch, error:", error);
	}
};

module.exports = {
	errorTemplateGenerator,
	mongooseSchemaGenerator,
	routeTemplateGenerator,
	schemaPropertyKeyGenerator,
	schemaTemplateGenerator,
};
