const { UserModel } = require("~/model/userModel/UserModel");

const addContactController = async (req, res) => {
	const { cellphone } = req.body;
	const user = await UserModel.findOne({ cellphone });
	console.log(user);
	if (user) {
		res.status(200).json({ cellphone, user });
		res.status(200).json({ cellphone });
	} else {
		res.status(400).json({ cellphone, error: "cellphone not exist" });
	}
};

module.exports = { addContactController };
