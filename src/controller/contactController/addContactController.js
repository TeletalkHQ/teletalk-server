const { userFinder } = require("~/function/helper/userFinder");

const addContactController = async (req, res) => {
	try {
		const { cellphone } = req.body.authData.data.payload;
		console.log("cellphone", cellphone);

		const { user } = await userFinder({ cellphone });

		//TODO Check for duplicates
		user.contact.push(cellphone);
		user.save();

		console.log(user);

		if (user) {
			res.status(200).json({ cellphone, user });
		} else {
			const error = { cellphone, error: "cellphone not exist" };
			throw error;
		}
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { addContactController };
