const faviconOtherController = async (req, res) => {
	try {
		await res.sendFile("#/app_favicon/favicon.ico");
	} catch (error) {
		res.errorCollector(error);
		res.errorResponser();
	}
};

module.exports = { faviconOtherController };
