const {
	schemaUserTemplate,
} = require("~/template/userTemplate/schemaUserTemplate");

const templateUserController = (req, res) => {
	try {
		res.status(200).json(schemaUserTemplate);
	} catch (error) {
		res.errorCollector({ message: "Unexpected server error" });
		res.errorResponser();
	}
};

module.exports = { templateUserController };
