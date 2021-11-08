const {
	schemaUserTemplate,
} = require("~/template/userTemplate/schemaUserTemplate");

const templateAuthController = (req, res) => {
	try {
		res.status(200).json(schemaUserTemplate);
	} catch (error) {
		res.status(500).json({ error: { message: "Unexpected server error" } });
	}
};

module.exports = { templateAuthController };
