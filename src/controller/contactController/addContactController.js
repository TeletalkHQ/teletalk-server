const { myConsole } = require("~/function/utility/myConsole");
const { UserModel } = require("~/model/userModel/UserModel");

const addContactController = async (req, res) => {
	try {
		const { cellphone } = req.body;

		const user = await UserModel.findOne({ cellphone });
		console.log(user);
		if (user) {
			res.status(200).json({ cellphone, user });

			myConsole.red("Contact").blue("sasdasdasdass").log();
		} else {
			res.status(400).json({ cellphone, error: "cellphone not exist" });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
};

module.exports = { addContactController };
