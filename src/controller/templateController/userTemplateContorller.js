const { userSchemaTemplate } = require("~/model/template/userTemplate/userSchemaTemplate");

exports.sendUserTemplate = (req, res) => {
	try {
		res.status(200).json(userSchemaTemplate);
	} catch (error) {
		res.status(500).json({ error: { message: "Unexpected server error" } });
	}
};
