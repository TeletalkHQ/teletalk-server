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
		console.log("templateGenerator catch", error);
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
		console.log("templateGenerator catch", error);
	}
};

const mongooseSchemaGenerator = () => {};

module.exports = { errorTemplateGenerator, routeTemplateGenerator, mongooseSchemaGenerator };
