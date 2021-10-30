const { userTemplate } = require("~/model/template/userTemplate/userTemplate");

exports.sendUserTemplate = (req, res) => {
	try {
		res.status(200).json(userTemplate);
	} catch (error) {
		res.status(500).json({ error: { message: "Unexpected server error" } });
	}
};
